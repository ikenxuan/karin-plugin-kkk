import type { BaseComponentProps } from '../../index'

/** 抖音二维码登录组件属性 */
export interface DouyinQrcodeImgProps extends BaseComponentProps<{
  /** 二维码数据URL（插件生成的自定义二维码，或原始二维码图片） */
  qrCodeDataUrl?: string
  /** 分享链接（用于生成自定义二维码） */
  share_url?: string
}> {
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

export * from './comment'
export * from './dynamic'
export * from './live'
export * from './musicinfo'
export * from './userlist'
export * from './videoInfo'
