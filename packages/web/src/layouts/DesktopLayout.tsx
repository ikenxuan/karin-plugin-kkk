/**
 * PC桌面端布局组件
 * 包含侧边栏、顶部菜单栏和主内容区三个板块
 */

import { Surface } from '@heroui/react'
import { useBoolean, useMemoizedFn, useSetState } from 'ahooks'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Settings, FileText } from 'lucide-react'
import Sidebar from '../components/desktop/Sidebar'
import TopBar from '../components/desktop/TopBar'
import MainContent from '../components/desktop/MainContent'

/**
 * 菜单项配置
 */
const menuItems = [
  { id: 'config', label: '配置管理', icon: Settings },
  { id: 'about', label: '关于插件', icon: FileText },
]

/**
 * 桌面端主布局
 */
const DesktopLayout = () => {
  // 侧边栏折叠状态
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useBoolean(false)
  // 当前选中的菜单项
  const [state, setState] = useSetState({ activeMenu: 'config' })
  // 侧边栏 ref
  const sidebarRef = useRef<HTMLElement>(null)

  /**
   * 切换桌面端当前菜单项。
   */
  const handleMenuChange = useMemoizedFn((menu: string) => {
    setState({ activeMenu: menu })
  })

  /**
   * 侧边栏展开/收起动画
   */
  useEffect(() => {
    if (!sidebarRef.current) return

    if (sidebarCollapsed) {
      // 收起动画 - 先动画再隐藏
      gsap.to(sidebarRef.current, {
        width: 0,
        opacity: 0,
        borderRightWidth: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          if (sidebarRef.current) {
            sidebarRef.current.style.display = 'none'
          }
        },
      })
    } else {
      // 展开动画 - 先显示再动画
      sidebarRef.current.style.display = 'flex'
      gsap.fromTo(
        sidebarRef.current,
        {
          width: 0,
          opacity: 0,
          borderRightWidth: 0,
        },
        {
          width: 260,
          opacity: 1,
          borderRightWidth: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        }
      )
    }
  }, [sidebarCollapsed])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 侧边栏 - 始终渲染以支持动画 */}
      <aside
        ref={sidebarRef}
        className="flex h-full w-65 shrink-0 flex-col border-r border-default-100"
        aria-label="侧边栏导航"
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          activeMenu={state.activeMenu}
          onMenuChange={handleMenuChange}
          onToggleCollapse={toggleSidebar}
        />
      </aside>

      {/* 主体区域 */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* 顶部菜单栏 */}
        <header className="flex h-16 shrink-0 items-center px-6">
          <TopBar
            onToggleSidebar={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
            currentMenuLabel={menuItems.find(item => item.id === state.activeMenu)?.label}
          />
        </header>

        {/* 主内容区 */}
        <main className="scrollbar flex-1 overflow-y-auto p-6" id="main-content">
          <Surface data-scrollbar="thin">
            <MainContent activeMenu={state.activeMenu} />
          </Surface>
        </main>
      </div>
    </div>
  )
}

export default DesktopLayout
