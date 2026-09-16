/**
 * 主路由注册
 */
import { app as karinApp } from 'node-karin'
import express from 'node-karin/express'

import { Config } from '@/module/utils/Config'
import { logger } from '@/module/utils/logger'
import { templateFonts } from '@/module/utils/templateFonts'

import { API_V1_PREFIX, ASSETS_PREFIX, KKK_PREFIX, SSR_PREFIX } from '../constants/routes'
import { createReloadableAmagiRouter } from './amagi'
import { apiRouter } from './api'
import { ssrRouter } from './ssr'
import { staticRouter } from './static'

const app = express.Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 模板字体：字体文件留在 node_modules 里，这里只服务 HTTP 页面。
// 截图渲染走 Render/index.ts 的 extraStylePaths（file:// 直读包内文件），
// 临时预览页是 karin 同源页面、加载不了 file://，只能走同源静态资源。
for (const font of templateFonts) {
  // 必须排在 static 路由之前：/assets 的 SPA 兜底会把没命中的路径都回成 index.html
  app.use(font.mountPath, express.static(font.root, { maxAge: '1d' }))
}

// Amagi API Server
if (Config.amagi.APIServer && Config.amagi.APIServerMount) {
  app.use('/amagi/api', createReloadableAmagiRouter())
} else if (Config.amagi.APIServer) {
  const amagiServer = express()
  amagiServer.use(express.json())
  amagiServer.use(express.urlencoded({ extended: true }))
  amagiServer.get('/', (_req, res) => res.redirect(301, 'https://amagi.apifox.cn'))
  amagiServer.get('/docs', (_req, res) => res.redirect(301, 'https://amagi.apifox.cn'))
  amagiServer.use('/api', createReloadableAmagiRouter())

  const listener = amagiServer.listen(Config.amagi.APIServerPort, '::', () => {
    logger.mark(`Amagi server listening on http://localhost:${Config.amagi.APIServerPort}`)
  })
  listener.on('error', (error) => {
    logger.error(`Amagi API Server 启动失败: ${error.message}`)
  })
}

// 挂载子路由
app.use(API_V1_PREFIX, apiRouter) // /kkk/v1/*
app.use(SSR_PREFIX, ssrRouter) // /kkk/ssr/*
app.use(ASSETS_PREFIX, staticRouter) // /kkk/assets/*

// 挂载到 Karin 主路由
karinApp.use(KKK_PREFIX, app)
