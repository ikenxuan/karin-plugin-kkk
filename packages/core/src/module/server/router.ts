import fs from 'node:fs'
import path from 'node:path'

import Client from '@ikenxuan/amagi'
import type { RequestHandler } from 'express'
import {
  createBadRequestResponse,
  createNotFoundResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import axios from 'node-karin/axios'
import template from 'node-karin/template'

import { Common, Config, Root } from '@/module/utils'

/** 专门负责传输视频文件流 */
export const videoStreamRouter: RequestHandler = (req, res) => {
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
}

/** 返回包含 <video> 标签的 HTML */
export const getVideoRouter: RequestHandler = (req, res) => {
  const filename = req.params.filename
  const videoPath = Common.validateVideoRequest(filename, res)

  if (!videoPath) {
    return // 验证失败，响应已发送
  }

  // 构造视频数据的 URL (文件名需要编码以防特殊字符)
  const videoDataUrl = `/api/kkk/stream/${encodeURIComponent(filename)}`

  // 构造 HTML 内容
  const resPath = path.join(Root.pluginPath, '/resources') + '/'.replace(/\\/g, '/')
  const htmlContent = template(path.join(resPath, 'template', 'videoView', 'index.html'), {
    videoDataUrl,
    filename
  })

  // 发送 HTML 响应
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(htmlContent)
}

/**
 * 获取链接重定向地址的路由处理器
 * @param req 请求对象，期望body中包含link字段
 * @param res 响应对象
 */
export const getLongLinkRouter: RequestHandler = async (req, res) => {
  try {
    const { link } = req.body

    if (!link || typeof link !== 'string') {
      return createBadRequestResponse(res, '请提供有效的链接')
    }

    const resp = await axios.get(link, {
      headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
      }
    })
    const finalUrl = resp.request.res.responseUrl

    // 检查重定向是否成功
    if (finalUrl.includes('获取链接重定向失败') || finalUrl.includes('403 Forbidden')) {
      return createServerErrorResponse(res, '无法获取链接的重定向地址：' + finalUrl)
    }

    // 识别平台类型
    let platform = 'unknown'
    if (finalUrl.includes('douyin.com') || finalUrl.includes('iesdouyin.com') ||
      finalUrl.includes('webcast.amemv.com') || finalUrl.includes('live.douyin.com')) {
      platform = 'douyin'
    } else if (finalUrl.includes('bilibili.com') || finalUrl.includes('b23.tv')) {
      platform = 'bilibili'
    } else if (finalUrl.includes('kuaishou.com') || finalUrl.includes('kwai.com') ||
      finalUrl.includes('chenzhongtech.com')) {
      platform = 'kuaishou'
    }

    createSuccessResponse(res, {
      originalUrl: link,
      finalUrl,
      platform
    })

    logger.debug(`链接重定向获取成功: ${link} -> ${platform}`)
  } catch (error: any) {
    logger.error(`链接重定向获取失败: ${error.message}`)
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    })
  }
}

/**
 * 抖音原始数据获取路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const getDouyinDataRouter: RequestHandler = async (req, res) => {
  const amagi = Client({
    cookies: {
      douyin: Config.cookies.douyin
    }
  })

  try {
    const { dataType, params } = req.body

    if (!dataType || !params) {
      return createBadRequestResponse(res, '请提供数据类型和参数')
    }

    // 直接调用amagi库获取原始数据
    const rawData = await amagi.getDouyinData(dataType, {
      ...params,
      typeMode: 'strict'
    })

    createSuccessResponse(res, {
      data: rawData.data,
      platform: 'douyin',
      dataType
    })

    logger.debug(`抖音数据获取成功: ${dataType}`)
  } catch (error: any) {
    logger.error(`抖音数据获取失败: ${error.message}`)
    res.status(500).json({
      success: false,
      message: '抖音数据获取失败',
      error: error.message
    })
  }
}

/**
 * 哔哩哔哩原始数据获取路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const getBilibiliDataRouter: RequestHandler = async (req, res) => {
  const amagi = Client({
    cookies: {
      bilibili: Config.cookies.bilibili
    }
  })

  try {
    const { dataType, params } = req.body

    if (!dataType || !params) {
      return createBadRequestResponse(res, '请提供数据类型和参数')
    }

    // 直接调用amagi库获取原始数据
    const rawData = await amagi.getBilibiliData(dataType, {
      ...params,
      typeMode: 'strict'
    })

    createSuccessResponse(res, {
      data: rawData.data,
      platform: 'bilibili',
      dataType
    })

    logger.debug(`哔哩哔哩数据获取成功: ${dataType}`)
  } catch (error: any) {
    logger.error(`哔哩哔哩数据获取失败: ${error.message}`)
    res.status(500).json({
      success: false,
      message: '哔哩哔哩数据获取失败',
      error: error.message
    })
  }
}

/**
 * 快手原始数据获取路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const getKuaishouDataRouter: RequestHandler = async (req, res) => {
  const amagi = Client({
    cookies: {
      kuaishou: Config.cookies.kuaishou
    }
  })

  try {
    const { dataType, params } = req.body

    if (!dataType || !params) {
      return createBadRequestResponse(res, '请提供数据类型和参数')
    }

    // 直接调用amagi库获取原始数据
    const rawData = await amagi.getKuaishouData(dataType, {
      ...params,
      typeMode: 'strict'
    })

    createSuccessResponse(res, {
      data: rawData.data,
      platform: 'kuaishou',
      dataType
    })

    logger.debug(`快手数据获取成功: ${dataType}`)
  } catch (error: any) {
    logger.error(`快手数据获取失败: ${error.message}`)
    res.status(500).json({
      success: false,
      message: '快手数据获取失败',
      error: error.message
    })
  }
}
