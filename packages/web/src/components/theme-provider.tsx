import { createContext, useContext, useEffect, useState } from "react"

import { useSystemTheme } from "@/hooks/use-system-theme"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  /**
   * 是否启用自动跟随系统主题
   * @default true
   */
  autoFollowSystem?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  /**
   * 当前实际应用的主题
   */
  actualTheme: 'light' | 'dark'
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: 'light',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  autoFollowSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  // 使用系统主题监听 hook
  const systemTheme = useSystemTheme()

  // 计算实际应用的主题
  const actualTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(actualTheme)
  }, [actualTheme])

  // 如果启用自动跟随系统且当前主题是 system，则自动切换
  useEffect(() => {
    if (autoFollowSystem && theme === "system") {
      // 系统主题变化时会自动通过 actualTheme 的变化触发上面的 useEffect
      console.log(`系统主题已切换为: ${systemTheme}`)
    }
  }, [systemTheme, theme, autoFollowSystem])

  /**
   * 设置主题
   * @param newTheme - 新的主题设置
   */
  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setTheme(newTheme)
  }

  const value = {
    theme,
    setTheme: handleSetTheme,
    actualTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}