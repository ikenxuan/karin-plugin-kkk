import util from 'node:util'

import Client, { type Result } from '@ikenxuan/amagi'

import { Config } from './Config'

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

            const isResultType = (val: any): val is Result<any> => {
              if (!val || typeof val !== 'object') return false
              if (!('success' in val) || typeof val.success !== 'boolean') return false
              if (!('code' in val) || !('message' in val)) return false
              return true
            }

            if (isResultType(result)) {
              if (result.success === true) {
                return result
              }

              // 构建详细的错误消息
              const errMessage = result.message || (result.error as any)?.amagiMessage || '请求失败'
              
              // 使用 util.inspect 格式化完整的错误信息（带 ANSI 颜色）
              const errorDetails = util.inspect(
                {
                  code: result.code,
                  message: errMessage,
                  error: result.error
                },
                {
                  depth: null,
                  colors: true,
                  compact: false,
                  breakLength: 80
                }
              )
              
              throw new Error(errorDetails)
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
const getAmagiClient = (): ReturnType<typeof Client> => new AmagiBase().amagi

/** 获取B站数据 */
export const getBilibiliData: ReturnType<typeof Client>['getBilibiliData'] = (
  ...args: Parameters<ReturnType<typeof Client>['getBilibiliData']>
) => getAmagiClient().getBilibiliData(...args)

/** 获取抖音数据 */
export const getDouyinData: ReturnType<typeof Client>['getDouyinData'] = (
  ...args: Parameters<ReturnType<typeof Client>['getDouyinData']>
) => getAmagiClient().getDouyinData(...args)

/** 获取快手数据 */
export const getKuaishouData: ReturnType<typeof Client>['getKuaishouData'] = (
  ...args: Parameters<ReturnType<typeof Client>['getKuaishouData']>
) => getAmagiClient().getKuaishouData(...args)

/** 获取小红书数据 */
export const getXiaohongshuData: ReturnType<typeof Client>['getXiaohongshuData'] = (
  ...args: Parameters<ReturnType<typeof Client>['getXiaohongshuData']>
) => getAmagiClient().getXiaohongshuData(...args)