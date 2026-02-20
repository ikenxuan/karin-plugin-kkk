import fs from 'node:fs'

import { type DyEmojiList, DyVideoWork } from '@ikenxuan/amagi'
import type { Elements, Message, SendMessage } from 'node-karin'
import { common, logger, mkdirSync, segment } from 'node-karin'
import { UserVideoListData } from 'template/types/platforms/douyin/UserVideoList'

import {
  Base,
  baseHeaders,
  Common,
  Count,
  createLiveImageContext,
  downloadFile,
  downloadVideo,
  fileInfo,
  type LiveImageMergeContext,
  mergeLiveImageContinuous,
  mergeLiveImageIndependent,
  Networks,
  Render
} from '@/module/utils'
import { Config } from '@/module/utils/Config'
import { douyinComments } from '@/platform/douyin'
import { burnDouyinDanmaku, type DouyinDanmakuElem } from '@/platform/douyin/danmaku'
import { DouyinDataTypes, DouyinIdData } from '@/types'

let mp4size = ''
let img
export type dyVideo = {
  FPS: number
  HDR_bit: string
  HDR_type: string
  bit_rate: number
  format: string
  gear_name: string
  is_bytevc1: number
  is_h265: number
  play_addr: {
    data_size: number
    file_cs: string
    file_hash: string
    height: number
    uri: string
    url_key: string
    url_list: string[]
    width: number
  }
  quality_type: number
  video_extra: string
}
export class DouYin extends Base {
  e: Message
  type: DouyinDataTypes[keyof DouyinDataTypes]
  is_mp4: boolean | undefined
  is_slides: boolean
  /** 强制烧录弹幕（用于 #弹幕解析 命令） */
  forceBurnDanmaku: boolean
  /** 标记是否已处理 live 图（用于判断是否需要发送音频） */
  hasProcessedLiveImage: boolean
  get botadapter (): string {
    return this.e.bot?.adapter?.name
  }

  constructor (e: Message, iddata: DouyinIdData, options?: { forceBurnDanmaku?: boolean }) {
    super(e)
    this.e = e
    this.type = iddata?.type
    this.is_mp4 = iddata?.is_mp4
    this.is_slides = false
    this.forceBurnDanmaku = options?.forceBurnDanmaku ?? false
    this.hasProcessedLiveImage = false
  }

  async DouyinHandler (data: DouyinIdData) {
    if (Config.app.EmojiReply && !this.e.isPrivate) {
      try {
        await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true)
      } catch (err) {
        if (!Config.app.EmojiReplyIgnoreError) throw err
      }
    }
    if (Config.douyin.tip) this.e.reply('检测到抖音链接，开始解析')
    switch (this.type) {
      case 'one_work': {
        const VideoData = await this.amagi.douyin.fetcher.parseWork({
          aweme_id: data.aweme_id,
          typeMode: 'strict'
        })
        const CommentsData = await this.amagi.douyin.fetcher.fetchWorkComments({
          aweme_id: data.aweme_id,
          number: Config.douyin.numcomment,
          typeMode: 'strict'
        })
        this.is_slides = VideoData.data.aweme_detail.is_slides === true
        let g_video_url = ''
        let g_title

        /** 图集 */
        let imagenum = 0
        const image_res = []
        if (this.is_mp4 === false) {
          switch (true) {
            // 图集
            case this.is_slides === false && VideoData.data.aweme_detail.images !== null: {
              const image_data = []
              const imageres = []
              let image_url = ''
              // 使用可选链和空值合并操作符确保安全访问
              const images = VideoData.data.aweme_detail.images ?? []
              
              // 检查是否包含 live 图（clip_type !== 2）
              const hasLiveImage = images.some(item => item.clip_type !== 2)
              
              if (hasLiveImage) {
                // 包含 live 图，需要特殊处理
                const processedImages: Elements[] = []
                const temp: fileInfo[] = []
                
                // 设置标题
                const title = VideoData.data.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:*?"<>|\r\n]/g, ' ')
                g_title = title
                
                /** 下载 BGM */
                let mp3Path = ''
                if (VideoData.data.aweme_detail.music.play_url.uri === '') {
                  const extraData = JSON.parse(VideoData.data.aweme_detail.music.extra)
                  mp3Path = extraData.original_song_url
                } else {
                  mp3Path = VideoData.data.aweme_detail.music.play_url.uri
                }
                
                const liveimgbgm = await downloadFile(
                  mp3Path,
                  {
                    title: `Douyin_tmp_A_${Date.now()}.mp3`,
                    headers: this.headers
                  }
                )
                temp.push(liveimgbgm)
                
                // 获取合并模式配置
                const mergeMode = Config.douyin.liveImageMergeMode ?? 'independent'
                let bgmContext: LiveImageMergeContext | null = null
                if (mergeMode === 'continuous') {
                  bgmContext = await createLiveImageContext(liveimgbgm.filepath)
                }
                
                for (const [index, imageItem] of images.entries()) {
                  imagenum++
                  
                  // 静态图片，clip_type为2
                  if (imageItem.clip_type === 2) {
                    image_url = imageItem.url_list[2] || imageItem.url_list[1]
                    processedImages.push(segment.image(image_url))
                    
                    if (Config.app.removeCache === false) {
                      mkdirSync(`${Common.tempDri.images}${g_title}`)
                      const path = `${Common.tempDri.images}${g_title}/${index + 1}.png`
                      await new Networks({ url: image_url, type: 'arraybuffer' }).getData().then((data) => fs.promises.writeFile(path, Buffer.from(data)))
                    }
                    continue
                  }
                  
                  /** live 图 */
                  const liveimg = await downloadFile(
                    `https://aweme.snssdk.com/aweme/v1/play/?video_id=${imageItem.video.play_addr_h264.uri}&ratio=1080p&line=0`,
                    {
                      title: `Douyin_tmp_V_${Date.now()}.mp4`,
                      headers: this.headers
                    }
                  )
                  
                  if (liveimg.filepath) {
                    const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`
                    let success: boolean
                    
                    // clip_type === 4 是短片，不需要重放，loopCount = 1
                    // 其他类型（如 clip_type === 5 的 livePhoto）需要三次重放
                    const loopCount = imageItem.clip_type === 4 ? 1 : 3
                    
                    if (mergeMode === 'continuous' && bgmContext) {
                      // 连续模式：BGM 从上次位置继续
                      const result = await mergeLiveImageContinuous(
                        { videoPath: liveimg.filepath, outputPath, loopCount },
                        bgmContext
                      )
                      success = result.success
                      bgmContext = result.context
                    } else {
                      // 独立模式：每张图都从 BGM 开头开始
                      success = await mergeLiveImageIndependent(
                        { videoPath: liveimg.filepath, outputPath, loopCount },
                        liveimgbgm.filepath
                      )
                    }
                    
                    if (success) {
                      const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`
                      fs.renameSync(outputPath, filePath)
                      logger.mark(`视频文件重命名完成: ${outputPath.split('/').pop()} -> ${filePath.split('/').pop()}`)
                      logger.mark('正在尝试删除缓存文件')
                      await Common.removeFile(liveimg.filepath, true)
                      temp.push({ filepath: filePath, totalBytes: 0 })
                      processedImages.push(segment.video('file://' + filePath))
                      
                      // clip_type === 5 是 livePhoto，添加封面静态图
                      if (imageItem.clip_type === 5 && imageItem.url_list?.[0]) {
                        processedImages.push(segment.image(imageItem.url_list[0]))
                      }
                    } else {
                      await Common.removeFile(liveimg.filepath, true)
                    }
                  }
                }
                
                // 使用合并转发发送
                const Element = common.makeForward(processedImages, this.e.sender.userId, this.e.sender.nick)
                try {
                  await this.e.bot.sendForwardMsg(this.e.contact, Element, {
                    source: '图集内容',
                    summary: `查看${Element.length}张图片/视频消息`,
                    prompt: '抖音图集解析结果',
                    news: [{ text: '点击查看解析结果' }]
                  })
                } catch (error) {
                  await this.e.reply(JSON.stringify(error, null, 2))
                } finally {
                  for (const item of temp) {
                    await Common.removeFile(item.filepath, true)
                  }
                }
                
                // 标记已处理 live 图，不需要单独发送音频
                this.hasProcessedLiveImage = true
              } else {
                // 纯静态图集，使用原有逻辑
                for (const [index, imageItem] of images.entries()) {
                  // 获取图片地址，优先使用第三个URL，其次使用第二个URL
                  image_url = imageItem.url_list[2] || imageItem.url_list[1]

                  // 处理标题，去除特殊字符
                  const title = VideoData.data.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:*?"<>|\r\n]/g, ' ')
                  g_title = title

                  imageres.push(segment.image(image_url))
                  imagenum++

                  if (Config.app.removeCache === false) {
                    mkdirSync(`${Common.tempDri.images}${g_title}`)
                    const path = `${Common.tempDri.images}${g_title}/${index + 1}.png`
                    await new Networks({ url: image_url, type: 'arraybuffer' }).getData().then((data) => fs.promises.writeFile(path, Buffer.from(data)))
                  }
                }
                const res = common.makeForward(imageres, this.e.sender.userId, this.e.sender.nick)
                image_data.push(res)
                image_res.push(image_data)
                if (imageres.length === 1) {
                  await this.e.reply(segment.image(image_url))
                } else {
                  await this.e.bot.sendForwardMsg(this.e.contact, res, {
                    source: '图片合集',
                    summary: `查看${res.length}张图片消息`,
                    prompt: '抖音图集解析结果',
                    news: [{ text: '点击查看解析结果' }]
                  })
                }
              }
              break
            }
            // 合辑
            case VideoData.data.aweme_detail.is_slides === true && VideoData.data.aweme_detail.images !== null: {
              const images: Elements[] = []
              const temp: fileInfo[] = []
              /** BGM */
              let mp3Path = ''
              // 该声音由于版权原因在当前地区不可用
              if (VideoData.data.aweme_detail.music.play_url.uri === '') {
                const extraData = JSON.parse(VideoData.data.aweme_detail.music.extra)
                mp3Path = extraData.original_song_url
              } else {
                mp3Path = VideoData.data.aweme_detail.music.play_url.uri
              }
              const liveimgbgm = await downloadFile(
                mp3Path,
                {
                  title: `Douyin_tmp_A_${Date.now()}.mp3`,
                  headers: this.headers
                }
              )
              temp.push(liveimgbgm)
              const images1 = VideoData.data.aweme_detail.images ?? []
              if (!images1.length) {
                logger.debug('未获取到合辑的图片数据')
              }

              // 获取合并模式配置
              const mergeMode = Config.douyin.liveImageMergeMode ?? 'independent'
              let bgmContext: LiveImageMergeContext | null = null
              if (mergeMode === 'continuous') {
                bgmContext = await createLiveImageContext(liveimgbgm.filepath)
              }

              for (const item of images1) {
                imagenum++
                // 静态图片，clip_type为2
                if (item.clip_type === 2) {
                  images.push(segment.image((item.url_list[0])))
                  continue
                }
                /** 动图/短片 */
                const liveimg = await downloadFile(
                  `https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`,
                  {
                    title: `Douyin_tmp_V_${Date.now()}.mp4`,
                    headers: this.headers
                  }
                )

                if (liveimg.filepath) {
                  const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`
                  let success: boolean
                  
                  // clip_type === 4 是短片，不需要重放，loopCount = 1
                  // 其他类型（如 clip_type === 5 的 livePhoto）需要三次重放
                  const loopCount = item.clip_type === 4 ? 1 : 3

                  if (mergeMode === 'continuous' && bgmContext) {
                    // 连续模式：BGM 从上次位置继续
                    const result = await mergeLiveImageContinuous(
                      { videoPath: liveimg.filepath, outputPath, loopCount },
                      bgmContext
                    )
                    success = result.success
                    bgmContext = result.context
                  } else {
                    // 独立模式：每张图都从 BGM 开头开始
                    success = await mergeLiveImageIndependent(
                      { videoPath: liveimg.filepath, outputPath, loopCount },
                      liveimgbgm.filepath
                    )
                  }

                  if (success) {
                    const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`
                    fs.renameSync(outputPath, filePath)
                    logger.mark(`视频文件重命名完成: ${outputPath.split('/').pop()} -> ${filePath.split('/').pop()}`)
                    logger.mark('正在尝试删除缓存文件')
                    await Common.removeFile(liveimg.filepath, true)
                    temp.push({ filepath: filePath, totalBytes: 0 })
                    images.push(segment.video('file://' + filePath))
                    
                    // clip_type === 4和5 是 短片和livePhoto，添加封面静态图
                    if (item.clip_type === 5 && item.url_list?.[0]) {
                      images.push(segment.image(item.url_list[0]))
                    }
                  } else {
                    await Common.removeFile(liveimg.filepath, true)
                  }
                }
              }
              const Element = common.makeForward(images, this.e.sender.userId, this.e.sender.nick)
              try {
                await this.e.bot.sendForwardMsg(this.e.contact, Element, {
                  source: '合辑内容',
                  summary: `查看${Element.length}张图片/视频消息`,
                  prompt: '抖音合辑解析结果',
                  news: [{ text: '点击查看解析结果' }]
                })
              } catch (error) {
                await this.e.reply(JSON.stringify(error, null, 2))
              } finally {
                for (const item of temp) {
                  await Common.removeFile(item.filepath, true)
                }
              }
              break
            }
          }
        }

        /** 背景音乐 */
        if (VideoData.data.aweme_detail.music) {
          const music = VideoData.data.aweme_detail.music
          let music_url = ''
          // 该声音由于版权原因在当前地区不可用
          if (music.play_url.uri === '') {
            const extraData = JSON.parse(music.extra)
            music_url = extraData.original_song_url
          } else {
            music_url = music.play_url.uri
          }
          if (this.is_mp4 === false && Config.app.removeCache === false && music_url !== undefined) {
            try {
              const path = Common.tempDri.images + `${g_title}/BGM.mp3`
              await new Networks({ url: music_url, type: 'arraybuffer' }).getData().then((data) => fs.promises.writeFile(path, Buffer.from(data)))
            } catch (error) {
              console.log(error)
            }
          }
          const haspath = music_url && this.is_mp4 === false && music_url !== undefined && !this.hasProcessedLiveImage
          haspath && await this.e.reply(segment.record(music_url, false))
        }

        /** 视频 */
        let FPS
        const sendvideofile = true
        type VideoType = DyVideoWork['aweme_detail']['video']
        let video: VideoType | null = null
        if (this.is_mp4) {
          // 视频地址特殊判断：play_addr_h264、play_addr、
          video = VideoData.data.aweme_detail.video as VideoType
          FPS = video.bit_rate[0]?.FPS ?? '获取失败' // FPS

          logger.debug(`开始排除不符合条件的视频分辨率；\n
              共拥有${logger.yellow(video.bit_rate.length)}个视频源\n
              视频ID：${logger.green(VideoData.data.aweme_detail.aweme_id)}\n
              分享链接：${logger.green(VideoData.data.aweme_detail.share_url)}
              `)
          video.bit_rate = douyinProcessVideos(
            video.bit_rate,
            Config.douyin.videoQuality,
            Config.douyin.maxAutoVideoSize
          )
          g_video_url = await new Networks({
            url: video.bit_rate[0].play_addr.url_list[2],
            headers: {
              ...this.headers,
              Referer: video.bit_rate[0].play_addr.url_list[0]
            }
          }).getLongLink()
          const title = VideoData.data.aweme_detail.preview_title.substring(0, 80).replace(/[\\/:*?"<>|\r\n]/g, ' ') // video title
          g_title = title
          mp4size = (video.bit_rate[0].play_addr.data_size / (1024 * 1024)).toFixed(2)
        }

        if (Config.douyin.sendContent.includes('info')) {
          if (Config.douyin.videoInfoMode === 'text') {
            // 构建回复内容数组
            const replyContent: SendMessage = []
            const { digg_count, share_count, collect_count, comment_count, recommend_count } = VideoData.data.aweme_detail.statistics
            const contentMap = {
              cover: segment.image(this.is_mp4 ? VideoData.data.aweme_detail.video.animated_cover?.url_list[0] ?? VideoData.data.aweme_detail.video.cover.url_list[0] : VideoData.data.aweme_detail.images![0].url_list[0]),
              title: segment.text(`\n📺 标题: ${VideoData.data.aweme_detail.desc}\n`),
              author: segment.text(`\n👤 作者: ${VideoData.data.aweme_detail.author.nickname}\n`),
              stats: segment.text(formatVideoStats(digg_count, share_count, collect_count, comment_count, recommend_count))
            }
            // 重新排序
            const fixedOrder: (keyof typeof contentMap)[] = ['cover', 'title', 'author', 'stats']
            fixedOrder.forEach(item => {
              if (Config.douyin.displayContent.includes(item) && contentMap[item]) {
                replyContent.push(contentMap[item])
              }
            })
            if (replyContent.length > 0) {
              this.e.reply(replyContent)
            }
          } else {
            const userProfile = await this.amagi.douyin.fetcher.fetchUserProfile({
              sec_uid: VideoData.data.aweme_detail.author.sec_uid,
              typeMode: 'strict'
            })
            // 渲染为图片
            const videoInfoImg = await Render('douyin/videoInfo',
              {
                desc: VideoData.data.aweme_detail.desc,
                statistics: VideoData.data.aweme_detail.statistics,
                aweme_id: VideoData.data.aweme_detail.aweme_id,
                author: {
                  name: VideoData.data.aweme_detail.author.nickname,
                  avatar: VideoData.data.aweme_detail.author.avatar_thumb.url_list[0],
                  short_id: VideoData.data.aweme_detail.author.unique_id === '' ? VideoData.data.aweme_detail.author.short_id : VideoData.data.aweme_detail.author.unique_id
                },
                user_profile: userProfile.success ? {
                  ip_location: userProfile.data.user.ip_location,
                  follower_count: userProfile.data.user.follower_count,
                  total_favorited: userProfile.data.user.total_favorited,
                  aweme_count: userProfile.data.user.aweme_count,
                  gender: userProfile.data.user.gender ?? 0,
                  user_age: userProfile.data.user.user_age ?? 0
                } : undefined,
                image_url: this.is_mp4 ? VideoData.data.aweme_detail.video.animated_cover?.url_list[0] ?? VideoData.data.aweme_detail.video.cover.url_list[0] : VideoData.data.aweme_detail.images![0].url_list![0],
                cover_size: this.is_mp4
                  ? (VideoData.data.aweme_detail.video.cover ? {
                    width: VideoData.data.aweme_detail.video.cover_original_scale.width,
                    height: VideoData.data.aweme_detail.video.cover_original_scale.height
                  } : undefined)
                  : (VideoData.data.aweme_detail.images?.[0] ? {
                    width: VideoData.data.aweme_detail.images[0].width,
                    height: VideoData.data.aweme_detail.images[0].height
                  } : undefined),
                create_time: VideoData.data.aweme_detail.create_time,
                music: VideoData.data.aweme_detail.music ? {
                  author: VideoData.data.aweme_detail.music.author,
                  title: VideoData.data.aweme_detail.music.title,
                  cover: VideoData.data.aweme_detail.music.cover_hd?.url_list[0] ?? VideoData.data.aweme_detail.music.cover_large?.url_list[0]
                } : undefined,
                video: this.is_mp4 ? {
                  duration: VideoData.data.aweme_detail.video.duration,
                  width: VideoData.data.aweme_detail.video.width,
                  height: VideoData.data.aweme_detail.video.height,
                  ratio: VideoData.data.aweme_detail.video.ratio
                } : undefined
              }
            )
            this.e.reply(videoInfoImg)
          }
        }

        if (Config.douyin.sendContent.includes('comment')) {
          const EmojiData = await this.amagi.douyin.fetcher.fetchEmojiList({ typeMode: 'loose' })
          const list = Emoji(EmojiData.data)
          const douyinCommentsRes = await douyinComments(CommentsData, list)
          if (!douyinCommentsRes.CommentsData.length) {
            await this.e.reply('这个作品没有评论 ~')
          } else {
            const suggest: string[] = []
            if (VideoData.data.aweme_detail?.suggest_words?.suggest_words) {
              for (const item of VideoData.data.aweme_detail.suggest_words.suggest_words) {
                if (item.words && item.scene === 'comment_top_rec') {
                  for (const v of item.words) {
                    v.word && suggest.push(v.word)
                  }
                }
              }
            }
            const img = await Render('douyin/comment',
              {
                Type: this.is_mp4 ? '视频' : this.is_slides ? '合辑' : '图集',
                CommentsData: douyinCommentsRes.CommentsData,
                CommentLength: Config.douyin.realCommentCount ? VideoData.data.aweme_detail.statistics.comment_count : douyinCommentsRes.CommentsData.length ?? 0,
                share_url: this.is_mp4
                  ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`
                  : VideoData.data.aweme_detail.share_url,
                VideoSize: mp4size,
                VideoFPS: FPS,
                ImageLength: imagenum,
                Region: VideoData.data.aweme_detail.region,
                suggestWrod: suggest,
                Resolution: this.is_mp4 && video ? `${video.bit_rate[0].play_addr.width} x ${video.bit_rate[0].play_addr.height}` : null,
                maxDepth: Config.douyin.subCommentDepth
              }
            )
            const messageElements = []
            if (Config.douyin.commentImageCollection && douyinCommentsRes.image_url.length > 0) {
              for (const v of douyinCommentsRes.image_url) {
                messageElements.push(segment.image(v))
              }
              const res = common.makeForward(messageElements, this.e.sender.userId, this.e.sender.nick)
              this.e.bot.sendForwardMsg(this.e.contact, res, {
                source: '评论图片收集',
                summary: `查看${messageElements.length}张图片`,
                prompt: '抖音评论解析结果',
                news: [{ text: '点击查看解析结果' }]
              })
            }
            this.e.reply(img)
          }
        }
        /** 发送视频 */
        if (sendvideofile && this.is_mp4 && Config.douyin.sendContent.includes('video')) {
          // 获取弹幕数据（如果开启弹幕烧录）
          let danmakuList: DouyinDanmakuElem[] = []
          if ((this.forceBurnDanmaku || Config.douyin.burnDanmaku) && video) {
            try {
              const duration = video.duration // 视频时长（毫秒）
              logger.debug(`[抖音] 视频时长: ${duration}ms, 开始获取弹幕数据`)
              const danmakuData = await this.amagi.douyin.fetcher.fetchDanmakuList({
                aweme_id: data.aweme_id,
                duration,
                typeMode: 'strict'
              })
              if (danmakuData.data?.danmaku_list) {
                danmakuList = danmakuData.data.danmaku_list
                logger.debug(`[抖音] 获取到 ${danmakuList.length} 条弹幕`)
              }
            } catch (err) {
              logger.warn('[抖音] 获取弹幕失败，将不烧录弹幕', err)
            }
          }

          // 如果需要烧录弹幕，先下载视频再烧录
          if ((this.forceBurnDanmaku || Config.douyin.burnDanmaku) && danmakuList.length > 0) {
            const videoFile = await downloadFile(g_video_url, {
              title: `Douyin_V_tmp_${Date.now()}.mp4`,
              headers: { ...baseHeaders, Referer: g_video_url }
            })
            if (videoFile.filepath) {
              const resultPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`
              logger.mark(`[抖音] 开始烧录 ${danmakuList.length} 条弹幕...`)
              const success = await burnDouyinDanmaku(videoFile.filepath, danmakuList, resultPath, {
                danmakuArea: Config.douyin.danmakuArea,
                verticalMode: Config.douyin.verticalMode,
                videoCodec: Config.douyin.videoCodec,
                danmakuFontSize: Config.douyin.danmakuFontSize,
                danmakuOpacity: Config.douyin.danmakuOpacity
              })
              if (success) {
                const filePath = Common.tempDri.video + `${Config.app.removeCache ? 'tmp_' + Date.now() : g_title}.mp4`
                fs.renameSync(resultPath, filePath)
                await Common.removeFile(videoFile.filepath, true)
                const stats = fs.statSync(filePath)
                const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2))
                const { uploadFile } = await import('@/module/utils')
                if (fileSizeInMB > Config.upload.groupfilevalue) {
                  await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: g_title || '' }, '', { useGroupFile: true })
                } else {
                  await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: g_title || '' }, '')
                }
              } else {
                await Common.removeFile(videoFile.filepath, true)
              }
            }
          } else {
            // 不烧录弹幕，直接下载发送
            await downloadVideo(
              this.e,
              {
                video_url: g_video_url,
                title: {
                  timestampTitle: `tmp_${Date.now()}.mp4`,
                  originTitle: `${g_title}.mp4`
                },
                headers: {
                  ...baseHeaders,
                  Referer: g_video_url
                }
              },
              {
                message_id: this.e.messageId
              }
            )
          }
        }
        return true
      }

      case 'user_dynamic': {
        const rawData = await this.amagi.douyin.fetcher.fetchUserVideoList({
          sec_uid: data.sec_uid,
          typeMode: 'strict'
        })
        const userProfileData = await this.amagi.douyin.fetcher.fetchUserProfile({
          sec_uid: data.sec_uid,
          typeMode: 'strict'
        })

        const user = userProfileData.data.user

        // 转换视频列表数据
        const videos: UserVideoListData['videos'] = rawData.data.aweme_list.map(aweme => {
          const isVideo = aweme.aweme_type === 0 || aweme.media_type === 0

          return {
            aweme_id: aweme.aweme_id,
            is_top: aweme.is_top === 1,
            title: aweme.desc || aweme.item_title || '无标题',
            cover: aweme.video.cover.url_list[0],
            duration: aweme.video?.duration || 0,
            create_time: aweme.create_time,
            statistics: {
              like_count: aweme.statistics.digg_count,
              comment_count: aweme.statistics.comment_count,
              share_count: aweme.statistics.share_count,
              collect_count: aweme.statistics.collect_count
            },
            is_video: isVideo,
            music: aweme.music
              ? {
                title: aweme.music.title || '',
                author: aweme.music.author || ''
              }
              : undefined
          }
        })

        // 渲染视频列表页面
        const img = await Render('douyin/user_profile', {
          user: {
            head_image: user.cover_and_head_image_info.profile_cover_list.length > 0 ? user.cover_and_head_image_info.profile_cover_list[0].cover_url?.url_list[0] || null : null,
            nickname: user.nickname,
            short_id: user.unique_id === '' ? user.short_id : user.unique_id,
            avatar: user.avatar_larger?.url_list?.[0] || user.avatar_thumb?.url_list?.[0] || '',
            signature: user.signature,
            follower_count: user.follower_count,
            following_count: user.following_count,
            total_favorited: user.total_favorited,
            verified: !!user.custom_verify || !!user.enterprise_verify_reason,
            ip_location: user.ip_location
          },
          videos: videos.slice(0, 16)
        })

        this.e.reply(img)
        return true
      }
      case 'music_work': {
        const MusicData = await this.amagi.douyin.fetcher.fetchMusicInfo({
          music_id: data.music_id,
          typeMode: 'strict'
        })
        const sec_uid = MusicData.data.music_info.sec_uid
        const UserData = await this.amagi.douyin.fetcher.fetchUserProfile({ sec_uid, typeMode: 'strict' })
        // if (UserData.data.status_code === 2) {
        //   const new_UserData.data = await getDouyinData('搜索数据', Config.cookies.douyin, { query: data.music_info.author })
        //   if (new_UserData.data.data[0].type === 4 && new_UserData.data.data[0].card_unique_name === 'user') {
        //     UserData.data = { user: new_UserData.data.data[0].user_list[0].user_info }
        //   }
        //   const search_data = new_UserData.data
        // }
        if (!MusicData.data.music_info.play_url) {
          await this.e.reply('解析错误！该音乐抖音未提供下载链接，无法下载', { reply: true })
          return true
        }
        img = await Render('douyin/musicinfo',
          {
            image_url: MusicData.data.music_info.cover_hd.url_list[0],
            desc: MusicData.data.music_info.title,
            music_id: MusicData.data.music_info.id.toString(),
            create_time: Time(0),
            user_count: Count(MusicData.data.music_info.user_count),
            avater_url: MusicData.data.music_info.avatar_large?.url_list[0] || UserData.data.user.avatar_larger.url_list[0],
            fans: UserData.data.user.mplatform_followers_count || UserData.data.user.follower_count,
            following_count: UserData.data.user.following_count,
            total_favorited: UserData.data.user.total_favorited,
            user_shortid: UserData.data.user.unique_id === '' ? UserData.data.user.short_id : UserData.data.user.unique_id,
            share_url: MusicData.data.music_info.play_url.uri,
            username: MusicData.data.music_info?.original_musician_display_name || MusicData.data.music_info.owner_nickname === '' ? MusicData.data.music_info.author : MusicData.data.music_info.owner_nickname
          }
        )
        await this.e.reply(
          [
            ...img,
            `\n正在上传 ${MusicData.data.music_info.title}\n`,
            `作曲: ${MusicData.data.music_info.original_musician_display_name || MusicData.data.music_info.owner_nickname === '' ? MusicData.data.music_info.author : MusicData.data.music_info.owner_nickname}\n`,
            `music_id: ${MusicData.data.music_info.id}`
          ]
        )
        await this.e.reply(segment.record(MusicData.data.music_info.play_url.uri, false))
        return true
      }
      case 'live_room_detail': {
        const UserInfoData = await this.amagi.douyin.fetcher.fetchUserProfile({
          sec_uid: data.sec_uid,
          typeMode: 'strict'
        })
        if (UserInfoData.data.user.live_status === 1) {
          // 直播中
          if (!UserInfoData.data.user?.live_status || UserInfoData.data.user.live_status !== 1) {
            logger.error((UserInfoData?.data?.user?.nickname ?? '用户') + '当前未在直播')
          }
          if (!UserInfoData.data.user.room_data) {
            logger.error('未获取到直播间信息！')
          }

          const room_data = JSON.parse(UserInfoData.data.user.room_data)
          const live_data = await this.amagi.douyin.fetcher.fetchLiveRoomInfo({
            room_id: UserInfoData.data.user.room_id_str,
            web_rid: room_data.owner.web_rid,
            typeMode: 'strict'
          })

          const img = await Render('douyin/live',
            {
              image_url: live_data.data.data[0].cover?.url_list[0],
              text: live_data.data.data[0].title,
              liveinf: `${live_data.data.partition_road_map.partition.title} | 房间号: ${room_data.owner.web_rid}`,
              在线观众: Count(Number(live_data.data.data[0].room_view_stats?.display_value)),
              总观看次数: Count(Number(live_data.data.data[0].stats?.total_user_str)),
              username: UserInfoData.data.user.nickname,
              avater_url: UserInfoData.data.user.avatar_larger.url_list[0],
              fans: Count(UserInfoData.data.user.follower_count),
              share_url: 'https://live.douyin.com/' + room_data.owner.web_rid,
              dynamicTYPE: '直播间信息'
            }
          )
          await this.e.reply(img)
        } else {
          this.e.reply(`「${UserInfoData.data.user.nickname}」\n未开播，正在休息中~`)
        }
        return true
      }
      default:
        break
    }
  }
}

export const douyinProcessVideos = (videos: dyVideo[], videoQuality: string, maxAutoVideoSize?: number): dyVideo[] => {
  // 首先过滤掉所有 format 为 'dash' 的视频
  const mp4Videos = videos.filter(video => video.format !== 'dash')

  if (mp4Videos.length === 0) {
    logger.warn('没有找到可用的 mp4 格式视频')
    return videos.slice(0, 1) // 返回第一个视频作为备选
  }

  logger.debug(`过滤后剩余 ${mp4Videos.length} 个 mp4 格式视频`)

  // 定义画质等级映射，根据 gear_name 判断画质
  const getQualityLevel = (gearName: string): string => {
    // 4K 画质
    if (gearName.includes('lowest_4') || gearName.includes('2160')) return '4k'
    // 2K/1440p 画质  
    if (gearName.includes('1440') || gearName.includes('2k')) return '2k'
    // 1080p 画质
    if (gearName.includes('1080')) return '1080p'
    // 720p 画质
    if (gearName.includes('720')) return '720p'
    // 540p 画质
    if (gearName.includes('540')) return '540p'
    // 默认返回 540p
    return '540p'
  }

  // 按画质分组，并在每组内按文件大小排序（大的在前）
  const videosByQuality = new Map<string, dyVideo[]>()

  mp4Videos.forEach(video => {
    const quality = getQualityLevel(video.gear_name)
    if (!videosByQuality.has(quality)) {
      videosByQuality.set(quality, [])
    }
    videosByQuality.get(quality)!.push(video)
  })

  // 对每个画质组内的视频按文件大小排序（大的在前）
  videosByQuality.forEach((videos) => {
    videos.sort((a, b) => b.play_addr.data_size - a.play_addr.data_size)
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
        const suitableVideo = qualityVideos.find(video => video.play_addr.data_size <= sizeLimitBytes)
        if (suitableVideo) {
          logger.debug(`自动选择画质: ${quality}, 文件大小: ${(suitableVideo.play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`)
          return [suitableVideo]
        }
      }
    }

    // 如果没有找到符合大小限制的视频，选择最小的视频
    let smallestVideo = mp4Videos[0]
    mp4Videos.forEach(video => {
      if (video.play_addr.data_size < smallestVideo.play_addr.data_size) {
        smallestVideo = video
      }
    })
    logger.debug(`未找到符合大小限制的视频，选择最小视频: ${(smallestVideo.play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`)
    return [smallestVideo]
  }

  // 固定画质模式
  const targetQuality = videoQuality
  const targetVideos = videosByQuality.get(targetQuality)

  if (targetVideos && targetVideos.length > 0) {
    // 选择该画质下文件大小最大的视频
    logger.debug(`选择固定画质: ${targetQuality}, 文件大小: ${(targetVideos[0].play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`)
    return [targetVideos[0]]
  }

  // 如果没有找到目标画质，选择最接近的画质
  const qualityPriority = ['4k', '2k', '1080p', '720p', '540p']
  const targetIndex = qualityPriority.indexOf(targetQuality)

  // 先尝试向下找（更低画质）
  for (let i = targetIndex + 1; i < qualityPriority.length; i++) {
    const fallbackVideos = videosByQuality.get(qualityPriority[i])
    if (fallbackVideos && fallbackVideos.length > 0) {
      logger.debug(`目标画质 ${targetQuality} 不可用，降级到: ${qualityPriority[i]}`)
      return [fallbackVideos[0]]
    }
  }

  // 再尝试向上找（更高画质）
  for (let i = targetIndex - 1; i >= 0; i--) {
    const fallbackVideos = videosByQuality.get(qualityPriority[i])
    if (fallbackVideos && fallbackVideos.length > 0) {
      logger.debug(`目标画质 ${targetQuality} 不可用，升级到: ${qualityPriority[i]}`)
      return [fallbackVideos[0]]
    }
  }

  // 如果都没找到，返回第一个可用视频
  logger.warn('未找到任何匹配的画质，返回默认视频')
  return [mp4Videos[0]]
}

/**
 * 传递整数，返回x小时后的时间
 * @param {number} delay
 * @returns
 */
export const Time = (delay: number): string => {
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() + delay)

  const year = currentDate.getFullYear().toString()
  const month = (currentDate.getMonth() + 1).toString()
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

export const Emoji = (data: DyEmojiList) => {
  const ListArray = []

  for (const i of data.emoji_list) {
    const display_name = i.display_name
    const url = i.emoji_url.url_list[0]

    const Objject = {
      name: display_name,
      url
    }
    ListArray.push(Objject)
  }
  return ListArray
}

/**
 * 格式化视频统计信息为三行，每行两个数据项，并保持对齐
 */
const formatVideoStats = (digg_count: number, share_count: number, collect_count: number, comment_count: number, recommend_count: number): string => {
  // 计算每个数据项的文本
  const diggText = `❤ 点赞: ${Count(digg_count)}`
  const shareText = `🔄 转发: ${Count(share_count)}`
  const collectText = `⭐ 收藏: ${Count(collect_count)}`
  const commentText = `💬 评论: ${Count(comment_count)}`
  const recommendText = `👍 推荐: ${Count(recommend_count)}`

  // 找出第一列中最长的项的长度
  const firstColItems = [diggText, shareText]
  const maxFirstColLength = Math.max(...firstColItems.map(item => getStringDisplayWidth(item)))

  // 构建三行文本，确保第二列对齐
  const line1 = alignTwoColumns(diggText, shareText, maxFirstColLength)
  const line2 = alignTwoColumns(collectText, commentText, maxFirstColLength)
  const line3 = alignTwoColumns(recommendText, '', maxFirstColLength)

  return `${line1}\n${line2}\n${line3}`
}

/**
 * 对齐两列文本
 */
const alignTwoColumns = (col1: string, col2: string, targetLength: number): string => {
  // 计算需要添加的空格数量
  const col1Width = getStringDisplayWidth(col1)
  const spacesNeeded = targetLength - col1Width + 5 // 5是两列之间的固定间距

  // 添加空格使两列对齐
  return col1 + ' '.repeat(spacesNeeded) + col2
}

/**
 * 获取字符串在显示时的实际宽度
 * 考虑到不同字符的显示宽度不同（如中文、emoji等）
 */
const getStringDisplayWidth = (str: string): number => {
  let width = 0
  for (let i = 0; i < str.length; i++) {
    const code = str.codePointAt(i)
    if (!code) continue

    // 处理emoji和特殊Unicode字符
    if (code > 0xFFFF) {
      width += 2 // emoji通常占用2个字符宽度
      i++ // 跳过代理对的后半部分
    } else if ( // 处理中文字符和其他全角字符
      (code >= 0x3000 && code <= 0x9FFF) || // 中文字符范围
      (code >= 0xFF00 && code <= 0xFFEF) || // 全角ASCII、全角标点
      code === 0x2026 || // 省略号
      code === 0x2014 || // 破折号
      (code >= 0x2E80 && code <= 0x2EFF) || // CJK部首补充
      (code >= 0x3000 && code <= 0x303F) || // CJK符号和标点
      (code >= 0x31C0 && code <= 0x31EF) || // CJK笔画
      (code >= 0x3200 && code <= 0x32FF) || // 封闭式CJK字母和月份
      (code >= 0x3300 && code <= 0x33FF) || // CJK兼容
      (code >= 0xAC00 && code <= 0xD7AF) || // 朝鲜文音节
      (code >= 0xF900 && code <= 0xFAFF) || // CJK兼容表意文字
      (code >= 0xFE30 && code <= 0xFE4F) // CJK兼容形式
    ) {
      width += 2
    } else if (code === 0x200D || (code >= 0xFE00 && code <= 0xFE0F) || (code >= 0x1F3FB && code <= 0x1F3FF)) { // emoji修饰符和连接符
      width += 0 // 这些字符不增加宽度，它们是修饰符
    } else { // 普通ASCII字符
      width += 1
    }
  }
  return width
}