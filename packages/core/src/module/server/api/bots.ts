/**
 * Bot 管理 API
 */
import {
  createServerErrorResponse,
  createSuccessResponse,
  karin,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

/**
 * Bot 信息接口
 */
export interface BotInfo {
  id: string
  name: string
  avatar: string
  isOnline: boolean
}

/**
 * 群组简要信息接口
 */
export interface GroupBriefInfo {
  id: string
  name: string
  avatar: string
}

/**
 * 获取所有在线 Bot 列表
 * GET /api/v1/bots
 */
export const getBots: RequestHandler = async (_req, res) => {
  try {
    const botList = karin.getAllBotList()
    const bots: BotInfo[] = []

    for (const item of botList) {
      const bot = item.bot
      // 跳过 console bot
      if (bot.account.name === 'console') continue

      let avatar = ''
      try {
        avatar = await bot.getAvatarUrl(bot.account.selfId) || ''
      } catch (e) {
        logger.warn(`[BotsAPI] 获取 Bot 头像失败 ${bot.account.selfId}:`, e)
      }

      bots.push({
        id: bot.account.selfId,
        name: bot.account.name || bot.account.selfId,
        avatar,
        isOnline: true
      })
    }

    return createSuccessResponse(res, bots)
  } catch (error) {
    logger.error('[BotsAPI] 获取 Bot 列表失败:', error)
    return createServerErrorResponse(res, '获取 Bot 列表失败')
  }
}

/**
 * 获取指定 Bot 的群列表
 * GET /api/v1/bots/:botId/groups
 */
export const getBotGroups: RequestHandler = async (req, res) => {
  try {
    const { botId } = req.params

    if (!botId) {
      return createServerErrorResponse(res, '缺少 botId 参数')
    }

    const botList = karin.getAllBotList()
    const botItem = botList.find(item => item.bot.account.selfId === botId)

    if (!botItem) {
      return createServerErrorResponse(res, 'Bot 不存在或不在线')
    }

    const bot = botItem.bot
    const groupList = await bot.getGroupList()
    const groups: GroupBriefInfo[] = []

    for (const group of groupList) {
      let avatar = ''
      try {
        avatar = await bot.getGroupAvatarUrl(group.groupId) || ''
      } catch {
        // 忽略头像获取失败
      }

      groups.push({
        id: group.groupId,
        name: group.groupName || group.groupId,
        avatar
      })
    }

    return createSuccessResponse(res, groups)
  } catch (error) {
    logger.error('[BotsAPI] 获取 Bot 群列表失败:', error)
    return createServerErrorResponse(res, '获取群列表失败')
  }
}

/**
 * 批量获取群组信息
 * POST /api/v1/groups/batch
 * Body: { groups: [{ groupId: string, botId: string }] }
 */
export const getGroupsBatch: RequestHandler = async (req, res) => {
  try {
    const { groups } = req.body as { groups: { groupId: string; botId: string }[] }

    if (!groups || !Array.isArray(groups)) {
      return createServerErrorResponse(res, '缺少 groups 参数')
    }

    const result: Array<{
      groupId: string
      botId: string
      groupName: string
      groupAvatar: string
      botName: string
      botAvatar: string
      isOnline: boolean
    }> = []

    const botList = karin.getAllBotList()

    for (const item of groups) {
      const botItem = botList.find(b => b.bot.account.selfId === item.botId)
      
      if (!botItem) {
        result.push({
          groupId: item.groupId,
          botId: item.botId,
          groupName: item.groupId,
          groupAvatar: '',
          botName: item.botId,
          botAvatar: '',
          isOnline: false
        })
        continue
      }

      const bot = botItem.bot
      let groupName = item.groupId
      let groupAvatar = ''
      let botName = bot.account.name || item.botId
      let botAvatar = ''

      try {
        const groupInfo = await bot.getGroupInfo(item.groupId)
        if (groupInfo) {
          groupName = groupInfo.groupName || groupName
        }
        groupAvatar = await bot.getGroupAvatarUrl(item.groupId) || ''
        botAvatar = await bot.getAvatarUrl(item.botId) || ''
      } catch (e) {
        logger.warn(`[BotsAPI] 获取群组信息失败 ${item.groupId}:`, e)
      }

      result.push({
        groupId: item.groupId,
        botId: item.botId,
        groupName,
        groupAvatar,
        botName,
        botAvatar,
        isOnline: true
      })
    }

    return createSuccessResponse(res, result)
  } catch (error) {
    logger.error('[BotsAPI] 批量获取群组信息失败:', error)
    return createServerErrorResponse(res, '批量获取群组信息失败')
  }
}
