import {
  METRIC_BUCKETS,
  type ParseMetric,
  type ParseMetricBucketRow,
  type ParsePlatform,
  type ParseWorkType
} from '@/module/db'

/**
 * 统计海报的**纯聚合层**。
 *
 * 从 `apps/statistics.ts` 里抽出来的原因：原来这些计算散在两个 handler 闭包里，
 * 除了「跑一遍真实命令」之外没有任何办法验证 —— 而海报模板的测试用的是手写夹具，
 * 只能证明「给模板这些数据能画出来」，证明不了「后端真能算出这些数据」。
 * 抽成纯函数之后，可以用真实的库写入 → 真实查询 → 真实聚合做端到端断言。
 *
 * 这里只做「行 → 图表数据」的变换，不碰数据库、不碰 bot API、不碰渲染。
 */

/** 趋势图回看天数 */
export const TREND_DAYS = 30
/** 活跃用户榜取前 N 名 */
export const TOP_USER_LIMIT = 10

/** 群规模分桶的边界（右开区间，最后一档无上界） */
export const SIZE_BUCKETS: Array<{ label: string; min: number; max: number }> = [
  { label: '1-10', min: 1, max: 10 },
  { label: '11-50', min: 11, max: 50 },
  { label: '51-200', min: 51, max: 200 },
  { label: '201-1000', min: 201, max: 1000 },
  { label: '1000+', min: 1001, max: Number.MAX_SAFE_INTEGER }
]

/** 群沉默分桶：按最后一次解析距今的天数 */
export const SILENCE_BUCKETS: Array<{ label: string; min: number; max: number }> = [
  { label: '今天', min: 0, max: 0 },
  { label: '1-7天', min: 1, max: 7 },
  { label: '8-30天', min: 8, max: 30 },
  { label: '31-90天', min: 31, max: 90 },
  { label: '90天+', min: 91, max: Number.MAX_SAFE_INTEGER }
]

/**
 * 用户活跃度热力图的横轴档：按用过几个群。
 * 上界统一是 `value < max`，所以「1 个群」的 max 是 2。
 */
export const USER_GROUP_BUCKETS: Array<{ label: string; max: number }> = [
  { label: '1 个群', max: 2 },
  { label: '2-3 个群', max: 4 },
  { label: '4-6 个群', max: 7 },
  { label: '7-9 个群', max: 10 },
  { label: '10+ 个群', max: Number.MAX_SAFE_INTEGER }
]

/** 热力图纵轴档：按用户总解析次数 */
export const USER_PARSE_BUCKETS: Array<{ label: string; max: number }> = [
  { label: '<50', max: 50 },
  { label: '50-200', max: 200 },
  { label: '200-500', max: 500 },
  { label: '500-1k', max: 1000 },
  { label: '1k+', max: Number.MAX_SAFE_INTEGER }
]

/** 群组活跃度箱线图的横轴档：按群内使用人数 */
export const GROUP_USER_BUCKETS: Array<{ label: string; max: number }> = [
  { label: '<20', max: 20 },
  { label: '20-50', max: 50 },
  { label: '50-100', max: 100 },
  { label: '100-300', max: 300 },
  { label: '300+', max: Number.MAX_SAFE_INTEGER }
]

/** 生成最近 N 天的 UTC 日期窗口（升序），与写入端 `toISOString().split('T')[0]` 同口径 */
export const buildDateWindow = (days: number): string[] => {
  const today = new Date()
  const dates: string[] = []
  for (let offset = days - 1; offset >= 0; offset--) {
    const day = new Date(today)
    day.setUTCDate(day.getUTCDate() - offset)
    dates.push(day.toISOString().split('T')[0])
  }
  return dates
}

/**
 * 平台计数表 → 排行榜用的堆叠分段（次数降序）。
 * 顺序固定成「多的在前」，堆叠条的色块从粗到细，读起来有主次。
 */
const toSegments = (byPlatform?: Map<ParsePlatform, number>): Array<{ platform: ParsePlatform; count: number }> =>
  [...(byPlatform ?? new Map<ParsePlatform, number>()).entries()]
    .map(([platform, count]) => ({ platform, count }))
    .filter((segment) => segment.count > 0)
    .sort((a, b) => b.count - a.count)

/** 统计每个群在每个平台上的去重用户数 */
export const sumBy = <T extends string>(rows: Array<{ key: T; count: number }>): Array<{ key: T; count: number }> => {
  const merged = new Map<T, number>()
  for (const row of rows) {
    merged.set(row.key, (merged.get(row.key) ?? 0) + row.count)
  }
  return [...merged.entries()]
    .map(([key, count]) => ({ key, count }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
}

/**
 * 把耗时分桶行整理成「桶序固定、缺的补 0」的结构。
 *
 * 桶序必须按 `METRIC_BUCKETS` 的定义走，不能按字典序 —— 否则 `<1s` 会排到 `3-5s` 后面。
 * 一次都没采到就返回空数组，模板侧据此不渲染那张图。
 */
export const buildMetricDistributions = (rows: ParseMetricBucketRow[]) =>
  (Object.keys(METRIC_BUCKETS) as ParseMetric[])
    .map((metric) => {
      const all = METRIC_BUCKETS[metric].map((bucket) => ({
        label: bucket.label,
        upper: bucket.upper,
        count: rows.find((row) => row.metric === metric && row.bucket === bucket.label)?.count ?? 0
      }))
      return { metric, buckets: trimEmptyBuckets(all) }
    })
    .filter((item) => item.buckets.length > 0)

/**
 * 裁掉两端连续为空的档，只留「有数据的范围 + 左右各一个空档」。
 *
 * 横轴不能写死：档位按最慢的情况铺到了 10min+，正常部署下末尾一大半永远是空的；
 * 反过来如果部署整体偏慢，前面一大半又永远是空的 —— 两头都会把真正有数据的区间挤成一小撮。
 * 左右各留一个空档，是为了让累计曲线有个从 0% 起来的起点、以及到 100% 之后的平台段，
 * 只剩一个数据档时也不至于退化成孤零零一个点。
 * @param buckets 按档位顺序排好的桶
 * @returns 裁剪后的桶；整条都没数据时返回空数组
 */
export const trimEmptyBuckets = <T extends { count: number }>(buckets: T[]): T[] => {
  const first = buckets.findIndex((bucket) => bucket.count > 0)
  if (first < 0) return []
  let last = buckets.length - 1
  while (last > first && buckets[last].count === 0) last--
  return buckets.slice(Math.max(0, first - 1), Math.min(buckets.length, last + 2))
}

/** 把日期/时间戳归到「本地时区当天零点」，用来算跨了几个自然日 */
export const startOfLocalDay = (value: number | string): number => {
  const date = new Date(value)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/** 日期字符串 → 0(周一) ~ 6(周日) */
export const weekdayIndexOf = (date: string): number => (new Date(`${date}T00:00:00Z`).getUTCDay() + 6) % 7

/** 取数值落在第几档；超出最后一档归到最后一格 */
export const bucketIndexOf = (buckets: Array<{ max: number }>, value: number): number => {
  const index = buckets.findIndex((bucket) => value < bucket.max)
  return index === -1 ? buckets.length - 1 : index
}

/**
 * 五数概括 `[最小, Q1, 中位数, Q3, 最大]`，线性插值取分位。
 * 空数组返回全 0 —— 调用方会按 count 过滤掉空档，不会把 0 当成真数据画出去。
 */
export const fiveNumberSummary = (values: number[]): [number, number, number, number, number] => {
  if (values.length === 0) return [0, 0, 0, 0, 0]
  const sorted = [...values].sort((a, b) => a - b)
  const quantile = (q: number): number => {
    const position = (sorted.length - 1) * q
    const low = Math.floor(position)
    const high = Math.ceil(position)
    return Math.round(sorted[low] + (sorted[high] - sorted[low]) * (position - low))
  }
  return [sorted[0], quantile(0.25), quantile(0.5), quantile(0.75), sorted[sorted.length - 1]]
}

/**
 * 把「按天的数值」折算成「每个星期几的日均」。
 *
 * 关键在于分母：必须用**窗口里有几个该星期几**，而不是有几天有数据。
 * 30 天窗口里周一/周二各 5 天、其余各 4 天，不除的话条形高度里会混进 25% 的曝光偏差。
 * @param windowDates 窗口内的全部日期（升序），用来数每个星期几出现几次
 * @param rows 有数据的天
 */
export const buildWeekdayAverages = (windowDates: string[], rows: Array<{ date: string; count: number }>): number[] => {
  const occurrences = new Array<number>(7).fill(0)
  const totals = new Array<number>(7).fill(0)
  for (const date of windowDates) occurrences[weekdayIndexOf(date)] += 1
  for (const row of rows) totals[weekdayIndexOf(row.date)] += row.count
  return totals.map((total, index) => (occurrences[index] > 0 ? Math.round(total / occurrences[index]) : 0))
}

/** 聚合层需要的最小行形状 —— 真实查询结果带的额外字段结构上兼容 */
export interface GroupStatRow {
  /** 平台 */
  platform: ParsePlatform
  /** 用户ID */
  userId: string
  /** 该用户在该平台的解析次数 */
  parseCount: number
}

/** 群维度日粒度行 */
export interface GroupHistoryRow {
  /** 日期 */
  date: string
  /** 该日该平台的次数 */
  parseCount: number
}

/** 小时粒度行 */
export interface HourRow {
  /** 小时 0-23 */
  hour: number
  /** 平台 */
  platform: ParsePlatform
  /** 次数 */
  parseCount: number
}

/** 群统计聚合的输入 */
export interface GroupAggregateInput {
  /** 群 × 人 × 平台 的累计行 */
  groupStats: GroupStatRow[]
  /** 本群日粒度行（近 TREND_DAYS 天） */
  groupHistory: GroupHistoryRow[]
  /** 本群小时粒度行 */
  hourRows: HourRow[]
  /** 本群内容形态行 */
  workTypeRows: Array<{ workType: ParseWorkType; parseCount: number }>
  /** 本群耗时分布行 */
  metricRows: ParseMetricBucketRow[]
  /** 全局日粒度行，用来算基准日均 */
  globalHistory: Array<{ totalParses: number }>
  /** 有记录的天数（来自单独的 COUNT 查询） */
  activeDays: number
  /** 群内去重用户数（来自单独的 COUNT 查询） */
  uniqueUsers: number
}

/**
 * 群海报的聚合：把六组查询结果变成模板直接可用的形状。
 * @param input 群相关的各维度行
 */
export const aggregateGroup = (input: GroupAggregateInput) => {
  const { groupStats, groupHistory, hourRows, workTypeRows, metricRows, globalHistory, activeDays, uniqueUsers } = input

  const groupTotalParses = groupStats.reduce((sum, stat) => sum + stat.parseCount, 0)

  // 平台分布：按平台聚合并降序，只留有数据的平台
  const platformUsers = new Map<ParsePlatform, Set<string>>()
  for (const stat of groupStats) {
    if (!platformUsers.has(stat.platform)) platformUsers.set(stat.platform, new Set())
    platformUsers.get(stat.platform)!.add(stat.userId)
  }
  const platformData = sumBy(groupStats.map((stat) => ({ key: stat.platform, count: stat.parseCount }))).map((item) => ({
    platform: item.key,
    count: item.count,
    users: platformUsers.get(item.key)?.size ?? 0
  }))

  // 趋势：按天补齐窗口，缺的那天补 0 —— 不补的话折线会把断档直接连成直线
  const windowDates = buildDateWindow(TREND_DAYS)
  const dailyTotals = new Map<string, number>()
  for (const row of groupHistory) {
    dailyTotals.set(row.date, (dailyTotals.get(row.date) ?? 0) + row.parseCount)
  }
  const trend = windowDates.map((date) => ({ date, count: dailyTotals.get(date) ?? 0 }))

  // 全局日均：给本群趋势当参照基准
  const globalDailyAverage =
    globalHistory.length > 0 ? globalHistory.reduce((sum, row) => sum + row.totalParses, 0) / globalHistory.length : 0

  // 24 小时分布：补满 24 格，跨平台求和
  const hourly = new Array<number>(24).fill(0)
  for (const row of hourRows) {
    if (row.hour >= 0 && row.hour < 24) hourly[row.hour] += row.parseCount
  }

  // 周内分布：算「该星期几的日均」而不是累计总量。
  // 30 天窗口不是 7 的整数倍（末尾那两天对应的星期几各出现 5 次，其余各 4 次），
  // 直接求和的话那两个星期几会凭空高出 25%，纯粹是曝光天数造成的，跟用户行为无关。
  // 出现天数必须按窗口日期数，不能按有数据的行为准 —— 没记录的那天也算出现了一次。
  const weekday = buildWeekdayAverages(windowDates, groupHistory.map((row) => ({ date: row.date, count: row.parseCount })))

  // 平台 × 时段：ParseHourStats 本身就带 platform，直接铺成矩阵
  const platformHourMap = new Map<ParsePlatform, number[]>()
  for (const row of hourRows) {
    if (row.hour < 0 || row.hour > 23) continue
    if (!platformHourMap.has(row.platform)) platformHourMap.set(row.platform, new Array<number>(24).fill(0))
    platformHourMap.get(row.platform)![row.hour] += row.parseCount
  }
  const platformHourly = platformData
    .filter((item) => platformHourMap.has(item.platform))
    .map((item) => ({ platform: item.platform, values: platformHourMap.get(item.platform)! }))

  // 每个用户的平台构成，给活跃用户榜做堆叠条
  const userPlatforms = new Map<string, Map<ParsePlatform, number>>()
  for (const stat of groupStats) {
    if (!userPlatforms.has(stat.userId)) userPlatforms.set(stat.userId, new Map())
    const byPlatform = userPlatforms.get(stat.userId)!
    byPlatform.set(stat.platform, (byPlatform.get(stat.platform) ?? 0) + stat.parseCount)
  }

  return {
    groupTotalParses,
    groupUniqueUsers: uniqueUsers,
    parsesPerUser: uniqueUsers > 0 ? groupTotalParses / uniqueUsers : 0,
    activeDays,
    topPlatform: platformData[0]?.platform,
    platformData,
    trend,
    globalDailyAverage,
    /** 活跃用户榜的原始行，昵称由调用方补（要打 bot API） */
    topUserRows: sumBy(groupStats.map((stat) => ({ key: stat.userId, count: stat.parseCount })))
      .slice(0, TOP_USER_LIMIT)
      .map((row) => ({ ...row, segments: toSegments(userPlatforms.get(row.key)) })),
    hourly,
    weekday,
    platformHourly,
    workTypes: sumBy(workTypeRows.map((row) => ({ key: row.workType, count: row.parseCount }))).map((item) => ({
      workType: item.key,
      count: item.count
    })),
    metrics: buildMetricDistributions(metricRows)
  }
}

/** 全局聚合的输入 */
export interface GlobalAggregateInput {
  /** 全量 群 × 人 × 平台 累计行 */
  allStats: Array<GroupStatRow & { groupId: string; updatedAt: string }>
  /** 全局日粒度行 */
  historyData: Array<{ date: string; totalParses: number; douyin: number; bilibili: number; kuaishou: number; xiaohongshu: number }>
  /** 每个群首次出现解析的日期 */
  firstSeen: Array<{ groupId: string; firstSeen: string }>
  /** 全局内容形态行 */
  workTypeRows: Array<{ platform: ParsePlatform; workType: ParseWorkType; parseCount: number }>
  /** 全局耗时分布行 */
  metricRows: ParseMetricBucketRow[]
  /** 趋势可信起始日 */
  historyCompleteFrom?: string
  /** 当前时间戳，用于算群沉默天数（测试里可注入固定值） */
  nowMs?: number
}

/**
 * 全局海报的聚合：把六组查询结果变成模板直接可用的形状。
 * @param input 全局各维度行
 */
export const aggregateGlobal = (input: GlobalAggregateInput) => {
  const { allStats, historyData, firstSeen, workTypeRows, metricRows, historyCompleteFrom, nowMs = Date.now() } = input

  const totalParses = allStats.reduce((sum, stat) => sum + stat.parseCount, 0)
  const totalUsers = new Set(allStats.map((stat) => stat.userId)).size

  // 每个平台覆盖了多少群、多少用户
  const platformGroups = new Map<ParsePlatform, Set<string>>()
  const platformUsers = new Map<ParsePlatform, Set<string>>()
  for (const stat of allStats) {
    if (!platformGroups.has(stat.platform)) {
      platformGroups.set(stat.platform, new Set())
      platformUsers.set(stat.platform, new Set())
    }
    platformGroups.get(stat.platform)!.add(stat.groupId)
    platformUsers.get(stat.platform)!.add(stat.userId)
  }
  const platformData = sumBy(allStats.map((stat) => ({ key: stat.platform, count: stat.parseCount }))).map((item) => ({
    platform: item.key,
    count: item.count,
    groups: platformGroups.get(item.key)?.size ?? 0,
    users: platformUsers.get(item.key)?.size ?? 0
  }))

  // 全局趋势：按天补齐窗口
  const historyByDate = new Map(historyData.map((row) => [row.date, row]))
  const windowDates = buildDateWindow(TREND_DAYS)
  const trend = windowDates.map((date) => ({ date, count: historyByDate.get(date)?.totalParses ?? 0 }))
  const dailyAverage = trend.length > 0 ? trend.reduce((sum, point) => sum + point.count, 0) / trend.length : 0

  // 分平台趋势：ParseHistory 带各平台列，直接铺开
  const platformTrend = {
    dates: windowDates,
    series: platformData.map((item) => ({
      platform: item.platform,
      values: windowDates.map((date) => historyByDate.get(date)?.[item.platform] ?? 0)
    }))
  }

  // 周内分布：同群维度，取「该星期几的日均」
  const weekday = buildWeekdayAverages(windowDates, historyData.map((row) => ({ date: row.date, count: row.totalParses })))

  // 按群聚合：总次数 + 使用人数
  const groupAgg = new Map<string, { totalParses: number; users: Set<string>; platforms: Map<ParsePlatform, number> }>()
  const lastSeenByGroup = new Map<string, string>()
  for (const stat of allStats) {
    const entry = groupAgg.get(stat.groupId) ?? { totalParses: 0, users: new Set<string>(), platforms: new Map<ParsePlatform, number>() }
    entry.totalParses += stat.parseCount
    entry.users.add(stat.userId)
    entry.platforms.set(stat.platform, (entry.platforms.get(stat.platform) ?? 0) + stat.parseCount)
    groupAgg.set(stat.groupId, entry)

    const prev = lastSeenByGroup.get(stat.groupId)
    if (!prev || stat.updatedAt > prev) lastSeenByGroup.set(stat.groupId, stat.updatedAt)
  }

  // 群规模分布
  const sizeBuckets = SIZE_BUCKETS.map((bucket) => ({
    label: bucket.label,
    count: [...groupAgg.values()].filter((agg) => agg.totalParses >= bucket.min && agg.totalParses <= bucket.max).length
  }))

  // 群沉默分布：每个群最后一次解析距今几个**自然日**。
  // 用 24 小时整除的话，昨晚 23:00 解析过的群会被算进「今天」，
  // 而标签上写的是自然日口径，读起来对不上。
  const todayStart = startOfLocalDay(nowMs)
  const silenceBuckets = SILENCE_BUCKETS.map((bucket) => ({
    label: bucket.label,
    count: [...lastSeenByGroup.values()].filter((iso) => {
      const days = Math.round((todayStart - startOfLocalDay(iso)) / 86400000)
      return days >= bucket.min && days <= bucket.max
    }).length
  }))

  // 群组增长：按首次出现日期做累计，窗口外的老群计入起点基数
  const firstSeenByDate = new Map<string, number>()
  let growthBase = 0
  const windowStart = windowDates[0]
  for (const row of firstSeen) {
    const date = row.firstSeen.split('T')[0]
    if (date < windowStart) {
      growthBase++
      continue
    }
    firstSeenByDate.set(date, (firstSeenByDate.get(date) ?? 0) + 1)
  }
  let cumulative = growthBase
  const groupGrowth = windowDates.map((date) => {
    cumulative += firstSeenByDate.get(date) ?? 0
    return { date, count: cumulative }
  })

  // 用户聚合：跨了几个群、总共解析多少次
  const userAgg = new Map<string, { parses: number; groups: Set<string> }>()
  for (const stat of allStats) {
    const entry = userAgg.get(stat.userId) ?? { parses: 0, groups: new Set<string>() }
    entry.parses += stat.parseCount
    entry.groups.add(stat.groupId)
    userAgg.set(stat.userId, entry)
  }

  // 用户活跃度热力图：把**全部**用户打进二维矩阵。
  // 这里刻意不做 TopN 截断 —— 分布图一旦只取最活跃的那批，口径就废了
  // （会得到「人人都是重度用户」的假象）。矩阵本身只有 5×5 格，聚合后传输量反而最小。
  const heatCounts = new Map<string, number>()
  for (const agg of userAgg.values()) {
    const x = bucketIndexOf(USER_GROUP_BUCKETS, agg.groups.size)
    const y = bucketIndexOf(USER_PARSE_BUCKETS, agg.parses)
    const key = `${x}:${y}`
    heatCounts.set(key, (heatCounts.get(key) ?? 0) + 1)
  }
  const heatCells: Array<[number, number, number]> = [...heatCounts.entries()].map(([key, count]) => {
    const [x, y] = key.split(':').map(Number)
    return [x, y, count]
  })

  // 群组活跃度箱线：按群人数分档，看各档的解析次数分布。
  // 空档直接丢掉，否则轴上会出现一根没有意义的零箱体。
  const groupActivity = GROUP_USER_BUCKETS.map((bucket, index) => {
    const inBucket = [...groupAgg.values()].filter((agg) => bucketIndexOf(GROUP_USER_BUCKETS, agg.users.size) === index)
    return { label: bucket.label, count: inBucket.length, box: fiveNumberSummary(inBucket.map((agg) => agg.totalParses)) }
  }).filter((item) => item.count > 0)

  return {
    totalGroups: groupAgg.size,
    totalUsers,
    totalParses,
    activePlatforms: platformData.length,
    platformData,
    trend,
    trendCompleteFrom: historyCompleteFrom,
    dailyAverage,
    platformTrend,
    weekday,
    /** 群组排行的原始行，群名由调用方补（要打 bot API） */
    topGroupRows: [...groupAgg.entries()]
      .sort((a, b) => b[1].totalParses - a[1].totalParses)
      .slice(0, TOP_USER_LIMIT)
      .map(([groupId, agg]) => ({
        groupId,
        totalParses: agg.totalParses,
        uniqueUsers: agg.users.size,
        segments: toSegments(agg.platforms)
      })),
    sizeBuckets,
    groupGrowth,
    userActivity: {
      xLabels: USER_GROUP_BUCKETS.map((bucket) => bucket.label),
      yLabels: USER_PARSE_BUCKETS.map((bucket) => bucket.label),
      cells: heatCells,
      max: heatCells.reduce((max, [, , count]) => Math.max(max, count), 0)
    },
    groupActivity,
    silenceBuckets,
    workTypes: workTypeRows
      .filter((row) => row.parseCount > 0)
      .map((row) => ({ platform: row.platform, workType: row.workType, count: row.parseCount })),
    metrics: buildMetricDistributions(metricRows)
  }
}
