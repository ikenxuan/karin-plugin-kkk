'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Spinner } from '@heroui/react'
import type { FileDiffResult, WordDiff } from '@/lib/diff-client'

interface CodeDiffViewerProps {
  data: FileDiffResult
  isDark?: boolean
}

const ROW_HEIGHT = 24
const OVERSCAN = 15

const WordDiffSpan = ({ diff, isDark, side }: { diff: WordDiff; isDark: boolean; side: 'left' | 'right' }) => {
  if (diff.type === 'equal') return <span>{diff.value}</span>

  if (diff.type === 'remove' && side === 'left') {
    return (
      <span
        className="rounded px-0.5"
        style={{
          backgroundColor: isDark ? 'rgba(248, 81, 73, 0.4)' : 'rgba(255, 129, 130, 0.5)',
          color: isDark ? '#ffdcd7' : '#82071e'
        }}
      >
        {diff.value}
      </span>
    )
  }

  if (diff.type === 'add' && side === 'right') {
    return (
      <span
        className="rounded px-0.5"
        style={{
          backgroundColor: isDark ? 'rgba(46, 160, 67, 0.4)' : 'rgba(84, 174, 101, 0.5)',
          color: isDark ? '#aff5b4' : '#1a7f37'
        }}
      >
        {diff.value}
      </span>
    )
  }

  return <span>{diff.value}</span>
}

export const CodeDiffViewer = ({ data, isDark = false }: CodeDiffViewerProps) => {
  const { path, status, rows, additions, deletions } = data
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

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
      const leftLen = row.left?.content.length ?? 0
      const rightLen = row.right?.content.length ?? 0
      const maxLen = Math.max(leftLen, rightLen)
      const lines = maxLen <= cpl ? 1 : Math.ceil(maxLen / cpl)
      offsets[i + 1] = offsets[i] + Math.max(ROW_HEIGHT, lines * ROW_HEIGHT)
    }
    return { totalHeight: offsets[rows.length], rowOffsets: offsets }
  }, [rows, containerWidth])

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

  const bgColor = isDark ? '#0d1117' : '#ffffff'
  const headerBg = isDark ? '#161b22' : '#f6f8fa'
  const borderColor = isDark ? 'rgba(48, 54, 61, 0.6)' : 'rgba(208, 215, 222, 0.8)'
  const textColor = isDark ? '#c9d1d9' : '#1f2328'
  const mutedColor = isDark ? '#8b949e' : '#656d76'
  const codeColor = isDark ? '#c9d1d9' : '#1f2937'

  const cellBaseStyle: React.CSSProperties = {
    padding: '3px 8px',
    fontSize: 12,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    lineHeight: 1.5,
    verticalAlign: 'top',
    minHeight: ROW_HEIGHT
  }

  const getCellBg = (row: typeof rows[0], side: 'left' | 'right'): string => {
    if (row.type === 'equal' || row.type === 'skip') return isDark ? '#0d1117' : '#ffffff'
    const emptyBg = isDark ? '#161b22' : '#f6f8fa'
    if (side === 'left') {
      if (!row.left) return emptyBg
      if (row.type === 'remove') return isDark ? 'rgba(248, 81, 73, 0.12)' : '#ffebe9'
      if (row.type === 'change') return isDark ? 'rgba(248, 81, 73, 0.08)' : 'rgba(255, 129, 130, 0.15)'
    } else {
      if (!row.right) return emptyBg
      if (row.type === 'add') return isDark ? 'rgba(46, 160, 67, 0.12)' : '#e6ffec'
      if (row.type === 'change') return isDark ? 'rgba(46, 160, 67, 0.08)' : 'rgba(171, 242, 188, 0.25)'
    }
    return isDark ? '#0d1117' : '#ffffff'
  }

  const getLineNumColor = (row: typeof rows[0], side: 'left' | 'right'): string => {
    if (row.type === 'equal') return isDark ? '#6e7681' : '#9ca3af'
    if (side === 'left' && (row.type === 'remove' || row.type === 'change')) return isDark ? '#f85149' : '#cf222e'
    if (side === 'right' && (row.type === 'add' || row.type === 'change')) return isDark ? '#3fb950' : '#1a7f37'
    return isDark ? '#6e7681' : '#9ca3af'
  }

  const renderCellContent = (sideData: typeof rows[0]['left'], side: 'left' | 'right') => {
    if (!sideData) return null
    if (sideData.wordDiffs) {
      return sideData.wordDiffs.map((diff, idx) => (
        <WordDiffSpan key={idx} diff={diff} isDark={isDark} side={side} />
      ))
    }
    return sideData.content
  }

  return (
    <div ref={scrollRef} className="h-full overflow-auto" style={{ backgroundColor: bgColor, color: textColor }} onMouseDown={handleMouseDown}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ backgroundColor: headerBg, borderBottom: `1px solid ${borderColor}`, position: 'sticky', top: 0, zIndex: 10 }}
      >
        <span className="text-sm font-semibold truncate" style={{ maxWidth: '60%' }}>{path}</span>
        <div className="flex items-center gap-3 text-sm">
          {status === 'modified' && (
            <>
              {additions > 0 && <span className="font-medium" style={{ color: isDark ? '#3fb950' : '#1a7f37' }}>+{additions}</span>}
              {deletions > 0 && <span className="font-medium" style={{ color: isDark ? '#f85149' : '#cf222e' }}>−{deletions}</span>}
            </>
          )}
          {status === 'added' && <span className="font-medium" style={{ color: isDark ? '#3fb950' : '#1a7f37' }}>新增文件</span>}
          {status === 'removed' && <span className="font-medium" style={{ color: isDark ? '#f85149' : '#cf222e' }}>删除文件</span>}
        </div>
      </div>

      {/* Virtual rows */}
      {rows.length === 0 ? (
        status === 'unchanged' ? (
          <div className="flex items-center justify-center py-12 text-sm" style={{ color: mutedColor }}>
            没有可显示的差异
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-sm gap-2" style={{ color: mutedColor }}>
            <Spinner size="sm" aria-label="加载中" />
            正在计算差异...
          </div>
        )
      ) : (
        <div style={{ height: totalHeight }}>
          <div style={{ height: topPadding }} />
          {visibleRows.map((row, idx) => {
            const actualIndex = startIndex + idx
            if (row.type === 'skip') {
              const headerText = `@@ -${row.oldStart},${row.oldCount} +${row.newStart},${row.newCount} @@`
              return (
                <div
                  key={`skip-${actualIndex}`}
                  className="flex items-center"
                  style={{
                    height: ROW_HEIGHT,
                    backgroundColor: isDark ? 'rgba(56, 139, 253, 0.1)' : '#ddf4ff',
                    borderTop: `1px solid ${isDark ? 'rgba(56, 139, 253, 0.2)' : 'rgba(84, 174, 255, 0.4)'}`,
                    borderBottom: `1px solid ${isDark ? 'rgba(56, 139, 253, 0.2)' : 'rgba(84, 174, 255, 0.4)'}`,
                    paddingLeft: 50
                  }}
                >
                  <span
                    className="font-mono text-xs select-none"
                    style={{ color: isDark ? '#58a6ff' : '#0969da' }}
                  >
                    {headerText}
                  </span>
                </div>
              )
            }
            return (
              <div key={`row-${actualIndex}`} className="flex" style={{ minHeight: ROW_HEIGHT }}>
                <div
                  data-diff-side="left"
                  className="shrink-0 text-right whitespace-nowrap select-none"
                  style={{
                    width: 50,
                    color: getLineNumColor(row, 'left'),
                    backgroundColor: getCellBg(row, 'left'),
                    borderRight: `1px solid ${isDark ? 'rgba(48, 54, 61, 0.15)' : 'rgba(208, 215, 222, 0.4)'}`,
                    ...cellBaseStyle
                  }}
                >
                  {row.left?.lineNum ?? '—'}
                </div>
                <div
                  data-diff-side="left"
                  className="flex-1"
                  style={{
                    color: codeColor,
                    backgroundColor: getCellBg(row, 'left'),
                    borderRight: `1px solid ${borderColor}`,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    ...cellBaseStyle
                  }}
                >
                  {renderCellContent(row.left, 'left')}
                </div>
                <div
                  data-diff-side="right"
                  className="shrink-0 text-right whitespace-nowrap select-none"
                  style={{
                    width: 50,
                    color: getLineNumColor(row, 'right'),
                    backgroundColor: getCellBg(row, 'right'),
                    borderRight: `1px solid ${isDark ? 'rgba(48, 54, 61, 0.15)' : 'rgba(208, 215, 222, 0.4)'}`,
                    ...cellBaseStyle
                  }}
                >
                  {row.right?.lineNum ?? '—'}
                </div>
                <div
                  data-diff-side="right"
                  className="flex-1"
                  style={{
                    color: codeColor,
                    backgroundColor: getCellBg(row, 'right'),
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    ...cellBaseStyle
                  }}
                >
                  {renderCellContent(row.right, 'right')}
                </div>
              </div>
            )
          })}
          <div style={{ height: bottomPadding }} />
        </div>
      )}
    </div>
  )
}
