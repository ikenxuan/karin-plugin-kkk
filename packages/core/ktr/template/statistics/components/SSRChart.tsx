import type { EChartsCoreOption } from 'echarts/core'
import React from 'react'

import { cn } from '../../../utils/cn'
import { renderChartToSVG } from './chartTheme'

/** SSRChart 属性 */
export interface SSRChartProps {
  /** ECharts 配置；颜色需由调用方按主题算好（见 `getChartPalette`） */
  option: EChartsCoreOption
  /** 画布宽（px），必须显式给：SSR 下没有 DOM 可量 */
  width: number
  /** 画布高（px） */
  height: number
  /** 外层容器类名 */
  className?: string
}

/**
 * 图表渲染组件 —— 在 render 期同步产出 SVG 并整段注入。
 *
 * 为什么是 `dangerouslySetInnerHTML` 而不是返回 React 元素：
 * `renderToSVGString()` 给的是完整独立 `<svg>` 字符串，React 没法把它当子树挂上去。
 * 这里注入的内容全部由 ECharts 在本进程内生成（不含用户输入），不存在 XSS 面。
 *
 * 组件刻意不持有任何状态、不碰 DOM、不用 hooks —— 只走一次 SSR。
 * 同一份代码在开发面板（浏览器 createRoot）下也成立：`ssr: true` 时 ECharts 会跳过所有 DOM 校验。
 */
export const SSRChart: React.FC<SSRChartProps> = ({ option, width, height, className }) => {
  const svg = renderChartToSVG(option, width, height)

  return (
    <div
      className={cn('flex justify-center', className)}
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default SSRChart
