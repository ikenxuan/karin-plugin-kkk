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
 * @description 根据路由配置创建相应的路由元素
 * @param config 路由配置对象
 * @returns 路由元素
 */
export const createRouteElement = (config: RouteConfig) => {
  // const Component = config.component
  
  // if (config.protected) {
  //   return (
  //     <ProtectedRoute>
  //       <Component />
  //     </ProtectedRoute>
  //   )
  // }
  
  return <config.component />
}