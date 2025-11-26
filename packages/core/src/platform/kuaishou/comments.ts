import { differenceInSeconds, format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

import { Config } from '@/module/utils/Config'

/**
 *
 * @param {*} data 完整的评论数据
 * @param {*} emojidata 处理过后的emoji列表
 * @returns obj
 */
export const kuaishouComments = async (data: any, emojidata: any) => {
  let jsonArray = []
  for (const i of data.data.visionCommentList.rootComments) {
    const cid = i.commentId
    const aweme_id = i.commentId
    const nickname = i.authorName
    const userimageurl = i.headurl
    const text = i.content
    const time = getRelativeTimeFromTimestamp(i.timestamp)
    const digg_count = Number(i.likedCount)
    const commentObj = {
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text,
      digg_count,
      create_time: time
    }
    jsonArray.push(commentObj)
  }

  // 按照点赞量降序
  jsonArray.sort((a, b) => b.digg_count - a.digg_count)
  // const indexLabelTypeOne = jsonArray.findIndex((comment) => comment.label_type === 1)
  // if (indexLabelTypeOne !== -1) {
  //   const commentTypeOne = jsonArray.splice(indexLabelTypeOne, 1)[0]
  //   jsonArray.unshift(commentTypeOne)
  // }

  jsonArray = br(jsonArray)
  jsonArray = await handling_at(jsonArray)
  // jsonArray.text = await search_text(jsonArray)

  for (const i of jsonArray) {
    if (i.digg_count > 10000) {
      i.digg_count = (i.digg_count / 10000).toFixed(1) + 'w'
    }
  }

  for (const item1 of jsonArray) {
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
  // 从数组前方开始保留 Config.kuaishou.kuaishounumcomments 条评论，自动移除数组末尾的评论
  return jsonArray.slice(0, Math.min(jsonArray.length, Config.kuaishou.numcomment))
}

/**
 * 将时间戳转换为相对时间字符串
 * @param timestamp 时间戳（毫秒）- 快手使用毫秒级时间戳
 * @returns 相对时间字符串
 */
const getRelativeTimeFromTimestamp = (timestamp: number): string => {
  const commentDate = new Date(timestamp) // 快手是毫秒级时间戳
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

/**
 * 处理换行符
 * @param data 评论数据
 * @returns
 */
export const br = (data: any) => {
  for (const i of data) {
    let text = i.text
    text = text.replace(/\n/g, '<br>')
    i.text = text
  }
  return data
}

/**
 * 处理 @
 * @param data 评论数据
 * @returns
 */
export const handling_at = (data: any) => {
  for (const i of data) {
    let text = i.text

    // 匹配 @后面的字符，允许空格，直到 (\w+\)
    text = text.replace(/(@[\S\s]+?)\(\w+\)/g, (match: any, p1: string) => {
      // 将 @后面的名字替换为带有样式的 <span>，保留空格
      return `<span style="color: rgb(3,72,141);">${p1.trim()}</span>`
    })

    i.text = text
  }
  return data
}
