import { Chip, Description } from '@heroui/react'
import { diff } from 'jsondiffpatch'

import 'jsondiffpatch/formatters/styles/html.css'
import * as htmlFormatter from 'jsondiffpatch/formatters/html'
import { useEffect, useMemo, useRef } from 'react'

import type { ConfigType } from '../../../types/config'
import { normalizeConfigArrays } from './utils'

interface ConfigDiffViewProps {
  /** 上一次保存的配置（左侧） */
  original: ConfigType | null
  /** 当前编辑中的配置（右侧） */
  current: ConfigType | null
  /** 是否显示未变更字段 */
  showUnchanged?: boolean
}

const isDeltaNode = (value: unknown): value is Record<string, unknown> | unknown[] => value !== null && typeof value === 'object'

const countChanges = (delta: unknown): { added: number; modified: number; deleted: number } => {
  const counts = { added: 0, modified: 0, deleted: 0 }

  const walk = (node: unknown) => {
    if (!isDeltaNode(node)) return

    if (Array.isArray(node)) {
      // jsondiffpatch delta 格式：
      // [newValue]              -> added
      // [oldValue, newValue]    -> modified（moved 也是长度为 2，按变更计）
      // [oldValue, 0, 0]        -> deleted
      if (node.length === 1) {
        counts.added += 1
      } else if (node.length === 2) {
        counts.modified += 1
      } else if (node.length === 3 && node[2] === 0) {
        counts.deleted += 1
      }
      return
    }

    for (const [key, value] of Object.entries(node)) {
      if (key === '_t') continue
      walk(value)
    }
  }

  walk(delta)
  return counts
}

export const ConfigDiffView = ({ original, current, showUnchanged = false }: ConfigDiffViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const delta = useMemo(() => {
    if (!original || !current) return undefined
    return diff(normalizeConfigArrays(original), normalizeConfigArrays(current))
  }, [original, current])

  const normalizedOriginal = useMemo(() => (original ? normalizeConfigArrays(original) : undefined), [original])

  const html = useMemo(() => {
    if (!delta) return undefined
    return htmlFormatter.format(delta, normalizedOriginal)
  }, [delta, normalizedOriginal])

  const counts = useMemo(() => countChanges(delta), [delta])

  useEffect(() => {
    if (!containerRef.current) return

    if (html) {
      containerRef.current.innerHTML = html
      if (showUnchanged) {
        htmlFormatter.showUnchanged(true, containerRef.current)
      } else {
        htmlFormatter.hideUnchanged(containerRef.current)
      }
    } else {
      containerRef.current.innerHTML = ''
    }
  }, [html, showUnchanged])

  if (!html) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
        <Description className="text-sm text-muted">当前没有检测到配置变更</Description>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Chip size="sm" color="success" variant="soft">
          <Chip.Label>+ {counts.added} 新增</Chip.Label>
        </Chip>
        <Chip size="sm" color="warning" variant="soft">
          <Chip.Label>~ {counts.modified} 修改</Chip.Label>
        </Chip>
        <Chip size="sm" color="danger" variant="soft">
          <Chip.Label>- {counts.deleted} 删除</Chip.Label>
        </Chip>
      </div>
      <div className="max-h-[60vh] overflow-auto rounded-xl border border-default-200 bg-surface p-4">
        <div ref={containerRef} className="min-w-fit" />
      </div>
    </div>
  )
}
