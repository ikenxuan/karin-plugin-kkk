import fs, { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { logger } from 'node-karin'
import { karinPathTemp } from 'node-karin/root'
import QRCode, { type QRCodeRenderersOptions } from 'qrcode'
import React from 'react'
import { renderToString } from 'react-dom/server'

import type { RenderRequest, RenderResponse } from './types'
import { ComponentAutoRegistry } from './utils/ComponentAutoRegistry'

/**
 * 组件配置接口
 */
interface ComponentConfig {
  /** 组件构造函数 */
  component: React.ComponentType<any>
  /** 数据类型验证函数 */
  validateData?: (data: any) => boolean
}

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
        dark: useDarkTheme ? '#c3c3c3' : '#3a3a3a',
        light: useDarkTheme ? '#000000' : '#EEEEF0'
      },
      margin: 0
    })

    return `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg).toString('base64')}`
  }
}

/**
 * 组件注册表类
 */
class ComponentRegistry {
  private static components = new Map<string, ComponentConfig>()

  /**
   * 注册组件
   * @param templateType 模板类型
   * @param templateName 模板名称
   * @param config 组件配置
   */
  static register (templateType: string, templateName: string, config: ComponentConfig): void {
    const key = `${templateType}:${templateName}`
    this.components.set(key, config)
    logger.debug(`📝 注册组件: ${key}`)
  }

  /**
   * 获取组件配置
   * @param templateType 模板类型
   * @param templateName 模板名称
   * @returns 组件配置或undefined
   */
  static get (templateType: string, templateName: string): ComponentConfig | undefined {
    const key = `${templateType}:${templateName}`
    return this.components.get(key)
  }

  /**
   * 检查组件是否已注册
   * @param templateType 模板类型
   * @param templateName 模板名称
   * @returns 是否已注册
   */
  static has (templateType: string, templateName: string): boolean {
    const key = `${templateType}:${templateName}`
    return this.components.has(key)
  }

  /**
   * 获取所有已注册的组件键
   * @returns 组件键数组
   */
  static getAllKeys (): string[] {
    return Array.from(this.components.keys())
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
   * @returns 包目录路径
   */
  private getPackageDir (): string {
    const cwd = process.cwd()

    logger.debug('当前运行环境:', this.NODE_ENV)
    logger.debug('当前工作目录:', cwd)

    switch (this.NODE_ENV) {
      case 'development':
        let currentDir = cwd
        while (currentDir !== path.dirname(currentDir)) {
          if (existsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
            return path.join(currentDir, 'packages', 'core')
          }
          currentDir = path.dirname(currentDir)
        }
        return path.join(path.dirname(cwd), 'render')

      case 'production':
      default:
        let projectRoot = cwd
        while (projectRoot !== path.dirname(projectRoot)) {
          if (existsSync(path.join(projectRoot, 'pnpm-workspace.yaml')) ||
            existsSync(path.join(projectRoot, 'package.json'))) {
            return projectRoot
          }
          projectRoot = path.dirname(projectRoot)
        }
        return cwd
    }
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
        return {
          cssDir: path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'lib'),
          imageDir: path.join(this.packageDir, 'node_modules', 'karin-plugin-kkk', 'resources', 'image')
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
    const cssUrl = path.join(cssRelativePath, 'karin-plugin-kkk.css')

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
 * React渲染类
 */
class ReactRender {
  private outputDir = path.join(karinPathTemp, 'html', 'karin-plugin-kkk', 'renderServer')
  private cssContent: string = ''
  private resourceManager: ResourcePathManager
  private htmlWrapper: HtmlWrapper

  constructor() {
    this.resourceManager = new ResourcePathManager()
    this.htmlWrapper = new HtmlWrapper(this.resourceManager)
    this.outputDir = path.join(karinPathTemp, 'html', 'karin-plugin-kkk', 'renderServer')
    this.ensureOutputDir()
    this.loadCssContent()
  }

  /**
   * 初始化组件注册
   */
  private async initializeComponents(): Promise<void> {
    try {
      await ComponentAutoRegistry.initialize()
      logger.debug('✅ 组件自动注册完成')
    } catch (error) {
      logger.error('❌ 组件自动注册失败:', error)
    }
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
   * 渲染React组件为HTML字符串
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  private async renderComponent<T> (request: RenderRequest<T>): Promise<RenderResponse> {
    try {
      logger.debug('renderToString:', request.templateName)

      // 生成二维码
      const qrCodeDataUrl = await QRCodeGenerator.generateDataUrl(
        request.data.share_url!,
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
   * 确保输出目录存在
   */
  private ensureOutputDir (): void {
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true })
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
 * 渲染React组件为HTML
 * @param request 渲染请求参数
 * @param outputDir 输出目录路径
 * @returns 渲染结果Promise
 */
export const renderComponentToHtml = async <T> (
  request: RenderRequest<T>,
  outputDir: string
): Promise<RenderResponse> => {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  // 初始化组件注册器
  await ComponentAutoRegistry.initialize()
  const tempServer = new ReactRender()

  // 设置输出目录
  tempServer['outputDir'] = outputDir

  return await tempServer.render(request)
}

export default ReactRender
export type { RenderRequest, RenderResponse }
export { ComponentRegistry, ComponentRendererFactory, QRCodeGenerator }
