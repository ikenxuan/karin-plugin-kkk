/**
 * 平台类型枚举
 */
export enum PlatformType {
  DOUYIN = 'douyin',
  BILIBILI = 'bilibili',
  KUAISHOU = 'kuaishou',
  XIAOHONGSHU = 'xiaohongshu',
  HELP = 'help',
  OTHER = 'other'
}
/**
 * 模板基础接口
 */
export interface BaseTemplateData {
  /** 是否使用深色主题 */
  useDarkTheme?: boolean
  /** 分享链接 */
  share_url: string
}

/**
 * 模板配置接口
 */
export interface TemplateConfig {
  /** 模板ID */
  id: string
  /** 模板名称 */
  name: string
  /** 平台类型 */
  platform: PlatformType
  /** 模板描述 */
  description?: string
  /** 是否启用 */
  enabled: boolean
}

/**
 * 平台配置接口
 */
export interface PlatformConfig {
  /** 平台类型 */
  type: PlatformType
  /** 平台名称 */
  name: string
  /** 平台图标 */
  icon: string
  /** 平台颜色 */
  color: string
  /** 支持的模板列表 */
  templates: TemplateConfig[]
}
