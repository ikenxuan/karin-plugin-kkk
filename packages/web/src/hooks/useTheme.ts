import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const themeStorageKey = 'theme'
const themeChangedEventName = 'kkk-theme-changed'
const karinThemeMessageType = 'karin-theme-change'

const ThemeProps = {
  light: 'light',
  dark: 'dark',
  system: 'system',
  inverse: 'inverse'
} as const

type StoredTheme = typeof ThemeProps.system | typeof ThemeProps.inverse
type AppliedTheme = typeof ThemeProps.light | typeof ThemeProps.dark

interface KarinThemeMessage {
  type: typeof karinThemeMessageType
  theme?: StoredTheme
  appliedTheme?: AppliedTheme
}

const isStoredTheme = (value: string | null): value is StoredTheme => value === ThemeProps.system || value === ThemeProps.inverse

const isAppliedTheme = (value: unknown): value is AppliedTheme => value === ThemeProps.light || value === ThemeProps.dark

const isKarinThemeMessage = (value: unknown): value is KarinThemeMessage => {
  if (!value || typeof value !== 'object') return false

  const message = value as Partial<KarinThemeMessage>
  return message.type === karinThemeMessageType
}

const readStoredTheme = (): StoredTheme => {
  const rawValue = localStorage.getItem(themeStorageKey)
  if (isStoredTheme(rawValue)) return rawValue

  try {
    const parsedValue = JSON.parse(rawValue ?? '')
    if (isStoredTheme(parsedValue)) return parsedValue
  } catch {
    // Karin 主 Web 会把 theme 写成普通字符串，这里兼容空值和非 JSON 值。
  }

  localStorage.setItem(themeStorageKey, ThemeProps.system)
  return ThemeProps.system
}

const getSystemTheme = (): AppliedTheme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeProps.dark : ThemeProps.light)

const getInverseSystemTheme = (): AppliedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeProps.light : ThemeProps.dark

const getAppliedTheme = (theme: StoredTheme): AppliedTheme => (theme === ThemeProps.system ? getSystemTheme() : getInverseSystemTheme())

const applyThemeClass = (theme: StoredTheme) => {
  return applyResolvedThemeClass(getAppliedTheme(theme))
}

const applyResolvedThemeClass = (appliedTheme: AppliedTheme) => {
  document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark)
  document.documentElement.classList.add(appliedTheme)
  document.documentElement.dataset.theme = appliedTheme

  return appliedTheme
}

export const useTheme = () => {
  const [theme, setThemeState] = useState<StoredTheme>(() => readStoredTheme())
  const [appliedTheme, setAppliedTheme] = useState<AppliedTheme>(() => getAppliedTheme(theme))

  // 使用 ref 标记是否由 Karin 触发的更新，避免 useEffect 重新计算
  const isKarinUpdateRef = useRef(false)

  const setTheme = useCallback((nextTheme: StoredTheme) => {
    localStorage.setItem(themeStorageKey, nextTheme)
    setThemeState(nextTheme)
    setAppliedTheme(applyThemeClass(nextTheme))
    window.dispatchEvent(new CustomEvent(themeChangedEventName, { detail: nextTheme }))
  }, [])

  const setSystemTheme = useCallback(() => {
    setTheme(ThemeProps.system)
  }, [setTheme])

  const setInverseTheme = useCallback(() => {
    setTheme(ThemeProps.inverse)
  }, [setTheme])

  const toggleTheme = useCallback(() => {
    setTheme(theme === ThemeProps.system ? ThemeProps.inverse : ThemeProps.system)
  }, [setTheme, theme])

  useEffect(() => {
    // 如果是 Karin 触发的更新，跳过重新计算
    if (isKarinUpdateRef.current) {
      isKarinUpdateRef.current = false
    } else {
      setAppliedTheme(applyThemeClass(theme))
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      setAppliedTheme(applyThemeClass(theme))
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== themeStorageKey) return

      // 如果在 iframe 内，忽略 storage 事件，因为我们通过 postMessage 接收主题
      // storage 事件在 iframe 和父窗口间会互相触发，导致循环
      if (window.self !== window.top) {
        return
      }

      const nextTheme = readStoredTheme()
      setThemeState(nextTheme)
      setAppliedTheme(applyThemeClass(nextTheme))
    }

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<StoredTheme>).detail
      if (!isStoredTheme(nextTheme)) return

      setThemeState(nextTheme)
      setAppliedTheme(applyThemeClass(nextTheme))
    }

    const handleKarinThemeMessage = (event: MessageEvent<unknown>) => {
      if (!isKarinThemeMessage(event.data)) return

      const messageTheme = event.data.theme
      const nextTheme: StoredTheme = isStoredTheme(messageTheme ?? null) ? (messageTheme as StoredTheme) : readStoredTheme()
      const nextAppliedTheme = isAppliedTheme(event.data.appliedTheme) ? event.data.appliedTheme : getAppliedTheme(nextTheme)

      // 标记这是 Karin 的更新，让 useEffect 跳过重新计算
      isKarinUpdateRef.current = true

      localStorage.setItem(themeStorageKey, nextTheme)
      setThemeState(nextTheme)
      setAppliedTheme(applyResolvedThemeClass(nextAppliedTheme))
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(themeChangedEventName, handleThemeChange)
    window.addEventListener('message', handleKarinThemeMessage)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(themeChangedEventName, handleThemeChange)
      window.removeEventListener('message', handleKarinThemeMessage)
    }
  }, [theme])

  const isDark = useMemo(() => appliedTheme === ThemeProps.dark, [appliedTheme])
  const isLight = useMemo(() => appliedTheme === ThemeProps.light, [appliedTheme])

  return {
    theme,
    appliedTheme,
    isDark,
    isLight,
    isSystem: theme === ThemeProps.system,
    isInverse: theme === ThemeProps.inverse,
    setSystemTheme,
    setInverseTheme,
    toggleTheme
  }
}
