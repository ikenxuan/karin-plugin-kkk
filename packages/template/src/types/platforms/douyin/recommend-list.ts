import type { BaseComponentProps } from '../../index'

/**
 * 抖音推荐列表组件属性接口
 */
export interface DouyinRecommendListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 图片URL */
    image_url: string
    /** 描述内容 */
    desc: string
    /** 点赞数 */
    dianzan: string
    /** 评论数 */
    pinglun: string
    /** 收藏数 */
    shouchang: string
    /** 推荐数 */
    tuijian: string
    /** 分享数 */
    share: string
    /** 创建时间 */
    create_time: string
    
    /** 推荐者（订阅者）用户名 */
    recommender_username: string
    /** 推荐者头像URL */
    recommender_avatar: string
    /** 推荐者抖音号 */
    recommender_douyin_id: string

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
