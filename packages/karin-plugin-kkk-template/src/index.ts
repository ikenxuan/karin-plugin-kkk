export * from './types'
export * from './core/registry'
export * from './utils/logger'
export { defineConfig } from './config'

import type { TemplateDefinition } from './types'

/**
 * 定义模板组件
 * @param definition 模板定义
 */
export function DefineTemplate<T = Record<string, unknown>>(
  definition: Omit<TemplateDefinition<T>, 'id'> & { id?: string }
): TemplateDefinition<T> {
  return definition as TemplateDefinition<T>
}
