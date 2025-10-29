/** 抖音二维码登录组件属性 */
export interface DouyinQrcodeImgProps {
  data: {
    /** 二维码数据URL */
    qrCodeDataUrl?: string
  }
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

export * from './comment'
export * from './dynamic'
export * from './live'
export * from './musicinfo'
export * from './userlist'
export * from './videoInfo'
