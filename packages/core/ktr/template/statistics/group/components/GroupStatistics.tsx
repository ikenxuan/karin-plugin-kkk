import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
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
  splitLineStyle,
  withAlpha,
  WORK_TYPE_META
} from '../../components/chartTheme'
import {
  buildDurationCurveOption,
  buildPlatformDonutOption,
  buildPlatformHourOption,
  buildPlatformLegend,
  buildTrendLineOption,
  buildWeekdayOption,
  buildWorkTypeLegend
} from '../../components/chartPresets'
import { formatCompact, formatPercent, formatWithCommas } from '../../components/format'
import type { GroupStatisticsData, TopUser, WorkTypeCount } from './types'

/**
 * 群组解析统计海报。
 *
 * 版式按「手机竖屏一屏尽量装下」设计：1440 宽的画面里全部走卡片网格，
 * 每张图独占一张卡，卡内自带紧凑标题行 —— 旧版那种「大标题 + 160px 下边距」的分区头
 * 每张图要吃掉 360px，是海报被撑到 6900px 的主因。
 *
 * 图表由 ECharts 在 render 期同步渲染成 SVG 字符串后注入，
 * 组件不持有状态、不碰 DOM、不用 hooks。配色约束见 `chartTheme.ts` 文件头。
 */

/** 海报内容区宽度：1440 - 左右各 72(p-18) */
const CONTENT_WIDTH = 1296
/** 两列网格的间距与单卡宽度：gap-14(56px) 下正好铺满内容区 */
const GRID_GAP = 56
const HALF_CARD_WIDTH = (CONTENT_WIDTH - GRID_GAP) / 2
/** 卡片内边距 p-6 = 24px，算图表画布宽度时必须减掉，否则 SVG 会溢出卡片边框 */
const CARD_PADDING = 24
const FULL_CHART_WIDTH = CONTENT_WIDTH - CARD_PADDING * 2
const HALF_CHART_WIDTH = HALF_CARD_WIDTH - CARD_PADDING * 2
/** 半宽卡片的图表高度 */
const HALF_CHART_HEIGHT = 340
/**
 * 极坐标那一行的画布尺寸。
 *
 * 「活跃时段」那张是极坐标图，圆的外接正方形只能用画布**短边**，
 * 所以常规的 572×340 里有 116px×2 的横向空间是纯浪费的。
 * 处理办法是两件事一起做：
 * 1. 把这一行整体加高 —— 半径上限就是短边的一半，不加高光调比例没用；
 * 2. 把这一行拆成 1 : 1.35，让极坐标卡窄一点、周内分布宽一点，
 *    加高到 480 之后短边就轮到宽度来当了，再高也不会更大。
 * 同排的周内分布跟着一起长，不然网格拉平后那张卡底部会空出一块。
 */
const POLAR_CHART_WIDTH = 479
const POLAR_CHART_HEIGHT = 480
/** 周内分布那张卡的画布宽度（1.35 份） */
const WEEKDAY_CHART_WIDTH = 664

/** 平台分布里环形图的画布尺寸，剩下宽度留给右侧明细列表 */
const DONUT_SIZE = { width: 420, height: 300 }

/**
 * 活跃时段：24 小时极坐标柱，峰值小时单独提亮。
 * 半径按画布短边换算 —— 极坐标图的实际可用直径受限于较短的那条边。
 */
const buildHourPolarOption = (hourly: number[], size: { width: number; height: number }, dark: boolean) => {
  const palette = getChartPalette(dark)
  const peakHour = hourly.indexOf(Math.max(...hourly))
  const short = Math.min(size.width, size.height)

  return {
    // 0.40 是留给轴标签后的上限：外圈半径 + 标签高度不能超过画布短边的一半
    polar: { radius: [Math.round(short * 0.15), Math.round(short * 0.4)], center: ['50%', '50%'] },
    angleAxis: {
      type: 'category',
      data: hourly.map((_, hour) => `${hour}时`),
      startAngle: 90,
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      // 24 个刻度全画会糊，每 3 小时标一个
      axisLabel: { ...axisLabelStyle(palette, 20), interval: 2 }
    },
    radiusAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: splitLineStyle(palette)
    },
    series: [
      {
        type: 'bar',
        coordinateSystem: 'polar',
        barWidth: '60%',
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        data: hourly.map((count, hour) => ({
          value: count,
          itemStyle: { color: hour === peakHour && count > 0 ? palette.accent : withAlpha(palette.accent, 0.4) }
        }))
      }
    ]
  }
}

/**
 * 内容形态构成：矩形树图。
 *
 * 试过饼图和玫瑰图，都不合适：内容形态天然是单项独大（视频常占一半以上），
 * 饼图/玫瑰图会把这个大类摊成一整块扇形，整张图歪向一边。
 * 树图的面积严格正比于数值，独大项只体现为大矩形，不会破坏版面平衡。
 */
const buildWorkTypeTreemapOption = (workTypes: WorkTypeCount[], dark: boolean) => {
  const palette = getChartPalette(dark)
  const total = workTypes.reduce((sum, item) => sum + item.count, 0)

  return {
    series: [
      {
        type: 'treemap',
        roam: false,
        nodeClick: false,
        // 关掉面包屑，否则它会占掉顶部一条高，树图也就填不满画布
        breadcrumb: { show: false },
        itemStyle: { borderColor: 'transparent', borderWidth: 5, gapWidth: 5, borderRadius: 12 },
        label: {
          show: true,
          fontSize: 26,
          fontWeight: 'bold',
          color: palette.textOnColor,
          fontFamily: CHART_FONT_FAMILY,
          formatter: '{b}'
        },
        data: workTypes.map((item) => ({
          name: WORK_TYPE_META[item.workType].label,
          value: item.count,
          // 小块塞不下整词，会被截成一个字（「文」「直」），反而更难读；交给下方图例认色
          label: { show: total > 0 && item.count / total >= 0.08 },
          itemStyle: { color: WORK_TYPE_META[item.workType].color }
        }))
      }
    ]
  }
}

/**
 * 群组解析统计组件 Group Statistics
 */
export const GroupStatistics: React.FC<PosterProps<GroupStatisticsData>> = (props) => {
  const dark = isDark(props.ctx)
  const data = props.data

  const platformTotal = data.platformData.reduce((sum, item) => sum + item.count, 0)
  const workTypeTotal = data.workTypes.reduce((sum, item) => sum + item.count, 0)
  const hourlyTotal = data.hourly.reduce((sum, count) => sum + count, 0)
  const weekdayTotal = data.weekday.reduce((sum, count) => sum + count, 0)
  const hasTrend = data.trend.some((point) => point.count > 0)
  const peakHour = hourlyTotal > 0 ? data.hourly.indexOf(Math.max(...data.hourly)) : -1
  const topPlatform = data.topPlatform ? PLATFORM_META[data.topPlatform] : undefined
  const platformLegend = buildPlatformLegend(data.platformData, dark)
  const maxPlatformCount = Math.max(...data.platformData.map((item) => item.count), 1)

  /** 排行条：按平台堆叠，条尾标总次数 */
  const userRows = data.topUsers.map((user: TopUser) => ({
    name: user.name,
    avatar: user.avatar,
    segments: user.segments,
    label: `${formatWithCommas(user.count)} 次`
  }))

  return (
    <DefaultLayout {...props} className="relative overflow-hidden bg-surface">
      {/* 弥散光背景层 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full w-450 h-500 -top-100 -left-75 blur-[180px]"
          style={{
            background: `radial-gradient(ellipse at 40% 40%, ${dark ? 'rgba(236, 72, 153, 0.4)' : 'rgba(244, 114, 182, 0.5)'} 0%, transparent 70%)`
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
            background: `radial-gradient(ellipse at 50% 60%, ${dark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(96, 165, 250, 0.3)'} 0%, transparent 70%)`
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
        <span className="text-[180px] font-black tracking-tighter leading-none block text-right text-foreground">STATS</span>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 p-14 flex flex-col gap-8">
        {/* 头部区域 */}
        <div className="flex items-center gap-8 border-b-4 border-border/30 pb-8">
          {data.groupAvatar && (
            <img src={data.groupAvatar} alt="群头像" className="w-28 h-28 rounded-2xl object-cover border-4 border-border/50 shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 opacity-60 mb-2">
              <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-2xl font-mono tracking-widest text-muted/80">GROUP_ANALYTICS</span>
            </div>
            <h1 className="text-[5rem] font-black leading-none tracking-tighter text-foreground/90">解析统计</h1>
          </div>
          <div className="text-right shrink-0">
            <div className="text-3xl font-bold text-foreground/80 max-w-140 truncate">{data.groupName}({data.groupId})</div>
            <div className="text-2xl text-muted/70 mt-2">
              {data.groupMemberCount ? `共 ${data.groupMemberCount} 人 · ` : ''}数据截止 {data.generatedAt}
            </div>
          </div>
        </div>

        {/* 指标条：6 张挤一行 */}
        <div className="grid grid-cols-6 gap-5">
          <KpiCard title="本群解析" titleEn="GROUP TOTAL" value={formatCompact(data.groupTotalParses)} unit="次" />
          <KpiCard title="使用用户" titleEn="UNIQUE USERS" value={formatCompact(data.groupUniqueUsers)} unit="人" />
          <KpiCard title="人均解析" titleEn="PER USER" value={data.parsesPerUser.toFixed(1)} unit="次" />
          <KpiCard
            title="日均解析"
            titleEn="DAILY AVG"
            value={(data.activeDays > 0 ? data.groupTotalParses / data.activeDays : 0).toFixed(1)}
            unit="次"
            hint={data.activeDays > 0 ? `${data.activeDays} 天` : '无按天数据'}
          />
          <KpiCard title="活跃天数" titleEn="ACTIVE DAYS" value={formatCompact(data.activeDays)} unit="天" />
          <KpiCard
            title="主力平台"
            titleEn="TOP PLATFORM"
            value={topPlatform ? topPlatform.name : '—'}
            hint={topPlatform ? `占 ${formatPercent(data.platformData[0]?.count ?? 0, platformTotal)}%` : '暂无数据'}
          />
        </div>

        {/* 平台分布：环 + 明细条，合成一张卡把整行铺满 */}
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
                columns={['解析次数', '占比', '使用人数']}
                rows={platformLegend.map((row) => {
                  const detail = data.platformData.find((item) => item.platform === row.key)
                  return {
                    key: row.key,
                    logo: row.logo,
                    name: row.name,
                    color: row.color,
                    // 条长按「相对最大项」而不是相对总量：最大的那条顶满，量级差距一眼可见
                    barPercent: (row.count / maxPlatformCount) * 100,
                    cells: [formatWithCommas(row.count), `${row.percent}%`, detail ? formatWithCommas(detail.users) : '—']
                  }
                })}
              />
            </div>
          </ChartCard>
        )}

        {/* 解析趋势 */}
        <ChartCard title="解析趋势" subtitle="TREND" accentClassName="bg-violet-500">
          {hasTrend ? (
            <>
              <SSRChart
                option={buildTrendLineOption(data.trend, dark, { baseline: data.globalDailyAverage, baselineLabel: '全局日均' })}
                width={FULL_CHART_WIDTH}
                height={360}
              />
              <div className="mt-2 text-center text-xl text-muted/80">
                近 30 天 · 虚线为全局日均 <span className="font-bold text-foreground/80">{data.globalDailyAverage.toFixed(1)}</span> 次
              </div>
            </>
          ) : (
            <div className="h-80 flex flex-col items-center justify-center gap-3 text-muted/70">
              <div className="text-3xl font-bold">暂无趋势数据</div>
              <div className="text-xl">该统计从本功能上线后开始按天记录，先积累几天再来看 ~</div>
            </div>
          )}
        </ChartCard>

        {/* 活跃时段 / 周内分布 */}
        {/* 1 : 1.35 —— 极坐标用不满宽度，把余量让给需要横轴的周内分布 */}
        <div className="grid grid-cols-[1fr_1.35fr] gap-14">
          {hourlyTotal > 0 && (
            <ChartCard
              title="活跃时段"
              subtitle="ACTIVE HOURS"
              accentClassName="bg-amber-500"
              caption={<>最活跃时段 {peakHour}:00 - {peakHour + 1}:00</>}
            >
              <SSRChart
                option={buildHourPolarOption(data.hourly, { width: POLAR_CHART_WIDTH, height: POLAR_CHART_HEIGHT }, dark)}
                width={POLAR_CHART_WIDTH}
                height={POLAR_CHART_HEIGHT}
              />
            </ChartCard>
          )}

          {weekdayTotal > 0 && (
            <ChartCard
              title="周内分布"
              subtitle="BY WEEKDAY"
              accentClassName="bg-sky-500"
              caption={
                <>
                  横轴 = 周一到周日 · 纵轴 = 该星期几的<b className="text-foreground/80">日均</b>解析次数 · 虚线 = 七日均值
                  <br />
                  取日均而不是七天总和：窗口不是整周，直接加总会让末尾那两个星期几凭空高出一截
                </>
              }
            >
              <SSRChart
                option={buildWeekdayOption(data.weekday, dark)}
                width={WEEKDAY_CHART_WIDTH}
                height={POLAR_CHART_HEIGHT}
              />
            </ChartCard>
          )}
        </div>

        {/* 内容形态 / 平台 × 时段 */}
        <div className="grid grid-cols-2 gap-14">
          {workTypeTotal > 0 && (
            <ChartCard title="内容形态" subtitle="WORK TYPES" accentClassName="bg-cyan-500">
              <SSRChart
                option={buildWorkTypeTreemapOption(data.workTypes, dark)}
                width={HALF_CHART_WIDTH}
                height={HALF_CHART_HEIGHT}
              />
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

          {hourlyTotal > 0 && data.platformHourly.length > 0 && (
            <ChartCard title="平台 × 时段" subtitle="PLATFORM BY HOUR" accentClassName="bg-indigo-500">
              <SSRChart
                option={buildPlatformHourOption(data.platformHourly, dark)}
                width={HALF_CHART_WIDTH}
                height={HALF_CHART_HEIGHT}
              />
              <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {data.platformHourly.map((item) => (
                  <div key={item.platform} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded shrink-0" style={{ backgroundColor: platformColor(item.platform, dark) }} />
                    <span className="text-xl text-foreground/80">{PLATFORM_META[item.platform].name}</span>
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

        {/* 活跃用户排行 */}
        {userRows.length > 0 && (
          <ChartCard
            title="活跃用户"
            subtitle="TOP USERS"
            accentClassName="bg-emerald-500"
            caption="进度条按平台分色，颜色 = 该用户在这个群里的解析来自哪个平台；右侧是总次数"
          >
            <RankList rows={userRows} dark={dark} />
            <RankLegend platforms={collectRankPlatforms(userRows)} dark={dark} />
          </ChartCard>
        )}

        {/* 底部信息 */}
        <div className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-mono tracking-widest text-muted mb-2">TOTAL SERVICE</div>
            <div className="text-3xl font-medium text-foreground/70">
              累计服务 <span className="font-black text-foreground">{formatWithCommas(data.globalTotalGroups)}</span> 个群组 · 解析{' '}
              <span className="font-black text-foreground">{formatWithCommas(data.globalTotalParses)}</span> 次
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default GroupStatistics
