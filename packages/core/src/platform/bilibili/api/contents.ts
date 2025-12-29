/**
 * B站内容管理 API
 */
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { getBilibiliDB } from '@/module/db'
import { AmagiError, getBilibiliData } from '@/module/utils/amagiClient'

/**
 * B站内容项接口
 */
export interface BilibiliContentItem {
  id: string
  platform: 'bilibili'
  title: string
  author: string
  authorId: string
  avatar: string
  thumbnail: string
  type: 'video' | 'note' | 'dynamic' | 'article' | 'live' | 'forward'
  dynamicType?: string
  /** 推送时间戳（毫秒） */
  createdAt: number
}

/**
 * 获取B站内容列表
 * GET /api/v1/platforms/bilibili/contents?groupId=xxx
 */
export const getContents: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.query

    if (!groupId || typeof groupId !== 'string') {
      return createBadRequestResponse(res, '请提供群组ID')
    }

    const bilibiliDB = await getBilibiliDB()
    const caches = await bilibiliDB.dynamicCacheRepository.find({
      where: { groupId },
      relations: ['bilibiliUser'],
      order: { createdAt: 'DESC' },
      take: 100
    })

    // 收集需要获取头像的用户
    const uniqueMids = [...new Set(caches.map(c => c.host_mid))]
    const avatarCache = new Map<number, string>()
    
    // 串行获取头像，遇到风控停止
    let hitRiskControl = false
    for (const mid of uniqueMids) {
      if (hitRiskControl) {
        avatarCache.set(mid, '')
        continue
      }
      
      try {
        const userProfile = await getBilibiliData('用户主页数据', { 
          host_mid: mid, 
          typeMode: 'strict' 
        })
        avatarCache.set(mid, userProfile.data?.data?.card?.face || '')
      } catch (error) {
        if (error instanceof AmagiError && (error.code === -352 || error.code === -412)) {
          logger.warn(`[BilibiliAPI] 获取头像时遇到风控(${error.code})`)
          hitRiskControl = true
        }
        avatarCache.set(mid, '')
      }
    }

    const contentList: BilibiliContentItem[] = caches.map(cache => {
      const cacheWithUser = cache as typeof cache & { bilibiliUser?: any }
      const authorName = cacheWithUser.bilibiliUser?.remark || cache.host_mid.toString()

      return {
        id: cache.dynamic_id,
        platform: 'bilibili',
        title: `B站动态 ${cache.dynamic_id}`,
        author: authorName,
        authorId: cache.host_mid.toString(),
        avatar: avatarCache.get(cache.host_mid) || '',
        thumbnail: '',
        type: 'dynamic',
        dynamicType: cache.dynamic_type,
        createdAt: cache.createdAt.getTime()
      }
    })

    return createSuccessResponse(res, contentList)
  } catch (error) {
    logger.error('[BilibiliAPI] 获取内容列表失败:', error)
    return createServerErrorResponse(res, '获取内容列表失败')
  }
}

/**
 * 添加B站内容
 * POST /api/v1/platforms/bilibili/contents
 * Body: { contentId, groupId, authorId }
 */
export const addContent: RequestHandler = async (req, res) => {
  try {
    const { contentId, groupId, authorId } = req.body

    if (!contentId || !groupId || !authorId) {
      return createBadRequestResponse(res, '请提供 contentId、groupId 和 authorId')
    }

    const bilibiliDB = await getBilibiliDB()
    const hostMid = parseInt(authorId)
    
    // 检查用户是否存在
    const user = await bilibiliDB.getBilibiliUser(hostMid)
    if (!user) {
      return createBadRequestResponse(res, '该UP主未在订阅列表中，请先添加订阅')
    }

    await bilibiliDB.addDynamicCache(contentId, hostMid, groupId, 'manual')

    return createSuccessResponse(res, { message: '添加成功' })
  } catch (error) {
    logger.error('[BilibiliAPI] 添加内容失败:', error)
    return createServerErrorResponse(res, '添加内容失败')
  }
}

/**
 * 删除B站内容
 * DELETE /api/v1/platforms/bilibili/contents/:id?groupId=xxx
 */
export const deleteContent: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { groupId } = req.query

    if (!id || !groupId) {
      return createBadRequestResponse(res, '请提供内容ID和群组ID')
    }

    const bilibiliDB = await getBilibiliDB()
    const result = await bilibiliDB.dynamicCacheRepository.delete({ 
      dynamic_id: id, 
      groupId: groupId as string 
    })

    if (result.affected === 0) {
      return createBadRequestResponse(res, '未找到要删除的内容')
    }

    return createSuccessResponse(res, { message: '删除成功', affected: result.affected })
  } catch (error) {
    logger.error('[BilibiliAPI] 删除内容失败:', error)
    return createServerErrorResponse(res, '删除内容失败')
  }
}
