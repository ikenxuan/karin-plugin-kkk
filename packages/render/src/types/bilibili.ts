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
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
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