/**
 * @deprecated 请使用 './Network' 模块
 * 此文件保留用于向后兼容
 */
export type {
  CustomAxiosRequestConfig,
  DownloadResult,
  ProgressCallback,
  ThrottleConfig
} from './Network'
export {
  BASE_HEADERS,
  baseHeaders,
  DEFAULT_THROTTLE_CONFIG,
  Downloader,
  formatBytes,
  getErrorDescription,
  isRecoverableNetworkError,
  isThrottlingError,
  Network,
  Networks,
  sanitizeHeaders,
  ThrottleStream
} from './Network'
