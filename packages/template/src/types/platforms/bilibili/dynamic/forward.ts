import type { BaseComponentProps } from '../../../index'

/**
 * 原始内容AV类型接口
 */
export interface OriginalContentAV {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名 */
  username: string
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: string
  /** 视频封面 */
  cover: string
  /** 视频时长文本 */
  duration_text: string
  /** 播放量 */
  play: string
  /** 弹幕数 */
  danmaku: string
  /** 视频标题 */
  title: string
}

/**
 * 原始内容图文类型接口
 */
export interface OriginalContentDraw {
  /** 标题 */
  title?: string
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名 */
  username: string
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: string
  /** 动态文本内容 */
  text: string
  /** 图片URL数组 */
  image_url: Array<{ image_src: string }>
}

/**
 * 原始内容文字类型接口
 */
export interface OriginalContentWord {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名 */
  username: string
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: string
  /** 动态文本内容 */
  text: string
}

/**
 * 原始内容直播推荐类型接口
 */
export interface OriginalContentLiveRcmd {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名 */
  username: string
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: string
  /** 直播封面 */
  cover: string
  /** 分区名称 */
  area_name: string
  /** 大文本 */
  text_large: string
  /** 在线人数 */
  online: string
  /** 直播标题 */
  title: string
}

/**
 * 转发动态原始内容Props接口
 */
export interface BilibiliForwardOriginalContentProps {
  /** 原始内容 */
  original_content: {
    /** AV类型内容 */
    DYNAMIC_TYPE_AV?: OriginalContentAV
    /** 图文类型内容 */
    DYNAMIC_TYPE_DRAW?: OriginalContentDraw
    /** 文字类型内容 */
    DYNAMIC_TYPE_WORD?: OriginalContentWord
    /** 直播推荐类型内容 */
    DYNAMIC_TYPE_LIVE_RCMD?: OriginalContentLiveRcmd
  }
}

/**
 * 转发动态内容Props接口
 */
export interface BilibiliForwardContentProps {
  /** 动态文本内容 */
  text: string
  /** 原始内容 */
  original_content: BilibiliForwardOriginalContentProps['original_content']
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * B站转发动态组件属性接口
 */
export interface BilibiliForwardDynamicProps extends BaseComponentProps {
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
    /** 原始内容 */
    original_content: BilibiliForwardOriginalContentProps['original_content']
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
    /** 图片URL */
    imgList: string[] | null
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
}