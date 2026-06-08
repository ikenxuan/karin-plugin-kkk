import { useEffect, type ComponentType } from 'react'
import { Description, Spinner, Surface, Toast } from '@heroui/react'
import { useMemoizedFn, useSetState } from 'ahooks'
import LoginPanel from './components/common/LoginPanel'
import { authChangedEventName, hasAuthToken } from './auth/token'
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
  LayoutComponent: ComponentType | null
}

/**
 * 根组件，负责登录态同步、设备检测和布局分发。
 */
const App = () => {
  const [state, setState] = useSetState<RootState>({
    authenticated: hasAuthToken(),
    device: detectDevice(),
    LayoutComponent: null as ComponentType | null
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
  })

  if (!authenticated) {
    return <LoginPanel onLogin={handleLogin} />
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
      <LayoutComponent />
    </div>
  )
}

export default App
