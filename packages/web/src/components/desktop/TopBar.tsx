/**
 * PC端顶部栏组件
 */

import { Button } from '@heroui/react'
import { Menu, Package, PanelLeftClose } from 'lucide-react'

import ThemeSwitch from '../common/ThemeSwitch'

interface TopBarProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
  currentMenuLabel?: string
}

/**
 * 顶部栏组件
 */
const TopBar = ({ onToggleSidebar, sidebarCollapsed, currentMenuLabel }: TopBarProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      {/* 左侧：折叠按钮 + Logo/标题 */}
      <div className="flex min-w-0 items-center gap-3">
        {/* 折叠/展开按钮始终显示在左侧 */}
        <Button
          isIconOnly
          variant="ghost"
          onPress={onToggleSidebar}
          aria-label={sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'}
          aria-expanded={!sidebarCollapsed}
        >
          {sidebarCollapsed ? <Menu size={20} aria-hidden="true" /> : <PanelLeftClose size={20} aria-hidden="true" />}
        </Button>

        {/* Logo 和标题 */}
        {sidebarCollapsed && (
          <>
            <Package size={24} aria-hidden="true" />
            <h1 className="truncate text-lg font-semibold">KKK Config</h1>
          </>
        )}
        {!sidebarCollapsed && <h1 className="truncate text-lg font-semibold">{currentMenuLabel || '配置管理面板'}</h1>}
      </div>

      <ThemeSwitch />
    </div>
  )
}

export default TopBar
