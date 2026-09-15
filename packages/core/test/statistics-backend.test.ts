import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { GlobalStatistics } from '../ktr/template/statistics/global/components/GlobalStatistics'
import type { GlobalStatisticsData } from '../ktr/template/statistics/global/components/types'
import { GroupStatistics } from '../ktr/template/statistics/group/components/GroupStatistics'
import type { GroupStatisticsData } from '../ktr/template/statistics/group/components/types'
import { StatisticsDBBase } from '../src/module/db/statistics'
import { buildDitherAvatar } from '../src/module/utils/avatar'
import {
  aggregateGlobal,
  aggregateGroup,
  buildDateWindow,
  buildMetricDistributions,
  buildWeekdayAverages,
  TREND_DAYS,
  trimEmptyBuckets,
  weekdayIndexOf
} from '../src/module/utils/statisticsAggregate'

/**
 * 后端采集链路的端到端测试。
 *
 * 与 `statistics-render.test.ts` 的分工：
 * - 那边用手写夹具，证明「给模板这些数据能画出来」
 * - 这边**不用任何夹具**，走真实链路：真库 `recordParse` 写入 → 真查询读回 → 真聚合 → 真渲染，
 *   证明「后端确实产得出模板要的数据，而且数值是对的」
 *
 * 存在的理由：手写夹具永远是对的，它证明不了后端会填对。
 * 比如分桶口径写错、日期窗口错位、去重口径偏差，夹具侧一个都测不出来。
 */

const ctx = {
  scale: 1,
  theme: { mode: 'light' as const },
  version: {
    plugin: 'karin-plugin',
    pluginName: 'kkk',
    pluginVersion: '1.0.0',
    releaseType: 'Stable' as const,
    poweredBy: 'Karin',
    frameworkVersion: '1.16.2'
  }
}

const render = async (element: React.ReactElement): Promise<string> => {
  const stream = await renderToReadableStream(element)
  await stream.allReady
  return await new Response(stream).text()
}

let dir: string
let db: StatisticsDBBase

beforeEach(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kkk-stats-e2e-'))
  db = await new StatisticsDBBase(path.join(dir, 'statistics.db')).init()
})

afterEach(async () => {
  await db.close()
  fs.rmSync(dir, { recursive: true, force: true })
})

describe('耗时采集链路', () => {
  it('12 个档位的边界都按毫秒落在正确的那一档', async () => {
    // [毫秒, 期望落进的档]；每个档给两个采样，一个贴下界一个贴上界
    const samples: Array<[number, string]> = [
      [0, '<0.5s'],
      [499, '<0.5s'],
      [500, '0.5-1s'],
      [999, '0.5-1s'],
      [1000, '1-2s'],
      [1999, '1-2s'],
      [2000, '2-3s'],
      [2999, '2-3s'],
      [3000, '3-5s'],
      [4999, '3-5s'],
      [5000, '5-10s'],
      [9999, '5-10s'],
      [10000, '10-20s'],
      [19999, '10-20s'],
      [20000, '20-30s'],
      [29999, '20-30s'],
      [30000, '30-60s'],
      [59999, '30-60s'],
      [60000, '1-3min'],
      [179999, '1-3min'],
      [180000, '3-10min'],
      [599999, '3-10min'],
      [600000, '10min+'],
      [3600000, '10min+']
    ]
    for (const [index, [durationMs]] of samples.entries()) {
      await db.recordParse('g1', `u${index}`, 'douyin', { durationMs })
    }

    const rows = await db.getGroupMetricStats('g1')
    const buckets = buildMetricDistributions(rows)[0].buckets

    // 每个档都采到了，所以裁剪不会动它们，桶序必须完全等于定义顺序
    expect(buckets.map((bucket) => bucket.label)).toEqual([...new Set(samples.map(([, label]) => label))])

    // 逐条对照，确认没有相邻档位串味
    for (const [durationMs, label] of samples) {
      const bucket = rows.find((row) => row.bucket === label)
      expect(bucket, `${durationMs}ms 应落在 ${label}`).toBeDefined()
    }
    for (const bucket of buckets) {
      const expected = samples.filter(([, label]) => label === bucket.label).length
      expect(bucket.count, `${bucket.label} 的计数`).toBe(expected)
    }
  })

  it('每个桶都带累计口径的标签，画曲线时不用再按下标猜', async () => {
    await db.recordParse('g1', 'u1', 'douyin', { durationMs: 1500 })
    await db.recordParse('g1', 'u2', 'douyin', { durationMs: 4000 })

    const buckets = buildMetricDistributions(await db.getGroupMetricStats('g1'))[0].buckets
    for (const bucket of buckets) {
      expect(bucket.upper, `${bucket.label} 缺累计标签`).toBeTruthy()
    }
    // 采样落在 1-2s 和 3-5s，裁剪后保留 [0.5-1s, 1-2s, 2-3s, 3-5s, 5-10s]
    expect(buckets.map((bucket) => bucket.upper)).toEqual(['≤1s', '≤2s', '≤3s', '≤5s', '≤10s'])
  })

  it('不传 durationMs 时该维度不落行，但总量照常累计', async () => {
    await db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await db.recordParse('g1', 'u1', 'douyin', { workType: 'video', durationMs: 1500 })

    const stats = await db.getGroupStatistics('g1')
    expect(stats.reduce((sum, stat) => sum + stat.parseCount, 0)).toBe(2)

    const buckets = buildMetricDistributions(await db.getGroupMetricStats('g1'))[0].buckets
    const total = buckets.reduce((sum, bucket) => sum + bucket.count, 0)
    expect(total, '只有带 durationMs 的那一笔进了耗时分布').toBe(1)
  })

  it('重复落同一档时累加而不是覆盖', async () => {
    for (let i = 0; i < 5; i++) {
      await db.recordParse('g1', 'u1', 'douyin', { durationMs: 1500 })
    }
    const buckets = buildMetricDistributions(await db.getGroupMetricStats('g1'))[0].buckets
    expect(buckets.find((bucket) => bucket.label === '1-2s')?.count).toBe(5)
  })

  it('全局口径把各群的耗时合并统计', async () => {
    await db.recordParse('g1', 'u1', 'douyin', { durationMs: 1500 })
    await db.recordParse('g2', 'u2', 'bilibili', { durationMs: 1500 })
    await db.recordParse('g2', 'u2', 'bilibili', { durationMs: 7000 })

    const buckets = buildMetricDistributions(await db.getGlobalMetricStats())[0].buckets
    expect(buckets.find((bucket) => bucket.label === '1-2s')?.count).toBe(2)
    expect(buckets.find((bucket) => bucket.label === '5-10s')?.count).toBe(1)
  })
})

describe('耗时横轴跟着数据裁剪', () => {
  const mk = (counts: number[]) =>
    [
      { label: '<0.5s', upper: '≤0.5s', count: counts[0] },
      { label: '0.5-1s', upper: '≤1s', count: counts[1] },
      { label: '1-2s', upper: '≤2s', count: counts[2] },
      { label: '2-3s', upper: '≤3s', count: counts[3] },
      { label: '3-5s', upper: '≤5s', count: counts[4] },
      { label: '5-10s', upper: '≤10s', count: counts[5] },
      { label: '10-20s', upper: '≤20s', count: counts[6] }
    ].slice(0, counts.length)

  it('整体偏慢时，前面没数据的快档会被裁掉', () => {
    // 只有 5-10s 和 10-20s 有数据 —— 不裁的话横轴左边五格全是 0
    const trimmed = trimEmptyBuckets(mk([0, 0, 0, 0, 0, 40, 60]))
    expect(trimmed.map((bucket) => bucket.label), '数据范围 + 左边一个空档').toEqual(['3-5s', '5-10s', '10-20s'])
  })

  it('整体偏快时，后面没数据的慢档会被裁掉', () => {
    const trimmed = trimEmptyBuckets(mk([70, 30, 0, 0, 0, 0, 0]))
    expect(trimmed.map((bucket) => bucket.label), '数据范围 + 右边一个空档').toEqual(['<0.5s', '0.5-1s', '1-2s'])
  })

  it('只剩一个数据档时，左右各留一个空档撑着，不至于退化成孤点', () => {
    const trimmed = trimEmptyBuckets(mk([0, 0, 0, 100, 0, 0, 0]))
    expect(trimmed.map((bucket) => bucket.label)).toEqual(['1-2s', '2-3s', '3-5s'])
  })

  it('数据贴着边界时，空档被数组边界夹住，不会越界', () => {
    // 最后一个档有数据 → 右边没有空档可留，只剩左边那个
    expect(trimEmptyBuckets(mk([0, 0, 0, 0, 0, 0, 50])).map((bucket) => bucket.label)).toEqual(['5-10s', '10-20s'])
    // 第一个档就有数据 → 左边没有空档可留
    expect(trimEmptyBuckets(mk([50, 0, 0, 0, 0, 0, 0])).map((bucket) => bucket.label)).toEqual(['<0.5s', '0.5-1s'])
  })

  it('两端都有数据时原样保留', () => {
    const trimmed = trimEmptyBuckets(mk([10, 20, 30, 20, 10, 5, 5]))
    expect(trimmed).toHaveLength(7)
  })

  it('整条都没数据时返回空数组，上层据此不渲染这张图', () => {
    expect(trimEmptyBuckets(mk([0, 0, 0, 0, 0, 0, 0]))).toEqual([])
  })
})

describe('周内日均的分母', () => {
  const windowDates = buildDateWindow(TREND_DAYS)
  /** 窗口里每个星期几各出现几天 */
  const occurrences = new Array<number>(7).fill(0)
  for (const date of windowDates) occurrences[weekdayIndexOf(date)] += 1

  it('窗口本身就不是整周 —— 这正是必须取日均的原因', () => {
    expect(windowDates, `${TREND_DAYS} 天 = 4 周 + 2 天`).toHaveLength(TREND_DAYS)
    // 多出来的那两天落在哪两个星期几上，它们就多出现一次
    expect(Math.max(...occurrences), '有两个星期几会出现 5 次').toBe(5)
    expect(occurrences.filter((count) => count === 5), '而且只有两个').toHaveLength(2)
    expect(occurrences.filter((count) => count === 4), '其余五个各 4 次').toHaveLength(5)
  })

  it('每天解析量相同时，七个星期几的日均必须相等', () => {
    // 构造「每天都是 10 次」这种完全均匀的数据
    const rows = windowDates.map((date) => ({ date, count: 10 }))

    // 正确做法：除以该星期几出现的天数 —— 均匀数据必须得到均匀的日均
    expect(buildWeekdayAverages(windowDates, rows), '每天都是 10 次，日均就该处处是 10').toEqual([10, 10, 10, 10, 10, 10, 10])

    // 对照：直接按星期几求和的老做法，在这种完全均匀的数据上会凭空拉开 25%，
    // 出现 5 次的那两个星期几看着就是「更活跃」，其实跟用户行为毫无关系
    const naive = new Array<number>(7).fill(0)
    for (const row of rows) naive[weekdayIndexOf(row.date)] += row.count
    expect(Math.max(...naive) / Math.min(...naive), '求和口径凭空拉开 25%').toBeCloseTo(1.25, 2)
  })

  it('分母是「窗口里有几天」，不是「有几天有数据」', () => {
    // 只有一天有数据，且那天恰好落在出现 5 次的那个星期几上：
    // 日均应当是 100 / 5 = 20，而不是 100 / 1 = 100
    const busyIndex = occurrences.indexOf(5)
    const busyDate = windowDates.find((date) => weekdayIndexOf(date) === busyIndex)!
    expect(buildWeekdayAverages(windowDates, [{ date: busyDate, count: 100 }])[busyIndex]).toBe(20)
  })
})

describe('聚合层算出的东西和写入的一致', () => {
  /** 一批覆盖多平台、多形态、多耗时的真实记录 */
  const seedFull = async () => {
    await db.recordParse('g1', 'u1', 'douyin', { workType: 'video', durationMs: 1500 })
    await db.recordParse('g1', 'u1', 'douyin', { workType: 'gallery', durationMs: 7000 })
    await db.recordParse('g1', 'u2', 'douyin', { workType: 'video', durationMs: 1500 })
    await db.recordParse('g1', 'u2', 'bilibili', { workType: 'bangumi', durationMs: 2500 })
    await db.recordParse('g1', 'u3', 'kuaishou', { workType: 'video', durationMs: 30000 })
    await db.recordParse('g2', 'u3', 'douyin', { workType: 'video', durationMs: 999 })
  }

  it('群维度：总量、去重人数、平台明细三者的口径对得上', async () => {
    await seedFull()
    const aggregated = aggregateGroup({
      groupStats: await db.getGroupStatistics('g1'),
      groupHistory: await db.getGroupRecentHistory('g1', TREND_DAYS),
      hourRows: await db.getGroupHourStats('g1'),
      workTypeRows: await db.getGroupWorkTypeStats('g1'),
      metricRows: await db.getGroupMetricStats('g1'),
      globalHistory: await db.getRecentHistory(TREND_DAYS),
      activeDays: await db.getGroupActiveDays('g1'),
      uniqueUsers: await db.getGroupUniqueUsers('g1')
    })

    // g1 一共 5 笔，3 个用户
    expect(aggregated.groupTotalParses).toBe(5)
    expect(aggregated.groupUniqueUsers).toBe(3)
    expect(aggregated.parsesPerUser).toBeCloseTo(5 / 3)

    // 平台明细的次数加起来必须等于总量，去重人数不能超过群内总人数
    const platformSum = aggregated.platformData.reduce((sum, item) => sum + item.count, 0)
    expect(platformSum, '平台明细之和应等于总量').toBe(aggregated.groupTotalParses)
    for (const item of aggregated.platformData) {
      expect(item.users, `${item.platform} 的去重人数不该超过群内总人数`).toBeLessThanOrEqual(aggregated.groupUniqueUsers)
    }
    // 抖音上 u1、u2 都用过；B站/快手各只有 1 人
    expect(aggregated.platformData.find((item) => item.platform === 'douyin')?.users).toBe(2)
    expect(aggregated.platformData.find((item) => item.platform === 'bilibili')?.users).toBe(1)

    expect(aggregated.topPlatform).toBe('douyin')
  })

  it('排行条的平台分段之和必须等于该行的总数', async () => {
    // 堆叠条如果分段之和对不上总长度，图上会露出来（条子比标签短或长），
    // 但那种偏差在截图里很难发现 —— 所以在这里钉死。
    await seedFull()
    const aggregated = aggregateGroup({
      groupStats: await db.getGroupStatistics('g1'),
      groupHistory: await db.getGroupRecentHistory('g1', TREND_DAYS),
      hourRows: await db.getGroupHourStats('g1'),
      workTypeRows: await db.getGroupWorkTypeStats('g1'),
      metricRows: await db.getGroupMetricStats('g1'),
      globalHistory: await db.getRecentHistory(TREND_DAYS),
      activeDays: await db.getGroupActiveDays('g1'),
      uniqueUsers: await db.getGroupUniqueUsers('g1')
    })

    expect(aggregated.topUserRows.length).toBeGreaterThan(0)
    for (const row of aggregated.topUserRows) {
      expect(row.segments.length, `${row.key} 应该至少有一个平台分段`).toBeGreaterThan(0)
      const segmentSum = row.segments.reduce((sum, segment) => sum + segment.count, 0)
      expect(segmentSum, `${row.key} 的分段之和应等于总次数`).toBe(row.count)
    }

    // 分段按次数降序，堆叠条的色块才会从粗到细
    for (const row of aggregated.topUserRows) {
      const counts = row.segments.map((segment) => segment.count)
      expect(counts).toEqual([...counts].sort((a, b) => b - a))
    }

    // u1 在 douyin 上有 2 笔（video + gallery），分段必须把同一个平台合并
    const u1 = aggregated.topUserRows.find((row) => row.key === 'u1')
    expect(u1?.segments, '同一平台的多笔要合并成一段').toEqual([{ platform: 'douyin', count: 2 }])
  })

  it('全局群组排行的平台分段同样对得上', async () => {
    await seedFull()
    const aggregated = aggregateGlobal({
      allStats: await db.getAllStatistics(),
      historyData: await db.getRecentHistory(TREND_DAYS),
      firstSeen: await db.getGroupFirstSeen(),
      workTypeRows: await db.getGlobalWorkTypeStats(),
      metricRows: await db.getGlobalMetricStats()
    })

    for (const row of aggregated.topGroupRows) {
      const segmentSum = row.segments.reduce((sum, segment) => sum + segment.count, 0)
      expect(segmentSum, `群 ${row.groupId} 的分段之和应等于总次数`).toBe(row.totalParses)
    }
    // g1 跨 douyin/bilibili/kuaishou 三个平台
    const g1 = aggregated.topGroupRows.find((row) => row.groupId === 'g1')
    expect(g1?.segments.map((segment) => segment.platform).sort()).toEqual(['bilibili', 'douyin', 'kuaishou'])
  })

  it('群维度：各维度加起来都等于总量', async () => {
    await seedFull()
    const aggregated = aggregateGroup({
      groupStats: await db.getGroupStatistics('g1'),
      groupHistory: await db.getGroupRecentHistory('g1', TREND_DAYS),
      hourRows: await db.getGroupHourStats('g1'),
      workTypeRows: await db.getGroupWorkTypeStats('g1'),
      metricRows: await db.getGroupMetricStats('g1'),
      globalHistory: await db.getRecentHistory(TREND_DAYS),
      activeDays: await db.getGroupActiveDays('g1'),
      uniqueUsers: await db.getGroupUniqueUsers('g1')
    })

    const total = aggregated.groupTotalParses
    expect(aggregated.trend.reduce((sum, point) => sum + point.count, 0), '趋势').toBe(total)
    expect(aggregated.hourly.reduce((sum, count) => sum + count, 0), '24 小时').toBe(total)
    // 周内是「日均」不是总量，加起来当然不等于总量。
    // 真正要验的是分母：只该除以该星期几在窗口里出现的天数。
    expect(aggregated.weekday, '固定 7 格').toHaveLength(7)
    const todayIndex = weekdayIndexOf(new Date().toISOString().split('T')[0])
    const occurrences = buildDateWindow(TREND_DAYS).filter((date) => weekdayIndexOf(date) === todayIndex).length
    expect(aggregated.weekday[todayIndex], '今天的日均 = 今天总量 / 今天这个星期几出现几次').toBe(Math.round(total / occurrences))
    expect(
      aggregated.weekday.filter((_, index) => index !== todayIndex).every((value) => value === 0),
      '只有今天有数据，其余星期几应当全是 0'
    ).toBe(true)
    expect(aggregated.workTypes.reduce((sum, item) => sum + item.count, 0), '内容形态').toBe(total)
    expect(aggregated.metrics[0].buckets.reduce((sum, bucket) => sum + bucket.count, 0), '耗时分布').toBe(total)

    // 趋势是补齐过的 30 天窗口，不是只有今天
    expect(aggregated.trend).toHaveLength(TREND_DAYS)
    expect(aggregated.trend.filter((point) => point.count > 0)).toHaveLength(1)
    expect(aggregated.trend[TREND_DAYS - 1].count, '最后一格是今天').toBe(total)
  })

  it('群维度：平台 × 时段的每一列加起来等于该平台的总次数', async () => {
    await seedFull()
    const aggregated = aggregateGroup({
      groupStats: await db.getGroupStatistics('g1'),
      groupHistory: await db.getGroupRecentHistory('g1', TREND_DAYS),
      hourRows: await db.getGroupHourStats('g1'),
      workTypeRows: await db.getGroupWorkTypeStats('g1'),
      metricRows: await db.getGroupMetricStats('g1'),
      globalHistory: await db.getRecentHistory(TREND_DAYS),
      activeDays: await db.getGroupActiveDays('g1'),
      uniqueUsers: await db.getGroupUniqueUsers('g1')
    })

    for (const series of aggregated.platformHourly) {
      const seriesTotal = series.values.reduce((sum, value) => sum + value, 0)
      const platformTotal = aggregated.platformData.find((item) => item.platform === series.platform)?.count
      expect(seriesTotal, `${series.platform} 的时段之和应等于该平台总量`).toBe(platformTotal)
      expect(series.values, '矩阵固定 24 列').toHaveLength(24)
    }
  })

  it('全局维度：总量、平台明细、群排行、热力图的口径互相自洽', async () => {
    await seedFull()
    const allStats = await db.getAllStatistics()
    const aggregated = aggregateGlobal({
      allStats,
      historyData: await db.getRecentHistory(TREND_DAYS),
      firstSeen: await db.getGroupFirstSeen(),
      workTypeRows: await db.getGlobalWorkTypeStats(),
      metricRows: await db.getGlobalMetricStats(),
      historyCompleteFrom: await db.getHistoryCompleteFrom()
    })

    // 两个群共 6 笔、3 个用户
    expect(aggregated.totalGroups).toBe(2)
    expect(aggregated.totalUsers).toBe(3)
    expect(aggregated.totalParses).toBe(6)

    // 平台明细：抖音 4 笔，横跨 g1/g2 两个群，u1/u2/u3 三个人都用过
    expect(aggregated.platformData.reduce((sum, item) => sum + item.count, 0)).toBe(6)
    expect(aggregated.platformData.find((item) => item.platform === 'douyin')).toMatchObject({ count: 4, groups: 2, users: 3 })

    // 群排行：g1 有 5 笔、g2 有 1 笔
    expect(aggregated.topGroupRows[0]).toMatchObject({ groupId: 'g1', totalParses: 5, uniqueUsers: 3 })
    expect(aggregated.topGroupRows[1]).toMatchObject({ groupId: 'g2', totalParses: 1, uniqueUsers: 1 })

    // 热力图：三个用户全部落进矩阵，格子人数之和 = 总用户数
    const heatTotal = aggregated.userActivity.cells.reduce((sum, [, , count]) => sum + count, 0)
    expect(heatTotal, '热力图必须覆盖全部用户，不能截断').toBe(3)
    expect(aggregated.userActivity.max).toBeGreaterThan(0)

    // 群规模分布：两个群各落一桶，加起来等于群数
    expect(aggregated.sizeBuckets.reduce((sum, bucket) => sum + bucket.count, 0)).toBe(2)

    // 周内 / 趋势
    expect(aggregated.weekday, '固定 7 格').toHaveLength(7)
    expect(aggregated.weekday.filter((value) => value > 0), '只有今天有数据').toHaveLength(1)
    expect(aggregated.trend.reduce((sum, point) => sum + point.count, 0)).toBe(6)
    expect(aggregated.dailyAverage).toBeCloseTo(6 / TREND_DAYS)
  })

  it('全局维度：群沉默分布把「刚刚用过的群」算进今天', async () => {
    await seedFull()
    const aggregated = aggregateGlobal({
      allStats: await db.getAllStatistics(),
      historyData: await db.getRecentHistory(TREND_DAYS),
      firstSeen: await db.getGroupFirstSeen(),
      workTypeRows: await db.getGlobalWorkTypeStats(),
      metricRows: await db.getGlobalMetricStats()
    })

    const today = aggregated.silenceBuckets.find((bucket) => bucket.label === '今天')
    expect(today?.count, '两个群都是刚刚解析过').toBe(2)
    expect(aggregated.silenceBuckets.filter((bucket) => bucket.label !== '今天').every((bucket) => bucket.count === 0)).toBe(true)
  })

  it('全局维度：分平台趋势的每一列加起来等于该平台的总次数', async () => {
    // 这条最容易静默出错：`ParseHistory` 的列名是 douyin/bilibili/kuaishou/xiaohongshu，
    // 拼错任何一个都会让那一整条序列变成 0，而图照样能画出来（一条贴着 x 轴的直线）。
    await seedFull()
    const aggregated = aggregateGlobal({
      allStats: await db.getAllStatistics(),
      historyData: await db.getRecentHistory(TREND_DAYS),
      firstSeen: await db.getGroupFirstSeen(),
      workTypeRows: await db.getGlobalWorkTypeStats(),
      metricRows: await db.getGlobalMetricStats()
    })

    expect(aggregated.platformTrend.dates).toHaveLength(TREND_DAYS)
    expect(aggregated.platformTrend.series.length, '有几个平台就该有几条序列').toBe(aggregated.platformData.length)

    for (const series of aggregated.platformTrend.series) {
      const seriesTotal = series.values.reduce((sum, value) => sum + value, 0)
      const platformTotal = aggregated.platformData.find((item) => item.platform === series.platform)?.count
      expect(seriesTotal, `${series.platform} 的趋势之和应等于该平台总次数`).toBe(platformTotal)
      expect(series.values, '每个平台的序列长度要跟日期轴一致').toHaveLength(TREND_DAYS)
    }
  })

  it('全局维度：群组增长曲线单调不减，且终点等于累计群数', async () => {
    await seedFull()
    const aggregated = aggregateGlobal({
      allStats: await db.getAllStatistics(),
      historyData: await db.getRecentHistory(TREND_DAYS),
      firstSeen: await db.getGroupFirstSeen(),
      workTypeRows: await db.getGlobalWorkTypeStats(),
      metricRows: await db.getGlobalMetricStats()
    })

    expect(aggregated.groupGrowth).toHaveLength(TREND_DAYS)
    for (let i = 1; i < aggregated.groupGrowth.length; i++) {
      expect(aggregated.groupGrowth[i].count).toBeGreaterThanOrEqual(aggregated.groupGrowth[i - 1].count)
    }
    expect(aggregated.groupGrowth[TREND_DAYS - 1].count).toBe(2)
  })
})

describe('趋势可信区间的判定', () => {
  it('正常写入的行 date 与 createdAt 同天，可信起点就是今天', async () => {
    await db.recordParse('g1', 'u1', 'douyin', { durationMs: 1500 })
    const completeFrom = await db.getHistoryCompleteFrom()
    const today = new Date().toISOString().split('T')[0]
    expect(completeFrom, '增量写入的行两者必同天').toBe(today)
  })

  it('回填出来的行会被排除在可信区间之外', async () => {
    // 直接往表里塞一条「老库回填」特征的行：date 是很久以前，createdAt 是现在
    const sqlite3 = (await import('node-karin/sqlite3')).default
    const raw = new sqlite3.Database(path.join(dir, 'statistics.db'))
    const run = (sql: string, params: unknown[] = []) =>
      new Promise<void>((res, rej) => raw.run(sql, params, (err: Error | null) => (err ? rej(err) : res())))
    const backfilledDate = '2026-01-05'
    await run('INSERT INTO ParseHistory (date, totalParses, douyin, bilibili, kuaishou, xiaohongshu, createdAt) VALUES (?,?,?,?,?,?,?)', [
      backfilledDate,
      9999,
      9999,
      0,
      0,
      0,
      new Date().toISOString()
    ])
    await new Promise<void>((res) => raw.close(() => res()))

    // 再用新版打开，走一遍正常的增量写入
    const reopened = await new StatisticsDBBase(path.join(dir, 'statistics.db')).init()
    await reopened.recordParse('g1', 'u1', 'douyin', { durationMs: 1500 })

    const completeFrom = await reopened.getHistoryCompleteFrom()
    const today = new Date().toISOString().split('T')[0]
    expect(completeFrom, '可信起点不该是那条回填行').toBe(today)
    expect(completeFrom).not.toBe(backfilledDate)
    await reopened.close()
  })
})

describe('后端产出的数据直接喂给模板', () => {
  const seedFull = async () => {
    await db.recordParse('g1', 'u1', 'douyin', { workType: 'video', durationMs: 1500 })
    await db.recordParse('g1', 'u2', 'douyin', { workType: 'gallery', durationMs: 7000 })
    await db.recordParse('g1', 'u2', 'bilibili', { workType: 'bangumi', durationMs: 2500 })
    await db.recordParse('g2', 'u3', 'kuaishou', { workType: 'video', durationMs: 30000 })
  }

  const extractChartSvgs = (html: string): string[] =>
    [...html.matchAll(/<svg[^>]*>[\s\S]*?<\/svg>/g)].map((match) => match[0]).filter((block) => /baseProfile="full"/.test(block))

  it('群模板：真数据渲染出的图数量和模板声明一致，且没有空图', async () => {
    await seedFull()
    const { topUserRows, ...groupData } = aggregateGroup({
      groupStats: await db.getGroupStatistics('g1'),
      groupHistory: await db.getGroupRecentHistory('g1', TREND_DAYS),
      hourRows: await db.getGroupHourStats('g1'),
      workTypeRows: await db.getGroupWorkTypeStats('g1'),
      metricRows: await db.getGroupMetricStats('g1'),
      globalHistory: await db.getRecentHistory(TREND_DAYS),
      activeDays: await db.getGroupActiveDays('g1'),
      uniqueUsers: await db.getGroupUniqueUsers('g1')
    })
    const globalSummary = await db.getGlobalSummary()

    const data: GroupStatisticsData = {
      groupId: 'g1',
      groupName: '端到端测试群',
      groupMemberCount: 10,
      groupAvatar: undefined,
      generatedAt: '2026-09-16 12:00',
      ...groupData,
      // 昵称补全走 bot API，这里直接回落用户ID（与 handler 里 catch 分支的行为一致）；segments 原样带上
      // 头像在生产链路由 handler 补（要打 bot API），这里直接走生成路径
      topUsers: topUserRows.map((row) => ({
        userId: row.key,
        name: row.key,
        count: row.count,
        segments: row.segments,
        avatar: buildDitherAvatar(row.key)
      })),
      globalTotalGroups: globalSummary.totalGroups,
      globalTotalParses: globalSummary.totalParses
    }

    const html = await render(React.createElement(GroupStatistics, { data, ctx }))
    const charts = extractChartSvgs(html)

    // 4 笔数据覆盖了平台/趋势/时段/周内/形态/耗时，模板该出的 ECharts 图一张不少。
    // 「活跃用户」是 HTML 列表，不算在 SVG 里
    expect(charts.length, '真数据应该把模板里所有图都点亮').toBe(7)
    for (const chart of charts) {
      expect(/<(path|rect|circle|polyline|polygon)\b/.test(chart), '有图没画出图形').toBe(true)
    }
    expect(html).toContain('端到端测试群')
  })

  it('全局模板：真数据渲染正常', async () => {
    await seedFull()
    const { topGroupRows, ...globalData } = aggregateGlobal({
      allStats: await db.getAllStatistics(),
      historyData: await db.getRecentHistory(TREND_DAYS),
      firstSeen: await db.getGroupFirstSeen(),
      workTypeRows: await db.getGlobalWorkTypeStats(),
      metricRows: await db.getGlobalMetricStats(),
      historyCompleteFrom: await db.getHistoryCompleteFrom()
    })

    const data: GlobalStatisticsData = {
      generatedAt: '2026-09-16 12:00',
      ...globalData,
      statsSince: undefined,
      topGroups: topGroupRows.map((row) => ({ ...row, name: row.groupId, avatar: buildDitherAvatar(row.groupId) }))
    }

    const html = await render(React.createElement(GlobalStatistics, { data, ctx }))
    const charts = extractChartSvgs(html)

    // 「群组排行」同样是 HTML 列表，不算在 SVG 里
    expect(charts.length, '真数据应该把模板里所有图都点亮').toBe(11)
    for (const chart of charts) {
      expect(/<(path|rect|circle|polyline|polygon)\b/.test(chart), '有图没画出图形').toBe(true)
    }
  })
})
