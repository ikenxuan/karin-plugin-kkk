import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ThemeProvider } from './components/theme-provider'

// 使用懒加载导入组件
const LoginPage = lazy(() => import('./app/login/page'))
const VideoParserPage = lazy(() => import('./app/crack/page'))
const ContentManagePage = lazy(() => import('./app/content-manage/page'))

/**
 * 主应用组件
 */
const App = () => {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-lg font-bold">加载中...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/crack" element={<VideoParserPage />} />
          <Route path="/database" element={<ContentManagePage />} />
          <Route path="/" element={
            <VideoParserPage />
          } />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App