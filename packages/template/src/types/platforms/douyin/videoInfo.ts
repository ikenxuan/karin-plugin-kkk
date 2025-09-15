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
  recommend_count: number
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
  /** 视频封面图片URL */
  image_url: string
  /** 创建时间戳 */
  create_time: number
  /** 是否使用深色主题 */
  useDarkTheme: boolean
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