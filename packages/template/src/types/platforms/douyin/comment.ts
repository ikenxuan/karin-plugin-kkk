import type { BaseComponentProps } from '../../index'

/**
 * 抖音评论组件属性接口
 */
export interface DouyinCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 作品类型：视频/图集/合辑 */
    Type: '视频' | '图集' | '合辑'
    /** 评论数量 */
    CommentLength: number
    /** 视频大小(MB) */
    VideoSize?: number
    /** 视频帧率(Hz) */
    VideoFPS?: number
    /** 图片数量 */
    ImageLength?: number
    /** 分享链接 */
    share_url: string
    /** 评论数据 */
    CommentsData: {
      jsonArray: CommentItem[]
    }
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 评论项数据接口
 */
export interface CommentItem {
  /** 用户头像URL */
  userimageurl: string
  /** 用户昵称 */
  nickname: string
  /** 标签类型 (1=作者) */
  label_type?: number
  /** 状态标签 */
  status_label?: string
  /** 评论内容 */
  text: string
  /** 评论图片 */
  commentimage?: string
  /** 贴纸 */
  sticker?: string
  /** 创建时间 */
  create_time: string
  /** IP标签 */
  ip_label: string
  /** 回复评论总数 */
  reply_comment_total: number
  /** 点赞数 */
  digg_count: number
  /** 搜索文本 */
  search_text?: Array<{
    /** 搜索文本内容 */
    search_text: string
    /** 搜索查询ID */
    search_query_id: string
  }> | null
}

/**
 * 二维码区域组件属性接口
 */
export interface QRCodeSectionProps {
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
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
  /** 视频大小(MB) */
  videoSize?: number
  /** 视频帧率(Hz) */
  videoFPS?: number
  /** 图片数量 */
  imageLength?: number
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 评论项组件属性接口
 */
export interface CommentItemComponentProps {
  /** 评论数据 */
  comment: CommentItem
}