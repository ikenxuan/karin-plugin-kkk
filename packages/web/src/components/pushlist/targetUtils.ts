import type { PushTargetMapping } from './types'

export const formatTargetValue = (mapping: Pick<PushTargetMapping, 'groupId' | 'botId'>) => `${mapping.groupId}:${mapping.botId}`

export const parseTargetValue = (value: string): Pick<PushTargetMapping, 'groupId' | 'botId'> | null => {
  const [groupId, botId, extra] = value.split(':')
  if (!groupId || !botId || extra !== undefined) return null
  return { groupId, botId }
}

export const normalizeTargetValues = (values: string[]) => {
  const seen = new Set<string>()
  const normalized: string[] = []

  values.forEach((value) => {
    const parsed = parseTargetValue(value)
    if (!parsed) return

    const nextValue = formatTargetValue(parsed)
    if (seen.has(nextValue)) return

    seen.add(nextValue)
    normalized.push(nextValue)
  })

  return normalized
}

export const getTargetDisplayName = (mapping: PushTargetMapping) => {
  const group = mapping.groupName || mapping.groupId
  const bot = mapping.botName || mapping.botId
  return `${group} -> ${bot}`
}

/** 将单条 `groupId:botId` 的 Bot 替换为指定 Bot；解析失败时原样返回 */
export const switchTargetBot = (value: string, botId: string): string => {
  const parsed = parseTargetValue(value)
  if (!parsed) return value
  return formatTargetValue({ groupId: parsed.groupId, botId })
}

/** 单个 Bot 在推送目标中的引用统计 */
export interface BotUsageCount {
  botId: string
  count: number
}

/** 汇总若干推送对象的推送目标，统计每个 Bot 被引用的条数（按条数降序） */
export const collectBotUsage = (valuesGroups: string[][]): BotUsageCount[] => {
  const counts = new Map<string, number>()

  for (const values of valuesGroups) {
    for (const value of values) {
      const parsed = parseTargetValue(value)
      if (!parsed) continue
      counts.set(parsed.botId, (counts.get(parsed.botId) ?? 0) + 1)
    }
  }

  return Array.from(counts, ([botId, count]) => ({ botId, count })).sort((a, b) => b.count - a.count)
}
