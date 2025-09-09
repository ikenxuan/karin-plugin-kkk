import { extractVideoLink } from '@/parsers/utils'

/**
 * 原生下载函数（使用浏览器默认下载弹窗）
 * @param downloadUrl - 下载链接
 * @param suggestedFilename - 建议保存的文件名
 */
export const downloadWithNative = (downloadUrl: string, suggestedFilename: string) => {
  try {
    // 创建隐藏的下载链接
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = suggestedFilename
    link.style.display = 'none'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'

    // 添加到页面并触发点击
    document.body.appendChild(link)
    link.click()

    // 清理
    document.body.removeChild(link)
  } catch (error) {
    console.error('❌ 下载失败:', error)
    // 降级方案：直接在新标签页打开链接
    window.open(downloadUrl, '_blank', 'noopener,noreferrer')
  }
}

/**
 * 原生下载函数
 * @param downloadUrl - 下载链接
 * @param title - 视频标题
 * @param type - 文件类型
 */
export const downloadWithSmartNaming = (downloadUrl: string, title: string, type: 'video' | 'audio') => {
  const filename = generateDownloadFilename(downloadUrl, title, type)
  downloadWithNative(downloadUrl, filename)
}

/**
 * 打开原链接
 * @param originalUrl - 原始链接
 */
export const handleOpenOriginal = (originalUrl: string) => {
  const videoLink = extractVideoLink(originalUrl)
  if (videoLink) {
    window.open(videoLink, '_blank')
  }
}

/**
 * 生成下载文件名
 * @param downloadUrl - 下载链接
 * @param title - 视频标题
 * @param type - 文件类型 ('video' | 'audio')
 * @returns 清理后的文件名
 */
export const generateDownloadFilename = (downloadUrl: string, title: string, type: 'video' | 'audio'): string => {
  let filename = ''

  // 1. 优先使用标题
  if (title && title.trim()) {
    filename = sanitizeName(title.trim())
  }

  // 2. 如果标题无效，尝试从URL提取文件名
  if (!filename || filename === 'untitled') {
    try {
      const url = new URL(downloadUrl)
      const pathname = url.pathname
      const urlFilename = pathname.split('/').pop() || ''

      if (urlFilename && urlFilename.includes('.')) {
        // 移除扩展名，只保留文件名部分
        const nameWithoutExt = urlFilename.replace(/\.[^.]*$/, '')
        if (nameWithoutExt.length > 0) {
          filename = sanitizeName(nameWithoutExt)
        }
      }
    } catch (error) {
      console.warn('无法从URL提取文件名:', error)
    }
  }

  // 3. 如果还是无效，使用时间戳
  if (!filename || filename === 'untitled') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    filename = `${type}_${timestamp}`
  }

  // 4. 添加类型后缀和扩展名
  const extension = type === 'video' ? '.mp4' : '.mp3'
  const suffix = type === 'video' ? '_video' : '_audio'

  // 避免重复后缀
  if (!filename.toLowerCase().includes(suffix.toLowerCase())) {
    filename += suffix
  }

  return filename + extension
}

/**
 * 清理文件名和文件夹名中的非法字符
 * @param name - 原始名称
 * @returns 清理后的名称
 */
export const sanitizeName = (name: string): string => {
  // 移除或替换Windows和其他系统中的非法字符
  return name
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/^\.|\.$/, '')
    .substring(0, 200) || 'untitled'
}
