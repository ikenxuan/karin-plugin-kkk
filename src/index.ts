import Client from '@ikenxuan/amagi'
import cors from 'cors'
import { createProxyMiddleware, Options } from 'http-proxy-middleware'
import { basePath, logger, mkdirSync } from 'node-karin'
import express from 'node-karin/express'

import { Common, Config, Version } from '@/module'

const app = express()
const port = 3780

/** 代理参数 */
const proxyOptions: Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
}
app.use(cors())
app.use('/', createProxyMiddleware(proxyOptions))
app.listen(port, () => {
  logger.mark(`代理服务器已启动，监听端口 ${port}。该服务器用于处理远程资源的跨域请求。`)
})

const amagiServer = new Client({
  bilibili: Config.cookies.bilibili,
  douyin: Config.cookies.douyin,
  kuaishou: Config.cookies.kuaishou
})
Config.app.APIServer && amagiServer.startClient(Config.app.APIServerPort)

const base = `${basePath}/${Version.pluginName}`
mkdirSync(`${base}/data`)
mkdirSync(Common.tempDri.images)
mkdirSync(Common.tempDri.video)
logger.info(`${logger.green(`[插件:${Version.pluginName}]`)} ${logger.violet(`${Version.pluginVersion}`)} 初始化完成~`)
