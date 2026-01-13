import type { AxiosRequestConfig } from 'node-karin/axios'

/**
 * 扩展 AxiosRequestConfig 以支持内部重试计数和跳过重试
 */
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  __retryCount?: number
  skipRetry?: boolean
}

/**
 * 下载进度回调函数类型
 */
export type ProgressCallback = (downloadedBytes: number, totalBytes: number) => void

/**
 * 下载结果类型
 */
export interface DownloadResult {
  filepath: string
  totalBytes: number
}

/**
 * 限速配置
 */
export interface ThrottleConfig {
  /** 是否启用限速，默认 true */
  enabled: boolean
  /** 最大下载速度 (bytes/s)，默认 10MB/s */
  maxSpeed: number
  /** 检测到断流后自动降速的比例，默认 0.7 (降到 70%) */
  autoReduceRatio: number
  /** 最小速度限制 (bytes/s)，默认 1MB/s */
  minSpeed: number
}

/**
 * 默认限速配置
 */
export const DEFAULT_THROTTLE_CONFIG: ThrottleConfig = {
  enabled: true,
  maxSpeed: 10 * 1024 * 1024, // 10 MB/s
  autoReduceRatio: 0.7,
  minSpeed: 1 * 1024 * 1024 // 1 MB/s
}
