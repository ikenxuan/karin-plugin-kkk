import { format } from 'date-fns'
import karin from 'node-karin'

import { Render } from '@/module'
import { getStatisticsDB } from '@/module/db'
import { resolveAvatar } from '@/module/utils/avatar'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { logger } from '@/module/utils/logger'
import { aggregateGlobal, aggregateGroup, TREND_DAYS } from '@/module/utils/statisticsAggregate'

/** 向 bot 索取头像时用的尺寸档；接口只接受 0/40/100/140 四档 */
const AVATAR_FETCH_SIZE = 100

/**
 * 向 bot 要头像 URL。
 *
 * 适配器拿不到头像是常态（QQBot 有概率取不到群头像），失败或返回空串都统一返回 undefined，
 * 交给 `resolveAvatar` 回落到现场生成的 dither 头像。
 * @param get 真正发起请求的闭包
 */
const getAvatarUrl = async (get: () => Promise<string>): Promise<string | undefined> => {
  try {
    return (await get()) || undefined
  } catch (error) {
    logger.debug('[统计] 获取头像地址失败，将使用生成头像:', error)
    return undefined
  }
}

/**
 * 两个统计命令。
 *
 * 这里只负责「取数 → 聚合 → 补 bot 侧信息 → 渲染」，
 * 具体的行 → 图表数据变换全在 `@/module/utils/statisticsAggregate` 里（纯函数，可单测）。
 */

/**
 * #kkk解析统计 命令
 * 获取当前群的解析统计数据
 */
const handleGroupStatistics = wrapWithErrorHandler(
  async (e) => {
    // 获取群组ID
    const groupId = e.isGroup ? e.contact?.peer || '' : ''

    if (!groupId) {
      await e.reply('此命令仅支持在群聊中使用')
      return true
    }

    // 获取群组信息
    let groupName = ''
    let groupMemberCount: number | undefined
    let groupAvatarUrl: string | undefined
    try {
      const groupInfo = await e.bot.getGroupInfo(groupId)
      groupName = groupInfo?.groupName || ''
      groupMemberCount = groupInfo?.memberCount
      groupAvatarUrl = groupInfo?.avatar
    } catch (error) {
      logger.debug('[统计] 获取群组信息失败:', error)
    }
    // 群头像：优先问 bot 要（`getGroupAvatarUrl` 比 `groupInfo.avatar` 更可靠，
    // 部分适配器的群信息里不带头像），拿不到就现场生成一个，保证头部不会空着
    const groupAvatar = await resolveAvatar(
      groupId,
      (await getAvatarUrl(() => e.bot.getGroupAvatarUrl(groupId, AVATAR_FETCH_SIZE))) ?? groupAvatarUrl
    )

    // 获取统计数据库实例
    const statisticsDB = await getStatisticsDB()

    // 逐条取数（node-sqlite3 单连接，顺序执行最稳）
    const groupStats = await statisticsDB.getGroupStatistics(groupId)
    const groupHistory = await statisticsDB.getGroupRecentHistory(groupId, TREND_DAYS)
    const hourRows = await statisticsDB.getGroupHourStats(groupId)
    const workTypeRows = await statisticsDB.getGroupWorkTypeStats(groupId)
    const activeDays = await statisticsDB.getGroupActiveDays(groupId)
    const metricRows = await statisticsDB.getGroupMetricStats(groupId)
    const globalHistory = await statisticsDB.getRecentHistory(TREND_DAYS)
    const groupUniqueUsers = await statisticsDB.getGroupUniqueUsers(groupId)
    const globalSummary = await statisticsDB.getGlobalSummary()

    const { topUserRows, ...groupData } = aggregateGroup({
      groupStats,
      groupHistory,
      hourRows,
      workTypeRows,
      metricRows,
      globalHistory,
      activeDays,
      uniqueUsers: groupUniqueUsers
    })

    // 活跃用户榜要补昵称：群名片优先，取不到回落昵称，再取不到回落用户ID。
    // 单次 API 失败不能把整张海报带崩，所以逐个兜住。
    // 昵称和头像一起并行取：十个人串行等十轮太慢，而且单个人失败不该拖垮整张海报
    const topUsers = await Promise.all(
      topUserRows.map(async (row) => {
        const [memberInfo, avatarUrl] = await Promise.all([
          e.bot.getGroupMemberInfo(groupId, row.key).catch((error) => {
            logger.debug(`[统计] 获取群成员 ${row.key} 信息失败:`, error)
            return undefined
          }),
          getAvatarUrl(() => e.bot.getAvatarUrl(row.key, AVATAR_FETCH_SIZE))
        ])
        return {
          userId: row.key,
          name: memberInfo?.card || memberInfo?.nick || row.key,
          count: row.count,
          // segments 是聚合层算好的平台构成，补昵称时原样带上
          segments: row.segments,
          avatar: await resolveAvatar(row.key, avatarUrl)
        }
      })
    )

    // 渲染统计图片
    const img = await Render(e, 'statistics/group', {
      groupId,
      groupName,
      groupMemberCount,
      groupAvatar,
      generatedAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
      ...groupData,
      topUsers,
      globalTotalGroups: globalSummary.totalGroups,
      globalTotalParses: globalSummary.totalParses
    })

    await e.reply(img)
    return true
  },
  {
    businessName: '群组解析统计'
  }
)

export const groupStatistics = karin.command(/^#?kkk解析统计$/, handleGroupStatistics, { name: 'kkk-解析统计' })

/**
 * #kkk全局解析统计 命令
 * 获取整个插件的全局解析统计数据
 */
const handleGlobalStatistics = wrapWithErrorHandler(
  async (e) => {
    // 获取统计数据库实例
    const statisticsDB = await getStatisticsDB()

    // 逐条取数（node-sqlite3 单连接，顺序执行最稳）
    const allStats = await statisticsDB.getAllStatistics()
    const historyData = await statisticsDB.getRecentHistory(TREND_DAYS)
    const historyCompleteFrom = await statisticsDB.getHistoryCompleteFrom()
    const workTypeRows = await statisticsDB.getGlobalWorkTypeStats()
    const firstSeen = await statisticsDB.getGroupFirstSeen()
    const metricRows = await statisticsDB.getGlobalMetricStats()

    const { topGroupRows, ...globalData } = aggregateGlobal({
      allStats,
      historyData,
      firstSeen,
      workTypeRows,
      metricRows,
      historyCompleteFrom
    })

    // 群组排行补群名（同样逐个兜住）
    const topGroups = await Promise.all(
      topGroupRows.map(async (row) => {
        const [groupInfo, avatarUrl] = await Promise.all([
          e.bot.getGroupInfo(row.groupId).catch((error) => {
            logger.debug(`[统计] 获取群组 ${row.groupId} 信息失败:`, error)
            return undefined
          }),
          getAvatarUrl(() => e.bot.getGroupAvatarUrl(row.groupId, AVATAR_FETCH_SIZE))
        ])
        return {
          ...row,
          name: groupInfo?.groupName || row.groupId,
          avatar: await resolveAvatar(row.groupId, avatarUrl ?? groupInfo?.avatar)
        }
      })
    )

    // 统计起始日：所有群里最早的一次记录
    const statsSince = firstSeen.length > 0 ? firstSeen.map((row) => row.firstSeen.split('T')[0]).sort()[0] : undefined

    // 渲染统计图片
    const img = await Render(e, 'statistics/global', {
      generatedAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
      ...globalData,
      statsSince,
      topGroups
    })

    await e.reply(img)
    return true
  },
  {
    businessName: '全局解析统计'
  }
)

export const globalStatistics = karin.command(/^#?kkk全局解析统计$/, handleGlobalStatistics, {
  name: 'kkk-全局解析统计',
  perm: 'master'
})
