import { Common } from '@/module'
import { Config } from '@/module/utils/Config'

/**
 * 处理Bilibili评论数据
 * @param commentsData 原始评论数据
 * @param host_mid UP主的ID
 * @returns 处理后的评论数据数组
 */
export function bilibiliComments (commentsData: any, host_mid: string) {
  if (!commentsData) return []
  let jsonArray: any[] = []
  if (commentsData.code === 404) {
    return null
  }

  // 处理置顶评论
  if (commentsData.data.top && commentsData.data.top.upper) {
    const topReply = commentsData.data.top.upper
    const ctime = getRelativeTimeFromTimestamp(topReply.ctime)
    const emote = topReply.content.emote
    let message = topReply.content.message
    if (message && emote) message = emoteToUrl(message, emote)
    const avatar = topReply.member.avatar
    const frame = topReply.member.pendant.image
    const uname = checkvip(topReply.member)
    const level = topReply.member.level_info.current_level
    const vipstatus = topReply.member.vip.status
    const like = topReply.like
    const replylength = topReply.rcount
    const location = topReply.reply_control?.location?.replace('IP属地：', '') ?? ''
    const img_src =
      topReply.content &&
        topReply.content.pictures &&
        topReply.content.pictures.length > 0
        ? topReply.content.pictures[0].img_src
        : null
    const members = topReply.content.members
    const isUP = topReply.mid_str === host_mid

    const obj = {
      id: 0,
      ctime,
      message,
      avatar,
      frame,
      uname,
      level,
      vipstatus,
      img_src,
      replylength,
      location,
      like,
      icon_big_vip: vipstatus === 1 ? 'https://i0.hdslb.com/bfs/seed/jinkela/short/user-avatar/big-vip.svg' : null,
      members,
      isTop: true,
      isUP
    }

    jsonArray.push(obj)
  }

  // 处理普通评论
  for (const [i, reply] of commentsData.data.replies.entries()) {
    const ctime = getRelativeTimeFromTimestamp(reply.ctime)
    const emote = reply.content.emote
    let message = reply.content.message
    if (message && emote) message = emoteToUrl(message, emote)
    const avatar = reply.member.avatar
    const frame = reply.member.pendant.image
    const uname = checkvip(reply.member)
    const level = reply.member.level_info.current_level
    const vipstatus = reply.member.vip.vipStatus
    const like = reply.like
    const replylength = reply.rcount
    const location = reply.reply_control?.location?.replace('IP属地：', '') ?? ''
    const img_src =
      reply.content &&
        reply.content.pictures &&
        reply.content.pictures.length > 0
        ? reply.content.pictures[0].img_src
        : null
    const members = reply.content.members
    const isUP = reply.mid_str === host_mid

    const obj = {
      id: i + 1,
      ctime,
      message,
      avatar,
      frame,
      uname,
      level,
      vipstatus,
      img_src,
      replylength,
      location,
      like,
      icon_big_vip: vipstatus === 1 ? 'https://i0.hdslb.com/bfs/seed/jinkela/short/user-avatar/big-vip.svg' : null,
      members,
      isTop: false,
      isUP
    }

    jsonArray.push(obj)
  }

  // 按点赞数排序，但置顶评论始终在前面
  jsonArray.sort((a, b) => {
    if (a.isTop && !b.isTop) return -1
    if (!a.isTop && b.isTop) return 1
    if (a.isTop && b.isTop) return 0
    return b.like - a.like
  })

  /** 对评论点赞数过万整除 */
  for (const i of jsonArray) {
    if (i.like > 10000) {
      i.like = (i.like / 10000).toFixed(1) + 'w'
    }
  }
  jsonArray = space(jsonArray)

  /** 匹配被艾特的用户 */
  for (const comment of jsonArray) {
    let originalText = comment.message
    if (comment.members && comment.members.length > 0) {
      for (const member of comment.members) {
        // 构建正则表达式，匹配被艾特的用户
        const regex = new RegExp(`@${member.uname}`, 'g')
        originalText = originalText.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};">@${member.uname}</span>`)
      }
    }

    // 更新评论内容为处理后的文本
    comment.message = originalText
  }

  let res
  res = br(jsonArray)
  res = [...res.filter((c: any) => c.isTop), ...res.filter((c: any) => !c.isTop)].slice(0, Config.bilibili.numcomment)

  return res as any
}

/** 检查评论是否带表情，是则添加img标签 */
const emoteToUrl = (message: any, emote: any) => {
  // 遍历 emote 对象的键
  for (const key in emote) {
    if (Object.prototype.hasOwnProperty.call(emote, key)) { // 确保是对象自身的属性
      // 如果message中有对应的表情包名，替换为图片标签
      if (message.includes(key)) {
        if (message.includes('[') && message.includes(']')) {
          message = message.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `<img src="${emote[key].url}"/>`)
        }
      }
    }
  }
  return message
}

/** 替换空格 */
function space (data: any) {
  for (const i in data) {
    if (data[i].message) {
      data[i].message = data[i].message.replace(/ /g, ' ') // 替换空格
    }
  }
  return data
}

/** 换行符转<br> */
function br (data: any) {
  for (const i in data) {
    let message = data[i].message

    message = message?.replace(/\n/g, '<br>')
    data[i].message = message
  }
  return data
}

/** 检查是否大会员 */
function checkvip (member: any) {
  return member.vip.vipStatus === 1
    ? `<span style="color: ${member.vip.nickname_color ?? '#FB7299'}; font-weight: 700;">${member.uname}</span>`
    : `<span style="color: #888">${member.uname}</span>`
}

/** 返回创建时间 */
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
