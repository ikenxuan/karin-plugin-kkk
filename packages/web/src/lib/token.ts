import key from '@/const/key'

/**
 * 获取访问令牌
 * @returns 访问令牌
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(key.accessToken)
}

/**
 * 设置访问令牌
 * @param token 访问令牌
 */
export const setAccessToken = (token: string): void => {
  localStorage.setItem(key.accessToken, token)
}

/**
 * 清除访问令牌
 */
export const clearAccessToken = (): void => {
  localStorage.removeItem(key.accessToken)
}

/**
 * 获取刷新令牌
 * @returns 刷新令牌
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(key.refreshToken)
}

/**
 * 设置刷新令牌
 * @param token 刷新令牌
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(key.refreshToken, token)
}

/**
 * 清除刷新令牌
 */
export const clearRefreshToken = (): void => {
  localStorage.removeItem(key.refreshToken)
}

/**
 * 获取用户ID
 * @returns 用户ID
 */
export const getUserId = (): string | null => {
  return localStorage.getItem(key.userId)
}

/**
 * 设置用户ID
 * @param userId 用户ID
 */
export const setUserId = (userId: string): void => {
  localStorage.setItem(key.userId, userId)
}

/**
 * 清除用户ID
 */
export const clearUserId = (): void => {
  localStorage.removeItem(key.userId)
}