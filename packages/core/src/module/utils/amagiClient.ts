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

  constructor (code: number, message: string, data: any, rawError: any) {
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

  constructor () {
    const client = this.createAmagiClient()
    this.amagi = this.wrapAmagiClient(client)
  }

  /** 创建解析库实例 */
  protected createAmagiClient = (): ReturnType<typeof Client> => {
    return Client({
      cookies: {
        douyin: Config.cookies.douyin,
        bilibili: Config.cookies.bilibili,
        kuaishou: Config.cookies.kuaishou,
        xiaohongshu: Config.cookies.xiaohongshu
      },
      request: {
        timeout: Config.request.timeout,
        headers: { 'User-Agent': Config.request['User-Agent'] },
        proxy: Config.request.proxy?.switch ? Config.request.proxy : false
      }
    })
  }

  /**
   * 重载配置 - 重新创建 Amagi Client 实例
   * 当配置文件中的 cookies 或 request 配置更新后，调用此方法使新配置生效
   */
  reloadConfig () {
    logger.debug('[AmagiClient] 检测到配置变化，正在重载...')
    
    // 记录旧配置（用于调试）
    const oldCookies = {
      douyin: Config.cookies.douyin?.substring(0, 20) + '...',
      bilibili: Config.cookies.bilibili?.substring(0, 20) + '...',
      kuaishou: Config.cookies.kuaishou?.substring(0, 20) + '...',
      xiaohongshu: Config.cookies.xiaohongshu?.substring(0, 20) + '...'
    }
    
    // 重新创建客户端实例
    const client = this.createAmagiClient()
    this.amagi = this.wrapAmagiClient(client)
    
    // 记录新配置（用于调试）
    const newCookies = {
      douyin: Config.cookies.douyin?.substring(0, 20) + '...',
      bilibili: Config.cookies.bilibili?.substring(0, 20) + '...',
      kuaishou: Config.cookies.kuaishou?.substring(0, 20) + '...',
      xiaohongshu: Config.cookies.xiaohongshu?.substring(0, 20) + '...'
    }
    
    logger.debug('[AmagiClient] 配置重载完成')
    logger.debug(`[AmagiClient] Cookie 变化对比:\n${util.inspect({ 旧配置: oldCookies, 新配置: newCookies }, { colors: true, depth: 2 })}`)
  }

  /** 包装解析库实例，递归代理所有嵌套对象的方法 */
  protected wrapAmagiClient = (client: ReturnType<typeof Client>): ReturnType<typeof Client> => {

    const createProxy = (target: any): any => {
      return new Proxy(target, {
        get (obj: any, prop: string | symbol) {
          const value = obj[prop]

          // 如果是对象（非 null），递归代理
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            return createProxy(value)
          }

          // 如果是函数，包装它以检查返回值
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

                // 构建详细的错误消息
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

/** 获取已初始化的解析库实例（单例） */
const amagiClientInstance = new AmagiBase()

/** 导出 Amagi Client 实例 */
const amagiClient = amagiClientInstance.amagi

/**
 * 重载 Amagi 配置
 * 当 cookies 或 request 配置更新后调用此方法，使新配置立即生效
 * @example
 * ```typescript
 * // 更新配置后
 * await Config.Modify('cookies', 'douyin', newCookie)
 * reloadAmagiConfig() // 重载配置
 * ```
 */
export const reloadAmagiConfig = () => {
  amagiClientInstance.reloadConfig()
}

/** B站 Fetcher 实例 */
export const bilibiliFetcher = amagiClient.bilibili.fetcher

/** 抖音 Fetcher 实例 */
export const douyinFetcher = amagiClient.douyin.fetcher

/** 快手 Fetcher 实例 */
export const kuaishouFetcher = amagiClient.kuaishou.fetcher

/** 小红书 Fetcher 实例 */
export const xiaohongshuFetcher = amagiClient.xiaohongshu.fetcher