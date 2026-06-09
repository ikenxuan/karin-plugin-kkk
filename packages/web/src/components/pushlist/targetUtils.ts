import type { PushTargetMapping } from './types'

export const formatTargetValue = (mapping: Pick<PushTargetMapping, 'groupId' | 'botId'>) => (
  `${mapping.groupId}:${mapping.botId}`
)

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

