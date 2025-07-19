import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// 使用懒加载导入组件
// const LoginPage = lazy(() => import('./app/login/page'))
const VideoParserPage = lazy(() => import('./app/crack/page'))

/**
 * 主应用组件
 */
function App () {
  return (
    <Router basename="/kkk">
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-lg font-bold">加载中...</div>}>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}

          <Route path="/crack" element={<VideoParserPage />} />
          {/* 默认重定向到仪表板 */}
          <Route path="/" element={
            <VideoParserPage />
          } />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App