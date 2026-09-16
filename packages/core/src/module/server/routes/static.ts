/**
 * 静态文件路由注册
 */
import fs from 'node:fs'
import path from 'node:path'

import { createServerErrorResponse } from 'node-karin'
import express from 'node-karin/express'

import { logger } from '@/module/utils/logger'
import { Root } from '@/root'

const webDistPath = path.join(Root.pluginPath, 'lib', 'web')
const webIndexPath = path.join(webDistPath, 'index.html')

const sendWebIndex = (res: express.Response) => {
  try {
    const html = fs.readFileSync(webIndexPath, 'utf-8')
    res.setHeader('Cache-Control', 'no-cache')
    res.type('html').send(html)
  } catch (error) {
    logger.error('读取 Web UI 入口文件失败:', error)
    createServerErrorResponse(res, '加载 Web UI 失败')
  }
}

const staticRouter = express.Router()
const webStatic = express.static(webDistPath, {
  redirect: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache')
      return
    }
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  }
})

staticRouter.use(webStatic)
staticRouter.use((_req, res) => {
  sendWebIndex(res)
})

export { staticRouter }
