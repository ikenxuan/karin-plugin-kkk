import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'

import { logger } from 'node-karin'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType
} from 'node-karin/axios'
import axios, { AxiosError } from 'node-karin/axios'

import { NetworksConfigType } from '@/types'

/**
 * 扩展 AxiosRequestConfig 以支持内部重试计数和跳过重试
 */
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  __retryCount?: number
  skipRetry?: boolean
}

/**
 * 错误代码到中文描述的映射
 */
const ERROR_CODE_MAP: Record<string, string> = {
  // 网络连接错误
  ECONNRESET: '连接被重置',
  ECONNREFUSED: '连接被拒绝',
  ECONNABORTED: '连接中止',
  ETIMEDOUT: '连接超时',
  ENETUNREACH: '网络不可达',
  EHOSTUNREACH: '主机不可达',
  ENOTFOUND: 'DNS解析失败',
  EPIPE: '管道破裂',
  EAI_AGAIN: 'DNS临时失败',

  // Axios 特定错误代码
  ERR_BAD_OPTION_VALUE: '无效的配置选项值',
  ERR_BAD_OPTION: '无效的配置选项',
  ERR_NETWORK: '网络错误',
  ERR_DEPRECATED: '使用了已弃用的功能',
  ERR_BAD_RESPONSE: '无效的响应',
  ERR_BAD_REQUEST: '无效的请求',
  ERR_CANCELED: '请求被取消',
  ERR_NOT_SUPPORT: '不支持的功能',
  ERR_INVALID_URL: '无效的URL',

  // HTTP 状态码相关
  EHTTP: 'HTTP错误',

  // 其他常见错误
  EACCES: '权限不足',
  ENOENT: '文件或目录不存在',
  EMFILE: '打开的文件过多',
  ENOSPC: '磁盘空间不足'
}

/**
 * 获取错误的中英文描述
 * @param error 错误对象
 * @returns 格式化的错误描述
 */
const getErrorDescription = (error: any): string => {
  // 获取错误代码
  const code = error?.code || (error instanceof AxiosError ? error.code : null)

  // 获取错误消息
  const message = error?.message || String(error)

  if (code && ERROR_CODE_MAP[code]) {
    // 有映射的错误代码，显示中英文
    return `${ERROR_CODE_MAP[code]} (${code}): ${message}`
  } else if (code) {
    // 有错误代码但没有映射
    return `错误代码 ${code}: ${message}`
  } else {
    // 没有错误代码，只显示消息
    return message
  }
}

/**
 * 脱敏处理IP地址
 * @param text 包含IP的文本
 * @returns 脱敏后的文本
 */
const sanitizeIP = (text: string): string => {
  if (!text) return text

  // IPv4 脱敏: 192.168.1.1 -> 192.168.*.*
  text = text.replace(/\b(\d{1,3}\.\d{1,3})\.\d{1,3}\.\d{1,3}\b/g, '$1.*.*')

  // IPv6 脱敏: 2001:0db8:85a3::8a2e:0370:7334 -> 2001:0db8:****
  text = text.replace(/\b([0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}):[0-9a-fA-F:]+\b/g, '$1:****')

  return text
}

/**
 * 脱敏处理敏感请求头信息
 * @param headers 原始请求头
 * @returns 脱敏后的请求头
 */
const sanitizeHeaders = (headers: Record<string, string> | AxiosRequestConfig['headers']): Record<string, string> => {
  if (!headers) return {}

  const sanitized: Record<string, string> = {}
  // 需要完全隐藏的敏感字段
  const sensitiveKeys = ['cookie', 'cookies', 'authorization', 'x-api-key', 'api-key', 'token']
  // 需要进行IP脱敏的字段
  const ipSensitiveKeys = ['x-forwarded-for', 'x-real-ip', 'x-client-ip', 'x-originating-ip']

  for (const [key, value] of Object.entries(headers)) {
    const lowerKey = key.toLowerCase()

    // 完全隐藏敏感信息
    if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
      sanitized[key] = '[敏感信息......]'
    }
    // 对IP相关的header进行IP脱敏
    else if (ipSensitiveKeys.some(sk => lowerKey.includes(sk))) {
      sanitized[key] = sanitizeIP(String(value))
    }
    // 其他header保持原样
    else {
      sanitized[key] = String(value)
    }
  }

  return sanitized
}

export const baseHeaders: AxiosRequestConfig['headers'] = {
  Accept: '*/*',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0'
}
export class Networks {
  private url: string
  private method: string
  private headers: Record<string, string>
  private type: ResponseType
  private body?: any
  private axiosInstance: AxiosInstance
  private timeout: number
  private filepath: string
  /** 最大重试次数，默认为 3 */
  private maxRetries: number

  /**
   * 创建网络请求实例
   * 
   * @remarks
   * 实例会自动处理可恢复的网络错误（如连接超时、重置等），并进行指数退避重试。
   * 默认重试 3 次，可通过 `maxRetries` 配置。
   * 
   * @param data - 配置对象
   */
  constructor (data: NetworksConfigType) {
    this.headers = data.headers
      ? Object.fromEntries(
        Object.entries(data.headers).map(([key, value]) => [key, String(value)])
      )
      : {}

    // 合并默认头确保 UA 等始终存在
    this.headers = {
      ...Object.fromEntries(
        Object.entries(baseHeaders ?? {}).map(([key, value]) => [key, String(value)])
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

    // 创建axios实例
    this.axiosInstance = axios.create({
      timeout: this.timeout,
      headers: this.headers,
      maxRedirects: 5,
      validateStatus: () => true
    })

    // 添加响应拦截器处理重试
    this.axiosInstance.interceptors.response.use(undefined, async (error) => {
      const config = error.config as CustomAxiosRequestConfig
      // 如果没有配置或设置了 skipRetry，则直接抛出错误
      if (!config || config.skipRetry) {
        return Promise.reject(error)
      }

      // 初始化重试计数
      config.__retryCount = config.__retryCount || 0

      // 检查是否达到最大重试次数
      if (config.__retryCount >= this.maxRetries) {
        return Promise.reject(error)
      }

      // 检查是否为可恢复的错误
      if (!this.isRecoverableNetworkError(error)) {
        return Promise.reject(error)
      }

      // 增加重试计数
      config.__retryCount += 1

      // 计算指数退避延迟
      const nextDelay = Math.max(1000, Math.min(2 ** (config.__retryCount - 1) * 1000, 8000))
      logger.warn(`请求失败，正在重试... (${config.__retryCount}/${this.maxRetries})，将在 ${nextDelay / 1000} 秒后重试`)

      // 等待延迟
      await new Promise(resolve => setTimeout(resolve, nextDelay))

      // 重试请求
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
   * 判断错误是否为可恢复的网络错误（适合断点续传）
   * @param error 错误对象
   * @returns 是否为可恢复错误
   */
  private isRecoverableNetworkError (error: any): boolean {
    // 可恢复的错误代码列表
    const recoverableErrorCodes = [
      'ECONNRESET', // 连接被重置（代理切换、网络切换）
      'ETIMEDOUT', // 连接超时
      'ECONNREFUSED', // 连接被拒绝
      'ENOTFOUND', // DNS解析失败
      'ENETUNREACH', // 网络不可达
      'EHOSTUNREACH', // 主机不可达
      'EPIPE', // 管道破裂
      'EAI_AGAIN', // DNS临时失败
      'ECONNABORTED' // 连接中止
    ]

    // 检查错误代码
    if (error?.code && recoverableErrorCodes.includes(error.code)) {
      return true
    }

    // 检查 AxiosError 的特定情况
    if (error instanceof AxiosError) {
      // 检查是否为网络错误
      if (error.code && recoverableErrorCodes.includes(error.code)) {
        return true
      }

      // 检查错误消息中是否包含可恢复的关键词
      const recoverableKeywords = ['aborted', 'timeout', 'network', 'ECONNRESET', 'socket hang up']
      const errorMessage = error.message?.toLowerCase() || ''
      if (recoverableKeywords.some(keyword => errorMessage.includes(keyword.toLowerCase()))) {
        return true
      }
    }

    // 检查普通 Error 对象
    if (error instanceof Error) {
      const errorMessage = error.message?.toLowerCase() || ''
      const recoverableKeywords = ['aborted', 'timeout', 'network', 'ECONNRESET', 'socket hang up']
      if (recoverableKeywords.some(keyword => errorMessage.includes(keyword.toLowerCase()))) {
        return true
      }
    }

    return false
  }

  /**
   * 异步下载流方法
   *
   * @param progressCallback 下载进度回调函数，接收已下载字节数和总字节数作为参数
   * @param retryCount 重试次数，默认为0
   * @returns 返回一个Promise，解析为包含文件路径和总字节数的对象
   *
   * 此函数通过axios库发送HTTP请求，下载指定URL的资源，并将下载的资源流保存到本地文件系统中
   * 它还提供了一个回调函数来报告下载进度，并在下载失败时根据配置自动重试
   * 支持断点续传，重试时从上次中断位置继续下载
   */
  async downloadStream (
    progressCallback: (downloadedBytes: number, totalBytes: number) => void,
    retryCount = 0): Promise<{ filepath: string; totalBytes: number }> {
    // 注意：retryCount 参数用于内部递归重试，外部调用时应使用默认值 0
    // maxRetries 在构造函数中设置，控制最大重试次数

    // URL 早期校验
    if (!this.url || !/^https?:\/\//i.test(this.url)) {
      const sanitized = sanitizeHeaders(this.headers)
      throw new Error(`Invalid URL: ${this.url || '(empty)'}, Headers: ${JSON.stringify(sanitized)}`)
    }
    // 文件路径校验
    if (!this.filepath) {
      throw new Error('未指定文件保存路径: filepath 为空')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    let intervalId: NodeJS.Timeout | null = null

    try {
      // 检查是否存在部分下载的文件（断点续传）
      let startByte = 0
      if (fs.existsSync(this.filepath)) {
        const stats = fs.statSync(this.filepath)
        startByte = stats.size
        logger.debug(`检测到部分下载文件，从 ${startByte} 字节处继续下载`)
      }

      // 构建请求配置，支持 Range 头
      const requestConfig: CustomAxiosRequestConfig = {
        ...this.config,
        responseType: 'stream',
        signal: controller.signal,
        headers: {
          ...this.config.headers
        },
        skipRetry: true // 禁用拦截器重试，使用内部逻辑处理断点续传
      }

      // 如果是断点续传，添加 Range 头
      if (startByte > 0) {
        requestConfig.headers = {
          ...requestConfig.headers,
          Range: `bytes=${startByte}-`
        }
      }

      // 脱敏打印配置
      const logConfig = {
        ...requestConfig,
        headers: sanitizeHeaders(requestConfig.headers)
      }
      logger.debug('开始下载流', logConfig)
      const response = await this.axiosInstance(requestConfig)

      clearTimeout(timeoutId)

      // 检查服务器是否支持断点续传
      const supportsRange = response.status === 206
      if (startByte > 0 && !supportsRange) {
        logger.warn('服务器不支持断点续传，将重新下载整个文件')
        // 删除部分文件，重新下载
        if (fs.existsSync(this.filepath)) {
          fs.unlinkSync(this.filepath)
        }
        startByte = 0
      }

      // 解析内容长度
      const rawContentLength = response.headers['content-length']
      const contentLength = Number.parseInt(rawContentLength ?? '-1', 10)
      if (Number.isNaN(contentLength)) {
        const sanitized = sanitizeHeaders(this.headers)
        throw new Error(`无效的 content-length 响应头, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`)
      }

      // 计算总字节数
      const totalBytes = supportsRange ? startByte + contentLength : contentLength
      let downloadedBytes = startByte
      let lastPrintedPercentage = -1

      // 根据是否断点续传选择写入模式
      const writer = fs.createWriteStream(this.filepath, {
        flags: startByte > 0 ? 'a' : 'w'
      })

      const printProgress = () => {
        if (totalBytes > 0) {
          const progressPercentage = Math.floor((downloadedBytes / totalBytes) * 100)
          if (progressPercentage !== lastPrintedPercentage) {
            progressCallback(downloadedBytes, totalBytes)
            lastPrintedPercentage = progressPercentage
          }
        } else {
          // 不可预知大小时，也回调字节数（百分比省略）
          progressCallback(downloadedBytes, totalBytes)
        }
      }

      const interval = totalBytes > 0 && totalBytes < 10 * 1024 * 1024 ? 1000 : 500
      intervalId = setInterval(printProgress, interval)

      const onData = (chunk: Buffer | string) => {
        // chunk 可能是 Buffer 或 string（rare）；统一按长度累计
        downloadedBytes += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk)
      }

      response.data.on('data', onData)

      await pipeline(response.data, writer)

      if (intervalId) clearInterval(intervalId)
      response.data.off('data', onData)
      writer.end()

      return { filepath: this.filepath, totalBytes: totalBytes > 0 ? totalBytes : downloadedBytes }
    } catch (error) {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)

      // 判断是否为可恢复的网络错误（适合断点续传）
      const isRecoverableError = this.isRecoverableNetworkError(error)

      const errorDesc = getErrorDescription(error)

      if (error instanceof AxiosError) {
        const sanitized = sanitizeHeaders(this.headers)
        logger.error(`请求在 ${this.timeout / 1000} 秒后超时或失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`)
      } else {
        logger.error(`下载失败: ${errorDesc}`)
      }

      // 指数退避，1s 起，8s 封顶
      const nextDelay = Math.max(1000, Math.min(2 ** retryCount * 1000, 8000))

      if (retryCount < this.maxRetries) {
        if (isRecoverableError && fs.existsSync(this.filepath)) {
          const stats = fs.statSync(this.filepath)
          logger.warn(`检测到可恢复的网络错误，保留已下载的 ${(stats.size / 1048576).toFixed(2)} MB 数据`)
          logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1000} 秒后使用断点续传重试`)
        } else {
          logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1000} 秒后重试`)
        }
        await new Promise(resolve => setTimeout(resolve, nextDelay))
        return this.downloadStream(progressCallback, retryCount + 1)
      } else {
        // 最终失败时的处理
        if (fs.existsSync(this.filepath)) {
          const stats = fs.statSync(this.filepath)

          // 如果是可恢复错误且已下载了部分数据，保留文件供用户手动恢复
          if (isRecoverableError && stats.size > 0) {
            logger.warn(`下载失败但保留了部分文件 (${(stats.size / 1048576).toFixed(2)} MB): ${this.filepath}`)
            logger.warn('这可能是由于网络环境变化（如代理切换、VPN切换）导致的，文件已保留供后续恢复')
          } else {
            // 非可恢复错误，清理部分文件
            try {
              fs.unlinkSync(this.filepath)
              logger.debug('已清理部分下载的文件')
            } catch (cleanupError) {
              logger.warn('清理部分下载文件失败:', cleanupError)
            }
          }
        }

        const sanitized = sanitizeHeaders(this.headers)
        const errorDesc = getErrorDescription(error)
        throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`)
      }
    }
  }

  async getfetch (): Promise<AxiosResponse | boolean> {
    try {
      const result = await this.returnResult()
      return result
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

  /** 最终地址（跟随重定向） */
  async getLongLink (url = ''): Promise<string> {
    const targetUrl = this.url || url
    try {
      // 早期校验
      new URL(targetUrl)
    } catch {
      const sanitized = sanitizeHeaders(this.headers)
      throw new Error(`Invalid URL: ${targetUrl || '(empty)'}, Headers: ${JSON.stringify(sanitized)}`)
    }

    // 先尝试 HEAD 请求，失败则 fallback 到 GET
    const methods = ['head', 'get'] as const
    let lastError: Error | null = null

    for (const method of methods) {
      try {
        const response = await this.axiosInstance.request({
          url: targetUrl,
          method,
          maxRedirects: 5,
          validateStatus: (status) => status >= 200 && status < 400,
          // GET 请求时只请求 0 字节，避免下载整个文件
          headers: method === 'get' ? { ...this.headers, Range: 'bytes=0-0' } : this.headers,
          // 跳过重试，避免重复尝试
          skipRetry: true
        } as CustomAxiosRequestConfig)

        const finalUrl =
          (response.request as any)?.res?.responseUrl ??
          (response.config as any)?.url ??
          targetUrl
        return finalUrl
      } catch (error) {
        const axiosError = error as AxiosError

        // 处理 302 重定向
        if (axiosError.response?.status === 302 && axiosError.response.headers?.location) {
          const redirectUrl = axiosError.response.headers.location
          logger.info(`检测到302重定向，目标地址: ${redirectUrl}`)
          return await this.getLongLink(redirectUrl)
        }

        // HEAD 失败时记录并尝试 GET
        if (method === 'head') {
          logger.debug(`HEAD 请求失败 (${axiosError.code || axiosError.message})，尝试 GET 请求`)
          lastError = axiosError
          continue
        }

        // GET 也失败了，抛出错误
        lastError = axiosError
      }
    }

    // 所有方法都失败
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
        maxRedirects: 0, // 禁止跟随重定向
        validateStatus: (status: number) => status >= 300 && status < 400 // 仅处理3xx响应
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

  /** 获取数据并处理数据的格式化，默认json */
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
        const errorMsg = `${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`
        throw new Error(errorMsg)
      }
      return false
    }
  }

  /**
   * 获取响应头信息（仅首个字节）
   * 适用于获取视频流的完整大小
   * @returns 返回响应头信息
   */
  async getHeaders (): Promise<AxiosResponse['headers']> {
    try {
      const response = await this.axiosInstance({
        ...this.config,
        method: 'GET',
        headers: {
          ...this.config.headers,
          Range: 'bytes=0-0'
        }
      })
      return response.headers
    } catch (error) {
      if (error instanceof AxiosError) {
        const sanitized = sanitizeHeaders(this.headers)
        const errorDesc = getErrorDescription(error)
        const errorMsg = `获取响应头失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`
        logger.error(errorMsg)
        throw new Error(errorMsg)
      }
      logger.error(error)
      throw error
    }
  }

  /**
   * 获取响应头信息（完整）
   * @returns
   */
  async getHeadersFull (): Promise<AxiosResponse['headers']> {
    try {
      const response = await this.axiosInstance({
        ...this.config,
        method: 'GET'
      })
      return response.headers
    } catch (error) {
      if (error instanceof AxiosError) {
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
