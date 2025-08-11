import { invoke, isTauri } from '@tauri-apps/api/core'
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'

import {
  clearAccessToken,
  clearRefreshToken,
  clearUserId,
  getAccessToken,
  getRefreshToken,
  getUserId,
  setAccessToken,
} from '@/lib/token'

import { generateNonce, generateSignature } from './crypto'

type TauriProxyResponse = {
  data: ServerResponse<any>
  status: number
  status_text: string
  headers: Record<string, string>
}

export interface ServerRequest extends AxiosInstance {
  serverGet<T> (url: string, config?: AxiosRequestConfig): Promise<T>
  serverPost<T, R> (url: string, data?: R, config?: AxiosRequestConfig): Promise<T>
}

export interface ServerResponse<T> {
  message: string
  data: T
}

/** 缓存token */
const cacheToken: {
  token: string | null
  userId: string | null
} = {
  token: null,
  userId: null,
}

/** 防抖 */
let isRedirecting = false
/** 标记是否正在刷新token */
let isRefreshingToken = false
/** 等待刷新token的请求队列 */
let refreshTokenPromise: Promise<boolean> | null = null
/** 等待执行的请求队列 */
const pendingRequests: Array<{
  config: any
  resolve: (value: any) => void
  reject: (reason?: any) => void
}> = []

const refreshAccessToken = async () => {
  // 如果已经有正在进行的刷新token请求，直接返回该Promise
  if (refreshTokenPromise) {
    return refreshTokenPromise
  }

  // 创建新的刷新token请求
  refreshTokenPromise = (async () => {
    try {
      isRefreshingToken = true
      const accessToken = getAccessToken()
      const refreshToken = getRefreshToken()
      if (!accessToken || !refreshToken) {
        isRefreshingToken = false
        // 清理队列中的请求
        pendingRequests.forEach(({ reject }) => {
          reject(new Error('没有可用的令牌'))
        })
        pendingRequests.length = 0
        return false
      }

      /** 刷新访问令牌 */
      let data: any

      if (isTauri()) {
        data = await tauriRequest('/api/v1/refresh', {
          method: 'POST',
          data: { accessToken, refreshToken },
          timeout: 10000,
        })
      } else {
        data = await axios.post(
          '/api/v1/refresh',
          { accessToken, refreshToken },
          {
            timeout: 10000,
          }
        )
      }

      if (data.status === 200 && data.data?.data?.accessToken) {
        const newToken = data.data.data.accessToken
        setAccessToken(newToken)
        // 更新缓存中的 token
        cacheToken.token = newToken

        // 执行队列中的请求
        processPendingRequests()
        return true
      }

      return false
    } catch (error: any) {
      console.error('[auth] 刷新token失败', error.message)

      // 获取错误状态码
      let status: number
      if (isTauri()) {
        status = error?.response?.data?.code || error?.response?.status
      } else {
        status = error?.response?.status
      }

      // 如果是 401 或 420 错误，说明令牌完全失效，需要清理并重定向
      if (status === 401 || status === 420) {
        // 清理所有认证数据
        clearLocalAuthData()

        // 拒绝队列中的所有请求
        pendingRequests.forEach(({ reject }) => {
          reject(new Error('Authentication failed, please login again'))
        })
        pendingRequests.length = 0

        // 重定向到登录页
        setTimeout(() => {
          redirectToLogin('登录信息已失效，请重新登录')
        }, 100)

        return false
      }

      // 其他错误，拒绝队列中的请求但不清理令牌
      pendingRequests.forEach(({ reject }) => {
        reject(error)
      })
      pendingRequests.length = 0

      return false
    } finally {
      isRefreshingToken = false
      // 请求完成后，清空Promise以便下次可以重新刷新
      refreshTokenPromise = null
    }
  })()

  return refreshTokenPromise
}

/**
 * 处理队列中的请求
 */
const processPendingRequests = () => {
  // 检查token是否有效
  const { token } = getToken()
  if (!token) {
    pendingRequests.forEach(({ reject }) => {
      reject(new Error('No valid token available'))
    })
    pendingRequests.length = 0
    return
  }

  pendingRequests.forEach(({ config, resolve, reject }) => {
    // 手动更新token
    config.headers['Authorization'] = `Bearer ${token}`

    // 根据环境选择请求方式
    const requestPromise = isTauri()
      ? tauriRequest(config.url, config)
      : getRequestInstance().request(config)

    requestPromise
      .then(response => resolve(response))
      .catch(error => reject(error))
  })

  // 清空队列
  pendingRequests.length = 0
}

/** 处理重定向到登录页 */
const redirectToLogin = (message: string) => {
  if (isRedirecting) return
  isRedirecting = true

  const token = getAccessToken()
  const refreshToken = getRefreshToken()

  // 仅在同时缺少访问令牌和刷新令牌时清除数据
  if (!token && !refreshToken) {
    clearLocalAuthData()
  } else if (token) {
    // 如果还有token，只清除访问令牌，保留刷新令牌
    clearAccessToken()
    cacheToken.token = null
  }

  const loginPath = (isTauri() && import.meta.env.DEV) ? '/kkk/login' : (isTauri() ? '/login' : '/kkk/login')

  if (window.location.pathname === loginPath) {
    if (token) {
      toast.error('登录会话过期，请重新登录', { duration: 2000 })
    }
    setTimeout(() => {
      isRedirecting = false
    }, 2000)
    return
  }

  toast.error(message)
  setTimeout(() => {
    toast.error('3秒后将跳转到登录界面')
  }, 3000)

  setTimeout(() => {
    isRedirecting = false
    /** 如果当前页面已经是登录页面，则不进行跳转 */
    if (window.location.pathname === loginPath) return
    // 在跳转前再次检查是否已经有了新的token
    if (getAccessToken()) {
      return
    }
    window.location.href = loginPath
  }, 5000)
}

/** 清除本地认证数据 */
const clearLocalAuthData = () => {
  cacheToken.token = null
  cacheToken.userId = null
  clearAccessToken()
  clearRefreshToken()
  clearUserId()
}

/**
 * 获取token和userId 优先从缓存中获取
 */
export const getToken = (): { token: string | null; userId: string | null } => {
  if (cacheToken.token && cacheToken.userId) {
    return cacheToken
  }

  const token = getAccessToken()
  const userId = getUserId()

  cacheToken.token = token
  cacheToken.userId = userId

  return { token, userId }
}

/** 处理认证相关错误 */
const handleAuthError = async (error: any) => {
  const config = error?.config
  if (!config) return false

  if (isRedirecting) return false

  const status = isTauri()
    ? error?.response?.data?.code
    : error?.response?.status

  switch (status) {
    /** 访问令牌过期 */
    case 419: {
      // 如果是第一次请求失败（没有_retry标记）
      if (!config._retry) {
        config._retry = true

        // 如果已经在刷新token，将请求添加到队列
        if (isRefreshingToken) {
          return new Promise((resolve, reject) => {
            pendingRequests.push({ config, resolve, reject })
          })
        }

        const result = await refreshAccessToken()
        if (result) {
          // 更新配置中的token
          const { token } = getToken()
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }

          // 根据环境选择请求方式
          return isTauri()
            ? await tauriRequest(config.url, config)
            : await getRequestInstance().request(config)
        }
      }

      // 只有在确认刷新失败后才跳转登录页
      if (!isRefreshingToken) {
        redirectToLogin('登录信息过期')
      }
      break
    }
    /** 刷新令牌过期 */
    case 420:
      // 清理认证数据并重定向
      clearLocalAuthData()
      redirectToLogin('登录信息已过期')
      break
    /** 未授权 */
    case 401: {
      // 如果token正在刷新，不立即跳转，将请求加入队列
      if (isRefreshingToken) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ config, resolve, reject })
        })
      }

      // 检查是否有token
      const { token } = getToken()
      if (!token) {
        redirectToLogin('登录信息已失效')
      } else {
        // 只有在没有重试过的情况下才尝试刷新token
        if (!config._retry) {
          config._retry = true
          const result = await refreshAccessToken()
          if (result) {
            // 更新配置中的token
            const newToken = getToken().token
            if (newToken) {
              config.headers['Authorization'] = `Bearer ${newToken}`
            }

            try {
              return isTauri()
                ? await tauriRequest(config.url, config)
                : await getRequestInstance().request(config)
            } catch {
              // 如果重试后仍然失败，清理数据并重定向
              clearLocalAuthData()
              redirectToLogin('登录信息已失效')
            }
          } else {
            // 刷新失败，清理数据并重定向
            clearLocalAuthData()
            redirectToLogin('登录信息已失效')
          }
        } else {
          // 已经重试过但仍然失败，清理数据并重定向
          clearLocalAuthData()
          redirectToLogin('登录信息已失效')
        }
      }
      break
    }
  }

  return false
}

/**
 * 创建axios实例（用于Web模式）
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    timeout: 10000,
    baseURL: '/'
  })

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    // 如果正在刷新token，并且不是刷新token的请求本身
    if (isRefreshingToken && !config.url?.includes('/api/v1/refresh')) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          config,
          resolve,
          reject,
        })
      })
    }

    const { token, userId } = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    if (userId) {
      config.headers['x-user-id'] = userId
    }

    // 添加多层编码签名逻辑
    if (token && config.url && !config.url.includes('/v1/refresh')) {
      const timestamp = Date.now().toString()
      const nonce = generateNonce()
      const method = config.method?.toUpperCase() || 'GET'
      const url = config.url
      const body = method === 'GET' ? '' : JSON.stringify(config.data || {})

      const signature = generateSignature(method, url, body, timestamp, nonce, token)

      config.headers['x-signature'] = signature
      config.headers['x-timestamp'] = timestamp
      config.headers['x-nonce'] = nonce
    }

    return config
  })

  // 添加响应拦截器
  instance.interceptors.response.use(
    response => response,
    async error => {
      // 排除登录请求的错误处理
      if (error?.config?.url !== '/api/v1/login') {
        const shouldRetry = await handleAuthError(error)
        if (shouldRetry) {
          return shouldRetry
        }
      }

      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error(error.message)
    }
  )

  return instance
}

/**
 * 创建Tauri代理请求函数
 */
async function tauriRequest<T> (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ServerResponse<T>>> {
  const { token, userId } = getToken()
  const method = config?.method?.toUpperCase() || 'GET'

  // 构建标准请求头
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(config?.headers as Record<string, string> || {})
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (userId) {
    headers['x-user-id'] = userId
  }

  if (token && !url.includes('/v1/refresh')) {
    const timestamp = Date.now().toString()
    const nonce = generateNonce()
    const body = method === 'GET' ? '' : JSON.stringify(config?.data || {})

    const signature = generateSignature(method, url, body, timestamp, nonce, token)

    headers['x-signature'] = signature
    headers['x-timestamp'] = timestamp
    headers['x-nonce'] = nonce
  }

  try {
    const response = await invoke<TauriProxyResponse>('request', {
      request: {
        url,
        method,
        body: config?.data ? JSON.stringify(config.data) : null,
        headers
      }
    })

    const axiosResponse: AxiosResponse<ServerResponse<T>> = {
      data: response.data as ServerResponse<T>,
      status: response.status,
      statusText: response.status_text,
      headers: response.headers,
      config: config || {} as any
    }

    return axiosResponse
  } catch (error: any) {
    // 统一错误处理
    const errorString = String(error || 'Request failed')
    const jsonStartIndex = errorString.indexOf('{')

    if (jsonStartIndex !== -1) {
      const jsonPart = errorString.substring(jsonStartIndex)
      try {
        const errorPayload = JSON.parse(jsonPart)
        const err = new Error(errorPayload.message || '请求发生错误')
          ; (err as any).response = {
            data: errorPayload,
            status: errorPayload.status || 500,
            statusText: errorPayload.status_text || 'Error',
            headers: errorPayload.headers || {},
          }
          ; (err as any).config = config

        // 添加鉴权错误处理
        if (config?.url !== '/api/v1/login') {
          const shouldRetry = await handleAuthError(err)
          if (shouldRetry) {
            return shouldRetry as AxiosResponse<ServerResponse<T>>
          }
        }

        throw err
      } catch (e) {
        // 如果不是 JSON 格式的错误，直接抛出
        if (e instanceof Error && e.message.includes('请求发生错误')) {
          throw e
        }
        throw new Error(errorString)
      }
    }

    throw new Error(errorString)
  }
}

// 创建统一的请求实例
let axiosInstance: AxiosInstance | null = null

/**
 * 获取请求实例
 */
function getRequestInstance (): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance()
  }
  return axiosInstance
}

/**
 * 统一的请求方法
 */
export const request: ServerRequest = {
  ...getRequestInstance(),

  serverGet: async <T> (url: string, config?: AxiosRequestConfig): Promise<T> => {
    if (isTauri()) {
      const response = await tauriRequest<T>(url, { ...config, method: 'GET' })

      // 检查业务状态码，如果是鉴权错误，构造错误对象让拦截器处理
      if (response.data && typeof response.data === 'object' && 'code' in response.data) {
        const businessCode = (response.data as any).code
        if (businessCode === 401 || businessCode === 419 || businessCode === 420) {
          const authError = {
            response: {
              data: { code: businessCode, message: '鉴权失败' },
              status: response.status,
              statusText: response.statusText,
              headers: response.headers
            },
            config: { ...config, url, method: 'GET' }
          }

          // 排除登录请求，避免无限循环
          if (url !== '/api/v1/login') {
            const retryResult = await handleAuthError(authError)
            if (retryResult) {
              return (retryResult as AxiosResponse<ServerResponse<T>>).data.data
            }
          }

          throw new Error('鉴权失败')
        }
      }

      return response.data.data
    } else {
      const instance = getRequestInstance()
      const response = await instance.get<unknown, AxiosResponse<ServerResponse<T>>>(url, config)
      return response.data.data
    }
  },

  serverPost: async <T, R> (url: string, data?: R, config?: AxiosRequestConfig): Promise<T> => {
    if (isTauri()) {
      const response = await tauriRequest<T>(url, { ...config, method: 'POST', data })

      // 检查业务状态码，如果是鉴权错误，构造错误对象让拦截器处理
      if (response.data && typeof response.data === 'object' && 'code' in response.data) {
        const businessCode = (response.data as any).code
        if (businessCode === 401 || businessCode === 419 || businessCode === 420) {
          const authError = {
            response: {
              data: { code: businessCode, message: '鉴权失败' },
              status: response.status,
              statusText: response.statusText,
              headers: response.headers
            },
            config: { ...config, url, method: 'POST', data }
          }

          // 排除登录请求，避免无限循环
          if (url !== '/api/v1/login') {
            const retryResult = await handleAuthError(authError)
            if (retryResult) {
              return (retryResult as AxiosResponse<ServerResponse<T>>).data.data
            }
          }

          throw new Error('鉴权失败')
        }
      }

      return response.data.data
    } else {
      const instance = getRequestInstance()
      const response = await instance.post<R, AxiosResponse<ServerResponse<T>>>(url, data, config)
      return response.data.data
    }
  }
} as ServerRequest

export default request