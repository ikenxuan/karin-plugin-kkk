import type { BaseComponentProps } from '../../../index'

/**
 * B站视频动态组件属性接口
 */
export interface BilibiliVideoDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 用户头像URL */
    avatar_url: string
    /** 头像框 */
    frame?: string
    /** 用户名 */
    username: string
    /** 动态创建时间 */
    create_time: string
    /** 装饰卡片 */
    decoration_card?: string
    /** 视频标题 */
    text: string
    /** 视频描述 */
    desc: string
    /** 视频封面图片URL */
    image_url: string
    /** 点赞数 */
    dianzan: string | number
    /** 评论数 */
    pinglun: string | number
    /** 分享数 */
    share: string | number
    /** 硬币数 */
    coin: string | number
    /** 浏览量 */
    view: string | number
    /** 视频时长 */
    duration_text: string
    /** 渲染时间 */
    render_time: string
    /** 用户短ID */
    user_shortid: string | number
    /** 获赞总数 */
    total_favorited: string | number
    /** 关注数 */
    following_count: string | number
    /** 粉丝数 */
    fans: string | number
    /** 动态类型 */
    dynamicTYPE: string
    /** 分享链接 */
    share_url: string
    /** 动态ID */
    dynamic_id: string
    /** 共创者列表 (可选) */
    staff?: Array<{
      /** 用户ID */
      mid: number
      /** 职位标题 (UP主/参演) */
      title: string
      /** 用户名 */
      name: string
      /** 头像URL */
      face: string
      /** 粉丝数 */
      follower: number
    }>
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string
}
