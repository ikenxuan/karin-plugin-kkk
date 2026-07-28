/**
 * 主路由注册
 */
import * as cors from 'cors'
import * as httpProxy from 'http-proxy-middleware'
import { app as karinApp, checkPort, logger } from 'node-karin'
import express from 'node-karin/express'

import { Config } from '@/module/utils/Config'

import { API_V1_PREFIX, ASSETS_PREFIX, KKK_PREFIX, SSR_PREFIX } from '../constants/routes'
import { createReloadableAmagiRouter } from './amagi'
import { apiRouter } from './api'
import { ssrRouter } from './ssr'
import { staticRouter } from './static'

const server = express()
const proxyOptions: httpProxy.Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
}

server.use(cors.default())
server.use('/', httpProxy.createProxyMiddleware(proxyOptions))

if (process.env.NODE_ENV !== 'test') {
  checkPort(3780).then((isOpen) => {
    if (isOpen) {
      const s = server.listen(3780)
      s.on('error', (err) => {
        logger.error(`[karin-plugin-kkk] 字体代理服务器启动失败: ${err.message}`)
      })
      return s
    }
    return logger.error('端口 3780 被占用，字体代理服务器将不会启动。')
  })
}

const app = express.Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
    logger.mark(`[karin-plugin-kkk] Amagi server listening on http://localhost:${Config.amagi.APIServerPort}`)
  })
  listener.on('error', (error) => {
    logger.error(`[karin-plugin-kkk] Amagi API Server 启动失败: ${error.message}`)
  })
}

// 挂载子路由
app.use(API_V1_PREFIX, apiRouter) // /kkk/v1/*
app.use(SSR_PREFIX, ssrRouter) // /kkk/ssr/*
app.use(ASSETS_PREFIX, staticRouter) // /kkk/assets/*

// 挂载到 Karin 主路由
karinApp.use(KKK_PREFIX, app)
