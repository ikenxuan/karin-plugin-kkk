import type { ConfigType } from '../../../types/config'
import type { ConfigDescription, ConfigHelp, ConfigPath, ConfigRecord } from './types'

export const toPathKey = (path: ConfigPath): string => {
  return path.join('.')
}

export const isConfigRecord = (value: unknown): value is ConfigRecord => {
  return Boolean(value && typeof value === 'object')
}

export const getValue = <T>(source: ConfigType | null, path: ConfigPath, fallback: T): T => {
  if (!source) return fallback

  const result = path.reduce<unknown>((current, key) => {
    if (!isConfigRecord(current)) return undefined
    return current[key]
  }, source)

  return (result === undefined || result === null ? fallback : result) as T
}

export const setValue = (source: ConfigType, path: ConfigPath, value: unknown): ConfigType => {
  const cloned = structuredClone(source)
  let current: ConfigRecord = cloned as unknown as ConfigRecord

  for (let index = 0; index < path.length - 1; index++) {
    const key = path[index]
    const nextValue = current[key]
    if (!isConfigRecord(nextValue)) {
      current[key] = {}
    }
    current = current[key] as ConfigRecord
  }

  current[path[path.length - 1]] = value
  return cloned
}

export const toNumber = (value: string, fallback: number): number => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

export const includesValue = (values: unknown, value: string): boolean => {
  return Array.isArray(values) && values.includes(value)
}

export const isConfigHelp = (value: ConfigDescription): value is ConfigHelp => {
  return Boolean(value && typeof value === 'object' && 'description' in value)
}

/**
 * 标准化配置对象中的数组字段，确保数组元素按固定顺序排列。
 * 用于配置比较前的预处理，避免因数组顺序不同导致误判为配置变更。
 */
export const normalizeConfigArrays = (config: ConfigType): ConfigType => {
  if (!config || typeof config !== 'object') return config

  const normalized = structuredClone(config)

  // 定义需要标准化的数组字段路径
  const arrayFields: Array<{ path: ConfigPath; options: string[] }> = [
    { path: ['bilibili', 'sendContent'], options: ['info', 'comment', 'video', 'image'] },
    { path: ['bilibili', 'displayContent'], options: ['cover', 'title', 'author', 'stats', 'desc'] },
    { path: ['douyin', 'sendContent'], options: ['info', 'comment', 'video', 'image'] },
    { path: ['xiaohongshu', 'sendContent'], options: ['info', 'comment', 'video', 'image'] },
    { path: ['kuaishou', 'sendContent'], options: ['info', 'comment', 'video', 'image'] }
  ]

  for (const { path, options } of arrayFields) {
    const value = getValue<unknown>(normalized, path, null)
    if (!Array.isArray(value)) continue

    // 按照预定义的顺序重新排列数组
    const sortedArray = options.filter((option) => value.includes(option))

    // 更新配置
    let current: ConfigRecord = normalized as unknown as ConfigRecord
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i]
      if (!isConfigRecord(current[key])) {
        current[key] = {}
      }
      current = current[key] as ConfigRecord
    }
    current[path[path.length - 1]] = sortedArray
  }

  return normalized
}
