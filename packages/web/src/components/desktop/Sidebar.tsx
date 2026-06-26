/**
 * PC端侧边栏组件
 */

import { Avatar, Button, Popover, Separator, cn } from '@heroui/react'
import { useMemoizedFn } from 'ahooks'
import { Settings, FileText, HelpCircle, LogOut } from 'lucide-react'

import { clearAuthTokens } from '../../auth/token'
import { USER_AVATAR_URL } from '../../constants/user'
import type { MainMenuKey } from '../../types/navigation'

interface SidebarProps {
  collapsed: boolean
  activeMenu: MainMenuKey
  onMenuChange: (menu: MainMenuKey) => void
  onToggleCollapse: () => void
}

/**
 * 菜单项配置
 */
const menuItems = [
  { id: 'config', label: '配置管理', icon: Settings },
  { id: 'about', label: '关于插件', icon: FileText }
]

/**
 * 侧边栏组件
 */
const Sidebar = ({ collapsed, activeMenu, onMenuChange }: SidebarProps) => {
  /**
   * 打开文档页面
   */
  const handleOpenDocs = useMemoizedFn(() => {
    window.open('https://kkk.karinjs.com', '_blank', 'noopener,noreferrer')
  })

  /**
   * 登出操作
   */
  const handleLogout = useMemoizedFn(() => {
    clearAuthTokens()
    window.location.reload()
  })

  if (collapsed) {
    return null
  }

  return (
    <div className="flex h-full flex-col">
      {/* 顶部用户信息区域 */}
      <div className="shrink-0 px-4 pt-3 pb-2">
        <Popover>
          <Popover.Trigger aria-label="用户信息">
            <div
              className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-default-100 cursor-pointer"
              tabIndex={0}
            >
              <Avatar size="lg">
                <Avatar.Image src={USER_AVATAR_URL} />
                <Avatar.Fallback>ikenxuan</Avatar.Fallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <p className="truncate text-lg font-semibold">炫炫</p>
                <p className="truncate text-md text-muted">Super Admin</p>
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content className="w-60">
            <Popover.Dialog>
              <div className="flex items-center gap-3 pb-3">
                <Avatar size="md">
                  <Avatar.Image src={USER_AVATAR_URL} />
                  <Avatar.Fallback>U</Avatar.Fallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">用户</p>
                  <p className="truncate text-md text-muted">Super Admin</p>
                </div>
              </div>
              <Separator className="my-2" />
              <p className="text-xs text-muted">当前身份：管理员</p>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      </div>

      {/* 菜单列表 */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3" aria-label="主导航">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeMenu === item.id

          return (
            <Button
              key={item.id}
              fullWidth
              className="justify-start"
              size="lg"
              variant={isActive ? 'tertiary' : 'ghost'}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              onPress={() => onMenuChange(item.id as MainMenuKey)}
            >
              <Icon size={20} className={cn('shrink-0 mr-3', !isActive && 'text-muted')} aria-hidden="true" />
              <span className={cn('truncate', isActive && 'font-medium')}>{item.label}</span>
            </Button>
          )
        })}
      </nav>

      {/* 底部操作区域 - 固定在底部 */}
      <div className="flex shrink-0 flex-col gap-1 px-3 py-3">
        <Button fullWidth className="justify-start" size="lg" variant="ghost" aria-label="查看帮助文档" onPress={handleOpenDocs}>
          <HelpCircle size={20} className="shrink-0 mr-3 text-muted" aria-hidden="true" />
          <span className="truncate">帮助文档</span>
        </Button>
        <Button fullWidth className="justify-start" size="lg" variant="ghost" aria-label="登出" onPress={handleLogout}>
          <LogOut size={20} className="shrink-0 mr-3 text-muted" aria-hidden="true" />
          <span className="truncate">登出</span>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
