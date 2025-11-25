/**
 * 用户视频列表页面的数据类型定义
 */

export interface VideoListItem {
  /** 视频ID */
  aweme_id: string
  /** 视频标题/描述 */
  title: string
  /** 视频封面URL */
  cover: string
  /** 视频时长（秒） */
  duration: number
  /** 视频宽度 */
  width: number
  /** 视频高度 */
  height: number
  /** 创建时间戳 */
  create_time: number
  /** 统计数据 */
  statistics: {
    like_count: number
    comment_count: number
    share_count: number
    collect_count: number
    play_count: number
  }
  /** 是否为视频(true)还是图集(false) */
  is_video: boolean
  /** 背景音乐信息 */
  music?: {
    title: string
    author: string
    cover: string
  }
}

export interface UserVideoListData {
  /** 用户基本信息 */
  user: {
    head_image: string | null
    nickname: string
    short_id: string
    avatar: string
    signature: string
    follower_count: number
    following_count: number
    total_favorited: number
    verified: boolean,
    ip_location: string,
  }
  /** 视频列表 */
  videos: VideoListItem[]
}

export interface DouyinUserVideoListProps {
  data: UserVideoListData & {
    useDarkTheme?: boolean
  }
}
