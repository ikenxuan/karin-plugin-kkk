import fs from 'node:fs'
import path from 'node:path'

import { createNotFoundResponse, logger, Message } from 'node-karin'
import express from 'node-karin/express'
import { karinPathTemp } from 'node-karin/root'

import { Config } from '@/module/utils'

import { Version } from '../../Version'

/** 常用工具合集 */
class Tools {
  /**
   * 插件缓存目录
   */
  tempDri: {
    /** 插件缓存目录 */
    default: string
    /** 视频缓存文件 */
    video: string
    /** 图片缓存文件 */
    images: string
  }

  constructor () {
    this.tempDri = {
      /** 插件缓存目录 */
      default: `${karinPathTemp}/${Version.pluginName}/`.replace(/\\/g, '/'),
      /** 视频缓存文件 */
      video: `${karinPathTemp}/${Version.pluginName}/kkkdownload/video/`.replace(/\\/g, '/'),
      /** 图片缓存文件 */
      images: `${karinPathTemp}/${Version.pluginName}/kkkdownload/images/`.replace(/\\/g, '/')
    }
  }

  /**
   * 获取引用消息
   * @param e event 消息事件
   * @returns 被引用的消息
   */
  async getReplyMessage (e: Message): Promise<string> {
    if (e.replyId) {
      const reply = await e.bot.getMsg(e.contact, e.replyId)
      for (const v of reply.elements) {
        if (v.type === 'text') {
          return v.text
        } else if (v.type === 'json') {
          return v.data
        }
      }
    }
    return ''
  }

  /**
 * 将中文数字转换为阿拉伯数字的函数
 * @param chineseNumber 数字的中文
 * @returns 中文数字对应的阿拉伯数字映射
 */
  chineseToArabic (chineseNumber: string): number {
    // 映射表，定义基础的中文数字
    const chineseToArabicMap: Record<string, number> = {
      零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9
    }
    // 对应中文单位映射
    const units: Record<string, number> = {
      十: 10, 百: 100, 千: 1000, 万: 10000, 亿: 100000000
    }
    let result = 0
    let temp = 0 // 存储每一段的临时结果
    let unit = 1 // 当前处理的单位，初始为1

    for (let i = chineseNumber.length - 1; i >= 0; i--) {
      const char = chineseNumber[i]

      // 如果是单位字符
      if (units[char] !== undefined) {
        unit = units[char]
        if (unit === 10000 || unit === 100000000) {
          result += temp * unit
          temp = 0
        }
      } else {
        // 如果是数字字符
        const num = chineseToArabicMap[char]
        if (unit > 1) {
          temp += num * unit
        } else {
          temp += num
        }
        unit = 1 // 重置单位
      }
    }
    return result + temp
  }

  /**
 * 格式化cookie字符串
 * @param cookies cookie数组
 * @returns 格式化后的cookie字符串
 */
  formatCookies (cookies: any[]): string {
    return cookies.map(cookie => {
      // 分割每个cookie字符串以获取名称和值
      const [nameValue] = cookie.split(';').map((part: string) => part.trim())
      const [name, value] = nameValue.split('=')

      // 重新组合名称和值，忽略其他属性
      return `${name}=${value}`
    }).join('; ')
  }

  /**
 * 计算目标视频平均码率（单位：Kbps）
 * @param targetSizeMB 目标视频大小（MB）
 * @param duration 视频时长（秒）
 * @returns
 */
  calculateBitrate (targetSizeMB: number, duration: number): number {
    // 将目标大小转换为字节
    const targetSizeBytes = targetSizeMB * 1024 * 1024 // 转换为字节
    // 计算比特率并返回单位 Mbps
    return (targetSizeBytes * 8) / duration / 1024 // Kbps
  }

  /**
   * 获取视频文件大小（单位MB）
   * @param filePath 视频文件绝对路径
   * @returns
   */
  async getVideoFileSize (filePath: string): Promise<number> {
    try {
      const stats = await fs.promises.stat(filePath) // 获取文件信息
      const fileSizeInBytes = stats.size // 文件大小（字节）
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024) // 转换为MB
      return fileSizeInMB
    } catch (error) {
      console.error('获取文件大小时发生错误:', error)
      throw error
    }
  }

  /**
   * 根据配置文件的配置项，删除缓存文件
   * @param path 文件的绝对路径
   * @param force 是否强制删除，默认 `false`
   * @returns
   */
  async removeFile (path: string, force = false): Promise<boolean> {
    path = path.replace(/\\/g, '/')
    if (Config.app.rmmp4) {
      try {
        await fs.promises.unlink(path)
        logger.mark('缓存文件: ', path + ' 删除成功！')
        return true
      } catch (err) {
        logger.error('缓存文件: ', path + ' 删除失败！', err)
        return false
      }
    } else if (force) {
      try {
        await fs.promises.unlink(path)
        logger.mark('缓存文件: ', path + ' 删除成功！')
        return true
      } catch (err) {
        logger.error('缓存文件: ', path + ' 删除失败！', err)
        return false
      }
    }
    return true
  }

  /**
 * 将时间戳转换为日期时间字符串
 * @param timestamp 时间戳
 * @returns 格式为YYYY-MM-DD HH:MM的日期时间字符串
 */
  convertTimestampToDateTime (timestamp: number): string {
    // 创建一个Date对象，时间戳乘以1000是为了转换为毫秒
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear() // 获取年份
    const month = String(date.getMonth() + 1).padStart(2, '0') // 获取月份，确保两位数显示
    const day = String(date.getDate()).padStart(2, '0') // 获取日，确保两位数显示
    const hours = String(date.getHours()).padStart(2, '0') // 获取小时，确保两位数显示
    const minutes = String(date.getMinutes()).padStart(2, '0') // 获取分钟，确保两位数显示
    // 返回格式化后的日期时间字符串
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  /**
 * 获取当前时间：年-月-日 时:分:秒
 * @returns
 */
  getCurrentTime () {
    // 创建一个Date对象以获取当前时间
    const now = new Date()
    // 获取年、月、日、时、分、秒
    const year = now.getFullYear()
    const month = now.getMonth() + 1 // month 是 number 类型
    const day = now.getDate()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()

    const formattedMonth = month < 10 ? '0' + month : '' + month
    const formattedDay = day < 10 ? '0' + day : '' + day
    const formattedHour = hour < 10 ? '0' + hour : '' + hour
    const formattedMinute = minute < 10 ? '0' + minute : '' + minute
    const formattedSecond = second < 10 ? '0' + second : '' + second
    return `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`
  }

  /**
 * 评论图、推送图是否使用深色模式
 * @returns
 */
  useDarkTheme (): boolean {
    let dark = true
    const configTheme = Config.app.Theme
    if (configTheme === 0) { // 自动
      const date = new Date().getHours()
      if (date >= 6 && date < 18) {
        dark = false
      }
    } else if (configTheme === 1) {
      dark = false
    } else if (configTheme === 2) {
      dark = true
    }
    return dark
  }

  /**
 * 传入一个时间戳（单位：毫秒），返回距离当前时间的相对的时间字符串
 * @param timestamp 时间戳
 * @returns 距离这个时间戳过去的多久的字符串
 */
  timeSince (timestamp: number): string {
    const now = Date.now()
    const elapsed = now - timestamp

    const seconds = Math.floor(elapsed / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const remainingSeconds = seconds % 60
    const remainingMinutes = minutes % 60

    if (hours > 0) {
      return `${hours}小时${remainingMinutes}分钟${remainingSeconds}秒`
    } else if (minutes > 0) {
      return `${minutes}分钟${remainingSeconds}秒`
    } else {
      return `${seconds}秒`
    }
  }

  /**
   * 验证视频请求
   * @param filename 文件名
   * @param res 响应对象
   * @returns 返回安全解析后的路径
   */
  validateVideoRequest (filename: string | undefined, res: express.Response): string | null {
    // 1. 基础校验
    if (!filename) {
      createNotFoundResponse(res, '无效的文件名')
      return null
    }

    // 2. 规范化并解析路径
    const intendedBaseDir = path.resolve(Common.tempDri.video)
    const requestedPath = path.join(intendedBaseDir, filename) // 先拼接
    const resolvedPath = path.normalize(requestedPath) // 规范化

    // 3. 安全性检查：防止路径穿越
    if (!resolvedPath.startsWith(intendedBaseDir + path.sep) || filename.includes('/') || filename.includes('\\')) {
      logger.warn(`潜在的路径穿越尝试或无效文件名: ${filename}, 解析路径: ${resolvedPath}`)
      createNotFoundResponse(res, '无效的文件名或路径')
      return null
    }

    // 确保文件名本身不包含路径分隔符
    if (path.basename(filename) !== filename) {
      logger.warn(`文件名包含路径分隔符: ${filename}`)
      createNotFoundResponse(res, '无效的文件名')
      return null
    }

    // 检查文件是否存在
    if (!fs.existsSync(resolvedPath)) {
      createNotFoundResponse(res, '视频文件未找到')
      return null
    }

    return resolvedPath // 返回安全解析后的路径
  }
}

/** 常用工具合集 */
export const Common = new Tools()
