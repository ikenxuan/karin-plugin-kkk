import { createContext, type ReactNode, useContext } from 'react'

import { useTheme } from '@/hooks/use-theme'

type ThemeProviderProps = {
  children: ReactNode
  /**
   * 默认主题模式
   * @default 'system'
   */
  defaultTheme?: 'system' | 'inverse'
}

type ThemeProviderState = {
  theme: 'system' | 'inverse'
  isDark: boolean
  isLight: boolean
  setSystemTheme: () => void
  setInverseTheme: () => void
  toggleTheme: () => void
  isSystem: boolean
  isInverse: boolean
}

const initialState: ThemeProviderState = {
  theme: 'system',
  isDark: false,
  isLight: true,
  setSystemTheme: () => null,
  setInverseTheme: () => null,
  toggleTheme: () => null,
  isSystem: true,
  isInverse: false,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * 主题提供者组件
 * @param children - 子组件
 * @param defaultTheme - 默认主题模式
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  ...props
}: ThemeProviderProps) {
  const themeState = useTheme(defaultTheme)

  return (
    <ThemeProviderContext.Provider {...props} value={themeState}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

/**
 * 使用主题上下文的 Hook
 * @returns 主题状态和操作方法
 */
export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useThemeContext must be used within a ThemeProvider')

  return context
}