/**
 * 处理分享功能
 * @param shareUrl - 分享链接
 * @param title - 分享标题
 */
export const handleShare = async (shareUrl: string, title: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        url: shareUrl
      })
    } catch (err: any) {
      console.log('分享取消或失败', err)
    }
  } else {
    // 降级方案：复制到剪贴板
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('链接已复制到剪贴板')
    } catch (err: any) {
      console.log(err)
      // 再次降级：手动选择文本
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('链接已复制到剪贴板')
    }
  }
}
