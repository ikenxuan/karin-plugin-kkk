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
  /** 当前客户端使用的配置快照，用于避免文件监听与显式重载造成重复初始化 */
  private configSignature: string

  constructor() {
    const client = this.createAmagiClient()
    this.amagi = this.wrapAmagiClient(client)
    this.configSignature = this.getConfigSignature()
  }

  /** 获取会影响 Amagi 运行状态的配置快照 */
  private getConfigSignature = () => JSON.stringify(Config.amagi)

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
   * @returns 配置发生变化并完成重载时返回 true
   */
  reloadConfig() {
    const nextConfigSignature = this.getConfigSignature()
    if (nextConfigSignature === this.configSignature) {
      logger.debug('[AmagiClient] 配置未变化，跳过重复重载')
      return false
    }

    logger.debug('[AmagiClient] 检测到配置变化，正在重载...')
    const client = this.createAmagiClient()
    this.amagi = this.wrapAmagiClient(client)
    this.configSignature = nextConfigSignature
    logger.debug('[AmagiClient] 配置重载完成')
    return true
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

type AmagiReloadListener = () => void

/** 需要随 Amagi Client 一同刷新的运行时资源，例如已经挂载的 HTTP Router */
const amagiReloadListeners = new Set<AmagiReloadListener>()

/**
 * 注册 Amagi 配置重载监听器。
 * @returns 注销当前监听器的函数
 */
export const registerAmagiReloadListener = (listener: AmagiReloadListener) => {
  amagiReloadListeners.add(listener)
  return () => amagiReloadListeners.delete(listener)
}

export let bilibiliFetcher = amagiClientInstance.amagi.bilibili.fetcher

export let douyinFetcher = amagiClientInstance.amagi.douyin.fetcher

export let kuaishouFetcher = amagiClientInstance.amagi.kuaishou.fetcher

export let xiaohongshuFetcher = amagiClientInstance.amagi.xiaohongshu.fetcher

export const reloadAmagiConfig = () => {
  if (!amagiClientInstance.reloadConfig()) return false

  /**
   * ESM 的 `export let` 是实时绑定。这里必须在 Client 重建后同步替换各平台
   * Fetcher，避免调用方继续持有模块初始化阶段截取的旧 Client 引用。
   */
  bilibiliFetcher = amagiClientInstance.amagi.bilibili.fetcher
  douyinFetcher = amagiClientInstance.amagi.douyin.fetcher
  kuaishouFetcher = amagiClientInstance.amagi.kuaishou.fetcher
  xiaohongshuFetcher = amagiClientInstance.amagi.xiaohongshu.fetcher

  for (const listener of amagiReloadListeners) {
    try {
      listener()
    } catch (error) {
      logger.error(`[AmagiClient] 运行时资源重载失败: ${error}`)
    }
  }

  return true
}
