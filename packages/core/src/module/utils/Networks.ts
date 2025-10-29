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

type HeadersObject = Record<string, string>

export const baseHeaders: AxiosRequestConfig['headers'] = {
  Accept: '*/*',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0'
}
export class Networks {
  private url: string
  private method: string
  private headers: HeadersObject
  private type: ResponseType
  private body?: any
  private axiosInstance: AxiosInstance
  private timeout: number
  private filepath: string
  private maxRetries: number

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
   * 异步下载流方法
   *
   * @param progressCallback 下载进度回调函数，接收已下载字节数和总字节数作为参数
   * @param retryCount 重试次数，默认为0
   * @returns 返回一个Promise，解析为包含文件路径和总字节数的对象
   *
   * 此函数通过axios库发送HTTP请求，下载指定URL的资源，并将下载的资源流保存到本地文件系统中
   * 它还提供了一个回调函数来报告下载进度，并在下载失败时根据配置自动重试
   */
  async downloadStream (
    progressCallback: (downloadedBytes: number, totalBytes: number) => void,
    retryCount = 0): Promise<{ filepath: string; totalBytes: number }> {
    if (retryCount > 0 && this.maxRetries === 0) {
      this.maxRetries = retryCount
      retryCount = 0
    }

    // URL 早期校验
    if (!this.url || !/^https?:\/\//i.test(this.url)) {
      throw new Error(`Invalid URL: ${this.url || '(empty)'}`)
    }
    // 文件路径校验
    if (!this.filepath) {
      throw new Error('未指定文件保存路径: filepath 为空')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    let intervalId: NodeJS.Timeout | null = null

    try {
      logger.debug('开始下载流', {
        ...this.config,
        responseType: 'stream',
        signal: controller.signal
      })
      const response = await this.axiosInstance({
        ...this.config,
        responseType: 'stream',
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      // 解析内容长度
      const rawContentLength = response.headers['content-length']
      const totalBytes = Number.parseInt(rawContentLength ?? '-1', 10)
      if (Number.isNaN(totalBytes)) {
        throw new Error('无效的 content-length 响应头')
      }

      let downloadedBytes = 0
      let lastPrintedPercentage = -1
      const writer = fs.createWriteStream(this.filepath)

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

      if (error instanceof AxiosError) {
        logger.error(`请求在 ${this.timeout / 1000} 秒后超时或失败: ${error.message}`)
      } else {
        logger.error('下载失败:', error)
      }

      // 指数退避，1s 起，8s 封顶
      const nextDelay = Math.max(1000, Math.min(2 ** retryCount * 1000, 8000))

      if (retryCount < this.maxRetries) {
        logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1000} 秒后重试`)
        await new Promise(resolve => setTimeout(resolve, nextDelay))
        return this.downloadStream(progressCallback, retryCount + 1)
      } else {
        throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  }

  async getfetch (): Promise<AxiosResponse | boolean> {
    try {
      const result = await this.returnResult()
      if (result.status === 504) {
        return result
      }
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
      throw new Error(`Invalid URL: ${targetUrl || '(empty)'}`)
    }

    try {
      // 使用 HEAD 请求只获取响应头，避免下载整个视频流
      const response = await this.axiosInstance.head(targetUrl, {
        maxRedirects: 5,
        validateStatus: (status) => status >= 200 && status < 400
      })
      const finalUrl =
        (response.request as any)?.res?.responseUrl ??
        (response.config as any)?.url ??
        targetUrl
      return finalUrl
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 302 && axiosError.response.headers?.location) {
        const redirectUrl = axiosError.response.headers.location
        logger.info(`检测到302重定向，目标地址: ${redirectUrl}`)
        return await this.getLongLink(redirectUrl)
      }

      const msg = `获取链接重定向失败: ${targetUrl} - ${axiosError.message}`
      logger.error(msg)
      throw new Error(msg)
    }
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
        logger.error(`获取 ${this.url} 重定向地址失败，接口响应状态码: ${error.response?.status}`)
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
        throw new Error(error.stack ?? error.message)
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
      logger.error(error)
      throw error
    }
  }
}
