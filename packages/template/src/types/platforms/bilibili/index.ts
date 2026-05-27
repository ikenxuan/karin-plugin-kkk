import type { BaseComponentProps } from '../../index'

/** B站二维码登录组件属性 */
export interface BilibiliQrcodeImgProps extends BaseComponentProps<{
  /** 分享链接 */
  share_url: string
}> {
}

export * from './bangumi'
export * from './comment'
export * from './dynamic'
export * from './dynamic/forward'
export * from './dynamic/live'
export * from './userlist'
export * from './videoInfo'