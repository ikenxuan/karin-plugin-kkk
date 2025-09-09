import { isTauri } from '@tauri-apps/api/core'

/**
 * 检测当前运行环境
 * @returns 返回当前环境类型：'tauri' | 'web' | 'unknown'
 */
export function getRuntimeEnvironment (): 'tauri' | 'web' | 'unknown' {
  if (isTauri()) {
    return 'tauri'
  }

  if (typeof window !== 'undefined') {
    return 'web'
  }

  return 'unknown'
}

/**
 * 获取服务器基础URL
 * 在Tauri环境下直接使用绝对路径，避免相对路径问题
 */
export const getApiBaseUrl = (): string => {
  // Tauri环境下直接使用框架服务器
  if (isTauri()) {
    const savedUrl = localStorage.getItem('serverUrl')
    return savedUrl || '/'
  }

  // Web开发环境使用相对路径，让vite代理处理
  return ''
}
