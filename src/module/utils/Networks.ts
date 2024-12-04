import fs from 'node:fs'

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios'
import { logger } from 'node-karin'
import { pipeline } from 'stream/promises'

import { NetworksConfigType } from '@/types'

type HeadersObject = Record<string, string>;

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
    this.headers = data.headers || {}
    this.url = data.url ?? ''
    this.type = data.type ?? 'json'
    this.method = data.method ?? 'GET'
    this.body = data.body ?? null
    this.timeout = data.timeout ?? 5000
    this.filepath = data.filepath ?? ''
    this.maxRetries = 0

    // 创建axios实例
    this.axiosInstance = axios.create({
      timeout: this.timeout,
      headers: this.headers,
      maxRedirects: 5,
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 406 || (status >= 500)
      }
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
    // 创建一个中止控制器，用于在请求超时时中止请求
    const controller = new AbortController()
    // 设置一个定时器，如果请求超过预定时间，则中止请求
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      // 使用axios库发送HTTP请求，获取资源流
      const response = await axios({
        ...this.config,
        url: this.url,
        responseType: 'stream',
        signal: controller.signal
      })

      // 清除中止请求的定时器
      clearTimeout(timeoutId)

      // 检查HTTP响应状态码，如果状态码不在200到299之间，则抛出错误
      if (! (response.status >= 200 && response.status < 300)) {
        throw new Error(`无法获取 ${this.url}。状态: ${response.status} ${response.statusText}`)
      }

      // 解析响应头中的content-length，以获取资源的总字节大小
      const totalBytes = parseInt(response.headers['content-length'] ?? '0', 10)
      // 如果无法解析content-length，则抛出错误
      if (isNaN(totalBytes)) {
        throw new Error('无效的 content-length 头')
      }

      // 初始化已下载字节数和上次打印的进度百分比
      let downloadedBytes = 0
      let lastPrintedPercentage = - 1

      // 创建一个文件写入流，用于将下载的资源保存到本地文件系统
      const writer = fs.createWriteStream(this.filepath)

      // 定义一个函数来打印下载进度
      const printProgress = () => {
        const progressPercentage = Math.floor((downloadedBytes / totalBytes) * 100)
        if (progressPercentage !== lastPrintedPercentage) {
          progressCallback(downloadedBytes, totalBytes)
          lastPrintedPercentage = progressPercentage
        }
      }

      // 根据资源大小决定进度更新的间隔时间
      const interval = totalBytes < 10 * 1024 * 1024 ? 1000 : 500
      // 设置一个定时器，定期调用printProgress函数来更新下载进度
      const intervalId = setInterval(printProgress, interval)

      // 定义一个函数来处理下载的数据块
      const onData = (chunk: string | any[]) => {
        downloadedBytes += chunk.length
      }

      // 在下载的数据流上绑定'data'事件监听器，处理下载的数据块
      response.data.on('data', onData)

      // 使用pipeline函数将下载的数据流管道到文件写入流
      await pipeline(
        response.data,
        writer
      )
      clearInterval(intervalId)
      response.data.off('data', onData)
      // 确保所有写入操作已完成
      writer.end()

      // 返回包含文件路径和总字节数的对象
      return { filepath: this.filepath, totalBytes }
    } catch (error) {
      clearTimeout(timeoutId)

      // 处理请求或下载过程中的错误
      if (error instanceof AxiosError) {
        console.error(`请求在 ${this.timeout / 1000} 秒后超时`)
      } else {
        console.error('下载失败:', error)
      }

      // 如果重试次数小于最大重试次数，则等待一段时间后重试下载
      if (retryCount < this.maxRetries) {
        const delay = Math.min(Math.pow(2, retryCount) * 1000, 1000)
        console.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${delay / 1000} 秒后重试`)
        await new Promise(resolve => setTimeout(resolve, delay))
        return this.downloadStream(progressCallback, retryCount + 1)
      } else {
        // 如果超过最大重试次数，则抛出错误
        throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${error}`)
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
  async getLongLink (): Promise<string> {
    try {
      const response = await this.axiosInstance({
        method: 'GET',
        url: this.url
      })
      return response.request.res.responseUrl // axios中获取最终的请求URL
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.stack)
      }
      return ''
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
   * @returns
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
