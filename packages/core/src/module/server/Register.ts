import path from 'node:path'

import Client, {
  createBilibiliRoutes, 
  createDouyinRoutes, 
  createKuaishouRoutes,
  logger as amagiLog,
  logMiddleware } from '@ikenxuan/amagi'
import history from 'connect-history-api-fallback'
import * as cors from 'cors'
import express from 'express'
import * as httpProxy from 'http-proxy-middleware'
import { app as karinApp, authMiddleware, karinPathTemp } from 'node-karin'

import { Root } from '../../root'
import { Config } from '../utils/Config'
import { signatureVerificationMiddleware } from './auth'
import { addBilibiliContentRouter, addDouyinContentRouter, deleteContentRouter, getAuthorsRouter, getBilibiliContentRouter, getDouyinContentRouter, getGroupsRouter } from './content-router'
import { getBilibiliDataRouter, getDouyinDataRouter, getKuaishouDataRouter, getLongLinkRouter, getVideoRouter, videoStreamRouter } from './router'

const server = express()
const proxyOptions: httpProxy.Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
}
server.use(cors.default())
// server.use('/', httpProxy.createProxyMiddleware(proxyOptions))
// TODO: 后续将此反代放到 karin 中

server.use('/api/kkk/debuggerHtml', express.static(path.join(karinPathTemp, 'html', 'karin-plugin-kkk', 'douyin')))
server.use('/api/kkk/worker', express.static(path.join(Root.pluginPath, 'resources', 'assets', 'heifWorker.js')))

server.listen(3780)

const app = express.Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(['/api/bilibili', '/api/douyin', '/api/kuaishou']))
  app.use('/amagi/api/bilibili', createBilibiliRoutes(Config.cookies.bilibili))
  app.use('/amagi/api/douyin', createDouyinRoutes(Config.cookies.douyin))
  app.use('/amagi/api/kuaishou', createKuaishouRoutes(Config.cookies.kuaishou))
  amagiLog.mark(`Amagi server listening on ${amagiLog.green('http://localhost:')}${amagiLog.green(process.env.HTTP_PORT!)} API docs: ${amagiLog.yellow('https://amagi.apifox.cn')}`)
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    cookies: {
      bilibili: Config.cookies.bilibili,
      douyin: Config.cookies.douyin,
      kuaishou: Config.cookies.kuaishou
    }
  })
  amagiServer.startServer(Config.app.APIServerPort)
}

app.get('/stream/:filename', videoStreamRouter)
app.get('/video/:filename', getVideoRouter)

const middleware = Config.app.webAuth ? [authMiddleware, signatureVerificationMiddleware] : []
app.use('/getLongLink', ...middleware, getLongLinkRouter)
app.use('/douyin/data', ...middleware, getDouyinDataRouter)
app.use('/bilibili/data', ...middleware, getBilibiliDataRouter)
app.use('/kuaishou/data', ...middleware, getKuaishouDataRouter)

app.get('/content/douyin', authMiddleware, signatureVerificationMiddleware, getDouyinContentRouter)
app.get('/content/bilibili', authMiddleware, signatureVerificationMiddleware, getBilibiliContentRouter)
app.get('/groups', authMiddleware, signatureVerificationMiddleware, getGroupsRouter)
app.get('/authors', authMiddleware, signatureVerificationMiddleware, getAuthorsRouter)
app.post('/content/douyin', authMiddleware, signatureVerificationMiddleware, addDouyinContentRouter)
app.post('/content/bilibili', authMiddleware, signatureVerificationMiddleware, addBilibiliContentRouter)
app.post('/content/delete', authMiddleware, signatureVerificationMiddleware, deleteContentRouter)

const staticRouter = express.Router()

staticRouter.use(express.static(path.join(Root.pluginPath, 'lib', 'web_chunk'), {
  redirect: false,
  // 添加静态资源的缓存控制
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache')
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000')
    }
  }
}))

// 处理 SPA 路由（history fallback）
staticRouter.use(
  history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    rewrites: [
      {
        from: /^\/kkk\/(?!.*\.[a-zA-Z0-9]+$).*$/,
        to: '/kkk/index.html'
      }
    ],
    disableDotRule: true
  })
)

staticRouter.use(express.static(path.join(Root.pluginPath, 'lib', 'web_chunk'), {
  redirect: false
}))

/** 将子路由挂载到主路由上 */
karinApp.use('/kkk', staticRouter)
karinApp.use('/api/kkk', app)
