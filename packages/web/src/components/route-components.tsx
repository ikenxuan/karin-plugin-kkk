import { Navigate } from 'react-router-dom'

import { isAuthenticated } from '../lib/auth'

/**
 * 路由配置接口
 */
export interface RouteConfig {
  /** 路由路径 */
  path: string
  /** 路由组件 */
  component: React.ComponentType
  /** 是否需要身份验证 */
  protected?: boolean
}

/**
 * 创建路由元素的辅助函数
 * @param config 路由配置对象
 * @returns 路由元素
 */
export const createRouteElement = (config: RouteConfig) => {
  const Component = config.component

  if (config.protected) {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />
    }
    return <Component />
  }

  return <Component />
}