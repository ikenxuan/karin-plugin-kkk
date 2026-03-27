import type { AdapterType } from 'node-karin'
import karin, { config } from 'node-karin'

import { Config } from '@/module/utils/Config'

import { statBotId } from './Base'

type FriendItem = { userId?: string }

/**
 * 获取候选机器人
 * @returns 
 */
const getCandidateBots = (): AdapterType[] => {
  return karin.getAllBotList()
    .map(item => item.bot as AdapterType)
    .filter(bot => bot.account.name !== 'console')
}

/**
 * 获取非console主机器人ID列表
 * @param masters - 主机器人ID列表
 * @returns 
 */
const getNonConsoleMasters = (masters: string[] = config.master()): string[] => {
  return masters.filter(id => id !== 'console')
}

/**
 * 获取可访问的主机器人
 * @param masters - 主机器人ID列表
 * @returns 
 */
export const getReachableMasterBots = async (
  masters: string[] = config.master()
): Promise<Array<{ master: string, bot: AdapterType }>> => {
  const owners = getNonConsoleMasters(masters)
  if (owners.length === 0) return []

  const bots = getCandidateBots()
  if (bots.length === 0) return []

  const friendsMap = new Map<string, FriendItem[]>()
  await Promise.all(
    bots.map(async bot => {
      try {
        const list = await bot.getFriendList()
        friendsMap.set(bot.account.selfId, Array.isArray(list) ? list as FriendItem[] : [])
      } catch {
        friendsMap.set(bot.account.selfId, [])
      }
    })
  )

  const result: Array<{ master: string, bot: AdapterType }> = []
  for (const master of owners) {
    const matchedBot = bots.find(bot => {
      return (friendsMap.get(bot.account.selfId) || []).some(friend => friend.userId === master)
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
