import fs, { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import QRCode, { type QRCodeRenderersOptions } from 'qrcode'
import React from 'react'
import { renderToString } from 'react-dom/server'

import type { RenderRequest, RenderResponse } from './types'
import { ComponentAutoRegistry } from './utils/ComponentAutoRegistry'
import { logger } from './utils/logger'

/**
 * 二维码配置接口
 */
interface QRCodeConfig {
  /** 二维码宽度 */
  width?: QRCodeRenderersOptions['width']
  /** 错误纠正级别 */
  errorCorrectionLevel?: QRCodeRenderersOptions['errorCorrectionLevel']
}

/**
 * 二维码生成器类
 */
class QRCodeGenerator {
  /**
   * 生成二维码SVG数据URL
   * @param url 要生成二维码的URL
   * @param useDarkTheme 是否使用深色主题
   * @param config 二维码配置
   * @returns 二维码数据URL
   */
  static async generateDataUrl (
    url: string,
    useDarkTheme: boolean = false,
    config: QRCodeConfig = {}
  ): Promise<string> {
    const {
      width = 600,
      errorCorrectionLevel = 'L'
    } = config

    const qrCodeSvg = await QRCode.toString(url, {
      type: 'svg',
      width,
      errorCorrectionLevel,
      color: {
        dark: useDarkTheme ? '#C3C3C3' : '#3A3A3A', // 码的颜色
        light: useDarkTheme ? '#18181B' : '#FAFAFA' // 背景色
      },
      margin: 0
    })

    return `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg).toString('base64')}`
  }
}

/**
 * 组件渲染器工厂类
 */
class ComponentRendererFactory {
  /**
   * 创建组件实例
   * @param request 渲染请求
   * @param qrCodeDataUrl 二维码数据URL
   * @returns React组件元素
   */
  static async createComponent<T>(request: RenderRequest<T>, qrCodeDataUrl: string): Promise<React.ReactElement> {
    const { templateType, templateName } = request

    const registryItem = ComponentAutoRegistry.get(templateType, templateName)

    if (!registryItem) {
      throw new Error(`未找到组件配置: ${templateType}:${templateName}`)
    }

    // 验证数据（如果提供了验证函数）
    if (registryItem.validateData && !registryItem.validateData(request.data)) {
      throw new Error(`数据验证失败: ${templateType}:${templateName}`)
    }

    // 创建组件属性
    const props = {
      data: request.data,
      qrCodeDataUrl,
      version: request.version,
      scale: request.scale
    }

    // 对于嵌套模板，传递子模板类型
    if (templateName.includes('/')) {
      const subType = templateName.split('/')[1]
      ;(props as any).subType = subType
    }

    return React.createElement(registryItem.component, props)
  }
}

/**
 * 资源路径管理器类
 */
class ResourcePathManager {
  private packageDir: string
  private NODE_ENV: string

  constructor () {
    this.NODE_ENV = process.env.NODE_ENV || 'production'
    this.packageDir = this.getPackageDir()
  }

  /**
   * 获取包目录路径
   * @returns 包目录的绝对路径
   */
  private getPackageDir (): string {
    const cwd = process.cwd()
    logger.debug('当前工作目录:', cwd)
    logger.debug('NODE_ENV:', this.NODE_ENV)

    switch (this.NODE_ENV) {
      case 'development':
        let currentDir = cwd
        while (currentDir !== path.dirname(currentDir)) {
          const renderDir = path.join(currentDir, 'render')
          if (existsSync(renderDir)) {
            logger.debug('开发模式：找到 render 目录:', renderDir)
            return currentDir
          }
          currentDir = path.dirname(currentDir)
        }
        return path.join(path.dirname(cwd), 'render')

      case 'production':
      default:
        return this.getPackageDirFromImportMeta()
    }
  }

  /**
   * 通过 import.meta.url 获取 npm 包的安装目录
   * @returns npm 包的安装目录路径
   */
  private getPackageDirFromImportMeta (): string {
    try {
      const currentModuleUrl = import.meta.url
      logger.debug('当前模块 URL:', currentModuleUrl)
      
      // 转换为文件路径
      const currentModulePath = new URL(currentModuleUrl).pathname
      const normalizedPath = process.platform === 'win32' 
        ? currentModulePath.slice(1) 
        : currentModulePath
      
      logger.debug('当前模块路径:', normalizedPath)
      const pluginDir = this.extractPluginDirFromPnpmPath(normalizedPath)
      if (pluginDir) {
        logger.debug('从 pnpm 路径提取的插件目录:', pluginDir)
        return pluginDir
      }
      
      const fallbackDir = this.findPluginDirByScanning()
      if (fallbackDir) {
        logger.debug('通过扫描找到的插件目录:', fallbackDir)
        return fallbackDir
      }
      
      logger.debug(logger.yellow('无法找到插件目录，使用当前工作目录'))
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
    logger.debug('从 pnpm 路径提取的项目根目录:', projectRoot)
    const pluginsDir = path.join(projectRoot, 'plugins')
    if (!existsSync(pluginsDir)) {
      logger.debug('plugins 目录不存在:', pluginsDir)
      return null
    }
    
    try {
      const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
      
      for (const pluginDir of pluginDirs) {
        const pluginPath = path.join(pluginsDir, pluginDir.name)
        const karinPluginPath = path.join(pluginPath, 'node_modules', 'karin-plugin-kkk')
        
        if (existsSync(karinPluginPath)) {
          logger.debug('找到包含 karin-plugin-kkk 的插件目录:', pluginPath)
          return pluginPath
        }
      }
    } catch (error) {
      logger.debug('扫描 plugins 目录失败:', error)
    }
    
    return null
  }

  /**
   * 通过扫描当前工作目录查找插件目录
   * @returns 插件目录路径，如果找不到则返回 null
   */
  private findPluginDirByScanning (): string | null {
    const cwd = process.cwd()
    const pluginsDir = path.join(cwd, 'plugins')
    
    if (!existsSync(pluginsDir)) {
      logger.debug('当前工作目录下没有 plugins 目录')
      return null
    }
    
    try {
      const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
      
      for (const pluginDir of pluginDirs) {
        const pluginPath = path.join(pluginsDir, pluginDir.name)
        const karinPluginPath = path.join(pluginPath, 'node_modules', 'karin-plugin-kkk')
        
        if (existsSync(karinPluginPath)) {
          logger.debug('通过扫描找到包含 karin-plugin-kkk 的插件目录:', pluginPath)
          return pluginPath
        }
      }
    } catch (error) {
      logger.debug('扫描失败:', error)
    }
    
    return null
  }

  /**
   * 检测当前是否运行在 Monorepo 模式
   * @returns 如果是 Monorepo 模式返回 true，否则返回 false
   */
  private isPluginMode (): boolean {
    // 检测方法1：检查路径中是否包含 plugins 目录
    const hasPluginsInPath = this.packageDir.includes('plugins')
    
    // 检测方法2：检查是否存在插件特有的 resources 目录
    const pluginResourcesExists = fs.existsSync(path.join(this.packageDir, 'resources'))
    
    // 检测方法3：检查是否不存在 node_modules/karin-plugin-kkk
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
          // Monorepo 模式
          return {
            cssDir: fs.existsSync(path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'lib'))
              ? path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'lib')
              : path.join(this.packageDir, 'lib'),
            imageDir: path.join(this.packageDir, 'resources', 'image')
          }
        } else {
          // Standalone 模式
          return {
            cssDir: path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'lib'),
            imageDir: path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'resources', 'image')
          }
        }
    }
  }
}

/**
 * HTML包装器类
 */
class HtmlWrapper {
  private resourceManager: ResourcePathManager

  constructor (resourceManager: ResourcePathManager) {
    this.resourceManager = resourceManager
  }

  /**
   * 包装HTML内容
   * @param htmlContent React渲染的HTML内容
   * @param htmlFilePath HTML文件的绝对路径
   * @returns 完整的HTML文档
   */
  wrapContent (htmlContent: string, htmlFilePath: string): string {
    const htmlDir = path.dirname(htmlFilePath)
    const { cssDir, imageDir } = this.resourceManager.getResourcePaths()

    const cssRelativePath = path.relative(htmlDir, cssDir).replace(/\\/g, '/')
    const imageRelativePath = path.relative(htmlDir, imageDir).replace(/\\/g, '/')
    const cssUrl = path.join(cssRelativePath, 'karin-plugin-kkk.css').replace(/\\/g, '/')

    logger.debug('CSS相对路径:', cssUrl)
    logger.debug('图片相对路径:', imageRelativePath)

    // 处理HTML中的静态资源路径
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
      <link rel="stylesheet" href="${cssUrl}">
    </head>
    <body>
      ${processedHtml}
    </body>
    </html>
    `
  }
}


/**
 * SSR渲染类
 */
class SSRRender {
  private outputDir: string
  private cssContent: string = ''
  private resourceManager: ResourcePathManager
  private htmlWrapper: HtmlWrapper

  constructor() {
    this.resourceManager = new ResourcePathManager()
    this.htmlWrapper = new HtmlWrapper(this.resourceManager)
    this.outputDir = ''
    this.loadCssContent()
  }

  /**
   * 加载CSS内容到内存中
   */
  private loadCssContent (): void {
    try {
      const { cssDir } = this.resourceManager.getResourcePaths()
      const cssPath = path.join(cssDir, 'karin-plugin-kkk.css')

      logger.debug('尝试加载CSS文件:', cssPath)

      if (existsSync(cssPath)) {
        this.cssContent = fs.readFileSync(cssPath, 'utf-8')
        logger.debug('✅ CSS内容加载成功')
      } else {
        logger.warn('⚠️ CSS文件未找到:', cssPath)
        // 尝试后备路径
        const fallbackPath = path.join(this.resourceManager['packageDir'], 'dist/css/main.css')
        if (existsSync(fallbackPath)) {
          this.cssContent = fs.readFileSync(fallbackPath, 'utf-8')
          logger.debug('✅ 从后备路径加载CSS:', fallbackPath)
        }
      }
    } catch (error) {
      logger.error('❌ 加载CSS内容失败:', error)
    }
  }

  /**
   * SSR渲染组件为HTML字符串
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  private async renderComponent<T> (request: RenderRequest<T>): Promise<RenderResponse> {
    try {
      logger.debug('renderToString:', request.templateName)

      // 生成二维码
      const qrCodeDataUrl = await QRCodeGenerator.generateDataUrl(
        request.data.share_url || 'https://github.com/ikenxuan/karin-plugin-kkk',
        request.data.useDarkTheme || false
      )

      // 创建组件
      const component = await ComponentRendererFactory.createComponent(request, qrCodeDataUrl)

      // 渲染为HTML字符串
      const htmlContent = renderToString(component)

      // 生成文件路径
      const safeTemplateName = request.templateName.replace(/\//g, '_')
      const fileName = `${request.templateType}_${safeTemplateName}_${Date.now()}.html`
      const filePath = path.join(this.outputDir, fileName)

      // 包装HTML内容
      const fullHtml = this.htmlWrapper.wrapContent(htmlContent, filePath)

      // 写入文件
      writeFileSync(filePath, fullHtml, 'utf-8')

      return {
        success: true,
        htmlPath: filePath
      }
    } catch (error) {
      logger.error('❌ 渲染组件失败:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  /**
   * 重新加载CSS内容（用于开发时热更新）
   */
  public reloadCss (): void {
    this.loadCssContent()
  }

  /**
   * 启动服务
   */
  public async start(): Promise<void> {
    // 确保组件已初始化
    await ComponentAutoRegistry.initialize()
    
    const stats = ComponentAutoRegistry.getStats()
    logger.debug(`📁 HTML输出目录: ${this.outputDir}`)
    logger.debug(`🎨 CSS文件状态: ${this.cssContent ? '已加载' : '未加载'}`)
    logger.debug(`📦 已注册组件总数: ${stats.total}`)
    logger.debug('📊 各平台组件数量:', stats.byPlatform)
    logger.debug(`🔧 已注册组件: ${ComponentAutoRegistry.getAllKeys().join(', ')}`)
  }

  /**
   * 渲染组件
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  public async render<T> (request: RenderRequest<T>): Promise<RenderResponse> {
    return this.renderComponent(request)
  }
}

/**
 * SSR预渲染组件为HTML预渲染组件为HTML
 * @param request 渲染请求参数
 * @param outputDir 输出目录路径
 * @returns 渲染结果Promise
 */
export const reactServerRender = async <T> (
  request: RenderRequest<T>,
  outputDir: string
): Promise<RenderResponse> => {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  // 初始化组件注册器
  await ComponentAutoRegistry.initialize()
  const tempServer = new SSRRender()

  // 设置输出目录
  tempServer['outputDir'] = outputDir

  return await tempServer.render(request)
}

export type { RenderRequest, RenderResponse }
