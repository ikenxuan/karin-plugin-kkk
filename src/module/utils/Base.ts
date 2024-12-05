import fs from 'node:fs'

import { karin, AdapterType, logger, Message, segment } from 'node-karin'

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

/** 最少都要传一个 */
interface title {
  /** 文件名：自定义 */
  originTitle?: string
  /** 文件名：tmp + 时间戳 */
  timestampTitle?: string
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
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
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

    // 判断是否使用群文件上传
    if (options) {
      options.useGroupFile = Config.upload.usegroupfile && (file.totalBytes > Config.upload.groupfilevalue)
    }

    if (Config.upload.compress && (file.totalBytes > Config.upload.compresstrigger)) {
      const Duration = await mergeFile('获取指定视频文件时长', { path: file.filepath })
      logger.warn(logger.yellow(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`))
      const message = [
        segment.text(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`),
        options?.message_id ? segment.reply(options.message_id) : segment.text(''),
      ]

      const msg1 = await karin.sendMsg(this.e.selfId, this.e.contact, message)
      // 计算目标视频平均码率
      const targetBitrate = Common.calculateBitrate(Config.upload.compresstrigger, Duration) * 0.75
      // 执行压缩
      const startTime = Date.now()
      file.filepath = await mergeFile('压缩视频', { path: file.filepath, targetBitrate, resultPath: `${Common.tempDri.video}tmp_${Date.now()}.mp4` })
      const endTime = Date.now()
      // 再次检查大小
      newFileSize = await Common.getVideoFileSize(file.filepath)
      logger.debug(`原始视频大小为: ${file.totalBytes.toFixed(2)} MB, ${logger.green(`经 FFmpeg 压缩后最终视频大小为: ${newFileSize.toFixed(2)} MB，原视频文件已删除`)}`)

      const message2 = [
        segment.text(`压缩后最终视频大小为: ${newFileSize.toFixed(2)} MB，压缩耗时：${((endTime - startTime) / 1000).toFixed(2)} 秒`),
        segment.reply(msg1.messageId),
      ]
      await karin.sendMsg(this.e.selfId, this.e.contact, message2)
    }

    // 是否先转换为base64
    if (Config.upload.sendbase64) {
      const videoBuffer = await fs.promises.readFile(file.filepath)
      File = `base64://${videoBuffer.toString('base64')}`
    } else File = file.filepath
    try {
      // 是主动消息
      if (options?.active) {
        if (options.useGroupFile) { // 是群文件
          const bot = karin.getBot(String(options.activeOption?.uin)) as AdapterType
          const status = await bot.uploadGroupFile(options.activeOption?.group_id ?? '', File, file.originTitle ? file.originTitle : `tmp_${Date.now()}`)
          status ? sendStatus = true : sendStatus = false
        } else { // 不是群文件
          const status = await karin.sendMsg(String(options?.activeOption?.uin), karin.contactGroup(String(options?.activeOption?.group_id)), [segment.video(File)])
          status.messageId ? sendStatus = true : sendStatus = false
        }
      } else { // 不是主动消息
        if (options?.useGroupFile) { // 是群文件
          const status = await this.e.bot.uploadGroupFile('groupId' in this.e ? this.e.groupId : '', File, file.originTitle ? file.originTitle : `tmp_${Date.now()}`)
          status ? sendStatus = true : sendStatus = false
        } else { // 不是群文件
          const status = await this.e.reply(segment.video(File) || videoUrl)
          status.messageId ? sendStatus = true : sendStatus = false
        }
      }
      return sendStatus
    } catch (error) {
      logger.error('视频文件上传错误,' + error)
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
    const fileHeaders = await new Networks({ url: downloadOpt.video_url, headers: downloadOpt.headers || this.headers }).getHeaders()
    const fileSizeContent = fileHeaders['content-range']?.match(/\/(\d+)/) ? parseInt(fileHeaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2)
    const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2))
    if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
      const message = segment.text(`视频：「${downloadOpt.title.originTitle
        ? downloadOpt.title.originTitle
        : 'Error: 文件名获取失败'}」大小 (${fileSizeInMB} MB) 超出最大限制（设定值：${Config.upload.filelimit} MB），已取消上传`)

      await karin.sendMsg(this.e.selfId, this.e.contact, message)
      return false
    }

    // 下载文件，视频URL，标题和自定义headers
    let res = await this.DownLoadFile(downloadOpt.video_url, {
      title: Config.app.rmmp4 ? downloadOpt.title.timestampTitle as string : downloadOpt.title.originTitle as string,
      headers: downloadOpt.headers || this.headers,
      filetype: '.mp4',
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
   * @param title 文件名。
   * @param headers 请求头，可选参数，默认为空对象。
   * @param filetype 下载文件的类型，默认为'.mp4'。
   * @returns 返回一个包含文件路径和总字节数的对象。
   */
  async DownLoadFile (videoUrl: string, opt: downLoadFileOptions): Promise<fileInfo> {
    // 使用networks类进行文件下载，并通过回调函数实时更新下载进度
    const { filepath, totalBytes } = await new Networks({
      url: videoUrl, // 视频地址
      headers: opt.headers || this.headers, // 请求头
      filepath: Common.tempDri.video + `${opt.title}${opt.filetype || '.mp4'}`, // 文件保存路径
      timeout: 30000, // 设置30秒超时
    }).downloadStream((downloadedBytes, totalBytes) => {
      // 定义进度条长度及生成进度条字符串的函数
      const barLength = 45
      function generateProgressBar (progressPercentage: number) {
        // 根据进度计算填充的'#'字符数量，并生成进度条样式
        const filledLength = Math.floor((progressPercentage / 100) * barLength)
        let progress = ''
        progress += '#'.repeat(filledLength)
        progress += '-'.repeat(Math.max(0, barLength - filledLength - 1))
        const formattedProgress = progressPercentage.toFixed(2) + '%'
        console.log(`正在下载 ${opt.title}${opt.filetype || '.mp4'} [${progress}] ${formattedProgress}\r`)
      }
      // 计算并打印当前下载进度
      const progressPercentage = (downloadedBytes / totalBytes) * 100
      generateProgressBar(progressPercentage)
    })
    return { filepath, totalBytes }
  }

  /** 删文件 */
  async removeFile (path: string, force: boolean = false): Promise<boolean> {
    return Common.removeFile(path, force)
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
