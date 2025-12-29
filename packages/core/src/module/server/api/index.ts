/**
 * API 路由聚合
 */
import { authMiddleware } from 'node-karin'
import express from 'node-karin/express'

import { bilibiliApiRouter } from '@/platform/bilibili/api'
import { douyinApiRouter } from '@/platform/douyin/api'

import { signatureVerificationMiddleware } from '../auth'
import { getGroups } from './groups'
import { resolveLink } from './link'

const apiRouter = express.Router()

// 认证中间件
const authMiddlewares = [authMiddleware, signatureVerificationMiddleware]

// 群组管理
apiRouter.get('/groups', ...authMiddlewares, getGroups)

// 链接解析
apiRouter.post('/link/resolve', ...authMiddlewares, resolveLink)

// 平台路由
apiRouter.use('/platforms/douyin', ...authMiddlewares, douyinApiRouter)
apiRouter.use('/platforms/bilibili', ...authMiddlewares, bilibiliApiRouter)

export { apiRouter }
export * from './groups'
export * from './link'
