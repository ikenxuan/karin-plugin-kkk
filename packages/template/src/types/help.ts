import type { BaseComponentProps } from './index'

/**
 * 帮助页面组件属性接口
 */
export interface HelpProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 页面标题 */
    title?: string
  }
}

/**
 * 菜单项接口
 */
export interface MenuItem {
  /** 菜单项标题 */
  title: string
  /** 菜单项描述 */
  description: string
}

/**
 * 菜单分组接口
 */
export interface MenuGroup {
  /** 分组标题 */
  title: string
  /** 菜单项列表 */
  items: MenuItem[]
  /** 子分组（可选） */
  subGroups?: {
    /** 子分组标题 */
    title: string
    /** 子分组菜单项 */
    items: MenuItem[]
  }[]
}