import { ResponseType } from 'node-karin/axios'

import { downLoadFileOptions } from '@/module'

/**
 * 限速配置
 */
export interface ThrottleConfig {
  /** 是否启用限速，默认 true */
  enabled?: boolean
  /** 最大下载速度 (bytes/s)，默认 10MB/s */
  maxSpeed?: number
  /** 检测到断流后自动降速的比例，默认 0.7 (降到 70%) */
  autoReduceRatio?: number
  /** 最小速度限制 (bytes/s)，默认 1MB/s */
  minSpeed?: number
}

export interface NetworksConfigType {
  /**
   * 请求地址
   */
  url?: string
  /**
   * 请求方法
   */
  method?: string
  /**
   * 请求头
   */
  headers?: downLoadFileOptions['headers']
  /**
   * 返回数据类型，默认json
   */
  type?: ResponseType
  /**
   * 请求体
   */
  body?: string
  /**
   * 超时时间，单位毫秒
   */
  timeout?: number
  /**
   * 默认跟随重定向到: 'follow'，不跟随: manual
   */
  redirect?: RequestRedirect
  /**
   * 文件保存路径
   */
  filepath?: string
  /**
   * 最大重试请求次数
   */
  maxRetries?: number
  /**
   * 限速配置，用于规避服务器风控
   * 当下载速度过快导致连接被重置时，会自动降速重试
   */
  throttle?: ThrottleConfig
}
