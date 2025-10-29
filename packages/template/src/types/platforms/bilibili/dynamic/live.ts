import type { BaseComponentProps } from '../../../index'

/**
 * B站直播动态组件属性接口
 */
export interface BilibiliLiveDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 直播封面 */
    image_url: string
    /** 直播标题 */
    text: string
    /** 直播房间信息（分区 | 房间号） */
    liveinf: string
    /** 用户信息 */
    username: string
    /** 用户头像URL */
    avatar_url: string
    /** 头像框 */
    frame?: string
    /** 粉丝数 */
    fans: string
    /** 时间信息 */
    create_time: string
    /** 直播开始时间 */
    now_time: string
    /** 分享和配置 */
    share_url: string
    /** 动态类型 */
    dynamicTYPE: string
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
}

/**
 * B站直播动态内容组件属性接口
 */
export interface BilibiliLiveDynamicContentProps {
  /** 直播封面 */
  image_url: string
  /** 直播标题 */
  text: string
  /** 直播房间信息（分区 | 房间号） */
  liveinf: string
  /** 用户信息 */
  username: string
  avatar_url: string
  frame?: string
  fans: string
  /** 时间信息 */
  create_time: string
}

/**
 * B站直播动态底部信息组件属性接口
 */
export interface BilibiliLiveDynamicFooterProps {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名 */
  username: string
  /** 粉丝数 */
  fans: string
  /** 动态类型 */
  dynamicTYPE: string
  /** 分享链接 */
  share_url: string
  /** 二维码数据URL */
  qrCodeDataUrl?: string
}