import { useState } from 'react'

import type { VideoInfo } from '@/parsers'
import { videoParser } from '@/parsers'

/**
 * 视频解析器Hook
 * @description 提供视频链接解析功能，使用新的前端解析架构
 * @returns 包含解析方法、加载状态、错误信息和清除错误方法的对象
 */
export const useVideoParser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * 解析视频链接并获取作品详情
   * @param url 要解析的视频链接或包含链接的文本
   * @returns 返回包含视频信息和评论的对象
   * @throws 当链接无效或解析失败时抛出错误
   */
  const parseVideo = async (url: string): Promise<VideoInfo> => {
    if (!url.trim()) {
      throw new Error('请输入有效的链接')
    }

    setLoading(true)
    setError(null)

    try {
      // 使用新的前端解析器
      const videoInfo = await videoParser.parseVideo(url)
      return videoInfo
    } catch (err: any) {
      let errorMessage = '未知错误'

      if (err.response) {
        // 服务器响应了错误状态码
        errorMessage = `请求失败: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`
      } else if (err.request) {
        // 请求已发出但没有收到响应
        errorMessage = '网络连接失败，请检查网络连接'
      } else if (err.message) {
        // 其他错误
        errorMessage = err.message
      }

      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 清除错误信息
   * @description 重置错误状态为null
   */
  const clearError = () => setError(null)

  return {
    parseVideo,
    loading,
    error,
    clearError,
  }
}