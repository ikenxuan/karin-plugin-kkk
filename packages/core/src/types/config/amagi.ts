/** amagi 解析库配置（合并了 cookies 和 request） */
export interface amagiConfig {
  /** 请求超时时间，单位：毫秒 */
  timeout: number

  /** 浏览器用户代理 */
  'User-Agent': string

  /** 代理配置 */
  proxy?: {
    /** 代理开关 */
    switch: boolean
    /** 代理主机 */
    host: string
    /** 代理端口 */
    port: number
    /** 代理协议 */
    protocol: 'http' | 'https'
    /** 代理认证 */
    auth?: {
      /** 用户名 */
      username: string
      /** 密码 */
      password: string
    }
  }

  /** 各平台 Cookies */
  cookies: {
    /** B站ck */
    bilibili: string
    /** 抖音ck */
    douyin: string
    /** 快手ck */
    kuaishou: string
    /** 小红书ck */
    xiaohongshu: string
  }

  /** API 服务开关 */
  APIServer: boolean
  /** API 服务是否挂载到 Karin */
  APIServerMount: boolean
  /** API 服务端口（未挂载时生效） */
  APIServerPort: number
}
