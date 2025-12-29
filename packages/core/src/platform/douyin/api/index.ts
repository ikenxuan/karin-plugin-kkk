/**
 * 抖音平台 API 路由
 */
import express from 'node-karin/express'

import { getAuthors } from './authors'
import { addContent, deleteContent, getContents } from './contents'
import { getUserInfo, parseWork } from './parse'

const router = express.Router()

// 内容管理
router.get('/contents', getContents)
router.post('/contents', addContent)
router.delete('/contents/:id', deleteContent)

// 作者管理
router.get('/authors', getAuthors)

// 作品解析
router.post('/parse', parseWork)
router.get('/user', getUserInfo)

export { router as douyinApiRouter }
export * from './authors'
export * from './contents'
export * from './parse'
