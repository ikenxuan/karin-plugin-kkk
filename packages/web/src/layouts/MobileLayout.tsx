/**
 * 移动端布局组件
 * 适配手机屏幕的响应式布局
 */

import { Surface } from '@heroui/react'
import { useBoolean, useMemoizedFn } from 'ahooks'

import MobileContent from '../components/mobile/MobileContent'
import MobileDrawer from '../components/mobile/MobileDrawer'
import MobileTopBar from '../components/mobile/MobileTopBar'
import type { MainLayoutProps } from '../types/navigation'

/**
 * 移动端主布局
 */
const MobileLayout = ({ activeMenu, onMenuChange }: MainLayoutProps) => {
  // 抽屉菜单显示状态
  const [drawerOpen, { setTrue: openDrawer, setFalse: closeDrawer }] = useBoolean(false)

  /**
   * 菜单项点击处理
   */
  const handleMenuChange = useMemoizedFn((menu: Parameters<MainLayoutProps['onMenuChange']>[0]) => {
    onMenuChange(menu)
    closeDrawer() // 选择后关闭抽屉
  })

  return (
    <Surface data-scrollbar="thin" className="flex min-h-screen flex-col">
      {/* 顶部栏 */}
      <header
        className="sticky top-0 z-50 h-14 shrink-0 backdrop-blur-xs bg-white/60 
             mask-[linear-gradient(to_bottom,black_40%,transparent_100%)]"
      >
        <MobileTopBar onOpenDrawer={openDrawer} />
      </header>

      {/* 抽屉菜单 */}
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} activeMenu={activeMenu} onMenuChange={handleMenuChange} />

      {/* 主内容区 */}
      <main className="scrollbar flex-1 overflow-y-auto p-4" id="main-content">
        <MobileContent activeMenu={activeMenu} />
      </main>
    </Surface>
  )
}

export default MobileLayout
