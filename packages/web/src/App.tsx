import { useEffect, type ComponentType } from 'react'
import { Description, ScrollShadow, Spinner, Surface, Toast } from '@heroui/react'
import { useMemoizedFn, useSetState } from 'ahooks'
import LoginPanel from './components/common/LoginPanel'
import { authChangedEventName, hasAuthToken } from './auth/token'
import { detectDevice, type DeviceLayout } from './utils/device'
import ConfigPanel from './components/common/ConfigPanel'
import type { MainLayoutProps, MainMenuKey } from './types/navigation'

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
  route: AppRoute
  LayoutComponent: ComponentType<MainLayoutProps> | null
}

type AppRoute = 'login' | 'config' | 'about' | 'karin-config'

const routePaths: Record<AppRoute, string> = {
  login: '/kkk/login',
  config: '/kkk/config',
  about: '/kkk/about',
  'karin-config': '/kkk/karin-config'
}

const routeMenuMap: Record<Exclude<AppRoute, 'login' | 'karin-config'>, MainMenuKey> = {
  config: 'config',
  about: 'about'
}

const menuRouteMap: Record<MainMenuKey, AppRoute> = {
  config: 'config',
  about: 'about'
}

const normalizePath = (path: string) => {
  const nextPath = path.replace(/\/+$/, '')
  return nextPath || '/'
}

const getRouteFromLocation = (): AppRoute => {
  const pathname = normalizePath(window.location.pathname)

  if (pathname === normalizePath(routePaths.login)) return 'login'
  if (pathname === normalizePath(routePaths.about)) return 'about'
  if (pathname === normalizePath(routePaths['karin-config'])) return 'karin-config'

  return 'config'
}

/**
 * 根组件，负责登录态同步、设备检测和布局分发。
 */
const App = () => {
  const [state, setState] = useSetState<RootState>({
    authenticated: hasAuthToken(),
    device: detectDevice(),
    route: getRouteFromLocation(),
    LayoutComponent: null as ComponentType<MainLayoutProps> | null
  })
  const { authenticated, device, route, LayoutComponent } = state

  const navigateToRoute = useMemoizedFn((nextRoute: AppRoute, replace = false) => {
    const nextPath = routePaths[nextRoute]
    const currentPath = normalizePath(window.location.pathname)

    if (currentPath !== normalizePath(nextPath)) {
      const method = replace ? 'replaceState' : 'pushState'
      window.history[method](null, '', nextPath)
    }

    setState({ route: nextRoute })
  })

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

  useEffect(() => {
    const handlePopState = () => {
      setState({ route: getRouteFromLocation() })
    }

    window.addEventListener('popstate', handlePopState)

    if (normalizePath(window.location.pathname) === '/kkk') {
      navigateToRoute('config', true)
    }

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [navigateToRoute, setState])

  useEffect(() => {
    if (authenticated && route === 'login') {
      navigateToRoute('config', true)
    }
  }, [authenticated, navigateToRoute, route])

  /**
   * 同步页面宽度变化后的设备布局。
   */
  const syncDevice = useMemoizedFn(() => {
    const nextDevice = detectDevice()

    setState(current => {
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
    if (route === 'login') {
      navigateToRoute('config', true)
    }
  })

  const handleMenuChange = useMemoizedFn((menu: MainMenuKey) => {
    navigateToRoute(menuRouteMap[menu])
  })

  if (!authenticated) {
    return <LoginPanel onLogin={handleLogin} />
  }

  if (route === 'login') {
    return (
      <Surface className="flex min-h-screen items-center justify-center gap-4">
        <Spinner size="sm" aria-label="正在进入配置页" />
        <Description>正在进入配置页</Description>
      </Surface>
    )
  }

  if (route === 'karin-config') {
    return (
      <Surface className="h-screen overflow-hidden">
        <Toast.Provider placement="top" />
        <ScrollShadow hideScrollBar className="h-full px-3 py-3 sm:px-5 sm:py-4" size={56}>
          <ConfigPanel device={device} variant="karin" />
        </ScrollShadow>
      </Surface>
    )
  }

  // 加载中状态
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
      <LayoutComponent activeMenu={routeMenuMap[route]} onMenuChange={handleMenuChange} />
    </div>
  )
}

export default App
