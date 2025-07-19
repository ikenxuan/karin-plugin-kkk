/** amagi 解析库请求配置 */
export type requestConfig = {
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
}
