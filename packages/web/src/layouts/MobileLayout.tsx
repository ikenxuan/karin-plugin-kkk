/**
 * 移动端布局组件
 * 适配手机屏幕的响应式布局
 */

import { Surface } from '@heroui/react'
import { useBoolean, useMemoizedFn } from 'ahooks'
import { useEffect, useRef } from 'react'

import MobileContent from '../components/mobile/MobileContent'
import MobileDrawer from '../components/mobile/MobileDrawer'
import MobileTopBar from '../components/mobile/MobileTopBar'
import type { MainLayoutProps } from '../types/navigation'
import { bindPageScroll, type SmoothScrollHandle } from '../utils/smoothScroll'

/**
 * 移动端主布局
 */
const MobileLayout = ({ activeMenu, onMenuChange }: MainLayoutProps) => {
  // 抽屉菜单显示状态
  const [drawerOpen, { setTrue: openDrawer, setFalse: closeDrawer }] = useBoolean(false)
  // 布局根元素 ref（移动端布局由页面级滚动承载，wheel 监听挂在根元素上）
  const rootRef = useRef<HTMLDivElement>(null)
  // 滚轮平滑滚动句柄
  const smoothScrollRef = useRef<SmoothScrollHandle | null>(null)

  /**
   * 绑定页面级滚轮平滑滚动（由快到慢的缓动曲线）。
   * 触摸滚动保持原生：本身 1:1 跟手并自带由快到慢的动量衰减。
   */
  useEffect(() => {
    smoothScrollRef.current = bindPageScroll(rootRef)

    return () => {
      smoothScrollRef.current?.destroy()
      smoothScrollRef.current = null
    }
  }, [])

  /**
   * 切换菜单时以同一条缓动曲线回到顶部，让新页面从页首开始。
   */
  useEffect(() => {
    smoothScrollRef.current?.scrollTo(0)
  }, [activeMenu])

  /**
   * 菜单项点击处理
   */
  const handleMenuChange = useMemoizedFn((menu: Parameters<MainLayoutProps['onMenuChange']>[0]) => {
    onMenuChange(menu)
    closeDrawer() // 选择后关闭抽屉
  })

  return (
    <Surface ref={rootRef} data-scrollbar="thin" className="flex min-h-screen flex-col">
      {/* 顶部栏 */}
      <header className="sticky top-0 z-50 h-14 shrink-0 backdrop-blur-xs mask-[linear-gradient(to_bottom,black_40%,transparent_100%)]">
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
