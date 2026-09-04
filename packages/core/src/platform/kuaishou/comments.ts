import type { KsWorkComments } from '@ikenxuan/amagi'
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
import type { KuaishouCommentData } from '@template/template/kuaishou/comment/components/types'

import { Config } from '@/module/utils/Config'

/**
 * 处理快手评论数据。
 *
 * 这里不再拼 HTML，而是输出共享富文本 JSON，交给 template 侧渲染 React 节点。
 *
 * amagi 把评论换到 H5 `photo/comment/list` 之后形状变了三处，且按「不归一化」原样透出：
 * 条目从 `data.visionCommentList.rootComments` 提到顶层 `rootComments`、字段名从
 * camelCase 变成 snake_case、子评论从内嵌的 `subComments` 挪到了 `subCommentsMap`。
 * 本函数只用到根评论和 `subCommentCount` 这个计数，所以 `subCommentsMap` 暂不读。
 */
export const kuaishouComments = async (
  data: KsWorkComments,
  emojiData: RichTextEmojiDefinition[]
): Promise<KuaishouCommentData['CommentsData']> => {
  const rootComments = data?.rootComments
  if (!Array.isArray(rootComments) || rootComments.length === 0) {
    return []
  }

  const comments = rootComments.map((comment) => ({
    cid: comment.comment_id ?? '',
    aweme_id: comment.comment_id ?? '',
    nickname: comment.author_name ?? '',
    userimageurl: comment.headurl ?? '',
    text: buildKuaishouRichText(comment.content ?? '', emojiData),
    // H5 这条**没有** `realLikedCount`（那是 PC GraphQL 独有的真实点赞数），只剩展示用的
    // `likedCount`，还可能是「1.2万」这种字符串 —— 解不出数字就沿用原有的兜底值 0
    digg_count: Number(comment.likedCount) || 0,
    create_time: comment.timestamp ?? 0,
    reply_comment_total: comment.subCommentCount ?? 0
  }))

  return comments.sort((a, b) => b.digg_count - a.digg_count).slice(0, Math.min(comments.length, Config.kuaishou.numcomment))
}

/**
 * 把快手评论正文解析成共享富文本 JSON。
 *
 * 当前主要兼容：
 * - `[表情]` 形式的平台表情；
 * - `@昵称(uid)` 形式的提及；
 * - 评论里的换行与空格。
 */
const buildKuaishouRichText = (text: string, emojiData: RichTextEmojiDefinition[]): RichTextDocument => {
  const normalizedText = typeof text === 'string' ? text : String(text || '')
  const emojiTokens = [...emojiData].sort((a, b) => b.name.length - a.name.length)
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

    const mentionMatch = normalizedText.slice(index).match(/^@([^()]+?)\(([^)]+)\)/)
    if (mentionMatch) {
      pushBuffer()
      const mentionText = `@${mentionMatch[1].trim()}`
      const mentionId = mentionMatch[2].trim() || undefined
      nodes.push(createMentionNode(mentionText, mentionId))
      index += mentionMatch[0].length
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

  return createRichTextDocument(nodes, { platform: 'kuaishou' })
}
