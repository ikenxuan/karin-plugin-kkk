import React from 'react'

import { cn } from '../../../utils/cn'

/** 平台明细表的一行 */
export interface PlatformTableRow {
  /** 平台标识，用作 React key */
  key: string
  /** 平台 logo */
  logo: string
  /** 平台名 */
  name: string
  /** 条形填充色 */
  color: string
  /** 条长百分比（相对最大值，0~100） */
  barPercent: number
  /** 数值列，顺序与 `columns` 对应，已格式化为展示文案 */
  cells: string[]
}

/** 平台明细表属性 */
export interface PlatformTableProps {
  /** 数值列的表头文案 */
  columns: string[]
  /** 数据行 */
  rows: PlatformTableRow[]
  /** 追加到根元素的类名 */
  className?: string
}

/** 数值列宽：够放下 `1,362` 和 `47.6%` */
const CELL_WIDTH = 'w-28'

/**
 * 平台明细表。
 *
 * 环图旁边原来只是一列「logo + 名字 + 次数」，本质是图例；
 * 这里升级成带表头的表格，能多塞两列数值（人数、人均之类），
 * 同样的高度装的信息量翻倍 —— 这也是海报里唯一适合「读精确数字」的地方。
 * 中间的占比条保留，让读者不读数字也能看出量级差距。
 */
export const PlatformTable: React.FC<PlatformTableProps> = ({ columns, rows, className }) => (
  <div className={cn('flex flex-col gap-3', className)}>
    {/* 表头 */}
    <div className="flex items-center gap-4 pb-2 border-b-2 border-border/40">
      <span className="w-12 shrink-0" />
      <span className="w-36 shrink-0 text-xl tracking-widest uppercase text-muted/60">平台</span>
      {/* 条形列不写表头：占比已经在后面的数值列里给了，重复标一次反而让人以为有两套口径 */}
      <span className="flex-1" />
      {columns.map((column) => (
        <span key={column} className={cn(CELL_WIDTH, 'shrink-0 text-right text-xl tracking-widest uppercase text-muted/60')}>
          {column}
        </span>
      ))}
    </div>

    {/* 数据行 */}
    {rows.map((row) => (
      <div key={row.key} className="flex items-center gap-4">
        <img src={row.logo} alt={row.name} className="w-12 h-12 object-contain shrink-0" />
        <span className="w-36 shrink-0 text-2xl font-bold text-foreground/90">{row.name}</span>
        <div className="flex-1 h-6 rounded-full bg-surface-secondary overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${row.barPercent}%`, backgroundColor: row.color }} />
        </div>
        {row.cells.map((cell, index) => (
          <span
            key={columns[index]}
            className={cn(
              CELL_WIDTH,
              'shrink-0 text-right text-2xl tabular-nums',
              // 第一列是主数值，加粗；其余列弱一档，读起来有主次
              index === 0 ? 'font-bold text-foreground/90' : 'text-foreground/70'
            )}
          >
            {cell}
          </span>
        ))}
      </div>
    ))}
  </div>
)

export default PlatformTable
