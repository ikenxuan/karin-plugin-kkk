import type { BiliWorkComments } from '@ikenxuan/amagi'
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
import type { CommentItem, SubCommentItem } from 'template/types/platforms/bilibili/comment'

import { Config } from '@/module/utils/Config'

/**
 * 处理Bilibili评论数据
 * @param commentsData 原始评论数据
 * @param host_mid UP主的ID
 * @returns 处理后的评论数据数组和图片URL数组
 */
export const bilibiliComments = (commentsData: BiliWorkComments, host_mid: string): { comments: CommentItem[] | [], image_urls: string[] } => {
  if (!commentsData || commentsData.code === 404) {
    return { comments: [], image_urls: [] }
  }

  const comments: CommentItem[] = []
  const image_urls: string[] = []
  const topReply = commentsData.data.top?.upper

  if (topReply) {
    comments.push(buildCommentItem(topReply, host_mid, image_urls, {
      id: 0,
      isTop: true
    }))
  }

  const replies = commentsData.data.replies ?? []
  replies.forEach((reply, index) => {
    comments.push(buildCommentItem(reply, host_mid, image_urls, {
      id: index + 1,
      isTop: false
    }))
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
  reply: BiliWorkComments['data']['replies'][number] | NonNullable<BiliWorkComments['data']['top']['upper']>,
  hostMid: string,
  imageUrls: string[],
  options: {
    id: number
    isTop: boolean
  }
): CommentItem => {
  const member = reply.member
  const content = reply.content
  const pictures = extractPictureUrls(getContentPictures(content), imageUrls)
  const vipstatus = getVipStatus(member)

  return {
    ctime: reply.ctime ?? 0,
    message: buildBilibiliRichText(content?.message ?? '', getContentEmote(content), getContentMembers(content)),
    avatar: member?.avatar ?? '',
    frame: member?.pendant?.image ?? '',
    uname: member?.uname ?? '',
    unameColor: getUserNameColor(member),
    level: member?.level_info?.current_level ?? 0,
    vipstatus,
    pictures,
    replylength: reply.rcount ?? 0,
    location: getLocationLabel(reply),
    like: reply.like ?? 0,
    isTop: options.isTop,
    isUP: reply.mid_str === hostMid,
    fanCard: extractFanCard(member),
    replies: buildSubReplies(reply.replies, hostMid, imageUrls)
  }
}

const buildSubReplies = (
  replies:
    | BiliWorkComments['data']['replies'][number]['replies']
    | NonNullable<BiliWorkComments['data']['top']['upper']>['replies']
    | undefined,
  hostMid: string,
  imageUrls: string[]
): SubCommentItem[] => {
  if (!Array.isArray(replies)) {
    return []
  }

  return replies
    .filter(reply => Boolean(reply.content) && Boolean(reply.member))
    .map(reply => buildSubCommentItem(reply, hostMid, imageUrls))
}

const buildSubCommentItem = (
  reply:
    | NonNullable<BiliWorkComments['data']['replies'][number]['replies']>[number]
    | NonNullable<NonNullable<BiliWorkComments['data']['top']['upper']>['replies']>[number],
  hostMid: string,
  imageUrls: string[]
): SubCommentItem => {
  const member = reply.member
  const content = reply.content
  const vipstatus = getVipStatus(member)

  return {
    ctime: reply.ctime ?? 0,
    message: buildBilibiliRichText(content?.message ?? '', getContentEmote(content), getContentMembers(content)),
    avatar: member?.avatar ?? '',
    frame: member?.pendant?.image ?? '',
    uname: member?.uname ?? '',
    unameColor: getUserNameColor(member),
    level: member?.level_info?.current_level ?? 0,
    vipstatus,
    pictures: extractPictureUrls(getContentPictures(content), imageUrls),
    location: getLocationLabel(reply),
    like: reply.like ?? 0,
    isUP: reply.mid_str === hostMid,
    fanCard: extractFanCard(member)
  }
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
const buildBilibiliRichText = (
  text: string,
  emote: unknown,
  members: unknown
): RichTextDocument => {
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

    const matchedMention = mentionTokens.find(item => normalizedText.startsWith(item.text, index))
    if (matchedMention) {
      pushBuffer()
      nodes.push(createMentionNode(matchedMention.text, matchedMention.userId))
      index += matchedMention.text.length
      continue
    }

    const matchedEmoji = emojiTokens.find(item => normalizedText.startsWith(item.name, index))
    if (matchedEmoji) {
      pushBuffer()
      nodes.push(createEmojiNode(matchedEmoji.name, matchedEmoji.url, {
        scale: matchedEmoji.scale
      }))
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

const extractEmojiTokens = (emote: unknown): RichTextEmojiDefinition[] => {
  if (!emote || typeof emote !== 'object') {
    return []
  }

  return Object.entries(emote as Record<string, { url?: string; type?: number }>)
    .filter((entry): entry is [string, { url: string; type?: number }] => Boolean(entry[0]) && Boolean(entry[1]?.url))
    .map(([name, item]) => ({
      name,
      url: item.url,
      scale: item.type !== 1 ? 2 : undefined
    }))
    .sort((a, b) => b.name.length - a.name.length)
}

const getContentEmote = (content: unknown): unknown => {
  if (!content || typeof content !== 'object') {
    return undefined
  }

  return (content as { emote?: unknown }).emote
}

const getContentMembers = (content: unknown): unknown => {
  if (!content || typeof content !== 'object') {
    return undefined
  }

  return (content as { members?: unknown }).members
}

const getContentPictures = (content: unknown): unknown => {
  if (!content || typeof content !== 'object') {
    return undefined
  }

  return (content as { pictures?: unknown }).pictures
}

const extractMentionTokens = (members: unknown): Array<{ text: string; userId?: string }> => {
  if (!Array.isArray(members) || members.length === 0) {
    return []
  }

  return members
    .filter((item): item is { uname?: string; mid?: string | number } => typeof item === 'object' && item !== null)
    .filter(item => Boolean(item.uname))
    .map(item => ({
      text: `@${item.uname}`,
      userId: item.mid?.toString()
    }))
    .sort((a, b) => b.text.length - a.text.length)
}

const extractPictureUrls = (
  pictures: unknown,
  imageUrls: string[]
): string[] => {
  if (!Array.isArray(pictures)) {
    return []
  }

  const urls: string[] = []
  for (const picture of pictures) {
    if (typeof picture === 'object' && picture !== null && 'img_src' in picture && typeof picture.img_src === 'string') {
      urls.push(picture.img_src)
      imageUrls.push(picture.img_src)
    }
  }

  return urls
}

const getLocationLabel = (reply: unknown): string => {
  if (!reply || typeof reply !== 'object') {
    return ''
  }

  const replyControl = (reply as { reply_control?: { location?: string } }).reply_control
  return replyControl?.location?.replace('IP属地：', '') ?? ''
}

const getVipStatus = (member: unknown): number => {
  if (!member || typeof member !== 'object') {
    return 0
  }

  // @ts-ignore
  const vip = member?.vip as { vipStatus?: unknown; status?: unknown } | undefined

  if (typeof vip?.vipStatus === 'number') {
    return vip.vipStatus
  }

  if (typeof vip?.status === 'number') {
    return vip.status
  }

  return 0
}

const getUserNameColor = (member: unknown): string | null => {
  if (!member || typeof member !== 'object') {
    return '#888'
  }

  if (getVipStatus(member) === 1) {
    return (member as { vip?: { nickname_color?: string } }).vip?.nickname_color ?? '#FB7299'
  }

  return '#888'
}

/** 提取粉丝卡片信息 */
const extractFanCard = (member: unknown) => {
  if (!member || typeof member !== 'object') {
    return null
  }

  const sailing = (member as { user_sailing_v2?: unknown }).user_sailing_v2
  if (!sailing || typeof sailing !== 'object' || Object.keys(sailing).length === 0) {
    return null
  }

  const cardBg = (sailing as { card_bg?: unknown }).card_bg
  if (!cardBg || typeof cardBg !== 'object') {
    return null
  }

  const fan = (cardBg as { fan?: unknown }).fan
  if (!fan || typeof fan !== 'object' || !(fan as { is_fan?: boolean }).is_fan) {
    return null
  }

  let gradientStyle = ''
  const colorFormat = (fan as { color_format?: { colors?: string[]; gradients?: number[] } }).color_format
  if (Array.isArray(colorFormat?.colors) && Array.isArray(colorFormat.gradients)) {
    const colorStops = colorFormat.colors
      .map((color, index) => `${color} ${colorFormat.gradients?.[index] ?? 0}%`)
      .join(', ')
    gradientStyle = `linear-gradient(135deg, ${colorStops})`
  } else if (typeof (fan as { color?: unknown }).color === 'string') {
    gradientStyle = (fan as { color: string }).color
  }

  return {
    image: (cardBg as { image?: string | null }).image ?? null,
    numPrefix: typeof (fan as { num_prefix?: unknown }).num_prefix === 'string' ? (fan as { num_prefix: string }).num_prefix : '',
    numDesc: typeof (fan as { num_desc?: unknown }).num_desc === 'string' ? (fan as { num_desc: string }).num_desc : '',
    gradientStyle
  }
}
