import type { BaseComponentProps } from '../../index'

/**
 * 抖音音乐信息组件属性接口
 */
export interface DouyinMusicInfoProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 音乐封面图片URL */
    image_url: string
    /** 音乐描述/标题 */
    desc: string
    /** 音乐ID */
    music_id: string
    /** 创建时间 */
    create_time: string
    /** 使用该音乐的用户数量 */
    user_count: string
    /** 用户头像URL */
    avater_url: string
    /** 用户名 */
    username: string
    /** 用户短ID */
    user_shortid: string
    /** 获赞数 */
    total_favorited: string
    /** 关注数 */
    following_count: string
    /** 粉丝数 */
    fans: string
    /** 分享链接 */
    share_url: string
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 音乐封面组件属性接口
 */
export interface MusicCoverProps {
  /** 音乐封面图片URL */
  imageUrl: string
  /** 音乐描述 */
  description: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 音乐信息组件属性接口
 */
export interface MusicInfoProps {
  /** 音乐ID */
  musicId: string
  /** 使用用户数量 */
  userCount: string
  /** 创建时间 */
  createTime: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 音乐作者信息组件属性接口
 */
export interface MusicAuthorInfoProps {
  /** 用户头像URL */
  avatarUrl: string
  /** 用户名 */
  username: string
  /** 用户短ID */
  userShortId: string
  /** 获赞数 */
  totalFavorited: string
  /** 关注数 */
  followingCount: string
  /** 粉丝数 */
  fans: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 音乐二维码组件属性接口
 */
export interface MusicQRCodeProps {
  /** 分享链接 */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}