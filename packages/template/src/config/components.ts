/**
 * 统一组件配置文件
 * 所有组件的注册、导入、渲染逻辑都在这里统一管理
 */
import React from 'react'

import { PlatformType } from '../types/platforms'

/**
 * 组件配置接口
 */
export interface ComponentConfig {
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
  /** 数据验证函数 */
  validateData?: (data: any) => boolean
  /** 组件懒加载函数 */
  lazyComponent?: () => Promise<{ default: React.ComponentType<any> }>
}

/**
 * 平台配置接口（扩展版）
 */
export interface ExtendedPlatformConfig {
  /** 平台类型 */
  type: PlatformType
  /** 平台名称 */
  name: string
  /** 平台图标 */
  icon: string
  /** 平台颜色 */
  color: string
  /** 支持的组件列表 */
  components: ComponentConfig[]
}

/**
 * 统一组件配置
 */
export const componentConfigs: ExtendedPlatformConfig[] = [
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
        exportName: 'DouyinComment',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/douyin/Comment').then(module => ({
          default: module.DouyinComment
        }))
      },
      {
        id: 'dynamic',
        name: '动态作品',
        description: '抖音动态作品展示模板',
        enabled: true,
        componentPath: 'platforms/douyin/Dynamic',
        exportName: 'DouyinDynamic',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/douyin/Dynamic').then(module => ({
          default: module.DouyinDynamic
        }))
      },
      {
        id: 'live',
        name: '直播间',
        description: '抖音直播间信息模板',
        enabled: true,
        componentPath: 'platforms/douyin/Live',
        exportName: 'DouyinLive',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/douyin/Live').then(module => ({
          default: module.DouyinLive
        }))
      },
      {
        id: 'user_profile',
        name: '用户主页',
        description: '抖音用户主页信息模板',
        enabled: false,
        componentPath: 'platforms/douyin/UserProfile',
        exportName: 'DouyinUserProfile',
        validateData: (data) => data && typeof data.share_url === 'string'
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
        exportName: 'BilibiliComment',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/bilibili/Comment').then(module => ({
          default: module.BilibiliComment
        }))
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_DRAW',
        name: '图文动态',
        description: 'B站图文动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW',
        exportName: 'BilibiliDrawDynamic',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW').then(module => ({
          default: module.BilibiliDrawDynamic
        }))
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_AV',
        name: '视频动态',
        description: 'B站视频动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_AV',
        exportName: 'BilibiliVideoDynamic',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_AV').then(module => ({
          default: module.BilibiliVideoDynamic
        }))
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_FORWARD',
        name: '转发动态',
        description: 'B站转发动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD',
        exportName: 'BilibiliForwardDynamic',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD').then(module => ({
          default: module.BilibiliForwardDynamic
        }))
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_LIVE_RCMD',
        name: '直播动态',
        description: 'B站直播动态展示模板',
        enabled: true,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
        exportName: 'BilibiliLiveDynamic',
        validateData: (data) => data && typeof data.share_url === 'string',
        lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD').then(module => ({
          default: module.BilibiliLiveDynamic
        }))
      },
      {
        id: 'dynamic/DYNAMIC_TYPE_WORD',
        name: '纯文字动态',
        description: 'B站纯文字动态展示模板',
        enabled: false,
        componentPath: 'platforms/bilibili/dynamic/DYNAMIC_TYPE_WORD',
        exportName: 'BilibiliWordDynamic',
        validateData: (data) => data && typeof data.share_url === 'string'
      },
      {
        id: 'video',
        name: '视频信息',
        description: 'B站视频信息展示模板',
        enabled: false,
        componentPath: 'platforms/bilibili/Video',
        exportName: 'BilibiliVideo',
        validateData: (data) => data && typeof data.share_url === 'string'
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
        id: 'video',
        name: '视频信息',
        description: '快手视频信息展示模板',
        enabled: false,
        componentPath: 'platforms/kuaishou/Video',
        exportName: 'KuaishouVideo',
        validateData: (data) => data && typeof data.share_url === 'string'
      }
    ]
  }
]

/**
 * 根据平台类型获取配置
 * @param platform 平台类型
 * @returns 平台配置
 */
export function getPlatformConfig (platform: PlatformType): ExtendedPlatformConfig | undefined {
  return componentConfigs.find(config => config.type === platform)
}

/**
 * 获取启用的组件列表
 * @param platform 平台类型
 * @returns 启用的组件配置列表
 */
export function getEnabledComponents (platform: PlatformType): ComponentConfig[] {
  const config = getPlatformConfig(platform)
  return config?.components.filter(component => component.enabled) || []
}

/**
 * 根据平台和组件ID获取组件配置
 * @param platform 平台类型
 * @param componentId 组件ID
 * @returns 组件配置
 */
export function getComponentConfig (platform: PlatformType, componentId: string): ComponentConfig | undefined {
  const platformConfig = getPlatformConfig(platform)
  return platformConfig?.components.find(component => component.id === componentId)
}

/**
 * 获取所有启用的组件配置（扁平化）
 * @returns 所有启用的组件配置
 */
export function getAllEnabledComponents (): Array<ComponentConfig & { platform: PlatformType }> {
  return componentConfigs.flatMap(platformConfig =>
    platformConfig.components
      .filter(component => component.enabled)
      .map(component => ({ ...component, platform: platformConfig.type }))
  )
}