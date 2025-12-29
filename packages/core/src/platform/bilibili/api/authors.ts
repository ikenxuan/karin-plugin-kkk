/**
 * B站作者管理 API
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
 * 作者信息接口
 */
export interface BilibiliAuthor {
  id: string
  name: string
  avatar: string
  platform: 'bilibili'
}

/**
 * 获取群组订阅的B站作者列表
 * GET /api/v1/platforms/bilibili/authors?groupId=xxx
 */
export const getAuthors: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.query

    if (!groupId || typeof groupId !== 'string') {
      return createBadRequestResponse(res, '请提供群组ID')
    }

    const bilibiliDB = await getBilibiliDB()
    const subscriptions = await bilibiliDB.getGroupSubscriptions(groupId)
    
    const validSubscriptions = subscriptions.filter(sub => sub.bilibiliUser)
    if (validSubscriptions.length === 0) {
      return createSuccessResponse(res, [])
    }

    const authors: BilibiliAuthor[] = []
    let hitRiskControl = false

    // 串行获取，遇到风控停止获取头像但继续返回列表
    for (const subscription of validSubscriptions) {
      if (hitRiskControl) {
        authors.push({
          id: subscription.bilibiliUser.host_mid.toString(),
          name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
          avatar: '',
          platform: 'bilibili'
        })
        continue
      }

      try {
        const userProfile = await getBilibiliData('用户主页数据', { 
          host_mid: subscription.bilibiliUser.host_mid, 
          typeMode: 'strict' 
        })

        authors.push({
          id: subscription.bilibiliUser.host_mid.toString(),
          name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
          avatar: userProfile.data.data.card.face,
          platform: 'bilibili'
        })
      } catch (error) {
        if (error instanceof AmagiError && (error.code === -352 || error.code === -412)) {
          logger.warn(`[BilibiliAPI] 获取作者头像时遇到风控(${error.code})`)
          hitRiskControl = true
        }
        authors.push({
          id: subscription.bilibiliUser.host_mid.toString(),
          name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
          avatar: '',
          platform: 'bilibili'
        })
      }
    }

    return createSuccessResponse(res, authors)
  } catch (error) {
    logger.error('[BilibiliAPI] 获取作者列表失败:', error)
    return createServerErrorResponse(res, '获取作者列表失败')
  }
}
