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
