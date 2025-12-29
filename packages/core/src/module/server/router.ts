/**
 * 视频流服务路由
 */
import fs from 'node:fs'
import path from 'node:path'

import {
  createNotFoundResponse,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'
import template from 'node-karin/template'

import { Common, Root } from '@/module/utils'

/**
 * 视频文件流传输
 * GET /api/kkk/stream/:filename
 */
export const videoStreamRouter: RequestHandler = (req, res) => {
  const filename = req.params.filename
  const videoPath = Common.validateVideoRequest(filename, res)

  if (!videoPath) {
    return
  }

  try {
    const stats = fs.statSync(videoPath)
    const fileSize = stats.size
    const range = req.headers.range

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

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

      res.writeHead(206, head)
      file.pipe(res)
      file.on('error', (err) => {
        logger.error(`读取视频文件流时出错 (Range: ${start}-${end}): ${err.message}`)
        if (!res.writableEnded) {
          res.end()
        }
      })
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes'
      }
      res.writeHead(200, head)
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
    if (error.code === 'ENOENT') {
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
}

/**
 * 视频播放页面
 * GET /api/kkk/video/:filename
 */
export const getVideoRouter: RequestHandler = (req, res) => {
  const filename = req.params.filename
  const videoPath = Common.validateVideoRequest(filename, res)

  if (!videoPath) {
    return
  }

  const videoDataUrl = `/api/kkk/stream/${encodeURIComponent(filename)}`
  const resPath = path.join(Root.pluginPath, '/resources') + '/'.replace(/\\/g, '/')
  const htmlContent = template(path.join(resPath, 'template', 'videoView', 'index.html'), {
    videoDataUrl,
    filename
  })

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(htmlContent)
}
