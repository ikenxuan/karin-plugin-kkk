import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getDefaultRedirectPath, isAuthenticated } from '@/lib/auth'

import { AuthLoadingComponent } from './loading-components'

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
 * 受保护的路由组件
 * @description 检查用户身份验证状态，未认证时跳转到登录页
 * @param children 子组件
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    /**
     * 检查认证状态并处理导航
     * @description 异步检查用户认证状态，添加最小显示时间确保加载动画可见
     */
    const checkAuth = async () => {
      const startTime = Date.now()
      const minDisplayTime = 800 // 最小显示时间（毫秒）
      
      const authenticated = isAuthenticated()
      
      if (!authenticated) {
        // 计算已经过去的时间
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minDisplayTime - elapsed)
        
        // 等待剩余时间后跳转
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, remainingTime)
      } else {
        // 认证成功，等待最小显示时间后显示内容
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minDisplayTime - elapsed)
        
        setTimeout(() => {
          setIsLoading(false)
        }, remainingTime)
      }
    }

    checkAuth()
  }, [navigate])

  if (isLoading) {
    return <AuthLoadingComponent />
  }

  return <>{children}</>
}

/**
 * 根路径重定向组件
 * @description 处理根路径访问，根据认证状态重定向到相应页面
 */
export const RootRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    /**
     * 处理根路径重定向逻辑
     * @description 检查认证状态并重定向到合适的页面
     */
    const handleRedirect = async () => {
      const startTime = Date.now()
      const minDisplayTime = 600 // 最小显示时间（毫秒）
      
      try {
        const authenticated = isAuthenticated()
        const targetPath = authenticated ? getDefaultRedirectPath() : '/login'
        
        // 计算已经过去的时间
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minDisplayTime - elapsed)
        
        // 等待剩余时间后重定向
        setTimeout(() => {
          navigate(targetPath, { replace: true })
        }, remainingTime)
      } catch (error) {
        console.error('重定向过程中发生错误:', error)
        // 发生错误时直接跳转到登录页
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, minDisplayTime)
      }
    }

    handleRedirect()
  }, [navigate])

  return <AuthLoadingComponent />
}

/**
 * 创建路由元素的辅助函数
 * @description 根据路由配置创建相应的路由元素
 * @param config 路由配置对象
 * @returns 路由元素
 */
export const createRouteElement = (config: RouteConfig) => {
  const Component = config.component
  
  if (config.protected) {
    return (
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    )
  }
  
  return <Component />
}