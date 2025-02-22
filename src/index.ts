import Client, {
  logger as amagiLog,
  logMiddleware,
  registerBilibiliRoutes,
  registerDouyinRoutes,
  registerKuaishouRoutes
} from '@ikenxuan/amagi'
import cors from 'cors'
import { createProxyMiddleware, Options } from 'http-proxy-middleware'
import { app, basePath, logger, mkdirSync } from 'node-karin'
import express from 'node-karin/express'

import { Common, Config, Version } from '@/module'

const server = express()
const router = express.Router()
// /** 代理参数 */
// const proxyOptions: Options = {
//   target: 'https://developer.huawei.com',
//   changeOrigin: true
// }
// server.use(cors())
// server.use('/', createProxyMiddleware(proxyOptions))
// server.listen(3780)

if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware)
  app.use('/api/bilibili', registerBilibiliRoutes(router, Config.cookies.bilibili))
  app.use('/api/douyin', registerDouyinRoutes(router, Config.cookies.douyin))
  app.use('/api/kuaishou', registerKuaishouRoutes(router, Config.cookies.kuaishou))
  amagiLog.mark(`Amagi server listening on ${amagiLog.green('http://localhost:')}${amagiLog.green(process.env.HTTP_PORT!)} API docs: ${amagiLog.yellow('https://amagi.apifox.cn')}`)
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    bilibili: Config.cookies.bilibili,
    douyin: Config.cookies.douyin,
    kuaishou: Config.cookies.kuaishou
  })
  amagiServer.startClient(Config.app.APIServerPort)
}

const base = `${basePath}/${Version.pluginName}`
mkdirSync(`${base}/data`)
mkdirSync(Common.tempDri.images)
mkdirSync(Common.tempDri.video)
logger.info(`${logger.green(`[插件:${Version.pluginName}]`)} ${logger.violet(`${Version.pluginVersion}`)} 初始化完成~`)
