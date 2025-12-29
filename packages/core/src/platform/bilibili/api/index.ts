/**
 * B站平台 API 路由
 */
import express from 'node-karin/express'

import { getAuthors } from './authors'
import { addContent, deleteContent, getContents } from './contents'
import { getUserInfo, parseDynamic, parseVideo } from './parse'
import { verifyCaptcha } from './risk-control'

const router = express.Router()

// 内容管理
router.get('/contents', getContents)
router.post('/contents', addContent)
router.delete('/contents/:id', deleteContent)

// 作者管理
router.get('/authors', getAuthors)

// 作品解析
router.post('/parse/video', parseVideo)
router.post('/parse/dynamic', parseDynamic)
router.get('/user', getUserInfo)

// 风控验证
router.post('/verify', verifyCaptcha)

export { router as bilibiliApiRouter }
export * from './authors'
export * from './contents'
export * from './parse'
export * from './risk-control'
