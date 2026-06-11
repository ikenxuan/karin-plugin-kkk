/**
 * 路由常量定义
 */

// 主路由前缀
export const KKK_PREFIX = '/kkk'

// 子路由前缀
/** 静态文件 */
export const ASSETS_PREFIX = '/assets'
/** SSR 页面 */
export const SSR_PREFIX = '/ssr'
/** API v1 */
export const API_V1_PREFIX = '/v1'

// 完整路径
/** 静态文件完整路径 */
export const FULL_ASSETS_PREFIX = `${KKK_PREFIX}${ASSETS_PREFIX}`
/** SSR 页面完整路径 */
export const FULL_SSR_PREFIX = `${KKK_PREFIX}${SSR_PREFIX}`
/** API v1 完整路径 */
export const FULL_API_V1_PREFIX = `${KKK_PREFIX}${API_V1_PREFIX}`

// API 路由
export const ROUTES = {
  // Bot 管理
  /** 获取所有 Bot */
  BOTS: '/bots',
  /** 获取指定 Bot 信息 */
  BOT_INFO: '/bots/:botId',
  /** 获取指定 Bot 的群列表 */
  BOT_GROUPS: '/bots/:botId/groups',
  /** 获取指定 Bot 群信息 */
  BOT_GROUP_INFO: '/bots/:botId/groups/:groupId',

  // 群组管理
  /** 获取所有群组 */
  GROUPS_BATCH: '/groups/batch',

  // 配置管理
  /** 获取插件所有配置 */
  CONFIG: '/config',

  // 视频流
  /** 获取视频流 */
  VIDEO_STREAM: '/stream/:filename',
  /** 获取视频事件 */
  VIDEO_EVENTS: '/video/:filename/events',

  // SSR 页面
  /** 视频播放页面 */
  VIDEO_PAGE: '/video/:filename'
} as const
