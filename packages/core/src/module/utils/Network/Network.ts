import { logger } from 'node-karin'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType
} from 'node-karin/axios'
import axios, { AxiosError } from 'node-karin/axios'

import { NetworksConfigType } from '@/types'

import { BASE_HEADERS } from './constants'
import { Downloader } from './Downloader'
import { getErrorDescription, isRecoverableNetworkError, sanitizeHeaders } from './helpers'
import type { CustomAxiosRequestConfig, DownloadResult, ProgressCallback, ThrottleConfig } from './types'

const isSuccessfulProbeStatus = (status: number): boolean => status >= 200 && status < 400

const releaseResponseData = (response?: AxiosResponse): void => {
  const data = response?.data as { destroy?: () => void, resume?: () => void } | undefined
  if (!data) return

  try {
    data.resume?.()
  } catch {
    // ignore stream cleanup failure
  }

  try {
    data.destroy?.()
  } catch {
    // ignore stream cleanup failure
  }
}

/**
 * 网络请求类
 * 支持常规请求、文件下载（带限速和断点续传）、重定向跟踪等功能
 */
export class Network {
  private url: string
  private method: string
  private headers: Record<string, string>
  private type: ResponseType
  private body?: any
  private axiosInstance: AxiosInstance
  private timeout: number
  private filepath: string
  private maxRetries: number
  private throttleConfig?: Partial<ThrottleConfig>

  /**
   * 创建网络请求实例
   *
   * @remarks
   * 实例会自动处理可恢复的网络错误（如连接超时、重置等），并进行指数退避重试。
   * 默认重试 3 次，可通过 `maxRetries` 配置。
   * 支持限速下载，避免触发服务器风控。
   *
   * @param data - 配置对象
   */
  constructor (data: NetworksConfigType & { throttle?: Partial<ThrottleConfig> }) {
    this.headers = data.headers
      ? Object.fromEntries(
        Object.entries(data.headers).map(([key, value]) => [key, String(value)])
      )
      : {}

    // 合并默认头
    this.headers = {
      ...Object.fromEntries(
        Object.entries(BASE_HEADERS ?? {}).map(([key, value]) => [key, String(value)])
      ),
      ...this.headers
    }

    this.url = data.url ?? ''
    this.type = data.type ?? 'json'
    this.method = data.method ?? 'GET'
    this.body = data.body ?? null
    this.timeout = data.timeout ?? 15000
    this.filepath = data.filepath ?? ''
    this.maxRetries = data.maxRetries ?? 3
    this.throttleConfig = data.throttle

    // 创建 axios 实例
    this.axiosInstance = axios.create({
      timeout: this.timeout,
      headers: this.headers,
      maxRedirects: 5,
      validateStatus: () => true
    })

    // 添加响应拦截器处理重试
    this.axiosInstance.interceptors.response.use(undefined, async (error) => {
      const config = error.config as CustomAxiosRequestConfig
      if (!config || config.skipRetry) {
        return Promise.reject(error)
      }

      config.__retryCount = config.__retryCount || 0

      if (config.__retryCount >= this.maxRetries) {
        return Promise.reject(error)
      }

      if (!isRecoverableNetworkError(error)) {
        return Promise.reject(error)
      }

      config.__retryCount += 1

      const nextDelay = Math.max(1000, Math.min(2 ** (config.__retryCount - 1) * 1000, 8000))
      logger.warn(`[karin-plugin-kkk] axios 实例请求失败，正在重试... (${config.__retryCount}/${this.maxRetries})，将在 ${nextDelay / 1000} 秒后重试`)

      await new Promise(resolve => setTimeout(resolve, nextDelay))
      return this.axiosInstance(config)
    })
  }

  get config (): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      url: this.url,
      method: this.method,
      headers: this.headers,
      responseType: this.type
    }

    if (this.method === 'POST' && this.body) {
      config.data = this.body
    }

    return config
  }

  /**
   * 下载文件流
   * 支持断点续传、限速下载、自动重试
   *
   * @param progressCallback 进度回调函数
   * @param retryCount 重试次数（内部使用）
   */
  async downloadStream (
    progressCallback: ProgressCallback,
    retryCount = 0
  ): Promise<DownloadResult> {
    const downloader = new Downloader(
      this.axiosInstance,
      this.url,
      this.filepath,
      this.headers,
      this.timeout,
      this.maxRetries,
      this.throttleConfig
    )

    return downloader.download(progressCallback, retryCount)
  }

  async getfetch (): Promise<AxiosResponse | boolean> {
    try {
      return await this.returnResult()
    } catch (error) {
      logger.info(error)
      return false
    }
  }

  async returnResult (): Promise<AxiosResponse> {
    let response = {} as AxiosResponse
    try {
      response = await this.axiosInstance(this.config)
    } catch (error) {
      logger.error(error)
    }
    return response
  }

  /** 获取最终地址（跟随重定向） */
  async getLongLink (url = '', depth = 0): Promise<string> {
    const MAX_REDIRECTS = 10
    
    if (depth > MAX_REDIRECTS) {
      throw new Error(`重定向次数超过限制 (${MAX_REDIRECTS})`)
    }

    const targetUrl = this.url || url
    try {
      new URL(targetUrl)
    } catch {
      const sanitized = sanitizeHeaders(this.headers)
      throw new Error(`Invalid URL: ${targetUrl || '(empty)'}, Headers: ${JSON.stringify(sanitized)}`)
    }

    const methods = ['head', 'get'] as const
    let lastError: Error | null = null

    for (const method of methods) {
      try {
        const response = await this.axiosInstance.request({
          url: targetUrl,
          method,
          maxRedirects: 5,
          validateStatus: isSuccessfulProbeStatus,
          responseType: 'stream',
          headers: method === 'get' ? { ...this.headers, Range: 'bytes=0-0' } : this.headers,
          skipRetry: true
        } as CustomAxiosRequestConfig)

        const finalUrl =
          (response.request as any)?.res?.responseUrl ??
          (response.config as any)?.url ??
          targetUrl
        releaseResponseData(response)
        return finalUrl
      } catch (error) {
        const axiosError = error as AxiosError
        releaseResponseData(axiosError.response as AxiosResponse | undefined)

        // 处理所有重定向状态码
        const redirectStatuses = [301, 302, 303, 307, 308]
        if (
          axiosError.response?.status && 
          redirectStatuses.includes(axiosError.response.status) &&
          axiosError.response.headers?.location
        ) {
          const location = axiosError.response.headers.location
          
          // 处理相对路径重定向
          const redirectUrl = location.startsWith('http') 
            ? location 
            : new URL(location, targetUrl).href
          
          logger.info(`检测到${axiosError.response.status}重定向 (深度: ${depth + 1}), 目标: ${redirectUrl}`)
          return await this.getLongLink(redirectUrl, depth + 1)
        }

        if (method === 'head') {
          logger.debug(`HEAD 请求失败 (${axiosError.code || axiosError.message})，尝试 GET 请求`)
          lastError = axiosError
          continue
        }

        lastError = axiosError
      }
    }

    const sanitized = sanitizeHeaders(this.headers)
    const errorDesc = getErrorDescription(lastError)
    const msg = `获取链接重定向失败: ${targetUrl} - ${errorDesc}, Headers: ${JSON.stringify(sanitized)}`
    logger.error(msg)
    throw new Error(msg)
  }

  /** 获取首个302链接 */
  async getLocation (): Promise<AxiosResponse['headers']['location']> {
    try {
      const response = await this.axiosInstance({
        method: 'GET',
        url: this.url,
        maxRedirects: 0,
        validateStatus: (status: number) => status >= 300 && status < 400
      })
      return response.headers.location as string
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const sanitized = sanitizeHeaders(this.headers)
        logger.error(`获取 ${this.url} 重定向地址失败，接口响应状态码: ${error.response?.status}, Headers: ${JSON.stringify(sanitized)}`)
        throw new Error(error.stack)
      }
    }
  }

  /** 获取数据并处理格式化，默认 json */
  async getData (): Promise<AxiosResponse['data'] | boolean> {
    try {
      const result = await this.returnResult()
      if (result.status === 504) {
        return result
      }
      if (result.status === 429) {
        logger.error('HTTP 响应状态码: 429')
        throw new Error('ratelimit triggered, 触发 https://www.douyin.com/ 的速率限制！！！')
      }
      return result.data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const sanitized = sanitizeHeaders(this.headers)
        const errorDesc = getErrorDescription(error)
        throw new Error(`${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`)
      }
      return false
    }
  }

  /**
   * 获取响应头信息（仅首个字节）
   * 适用于获取视频流的完整大小
   */
  async getHeaders (): Promise<AxiosResponse['headers']> {
    const probeConfigs: Array<{ label: string, config: CustomAxiosRequestConfig }> = [
      {
        label: 'HEAD',
        config: {
          ...this.config,
          method: 'HEAD',
          responseType: 'stream',
          skipRetry: true
        }
      },
      {
        label: 'GET_RANGE',
        config: {
          ...this.config,
          method: 'GET',
          responseType: 'stream',
          headers: {
            ...this.config.headers,
            Range: 'bytes=0-0'
          },
          skipRetry: true
        }
      },
      {
        label: 'GET_FULL',
        config: {
          ...this.config,
          method: 'GET',
          responseType: 'stream',
          skipRetry: true
        }
      }
    ]

    let lastError: unknown = null

    for (const probe of probeConfigs) {
      try {
        const response = await this.axiosInstance(probe.config)
        if (isSuccessfulProbeStatus(response.status)) {
          releaseResponseData(response)
          return response.headers
        }

        releaseResponseData(response)
        lastError = new Error(`${probe.label} 返回了 HTTP ${response.status}`)
        logger.debug(`[karin-plugin-kkk] ${probe.label} 获取响应头返回 HTTP ${response.status}，继续尝试备用探测方案`)
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          if (
            status &&
            isSuccessfulProbeStatus(status) &&
            error.response?.headers &&
            Object.keys(error.response.headers).length > 0
          ) {
            releaseResponseData(error.response as AxiosResponse)
            logger.warn(`[karin-plugin-kkk] ${probe.label} 在读取响应体时被中断，已回退为直接使用已收到的响应头`)
            return error.response.headers
          }
        }

        if (error instanceof AxiosError) {
          releaseResponseData(error.response as AxiosResponse | undefined)
          logger.debug(`[karin-plugin-kkk] ${probe.label} 获取响应头失败: ${getErrorDescription(error)}`)
        }

        lastError = error
      }
    }

    if (lastError instanceof AxiosError) {
      const sanitized = sanitizeHeaders(this.headers)
      const errorDesc = getErrorDescription(lastError)
      const errorMsg = `获取响应头失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`
      logger.error(errorMsg)
      throw new Error(errorMsg)
    }

    logger.error(lastError)
    throw lastError
  }

  /**
   * 获取响应头信息（完整）
   */
  async getHeadersFull (): Promise<AxiosResponse['headers']> {
    try {
      const response = await this.axiosInstance({
        ...this.config,
        method: 'GET',
        responseType: 'stream'
      })
      releaseResponseData(response)
      return response.headers
    } catch (error) {
      if (error instanceof AxiosError) {
        releaseResponseData(error.response as AxiosResponse | undefined)
        const sanitized = sanitizeHeaders(this.headers)
        const errorDesc = getErrorDescription(error)
        const errorMsg = `获取完整响应头失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`
        logger.error(errorMsg)
        throw new Error(errorMsg)
      }
      logger.error(error)
      throw error
    }
  }
}
