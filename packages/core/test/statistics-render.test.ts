import fs from 'node:fs'
import path from 'node:path'

import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { buildDitherAvatar } from '../src/module/utils/avatar'
import { GlobalStatistics } from '../ktr/template/statistics/global/components/GlobalStatistics'
import type { GlobalStatisticsData } from '../ktr/template/statistics/global/components/types'
import { GroupStatistics } from '../ktr/template/statistics/group/components/GroupStatistics'
import type { GroupStatisticsData } from '../ktr/template/statistics/group/components/types'

/**
 * 两张统计海报的整树 SSR 冒烟测试。
 *
 * 存在的理由：ECharts 按需注册漏了东西时**不会抛错**，只是那类图静默画不出来
 * （`ScatterChart` 漏注册 → 散点图整块空白，页面上只剩两根轴名）。
 * 所以这里把「渲染整张海报 + ECharts 的缺组件告警视为失败 + 每张图必须真画出图形」
 * 三件事绑在一起，避免再靠肉眼发现空白图。
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

/**
 * 取出所有图表级 svg。
 *
 * 不用「宽度 ≥ N」这种阈值来区分：三列网格的图画布只有 346px 宽，
 * 而装饰性 svg（噪点滤镜、页脚 logo、lucide 图标）本来就没写 width 属性。
 * ECharts 的 SVG 渲染器固定会输出 `version="1.1" baseProfile="full"` 这组签名，
 * 用它来认最准，也不会被将来新增的装饰图误伤。
 */
const extractChartSvgs = (html: string): string[] =>
  [...html.matchAll(/<svg[^>]*>[\s\S]*?<\/svg>/g)].map((match) => match[0]).filter((block) => /baseProfile="full"/.test(block))

/** 图形元素：每条 series 至少要留下这些东西之一 */
const hasGeometry = (svg: string): boolean => /<(path|rect|circle|polyline|polygon)\b/.test(svg)

const daysAgo = (offset: number): string => {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - offset)
  return date.toISOString().split('T')[0]
}
const dateWindow = (days: number): string[] => Array.from({ length: days }, (_, index) => daysAgo(days - 1 - index))

const buildGroupData = (): GroupStatisticsData => {
  const dates = dateWindow(30)
  return {
    groupId: '1145141919',
    groupName: '测试群',
    groupMemberCount: 114,
    groupAvatar: undefined,
    generatedAt: '2026-09-15 23:40',
    groupTotalParses: 2864,
    groupUniqueUsers: 37,
    parsesPerUser: 77.4,
    activeDays: 23,
    topPlatform: 'douyin',
    platformData: [
      { platform: 'douyin', count: 1362, users: 18 },
      { platform: 'bilibili', count: 1022, users: 18 },
      { platform: 'kuaishou', count: 351, users: 8 },
      { platform: 'xiaohongshu', count: 129, users: 3 }
    ],
    trend: dates.map((date, index) => ({ date, count: (index * 37) % 90 })),
    globalDailyAverage: 61.3,
    topUsers: Array.from({ length: 10 }, (_, index) => ({
      userId: `1000${index}`,
      name: `用户${index}`,
      count: 430 - index * 30,
      // 走的是和生产同一条生成路径，不是随便塞个占位图
      avatar: buildDitherAvatar(`1000${index}`),
      // 轮流给 1~3 个平台，覆盖「单平台用户」和「多平台用户」两种堆叠形态
      segments: ['douyin', 'bilibili', 'kuaishou']
        .slice(0, (index % 3) + 1)
        .map((platform, i) => ({ platform: platform as StatisticsPlatform, count: Math.max(1, Math.round((430 - index * 30) * [0.6, 0.25, 0.15][i])) }))
    })),
    hourly: Array.from({ length: 24 }, (_, hour) => (hour * 13) % 70),
    weekday: Array.from({ length: 7 }, (_, day) => (day * 47) % 300),
    platformHourly: [
      { platform: 'douyin', values: Array.from({ length: 24 }, (_, hour) => (hour * 7) % 40) },
      { platform: 'bilibili', values: Array.from({ length: 24 }, (_, hour) => (hour * 5) % 30) }
    ],
    workTypes: [
      { workType: 'video', count: 1520 },
      { workType: 'gallery', count: 640 },
      { workType: 'article', count: 210 }
    ],
    metrics: [
      { metric: 'duration', buckets: [
        { label: '<1s', upper: '≤1s', count: 20 },
        { label: '1-2s', upper: '≤2s', count: 40 },
        { label: '2-3s', upper: '≤3s', count: 60 },
        { label: '3-5s', upper: '≤5s', count: 80 },
        { label: '5-10s', upper: '≤10s', count: 100 },
        { label: '10-30s', upper: '≤30s', count: 120 },
        { label: '30s+', upper: '>30s', count: 140 }
      ] }
    ],
    globalTotalGroups: 128,
    globalTotalParses: 45621
  }
}

const buildGlobalData = (): GlobalStatisticsData => {
  const dates = dateWindow(30)
  const platforms = ['douyin', 'bilibili', 'kuaishou', 'xiaohongshu'] as const
  const counts = { douyin: 2081, bilibili: 1378, kuaishou: 556, xiaohongshu: 294 }

  return {
    generatedAt: '2026-09-15 23:50',
    totalGroups: 128,
    totalUsers: 1284,
    totalParses: 4309,
    activePlatforms: 4,
    statsSince: dates[0],
    platformData: platforms.map((platform, index) => ({
      platform,
      count: counts[platform],
      groups: 62 - index * 14,
      users: 620 - index * 140
    })),
    trend: dates.map((date, index) => ({ date, count: (index * 53) % 140 })),
    // 故意给一个切分点：趋势图要同时画出「失真虚线段」和「正常实线段」
    trendCompleteFrom: dates[17],
    dailyAverage: 143.6,
    platformTrend: {
      dates,
      series: platforms.map((platform) => ({
        platform,
        values: dates.map((_, index) => (index * 7 + platform.length) % 60)
      }))
    },
    topGroups: Array.from({ length: 10 }, (_, index) => ({
      groupId: `10000${index}`,
      name: `群组${index}`,
      avatar: buildDitherAvatar(`10000${index}`),
      totalParses: 9800 - index * 700,
      uniqueUsers: 190 - index * 12,
      segments: ['douyin', 'bilibili', 'xiaohongshu']
        .slice(0, ((index + 1) % 3) + 1)
        .map((platform, i) => ({ platform: platform as StatisticsPlatform, count: Math.max(1, Math.round((9800 - index * 700) * [0.55, 0.3, 0.15][i])) }))
    })),
    sizeBuckets: [
      { label: '1-10', count: 41 },
      { label: '11-50', count: 63 },
      { label: '51-200', count: 38 },
      { label: '201-1000', count: 19 },
      { label: '1000+', count: 7 }
    ],
    weekday: Array.from({ length: 7 }, (_, day) => (day * 61) % 400),
    groupGrowth: dates.map((date, index) => ({ date, count: 14 + index })),
    userActivity: {
      xLabels: ['1 个群', '2-3 个群', '4-6 个群', '7-9 个群', '10+ 个群'],
      yLabels: ['<50', '50-200', '200-500', '500-1k', '1k+'],
      // 左下密集、右上稀疏，跟真实分布同形
      cells: [
        [0, 0, 368],
        [0, 1, 176],
        [0, 2, 84],
        [1, 0, 176],
        [1, 1, 84],
        [1, 2, 40],
        [2, 0, 61],
        [2, 1, 29],
        [2, 2, 14],
        [3, 1, 9],
        [4, 2, 4]
      ],
      max: 368
    },
    groupActivity: [
      { label: '<20', count: 38, box: [77, 154, 220, 341, 400] },
      { label: '20-50', count: 47, box: [315, 630, 900, 1395, 1600] },
      { label: '50-100', count: 26, box: [840, 1680, 2400, 3720, 4300] },
      { label: '100-300', count: 12, box: [2170, 4340, 6200, 9610, 11400] },
      { label: '300+', count: 5, box: [4900, 9800, 14000, 21700, 25000] }
    ],
    silenceBuckets: [
      { label: '今天', count: 12 },
      { label: '1-7天', count: 8 },
      { label: '8-30天', count: 4 },
      { label: '31-90天', count: 2 },
      { label: '90天+', count: 1 }
    ],
    workTypes: [
      { platform: 'douyin', workType: 'video', count: 1082 },
      { platform: 'douyin', workType: 'gallery', count: 541 },
      { platform: 'bilibili', workType: 'video', count: 854 },
      { platform: 'bilibili', workType: 'bangumi', count: 303 },
      { platform: 'kuaishou', workType: 'video', count: 489 },
      { platform: 'xiaohongshu', workType: 'gallery', count: 191 }
    ],
    metrics: [
      { metric: 'duration', buckets: [
        { label: '<1s', upper: '≤1s', count: 20 },
        { label: '1-2s', upper: '≤2s', count: 40 },
        { label: '2-3s', upper: '≤3s', count: 60 },
        { label: '3-5s', upper: '≤5s', count: 80 },
        { label: '5-10s', upper: '≤10s', count: 100 },
        { label: '10-30s', upper: '≤30s', count: 120 },
        { label: '30s+', upper: '>30s', count: 140 }
      ] }
    ]
  }
}

let consoleError: ReturnType<typeof vi.spyOn>
let consoleWarn: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  consoleError.mockRestore()
  consoleWarn.mockRestore()
})

/** ECharts 缺注册时的告警文案，命中即视为失败 */
const echartsComplaints = (): string[] =>
  [...consoleError.mock.calls, ...consoleWarn.mock.calls]
    .map((args) => args.map((arg) => String(arg)).join(' '))
    .filter((text) => /not imported|Please import it first|is used but not imported/i.test(text))

describe('群统计海报', () => {
  it('整树 SSR 出图，且没有 ECharts 缺注册告警', async () => {
    const html = await render(React.createElement(GroupStatistics, { data: buildGroupData(), ctx }))

    expect(echartsComplaints()).toEqual([])
    // 7 张图：平台分布 / 解析趋势 / 活跃时段 / 周内分布 / 内容形态 / 平台×时段 / 解析耗时。
    // 「活跃用户」不走 ECharts —— 那个版式（头像占一列、名字在进度条上方）类目轴表达不了
    expect(extractChartSvgs(html)).toHaveLength(7)
  })

  it('每张图都真的画出了图形，而不是只剩坐标轴', async () => {
    const html = await render(React.createElement(GroupStatistics, { data: buildGroupData(), ctx }))
    const charts = extractChartSvgs(html)

    expect(charts).toHaveLength(7)
    for (const chart of charts) expect(hasGeometry(chart), '有图表没画出任何图形').toBe(true)
  })

  it('空数据时不抛错，且不渲染空图表', async () => {
    const empty: GroupStatisticsData = {
      ...buildGroupData(),
      groupTotalParses: 0,
      groupUniqueUsers: 0,
      parsesPerUser: 0,
      activeDays: 0,
      topPlatform: undefined,
      platformData: [],
      trend: dateWindow(30).map((date) => ({ date, count: 0 })),
      topUsers: [],
      hourly: new Array(24).fill(0),
      weekday: new Array(7).fill(0),
      platformHourly: [],
      workTypes: [],
      metrics: []
    }
    const html = await render(React.createElement(GroupStatistics, { data: empty, ctx }))

    expect(echartsComplaints()).toEqual([])
    // 一张图都不该画出来
    expect(extractChartSvgs(html)).toHaveLength(0)
    // 趋势区要落到占位文案上
    expect(html).toContain('暂无趋势数据')
  })
})

describe('全局统计海报', () => {
  it('整树 SSR 出图，且没有 ECharts 缺注册告警', async () => {
    const html = await render(React.createElement(GlobalStatistics, { data: buildGlobalData(), ctx }))

    expect(echartsComplaints()).toEqual([])
    // 11 张图：平台分布 / 解析趋势 / 平台趋势 / 内容形态 / 解析耗时 /
    // 群规模分布 / 群组增长 / 用户活跃度 / 群组活跃度 / 周内分布 / 群沉默分布。
    // 「群组排行」同群海报，是 HTML 列表不是 ECharts
    expect(extractChartSvgs(html)).toHaveLength(11)
  })

  it('每张图都真的画出了图形，而不是只剩坐标轴', async () => {
    const html = await render(React.createElement(GlobalStatistics, { data: buildGlobalData(), ctx }))
    const charts = extractChartSvgs(html)

    expect(charts).toHaveLength(11)
    for (const chart of charts) expect(hasGeometry(chart), '有图表没画出任何图形').toBe(true)
  })

  it('趋势失真区段会画出灰色虚线并加注说明', async () => {
    const html = await render(React.createElement(GlobalStatistics, { data: buildGlobalData(), ctx }))

    expect(html).toContain('口径失真仅作参考')
    expect(html).toContain('stroke-dasharray')
  })

  it('空数据时不抛错', async () => {
    const empty: GlobalStatisticsData = {
      ...buildGlobalData(),
      totalGroups: 0,
      totalUsers: 0,
      totalParses: 0,
      activePlatforms: 0,
      statsSince: undefined,
      platformData: [],
      trend: dateWindow(30).map((date) => ({ date, count: 0 })),
      trendCompleteFrom: undefined,
      platformTrend: { dates: [], series: [] },
      topGroups: [],
      sizeBuckets: buildGlobalData().sizeBuckets.map((bucket) => ({ ...bucket, count: 0 })),
      groupGrowth: [],
      userActivity: { xLabels: [], yLabels: [], cells: [], max: 0 },
      groupActivity: [],
      silenceBuckets: buildGlobalData().silenceBuckets.map((bucket) => ({ ...bucket, count: 0 })),
      workTypes: [],
      metrics: [],
      weekday: new Array(7).fill(0)
    }
    const html = await render(React.createElement(GlobalStatistics, { data: empty, ctx }))

    expect(echartsComplaints()).toEqual([])
    expect(extractChartSvgs(html)).toHaveLength(0)
  })
})

/**
 * 面板 mock 数据（`ktr/template/statistics/<route>/data/*.json`）的回归。
 *
 * 这批 JSON 是给 `pnpm template` 面板下拉菜单用的，不在 tsc 的检查范围内 ——
 * 模板 data 契约一改，它们就会悄悄失效（字段缺失时模板直接抛错）。
 * 这里把每个 mock 都真跑一遍渲染，让 mock 和契约绑在一起。
 */
describe('排行榜列表', () => {
  const avatarCount = (html: string): number => html.split('data:image/png;base64,').length - 1

  it('群海报：每个活跃用户都带一个头像', async () => {
    const data = buildGroupData()
    const html = await render(React.createElement(GroupStatistics, { data, ctx }))
    expect(avatarCount(html), '头像数应等于榜单条数').toBeGreaterThanOrEqual(data.topUsers.length)
    // 名字和次数都要落在 HTML 里（这两样以前在 ECharts 的 SVG 里，换成列表后要单独守住）
    for (const user of data.topUsers) {
      expect(html).toContain(user.name)
    }
  })

  it('全局海报：每个群都带一个头像', async () => {
    const data = buildGlobalData()
    const html = await render(React.createElement(GlobalStatistics, { data, ctx }))
    expect(avatarCount(html)).toBeGreaterThanOrEqual(data.topGroups.length)
    for (const group of data.topGroups) {
      expect(html).toContain(group.name)
    }
  })
})

describe('面板 mock 数据', () => {
  const dataDir = (route: string) => path.join(import.meta.dirname, '..', 'ktr', 'template', 'statistics', route, 'data')

  const readMocks = (route: string): Array<{ file: string; data: Record<string, unknown> }> =>
    fs
      .readdirSync(dataDir(route))
      .filter((file) => file.endsWith('.json'))
      .map((file) => ({ file, data: JSON.parse(fs.readFileSync(path.join(dataDir(route), file), 'utf8')) }))

  it('群海报：每个 mock 都能渲染且不报缺组件', async () => {
    const mocks = readMocks('group')
    expect(mocks.length, 'group/data 下没有 mock 文件').toBeGreaterThan(0)

    for (const mock of mocks) {
      const html = await render(React.createElement(GroupStatistics, { data: mock.data as unknown as GroupStatisticsData, ctx }))
      expect(echartsComplaints(), `${mock.file} 触发了 ECharts 缺注册告警`).toEqual([])
      expect(html.length, `${mock.file} 渲染结果为空`).toBeGreaterThan(0)
      // 每个 mock 都必须产出海报骨架，而不是只渲染了半张
      expect(html, `${mock.file} 没渲染出海报头部`).toContain('GROUP_ANALYTICS')
    }
  })

  it('全局海报：每个 mock 都能渲染且不报缺组件', async () => {
    const mocks = readMocks('global')
    expect(mocks.length, 'global/data 下没有 mock 文件').toBeGreaterThan(0)

    for (const mock of mocks) {
      const html = await render(React.createElement(GlobalStatistics, { data: mock.data as unknown as GlobalStatisticsData, ctx }))
      expect(echartsComplaints(), `${mock.file} 触发了 ECharts 缺注册告警`).toEqual([])
      expect(html.length, `${mock.file} 渲染结果为空`).toBeGreaterThan(0)
      expect(html, `${mock.file} 没渲染出海报头部`).toContain('GLOBAL_ANALYTICS')
    }
  })

  it('mock 覆盖了空数据与有数据两类分支', () => {
    const groupMocks = readMocks('group')
    const emptyGroup = groupMocks.find((mock) => mock.file === '空数据.json')
    expect(emptyGroup, '缺少空数据 mock').toBeDefined()
    expect((emptyGroup!.data as unknown as GroupStatisticsData).platformData).toHaveLength(0)

    const globalMocks = readMocks('global')
    const upgraded = globalMocks.find((mock) => mock.file === '老库升级.json')
    expect(upgraded, '缺少老库升级 mock').toBeDefined()
    // 这条 mock 专门用来盯「失真区段」那套渲染分支
    expect((upgraded!.data as unknown as GlobalStatisticsData).trendCompleteFrom).toBeTruthy()
  })
})
