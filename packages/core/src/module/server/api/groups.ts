/**
 * 群组管理 API
 */
import {
  createServerErrorResponse,
  createSuccessResponse,
  getBot,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { getBilibiliDB, getDouyinDB } from '@/module/db'

/**
 * 群组信息接口
 */
export interface GroupInfo {
  id: string
  name: string
  botId: string
  avatar: string
  isOnline: boolean
  subscriptionCount: {
    douyin: number
    bilibili: number
  }
}

/**
 * 获取所有已订阅推送功能的群组列表
 * GET /api/v1/groups
 */
export const getGroups: RequestHandler = async (_req, res) => {
  try {
    const douyinDB = await getDouyinDB()
    const bilibiliDB = await getBilibiliDB()

    // 获取两个数据库中的所有群组
    const [douyinGroups, bilibiliGroups] = await Promise.all([
      douyinDB.groupRepository.find(),
      bilibiliDB.groupRepository.find()
    ])

    // 合并群组并去重
    const allGroupsMap = new Map<string, { id: string; botId: string }>()

    douyinGroups.forEach(group => {
      allGroupsMap.set(group.id, { id: group.id, botId: group.botId })
    })

    bilibiliGroups.forEach(group => {
      if (!allGroupsMap.has(group.id)) {
        allGroupsMap.set(group.id, { id: group.id, botId: group.botId })
      }
    })

    const groupList: GroupInfo[] = []

    for (const group of allGroupsMap.values()) {
      const [douyinSubscriptions, bilibiliSubscriptions] = await Promise.all([
        douyinDB.getGroupSubscriptions(group.id),
        bilibiliDB.getGroupSubscriptions(group.id)
      ])

      // 只有有订阅的群组才返回
      if (douyinSubscriptions.length > 0 || bilibiliSubscriptions.length > 0) {
        const bot = getBot(group.botId)
        
        let groupName = group.id
        let groupAvatarUrl = ''
        let isOnline = true

        if (!bot) {
          isOnline = false
        } else {
          try {
            const groupInfo = await bot.getGroupInfo(group.id)
            if (groupInfo) {
              groupName = groupInfo.groupName || groupName
            }
            groupAvatarUrl = await bot.getGroupAvatarUrl(group.id) || ''
          } catch (e) {
            logger.warn(`[GroupsAPI] 获取群组信息失败 ${group.id}:`, e)
          }
        }

        groupList.push({
          id: group.id,
          name: groupName,
          avatar: groupAvatarUrl,
          botId: group.botId,
          isOnline,
          subscriptionCount: {
            douyin: douyinSubscriptions.length,
            bilibili: bilibiliSubscriptions.length
          }
        })
      }
    }

    return createSuccessResponse(res, groupList)
  } catch (error) {
    logger.error('[GroupsAPI] 获取群组列表失败:', error)
    return createServerErrorResponse(res, '获取群组列表失败')
  }
}
