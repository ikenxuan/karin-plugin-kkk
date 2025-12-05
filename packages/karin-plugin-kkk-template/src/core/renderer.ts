import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'

import React from 'react'
import { renderToString } from 'react-dom/server'

import type {
  RenderContext,
  RenderRequest,
  RenderResponse,
  ResolvedConfig,
  TemplateDefinition,
} from '../types'
import { logger } from '../utils/logger'
import { TemplateRegistry } from './registry'

/**
 * HTML 包装器配置
 */
interface HtmlWrapperOptions {
  /** CSS 文件路径 */
  cssPath: string
  /** 图片基础路径 */
  imageBasePath: string
  /** 是否深色主题 */
  isDark: boolean
  /** 额外的 head 内容 */
  headContent?: string
  /** 额外的 body 属性 */
  bodyAttrs?: string
}

/**
 * 包装 HTML 内容
 */
function wrapHtml(content: string, options: HtmlWrapperOptions): string {
  const { cssPath, imageBasePath, isDark, headContent = '', bodyAttrs = '' } = options

  // 处理图片路径
  const processedContent = content.replace(
    /src="\/image\//g,
    `src="${imageBasePath}/`
  )

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${cssPath}">
  ${headContent}
</head>
<body class="${isDark ? 'dark' : ''}" ${bodyAttrs}>
  ${processedContent}
</body>
</html>`
}

/**
 * SSR 渲染器
 */
export class SSRRenderer {
  private config: ResolvedConfig
  private registry: TemplateRegistry

  constructor(config: ResolvedConfig, registry: TemplateRegistry) {
    this.config = config
    this.registry = registry
  }

  /**
   * 渲染模板
   */
  async render<T = Record<string, unknown>>(
    request: RenderRequest<T>
  ): Promise<RenderResponse> {
    const { platform, templateId, data, version, scale } = request

    try {
      // 获取模板定义
      const template = this.registry.get<T>(platform, templateId)
      
      if (!template) {
        throw new Error(`Template not found: ${platform}:${templateId}`)
      }

      // 验证数据
      if (template.validateData && !template.validateData(data)) {
        throw new Error(`Data validation failed for template: ${platform}:${templateId}`)
      }

      // 创建渲染上下文
      const outputDir = resolve(this.config.root, this.config.build.outDir, 'html')
      const ctx: RenderContext<T> = {
        template: template as TemplateDefinition<T>,
        data,
        outputDir,
        extraProps: {},
      }

      // 执行 beforeRender 钩子
      for (const plugin of this.config.plugins) {
        if (plugin.beforeRender) {
          await plugin.beforeRender(ctx)
        }
      }

      // 创建组件 props
      const props = {
        data: ctx.data,
        version,
        scale,
        ...ctx.extraProps,
      }

      // 渲染组件
      const element = React.createElement(template.component, props)
      const htmlContent = renderToString(element)
      ctx.html = htmlContent

      // 执行 afterRender 钩子
      for (const plugin of this.config.plugins) {
        if (plugin.afterRender) {
          await plugin.afterRender(ctx)
        }
      }

      // 确保输出目录存在
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
      }

      // 生成文件名
      const safeTemplateId = templateId.replace(/\//g, '_')
      const fileName = `${platform}_${safeTemplateId}_${Date.now()}.html`
      const filePath = join(outputDir, fileName)

      // 计算相对路径
      const cssDir = resolve(this.config.root, this.config.build.outDir)
      const imageDir = resolve(this.config.root, this.config.assets.imageDir)
      const cssRelativePath = relative(dirname(filePath), cssDir).replace(/\\/g, '/')
      const imageRelativePath = relative(dirname(filePath), imageDir).replace(/\\/g, '/')

      // 包装 HTML
      const fullHtml = wrapHtml(ctx.html ?? htmlContent, {
        cssPath: `${cssRelativePath}/${this.config.build.cssFileName}`,
        imageBasePath: imageRelativePath,
        isDark: data.useDarkTheme ?? false,
      })

      // 写入文件
      writeFileSync(filePath, fullHtml, 'utf-8')

      logger.debug(`Rendered: ${platform}/${templateId} -> ${filePath}`)

      return {
        success: true,
        htmlPath: filePath,
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error(`Render failed: ${errorMessage}`)
      
      return {
        success: false,
        htmlPath: '',
        error: errorMessage,
      }
    }
  }

  /**
   * 批量渲染
   */
  async renderBatch<T = Record<string, unknown>>(
    requests: RenderRequest<T>[]
  ): Promise<RenderResponse[]> {
    const results: RenderResponse[] = []
    
    for (const request of requests) {
      const result = await this.render(request)
      results.push(result)
    }
    
    return results
  }
}

/**
 * 创建渲染器实例
 */
export function createRenderer(
  config: ResolvedConfig,
  registry: TemplateRegistry
): SSRRenderer {
  return new SSRRenderer(config, registry)
}
