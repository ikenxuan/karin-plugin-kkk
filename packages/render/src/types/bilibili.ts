import { BaseComponentProps } from '.'

/**
 * B站评论组件属性接口
 */
export interface BilibiliCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 作品类型：视频/图集/动态 */
    Type: '视频'
    /** 评论数量 */
    CommentLength: number
    /** 视频大小(MB) */
    VideoSize?: number
    /** 视频画质 */
    Clarity?: string
    /** 图片数量 */
    ImageLength?: number
    /** 分享链接 */
    shareurl: string
    /** 分享URL */
    share_url: string
    /** 评论数据 */
    CommentsData: CommentItem[]
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
}

/**
 * B站评论项数据接口
 */
export interface CommentItem {
  /** 用户头像URL */
  avatar: string
  /** 用户昵称 */
  uname: string
  /** 头像框 */
  frame?: string
  /** VIP大图标 */
  icon_big_vip?: string
  /** 标签类型 (1=作者) */
  label_type?: number
  /** 状态标签 */
  status_label?: string | null
  /** 评论内容 */
  message: string
  /** 评论图片 */
  img_src?: string
  /** 贴纸 */
  sticker?: string
  /** 创建时间 */
  ctime: string
  /** IP标签/地理位置 */
  location: string
  /** 回复数量 */
  replylength: number
  /** 点赞数 */
  like: number
}

/**
 * 二维码组件属性接口
 */
export interface QRCodeSectionProps {
  /** 分享链接 */
  shareurl: string
  /** 二维码数据URL */
  qrCodeDataUrl?: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 视频信息头部组件属性接口
 */
export interface VideoInfoHeaderProps {
  /** 作品类型 */
  type: string
  /** 评论数量 */
  commentLength: number
  /** 视频大小 */
  videoSize?: number
  /** 视频画质 */
  clarity?: string
  /** 图片数量 */
  imageLength?: number
}

export interface QRCodeSectionProps {
  /** 分享链接 */
  shareurl: string
  /** 二维码数据URL */
  qrCodeDataUrl?: string
}

export interface CommentItemComponentProps {
  /** 评论数据 */
  comment: CommentItem
}

/**
 * 评论项组件属性接口
 */
export interface CommentItemComponentProps {
  /** 评论数据 */
  comment: CommentItem
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * B站动态组件属性接口
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