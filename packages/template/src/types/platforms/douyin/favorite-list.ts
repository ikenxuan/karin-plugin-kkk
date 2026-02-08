import type { BaseComponentProps } from '../../index'

/**
 * 抖音喜欢列表组件属性接口
 * 用于展示"谁喜欢了谁的作品"
 */
export interface DouyinFavoriteListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 作品封面图片URL */
    image_url: string
    /** 作品描述内容 */
    desc: string
    /** 点赞数 */
    dianzan: string
    /** 评论数 */
    pinglun: string
    /** 收藏数 */
    shouchang: string
    /** 分享数 */
    share: string
    /** 推荐数 */
    tuijian: string
    /** 作品创建时间 */
    create_time: string
    /** 点赞者（订阅者）用户名 */
    liker_username: string
    /** 点赞者头像URL */
    liker_avatar: string
    /** 点赞者抖音号 */
    liker_douyin_id: string
    /** 作品作者用户名 */
    author_username: string
    /** 作品作者头像URL */
    author_avatar: string
    /** 作品作者抖音号 */
    author_douyin_id: string
    /** 分享链接 */
    share_url: string
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

