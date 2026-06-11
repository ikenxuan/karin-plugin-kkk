/**
 * 视频控制器
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
 */
export const getVideoStream: RequestHandler = (req, res) => {
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
        res.status(416).send('请求范围不满足')
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
            createNotFoundResponse(res, '读取视频文件失败')
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
        createNotFoundResponse(res, '服务器错误')
      } else if (!res.writableEnded) {
        res.end()
      }
    }
  }
}

/**
 * 视频播放页面（SSR）
 */
export const getVideoPage: RequestHandler = (req, res) => {
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

  const videoDataUrl = `/kkk/v1/stream/${encodeURIComponent(filename)}`
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
    eventsUrl: `/kkk/v1/video/${encodeURIComponent(filename)}/events`
  })

  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(htmlContent)
}

/**
 * 视频预览状态事件流（SSE）
 */
export const getVideoEvents: RequestHandler = (req, res) => {
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

  let timer: NodeJS.Timeout | null = null
  const sendPayload = () => {
    const currentInfo = Common.getVideoPreview(filename) ?? previewInfo
    const now = Date.now()
    const remainingMs = currentInfo.expireAt ? Math.max(currentInfo.expireAt - now, 0) : null
    const fileMissing = currentInfo.filePath ? !fs.existsSync(currentInfo.filePath) : false
    const removed = Boolean(currentInfo.removedAt) || (currentInfo.removeCache && remainingMs === 0 && fileMissing)
    if (removed && !currentInfo.removedAt) {
      Common.markVideoPreviewRemoved(currentInfo.filename)
    }
    const payload = {
      filename: currentInfo.filename,
      filePath: currentInfo.filePath,
      removeCache: currentInfo.removeCache,
      createdAt: currentInfo.createdAt,
      expireAt: currentInfo.expireAt,
      remainingMs,
      removed,
      serverNow: now
    }
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
    return removed
  }

  const shouldCloseImmediately = sendPayload()
  if (shouldCloseImmediately) {
    res.end()
    return
  }

  timer = setInterval(() => {
    const removed = sendPayload()
    if (removed) {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      res.end()
    }
  }, 1000)

  res.on('close', () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })
}
