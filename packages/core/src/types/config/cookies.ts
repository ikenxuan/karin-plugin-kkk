/** 定义不同平台用户ck的配置接口 */
export interface cookiesConfig {
  /** B站ck */
  bilibili: string
  /** B站登录态续期令牌（refresh_token）：扫码登录成功时自动写入，续期时与 ck 整组替换 */
  bilibiliRefreshToken: string
  /** 抖音ck */
  douyin: string
  /** 快手ck */
  kuaishou: string
  /** 小红书ck */
  xiaohongshu: string
}
