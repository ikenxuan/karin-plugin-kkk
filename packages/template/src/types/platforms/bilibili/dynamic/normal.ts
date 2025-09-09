import type { BaseComponentProps } from '../../../index'

/**
 * B站普通动态组件属性接口
 */
export interface BilibiliDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 用户头像URL */
    avatar_url: string
    /** 头像框 */
    frame?: string
    /** 用户名 */
    username: string
    /** 动态创建时间 */
    create_time: string
    /** 装饰卡片 */
    decoration_card?: string
    /** 动态文本内容 */
    text: string
    /** 图片URL数组 */
    image_url: Array<{ image_src: string }>
    /** 点赞数 */
    dianzan: string | number
    /** 评论数 */
    pinglun: string | number
    /** 分享数 */
    share: string | number
    /** 渲染时间 */
    render_time: string
    /** 用户短ID */
    user_shortid: string | number
    /** 获赞总数 */
    total_favorited: string | number
    /** 关注数 */
    following_count: string | number
    /** 粉丝数 */
    fans: string | number
    /** 动态类型 */
    dynamicTYPE: string
    /** 分享链接 */
    share_url: string
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
}

/**
 * B站动态用户信息组件属性接口
 */
export interface BilibiliDynamicUserInfoProps {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名 */
  username: string
  /** 动态创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * B站动态内容组件属性接口
 */
export interface BilibiliDynamicContentProps {
  /** 动态文本内容 */
  text: string
  /** 图片URL数组 */
  image_url: Array<{ image_src: string }>
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * B站动态状态组件属性接口
 */
export interface BilibiliDynamicStatusProps {
  /** 点赞数 */
  dianzan: string | number
  /** 评论数 */
  pinglun: string | number
  /** 分享数 */
  share: string | number
  /** 渲染时间 */
  render_time: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * B站动态底部信息组件属性接口
 */
export interface BilibiliDynamicFooterProps {
  /** 用户短ID */
  user_shortid: string | number
  /** 获赞总数 */
  total_favorited: string | number
  /** 关注数 */
  following_count: string | number
  /** 粉丝数 */
  fans: string | number
  /** 动态类型 */
  dynamicTYPE: string
  /** 分享链接 */
  share_url: string
  /** 二维码数据URL */
  qrCodeDataUrl?: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}