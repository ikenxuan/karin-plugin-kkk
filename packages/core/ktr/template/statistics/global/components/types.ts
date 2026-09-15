/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

import type { ActivityBox, ActivityHeatmap, MetricDistribution, StatisticsPlatform, StatisticsWorkType } from '../../components/types'

/** 平台明细的一行（环图旁边的表格用） */
export interface PlatformCount {
  /** 平台 */
  platform: StatisticsPlatform
  /** 解析次数 */
  count: number
  /** 该平台覆盖的去重群数 */
  groups: number
  /** 该平台覆盖的去重用户数 */
  users: number
}

/** 趋势图的一个数据点 */
export interface TrendPoint {
  /** 日期 (YYYY-MM-DD) */
  date: string
  /** 当日数值 */
  count: number
}

/** 分平台的每日序列 */
export interface PlatformTrendSeries {
  /** 平台 */
  platform: StatisticsPlatform
  /** 与 `PlatformTrend.dates` 一一对应的每日次数 */
  values: number[]
}

/** 分平台的每日趋势 */
export interface PlatformTrend {
  /** 日期轴 (YYYY-MM-DD)，升序 */
  dates: string[]
  /** 各平台的序列 */
  series: PlatformTrendSeries[]
}

/** 榜单条目的平台构成（堆叠条用） */
export interface RankSegment {
  /** 平台 */
  platform: StatisticsPlatform
  /** 该平台贡献的次数 */
  count: number
}

/** 群组排行条目 */
export interface GroupRankItem {
  /** 群号 */
  groupId: string
  /** 群名，取不到时回落群号 */
  name: string
  /**
   * 群头像的 data URI。
   * 由后端保证一定有值：真实头像拉不到时会现场生成一个 dither 头像
   * （QQBot 这类适配器有概率取不到群头像）。
   */
  avatar: string
  /** 该群总解析次数 */
  totalParses: number
  /** 该群使用人数 */
  uniqueUsers: number
  /** 各平台各贡献了多少，排行榜的堆叠条用它 */
  segments: RankSegment[]
}

/** 直方图分桶 */
export interface SizeBucket {
  /** 桶标签，如 `11-50` */
  label: string
  /** 落在该桶里的群数 */
  count: number
}

/** 平台 × 内容形态的计数 */
export interface PlatformWorkTypeCount {
  /** 平台 */
  platform: StatisticsPlatform
  /** 内容形态 */
  workType: StatisticsWorkType
  /** 解析次数 */
  count: number
}

/**
 * 全局解析统计数据接口
 */
export interface GlobalStatisticsData {
  /** 数据截止时间 */
  generatedAt: string

  /** 服务过的群组总数 */
  totalGroups: number
  /** 使用过的用户总数 */
  totalUsers: number
  /** 总解析次数 */
  totalParses: number
  /** 有解析记录的平台数 */
  activePlatforms: number
  /** 最早一条解析记录的日期 (YYYY-MM-DD)，没有任何记录时为空 */
  statsSince?: string

  /** 平台分布，按次数降序 */
  platformData: PlatformCount[]
  /** 全局近 30 天趋势 */
  trend: TrendPoint[]
  /**
   * 可信数据的起始日。
   * 老库回填会把用户的历史总次数全压在他首次解析那天，这段区间的趋势是失真的，
   * 模板据此把该段画成灰色虚线并加注说明。全部可信时为空。
   */
  trendCompleteFrom?: string
  /** 近 30 天的日均解析次数，作为趋势图的基准虚线 */
  dailyAverage: number
  /** 分平台每日趋势 */
  platformTrend: PlatformTrend
  /** 周一到周日的解析次数，长度固定 7 */
  weekday: number[]

  /** 群组排行 TOP */
  topGroups: GroupRankItem[]
  /** 群规模分布 */
  sizeBuckets: SizeBucket[]
  /** 群组累计增长曲线 */
  groupGrowth: TrendPoint[]
  /** 用户活跃度：群数档 × 解析次数档的二维分布 */
  userActivity: ActivityHeatmap
  /** 群组活跃度：按群人数分档的解析次数箱线分布 */
  groupActivity: ActivityBox[]
  /** 群沉默分布：按最后一次解析距今的天数分桶 */
  silenceBuckets: SizeBucket[]
  /** 平台 × 内容形态 */
  workTypes: PlatformWorkTypeCount[]
  /** 耗时 / 作品时长 / 点赞的分桶分布；一次都没采到的指标不会出现 */
  metrics: MetricDistribution[]
}
