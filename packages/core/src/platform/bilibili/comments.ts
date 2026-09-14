import type { BilibiliCommentsResponse } from '@ikenxuan/amagi'
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
import type { CommentItem, FanCardInfo, FansDetail, SubCommentItem } from '@template/template/bilibili/components/types'

import { Config } from '@/module/utils/Config'

/** 一级评论（`data.replies` 的元素） */
type CommentReply = BilibiliCommentsResponse['data']['replies'][number]
/** 二级评论（楼中楼，`replies` 的元素） */
type SubReply = NonNullable<CommentReply['replies']>[number]
/** 评论正文：一级与楼中楼两支 */
type CommentContent = CommentReply['content'] | SubReply['content']
/** 评论作者：一级与楼中楼两支 */
type CommentMember = CommentReply['member'] | SubReply['member']
/** 评论正文里被 @ 的人 */
type ContentMember = SubReply['content']['members'][number]
/** 粉丝卡片（一级与楼中楼两支的 `user_sailing_v2` 形状一致，这里只声明要读的几格） */
type FanCardSailing = {
  card_bg?: {
    image?: string | null
    fan?: {
      is_fan?: number
      color?: string
      num_prefix?: string
      num_desc?: string
      color_format?: { colors?: string[]; gradients?: number[] }
    }
  }
}

/**
 * 置顶评论。
 *
 * 生成树这份样本录制时没有置顶评论，`data.top.upper` 被记成了 `null`（同层的 `admin` / `vote` 也是），
 * 而实际有置顶时它就是一条普通评论 —— 在这**唯一一处**边界用 `unknown` 中转断言成 {@link CommentReply}，
 * 之后字段类型照常流下来，下游不再各自收窄。等 amagi 补上「有置顶」的样本后删掉这个别名。
 */
type TopReply = CommentReply

/** 评论正文的表情表（生成类型的键是 `[doge]` 这类字面量 + 索引签名，值统一是同一个形状） */
type EmoteEntry = NonNullable<CommentReply['content']['emote']>[string]

/**
 * 两格运行时兜底的读取器。
 *
 * 之前这些字段全是 `unknown`，代码逐格 `typeof` 判过一遍；换到生成类型后类型是准的，
 * 但线上少给一格仍旧可能 —— 把兜底收进这两个函数，既保住原来的行为，也不让 `any`/`unknown`
 * 散落到各处。
 */
const readNumber = (value: unknown): number => (typeof value === 'number' ? value : 0)
const readString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback)

/**
 * 处理Bilibili评论数据
 * @param commentsData 原始评论数据
 * @param host_mid UP主的ID
 * @returns 处理后的评论数据数组和图片URL数组
 */
export const bilibiliComments = (
  commentsData: BilibiliCommentsResponse,
  host_mid: string
): { comments: CommentItem[] | []; image_urls: string[] } => {
  if (!commentsData || commentsData.code === 404) {
    return { comments: [], image_urls: [] }
  }

  const comments: CommentItem[] = []
  const image_urls: string[] = []
  // top.upper 在生成树里是 null（样本录的时候没有置顶评论），见 TopReply
  const topReply = commentsData.data.top?.upper as unknown as TopReply | undefined

  if (topReply) {
    comments.push(
      buildCommentItem(topReply, host_mid, image_urls, {
        id: 0,
        isTop: true
      })
    )
  }

  const replies = commentsData.data.replies ?? []
  replies.forEach((reply, index) => {
    comments.push(
      buildCommentItem(reply, host_mid, image_urls, {
        id: index + 1,
        isTop: false
      })
    )
  })

  const sortedComments = comments
    .sort((a, b) => {
      if (a.isTop && !b.isTop) return -1
      if (!a.isTop && b.isTop) return 1
      if (a.isTop && b.isTop) return 0
      return b.like - a.like
    })
    .slice(0, Config.bilibili.numcomment)

  return { comments: sortedComments, image_urls }
}

const buildCommentItem = (
  reply: CommentReply,
  hostMid: string,
  imageUrls: string[],
  options: {
    id: number
    isTop: boolean
  }
): CommentItem => {
  const member = reply.member
  const content = reply.content

  return {
    ctime: reply.ctime ?? 0,
    message: buildBilibiliRichText(content?.message ?? '', content?.emote, contentMembers(content)),
    avatar: member?.avatar ?? '',
    frame: member?.pendant?.image ?? '',
    uname: member?.uname ?? '',
    unameColor: getUserNameColor(member),
    level: member?.level_info?.current_level ?? 0,
    vipstatus: getVipStatus(member),
    pictures: extractPictureUrls(content?.pictures, imageUrls),
    replylength: reply.rcount ?? 0,
    location: getLocationLabel(reply.reply_control),
    like: reply.like ?? 0,
    isTop: options.isTop,
    isUP: reply.mid_str === hostMid,
    fanCard: extractFanCard(member?.user_sailing_v2),
    fansDetail: extractFansDetail(member?.fans_detail),
    replies: buildSubReplies(reply.replies, hostMid, imageUrls)
  }
}

const buildSubReplies = (
  replies: CommentReply['replies'] | SubReply['replies'] | undefined,
  hostMid: string,
  imageUrls: string[]
): SubCommentItem[] => {
  if (!Array.isArray(replies)) {
    return []
  }

  return replies
    .filter((reply) => Boolean(reply.content) && Boolean(reply.member))
    .map((reply) => buildSubCommentItem(reply as SubReply, hostMid, imageUrls))
}

const buildSubCommentItem = (reply: SubReply, hostMid: string, imageUrls: string[]): SubCommentItem => {
  const member = reply.member
  const content = reply.content

  return {
    ctime: reply.ctime ?? 0,
    message: buildBilibiliRichText(content?.message ?? '', content?.emote, contentMembers(content)),
    avatar: member?.avatar ?? '',
    frame: member?.pendant?.image ?? '',
    uname: member?.uname ?? '',
    unameColor: getUserNameColor(member),
    level: member?.level_info?.current_level ?? 0,
    vipstatus: getVipStatus(member),
    pictures: extractPictureUrls(content?.pictures, imageUrls),
    location: getLocationLabel(reply.reply_control),
    like: reply.like ?? 0,
    isUP: reply.mid_str === hostMid,
    fanCard: extractFanCard(member?.user_sailing_v2),
    fansDetail: extractFansDetail(member?.fans_detail)
  }
}

/**
 * 取正文里被 @ 的人。
 *
 * 生成树把一级评论的 `content.members` 记成 `unknown[]`（样本里那个数组是空的），
 * 而楼中楼那支同名字段是 `Member2[]` —— 借它的元素类型，只在这一处断言一次。
 */
const contentMembers = (content: CommentContent | undefined): ContentMember[] => {
  const members = content?.members
  return Array.isArray(members) ? (members as ContentMember[]) : []
}

/**
 * 把 B 站评论正文解析成共享富文本 JSON。
 *
 * B 站评论里常见的特殊内容包括：
 * - `[doge]` 这类平台表情；
 * - `@用户名` 这类提及；
 * - 换行符；
 * - `¨` 这种接口里的分隔符字符。
 */
const buildBilibiliRichText = (text: string, emote: CommentContent['emote'] | undefined, members: ContentMember[]): RichTextDocument => {
  const normalizedText = normalizeBilibiliText(text)
  const emojiTokens = extractEmojiTokens(emote)
  const mentionTokens = extractMentionTokens(members)
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
      nodes.push(
        createEmojiNode(matchedEmoji.name, matchedEmoji.url, {
          scale: matchedEmoji.scale
        })
      )
      index += matchedEmoji.name.length
      continue
    }

    buffer += normalizedText[index]
    index += 1
  }

  pushBuffer()

  return createRichTextDocument(nodes, { platform: 'bilibili' })
}

const normalizeBilibiliText = (text: string): string => {
  return text.replace(/¨/g, '•')
}

const extractEmojiTokens = (emote: CommentContent['emote'] | undefined): RichTextEmojiDefinition[] => {
  if (!emote) {
    return []
  }

  const entries = Object.entries(emote as Record<string, EmoteEntry | undefined>)

  return entries
    .filter((entry): entry is [string, EmoteEntry] => Boolean(entry[0]) && Boolean(entry[1]?.url))
    .map(([name, item]) => ({
      name,
      url: item.url,
      scale: item.type !== 1 ? 2 : undefined
    }))
    .sort((a, b) => b.name.length - a.name.length)
}

const extractMentionTokens = (members: ContentMember[]): Array<{ text: string; userId?: string }> => {
  return members
    .filter((item) => Boolean(item?.uname))
    .map((item) => ({
      text: `@${item.uname}`,
      userId: item.mid?.toString()
    }))
    .sort((a, b) => b.text.length - a.text.length)
}

const extractPictureUrls = (pictures: CommentContent['pictures'], imageUrls: string[]): string[] => {
  if (!Array.isArray(pictures)) {
    return []
  }

  const urls: string[] = []
  for (const picture of pictures) {
    // 生成类型里 `img_src` 是 string，真到线上仍可能缺，保持原来的「非字符串就丢」
    const src: unknown = picture?.img_src
    if (typeof src === 'string') {
      urls.push(src)
      imageUrls.push(src)
    }
  }

  return urls
}

/**
 * 取「IP属地：xx」里的地名。
 *
 * 生成树样本的 `reply_control` 里没有 `location` 这一格，读出来是索引签名的 `any` ——
 * 就地收进 `unknown` 再判类型，别让 `any` 顺着字段传下去。
 */
const getLocationLabel = (replyControl: CommentReply['reply_control'] | SubReply['reply_control'] | undefined): string => {
  const location: unknown = replyControl?.location
  return typeof location === 'string' ? location.replace('IP属地：', '') : ''
}

const getVipStatus = (member: CommentMember | undefined): number => {
  const vipStatus: unknown = member?.vip?.vipStatus
  if (typeof vipStatus === 'number') {
    return vipStatus
  }

  // `status` 是另一套命名（生成树的样本里只有 `vipStatus`），保留旧响应的兜底
  const legacyStatus: unknown = (member?.vip as Record<string, unknown> | undefined)?.status
  return typeof legacyStatus === 'number' ? legacyStatus : 0
}

const getUserNameColor = (member: CommentMember | undefined): string => {
  if (getVipStatus(member) === 1) {
    return member?.vip?.nickname_color ?? '#FB7299'
  }

  return '#888'
}

/** 提取粉丝卡片信息 */
const extractFanCard = (sailing: FanCardSailing | undefined): FanCardInfo | null => {
  const cardBg = sailing?.card_bg
  const fan = cardBg?.fan
  if (!cardBg || !fan?.is_fan) {
    return null
  }

  let gradientStyle = ''
  const colorFormat = fan.color_format
  if (Array.isArray(colorFormat?.colors) && Array.isArray(colorFormat.gradients)) {
    const colorStops = colorFormat.colors.map((color, index) => `${color} ${colorFormat.gradients?.[index] ?? 0}%`).join(', ')
    gradientStyle = `linear-gradient(135deg, ${colorStops})`
  } else if (typeof fan.color === 'string') {
    gradientStyle = fan.color
  }

  return {
    image: cardBg.image ?? null,
    numPrefix: readString(fan.num_prefix),
    numDesc: readString(fan.num_desc),
    gradientStyle
  }
}

/**
 * 提取粉丝勋章详情。
 *
 * 生成树里这些格都是具体类型，只有 `first_icon` 没进样本（走索引签名）——
 * 它照旧就地收进 `unknown` 再判，模板侧 `first_icon` 本来就是可选。
 */
const extractFansDetail = (fansDetail: CommentMember['fans_detail'] | SubReply['fans_detail']): FansDetail | null => {
  if (!fansDetail) {
    return null
  }

  const firstIcon: unknown = fansDetail.first_icon

  return {
    uid: readNumber(fansDetail.uid),
    medal_id: readNumber(fansDetail.medal_id),
    medal_name: readString(fansDetail.medal_name),
    score: readNumber(fansDetail.score),
    level: readNumber(fansDetail.level),
    intimacy: readNumber(fansDetail.intimacy),
    master_status: readNumber(fansDetail.master_status),
    is_receive: readNumber(fansDetail.is_receive),
    medal_color: readNumber(fansDetail.medal_color),
    medal_color_end: readNumber(fansDetail.medal_color_end),
    medal_color_border: readNumber(fansDetail.medal_color_border),
    medal_color_name: readNumber(fansDetail.medal_color_name),
    medal_color_level: readNumber(fansDetail.medal_color_level),
    guard_level: readNumber(fansDetail.guard_level),
    guard_icon: readString(fansDetail.guard_icon),
    honor_icon: readString(fansDetail.honor_icon),
    first_icon: typeof firstIcon === 'string' ? firstIcon : undefined,
    medal_level_bg_color: readNumber(fansDetail.medal_level_bg_color)
  }
}
