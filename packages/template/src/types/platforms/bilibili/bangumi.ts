import type { BaseComponentProps } from '../../index'

/**
 * 徽章信息接口
 */
export interface BangumiBilibiliEpisodeBadgeInfo {
  /** 背景颜色 */
  bg_color: string
  /** 夜间模式背景颜色 */
  bg_color_night: string
  /** 徽章文本 */
  text: string
}

/**
 * 番剧剧集信息接口
 */
export interface BangumiBilibiliEpisode {
  /** 剧集封面图片URL */
  cover: string
  /** 视频BV号 */
  bvid: string
  /** 剧集链接 */
  link: string
  /** 剧集完整标题 */
  long_title: string
  /** 发布时间戳 */
  pub_time: number
  /** 徽章标识（如：限免、会员） */
  badge: string
  /** 徽章详细信息 */
  badge_info: BangumiBilibiliEpisodeBadgeInfo
}

/**
 * 番剧最新剧集信息接口
 */
export interface BangumiBilibiliNewEP {
  /** 剧集描述 */
  desc: string
  /** 剧集ID */
  id: number
  /** 是否为新剧集 */
  is_new: number
  /** 剧集标题 */
  title: string
}

/**
 * 番剧统计数据接口
 */
export interface BangumiBilibiliStat {
  /** 硬币数 */
  coins: number
  /** 弹幕数 */
  danmakus: number
  /** 收藏数 */
  favorite: number
  /** 总收藏数 */
  favorites: number
  /** 追番文本 */
  follow_text: string
  /** 点赞数 */
  likes: number
  /** 评论数 */
  reply: number
  /** 分享数 */
  share: number
  /** 播放量 */
  views: number
  /** VT标识 */
  vt: number
}

/**
 * UP主挂件信息接口
 */
export interface BangumiBilibiliPendant {
  /** 挂件图片URL */
  image: string
  /** 挂件名称 */
  name: string
  /** 挂件ID */
  pid: number
}

/**
 * UP主VIP标签信息接口
 */
export interface BangumiBilibiliVipLabel {
  /** 背景颜色 */
  bg_color: string
  /** 背景样式 */
  bg_style: number
  /** 边框颜色 */
  border_color: string
  /** 标签文本 */
  text: string
  /** 文本颜色 */
  text_color: string
}

/**
 * UP主信息接口
 */
export interface BangumiBilibiliUPInfo {
  /** 头像URL */
  avatar: string
  /** 头像角标URL */
  avatar_subscript_url: string
  /** 粉丝数 */
  follower: number
  /** 是否已关注 */
  is_follow: number
  /** 用户ID */
  mid: number
  /** 昵称颜色 */
  nickname_color: string
  /** 挂件信息 */
  pendant: BangumiBilibiliPendant
  /** 主题类型 */
  theme_type: number
  /** 用户名 */
  uname: string
  /** 认证类型 */
  verify_type: number
  /** VIP标签信息 */
  vip_label: BangumiBilibiliVipLabel
  /** VIP状态 */
  vip_status: number
  /** VIP类型 */
  vip_type: number
}

/**
 * B站番剧组件数据接口
 */
export interface BangumiBilibiliData {
  /** 主封面图片URL */
  mainCover: string
  /** 演员信息 */
  Actors: string
  /** 番剧评价描述 */
  Evaluate: string
  /** 番剧链接 */
  Link: string
  /** 最新剧集信息 */
  newEP: BangumiBilibiliNewEP
  /** 番剧标题 */
  Title: string
  /** 番剧风格标签 */
  Styles: string[]
  /** 季度ID */
  seasonID: number
  /** 副标题信息 */
  subtitle: string
  /** UP主信息 */
  UPInfo: BangumiBilibiliUPInfo
  /** 版权信息 */
  Copyright: string
  /** 统计数据 */
  Stat: BangumiBilibiliStat
  /** 剧集列表 */
  Episodes: BangumiBilibiliEpisode[]
  /** 剧集总数 */
  length: number
}

/**
 * B站番剧组件属性接口
 */
export interface BilibiliBangumiProps extends BaseComponentProps {
  /** 番剧数据 */
  data: BangumiBilibiliData
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
}

/**
 * 番剧头部组件属性接口
 */
export interface BangumiBilibiliHeaderProps {
  /** 番剧标题 */
  title: string
  /** 主封面图片URL */
  mainCover: string
  /** 番剧评价描述 */
  evaluate: string
  /** 演员信息 */
  actors: string
  /** 番剧风格标签 */
  styles: string[]
  /** 副标题信息 */
  subtitle: string
  /** UP主信息 */
  upInfo?: BangumiBilibiliUPInfo
  /** 统计数据 */
  stat: BangumiBilibiliStat
  /** 版权信息 */
  copyright: string
  /** 季度ID */
  seasonID: number
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}