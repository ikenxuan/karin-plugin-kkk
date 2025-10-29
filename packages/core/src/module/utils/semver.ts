/**
 * 语义化版本比较
 * @param remote 远程版本字符串
 * @param local 本地版本字符串
 * @returns 如果远程版本大于本地版本则返回true，否则返回false
 */
export const isSemverGreater = (remote: string, local: string): boolean => {
  const parse = (v: string) => {
    v = v.trim()
    if (v.startsWith('v') || v.startsWith('V')) v = v.slice(1)
    const [preBuild] = v.split('+', 2)
    const [core, pre] = preBuild.split('-', 2)
    const parts = core.split('.')
    const major = parseInt(parts[0] || '0', 10) || 0
    const minor = parseInt(parts[1] || '0', 10) || 0
    const patch = parseInt(parts[2] || '0', 10) || 0
    const prerelease = pre ? pre.split('.') : []
    return { major, minor, patch, prerelease }
  }

  const cmpId = (a: string, b: string): number => {
    const an = /^\d+$/.test(a)
    const bn = /^\d+$/.test(b)
    if (an && bn) {
      const na = parseInt(a, 10)
      const nb = parseInt(b, 10)
      if (na === nb) return 0
      return na > nb ? 1 : -1
    }
    if (an && !bn) return -1
    if (!an && bn) return 1
    if (a === b) return 0
    return a > b ? 1 : -1
  }

  const r = parse(remote)
  const l = parse(local)

  if (r.major !== l.major) return r.major > l.major
  if (r.minor !== l.minor) return r.minor > l.minor
  if (r.patch !== l.patch) return r.patch > l.patch

  const ra = r.prerelease
  const la = l.prerelease

  if (ra.length === 0 && la.length === 0) return false
  if (ra.length === 0 && la.length > 0) return true
  if (ra.length > 0 && la.length === 0) return false

  const len = Math.min(ra.length, la.length)
  for (const [i, raItem] of ra.entries()) {
    if (i >= len) break
    const c = cmpId(raItem, la[i])
    if (c !== 0) return c > 0
  }
  if (ra.length !== la.length) return ra.length > la.length
  return false
}