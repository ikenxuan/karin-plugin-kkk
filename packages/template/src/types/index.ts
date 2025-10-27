/**
 * 渲染请求参数接口
 */
export interface RenderRequest<T = Record<string, unknown>> {
  /** 模板类型 */
  templateType: 'douyin' | 'bilibili' | 'kuaishou' | 'other' | 'apiError'
  /** 模板名称 */
  templateName: string
  /** 缩放比例 */
  scale?: number
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
  /** 版本信息 */
  version?: {
    /** 插件名称 */
    pluginName: string
    /** 插件版本 */
    pluginVersion: string
    /** 发布类型 */
    releaseType: 'Stable' | 'Preview'
    /** 驱动框架 */
    poweredBy: string
  }
  /** 渲染数据 */
  data: T & {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 二维码分享链接 */
    share_url?: string
  }
}

/**
 * 渲染响应结果接口
 */
export interface RenderResponse {
  /** 是否成功 */
  success: boolean
  /** HTML文件路径 */
  htmlPath: string
  /** 错误信息 */
  error?: string
}

/**
 * 组件属性基础接口 - 泛型T为子组件的具体数据类型
 * @template T 子组件的数据类型
 */
export interface BaseComponentProps<T = Record<string, any>> extends Pick<TypedRenderRequest<keyof DataTypeMap>, 'data' | 'version' | 'scale'> {
  /** 渲染数据 - 子组件的具体参数 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
  } & T
}

/**
 * 抖音平台组件ID
 */
type DouyinComponentIds = 'comment' | 'dynamic' | 'live' | 'musicinfo' | 'user_profile' | 'userlist' | 'videoInfo'

/**
 * B站平台组件ID
 */
type BilibiliComponentIds =
  | 'comment'
  | 'userlist'
  | 'bangumi'
  | 'videoInfo'
  | 'qrcodeImg'
  | 'dynamic/DYNAMIC_TYPE_DRAW'
  | 'dynamic/DYNAMIC_TYPE_AV'
  | 'dynamic/DYNAMIC_TYPE_FORWARD'
  | 'dynamic/DYNAMIC_TYPE_LIVE_RCMD'
  | 'dynamic/DYNAMIC_TYPE_WORD'

/**
 * 快手平台组件ID
 */
type KuaishouComponentIds = 'comment'

/**
 * 小红书平台组件ID
 */
type XiaohongshuComponentIds = 'noteInfo' | 'comment'

/**
 * 其他平台组件ID
 */
type OtherComponentIds = 'help' | 'handlerError' | 'changelog'

/**
 * 路径类型
 */
export type DynamicRenderPath =
  | `douyin/${DouyinComponentIds}`
  | `bilibili/${BilibiliComponentIds}`
  | `kuaishou/${KuaishouComponentIds}`
  | `xiaohongshu/${XiaohongshuComponentIds}`
  | `other/${OtherComponentIds}`

/**
 * 路径到数据类型的精确映射接口
 */
interface PathToDataTypeMap {
  // 抖音相关路径
  'douyin/comment': import('./platforms/douyin').DouyinCommentProps['data']
  'douyin/dynamic': import('./platforms/douyin').DouyinDynamicProps['data']
  'douyin/live': import('./platforms/douyin').DouyinLiveProps['data']
  'douyin/musicinfo': import('./platforms/douyin').DouyinMusicInfoProps['data']
  'douyin/user_profile': any // 暂未启用
  'douyin/userlist': import('./platforms/douyin').DouyinUserListProps['data']
  'douyin/videoInfo': import('./platforms/douyin').DouyinVideoInfoProps['data']

  // B站相关路径
  'bilibili/comment': import('./platforms/bilibili').BilibiliCommentProps['data']
  'bilibili/userlist': import('./platforms/bilibili').BilibiliUserListProps['data']
  'bilibili/bangumi': import('./platforms/bilibili').BilibiliBangumiProps['data']
  'bilibili/videoInfo': import('./platforms/bilibili').BilibiliVideoInfoProps['data']
  'bilibili/qrcodeImg': import('./platforms/bilibili').BilibiliQrcodeImgProps['data']
  'bilibili/dynamic/DYNAMIC_TYPE_DRAW': import('./platforms/bilibili/dynamic/normal').BilibiliDynamicProps['data']
  'bilibili/dynamic/DYNAMIC_TYPE_AV': import('./platforms/bilibili/dynamic/video').BilibiliVideoDynamicProps['data']
  'bilibili/dynamic/DYNAMIC_TYPE_FORWARD': import('./platforms/bilibili/dynamic/forward').BilibiliForwardDynamicProps['data']
  'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD': import('./platforms/bilibili/dynamic/live').BilibiliLiveDynamicProps['data']
  'bilibili/dynamic/DYNAMIC_TYPE_WORD': import('./platforms/bilibili/dynamic/normal').BilibiliDynamicProps['data']

  // 快手相关路径
  'kuaishou/comment': import('./platforms/kuaishou').KuaishouCommentProps['data']

  // 小红书相关路径
  'xiaohongshu/noteInfo': import('./platforms/xiaohongshu').XiaohongshuNoteInfoProps['data']
  'xiaohongshu/comment': import('./platforms/xiaohongshu').XiaohongshuCommentProps['data']
  
  // 其他平台路径
  'other/help': import('./help').HelpProps['data']
  'other/handlerError': import('./ohter/handlerError').ApiErrorProps['data']
  'other/changelog': import('./ohter/changelog').ChangelogProps['data']
}

/**
 * 从路径字符串中提取数据类型的工具类型
 * @template P 路径字符串
 */
export type ExtractDataTypeFromPath<P extends string> = P extends keyof PathToDataTypeMap
  ? PathToDataTypeMap[P]
  : Record<string, any>


/**
 * 模板类型到数据类型的映射接口
 */
export interface DataTypeMap {
  /** 抖音平台数据类型 */
  douyin: import('./platforms/douyin').DouyinCommentProps['data'] | import('./platforms/douyin').DouyinDynamicProps['data'] | import('./platforms/douyin').DouyinLiveProps['data'] | import('./platforms/douyin').DouyinMusicInfoProps['data']
  /** B站平台数据类型 */
  bilibili: import('./platforms/bilibili').BilibiliCommentProps['data'] | import('./platforms/bilibili/dynamic/forward').BilibiliForwardDynamicProps['data']
  /** 快手平台数据类型 */
  kuaishou: import('./platforms/kuaishou').KuaishouCommentProps['data']
  /** 其他类型数据 */
  other: import('./help').HelpProps['data']
}

/**
 * 渲染请求接口
 * @template K 模板类型键
 */
export interface TypedRenderRequest<K extends keyof DataTypeMap> extends Omit<RenderRequest, 'templateType' | 'data'> {
  /** 模板类型 */
  templateType: K
  /** 渲染数据 */
  data: DataTypeMap[K]
}