import React from 'react'

import { withAlpha } from './chartTheme'

/** 箱线图阅读指南属性 */
export interface BoxplotGuideProps {
  /** 箱体主色（描边、须、端帽） */
  accent: string
}

/**
 * 箱线图怎么读 —— 一张示意图 + 一句注解。
 *
 * 加它的原因很直接：箱线图对没接触过的读者就是「一个带横线的方块」，
 * 而 ECharts 的 boxplot 又不支持在图上打标签（series 级和逐项两种写法 SSR 下都不出文本，
 * 实测过），没法把五个要素直接标在真实图形上。
 * 所以退而求其次：在卡片里画一个放大的示意图把五个位置点名，
 * 真实图上的中位数再用一个散点系列单独标数值。
 */
export const BoxplotGuide: React.FC<BoxplotGuideProps> = ({ accent }) => (
  <div className="mt-3 rounded-xl bg-surface-secondary/60 px-6 py-4">
    <svg viewBox="0 0 560 96" className="w-full h-24" role="img" aria-label="箱线图读法示意">
      {/* 下须（最小 → 下四分位） */}
      <line x1="30" y1="48" x2="120" y2="48" stroke={accent} strokeWidth="3" />
      <line x1="30" y1="34" x2="30" y2="62" stroke={accent} strokeWidth="3" />
      {/* 箱体（下四分位 → 上四分位） */}
      <rect x="120" y="20" width="280" height="56" rx="8" fill={withAlpha(accent, 0.3)} stroke={accent} strokeWidth="3" />
      {/* 中位线 */}
      <line x1="320" y1="20" x2="320" y2="76" stroke={accent} strokeWidth="4" />
      {/* 上须（上四分位 → 最大） */}
      <line x1="400" y1="48" x2="510" y2="48" stroke={accent} strokeWidth="3" />
      <line x1="510" y1="34" x2="510" y2="62" stroke={accent} strokeWidth="3" />

      {/* 五个位置的标注 */}
      <text x="42" y="92" textAnchor="middle" fontSize="18" fill="currentColor" opacity="0.7">
        最小
      </text>
      <text x="150" y="92" textAnchor="middle" fontSize="18" fill="currentColor" opacity="0.7">
        下四分位
      </text>
      <text x="320" y="92" textAnchor="middle" fontSize="18" fill="currentColor" opacity="0.7">
        中位数
      </text>
      <text x="410" y="92" textAnchor="middle" fontSize="18" fill="currentColor" opacity="0.7">
        上四分位
      </text>
      <text x="518" y="92" textAnchor="middle" fontSize="18" fill="currentColor" opacity="0.7">
        最大
      </text>
    </svg>
    <div className="mt-2 text-center text-xl text-muted/80">
      每个箱体代表<b className="text-foreground/80">该档位里所有群</b>的分布 · 箱体越扁说明这档群的水平越整齐
    </div>
  </div>
)

export default BoxplotGuide
