import type { AdapterType, Message } from 'node-karin'
import karin, { config, logger } from 'node-karin'

import { Config } from '@/module/utils/Config'

import { statBotId } from './Base'

type FriendItem = { userId?: string }

/**
 * 获取候选机器人
 * @returns
 */
const getCandidateBots = (): AdapterType[] => {
  return karin
    .getAllBotList()
    .map((item) => item.bot as AdapterType)
    .filter((bot) => bot.account.name !== 'console')
}

/**
 * 获取非console主机器人ID列表
 * @param masters - 主机器人ID列表
 * @returns
 */
const getNonConsoleMasters = (masters: string[] = config.master()): string[] => {
  return masters.filter((id) => id !== 'console')
}

/**
 * 获取可访问的主机器人
 * @param masters - 主机器人ID列表
 * @returns
 */
export const getReachableMasterBots = async (masters: string[] = config.master()): Promise<Array<{ master: string; bot: AdapterType }>> => {
  const owners = getNonConsoleMasters(masters)
  if (owners.length === 0) return []

  const bots = getCandidateBots()
  if (bots.length === 0) return []

  const friendsMap = new Map<string, FriendItem[]>()
  await Promise.all(
    bots.map(async (bot) => {
      try {
        const list = await bot.getFriendList()
        friendsMap.set(bot.account.selfId, Array.isArray(list) ? (list as FriendItem[]) : [])
      } catch {
        friendsMap.set(bot.account.selfId, [])
      }
    })
  )

  const result: Array<{ master: string; bot: AdapterType }> = []
  for (const master of owners) {
    const matchedBot = bots.find((bot) => {
      return (friendsMap.get(bot.account.selfId) || []).some((friend) => friend.userId === master)
    })

    if (matchedBot) {
      result.push({ master, bot: matchedBot })
    }
  }

  return result
}

/**
 * 获取一个最少能用的机器人实例，优先级：1. selfId 参数指定的机器人 2. 可访问主人机器人中的第一个 3. pushlist 中活跃的机器人 4. 任意一个在线机器人
 * @param selfId - 机器人ID
 * @returns
 */
export const resolveUsableBot = async (selfId?: string): Promise<AdapterType | undefined> => {
  if (selfId) {
    const matchedBot = karin.getBot(selfId) as AdapterType | undefined
    if (matchedBot) return matchedBot
  }

  const reachable = await getReachableMasterBots()
  if (reachable.length > 0) return reachable[0].bot

  const { douyin, bilibili } = statBotId(Config.pushlist)
  const preferredBotId = douyin.botId || bilibili.botId
  if (preferredBotId) {
    const matchedBot = karin.getBot(preferredBotId) as AdapterType | undefined
    if (matchedBot) return matchedBot
  }

  const fallbackBotId = karin.getAllBotID()[0]
  if (!fallbackBotId) return undefined

  return karin.getBot(fallbackBotId) as AdapterType | undefined
}

/**
 * 取触发者头像 URL，用于嵌到登录二维码中心当 logo。
 *
 * 适配器（如 console）可能不实现 getAvatarUrl 或返回空串，模板侧 avatarUrl 缺省即退化为普通二维码，
 * 所以这里任何失败都只记 debug 日志并返回 undefined，不影响登录流程。
 *
 * @param e - 触发登录的消息事件
 * @returns 头像 URL，取不到时为 undefined
 */
export const resolveTriggerAvatarUrl = async (e: Message): Promise<string | undefined> => {
  const userId = e.sender?.userId || e.userId
  if (!userId) return undefined

  try {
    const url = await e.bot.getAvatarUrl(userId)
    return url || undefined
  } catch (error) {
    logger.debug('[karin-plugin-kkk] 获取触发者头像失败，二维码将不嵌入头像:', error)
    return undefined
  }
}
