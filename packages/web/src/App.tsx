import { isTauri } from '@tauri-apps/api/core'
import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { DockBar } from './components/dock-bar'
import { DraggableTitlebar } from './components/draggable-titlebar'
import { LoadingComponent } from './components/loading-components'
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt'
import { createRouteElement,RootRedirect, type RouteConfig } from './components/route-components'
import { ThemeProvider } from './components/theme-provider'
import { WindowControls } from './components/window-controls'

// 使用懒加载导入组件
const LoginPage = lazy(() => import('./app/login/page'))
const VideoParserPage = lazy(() => import('./app/crack/page'))
const ContentManagePage = lazy(() => import('./app/content-manage/page'))
const AboutPage = lazy(() => import('./app/about/page'))
const NotFoundPage = lazy(() => import('./app/404/page'))

/**
 * 主应用组件
 * @description 应用的根组件，包含路由配置和全局布局
 */
const App = () => {
  const location = useLocation()
  const showDockBar = location.pathname !== '/login'

  // 路由配置数组
  const routes: RouteConfig[] = [
    { path: '/login', component: LoginPage },
    { path: '/crack', component: VideoParserPage, protected: true },
    { path: '/database', component: ContentManagePage, protected: true },
    { path: '/about', component: AboutPage, protected: true },
  ]

  return (
    <ThemeProvider defaultTheme="system">
      {/* Tauri 环境下显示自定义窗口控制和拖拽区域 */}
      {isTauri() && (
        <>
          <DraggableTitlebar />
          <WindowControls />
        </>
      )}

      <Suspense fallback={<LoadingComponent />}>
        {/* 为 Tauri 环境添加顶部间距，避免内容被标题栏遮挡 */}
        <div className={isTauri() ? 'pt-10' : ''}>
          <Routes>
            {/* 动态生成路由 */}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={createRouteElement(route)}
              />
            ))}

            {/* 根路径重定向 */}
            <Route path="/" element={<RootRedirect />} />

            {/* 404 页面 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>

      {/* 底部导航栏 */}
      {showDockBar && <DockBar />}

      {/* PWA 更新提示 */}
      <PWAUpdatePrompt />
    </ThemeProvider>
  )
}

export default App