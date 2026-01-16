/** APP 扫码登录组件属性 */
export interface QrLoginProps {
  data: {
    /** 服务器地址 */
    serverUrl: string
    /** 分享链接（用于生成二维码） */
    share_url: string
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
  }
  /** 二维码数据URL（由 createQrCodePlugin 自动生成，作为顶级 prop） */
  qrCodeDataUrl?: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}
