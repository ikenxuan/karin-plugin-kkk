import type { BaseComponentProps } from '../../index'

/**
 * 群组解析统计数据接口
 */
export interface GroupStatisticsProps extends BaseComponentProps {
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 群组ID */
    groupId: string
    /** 群组名称 */
    groupName?: string
    /** 群组人数 */
    groupMemberCount?: number
    /** 群组头像 */
    groupAvatar?: string
    /** 群组总解析次数 */
    groupTotalParses: number
    /** 群组唯一用户数 */
    groupUniqueUsers: number
    /** 各平台解析数据 */
    platformData: {
      douyin: number
      bilibili: number
      kuaishou: number
      xiaohongshu: number
    }
    /** 全局总群组数 */
    globalTotalGroups: number
    /** 全局总解析次数 */
    globalTotalParses: number
  }
}

/**
 * 全局解析统计数据接口
 */
export interface GlobalStatisticsProps extends BaseComponentProps {
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 所有统计数据 */
    allStats: Array<{
      id: number
      groupId: string
      userId: string
      platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu'
      parseCount: number
      createdAt: string
      updatedAt: string
    }>
    /** 历史数据（最近30天） */
    historyData: Array<{
      date: string
      totalParses: number
      douyin: number
      bilibili: number
      kuaishou: number
      xiaohongshu: number
    }>
    /** 群组信息映射 */
    groupInfoMap: Record<string, {
      groupName?: string
      groupAvatar?: string
    }>
  }
}
