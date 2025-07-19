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

/**
 * 无感知刷新访问令牌
 */
const refreshAccessToken = async (): Promise<boolean> => {
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
        return false
      }
      /** 刷新访问令牌 */
      const data = await axios.post(
        '/api/v1/refresh',
        { accessToken, refreshToken },
        {
          timeout: 10000,
        }
      )

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
      // 如果刷新失败，但错误不是401或420，不要清除token
      const status = error?.response?.status
      if (status !== 401 && status !== 420) {
        return false
      }
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
const processPendingRequests = (): void => {
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

    request(config)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })

  // 清空队列
  pendingRequests.length = 0
}

/** 处理重定向到登录页 */
const redirectToLogin = (message: string): void => {
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

  if (window.location.pathname === '/login') {
    if (token) {
      toast.error('登录会话过期，请重新登录', { duration: 2000 })
    }
    setTimeout(() => {
      isRedirecting = false
    }, 2000)
    return
  }

  toast.error(`${message}，5秒后将跳转登录界面`, { duration: 5000 })

  setTimeout(() => {
    isRedirecting = false
    /** 如果当前页面已经是登录页面，则不进行跳转 */
    if (window.location.pathname === '/login') return
    // 在跳转前再次检查是否已经有了新的token
    if (getAccessToken()) {
      return
    }
    window.location.href = '/login'
  }, 5000)
}

/** 清除本地认证数据 */
const clearLocalAuthData = (): void => {
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

/**
 * axios实例
 */
export const request: ServerRequest = axios.create({
  timeout: 10000,
}) as ServerRequest

/**
 * 请求拦截器
 * @description 在请求发送前进行统一处理，添加认证信息
 */
request.interceptors.request.use(config => {
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

  return config
})

/** 处理认证相关错误 */
const handleAuthError = async (error: any): Promise<boolean> => {
  const config = error?.config
  if (!config) return false

  if (isRedirecting) return false

  const status = error?.response?.status

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

          return await request(config)
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
        // 尝试刷新token
        config._retry = true
        const result = await refreshAccessToken()
        if (result) {
          // 更新配置中的token
          const newToken = getToken().token
          if (newToken) {
            config.headers['Authorization'] = `Bearer ${newToken}`
          }

          try {
            return await request(config)
          } catch {
            redirectToLogin('登录信息已失效')
          }
        } else {
          redirectToLogin('登录信息已失效')
        }
      }
      break
    }
  }

  return false
}

/**
 * 响应拦截器
 * @description 在响应返回后进行统一处理，包括认证错误处理
 */
request.interceptors.response.use(
  response => response,
  async error => {
    // 对于非登录接口的错误，尝试处理认证错误
    if (error?.config?.url !== '/api/v1/login') {
      const shouldRetry = await handleAuthError(error)
      if (shouldRetry) {
        return await request(error.config)
      }
    }

    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
)

request.serverGet = async <T> (url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await request.get<unknown, AxiosResponse<ServerResponse<T>>>(url, config)
  return response.data.data
}

request.serverPost = async <T, R> (url: string, data: R = {} as R, config?: AxiosRequestConfig): Promise<T> => {
  const response = await request.post<R, AxiosResponse<ServerResponse<T>>>(url, data, config)
  return response.data.data
}

export default request