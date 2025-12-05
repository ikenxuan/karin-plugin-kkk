import type { UserConfig } from '../types'

export * from './defaults'
export * from './loader'

/**
 * 定义用户配置
 */
export function defineConfig(config: UserConfig): UserConfig {
  return config
}
