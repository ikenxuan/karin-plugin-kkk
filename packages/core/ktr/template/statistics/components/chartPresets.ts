import type { ActivityBox, ActivityHeatmap, StatisticsPlatform, StatisticsWorkType } from './types'
import {
  axisLabelStyle,
  axisLineStyle,
  CHART_FONT_FAMILY,
  getChartPalette,
  PLATFORM_META,
  platformColor,
  platformLogo,
  splitLineStyle,
  withAlpha,
  WORK_TYPE_META
} from './chartTheme'
import { formatCompact, formatDateShort, formatPercent } from './format'

/** 平台计数（两张海报共用的最小结构） */
export interface PlatformCountLike {
  /** 平台 */
  platform: StatisticsPlatform
  /** 解析次数 */
  count: number
}

/** 内容形态计数 */
export interface WorkTypeCountLike {
  /** 内容形态 */
  workType: StatisticsWorkType
  /** 解析次数 */
  count: number
}

/**
 * 平台分布环形图（群海报 / 全局海报共用）。
 *
 * 图内不放任何标签：平台名长短不一，外置标签很容易顶出画布被裁掉（Victory 那版就踩了这个坑）。
 * 名称、次数、占比一律交给旁边的 HTML 明细列表，字号和排版都可控。
 * @param data 各平台计数
 * @param dark 是否深色主题
 * @param size 画布宽高，环的尺寸与中心文字都按它换算
 * @param centerCaption 环中心大字下方的说明；不传则只显示总数
 */
export const buildPlatformDonutOption = (
  data: PlatformCountLike[],
  dark: boolean,
  size: { width: number; height: number },
  centerCaption?: string
) => {
  const palette = getChartPalette(dark)
  const total = data.reduce((sum, item) => sum + item.count, 0)
  // 环与中心文字都按画布短边缩放，同一份配置在整宽卡片和半宽卡片里都不会失衡
  const short = Math.min(size.width, size.height)
  const outer = Math.round(short * 0.36)
  const inner = Math.round(outer * 0.66)
  const numberSize = Math.round(short * 0.16)

  return {
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: centerCaption ? '38%' : '44%',
        style: {
          text: formatCompact(total),
          fontSize: numberSize,
          fontWeight: 'bold',
          fill: palette.text,
          fontFamily: CHART_FONT_FAMILY,
          textAlign: 'center'
        }
      },
      ...(centerCaption
        ? [
            {
              type: 'text' as const,
              left: 'center',
              top: '62%',
              style: {
                text: centerCaption,
                fontSize: Math.round(numberSize * 0.3),
                fill: palette.textMuted,
                fontFamily: CHART_FONT_FAMILY,
                textAlign: 'center' as const
              }
            }
          ]
        : [])
    ],
    series: [
      {
        type: 'pie',
        radius: [inner, outer],
        center: ['50%', '50%'],
        padAngle: 2,
        itemStyle: { borderRadius: 8 },
        label: { show: false },
        labelLine: { show: false },
        data: data.map((item) => ({
          name: PLATFORM_META[item.platform].name,
          value: item.count,
          itemStyle: { color: platformColor(item.platform, dark) }
        }))
      }
    ]
  }
}

/**
 * 近 N 天面积折线（群海报的趋势图、全局海报的总趋势共用）。
 *
 * 只给峰值那天打数据标签 —— 30 个点全标会糊成一片。
 * `splitFrom` 用来把「老库回填导致的失真区段」单独画成灰色虚线：
 * 该日之前的点走一条静音虚线系列，之后的点走正常的强调色系列，中间用 null 断开。
 * @param trend 已补齐的按日序列（升序）
 * @param dark 是否深色主题
 * @param options.baseline 叠加一条水平基准虚线（如全局日均）时的取值
 * @param options.baselineLabel 基准线右端的说明文字
 * @param options.splitFrom 可信数据起始日；早于它的点会被画成灰色虚线
 */
export const buildTrendLineOption = (
  trend: Array<{ date: string; count: number }>,
  dark: boolean,
  options: { baseline?: number; baselineLabel?: string; splitFrom?: string } = {}
) => {
  const palette = getChartPalette(dark)
  const { baseline, baselineLabel = '', splitFrom } = options
  const counts = trend.map((point) => point.count)
  const peakIndex = counts.indexOf(Math.max(...counts))

  // 失真区段只画到 splitFrom 前一天，正常区段从 splitFrom 开始，两者用 null 断开避免连线
  const staleValues = trend.map((point) => (splitFrom && point.date < splitFrom ? point.count : null))
  const freshValues = trend.map((point, index) => {
    if (splitFrom && trend[index].date < splitFrom) return null
    return { value: point.count, label: { show: index === peakIndex && point.count > 0 } }
  })
  const hasSplit = Boolean(splitFrom) && staleValues.some((value) => value !== null)

  return {
    // 左右留白都压到最小：海报宽度是写死的 1440，横向空间要尽量留给折线本体。
    // 基准虚线的含义不挂 endLabel（那要占一百多像素横向留白），交给卡片下方的说明文字。
    grid: { top: 56, right: 32, bottom: 88, left: 104 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trend.map((point) => formatDateShort(point.date)),
      axisLine: { lineStyle: { width: 2, color: palette.axisLine } },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 22,
        rotate: trend.length > 12 ? 45 : 0,
        color: palette.textMuted,
        fontFamily: CHART_FONT_FAMILY
      },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '解析次数',
      nameTextStyle: { fontSize: 24, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 24, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY },
      splitLine: { lineStyle: { width: 1, color: palette.splitLine } }
    },
    series: [
      // 失真区段：灰色虚线，不与正常段共用样式，读者一眼能看出「这段不一样」
      ...(hasSplit
        ? [
            {
              type: 'line' as const,
              name: '数据不完整',
              silent: true,
              symbol: 'none',
              lineStyle: { width: 3, type: 'dashed' as const, color: palette.accentAlt },
              data: staleValues
            }
          ]
        : []),
      {
        type: 'line',
        name: '解析次数',
        smooth: 0.35,
        symbol: 'circle',
        symbolSize: 10,
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
              { offset: 0, color: withAlpha(palette.accent, 0.4) },
              { offset: 1, color: withAlpha(palette.accent, 0.02) }
            ]
          }
        },
        label: {
          show: false,
          position: 'top',
          fontSize: 24,
          color: palette.text,
          fontFamily: CHART_FONT_FAMILY,
          formatter: '{c} 次'
        },
        data: freshValues
      },
      ...(baseline !== undefined
        ? [
            {
              type: 'line' as const,
              name: baselineLabel || '基准',
              silent: true,
              symbol: 'none',
              lineStyle: { width: 2, type: 'dashed' as const, color: palette.accentAlt },
              // 不在轴末端挂 endLabel：那要占掉一百多像素横向留白，含义交给卡片说明文字
              data: trend.map(() => baseline)
            }
          ]
        : [])
    ]
  }
}

/** 平台图例的一行数据（HTML 侧渲染用） */
export const buildPlatformLegend = (data: PlatformCountLike[], dark: boolean) => {
  const total = data.reduce((sum, item) => sum + item.count, 0)
  return data.map((item) => {
    const meta = PLATFORM_META[item.platform]
    return {
      key: item.platform,
      name: meta.name,
      nameEn: meta.nameEn,
      logo: platformLogo(item.platform, dark),
      color: platformColor(item.platform, dark),
      count: item.count,
      percent: formatPercent(item.count, total)
    }
  })
}

/**
 * 内容形态图例的一行数据。
 * 全局海报传进来的是「平台 × 形态」的笛卡尔积，同一个形态会出现多次，这里按形态去重。
 */
export const buildWorkTypeLegend = (data: WorkTypeCountLike[]) => {
  const seen = new Set<StatisticsWorkType>()
  const rows: Array<{ key: StatisticsWorkType; label: string; color: string; count: number }> = []
  for (const item of data) {
    if (seen.has(item.workType)) continue
    seen.add(item.workType)
    rows.push({
      key: item.workType,
      label: WORK_TYPE_META[item.workType].label,
      color: WORK_TYPE_META[item.workType].color,
      count: item.count
    })
  }
  return rows
}

/** 直方图分桶 */
export interface BucketCount {
  /** 桶标签 */
  label: string
  /** 落在该桶里的数量 */
  count: number
}

/**
 * 分桶直方图（群规模分布、群沉默分布共用）
 * @param opts.yName y 轴名称
 * @param opts.accent 柱色，默认用主强调色
 */
export const buildBucketOption = (
  buckets: BucketCount[],
  dark: boolean,
  opts: { yName: string; accent?: string } = { yName: '数量' }
) => {
  const palette = getChartPalette(dark)
  const color = opts.accent ?? palette.accent

  return {
    grid: { top: 44, right: 20, bottom: 52, left: 76 },
    xAxis: {
      type: 'category',
      data: buckets.map((bucket) => bucket.label),
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 22)
    },
    yAxis: {
      type: 'value',
      name: opts.yName,
      nameTextStyle: { fontSize: 20, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20),
      splitLine: splitLineStyle(palette)
    },
    series: [
      {
        type: 'bar',
        barWidth: 44,
        itemStyle: { borderRadius: [10, 10, 0, 0], color: withAlpha(color, 0.85) },
        label: { show: true, position: 'top', fontSize: 22, color: palette.text, fontFamily: CHART_FONT_FAMILY, formatter: '{c}' },
        data: buckets.map((bucket) => bucket.count)
      }
    ]
  }
}

/**
 * 周内分布：周一到周日。
 * 周末两根柱子单独降饱和 —— 「这个群周末更活跃还是更冷清」是这张图唯一的看点，
 * 让它不用读标签就能看出来。
 */
export const buildWeekdayOption = (values: number[], dark: boolean, yName = '日均解析次数') => {
  const palette = getChartPalette(dark)
  const active = values.filter((value) => value > 0)
  const average = active.length > 0 ? active.reduce((sum, value) => sum + value, 0) / active.length : 0

  return {
    grid: { top: 52, right: 20, bottom: 52, left: 84 },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 22)
    },
    yAxis: {
      type: 'value',
      name: yName,
      nameTextStyle: { fontSize: 20, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20),
      splitLine: splitLineStyle(palette)
    },
    series: [
      {
        type: 'bar',
        // 比其它柱状图粗一档：七根柱子在宽卡里排开，太细会显得空
        barWidth: 56,
        itemStyle: { borderRadius: [10, 10, 0, 0] },
        label: { show: true, position: 'top', fontSize: 22, color: palette.text, fontFamily: CHART_FONT_FAMILY, formatter: '{c}' },
        // 高于周均的实心、低于周均的淡一档 —— 不用读数字就能看出这个群周内什么节奏
        data: values.map((value) => ({
          value,
          itemStyle: { color: withAlpha(palette.accent, value >= average ? 0.92 : 0.4) }
        }))
      },
      {
        // 周均基准线。用一条静音 line 系列画，避免为了 markLine 再注册一个组件
        type: 'line',
        silent: true,
        symbol: 'none',
        lineStyle: { width: 2, type: 'dashed', color: palette.accentAlt },
        data: values.map(() => average)
      }
    ]
  }
}

/**
 * 群沉默分布：按「最后一次解析距今多久」分档的群数。
 *
 * 柱状图对这种**有序分档的计数分布**是正确选择（就是一张直方图），
 * 之前的问题不在图表类型而在可读性：五档宽窄差了几十倍（1 天 / 7 天 / 23 天 / 60 天 / 无限），
 * 光看柱子高低会把「档宽」误读成「密度」。所以这里把三档语义用颜色点出来，
 * 并把每档的群数换成「群数 + 占比」，读者不用自己去除总数。
 * @param buckets 各档群数（从新到旧）
 * @param dark 是否深色主题
 */
export const buildSilenceBucketsOption = (buckets: Array<{ label: string; count: number }>, dark: boolean) => {
  const palette = getChartPalette(dark)
  const total = buckets.reduce((sum, bucket) => sum + bucket.count, 0)

  // 三个语义层：还活着 / 在冷却 / 已经沉睡。配色从强调色一路褪到灰
  const tierOf = (index: number) => (index <= 1 ? withAlpha('#22c55e', 0.85) : index === 2 ? withAlpha('#f59e0b', 0.8) : '#a1a1aa')

  return {
    grid: { top: 44, right: 20, bottom: 52, left: 76 },
    xAxis: {
      type: 'category',
      data: buckets.map((bucket) => bucket.label),
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      axisLabel: { ...axisLabelStyle(palette, 20), interval: 0 }
    },
    yAxis: {
      type: 'value',
      name: '群数',
      nameTextStyle: { fontSize: 20, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20),
      splitLine: splitLineStyle(palette)
    },
    series: [
      {
        type: 'bar',
        barWidth: 46,
        itemStyle: { borderRadius: [10, 10, 0, 0] },
        label: {
          show: true,
          position: 'top',
          fontSize: 20,
          lineHeight: 24,
          color: palette.text,
          fontFamily: CHART_FONT_FAMILY,
          // 两行：群数 + 占比。占比是关键，否则读者得自己心算「52 占 128 的多少」
          formatter: (params: { dataIndex: number }) => {
            const count = buckets[params.dataIndex].count
            const percent = total > 0 ? Math.round((count / total) * 100) : 0
            return `${count}
${percent}%`
          }
        },
        data: buckets.map((bucket, index) => ({ value: bucket.count, itemStyle: { color: tierOf(index) } }))
      }
    ]
  }
}

/** 一小时的平台构成序列 */
export interface PlatformHourSeries {
  /** 平台 */
  platform: StatisticsPlatform
  /** 24 个小时的次数，下标即小时 */
  values: number[]
}

/**
 * 平台 × 时段：24 小时堆叠柱。
 * 和单看总时段的极坐标图回答的不是同一个问题 —— 这张看的是「几点刷哪个平台」。
 */
export const buildPlatformHourOption = (series: PlatformHourSeries[], dark: boolean) => {
  const palette = getChartPalette(dark)

  return {
    grid: { top: 24, right: 20, bottom: 52, left: 76 },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, hour) => `${hour}`),
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      // 24 个刻度全画会糊，每 3 小时标一个
      axisLabel: { ...axisLabelStyle(palette, 22), interval: 2 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20),
      splitLine: splitLineStyle(palette)
    },
    series: series.map((item) => ({
      type: 'bar',
      stack: 'hours',
      name: PLATFORM_META[item.platform].name,
      itemStyle: { color: platformColor(item.platform, dark) },
      data: item.values
    }))
  }
}

/**
 * 二维分档热力图。
 *
 * 替代原来的散点图：散点的横轴是「用过几个群」这种低基数整数，
 * 几百个点会叠成几根竖条，重叠部分完全看不出密度；
 * 分档成矩阵之后，色深直接编码人数，「大部分人落在哪一格」一眼就能读出来。
 * 图内不放轴名 —— 横向空间要留给格子（见 `BuildHeatmapOption` 的留白说明）。
 * @param data 分档矩阵
 * @param dark 是否深色主题
 */
export const buildHeatmapOption = (data: ActivityHeatmap, dark: boolean) => {
  const palette = getChartPalette(dark)
  const max = data.max > 0 ? data.max : 1

  return {
    grid: { top: 16, right: 16, bottom: 56, left: 128 },
    // ECharts 的 heatmap 强制要求配 visualMap（不配会直接抛 "Heatmap must use with visualMap"），
    // 所以色阶只能走它，不能逐格写 itemStyle.color。
    // show 关掉：图例本身占竖向空间，而格子里的数字已经表达了量级。
    visualMap: {
      type: 'continuous',
      min: 0,
      max,
      show: false,
      inRange: {
        // 单色阶：最淡那档留一点底色，空格子和「有但很少」才区分得开
        color: [withAlpha(palette.accent, 0.06), palette.accent]
      }
    },
    xAxis: {
      type: 'category',
      data: data.xLabels,
      axisLine: { show: false },
      axisTick: { show: false },
      // interval: 0 强制把每一档都标出来；默认的 'auto' 会隔一个藏一个，矩阵就对不上号了
      axisLabel: { ...axisLabelStyle(palette, 20), interval: 0 },
      splitArea: { show: false }
    },
    yAxis: {
      type: 'category',
      data: data.yLabels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { ...axisLabelStyle(palette, 20), interval: 0 },
      splitArea: { show: false }
    },
    series: [
      {
        type: 'heatmap',
        data: data.cells.map(([x, y, value]) => [x, y, value]),
        label: {
          show: true,
          fontSize: 20,
          fontFamily: CHART_FONT_FAMILY,
          // 深底子上的数字翻白，否则读不出来
          color: (params: { value: number[] }) => (params.value[2] / max > 0.55 ? palette.textOnColor : palette.text),
          formatter: (params: { value: number[] }) => (params.value[2] > 0 ? String(params.value[2]) : '')
        },
        itemStyle: { borderColor: 'transparent', borderWidth: 4, borderRadius: 8 }
      }
    ]
  }
}

/**
 * 分档箱线图。
 *
 * 替代原来的散点图：散点只能看出「人多的大群解析次数也多」这种粗糙印象，
 * 箱线能同时给出每个档位的中位数和离散程度 —— 「人多是不是就一定刷得多」
 * 「哪个档位的群差异最大」这两件事，只有箱线读得出来。
 * @param boxes 各档位的五数概括
 * @param dark 是否深色主题
 * @param yName 纵轴名
 */
export const buildBoxplotOption = (boxes: ActivityBox[], dark: boolean, yName: string) => {
  const palette = getChartPalette(dark)

  return {
    grid: { top: 40, right: 24, bottom: 64, left: 88 },
    xAxis: {
      type: 'category',
      // 群数用紧凑格式（12800 → 1.2w）并去掉「个」，否则五位数时五个标签会挤成一团：
      // 「3100 个群」×5 在 520px 的绘图区里放不下，实测会互相压字。
      data: boxes.map((item) => `${item.label}\n${formatCompact(item.count)}群`),
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      // interval: 0 强制把每一档都标出来；默认的 'auto' 会隔一个藏一个，读者根本对不上箱体
      axisLabel: { ...axisLabelStyle(palette, 20), lineHeight: 26, interval: 0 }
    },
    yAxis: {
      type: 'value',
      name: yName,
      nameTextStyle: { fontSize: 20, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelStyle(palette, 20),
      splitLine: splitLineStyle(palette)
    },
    series: [
      {
        type: 'boxplot',
        boxWidth: [18, 52],
        itemStyle: {
          color: withAlpha(palette.accent, 0.3),
          borderColor: palette.accent,
          borderWidth: 3
        },
        data: boxes.map((item) => item.box)
      },
      {
        // 用一个不可见的散点系列把中位数标出来。
        // boxplot 自己不渲染 label —— series 级和逐项两种写法在 SSR 出的 SVG 里都没有文本节点（实测），
        // 只能借散点把标注「挂」到中位数坐标上。
        type: 'scatter',
        symbolSize: 1,
        silent: true,
        itemStyle: { color: 'transparent' },
        data: boxes.map((item, index) => [index, item.box[2]]),
        label: {
          show: true,
          position: 'top',
          distance: 8,
          fontSize: 20,
          fontWeight: 'bold',
          color: palette.text,
          fontFamily: CHART_FONT_FAMILY,
          formatter: (params: { value: number[] }) => String(params.value[1])
        }
      }
    ]
  }
}
/** 耗时分档的累计占比图的数据 */
export interface MetricDistributionLike {
  /** 各档（按耗时从小到大排好序）。`upper` 是累计口径标签，曲线横轴用它 */
  buckets: Array<{ label: string; upper: string; count: number }>
}

/**
 * 解析耗时的累计曲线：横轴是「耗时上限」，纵轴是「有多少比例的解析在这个时间内跑完」。
 *
 * 之前这里是张双轴帕累托图（左轴次数 + 右轴累计占比），实测读不懂，原因有三个：
 * 1. 两条线刻度量级完全不同却会交叉，读者本能地想去比较两条线，但这个比较没有意义；
 * 2. 两个轴名都是灰色，图上没有任何线索说明哪条线归哪个轴；
 * 3. 累计值要读懂，得先知道「它对应的是 x 档的上界」，而这层信息图上根本没写。
 *
 * 换成单轴累计曲线之后读法变成字面意思：横轴看「≤5s」、纵轴读「74%」，
 * 就是「74% 的解析在 5 秒内跑完」。曲线越陡，说明解析量越集中在这一段耗时里，
 * 所以分布形状并没有丢，只是换了个更直接的表达。
 * @param data 分档数据（桶必须按耗时从小到大排好）
 * @param dark 是否深色主题
 */
export const buildDurationCurveOption = (data: MetricDistributionLike, dark: boolean) => {
  const palette = getChartPalette(dark)
  const total = data.buckets.reduce((sum, bucket) => sum + bucket.count, 0)

  let running = 0
  const cumulative = data.buckets.map((bucket) => {
    running += bucket.count
    return total > 0 ? Number(((running / total) * 100).toFixed(1)) : 0
  })

  // 横轴用桶自带的累计口径标签（「≤5s」）。档位会在 core 侧按数据裁掉两端，
  // 所以桶数不固定，绝不能按 index 去映射。
  const labels = data.buckets.map((bucket) => bucket.upper)

  return {
    grid: { top: 56, right: 32, bottom: 56, left: 80 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels,
      axisLine: axisLineStyle(palette),
      axisTick: { show: false },
      axisLabel: { ...axisLabelStyle(palette, 20), interval: 0 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      name: '累计占比',
      nameTextStyle: { fontSize: 20, color: palette.textMuted, fontFamily: CHART_FONT_FAMILY, align: 'right' },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { ...axisLabelStyle(palette, 20), formatter: '{value}%' },
      splitLine: splitLineStyle(palette)
    },
    series: [
      {
        type: 'line',
        // 分桶数据画折线而不是平滑曲线：平滑会暗示「档与档之间存在精确的中间值」，那是编出来的
        smooth: false,
        symbol: 'circle',
        symbolSize: 10,
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
              { offset: 0, color: withAlpha(palette.accent, 0.32) },
              { offset: 1, color: withAlpha(palette.accent, 0.02) }
            ]
          }
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 20,
          color: palette.text,
          fontFamily: CHART_FONT_FAMILY,
          // 每点都标：这张图要的就是「在某个耗时之前完成了多少」，不标数字等于没读
          formatter: (params: { value: number }) => `${params.value}%`
        },
        data: cumulative
      },
      // 50% / 90% 两条参考线：一眼看出「一半 / 九成的解析落在哪一档之前」
      ...[50, 90].map((threshold) => ({
        type: 'line' as const,
        silent: true,
        symbol: 'none',
        lineStyle: { width: 2, type: 'dashed' as const, color: palette.accentAlt },
        data: labels.map(() => threshold)
      }))
    ]
  }
}
