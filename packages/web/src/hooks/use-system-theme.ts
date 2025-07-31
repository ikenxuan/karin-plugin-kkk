import { useEffect, useState } from 'react'

/**
 * 系统主题监听Hook
 * @description 监听系统颜色模式变化并自动切换主题
 * @returns 当前系统主题（'light' | 'dark'）
 */
export const useSystemTheme = () => {
  /**
   * 获取当前系统主题
   * @returns 系统主题类型
   */
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  useEffect(() => {
    /**
     * 系统主题变化处理函数
     * @param event - 媒体查询变化事件
     */
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    // 创建媒体查询监听器
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // 添加监听器
    mediaQuery.addEventListener('change', handleThemeChange)

    // 清理函数：移除监听器
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return systemTheme
}