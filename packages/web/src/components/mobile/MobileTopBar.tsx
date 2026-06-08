/**
 * 移动端顶部栏组件
 */

import { Button } from '@heroui/react'
import { Menu, Package } from 'lucide-react'
import ThemeSwitch from '../common/ThemeSwitch'

interface MobileTopBarProps {
  onOpenDrawer: () => void
}

/**
 * 移动端顶部栏
 */
const MobileTopBar = ({ onOpenDrawer }: MobileTopBarProps) => {
  return (
    <div className="flex h-full items-center justify-between px-4">
      <ThemeSwitch className="shrink-0" />

      {/* 左侧：标题 */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 px-2">
        <Package size={22} aria-hidden="true" />
        <h1 className="truncate text-base font-semibold">KKK Config</h1>
      </div>

      {/* 右侧：菜单按钮 */}
      <Button
        isIconOnly
        className="shrink-0"
        variant="ghost"
        onPress={onOpenDrawer}
        aria-label="打开菜单"
        aria-expanded={false}
      >
        <Menu size={24} aria-hidden="true" />
      </Button>
    </div>
  )
}

export default MobileTopBar
