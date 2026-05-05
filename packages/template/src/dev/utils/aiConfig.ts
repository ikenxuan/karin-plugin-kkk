/**
 * AI 供应商配置管理工具
 * 使用 localStorage 持久化保存
 */

import type { AIConfig, AIProvider } from '../types/ai'
import { DEFAULT_AI_CONFIG } from '../types/ai'

const AI_CONFIG_STORAGE_KEY = 'karin-template-ai-config-v2'

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `ai-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export const getAIConfig = (): AIConfig => {
  try {
    const raw = localStorage.getItem(AI_CONFIG_STORAGE_KEY)
    if (!raw) return { ...DEFAULT_AI_CONFIG }
    const parsed = JSON.parse(raw) as Partial<AIConfig>
    return {
      providers: Array.isArray(parsed.providers) ? parsed.providers : [],
      activeProviderId: parsed.activeProviderId ?? null,
      defaultPrompt: parsed.defaultPrompt,
      version: parsed.version ?? DEFAULT_AI_CONFIG.version
    }
  } catch (error) {
    console.warn('[AI Config] 读取失败:', error)
    return { ...DEFAULT_AI_CONFIG }
  }
}

export const saveAIConfig = (config: AIConfig): void => {
  try {
    localStorage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(config))
  } catch (error) {
    console.warn('[AI Config] 保存失败:', error)
  }
}

export const addProvider = (provider: Omit<AIProvider, 'id' | 'createdAt'>): AIProvider => {
  const config = getAIConfig()
  const newProvider: AIProvider = {
    ...provider,
    id: generateId(),
    createdAt: Date.now()
  }
  config.providers.push(newProvider)
  if (!config.activeProviderId) config.activeProviderId = newProvider.id
  saveAIConfig(config)
  return newProvider
}

export const updateProvider = (id: string, patch: Partial<Omit<AIProvider, 'id' | 'createdAt'>>): void => {
  const config = getAIConfig()
  const idx = config.providers.findIndex(p => p.id === id)
  if (idx === -1) return
  config.providers[idx] = { ...config.providers[idx], ...patch }
  saveAIConfig(config)
}

export const removeProvider = (id: string): void => {
  const config = getAIConfig()
  config.providers = config.providers.filter(p => p.id !== id)
  if (config.activeProviderId === id) {
    config.activeProviderId = config.providers[0]?.id ?? null
  }
  saveAIConfig(config)
}

export const setActiveProvider = (id: string | null): void => {
  const config = getAIConfig()
  config.activeProviderId = id
  saveAIConfig(config)
}

export const getActiveProvider = (): AIProvider | null => {
  const config = getAIConfig()
  if (!config.activeProviderId) return null
  return config.providers.find(p => p.id === config.activeProviderId) ?? null
}

export const setDefaultPrompt = (prompt: string | undefined): void => {
  const config = getAIConfig()
  config.defaultPrompt = prompt
  saveAIConfig(config)
}
