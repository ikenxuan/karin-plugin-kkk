import type { BaseComponentProps } from '../../index'

/** APP 扫码登录组件属性 */
export interface QrLoginProps extends BaseComponentProps<{
  /** 服务器地址 */
  serverUrl: string
  /** 分享链接（用于生成二维码） */
  share_url: string
}> {}
