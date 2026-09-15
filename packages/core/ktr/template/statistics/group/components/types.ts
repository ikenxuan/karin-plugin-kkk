/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

import type { MetricDistribution, StatisticsPlatform, StatisticsWorkType } from '../../components/types'

/** 平台明细的一行（环图旁边的表格用） */
export interface PlatformCount {
  /** 平台 */
  platform: StatisticsPlatform
  /** 解析次数 */
  count: number
  /** 该平台上用过的去重人数 */
  users: number
}

/** 趋势图的一个数据点 */
export interface TrendPoint {
  /** 日期 (YYYY-MM-DD) */
  date: string
  /** 当日解析次数 */
  count: number
}

/** 榜单条目的平台构成（堆叠条用） */
export interface RankSegment {
  /** 平台 */
  platform: StatisticsPlatform
  /** 该平台贡献的次数 */
  count: number
}

/** 活跃用户条目 */
export interface TopUser {
  /** 用户ID */
  userId: string
  /** 展示名：群名片优先，取不到回落昵称，再取不到回落用户ID */
  name: string
  /** 解析次数 */
  count: number
  /** 各平台各贡献了多少，排行榜的堆叠条用它 */
  segments: RankSegment[]
  /**
   * 头像的 data URI。
   * 由后端保证一定有值：真实头像拉不到时会现场生成一个 dither 头像。
   */
  avatar: string
}

/** 内容形态计数 */
export interface WorkTypeCount {
  /** 内容形态 */
  workType: StatisticsWorkType
  /** 解析次数 */
  count: number
}

/** 某平台在各小时上的分布 */
export interface PlatformHourCount {
  /** 平台 */
  platform: StatisticsPlatform
  /** 24 个小时的次数，下标即小时 */
  values: number[]
}

/**
 * 群组解析统计数据接口
 */
export interface GroupStatisticsData {
  /** 群组ID */
  groupId: string
  /** 群组名称 */
  groupName?: string
  /** 群组人数 */
  groupMemberCount?: number
  /** 群组头像 */
  groupAvatar?: string
  /** 数据截止时间（海报上标注，避免读者把旧图当新图） */
  generatedAt: string

  /** 本群总解析次数 */
  groupTotalParses: number
  /** 本群唯一用户数 */
  groupUniqueUsers: number
  /** 人均解析次数 */
  parsesPerUser: number
  /** 有解析记录的天数 */
  activeDays: number
  /** 最活跃平台，无数据时不传 */
  topPlatform?: StatisticsPlatform

  /** 各平台解析数据，按次数降序 */
  platformData: PlatformCount[]
  /** 近 30 天趋势，按日期升序 */
  trend: TrendPoint[]
  /** 全局日均解析次数，作为趋势图的参照基准 */
  globalDailyAverage: number
  /** 本群活跃用户 TOP，按次数降序 */
  topUsers: TopUser[]
  /** 24 小时分布，长度固定 24，下标即小时 */
  hourly: number[]
  /** 周一到周日的解析次数，长度固定 7 */
  weekday: number[]
  /** 各平台在 24 小时上的分布 */
  platformHourly: PlatformHourCount[]
  /** 内容形态分布，按次数降序 */
  workTypes: WorkTypeCount[]
  /** 耗时 / 作品时长 / 点赞的分桶分布；一次都没采到的指标不会出现 */
  metrics: MetricDistribution[]

  /** 全局总群组数 */
  globalTotalGroups: number
  /** 全局总解析次数 */
  globalTotalParses: number
}
