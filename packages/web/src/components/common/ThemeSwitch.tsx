import { Button, Tooltip } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '../../hooks/useTheme'

interface ThemeSwitchProps {
  className?: string
}

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Tooltip delay={1} closeDelay={1}>
      <Button
        isIconOnly
        aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
        className={className}
        variant="ghost"
        onPress={toggleTheme}
      >
        {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
      </Button>
      <Tooltip.Content>{isDark ? '浅色模式' : '深色模式'}</Tooltip.Content>
    </Tooltip>
  )
}

export default ThemeSwitch
