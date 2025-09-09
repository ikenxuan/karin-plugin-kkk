/**
 * 检查用户是否已登录
 * @returns 是否已登录
 */
export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const userId = localStorage.getItem('userId')

  // 至少需要有访问令牌或刷新令牌之一，以及用户ID
  return !!(accessToken || refreshToken) && !!userId
}

/**
 * 获取默认重定向路径
 * @returns 默认路径
 */
export const getDefaultRedirectPath = (): string => {
  return '/crack'
}
