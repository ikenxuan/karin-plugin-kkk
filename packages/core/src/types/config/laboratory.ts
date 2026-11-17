/** 实验室功能配置。 */
export interface laboratoryConfig {
  /** 消息 hook：识别抖音 App 分享口令并交给作品解析器。 */
  messageHooks: {
    /** 功能开关，保存后即时生效。 */
    switch: boolean
    /** App 签名接口的完整 HTTP 或 HTTPS 地址。 */
    signUrl: string
  }
}
