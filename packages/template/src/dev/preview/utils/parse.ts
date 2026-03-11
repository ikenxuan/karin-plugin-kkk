export const parseBoolean = (value: string | null): boolean => {
  if (!value) return false
  return value === 'true' || value === '1'
}

export const parseNumber = (value: string | null): number | undefined => {
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}
