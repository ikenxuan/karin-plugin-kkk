/**
 * Network 模块
 * 提供网络请求、文件下载（支持限速和断点续传）等功能
 */

export { BASE_HEADERS } from './constants'
export { Downloader } from './Downloader'
export {
  calculateBackoffDelay,
  formatBytes,
  getErrorDescription,
  isRecoverableNetworkError,
  isThrottlingError,
  sanitizeFilename,
  sanitizeHeaders
} from './helpers'
export type { ImageDownloadResult } from './ImageDownloader'
export { ImageDownloader } from './ImageDownloader'
export { Network } from './Network'
// 为了向后兼容，同时导出 Networks 别名
export { Network as Networks } from './Network'
export { ThrottleStream } from './ThrottleStream'
export type {
  CustomAxiosRequestConfig,
  DownloadResult,
  ProgressCallback,
  ThrottleConfig
} from './types'
export { DEFAULT_THROTTLE_CONFIG } from './types'

// 为了向后兼容，导出 baseHeaders 别名
export { BASE_HEADERS as baseHeaders } from './constants'
