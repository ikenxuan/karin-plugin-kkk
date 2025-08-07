import 'reflect-metadata'

import path from 'node:path'

import Client, {
  createBilibiliRoutes,
  createDouyinRoutes,
  createKuaishouRoutes,
  logger as amagiLog,
  logMiddleware
} from '@ikenxuan/amagi'
import history from 'connect-history-api-fallback'
import * as cors from 'cors'
import * as httpProxy from 'http-proxy-middleware'
import { app, authMiddleware, logger, mkdirSync } from 'node-karin'
import express from 'node-karin/express'
import { karinPathBase } from 'node-karin/root'

import { Common, Config, Root } from '@/module'
import {
  getBilibiliDataRouter,
  getDouyinDataRouter,
  getKuaishouDataRouter,
  getLongLinkRouter,
  getVideoRouter,
  videoStreamRouter
} from '@/module/server/router'

import {
  addBilibiliContentRouter,
  addDouyinContentRouter,
  deleteContentRouter,
  getAuthorsRouter,
  getBilibiliContentRouter,
  getDouyinContentRouter,
  getGroupsRouter
} from './module/server/content-router'

const server = express()
const proxyOptions: httpProxy.Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
}
server.use(cors.default())
server.use('/', httpProxy.createProxyMiddleware(proxyOptions))
server.listen(3780)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ----------------- API ROUTES -----------------

if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(['/api/bilibili', '/api/douyin', '/api/kuaishou']))
  app.use('/api/bilibili', createBilibiliRoutes(Config.cookies.bilibili))
  app.use('/api/douyin', createDouyinRoutes(Config.cookies.douyin))
  app.use('/api/kuaishou', createKuaishouRoutes(Config.cookies.kuaishou))
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

app.get('/api/kkk/stream/:filename', videoStreamRouter)
app.get('/api/kkk/video/:filename', getVideoRouter)

const middleware = Config.app.webAuth ? [authMiddleware] : []

app.use('/api/kkk/getLongLink', ...middleware, getLongLinkRouter)
app.use('/api/kkk/douyin/data', ...middleware, getDouyinDataRouter)
app.use('/api/kkk/bilibili/data', ...middleware, getBilibiliDataRouter)
app.use('/api/kkk/kuaishou/data', ...middleware, getKuaishouDataRouter)

app.get('/api/kkk/content/douyin', authMiddleware, getDouyinContentRouter)
app.get('/api/kkk/content/bilibili', authMiddleware, getBilibiliContentRouter)
app.get('/api/kkk/groups', authMiddleware, getGroupsRouter)
app.get('/api/kkk/authors', authMiddleware, getAuthorsRouter)
app.post('/api/kkk/content/douyin', authMiddleware, addDouyinContentRouter)
app.post('/api/kkk/content/bilibili', authMiddleware, addBilibiliContentRouter)
app.post('/api/kkk/content/delete', authMiddleware, deleteContentRouter)

// ----------------- PLUGIN FRONTEND ROUTER -----------------

const pluginRouter = express.Router()
const staticDir = path.join(Root.pluginPath, 'lib', 'web_chunk')

// history fallback 用于支持 /kkk/login、/kkk/dashboard 等前端子路由
pluginRouter.use(
  history({
    rewrites: [{ from: /^\/kkk\/.*$/, to: '/kkk/index.html' }],
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    disableDotRule: true,
  })
)

// static 处理 /kkk 静态文件
pluginRouter.use(
  '/kkk',
  express.static(staticDir, {
    redirect: false,
  })
)

app.use(pluginRouter)

// ----------------- INIT -----------------

const base = `${karinPathBase}/${Root.pluginName}`
mkdirSync(`${base}/data`)
mkdirSync(Common.tempDri.images)
mkdirSync(Common.tempDri.video)

console.log('')
console.log('-------------------------- karin-plugin-kkk --------------------------')
logger.info(`${logger.violet(`[插件:v${Root.pluginVersion}]`)} ${logger.green(Root.pluginName)} 初始化完成~`)
logger.info(`${logger.violet('[server]')} ${logger.yellow('外部解析页面:')} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT!}/kkk/`)}`)
logger.info(`${logger.violet('[server]')} ${logger.yellow('推送历史管理:')} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT!}/kkk/database`)}`)
console.log('-------------------------- karin-plugin-kkk --------------------------')
console.log('')

export { webConfig } from './web.config'
