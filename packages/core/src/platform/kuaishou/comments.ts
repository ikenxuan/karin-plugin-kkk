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

const getRelativeTimeFromTimestamp = (timestamp: number) => {
  // 快手是毫秒（ms）
  const timestampInSeconds = Math.floor(timestamp / 1000)
  const now = Math.floor(Date.now() / 1000)
  const differenceInSeconds = now - timestampInSeconds

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
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return year + '-' + month + '-' + day
  }
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
