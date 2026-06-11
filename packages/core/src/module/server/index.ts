/**
 * Server 模块导出
 */
export * from './constants/routes'
export * from './controllers/bots'
export * from './controllers/config'
export * from './controllers/video'
export * from './middlewares/auth'

// 初始化路由
import './routes'
