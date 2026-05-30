import type { RichTextDocument } from '@kkk/richtext'

import type { BaseComponentProps } from '../../index'

/**
 * 抖音视频作品组件属性接口
 */
export interface DouyinVideoWorkProps extends BaseComponentProps<{
  /** 视频封面URL */
  image_url: string
  /** 标题（从描述中按首个句号拆分） */
  title?: string
  /** 描述内容 */
  desc: string
  /** 富文本描述（去除标题后的正文，含 topic/lineBreak 节点） */
  rich_desc?: RichTextDocument
  /** IP 属地 */
  ip_location?: string
  /** 热点搜索词 */
  suggest_word?: {
    hint_text: string
    word: string
  }
  /** 背景音乐信息 */
  music?: {
    /** 音乐作者 */
    author: string
    /** 音乐标题 */
    title: string
    /** 音乐封面 URL */
    cover?: string
  }
  /** 视频时长（毫秒） */
  duration?: number
  /** 点赞数 */
  dianzan: string
  /** 评论数 */
  pinglun: string
  /** 收藏数 */
  shouchang: string
  /** 分享数 */
  share: string
  /** 创建时间（Unix 时间戳，秒） */
  create_time: number
  /** 用户头像URL */
  avater_url: string
  /** 用户名 */
  username: string
  /** 抖音号 */
  抖音号: string
  /** 获赞数 */
  获赞: string
  /** 关注数 */
  关注: string
  /** 粉丝数 */
  粉丝: string
  /** 分享链接 */
  share_url: string
  /** 动态类型 */
  dynamicTYPE?: string
  /** 合作信息 */
  cooperation_info?: {
    co_creator_nums: number
    co_creators: Array<{
      avatar_url?: string
      nickname: string
      role_title: string
    }>
    subscriber_role?: string
  }
}> {
}
