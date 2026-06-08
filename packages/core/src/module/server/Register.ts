import fs from 'node:fs'
import path from 'node:path'

import Client, {
  createBilibiliRoutes,
  createDouyinRoutes,
  createKuaishouRoutes,
  createXiaohongshuRoutes
} from '@ikenxuan/amagi'
import * as cors from 'cors'
import * as httpProxy from 'http-proxy-middleware'
import { app as karinApp, checkPort, logger } from 'node-karin'
import express from 'node-karin/express'

import { Root } from '@/root'

import { Config } from '../utils/Config'
import { apiRouter } from './api'
import { getVideoRouter, videoPreviewEventsRouter, videoStreamRouter } from './router'

const server = express()
const proxyOptions: httpProxy.Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
}

const webDistPath = path.join(Root.pluginPath, 'lib', 'web')
const webIndexPath = path.join(webDistPath, 'index.html')
const webDevPort = 5176
const webDevUrl = `http://127.0.0.1:${webDevPort}`
let missingWebWarned = false

const hasWebDist = () => {
  return fs.existsSync(webIndexPath)
}

const sendMissingWeb = (res: express.Response) => {
  const message = `[karin-plugin-kkk] Web UI not found: ${webIndexPath}. Run "pnpm --filter web run build" or start "pnpm --filter web run dev".`

  if (!missingWebWarned) {
    logger.warn(message)
    missingWebWarned = true
  }

  res.status(503).type('text/plain').send(message)
}

server.use(cors.default())
server.use('/', httpProxy.createProxyMiddleware(proxyOptions))
// TODO: 后续将此反代放到 karin 中

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


if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use('/amagi/api/bilibili', createBilibiliRoutes(Config.cookies.bilibili))
  app.use('/amagi/api/douyin', createDouyinRoutes(Config.cookies.douyin))
  app.use('/amagi/api/kuaishou', createKuaishouRoutes(Config.cookies.kuaishou))
  app.use('/amagi/api/xiaohongshu', createXiaohongshuRoutes(Config.cookies.xiaohongshu))
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    cookies: {
      bilibili: Config.cookies.bilibili,
      douyin: Config.cookies.douyin,
      kuaishou: Config.cookies.kuaishou,
      xiaohongshu: Config.cookies.xiaohongshu
    }
  })
  amagiServer.startServer(Config.app.APIServerPort)
}

// 视频流服务
app.get('/stream/:filename', videoStreamRouter)
app.get('/video/:filename', getVideoRouter)
app.get('/video/:filename/events', videoPreviewEventsRouter)

// v1 API 路由
app.use('/v1', apiRouter)

const staticRouter = express.Router()
const webStatic = express.static(webDistPath, {
  redirect: false,
  setHeaders: (res, filePath) => {
    // HTML 不缓存，资源文件长期缓存，避免生产环境更新后入口仍旧命中旧版本。
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache')
      return
    }
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  }
})
const webDevProxy = httpProxy.createProxyMiddleware({
  target: webDevUrl,
  changeOrigin: true,
  ws: true,
  pathRewrite: (reqPath) => `/kkk${reqPath}`
})

staticRouter.use(async (req, res, next) => {
  if (hasWebDist()) {
    webStatic(req, res, next)
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    const isDevServerRunning = !(await checkPort(webDevPort))
    if (isDevServerRunning) {
      webDevProxy(req, res, next)
      return
    }
  }

  sendMissingWeb(res)
})

staticRouter.use((_req, res) => {
  if (!hasWebDist()) {
    sendMissingWeb(res)
    return
  }

  res.setHeader('Cache-Control', 'no-cache')
  return res.sendFile(webIndexPath)
})

/** 将子路由挂载到主路由上 */
karinApp.use('/kkk', staticRouter)
karinApp.use('/api/kkk', app)
