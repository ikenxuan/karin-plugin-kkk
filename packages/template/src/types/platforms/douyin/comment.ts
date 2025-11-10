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
    VideoSize?: string
    /** 视频帧率(Hz) */
    VideoFPS?: number
    /** 图片数量 */
    ImageLength?: number
    /** 区域 */
    Region: string
    /** 相关搜索（大家都在搜） */
    suggestWrod: string[]
    /** 视频分辨率 */
    Resolution: string | null
    /** 分享链接 */
    share_url: string
    /** 评论数据列表 */
    CommentsData: Array<{
      /** 评论ID */
      id?: number
      /** 评论CID */
      cid?: string
      /** 作品ID */
      aweme_id?: string
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
      digg_count: number | string
      /** 搜索文本 */
      search_text?: Array<{
        /** 搜索文本内容 */
        search_text: string
        /** 搜索查询ID */
        search_query_id: string
      }> | null
      /** 是否@用户ID */
      is_At_user_id?: any
      /** 回复评论数据 */
      replyComment?: DouyinSubComment
      /** 作者是否点赞 */
      is_author_digged?: boolean
    }>
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 抖音子评论数据接口
 */
export interface DouyinSubComment {
  /** 创建时间 */
  create_time: string
  /** 用户昵称 */
  nickname: string
  /** 用户头像URL */
  userimageurl: string
  /** 评论内容 */
  text: string
  /** 点赞数 */
  digg_count: number | string
  /** IP标签 */
  ip_label: string
  /** 文本额外信息 */
  text_extra: any[]
  /** 标签文本 */
  label_text: string
}