import 'reflect-metadata'

import Client, {
  createBilibiliRoutes,
  createDouyinRoutes,
  createKuaishouRoutes,
  logger as amagiLog,
  logMiddleware
} from '@ikenxuan/amagi'
import * as cors from 'cors'
import * as httpProxy from 'http-proxy-middleware'
import { app, logger, mkdirSync } from 'node-karin'
import express from 'node-karin/express'
import { karinPathBase } from 'node-karin/root'

import { Common, Config, Root } from '@/module'
import { getVideoRouter, videoStreamRouter } from '@/module/server/router'

const server = express()
/** 代理参数 */
const proxyOptions: httpProxy.Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
}
server.use(cors.default())
server.use('/', httpProxy.createProxyMiddleware(proxyOptions))
server.listen(3780)

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

const base = `${karinPathBase}/${Root.pluginName}`
mkdirSync(`${base}/data`)
mkdirSync(Common.tempDri.images)
mkdirSync(Common.tempDri.video)
logger.info(`${logger.green(`[插件:${Root.pluginName}]`)} ${logger.violet(`v${Root.pluginVersion}`)} 初始化完成~`)

export { webConfig } from './web.config'
