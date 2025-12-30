/**
 * B站视频播放 API
 * 返回视频播放地址，供前端直接播放
 */
import type { BiliOneWork, BiliVideoPlayurlIsLogin } from '@ikenxuan/amagi'
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { getBilibiliData } from '@/module/utils/amagiClient'

import { handleBilibiliRiskControl } from './risk-control'

// ==================== 类型定义 ====================

/**
 * 视频流信息
 */
interface VideoStreamInfo {
  /** 视频流 URL */
  url: string
  /** 清晰度 ID */
  quality: number
  /** 清晰度描述 */
  qualityDesc: string
  /** 编码格式 */
  codecs?: string
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
  /** 带宽 */
  bandwidth?: number
}

/**
 * 音频流信息
 */
interface AudioStreamInfo {
  /** 音频流 URL */
  url: string
  /** 音频质量 ID */
  quality: number
  /** 带宽 */
  bandwidth?: number
}

/**
 * 播放地址响应
 */
interface PlayUrlResponse {
  /** 视频 BV 号 */
  bvid: string
  /** 视频 AV 号 */
  aid: number
  /** 视频 CID */
  cid: number
  /** 视频标题 */
  title: string
  /** 视频时长（秒） */
  duration: number
  /** 封面图 */
  cover: string
  /** 流类型：dash（分离流）或 durl（合并流） */
  streamType: 'dash' | 'durl'
  /** DASH 视频流列表（streamType 为 dash 时） */
  videoStreams?: VideoStreamInfo[]
  /** DASH 音频流列表（streamType 为 dash 时） */
  audioStreams?: AudioStreamInfo[]
  /** 合并流 URL（streamType 为 durl 时） */
  durlUrl?: string
  /** 合并流清晰度描述 */
  durlQuality?: string
}

// ==================== 清晰度映射 ====================

const QUALITY_MAP: Record<number, string> = {
  6: '240P 极速',
  16: '360P 流畅',
  32: '480P 清晰',
  64: '720P 高清',
  74: '720P60 高帧率',
  80: '1080P 高清',
  112: '1080P+ 高码率',
  116: '1080P60 高帧率',
  120: '4K 超清',
  125: 'HDR 真彩色',
  126: '杜比视界',
  127: '8K 超高清'
}

// ==================== API 处理器 ====================

/**
 * 获取视频播放地址
 * GET /api/kkk/v1/platforms/bilibili/video/playurl?bvid=xxx&p=1
 * 
 * 返回视频播放地址，前端直接使用这些 URL 播放
 * - DASH 格式：返回视频流和音频流列表，前端使用支持 DASH 的播放器
 * - DURL 格式：返回合并好的单流地址，可直接播放
 */
export const getVideoPlayUrl: RequestHandler = async (req, res) => {
  try {
    const { bvid, p } = req.query as { bvid?: string; p?: string }
    
    if (!bvid) {
      return createBadRequestResponse(res, '请提供视频 BV 号 (bvid)')
    }
    
    const pageNum = p ? parseInt(p, 10) : 1
    
    // 获取视频基本信息
    const infoResponse = await getBilibiliData('单个视频作品数据', { 
      bvid, 
      typeMode: 'strict' 
    })
    const videoInfo = (infoResponse.data as BiliOneWork).data
    
    // 确定要播放的分P的 cid
    const cid = pageNum > 1 && videoInfo.pages[pageNum - 1]
      ? videoInfo.pages[pageNum - 1].cid
      : videoInfo.cid
    
    // 获取视频流信息（登录状态下获取高清流）
    const playUrlResponse = await getBilibiliData('单个视频下载信息数据', {
      avid: videoInfo.aid,
      cid: cid as number,
      typeMode: 'strict'
    })
    const playUrlData = (playUrlResponse.data as BiliVideoPlayurlIsLogin).data
    
    // 构建响应
    const response: PlayUrlResponse = {
      bvid: videoInfo.bvid,
      aid: videoInfo.aid,
      cid: cid as number,
      title: videoInfo.title,
      duration: videoInfo.duration,
      cover: videoInfo.pic
    } as PlayUrlResponse
    
    // 判断流类型
    if (playUrlData.dash) {
      // DASH 格式（高清，视频音频分离）
      response.streamType = 'dash'
      
      // 处理视频流（去重，按清晰度排序）
      const videoMap = new Map<number, VideoStreamInfo>()
      for (const video of playUrlData.dash.video) {
        if (!videoMap.has(video.id)) {
          videoMap.set(video.id, {
            url: video.baseUrl || video.base_url,
            quality: video.id,
            qualityDesc: QUALITY_MAP[video.id] || `${video.id}P`,
            codecs: video.codecs,
            width: video.width,
            height: video.height,
            bandwidth: video.bandwidth
          })
        }
      }
      response.videoStreams = Array.from(videoMap.values())
        .sort((a, b) => b.quality - a.quality) // 按清晰度降序
      
      // 处理音频流（按质量排序）
      response.audioStreams = playUrlData.dash.audio.map(audio => ({
        url: audio.baseUrl || audio.base_url,
        quality: audio.id,
        bandwidth: audio.bandwidth
      })).sort((a, b) => b.bandwidth - a.bandwidth) // 按带宽降序
      
    } else if (playUrlData.durl && playUrlData.durl.length > 0) {
      // DURL 格式（合并流）
      response.streamType = 'durl'
      response.durlUrl = playUrlData.durl[0].url
      response.durlQuality = playUrlData.accept_description?.[0] || '默认清晰度'
    } else {
      return createServerErrorResponse(res, '无法获取视频播放地址')
    }
    
    return createSuccessResponse(res, response)
  } catch (error) {
    const err = error as Error
    if (await handleBilibiliRiskControl(err, res)) return
    logger.error('[BilibiliAPI] 获取视频播放地址失败:', err)
    return createServerErrorResponse(res, `获取播放地址失败: ${err.message}`)
  }
}
