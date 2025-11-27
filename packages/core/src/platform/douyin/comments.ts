import { differenceInSeconds, format, formatDistanceToNow, fromUnixTime } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import convert from 'heic-convert'
import { DouyinCommentProps } from 'template/types/platforms/douyin'

import { Common, Networks } from '@/module/utils'
import { getDouyinData } from '@/module/utils/amagiClient'


/**
 * 处理评论中的表情
 * @param text 原始文本
 * @param emojiData 表情数据
 * @returns 处理后的文本
 */
const processCommentEmojis = (text: string, emojiData: any): string => {
  if (!text || !emojiData || !Array.isArray(emojiData)) {
    return text
  }

  let processedText = text

  // 遍历表情数据，替换文本中的表情
  for (const emoji of emojiData) {
    if (emoji.name && emoji.url && processedText.includes(emoji.name)) {
      // 使用正则表达式进行全局替换，确保特殊字符被正确转义
      const escapedName = emoji.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escapedName, 'g')
      processedText = processedText.replace(regex, `<img src="${emoji.url}" alt="${emoji.name}" />`)
    }
  }

  // 处理表情和文本混合的情况，将非表情文本用span包裹
  // 先分割文本，区分表情和普通文本
  const parts = processedText.split(/(<img[^>]*>)/)

  const wrappedParts = parts.map(part => {
    // 如果是img标签（表情），直接返回
    if (part.startsWith('<img')) {
      return part
    }
    // 如果是普通文本且不为空，用span包裹
    if (part.trim()) {
      return `<span>${part}</span>`
    }
    return part
  })

  return wrappedParts.join('')
}

/**
 * 处理单个评论文本的换行符和空格
 * @param text 原始文本
 * @returns 处理后的文本
 */
const processTextFormatting = (text: string): string => {
  // 处理换行符
  let processedText = text.replace(/\n/g, '<br>')
  // 处理多个连续空格，将两个或更多连续空格替换为&nbsp;
  processedText = processedText.replace(/ {2,}/g, (match: string) => {
    return '&nbsp;'.repeat(match.length)
  })
  return processedText
}

/**
 * 处理单个评论的@用户高亮
 * @param text 评论文本
 * @param userIds @的用户ID列表
 * @returns 处理后的文本
 */
const processAtUsers = async (text: string, userIds: string[] | null): Promise<string> => {
  if (!userIds || !Array.isArray(userIds)) {
    return text
  }

  const atColor = Common.useDarkTheme() ? '#face15' : '#04498d'
  let processedText = text
  for (const secUid of userIds) {
    const UserInfoData = await getDouyinData('用户主页数据', { sec_uid: secUid, typeMode: 'strict' })
    if (UserInfoData.data.user.sec_uid === secUid) {
      /** 这里评论只要生成了艾特，如果被艾特的人改了昵称，评论也不会变，所以可能会出现有些艾特没有正确上颜色，因为接口没有提供历史昵称 */
      const regex = new RegExp(`@${UserInfoData.data.user.nickname?.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'g')

      processedText = processedText.replace(regex, match => {
        return `<span style="color: ${atColor};">${match}</span>`
      })
    }
  }
  return processedText
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
    const jpegBuffer = await convert({
      buffer: response.data,
      format: 'JPEG'
    })
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
export const douyinComments = async (data: any, emojidata: any) => {
  let jsonArray: any[] = []
  let imageUrls: string[] = []
  if (data.data.comments === null) return { CommentsData: [], image_url: [] }
  let id = 1
  for (const comment of data.data.comments) {
    const cid = comment.cid
    const aweme_id = comment.aweme_id
    const nickname = comment.user.nickname
    const userimageurl = comment.user.avatar_thumb.url_list[0]
    let text = comment.text
    const ip = comment.ip_label ?? '未知'
    const time = comment.create_time
    const label_type = comment.label_type ?? -1
    const sticker = comment.sticker ? comment.sticker.animate_url.url_list[0] : null
    let digg_count = comment.digg_count
    const imageurl =
      comment.image_list &&
        comment.image_list?.[0] &&
        comment.image_list?.[0].origin_url &&
        comment.image_list?.[0].origin_url.url_list
        ? comment.image_list?.[0].origin_url.url_list[0]
        : null
    const status_label = comment.label_list?.[0]?.text ?? null
    const userintextlongid =
      comment.text_extra && comment.text_extra[0] && comment.text_extra[0].sec_uid
        ? comment.text_extra.map((extra: { sec_uid: string }) => extra.sec_uid)
        : null
    const search_text =
      comment.text_extra && comment.text_extra[0] && comment.text_extra[0].search_text
        ? comment.text_extra[0].search_text &&
        comment.text_extra.map((extra: { search_text: string; search_query_id: string }) => ({
          search_text: extra.search_text,
          search_query_id: extra.search_query_id
        }))
        : null
    const relativeTime = getRelativeTimeFromTimestamp(time)

    // 在循环中处理文本格式化（换行符和空格）
    text = processTextFormatting(text)

    // 在循环中处理@用户高亮
    text = await processAtUsers(text, userintextlongid)

    // 在循环中处理表情
    text = processCommentEmojis(text, emojidata)

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

    // 在循环中处理点赞数格式化
    if (digg_count > 10000) {
      digg_count = (digg_count / 10000).toFixed(1) + 'w'
    }

    const replyComment = await getDouyinData('指定评论回复数据', {
      aweme_id,
      comment_id: cid,
      typeMode: 'strict',
      number: 2
    })

    let replyText = ''
    let replyImageList: string[] | null = null
    if (replyComment.data.comments.length > 0) {
      const firstReplyComment = replyComment.data.comments[0] as any
      const replyUserintextlongid =
        firstReplyComment.text_extra && firstReplyComment.text_extra[0] && firstReplyComment.text_extra[0].sec_uid
          ? firstReplyComment.text_extra.map((extra: any) => extra.sec_uid!)
          : null
      replyText = await processAtUsers(firstReplyComment.text, replyUserintextlongid)
      
      // 处理回复评论的图片列表
      const replyImageUrl = firstReplyComment.image_list?.[0]?.origin_url?.url_list?.[0]
      const replyStickerUrl = firstReplyComment.sticker?.animate_url?.url_list?.[0]
      
      if (replyImageUrl) {
        replyImageList = [replyImageUrl]
      } else if (replyStickerUrl) {
        replyImageList = [replyStickerUrl]
      }
    }
    const firstReplyComment = replyComment.data.comments.length > 0 ? replyComment.data.comments[0] as any : null
    const commentObj: DouyinCommentProps['data']['CommentsData'][number] = {
      id: id++,
      replyComment: firstReplyComment ? {
        create_time: getRelativeTimeFromTimestamp(firstReplyComment.create_time),
        nickname: firstReplyComment.user.nickname,
        userimageurl: firstReplyComment.user.avatar_thumb.url_list[0],
        text: processCommentEmojis(replyText, emojidata),
        digg_count: firstReplyComment.digg_count > 10000
          ? (firstReplyComment.digg_count / 10000).toFixed(1) + 'w'
          : firstReplyComment.digg_count,
        ip_label: firstReplyComment.ip_label,
        text_extra: firstReplyComment.text_extra,
        label_text: firstReplyComment.label_text,
        image_list: replyImageList
      } : undefined,
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text,
      digg_count,
      ip_label: ip,
      create_time: relativeTime,
      commentimage: processedImageUrl ?? undefined,
      label_type,
      sticker: sticker ?? undefined,
      status_label: status_label ?? undefined,
      is_At_user_id: userintextlongid,
      search_text,
      is_author_digged: comment.is_author_digged ?? false
    }
    jsonArray.push(commentObj)
  }

  jsonArray.sort((a, b) => {
    // 由于digg_count可能已经是字符串格式，需要重新处理排序
    const aCount = typeof a.digg_count === 'string' && a.digg_count.includes('w')
      ? parseFloat(a.digg_count) * 10000
      : typeof a.digg_count === 'number' ? a.digg_count : 0
    const bCount = typeof b.digg_count === 'string' && b.digg_count.includes('w')
      ? parseFloat(b.digg_count) * 10000
      : typeof b.digg_count === 'number' ? b.digg_count : 0
    return bCount - aCount
  })

  const indexLabelTypeOne = jsonArray.findIndex((comment) => comment.label_type === 1)

  if (indexLabelTypeOne !== -1) {
    const commentTypeOne = jsonArray.splice(indexLabelTypeOne, 1)[0]
    jsonArray.unshift(commentTypeOne)
  }

  return {
    CommentsData: jsonArray,
    image_url: imageUrls
  }
}

/**
 * 将时间戳转换为相对时间字符串
 * @param timestamp 时间戳（秒）
 * @returns 相对时间字符串
 */
const getRelativeTimeFromTimestamp = (timestamp: number): string => {
  const commentDate = fromUnixTime(timestamp)
  const diffSeconds = differenceInSeconds(new Date(), commentDate)

  // 30秒内显示"刚刚"
  if (diffSeconds < 30) {
    return '刚刚'
  }
  
  // 三个月内使用相对时间
  if (diffSeconds < 7776000) {
    return formatDistanceToNow(commentDate, { 
      locale: zhCN, 
      addSuffix: true 
    })
  }
  
  // 超过三个月，显示具体日期
  return format(commentDate, 'yyyy-MM-dd')
}