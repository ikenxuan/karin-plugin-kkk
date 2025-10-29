import type { BaseComponentProps } from '../../index'

/**
 * 抖音用户列表组件属性接口
 */
export interface DouyinUserListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 用户列表数据 */
    renderOpt: DouyinUserItem[]
  }
}

/**
 * 抖音用户项数据接口
 */
export interface DouyinUserItem {
  /** 用户头像图片URL */
  avatar_img: string
  /** 用户名 */
  username: string
  /** 抖音短ID */
  short_id: string
  /** 粉丝数 */
  fans: string
  /** 获赞总数 */
  total_favorited: string
  /** 关注数 */
  following_count: string
}

/**
 * 抖音用户项组件属性接口
 */
export interface DouyinUserItemProps {
  /** 用户数据 */
  user: DouyinUserItem
  /** 索引 */
  index: number
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}