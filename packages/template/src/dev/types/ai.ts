/**
 * AI 供应商相关类型定义
 * 仅支持 OpenAI 兼容格式 与 Claude 兼容格式
 */

export type APIFormat = 'openai' | 'claude'

/**
 * AI 供应商配置
 */
export interface AIProvider {
  /** 唯一 ID */
  id: string
  /** API 格式 */
  apiFormat: APIFormat
  /** API Base URL */
  baseUrl: string
  /** API Key */
  apiKey: string
  /** 模型 ID（用户自定义填写） */
  model: string
  /** 创建时间 */
  createdAt: number
}

/**
 * AI 全局配置
 */
export interface AIConfig {
  /** 已配置的供应商列表 */
  providers: AIProvider[]
  /** 当前激活的供应商 ID */
  activeProviderId: string | null
  /** 默认生成要求（可选） */
  defaultPrompt?: string
  /** 配置版本 */
  version: number
}

/**
 * AI 生成请求参数
 */
export interface AIGenerateOptions {
  /** 平台类型 */
  platform: string
  /** 子组件 ID */
  templateId: string
  /** 子组件描述 */
  componentName?: string
  /** 当前数据示例（用于参考结构） */
  referenceData?: any
  /** 用户自定义补充提示词 */
  userPrompt?: string
  /** 中止信号 */
  signal?: AbortSignal
}

/**
 * AI 生成结果
 */
export interface AIGenerateResult {
  /** 生成的 mock 数据 */
  data: any
  /** 原始响应文本 */
  rawText: string
  /** 模型名 */
  model: string
}

/**
 * API 格式模板
 */
export interface APIFormatTemplate {
  key: APIFormat
  name: string
  defaultBaseUrl: string
  icon: string
}

export const API_FORMAT_TEMPLATES: APIFormatTemplate[] = [
  {
    key: 'openai',
    name: 'OpenAI 兼容',
    defaultBaseUrl: 'https://api.openai.com',
    icon: 'simple-icons:openai'
  },
  {
    key: 'claude',
    name: 'Claude 兼容',
    defaultBaseUrl: 'https://api.anthropic.com',
    icon: 'simple-icons:anthropic'
  }
]

/**
 * 默认 AI 配置
 */
export const DEFAULT_AI_CONFIG: AIConfig = {
  providers: [],
  activeProviderId: null,
  version: 1
}
