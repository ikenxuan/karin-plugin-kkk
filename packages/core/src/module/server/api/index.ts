/**
 * API 路由聚合
 */
import { authMiddleware } from 'node-karin'
import express from 'node-karin/express'

import { bilibiliApiRouter } from '@/platform/bilibili/api'
import { douyinApiRouter } from '@/platform/douyin/api'

import { signatureVerificationMiddleware } from '../auth'
import { getBotGroupInfo, getBotGroups, getBotInfo, getBots, getGroupsBatch } from './bots'
import {
  getAllConfig,
  getConfigModule,
  patchConfigItem,
  updateAllConfig,
  updateConfigModule } from './config'
import { getGroups } from './groups'
import { resolveLink } from './link'

const apiRouter = express.Router()

// 认证中间件
const authMiddlewares = [authMiddleware, signatureVerificationMiddleware]

// Bot 管理
apiRouter.get('/bots', ...authMiddlewares, getBots)
apiRouter.get('/bots/:botId', ...authMiddlewares, getBotInfo)
apiRouter.get('/bots/:botId/groups', ...authMiddlewares, getBotGroups)
apiRouter.get('/bots/:botId/groups/:groupId', ...authMiddlewares, getBotGroupInfo)

// 群组管理
apiRouter.get('/groups', ...authMiddlewares, getGroups)
apiRouter.post('/groups/batch', ...authMiddlewares, getGroupsBatch)

// 链接解析
apiRouter.post('/link/resolve', ...authMiddlewares, resolveLink)

// 配置管理 API
apiRouter.get('/config', ...authMiddlewares, getAllConfig)
apiRouter.put('/config', ...authMiddlewares, updateAllConfig)
apiRouter.post('/config', ...authMiddlewares, updateAllConfig)
apiRouter.get('/config/:module', ...authMiddlewares, getConfigModule)
apiRouter.put('/config/:module', ...authMiddlewares, updateConfigModule)
apiRouter.post('/config/:module', ...authMiddlewares, updateConfigModule)
apiRouter.patch('/config/:module', ...authMiddlewares, patchConfigItem)

// 平台路由
apiRouter.use('/platforms/douyin', ...authMiddlewares, douyinApiRouter)
apiRouter.use('/platforms/bilibili', ...authMiddlewares, bilibiliApiRouter)

export { apiRouter }
export * from './bots'
export * from './config'
export * from './groups'
export * from './link'
