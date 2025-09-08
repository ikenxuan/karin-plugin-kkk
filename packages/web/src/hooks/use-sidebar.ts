import * as React from 'react'

/**
 * 侧边栏上下文属性类型
 */
export type SidebarContextProps = {
  /** 侧边栏状态：展开或折叠 */
  state: 'expanded' | 'collapsed'
  /** 侧边栏是否打开 */
  open: boolean
  /** 设置侧边栏打开状态的函数 */
  setOpen: (open: boolean) => void
  /** 移动端侧边栏是否打开 */
  openMobile: boolean
  /** 设置移动端侧边栏打开状态的函数 */
  setOpenMobile: (open: boolean) => void
  /** 是否为移动端 */
  isMobile: boolean
  /** 切换侧边栏状态的函数 */
  toggleSidebar: () => void
}

/**
 * 侧边栏上下文
 */
export const SidebarContext = React.createContext<SidebarContextProps | null>(null)

/**
 * 使用侧边栏上下文的 Hook
 * @returns 侧边栏上下文属性
 * @throws 如果在 SidebarProvider 外部使用则抛出错误
 */
export const useSidebar = (): SidebarContextProps => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}
