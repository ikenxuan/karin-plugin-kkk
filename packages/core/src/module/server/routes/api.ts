/**
 * API 路由注册
 */
import { authMiddleware } from 'node-karin'
import express from 'node-karin/express'

import { ROUTES } from '../constants/routes'
import { getBotGroupInfo, getBotGroups, getBotInfo, getBots, getGroupsBatch } from '../controllers/bots'
import { getAllConfig, updateAllConfig } from '../controllers/config'
import { getVideoEvents, getVideoStream } from '../controllers/video'
import { signatureVerificationMiddleware } from '../middlewares/auth'

const apiRouter = express.Router()

// 认证中间件
const authMiddlewares = [authMiddleware, signatureVerificationMiddleware]

// Bot 管理
apiRouter.get(ROUTES.BOTS, ...authMiddlewares, getBots)
apiRouter.get(ROUTES.BOT_INFO, ...authMiddlewares, getBotInfo)
apiRouter.get(ROUTES.BOT_GROUPS, ...authMiddlewares, getBotGroups)
apiRouter.get(ROUTES.BOT_GROUP_INFO, ...authMiddlewares, getBotGroupInfo)

// 群组管理
apiRouter.post(ROUTES.GROUPS_BATCH, ...authMiddlewares, getGroupsBatch)

// 配置管理
apiRouter.get(ROUTES.CONFIG, ...authMiddlewares, getAllConfig)
apiRouter.post(ROUTES.CONFIG, ...authMiddlewares, updateAllConfig)

// 视频流
apiRouter.get(ROUTES.VIDEO_STREAM, getVideoStream)
apiRouter.get(ROUTES.VIDEO_EVENTS, getVideoEvents)

export { apiRouter }
