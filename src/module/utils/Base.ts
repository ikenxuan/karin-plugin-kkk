import fs from 'node:fs'

import karin, { logger, Message, segment } from 'node-karin'

import { Common, Config, mergeFile, Networks } from '@/module/utils'

interface uploadFileOptions {
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
interface title {
  /** 文件名：自定义 */
  originTitle?: string
  /** 文件名：tmp + 时间戳 */
  timestampTitle?: string
}

interface downloadFileOptions {
  /** 视频链接 */
  video_url: string
  /** 文件名 */
  title: title
  /** 下载文件类型，默认为'.mp4'。 */
  filetype?: string
  /** 自定义请求头，将使用该请求头下载文件。 */
  headers?: object

}

interface fileInfo {
  /** 视频文件的绝对路径 */
  filepath: string
  /** 视频文件大小 */
  totalBytes: number
  /** 文件名：自定义 */
  originTitle?: title['originTitle']
  /** 文件名：tmp + 时间戳 */
  timestampTitle?: title['timestampTitle']
}

interface downLoadFileOptions {
  /** 文件名 */
  title: string
  /**
   * 将使用该请求头下载文件。
   * @default {}
   */
  headers?: object
  /**
   * 下载文件类型，默认为'.mp4'。
   * @default '.mp4'
   */
  filetype?: string
}
export class Base {
  e: Message
  headers: any
  _path: string
  constructor (e: Message) {
    this.e = e
    this.headers = {
      Accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    }
    this._path = process.cwd()?.replace(/\\/g, '/')
  }

  /** 获取适配器名称 */
  get botadapter (): string {
    return this.e.bot?.adapter?.name
  }

  /**
   * 上传视频文件
   * @param file - 包含本地视频文件信息的对象。
   * @param videoUrl 视频直链，无则传空字符串
   * @param options 上传参数
   * @returns
   */
  async upload_file (file: fileInfo, videoUrl: string, options?: uploadFileOptions): Promise<boolean> {
    let sendStatus: boolean = true
    let File: Buffer | string; let newFileSize = file.totalBytes

    const selfId = this.e.selfId || options?.activeOption?.uin as string
    const contact = this.e.contact || karin.contactGroup(options?.activeOption?.group_id as string) || karin.contactFriend(selfId)
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
    } else File = file.filepath
    try {
      // 是主动消息
      if (options?.active) {
        if (options.useGroupFile) { // 是群文件
          const bot = karin.getBot(String(options.activeOption?.uin))!
          const contact = karin.contactGroup(String(options.activeOption?.group_id))
          const status = await bot.uploadFile(contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split('/').pop()}`)
          status ? sendStatus = true : sendStatus = false
        } else { // 不是群文件
          const status = await karin.sendMsg(String(options?.activeOption?.uin), karin.contactGroup(String(options?.activeOption?.group_id)), [segment.video(File)])
          status.messageId ? sendStatus = true : sendStatus = false
        }
      } else { // 不是主动消息
        if (options?.useGroupFile) { // 是文件
          await this.e.reply(`视频大小: ${newFileSize.toFixed(1)}MB 正通过文件上传中...`)
          const status = await this.e.bot.uploadFile(this.e.contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split('/').pop()}`)
          status ? sendStatus = true : sendStatus = false
        } else { // 不是文件
          const status = await this.e.reply(segment.video(File) || videoUrl)
          status.messageId ? sendStatus = true : sendStatus = false
        }
      }
      return sendStatus
    } catch (error) {
      logger.error('视频文件上传错误,' + String(error))
      return false
    } finally {
      await this.removeFile(file.filepath)
    }
  }

  /**
   * 下载视频并上传到群
   * @param video_url 视频链接
   * @param title 文件名，是一个对象，时间戳或自定义
   * @param opt 上传参数
   * @returns
   */
  async DownLoadVideo (downloadOpt: downloadFileOptions, uploadOpt?: uploadFileOptions): Promise<boolean> {
    /** 获取文件大小 */
    const fileHeaders = await new Networks({ url: downloadOpt.video_url, headers: downloadOpt.headers ?? this.headers }).getHeaders()
    const fileSizeContent = fileHeaders['content-range']?.match(/\/(\d+)/) ? parseInt(fileHeaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2)
    const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2))
    if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
      const message = segment.text(`视频：「${downloadOpt.title.originTitle ??
        'Error: 文件名获取失败'}」大小 (${fileSizeInMB} MB) 超出最大限制（设定值：${Config.upload.filelimit} MB），已取消上传`)
      await karin.sendMsg(this.e.selfId, this.e.contact, message)
      return false
    }

    // 下载文件，视频URL，标题和自定义headers
    let res = await this.DownLoadFile(downloadOpt.video_url, {
      title: Config.app.rmmp4 ? downloadOpt.title.timestampTitle as string : downloadOpt.title.originTitle as string,
      headers: downloadOpt.headers ?? this.headers,
      filetype: '.mp4'
    })
    res = { ...res, ...downloadOpt.title }
    // 将下载的文件大小转换为MB并保留两位小数
    res.totalBytes = Number((res.totalBytes / (1024 * 1024)).toFixed(2))
    /** 上传视频 */
    return await this.upload_file(res, downloadOpt.video_url, uploadOpt)
  }

  /**
   * 异步下载文件的函数。
   * @param videoUrl 下载地址。
   * @param opt 配置选项，包括标题、请求头等。
   * @returns 返回一个包含文件路径和总字节数的对象。
   */
  async DownLoadFile (videoUrl: string, opt: downLoadFileOptions): Promise<fileInfo> {
    // 记录开始时间
    const startTime = Date.now()

    // 使用 networks 类进行文件下载，并通过回调函数实时更新下载进度
    const { filepath, totalBytes } = await new Networks({
      url: videoUrl, // 视频地址
      headers: opt.headers ?? this.headers, // 请求头
      filepath: Common.tempDri.video + `${opt.title}${opt.filetype ?? '.mp4'}`, // 文件保存路径
      timeout: 30000 // 设置 30 秒超时
    }).downloadStream((downloadedBytes, totalBytes) => {
      // 定义进度条长度及生成进度条字符串的函数
      const barLength = 45
      function generateProgressBar (progressPercentage: number) {
        const filledLength = Math.floor((progressPercentage / 100) * barLength)
        let progress = ''
        progress += '#'.repeat(filledLength)
        progress += '-'.repeat(Math.max(0, barLength - filledLength - 1))
        return `[${progress}]`
      }

      // 计算当前下载进度百分比
      const progressPercentage = (downloadedBytes / totalBytes) * 100

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
        `🚀 Downloading 🚀 ${opt.title}${opt.filetype ?? '.mp4'} ${generateProgressBar(progressPercentage)} ${coloredPercentage} ${downloadedSizeMB}/${totalSizeMB} MB | ${formattedSpeed} 剩余: ${formattedRemainingTime}\r`
      )
    })

    return { filepath, totalBytes }
  }

  /** 删文件 */
  async removeFile (path: string, force = false) {
    return await Common.removeFile(path, force)
  }

  /** 过万整除 */
  count (count: number): string {
    if (count > 10000) {
      return (count / 10000).toFixed(1) + '万'
    } else {
      return count?.toString() || '无法获取'
    }
  }
}
