const invalidLiveTimes = new Set(['', '-62170012800', '0000-00-00 00:00:00'])

/**
 * 将B站返回的东八区开播时间转换为数据库可比较的 ISO 时间。
 *
 * @param liveTime B站直播间详情返回的开播时间。
 * @returns 有效的 UTC ISO 时间；无法解析时返回 `null`。
 */
export const parseBilibiliLiveStartedAt = (liveTime: string): string | null => {
  const normalizedLiveTime = liveTime.trim()
  if (invalidLiveTimes.has(normalizedLiveTime)) return null

  const zonedLiveTime = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(normalizedLiveTime)
    ? `${normalizedLiveTime.replace(' ', 'T')}+08:00`
    : normalizedLiveTime
  const timestamp = Date.parse(zonedLiveTime)
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString()
}

/**
 * 使用直播间和开播时间构造跨检测源稳定的场次缓存键。
 *
 * @remarks
 * 定时推送可能先从 UID 直播状态接口发现开播，也可能在接口异常时回退到动态列表。
 * 两条路径必须使用同一个场次键，才能避免同一场直播被重复推送。
 *
 * @param hostMid UP 主 UID。
 * @param roomId 直播间长号。
 * @param liveTime B站直播间详情返回的本场开播时间。
 * @returns 可用于 `DynamicCaches` 的场次键；开播时间无效时返回 `null`。
 */
export const buildBilibiliLiveSessionId = (hostMid: number, roomId: number, liveTime: string): string | null => {
  const normalizedLiveTime = liveTime.trim()
  if (!parseBilibiliLiveStartedAt(normalizedLiveTime)) return null
  return `bilibili-live:${hostMid}:${roomId}:${normalizedLiveTime}`
}
