import { isTauri } from '@tauri-apps/api/core'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { DockBar } from './components/dock-bar'
import { DraggableTitlebar } from './components/draggable-titlebar'
// import { PWADebugPanel } from './components/PWADebugPanel'
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt'
import { ThemeProvider } from './components/theme-provider'
import { WindowControls } from './components/window-controls'
import { getDefaultRedirectPath, isAuthenticated } from './lib/auth'

// 使用懒加载导入组件
const LoginPage = lazy(() => import('./app/login/page'))
const VideoParserPage = lazy(() => import('./app/crack/page'))
const ContentManagePage = lazy(() => import('./app/content-manage/page'))
const AboutPage = lazy(() => import('./app/about/page'))

/**
 * 受保护的路由组件
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  if (!isAuthenticated()) {
    return <div className="flex justify-center items-center h-screen text-lg font-bold">验证登录状态...</div>
  }

  return <>{children}</>
}

/**
 * 根路径重定向组件
 */
const RootRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      // 如果已登录，跳转到默认页面
      navigate(getDefaultRedirectPath(), { replace: true })
    } else {
      // 如果未登录，跳转到登录页
      navigate('/login', { replace: true })
    }
  }, [navigate])

  return <div className="flex justify-center items-center h-screen text-lg font-bold">加载中...</div>
}

/**
 * 主应用组件
 */
const App = () => {
  const location = useLocation()

  // 登录页不显示dock栏
  const showDockBar = location.pathname !== '/login'

  return (
    <ThemeProvider defaultTheme="system">
      {/* Tauri 环境下显示自定义窗口控制和拖拽区域 */}
      {isTauri() && (
        <>
          <DraggableTitlebar />
          <WindowControls />
        </>
      )}

      <Suspense fallback={<div className="flex justify-center items-center h-screen text-lg font-bold">加载中...</div>}>
        {/* 为 Tauri 环境添加顶部间距，避免内容被标题栏遮挡 */}
        <div className={isTauri() ? 'pt-10' : ''}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/crack"
              element={
                <ProtectedRoute>
                  <VideoParserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/database"
              element={
                <ProtectedRoute>
                  <ContentManagePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<RootRedirect />} />
          </Routes>
        </div>

        {showDockBar && <DockBar />}
      </Suspense>
      <PWAUpdatePrompt />
      {/* <PWADebugPanel /> */}
    </ThemeProvider>
  )
}

export default App