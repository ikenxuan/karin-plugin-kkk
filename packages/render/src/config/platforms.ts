import { PlatformConfig, PlatformType, TemplateConfig } from '../types/platforms'

/**
 * 抖音平台模板配置
 */
const douyinTemplates: TemplateConfig[] = [
  {
    id: 'dynamic',
    name: '动态作品',
    platform: PlatformType.DOUYIN,
    description: '抖音动态作品展示模板',
    enabled: true
  },
  {
    id: 'comment',
    name: '评论列表',
    platform: PlatformType.DOUYIN,
    description: '抖音评论列表展示模板',
    enabled: true
  },
  {
    id: 'live',
    name: '直播间',
    platform: PlatformType.DOUYIN,
    description: '抖音直播间信息模板',
    enabled: true
  },
  {
    id: 'user_profile',
    name: '用户主页',
    platform: PlatformType.DOUYIN,
    description: '抖音用户主页信息模板',
    enabled: false
  }
]

/**
 * B站平台模板配置
 */
const bilibiliTemplates: TemplateConfig[] = [
  {
    id: 'video',
    name: '视频信息',
    platform: PlatformType.BILIBILI,
    description: 'B站视频信息展示模板',
    enabled: false
  },
  {
    id: 'comment',
    name: '评论列表',
    platform: PlatformType.BILIBILI,
    description: 'B站视频稿件评论列表展示模板',
    enabled: true
  },
  {
    id: 'dynamic',
    name: '动态',
    platform: PlatformType.BILIBILI,
    description: 'B站动态展示模板',
    enabled: false
  }
]

/**
 * 快手平台模板配置
 */
const kuaishouTemplates: TemplateConfig[] = [
  {
    id: 'video',
    name: '视频信息',
    platform: PlatformType.KUAISHOU,
    description: '快手视频信息展示模板',
    enabled: false
  }
]

/**
 * 平台配置列表
 */
export const platformConfigs: PlatformConfig[] = [
  {
    type: PlatformType.DOUYIN,
    name: '抖音',
    icon: '🎵',
    color: 'danger',
    templates: douyinTemplates
  },
  {
    type: PlatformType.BILIBILI,
    name: 'B站',
    icon: '📺',
    color: 'primary',
    templates: bilibiliTemplates
  },
  {
    type: PlatformType.KUAISHOU,
    name: '快手',
    icon: '⚡',
    color: 'warning',
    templates: kuaishouTemplates
  }
]

/**
 * 根据平台类型获取配置
 * @param platform 平台类型
 * @returns 平台配置
 */
export function getPlatformConfig(platform: PlatformType): PlatformConfig | undefined {
  return platformConfigs.find(config => config.type === platform)
}

/**
 * 获取启用的模板列表
 * @param platform 平台类型
 * @returns 启用的模板配置列表
 */
export function getEnabledTemplates(platform: PlatformType): TemplateConfig[] {
  const config = getPlatformConfig(platform)
  return config?.templates.filter(template => template.enabled) || []
}