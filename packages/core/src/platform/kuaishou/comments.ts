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
import type { KuaishouCommentItem } from 'template/types/platforms/kuaishou/comment'

import { Config } from '@/module/utils/Config'

/**
 * 处理快手评论数据。
 *
 * 这里不再拼 HTML，而是输出共享富文本 JSON，交给 template 侧渲染 React 节点。
 */
export const kuaishouComments = async (
  data: KsWorkComments,
  emojiData: RichTextEmojiDefinition[]
): Promise<KuaishouCommentItem[]> => {
  const rootComments = data?.data?.visionCommentList?.rootComments
  if (!Array.isArray(rootComments) || rootComments.length === 0) {
    return []
  }

  const comments = rootComments.map(comment => ({
    cid: comment.commentId,
    aweme_id: comment.commentId,
    nickname: comment.authorName,
    userimageurl: comment.headurl,
    text: buildKuaishouRichText(comment.content, emojiData),
    digg_count: comment.realLikedCount ?? (Number(comment.likedCount) || 0),
    create_time: comment.timestamp,
    reply_comment_total: comment.subCommentCount ?? 0
  }))

  return comments
    .sort((a, b) => b.digg_count - a.digg_count)
    .slice(0, Math.min(comments.length, Config.kuaishou.numcomment))
}

/**
 * 把快手评论正文解析成共享富文本 JSON。
 *
 * 当前主要兼容：
 * - `[表情]` 形式的平台表情；
 * - `@昵称(uid)` 形式的提及；
 * - 评论里的换行与空格。
 */
const buildKuaishouRichText = (
  text: string,
  emojiData: RichTextEmojiDefinition[]
): RichTextDocument => {
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

  return createRichTextDocument(nodes, { platform: 'kuaishou' })
}
