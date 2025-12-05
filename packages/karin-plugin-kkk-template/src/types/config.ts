import type { ComponentType } from 'react'

/**
 * 模板组件 Props 基础接口
 */
export interface BaseTemplateProps<T = Record<string, unknown>> {
  /** 渲染数据 */
  data: T
  /** 扩展上下文 */
  context?: Record<string, unknown>
}

/**
 * 模板定义
 */
export interface TemplateDefinition<T = Record<string, unknown>> {
  /** 模板唯一标识 (通常由路径生成，也可手动指定) */
  id: string
  /** 模板名称 */
  name?: string
  /** 模板描述 */
  description?: string
  /** 模板组件 */
  component: ComponentType<BaseTemplateProps<T>>
  /** 数据验证函数 */
  validateData?: (data: unknown) => data is T
  /** 模拟数据（用于开发预览） */
  mockData?: T | (() => T | Promise<T>)
  /** 模板元数据 */
  meta?: Record<string, unknown>
}

/**
 * 开发服务器配置
 */
export interface DevServerConfig {
  /** 端口号 */
  port?: number
  /** 主机地址 */
  host?: string | boolean
  /** 是否自动打开浏览器 */
  open?: boolean
  /** 代理配置 */
  proxy?: Record<string, string | { target: string; changeOrigin?: boolean }>
}

/**
 * 构建配置
 */
export interface BuildConfig {
  /** 输出目录 */
  outDir?: string
  /** 是否压缩 */
  minify?: boolean
  /** 是否生成 sourcemap */
  sourcemap?: boolean
  /** CSS 输出文件名 */
  cssFileName?: string
}

/**
 * 用户配置文件接口
 */
export interface UserConfig {
  /** 项目名称 */
  name?: string
  
  /** 模板目录（相对于配置文件，支持 glob） */
  templatesDir?: string
  
  /** 模拟数据目录 */
  mockDataDir?: string

  /** 全局 CSS 文件路径 */
  globalCss?: string
  
  /** 开发服务器配置 */
  dev?: DevServerConfig
  
  /** 构建配置 */
  build?: BuildConfig
  
  /** 插件列表 */
  plugins?: TemplatePlugin[]
}

/**
 * 解析后的完整配置
 */
export interface ResolvedConfig extends Required<Omit<UserConfig, 'plugins'>> {
  /** 配置文件路径 */
  configPath: string
  /** 项目根目录 */
  root: string
  /** 插件列表 */
  plugins: TemplatePlugin[]
  /** 是否为开发模式 */
  isDev: boolean
}

/**
 * 插件钩子上下文
 */
export interface PluginContext {
  /** 当前配置 */
  config: ResolvedConfig
  /** 模板注册表 */
  templates: Map<string, TemplateDefinition>
}

/**
 * 插件接口
 */
export interface TemplatePlugin {
  /** 插件名称 */
  name: string
  /** 配置钩子 */
  config?: (config: ResolvedConfig) => void | Promise<void>
  /** 构建开始钩子 */
  buildStart?: (context: PluginContext) => void | Promise<void>
  /** 构建结束钩子 */
  buildEnd?: (context: PluginContext) => void | Promise<void>
}
