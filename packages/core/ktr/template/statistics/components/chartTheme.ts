import { BarChart, BoxplotChart, HeatmapChart, LineChart, PieChart, ScatterChart, TreemapChart } from 'echarts/charts'
import { GraphicComponent, GridComponent, PolarComponent, VisualMapComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import type { EChartsCoreOption } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

import type { StatisticsMetric, StatisticsPlatform, StatisticsWorkType } from './types'

/**
 * 统计海报的图表基座。
 *
 * 三条硬约束（都是实测出来的）：
 * 1. **必须 `dispose()`** —— ECharts 内部有一张全局实例表，不 dispose 每渲染一次就漏一份，
 *    实测 300 次后 heap 从 25MB 涨到 62MB。
 * 2. **不能嵌进外层 `<svg>`** —— `renderToSVGString()` 返回的是完整独立 `<svg>`，
 *    只能整段注入 DOM，不能像 Victory 那样 `standalone={false}` 塞进父 svg。
 * 3. **颜色只能用 hex** —— zrender 的颜色解析器不认 `oklch()` / `color-mix()`
 *    （`parse()` 返回 undefined，任何参与颜色运算的路径都会静默变黑）。
 *    HeroUI 主题 token 是 oklch，所以这里的色板都是换算好的 hex 常量。
 */

// 按需注册：只挂统计海报真正用到的图表与组件，避免把整个 echarts 打进产物。
// 漏注册的后果分两种：渲染器漏了直接抛错，图表/组件漏了则是静默画不出东西，
// 所以这张清单必须和两个模板实际用到的 series/component 严格对齐（test/statistics-render.test.ts 会兜底）。
echarts.use([
  PieChart,
  LineChart,
  BarChart,
  HeatmapChart,
  BoxplotChart,
  ScatterChart,
  TreemapChart,
  GridComponent,
  PolarComponent,
  GraphicComponent,
  VisualMapComponent,
  SVGRenderer
])

/** 图表配色（浅色 / 深色两套，均为 hex） */
export interface ChartPalette {
  /** 轴刻度、数据标签等图表内文字 */
  text: string
  /** 轴名、单位等次级文字 */
  textMuted: string
  /** 坐标轴主线 */
  axisLine: string
  /** 网格分隔线（比轴线更淡） */
  splitLine: string
  /** 主系列色：趋势线、主柱 */
  accent: string
  /** 次要系列色：基准线、对比系列 */
  accentAlt: string
  /** 彩色块上的文字色：浅色主题用白字、深色主题用深字，配中间饱和度的色块都够对比度 */
  textOnColor: string
}

const LIGHT_PALETTE: ChartPalette = {
  text: '#18181b',
  textMuted: '#71717a',
  axisLine: '#d4d4d8',
  splitLine: '#e4e4e7',
  accent: '#8b5cf6',
  accentAlt: '#a1a1aa',
  textOnColor: '#ffffff'
}

const DARK_PALETTE: ChartPalette = {
  text: '#fcfcfc',
  textMuted: '#9f9fa9',
  axisLine: '#3f3f46',
  splitLine: '#28282c',
  accent: '#a78bfa',
  accentAlt: '#71717a',
  textOnColor: '#18181b'
}

/** 按明暗取图表配色 */
export const getChartPalette = (dark: boolean): ChartPalette => (dark ? DARK_PALETTE : LIGHT_PALETTE)

/** 平台展示信息 */
export interface PlatformMeta {
  /** 中文名 */
  name: string
  /** 英文名（海报上做副标题用） */
  nameEn: string
  /** logo 路径，按明暗取（抖音 logo 本身就是黑白双版） */
  logo: { light: string; dark: string }
  /** 品牌色，按明暗取（抖音黑 logo 在深色底上必须翻白，否则看不见） */
  color: { light: string; dark: string }
}

/** 平台展示信息表 */
export const PLATFORM_META: Record<StatisticsPlatform, PlatformMeta> = {
  douyin: {
    name: '抖音',
    nameEn: 'Douyin',
    logo: { light: '/image/douyin/dylogo-dark.svg', dark: '/image/douyin/dylogo-light.svg' },
    color: { light: '#111111', dark: '#ffffff' }
  },
  bilibili: {
    name: '哔哩哔哩',
    nameEn: 'Bilibili',
    logo: { light: '/image/bilibili/bilibili-light.png', dark: '/image/bilibili/bilibili-light.png' },
    color: { light: '#fb7299', dark: '#fb7299' }
  },
  kuaishou: {
    name: '快手',
    nameEn: 'Kuaishou',
    logo: { light: '/image/kuaishou/logo.png', dark: '/image/kuaishou/logo.png' },
    color: { light: '#ff4906', dark: '#ff4906' }
  },
  xiaohongshu: {
    name: '小红书',
    nameEn: 'XiaoHongShu',
    logo: { light: '/image/xiaohongshu/logo.png', dark: '/image/xiaohongshu/logo.png' },
    color: { light: '#ff2442', dark: '#ff2442' }
  }
}

/** 平台展示顺序，多张图统一用它，避免各图排序不一致 */
export const PLATFORM_ORDER: StatisticsPlatform[] = ['douyin', 'bilibili', 'kuaishou', 'xiaohongshu']

/** 取平台品牌色 */
export const platformColor = (platform: StatisticsPlatform, dark: boolean): string =>
  PLATFORM_META[platform].color[dark ? 'dark' : 'light']

/** 取平台 logo 路径 */
export const platformLogo = (platform: StatisticsPlatform, dark: boolean): string =>
  PLATFORM_META[platform].logo[dark ? 'dark' : 'light']

/**
 * 内容形态展示信息。
 *
 * 配色刻意避开四大平台的品牌色区间（粉/橙/红），
 * 免得「平台」和「形态」两张图摆在一起时读者串色。
 */
export const WORK_TYPE_META: Record<StatisticsWorkType, { label: string; color: string }> = {
  video: { label: '视频', color: '#8b5cf6' },
  gallery: { label: '图集', color: '#06b6d4' },
  collection: { label: '合辑', color: '#0ea5e9' },
  article: { label: '文章', color: '#f59e0b' },
  live: { label: '直播', color: '#ef4444' },
  bangumi: { label: '番剧', color: '#22c55e' },
  dynamic: { label: '动态', color: '#14b8a6' },
  music: { label: '音乐', color: '#a855f7' },
  unknown: { label: '其他', color: '#a1a1aa' }
}

/**
 * 量化指标图的展示信息。
 *
 * 目前只有解析耗时一项：作品时长、作品点赞属于**内容**属性而非解析服务本身的表现，
 * 混进这张海报会跑题；而且它们的单位在各平台不统一（抖音毫秒、B站秒、快手/小红书未知），
 * 口径也站不住，所以整体砍掉。
 */
export const METRIC_META: Record<StatisticsMetric, { title: string; subtitle: string; accent: string }> = {
  duration: { title: '解析耗时分布', subtitle: 'PARSE TIME', accent: 'bg-sky-500' }
}

/**
 * 把 ECharts option 渲染成一段独立 SVG 字符串。
 *
 * 纯同步函数，可以在 React 的 render 体里直接调 —— 这是本方案能绕开 hooks 的关键。
 * @param option ECharts 配置，颜色需由调用方按主题算好（见 `getChartPalette`）
 * @param width 画布宽（px）
 * @param height 画布高（px）
 * @returns 完整的 `<svg>...</svg>` 字符串
 */
export const renderChartToSVG = (option: EChartsCoreOption, width: number, height: number): string => {
  const chart = echarts.init(null, null, { renderer: 'svg', ssr: true, width, height })
  try {
    chart.setOption({
      // SSR 下本来就不跑动画，显式关掉是防止将来有人在浏览器侧复用时动起来
      animation: false,
      // 海报底色由外层卡片提供，图表本身保持透明
      backgroundColor: 'transparent',
      ...option
    })
    return chart.renderToSVGString()
  } finally {
    // 不 dispose 会持续泄漏，见文件头注释
    chart.dispose()
  }
}

/** 图表内文字统一走海报字体，否则 SVG 会退回浏览器默认字体 */
export const CHART_FONT_FAMILY = 'HarmonyOSHans-Regular'

/**
 * hex 转 `rgba()`。
 *
 * 刻意不产出 8 位 hex（`#RRGGBBAA`）：zrender 的颜色解析器只认 `#RGB` / `#RRGGBB`，
 * 8 位会被判为非法值，凡是需要拿它做运算的地方都会静默出问题。
 * @param hex 形如 `#8b5cf6` 或 `#abc`
 * @param alpha 0~1
 */
export const withAlpha = (hex: string, alpha: number): string => {
  const raw = hex.replace('#', '')
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 坐标轴文字样式
 * @param palette 配色
 * @param fontSize 字号；海报宽 1440，轴标签不要小于 20
 * @param rotate 类目轴标签倾斜角度
 */
export const axisLabelStyle = (palette: ChartPalette, fontSize = 24, rotate = 0) => ({
  fontSize,
  rotate,
  color: palette.textMuted,
  fontFamily: CHART_FONT_FAMILY
})

/** 坐标轴主线样式 */
export const axisLineStyle = (palette: ChartPalette) => ({
  lineStyle: { width: 2, color: palette.axisLine }
})

/** 网格分隔线样式 */
export const splitLineStyle = (palette: ChartPalette) => ({
  lineStyle: { width: 1, color: palette.splitLine }
})
