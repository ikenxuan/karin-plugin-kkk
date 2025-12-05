import fg from 'fast-glob'
import pc from 'picocolors'
import { basename, dirname, join, relative, extname, resolve } from 'node:path'

import type { ResolvedConfig, TemplateDefinition } from '../types'
import { logger } from '../utils/logger'

export interface TemplateMetadata {
  id: string
  entry: string
}

/**
 * 模板注册表
 */
export class TemplateRegistry {
  // 存储模板元数据 (路径信息)
  private metadata = new Map<string, TemplateMetadata>()
  // 存储运行时模板定义 (仅在运行时/虚拟模块中有效)
  private templates = new Map<string, TemplateDefinition>()
  private config: ResolvedConfig

  constructor(config: ResolvedConfig) {
    this.config = config
  }

  /**
   * 扫描模板目录
   */
  async scan(): Promise<void> {
    const templatesDir = this.config.templatesDir || 'src'
    const patterns = ['**/*.{tsx,jsx}']
    
    // 组合 glob patterns
    const globPatterns = patterns.map(p => join(templatesDir, p).replace(/\\/g, '/'))
    
    logger.debug(`Scanning templates with patterns: ${globPatterns.join(', ')}`)
    
    const entries = await fg(globPatterns, {
      cwd: this.config.root,
      absolute: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    })

    for (const entry of entries) {
      // 统一路径分隔符
      const normalizedEntry = entry.replace(/\\/g, '/')
      const normalizedTemplatesDir = resolve(this.config.root, templatesDir).replace(/\\/g, '/')
      
      // 获取相对于 templatesDir 的路径作为 ID
      // e.g. douyin/Comment.tsx -> douyin/Comment
      // e.g. components/Button/index.tsx -> components/Button
      let relPath = relative(normalizedTemplatesDir, normalizedEntry).replace(/\\/g, '/')
      
      // 去掉扩展名
      const ext = extname(relPath)
      if (ext) {
        relPath = relPath.slice(0, -ext.length)
      }
      
      // 如果是 index 结尾，去掉 index
      if (relPath.endsWith('/index')) {
        relPath = relPath.slice(0, -6)
      }

      this.registerMetadata({
        id: relPath,
        entry,
      })
    }
    
    logger.info(`Found ${this.metadata.size} templates`)
  }

  /**
   * 注册模板元数据
   */
  registerMetadata(meta: TemplateMetadata): void {
    this.metadata.set(meta.id, meta)
    logger.debug(`Registered template metadata: ${pc.green(meta.id)}`)
  }

  /**
   * 获取所有模板元数据
   */
  getAllMetadata(): TemplateMetadata[] {
    return Array.from(this.metadata.values())
  }

  /**
   * 注册运行时模板 (用于 Dev Server 运行时)
   */
  register(template: TemplateDefinition): void {
    this.templates.set(template.id, template)
  }

  get(id: string): TemplateDefinition | undefined {
    return this.templates.get(id)
  }

  getAll(): TemplateDefinition[] {
    return Array.from(this.templates.values())
  }
}
