import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'

import { logger } from 'node-karin'
import type { AxiosInstance } from 'node-karin/axios'
import { AxiosError } from 'node-karin/axios'

import {
  calculateBackoffDelay,
  formatBytes,
  getErrorDescription,
  isRecoverableNetworkError,
  isThrottlingError,
  sanitizeHeaders
} from './helpers'
import { ThrottleStream } from './ThrottleStream'
import type {
  CustomAxiosRequestConfig,
  DownloadResult,
  ProgressCallback,
  ThrottleConfig
} from './types'
import { DEFAULT_THROTTLE_CONFIG } from './types'

/**
 * 文件下载器
 * 支持断点续传、限速下载、自动重试
 */
export class Downloader {
  private axiosInstance: AxiosInstance
  private url: string
  private filepath: string
  private headers: Record<string, string>
  private timeout: number
  private maxRetries: number
  private throttleConfig: ThrottleConfig
  private currentSpeed: number
  private consecutiveResets: number

  constructor (
    axiosInstance: AxiosInstance,
    url: string,
    filepath: string,
    headers: Record<string, string>,
    timeout: number,
    maxRetries: number,
    throttleConfig?: Partial<ThrottleConfig>
  ) {
    this.axiosInstance = axiosInstance
    this.url = url
    this.filepath = filepath
    this.headers = headers
    this.timeout = timeout
    this.maxRetries = maxRetries
    this.throttleConfig = { ...DEFAULT_THROTTLE_CONFIG, ...throttleConfig }
    this.currentSpeed = this.throttleConfig.maxSpeed
    this.consecutiveResets = 0
  }

  /**
   * 执行下载
   * @param progressCallback 进度回调
   * @param retryCount 当前重试次数
   */
  async download (
    progressCallback: ProgressCallback,
    retryCount = 0
  ): Promise<DownloadResult> {
    // URL 校验
    if (!this.url || !/^https?:\/\//i.test(this.url)) {
      const sanitized = sanitizeHeaders(this.headers)
      throw new Error(`Invalid URL: ${this.url || '(empty)'}, Headers: ${JSON.stringify(sanitized)}`)
    }

    if (!this.filepath) {
      throw new Error('未指定文件保存路径: filepath 为空')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    let intervalId: NodeJS.Timeout | null = null
    let throttleStream: ThrottleStream | null = null

    try {
      // 检查断点续传
      let startByte = 0
      if (fs.existsSync(this.filepath)) {
        const stats = fs.statSync(this.filepath)
        startByte = stats.size
        logger.debug(`检测到部分下载文件，从 ${formatBytes(startByte)} 处继续下载`)
      }

      // 构建请求配置
      const requestConfig: CustomAxiosRequestConfig = {
        url: this.url,
        method: 'GET',
        responseType: 'stream',
        signal: controller.signal,
        headers: { ...this.headers },
        skipRetry: true
      }

      // 断点续传
      if (startByte > 0) {
        requestConfig.headers = {
          ...requestConfig.headers,
          Range: `bytes=${startByte}-`
        }
      }

      logger.debug('开始下载流', {
        url: this.url,
        headers: sanitizeHeaders(requestConfig.headers),
        throttleEnabled: this.throttleConfig.enabled,
        currentSpeed: formatBytes(this.currentSpeed) + '/s'
      })

      const response = await this.axiosInstance(requestConfig)
      clearTimeout(timeoutId)

      // 检查服务器是否支持断点续传
      const supportsRange = response.status === 206
      if (startByte > 0 && !supportsRange) {
        logger.warn('服务器不支持断点续传，将重新下载整个文件')
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

      const totalBytes = supportsRange ? startByte + contentLength : contentLength
      let downloadedBytes = startByte
      let lastPrintedPercentage = -1

      // 创建写入流
      const writer = fs.createWriteStream(this.filepath, {
        flags: startByte > 0 ? 'a' : 'w'
      })

      // 进度回调
      const printProgress = () => {
        if (totalBytes > 0) {
          const progressPercentage = Math.floor((downloadedBytes / totalBytes) * 100)
          if (progressPercentage !== lastPrintedPercentage) {
            progressCallback(downloadedBytes, totalBytes)
            lastPrintedPercentage = progressPercentage
          }
        } else {
          progressCallback(downloadedBytes, totalBytes)
        }
      }

      const interval = totalBytes > 0 && totalBytes < 10 * 1024 * 1024 ? 1000 : 500
      intervalId = setInterval(printProgress, interval)

      // 数据计数
      const onData = (chunk: Buffer | string) => {
        downloadedBytes += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk)
      }

      response.data.on('data', onData)

      // 根据配置决定是否使用限速流
      if (this.throttleConfig.enabled) {
        throttleStream = new ThrottleStream(this.currentSpeed)
        logger.debug(`启用限速下载: ${formatBytes(this.currentSpeed)}/s`)
        await pipeline(response.data, throttleStream, writer)
      } else {
        await pipeline(response.data, writer)
      }

      if (intervalId) clearInterval(intervalId)
      response.data.off('data', onData)
      writer.end()

      // 下载成功，重置连续重置计数
      this.consecutiveResets = 0

      return {
        filepath: this.filepath,
        totalBytes: totalBytes > 0 ? totalBytes : downloadedBytes
      }
    } catch (error) {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)

      const isRecoverable = isRecoverableNetworkError(error)
      const isThrottling = isThrottlingError(error)
      const errorDesc = getErrorDescription(error)

      if (error instanceof AxiosError) {
        const sanitized = sanitizeHeaders(this.headers)
        logger.error(`请求失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`)
      } else {
        logger.error(`下载失败: ${errorDesc}`)
      }

      // 如果是断流错误，自动降速
      if (isThrottling && this.throttleConfig.enabled) {
        this.consecutiveResets++
        const newSpeed = Math.max(
          this.currentSpeed * this.throttleConfig.autoReduceRatio,
          this.throttleConfig.minSpeed
        )
        
        if (newSpeed < this.currentSpeed) {
          logger.warn(`检测到服务器断流 (连续 ${this.consecutiveResets} 次)，自动降速: ${formatBytes(this.currentSpeed)}/s -> ${formatBytes(newSpeed)}/s`)
          this.currentSpeed = newSpeed
        } else {
          logger.warn(`已达到最低速度限制 ${formatBytes(this.throttleConfig.minSpeed)}/s，无法继续降速`)
        }
      }

      const nextDelay = calculateBackoffDelay(retryCount)

      if (retryCount < this.maxRetries) {
        if (isRecoverable && fs.existsSync(this.filepath)) {
          const stats = fs.statSync(this.filepath)
          logger.warn(`检测到可恢复的网络错误，保留已下载的 ${formatBytes(stats.size)} 数据`)
          logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1000} 秒后使用断点续传重试`)
        } else {
          logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1000} 秒后重试`)
        }

        await new Promise(resolve => setTimeout(resolve, nextDelay))
        return this.download(progressCallback, retryCount + 1)
      } else {
        // 最终失败处理
        if (fs.existsSync(this.filepath)) {
          const stats = fs.statSync(this.filepath)

          if (isRecoverable && stats.size > 0) {
            logger.warn(`下载失败但保留了部分文件 (${formatBytes(stats.size)}): ${this.filepath}`)
            logger.warn('这可能是由于网络环境变化或服务器风控导致的，文件已保留供后续恢复')
            
            if (isThrottling) {
              logger.warn('建议: 服务器可能有下载速度限制，请尝试在配置中降低 maxSpeed 参数')
            }
          } else {
            try {
              fs.unlinkSync(this.filepath)
              logger.debug('已清理部分下载的文件')
            } catch (cleanupError) {
              logger.warn('清理部分下载文件失败:', cleanupError)
            }
          }
        }

        const sanitized = sanitizeHeaders(this.headers)
        throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`)
      }
    }
  }

  /**
   * 手动设置下载速度
   * @param speed 速度 (bytes/s)
   */
  setSpeed (speed: number): void {
    this.currentSpeed = Math.max(speed, this.throttleConfig.minSpeed)
    logger.debug(`手动设置下载速度: ${formatBytes(this.currentSpeed)}/s`)
  }

  /**
   * 获取当前速度设置
   */
  getSpeed (): number {
    return this.currentSpeed
  }
}
