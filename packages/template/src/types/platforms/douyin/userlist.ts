import type { BaseComponentProps } from '../../index'

/**
 * 抖音用户列表组件属性接口
 */
export interface DouyinUserListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 群组信息 */
    groupInfo: {
      /** 群号 */
      groupId: string
      /** 群名称 */
      groupName: string
    }
    /** 用户列表数据 */
    renderOpt: {
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
      /** 全局推送开关状态 */
      switch: boolean
      /** 推送类型列表 */
      pushTypes: string[]
    }[]
  }
}