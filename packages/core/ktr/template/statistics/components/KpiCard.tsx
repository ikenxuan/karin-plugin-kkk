import React from 'react'

import { cn } from '../../../utils/cn'

/** 指标卡属性 */
export interface KpiCardProps {
  /** 中文标题 */
  title: string
  /** 英文副标题 */
  titleEn: string
  /** 主数值，已格式化好的字符串 */
  value: string
  /** 单位 */
  unit?: string
  /** 补充说明（如「按有记录的 23 天折算」），没有则不占位 */
  hint?: string
  /** 追加到卡片的类名 */
  className?: string
}

/**
 * 指标卡：紧凑竖排。
 *
 * 旧版是「标题条 + 7rem 大数字」的厚卡，6 张要占两行共约 700px。
 * 这里压成一行放 6 张，数值字号降到 5xl，读数依然清楚，但整块只占约 190px。
 */
export const KpiCard: React.FC<KpiCardProps> = ({ title, titleEn, value, unit, hint, className }) => (
  <div className={cn('relative flex flex-col rounded-2xl bg-surface/40 backdrop-blur-md border-2 border-border/40 px-5 py-4', className)}>
    <div className="text-2xl font-bold leading-tight text-foreground/90">{title}</div>
    <div className="text-base font-medium tracking-widest uppercase text-muted/60 leading-tight mt-1">{titleEn}</div>
    <div className="flex items-baseline gap-1 mt-3">
      <span className="text-5xl font-bold leading-none text-foreground/90">{value}</span>
      {unit ? <span className="text-2xl font-medium text-foreground/70">{unit}</span> : null}
    </div>
    {hint ? <div className="mt-2 text-lg leading-tight text-muted/70">{hint}</div> : null}
  </div>
)

export default KpiCard
