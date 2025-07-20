import { useState } from "react"
import { Sidebar } from "./sideber"

interface LayoutProps {
  children: React.ReactNode
}

/**
 * 主布局组件，包含侧边栏和头部
 * @param children - 子组件内容
 */
export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  /**
   * 切换侧边栏折叠状态
   */
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}