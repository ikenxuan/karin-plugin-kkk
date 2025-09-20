import type { BaseComponentProps } from '../../index'

/**
 * 快手评论组件属性接口
 */
export interface KuaishouCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 作品类型：视频/图集 */
    Type: '视频' | '图集'
    /** 评论数量 */
    CommentLength: number
    /** 视频大小(MB) */
    VideoSize?: string
    /** 点赞数量 */
    likeCount?: number
    /** 观看次数 */
    viewCount?: number
    /** 图片数量 */
    ImageLength?: number
    /** 分享链接 */
    share_url: string
    /** 评论数据 */
    CommentsData: {
      jsonArray: KuaishouCommentItem[]
    }
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 快手评论项数据接口
 */
export interface KuaishouCommentItem {
  /** 评论ID */
  cid: string
  /** 作品ID */
  aweme_id: string
  /** 用户昵称 */
  nickname: string
  /** 用户头像URL */
  userimageurl: string
  /** 评论内容 */
  text: string
  /** 点赞数 */
  digg_count: number | string
  /** 创建时间 */
  create_time: string
  /** 评论图片 */
  commentimage?: string
  /** 贴纸 */
  sticker?: string
  /** 回复数量 */
  reply_comment_total?: number
  /** IP标签 */
  ip_label?: string
}

/**
 * 快手二维码组件属性接口
 */
export interface KuaishouQRCodeSectionProps {
  /** 二维码数据URL */
  qrCodeDataUrl: string
  /** 作品类型 */
  type: string
  /** 图片数量 */
  imageLength?: number
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 快手视频信息头部组件属性接口
 */
export interface KuaishouVideoInfoHeaderProps {
  /** 作品类型 */
  type: string
  /** 评论数量 */
  commentLength: number
  /** 视频大小 */
  videoSize?: number
  /** 点赞数量 */
  likeCount?: number
  /** 观看次数 */
  viewCount?: number
  /** 图片数量 */
  imageLength?: number
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 快手评论项组件属性接口
 */
export interface KuaishouCommentItemComponentProps {
  /** 评论数据 */
  comment: KuaishouCommentItem
}