import type { XiaohongshuNoteCommentsResponse } from '@ikenxuan/amagi'
import {
  createEmojiNode,
  createLineBreakNode,
  createMentionNode,
  createRichTextDocument,
  createTextNode,
  type RichTextDocument,
  type RichTextEmojiDefinition,
  type RichTextNode
} from '@kkk/richtext'
import type { XiaohongshuCommentData } from '@template/template/xiaohongshu/comment/components/types'

import { xiaohongshuFetcher } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'
import { logger } from '@/module/utils/logger'

/** 评论项类型：从模板路由主数据接口逐步索引派生，types.ts 不再单独导出子类型 */
type XiaohongshuCommentItem = XiaohongshuCommentData['CommentsData'][number]
/** 子评论类型：同上，由评论项的 sub_comments 字段索引得到 */
type XiaohongshuSubComment = XiaohongshuCommentItem['sub_comments'][number]

/** 一级评论元素类型（noteComments 端点的响应条目） */
type NoteComment = XiaohongshuNoteCommentsResponse['data']['comments'][number]

/**
 * 子评论元素类型。
 *
 * 一级评论响应自带的预览（`sub_comments`）与子评论接口的返回是同一套字段，
 * 只有生成类型把接口那份的 `pictures` / `show_tags` / `at_users` 放宽成了 `unknown[]`。
 */
type NoteSubComment = NoteComment['sub_comments'][number]

/** 子评论接口需要的笔记定位信息（笔记 id + 分享链接下发的 xsec_token） */
interface XiaohongshuNoteRef {
  note_id: string
  xsec_token: string
}

/** 一次最多同时打几条一级评论的子评论请求 */
const SUB_COMMENT_BATCH = 5

/**
 * 评论里被 @ 的人。
 *
 * 快照类型写的是 `string[]`，但线上两种形态都见过：web 接口给 `"@昵称"` 字符串，
 * app 接口给对象（昵称在 `nickname` 或 `user_info.nickname`）—— 按实际读到的两格并集声明，
 * `string[]` 天然是它的子集，调用处不用断言。
 */
type NoteAtUser = string | { nickname?: string; user_id?: string; user_info?: { nickname?: string; user_id?: string } }

/** 评论标签：字符串，或带 `name` / `tag` 的对象（同样是快照类型没覆盖到的形态） */
type NoteTag = string | { name?: string; tag?: string }

/**
 * 处理小红书评论数据。
 *
 * 这里直接输出结构化评论 JSON，正文部分使用 richtext 文档，避免后端拼接 HTML。
 *
 * 配了 ck 且 `subCommentLimit > 2` 时，会对带子评论的一级评论逐条请求子评论接口
 * （见 {@link shouldFetchSubComments}），取回后与响应自带的预览合并去重；
 * 否则完全用预览，一个额外请求都不发。
 */
export const xiaohongshuComments = async (
  data: XiaohongshuNoteCommentsResponse,
  emojiData: RichTextEmojiDefinition[],
  note: XiaohongshuNoteRef
): Promise<XiaohongshuCommentItem[]> => {
  const rawComments = data?.data?.comments
  if (!Array.isArray(rawComments) || rawComments.length === 0) {
    return []
  }

  // 先排序、再按 numcomment 截断、最后才构建：子评论请求只对最终会渲染的那几条一级评论发
  const ordered = [...rawComments]
    .sort(
      (a, b) => Number(normalizeTagNames(b.show_tags).includes('user_top')) - Number(normalizeTagNames(a.show_tags).includes('user_top'))
    )
    .slice(0, Config.xiaohongshu.numcomment)

  const fetchEnabled = shouldFetchSubComments()
  const topLevelIds = new Set(ordered.map((comment) => comment.id))
  const comments: XiaohongshuCommentItem[] = []

  for (let index = 0; index < ordered.length; index += SUB_COMMENT_BATCH) {
    comments.push(
      ...(await Promise.all(
        ordered.slice(index, index + SUB_COMMENT_BATCH).map(async (comment) => {
          const preview = Array.isArray(comment.sub_comments) ? comment.sub_comments : []
          const fetched = fetchEnabled ? await fetchSubComments(comment, note) : []
          const showTags = normalizeTagNames(comment.show_tags)

          return {
            id: comment.id,
            note_id: comment.note_id,
            content: buildXiaohongshuRichText(comment.content, emojiData, comment.at_users),
            user_info: comment.user_info,
            create_time: comment.create_time,
            ip_location: comment.ip_location || '未知',
            like_count: comment.like_count,
            liked: comment.liked,
            pictures: Array.isArray(comment.pictures) ? comment.pictures : [],
            sub_comment_count: comment.sub_comment_count,
            sub_comments: buildXiaohongshuSubComments(mergeSubComments(preview, fetched, topLevelIds), emojiData),
            show_tags: showTags,
            at_users: normalizeAtUsers(comment.at_users).map((item) => item.text),
            status: comment.status
          }
        })
      ))
    )
  }

  return comments
}

/**
 * 要不要请求子评论接口。两个条件缺一不可：
 *
 * 1. **配了小红书 ck** —— 平台不允许游客拿二级评论，没 ck 请求必然失败；
 * 2. **`subCommentLimit > 2`** —— 一级评论响应自带的预览就是每条最多 2 条，
 *    配置 ≤ 2 时请求回来也不会多出任何东西，默认值 2 即「不请求」。
 */
const shouldFetchSubComments = (): boolean => Config.xiaohongshu.subCommentLimit > 2 && Config.amagi.cookies.xiaohongshu.trim() !== ''

/**
 * 取一条一级评论下的子评论（楼中楼）。
 *
 * 失败只吞掉这一条并记 debug —— 评论图是尽力而为的展示，一条楼中楼取不到
 * 不该带崩整张图。本来就没有子评论的（`sub_comment_count` 为 0）直接跳过。
 * @param comment - 一级评论
 * @param note - 笔记定位信息
 * @returns 接口取回的子评论；失败或没有子评论时为空数组
 */
const fetchSubComments = async (comment: NoteComment, note: XiaohongshuNoteRef): Promise<NoteSubComment[]> => {
  if (Number(comment.sub_comment_count) <= 0) return []

  try {
    const response = await xiaohongshuFetcher.fetchSubComments({
      note_id: note.note_id,
      root_comment_id: comment.id,
      xsec_token: note.xsec_token,
      number: Config.xiaohongshu.subCommentLimit
    })

    // 接口返回与预览是同一套字段（生成类型只是把 pictures / show_tags / at_users 放宽成 unknown[]），
    // 消费路径完全一致，按预览形状直接交给 buildXiaohongshuSubComments
    const fetched = response.data?.data?.comments
    return Array.isArray(fetched) ? (fetched as unknown as NoteSubComment[]) : []
  } catch (error) {
    logger.debug(`[xiaohongshu] 取子评论失败（${comment.id}）: ${error}`)
    return []
  }
}

/**
 * 合并预览与接口取回的子评论：**预览在前，新增的追加在后**。
 *
 * 两类重复按 id 排除：① 同一条一级评论自带的那几条预览；② 一级评论列表里出现过的 id
 * —— 楼中楼偶尔会把同一条评论也挂在顶层，两处都渲染就成了重复条目。
 * @param preview - 一级评论响应自带的子评论
 * @param fetched - 子评论接口取回的列表
 * @param topLevelIds - 本次渲染的一级评论 id 集合
 * @returns 去重后的子评论列表
 */
const mergeSubComments = (preview: NoteSubComment[], fetched: NoteSubComment[], topLevelIds: ReadonlySet<string>): NoteSubComment[] => {
  const seen = new Set<string>([...topLevelIds, ...preview.map((item) => item.id)])
  const merged = [...preview]

  for (const item of fetched) {
    if (!item?.id || seen.has(item.id)) continue
    seen.add(item.id)
    merged.push(item)
  }

  return merged
}

const buildXiaohongshuSubComments = (
  subComments: XiaohongshuNoteCommentsResponse['data']['comments'][number]['sub_comments'],
  emojiData: RichTextEmojiDefinition[]
): XiaohongshuSubComment[] => {
  if (!Array.isArray(subComments)) {
    return []
  }

  return subComments.map((subComment) => ({
    id: subComment.id,
    note_id: subComment.note_id,
    content: buildXiaohongshuRichText(subComment.content, emojiData, subComment.at_users),
    user_info: subComment.user_info,
    create_time: subComment.create_time,
    ip_location: subComment.ip_location || '未知',
    like_count: subComment.like_count,
    liked: subComment.liked,
    pictures: Array.isArray(subComment.pictures) ? subComment.pictures : [],
    show_tags: normalizeTagNames(subComment.show_tags),
    at_users: normalizeAtUsers(subComment.at_users).map((item) => item.text),
    status: subComment.status,
    target_comment: subComment.target_comment
  }))
}

/**
 * 把小红书评论正文解析成共享富文本 JSON。
 *
 * 当前主要兼容：
 * - `[表情]` 形式的平台表情；
 * - `@用户` 提及；
 * - 评论里的换行与连续空格。
 */
export const buildXiaohongshuRichText = (
  text: string,
  emojiData: RichTextEmojiDefinition[],
  atUsers: NoteAtUser[] = [],
  options: {
    stripTopicMarker?: boolean
  } = {}
): RichTextDocument => {
  const normalizedText = normalizeXiaohongshuText(text, options)
  const emojiTokens = [...emojiData].sort((a, b) => b.name.length - a.name.length)
  const mentionTokens = normalizeAtUsers(atUsers).sort((a, b) => b.text.length - a.text.length)
  const nodes: RichTextNode[] = []
  let buffer = ''
  let index = 0

  const pushBuffer = () => {
    if (buffer.length > 0) {
      nodes.push(createTextNode(buffer))
      buffer = ''
    }
  }

  while (index < normalizedText.length) {
    if (normalizedText[index] === '\r') {
      pushBuffer()
      index += normalizedText[index + 1] === '\n' ? 2 : 1
      nodes.push(createLineBreakNode())
      continue
    }

    if (normalizedText[index] === '\n') {
      pushBuffer()
      nodes.push(createLineBreakNode())
      index += 1
      continue
    }

    const matchedMention = mentionTokens.find((item) => normalizedText.startsWith(item.text, index))
    if (matchedMention) {
      pushBuffer()
      nodes.push(createMentionNode(matchedMention.text, matchedMention.userId))
      index += matchedMention.text.length
      continue
    }

    const matchedEmoji = emojiTokens.find((item) => normalizedText.startsWith(item.name, index))
    if (matchedEmoji) {
      pushBuffer()
      nodes.push(createEmojiNode(matchedEmoji.name, matchedEmoji.url))
      index += matchedEmoji.name.length
      continue
    }

    buffer += normalizedText[index]
    index += 1
  }

  pushBuffer()

  return createRichTextDocument(nodes, { platform: 'xiaohongshu' })
}

const normalizeXiaohongshuText = (
  text: string,
  options: {
    stripTopicMarker?: boolean
  }
): string => {
  const normalized = typeof text === 'string' ? text : String(text || '')
  if (options.stripTopicMarker) {
    return normalized.replace(/\[话题\]/g, '')
  }

  return normalized
}

const normalizeTagNames = (tags: NoteTag[] | undefined): string[] => {
  if (!Array.isArray(tags)) {
    return []
  }

  return tags
    .map((tag) => {
      if (typeof tag === 'string') {
        return tag
      }

      if (tag && typeof tag === 'object') {
        const candidate = tag.name ?? tag.tag
        return typeof candidate === 'string' ? candidate : ''
      }

      return ''
    })
    .filter(Boolean)
}

const normalizeAtUsers = (atUsers: NoteAtUser[] | undefined): Array<{ text: string; userId?: string }> => {
  if (!Array.isArray(atUsers)) {
    return []
  }

  return atUsers
    .map((item) => {
      if (typeof item === 'string' && item.trim()) {
        const nickname = item.trim().replace(/^@/, '')
        return { text: `@${nickname}` }
      }

      if (item && typeof item === 'object') {
        const nickname = item.nickname ?? item.user_info?.nickname
        const userId = item.user_id ?? item.user_info?.user_id

        if (typeof nickname === 'string' && nickname.trim()) {
          return {
            text: `@${nickname.trim().replace(/^@/, '')}`,
            userId
          }
        }
      }

      return null
    })
    .filter((item): item is { text: string; userId?: string } => Boolean(item))
}
