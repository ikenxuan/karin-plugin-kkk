import util from 'node:util'

import Client, { type Result } from '@ikenxuan/amagi'
import { logger } from 'node-karin'

import { Config } from './Config'

/**
 * Amagi 错误类，携带原始响应数据
 */
export class AmagiError extends Error {
  code: number
  data: any
  rawError: any

  constructor(code: number, message: string, data: any, rawError: any) {
    super(message)
    this.name = 'AmagiError'
    this.code = code
    this.data = data
    this.rawError = rawError
  }
}

/** 解析库基类 */
export class AmagiBase {
  /** 解析库实例 */
  amagi: ReturnType<typeof Client>

  constructor() {
    const client = this.createAmagiClient()
    this.amagi = this.wrapAmagiClient(client)
  }

  /** 创建解析库实例 */
  protected createAmagiClient = (): ReturnType<typeof Client> => {
    const amagi = Config.amagi
    return Client({
      cookies: amagi.cookies || {},
      request: {
        timeout: amagi.timeout,
        headers: { 'User-Agent': amagi['User-Agent'] },
        proxy: amagi.proxy?.switch ? amagi.proxy : false
      }
    })
  }

  /**
   * 重载配置 - 重新创建 Amagi Client 实例
   */
  reloadConfig() {
    logger.debug('[AmagiClient] 检测到配置变化，正在重载...')
    const client = this.createAmagiClient()
    this.amagi = this.wrapAmagiClient(client)
    logger.debug('[AmagiClient] 配置重载完成')
  }

  /** 包装解析库实例，递归代理所有嵌套对象的方法 */
  protected wrapAmagiClient = (client: ReturnType<typeof Client>): ReturnType<typeof Client> => {
    const createProxy = (target: any): any => {
      return new Proxy(target, {
        get(obj: any, prop: string | symbol) {
          const value = obj[prop]

          if (value && typeof value === 'object' && !Array.isArray(value)) {
            return createProxy(value)
          }

          if (typeof value === 'function') {
            return async (...args: any[]) => {
              const result = await value.apply(obj, args)

              const isResultType = (val: unknown): val is Result<any> => {
                if (!val || typeof val !== 'object') return false
                if (!('success' in val) || typeof (val as any).success !== 'boolean') return false
                if (!('code' in val) || !('message' in val)) return false
                return true
              }

              if (isResultType(result)) {
                if (result.success === true) {
                  return result
                }

                const errMessage = result.message || (result.error as any)?.amagiMessage || '请求失败'
                const errorDetails = util.inspect(
                  { code: result.code, data: result.data, message: errMessage, error: result.error },
                  { depth: 10, colors: true, compact: false, breakLength: 120, showHidden: true }
                )

                const err = new AmagiError(result.code, errorDetails, result.data, result.error)
                throw err
              }

              return result
            }
          }

          return value
        }
      })
    }

    return createProxy(client)
  }
}

/**
 * 软错误码常量
 * Bilibili:
 *   12061 - UP主已关闭评论区
 */
export const SOFT_ERROR_CODES = {
  BILIBILI_COMMENTS_DISABLED: 12061
} as const

/**
 * 调用 amagi fetcher 方法，允许特定错误码不抛出异常而是以 Result 形式返回
 * @param fn - 经过代理包装的 amagi 方法调用
 * @param allowedCodes - 不应抛出异常的错误码列表
 */
export const softFetch = async <T>(fn: () => Promise<Result<T>>, allowedCodes: number[]): Promise<Result<T>> => {
  try {
    return await fn()
  } catch (err) {
    if (err instanceof AmagiError && allowedCodes.includes(err.code)) {
      return {
        success: false,
        code: err.code,
        data: err.data,
        message: err.message,
        error: err.rawError
      } as unknown as Result<T>
    }
    throw err
  }
}

const amagiClientInstance = new AmagiBase()

const amagiClient = amagiClientInstance.amagi

export const reloadAmagiConfig = () => {
  amagiClientInstance.reloadConfig()
}

export const bilibiliFetcher = amagiClient.bilibili.fetcher

export const douyinFetcher = amagiClient.douyin.fetcher

export const kuaishouFetcher = amagiClient.kuaishou.fetcher

export const xiaohongshuFetcher = amagiClient.xiaohongshu.fetcher
