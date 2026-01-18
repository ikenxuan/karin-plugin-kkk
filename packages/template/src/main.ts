import fs from 'node:fs'
import path from 'node:path'

import React from 'react'
import { renderToString } from 'react-dom/server'

import type { DataTypeMap, RenderRequest, RenderResponse, TypedRenderRequest } from './types'
import { ComponentAutoRegistry } from './utils/ComponentAutoRegistry'
import { DevDataManager } from './utils/DevDataManager'
import { logger } from './utils/logger'

/**
 * 插件执行时机
 * - pre: 在渲染前执行
 * - normal: 在渲染时执行
 * - post: 在渲染后执行
 */
type PluginEnforce = 'pre' | 'normal' | 'post'

/**
 * 渲染状态接口
 * 用于在插件之间传递和修改渲染状态
 */
interface RenderState {
  /** 传递给组件的额外属性 */
  props: Record<string, unknown>
  /** React 组件实例 */
  component?: React.ReactElement | null
  /** 渲染后的 HTML 字符串 */
  html?: string
}

/**
 * 插件上下文接口
 * 提供插件执行时所需的所有上下文信息
 * @template T 渲染数据类型
 */
interface PluginContext<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 渲染请求对象 */
  request: RenderRequest<T>
  /** 输出目录路径 */
  outputDir: string
  /** 资源路径管理器实例 */
  resourceManager: ResourcePathManager
  /** 当前渲染状态 */
  state: RenderState
}

/**
 * 模板插件接口
 * 定义插件的生命周期钩子和配置
 * @template T 渲染数据类型
 */
interface TemplatePlugin<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 插件名称，用于标识和调试 */
  name: string
  /** 插件执行时机，默认为 'normal' */
  enforce?: PluginEnforce
  /** 插件应用条件，返回 true 时插件生效 */
  apply?: (request: RenderRequest<T>) => boolean
  /** 渲染前钩子，用于准备数据和属性 */
  beforeRender?: (ctx: PluginContext<T>) => Promise<void> | void
  /** 渲染时钩子，可以包装或替换组件 */
  render?: (ctx: PluginContext<T>) => Promise<void> | void
  /** 渲染后钩子，可以修改最终的 HTML */
  afterRender?: (ctx: PluginContext<T>) => Promise<void> | void
}

/**
 * 简化的插件类型，下游使用时无需手动指定泛型
 * 自动使用 Record<string, unknown> 作为数据类型
 */
type Plugin = TemplatePlugin<Record<string, unknown>>

/**
 * 插件工厂函数类型
 * 用于创建可配置的插件实例
 * @template T 插件配置类型
 */
type PluginFactory<T = Record<string, unknown>> = (options?: T) => Plugin

/**
 * 插件容器类
 * 负责管理和执行插件的生命周期
 */
class PluginContainer {
  private plugins: TemplatePlugin[] = []

  constructor (plugins: TemplatePlugin[]) {
    const order = { pre: -1, normal: 0, post: 1 }
    this.plugins = [...plugins].sort((a, b) => (order[a.enforce ?? 'normal']) - (order[b.enforce ?? 'normal']))
  }

  /**
   * 判断插件是否应该应用于当前请求
   * @param plugin 插件实例
   * @param request 渲染请求
   * @returns 是否应用插件
   */
  private shouldApply<T extends Record<string, unknown>> (plugin: TemplatePlugin<T>, request: RenderRequest<T>): boolean {
    try {
      return plugin.apply ? plugin.apply(request) : true
    } catch (err) {
      logger.warn(`插件 ${plugin.name} 的 apply() 抛出异常，已跳过`, err)
      return false
    }
  }

  /**
   * 执行渲染前插件
   * @param ctx 插件上下文
   */
  async runBefore<T extends Record<string, unknown>> (ctx: PluginContext<T>): Promise<void> {
    for (const plugin of this.plugins) {
      if (this.shouldApply(plugin, ctx.request)) {
        await plugin.beforeRender?.(ctx)
      }
    }
  }

  /**
   * 执行渲染时插件
   * @param ctx 插件上下文
   */
  async runDuring<T extends Record<string, unknown>> (ctx: PluginContext<T>): Promise<void> {
    for (const plugin of this.plugins) {
      if (this.shouldApply(plugin, ctx.request)) {
        await plugin.render?.(ctx)
      }
    }
  }

  /**
   * 执行渲染后插件
   * @param ctx 插件上下文
   */
  async runAfter<T extends Record<string, unknown>> (ctx: PluginContext<T>): Promise<void> {
    for (const plugin of this.plugins) {
      if (this.shouldApply(plugin, ctx.request)) {
        await plugin.afterRender?.(ctx)
      }
    }
  }
}

/**
 * 组件渲染器工厂类
 * 负责创建和配置 React 组件实例
 */
class ComponentRendererFactory {
  /**
   * 创建组件实例
   * @param request 渲染请求对象
   * @param extraProps 额外的组件属性
   * @returns React 组件元素
   * @throws 当组件未找到或数据验证失败时抛出错误
   */
  static async createComponent<T extends Record<string, unknown>> (
    request: RenderRequest<T>,
    extraProps: Record<string, unknown> = {}
  ): Promise<React.ReactElement> {
    const { templateType, templateName } = request

    const registryItem = ComponentAutoRegistry.get(templateType, templateName)

    if (!registryItem) {
      throw new Error(`未找到组件配置: ${templateType}:${templateName}`)
    }

    if (registryItem.validateData && !registryItem.validateData(request.data)) {
      throw new Error(`数据验证失败: ${templateType}:${templateName}`)
    }

    const props = {
      data: request.data,
      version: request.version,
      scale: request.scale,
      ...extraProps
    }

    // 处理嵌套模板名称（如 dynamic/DYNAMIC_TYPE_DRAW）
    if (templateName.includes('/')) {
      const subType = templateName.split('/')[1]
        ; (props as Record<string, unknown>).subType = subType
    }

    return React.createElement(registryItem.component, props)
  }
}

/**
 * 资源路径管理器类
 * 负责管理不同环境下的资源路径配置
 */
class ResourcePathManager {
  private packageDir: string
  private NODE_ENV: string
  private static initialized = false

  constructor () {
    this.NODE_ENV = process.env.NODE_ENV || 'production'
    this.packageDir = this.getPackageDir()
    ResourcePathManager.initialized = true
  }

  /**
   * 获取包目录路径
   * @returns 包目录的绝对路径
   */
  private getPackageDir (): string {
    const cwd = process.cwd()

    switch (this.NODE_ENV) {
      case 'development':
        return this.findDevelopmentDir(cwd)

      case 'production':
      default:
        return this.getPackageDirFromImportMeta()
    }
  }

  /**
   * 查找开发环境目录
   * @param cwd 当前工作目录
   * @returns 开发环境目录路径
   */
  private findDevelopmentDir (cwd: string): string {
    let currentDir = cwd
    while (currentDir !== path.dirname(currentDir)) {
      const renderDir = path.join(currentDir, 'render')
      if (fs.existsSync(renderDir)) {
        if (!ResourcePathManager.initialized) {
          logger.debug('开发模式：找到 render 目录:', renderDir)
        }
        return currentDir
      }
      currentDir = path.dirname(currentDir)
    }
    return path.join(path.dirname(cwd), 'render')
  }

  /**
   * 通过 import.meta.url 获取 npm 包的安装目录
   * @returns npm 包的安装目录路径
   */
  private getPackageDirFromImportMeta (): string {
    try {
      const currentModuleUrl = import.meta.url

      // 转换为文件路径
      const currentModulePath = new URL(currentModuleUrl).pathname
      const normalizedPath = process.platform === 'win32'
        ? currentModulePath.slice(1)
        : currentModulePath

      const pluginDir = this.extractPluginDirFromPnpmPath(normalizedPath)
      if (pluginDir) {
        if (!ResourcePathManager.initialized) {
          logger.debug('从 pnpm 路径提取的插件目录:', pluginDir)
        }
        return pluginDir
      }

      const fallbackDir = this.findPluginDirByScanning()
      if (fallbackDir) {
        if (!ResourcePathManager.initialized) {
          logger.debug('通过扫描找到的插件目录:', fallbackDir)
        }
        return fallbackDir
      }

      if (!ResourcePathManager.initialized) {
        logger.debug(logger.yellow('无法找到插件目录，使用当前项目工作目录'))
      }
      return process.cwd()

    } catch (error) {
      logger.error('获取 import.meta.url 失败:', error)
      return process.cwd()
    }
  }

  /**
   * 从 pnpm 路径中提取插件目录
   * @param pnpmPath pnpm 的符号链接路径
   * @returns 插件目录路径，如果无法提取则返回 null
   */
  private extractPluginDirFromPnpmPath (pnpmPath: string): string | null {
    const pnpmIndex = pnpmPath.indexOf('.pnpm')
    if (pnpmIndex === -1) return null

    const projectRoot = pnpmPath.substring(0, pnpmIndex - '/node_modules/'.length)
    if (!ResourcePathManager.initialized) {
      logger.debug('从 pnpm 路径提取的项目根目录:', projectRoot)
    }

    const pluginsDir = path.join(projectRoot, 'plugins')
    if (!fs.existsSync(pluginsDir)) {
      if (!ResourcePathManager.initialized) {
        logger.debug('plugins 目录不存在:', pluginsDir)
      }
      return null
    }

    return this.findKarinPluginInDir(pluginsDir)
  }

  /**
   * 通过扫描当前工作目录查找插件目录
   * @returns 插件目录路径，如果找不到则返回 null
   */
  private findPluginDirByScanning (): string | null {
    const cwd = process.cwd()
    const pluginsDir = path.join(cwd, 'plugins')

    if (!fs.existsSync(pluginsDir)) {
      if (!ResourcePathManager.initialized) {
        logger.debug('当前工作目录下没有 plugins 目录')
      }
      return null
    }

    return this.findKarinPluginInDir(pluginsDir)
  }

  /**
   * 在指定目录中查找包含 karin-plugin-kkk 的插件目录
   * @param pluginsDir 插件目录路径
   * @returns 找到的插件目录路径，如果找不到则返回 null
   */
  private findKarinPluginInDir (pluginsDir: string): string | null {
    try {
      const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())

      for (const pluginDir of pluginDirs) {
        const pluginPath = path.join(pluginsDir, pluginDir.name)
        const karinPluginPath = path.join(pluginPath, 'node_modules', 'karin-plugin-kkk')

        if (fs.existsSync(karinPluginPath)) {
          if (!ResourcePathManager.initialized) {
            logger.debug('找到包含 karin-plugin-kkk 的插件目录:', pluginPath)
          }
          return pluginPath
        }
      }
    } catch (error) {
      if (!ResourcePathManager.initialized) {
        logger.debug('扫描插件目录失败:', error)
      }
    }

    return null
  }

  /**
   * 检测当前是否运行在插件模式
   * @returns 如果是插件模式返回 true，否则返回 false
   */
  private isPluginMode (): boolean {
    // 检测方法1：检查路径中是否包含 plugins 目录
    const hasPluginsInPath = this.packageDir.includes('plugins')

    // 检测方法2：检查是否存在插件特有的 resources 目录
    const pluginResourcesExists = fs.existsSync(path.join(this.packageDir, 'resources'))

    // 检测方法3：检查是否存在 node_modules/karin-plugin-kkk
    const npmPackageExists = fs.existsSync(path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk'))

    return hasPluginsInPath && pluginResourcesExists && npmPackageExists
  }

  /**
   * 获取静态资源路径配置
   * @returns 静态资源路径配置对象
   */
  getResourcePaths (): { cssDir: string; imageDir: string } {
    switch (this.NODE_ENV) {
      case 'development':
        return {
          cssDir: path.join(path.dirname(this.packageDir), 'core', 'lib'),
          imageDir: path.join(path.dirname(this.packageDir), 'core/resources/image')
        }

      case 'production':
      default:
        if (this.isPluginMode()) {
          // 插件模式
          return {
            cssDir: fs.existsSync(path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'lib'))
              ? path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'lib')
              : path.join(this.packageDir, 'lib'),
            imageDir: path.join(this.packageDir, 'resources', 'image')
          }
        } else {
          // 独立模式
          return {
            cssDir: path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'lib'),
            imageDir: path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'resources', 'image')
          }
        }
    }
  }
}

/**
 * HTML 包装器类
 * 负责将渲染后的组件内容包装成完整的 HTML 文档
 */
class HtmlWrapper {
  private resourceManager: ResourcePathManager

  constructor (resourceManager: ResourcePathManager) {
    this.resourceManager = resourceManager
  }

  /**
   * 包装内容为完整的 HTML 文档
   * @param htmlContent 组件渲染后的 HTML 内容
   * @param htmlFilePath HTML 文件的输出路径
   * @param isDark 是否使用深色主题
   * @returns 完整的 HTML 文档字符串
   */
  wrapContent (htmlContent: string, htmlFilePath: string, isDark: boolean = false): string {
    const htmlDir = path.dirname(htmlFilePath)
    const { cssDir, imageDir } = this.resourceManager.getResourcePaths()

    const cssRelativePath = path.relative(htmlDir, cssDir).replace(/\\/g, '/')
    const imageRelativePath = path.relative(htmlDir, imageDir).replace(/\\/g, '/')
    const cssUrl = path.join(cssRelativePath, 'karin-plugin-kkk.css').replace(/\\/g, '/')

    // 处理字体路径
    const fontDir = path.join(path.dirname(imageDir), 'font')
    const fontRelativePath = path.relative(htmlDir, fontDir).replace(/\\/g, '/')
    const bilifontUrl = path.join(fontRelativePath, 'bilifont/font.css').replace(/\\/g, '/')
    const monoFontUrl = path.join(fontRelativePath, 'mono/font.css').replace(/\\/g, '/')

    // 处理图片路径
    const processedHtml = htmlContent.replace(
      /src="\/image\//g,
      `src="${imageRelativePath}/`
    )

    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width">
      <link rel="stylesheet" href="${bilifontUrl}">
      <link rel="stylesheet" href="${monoFontUrl}">
      <link rel="stylesheet" href="${cssUrl}">
      <style>
        html, body {
          margin: 0;
          padding: 0;
          background: transparent !important;
        }
        body {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
        #container {
          border-radius: 3rem;
          overflow: hidden;
          background-clip: padding-box;
        }
      </style>
    </head>
    <body class="${isDark ? 'dark' : ''}">
      ${processedHtml}
    </body>
    </html>
    `
  }
}


/**
 * SSR 渲染类
 * 负责服务端渲染的核心逻辑
 */
class SSRRender {
  private outputDir: string
  private resourceManager: ResourcePathManager
  private htmlWrapper: HtmlWrapper
  private pluginContainer: PluginContainer

  constructor (options: { plugins?: Plugin[], outputDir: string }) {
    const { plugins = [], outputDir } = options
    this.resourceManager = new ResourcePathManager()
    this.htmlWrapper = new HtmlWrapper(this.resourceManager)
    this.outputDir = outputDir
    this.pluginContainer = new PluginContainer(plugins)
  }

  /**
   * SSR 渲染组件为 HTML 字符串
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  public async render<T extends Record<string, unknown>> (request: RenderRequest<T>): Promise<RenderResponse> {
    try {
      logger.debug('[SSR] 开始渲染组件，预设模板:', `${logger.yellow(`${request.templateType}/`)}${request.templateName}`)

      const ctx: PluginContext<T> = {
        request,
        outputDir: this.outputDir,
        resourceManager: this.resourceManager,
        state: { props: {}, component: null }
      }

      // 渲染前插件
      await this.pluginContainer.runBefore(ctx)

      // 创建组件（仅透传插件产生的 props）
      let component = await ComponentRendererFactory.createComponent(
        request,
        ctx.state.props
      )

      ctx.state.component = component

      // 渲染时插件（可包裹或替换组件）
      await this.pluginContainer.runDuring(ctx)

      const htmlContent = renderToString(ctx.state.component ?? component)

      ctx.state.html = htmlContent

      // 渲染后插件（可修改 HTML）
      await this.pluginContainer.runAfter(ctx)

      // 生成文件路径
      const safeTemplateName = request.templateName.replace(/\//g, '_')
      const fileName = `${request.templateType}_${safeTemplateName}_${Date.now()}.html`
      const filePath = path.join(this.outputDir, fileName)

      // 包装并写入
      const fullHtml = this.htmlWrapper.wrapContent(
        ctx.state.html ?? htmlContent,
        filePath,
        request.data.useDarkTheme ?? false
      )

      fs.writeFileSync(filePath, fullHtml, 'utf-8')

      return {
        success: true,
        htmlPath: filePath
      }
    } catch (error) {
      logger.error('❌ 渲染组件失败:', error)
      return {
        success: false,
        htmlPath: '',
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }
}

/**
 * 渲染器配置选项接口
 * @template K 模板类型键
 */
interface ReactServerRenderOptions<K extends keyof DataTypeMap> {
  /** 渲染请求对象 */
  request: RenderRequest<DataTypeMap[K]>
  /** 输出目录路径 */
  outputDir: string
  /** 插件列表 */
  plugins?: Plugin[]
}

/**
 * SSR 预渲染组件为 HTML 的具体实现
 * 
 * @template K 模板类型键，用于类型推断
 * @param options 渲染配置选项
 * @returns 渲染结果 Promise
 * 
 * # Example
 * ```typescript
 * // 基础使用
 * const result = await reactServerRender({
 *   request: {
 *     templateType: 'douyin',
 *     templateName: 'videoInfo',
 *     data: { share_url: 'https://example.com' }
 *   },
 *   outputDir: './output'
 * })
 * 
 * // 使用插件
 * const result = await reactServerRender({
 *   request: renderRequest,
 *   outputDir: './output',
 *   plugins: [customPlugin()]
 * })
 * ```
 */
const reactServerRender = async <K extends keyof DataTypeMap> (
  options: ReactServerRenderOptions<K>
): Promise<RenderResponse> => {
  const {
    request,
    outputDir,
    plugins = []
  } = options

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 初始化组件注册表
  await ComponentAutoRegistry.initialize()

  // 创建渲染器实例
  const renderClient = new SSRRender({ plugins, outputDir })

  const result = await renderClient.render(request)

  if (result.success && process.env.NODE_ENV === 'development') {
    DevDataManager.saveRenderData(
      request.templateType,
      request.templateName,
      request.data
    )
  }

  return result
}

export type {
  DataTypeMap,
  Plugin,
  PluginContext,
  PluginFactory,
  ReactServerRenderOptions,
  TypedRenderRequest
}

export { reactServerRender }
export default reactServerRender
