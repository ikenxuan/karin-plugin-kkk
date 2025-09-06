import { getDouyinData } from '@ikenxuan/amagi'
import * as convert from 'heic-convert'

import { Common, Networks } from '@/module/utils'
import { Config } from '@/module/utils/Config'

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
 *
 * @param {*} data 完整的评论数据
 * @param {*} emojidata 处理过后的emoji列表
 * @returns obj
 */
export async function douyinComments (data: any, emojidata: any): Promise<any> {
  let jsonArray: any[] = []
  if (data.data.comments === null) return []

  let id = 1
  for (const comment of data.data.comments) {
    const cid = comment.cid
    const aweme_id = comment.aweme_id
    const nickname = comment.user.nickname
    const userimageurl = comment.user.avatar_thumb.url_list[0]
    const text = comment.text
    const ip = comment.ip_label ?? '未知'
    const time = comment.create_time
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
    const userintextlongid =
      comment.text_extra && comment.text_extra[0] && comment.text_extra[0].sec_uid
        ? comment.text_extra[0].sec_uid && comment.text_extra.map((extra: { sec_uid: string }) => extra.sec_uid)
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
    const reply_comment_total = comment.reply_comment_total
    const commentObj = {
      id: id++,
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text,
      digg_count,
      ip_label: ip,
      create_time: relativeTime,
      commentimage: imageurl,
      label_type,
      sticker,
      status_label,
      is_At_user_id: userintextlongid,
      search_text,
      reply_comment_total
    }
    jsonArray.push(commentObj)
  }

  jsonArray.sort((a, b) => b.digg_count - a.digg_count)
  const indexLabelTypeOne = jsonArray.findIndex((comment) => comment.label_type === 1)

  if (indexLabelTypeOne !== -1) {
    const commentTypeOne = jsonArray.splice(indexLabelTypeOne, 1)[0]
    jsonArray.unshift(commentTypeOne)
  }

  jsonArray = br(jsonArray)
  jsonArray = await handling_at(jsonArray)
  jsonArray = await heic2jpg(jsonArray)

  const CommentData = {
    jsonArray
  }

  for (const i of jsonArray) {
    if (i.digg_count > 10000) {
      i.digg_count = (i.digg_count / 10000).toFixed(1) + 'w'
    }
  }

  // 使用新的表情处理方法
  for (const item of CommentData.jsonArray) {
    item.text = processCommentEmojis(item.text, emojidata)
  }

  return CommentData
}

function getRelativeTimeFromTimestamp (timestamp: number) {
  const now = Math.floor(Date.now() / 1000) // 当前时间的时间戳
  const differenceInSeconds = now - timestamp

  if (differenceInSeconds < 30) {
    return '刚刚'
  } else if (differenceInSeconds < 60) {
    return differenceInSeconds + '秒前'
  } else if (differenceInSeconds < 3600) {
    return Math.floor(differenceInSeconds / 60) + '分钟前'
  } else if (differenceInSeconds < 86400) {
    return Math.floor(differenceInSeconds / 3600) + '小时前'
  } else if (differenceInSeconds < 2592000) {
    return Math.floor(differenceInSeconds / 86400) + '天前'
  } else if (differenceInSeconds < 7776000) {
    // 三个月的秒数
    return Math.floor(differenceInSeconds / 2592000) + '个月前'
  } else {
    const date = new Date(timestamp * 1000) // 将时间戳转换为毫秒
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return year + '-' + month + '-' + day
  }
}

/**
 * 高亮 @ 的内容
 * @param data 评论数据
 * @returns
 */
async function handling_at (data: any[]): Promise<any> {
  for (const item of data) {
    if (item.is_At_user_id !== null && Array.isArray(item.is_At_user_id)) {
      for (const secUid of item.is_At_user_id) {
        const UserInfoData = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: secUid, typeMode: 'strict' })
        if (UserInfoData.data.user.sec_uid === secUid) {
          /** 这里评论只要生成了艾特，如果艾特的人改了昵称，评论也不会变，所以可能会出现有些艾特没有正确上颜色，因为接口没有提供历史昵称 */
          const regex = new RegExp(`@${UserInfoData.data.user.nickname?.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'g')

          item.text = item.text.replace(regex, (match: any) => {
            return `<span class="${Common.useDarkTheme() ? 'dark-mode handling_at' : 'handling_at'}">${match}</span>`
          })
        }
      }
    }
  }
  return data
}

/**
 * 换行符转义为<br>，多个空格转义为&nbsp;
 * @param data 评论数据
 * @returns
 */
function br (data: any[]): any[] {
  for (const i of data) {
    let text = i.text

    // 处理换行符
    text = text.replace(/\n/g, '<br>')
    // 处理多个连续空格，将两个或更多连续空格替换为&nbsp;
    text = text.replace(/ {2,}/g, (match: string) => {
      return '&nbsp;'.repeat(match.length)
    })
    i.text = text
  }
  return data
}

/**
 * HEIC转JPG
 * @param jsonArray 评论数据
 * @returns
 */
const heic2jpg = async (jsonArray: any[]): Promise<any> => {
  for (const item of jsonArray) {
    if (item.commentimage) {
      const headers = await new Networks({ url: item.commentimage, type: 'arraybuffer' }).getHeaders()
      if (headers['content-type'] && headers['content-type'] === 'image/heic') {
        const response = await new Networks({ url: item.commentimage, type: 'arraybuffer' }).returnResult()
        const jpegBuffer = await convert.default({
          buffer: response.data,
          format: 'JPEG'
        })
        const base64Image = Buffer.from(jpegBuffer).toString('base64')
        item.commentimage = `data:image/jpeg;base64,${base64Image}`
      }
    }
  }
  return jsonArray
}
