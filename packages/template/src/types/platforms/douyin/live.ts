import type { BaseComponentProps } from '../../index'

/**
 * 抖音直播组件属性接口
 */
export interface DouyinLiveProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 直播封面图片URL */
    image_url: string
    /** 直播标题/描述 */
    text: string
    /** 直播分区标题 */
    partition_title: string
    /** 房间号 */
    room_id: string
    /** 总观看次数 */
    total_viewers: string
    /** 在线观众数 */
    online_viewers: string
    /** 用户头像URL */
    avater_url: string
    /** 用户名 */
    username: string
    /** 粉丝数 */
    fans: string
    /** 动态类型 */
    dynamicTYPE: string
    /** 分享链接 */
    share_url: string
    /** 点赞数 */
    like_count: string
    /** 在线人数文本 */
    user_count_str: string
    /** 直播分辨率 */
    resolution: string
    /** 主播签名 */
    signature: string
    /** 城市 */
    city: string
    /** 作品数 */
    aweme_count: string
    /** 关注数 */
    following_count: string
    /** 获赞数 */
    total_favorited: string
    /** 是否有商品 */
    has_commerce_goods: boolean
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 抖音直播用户信息组件属性接口
 */
export interface DouyinLiveUserInfoProps {
  /** 用户头像URL */
  avater_url: string
  /** 用户名 */
  username: string
  /** 粉丝数 */
  fans: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 抖音直播二维码组件属性接口
 */
export interface DouyinLiveQRCodeProps {
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}