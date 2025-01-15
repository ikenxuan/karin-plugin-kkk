import { getDouyinData } from '@ikenxuan/amagi'
import convert from 'heic-convert'

import { Common, Config, Networks } from '@/module/utils'

/**
 *
 * @param {*} data 完整的评论数据
 * @param {*} emojidata 处理过后的emoji列表
 * @returns obj
 */
export async function douyinComments (data: any, emojidata: any): Promise<any> {
  let jsonArray: any[] = []
  if (data.comments === null) return []

  for (let i = 0; i < data.comments.length; i++) {
    const cid = data.comments[i].cid
    const aweme_id = data.comments[i].aweme_id
    const nickname = data.comments[i].user.nickname
    const userimageurl = data.comments[i].user.avatar_larger.url_list[0]
    const text = data.comments[i].text
    const ip = data.comments[i].ip_label ? data.comments[i].ip_label : '未知'
    const time = data.comments[i].create_time
    const label_type = data.comments[i].label_type ? data.comments[i].label_type : -1
    const sticker = data.comments[i].sticker ? data.comments[i].sticker.animate_url.url_list[0] : null
    const digg_count = data.comments[i].digg_count
    const imageurl =
      data.comments[i].image_list &&
        data.comments[i].image_list[0] &&
        data.comments[i].image_list[0].origin_url &&
        data.comments[i].image_list[0].origin_url.url_list
        ? data.comments[i].image_list[0].origin_url.url_list[0]
        : null
    const status_label = data.comments[i].label_list ? data.comments[i].label_list[0].text : null
    const userintextlongid =
      data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].sec_uid
        ? data.comments[i].text_extra[0].sec_uid && data.comments[i].text_extra.map((extra: { sec_uid: string }) => extra.sec_uid)
        : null
    const search_text =
      data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].search_text
        ? data.comments[i].text_extra[0].search_text &&
        data.comments[i].text_extra.map((extra: { search_text: string; search_query_id: string }) => ({
          search_text: extra.search_text,
          search_query_id: extra.search_query_id
        }))
        : null
    const relativeTime = getRelativeTimeFromTimestamp(time)
    const reply_comment_total = data.comments[i].reply_comment_total
    const commentObj = {
      id: i + 1,
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
  jsonArray = await search_text(jsonArray)
  jsonArray = await heic2jpg(jsonArray)

  const CommentData = {
    jsonArray
  }

  for (const i of jsonArray) {
    if (i.digg_count > 10000) {
      i.digg_count = (i.digg_count / 10000).toFixed(1) + 'w'
    }
  }

  for (const item1 of CommentData.jsonArray) {
    // 遍历emojidata中的每个元素
    for (const item2 of emojidata) {
      // 如果jsonArray中的text包含在emojidata中的name中
      if (item1.text.includes(item2.name)) {
        // 检查是否存在中括号
        if (item1.text.includes('[') && item1.text.includes(']')) {
          item1.text = item1.text.replace(/\[[^\]]*\]/g, `<img src="${item2.url}"/>`).replace(/\\/g, '')
        } else {
          item1.text = `<img src="${item2.url}"/>`
        }
        item1.text += '&#160'
      }
    }
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
        const UserInfoData = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: secUid })
        if (UserInfoData.user.sec_uid === secUid) {
          /** 这里评论只要生成了艾特，如果艾特的人改了昵称，评论也不会变，所以可能会出现有些艾特没有正确上颜色，因为接口没有提供历史昵称 */
          const regex = new RegExp(`@${UserInfoData.user.nickname?.replace(/[-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')}`, 'g')
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
 * 高亮热点搜索关键词
 * @param data 评论数据
 * @returns
 */
async function search_text (data: {
  id: number
  cid: any
  aweme_id: any
  nickname: any
  userimageurl: any
  text: any
  digg_count: any
  ip_label: any
  create_time: string
  commentimage: any
  label_type: any
  sticker: any
  status_label: any
  is_At_user_id: any
  search_text: any
  reply_comment_total: any
}[]): Promise<any> {
  for (const item of data) {
    if (item.search_text !== null && Array.isArray(item.search_text)) {
      for (const search_text of item.search_text) {
        const SuggestWordsData = await getDouyinData('热点词数据', Config.cookies.douyin, { query: search_text.search_text })
        if (
          SuggestWordsData.data &&
          SuggestWordsData.data[0] &&
          SuggestWordsData.data[0].params &&
          SuggestWordsData.data[0].params.query_id &&
          SuggestWordsData.data[0].params.query_id === search_text.search_query_id
        ) {
          const regex = new RegExp(`${search_text.search_text}`, 'g')
          item.text = item.text.replace(regex, (match: any) => {
            const themeClass = Common.useDarkTheme() ? 'dark-mode' : ''
            return `<span class="search_text ${themeClass}">
                ${match}
                <span class="search-ico"></span>
            </span>&nbsp;&nbsp;&nbsp;`
          })
        }
      }
    }
  }
  return data
}

/**
 * 换行符转义为<br>
 * @param data 评论数据
 * @returns
 */
function br (data: any[]): any[] {
  for (const i of data) {
    let text = i.text

    text = text.replace(/\n/g, '<br>')
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
        const jpegBuffer = await convert({
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
