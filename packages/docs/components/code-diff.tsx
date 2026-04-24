'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Spinner } from '@heroui/react'
import { cn } from '@/lib/cn'
import { getHighlighter, getThemeName } from '@/lib/shiki'
import type { FileDiffResult, WordDiff } from '@/lib/diff-client'
import type { HighlighterCore, ThemedToken } from 'shiki/core'

interface CodeDiffViewerProps {
  data: FileDiffResult
  isMobile?: boolean
  wrap?: boolean
}

const ROW_HEIGHT = 24
const OVERSCAN = 15

/* ===================== WordDiffSpan ===================== */

const WordDiffSpan = ({ diff, side, children }: { diff: WordDiff; side: 'left' | 'right'; children?: React.ReactNode }) => {
  if (diff.type === 'equal') return <>{children ?? diff.value}</>

  if (diff.type === 'remove' && side === 'left') {
    return (
      <span className="rounded px-0.5 bg-diff-word-remove text-danger-foreground">
        {children ?? diff.value}
      </span>
    )
  }

  if (diff.type === 'add' && side === 'right') {
    return (
      <span className="rounded px-0.5 bg-diff-word-add text-success-foreground">
        {children ?? diff.value}
      </span>
    )
  }

  return <>{children ?? diff.value}</>
}

/* ===================== CodeDiffViewer ===================== */

export const CodeDiffViewer = ({ data, isMobile = false, wrap = true }: CodeDiffViewerProps) => {
  const { path, status, rows, additions, deletions } = data
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const leftPaneRef = useRef<HTMLDivElement>(null)
  const rightPaneRef = useRef<HTMLDivElement>(null)
  const [leftScrollWidth, setLeftScrollWidth] = useState(0)
  const [rightScrollWidth, setRightScrollWidth] = useState(0)
  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null)
  const [isDark, setIsDark] = useState(false)

  // 初始化 Shiki 高亮器并监听主题变化
  useEffect(() => {
    getHighlighter().then(setHighlighter)

    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()

    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // 切换文件时重置滚动位置
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = 0
    setScrollTop(0)
  }, [path])

  // 监听容器尺寸和滚动位置
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height)
      setContainerWidth(entry.contentRect.width)
    })
    ro.observe(el)

    const handleScroll = () => setScrollTop(el.scrollTop)
    el.addEventListener('scroll', handleScroll)

    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 同步左右两块的横向滚动
  useEffect(() => {
    if (wrap) return
    const left = leftPaneRef.current
    const right = rightPaneRef.current
    if (!left || !right) return

    let syncing = false
    const sync = (source: HTMLDivElement, target: HTMLDivElement) => {
      if (syncing) return
      syncing = true
      target.scrollLeft = source.scrollLeft
      syncing = false
    }

    const onLeft = () => sync(left, right)
    const onRight = () => sync(right, left)

    left.addEventListener('scroll', onLeft)
    right.addEventListener('scroll', onRight)

    return () => {
      left.removeEventListener('scroll', onLeft)
      right.removeEventListener('scroll', onRight)
    }
  }, [wrap])

  // 监听左右两侧 scrollWidth，让两侧可滚动区域保持一致
  useEffect(() => {
    if (wrap) return
    const left = leftPaneRef.current
    const right = rightPaneRef.current
    if (!left || !right) return

    const update = () => {
      setLeftScrollWidth(left.scrollWidth)
      setRightScrollWidth(right.scrollWidth)
    }

    const ro = new ResizeObserver(update)
    ro.observe(left)
    ro.observe(right)
    update()

    return () => ro.disconnect()
  }, [wrap])

  // 限制选择只能在一侧
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isLeft = x < rect.width / 2

    const opposite = isLeft ? 'right' : 'left'
    container.querySelectorAll(`[data-diff-side="${opposite}"]`).forEach((el) => {
      (el as HTMLElement).style.userSelect = 'none'
    })
  }, [])

  useEffect(() => {
    const handleMouseUp = () => {
      const container = scrollRef.current
      if (!container) return
      container.querySelectorAll('[data-diff-side]').forEach((el) => {
        (el as HTMLElement).style.userSelect = ''
      })
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  // Shiki 语法高亮：按行缓存 token
  const highlighted = useMemo(() => {
    if (!highlighter) return null

    const leftLines: string[] = []
    const rightLines: string[] = []
    const leftMap: number[] = []
    const rightMap: number[] = []

    rows.forEach((row, idx) => {
      if (row.type === 'skip') return
      if (row.left) {
        leftMap[leftLines.length] = idx
        leftLines.push(row.left.content)
      }
      if (row.right) {
        rightMap[rightLines.length] = idx
        rightLines.push(row.right.content)
      }
    })

    const theme = getThemeName(isDark)

    const leftResult = leftLines.length > 0
      ? highlighter.codeToTokens(leftLines.join('\n'), { lang: 'javascript', theme })
      : { tokens: [] as ThemedToken[][] }
    const rightResult = rightLines.length > 0
      ? highlighter.codeToTokens(rightLines.join('\n'), { lang: 'javascript', theme })
      : { tokens: [] as ThemedToken[][] }

    const leftByRow = new Map<number, ThemedToken[]>()
    const rightByRow = new Map<number, ThemedToken[]>()

    leftResult.tokens.forEach((lineTokens, lineIdx) => {
      const rowIdx = leftMap[lineIdx]
      if (rowIdx !== undefined) leftByRow.set(rowIdx, lineTokens)
    })
    rightResult.tokens.forEach((lineTokens, lineIdx) => {
      const rowIdx = rightMap[lineIdx]
      if (rowIdx !== undefined) rightByRow.set(rowIdx, lineTokens)
    })

    return { leftByRow, rightByRow }
  }, [highlighter, rows, isDark])

  // 动态计算每行高度（支持自动换行）
  const { totalHeight, rowOffsets } = useMemo(() => {
    const offsets = new Array(rows.length + 1)
    offsets[0] = 0
    const cpl = containerWidth > 0 ? Math.max(10, Math.floor((containerWidth / 2 - 66) / 7.5)) : 200
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (row.type === 'skip') {
        offsets[i + 1] = offsets[i] + ROW_HEIGHT
        continue
      }
      if (!wrap) {
        offsets[i + 1] = offsets[i] + ROW_HEIGHT
        continue
      }
      const leftLen = row.left?.content.length ?? 0
      const rightLen = row.right?.content.length ?? 0
      const maxLen = Math.max(leftLen, rightLen)
      const lines = maxLen <= cpl ? 1 : Math.ceil(maxLen / cpl)
      offsets[i + 1] = offsets[i] + Math.max(ROW_HEIGHT, lines * ROW_HEIGHT)
    }
    return { totalHeight: offsets[rows.length], rowOffsets: offsets }
  }, [rows, containerWidth, wrap])

  const findIndexByOffset = useCallback((target: number, offsets: number[]): number => {
    let lo = 0, hi = offsets.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (offsets[mid] <= target) lo = mid + 1
      else hi = mid
    }
    return Math.max(0, lo - 1)
  }, [])

  const rawStart = findIndexByOffset(scrollTop, rowOffsets)
  const startIndex = Math.max(0, rawStart - OVERSCAN)
  const rawEnd = findIndexByOffset(scrollTop + containerHeight, rowOffsets)
  const endIndex = Math.min(rows.length - 1, rawEnd + OVERSCAN)

  const visibleRows = useMemo(() => rows.slice(startIndex, endIndex + 1), [rows, startIndex, endIndex])
  const topPadding = rowOffsets[startIndex]
  const bottomPadding = Math.max(0, totalHeight - rowOffsets[endIndex + 1])

  const cellBaseClass = cn(
    'py-0.75 px-2 text-xs font-mono leading-normal min-h-6',
    wrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'
  )

  const cellBaseStyle: React.CSSProperties = {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    verticalAlign: 'top',
    wordBreak: wrap ? 'break-all' : 'normal',
    overflowWrap: wrap ? 'break-word' : 'normal'
  }

  const getCellBg = (row: typeof rows[0], side: 'left' | 'right'): string => {
    if (row.type === 'equal' || row.type === 'skip') return 'bg-background'
    if (side === 'left') {
      if (!row.left) return 'bg-surface-secondary'
      if (row.type === 'remove') return 'bg-diff-remove-bg'
      if (row.type === 'change') return 'bg-diff-remove-bg-light'
    } else {
      if (!row.right) return 'bg-surface-secondary'
      if (row.type === 'add') return 'bg-diff-add-bg'
      if (row.type === 'change') return 'bg-diff-add-bg-light'
    }
    return 'bg-background'
  }

  const getLineNumColor = (row: typeof rows[0], side: 'left' | 'right'): string => {
    if (row.type === 'equal') return 'text-muted'
    if (side === 'left' && (row.type === 'remove' || row.type === 'change')) return 'text-danger'
    if (side === 'right' && (row.type === 'add' || row.type === 'change')) return 'text-success'
    return 'text-muted'
  }

  const renderCellContent = (sideData: typeof rows[0]['left'], side: 'left' | 'right', rowIndex: number) => {
    if (!sideData) return null

    // wordDiff 行优先显示差异背景，内部不做语法高亮
    if (sideData.wordDiffs) {
      return sideData.wordDiffs.map((diff, idx) => (
        <WordDiffSpan key={idx} diff={diff} side={side}>
          {diff.value}
        </WordDiffSpan>
      ))
    }

    const tokens = side === 'left'
      ? highlighted?.leftByRow.get(rowIndex)
      : highlighted?.rightByRow.get(rowIndex)

    if (tokens && tokens.length > 0) {
      return tokens.map((token, idx) => (
        <span key={idx} style={{ color: token.color }}>
          {token.content}
        </span>
      ))
    }

    return sideData.content
  }

  const header = (
    <div className="flex items-center justify-between px-3 py-2">
      <span className="text-sm font-semibold truncate max-w-[60%]">{path}</span>
      <div className="flex items-center gap-3 text-sm">
        {status === 'modified' && (
          <>
            {additions > 0 && <span className="font-medium text-success">+{additions}</span>}
            {deletions > 0 && <span className="font-medium text-danger">&minus;{deletions}</span>}
          </>
        )}
        {status === 'added' && <span className="font-medium text-success">新增文件</span>}
        {status === 'removed' && <span className="font-medium text-danger">删除文件</span>}
      </div>
    </div>
  )

  const content = rows.length === 0 ? (
    status === 'unchanged' ? (
      <div className="flex items-center justify-center py-12 text-sm text-muted">
        没有可显示的差异
      </div>
    ) : (
      <div className="flex items-center justify-center py-12 text-sm gap-2 text-muted">
        <Spinner size="sm" aria-label="加载中" />
        正在计算差异...
      </div>
    )
  ) : wrap ? (
    <div style={{ height: totalHeight }}>
      <div style={{ height: topPadding }} />
      {visibleRows.map((row, idx) => {
        const actualIndex = startIndex + idx
        if (row.type === 'skip') {
          const headerText = `@@ -${row.oldStart},${row.oldCount} +${row.newStart},${row.newCount} @@`
          return (
            <div
              key={`skip-${actualIndex}`}
              className="flex items-center h-6 bg-diff-accent-bg border-y border-diff-accent-border pl-12.5"
            >
              <span className="font-mono text-xs select-none text-accent">
                {headerText}
              </span>
            </div>
          )
        }
        return (
          <div key={`row-${actualIndex}`} className="flex min-h-6">
            <div
              data-diff-side="left"
              className={cn(
                'shrink-0 text-right whitespace-nowrap select-none w-12.5 border-r border-diff-border',
                getLineNumColor(row, 'left'),
                getCellBg(row, 'left'),
                cellBaseClass
              )}
              style={cellBaseStyle}
            >
              {row.left?.lineNum ?? '—'}
            </div>
            <div
              data-diff-side="left"
              className={cn(
                'flex-1 border-r border-border text-foreground',
                getCellBg(row, 'left'),
                cellBaseClass
              )}
              style={cellBaseStyle}
            >
              {renderCellContent(row.left, 'left', actualIndex)}
            </div>
            <div
              data-diff-side="right"
              className={cn(
                'shrink-0 text-right whitespace-nowrap select-none w-12.5 border-r border-diff-border',
                getLineNumColor(row, 'right'),
                getCellBg(row, 'right'),
                cellBaseClass
              )}
              style={cellBaseStyle}
            >
              {row.right?.lineNum ?? '—'}
            </div>
            <div
              data-diff-side="right"
              className={cn(
                'flex-1 text-foreground',
                getCellBg(row, 'right'),
                cellBaseClass
              )}
              style={cellBaseStyle}
            >
              {renderCellContent(row.right, 'right', actualIndex)}
            </div>
          </div>
        )
      })}
      <div style={{ height: bottomPadding }} />
    </div>
  ) : (
    <div className="flex" style={{ height: totalHeight }}>
      {/* 左侧 */}
      <div ref={leftPaneRef} className="w-1/2 overflow-auto shrink-0">
        <div style={{ height: topPadding }} />
        {visibleRows.map((row, idx) => {
          const actualIndex = startIndex + idx
          if (row.type === 'skip') {
            return (
              <div
                key={`skip-l-${actualIndex}`}
                className="flex items-center h-6 min-w-full w-max bg-diff-accent-bg border-y border-diff-accent-border pl-12.5"
              >
                <span className="font-mono text-xs select-none text-accent">
                  @@ -{row.oldStart},{row.oldCount} +{row.newStart},{row.newCount} @@
                </span>
              </div>
            )
          }
          return (
            <div key={`row-l-${actualIndex}`} className="flex min-h-6 min-w-full w-max">
              <div
                data-diff-side="left"
                className={cn(
                  'shrink-0 text-right whitespace-nowrap select-none w-12.5 border-r border-diff-border',
                  getLineNumColor(row, 'left'),
                  getCellBg(row, 'left'),
                  cellBaseClass
                )}
                style={cellBaseStyle}
              >
                {row.left?.lineNum ?? '—'}
              </div>
              <div
                data-diff-side="left"
                className={cn(
                  'flex-1 text-foreground',
                  getCellBg(row, 'left'),
                  cellBaseClass
                )}
                style={{ ...cellBaseStyle, flex: '1 0 auto' }}
              >
                {renderCellContent(row.left, 'left', actualIndex)}
              </div>
            </div>
          )
        })}
        <div style={{ height: bottomPadding }} />
        <div
          aria-hidden="true"
          className="invisible pointer-events-none"
          style={{ height: 1, width: Math.max(leftScrollWidth, rightScrollWidth) }}
        />
      </div>

      {/* 中间分割线 */}
      <div className="w-px shrink-0 bg-border" />

      {/* 右侧 */}
      <div ref={rightPaneRef} className="w-1/2 overflow-auto shrink-0">
        <div style={{ height: topPadding }} />
        {visibleRows.map((row, idx) => {
          const actualIndex = startIndex + idx
          if (row.type === 'skip') {
            return (
              <div
                key={`skip-r-${actualIndex}`}
                className="flex items-center h-6 min-w-full w-max bg-diff-accent-bg border-y border-diff-accent-border pl-12.5"
              >
                <span className="font-mono text-xs select-none text-accent">
                  @@ -{row.oldStart},{row.oldCount} +{row.newStart},{row.newCount} @@
                </span>
              </div>
            )
          }
          return (
            <div key={`row-r-${actualIndex}`} className="flex min-h-6 min-w-full w-max">
              <div
                data-diff-side="right"
                className={cn(
                  'shrink-0 text-right whitespace-nowrap select-none w-12.5 border-r border-diff-border',
                  getLineNumColor(row, 'right'),
                  getCellBg(row, 'right'),
                  cellBaseClass
                )}
                style={cellBaseStyle}
              >
                {row.right?.lineNum ?? '—'}
              </div>
              <div
                data-diff-side="right"
                className={cn(
                  'flex-1 text-foreground',
                  getCellBg(row, 'right'),
                  cellBaseClass
                )}
                style={{ ...cellBaseStyle, flex: '1 0 auto' }}
              >
                {renderCellContent(row.right, 'right', actualIndex)}
              </div>
            </div>
          )
        })}
        <div style={{ height: bottomPadding }} />
        <div
          aria-hidden="true"
          className="invisible pointer-events-none"
          style={{ height: 1, width: Math.max(leftScrollWidth, rightScrollWidth) }}
        />
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="flex flex-col h-full">
        <div className="shrink-0 sticky top-0 z-10 bg-surface-secondary border-b border-border">
          {header}
        </div>
        <div
          ref={scrollRef}
          className="flex-1 overflow-auto bg-background text-foreground"
          onMouseDown={handleMouseDown}
        >
          {content}
        </div>
      </div>
    )
  }

  return (
    <div ref={scrollRef} className="h-full overflow-auto bg-background text-foreground" onMouseDown={handleMouseDown}>
      <div className="bg-surface-secondary border-b border-border sticky top-0 z-10">
        {header}
      </div>
      {content}
    </div>
  )
}
