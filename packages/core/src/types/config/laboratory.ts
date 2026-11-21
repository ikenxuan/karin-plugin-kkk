/** 实验室功能配置。 */
export interface laboratoryConfig {
  /** 消息 hook：识别抖音 App 分享口令并交给作品解析器。 */
  messageHooks: {
    /** 功能开关，保存后即时生效。 */
    switch: boolean
    /** App 签名服务的 HTTP(S) base URL，仅填写服务根地址，不带接口路径。 */
    signUrl: string
  }
}
