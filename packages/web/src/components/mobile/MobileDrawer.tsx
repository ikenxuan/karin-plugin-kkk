/**
 * 移动端抽屉菜单组件
 */

import { Button, Drawer, cn, Avatar } from '@heroui/react'
import { useMemoizedFn } from 'ahooks'
import { X, Settings, FileText, HelpCircle, LogOut } from 'lucide-react'
import { useEffect } from 'react'

import { clearAuthTokens } from '../../auth/token'
import { USER_AVATAR_URL } from '../../constants/user'
import type { MainMenuKey } from '../../types/navigation'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  activeMenu: MainMenuKey
  onMenuChange: (menu: MainMenuKey) => void
}

/**
 * 菜单项配置
 */
const menuItems = [
  { id: 'config', label: '配置管理', icon: Settings },
  { id: 'about', label: '关于插件', icon: FileText }
]

/**
 * 移动端抽屉菜单
 */
const MobileDrawer = ({ open, onClose, activeMenu, onMenuChange }: MobileDrawerProps) => {
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

  // 处理 ESC 键关闭抽屉
  useEffect(() => {
    /**
     * 按下 ESC 时关闭移动端菜单。
     */
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  // 阻止背景滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <Drawer
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <Drawer.Backdrop isDismissable className="backdrop-blur-sm">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="px-4">
            <Drawer.Header className="flex items-center justify-between pb-4">
              <Drawer.CloseTrigger aria-label="关闭菜单" className="mr-2">
                <X size={24} aria-hidden="true" />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body className="flex flex-col">
              {/* 用户信息区 */}
              <div className="shrink-0 pb-5">
                <div className="flex items-center gap-3 px-1">
                  <Avatar size="md">
                    <Avatar.Image src={USER_AVATAR_URL} />
                    <Avatar.Fallback>ikenxuan</Avatar.Fallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-medium">炫炫</p>
                    <p className="truncate text-xs text-muted">Super Admin</p>
                  </div>
                </div>
              </div>

              {/* 菜单列表 */}
              <nav className="flex flex-1 flex-col gap-2 overflow-y-auto" aria-label="主导航">
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
                      <span className={cn('truncate', isActive && 'font-semibold')}>{item.label}</span>
                    </Button>
                  )
                })}
              </nav>

              {/* 底部操作区域 */}
              <div className="flex shrink-0 flex-col gap-2">
                <Button fullWidth className="justify-start" size="lg" variant="ghost" aria-label="查看帮助文档" onPress={handleOpenDocs}>
                  <HelpCircle size={20} className="shrink-0 mr-3 text-muted" aria-hidden="true" />
                  <span className="truncate">帮助文档</span>
                </Button>
                <Button fullWidth className="justify-start" size="lg" variant="ghost" aria-label="登出" onPress={handleLogout}>
                  <LogOut size={20} className="shrink-0 mr-3 text-muted" aria-hidden="true" />
                  <span className="truncate">登出</span>
                </Button>
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}

export default MobileDrawer
