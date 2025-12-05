import type { ResolvedConfig, UserConfig } from '../types'

/**
 * 默认用户配置
 */
export const defaultUserConfig: Required<Omit<UserConfig, 'plugins'>> = {
  name: 'karin-template-project',
  templatesDir: 'src',
  mockDataDir: 'mock-data',
  dev: {
    port: 3000,
    host: true,
    open: false,
  },
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: false,
    cssFileName: 'style.css',
  },
}

/**
 * 创建默认的解析配置
 */
export function createDefaultResolvedConfig(root: string): ResolvedConfig {
  return {
    ...defaultUserConfig,
    configPath: '',
    root,
    plugins: [],
    isDev: process.env.NODE_ENV !== 'production',
  }
}
