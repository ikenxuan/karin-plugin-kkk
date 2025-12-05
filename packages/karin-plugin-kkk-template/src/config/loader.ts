import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { defu } from 'defu'
import { createJiti } from 'jiti'

import type { ResolvedConfig, UserConfig } from '../types'
import { createDefaultResolvedConfig, defaultUserConfig } from './defaults'

/**
 * 支持的配置文件名
 */
const CONFIG_FILE_NAMES = [
  'kkt.config.ts',
  'kkt.config.js',
  'kkt.config.mjs',
  'karin-template.config.ts',
  'karin-template.config.js',
  'karin-template.config.mjs',
]

/**
 * 查找配置文件
 */
export function findConfigFile(root: string): string | null {
  for (const fileName of CONFIG_FILE_NAMES) {
    const configPath = resolve(root, fileName)
    if (existsSync(configPath)) {
      return configPath
    }
  }
  return null
}

/**
 * 加载配置文件
 */
export async function loadConfigFile(configPath: string): Promise<UserConfig> {
  const jiti = createJiti(configPath, {
    interopDefault: true,
    moduleCache: false,
  })

  try {
    const config = await jiti.import(configPath)
    
    // 处理 default export
    if (config && typeof config === 'object' && 'default' in config) {
      return (config as { default: UserConfig }).default
    }
    
    return config as UserConfig
  } catch (error) {
    throw new Error(`Failed to load config file: ${configPath}\n${error}`)
  }
}

/**
 * 解析用户配置
 */
export async function resolveConfig(
  root: string,
  userConfig?: UserConfig,
  isDev = false
): Promise<ResolvedConfig> {
  // 查找配置文件
  const configPath = findConfigFile(root)
  
  // 加载配置文件
  let fileConfig: UserConfig = {}
  if (configPath) {
    fileConfig = await loadConfigFile(configPath)
  }
  
  // 合并配置：用户传入 > 配置文件 > 默认配置
  const mergedConfig = defu(
    userConfig ?? {},
    fileConfig,
    defaultUserConfig
  ) as Required<Omit<UserConfig, 'plugins'>>
  
  // 收集插件
  const plugins = [
    ...(fileConfig.plugins ?? []),
    ...(userConfig?.plugins ?? []),
  ]
  
  // 创建解析后的配置
  const resolvedConfig: ResolvedConfig = {
    ...mergedConfig,
    configPath: configPath ?? '',
    root,
    plugins,
    isDev,
  }
  
  // 执行插件的 config 钩子
  for (const plugin of plugins) {
    if (plugin.config) {
      await plugin.config(resolvedConfig)
    }
  }
  
  return resolvedConfig
}

/**
 * 定义配置的辅助函数（提供类型提示）
 */
export function defineConfig(config: UserConfig): UserConfig {
  return config
}
