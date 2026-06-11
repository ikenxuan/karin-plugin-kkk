/**
 * SSR 路由注册
 */
import express from 'node-karin/express'

import { ROUTES } from '../constants/routes'
import { getVideoPage } from '../controllers/video'

const ssrRouter = express.Router()

// 视频播放页面
ssrRouter.get(ROUTES.VIDEO_PAGE, getVideoPage)

export { ssrRouter }
