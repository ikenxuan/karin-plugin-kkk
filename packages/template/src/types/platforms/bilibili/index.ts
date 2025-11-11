/**
 * 二维码组件属性接口
 */
export interface QRCodeSectionProps {
  /** 二维码数据URL */
  qrCodeDataUrl?: string
}


/** B站二维码登录组件属性 */
export interface BilibiliQrcodeImgProps {
  data: {
    /** 分享链接 */
    share_url: string
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
  }
  /** 二维码数据URL */
  qrCodeDataUrl?: string
}

export * from './bangumi'
export * from './comment'
export * from './dynamic'
export * from './dynamic/forward'
export * from './dynamic/live'
export * from './userlist'
export * from './videoInfo'