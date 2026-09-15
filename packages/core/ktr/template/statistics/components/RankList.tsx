import React from 'react'

import { PLATFORM_META, platformColor, PLATFORM_ORDER } from './chartTheme'
import type { StatisticsPlatform } from './types'

/** 榜单里的一段：某个平台贡献了多少 */
export interface RankSegment {
  /** 平台 */
  platform: StatisticsPlatform
  /** 该平台贡献的次数 */
  count: number
}

/** 榜单的一行 */
export interface RankRow {
  /** 名字（群名 / 昵称） */
  name: string
  /** 头像的 data URI。后端保证一定有值：拉不到真实头像时会现场生成一个 dither 头像 */
  avatar: string
  /** 各平台构成，决定进度条的颜色分段 */
  segments: RankSegment[]
  /** 条尾说明，已经格式化好 */
  label: string
}

/** 榜单列表属性 */
export interface RankListProps {
  /** 已按总量降序排好的条目 */
  rows: RankRow[]
  /** 是否深色主题 */
  dark: boolean
}

/** 每段里「保持本色」的比例，剩下的部分渐到下一段的颜色 */
const SEGMENT_SOLID_RATIO = 0.55

/**
 * 把一行的平台构成编成一条 CSS 水平渐变。
 *
 * 思路是「整条只画一个渐变、平台边界只体现在色标的位置上」：
 * 按堆叠顺序（`PLATFORM_ORDER`，不是按次数大小）算出每段的起止比例，
 * 段内先保持本色、再渐到下一段的颜色，于是相邻两段首尾同色，接缝处完全连续。
 *
 * 早先是每个平台一个 ECharts 堆叠系列，也就是各自独立的 SVG path，
 * 抗锯齿会在接缝处留一条细边，放大看很明显；合成一条渐变之后这个问题从根上消失。
 */
const toCssGradient = (segments: RankSegment[], dark: boolean): string => {
  const ordered = PLATFORM_ORDER.map((platform) => ({
    platform,
    count: segments.find((segment) => segment.platform === platform)?.count ?? 0
  })).filter((segment) => segment.count > 0)
  const total = ordered.reduce((sum, segment) => sum + segment.count, 0)
  if (ordered.length === 0 || total === 0) return 'transparent'

  const stops: string[] = []
  let cursor = 0
  ordered.forEach((segment, index) => {
    const share = segment.count / total
    const own = platformColor(segment.platform, dark)
    const next = ordered[index + 1] ? platformColor(ordered[index + 1].platform, dark) : own
    stops.push(`${own} ${(cursor * 100).toFixed(2)}%`)
    stops.push(`${own} ${((cursor + share * SEGMENT_SOLID_RATIO) * 100).toFixed(2)}%`)
    stops.push(`${next} ${((cursor + share) * 100).toFixed(2)}%`)
    cursor += share
  })
  return `linear-gradient(90deg, ${stops.join(', ')})`
}

/**
 * 排行榜列表。
 *
 * 用 HTML 而不是 ECharts：这个版式（头像占左侧一列、名字在进度条上方、每条占两行）
 * 在 ECharts 里表达不了 —— 类目轴标签只能整体贴在轴的左边，没法让名字横跨到条子上方。
 * 换成 HTML 之后头像的圆形、渐变条的接缝也都变成 CSS 的事，不用再跟富文本的限制较劲
 * （ECharts 富文本的图片背景既不支持圆角、段内对齐也覆盖不掉）。
 */
export const RankList: React.FC<RankListProps> = ({ rows, dark }) => {
  const max = Math.max(...rows.map((row) => row.segments.reduce((sum, segment) => sum + segment.count, 0)), 1)

  return (
    <div className="flex flex-col gap-8 px-6 py-10">
      {rows.map((row) => {
        const total = row.segments.reduce((sum, segment) => sum + segment.count, 0)
        return (
          <div key={row.name} className="flex items-center gap-5">
            {/* 头像跨两行，一次把「谁」交代清楚 */}
            <img src={row.avatar} alt="" className="w-14 h-14 rounded-full shrink-0 object-cover" />

            <div className="flex-1 min-w-0">
              {/* 第一行：名字 + 次数 */}
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <span className="text-3xl leading-none text-foreground/90 truncate">{row.name}</span>
                <span className="text-2xl leading-none font-black text-foreground/80 shrink-0">{row.label}</span>
              </div>

              {/* 第二行：进度条。条高刻意压扁，让视觉重心落在名字和数字上 */}
              <div className="h-4 rounded-full bg-surface-secondary overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(total / max) * 100}%`, background: toCssGradient(row.segments, dark) }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** 榜单需要的平台图例（只列真正出现过的平台） */
export const collectRankPlatforms = (rows: RankRow[]): StatisticsPlatform[] =>
  PLATFORM_ORDER.filter((platform) => rows.some((row) => row.segments.some((segment) => segment.platform === platform && segment.count > 0)))

/** 榜单的平台图例，和堆叠条配套使用 */
export const RankLegend: React.FC<{ platforms: StatisticsPlatform[]; dark: boolean }> = ({ platforms, dark }) => (
  <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
    {platforms.map((platform) => (
      <div key={platform} className="flex items-center gap-3">
        <span className="w-6 h-6 rounded shrink-0" style={{ backgroundColor: platformColor(platform, dark) }} />
        <span className="text-xl text-foreground/80">{PLATFORM_META[platform].name}</span>
      </div>
    ))}
  </div>
)

export default RankList
