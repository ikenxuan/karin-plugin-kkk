import type { NoteComments } from '@ikenxuan/amagi'
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
import type {
  XiaohongshuCommentItem,
  XiaohongshuSubComment
} from 'template/types/platforms/xiaohongshu/comment'

import { Config } from '@/module/utils/Config'

/**
 * 处理小红书评论数据。
 *
 * 这里直接输出结构化评论 JSON，正文部分使用 richtext 文档，避免后端拼接 HTML。
 */
export const xiaohongshuComments = (
  data: NoteComments,
  emojiData: RichTextEmojiDefinition[]
): XiaohongshuCommentItem[] => {
  const rawComments = data?.data?.comments
  if (!Array.isArray(rawComments) || rawComments.length === 0) {
    return []
  }

  const comments = rawComments.map(comment => {
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
      sub_comments: buildXiaohongshuSubComments(comment.sub_comments, emojiData),
      show_tags: showTags,
      at_users: normalizeAtUsers(comment.at_users).map(item => item.text),
      status: comment.status
    }
  })

  return comments
    .sort((a, b) => Number(b.show_tags.includes('user_top')) - Number(a.show_tags.includes('user_top')))
    .slice(0, Config.xiaohongshu.numcomment)
}

const buildXiaohongshuSubComments = (
  subComments: NoteComments['data']['comments'][number]['sub_comments'],
  emojiData: RichTextEmojiDefinition[]
): XiaohongshuSubComment[] => {
  if (!Array.isArray(subComments)) {
    return []
  }

  return subComments.map(subComment => ({
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
    at_users: normalizeAtUsers(subComment.at_users).map(item => item.text),
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
  atUsers: unknown = [],
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

const normalizeTagNames = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) {
    return []
  }

  return tags
    .map(tag => {
      if (typeof tag === 'string') {
        return tag
      }

      if (tag && typeof tag === 'object') {
        const candidate = (tag as { name?: string; tag?: string }).name ?? (tag as { tag?: string }).tag
        return typeof candidate === 'string' ? candidate : ''
      }

      return ''
    })
    .filter(Boolean)
}

const normalizeAtUsers = (atUsers: unknown): Array<{ text: string; userId?: string }> => {
  if (!Array.isArray(atUsers)) {
    return []
  }

  return atUsers
    .map(item => {
      if (typeof item === 'string' && item.trim()) {
        const nickname = item.trim().replace(/^@/, '')
        return { text: `@${nickname}` }
      }

      if (item && typeof item === 'object') {
        const nickname = (item as { nickname?: string; user_info?: { nickname?: string } }).nickname
          ?? (item as { user_info?: { nickname?: string } }).user_info?.nickname
        const userId = (item as { user_id?: string; user_info?: { user_id?: string } }).user_id
          ?? (item as { user_info?: { user_id?: string } }).user_info?.user_id

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
