import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import { BoxplotGuide } from '../../components/BoxplotGuide'
import { ChartCard } from '../../components/ChartCard'
import { PlatformTable } from '../../components/PlatformTable'
import { collectRankPlatforms, RankLegend, RankList } from '../../components/RankList'
import { KpiCard } from '../../components/KpiCard'
import { SSRChart } from '../../components/SSRChart'
import {
  axisLabelStyle,
  axisLineStyle,
  CHART_FONT_FAMILY,
  getChartPalette,
  METRIC_META,
  PLATFORM_META,
  platformColor,
  PLATFORM_ORDER,
  splitLineStyle,
  withAlpha,
  WORK_TYPE_META
} from '../../components/chartTheme'
import {
  buildBucketOption,
  buildPlatformDonutOption,
  buildPlatformLegend,
  buildBoxplotOption,
  buildDurationCurveOption,
  buildHeatmapOption,
  buildSilenceBucketsOption,
  buildTrendLineOption,
  buildWeekdayOption,
  buildWorkTypeLegend
} from '../../components/chartPresets'
import { formatCompact, formatDateShort, formatPercent, formatWithCommas } from '../../components/format'
import type { StatisticsPlatform } from '../../components/types'
import type { GlobalStatisticsData, GroupRankItem, PlatformTrend, PlatformWorkTypeCount, SizeBucket, TrendPoint } from './types'

/**
 * 全局解析统计海报。
 *
 * 与群海报同一套密排卡片版式：每张图独占一张卡、卡内自带紧凑标题行，
 * 两列网格铺满 1440 宽的画面，尽量压低总高度以适配手机竖屏浏览。
 * 图表由 ECharts 在 render 期同步出 SVG 字符串再注入，不用 hooks、不碰 DOM。
 */

/** 海报内容区宽度：1440 - 左右各 72(p-18) */
const CONTENT_WIDTH = 1296
/** 两列网格：gap-14(56px) 下每张卡 620 */
const GRID_GAP = 56
const HALF_CARD_WIDTH = (CONTENT_WIDTH - GRID_GAP) / 2
/** 卡片内边距 p-6 = 24px，算画布宽度时必须减掉，否则 SVG 会溢出卡片边框 */
const CARD_PADDING = 24
const FULL_CHART_WIDTH = CONTENT_WIDTH - CARD_PADDING * 2
const HALF_CHART_WIDTH = HALF_CARD_WIDTH - CARD_PADDING * 2
const HALF_CHART_HEIGHT = 340
/**
 * 热力图的画布高度。
 * 比同排的箱线图卡片高一截是刻意为之：箱线图那边多了个 `BoxplotGuide`（约 190px），
 * 两列网格会把同排卡片拉成等高，左卡不跟着长高的话底部就会空出一大块。
 * 加上说明文字补到三行之后，两边内容高度基本对齐。
 */
const HEATMAP_CHART_HEIGHT = 520
/** 平台分布里环形图的画布尺寸，剩下宽度留给右侧明细列表 */
const DONUT_SIZE = { width: 420, height: 300 }

/** 平台趋势：分平台堆叠面积图 */
const buildPlatformTrendOption = (trend: PlatformTrend, dark: boolean) => {
  const palette = getChartPalette(dark)

  return {
    grid: { top: 44, right: 24, bottom: 56, left: 76 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trend.dates.map((date) => formatDateShort(date)),
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20, 45),
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '解析次数',
      nameTextStyle: { fontSize: 20, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20),
      splitLine: splitLineStyle(palette)
    },
    series: trend.series.map((item) => {
      const color = platformColor(item.platform, dark)
      return {
        type: 'line',
        name: PLATFORM_META[item.platform].name,
        stack: 'total',
        smooth: 0.3,
        symbol: 'none',
        lineStyle: { width: 2, color },
        itemStyle: { color },
        areaStyle: { color: withAlpha(color, 0.5) },
        data: item.values
      }
    })
  }
}

/** 平台 × 内容形态：按平台归一的百分比堆叠条，比绝对堆叠更能看出各平台的口味差异 */
const buildPlatformWorkTypeOption = (rows: PlatformWorkTypeCount[], dark: boolean) => {
  const palette = getChartPalette(dark)

  // 平台顺序走全局常量，不跟着数据库返回顺序走，否则两次渲染的堆叠顺序可能不一样
  const platforms = PLATFORM_ORDER.filter((platform) => rows.some((row) => row.platform === platform))
  const workTypes = [...new Set(rows.map((row) => row.workType))]

  const countOf = (platform: StatisticsPlatform, workType: PlatformWorkTypeCount['workType']) =>
    rows.find((row) => row.platform === platform && row.workType === workType)?.count ?? 0
  const totalOf = (platform: StatisticsPlatform) => rows.filter((row) => row.platform === platform).reduce((sum, row) => sum + row.count, 0)

  return {
    grid: { top: 16, right: 24, bottom: 44, left: 150 },
    xAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { ...axisLabelStyle(palette, 20), formatter: '{value}%' },
      splitLine: splitLineStyle(palette)
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: platforms.map((platform) => `${PLATFORM_META[platform].name} ${formatCompact(totalOf(platform))}`),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 22, color: palette.text, fontFamily: CHART_FONT_FAMILY }
    },
    series: workTypes.map((workType) => ({
      type: 'bar',
      name: WORK_TYPE_META[workType].label,
      stack: 'share',
      barWidth: 52,
      itemStyle: { color: WORK_TYPE_META[workType].color },
      label: {
        show: true,
        position: 'inside',
        fontSize: 20,
        color: palette.textOnColor,
        fontFamily: CHART_FONT_FAMILY,
        // 占比太小的段落放不下字，硬塞会糊成一团，交给下方图例认色
        formatter: (params: { value: number }) => (params.value >= 14 ? `${Math.round(params.value)}%` : '')
      },
      data: platforms.map((platform) => {
        const total = totalOf(platform)
        return total > 0 ? Number(((countOf(platform, workType) / total) * 100).toFixed(2)) : 0
      })
    }))
  }
}

/** 群组增长：累计群数的阶梯折线 */
const buildGroupGrowthOption = (growth: TrendPoint[], dark: boolean) => {
  const palette = getChartPalette(dark)

  return {
    grid: { top: 44, right: 24, bottom: 56, left: 76 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: growth.map((point) => formatDateShort(point.date)),
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20, 45),
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '累计群数',
      nameTextStyle: { fontSize: 20, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20),
      minInterval: 1,
      splitLine: splitLineStyle(palette)
    },
    series: [
      {
        type: 'line',
        // 群数是跳变的，阶梯线比斜线诚实
        step: 'end',
        symbol: 'none',
        lineStyle: { width: 4, color: palette.accent },
        itemStyle: { color: palette.accent },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: withAlpha(palette.accent, 0.35) },
              { offset: 1, color: withAlpha(palette.accent, 0.02) }
            ]
          }
        },
        data: growth.map((point) => point.count)
      }
    ]
  }
}

/**
 * 全局解析统计组件 Global Statistics
 */
export const GlobalStatistics: React.FC<PosterProps<GlobalStatisticsData>> = (props) => {
  const dark = isDark(props.ctx)
  const data = props.data
  const palette = getChartPalette(dark)

  // 热力图的两个派生量：总人数（说明里报占比用）和最密集的那一格
  const heatTotal = data.userActivity.cells.reduce((sum, [, , count]) => sum + count, 0)
  // 沉默分布里「最近一周还在用」的群占比，写进卡片说明
  const silenceTotal = data.silenceBuckets.reduce((sum, bucket) => sum + bucket.count, 0)
  const silenceActive = data.silenceBuckets.slice(0, 2).reduce((sum, bucket) => sum + bucket.count, 0)
  const silenceActivePercent = silenceTotal > 0 ? Math.round((silenceActive / silenceTotal) * 100) : 0
  const heatPeak = data.userActivity.cells.reduce(
    (peak, [x, y, count]) => (count > peak.count ? { x, y, count } : peak),
    { x: 0, y: 0, count: 0 }
  )

  const platformTotal = data.platformData.reduce((sum, item) => sum + item.count, 0)
  const parsesPerUser = data.totalUsers > 0 ? data.totalParses / data.totalUsers : 0
  const parsesPerGroup = data.totalGroups > 0 ? data.totalParses / data.totalGroups : 0
  const hasTrend = data.trend.some((point) => point.count > 0)
  const hasPlatformTrend = data.platformTrend.dates.length > 0
  const hasWorkTypes = data.workTypes.length > 0
  const weekdayTotal = data.weekday.reduce((sum, count) => sum + count, 0)
  const trendIsSplit = Boolean(data.trendCompleteFrom) && data.trend.some((point) => point.date < data.trendCompleteFrom!)
  const platformLegend = buildPlatformLegend(data.platformData, dark)
  const maxPlatformCount = Math.max(...data.platformData.map((item) => item.count), 1)

  const groupRows = data.topGroups.map((group: GroupRankItem) => ({
    name: group.name,
    avatar: group.avatar,
    segments: group.segments,
    label: `${formatWithCommas(group.totalParses)} 次 · ${formatWithCommas(group.uniqueUsers)} 人`
  }))

  return (
    <DefaultLayout {...props} className="relative overflow-hidden bg-surface">
      {/* 弥散光背景层 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full w-450 h-500 -top-100 -left-75 blur-[180px]"
          style={{
            background: `radial-gradient(ellipse at 40% 40%, ${dark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(129, 140, 248, 0.45)'} 0%, transparent 70%)`
          }}
        />
        <div
          className="absolute rounded-full w-350 h-400 top-150 -right-50 blur-[160px]"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${dark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(167, 139, 250, 0.4)'} 0%, transparent 70%)`
          }}
        />
        <div
          className="absolute rounded-full w-400 h-350 -bottom-75 left-75 blur-[180px]"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${dark ? 'rgba(56, 189, 248, 0.22)' : 'rgba(125, 211, 252, 0.3)'} 0%, transparent 70%)`
          }}
        />
      </div>

      {/* 杂色纹理层 */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08] dark:opacity-[0.12]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="pixelNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#pixelNoise)" />
        </svg>
      </div>

      {/* 背景大字装饰 */}
      <div className="absolute top-24 right-15 pointer-events-none select-none opacity-[0.03] z-0">
        <span className="text-[180px] font-black tracking-tighter leading-none block text-right text-foreground">GLOBAL</span>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 p-14 flex flex-col gap-8">
        {/* 头部区域 */}
        <div className="border-b-4 border-border/30 pb-8">
          <div className="flex items-center gap-4 opacity-60 mb-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-2xl font-mono tracking-widest text-muted/80">GLOBAL_ANALYTICS</span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-[5rem] font-black leading-none tracking-tighter text-foreground/90">全局解析统计</h1>
            <div className="shrink-0 whitespace-nowrap text-2xl text-muted/70 font-mono">
              {data.statsSince ? `统计自 ${data.statsSince} · ` : ''}数据截止 {data.generatedAt}
            </div>
          </div>
        </div>

        {/* 指标条：6 张挤一行 */}
        <div className="grid grid-cols-6 gap-5">
          <KpiCard title="服务群组" titleEn="GROUPS" value={formatCompact(data.totalGroups)} unit="个" />
          <KpiCard title="使用用户" titleEn="USERS" value={formatCompact(data.totalUsers)} unit="人" />
          <KpiCard title="总解析" titleEn="PARSES" value={formatCompact(data.totalParses)} unit="次" />
          <KpiCard title="覆盖平台" titleEn="PLATFORMS" value={String(data.activePlatforms)} unit="个" />
          <KpiCard title="人均解析" titleEn="PER USER" value={parsesPerUser.toFixed(1)} unit="次" />
          <KpiCard title="群均解析" titleEn="PER GROUP" value={formatCompact(Math.round(parsesPerGroup))} unit="次" />
        </div>

        {/* 平台分布：环 + 明细条 */}
        {platformTotal > 0 && (
          <ChartCard title="平台分布" subtitle="DISTRIBUTION" accentClassName="bg-blue-500">
            <div className="flex items-center gap-6">
              <SSRChart
                option={buildPlatformDonutOption(data.platformData, dark, DONUT_SIZE, 'TOTAL PARSES')}
                width={DONUT_SIZE.width}
                height={DONUT_SIZE.height}
                className="shrink-0"
              />
              <PlatformTable
                className="flex-1"
                columns={['解析次数', '占比', '覆盖群数', '覆盖用户']}
                rows={platformLegend.map((row) => {
                  const detail = data.platformData.find((item) => item.platform === row.key)
                  return {
                    key: row.key,
                    logo: row.logo,
                    name: row.name,
                    color: row.color,
                    // 条长按「相对最大项」而不是相对总量：最大的那条顶满，量级差距一眼可见
                    barPercent: (row.count / maxPlatformCount) * 100,
                    cells: [
                      formatWithCommas(row.count),
                      `${row.percent}%`,
                      detail ? formatWithCommas(detail.groups) : '—',
                      detail ? formatWithCommas(detail.users) : '—'
                    ]
                  }
                })}
              />
            </div>
          </ChartCard>
        )}

        {/* 全局趋势 */}
        <ChartCard title="解析趋势" subtitle="TREND" accentClassName="bg-violet-500">
          {hasTrend ? (
            <>
              <SSRChart
                option={buildTrendLineOption(data.trend, dark, {
                  splitFrom: data.trendCompleteFrom,
                  baseline: data.dailyAverage,
                  baselineLabel: '全局日均'
                })}
                width={FULL_CHART_WIDTH}
                height={360}
              />
              {trendIsSplit ? (
                <div className="mt-2 text-center text-xl text-muted/80">
                  近 30 天 · 虚线为全局日均 <span className="font-bold text-foreground/80">{data.dailyAverage.toFixed(1)}</span> 次 ·{' '}
                  <span className="text-foreground/80 font-bold">{data.trendCompleteFrom}</span> 之前的灰色虚线为旧版回填数据，口径失真仅作参考
                </div>
              ) : (
                <div className="mt-2 text-center text-xl text-muted/80">
                  近 30 天 · 虚线为全局日均 <span className="font-bold text-foreground/80">{data.dailyAverage.toFixed(1)}</span> 次
                </div>
              )}
            </>
          ) : (
            <div className="h-80 flex flex-col items-center justify-center gap-3 text-muted/70">
              <div className="text-3xl font-bold">暂无趋势数据</div>
              <div className="text-xl">该统计从本功能上线后开始按天记录，先积累几天再来看 ~</div>
            </div>
          )}
        </ChartCard>

        {/* 平台趋势 / 平台 × 形态 */}
        <div className="grid grid-cols-2 gap-14">
          {hasPlatformTrend && (
            <ChartCard title="平台趋势" subtitle="PLATFORM TREND" accentClassName="bg-sky-500">
              <SSRChart option={buildPlatformTrendOption(data.platformTrend, dark)} width={HALF_CHART_WIDTH} height={HALF_CHART_HEIGHT} />
              <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {data.platformTrend.series.map((item) => (
                  <div key={item.platform} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded shrink-0" style={{ backgroundColor: platformColor(item.platform, dark) }} />
                    <span className="text-xl text-foreground/80">{PLATFORM_META[item.platform].name}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          )}

          {hasWorkTypes && (
            <ChartCard title="内容形态" subtitle="WORK TYPES" accentClassName="bg-cyan-500">
              <SSRChart option={buildPlatformWorkTypeOption(data.workTypes, dark)} width={HALF_CHART_WIDTH} height={HALF_CHART_HEIGHT} />
              <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {buildWorkTypeLegend(data.workTypes).map((row) => (
                  <div key={row.key} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded shrink-0" style={{ backgroundColor: row.color }} />
                    <span className="text-xl text-foreground/80">{row.label}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          )}
        </div>

        {/* 解析耗时分布：单轴累计曲线 */}
        {data.metrics.map((item) => {
          // 拿「≤5s」那一档的累计占比当读法示例。档位会被裁剪，只能按标签找，不能按下标
          const metricTotal = item.buckets.reduce((sum, bucket) => sum + bucket.count, 0)
          const fiveSecondIndex = item.buckets.findIndex((bucket) => bucket.upper === '≤5s')
          const fiveSecondShare =
            fiveSecondIndex >= 0 && metricTotal > 0
              ? Math.round(
                  (item.buckets.slice(0, fiveSecondIndex + 1).reduce((sum, bucket) => sum + bucket.count, 0) / metricTotal) * 100
                )
              : undefined

          return (
            <ChartCard
              key={item.metric}
              title={METRIC_META[item.metric].title}
              subtitle={METRIC_META[item.metric].subtitle}
              accentClassName={METRIC_META[item.metric].accent}
              caption={
                <>
                  横轴 = <b className="text-foreground/80">耗时上限</b> · 纵轴 = 有多少比例的解析在这个时间内跑完 · 两条虚线是 50% / 90% 的位置
                  <br />
                  读法：
                  {fiveSecondShare !== undefined ? (
                    <>
                      「≤5s」那个点是 <b className="text-foreground/80">{fiveSecondShare}%</b>，意思就是 {fiveSecondShare}% 的解析 5 秒内跑完
                    </>
                  ) : (
                    <>任取一点，横轴是耗时上限、纵轴就是跑完的比例</>
                  )}
                  ；曲线越陡说明解析越集中在这一段
                </>
              }
            >
              <SSRChart option={buildDurationCurveOption(item, dark)} width={FULL_CHART_WIDTH} height={380} />
            </ChartCard>
          )
        })}

        {/* 群组排行 */}
        {groupRows.length > 0 && (
          <ChartCard
            title="群组排行"
            subtitle="TOP GROUPS"
            accentClassName="bg-emerald-500"
            caption="进度条按平台分色，颜色 = 该群的解析来自哪个平台；右侧是总次数和使用人数"
          >
            <RankList rows={groupRows} dark={dark} />
            <RankLegend platforms={collectRankPlatforms(groupRows)} dark={dark} />
          </ChartCard>
        )}

        {/* 群规模分布 / 群组增长 */}
        <div className="grid grid-cols-2 gap-14">
          {data.sizeBuckets.some((bucket: SizeBucket) => bucket.count > 0) && (
            <ChartCard title="群规模分布" subtitle="GROUP SIZES" accentClassName="bg-amber-500" caption="按各群累计解析次数分桶">
              <SSRChart option={buildBucketOption(data.sizeBuckets, dark, { yName: '群数' })} width={HALF_CHART_WIDTH} height={HALF_CHART_HEIGHT} />
            </ChartCard>
          )}

          {data.groupGrowth.length > 0 && (
            <ChartCard title="群组增长" subtitle="GROUP GROWTH" accentClassName="bg-teal-500" caption="按群首次出现解析的日期累计">
              <SSRChart option={buildGroupGrowthOption(data.groupGrowth, dark)} width={HALF_CHART_WIDTH} height={HALF_CHART_HEIGHT} />
            </ChartCard>
          )}
        </div>

        {/* 用户活跃度矩阵 / 群组活跃度箱线 */}
        <div className="grid grid-cols-2 gap-14">
          {data.userActivity.cells.length > 0 && (
            <ChartCard
              title="用户活跃度"
              subtitle="USER ACTIVITY"
              accentClassName="bg-rose-500"
              caption={
                <>
                  横轴 → 用过几个群 · 纵轴 ↑ 总解析次数 · 格子数字 = 落在这档的用户数
                  <br />
                  共 <b className="text-foreground/80">{formatWithCommas(heatTotal)}</b> 位用户 ·
                  最密集的一格是「{data.userActivity.xLabels[heatPeak.x]} × {data.userActivity.yLabels[heatPeak.y]}」，
                  占 <b className="text-foreground/80">{formatPercent(heatPeak.count, heatTotal)}%</b>
                  <br />
                  颜色越深人越多；左上角大片深色 = 大多数人只在少数群里轻度使用
                </>
              }
            >
              <SSRChart
                option={buildHeatmapOption(data.userActivity, dark)}
                width={HALF_CHART_WIDTH}
                height={HEATMAP_CHART_HEIGHT}
              />
            </ChartCard>
          )}

          {data.groupActivity.length > 0 && (
            <ChartCard
              title="群组活跃度"
              subtitle="GROUP ACTIVITY"
              accentClassName="bg-purple-500"
              caption={
                <>
                  怎么算的：把每个群按<b className="text-foreground/80">群内使用人数</b>分档，
                  档内所有群的<b className="text-foreground/80">总解析次数</b>合起来画成一个箱体
                  <br />
                  横轴 = 使用人数档 · 纵轴 = 群总解析次数 · 箱体上方的数字是中位数
                </>
              }
            >
              <SSRChart
                option={buildBoxplotOption(data.groupActivity, dark, '群总解析次数')}
                width={HALF_CHART_WIDTH}
                height={HALF_CHART_HEIGHT}
              />
              <BoxplotGuide accent={palette.accent} />
            </ChartCard>
          )}
        </div>

        {/* 周内分布 / 群沉默分布 */}
        <div className="grid grid-cols-2 gap-14">
          {weekdayTotal > 0 && (
            <ChartCard
              title="周内分布"
              subtitle="BY WEEKDAY"
              accentClassName="bg-orange-500"
              caption={
                <>
                  横轴 = 周一到周日 · 纵轴 = 该星期几的<b className="text-foreground/80">日均</b>解析次数 · 虚线 = 七日均值
                  <br />
                  柱子比虚线高 = 这天比平时更活跃；取日均而不是七天总和，是因为窗口不是整周
                </>
              }
            >
              <SSRChart option={buildWeekdayOption(data.weekday, dark)} width={HALF_CHART_WIDTH} height={HALF_CHART_HEIGHT} />
            </ChartCard>
          )}

          {data.silenceBuckets.some((bucket) => bucket.count > 0) && (
            <ChartCard
              title="群沉默分布"
              subtitle="SILENT GROUPS"
              accentClassName="bg-slate-500"
              caption={
                <>
                  怎么算的：每个群按<b className="text-foreground/80">最后一次解析距今几天</b>归到一档，柱子高度 = 落在这档的群数
                  <br />
                  绿 = 最近一周还在用 · 黄 = 一周到一月 · 灰 = 超过一月没动静 · 柱顶第二行是该档占全部群的比例
                  <br />
                  当前有 <b className="text-foreground/80">{silenceActivePercent}%</b> 的群最近一周用过
                </>
              }
            >
              <SSRChart
                option={buildSilenceBucketsOption(data.silenceBuckets, dark)}
                width={HALF_CHART_WIDTH}
                height={HALF_CHART_HEIGHT}
              />
            </ChartCard>
          )}
        </div>

        {/* 底部信息 */}
        <div className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-mono tracking-widest text-muted mb-2">TOTAL SERVICE</div>
            <div className="text-3xl font-medium text-foreground/70">
              累计服务 <span className="font-black text-foreground">{formatWithCommas(data.totalGroups)}</span> 个群组 · 解析{' '}
              <span className="font-black text-foreground">{formatWithCommas(data.totalParses)}</span> 次
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default GlobalStatistics
