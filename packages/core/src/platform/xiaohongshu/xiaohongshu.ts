import fs from 'node:fs'

import { format } from 'date-fns'
import { common, type Message, segment } from 'node-karin'
import { logger } from 'node-karin'

import { Base, baseHeaders, buildGoogleMotionPhoto, Common, downloadFile, downloadVideo, type LiveImageMergeOptions, loopVideoWithTransition, processImageUrl, Render } from '@/module'
import { Config } from '@/module/utils/Config'

import { xiaohongshuComments } from './comments'
import { XiaohongshuIdData } from './getID'

// 定义小红书视频流类型
export type XhsVideoStream = {
  height: number
  width: number
  size: number
  video_bitrate: number
  audio_bitrate: number
  fps: number
  master_url: string
  backup_urls: string[]
  video_codec: string
  audio_codec: string
  format: string
  quality_type: string
  stream_desc: string
  duration: number
  avg_bitrate: number
}

export class Xiaohongshu extends Base {
  e: Message
  type: XiaohongshuIdData['type']

  constructor (e: Message, iddata: XiaohongshuIdData) {
    super(e)
    this.e = e
    this.type = iddata?.type
  }

  async XiaohongshuHandler (data: XiaohongshuIdData) {
    Config.app.parseTip && await this.e.reply('检测到小红书链接，开始解析')
    const NoteData = await this.amagi.xiaohongshu.fetcher.fetchNoteDetail({
      typeMode: 'strict',
      note_id: data.note_id,
      xsec_token: data.xsec_token
    })
    const EmojiList = await this.amagi.xiaohongshu.fetcher.fetchEmojiList({ typeMode: 'strict' })
    const formattedEmojis = XiaohongshuEmoji(EmojiList)

    // 笔记信息
    if (Config.xiaohongshu.sendContent.some(item => item === 'info')) {
      const noteInfoImg = await Render('xiaohongshu/noteInfo',
        {
          title: NoteData.data.data.items[0].note_card!.title,
          desc: processXiaohongshuEmojis(
            NoteData.data.data.items[0].note_card!.desc,
            formattedEmojis
          ),
          statistics: NoteData.data.data.items[0].note_card!.interact_info,
          note_id: NoteData.data.data.items[0].note_card!.note_id,
          author: NoteData.data.data.items[0].note_card!.user,
          image_url: NoteData.data.data.items[0].note_card!.image_list[0].url_default,
          time: NoteData.data.data.items[0].note_card!.time,
          ip_location: NoteData.data.data.items[0].note_card!.ip_location
        }
      )
      this.e.reply(noteInfoImg)
    }

    // 评论列表
    if (Config.xiaohongshu.sendContent.some(item => item === 'comment')) {
      const CommentData = await this.amagi.xiaohongshu.fetcher.fetchNoteComments({
        typeMode: 'strict',
        note_id: data.note_id,
        xsec_token: data.xsec_token
      })

      if (!CommentData.data.data.comments || CommentData.data.data.comments.length === 0) {
        await this.e.reply('这个笔记没有评论 ~')
      } else {
        // 使用简化的评论处理函数，直接返回评论数组
        const processedComments = await xiaohongshuComments(CommentData.data, formattedEmojis)

        const commentListImg = await Render('xiaohongshu/comment',
          {
            Type: NoteData.data.data.items[0].note_card!.video ? '视频' : '图文',
            CommentsData: processedComments,
            CommentLength: processedComments.length,
            ImageLength: NoteData.data.data.items[0].note_card!.image_list?.length || 0,
            share_url: `https://www.xiaohongshu.com/discovery/item/${data.note_id}?source=webshare&xhsshare=pc_web&xsec_token=${data.xsec_token}&xsec_source=pc_share`
          }
        )
        this.e.reply(commentListImg)
      }
    }
    
    // 图片笔记
    if (!NoteData.data.data.items[0].note_card!.video && Config.xiaohongshu.sendContent.includes('image')) {
      const processedImages: any[] = []
      const title = NoteData.data.data.items[0].note_card!.title
      const temp: Array<{ filepath: string; totalBytes: number }> = []
      let hasGeneratedLivePhoto = false // 标记是否生成了实况图
      
      // 获取实况图配置
      const livePhotoMode = Config.app.livePhotoMode ?? 'video_and_livephoto'
      const shouldGenerateVideo = livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'video_only'
      const shouldGenerateLivePhoto = livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'livephoto_only'

      // 实况图合并配置
      const loopCount = 3 // 小红书实况图循环3次
      const mergeMode: LiveImageMergeOptions['mergeMode'] = 'continuous'
      let bgmContext: any = undefined

      for (const [index, item] of NoteData.data.data.items[0].note_card!.image_list.entries()) {
        // 检查是否为实况图
        if (item.live_photo && item.stream && (shouldGenerateVideo || shouldGenerateLivePhoto)) {
          // 下载静态图片
          const staticImageUrl = item.url_default
          const staticImgTempPath = Common.tempDri.images + `static_${Date.now()}_${index}.jpg`
          const staticImg = await downloadFile(staticImageUrl, {
            title: `static_${Date.now()}_${index}.jpg`,
            filepath: staticImgTempPath,
            headers: baseHeaders
          })
          
          let staticImgPath = ''
          if (staticImg.filepath) {
            staticImgPath = staticImg.filepath
          }
          
          // 获取实况图视频流
          const livePhotoVideo = xiaohongshuGetLivePhotoVideo(item.stream)
          
          if (livePhotoVideo) {
            // 下载实况图视频
            const livePhotoPath = Common.tempDri.video + `livephoto_${Date.now()}_${index}.mp4`
            const livePhoto = await downloadFile(livePhotoVideo.master_url, {
              title: `livephoto_${Date.now()}_${index}.mp4`,
              filepath: livePhotoPath,
              headers: {
                ...baseHeaders,
                Referer: livePhotoVideo.master_url
              }
            })
            
            if (livePhoto.filepath) {
              // 生成视频（优先）
              if (shouldGenerateVideo) {
                const outputPath = Common.tempDri.video + `xhs_live_${Date.now()}_${index}.mp4`
                const transitionEnabled = loopCount > 1 && Boolean(staticImgPath)
                const safeStaticPath = staticImgPath || livePhoto.filepath
                
                const result = await loopVideoWithTransition({
                  inputPath: livePhoto.filepath,
                  outputPath,
                  loopCount,
                  staticImagePath: safeStaticPath,
                  transitionEnabled,
                  mergeMode,
                  context: bgmContext ?? undefined
                })
                
                const success = result.success
                if (mergeMode === 'continuous' && result.context) {
                  bgmContext = result.context
                }
                
                if (success) {
                  const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`
                  fs.renameSync(outputPath, filePath)
                  logger.mark(`小红书实况图视频文件重命名完成: ${outputPath.split('/').pop()} -> ${filePath.split('/').pop()}`)
                  temp.push({ filepath: filePath, totalBytes: 0 })
                  const videoPath = Config.upload.videoSendMode === 'base64'
                    ? `base64://${(fs.readFileSync(filePath)).toString('base64')}`
                    : `file://${filePath}`
                  processedImages.push(segment.video(videoPath))
                }
              }
              
              // 生成实况图（在视频之后）
              if (shouldGenerateLivePhoto) {
                let hasPushedMotionPhotoCover = false
                if (staticImgPath) {
                  const motionPhotoCoverPath = Common.tempDri.images + `MVIMG_${format(new Date(), 'yyyyMMdd_HHmmss_SSS')}_${index}.jpg`
                  const motionPhotoCreated = await buildGoogleMotionPhoto({
                    imagePath: staticImgPath,
                    videoPath: livePhoto.filepath,
                    outputPath: motionPhotoCoverPath
                  })
                  
                  if (motionPhotoCreated) {
                    temp.push({ filepath: motionPhotoCoverPath, totalBytes: 0 })
                    const motionPhotoCover = Config.upload.imageSendMode === 'base64'
                      ? `base64://${(fs.readFileSync(motionPhotoCoverPath)).toString('base64')}`
                      : `file://${motionPhotoCoverPath}`
                    processedImages.push(segment.image(motionPhotoCover))
                    hasPushedMotionPhotoCover = true
                    hasGeneratedLivePhoto = true // 标记已生成实况图
                    logger.debug(`小红书实况图生成成功: ${motionPhotoCoverPath}`)
                  }
                }
                
                // 如果实况图生成失败，使用普通图片
                if (!hasPushedMotionPhotoCover) {
                  const imageUrl = await processImageUrl(item.url_default, title, index)
                  processedImages.push(segment.image(imageUrl))
                }
              }
              
              // 清理临时视频文件
              logger.mark('正在尝试删除缓存文件')
              await Common.removeFile(livePhoto.filepath, true)
            }
          }
          
          // 清理临时静态图片文件
          if (staticImgPath) {
            temp.push({ filepath: staticImgPath, totalBytes: 0 })
          }
        } else {
          // 普通图片处理
          const imageUrl = await processImageUrl(item.url_default, title, index)
          processedImages.push(segment.image(imageUrl))
        }
      }
      
      // 如果生成了实况图，添加提示文字
      if (hasGeneratedLivePhoto) {
        const systemTips: Record<string, string> = {
          google: 'Google 相册',
          xiaomi: '小米相册（支持实况照片的任何版本）、Google 相册',
          oppo: 'OPPO 相册、小米相册（较新版本）、Google 相册',
          huawei_honor: '华为/荣耀相册（理论可行但未实测）'
        }
        const tip = systemTips[Config.app.livePhotoSystem] || 'Google 相册'
        processedImages.push(segment.text(`💡 提示：保存原图到 ${tip} 即可识别为实况图`))
      }
      
      const res = common.makeForward(
        processedImages,
        Config.app.fakeForward ? this.e.sender.userId : this.e.bot.account.selfId,
        Config.app.fakeForward ? this.e.sender.nick : this.e.bot.account.name
      )
      
      if (processedImages.length === 1) {
        await this.e.reply(processedImages[0])
      } else if (processedImages.length > 1) {
        try {
          await this.e.bot.sendForwardMsg(this.e.contact, res, {
            source: '图片合集',
            summary: `查看${res.length}张图片/视频消息`,
            prompt: '小红书图集解析结果',
            news: [{ text: '点击查看解析结果' }]
          })
        } finally {
          for (const item of temp) {
            await Common.removeFile(item.filepath, true)
          }
        }
      }
    }

    // 视频笔记
    if (NoteData.data.data.items[0].note_card!.video && Config.xiaohongshu.sendContent.includes('video')) {
      const video = NoteData.data.data.items[0].note_card!.video

      // 使用新的视频选择逻辑
      const selectedVideo = xiaohongshuProcessVideos(
        video.media?.stream,
        Config.xiaohongshu.videoQuality,
        Config.xiaohongshu.maxAutoVideoSize
      )

      if (selectedVideo) {
        await downloadVideo(
          this.e,
          {
            video_url: selectedVideo.master_url,
            title: {
              timestampTitle: `tmp_${Date.now()}.mp4`,
              originTitle: `${selectedVideo.stream_desc}.mp4`
            },
            headers: {
              ...baseHeaders,
              Referer: selectedVideo.master_url
            }
          },
          {
            message_id: this.e.messageId
          }
        )
      } else {
        // 如果没有找到合适的视频，使用原来的逻辑作为备选
        await this.e.reply(segment.video(video.url_default))
      }
    }
    return true
  }
}

/**
 * 获取小红书实况图视频流
 * @param streamData 视频流数据
 * @returns 选择的视频流
 */
export const xiaohongshuGetLivePhotoVideo = (streamData: any): XhsVideoStream | null => {
  if (!streamData) {
    logger.warn('没有找到实况图视频流数据')
    return null
  }

  // 按兼容性优先级收集所有视频流：h264 > h265 > av1 > h266
  const codecPriority = ['h264', 'h265', 'av1', 'h266']
  
  for (const codec of codecPriority) {
    if (streamData[codec] && Array.isArray(streamData[codec]) && streamData[codec].length > 0) {
      // 选择第一个可用的视频流（实况图通常只有一个流）
      const video = streamData[codec][0]
      logger.debug(`选择实况图视频流: 编码=${codec}, 大小=${(video.size || 0) / (1024 * 1024)}MB`)
      return video
    }
  }

  logger.warn('未找到可用的实况图视频流')
  return null
}

/**
 * 处理小红书视频流选择逻辑
 * @param streamData 视频流数据
 * @param videoQuality 画质偏好
 * @param maxAutoVideoSize 自动模式下的最大文件大小（MB）
 * @returns 选择的视频流
 */
export const xiaohongshuProcessVideos = (
  streamData: any,
  videoQuality: string,
  maxAutoVideoSize?: number
): XhsVideoStream | null => {
  if (!streamData) {
    logger.warn('没有找到视频流数据')
    return null
  }

  // 按兼容性优先级收集所有视频流：h265 > h264 > av1 > h266
  const codecPriority = ['h265', 'h264', 'av1', 'h266']
  const allVideos: XhsVideoStream[] = []

  for (const codec of codecPriority) {
    if (streamData[codec] && Array.isArray(streamData[codec])) {
      allVideos.push(...streamData[codec])
    }
  }

  if (allVideos.length === 0) {
    logger.warn('没有找到可用的视频流')
    return null
  }

  logger.debug(`找到 ${allVideos.length} 个视频流`)

  // 定义画质等级映射，根据分辨率判断画质
  const getQualityLevel = (width: number, height: number): string => {
    const pixels = width * height
    // 4K 画质 (3840x2160 或更高)
    if (pixels >= 3840 * 2160) return '4k'
    // 2K/1440p 画质 (2560x1440)
    if (pixels >= 2560 * 1440) return '2k'
    // 1080p 画质 (1920x1080)
    if (pixels >= 1920 * 1080) return '1080p'
    // 720p 画质 (1280x720)
    if (pixels >= 1280 * 720) return '720p'
    // 540p 画质及以下
    return '540p'
  }

  // 按画质分组，并在每组内按文件大小排序（大的在前）
  const videosByQuality = new Map<string, XhsVideoStream[]>()

  allVideos.forEach(video => {
    const quality = getQualityLevel(video.width, video.height)
    if (!videosByQuality.has(quality)) {
      videosByQuality.set(quality, [])
    }
    videosByQuality.get(quality)!.push(video)
  })

  // 对每个画质组内的视频按文件大小排序（大的在前）
  videosByQuality.forEach((videos) => {
    videos.sort((a, b) => b.size - a.size)
  })

  // 如果是自动模式
  if (videoQuality === 'adapt') {
    const sizeLimitBytes = (maxAutoVideoSize || Config.upload.filelimit) * 1024 * 1024

    // 按画质优先级排序：4k > 2k > 1080p > 720p > 540p
    const qualityPriority = ['4k', '2k', '1080p', '720p', '540p']

    for (const quality of qualityPriority) {
      const qualityVideos = videosByQuality.get(quality)
      if (qualityVideos && qualityVideos.length > 0) {
        // 选择该画质下文件大小最大但不超过限制的视频
        const suitableVideo = qualityVideos.find(video => video.size <= sizeLimitBytes)
        if (suitableVideo) {
          logger.debug(`自动选择画质: ${quality}, 文件大小: ${(suitableVideo.size / (1024 * 1024)).toFixed(2)}MB, 编码: ${suitableVideo.video_codec}`)
          return suitableVideo
        }
      }
    }

    // 如果没有找到符合大小限制的视频，选择最小的视频
    let smallestVideo = allVideos[0]
    allVideos.forEach(video => {
      if (video.size < smallestVideo.size) {
        smallestVideo = video
      }
    })
    logger.debug(`未找到符合大小限制的视频，选择最小视频: ${(smallestVideo.size / (1024 * 1024)).toFixed(2)}MB, 编码: ${smallestVideo.video_codec}`)
    return smallestVideo
  }

  // 固定画质模式
  const targetQuality = videoQuality
  const targetVideos = videosByQuality.get(targetQuality)

  if (targetVideos && targetVideos.length > 0) {
    // 选择该画质下文件大小最大的视频（通常意味着更高的码率和质量）
    logger.debug(`选择固定画质: ${targetQuality}, 文件大小: ${(targetVideos[0].size / (1024 * 1024)).toFixed(2)}MB, 编码: ${targetVideos[0].video_codec}`)
    return targetVideos[0]
  }

  // 如果没有找到目标画质，选择最接近的画质
  const qualityPriority = ['4k', '2k', '1080p', '720p', '540p']
  const targetIndex = qualityPriority.indexOf(targetQuality)

  // 先尝试向下找（更低画质）
  for (let i = targetIndex + 1; i < qualityPriority.length; i++) {
    const fallbackVideos = videosByQuality.get(qualityPriority[i])
    if (fallbackVideos && fallbackVideos.length > 0) {
      logger.debug(`目标画质 ${targetQuality} 不可用，降级到: ${qualityPriority[i]}, 编码: ${fallbackVideos[0].video_codec}`)
      return fallbackVideos[0]
    }
  }

  // 再尝试向上找（更高画质）
  for (let i = targetIndex - 1; i >= 0; i--) {
    const fallbackVideos = videosByQuality.get(qualityPriority[i])
    if (fallbackVideos && fallbackVideos.length > 0) {
      logger.debug(`目标画质 ${targetQuality} 不可用，升级到: ${qualityPriority[i]}, 编码: ${fallbackVideos[0].video_codec}`)
      return fallbackVideos[0]
    }
  }

  // 如果都没找到，返回第一个可用视频
  logger.warn('未找到任何匹配的画质，返回默认视频')
  return allVideos[0]
}

/**
 * 格式化小红书表情列表
 * @param data 小红书表情数据
 * @returns 格式化后的表情数组
 */
export const XiaohongshuEmoji = (data: any) => {
  const ListArray = []

  if (data.data.data.emoji.tabs) {
    for (const tab of data.data.data.emoji.tabs) {
      if (tab.collection) {
        for (const collection of tab.collection) {
          if (collection.emoji) {
            for (const emoji of collection.emoji) {
              const Objject = {
                name: emoji.image_name,
                url: emoji.image
              }
              ListArray.push(Objject)
            }
          }
        }
      }
    }
  }

  return ListArray
}

/**
 * 处理小红书笔记描述中的表情和话题标签
 * @param text 原始文本
 * @param emojiData 表情数据
 * @returns 处理后的HTML文本
 */
const processXiaohongshuEmojis = (text: string, emojiData: any): string => {
  if (!text || !emojiData || !Array.isArray(emojiData)) {
    return `<span>${text}</span>`
  }

  let processedText = text

  // 首先处理话题标签，移除[话题]标识
  processedText = processedText.replace(/\[话题\]/g, '')

  // 遍历表情数据，替换文本中的表情
  for (const emoji of emojiData) {
    if (emoji.name && emoji.url && processedText.includes(emoji.name)) {
      // 使用正则表达式进行全局替换，确保特殊字符被正确转义
      const escapedName = emoji.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escapedName, 'g')
      processedText = processedText.replace(regex, `<img src="${emoji.url}" alt="${emoji.name}" />`)
    }
  }

  // 处理表情和文本混合的情况，将非表情文本用span包裹
  // 先分割文本，区分表情和普通文本
  const parts = processedText.split(/(<img[^>]*>)/)

  const wrappedParts = parts.map(part => {
    // 如果是img标签（表情），直接返回
    if (part.startsWith('<img')) {
      return part
    }
    // 如果是普通文本且不为空，用span包裹
    if (part.trim()) {
      return `<span>${part}</span>`
    }
    return part
  })

  return wrappedParts.join('')
}
