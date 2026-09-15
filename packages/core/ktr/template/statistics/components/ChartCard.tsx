import React from 'react'

import { cn } from '../../../utils/cn'

/** 图表卡片属性 */
export interface ChartCardProps {
  /** 中文标题 */
  title: string
  /** 英文副标题，跟在中文标题后面同一行 */
  subtitle: string
  /** 左侧圆角色条的 Tailwind 背景类 */
  accentClassName?: string
  /** 卡片底部的一行说明，没有则不占位 */
  caption?: React.ReactNode
  /** 追加到卡片根元素的类名 */
  className?: string
  /** 卡片内容（通常是 SSRChart） */
  children: React.ReactNode
}

/**
 * 图表卡片：紧凑标题行 + 内容 + 可选说明。
 *
 * 取代了旧版那个「色条 + 5rem 大标题 + 英文副标题 + 160px 下边距」的分区头 ——
 * 那张头每张图要吃掉约 360px，五张图光标题栏就占掉 1800px，
 * 是海报被撑到 6900px 的主因。这里把标题压进卡片内部，一张图总共只需约 80px。
 */
export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, accentClassName = 'bg-violet-500', caption, className, children }) => (
  <div className={cn('relative flex flex-col rounded-2xl bg-surface/40 backdrop-blur-md border-2 border-border/40 p-6', className)}>
    <div className="flex items-center gap-4 mb-4">
      <div className={cn('w-3 h-10 rounded-full shrink-0', accentClassName)} />
      <h3 className="text-4xl font-black tracking-tight leading-none text-foreground/90">{title}</h3>
      <span className="text-xl font-medium tracking-[0.15em] uppercase text-muted/60 leading-none">{subtitle}</span>
    </div>
    {children}
    {caption ? <div className="mt-3 text-center text-xl text-muted/80">{caption}</div> : null}
  </div>
)

export default ChartCard
