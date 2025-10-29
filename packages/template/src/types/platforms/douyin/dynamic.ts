import type { BaseComponentProps } from '../../index'

/**
 * 抖音动态组件属性接口
 */
export interface DouyinDynamicProps extends BaseComponentProps {
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
    /** 分享数 */
    share: string
    /** 创建时间 */
    create_time: string
    /** 用户头像URL */
    avater_url: string
    /** 用户名 */
    username: string
    /** 抖音号 */
    抖音号: string
    /** 获赞数 */
    获赞: string
    /** 关注数 */
    关注: string
    /** 粉丝数 */
    粉丝: string
    /** 分享链接 */
    share_url: string
    /** 合作信息 */
    cooperation_info?: {
      co_creator_nums: number
      co_creators: Array<{
        avatar_thumb: {
          url_list: string[]
        }
        nickname: string
        role_title: string
      }>
    }
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 抖音动态用户信息组件属性接口
 */
export interface DouyinDynamicUserInfoProps {
  /** 用户头像URL */
  avater_url: string
  /** 用户名 */
  username: string
  /** 抖音号 */
  douyinId: string
  /** 获赞数 */
  likes: string
  /** 关注数 */
  following: string
  /** 粉丝数 */
  followers: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 抖音动态二维码组件属性接口
 */
export interface DouyinDynamicQRCodeProps {
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}