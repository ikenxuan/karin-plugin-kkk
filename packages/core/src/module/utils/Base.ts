import fs from 'node:fs'

import Client from '@ikenxuan/amagi'
import karin, { type Contact, logger, Message, segment } from 'node-karin'
import type { AxiosHeaders, AxiosRequestConfig, Method, RawAxiosRequestHeaders } from 'node-karin/axios'

import { baseHeaders, Common, mergeFile, Networks } from '@/module/utils'
import { Config } from '@/module/utils/Config'
import type { pushlistConfig } from '@/types/config/pushlist'
type uploadFileOptions = {
  /** 是否使用群文件上传 */
  useGroupFile?: boolean
  /** 消息ID，如果有，则将使用该消息ID制作回复元素 */
  message_id?: string
  /** 是否为主动消息 */
  active?: boolean
  /** 主动消息参数 */
  activeOption?: {
    /** 机器人账号 */
    uin: string
    /** 群号 */
    group_id: string
  }
}

/** 最少都要传一个 */
type title = {
  /** 文件名：自定义 */
  originTitle?: string
  /** 文件名：tmp + 时间戳 */
  timestampTitle?: string
}

type downloadFileOptions = {
  /** 视频链接 */
  video_url: string
  /** 文件名 */
  title: title
  /** 下载文件类型，默认为'.mp4'。 */
  filetype?: string
  /** 自定义请求头，将使用该请求头下载文件。 */
  headers?: object

}

export type fileInfo = {
  /** 视频文件的绝对路径 */
  filepath: string
  /** 视频文件大小 */
  totalBytes: number
  /** 文件名：自定义 */
  originTitle?: title['originTitle']
  /** 文件名：tmp + 时间戳 */
  timestampTitle?: title['timestampTitle']
}

/**
 * 表示HTTP请求方法的请求头类型
 * @remarks
 * 这是一个部分类型，将HTTP方法映射到对应的AxiosHeaders类型
 * @property [method] - 每个HTTP方法(小写)对应的请求头
 * @property common - 通用请求头
 */
type MethodsHeaders = Partial<{
  [Key in Method as Lowercase<Key>]: AxiosHeaders
} & { common: AxiosHeaders }>

/**
 * 下载文件的配置选项接口
 * @interface
 * @property title - 文件名
 * @property [headers] - 用于下载文件的请求头
 * @defaultValue headers - {}
 */
export type downLoadFileOptions = {
  /** 文件名 */
  title: string
  /**
   * 将使用该请求头下载文件。
   * @default {}
   */
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders
}
export class Base {
  e: Message
  headers: AxiosRequestConfig['headers']
  amagi: ReturnType<typeof Client>
  constructor (e: Message) {
    this.e = e
    this.headers = baseHeaders
    const client = Client({
      cookies: {
        douyin: Config.cookies.douyin,
        bilibili: Config.cookies.bilibili,
        kuaishou: Config.cookies.kuaishou,
        xiaohongshu: Config.cookies.xiaohongshu
      },
      request: {
        timeout: Config.request.timeout,
        headers: { 'User-Agent': Config.request['User-Agent'] },
        proxy: Config.request.proxy?.switch ? Config.request.proxy : false
      }
    })

    // 使用Proxy包装amagi客户端
    this.amagi = new Proxy(client, {
      get (target: ReturnType<typeof Client>, prop: keyof ReturnType<typeof Client>) {
        const method = target[prop]
        if (typeof method === 'function') {
          return async (...args: any[]) => {
            const result = await Function.prototype.apply.call(method, target, args)

            // 返回值检查逻辑
            if (!result) {
              logger.warn(`Amagi API调用 (${String(prop)}) 返回了空值`)
              return result
            }
            return result
          }
        }
        return method
      }
    })
  }
}

/** 统计每个平台使用最多的机器人ID和使用次数 */
type PlatformBotStats = {
  /** 机器人ID */
  botId: string
  /** 使用次数 */
  count: number
}

export const statBotId = (pushList: pushlistConfig): { douyin: PlatformBotStats, bilibili: PlatformBotStats } => {
  const platformBotCount = {
    douyin: new Map<string, number>(),
    bilibili: new Map<string, number>()
  }

  // 统计抖音平台机器人使用次数
  pushList.douyin.forEach(item => {
    item.group_id.forEach(gid => {
      const botId = gid.split(':')[1]
      platformBotCount.douyin.set(botId, (platformBotCount.douyin.get(botId) ?? 0) + 1)
    })
  })

  // 统计B站平台机器人使用次数
  pushList.bilibili.forEach(item => {
    item.group_id.forEach(gid => {
      const botId = gid.split(':')[1]
      platformBotCount.bilibili.set(botId, (platformBotCount.bilibili.get(botId) ?? 0) + 1)
    })
  })

  // 获取抖音平台使用最多的机器人
  let douyinMaxCount = 0
  let douyinMostFrequentBot = ''
  platformBotCount.douyin.forEach((count, botId) => {
    if (count > douyinMaxCount) {
      douyinMaxCount = count
      douyinMostFrequentBot = botId
    }
  })

  // 获取B站平台使用最多的机器人
  let biliMaxCount = 0
  let biliMostFrequentBot = ''
  platformBotCount.bilibili.forEach((count, botId) => {
    if (count > biliMaxCount) {
      biliMaxCount = count
      biliMostFrequentBot = botId
    }
  })

  return {
    douyin: {
      botId: douyinMostFrequentBot,
      count: douyinMaxCount
    },
    bilibili: {
      botId: biliMostFrequentBot,
      count: biliMaxCount
    }
  }
}

/** 过万整除 */
export const Count = (count: number): string => {
  if (count > 10000) {
    return (count / 10000).toFixed(1) + '万'
  } else {
    return count?.toString() ?? '无法获取'
  }
}

/**
 * 上传视频文件
 * @param event - 消息事件
 * @param file - 包含本地视频文件信息的对象。
 * @param videoUrl 视频直链，无则传空字符串
 * @param options 上传参数
 * @returns
 */
export const uploadFile = async (event: Message, file: fileInfo, videoUrl: string, options?: uploadFileOptions): Promise<boolean> => {
  let sendStatus: boolean = true
  let File: string
  let newFileSize = file.totalBytes
  let selfId: string
  let contact: Contact

  if (options?.active) {
    selfId = options?.activeOption?.uin as string
    contact = karin.contactGroup(options?.activeOption?.group_id as string)
  } else {
    selfId = event.selfId
    contact = event.contact
  }

  // 判断是否需要压缩后再上传
  if (Config.upload.compress && (file.totalBytes > Config.upload.compresstrigger)) {
    const Duration = await mergeFile('获取指定视频文件时长', { path: file.filepath })
    logger.warn(logger.yellow(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`))
    const message = [
      segment.text(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`),
      options?.message_id ? segment.reply(options.message_id) : segment.text('')
    ]

    const msg1 = await karin.sendMsg(selfId, contact, message)
    // 计算目标视频平均码率
    const targetBitrate = Common.calculateBitrate(Config.upload.compresstrigger, Duration) * 0.75
    // 执行压缩
    const startTime = Date.now()
    file.filepath = await mergeFile('压缩视频', { path: file.filepath, targetBitrate, resultPath: `${Common.tempDri.video}tmp_${Date.now()}.mp4` })
    const endTime = Date.now()
    // 再次检查大小
    newFileSize = await Common.getVideoFileSize(file.filepath)
    logger.debug(`原始视频大小为: ${file.totalBytes.toFixed(1)} MB, ${logger.green(`经 FFmpeg 压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，原视频文件已删除`)}`)

    const message2 = [
      segment.text(`压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，压缩耗时：${((endTime - startTime) / 1000).toFixed(1)} 秒`),
      segment.reply(msg1.messageId)
    ]
    await karin.sendMsg(selfId, contact, message2)
  }

  // 判断是否使用群文件上传
  if (options) {
    options.useGroupFile = Config.upload.usegroupfile && (newFileSize > Config.upload.groupfilevalue)
  }

  // 是否先转换为base64
  if (Config.upload.sendbase64 && !options?.useGroupFile) {
    const videoBuffer = await fs.promises.readFile(file.filepath)
    File = `base64://${videoBuffer.toString('base64')}`
    logger.mark(`已开启视频文件 base64转换 正在进行${logger.yellow('base64转换中')}...`)
  } else File = options?.useGroupFile ? file.filepath : `file://${file.filepath}`

  try {
    // 是主动消息
    if (options?.active) {
      if (options.useGroupFile) { // 是群文件
        const bot = karin.getBot(String(options.activeOption?.uin))!
        logger.mark(`${logger.blue('主动消息:')} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow('bot.uploadFile')}回复...`)
        await bot.uploadFile(contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split('/').pop()}`)
      } else { // 不是群文件
        logger.mark(`${logger.blue('主动消息:')} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow('karin.sendMsg')}回复...`)
        const status = await karin.sendMsg(selfId, contact, [segment.video(File)])
        status.messageId ? sendStatus = true : sendStatus = false
      }
    } else { // 不是主动消息
      if (options?.useGroupFile) { // 是文件
        logger.mark(`${logger.blue('被动消息:')} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow('e.bot.uploadFile')}回复...`)
        await event.bot.uploadFile(event.contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split('/').pop()}`)
      } else { // 不是文件
        logger.mark(`${logger.blue('被动消息:')} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow('e.reply')}回复...`)
        const status = await event.reply(segment.video(File) || videoUrl)
        status.messageId ? sendStatus = true : sendStatus = false
      }
    }
    return sendStatus
  } catch (error) {
    if (options && options.active === false) {
      await event.reply('视频文件上传失败' + JSON.stringify(error, null, 2))
    }
    logger.error('视频文件上传错误,' + String(error))
    return false
  } finally {
    const filePath = file.filepath
    logger.mark(`临时预览地址：http://localhost:${process.env.HTTP_PORT!}/api/kkk/video/${encodeURIComponent(filePath.split('/').pop() ?? '')}`)
    Config.app.removeCache && logger.info(`文件 ${filePath} 将在 10 分钟后删除`)
    setTimeout(async () => {
      await Common.removeFile(filePath)
    }, 10 * 60 * 1000)
  }
}

/**
 * 下载视频并上传到群
 * @param event 事件
 * @param downloadOpt 下载参数
 * @param uploadOpt 上传参数
 * @returns
 */
export const downloadVideo = async (event: Message, downloadOpt: downloadFileOptions, uploadOpt?: uploadFileOptions): Promise<boolean> => {
  /** 获取文件大小 */
  const fileHeaders = await new Networks({ url: downloadOpt.video_url, headers: downloadOpt.headers ?? baseHeaders }).getHeaders()
  const fileSizeContent = fileHeaders['content-range']?.match(/\/(\d+)/) ? parseInt(fileHeaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0
  const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2)
  const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2))
  if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
    const message = segment.text(`视频：「${downloadOpt.title.originTitle ??
      'Error: 文件名获取失败'}」大小 (${fileSizeInMB} MB) 超出最大限制（设定值：${Config.upload.filelimit} MB），已取消上传`)
    const selfId = event.selfId || uploadOpt?.activeOption?.uin as string
    const contact = event.contact || karin.contactGroup(uploadOpt?.activeOption?.group_id as string) || karin.contactFriend(selfId)

    await karin.sendMsg(selfId, contact, message)
    return false
  }

  // 下载文件，视频URL，标题和自定义headers
  let res = await downloadFile(downloadOpt.video_url, {
    title: Config.app.removeCache ? downloadOpt.title.timestampTitle as string : processFilename(downloadOpt.title.originTitle!, 50),
    headers: downloadOpt.headers ?? baseHeaders
  })
  res = { ...res, ...downloadOpt.title }
  // 将下载的文件大小转换为MB并保留两位小数
  res.totalBytes = Number((res.totalBytes / (1024 * 1024)).toFixed(2))
  /** 上传视频 */
  return await uploadFile(event, res, downloadOpt.video_url, uploadOpt)
}

/**
 * 异步下载文件的函数。
 * @param videoUrl 下载地址。
 * @param opt 配置选项，包括标题、请求头等。
 * @returns 返回一个包含文件路径和总字节数的对象。
 */
export const downloadFile = async (videoUrl: string, opt: downLoadFileOptions): Promise<fileInfo> => {
  // 记录开始时间
  const startTime = Date.now()

  // 使用 networks 类进行文件下载，并通过回调函数实时更新下载进度
  const { filepath, totalBytes } = await new Networks({
    url: videoUrl, 
    headers: opt.headers ?? baseHeaders,
    filepath: Common.tempDri.video + opt.title,
    timeout: 30000, 
    maxRetries: 3 
  }).downloadStream((downloadedBytes, totalBytes) => {
    // 定义进度条长度及生成进度条字符串的函数
    const barLength = 45
    const generateProgressBar = (progressPercentage: number) => {
      const clampedPercentage = Math.min(100, Math.max(0, progressPercentage))
      const filledLength = Math.floor((clampedPercentage / 100) * barLength)
      const emptyLength = Math.max(0, barLength - filledLength)
      return `[${ '\u2588'.repeat(filledLength)}${'\u2591'.repeat(emptyLength)}]`
    }

    // 计算当前下载进度百分比
    const progressPercentage = totalBytes > 0 ? Math.min(100, (downloadedBytes / totalBytes) * 100) : 0

    // 计算动态 RGB 颜色
    const red = Math.floor(255 - (255 * progressPercentage) / 100) // 红色分量随进度减少
    const coloredPercentage = logger.chalk.rgb(red, 255, 0)(`${progressPercentage.toFixed(1)}%`)

    // 计算下载速度（MB/s）
    const elapsedTime = (Date.now() - startTime) / 1000
    const speed = downloadedBytes / elapsedTime
    const formattedSpeed = (speed / 1048576).toFixed(1) + ' MB/s'

    // 计算剩余时间
    const remainingBytes = totalBytes - downloadedBytes // 剩余字节数
    const remainingTime = remainingBytes / speed // 剩余时间（秒）
    const formattedRemainingTime = remainingTime > 60
      ? `${Math.floor(remainingTime / 60)}min ${Math.floor(remainingTime % 60)}s`
      : `${remainingTime.toFixed(0)}s`

    // 计算已下载和总下载的文件大小（MB）
    const downloadedSizeMB = (downloadedBytes / 1048576).toFixed(1)
    const totalSizeMB = (totalBytes / 1048576).toFixed(1)

    // 打印下载进度、速度和剩余时间
    console.log(
      `⬇️  ${opt.title} ${generateProgressBar(progressPercentage)} ${coloredPercentage} ${downloadedSizeMB}/${totalSizeMB} MB | ${formattedSpeed} 剩余: ${formattedRemainingTime}\r`
    )
  }, 3)

  return { filepath, totalBytes }
}

/**
 * 处理文件名长度，保留文件扩展名
 * @param filename 原始文件名
 * @param maxLength 最大长度（不包括扩展名）
 * @returns 处理后的文件名
 */
const processFilename = (filename: string, maxLength: number = 50): string => {
  // 提取文件扩展名
  const lastDotIndex = filename.lastIndexOf('.')
  const hasExtension = lastDotIndex > 0 && lastDotIndex < filename.length - 1

  if (!hasExtension) {
    // 没有扩展名，直接截取并清理特殊字符
    return filename.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, ' ')
  }

  // 分离文件名主体和扩展名
  const nameWithoutExt = filename.substring(0, lastDotIndex)
  const extension = filename.substring(lastDotIndex)

  // 对文件名主体进行长度限制和特殊字符清理
  const processedName = nameWithoutExt.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, ' ')

  // 重新拼接文件名和扩展名
  return processedName + '...' + extension
}
