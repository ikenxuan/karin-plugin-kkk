/**
 * 链接解析 API
 */
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import axios from 'node-karin/axios'
import type { RequestHandler } from 'node-karin/express'

/**
 * 识别平台类型
 */
const detectPlatform = (url: string): 'douyin' | 'bilibili' | 'unknown' => {
  if (url.includes('douyin.com') || url.includes('iesdouyin.com') ||
      url.includes('webcast.amemv.com') || url.includes('live.douyin.com')) {
    return 'douyin'
  }
  if (url.includes('bilibili.com') || url.includes('b23.tv')) {
    return 'bilibili'
  }
  return 'unknown'
}

/**
 * 从 URL 中提取作品 ID
 */
const extractWorkId = (url: string, platform: string): { type: string; id: string } | null => {
  if (platform === 'douyin') {
    // 视频: /video/123456
    const videoMatch = /video\/(\d+)/.exec(url)
    if (videoMatch) return { type: 'video', id: videoMatch[1] }
    
    // 图文: /note/123456
    const noteMatch = /note\/(\d+)/.exec(url)
    if (noteMatch) return { type: 'note', id: noteMatch[1] }
    
    // modal_id 参数
    const modalMatch = /modal_id=(\d+)/.exec(url)
    if (modalMatch) return { type: 'video', id: modalMatch[1] }
  }
  
  if (platform === 'bilibili') {
    // BV号: /video/BVxxxxxx
    const bvidMatch = /\/video\/(BV[a-zA-Z0-9]+)/.exec(url)
    if (bvidMatch) return { type: 'video', id: bvidMatch[1] }
    
    // AV号: /video/av123456
    const aidMatch = /\/video\/av(\d+)/.exec(url)
    if (aidMatch) return { type: 'video', id: aidMatch[1] }
    
    // 动态: t.bilibili.com/123456
    const tMatch = /^https:\/\/t\.bilibili\.com\/(\d+)/.exec(url)
    if (tMatch) return { type: 'dynamic', id: tMatch[1] }
    
    // opus: www.bilibili.com/opus/123456
    const opusMatch = /\/opus\/(\d+)/.exec(url)
    if (opusMatch) return { type: 'dynamic', id: opusMatch[1] }
  }
  
  return null
}

/**
 * 解析短链接并获取最终 URL
 * POST /api/v1/link/resolve
 * Body: { link: string }
 */
export const resolveLink: RequestHandler = async (req, res) => {
  try {
    const { link } = req.body
    
    if (!link || typeof link !== 'string') {
      return createBadRequestResponse(res, '请提供有效的链接')
    }
    
    // 获取重定向后的最终 URL
    const resp = await axios.get(link, {
      headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
      },
      maxRedirects: 10,
      validateStatus: () => true
    })
    
    const finalUrl = resp.request.res?.responseUrl || link
    
    // 检查重定向是否成功
    if (finalUrl.includes('403 Forbidden')) {
      return createServerErrorResponse(res, '无法获取链接的重定向地址')
    }
    
    // 识别平台
    const platform = detectPlatform(finalUrl)
    
    // 提取作品 ID
    const workInfo = extractWorkId(finalUrl, platform)
    
    logger.debug(`[LinkAPI] 链接解析: ${link} -> ${platform} (${workInfo?.type}: ${workInfo?.id})`)
    
    return createSuccessResponse(res, {
      originalUrl: link,
      finalUrl,
      platform,
      workType: workInfo?.type || null,
      workId: workInfo?.id || null
    })
  } catch (error: any) {
    logger.error('[LinkAPI] 链接解析失败:', error)
    return createServerErrorResponse(res, `链接解析失败: ${error.message}`)
  }
}
