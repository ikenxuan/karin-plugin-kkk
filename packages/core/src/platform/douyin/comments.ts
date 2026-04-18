import { DyWorkComments, Result } from '@ikenxuan/amagi'
import {
  createEmojiNode,
  createLineBreakNode,
  createMentionNode,
  createRichTextDocument,
  createSearchKeywordNode,
  createTextNode,
  type RichTextDocument,
  type RichTextEmojiDefinition,
  type RichTextNode
} from '@kkk/richtext'
import decode from 'heic-decode'
import jpeg from 'jpeg-js'
import type { DouyinCommentProps } from 'template/types/platforms/douyin'

import { Networks } from '@/module/utils'
import { douyinFetcher } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'


/**
 * @description 提取评论里的 @ 用户 sec_uid 列表
 */
const extractMentionSecUids = (textExtra: unknown): string[] | null => {
  if (!Array.isArray(textExtra) || textExtra.length === 0) {
    return null
  }

  const secUids = textExtra
    .filter((item): item is { sec_uid?: string } => typeof item === 'object' && item !== null)
    .map(item => item.sec_uid)
    .filter((secUid): secUid is string => Boolean(secUid))

  return secUids.length > 0 ? secUids : null
}

/**
 * @description 解析评论中的搜索词信息
 */
const extractSearchText = (textExtra: unknown) => {
  if (!Array.isArray(textExtra) || textExtra.length === 0) {
    return null
  }

  const searchItems = textExtra
    .filter((item): item is { search_text?: string; search_query_id?: string } => typeof item === 'object' && item !== null)
    .filter(item => Boolean(item.search_text))
    .map(item => ({
      search_text: item.search_text!,
      search_query_id: item.search_query_id ?? ''
    }))

  return searchItems.length > 0 ? searchItems : null
}

type DouyinSearchToken = {
  start: number
  end: number
  text: string
  queryId: string
}

type DouyinMentionToken = {
  text: string
  userId: string
}

type DouyinCommentItem = DouyinCommentProps['data']['CommentsData'][number]
type DouyinReplyCommentItem = NonNullable<DouyinCommentItem['replyComment']>[number]

/**
 * 提取评论正文中的搜索词范围。
 *
 * 抖音会把高亮搜索词单独放在 `text_extra` 里，但用户实际看到的是“正文里某一段文字高亮”。
 * 所以这里不能只把它单独透传给 template，而是要把范围信息重新合回正文解析流程里。
 */
const extractSearchTokens = (textExtra: unknown, text: string): DouyinSearchToken[] => {
  if (!Array.isArray(textExtra) || textExtra.length === 0 || !text) {
    return []
  }

  return textExtra
    .filter((item): item is {
      start?: number
      end?: number
      search_text?: string
      search_query_id?: string
    } => typeof item === 'object' && item !== null)
    .filter((item): item is {
      start: number
      end: number
      search_text: string
      search_query_id?: string
    } => (
      typeof item.start === 'number' &&
      typeof item.end === 'number' &&
      typeof item.search_text === 'string' &&
      item.search_text.length > 0 &&
      item.start >= 0 &&
      item.end > item.start &&
      item.end <= text.length
    ))
    .map(item => ({
      start: item.start,
      end: item.end,
      text: item.search_text,
      queryId: item.search_query_id ?? ''
    }))
    .filter(item => text.slice(item.start, item.end) === item.text)
    .sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start))
}

/**
 * 根据抖音 `sec_uid` 反查当前昵称，生成文本中可匹配的 @ 标记。
 *
 * 抖音评论正文里通常只保留 `@昵称` 文本，稳定用户 ID 在 `text_extra` 里。
 * 这里先把 ID 转成 `@昵称 + userId`，后续解析时才能把普通文本切成 mention 节点。
 */
const resolveMentionTokens = async (userIds: string[] | null): Promise<DouyinMentionToken[]> => {
  if (!userIds || userIds.length === 0) {
    return []
  }

  const uniqueUserIds = [...new Set(userIds)]

  const mentionTokens = await Promise.all(uniqueUserIds.map(async (secUid) => {
    try {
      const userInfo = await douyinFetcher.fetchUserProfile({ sec_uid: secUid, typeMode: 'strict' })
      const nickname = userInfo.data.user.nickname?.trim()

      if (!nickname || userInfo.data.user.sec_uid !== secUid) {
        return null
      }

      return {
        text: `@${nickname}`,
        userId: secUid
      }
    } catch {
      return null
    }
  }))

  return mentionTokens
    .filter((item): item is DouyinMentionToken => Boolean(item))
    .sort((a, b) => b.text.length - a.text.length)
}

/**
 * 把抖音评论原始文本解析成共享富文本 JSON。
 *
 * 这里刻意不拼 HTML：
 * - 普通文本原样放进 text 节点，由 React 渲染时自动转义。
 * - 换行符转成 lineBreak 节点，保留原来的视觉换行。
 * - 平台表情转成 emoji 节点，图片 URL 交给 template 侧渲染器再做协议白名单。
 * - @ 用户转成 mention 节点，template 侧只负责套样式。
 */
const buildDouyinRichText = async (
  text: string,
  emojiData: RichTextEmojiDefinition[],
  mentionUserIds: string[] | null,
  searchTokens: DouyinSearchToken[] = []
): Promise<RichTextDocument> => {
  const mentionTokens = await resolveMentionTokens(mentionUserIds)
  const emojiTokens = emojiData
    .filter(item => Boolean(item?.name) && Boolean(item?.url))
    .sort((a, b) => b.name.length - a.name.length)

  const nodes: RichTextNode[] = []
  let buffer = ''
  let index = 0

  const pushBuffer = () => {
    if (buffer.length > 0) {
      nodes.push(createTextNode(buffer))
      buffer = ''
    }
  }

  let searchTokenIndex = 0

  while (index < text.length) {
    while (searchTokens[searchTokenIndex] && searchTokens[searchTokenIndex].start < index) {
      searchTokenIndex += 1
    }

    const currentSearchToken = searchTokens[searchTokenIndex]
    if (currentSearchToken && currentSearchToken.start === index) {
      pushBuffer()
      nodes.push(createSearchKeywordNode(currentSearchToken.text, currentSearchToken.queryId))
      index = currentSearchToken.end
      searchTokenIndex += 1
      continue
    }

    if (text[index] === '\r') {
      pushBuffer()
      if (text[index + 1] === '\n') {
        index += 2
      } else {
        index += 1
      }
      nodes.push(createLineBreakNode())
      continue
    }

    if (text[index] === '\n') {
      pushBuffer()
      nodes.push(createLineBreakNode())
      index += 1
      continue
    }

    const matchedMention = mentionTokens.find(item => text.startsWith(item.text, index))
    if (matchedMention) {
      pushBuffer()
      nodes.push(createMentionNode(matchedMention.text, matchedMention.userId))
      index += matchedMention.text.length
      continue
    }

    const matchedEmoji = emojiTokens.find(item => text.startsWith(item.name, index))
    if (matchedEmoji) {
      pushBuffer()
      nodes.push(createEmojiNode(matchedEmoji.name, matchedEmoji.url))
      index += matchedEmoji.name.length
      continue
    }

    buffer += text[index]
    index += 1
  }

  pushBuffer()

  return createRichTextDocument(nodes, { platform: 'douyin' })
}

/**
 * 处理单个评论图片的HEIC转JPG
 * @param imageUrl 图片URL
 * @returns 处理后的图片URL
 */
const processCommentImage = async (imageUrl: string | null): Promise<string | null> => {
  if (!imageUrl) return null

  const headers = await new Networks({ url: imageUrl, type: 'arraybuffer' }).getHeaders()
  if (headers['content-type'] && headers['content-type'] === 'image/heic') {
    const response = await new Networks({ url: imageUrl, type: 'arraybuffer' }).returnResult()
    
    // 使用 heic-decode 解码 HEIC 图片
    const decoded = await decode({ buffer: response.data })
    
    // 使用 jpeg-js 将 RGBA 数据编码为 JPEG
    const jpegImageData = {
      data: Buffer.from(decoded.data),
      width: decoded.width,
      height: decoded.height
    }
    const jpegBuffer = jpeg.encode(jpegImageData, 90).data
    
    const base64Image = Buffer.from(jpegBuffer).toString('base64')
    return `data:image/jpeg;base64,${base64Image}`
  }
  return imageUrl
}

/**
 *
 * @param {*} data 完整的评论数据
 * @param {*} emojidata 处理过后的emoji列表
 * @returns obj
 */
export const douyinComments = async (data: Result<DyWorkComments>, emojidata: any) => {
  const commentsData: DouyinCommentItem[] = []
  let imageUrls: string[] = []
  if (data.data.comments === null) return { CommentsData: [], image_url: [] }
  let id = 1
  for (const comment of data.data.comments) {
    const cid = comment.cid
    const aweme_id = comment.aweme_id
    const nickname = comment.user.nickname
    const userimageurl = comment.user.avatar_thumb.url_list[0]
    const text = comment.text
    const ip = comment.ip_label ?? '未知'
    const label_type = comment.label_type ?? -1
    const sticker = comment.sticker ? comment.sticker.animate_url.url_list[0] : null
    const digg_count = comment.digg_count
    const imageurl =
      comment.image_list &&
        comment.image_list?.[0] &&
        comment.image_list?.[0].origin_url &&
        comment.image_list?.[0].origin_url.url_list
        ? comment.image_list?.[0].origin_url.url_list[0]
        : null
    const status_label = comment.label_list?.[0]?.text ?? null
    const userintextlongid = extractMentionSecUids(comment.text_extra)
    const search_text = extractSearchText(comment.text_extra)
    const searchTokens = extractSearchTokens(comment.text_extra, text)
    const richText = await buildDouyinRichText(text, emojidata, userintextlongid, searchTokens)

    // 在循环中处理图片HEIC转JPG
    const processedImageUrl = await processCommentImage(imageurl)

    // 收集评论图片
    if (processedImageUrl) {
      imageUrls.push(processedImageUrl.startsWith('data:image/jpeg;base64,') ? `base64://${processedImageUrl.replace('data:image/jpeg;base64,', '')}` : processedImageUrl)
    }

    // 收集表情包图片
    if (sticker) {
      imageUrls.push(sticker)
    }

    const replyComment = await douyinFetcher.fetchCommentReplies({
      aweme_id,
      comment_id: cid,
      typeMode: 'strict',
      number: Config.douyin.subCommentLimit
    })

    const replyComments: DouyinReplyCommentItem[] = []

    if (replyComment.data.comments && replyComment.data.comments.length > 0) {
      for (const reply of replyComment.data.comments) {
        const replyItem = reply
        const replyUserintextlongid =
          extractMentionSecUids(replyItem.text_extra)
        const replySearchTokens = extractSearchTokens(replyItem.text_extra, replyItem.text)
        const replyRichText = await buildDouyinRichText(replyItem.text, emojidata, replyUserintextlongid, replySearchTokens)

        // 处理回复评论的图片列表
        const replyImageUrl = (replyItem as any).image_list?.[0]?.origin_url?.url_list?.[0]
        const replyStickerUrl = replyItem.sticker?.animate_url?.url_list?.[0]

        let replyImageList: string[] | null = null
        if (replyImageUrl) {
          const processedReplyImage = await processCommentImage(replyImageUrl)
          if (processedReplyImage) {
            replyImageList = [processedReplyImage]
            imageUrls.push(processedReplyImage.startsWith('data:image/jpeg;base64,') ? `base64://${processedReplyImage.replace('data:image/jpeg;base64,', '')}` : processedReplyImage)
          }
        } else if (replyStickerUrl) {
          replyImageList = [replyStickerUrl]
          imageUrls.push(replyStickerUrl)
        }

        replyComments.push({
          create_time: replyItem.create_time,
          nickname: replyItem.user.nickname,
          userimageurl: replyItem.user.avatar_thumb.url_list[0],
          text: replyRichText,
          digg_count: replyItem.digg_count,
          ip_label: replyItem.ip_label,
          text_extra: replyItem.text_extra,
          label_text: replyItem.label_text,
          image_list: replyImageList,
          cid: replyItem.cid,
          reply_to_reply_id: replyItem.reply_to_reply_id,
          reply_to_username: replyItem.reply_to_username
        })
      }
    }

    const commentObj: DouyinCommentProps['data']['CommentsData'][number] = {
      id: id++,
      replyComment: replyComments.length > 0 ? replyComments : undefined,
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text: richText,
      digg_count,
      ip_label: ip,
      create_time: comment.create_time,
      commentimage: processedImageUrl ?? undefined,
      label_type,
      sticker: sticker ?? undefined,
      status_label: status_label ?? undefined,
      is_At_user_id: userintextlongid,
      search_text,
      is_author_digged: comment.is_author_digged ?? false
    }
    commentsData.push(commentObj)
  }

  commentsData.sort((a, b) => b.digg_count - a.digg_count)

  const indexLabelTypeOne = commentsData.findIndex((comment) => comment.label_type === 1)

  if (indexLabelTypeOne !== -1) {
    const authorComment = commentsData.splice(indexLabelTypeOne, 1)[0]
    commentsData.unshift(authorComment)
  }

  return {
    CommentsData: commentsData,
    image_url: imageUrls
  }
}
