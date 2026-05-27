import type { RichTextDocument } from '@kkk/richtext'

import type { BaseComponentProps } from '../../index'

/**
 * 快手评论组件属性接口
 */
export interface KuaishouCommentProps extends BaseComponentProps<{
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
  CommentsData: KuaishouCommentItem[]
}> {
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
  text: RichTextDocument
  /** 点赞数 */
  digg_count: number
  /** 创建时间戳（毫秒） */
  create_time: number
  /** 评论图片 */
  commentimage?: string
  /** 贴纸 */
  sticker?: string
  /** 回复数量 */
  reply_comment_total?: number
  /** IP标签 */
  ip_label?: string
}