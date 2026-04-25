import type { ComponentConfig, ExtendedPlatformConfig } from '../config/config'
import { componentConfigs } from '../config/config'
import { logger } from './logger'

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

  private static registrationProgress = { completed: 0, total: 0, currentPlatform: '', currentComponent: '' }

  /**
   * 初始化组件注册器
   * 自动扫描配置文件并注册所有启用的组件
   */
  static async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    // 计算总数
    this.registrationProgress.total = componentConfigs.reduce(
      (sum, p) => sum + p.components.filter(c => c.enabled).length,
      0
    )
    this.registrationProgress.completed = 0

    // 使用 stdout 实现单行更新
    const isTTY = process.stdout.isTTY
    const updateProgress = () => {
      const { completed, total, currentPlatform, currentComponent } = this.registrationProgress
      const message = `🔄 注册组件中... ${completed}/${total} [${currentPlatform}:${currentComponent}]`

      if (isTTY) {
        process.stdout.write(`\r\x1b[K${message}`)
      } else {
        // 非 TTY 环境，使用 logger
        logger.debug(message)
      }
    }

    if (isTTY) {
      process.stdout.write('🔄 开始注册组件...')
    } else {
      logger.info('🔄 开始注册组件...')
    }

    // 串行注册各平台（平台内并行），这样进度更清晰
    for (const platformConfig of componentConfigs) {
      const enabledCount = platformConfig.components.filter(c => c.enabled).length
      if (enabledCount > 0) {
        this.registrationProgress.currentPlatform = platformConfig.type
        updateProgress() // 立即显示当前平台
        await this.registerPlatformComponents(platformConfig, updateProgress)
      }
    }

    this.initialized = true

    // 汇总输出（换行）
    const stats = this.getStats()
    const platforms = Object.entries(stats.byPlatform)
      .map(([name, count]) => `${name}(${count})`)
      .join(', ')

    if (isTTY) {
      process.stdout.write('\r\x1b[K')
    }
    logger.info(`✅ 组件注册完成: 共 ${stats.total} 个 [${platforms}]`)
  }

  /**
   * 注册平台下的所有组件
   * @param platformConfig 平台配置
   * @param onProgress 进度回调
   */
  private static async registerPlatformComponents(
    platformConfig: ExtendedPlatformConfig,
    onProgress?: () => void
  ): Promise<void> {
    const enabledComponents = platformConfig.components.filter(c => c.enabled)

    if (enabledComponents.length === 0) {
      return
    }

    // 串行注册该平台的所有组件，这样进度显示更清晰
    for (const componentConfig of enabledComponents) {
      try {
        this.registrationProgress.currentComponent = componentConfig.id
        onProgress?.()
        await this.registerComponent(platformConfig.type, componentConfig)
      } catch (error) {
        logger.error(`❌ 注册组件失败: ${platformConfig.type}:${componentConfig.id}`, error)
      } finally {
        this.registrationProgress.completed++
        onProgress?.()
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

    // 如果有同步组件，直接使用
    if (componentConfig.component) {
      this.components.set(key, {
        component: componentConfig.component,
        validateData: componentConfig.validateData,
        config: componentConfig
      })
    } else if (componentConfig.lazyComponent) {
      // 如果有懒加载函数，使用懒加载
      const module = await componentConfig.lazyComponent()
      this.components.set(key, {
        component: module.default,
        validateData: componentConfig.validateData,
        config: componentConfig
      })
    } else {
      // 如果没有组件也没有懒加载函数，尝试动态导入
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
