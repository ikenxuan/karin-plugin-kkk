import { logger } from 'node-karin'

import type { ComponentConfig, ExtendedPlatformConfig } from '../config/components'
import { componentConfigs } from '../config/components'

/**
 * 组件注册表接口
 */
interface ComponentRegistryItem {
  /** 组件构造函数 */
  component: React.ComponentType<any>
  /** 数据类型验证函数 */
  validateData?: (data: any) => boolean
  /** 组件配置 */
  config: ComponentConfig
}

/**
 * 自动组件注册器类
 */
export class ComponentAutoRegistry {
  private static components = new Map<string, ComponentRegistryItem>()
  private static initialized = false

  /**
   * 初始化组件注册器
   * 自动扫描配置文件并注册所有启用的组件
   */
  static async initialize(): Promise<void> {
    if (this.initialized) {
      logger.debug('组件注册器已初始化，跳过重复初始化')
      return
    }

    logger.debug('开始自动注册组件...')
    
    for (const platformConfig of componentConfigs) {
      await this.registerPlatformComponents(platformConfig)
    }

    this.initialized = true
    logger.debug(`✅ 组件自动注册完成，共注册 ${this.components.size} 个组件`)
    logger.debug(`📦 已注册组件: ${Array.from(this.components.keys()).join(', ')}`)
  }

  /**
   * 注册平台下的所有组件
   * @param platformConfig 平台配置
   */
  private static async registerPlatformComponents(platformConfig: ExtendedPlatformConfig): Promise<void> {
    for (const componentConfig of platformConfig.components) {
      if (!componentConfig.enabled) {
        logger.debug(`⏭️ 跳过未启用组件: ${platformConfig.type}:${componentConfig.id}`)
        continue
      }

      try {
        await this.registerComponent(platformConfig.type, componentConfig)
      } catch (error) {
        logger.error(`❌ 注册组件失败: ${platformConfig.type}:${componentConfig.id}`, error)
      }
    }
  }

  /**
   * 注册单个组件
   * @param platform 平台类型
   * @param componentConfig 组件配置
   */
  private static async registerComponent(platform: string, componentConfig: ComponentConfig): Promise<void> {
    const key = `${platform}:${componentConfig.id}`

    // 如果有懒加载函数，使用懒加载
    if (componentConfig.lazyComponent) {
      try {
        const module = await componentConfig.lazyComponent()
        this.components.set(key, {
          component: module.default,
          validateData: componentConfig.validateData,
          config: componentConfig
        })
        logger.debug(`📝 注册懒加载组件: ${key}`)
      } catch (error) {
        logger.error(`❌ 懒加载组件失败: ${key}`, error)
      }
    } else {
      // 如果没有懒加载函数，尝试动态导入
      try {
        const modulePath = `../components/${componentConfig.componentPath}`
        const module = await import(modulePath)
        const component = module[componentConfig.exportName]
        
        if (!component) {
          throw new Error(`组件 ${componentConfig.exportName} 未在模块 ${modulePath} 中找到`)
        }

        this.components.set(key, {
          component,
          validateData: componentConfig.validateData,
          config: componentConfig
        })
        logger.debug(`📝 注册动态导入组件: ${key}`)
      } catch (error) {
        logger.error(`❌ 动态导入组件失败: ${key}`, error)
      }
    }
  }

  /**
   * 获取组件注册项
   * @param platform 平台类型
   * @param componentId 组件ID
   * @returns 组件注册项或undefined
   */
  static get(platform: string, componentId: string): ComponentRegistryItem | undefined {
    const key = `${platform}:${componentId}`
    return this.components.get(key)
  }

  /**
   * 检查组件是否已注册
   * @param platform 平台类型
   * @param componentId 组件ID
   * @returns 是否已注册
   */
  static has(platform: string, componentId: string): boolean {
    const key = `${platform}:${componentId}`
    return this.components.has(key)
  }

  /**
   * 获取所有已注册的组件键
   * @returns 组件键数组
   */
  static getAllKeys(): string[] {
    return Array.from(this.components.keys())
  }

  /**
   * 重新加载组件注册器
   * 用于开发时热更新
   */
  static async reload(): Promise<void> {
    this.components.clear()
    this.initialized = false
    await this.initialize()
  }

  /**
   * 获取组件统计信息
   * @returns 组件统计信息
   */
  static getStats(): { total: number; byPlatform: Record<string, number> } {
    const stats = { total: this.components.size, byPlatform: {} as Record<string, number> }
    
    for (const key of this.components.keys()) {
      const platform = key.split(':')[0]
      stats.byPlatform[platform] = (stats.byPlatform[platform] || 0) + 1
    }

    return stats
  }
}