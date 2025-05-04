import fs from 'node:fs'
import path from 'node:path'

import Client, {
  logger as amagiLog,
  logMiddleware,
  registerBilibiliRoutes,
  registerDouyinRoutes,
  registerKuaishouRoutes
} from '@ikenxuan/amagi'
import cors from 'cors'
import { createProxyMiddleware, Options } from 'http-proxy-middleware'
import { app, createNotFoundResponse, logger, mkdirSync } from 'node-karin'
import express from 'node-karin/express'
import { karinPathBase } from 'node-karin/root'
import template from 'node-karin/template'

import { Common, Config, Version } from '@/module'

const server = express()
/** 代理参数 */
const proxyOptions: Options = {
  target: 'https://developer.huawei.com',
  changeOrigin: true
}
server.use(cors())
server.use('/', createProxyMiddleware(proxyOptions))
server.listen(3780)

if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(['/api/bilibili', '/api/douyin', '/api/kuaishou']))
  app.use('/api/bilibili', registerBilibiliRoutes(Config.cookies.bilibili))
  app.use('/api/douyin', registerDouyinRoutes(Config.cookies.douyin))
  app.use('/api/kuaishou', registerKuaishouRoutes(Config.cookies.kuaishou))
  amagiLog.mark(`Amagi server listening on ${amagiLog.green('http://localhost:')}${amagiLog.green(process.env.HTTP_PORT!)} API docs: ${amagiLog.yellow('https://amagi.apifox.cn')}`)
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    bilibili: Config.cookies.bilibili,
    douyin: Config.cookies.douyin,
    kuaishou: Config.cookies.kuaishou
  })
  amagiServer.startClient(Config.app.APIServerPort)
}

// 这个路由专门负责传输视频文件流
app.get('/api/kkk/videodata/:filename', (req, res) => {
  const filename = req.params.filename
  const videoPath = Common.validateVideoRequest(filename, res)

  if (!videoPath) {
    return // 验证失败，响应已发送
  }

  try {
    const stats = fs.statSync(videoPath)
    const fileSize = stats.size
    const range = req.headers.range // 获取 Range 请求头

    if (range) {
      // 解析 Range 请求头 (e.g., "bytes=1000-2000")
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      // end 可能为空，表示到文件末尾
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

      // 检查范围是否有效
      if (start >= fileSize || end >= fileSize || start > end) {
        res.status(416).send('Requested range not satisfiable')
        return
      }

      const chunksize = (end - start) + 1
      const file = fs.createReadStream(videoPath, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      }

      res.writeHead(206, head) // 发送 206 Partial Content 状态码
      file.pipe(res)
      file.on('error', (err) => {
        logger.error(`读取视频文件流时出错 (Range: ${start}-${end}): ${err.message}`)
        // 尝试结束响应，即使可能已发送部分数据
        if (!res.writableEnded) {
          res.end()
        }
      })
    } else {
      // 没有 Range 请求头，发送整个文件
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes' // 仍然告知客户端支持 Range 请求
      }
      res.writeHead(200, head) // 发送 200 OK 状态码
      const file = fs.createReadStream(videoPath)
      file.pipe(res)
      file.on('error', (err) => {
        logger.error(`读取视频文件流时出错 (Full): ${err.message}`)
        if (!res.headersSent) {
          try {
            createNotFoundResponse(res, '读取视频文件时出错')
          } catch (e) {
            logger.error('发送读取错误响应失败:', e)
            if (!res.writableEnded) {
              res.end()
            }
          }
        } else if (!res.writableEnded) {
          res.end()
        }
      })
    }
  } catch (error: any) {
    // ENOENT 错误理论上已被 validateVideoRequest 捕获，但保留以防万一
    if (error.code === 'ENOENT') {
      // 此错误理论上已被 validateVideoRequest 捕获
      if (!res.headersSent) createNotFoundResponse(res, '视频文件未找到')
      else if (!res.writableEnded) res.end()
    } else {
      logger.error(`处理视频数据请求时发生错误: ${error.message}`)
      if (!res.headersSent) {
        createNotFoundResponse(res, '服务器内部错误')
      } else if (!res.writableEnded) {
        res.end()
      }
    }
  }
})

// 这个路由返回包含 <video> 标签的 HTML
app.get('/api/kkk/video/:filename', (req, res) => {
  const filename = req.params.filename
  const videoPath = Common.validateVideoRequest(filename, res)

  if (!videoPath) {
    return // 验证失败，响应已发送
  }

  // 构造视频数据的 URL (文件名需要编码以防特殊字符)
  const videoDataUrl = `/api/kkk/videodata/${encodeURIComponent(filename)}`

  // 构造 HTML 内容
  const resPath = path.join(Version.pluginPath, '/resources') + '/'.replace(/\\/g, '/')
  const htmlContent = template(path.join(resPath, 'template', 'videoView', 'index.html'), {
    videoDataUrl,
    filename
  })

  // 发送 HTML 响应
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(htmlContent)
})

const base = `${karinPathBase}/${Version.pluginName}`
mkdirSync(`${base}/data`)
mkdirSync(Common.tempDri.images)
mkdirSync(Common.tempDri.video)
logger.info(`${logger.green(`[插件:${Version.pluginName}]`)} ${logger.violet(`${Version.pluginVersion}`)} 初始化完成~`)
