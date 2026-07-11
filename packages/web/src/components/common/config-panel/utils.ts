import type { ConfigType } from '../../../types/config'
import type { ConfigDescription, ConfigHelp, ConfigPath, ConfigRecord } from './types'

/**
 * 将配置字段路径转换为稳定的点分隔 key。
 *
 * @param path 配置字段路径。
 */
export const toPathKey = (path: ConfigPath): string => {
  return path.join('.')
}

/**
 * 判断一个未知值是否是可继续按 key 读取的配置对象。
 *
 * @param value 要判断的未知值。
 */
export const isConfigRecord = (value: unknown): value is ConfigRecord => {
  return Boolean(value && typeof value === 'object')
}

/**
 * 从配置对象中读取指定路径的值，缺失或为空时返回回退值。
 *
 * @param source 完整配置对象。
 * @param path 配置字段路径。
 * @param fallback 路径不存在或值为 null/undefined 时使用的回退值。
 */
export const getValue = <T>(source: ConfigType | null, path: ConfigPath, fallback: T): T => {
  if (!source) return fallback

  const result = path.reduce<unknown>((current, key) => {
    if (!isConfigRecord(current)) return undefined
    return current[key]
  }, source)

  return (result === undefined || result === null ? fallback : result) as T
}

/**
 * 在配置对象的指定路径写入新值，并返回克隆后的配置对象。
 *
 * @param source 完整配置对象。
 * @param path 配置字段路径。
 * @param value 要写入的新值。
 */
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

/**
 * 将字符串转换为数字，无法得到有限数字时返回回退值。
 *
 * @param value 输入框中的字符串值。
 * @param fallback 转换失败时使用的回退值。
 */
export const toNumber = (value: string, fallback: number): number => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

/**
 * 判断未知数组值中是否包含指定字符串。
 *
 * @param values 待检查的未知值。
 * @param value 要查找的字符串。
 */
export const includesValue = (values: unknown, value: string): boolean => {
  return Array.isArray(values) && values.includes(value)
}

/**
 * 判断帮助内容是否是结构化帮助对象。
 *
 * @param value 待判断的帮助内容。
 */
export const isConfigHelp = (value: ConfigDescription): value is ConfigHelp => {
  return Boolean(value && typeof value === 'object' && 'description' in value)
}

/**
 * 标准化配置对象中的数组字段，确保数组元素按固定顺序排列，避免配置比较时把顺序差异误判为内容变更。
 *
 * @param config 要标准化的完整配置对象。
 */
export const normalizeConfigArrays = (config: ConfigType): ConfigType => {
  if (!config || typeof config !== 'object') return config

  const normalized = structuredClone(config)

  // 定义需要标准化的数组字段路径
  const arrayFields: Array<{ path: ConfigPath; options: string[] }> = [
    { path: ['bilibili', 'sendContent'], options: ['info', 'comment', 'video', 'image'] },
    { path: ['bilibili', 'displayContent'], options: ['cover', 'title', 'author', 'stats', 'desc'] },
    {
      path: ['bilibili', 'push', 'parseDynamicTypes'],
      options: ['DYNAMIC_TYPE_AV', 'DYNAMIC_TYPE_DRAW', 'DYNAMIC_TYPE_ARTICLE']
    },
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
