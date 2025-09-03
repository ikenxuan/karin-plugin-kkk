// 只在浏览器环境或构建时导入CSS，运行时跳过
if (typeof window !== 'undefined' || process.env.NODE_ENV === 'production') {
  // 动态导入CSS，避免tsx运行时错误
  try {
    await import('./styles/main.css')
  } catch {
    // 忽略CSS导入错误
  }
}

export * from './types'
export * from './server'
export { renderComponentToHtml, type RenderRequest, type RenderResponse } from './server'

import RenderServer from './server'
export default RenderServer