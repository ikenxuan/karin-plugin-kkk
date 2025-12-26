/**
 * 抖音视频统计信息接口
 */
export interface DouyinVideoStatistics {
  /** 点赞数 */
  admire_count: number
  /** 视频ID */
  aweme_id: string
  /** 收藏数 */
  collect_count: number
  /** 评论数 */
  comment_count: number
  /** 点赞数 */
  digg_count: number
  /** 播放数 */
  play_count: number
  /** 推荐数 */
  recommend_count?: number
  /** 分享数 */
  share_count: number
}

/**
 * 抖音作者信息接口
 */
export interface DouyinAuthor {
  /** 作者名称 */
  name: string
  /** 作者头像URL */
  avatar: string
  /** 抖音号 */
  short_id: string
}

/**
 * 抖音用户主页扩展信息接口
 */
export interface DouyinUserProfile {
  /** IP属地 */
  ip_location: string
  /** 粉丝数 */
  follower_count: number
  /** 获赞数 */
  total_favorited: number
  /** 作品数 */
  aweme_count: number
  /** 性别 1:男 2:女 0:未知 */
  gender: number
  /** 年龄 */
  user_age: number
}

/**
 * 抖音视频信息数据接口
 */
export interface DouyinVideoInfoData {
  /** 视频描述 */
  desc: string
  /** 统计信息 */
  statistics: DouyinVideoStatistics
  /** 视频ID */
  aweme_id: string
  /** 作者信息 */
  author: DouyinAuthor
  /** 用户主页扩展信息 */
  user_profile?: DouyinUserProfile
  /** 视频封面图片URL */
  image_url: string
  /** 封面图片尺寸 */
  cover_size?: {
    width: number
    height: number
  }
  /** 创建时间戳 */
  create_time: number
  /** 音乐信息 */
  music?: {
    author: string
    title: string
    cover: string
  }
  /** 视频原始信息 */
  video?: {
    duration: number
    width: number
    height: number
    ratio: string
  }
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 抖音视频信息组件属性接口
 */
export interface DouyinVideoInfoProps {
  /** 模板类型 */
  templateType: string
  /** 模板名称 */
  templateName: string
  /** 视频数据 */
  data: DouyinVideoInfoData
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}