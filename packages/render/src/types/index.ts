/**
 * 渲染请求参数接口
 */
export interface RenderRequest<T = any> { 
  /** 模板类型 */
  templateType: 'douyin' | 'bilibili' | 'kuaishou' | 'admin' | 'help' | 'apiError'
  /** 模板名称 */
  templateName: string
  /** 缩放比例 */
  scale?: number
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
  /** 版本信息 */
  version: {
    /** 插件名称 */
    pluginName: string
    /** 插件版本 */
    pluginVersion: string
    /** 发布类型 */
    releaseType: string
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
  htmlPath?: string
  /** 错误信息 */
  error?: string
}

/**
 * 组件属性基础接口 - 泛型T为子组件的具体数据类型
 * @template T 子组件的数据类型
 */
export interface BaseComponentProps<T = Record<string, any>> extends Pick<RenderRequest<T>, 'data' | 'version' | 'scale'> {
  /** 渲染数据 - 子组件的具体参数 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
  } & T
}

/**
 * 抖音动态组件数据接口
 */
export interface DouyinDynamicData {
  /** 封面图片URL */
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
  /** 头像URL */
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
}

/**
 * 抖音动态组件属性接口
 */
export interface DouyinDynamicProps extends BaseComponentProps<DouyinDynamicData> {}