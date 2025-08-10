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
import { app as karinApp, authMiddleware, logger, mkdirSync } from 'node-karin'
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

import { signatureVerificationMiddleware } from './module/server/auth'
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
// TODO: 后续将此反代放到 karin 中
server.listen(3780)

const app = express.Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ----------------- API ROUTES -----------------

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

// history fallback 用于支持 /kkk/login、/kkk/dashboard 等前端子路由
staticRouter.use(
  history({
    rewrites: [{ from: /^\/kkk\/.*$/, to: '/kkk/index.html' }],
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    disableDotRule: true,
  })
)

staticRouter.use(express.static(path.join(Root.pluginPath, 'lib', 'web_chunk'), {
  redirect: false,
}))

/** 将子路由挂载到主路由上 */
karinApp.use('/kkk', staticRouter)
karinApp.use('/api/kkk', app)

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
