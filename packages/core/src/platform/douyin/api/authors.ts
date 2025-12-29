/**
 * 抖音作者管理 API
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
 * 作者信息接口
 */
export interface DouyinAuthor {
  id: string
  name: string
  avatar: string
  platform: 'douyin'
}

/**
 * 获取群组订阅的抖音作者列表
 * GET /api/v1/platforms/douyin/authors?groupId=xxx
 */
export const getAuthors: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.query

    if (!groupId || typeof groupId !== 'string') {
      return createBadRequestResponse(res, '请提供群组ID')
    }

    const douyinDB = await getDouyinDB()
    const subscriptions = await douyinDB.getGroupSubscriptions(groupId)
    
    const validSubscriptions = subscriptions.filter(sub => sub.douyinUser)
    if (validSubscriptions.length === 0) {
      return createSuccessResponse(res, [])
    }

    const authors: DouyinAuthor[] = []
    const batchSize = 5

    for (let i = 0; i < validSubscriptions.length; i += batchSize) {
      const batch = validSubscriptions.slice(i, i + batchSize)
      
      const batchResults = await Promise.all(batch.map(async (subscription) => {
        try {
          const userProfile = await getDouyinData('用户主页数据', { 
            sec_uid: subscription.douyinUser.sec_uid, 
            typeMode: 'strict' 
          })

          return {
            id: subscription.douyinUser.sec_uid,
            name: subscription.douyinUser.remark || 
                  subscription.douyinUser.short_id || 
                  subscription.douyinUser.sec_uid,
            avatar: userProfile.data.user.avatar_larger.url_list[0],
            platform: 'douyin' as const
          }
        } catch (error) {
          logger.warn(`[DouyinAPI] 获取用户数据失败 (${subscription.douyinUser.sec_uid}):`, error)
          return {
            id: subscription.douyinUser.sec_uid,
            name: subscription.douyinUser.remark || 
                  subscription.douyinUser.short_id || 
                  subscription.douyinUser.sec_uid,
            avatar: '',
            platform: 'douyin' as const
          }
        }
      }))

      authors.push(...batchResults)
    }

    return createSuccessResponse(res, authors)
  } catch (error) {
    logger.error('[DouyinAPI] 获取作者列表失败:', error)
    return createServerErrorResponse(res, '获取作者列表失败')
  }
}
