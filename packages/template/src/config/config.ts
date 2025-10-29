/**
 * 统一组件配置文件
 * 所有组件的注册、导入、渲染逻辑都在这里统一管理
 */
import React from 'react'

import { PlatformType } from '../types/platforms'
import { type BaseComponentConfig, baseComponentConfigs, type BasePlatformConfig } from './config-base'

/**
 * 组件配置接口（扩展基础配置）
 */
export interface ComponentConfig extends BaseComponentConfig {
  /** 数据验证函数 */
  validateData?: (data: any) => boolean
  /** 组件懒加载函数 */
  lazyComponent?: () => Promise<{ default: React.ComponentType<any> }>
}

/**
 * 平台配置接口（扩展版）
 */
export interface ExtendedPlatformConfig extends BasePlatformConfig {
  /** 支持的组件列表 */
  components: ComponentConfig[]
}

/**
 * 创建扩展组件配置的辅助函数
 * @param baseConfig 基础组件配置
 * @param extensions 扩展配置
 * @returns 完整的组件配置
 */
function createComponentConfig (
  baseConfig: BaseComponentConfig,
  extensions: Partial<Pick<ComponentConfig, 'validateData' | 'lazyComponent'>> = {}
): ComponentConfig {
  return {
    ...baseConfig,
    ...extensions
  }
}

/**
 * 统一组件配置
 */
export const componentConfigs: ExtendedPlatformConfig[] = baseComponentConfigs.map(basePlatform => {
  const platform: ExtendedPlatformConfig = {
    ...basePlatform,
    components: []
  }

  // 根据平台类型添加懒加载和验证逻辑
  switch (basePlatform.type) {
    case PlatformType.DOUYIN:
      platform.components = basePlatform.components.map(baseComponent => {
        switch (baseComponent.id) {
          case 'comment':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/douyin/Comment').then(module => ({
                default: module.DouyinComment
              }))
            })
          case 'dynamic':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/douyin/Dynamic').then(module => ({
                default: module.DouyinDynamic
              }))
            })
          case 'live':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/douyin/Live').then(module => ({
                default: module.DouyinLive
              }))
            })
          case 'musicinfo':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/douyin/MusicInfo').then(module => ({
                default: module.DouyinMusicInfo
              }))
            })
          case 'user_profile':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string'
            })
          case 'userlist':
            return createComponentConfig(baseComponent, {
              validateData: (data: any) => {
                return data && Array.isArray(data.renderOpt)
              },
              lazyComponent: () => import('../components/platforms/douyin/UserList').then(module => ({
                default: module.default
              }))
            })
          case 'videoInfo':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/douyin/videoInfo').then(module => ({
                default: module.DouyinVideoInfo
              }))
            })
          case 'qrcodeImg':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/douyin/qrcodeImg').then(module => ({
                default: module.DouyinQrcodeImg
              }))
            })
          default:
            return createComponentConfig(baseComponent)
        }
      })
      break

    case PlatformType.BILIBILI:
      platform.components = basePlatform.components.map(baseComponent => {
        switch (baseComponent.id) {
          case 'comment':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/bilibili/Comment').then(module => ({
                default: module.BilibiliComment
              }))
            })
          case 'userlist':
            return createComponentConfig(baseComponent, {
              validateData: (data: any) => {
                return data && Array.isArray(data.renderOpt)
              },
              lazyComponent: () => import('../components/platforms/bilibili/UserList').then(module => ({
                default: module.default
              }))
            })
          case 'bangumi':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/bilibili/bangumi/bangumi').then(module => ({
                default: module.default
              }))
            })
          case 'dynamic/DYNAMIC_TYPE_DRAW':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW').then(module => ({
                default: module.BilibiliDrawDynamic
              }))
            })
          case 'dynamic/DYNAMIC_TYPE_AV':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_AV').then(module => ({
                default: module.BilibiliVideoDynamic
              }))
            })
          case 'dynamic/DYNAMIC_TYPE_FORWARD':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD').then(module => ({
                default: module.BilibiliForwardDynamic
              }))
            })
          case 'dynamic/DYNAMIC_TYPE_LIVE_RCMD':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD').then(module => ({
                default: module.BilibiliLiveDynamic
              }))
            })
          case 'dynamic/DYNAMIC_TYPE_WORD':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string'
            })
          case 'dynamic/DYNAMIC_TYPE_ARTICLE':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_ARTICLE').then(module => ({
                default: module.BilibiliArticleDynamic
              }))
            })
          case 'videoInfo':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/bilibili/videoInfo').then(module => ({
                default: module.BilibiliVideoInfo
              }))
            })
          case 'qrcodeImg':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/bilibili/qrcodeImg').then(module => ({
                default: module.BilibiliQrcodeImg
              }))
            })
          default:
            return createComponentConfig(baseComponent)
        }
      })
      break

    case PlatformType.KUAISHOU:
      platform.components = basePlatform.components.map(baseComponent => {
        switch (baseComponent.id) {
          case 'comment':
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === 'string',
              lazyComponent: () => import('../components/platforms/kuaishou/Comment').then(module => ({
                default: module.KuaishouComment
              }))
            })
          default:
            return createComponentConfig(baseComponent)
        }
      })
      break

    case PlatformType.XIAOHONGSHU:
      platform.components = basePlatform.components.map(baseComponent => {
        switch (baseComponent.id) {
          case 'noteInfo':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/xiaohongshu/noteInfo').then(module => ({
                default: module.XiaohongshuNoteInfo
              }))
            })
          case 'comment':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/xiaohongshu/Comment').then(module => ({
                default: module.XiaohongshuComment
              }))
            })
          default:
            return createComponentConfig(baseComponent)
        }
      })
      break

    case PlatformType.OTHER:
      platform.components = basePlatform.components.map(baseComponent => {
        switch (baseComponent.id) {
          case 'help':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/other/Help').then(module => ({
                default: module.Help
              }))
            })
          case 'handlerError':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/other/handlerError').then(module => ({
                default: module.handlerError
              }))
            })
          case 'changelog':
            return createComponentConfig(baseComponent, {
              lazyComponent: () => import('../components/platforms/other/changelog').then(module => ({
                default: module.Changelog
              }))
            })
          default:
            return createComponentConfig(baseComponent)
        }
      })
      break

    default:
      platform.components = basePlatform.components.map(baseComponent =>
        createComponentConfig(baseComponent)
      )
  }

  return platform
})

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