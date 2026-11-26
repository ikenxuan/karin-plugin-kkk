/** 实验室功能配置。 */
export interface laboratoryConfig {
  /** 抖音 App 专属解析能力。 */
  douyinApp: {
    /** App 签名服务的 HTTP(S) base URL，仅填写服务根地址，不带接口路径。 */
    signUrl: string
    /** 是否在消息中解析抖音 App 分享口令。 */
    commandParse: boolean
    /** 是否使用 App 单作品详情接口解析日常作品。 */
    dailyWork: boolean
    /** 是否使用 App 评论接口解析作品评论。 */
    appComments: boolean
  }
}
