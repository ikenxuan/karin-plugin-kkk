/**
 * 统一解析器入口
 * @description 提供统一的解析接口，根据平台自动选择对应的解析器
 */

import request from '@/lib/request'

import { parseBilibiliVideoDetail,parseBilibiliWorkId } from './bilibili'
import { parseDouyinVideoDetail,parseDouyinWorkId } from './douyin'
import { parseKuaishouVideoDetail,parseKuaishouWorkId } from './kuaishou'
import { HTTPStatusCode,type LinkParseResponse, type ParsedWorkInfo, type VideoInfo } from './types'
import { extractVideoLink } from './utils'

/**
 * 统一视频解析器
 * @description 解析视频链接并获取完整的作品信息
 */
export class VideoParser {
  /**
   * 解析视频链接并获取作品详情
   * @param url 视频链接或包含链接的文本
   * @returns 解析后的视频信息
   */
  async parseVideo(url: string): Promise<VideoInfo> {
    // 1. 提取真正的链接
    const extractedLink = extractVideoLink(url)
    if (!extractedLink) {
      throw new Error('未能从输入文本中提取到有效的视频链接')
    }

    // 2. 获取重定向后的最终链接和平台信息
    const linkResponse = await request.post<LinkParseResponse>('/api/kkk/getLongLink', {
      link: extractedLink
    })

    if (linkResponse.data.code !== HTTPStatusCode.OK) {
      throw new Error(linkResponse.data.message || '链接解析失败')
    }

    const { finalUrl, platform } = linkResponse.data.data

    // 3. 根据平台解析作品ID和基础信息
    let workInfo: ParsedWorkInfo
    
    switch (platform) {
      case 'douyin':
        workInfo = parseDouyinWorkId(finalUrl)
        break
      case 'bilibili':
        workInfo = parseBilibiliWorkId(finalUrl)
        break
      case 'kuaishou':
        workInfo = parseKuaishouWorkId(finalUrl)
        break
      default:
        throw new Error(`不支持的平台: ${platform}`)
    }

    // 4. 获取作品详细信息
    let videoInfo: VideoInfo
    
    switch (platform) {
      case 'douyin':
        videoInfo = await parseDouyinVideoDetail(workInfo)
        break
      case 'bilibili':
        videoInfo = await parseBilibiliVideoDetail(workInfo)
        break
      case 'kuaishou':
        videoInfo = await parseKuaishouVideoDetail(workInfo)
        break
      default:
        throw new Error(`不支持的平台: ${platform}`)
    }

    return videoInfo
  }
}

// 导出单例实例
export const videoParser = new VideoParser()

// 导出类型
export type { CommentInfo, ParsedWorkInfo,VideoInfo } from './types'