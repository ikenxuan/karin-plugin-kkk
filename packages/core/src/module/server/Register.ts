import Client, {
  createBilibiliRoutes,
  createDouyinRoutes
} from '@ikenxuan/amagi'
// import history from 'connect-history-api-fallback'
import * as cors from 'cors'
import * as httpProxy from 'http-proxy-middleware'
import { app as karinApp, checkPort, logger } from 'node-karin'
import express from 'node-karin/express'

import { Config } from '../utils/Config'
import { apiRouter } from './api'
import { getVideoRouter, videoStreamRouter } from './router'

const server = express()
const proxyOptions: httpProxy.Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
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
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    cookies: {
      bilibili: Config.cookies.bilibili,
      douyin: Config.cookies.douyin
    }
  })
  amagiServer.startServer(Config.app.APIServerPort)
}

// 视频流服务
app.get('/stream/:filename', videoStreamRouter)
app.get('/video/:filename', getVideoRouter)

// v1 API 路由
app.use('/v1', apiRouter)

// const staticRouter = express.Router()

// staticRouter.use(express.static(path.join(Root.pluginPath, 'lib', 'web_chunk'), {
//   redirect: false,
//   // 添加静态资源的缓存控制
//   setHeaders: (res, path) => {
//     if (path.endsWith('.html')) {
//       res.setHeader('Cache-Control', 'no-cache')
//     } else {
//       res.setHeader('Cache-Control', 'public, max-age=31536000')
//     }
//   }
// }))

// 处理 SPA 路由（history fallback）
// staticRouter.use(
//   history({
//     htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
//     rewrites: [
//       {
//         from: /^\/kkk\/(?!.*\.[a-zA-Z0-9]+$).*$/,
//         to: '/kkk/index.html'
//       }
//     ],
//     disableDotRule: true
//   }) as httpProxy.RequestHandler
// )

// staticRouter.use(express.static(path.join(Root.pluginPath, 'lib', 'web_chunk'), {
//   redirect: false
// }))

/** 将子路由挂载到主路由上 */
// karinApp.use('/kkk', staticRouter)
karinApp.use('/api/kkk', app)
