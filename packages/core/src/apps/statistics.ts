import karin, { logger } from 'node-karin'

import { Render } from '@/module'
import { getStatisticsDB } from '@/module/db'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'

/**
 * #kkk解析统计 命令
 * 获取当前群的解析统计数据
 */
const handleGroupStatistics = wrapWithErrorHandler(async (e) => {
  // 获取群组ID
  const groupId = e.isGroup ? (e.contact?.peer || '') : ''

  if (!groupId) {
    await e.reply('此命令仅支持在群聊中使用')
    return true
  }

  // 获取群组信息
  let groupName = ''
  let groupMemberCount: number | undefined
  let groupAvatar: string | undefined
  try {
    const groupInfo = await e.bot.getGroupInfo(groupId)
    groupName = groupInfo?.groupName || ''
    groupMemberCount = groupInfo?.memberCount
    groupAvatar = groupInfo?.avatar
  } catch (error) {
    logger.debug('[统计] 获取群组信息失败:', error)
  }

  // 获取统计数据库实例
  const statisticsDB = await getStatisticsDB()

  // 获取当前群组的统计数据
  const groupStats = await statisticsDB.getGroupStatistics(groupId)

  // 获取当前群组的唯一用户数
  const groupUniqueUsers = await statisticsDB.getGroupUniqueUsers(groupId)

  // 获取全局统计数据
  const globalSummary = await statisticsDB.getGlobalSummary()

  // 计算当前群组的总解析次数
  const groupTotalParses = groupStats.reduce((sum, stat) => sum + stat.parseCount, 0)

  // 构建平台统计数据（按平台聚合所有用户的解析次数）
  const platformData = {
    douyin: groupStats.filter(s => s.platform === 'douyin').reduce((sum, s) => sum + s.parseCount, 0),
    bilibili: groupStats.filter(s => s.platform === 'bilibili').reduce((sum, s) => sum + s.parseCount, 0),
    kuaishou: groupStats.filter(s => s.platform === 'kuaishou').reduce((sum, s) => sum + s.parseCount, 0),
    xiaohongshu: groupStats.filter(s => s.platform === 'xiaohongshu').reduce((sum, s) => sum + s.parseCount, 0)
  }

  // 渲染统计图片
  const img = await Render(e, 'statistics/group', {
    groupId,
    groupName,
    groupMemberCount,
    groupAvatar,
    groupTotalParses,
    groupUniqueUsers,
    platformData,
    globalTotalGroups: globalSummary.totalGroups,
    globalTotalParses: globalSummary.totalParses
  })

  await e.reply(img)
  return true
}, {
  businessName: '群组解析统计'
})

export const groupStatistics = karin.command(/^#?kkk解析统计$/, handleGroupStatistics, { name: 'kkk-解析统计' })

/**
 * #kkk全局解析统计 命令
 * 获取整个插件的全局解析统计数据
 */
const handleGlobalStatistics = wrapWithErrorHandler(async (e) => {
  // 获取统计数据库实例
  const statisticsDB = await getStatisticsDB()

  // 获取所有原始统计数据
  const allStats = await statisticsDB.getAllStatistics()

  // 获取最近30天的历史数据
  const historyData = await statisticsDB.getRecentHistory(30)

  // 获取所有群组ID
  const groupIds = [...new Set(allStats.map(s => s.groupId))]

  // 获取每个群组的详细信息
  const groupInfoMap = new Map<string, { groupName?: string; groupAvatar?: string }>()
  for (const groupId of groupIds) {
    try {
      const groupInfo = await e.bot.getGroupInfo(groupId)
      groupInfoMap.set(groupId, {
        groupName: groupInfo?.groupName,
        groupAvatar: groupInfo?.avatar
      })
    } catch (error) {
      logger.debug(`[统计] 获取群组 ${groupId} 信息失败:`, error)
    }
  }

  // 渲染统计图片
  const img = await Render(e, 'statistics/global', {
    allStats,
    historyData: historyData.reverse(),
    groupInfoMap: Object.fromEntries(groupInfoMap)
  })

  await e.reply(img)
  return true
}, {
  businessName: '全局解析统计'
})

export const globalStatistics = karin.command(/^#?kkk全局解析统计$/, handleGlobalStatistics, { name: 'kkk-全局解析统计', perm: 'master' })
