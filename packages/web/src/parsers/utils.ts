/**
 * 解析器通用工具函数
 * @description 提供各平台解析器共用的工具方法
 */

/**
 * 格式化时长（秒转为mm:ss格式）
 * @param seconds 秒数
 * @returns 格式化后的时长字符串
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * 格式化数量（大数字转为w、k等单位）
 * @param count 数量
 * @returns 格式化后的数量字符串
 */
export function formatCount(count: number): string {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}

/**
 * 格式化时间戳
 * @param timestamp 时间戳（秒）
 * @returns 格式化后的时间字符串
 */
export function formatTimestamp(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = now - timestamp

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}分钟前`
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}小时前`
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)}天前`
  } else {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('zh-CN')
  }
}

/**
 * 从文本中提取视频链接
 * @param text 包含链接的文本
 * @returns 提取到的链接，如果没有找到则返回null
 */
export function extractVideoLink(text: string): string | null {
  // 定义支持的平台域名模式
  const platformPatterns = [
    // 抖音相关域名
    /https?:\/\/(?:[^\s]*\.)?(?:douyin\.com|iesdouyin\.com|webcast\.amemv\.com|live\.douyin\.com)(?:\/[^\s\u4e00-\u9fff]*)*/gi,
    // 哔哩哔哩相关域名
    /(https?:\/\/(?:www\.bilibili\.com|m\.bilibili\.com|t\.bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-.~:/?#[\]@!$&'()*+,;=]+)/gi,
    // 快手相关域名
    /https?:\/\/(?:[^\s]*\.)?(?:kuaishou\.com|kwai\.com|chenzhongtech\.com)(?:\/[^\s\u4e00-\u9fff]*)*/gi
  ]
  
  // 尝试匹配各个平台的链接
  for (const pattern of platformPatterns) {
    const matches = text.match(pattern)
    if (matches && matches.length > 0) {
      let link = matches[0]
      // 移除链接末尾可能的标点符号和特殊字符
      link = link.replace(/[，。！？；：、"'`]+$/, '')
      return link
    }
  }
  
  // 如果没有匹配到特定平台，尝试匹配通用的http/https链接
  const genericPattern = /https?:\/\/[^\s\u4e00-\u9fff]+/gi
  const genericMatches = text.match(genericPattern)
  if (genericMatches && genericMatches.length > 0) {
    let link = genericMatches[0]
    link = link.replace(/[，。！？；：、"'`]+$/, '')
    return link
  }
  
  return null
}