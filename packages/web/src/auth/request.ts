import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { sha256, signKkkRequest } from './crypto'
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  getUserId,
  setAccessToken,
  setAuthTokens
} from './token'

interface KarinResponse<T> {
  code: number
  data: T
  message?: string
}

interface LoginTokens {
  userId: string
  accessToken: string
  refreshToken: string
}

const kkkApiPrefix = '/kkk/v1'

let refreshPromise: Promise<boolean> | null = null

/**
 * 将 axios 的 baseURL 和 url 合成为用于签名的路径。
 */
const joinUrl = (baseURL = '', url = '') => {
  if (/^https?:\/\//.test(url)) {
    return new URL(url).pathname
  }

  const base = baseURL.replace(/\/$/, '')
  const path = url.startsWith('/') ? url : `/${url}`
  return `${base}${path}`
}

/**
 * 获取与后端签名中间件一致的请求体字符串。
 */
const getRequestBody = (config: InternalAxiosRequestConfig) => {
  if (config.method?.toUpperCase() === 'GET') return ''
  if (config.data === undefined || config.data === null) return '{}'
  if (typeof config.data === 'string') return config.data
  return JSON.stringify(config.data)
}

/**
 * 使用 Karin refresh token 静默刷新 access token。
 */
const refreshAccessToken = async () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()

    if (!accessToken || !refreshToken) return false

    try {
      const response = await axios.post<KarinResponse<{ accessToken: string }>>('/api/v1/refresh', {
        accessToken,
        refreshToken
      })
      const nextToken = response.data.data?.accessToken
      if (!nextToken) return false

      setAccessToken(nextToken)
      return true
    } catch {
      return false
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

/**
 * 带 Karin 登录态和 KKK API 签名能力的 axios 实例。
 */
export const authClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

authClient.interceptors.request.use(async (config) => {
  const token = getAccessToken()
  const userId = getUserId()

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  if (userId) {
    config.headers.set('x-user-id', userId)
  }

  const requestUrl = joinUrl(config.baseURL, config.url)
  if (token && requestUrl.startsWith(kkkApiPrefix)) {
    const signatureHeaders = await signKkkRequest({
      method: config.method || 'GET',
      url: requestUrl,
      body: getRequestBody(config),
      token
    })

    config.headers.set('x-original-url', requestUrl)
    Object.entries(signatureHeaders).forEach(([key, value]) => {
      config.headers.set(key, value)
    })
  }

  return config
})

authClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<KarinResponse<null>>) => {
    const config = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined
    const status = error.response?.status

    if (config && !config._retry && (status === 401 || status === 419)) {
      config._retry = true
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        return authClient(config)
      }
    }

    if (status === 401 || status === 419 || status === 420) {
      clearAuthTokens()
    }

    throw new Error(error.response?.data?.message || error.message)
  }
)

/**
 * 使用 Karin HTTP_AUTH_KEY 登录，并将 token 写入 Karin 主 Web 相同的 localStorage key。
 */
export const loginWithAuthKey = async (authKey: string) => {
  const authorization = await sha256(authKey)
  const response = await axios.post<KarinResponse<LoginTokens>>('/api/v1/login', { authorization }, {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.data.data?.accessToken || !response.data.data.userId || !response.data.data.refreshToken) {
    throw new Error(response.data.message || '登录失败')
  }

  setAuthTokens(response.data.data)
}
