import express from 'node-karin/express'
import { renderToString } from 'react-dom/server'
import fs, { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import React from 'react'
import { RenderRequest, RenderResponse } from './types'
import { DouyinComment } from './components/platforms/douyin/Comment'
import { DouyinCommentProps } from './types/douyin'
import QRCode from 'qrcode'
import { karinPathTemp } from 'node-karin/root'
import { logger } from 'node-karin'


// 使用基于环境变量和 process.cwd() 的路径计算
const getPackageDir = () => {
  const cwd = process.cwd()
  const renderEnv = process.env.RENDER_ENV || 'production'

  logger.debug('当前运行环境:', renderEnv)
  logger.debug('当前工作目录:', cwd)

  switch (renderEnv) {
    case 'render_dev':
      // packages/render 开发环境
      // 当前目录就是 packages/render
      return cwd

    case 'core_dev':
      // packages/core 开发环境
      // 需要找到项目根目录，然后定位到 packages/render
      let currentDir = cwd
      while (currentDir !== path.dirname(currentDir)) {
        if (existsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
          return path.join(currentDir, 'packages', 'core')
        }
        currentDir = path.dirname(currentDir)
      }
      // 如果找不到，假设在 packages/core 目录下
      return path.join(path.dirname(cwd), 'render')

    case 'production':
    default:
      // 生产环境
      // 查找项目根目录
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

const packageDir = getPackageDir()

/**
 * 渲染服务器类
 */
class RenderServer {
  private app = express()
  private outputDir = path.join(karinPathTemp, 'html', 'karin-plugin-kkk', 'renderServer')
  private cssContent: string = ''

  /**
   * 初始化服务器
   * @param port 13851
   */
  constructor () {
    this.ensureOutputDir()
    this.loadCssContent()
  }

  /**
   * 加载CSS内容到内存中
   */
  private loadCssContent (): void {
    try {
      const renderEnv = process.env.RENDER_ENV || 'production'
      let cssPath: string

      switch (renderEnv) {
        case 'render_dev':
          // render 开发环境：CSS在 dist/css/main.css
          cssPath = path.join(packageDir, 'resources/style/main.css')
          break

        case 'core_dev':
          // core 开发环境：CSS在 ../core/lib/assets/css/main.css
          cssPath = path.join(path.dirname(packageDir), 'core/resources/style/main.css')
          break

        case 'production':
        default:
          // 生产环境：CSS在 packages/core/lib/assets/css/main.css
          cssPath = path.join(packageDir, 'node_modules', 'karin-plugin-kkk', 'resources', 'style', 'main.css')
          break
      }

      logger.debug('尝试加载CSS文件:', cssPath)

      if (existsSync(cssPath)) {
        this.cssContent = fs.readFileSync(cssPath, 'utf-8')
        logger.debug('✅ CSS内容加载成功')
      } else {
        logger.warn('⚠️ CSS文件未找到:', cssPath)
        // 尝试后备路径
        const fallbackPath = path.join(packageDir, 'dist/css/main.css')
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
   * 渲染React组件为HTML
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  private async renderComponent<T> (request: RenderRequest<T>): Promise<RenderResponse> {
    // 根据模板类型选择组件
    let component: React.ReactElement
    logger.debug('renderToString: ' + request.templateName)
    switch (request.templateType) {
      case 'douyin':
        if (request.templateName === 'comment') {
          const data = request.data as unknown as DouyinCommentProps['data']

          // 在服务器端预生成二维码
          let qrCodeDataUrl = ''
          try {
            // 使用 SVG 格式，不需要 canvas 支持
            const qrCodeSvg = await QRCode.toString(data.share_url, {
              type: 'svg',
              width: 600,
              errorCorrectionLevel: 'L',
              color: {
                dark: request.data.useDarkTheme ? '#c3c3c3' : '#3a3a3a', // 背景
                light: request.data.useDarkTheme ? '#000000' : '#EEEEF0', // 码
              },
            })
            // 将 SVG 转换为 Data URL
            qrCodeDataUrl = `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg).toString('base64')}`
          } catch (err) {
            logger.error('生成二维码失败:', err)
            // 生成失败时使用空字符串
            qrCodeDataUrl = ''
          }

          // 将二维码数据添加到组件props中
          component = React.createElement(DouyinComment, {
            data: request.data as unknown as DouyinCommentProps['data'],
            qrCodeDataUrl: qrCodeDataUrl,
            version: request.version,
            scale: request.scale,
          })
        } else {
          throw new Error(`不支持的抖音模板: ${request.templateName}`)
        }
        break
      default:
        throw new Error(`不支持的模板类型: ${request.templateType}`)
    }

    // 渲染为HTML字符串
    const htmlContent = renderToString(component)

    // 生成文件路径
    const fileName = `${request.templateType}_${request.templateName}_${Date.now()}.html`
    const filePath = path.join(this.outputDir, fileName)

    // 添加TailwindCSS样式，使用绝对路径
    const fullHtml = this.wrapHtmlContent(htmlContent, filePath)

    // 写入文件
    writeFileSync(filePath, fullHtml, 'utf-8')

    return {
      success: true,
      htmlPath: filePath
    }
  }

  /**
   * 包装HTML内容，使用相对路径引用外部资源
   * @param htmlContent React渲染的HTML内容
   * @param htmlFilePath HTML文件的绝对路径
   * @returns 完整的HTML文档
   */
  private wrapHtmlContent (htmlContent: string, htmlFilePath: string): string {
    const renderEnv = process.env.RENDER_ENV || 'production'
    const htmlDir = path.dirname(htmlFilePath)
    let cssDir: string
    let imageDir: string

    switch (renderEnv) {
      case 'render_dev':
        // render 开发环境
        cssDir = path.join(packageDir, 'resources/style')
        imageDir = path.join(packageDir, 'resources/image')
        break

      case 'core_dev':
        // core 开发环境
        cssDir = path.join(path.dirname(packageDir), 'core/resources/style')
        imageDir = path.join(path.dirname(packageDir), 'core/resources/image')
        break

      case 'production':
      default:
        // 生产环境
        cssDir = path.join(packageDir, 'node_modules', 'karin-plugin-kkk', 'resources', 'style')
        imageDir = path.join(packageDir, 'node_modules', 'karin-plugin-kkk', 'resources', 'image')
        break
    }

    const cssRelativePath = path.relative(htmlDir, cssDir).replace(/\\/g, '/')
    const imageRelativePath = path.relative(htmlDir, imageDir).replace(/\\/g, '/')
    const cssUrl = `${cssRelativePath}/main.css`

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
   * 启动服务器
   * @returns void
   */
  public start (): void {
    logger.debug(`📁 HTML输出目录: ${this.outputDir}`)
    logger.debug(`🎨 CSS文件状态: ${this.cssContent ? '已加载' : '未加载'}`)
  }
}

if (process.env.RENDER_ENV === 'render_dev' && !process.env.DISABLE_AUTO_START) {
  const server = new RenderServer()
  server.start()
}

/**
 * 渲染React组件为HTML的独立函数（用于本地调用）
 * @param request 渲染请求参数
 * @param outputDir 输出目录路径
 * @returns 渲染结果Promise
 */
export async function renderComponentToHtml<T = any>(
  request: RenderRequest<T>, 
  outputDir: string
): Promise<RenderResponse> {
  // 确保输出目录存在
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  // 创建临时服务器实例来复用渲染逻辑
  const tempServer = new RenderServer()
  // 设置输出目录
  tempServer['outputDir'] = outputDir
  
  // 调用私有渲染方法
  return await tempServer['renderComponent'](request)
}

export default RenderServer
export type { RenderRequest, RenderResponse }