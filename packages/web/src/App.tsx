import { Description, ScrollShadow, Spinner, Surface, Toast } from '@heroui/react'
import { useMemoizedFn, useSetState } from 'ahooks'
import { useEffect, type ComponentType } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { authChangedEventName, hasAuthToken } from './auth/token'
import ConfigPanel from './components/common/ConfigPanel'
import LoginPanel from './components/common/LoginPanel'
import { useTheme } from './hooks/useTheme'
import type { MainLayoutProps, MainMenuKey } from './types/navigation'
import { detectDevice, type DeviceLayout } from './utils/device'

/**
 * 加载 PC 端布局。
 */
const DesktopApp = () => import('./layouts/DesktopLayout')

/**
 * 加载手机端布局。
 */
const MobileApp = () => import('./layouts/MobileLayout')

type RootState = {
  authenticated: boolean
  device: DeviceLayout
  LayoutComponent: ComponentType<MainLayoutProps> | null
}

const menuRouteMap: Record<MainMenuKey, string> = {
  config: '/kkk/assets/config',
  about: '/kkk/assets/about'
}

const routeMenuMap: Record<string, MainMenuKey> = {
  '/kkk/assets/config': 'config',
  '/kkk/assets/about': 'about'
}

/**
 * 配置页面路由组件（独立渲染，支持 URL 查询参数）
 */
const ConfigRoute = ({ device }: { device: DeviceLayout }) => {
  return (
    <Surface className="h-screen overflow-hidden bg-background">
      <Toast.Provider placement="top" />
      <ScrollShadow
        hideScrollBar
        className={`h-full px-3 py-3 sm:px-5 sm:py-4 ${
          device === 'mobile'
            ? 'data-[top-scroll=true]:mask-none data-[top-scroll=true]:[-webkit-mask-image:none] data-[top-bottom-scroll=true]:mask-[linear-gradient(180deg,black_calc(100%-var(--scroll-shadow-size)),transparent)] data-[top-bottom-scroll=true]:[-webkit-mask-image:linear-gradient(180deg,black_calc(100%-var(--scroll-shadow-size)),transparent)]'
            : ''
        }`}
        size={56}
      >
        <ConfigPanel device={device} />
      </ScrollShadow>
    </Surface>
  )
}

/**
 * 主应用布局路由组件
 */
const MainAppRoutes = ({
  LayoutComponent
}: {
  LayoutComponent: ComponentType<MainLayoutProps> | null
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const activeMenu = routeMenuMap[location.pathname] || 'config'

  const handleMenuChange = useMemoizedFn((menu: MainMenuKey) => {
    navigate(menuRouteMap[menu])
  })

  if (!LayoutComponent) {
    return (
      <Surface className="flex min-h-screen items-center justify-center gap-4">
        <Spinner size="sm" aria-label="正在加载布局" />
        <Description>正在加载</Description>
      </Surface>
    )
  }

  return (
    <div>
      <Toast.Provider placement="top" />
      <LayoutComponent activeMenu={activeMenu} onMenuChange={handleMenuChange} />
    </div>
  )
}

/**
 * 认证路由包装器
 */
const AuthenticatedApp = () => {
  useTheme()

  const [state, setState] = useSetState<RootState>({
    authenticated: hasAuthToken(),
    device: detectDevice(),
    LayoutComponent: null as ComponentType<MainLayoutProps> | null
  })
  const { authenticated, device, LayoutComponent } = state

  useEffect(() => {
    /**
     * 同步 Karin 登录态变化。
     */
    const handleAuthChange = () => {
      setState({ authenticated: hasAuthToken() })
    }

    window.addEventListener(authChangedEventName, handleAuthChange)
    window.addEventListener('storage', handleAuthChange)

    return () => {
      window.removeEventListener(authChangedEventName, handleAuthChange)
      window.removeEventListener('storage', handleAuthChange)
    }
  }, [setState])

  /**
   * 同步页面宽度变化后的设备布局。
   */
  const syncDevice = useMemoizedFn(() => {
    const nextDevice = detectDevice()

    setState((current) => {
      if (current.device === nextDevice) {
        return null
      }

      // 设备类型变化时先清空布局，随后由布局加载 effect 接管。
      return {
        device: nextDevice,
        LayoutComponent: null
      }
    })
  })

  useEffect(() => {
    let animationFrameId = 0

    /**
     * 在浏览器下一帧统一读取页面宽度。
     */
    const handleViewportChange = () => {
      window.cancelAnimationFrame(animationFrameId)
      animationFrameId = window.requestAnimationFrame(syncDevice)
    }

    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('orientationchange', handleViewportChange)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('orientationchange', handleViewportChange)
    }
  }, [syncDevice])

  useEffect(() => {
    if (!authenticated) {
      setState({ LayoutComponent: null })
      return
    }

    let cancelled = false

    /**
     * 按访问设备加载对应布局入口。
     */
    const loadLayout = async () => {
      if (device === 'mobile') {
        const module = await MobileApp()
        if (!cancelled) setState({ LayoutComponent: module.default })
      } else {
        const module = await DesktopApp()
        if (!cancelled) setState({ LayoutComponent: module.default })
      }
    }

    loadLayout()

    return () => {
      cancelled = true
    }
  }, [authenticated, device, setState])

  /**
   * 登录成功后切换到应用布局。
   */
  const handleLogin = useMemoizedFn(() => {
    setState({ authenticated: true })
  })

  if (!authenticated) {
    return (
      <Routes>
        <Route path="/kkk/login" element={<LoginPanel onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/kkk/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/kkk/assets/karin-config" element={<ConfigRoute device={device} />} />
      <Route path="/kkk/assets/config" element={<MainAppRoutes LayoutComponent={LayoutComponent} />} />
      <Route path="/kkk/assets/about" element={<MainAppRoutes LayoutComponent={LayoutComponent} />} />
      <Route path="/kkk/assets" element={<Navigate to="/kkk/assets/config" replace />} />
      <Route path="/kkk" element={<Navigate to="/kkk/assets/config" replace />} />
      <Route path="/kkk/login" element={<Navigate to="/kkk/assets/config" replace />} />
      <Route path="*" element={<Navigate to="/kkk/assets/config" replace />} />
    </Routes>
  )
}

/**
 * 根组件，负责登录态同步、设备检测和布局分发。
 */
const App = () => {
  return (
    <BrowserRouter>
      <AuthenticatedApp />
    </BrowserRouter>
  )
}

export default App
