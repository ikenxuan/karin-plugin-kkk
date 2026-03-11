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
import { renderVideoPreviewPage } from 'template'

import { Common } from '@/module/utils'
import { Config } from '@/module/utils/Config'

/**
 * 视频文件流传输
 * GET /api/kkk/stream/:filename
 */
export const videoStreamRouter: RequestHandler = (req, res) => {
  const filenameParam = req.params.filename
  const filename = Array.isArray(filenameParam) ? filenameParam[0] : filenameParam
  if (!filename) {
    createNotFoundResponse(res, '无效的文件名')
    return
  }
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
  const filenameParam = req.params.filename
  const filename = Array.isArray(filenameParam) ? filenameParam[0] : filenameParam
  if (!filename) {
    createNotFoundResponse(res, '无效的文件名')
    return
  }
  const videoPath = Common.validateVideoRequest(filename, res)

  if (!videoPath) {
    return
  }

  const videoDataUrl = `/api/kkk/stream/${encodeURIComponent(filename)}`
  const previewInfo = Common.getVideoPreview(filename)
  const removeCache = previewInfo?.removeCache ?? Config.app.removeCache
  const createdAt = previewInfo?.createdAt ?? Date.now()
  const expireAt = previewInfo?.expireAt ?? (removeCache ? createdAt + 10 * 60 * 1000 : undefined)
  const htmlContent = renderVideoPreviewPage({
    filename,
    filePath: previewInfo?.filePath ?? videoPath,
    videoUrl: videoDataUrl,
    removeCache,
    createdAt,
    expireAt,
    eventsUrl: `/api/kkk/video/${encodeURIComponent(filename)}/events`
  })

  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(htmlContent)
}

export const videoPreviewEventsRouter: RequestHandler = (req, res) => {
  const filenameParam = req.params.filename
  const filename = Array.isArray(filenameParam) ? filenameParam[0] : filenameParam
  if (!filename) {
    createNotFoundResponse(res, '无效的文件名')
    return
  }
  const safeName = path.basename(filename)
  if (safeName !== filename || filename.includes('/') || filename.includes('\\')) {
    createNotFoundResponse(res, '无效的文件名')
    return
  }

  const previewInfo = Common.getVideoPreview(filename)
  if (!previewInfo) {
    createNotFoundResponse(res, '预览信息不存在')
    return
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders?.()

  const sendPayload = () => {
    const now = Date.now()
    const remainingMs = previewInfo.expireAt ? Math.max(previewInfo.expireAt - now, 0) : null
    const fileMissing = previewInfo.filePath ? !fs.existsSync(previewInfo.filePath) : false
    const removed = Boolean(previewInfo.removedAt) || (previewInfo.removeCache && remainingMs === 0 && fileMissing)
    if (removed && !previewInfo.removedAt) {
      Common.markVideoPreviewRemoved(previewInfo.filename)
    }
    const payload = {
      filename: previewInfo.filename,
      filePath: previewInfo.filePath,
      removeCache: previewInfo.removeCache,
      createdAt: previewInfo.createdAt,
      expireAt: previewInfo.expireAt,
      remainingMs,
      removed,
      serverNow: now
    }
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
  }

  sendPayload()
  const timer = setInterval(sendPayload, 1000)

  res.on('close', () => {
    clearInterval(timer)
  })
}
