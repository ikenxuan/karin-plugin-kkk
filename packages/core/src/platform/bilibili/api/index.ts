/**
 * B站平台 API 路由
 */
import express from 'node-karin/express'

import { addContent, deleteContent, getContents } from './contents'
import { parseDynamic, parseDynamicRaw, parseVideo } from './parse'
import { verifyCaptcha } from './risk-control'
import { getVideoPlayUrl } from './video'

const router = express.Router()

// 内容管理
router.get('/contents', getContents)
router.post('/contents', addContent)
router.post('/contents/:id/delete', deleteContent) // 使用 POST 代替 DELETE

// 作品解析
router.post('/parse/video', parseVideo)
router.post('/parse/dynamic', parseDynamic)
router.post('/parse/dynamic/raw', parseDynamicRaw)

// 视频播放
router.get('/video/playurl', getVideoPlayUrl)

// 风控验证
router.post('/verify', verifyCaptcha)

export { router as bilibiliApiRouter }
export * from './contents'
export * from './parse'
export * from './risk-control'
export * from './video'
