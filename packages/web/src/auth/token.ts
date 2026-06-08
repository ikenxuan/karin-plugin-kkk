const tokenKeys = {
  userId: 'userId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
} as const

export const authChangedEventName = 'kkk-auth-changed'

/**
 * 获取 Karin 主 Web 同名 key 中的访问令牌。
 */
export const getAccessToken = () => localStorage.getItem(tokenKeys.accessToken)

/**
 * 获取 Karin 主 Web 同名 key 中的刷新令牌。
 */
export const getRefreshToken = () => localStorage.getItem(tokenKeys.refreshToken)

/**
 * 获取 Karin 主 Web 同名 key 中的用户 ID。
 */
export const getUserId = () => localStorage.getItem(tokenKeys.userId)

/**
 * 判断当前浏览器是否已有可复用的 Karin 登录态。
 */
export const hasAuthToken = () => Boolean(getAccessToken() && getUserId())

/**
 * 保存 Karin 登录返回的完整 token 信息。
 */
export const setAuthTokens = (tokens: { userId: string; accessToken: string; refreshToken: string }) => {
  localStorage.setItem(tokenKeys.userId, tokens.userId)
  localStorage.setItem(tokenKeys.accessToken, tokens.accessToken)
  localStorage.setItem(tokenKeys.refreshToken, tokens.refreshToken)
  window.dispatchEvent(new Event(authChangedEventName))
}

/**
 * 更新访问令牌并通知应用重新检查登录态。
 */
export const setAccessToken = (token: string) => {
  localStorage.setItem(tokenKeys.accessToken, token)
  window.dispatchEvent(new Event(authChangedEventName))
}

/**
 * 清除 Karin 登录态并通知应用回到登录页。
 */
export const clearAuthTokens = () => {
  localStorage.removeItem(tokenKeys.userId)
  localStorage.removeItem(tokenKeys.accessToken)
  localStorage.removeItem(tokenKeys.refreshToken)
  window.dispatchEvent(new Event(authChangedEventName))
}
