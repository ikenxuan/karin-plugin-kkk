/**
 * 基础组件配置文件
 * 用于构建工具和服务器端代码
 */
import { PlatformType } from '../types/platforms'

/**
 * 基础组件配置接口
 */
export interface BaseComponentConfig {
  /** 组件ID */
  id: string
  /** 组件名称 */
  name: string
  /** 组件描述 */
  description?: string
  /** 是否启用 */
  enabled: boolean
  /** 组件文件路径（相对于components目录） */
  componentPath: string
  /** 组件导出名称 */
  exportName: string
}

/**
 * 基础平台配置接口
 */
export interface BasePlatformConfig {
  /** 平台类型 */
  type: PlatformType
  /** 平台名称 */
  name: string
  /** 平台图标 */
  icon: string
  /** 平台颜色 */
  color: string
  /** 支持的组件列表 */
  components: BaseComponentConfig[]
}

/**
 * 基础组件配置（不包含懒加载）
 */
export const baseComponentConfigs: BasePlatformConfig[] = [
  {
    type: PlatformType.DOUYIN,
    name: '抖音',
    icon: '🎵',
    color: 'danger',
    components: [
      {
        id: 'comment',
        name: '评论列表',
        description: '抖音评论列表展示模板',
        enabled: true,
        componentPath: 'platforms/douyin/Comment',
        exportName: 'DouyinComment'
      },
      {
        id: 'dynamic',
        name: '作品列表',
        description: '抖音作品列表推送模板',
        enabled: true,
        componentPath: 'platforms/douyin/Dynamic',
        exportName: 'DouyinDynamic'
      },
      {
        id: 'video-work',
        name: '视频作品',
        description: '抖音视频作品推送模板',
        enabled: true,
        componentPath: 'platforms/douyin/VideoWork',
        exportName: 'DouyinVideoWork'
      },
      {
        id: 'image-work',
        name: '图文作品',
        description: '抖音图文作品推送模板',
        enabled: true,
        componentPath: 'platforms/douyin/ImageWork',
        exportName: 'DouyinImageWork'
      },
      {
        id: 'article-work',
        name: '文章作品',
        description: '抖音文章作品推送模板',
        enabled: true,
        componentPath: 'platforms/douyin/ArticleWork',
        exportName: 'DouyinArticleWork'
      },
      {
        id: 'favorite-list',
        name: '喜欢列表',
        description: '抖音喜欢列表推送模板',
        enabled: true,
        componentPath: 'platforms/douyin/FavoriteList',
        exportName: 'DouyinFavoriteList'
      },
      {
        id: 'recommend-list',
        name: '推荐列表',
        description: '抖音推荐列表推送模板',
        enabled: true,
        componentPath: 'platforms/douyin/RecommendList',
        exportName: 'DouyinRecommendList'
      },
      {
        id: 'live',
        name: '直播状态',
        description: '抖音直播状态推送模板',
        enabled: true,
        componentPath: 'platforms/douyin/Live',
        exportName: 'DouyinLive'
      },
      {
        id: 'musicinfo',
        name: '音乐信息',
        description: '抖音音乐信息展示模板',
        enabled: true,
        componentPath: 'platforms/douyin/MusicInfo',
        exportName: 'DouyinMusicInfo'
      },
      {
        id: 'user_profile',
        name: '用户主页',
        description: '抖音用户主页信息模板',
        enabled: true,
        componentPath: 'platforms/douyin/UserProfile',
        exportName: 'DouyinUserProfile'
      },
      {
        id: 'userlist',
        name: '抖音推送列表',
        description: '抖音用户推送列表组件',
        enabled: true,
        componentPath: 'platforms/douyin/UserList',
        exportName: 'default'
      },
      {
        id: 'videoInfo',
        name: '视频信息',
        description: '抖音视频信息展示模板',
        enabled: true,
        componentPath: 'platforms/douyin/videoInfo',
        exportName: 'DouyinVideoInfo'
      },
      {
        id: 'qrcodeImg',
        name: '登录二维码',
        description: '抖音登录二维码展示模板',
        enabled: true,
        componentPath: 'platforms/douyin/qrcodeImg',
        exportName: 'DouyinQrcodeImg'
      }
    ]
  },
  {
    type: PlatformType.BILIBILI,
    name: 'B站',
    icon: '📺',
    color: 'primary',
    components: [
      {
        id: 'comment',
        name: '评论列表',
        description: 'B站视频稿件评论列表展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/Comment',
        exportName: 'default'
      },
      {
        id: 'userlist',
        name: 'B站推送列表',
        description: 'B站用户推送列表组件',
        enabled: true,
        componentPath: 'platforms/bilibili/UserList',
        exportName: 'default'
      },
      {
        id: 'bangumi',
        name: 'B站番剧列表',
        description: 'B站番剧列表组件',
        enabled: true,
        componentPath: 'platforms/bilibili/bangumi/BangumiBilibili',
        exportName: 'default'
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_DRAW',
        name: '图文动态',
        description: 'B站图文动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW',
        exportName: 'BilibiliDrawDynamic'
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_WORD',
        name: '纯文动态',
        description: 'B站纯文动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_WORD',
        exportName: 'BilibiliWordDynamic'
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_AV',
        name: '视频动态',
        description: 'B站视频动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_AV',
        exportName: 'BilibiliVideoDynamic'
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_FORWARD',
        name: '转发动态',
        description: 'B站转发动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD',
        exportName: 'BilibiliForwardDynamic'
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_LIVE_RCMD',
        name: '直播动态',
        description: 'B站直播动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
        exportName: 'BilibiliLiveDynamic'
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_ARTICLE',
        name: '专栏动态',
        description: 'B站专栏动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_ARTICLE',
        exportName: 'BilibiliArticleDynamic'
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_WORD',
        name: '纯文字动态',
        description: 'B站纯文字动态展示模板',
        enabled: false,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_WORD',
        exportName: 'BilibiliWordDynamic'
      },
      {
        id: 'videoInfo',
        name: '视频信息',
        description: 'B站视频信息展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/videoInfo',
        exportName: 'BilibiliVideoInfo'
      },
      {
        id: 'qrcodeImg',
        name: '登录二维码',
        description: 'B站登录二维码展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/qrcodeImg',
        exportName: 'BilibiliQrcodeImg'
      }
    ]
  },
  {
    type: PlatformType.KUAISHOU,
    name: '快手',
    icon: '⚡',
    color: 'warning',
    components: [
      {
        id: 'comment',
        name: '评论列表',
        description: '快手视频评论列表展示模板',
        enabled: true,
        componentPath: 'platforms/kuaishou/Comment',
        exportName: 'KuaishouComment'
      }
    ]
  },
  {
    type: PlatformType.XIAOHONGSHU,
    name: '小红书',
    icon: '⚡',
    color: 'warning',
    components: [
      {
        id: 'noteInfo',
        name: '笔记信息',
        description: '小红书笔记信息展示模板',
        enabled: true,
        componentPath: 'platforms/xiaohongshu/noteInfo',
        exportName: 'XiaohongshuNoteInfo'
      },
      {
        id: 'comment',
        name: '评论列表',
        description: '小红书评论列表展示模板',
        enabled: true,
        componentPath: 'platforms/xiaohongshu/comment',
        exportName: 'XiaohongshuComment'
      }
    ]
  },
  {
    type: PlatformType.OTHER,
    name: '其他',
    icon: '❓',
    color: 'secondary',
    components: [
      {
        id: 'help',
        name: '帮助页面',
        description: 'KKK插件帮助页面',
        enabled: true,
        componentPath: 'platforms/help/Help',
        exportName: 'Help'
      },
      {
        id: 'handlerError',
        name: '错误页面',
        description: 'KKK插件错误页面',
        enabled: true,
        componentPath: 'platforms/other/handlerError',
        exportName: 'handlerError'
      },
      {
        id: 'changelog',
        name: '更新日志',
        description: 'KKK插件更新日志',
        enabled: true,
        componentPath: 'platforms/other/changelog',
        exportName: 'changelog'
      },
      {
        id: 'version_warning',
        name: '版本警告',
        description: '版本不兼容警告页面',
        enabled: true,
        componentPath: 'platforms/other/VersionWarning',
        exportName: 'VersionWarning'
      },
      {
        id: 'qrlogin',
        name: 'APP扫码登录',
        description: 'APP扫码登录二维码页面',
        enabled: true,
        componentPath: 'platforms/other/qrlogin',
        exportName: 'QrLogin'
      }
    ]
  }
]

/**
 * 根据平台类型获取基础配置
 * @param platform 平台类型
 * @returns 平台配置
 */
export function getBasePlatformConfig (platform: PlatformType): BasePlatformConfig | undefined {
  return baseComponentConfigs.find(config => config.type === platform)
}

/**
 * 获取启用的基础组件列表
 * @param platform 平台类型
 * @returns 启用的组件配置列表
 */
export function getBaseEnabledComponents (platform: PlatformType): BaseComponentConfig[] {
  const config = getBasePlatformConfig(platform)
  return config?.components.filter(component => component.enabled) || []
}