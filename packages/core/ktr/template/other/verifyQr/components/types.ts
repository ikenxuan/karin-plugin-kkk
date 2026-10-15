/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

/** 风控验证二维码组件属性 */
export interface VerifyQrData {
  /** 验证页地址（平台官方页面，扫码后由真人在手机上完成验证） */
  share_url: string
  /** 平台名，例如「抖音」「快手」「小红书」；缺省时不显示平台标签 */
  platform?: string
  /** 二维码有效期提示，例如「3 分钟内有效」；缺省时不显示时效行 */
  expiresHint?: string
  /** 触发验证的用户头像 URL，嵌入二维码中心作为 logo；缺省时生成普通二维码 */
  avatarUrl?: string
}