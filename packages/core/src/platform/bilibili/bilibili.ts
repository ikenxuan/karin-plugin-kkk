import fs from 'node:fs'

import {
  ArticleContent,
  BiliBangumiVideoInfo,
  BiliBangumiVideoPlayurlIsLogin,
  BiliBangumiVideoPlayurlNoLogin,
  bilibiliApiUrls,
  BiliBiliVideoPlayurlNoLogin,
  BiliDynamicCard,
  BiliDynamicInfo,
  BiliOneWork,
  BiliVideoPlayurlIsLogin,
  DynamicType,
  Result
} from '@ikenxuan/amagi'
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import karin, {
  common,
  ElementTypes,
  ImageElement,
  logger,
  Message,
  segment,
  SendMessage
} from 'node-karin'

import {
  Base,
  baseHeaders,
  buildGoogleMotionPhoto,
  Common,
  Count,
  downloadFile,
  downloadVideo,
  extractTotalBytesFromHeaders,
  fileInfo,
  fixM4sFile,
  loopVideoWithTransition,
  mergeVideoAudio,
  Networks,
  processImageUrl,
  Render,
  uploadFile
} from '@/module/utils'
import { bilibiliFetcher, SOFT_ERROR_CODES, softFetch } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'
import {
  bilibiliComments,
  BilibiliId,
  checkCk,
  genParams
} from '@/platform/bilibili'
import {
  type BiliDanmakuElem,
  burnBiliDanmaku,
  mergeAndBurnBili
} from '@/platform/bilibili/danmaku'
import { BilibiliDataTypes } from '@/types'

let img: ElementTypes[]
type videoDownloadUrlList = BiliVideoPlayurlIsLogin['data']['dash']['video']

export class Bilibili extends Base {
  e: Message
  type: any
  STATUS: any
  isVIP: boolean
  Type: BilibiliDataTypes[keyof BilibiliDataTypes]
  islogin: boolean
  downloadfilename: string
  /** 强制烧录弹幕（用于 #弹幕解析 命令） */
  forceBurnDanmaku: boolean
  get botadapter (): string {
    return this.e.bot?.adapter?.name
  }

  constructor (e: Message, data: any, options?: { forceBurnDanmaku?: boolean }) {
    super(e)
    this.e = e
    this.isVIP = false
    this.Type = data?.type
    this.islogin = data?.USER?.STATUS === 'isLogin'
    this.downloadfilename = ''
    this.forceBurnDanmaku = options?.forceBurnDanmaku ?? false
    this.headers!.Referer = 'https://www.bilibili.com/'
    this.headers!.Cookie = Config.cookies.bilibili
  }

  async BilibiliHandler (iddata: BilibiliId): Promise<boolean | undefined> {
    Config.app.parseTip && await this.e.reply('检测到B站链接，开始解析')
    switch (this.Type) {
      case 'one_video': {
        const infoData = await this.amagi.bilibili.fetcher.fetchVideoInfo({ bvid: iddata.bvid, typeMode: 'strict' })
        const playUrlData = await this.amagi.bilibili.fetcher.fetchVideoStreamUrl({
          avid: infoData.data.data.aid,
          cid: iddata.p ? (infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid) : infoData.data.data.cid,
          typeMode: 'strict'
        }) as Result<BiliVideoPlayurlIsLogin>
        // const playUrl = bilibiliApiUrls.视频流信息({ avid: infoData.data.aid, cid: infoData.data.cid })
        this.islogin = (await checkCk()).Status === 'isLogin'

        this.downloadfilename = infoData.data.data.title.substring(0, 50).replace(/[\\/:*?"<>|\r\n\s]/g, ' ')

        const nockData = await new Networks({
          url: bilibiliApiUrls.getVideoStream({
            avid: infoData.data.data.aid,
            cid: iddata.p ? (infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid) : infoData.data.data.cid
          }) + '&platform=html5',
          headers: this.headers
        }).getData() as Result<BiliBiliVideoPlayurlNoLogin>

        // 如果配置项不存在或长度为0，则不显示任何内容
        if (Config.bilibili.sendContent.some(content => content === 'info')) {
          if (Config.bilibili.videoInfoMode === 'text') {
            // 构建回复内容数组
            const replyContent: SendMessage = []
            const { coin, like, share, view, favorite, danmaku } = infoData.data.data.stat
            const coverUrl = await processImageUrl(infoData.data.data.pic, infoData.data.data.title)
            const contentMap = {
              cover: segment.image(coverUrl),
              title: segment.text(`\n📺 标题: ${infoData.data.data.title}\n`),
              author: segment.text(`\n👤 作者: ${infoData.data.data.owner.name}\n`),
              stats: segment.text(formatVideoStats(view, danmaku, like, coin, share, favorite)),
              desc: segment.text(`\n\n📝 简介: ${infoData.data.data.desc}`)
            }
            // 重新排序
            const fixedOrder: (keyof typeof contentMap)[] = ['cover', 'title', 'author', 'stats', 'desc']
            fixedOrder.forEach(item => {
              if (Config.bilibili.displayContent.includes(item) && contentMap[item]) {
                replyContent.push(contentMap[item])
              }
            })
            if (replyContent.length > 0) {
              this.e.reply(replyContent)
            }
          } else {
            // 渲染为图片
            const img = await Render(this.e, 'bilibili/videoInfo', {
              share_url: 'https://b23.tv/' + infoData.data.data.bvid,
              title: infoData.data.data.title,
              desc: infoData.data.data.desc,
              stat: infoData.data.data.stat,
              bvid: infoData.data.data.bvid,
              ctime: infoData.data.data.ctime,
              pic: infoData.data.data.pic,
              owner: infoData.data.data.owner
            })
            this.e.reply(img)
          }
        }

        let videoSize = ''
        let correctList!: {
          accept_description: string[]
          videoList: videoDownloadUrlList
        }

        if (this.islogin && (Config.bilibili.videoQuality > 64 || Config.bilibili.videoQuality === 0)) {
          /** 提取出视频流信息对象，并排除清晰度重复的视频流 */
          const simplify = playUrlData.data.data.dash.video.filter((item: { id: number }, index: any, self: any[]) => {
            return self.findIndex((t: { id: any }) => {
              return t.id === item.id
            }) === index
          })
          /** 替换原始的视频信息对象 */
          playUrlData.data.data.dash.video = simplify
          /** 给视频信息对象删除不符合条件的视频流 */
          correctList = await bilibiliProcessVideos({
            accept_description: playUrlData.data.data.accept_description,
            bvid: infoData.data.data.bvid,
            qn: Config.bilibili.videoQuality
          }, simplify, playUrlData.data.data.dash.audio[0].base_url)
          playUrlData.data.data.dash.video = correctList.videoList
          playUrlData.data.data.accept_description = correctList.accept_description
          /** 获取第一个视频流的大小 */
          videoSize = await getvideosize(correctList.videoList[0].base_url, playUrlData.data.data.dash.audio[0].base_url, infoData.data.data.bvid)
        } else {
          videoSize = (nockData.data.durl[0].size / (1024 * 1024)).toFixed(2)
        }
        if (Config.bilibili.sendContent.some(content => content === 'comment')) {
          const commentsData = await softFetch(
            () => this.amagi.bilibili.fetcher.fetchComments({
              number: Config.bilibili.numcomment,
              type: 1,
              oid: infoData.data.data.aid.toString(),
              typeMode: 'strict'
            }),
            [SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED]
          )
          if (commentsData.code === SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED) {
            this.e.reply('UP主已关闭评论区，无法获取评论')
          } else {
            const { comments: commentsdata, image_urls } = bilibiliComments(commentsData.data, infoData.data.data.owner.mid.toString())
            if (!commentsdata?.length) {
              this.e.reply('这个视频没有评论 ~')
            } else {
            // 收集评论区图片
              const messageElements = []
              if (Config.bilibili.commentImageCollection && image_urls.length > 0) {
                for (const [index, v] of image_urls.entries()) {
                  const imageUrl = await processImageUrl(v, infoData.data.data.title, index)
                  messageElements.push(segment.image(imageUrl))
                }
                const res = common.makeForward(
                  messageElements,
                  Config.app.fakeForward ? this.e.sender.userId : this.e.bot.account.selfId,
                  Config.app.fakeForward ? this.e.sender.nick : this.e.bot.account.name
                )
                await this.e.bot.sendForwardMsg(this.e.contact, res, {
                  source: '评论图片收集',
                  summary: `查看${messageElements.length}张图片`,
                  prompt: 'B站评论解析结果',
                  news: [{ text: '点击查看解析结果' }]
                })
              }

              img = await Render(this.e, 'bilibili/comment', {
                Type: '视频',
                CommentsData: commentsdata,
                CommentLength: Config.bilibili.realCommentCount ? Count(infoData.data.data.stat.reply) : String(commentsdata.length),
                share_url: 'https://b23.tv/' + infoData.data.data.bvid,
                Clarity: Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ?
                  nockData.data.accept_description[nockData.data.accept_description.length - 1] :
                  playUrlData.data.data.accept_description[0],
                VideoSize: Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ?
                  Common.formatFileSize((nockData.data.durl[0].size! / (1024 * 1024)).toFixed(2)) :
                  Common.formatFileSize(videoSize),
                ImageLength: 0,
                shareurl: 'https://b23.tv/' + infoData.data.data.bvid,
                Resolution: Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ?
                  null : `${playUrlData.data.data.dash.video[0].width} x ${playUrlData.data.data.dash.video[0].height}`
              })
              this.e.reply(img)
            }
          }
        }

        if (Config.bilibili.sendContent.some(content => content === 'video')) {
          if ((Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit)) && !Config.upload.compress) {
            this.e.reply(`设定的最大上传大小为 ${Config.upload.filelimit}MB\n当前解析到的视频大小为 ${Number(videoSize)}MB\n` + '视频太大了，还是去B站看吧~', { reply: true })
          } else {
            if (Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64) {
              this.islogin = false
            }
            // 获取弹幕数据
            let danmakuList: BiliDanmakuElem[] = []
            if (this.forceBurnDanmaku || Config.bilibili.burnDanmaku) {
              try {
                const cid = iddata.p ? (infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid) : infoData.data.data.cid
                // 获取视频时长（秒），计算需要获取的弹幕分段数（每6分钟一段）
                const duration = iddata.p ? (infoData.data.data.pages[iddata.p - 1]?.duration ?? infoData.data.data.duration) : infoData.data.data.duration
                const segmentCount = Math.ceil(duration / 360) // 360秒 = 6分钟
                logger.debug(`视频时长: ${duration}秒, 需要获取 ${segmentCount} 个弹幕分段`)

                // 并行获取所有分段的弹幕
                const danmakuPromises = Array.from({ length: segmentCount }, (_, i) =>
                  this.amagi.bilibili.fetcher.fetchVideoDanmaku({ cid, segment_index: i + 1, typeMode: 'strict' })
                    .then(res => res.data?.data?.elems || [])
                    .catch(() => [] as BiliDanmakuElem[])
                )
                const danmakuSegments = await Promise.all(danmakuPromises)
                danmakuList = danmakuSegments.flat()
                logger.debug(`获取到 ${danmakuList.length} 条弹幕（${segmentCount} 个分段）`)
              } catch (err) {
                logger.warn('获取弹幕失败，将不烧录弹幕', err)
              }
            }
            await this.getvideo(
              Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64
                ? { playUrlData: nockData.data, danmakuList }
                : { infoData: infoData.data, playUrlData: playUrlData.data, danmakuList })
          }
        }
        break
      }
      case 'bangumi_video_info': {
        const videoInfo = await this.amagi.bilibili.fetcher.fetchBangumiInfo({ [iddata.isEpid ? 'ep_id' : 'season_id']: iddata.realid, typeMode: 'strict' })
        this.islogin = (await checkCk()).Status === 'isLogin'
        this.isVIP = (await checkCk()).isVIP

        const Episodes = []
        for (const item of videoInfo.data.result.episodes) {
          Episodes.push({
            cover: item.cover,
            bvid: item.bvid,
            link: item.short_link,
            long_title: item.long_title,
            pub_time: item.pub_time,
            badge: item.badge === '' ? '限免' : item.badge,
            badge_info: item.badge_info
          })
        }
        img = await Render(this.e, 'bilibili/bangumi', {
          mainCover: videoInfo.data.result.cover,
          Actors: videoInfo.data.result.actors,
          Evaluate: videoInfo.data.result.evaluate,
          Link: videoInfo.data.result.link,
          newEP: videoInfo.data.result.new_ep,
          Title: videoInfo.data.result.title,
          Styles: videoInfo.data.result.styles,
          seasonID: videoInfo.data.result.season_id,
          subtitle: videoInfo.data.result.subtitle,
          UPInfo: videoInfo.data.result.up_info,
          Copyright: videoInfo.data.result.rights.copyright,
          Stat: videoInfo.data.result.stat,
          Episodes,
          length: videoInfo.data.result.episodes.length
        })
        this.e.reply([...img, segment.text('请在120秒内输入 第?集 选择集数')])
        const context = await karin.ctx(this.e, { reply: true, throwOnTimeout: false })
        if (!context) return true
        const regex = /第([一二三四五六七八九十百千万0-9]+)集/.exec(context.msg)
        let Episode
        if (regex && regex[1]) {
          Episode = regex[1]
          // 检查是否为中文数字，如果是则转换为阿拉伯数字
          if (/^[一二三四五六七八九十百千万]+$/.test(Episode)) {
            Episode = Common.chineseToArabic(Episode).toString()
          }
          this.downloadfilename = videoInfo.data.result.episodes[Number(Episode) - 1].share_copy.substring(0, 50).replace(/[\\/:*?"<>|\r\n\s]/g, ' ')
          this.e.reply(`收到请求，第${Episode}集\n${this.downloadfilename}\n正在下载中`)
        } else {
          logger.debug(Episode)
          this.e.reply('匹配内容失败，请重新发送链接再次解析')
          return true
        }
        const bangumidataBASEURL = bilibiliApiUrls.getBangumiStream({
          cid: videoInfo.data.result.episodes[Number(Episode) - 1].cid,
          ep_id: videoInfo.data.result.episodes[Number(Episode) - 1].ep_id.toString()
        })
        const Params = await genParams(bangumidataBASEURL)
        if (!this.islogin) this.e.reply('B站ck未配置或已失效，无法获取视频流，可尝试【#B站登录】以配置新ck')
        const playUrlData = await new Networks({
          url: bangumidataBASEURL + Params,
          headers: this.headers
        }).getData()
        if (videoInfo.data.result.episodes[Number(Episode) - 1].badge === '会员' && !this.isVIP) {
          logger.warn('该CK不是大会员，无法获取视频流')
          return true
        }
        if (Config.bilibili.videoQuality === 0) {
          /** 提取出视频流信息对象，并排除清晰度重复的视频流 */
          const simplify = playUrlData.result.dash.video.filter((item: { id: number }, index: any, self: any[]) => {
            return self.findIndex((t: { id: any }) => {
              return t.id === item.id
            }) === index
          })
          /** 替换原始的视频信息对象 */
          playUrlData.result.dash.video = simplify
          /** 给视频信息对象删除不符合条件的视频流 */
          const correctList = await bilibiliProcessVideos({
            accept_description: playUrlData.result.accept_description,
            bvid: videoInfo.data.result.season_id.toString(),
            qn: Config.bilibili.videoQuality
          }, simplify, playUrlData.result.dash.audio[0].base_url)
          playUrlData.result.dash.video = correctList.videoList
          playUrlData.result.cept_description = correctList.accept_description
        }
        await this.getvideo({
          infoData: videoInfo.data,
          playUrlData
        })
        break
      }
      case 'dynamic_info': {
        const dynamicInfo = await this.amagi.bilibili.fetcher.fetchDynamicDetail({ dynamic_id: iddata.dynamic_id, typeMode: 'strict' })
        const dynamicInfoCard = await this.amagi.bilibili.fetcher.fetchDynamicCard({ dynamic_id: dynamicInfo.data.data.item.id_str, typeMode: 'strict' })
        const dynamicCARD = JSON.parse(dynamicInfoCard.data.data.card.card)
        const userProfileData = await this.amagi.bilibili.fetcher.fetchUserCard({ host_mid: dynamicInfo.data.data.item.modules.module_author.mid, typeMode: 'strict' })

        switch (dynamicInfo.data.data.item.type) {
          /** 图文、纯图 */
          case DynamicType.DRAW: {
            const imgArray = []
            const temp: fileInfo[] = []
            let hasGeneratedLivePhoto = false // 标记是否生成了实况图
            const title = dynamicInfo.data.data.item.modules.module_dynamic.major.opus.title || 'bilibili_dynamic'
            for (const [index, img] of dynamicInfo.data.data.item.modules.module_dynamic.major.opus.pics.entries()) {
              if (img.url) {
                // Check if this is a live image with live_url
                if (img.live_url) {
                  // Process live image similar to douyin
                  const livePhoto = await downloadFile(img.live_url, {
                    title: `Bilibili_tmp_V_${Date.now()}_${index}.mp4`,
                    headers: baseHeaders
                  })

                  if (livePhoto.filepath) {
                    const outputPath = Common.tempDri.video + `Bilibili_Live_${Date.now()}_${index}.mp4`

                    // 下载原图用于静态显示
                    const staticImg = await downloadFile(img.url, {
                      title: `Bilibili_static_${Date.now()}_${index}.jpg`,
                      headers: baseHeaders,
                      filepath: Common.tempDri.images + `Bilibili_static_${Date.now()}_${index}.jpg`
                    })
                    if (staticImg.filepath) {
                      temp.push({ filepath: staticImg.filepath, totalBytes: 0 })
                    }

                    // 根据 livePhotoMode 配置决定处理方式
                    const livePhotoMode = Config.app.livePhotoMode ?? 'video_and_livephoto'
                    const shouldGenerateVideo = livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'video_only'
                    const shouldGenerateLivePhoto = livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'livephoto_only'

                    // Loop the live image 3 times with Live Photo effect
                    const loopCount = 3
                    if (!staticImg.filepath) {
                      await Common.removeFile(livePhoto.filepath, true)
                      continue
                    }

                    // 生成视频
                    if (shouldGenerateVideo) {
                      const result = await loopVideoWithTransition({
                        inputPath: livePhoto.filepath,
                        outputPath,
                        loopCount,
                        staticImagePath: staticImg.filepath,
                        transitionEnabled: loopCount > 1
                      })
                      const success = result.success

                      if (success) {
                        const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`
                        fs.renameSync(outputPath, filePath)
                        logger.mark(`视频文件重命名完成: ${outputPath.split('/').pop()} -> ${filePath.split('/').pop()}`)
                        temp.push({ filepath: filePath, totalBytes: 0 })
                        const videoPath = Config.upload.videoSendMode === 'base64'
                          ? `base64://${(fs.readFileSync(filePath)).toString('base64')}`
                          : `file://${filePath}`
                        imgArray.push(segment.video(videoPath))
                      }
                    }

                    // 生成实况图
                    if (shouldGenerateLivePhoto) {
                      let hasPushedMotionPhotoCover = false
                      if (staticImg.filepath) {
                        const motionPhotoCoverPath = Common.tempDri.images + `MVIMG_${format(new Date(), 'yyyyMMdd_HHmmss_SSS')}_${index}.jpg`
                        const motionPhotoCreated = await buildGoogleMotionPhoto({
                          imagePath: staticImg.filepath,
                          videoPath: livePhoto.filepath,
                          outputPath: motionPhotoCoverPath
                        })
                        if (motionPhotoCreated) {
                          temp.push({ filepath: motionPhotoCoverPath, totalBytes: 0 })
                          const motionPhotoCover = Config.upload.imageSendMode === 'base64'
                            ? `base64://${(fs.readFileSync(motionPhotoCoverPath)).toString('base64')}`
                            : `file://${motionPhotoCoverPath}`
                          imgArray.push(segment.image(motionPhotoCover))
                          hasPushedMotionPhotoCover = true
                        }
                      }
                      if (!hasPushedMotionPhotoCover) {
                        const imageUrl = await processImageUrl(img.url, title, index)
                        imgArray.push(segment.image(imageUrl))
                      } else {
                        hasGeneratedLivePhoto = true // 标记已生成实况图
                      }
                    }

                    logger.mark('正在尝试删除缓存文件')
                    await Common.removeFile(livePhoto.filepath, true)
                  }
                } else {
                  // Regular static image
                  const imageUrl = await processImageUrl(img.url, title, index)
                  imgArray.push(segment.image(imageUrl))
                }
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
              imgArray.push(segment.text(`💡 提示：保存原图到 ${tip} 即可识别为实况图`))
            }

            if (imgArray.length === 1) this.e.reply(imgArray[0])
            if (imgArray.length > 1) {
              const forwardMsg = common.makeForward(
                imgArray,
                Config.app.fakeForward ? this.e.sender.userId : this.e.bot.account.selfId,
                Config.app.fakeForward ? this.e.sender.nick : this.e.bot.account.name
              )
              try {
                await this.e.bot.sendForwardMsg(this.e.contact, forwardMsg, {
                  source: '图片合集',
                  summary: `查看${imgArray.length}张图片消息`,
                  prompt: 'B站图文动态解析结果',
                  news: [{ text: '点击查看解析结果' }]
                })
              } finally {
                for (const item of temp) {
                  await Common.removeFile(item.filepath, true)
                }
              }
            }

            const dynamicCARD = JSON.parse(dynamicInfoCard.data.data.card.card)

            if ('topic' in dynamicInfo.data.data.item.modules.module_dynamic && dynamicInfo.data.data.item.modules.module_dynamic.topic !== null) {
              const name = (dynamicInfo.data.data.item.modules.module_dynamic.topic as { name: string }).name
              dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.rich_text_nodes.unshift({
                orig_text: name,
                jump_url: '',
                text: name,
                type: 'topic'
              })
              dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text = `${name}\n\n` + dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text
            }
            this.e.reply(await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_DRAW', {
              image_url: dynamicCARD.item.pictures && cover(dynamicCARD.item.pictures),
              // TIP: 2025/08/20, 动态卡片数据中，图文动态的描述文本在 major.opus.summary 中
              title: dynamicInfo.data.data.item.modules.module_dynamic.major.opus.title ?? undefined,
              text: dynamicInfo.data.data.item.modules.module_dynamic.major
                ? replacetext(
                  br(dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.text ?? ''),
                  dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.rich_text_nodes ?? []
                )
                : '',
              dianzan: Count(dynamicInfo.data.data.item.modules.module_stat.like.count),
              pinglun: Count(dynamicInfo.data.data.item.modules.module_stat.comment.count),
              share: Count(dynamicInfo.data.data.item.modules.module_stat.forward.count),
              create_time: TimeFormatter.toRelative(dynamicInfo.data.data.item.modules.module_author.pub_ts),
              avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
              frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
              share_url: 'https://t.bilibili.com/' + dynamicInfo.data.data.item.id_str,
              username: checkvip(userProfileData.data.data.card),
              fans: Count(userProfileData.data.data.follower),
              user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
              total_favorited: Count(userProfileData.data.data.like_num),
              following_count: Count(userProfileData.data.data.card.attention),
              decoration_card: generateDecorationCard(dynamicInfo.data.data.item.modules.module_author.decoration_card),
              render_time: TimeFormatter.now(),
              dynamicTYPE: '图文动态',
              imageLayout: Config.bilibili.imageLayout,
              additional: parseAdditionalCard(dynamicInfo.data.data.item.modules.module_dynamic.additional)
            }))
            break
          }
          /** 纯文 */
          case DynamicType.WORD: {
            // 处理话题
            if ('topic' in dynamicInfo.data.data.item.modules.module_dynamic && dynamicInfo.data.data.item.modules.module_dynamic.topic !== null) {
              const name = (dynamicInfo.data.data.item.modules.module_dynamic.topic as { name: string }).name
              dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.rich_text_nodes.unshift({
                orig_text: name,
                jump_url: '',
                text: name,
                type: 'topic'
              })
              dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text = `${name}\n\n` + dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text
            }

            const text = replacetext(
              br(dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.text ?? ''),
              dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.rich_text_nodes ?? []
            )

            this.e.reply(
              await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_WORD', {
                text,
                dianzan: Count(dynamicInfo.data.data.item.modules.module_stat.like.count),
                pinglun: Count(dynamicInfo.data.data.item.modules.module_stat.comment.count),
                share: Count(dynamicInfo.data.data.item.modules.module_stat.forward.count),
                create_time: TimeFormatter.toRelative(dynamicInfo.data.data.item.modules.module_author.pub_ts),
                avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
                frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
                share_url: 'https://t.bilibili.com/' + dynamicInfo.data.data.item.id_str,
                username: checkvip(userProfileData.data.data.card),
                fans: Count(userProfileData.data.data.follower),
                user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
                total_favorited: Count(userProfileData.data.data.like_num),
                following_count: Count(userProfileData.data.data.card.attention),
                decoration_card: generateDecorationCard(dynamicInfo.data.data.item.modules.module_author.decoration_card),
                render_time: TimeFormatter.now(),
                dynamicTYPE: '纯文动态',
                additional: parseAdditionalCard(dynamicInfo.data.data.item.modules.module_dynamic.additional)
              })
            )
            break
          }
          /** 转发动态 */
          case DynamicType.FORWARD: {
            const text = replacetext(
              br(dynamicInfo.data.data.item.modules.module_dynamic.desc.text),
              dynamicInfo.data.data.item.modules.module_dynamic.desc.rich_text_nodes
            )

            // 富文本节点：查看图片
            const imgList = []
            for (const richTxtItem of dynamicInfo.data.data.item.modules.module_dynamic.desc.rich_text_nodes) {
              if (richTxtItem.type === 'RICH_TEXT_NODE_TYPE_VIEW_PICTURE') {
                for (const pic of richTxtItem.pics) {
                  imgList.push(pic.src)
                }
              }
            }
            let data = {}
            switch (dynamicInfo.data.data.item.orig.type) {
              case DynamicType.AV: {
                data = {
                  username: checkvip(dynamicInfo.data.data.item.orig.modules.module_author),
                  pub_action: dynamicInfo.data.data.item.orig.modules.module_author.pub_action,
                  avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
                  duration_text: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.duration_text,
                  title: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.title,
                  danmaku: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.danmaku,
                  view: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.view,
                  play: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.play,
                  cover: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.cover,
                  create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
                  decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
                  frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.DRAW: {
                const dynamicCARD2 = await this.amagi.bilibili.fetcher.fetchDynamicCard({ dynamic_id: dynamicInfo.data.data.item.orig.id_str, typeMode: 'strict' })
                const cardData = JSON.parse(dynamicCARD2.data.data.card.card)
                data = {
                  title: dynamicInfo.data.data.item.orig.modules.module_dynamic.major?.opus?.title ?? null,
                  username: checkvip(dynamicInfo.data.data.item.orig.modules.module_author),
                  create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
                  text: replacetext(br(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  image_url: cardData.item.pictures && cover(cardData.item.pictures),
                  decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
                  frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.WORD: {
                data = {
                  username: checkvip(dynamicInfo.data.data.item.orig.modules.module_author),
                  create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
                  text: replacetext(br(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
                  frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.LIVE_RCMD: {
                const liveData = JSON.parse(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.live_rcmd.content)
                data = {
                  username: checkvip(dynamicInfo.data.data.item.orig.modules.module_author),
                  create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
                  decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
                  frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image,
                  cover: liveData.live_play_info.cover,
                  text_large: liveData.live_play_info.watched_show.text_large,
                  area_name: liveData.live_play_info.area_name,
                  title: liveData.live_play_info.title,
                  online: liveData.live_play_info.online
                }
                break
              }
              case DynamicType.FORWARD:
              default: {
                logger.warn(`UP主：${userProfileData.data.data.card.name}的${logger.green('转发动态')}转发的原动态类型为「${logger.yellow(dynamicInfo.data.item.orig.type)}」暂未支持解析`)
                break
              }
            }
            this.e.reply(
              await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_FORWARD', {
                text,
                imgList: imgList.length > 0 ? imgList : null,
                dianzan: Count(dynamicInfo.data.data.item.modules.module_stat.like.count),
                pinglun: Count(dynamicInfo.data.data.item.modules.module_stat.comment.count),
                share: Count(dynamicInfo.data.data.item.modules.module_stat.forward.count),
                create_time: TimeFormatter.toRelative(dynamicInfo.data.data.item.modules.module_author.pub_ts),
                avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
                frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
                share_url: 'https://t.bilibili.com/' + dynamicInfo.data.data.item.id_str,
                username: checkvip(userProfileData.data.data.card),
                fans: Count(userProfileData.data.data.follower),
                user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
                total_favorited: Count(userProfileData.data.data.like_num),
                following_count: Count(userProfileData.data.data.card.attention),
                dynamicTYPE: '转发动态解析',
                decoration_card: generateDecorationCard(dynamicInfo.data.data.item.modules.module_author.decorate),
                render_time: TimeFormatter.now(),
                original_content: { [dynamicInfo.data.data.item.orig.type]: data }
              })
            )
            break
          }
          /** 视频动态 */
          case DynamicType.AV: {
            if (dynamicInfo.data.data.item.modules.module_dynamic.major.type === 'MAJOR_TYPE_ARCHIVE') {
              const bvid = dynamicInfo.data.data.item.modules.module_dynamic.major.archive.bvid
              const INFODATA = await bilibiliFetcher.fetchVideoInfo({ bvid, typeMode: 'strict' })
              const dycrad = dynamicInfoCard.data.data.card && dynamicInfoCard.data.data.card.card && JSON.parse(dynamicInfoCard.data.data.card.card)

              // 处理共创者信息
              let staff = undefined
              if (INFODATA.data.data.staff && Array.isArray(INFODATA.data.data.staff)) {
                const currentMid = dynamicInfo.data.data.item.modules.module_author.mid
                // 提取共创者信息
                staff = INFODATA.data.data.staff.map((member: any) => ({
                  mid: member.mid,
                  title: member.title,
                  name: member.name,
                  face: member.face,
                  follower: member.follower
                }))

                // 如果当前动态发布者是共创者之一，将其排到最前面
                const currentUserIndex = staff.findIndex((member: any) => member.mid === currentMid)
                if (currentUserIndex > 0) {
                  const currentUser = staff.splice(currentUserIndex, 1)[0]
                  staff.unshift(currentUser)
                }
              }

              img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_AV',
                {
                  image_url: INFODATA.data.data.pic,
                  text: br(INFODATA.data.data.title),
                  desc: br(dycrad.desc),
                  dianzan: Count(INFODATA.data.data.stat.like),
                  pinglun: Count(INFODATA.data.data.stat.reply),
                  share: Count(INFODATA.data.data.stat.share),
                  view: Count(dycrad.stat.view),
                  coin: Count(dycrad.stat.coin),
                  duration_text: dynamicInfo.data.data.item.modules.module_dynamic.major.archive.duration_text,
                  create_time: TimeFormatter.toDateTime(INFODATA.data.data.ctime),
                  avatar_url: userProfileData.data.data.card.face,
                  frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
                  share_url: 'https://www.bilibili.com/video/' + bvid,
                  username: checkvip(userProfileData.data.data.card),
                  fans: Count(userProfileData.data.data.follower),
                  user_shortid: userProfileData.data.data.card.mid,
                  total_favorited: Count(userProfileData.data.data.like_num),
                  following_count: Count(userProfileData.data.data.card.attention),
                  render_time: TimeFormatter.now(),
                  dynamicTYPE: '视频动态',
                  dynamic_id: dynamicInfo.data.data.item.id_str,
                  staff
                }
              )
              this.e.reply(img)
            }
            break
          }
          /** 直播动态 */
          case DynamicType.LIVE_RCMD: {
            const userINFO = await bilibiliFetcher.fetchUserCard({ host_mid: dynamicInfo.data.data.item.modules.module_author.mid, typeMode: 'strict' })
            img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
              {
                image_url: dynamicCARD.live_play_info.cover,
                text: br(dynamicCARD.live_play_info.title),
                liveinf: br(`${dynamicCARD.live_play_info.area_name} | 房间号: ${dynamicCARD.live_play_info.room_id}`),
                username: checkvip(userINFO.data.data.card),
                avatar_url: userINFO.data.data.card.face,
                frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
                fans: Count(userINFO.data.data.follower),
                create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.modules.module_author.pub_ts),
                now_time: TimeFormatter.now(),
                share_url: 'https://live.bilibili.com/' + dynamicCARD.live_play_info.room_id,
                dynamicTYPE: '直播动态'
              }
            )
            this.e.reply(img)
            break
          }
          /** 文章/专栏动态 */
          case DynamicType.ARTICLE: {
            const articleInfoBase = await this.amagi.bilibili.fetcher.fetchArticleInfo({ id: dynamicInfo.data.data.item.basic.rid_str, typeMode: 'strict' })
            const articleInfo = await this.amagi.bilibili.fetcher.fetchArticleContent({ id: dynamicInfo.data.data.item.basic.rid_str, typeMode: 'strict' })

            // 提取专栏基本信息
            const articleData = articleInfoBase.data.data
            // 提取专栏正文内容
            const articleContent = articleInfo.data.data

            // 提取所有图片
            const messageElements: ImageElement[] = []
            const articleImages = extractArticleImages(articleContent)
            const title = articleData.title || 'bilibili_article'
            for (const [index, item] of articleImages.entries()) {
              const imageUrl = await processImageUrl(item, title, index)
              messageElements.push(segment.image(imageUrl))
            }

            if (messageElements.length === 1) this.e.reply(messageElements[0])
            if (messageElements.length > 1) {
              const forwardMsg = common.makeForward(
                messageElements,
                Config.app.fakeForward ? this.e.sender.userId : this.e.bot.account.selfId,
                Config.app.fakeForward ? this.e.sender.nick : this.e.bot.account.name
              )
              await this.e.bot.sendForwardMsg(this.e.contact, forwardMsg, {
                source: '图片合集',
                summary: `查看${messageElements.length}张图片消息`,
                prompt: 'B站专栏动态解析结果',
                news: [{ text: '点击查看解析结果' }]
              })
            }

            // 构建渲染数据
            const img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_ARTICLE',
              {
                // 用户信息
                username: checkvip(userProfileData.data.data.card),
                avatar_url: userProfileData.data.data.card.face,
                frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
                create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.modules.module_author.pub_ts),

                // 专栏内容信息
                title: articleData.title,
                summary: articleData.summary,
                banner_url: articleData.banner_url || (articleData.image_urls && articleData.image_urls[0]) || '',
                categories: articleData.categories || [],
                words: articleData.words || 0,

                // 专栏正文内容 - 优先使用opus，否则使用content
                opus: articleContent.opus || undefined,
                content: articleContent.content || undefined,
                // 统计信息
                stats: articleData.stats,
                render_time: TimeFormatter.now(),
                // 分享链接
                share_url: articleContent.dyn_id_str ? `https://www.bilibili.com/opus/${articleContent.dyn_id_str}` : `https://www.bilibili.com/read/cv${articleContent.id}`,
                dynamicTYPE: '专栏动态解析',

                // 用户统计信息
                user_shortid: userProfileData.data.data.card.mid,
                total_favorited: Count(userProfileData.data.data.like_num),
                following_count: Count(userProfileData.data.data.card.friend),
                fans: Count(userProfileData.data.data.card.fans)
              }
            )
            this.e.reply(img)
            break
          }
          default: {
            const unknownItem = dynamicInfo.data.data.item as any
            this.e.reply(`该动态类型「${unknownItem.type}」暂未支持解析，可通过 https://github.com/ikenxuan/karin-plugin-kkk/issues/new/choose 提交反馈`)
            break
          }
        }

        // 统一处理评论（直播动态除外）
        if (Config.bilibili.sendContent.some(content => content === 'comment') && dynamicInfo.data.data.item.type !== DynamicType.LIVE_RCMD) {
          const commentsData = await softFetch(
            () => this.amagi.bilibili.fetcher.fetchComments({
              type: mapping_table(dynamicInfo.data.data.item.type),
              oid: oid(dynamicInfo.data, dynamicInfoCard.data),
              number: Config.bilibili.numcomment,
              typeMode: 'strict'
            }),
            [SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED]
          )
          if (commentsData.code === SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED) {
            this.e.reply('UP主已关闭评论区，无法获取评论')
          } else {
            const { comments: commentsdata, image_urls } = bilibiliComments(commentsData.data, dynamicInfo.data.data.item.modules.module_author.mid.toString())

            if (commentsdata && commentsdata.length > 0) {
            // 收集评论区图片
              if (Config.bilibili.commentImageCollection && image_urls.length > 0) {
                const messageElements = []
                // 获取动态标题用于图片命名
                let title = 'bilibili_dynamic'
                if (dynamicInfo.data.data.item.type === DynamicType.DRAW) {
                  title = dynamicInfo.data.data.item.modules.module_dynamic.major.opus.title || 'bilibili_dynamic'
                } else if (dynamicInfo.data.data.item.type === DynamicType.AV) {
                  title = dynamicInfo.data.data.item.modules.module_dynamic.major.archive.title || 'bilibili_dynamic'
                }

                for (const [index, v] of image_urls.entries()) {
                  const imageUrl = await processImageUrl(v, title, index)
                  messageElements.push(segment.image(imageUrl))
                }
                const res = common.makeForward(
                  messageElements,
                  Config.app.fakeForward ? this.e.sender.userId : this.e.bot.account.selfId,
                  Config.app.fakeForward ? this.e.sender.nick : this.e.bot.account.name
                )
                await this.e.bot.sendForwardMsg(this.e.contact, res, {
                  source: '评论图片收集',
                  summary: `查看${messageElements.length}张图片`,
                  prompt: 'B站评论解析结果',
                  news: [{ text: '点击查看解析结果' }]
                })
              }

              // 渲染评论图
              const img = await Render(this.e, 'bilibili/comment', {
                Type: '动态',
                CommentsData: commentsdata,
                CommentLength: String(commentsdata.length),
                share_url: dynamicInfo.data.data.item.type === DynamicType.AV
                  ? `https://www.bilibili.com/video/${dynamicInfo.data.data.item.modules.module_dynamic.major.archive.bvid}`
                  : `https://t.bilibili.com/${dynamicInfo.data.data.item.id_str}`,
                ImageLength: dynamicInfo.data.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? 0,
                shareurl: '动态分享链接',
                Resolution: null
              })
              this.e.reply(img)
            } else {
              this.e.reply('这条动态暂时还没有评论~')
            }
          }
        }

        break
      }
      case 'live_room_detail': {
        const liveInfo = await this.amagi.bilibili.fetcher.fetchLiveRoomInfo({ room_id: iddata.room_id, typeMode: 'strict' })
        const roomInitInfo = await this.amagi.bilibili.fetcher.fetchLiveRoomInitInfo({ room_id: iddata.room_id, typeMode: 'strict' })
        const userProfileData = await this.amagi.bilibili.fetcher.fetchUserCard({ host_mid: roomInitInfo.data.data.uid, typeMode: 'strict' })

        if (roomInitInfo.data.data.live_status === 0) {
          this.e.reply(`「${userProfileData.data.data.card.name}」\n未开播，正在休息中~`)
          return true
        }
        const img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
          {
            image_url: liveInfo.data.data.user_cover,
            text: br(liveInfo.data.data.title),
            liveinf: br(`${liveInfo.data.data.area_name} | 房间号: ${liveInfo.data.data.room_id}`),
            username: userProfileData.data.data.card.name,
            avatar_url: userProfileData.data.data.card.face,
            frame: userProfileData.data.data.card.pendant.image,
            fans: Count(userProfileData.data.data.card.fans),
            create_time: liveInfo.data.data.live_time === '-62170012800' ? '获取失败' : liveInfo.data.data.live_time,
            now_time: TimeFormatter.now(),
            share_url: 'https://live.bilibili.com/' + liveInfo.data.data.room_id,
            dynamicTYPE: '直播'
          }
        )
        this.e.reply(img)
        break
      }
      default:
        break
    }
  }

  async getvideo ({ infoData, playUrlData, danmakuList = [] }: { infoData?: BiliBangumiVideoInfo | BiliOneWork, playUrlData: BiliVideoPlayurlIsLogin | BiliBiliVideoPlayurlNoLogin | BiliBangumiVideoPlayurlIsLogin | BiliBangumiVideoPlayurlNoLogin, danmakuList?: BiliDanmakuElem[] }) {
    /** 获取视频 => FFmpeg合成 */
    logger.debug('是否登录:', this.islogin)
    switch (this.islogin) {
      case true: {
        logger.debug('视频 URL:', this.Type === 'one_video' ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url)

        // B站 CDN 需要正确的 Referer
        const downloadHeaders = {
          ...this.headers,
          Referer: 'https://www.bilibili.com'
        }

        const bmp4Raw = await downloadFile(
          this.Type === 'one_video' ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url,
          {
            title: `Bil_V_${this.Type === 'one_video' ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.m4s`,
            headers: downloadHeaders
          }
        )

        // 修复 m4s 文件为标准 MP4
        const videoPath = Common.tempDri.video + `Bil_V_${this.Type === 'one_video' ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`
        const videoFixed = await fixM4sFile(bmp4Raw.filepath, videoPath)
        if (!videoFixed) {
          logger.error('视频文件修复失败')
          return false
        }
        // 删除原始 m4s 文件
        await Common.removeFile(bmp4Raw.filepath, true)

        logger.debug('音频 URL:', this.Type === 'one_video' ? playUrlData.data?.dash?.audio[0].base_url : playUrlData.result.dash.audio[0].base_url)
        const bmp3Raw = await downloadFile(
          this.Type === 'one_video' ? playUrlData.data?.dash?.audio[0].base_url : playUrlData.result.dash.audio[0].base_url,
          {
            title: `Bil_A_${this.Type === 'one_video' ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.m4s`,
            headers: downloadHeaders
          }
        )

        // 修复音频 m4s 文件为 m4a（AAC 音频不能直接转为 MP3 容器）
        const audioPath = Common.tempDri.video + `Bil_A_${this.Type === 'one_video' ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.m4a`
        const audioFixed = await fixM4sFile(bmp3Raw.filepath, audioPath)
        if (!audioFixed) {
          logger.error('音频文件修复失败')
          return false
        }
        // 删除原始 m4s 文件
        await Common.removeFile(bmp3Raw.filepath, true)

        const bmp4 = { filepath: videoPath, totalBytes: bmp4Raw.totalBytes }
        const bmp3 = { filepath: audioPath, totalBytes: bmp3Raw.totalBytes }

        if (bmp4.filepath && bmp3.filepath) {
          // 根据是否有弹幕数据选择合成方式
          const hasDanmaku = (this.forceBurnDanmaku || Config.bilibili.burnDanmaku) && danmakuList.length > 0
          const resultPath = Common.tempDri.video + `Bil_Result_${this.Type === 'one_video' ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`
          let success: boolean
          if (hasDanmaku) {
            logger.debug(`开始合成视频并烧录 ${danmakuList.length} 条弹幕...`)
            success = await mergeAndBurnBili(bmp4.filepath, bmp3.filepath, danmakuList, resultPath, {
              danmakuArea: Config.bilibili.danmakuArea,
              verticalMode: Config.bilibili.verticalMode,
              videoCodec: Config.bilibili.videoCodec,
              danmakuFontSize: Config.bilibili.danmakuFontSize,
              danmakuOpacity: Config.bilibili.danmakuOpacity
            })
          } else {
            success = await mergeVideoAudio(bmp4.filepath, bmp3.filepath, resultPath)
          }

          if (success) {
            const filePath = Common.tempDri.video + `${Config.app.removeCache ? 'tmp_' + Date.now() : this.downloadfilename}.mp4`
            fs.renameSync(resultPath, filePath)
            logger.mark(`视频文件重命名完成: ${resultPath.split('/').pop()} -> ${filePath.split('/').pop()}`)
            logger.mark('正在尝试删除缓存文件')
            await Common.removeFile(bmp4.filepath, true)
            await Common.removeFile(bmp3.filepath, true)

            const stats = fs.statSync(filePath)
            const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2))
            if (fileSizeInMB > Config.upload.groupfilevalue) {
              // 使用文件上传
              await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, '', { useGroupFile: true })
            } else {
              /** 因为本地合成，没有视频直链 */
              await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, '')
            }
          } else {
            await Common.removeFile(bmp4.filepath, true)
            await Common.removeFile(bmp3.filepath, true)
          }
        }
        break
      }
      case false: {
        /** 没登录（没配置ck）情况下直接发直链，传直链在DownLoadVideo()处理 */
        logger.debug('视频 URL:', playUrlData.durl[0].url)
        // 如果需要烧录弹幕，先下载视频再烧录
        if ((this.forceBurnDanmaku || Config.bilibili.burnDanmaku) && danmakuList.length > 0) {
          const videoFile = await downloadFile(playUrlData.durl[0].url, {
            title: `Bil_V_tmp_${Date.now()}.mp4`,
            headers: this.headers
          })
          if (videoFile.filepath) {
            const resultPath = Common.tempDri.video + `Bil_Result_${Date.now()}.mp4`
            logger.mark(`开始烧录 ${danmakuList.length} 条弹幕...`)
            const success = await burnBiliDanmaku(videoFile.filepath, danmakuList, resultPath, {
              danmakuArea: Config.bilibili.danmakuArea,
              verticalMode: Config.bilibili.verticalMode,
              videoCodec: Config.bilibili.videoCodec,
              danmakuFontSize: Config.bilibili.danmakuFontSize,
              danmakuOpacity: Config.bilibili.danmakuOpacity
            })
            if (success) {
              const filePath = Common.tempDri.video + `${Config.app.removeCache ? 'tmp_' + Date.now() : this.downloadfilename}.mp4`
              fs.renameSync(resultPath, filePath)
              await Common.removeFile(videoFile.filepath, true)
              const stats = fs.statSync(filePath)
              const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2))
              if (fileSizeInMB > Config.upload.groupfilevalue) {
                await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, '', { useGroupFile: true })
              } else {
                await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, '')
              }
            } else {
              await Common.removeFile(videoFile.filepath, true)
            }
          }
        } else {
          await downloadVideo(this.e, { video_url: playUrlData.durl[0].url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${this.downloadfilename}.mp4` } })
        }
        break
      }
      default:
        break
    }
  }
}

const checkvip = (member: any) => {
  return member.vip.status === 1
    ? `<span style="color: ${member.vip.nickname_color ?? '#FB7299'}; font-weight: 700;">${member.name}</span>`
    : `<span style="color: ${Common.useDarkTheme() ? '#e9e9e9' : '#313131'}; font-weight: 700;">${member.name}</span>`
}

const br = (data: string) => {
  return (data = data.replace(/\n/g, '<br>'))
}

/**
 * 时间格式化工具函数集合
 */
export const TimeFormatter = {
  /**
   * 格式化Unix时间戳为相对时间（如"2小时前"）
   * @param timestamp Unix时间戳（秒）
   * @returns 格式化后的相对时间字符串
   */
  toRelative: (timestamp: number): string => {
    try {
      const date = fromUnixTime(timestamp)
      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: zhCN
      })
    } catch (error) {
      logger.warn('相对时间格式化失败:', error)
      return TimeFormatter.toDateTime(timestamp)
    }
  },

  /**
   * 格式化Unix时间戳为日期时间（yyyy-MM-dd HH:mm）
   * @param timestamp Unix时间戳（秒）
   * @returns 格式化后的日期时间字符串
   */
  toDateTime: (timestamp: number): string => {
    try {
      return format(fromUnixTime(timestamp), 'yyyy-MM-dd HH:mm')
    } catch (error) {
      logger.warn('日期时间格式化失败:', error)
      return '时间格式错误'
    }
  },

  /**
   * 格式化当前时间为日期时间（yyyy-MM-dd HH:mm:ss）
   * @returns 格式化后的当前时间字符串
   */
  now: (): string => {
    try {
      return format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    } catch (error) {
      logger.warn('当前时间格式化失败:', error)
      return new Date().toISOString()
    }
  }
}

export const replacetext = (text: string, rich_text_nodes: any[]) => {
  for (const tag of rich_text_nodes) {
    // 对正则表达式中的特殊字符进行转义
    const escapedText = tag.orig_text.replace(/([.*+?^${}()|[\]\\])/g, '\\$1').replace(/\n/g, '\\n')
    const regex = new RegExp(escapedText, 'g')
    switch (tag.type) {
      case 'topic': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width: 80px;height: 80px;margin: 0 -25px -25px 0;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="opus-module-topic__icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4302 2.57458C11.4416 2.51023 11.4439 2.43974 11.4218 2.3528C11.3281 1.98196 10.9517 1.72037 10.5284 1.7527C10.432 1.76018 10.3599 1.78383 10.297 1.81376C10.2347 1.84398 10.1832 1.88155 10.1401 1.92465C10.1195 1.94485 10.1017 1.96692 10.0839 1.98897L10.0808 1.99289L10.0237 2.06277L9.91103 2.2033C9.76177 2.39141 9.61593 2.58191 9.47513 2.77556C9.33433 2.96936 9.19744 3.16585 9.06672 3.36638C9.00275 3.46491 8.93968 3.56401 8.87883 3.66461L8.56966 3.6613C8.00282 3.6574 7.43605 3.65952 6.86935 3.67034C6.80747 3.56778 6.74325 3.46677 6.67818 3.3664C6.54732 3.16585 6.41045 2.96934 6.26968 2.77568C6.12891 2.58186 5.98309 2.39134 5.83387 2.20322L5.72122 2.06268L5.66416 1.99279L5.6622 1.99036C5.64401 1.96783 5.62586 1.94535 5.60483 1.92454C5.56192 1.88144 5.51022 1.84388 5.44797 1.81364C5.38522 1.78386 5.31305 1.76006 5.21665 1.75273C4.80555 1.72085 4.4203 1.97094 4.32341 2.35273C4.30147 2.43968 4.30358 2.51018 4.31512 2.57453C4.32715 2.63859 4.34975 2.69546 4.38112 2.74649C4.39567 2.77075 4.41283 2.79315 4.42999 2.81557C4.43104 2.81694 4.43209 2.81831 4.43314 2.81968L4.48759 2.89122L4.59781 3.03355C4.74589 3.22242 4.89739 3.40905 5.05377 3.59254C5.09243 3.63788 5.13136 3.68306 5.17057 3.72785C4.99083 3.73681 4.81112 3.7467 4.63143 3.75756C4.41278 3.771 4.19397 3.78537 3.97547 3.80206L3.64757 3.82786L3.48362 3.84177L3.39157 3.85181C3.36984 3.8543 3.34834 3.8577 3.32679 3.86111C3.31761 3.86257 3.30843 3.86402 3.29921 3.86541C3.05406 3.90681 2.81526 3.98901 2.59645 4.10752C2.37765 4.22603 2.17867 4.38039 2.00992 4.56302C1.84117 4.74565 1.70247 4.95593 1.60144 5.18337C1.50025 5.4105 1.43687 5.65447 1.41362 5.90153C1.33103 6.77513 1.27663 7.6515 1.25742 8.5302C1.23758 9.40951 1.25835 10.2891 1.3098 11.1655C1.32266 11.3846 1.33738 11.6035 1.35396 11.8223L1.38046 12.1505L1.39472 12.3144L1.39658 12.335L1.39906 12.3583L1.40417 12.4048C1.40671 12.4305 1.41072 12.4558 1.41473 12.4811C1.41561 12.4866 1.41648 12.4922 1.41734 12.4977C1.45717 12.7449 1.53806 12.9859 1.65567 13.2074C1.77314 13.4289 1.92779 13.6304 2.11049 13.8022C2.29319 13.974 2.50441 14.1159 2.73329 14.2197C2.96201 14.3235 3.2084 14.3901 3.45836 14.4135C3.47066 14.415 3.48114 14.4159 3.49135 14.4167C3.49477 14.417 3.49817 14.4173 3.50159 14.4176L3.5425 14.4212L3.62448 14.4283L3.78843 14.4417L4.11633 14.4674C4.33514 14.4831 4.55379 14.4983 4.7726 14.5111C6.52291 14.6145 8.27492 14.6346 10.0263 14.5706C10.4642 14.5547 10.9019 14.5332 11.3396 14.5062C11.5584 14.4923 11.7772 14.4776 11.9959 14.4604L12.3239 14.434L12.4881 14.4196L12.5813 14.4093C12.6035 14.4065 12.6255 14.403 12.6474 14.3995C12.6565 14.3981 12.6655 14.3966 12.6746 14.3952C12.9226 14.3527 13.1635 14.2691 13.3844 14.1486C13.6052 14.0284 13.8059 13.8716 13.9759 13.6868C14.1463 13.5022 14.2861 13.2892 14.3874 13.0593C14.4381 12.9444 14.4793 12.8253 14.5108 12.7037C14.519 12.6734 14.5257 12.6428 14.5322 12.612L14.5421 12.566L14.55 12.5196C14.5556 12.4887 14.5607 12.4578 14.5641 12.4266C14.5681 12.3959 14.5723 12.363 14.5746 12.3373C14.6642 11.4637 14.7237 10.5864 14.7435 9.70617C14.764 8.825 14.7347 7.94337 14.6719 7.06715C14.6561 6.8479 14.6385 6.62896 14.6183 6.41033L14.5867 6.08246L14.5697 5.91853L14.5655 5.87758C14.5641 5.86445 14.5618 5.8473 14.5599 5.83231C14.5588 5.8242 14.5578 5.81609 14.5567 5.80797C14.5538 5.78514 14.5509 5.76229 14.5466 5.7396C14.5064 5.49301 14.4252 5.25275 14.3067 5.03242C14.1886 4.81208 14.0343 4.61153 13.8519 4.44095C13.6695 4.27038 13.4589 4.12993 13.2311 4.02733C13.0033 3.92458 12.7583 3.85907 12.5099 3.83636C12.4974 3.83492 12.4865 3.83394 12.4759 3.833C12.4729 3.83273 12.4698 3.83246 12.4668 3.83219L12.4258 3.82879L12.3438 3.82199L12.1798 3.80886L11.8516 3.78413C11.633 3.76915 11.4143 3.75478 11.1955 3.74288C10.993 3.73147 10.7904 3.72134 10.5878 3.71243L10.6914 3.59236C10.8479 3.40903 10.9992 3.22242 11.1473 3.03341L11.2576 2.89124L11.312 2.81971C11.3136 2.81773 11.3151 2.81575 11.3166 2.81377C11.3333 2.79197 11.3501 2.77013 11.3641 2.74653C11.3954 2.6955 11.418 2.63863 11.4302 2.57458ZM9.33039 5.49268C9.38381 5.16945 9.67705 4.95281 9.98536 5.00882L9.98871 5.00944C10.2991 5.06783 10.5063 5.37802 10.4524 5.70377L10.2398 6.99039L11.3846 6.9904C11.7245 6.9904 12 7.27925 12 7.63557C12 7.99188 11.7245 8.28073 11.3846 8.28073L10.0266 8.28059L9.7707 9.82911L11.0154 9.82913C11.3553 9.82913 11.6308 10.118 11.6308 10.4743C11.6308 10.8306 11.3553 11.1195 11.0154 11.1195L9.55737 11.1195L9.32807 12.5073C9.27465 12.8306 8.98141 13.0472 8.6731 12.9912L8.66975 12.9906C8.35937 12.9322 8.1522 12.622 8.20604 12.2962L8.40041 11.1195H6.89891L6.66961 12.5073C6.61619 12.8306 6.32295 13.0472 6.01464 12.9912L6.01129 12.9906C5.7009 12.9322 5.49374 12.622 5.54758 12.2962L5.74196 11.1195L4.61538 11.1195C4.27552 11.1195 4 10.8306 4 10.4743C4 10.118 4.27552 9.82913 4.61538 9.82913L5.95514 9.82911L6.21103 8.28059L4.98462 8.28073C4.64475 8.28073 4.36923 7.99188 4.36923 7.63557C4.36923 7.27925 4.64475 6.9904 4.98462 6.9904L6.42421 6.99039L6.67193 5.49268C6.72535 5.16945 7.01859 4.95281 7.3269 5.00882L7.33025 5.00944C7.64063 5.06783 7.8478 5.37802 7.79396 5.70377L7.58132 6.99039H9.08281L9.33039 5.49268ZM8.61374 9.82911L8.86963 8.28059H7.36813L7.11225 9.82911H8.61374Z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_TOPIC':
      case 'RICH_TEXT_NODE_TYPE_AT': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};">${tag.orig_text}</span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_LOTTERY': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width: 65px;height: 65px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M3.7499750000000005 9.732083333333334C4.095158333333333 9.732083333333334 4.374975 10.011875000000002 4.374975 10.357083333333334L4.374975 15.357083333333334C4.374975 15.899458333333335 4.8147 16.339166666666667 5.357116666666667 16.339166666666667L14.642833333333334 16.339166666666667C15.185250000000002 16.339166666666667 15.625 15.899458333333335 15.625 15.357083333333334L15.625 10.357083333333334C15.625 10.011875000000002 15.904791666666668 9.732083333333334 16.25 9.732083333333334C16.595166666666668 9.732083333333334 16.875 10.011875000000002 16.875 10.357083333333334L16.875 15.357083333333334C16.875 16.589833333333335 15.875625000000001 17.589166666666667 14.642833333333334 17.589166666666667L5.357116666666667 17.589166666666667C4.124341666666667 17.589166666666667 3.124975 16.589833333333335 3.124975 15.357083333333334L3.124975 10.357083333333334C3.124975 10.011875000000002 3.4048 9.732083333333334 3.7499750000000005 9.732083333333334z" fill="currentColor"></path><path d="M2.4106916666666667 7.3214250000000005C2.4106916666666667 6.384516666666666 3.1702083333333335 5.625 4.107116666666667 5.625L15.892833333333334 5.625C16.82975 5.625 17.58925 6.384516666666666 17.58925 7.3214250000000005L17.58925 8.917583333333335C17.58925 9.74225 16.987583333333337 10.467208333333334 16.13125 10.554C15.073666666666668 10.661208333333335 13.087708333333333 10.803583333333334 10 10.803583333333334C6.912275 10.803583333333334 4.9263 10.661208333333335 3.8687250000000004 10.554C3.0123833333333336 10.467208333333334 2.4106916666666667 9.74225 2.4106916666666667 8.917583333333335L2.4106916666666667 7.3214250000000005zM4.107116666666667 6.875C3.8605666666666667 6.875 3.6606916666666667 7.0748750000000005 3.6606916666666667 7.3214250000000005L3.6606916666666667 8.917583333333335C3.6606916666666667 9.135250000000001 3.8040833333333333 9.291041666666667 3.9947583333333334 9.310375C5.0068 9.412958333333334 6.950525000000001 9.553583333333334 10 9.553583333333334C13.049458333333334 9.553583333333334 14.993166666666669 9.412958333333334 16.005166666666668 9.310375C16.195875 9.291041666666667 16.33925 9.135250000000001 16.33925 8.917583333333335L16.33925 7.3214250000000005C16.33925 7.0748750000000005 16.139375 6.875 15.892833333333334 6.875L4.107116666666667 6.875z" fill="currentColor"></path><path d="M5.446408333333333 4.464341666666667C5.446408333333333 3.1329416666666665 6.525716666666667 2.0536333333333334 7.857116666666667 2.0536333333333334C9.188541666666666 2.0536333333333334 10.267833333333334 3.1329416666666665 10.267833333333334 4.464341666666667L10.267833333333334 6.875058333333333L7.857116666666667 6.875058333333333C6.525716666666667 6.875058333333333 5.446408333333333 5.795741666666666 5.446408333333333 4.464341666666667zM7.857116666666667 3.3036333333333334C7.216075000000001 3.3036333333333334 6.696408333333334 3.8233 6.696408333333334 4.464341666666667C6.696408333333334 5.105391666666667 7.216075000000001 5.6250583333333335 7.857116666666667 5.6250583333333335L9.017833333333334 5.6250583333333335L9.017833333333334 4.464341666666667C9.017833333333334 3.8233 8.498166666666668 3.3036333333333334 7.857116666666667 3.3036333333333334z" fill="currentColor"></path><path d="M9.732083333333334 4.464341666666667C9.732083333333334 3.1329416666666665 10.811416666666666 2.0536333333333334 12.142833333333334 2.0536333333333334C13.474250000000001 2.0536333333333334 14.553583333333336 3.1329416666666665 14.553583333333336 4.464341666666667C14.553583333333336 5.795741666666666 13.474250000000001 6.875058333333333 12.142833333333334 6.875058333333333L9.732083333333334 6.875058333333333L9.732083333333334 4.464341666666667zM12.142833333333334 3.3036333333333334C11.501791666666666 3.3036333333333334 10.982083333333334 3.8233 10.982083333333334 4.464341666666667L10.982083333333334 5.6250583333333335L12.142833333333334 5.6250583333333335C12.783875 5.6250583333333335 13.303583333333334 5.105391666666667 13.303583333333334 4.464341666666667C13.303583333333334 3.8233 12.783875 3.3036333333333334 12.142833333333334 3.3036333333333334z" fill="currentColor"></path><path d="M10 4.732058333333334C10.345166666666666 4.732058333333334 10.625 5.011875 10.625 5.357058333333334L10.625 16.428500000000003C10.625 16.773666666666667 10.345166666666666 17.053500000000003 10 17.053500000000003C9.654791666666668 17.053500000000003 9.375 16.773666666666667 9.375 16.428500000000003L9.375 5.357058333333334C9.375 5.011875 9.654791666666668 4.732058333333334 10 4.732058333333334z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_WEB': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width: 60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M9.571416666666666 7.6439C9.721125 7.33675 10.091416666666667 7.209108333333334 10.398583333333335 7.358808333333333C10.896041666666667 7.540316666666667 11.366333333333333 7.832000000000001 11.767333333333333 8.232975C13.475833333333334 9.941541666666668 13.475833333333334 12.711625 11.767333333333333 14.420166666666669L9.704916666666666 16.482583333333334C7.996383333333334 18.191125000000003 5.226283333333334 18.191125000000003 3.5177416666666668 16.482583333333334C1.8091916666666668 14.774041666666669 1.8091916666666668 12.003916666666667 3.5177416666666668 10.295375L5.008791666666667 8.804333333333334C5.252875 8.56025 5.6486 8.56025 5.892683333333334 8.804333333333334C6.136758333333334 9.048416666666668 6.136758333333334 9.444125000000001 5.892683333333334 9.688208333333334L4.401625 11.179250000000001C3.1812333333333336 12.399666666666667 3.1812333333333336 14.378291666666668 4.401625 15.598708333333335C5.622000000000001 16.819083333333335 7.60065 16.819083333333335 8.821041666666668 15.598708333333335L10.883416666666667 13.536291666666667C12.103833333333334 12.315916666666666 12.103833333333334 10.337250000000001 10.883416666666667 9.116875C10.582458333333333 8.815875 10.229416666666667 8.600908333333333 9.856458333333334 8.471066666666667C9.549333333333333 8.321375 9.421708333333335 7.9510499999999995 9.571416666666666 7.6439z" fill="currentColor"></path><path d="M15.597541666666668 4.402641666666667C14.377166666666668 3.1822500000000002 12.398541666666667 3.1822500000000002 11.178125000000001 4.402641666666667L9.11575 6.465033333333333C7.895358333333333 7.685425 7.895358333333333 9.664041666666668 9.11575 10.884458333333333C9.397666666666668 11.166375 9.725916666666667 11.371583333333334 10.073083333333333 11.500958333333333C10.376583333333334 11.658083333333334 10.495291666666667 12.031416666666667 10.338208333333332 12.334875C10.181083333333333 12.638375 9.80775 12.757083333333334 9.504291666666667 12.6C9.042416666666666 12.420333333333334 8.606383333333333 12.142833333333334 8.231858333333333 11.768333333333334C6.523316666666667 10.059791666666667 6.523316666666667 7.289691666666666 8.231858333333333 5.58115L10.29425 3.5187583333333334C12.002791666666667 1.8102083333333334 14.772875 1.8102083333333334 16.481458333333336 3.5187583333333334C18.19 5.2273000000000005 18.19 7.997400000000001 16.481458333333336 9.705916666666667L15.054916666666667 11.132458333333334C14.810875000000001 11.3765 14.415166666666668 11.3765 14.171041666666667 11.132458333333334C13.927 10.888333333333334 13.927 10.492625 14.171041666666667 10.248541666666666L15.597541666666668 8.822041666666667C16.81791666666667 7.601666666666667 16.81791666666667 5.623025 15.597541666666668 4.402641666666667z" fill="currentColor"></path></svg> ${tag.text}</span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_EMOJI': {
        const regex = new RegExp(tag.orig_text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
        const emojiUrl = tag.emoji.gif_url || tag.emoji.icon_url
        if (tag.emoji.size === 2 || tag.emoji.size === 3) { // type === 2 || type === 3 表示大表情
          text = text.replace(regex, `<img src='${emojiUrl}' style='height: 160px; margin: 0 0 -10px 0;'>`)
        } else {
          text = text.replace(regex, `<img src='${emojiUrl}' style='height: 80px; margin: 0 0 -5px 0;'>`)
        }
        break
      }
      case 'RICH_TEXT_NODE_TYPE_VOTE': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width:60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M1.6666666666666667 11.875916666666667C1.6666666666666667 10.725333333333333 2.5994083333333333 9.792583333333333 3.75 9.792583333333333L4.583333333333334 9.792583333333333C5.733925 9.792583333333333 6.666666666666667 10.725333333333333 6.666666666666667 11.875916666666667L6.666666666666667 14.792583333333335C6.666666666666667 15.943166666666666 5.733925 16.87591666666667 4.583333333333334 16.87591666666667L3.75 16.87591666666667C2.5994083333333333 16.87591666666667 1.6666666666666667 15.943166666666666 1.6666666666666667 14.792583333333335L1.6666666666666667 11.875916666666667zM3.75 11.042583333333333C3.2897666666666665 11.042583333333333 2.916666666666667 11.415666666666667 2.916666666666667 11.875916666666667L2.916666666666667 14.792583333333335C2.916666666666667 15.252833333333333 3.2897666666666665 15.625916666666669 3.75 15.625916666666669L4.583333333333334 15.625916666666669C5.043575000000001 15.625916666666669 5.416666666666667 15.252833333333333 5.416666666666667 14.792583333333335L5.416666666666667 11.875916666666667C5.416666666666667 11.415666666666667 5.043575000000001 11.042583333333333 4.583333333333334 11.042583333333333L3.75 11.042583333333333z" fill="currentColor"></path><path d="M7.5 4.792483333333334C7.5 3.6418916666666665 8.432758333333334 2.70915 9.583333333333334 2.70915L10.416666666666668 2.70915C11.56725 2.70915 12.5 3.6418916666666665 12.5 4.792483333333334L12.5 14.792500000000002C12.5 15.943083333333332 11.56725 16.875833333333336 10.416666666666668 16.875833333333336L9.583333333333334 16.875833333333336C8.432758333333334 16.875833333333336 7.5 15.943083333333332 7.5 14.792500000000002L7.5 4.792483333333334zM9.583333333333334 3.95915C9.123083333333334 3.95915 8.75 4.3322416666666665 8.75 4.792483333333334L8.75 14.792500000000002C8.75 15.252708333333333 9.123083333333334 15.625833333333334 9.583333333333334 15.625833333333334L10.416666666666668 15.625833333333334C10.876916666666668 15.625833333333334 11.25 15.252708333333333 11.25 14.792500000000002L11.25 4.792483333333334C11.25 4.3322416666666665 10.876916666666668 3.95915 10.416666666666668 3.95915L9.583333333333334 3.95915z" fill="currentColor"></path><path d="M13.333333333333334 9.1675C13.333333333333334 8.016891666666666 14.266083333333333 7.08415 15.416666666666668 7.08415L16.25 7.08415C17.400583333333334 7.08415 18.333333333333336 8.016891666666666 18.333333333333336 9.1675L18.333333333333336 14.792500000000002C18.333333333333336 15.943083333333332 17.400583333333334 16.875833333333336 16.25 16.875833333333336L15.416666666666668 16.875833333333336C14.266083333333333 16.875833333333336 13.333333333333334 15.943083333333332 13.333333333333334 14.792500000000002L13.333333333333334 9.1675zM15.416666666666668 8.334158333333333C14.956416666666668 8.334158333333333 14.583333333333334 8.70725 14.583333333333334 9.1675L14.583333333333334 14.792500000000002C14.583333333333334 15.252708333333333 14.956416666666668 15.625833333333334 15.416666666666668 15.625833333333334L16.25 15.625833333333334C16.71025 15.625833333333334 17.083333333333336 15.252708333333333 17.083333333333336 14.792500000000002L17.083333333333336 9.1675C17.083333333333336 8.70725 16.71025 8.334158333333333 16.25 8.334158333333333L15.416666666666668 8.334158333333333z" fill="currentColor"></path></svg> ${tag.text} </span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_VIEW_PICTURE': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width: 80px; height: 80px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22" width="22" height="22"><path d="M7.791666666666666 7.733060333333333C7.253044666666666 7.733060333333333 6.816416666666667 8.169688333333333 6.816416666666667 8.708310333333333C6.816416666666667 9.246946 7.253044666666666 9.683544999999999 7.791666666666666 9.683544999999999C8.330281000000001 9.683544999999999 8.766916666666667 9.246946 8.766916666666667 8.708310333333333C8.766916666666667 8.169688333333333 8.330281000000001 7.733060333333333 7.791666666666666 7.733060333333333zM5.558583333333333 8.708310333333333C5.558583333333333 7.475007999999999 6.558372 6.4752193333333325 7.791666666666666 6.4752193333333325C9.024961333333332 6.4752193333333325 10.02475 7.475007999999999 10.02475 8.708310333333333C10.02475 9.941568333333333 9.024961333333332 10.941378333333333 7.791666666666666 10.941378333333333C6.558372 10.941378333333333 5.558583333333333 9.941568333333333 5.558583333333333 8.708310333333333z" fill="currentColor"></path><path d="M11 4.543596666666667C8.690401666666668 4.543596666666667 6.673815333333333 4.661083166666667 5.250284333333333 4.776523999999999C4.243521333333333 4.858162833333334 3.4624053333333333 5.627683666666666 3.37265 6.626020666666667C3.268142166666667 7.788485666666666 3.170833333333333 9.321563333333334 3.170833333333333 10.9978C3.170833333333333 12.673983333333332 3.268142166666667 14.207033333333332 3.37265 15.369535C3.4624053333333333 16.36785666666667 4.243521333333333 17.137388333333334 5.250284333333333 17.219013333333333C6.673816833333333 17.334481666666665 8.690401666666668 17.451966666666664 11 17.451966666666664C13.309854999999999 17.451966666666664 15.326548333333335 17.33439 16.750163333333333 17.218959999999996C17.756758333333334 17.137349999999998 18.5377 16.36804 18.627441666666666 15.36994C18.731925 14.207988333333333 18.829166666666666 12.675175 18.829166666666666 10.9978C18.829166666666666 9.320333333333332 18.731925 7.787542999999999 18.627441666666666 6.6255715C18.5377 5.627479 17.756758333333334 4.858190333333333 16.750163333333333 4.776553C15.326548333333335 4.661109166666666 13.309854999999999 4.543596666666667 11 4.543596666666667zM5.145209166666667 3.480780333333333C6.5952265 3.3631968333333333 8.647761666666666 3.2435966666666665 11 3.2435966666666665C13.352495000000001 3.2435966666666665 15.405159999999999 3.3632151666666665 16.855203333333332 3.4808078333333334C18.484758333333332 3.6129723333333335 19.775116666666666 4.873037 19.922241666666665 6.509160333333334C20.02923333333333 7.6992561666666655 20.129166666666666 9.272141666666666 20.129166666666666 10.9978C20.129166666666666 12.723366666666667 20.02923333333333 14.296258333333332 19.922241666666665 15.486381666666665C19.775116666666666 17.12246833333333 18.484758333333332 18.382566666666666 16.855203333333332 18.514723333333333C15.405159999999999 18.63231 13.352495000000001 18.751966666666664 11 18.751966666666664C8.647761666666666 18.751966666666664 6.5952265 18.63231 5.145209166666667 18.514761666666665C3.515391333333333 18.382566666666666 2.224978166666667 17.122193333333332 2.0778760000000003 15.485923333333332C1.970837 14.295341666666666 1.8708333333333333 12.722213333333332 1.8708333333333333 10.9978C1.8708333333333333 9.273295 1.970837 7.700146833333332 2.0778760000000003 6.509618666666666C2.224978166666667 4.8733365 3.515391333333333 3.6129448333333336 5.145209166666667 3.480780333333333z" fill="currentColor"></path><path d="M14.586553333333333 12.397246666666668C14.19608 12.006681666666665 13.562881666666666 12.006681666666665 13.172316666666665 12.397208333333333L11.288666666666668 14.280896666666665C10.517069999999999 15.052493333333333 9.265836666666667 15.052218333333332 8.494585500000001 14.280124999999998C8.166277166666667 13.951508333333333 7.633659333333334 13.951363333333331 7.305149499999999 14.279834999999999L5.922092833333333 15.66269C5.6682380000000006 15.91648833333333 5.256674833333333 15.91648833333333 5.002853666666667 15.662636666666666C4.7490248333333325 15.4088 4.749050833333333 14.99722 5.002907166666666 14.743368333333333L6.385979166666666 13.360513333333333C7.222356166666667 12.524223333333333 8.578404666666666 12.524628333333332 9.414303333333333 13.361376666666667C9.677975 13.6253 10.105658333333334 13.625445 10.369436666666665 13.361666666666666L12.253033333333333 11.477978333333331C13.151301666666665 10.57971 14.607698333333333 10.579763333333334 15.505913333333332 11.478108333333331L16.99718 12.969611666666665C17.250978333333336 13.223448333333334 17.25094 13.63499 16.997049999999998 13.888841666666666C16.743198333333332 14.142639999999998 16.331671666666665 14.142639999999998 16.07782 13.88875L14.586553333333333 12.397246666666668z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`)
        break
      }
    }
  }
  return text
}

const qnd: Record<number, string> = {
  6: '极速 240P',
  16: '流畅 360P',
  32: '清晰480P',
  64: '高清720P',
  74: '高帧率 720P60',
  80: '高清 1080P',
  112: '高码率 1080P+',
  116: '高帧率 1080P60',
  120: '超清 4K',
  125: '真彩色 HDR ',
  126: '杜比视界',
  127: '超高清 8K'
}

/**
 * 拼接B站动态卡片的html字符串
 * @param colors 颜色数组
 * @param text 卡片的文字
 * @returns 拼接好的html字符串
 */
export const generateGradientStyle = (colors: string[], text: string): string => {
  if (!colors) return ''
  const gradientString = colors.map((color) => {
    return `${color}`
  }).join(', ')

  // 返回完整的CSS样式字符串
  return `<span style="font-family: bilifont; color: transparent; background-clip: text; margin: 0 200px 0 0; font-size: 43px; background-image: linear-gradient(135deg, ${gradientString} 0%, ${gradientString} 100%); ">${text}</span>`
}

/**
 * 将给定的图片源数组转换为一个新的对象数组，每个对象包含单个图片源
 * @param pic 一个包含图片源字符串的数组
 * @returns 返回一个对象数组，每个对象包含单个图片源
 */
export const cover = (pic: { img_src: string }[]) => {
  const imgArray = []
  for (const i of pic) {
    const obj = {
      image_src: i.img_src
    }
    imgArray.push(obj)
  }
  return imgArray
}

/**
 * 生成装饰卡片的HTML字符串
 * @param decorate 装饰对象，包含卡片的URL和颜色信息
 * @returns 返回装饰卡片的HTML字符串或空div字符串
 */
export const generateDecorationCard = (decorate: any) => {
  return decorate
    ? `<div style="display: flex; width: 500px; height: 150px; background-position: center; background-attachment: fixed; background-repeat: no-repeat; background-size: contain; align-items: center; justify-content: flex-end; background-image: url('${decorate.card_url}')">${generateGradientStyle(decorate.fan?.color_format?.colors, decorate.fan.num_str || decorate.fan.num_desc)}</div>`
    : '<div></div>'
}

/**
 * 处理B站动态中的相关内容卡片（additional）
 * @param additional 动态中的 additional 字段
 * @returns 处理后的卡片数据，如果不支持则返回 undefined
 * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/dynamic/all.md
 */
export const parseAdditionalCard = (additional: any) => {
  if (!additional) return undefined

  switch (additional.type) {
    // 预约卡片（直播预约/视频预约）
    case 'ADDITIONAL_TYPE_RESERVE': {
      const reserve = additional.reserve
      if (!reserve) return undefined

      // button.type: 1-直播预约 2-视频预约
      let buttonText = ''
      if (reserve.button.type === 1) {
        // 直播预约：使用 jump_style.text（如"去观看"、"已结束"）
        buttonText = reserve.button.jump_style?.text ?? '预约'
      } else {
        // 视频预约：使用 uncheck.text（如"预约"）或 check.text（如"已预约"）
        buttonText = reserve.button.uncheck?.text ?? reserve.button.check?.text ?? '预约'
      }

      return {
        type: 'ADDITIONAL_TYPE_RESERVE' as const,
        reserve: {
          title: reserve.title,
          desc1: reserve.desc1?.text ?? '',
          desc2: reserve.desc2?.text ?? '',
          desc3: reserve.desc3?.text,
          buttonText
        }
      }
    }

    // 投票卡片
    case 'ADDITIONAL_TYPE_VOTE': {
      const vote = additional.vote
      if (!vote) return undefined

      return {
        type: 'ADDITIONAL_TYPE_VOTE' as const,
        vote: {
          title: vote.title,
          desc: vote.desc,
          status: vote.status
        }
      }
    }

    // 通用卡片（游戏、活动等）
    case 'ADDITIONAL_TYPE_COMMON': {
      if (!additional.common) return undefined

      return {
        type: 'ADDITIONAL_TYPE_COMMON' as const,
        common: {
          cover: additional.common.cover,
          title: additional.common.title,
          desc1: additional.common.desc1,
          desc2: additional.common.desc2,
          button_text: additional.common.button?.jump_style?.text,
          head_text: additional.common.head_text,
          sub_type: additional.common.sub_type
        }
      }
    }

    // 视频跳转卡片（UGC）
    case 'ADDITIONAL_TYPE_UGC': {
      const ugc = additional.ugc
      if (!ugc) return undefined

      return {
        type: 'ADDITIONAL_TYPE_UGC' as const,
        ugc: {
          cover: ugc.cover,
          title: ugc.title,
          duration: ugc.duration,
          play: ugc.stat?.play ?? ugc.desc_second?.split(' ')[0]?.replace('观看', '播放') ?? '',
          danmaku: ugc.stat?.danmaku ?? ugc.desc_second?.split(' ')[1]?.replace('弹幕', '') ?? ''
        }
      }
    }

    // 商品卡片
    case 'ADDITIONAL_TYPE_GOODS': {
      // TODO: 商品卡片暂未实现
      logger.error('商品卡片暂未实现，请将这次解析的内容反馈给开发者进行适配！')
      return undefined
    }

    // 充电专属抽奖
    case 'ADDITIONAL_TYPE_UPOWER_LOTTERY': {
      // TODO: 充电专属抽奖暂未实现
      logger.error('充电专属抽奖暂未实现，请将这次解析的内容反馈给开发者进行适配！')
      return undefined
    }

    default:
      logger.error('此卡片内容暂未实现，请将这次解析的内容反馈给开发者进行适配！')
      return undefined
  }
}

const mapping_table = (type: any): number => {
  const Array: Record<string, string[]> = {
    1: ['DYNAMIC_TYPE_AV', 'DYNAMIC_TYPE_PGC', 'DYNAMIC_TYPE_UGC_SEASON'],
    11: ['DYNAMIC_TYPE_DRAW'],
    12: ['DYNAMIC_TYPE_ARTICLE'],
    17: ['DYNAMIC_TYPE_LIVE_RCMD', 'DYNAMIC_TYPE_FORWARD', 'DYNAMIC_TYPE_WORD', 'DYNAMIC_TYPE_COMMON_SQUARE'],
    19: ['DYNAMIC_TYPE_MEDIALIST']
  }
  for (const key in Array) {
    if (Array[key].includes(type)) {
      return parseInt(key, 10)
    }
  }
  return 1
}

const oid = (dynamicINFO: BiliDynamicInfo<DynamicType>, dynamicInfoCard: BiliDynamicCard) => {
  switch (dynamicINFO.data.item.type) {
    case 'DYNAMIC_TYPE_WORD':
    case 'DYNAMIC_TYPE_FORWARD': {
      return dynamicINFO.data.item.id_str
    }
    default: {
      return dynamicInfoCard.data.card.desc.rid.toString()
    }
  }
}
type qualityOptions = {
  /**
   * qn值
   * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/video/videostream_url.md#qn视频清晰度标识
   */
  qn?: number
  /** 可接受的最大视频文件单位：MB */
  maxAutoVideoSize?: number,
  /** 视频BV号 */
  bvid: string,
  /** 视频流清晰度列表 */
  accept_description: string[],
}
/**
 * 检出符合大小的视频流信息对象
 * @param accept_description 视频流清晰度列表
 * @param videoList 包含所有清晰度的视频流信息对象
 * @param audioUrl 音频流地址
 * @param bvid 视频bvid（BV号）
 * @returns
 */
export const bilibiliProcessVideos = async (qualityOptions: qualityOptions, videoList: videoDownloadUrlList, audioUrl: string) => {
  // 如果不是自动选择模式，直接根据配置的清晰度选择视频
  if (qualityOptions.qn !== 0 || Config.bilibili.videoQuality !== 0) {
    const targetQuality = qualityOptions.qn ?? Config.bilibili.videoQuality

    // 尝试找到完全匹配的清晰度
    let matchedVideo = videoList.find(video => video.id === targetQuality)

    // 如果没有完全匹配的清晰度，找最接近的
    if (!matchedVideo) {
      // 按照清晰度ID排序
      const sortedVideos = [...videoList].sort((a, b) => a.id - b.id)

      // 找到小于目标清晰度的最大值
      const lowerVideos = sortedVideos.filter(video => video.id < targetQuality)
      const higherVideos = sortedVideos.filter(video => video.id > targetQuality)

      if (lowerVideos.length > 0) {
        // 有小于目标清晰度的，取最大的
        matchedVideo = lowerVideos[lowerVideos.length - 1]
      } else if (higherVideos.length > 0) {
        // 没有小于目标清晰度的，取最小的
        matchedVideo = higherVideos[0]
      } else {
        // 如果都没有，取第一个（应该不会发生）
        matchedVideo = sortedVideos[0]
      }
    }

    // 更新视频列表和清晰度描述
    const matchedQuality = qnd[matchedVideo.id] || qualityOptions.accept_description[0]
    qualityOptions.accept_description = [matchedQuality]
    videoList = [matchedVideo]

    return {
      accept_description: qualityOptions.accept_description,
      videoList
    }
  }

  // 自动选择逻辑（videoQuality === 0）
  const results: Record<string, string> = {}

  for (const video of videoList) {
    const size = await getvideosize(video.base_url, audioUrl, qualityOptions.bvid)
    results[video.id] = size
  }

  // 将结果对象的值转换为数字，并找到最接近但不超过 qualityOptions.maxAutoVideoSize 或 Config.bilibili.maxAutoVideoSize 的值
  const sizes = Object.values(results).map(size => parseFloat(size.replace('MB', '')))
  let closestId: string | null = null
  let smallestDifference = Infinity

  sizes.forEach((size, index) => {
    if (size <= (qualityOptions?.maxAutoVideoSize ?? Config.bilibili.maxAutoVideoSize)) {
      const difference = Math.abs(size - (qualityOptions?.maxAutoVideoSize ?? Config.bilibili.maxAutoVideoSize))
      if (difference < smallestDifference) {
        smallestDifference = difference
        closestId = Object.keys(results)[index]
      }
    }
  })

  if (closestId !== null) {
    // 找到最接近但不超过文件大小限制的视频清晰度
    const closestQuality = qnd[Number(closestId)]
    // 更新 OBJECT.DATA.data.accept_description
    qualityOptions.accept_description = qualityOptions.accept_description.filter((desc: any) => desc === closestQuality)
    if (qualityOptions.accept_description.length === 0) {
      qualityOptions.accept_description = [closestQuality]
    }
    // 找到对应的视频对象
    const video = videoList.find((video: { id: number }) => video.id === Number(closestId))!
    // 更新 OBJECT.DATA.data.dash.video 数组
    videoList = [video]
  } else {
    // 如果没有找到符合条件的视频，使用最低画质的视频对象
    videoList = [[...videoList].pop()!]
    // 更新 OBJECT.DATA.data.accept_description 为最低画质的描述
    qualityOptions.accept_description = [[...qualityOptions.accept_description].pop()!]
  }
  return {
    accept_description: qualityOptions.accept_description,
    videoList
  }
}

/**
 * [bilibili] 获取视频和音频的总大小
 * @param videourl - 视频流URL
 * @param audiourl - 音频流URL
 * @param bvid - 视频BV号
 * @returns  返回视频和音频总大小(MB),保留2位小数
 */
export const getvideosize = async (videourl: string, audiourl: string, bvid: string) => {
  const videoheaders = await new Networks({
    url: videourl,
    headers: {
      ...baseHeaders,
      Referer: `https://wwww.bilibili.com/video/${bvid}`,
      Cookie: Config.cookies.bilibili
    }
  }).getHeaders()
  const audioheaders = await new Networks({
    url: audiourl,
    headers: {
      ...baseHeaders,
      Referer: `https://www.bilibili.com/video/${bvid}`,
      Cookie: Config.cookies.bilibili
    }
  }).getHeaders()

  const videoSize = extractTotalBytesFromHeaders(videoheaders)
  const audioSize = extractTotalBytesFromHeaders(audioheaders)

  const videoSizeInMB = (videoSize / (1024 * 1024)).toFixed(2)
  const audioSizeInMB = (audioSize / (1024 * 1024)).toFixed(2)

  const totalSizeInMB = parseFloat(videoSizeInMB) + parseFloat(audioSizeInMB)
  return totalSizeInMB.toFixed(2)
}

/**
 * 格式化视频统计信息为三行，每行两个数据项，并保持对齐
 */
const formatVideoStats = (view: number, danmaku: number, like: number, coin: number, share: number, favorite: number): string => {
  // 计算每个数据项的文本
  const viewText = `📊 播放量: ${Count(view)}`
  const danmakuText = `💬 弹幕: ${Count(danmaku)}`
  const likeText = `👍 点赞: ${Count(like)}`
  const coinText = `🪙 投币: ${Count(coin)}`
  const shareText = `🔄 转发: ${Count(share)}`
  const favoriteText = `⭐ 收藏: ${Count(favorite)}`

  // 找出第一列中最长的项的长度
  const firstColItems = [viewText, likeText, shareText]
  const maxFirstColLength = Math.max(...firstColItems.map(item => getStringDisplayWidth(item)))

  // 构建三行文本，确保第二列对齐
  const line1 = alignTwoColumns(viewText, danmakuText, maxFirstColLength)
  const line2 = alignTwoColumns(likeText, coinText, maxFirstColLength)
  const line3 = alignTwoColumns(shareText, favoriteText, maxFirstColLength)

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

/**
 * 提取专栏中的所有图片URL
 * @param content 
 * @returns 
 */
export const extractArticleImages = (content: ArticleContent['data']): string[] => {
  const images: string[] = []

  // 处理 opus 格式（结构化数据）
  if (content.opus?.content?.paragraphs) {
    for (const paragraph of content.opus.content.paragraphs) {
      // para_type === 2 表示图片段落
      if (paragraph.para_type === 2 && paragraph.pic?.pics) {
        for (const pic of paragraph.pic.pics) {
          if (pic.url) {
            // 确保使用 https 协议
            const url = pic.url.startsWith('//') ? `https:${pic.url}` : pic.url
            images.push(url)
          }
        }
      }
    }
  }

  // 处理 content 格式（HTML字符串）
  if (content.content && typeof content.content === 'string') {
    // 使用正则提取所有 img 标签的 src
    const imgRegex = /<img[^>]+src="([^"]+)"/gi
    let match
    while ((match = imgRegex.exec(content.content)) !== null) {
      let url = match[1]
      // 修复协议
      if (url.startsWith('//')) {
        url = `https:${url}`
      }
      images.push(url)
    }
  }

  return images
}
