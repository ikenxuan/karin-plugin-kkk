/**
 * 抖音内容管理 API
 */
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { getDouyinDB } from '@/module/db'
import { getDouyinData } from '@/module/utils/amagiClient'

/**
 * 抖音内容项接口
 */
export interface DouyinContentItem {
  id: string
  platform: 'douyin'
  title: string
  author: string
  authorId: string
  avatar: string
  thumbnail: string
  type: 'video' | 'note' | 'slides'
  /** 推送时间戳（毫秒） */
  createdAt: number
}

/**
 * 获取抖音内容列表
 * GET /api/v1/platforms/douyin/contents?groupId=xxx
 */
export const getContents: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.query

    if (!groupId || typeof groupId !== 'string') {
      return createBadRequestResponse(res, '请提供群组ID')
    }

    const douyinDB = await getDouyinDB()
    const caches = await douyinDB.awemeCacheRepository.find({
      where: { groupId },
      relations: ['douyinUser'],
      order: { createdAt: 'DESC' },
      take: 100
    })

    // 收集需要获取头像的用户
    const userAvatarMap = new Map<string, string>()
    const uniqueSecUids = [...new Set(caches.map(c => c.sec_uid))]

    // 批量获取用户头像（每批5个）
    for (let i = 0; i < uniqueSecUids.length; i += 5) {
      const batch = uniqueSecUids.slice(i, i + 5)
      await Promise.all(batch.map(async (secUid) => {
        try {
          const userProfile = await getDouyinData('用户主页数据', { 
            sec_uid: secUid, 
            typeMode: 'strict' 
          })
          userAvatarMap.set(secUid, userProfile.data?.user?.avatar_larger?.url_list[0] || '')
        } catch {
          userAvatarMap.set(secUid, '')
        }
      }))
    }

    const contentList: DouyinContentItem[] = caches.map(cache => {
      const cacheWithUser = cache as typeof cache & { douyinUser?: any }
      const authorName = cacheWithUser.douyinUser?.remark || 
                        cacheWithUser.douyinUser?.short_id || 
                        cache.sec_uid

      return {
        id: cache.aweme_id,
        platform: 'douyin',
        title: `抖音作品 ${cache.aweme_id}`,
        author: authorName,
        authorId: cache.sec_uid,
        avatar: userAvatarMap.get(cache.sec_uid) || '',
        thumbnail: '',
        type: 'video',
        createdAt: cache.createdAt.getTime()
      }
    })

    return createSuccessResponse(res, contentList)
  } catch (error) {
    logger.error('[DouyinAPI] 获取内容列表失败:', error)
    return createServerErrorResponse(res, '获取内容列表失败')
  }
}

/**
 * 添加抖音内容
 * POST /api/v1/platforms/douyin/contents
 * Body: { contentId, groupId, authorId }
 */
export const addContent: RequestHandler = async (req, res) => {
  try {
    const { contentId, groupId, authorId } = req.body

    if (!contentId || !groupId || !authorId) {
      return createBadRequestResponse(res, '请提供 contentId、groupId 和 authorId')
    }

    const douyinDB = await getDouyinDB()
    
    // 检查用户是否存在
    const user = await douyinDB.getDouyinUser(authorId)
    if (!user) {
      return createBadRequestResponse(res, '该作者未在订阅列表中，请先添加订阅')
    }

    await douyinDB.addAwemeCache(contentId, authorId, groupId)

    return createSuccessResponse(res, { message: '添加成功' })
  } catch (error) {
    logger.error('[DouyinAPI] 添加内容失败:', error)
    return createServerErrorResponse(res, '添加内容失败')
  }
}

/**
 * 删除抖音内容
 * DELETE /api/v1/platforms/douyin/contents/:id?groupId=xxx
 */
export const deleteContent: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { groupId } = req.query

    if (!id || !groupId) {
      return createBadRequestResponse(res, '请提供内容ID和群组ID')
    }

    const douyinDB = await getDouyinDB()
    const result = await douyinDB.awemeCacheRepository.delete({ 
      aweme_id: id, 
      groupId: groupId as string 
    })

    if (result.affected === 0) {
      return createBadRequestResponse(res, '未找到要删除的内容')
    }

    return createSuccessResponse(res, { message: '删除成功', affected: result.affected })
  } catch (error) {
    logger.error('[DouyinAPI] 删除内容失败:', error)
    return createServerErrorResponse(res, '删除内容失败')
  }
}
