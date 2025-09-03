/**
 * 浏览器端入口（包含样式导入）
 * 用途：
 * - 当在浏览器环境使用本渲染库时，通过该入口引入，以确保样式正常加载。
 * 注意：
 * - 该入口会导入 CSS，适合在前端应用中使用；不建议在 Node/SSR 构建链路中引用。
 */

// 导入全局样式（由 Vite 处理）
import './styles/main.css'

// 复用与无样式入口一致的导出
export * from './types'
export * from './server'
export { renderComponentToHtml, type RenderRequest, type RenderResponse } from './server'

import RenderServer from './server'
export default RenderServer