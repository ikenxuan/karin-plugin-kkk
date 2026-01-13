import type { AxiosRequestConfig } from 'node-karin/axios'

/**
 * 错误代码到中文描述的映射
 */
export const ERROR_CODE_MAP: Record<string, string> = {
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
 * 可恢复的错误代码列表
 */
export const RECOVERABLE_ERROR_CODES = [
  'ECONNRESET', // 连接被重置（代理切换、网络切换、服务器断流）
  'ETIMEDOUT', // 连接超时
  'ECONNREFUSED', // 连接被拒绝
  'ENOTFOUND', // DNS解析失败
  'ENETUNREACH', // 网络不可达
  'EHOSTUNREACH', // 主机不可达
  'EPIPE', // 管道破裂
  'EAI_AGAIN', // DNS临时失败
  'ECONNABORTED' // 连接中止
]

/**
 * 可恢复错误的关键词
 */
export const RECOVERABLE_KEYWORDS = [
  'aborted',
  'timeout',
  'network',
  'ECONNRESET',
  'socket hang up',
  'connection reset'
]

/**
 * 默认请求头
 */
export const BASE_HEADERS: AxiosRequestConfig['headers'] = {
  Accept: '*/*',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0'
}
