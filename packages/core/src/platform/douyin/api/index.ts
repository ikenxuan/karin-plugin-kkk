/**
 * 抖音平台 API 路由
 */
import express from 'node-karin/express'

import { addContent, deleteContent, getContents } from './contents'
import { parseWork } from './parse'

const router = express.Router()

// 内容管理
router.get('/contents', getContents)
router.post('/contents', addContent)
router.post('/contents/:id/delete', deleteContent) // 使用 POST 代替 DELETE

// 作品解析
router.post('/parse', parseWork)

export { router as douyinApiRouter }
export * from './contents'
export * from './parse'
