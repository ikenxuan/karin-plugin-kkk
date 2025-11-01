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
      // 不在 alt 中包含表情名称，避免嵌套问题
      processedText = processedText.replace(regex, `<img src="${emoji.url}" alt="" />`)
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
 * 处理评论中的@用户
 * @param text 原始文本
 * @param atUsers @用户列表
 * @param useDarkTheme 是否使用深色主题
 * @returns 处理后的文本
 */
const processAtUsers = (text: string, atUsers: any[], useDarkTheme: boolean = false): string => {
  if (!text || !atUsers || !Array.isArray(atUsers) || atUsers.length === 0) {
    return text
  }

  let processedText = text

  // 遍历@用户列表，替换文本中的@用户昵称
  for (const atUser of atUsers) {
    if (atUser.nickname && processedText.includes(`@${atUser.nickname}`)) {
      // 使用正则表达式进行全局替换，确保特殊字符被正确转义
      const escapedNickname = atUser.nickname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`@${escapedNickname}`, 'g')

      const color = useDarkTheme ? '#c7daef' : '#13386c'
      processedText = processedText.replace(regex, `<span style="color: ${color};">@${atUser.nickname}</span>`)
    }
  }

  return processedText
}

/**
 * 格式化时间戳为相对时间
 * @param timestamp 时间戳（毫秒）
 * @returns 相对时间字符串
 */
export const getRelativeTimeFromTimestamp = (timestamp: number): string => {
  const now = Date.now()
  const differenceInSeconds = Math.floor((now - timestamp) / 1000)

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
 * 处理小红书评论数据 - 简化版本，直接返回评论数组
 * @param data 完整的评论数据
 * @param emojiData 处理过后的emoji列表
 * @param useDarkTheme 是否使用深色主题
 * @returns 处理后的评论数组
 */
export const xiaohongshuComments = async (data: any, emojiData: any, useDarkTheme: boolean = false): Promise<any[]> => {
  if (!data.data || !data.data.comments || data.data.comments.length === 0) {
    return []
  }

  const comments = []

  for (const comment of data.data.comments) {
    // 处理主评论
    const processedComment = {
      id: comment.id,
      note_id: comment.note_id,
      content: comment.content,
      user_info: comment.user_info,
      create_time: getRelativeTimeFromTimestamp(comment.create_time),
      ip_location: comment.ip_location || '未知',
      like_count: comment.like_count,
      liked: comment.liked,
      pictures: comment.pictures || [],
      sub_comment_count: comment.sub_comment_count,
      sub_comments: comment.sub_comments || [],
      show_tags: comment.show_tags || [],
      at_users: comment.at_users || [],
      status: comment.status,
      isTop: Array.isArray(comment.show_tags) && comment.show_tags.some((t: any) => {
        if (typeof t === 'string') return t === 'user_top'
        if (t && typeof t === 'object') return t.name === 'user_top' || t.tag === 'user_top'
        return false
      })
    }

    // 处理子评论
    if (comment.sub_comments && Array.isArray(comment.sub_comments)) {
      processedComment.sub_comments = comment.sub_comments.map((subComment: any) => ({
        id: subComment.id,
        note_id: subComment.note_id,
        content: subComment.content,
        user_info: subComment.user_info,
        create_time: getRelativeTimeFromTimestamp(subComment.create_time),
        ip_location: subComment.ip_location || '未知',
        like_count: subComment.like_count,
        liked: subComment.liked,
        pictures: subComment.pictures || [],
        show_tags: subComment.show_tags || [],
        at_users: subComment.at_users || [],
        status: subComment.status,
        target_comment: subComment.target_comment,
        isTop: Array.isArray(subComment.show_tags) && subComment.show_tags.some((t: any) => {
          if (typeof t === 'string') return t === 'user_top'
          if (t && typeof t === 'object') return t.name === 'user_top' || t.tag === 'user_top'
          return false
        })
      }))
    }

    comments.push(processedComment)
  }

  // 处理文本格式、表情包和@用户
  for (const comment of comments) {
    // 确保 content 是字符串
    if (typeof comment.content !== 'string') {
      comment.content = String(comment.content || '')
    }

    // 处理换行符和空格
    comment.content = comment.content.replace(/\n/g, '<br>').replace(/ {2,}/g, (match: string) => '&nbsp;'.repeat(match.length))

    // 处理@用户（在表情处理之前，避免冲突）
    comment.content = processAtUsers(comment.content, comment.at_users, useDarkTheme)

    // 处理表情包
    comment.content = processCommentEmojis(comment.content, emojiData)

    // 格式化点赞数
    if (parseInt(comment.like_count) > 10000) {
      comment.like_count = (parseInt(comment.like_count) / 10000).toFixed(1) + 'w'
    }

    // 处理子评论
    if (comment.sub_comments && Array.isArray(comment.sub_comments)) {
      for (const subComment of comment.sub_comments) {
        // 确保 content 是字符串
        if (typeof subComment.content !== 'string') {
          subComment.content = String(subComment.content || '')
        }

        // 处理换行符和空格
        subComment.content = subComment.content.replace(/\n/g, '<br>').replace(/ {2,}/g, (match: string) => '&nbsp;'.repeat(match.length))

        // 处理@用户（在表情处理之前，避免冲突）
        subComment.content = processAtUsers(subComment.content, subComment.at_users, useDarkTheme)

        // 处理表情包
        subComment.content = processCommentEmojis(subComment.content, emojiData)

        // 格式化点赞数
        if (parseInt(subComment.like_count) > 10000) {
          subComment.like_count = (parseInt(subComment.like_count) / 10000).toFixed(1) + 'w'
        }
      }
    }
  }

  // 在返回前进行置顶排序：isTop=true 的评论优先
  comments.sort((a: any, b: any) => Number(b.isTop) - Number(a.isTop))

  return comments.slice(0, Config.xiaohongshu.numcomment)
}