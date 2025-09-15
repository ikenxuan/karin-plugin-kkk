import type { BaseComponentProps } from '../../index'

/**
 * B站视频统计数据接口
 */
export interface BilibiliVideoStat {
  /** 视频AV号 */
  aid: number
  /** 播放量 */
  view: number
  /** 弹幕数 */
  danmaku: number
  /** 评论数 */
  reply: number
  /** 收藏数 */
  favorite: number
  /** 投币数 */
  coin: number
  /** 分享数 */
  share: number
  /** 当前排名 */
  now_rank: number
  /** 历史最高排名 */
  his_rank: number
  /** 点赞数 */
  like: number
  /** 点踩数 */
  dislike: number
  /** 评价 */
  evaluation: string
  /** VT标识 */
  vt: number
}

/**
 * B站视频UP主信息接口
 */
export interface BilibiliVideoOwner {
  /** UP主用户ID */
  mid: number
  /** UP主昵称 */
  name: string
  /** UP主头像URL */
  face: string
}

/**
 * B站视频信息数据接口
 */
export interface BilibiliVideoInfoData {
  /** 分享链接 */
  share_url: string
  /** 视频标题 */
  title: string
  /** 统计数据 */
  stat: BilibiliVideoStat
  /** 视频BV号 */
  bvid: string
  /** 创建时间戳 */
  ctime: number
  /** 视频封面图片URL */
  pic: string
  /** UP主信息 */
  owner: BilibiliVideoOwner
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * B站视频信息组件属性接口
 */
export interface BilibiliVideoInfoProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: BilibiliVideoInfoData
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
}

/**
 * 视频统计项组件属性接口
 */
export interface VideoStatItemProps {
  /** 图标组件 */
  icon: React.ReactNode
  /** 标签文本 */
  label: string
  /** 数值 */
  value: number | string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 视频头部信息组件属性接口
 */
export interface VideoHeaderProps {
  /** 视频标题 */
  title: string
  /** UP主信息 */
  owner: BilibiliVideoOwner
  /** 创建时间戳 */
  ctime: number
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 二维码区域组件属性接口
 */
export interface QRCodeSectionProps {
  /** 分享链接 */
  share_url: string
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}