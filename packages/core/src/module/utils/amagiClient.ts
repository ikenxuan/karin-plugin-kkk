import util from 'node:util'

import Client, { type Result } from '@ikenxuan/amagi'

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

  /** 包装解析库实例 */
  protected wrapAmagiClient = (client: ReturnType<typeof Client>): ReturnType<typeof Client> => {
    const proxy = new Proxy(client, {
      get (target: ReturnType<typeof Client>, prop: keyof ReturnType<typeof Client>) {
        const method = target[prop]
        if (typeof method === 'function') {
          return async (...args: any[]) => {
            const result = await Function.prototype.apply.call(method, target, args)

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
        return method
      }
    })
    return proxy
  }
}

/** 获取已初始化的解析库实例 */
const amagiClient = new AmagiBase().amagi

/** 获取B站数据 */
export const getBilibiliData = amagiClient.getBilibiliData.bind(amagiClient)

/** 获取抖音数据 */
export const getDouyinData = amagiClient.getDouyinData.bind(amagiClient)

/** 获取快手数据 */
export const getKuaishouData = amagiClient.getKuaishouData.bind(amagiClient)

/** 获取小红书数据 */
export const getXiaohongshuData = amagiClient.getXiaohongshuData.bind(amagiClient)