import { BaseComponentProps } from '.'

/**
 * 抖音评论组件属性接口
 */
export interface DouyinCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 作品类型：视频/图集/合辑 */
    Type: '视频' | '图集' | '合辑'
    /** 评论数量 */
    CommentLength: number
    /** 视频大小(MB) */
    VideoSize?: number
    /** 视频帧率(Hz) */
    VideoFPS?: number
    /** 图片数量 */
    ImageLength?: number
    /** 分享链接 */
    share_url: string
    /** 评论数据 */
    CommentsData: {
      jsonArray: CommentItem[]
    }
  }
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 评论项数据接口
 */
export interface CommentItem {
  /** 用户头像URL */
  userimageurl: string
  /** 用户昵称 */
  nickname: string
  /** 标签类型 (1=作者) */
  label_type?: number
  /** 状态标签 */
  status_label?: string
  /** 评论内容 */
  text: string
  /** 评论图片 */
  commentimage?: string
  /** 贴纸 */
  sticker?: string
  /** 创建时间 */
  create_time: string
  /** IP标签 */
  ip_label: string
  /** 回复数量 */
  reply_comment_total: number
  /** 点赞数 */
  digg_count: number
  /** 搜索高亮关键词数组 */
  search_text?: Array<{
    /** 搜索关键词 */
    search_text: string
    /** 搜索查询ID */
    search_query_id: string
  }> | null
}

/**
 * 二维码组件属性接口
 */
export interface QRCodeSectionProps {
  /** 分享链接 */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 视频信息头部组件属性接口
 */
export interface VideoInfoHeaderProps {
  /** 作品类型 */
  type: string
  /** 评论数量 */
  commentLength: number
  /** 视频大小 */
  videoSize?: number
  /** 视频帧率 */
  videoFPS?: number
  /** 图片数量 */
  imageLength?: number
  /** 分享链接 */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 评论项组件属性接口
 */
export interface CommentItemComponentProps {
  /** 评论数据 */
  comment: CommentItem
}

/**
 * 抖音动态组件属性接口
 */
export interface DouyinDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 封面图片URL */
    image_url: string
    /** 作品描述 */
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
  /** 二维码数据URL */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}

/**
 * 抖音直播组件属性接口
 */
export interface DouyinLiveProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 封面图片URL */
    image_url: string
    /** 直播标题 */
    text: string
    /** 直播信息 */
    liveinf: string
    /** 总观看次数 */
    总观看次数: string
    /** 在线观众 */
    在线观众: string
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
  /** 二维码数据URL */
  qrCodeDataUrl: string
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
}