import type { RichTextDocument } from '@kkk/richtext'

import type { BaseComponentProps } from '../../index'

/**
 * B站评论组件属性接口
 */
export interface BilibiliCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 作品类型：视频/图集/动态 */
    Type: '视频' | '动态'
    /** 评论数量 */
    CommentLength: string
    /** 视频大小(MB) */
    VideoSize?: string
    /** 视频画质 */
    Clarity?: string
    /** 图片数量 */
    ImageLength?: number
    /** 分享链接 */
    shareurl: string
    /** 分享URL */
    share_url: string
    /** 视频分辨率 */
    Resolution: string | null
    /** 评论数据 */
    CommentsData: CommentItem[]
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 粉丝卡片信息接口
 */
export interface FanCardInfo {
  /** 卡片背景图片 */
  image: string | null
  /** 序号前缀 */
  numPrefix: string
  /** 序号描述 */
  numDesc: string
  /** 渐变色样式 */
  gradientStyle: string
}

/**
 * B站二级评论项数据接口
 */
export interface SubCommentItem {
  /** 用户头像URL */
  avatar: string
  /** 用户昵称 */
  uname: string
  /** 用户昵称颜色 */
  unameColor?: string | null
  /** 用户等级 */
  level: number
  /** 头像框 */
  frame?: string
  /** 评论内容 */
  message: RichTextDocument
  /** 评论所有图片 */
  pictures: string[]
  /** 创建时间戳（秒） */
  ctime: number
  /** IP标签/地理位置 */
  location: string
  /** 点赞数 */
  like: number
  /** 是否为UP主评论 */
  isUP: boolean
  /** VIP状态 */
  vipstatus?: number
  /** 粉丝卡片信息 */
  fanCard?: FanCardInfo | null
  /** 粉丝勋章详情 */
  fansDetail?: FansDetail | null
}

/**
 * 粉丝勋章详情
 */
export interface FansDetail {
  /** 用户ID */
  uid: number
  /** 勋章ID */
  medal_id: number
  /** 勋章名称 */
  medal_name: string
  /** 分数 */
  score: number
  /** 等级 */
  level: number
  /** 亲密度 */
  intimacy: number
  /** 主播状态 */
  master_status: number
  /** 是否领取 */
  is_receive: number
  /** 勋章颜色（起始） */
  medal_color: number
  /** 勋章颜色（结束） */
  medal_color_end: number
  /** 边框颜色 */
  medal_color_border: number
  /** 名称颜色 */
  medal_color_name: number
  /** 等级颜色 */
  medal_color_level: number
  /** 守护等级 */
  guard_level: number
  /** 守护图标 */
  guard_icon: string
  /** 荣誉图标 */
  honor_icon: string
  /** 首图标（可选） */
  first_icon?: string
  /** 等级背景色 */
  medal_level_bg_color: number
}

/**
 * B站评论项数据接口
 */
export interface CommentItem {
  /** 用户头像URL */
  avatar: string
  /** 用户昵称 */
  uname: string
  /** 用户昵称颜色 */
  unameColor?: string | null
  /** 用户等级 */
  level: number
  /** 头像框 */
  frame?: string
  /** 标签类型 (1=作者) */
  label_type?: number
  /** 状态标签 */
  status_label?: string | null
  /** 评论内容 */
  message: RichTextDocument
  /** 评论所有图片 */
  pictures: string[]
  /** VIP状态 */
  vipstatus?: number
  /** 贴纸 */
  sticker?: string
  /** 创建时间戳（秒） */
  ctime: number
  /** IP标签/地理位置 */
  location: string
  /** 回复数量 */
  replylength: number
  /** 点赞数 */
  like: number
  /** 是否置顶评论 */
  isTop: boolean
  /** 是否为UP主评论 */
  isUP: boolean
  /** 二级评论列表 */
  replies?: SubCommentItem[]
  /** 粉丝卡片信息 */
  fanCard?: FanCardInfo | null
  /** 粉丝勋章详情 */
  fansDetail?: FansDetail | null
}
