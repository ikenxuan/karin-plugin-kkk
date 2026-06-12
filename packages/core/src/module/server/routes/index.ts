/**
 * 主路由注册
 */
import Client, { createBilibiliRoutes, createDouyinRoutes, createKuaishouRoutes, createXiaohongshuRoutes } from '@ikenxuan/amagi'
import * as cors from 'cors'
import * as httpProxy from 'http-proxy-middleware'
import { app as karinApp, checkPort, logger } from 'node-karin'
import express from 'node-karin/express'

import { Config } from '@/module/utils/Config'

import { API_V1_PREFIX, ASSETS_PREFIX, KKK_PREFIX, SSR_PREFIX } from '../constants/routes'
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
  app.use('/amagi/api/bilibili', createBilibiliRoutes(Config.amagi.cookies.bilibili))
  app.use('/amagi/api/douyin', createDouyinRoutes(Config.amagi.cookies.douyin))
  app.use('/amagi/api/kuaishou', createKuaishouRoutes(Config.amagi.cookies.kuaishou))
  app.use('/amagi/api/xiaohongshu', createXiaohongshuRoutes(Config.amagi.cookies.xiaohongshu))
} else if (Config.amagi.APIServer) {
  const amagiServer = new Client({
    cookies: {
      bilibili: Config.amagi.cookies.bilibili,
      douyin: Config.amagi.cookies.douyin,
      kuaishou: Config.amagi.cookies.kuaishou,
      xiaohongshu: Config.amagi.cookies.xiaohongshu
    }
  })
  amagiServer.startServer(Config.amagi.APIServerPort)
}

// 挂载子路由
app.use(API_V1_PREFIX, apiRouter) // /kkk/v1/*
app.use(SSR_PREFIX, ssrRouter) // /kkk/ssr/*
app.use(ASSETS_PREFIX, staticRouter) // /kkk/assets/*

// 挂载到 Karin 主路由
karinApp.use(KKK_PREFIX, app)
