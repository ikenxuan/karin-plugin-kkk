/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import fs from 'node:fs'

import { ApiResponse, BiliUserDynamic, BiliUserProfile, BiliVideoPlayurlIsLogin, DynamicType, getBilibiliData } from '@ikenxuan/amagi'
import type {
  AdapterType,
  ImageElement,
  Message,
  SendMsgResults
} from 'node-karin'
import karin, {
  common,
  logger,
  segment
} from 'node-karin'

import {
  Base,
  baseHeaders,
  bilibiliDB,
  cleanOldDynamicCache,
  Common,
  Config,
  Count,
  downloadFile,
  downLoadFileOptions,
  mergeFile,
  Render,
  uploadFile
} from '@/module'
import {
  bilibiliProcessVideos,
  cover,
  generateDecorationCard,
  getvideosize,
  replacetext
} from '@/platform/bilibili'
import type { bilibiliPushItem } from '@/types/config/pushlist'

/** 已支持推送的动态类型 */
export { DynamicType } from '@ikenxuan/amagi'

// type DataItem = BiliUserDynamic['data']['items'] extends Array<infer T> ? T : never

/** 每个推送项的类型定义 */
export type BilibiliPushItem = {
  /** 该UP主的昵称 */
  remark: string
  /** UP主UID */
  host_mid: number
  /** 动态发布时间 */
  create_time: number
  /** 要推送到的群组和机器人ID */
  targets: Array<{ groupId: string, botId: string }>
  /** 动态详情信息 */
  Dynamic_Data: BiliUserDynamic['data']['items'][number]
  /** UP主头像url */
  avatar_img: string
  /** 动态类型 */
  dynamic_type: DynamicType
}

/** 推送列表的类型定义 */
type WillBePushList = Record<string, BilibiliPushItem>
const bilibiliBaseHeaders: downLoadFileOptions['headers'] = {
  ...baseHeaders,
  Referer: 'https://api.bilibili.com/',
  Cookie: Config.cookies.bilibili
}

export class Bilibilipush extends Base {
  private force = false

  constructor (e = {} as Message, force: boolean = false) {
    super(e)
    if (this.e.bot?.adapter?.name === 'QQBot') {
      e.reply('不支持QQBot，请使用其他适配器')
      return
    }
    this.force = force
  }

  /**
   * 执行主要的操作流程
   */
  async action () {
    try {
      await this.syncConfigToDatabase()
      // 清理旧的动态缓存记录
      const deletedCount = await cleanOldDynamicCache('bilibili', 1)
      if (deletedCount > 0) {
        logger.info(`已清理 ${deletedCount} 条过期的B站动态缓存记录`)
      }

      const data = await this.getDynamicList(Config.pushlist.bilibili)
      const pushdata = await this.excludeAlreadyPushed(data.willbepushlist)

      if (Object.keys(pushdata).length === 0) return true

      if (this.force) {
        return await this.forcepush(pushdata)
      } else {
        return await this.getdata(pushdata)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  /**
   * 同步配置文件中的订阅信息到数据库
   */
  async syncConfigToDatabase () {
    // 如果配置文件中没有B站推送列表，直接返回
    if (!Config.pushlist.bilibili || Config.pushlist.bilibili.length === 0) {
      return
    }

    await bilibiliDB.syncConfigSubscriptions(Config.pushlist.bilibili)
  }

  /**
   * 异步获取数据并根据动态类型处理和发送动态信息。
   * @param data 包含动态相关信息的对象。
   */
  async getdata (data: WillBePushList) {
    let noCkData
    for (const dynamicId in data) {
      let skip = await skipDynamic(data[dynamicId])
      let send_video = true; let img: ImageElement[] = []
      const dynamicCARDINFO = await this.amagi.getBilibiliData('动态卡片数据', { dynamic_id: dynamicId, typeMode: 'strict' })
      const dycrad = dynamicCARDINFO.data.data.card && dynamicCARDINFO.data.data.card.card && JSON.parse(dynamicCARDINFO.data.data.card.card)

      if (!skip) {
        const userINFO = await this.amagi.getBilibiliData('用户主页数据', { host_mid: data[dynamicId].host_mid, typeMode: 'strict' })
        let emojiDATA = await this.amagi.getBilibiliData('Emoji数据') as any
        emojiDATA = extractEmojisData(emojiDATA.data.data.packages)

        logger.mark(`UP: ${data[dynamicId].remark}\n动态id：${dynamicId}\nhttps://t.bilibili.com/${dynamicId}`)
        switch (data[dynamicId].dynamic_type) {
          /** 处理图文动态 */
          case DynamicType.DRAW: {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null && data[dynamicId].Dynamic_Data.modules.module_dynamic && data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
              const name = data[dynamicId].Dynamic_Data.modules.module_dynamic.topic!.name
              data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.rich_text_nodes.unshift({
                orig_text: name,
                text: name,
                type: 'topic',
                rid: data[dynamicId].Dynamic_Data.modules.module_dynamic.topic!.id.toString(),
              })
              data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text = `${name}\n\n` + data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text
            }
            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_DRAW',
              {
                image_url: cover(dycrad.item.pictures),
                // TIP: 2025/08/20, 动态卡片数据中，图文动态的描述文本在 major.opus.summary 中
                text: replacetext(
                  br(
                    data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text ?? ''),
                  data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.rich_text_nodes ?? []
                ),
                dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                username: checkvip(userINFO.data.data.card),
                fans: Count(userINFO.data.data.follower),
                user_shortid: data[dynamicId].host_mid,
                total_favorited: Count(userINFO.data.data.like_num),
                following_count: Count(userINFO.data.data.card.attention),
                decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
                render_time: Common.getCurrentTime(),
                dynamicTYPE: '图文动态推送'
              }
            )
            break
          }
          /** 处理纯文动态 */
          case DynamicType.WORD: {
            let text = replacetext(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text, data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.rich_text_nodes)
            for (const item of emojiDATA) {
              if (text.includes(item.text)) {
                if (text.includes('[') && text.includes(']')) {
                  text = text.replace(/\[[^\]]*\]/g, `<img src="${item.url}"/>`).replace(/\\/g, '')
                }
                text += '&#160'
              }
            }
            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_WORD',
              {
                text: br(text),
                dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                username: checkvip(userINFO.data.data.card),
                fans: Count(userINFO.data.data.follower),
                user_shortid: data[dynamicId].host_mid,
                total_favorited: Count(userINFO.data.data.like_num),
                following_count: Count(userINFO.data.data.card.attention),
                dynamicTYPE: '纯文动态推送'
              }
            )
            break
          }
          /** 处理视频动态 */
          case DynamicType.AV: {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.type === 'MAJOR_TYPE_ARCHIVE') {
              const aid = data[dynamicId].Dynamic_Data?.modules.module_dynamic.major?.archive?.aid
              const bvid = data[dynamicId].Dynamic_Data?.modules.module_dynamic.major?.archive?.bvid ?? ''
              const INFODATA = await getBilibiliData('单个视频作品数据', '', { bvid, typeMode: 'strict' })

              /** 特殊字段，只有番剧和影视才会有，如果是该类型视频，默认不发送 */
              if (INFODATA.data.data.redirect_url) {
                send_video = false
                logger.debug(`UP主：${INFODATA.data.data.owner.name} 的该动态类型为${logger.yellow('番剧或影视')}，默认跳过不下载，直达：${logger.green(INFODATA.data.data.redirect_url)}`)
              } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                noCkData = await getBilibiliData('单个视频下载信息数据', '', { avid: Number(aid), cid: INFODATA.data.data.cid, typeMode: 'strict' })
              }
              img = await Render('bilibili/dynamic/DYNAMIC_TYPE_AV',
                {
                  image_url: [{ image_src: INFODATA.data.data.pic }],
                  text: br(INFODATA.data.data.title),
                  desc: br(dycrad.desc),
                  dianzan: Count(INFODATA.data.data.stat.like),
                  pinglun: Count(INFODATA.data.data.stat.reply),
                  share: Count(INFODATA.data.data.stat.share),
                  view: Count(dycrad.stat.view),
                  coin: Count(dycrad.stat.coin),
                  duration_text: data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.archive?.duration_text ?? '0:00',
                  create_time: Common.convertTimestampToDateTime(INFODATA.data.data.ctime),
                  avatar_url: INFODATA.data.data.owner.face,
                  frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                  share_url: 'https://www.bilibili.com/video/' + bvid,
                  username: checkvip(userINFO.data.data.card),
                  fans: Count(userINFO.data.data.follower),
                  user_shortid: data[dynamicId].host_mid,
                  total_favorited: Count(userINFO.data.data.like_num),
                  following_count: Count(userINFO.data.data.card.attention),
                  dynamicTYPE: '视频动态推送'
                }
              )
            }
            break
          }
          /** 处理直播动态 */
          case DynamicType.LIVE_RCMD: {
            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
              {
                image_url: [{ image_src: dycrad.live_play_info.cover }],
                text: br(dycrad.live_play_info.title),
                liveinf: br(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
                username: checkvip(userINFO.data.data.card),
                avatar_url: userINFO.data.data.card.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                fans: Count(userINFO.data.data.follower),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                now_time: Common.getCurrentTime(),
                share_url: 'https://live.bilibili.com/' + dycrad.live_play_info.room_id,
                dynamicTYPE: '直播动态推送'
              }
            )
            break
          }
          /** 处理转发动态 */
          case DynamicType.FORWARD: {
            const text = replacetext(br(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text), data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.rich_text_nodes)
            let param = {}
            switch (data[dynamicId].Dynamic_Data.orig.type) {
              case DynamicType.AV: {
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  pub_action: data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_action,
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  duration_text: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.duration_text,
                  title: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.title,
                  danmaku: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.danmaku,
                  play: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.play,
                  cover: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.cover,
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.DRAW: {
                const dynamicCARD = await getBilibiliData('动态卡片数据', Config.cookies.bilibili, { dynamic_id: data[dynamicId].Dynamic_Data.orig.id_str, typeMode: 'strict' })
                const cardData = JSON.parse(dynamicCARD.data.data.card.card)
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: replacetext(br(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  image_url: cover(cardData.item.pictures),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.WORD: {
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: replacetext(br(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.LIVE_RCMD: {
                const liveData = JSON.parse(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.live_rcmd.content)
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image,
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
                logger.warn(`UP主：${data[dynamicId].remark}的${logger.green('转发动态')}转发的原动态类型为「${logger.yellow(data[dynamicId].Dynamic_Data.orig.type)}」暂未支持解析`)
                break
              }
            }
            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_FORWARD', {
              text,
              dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
              pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
              share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
              create_time: data[dynamicId].Dynamic_Data.modules.module_author.pub_time,
              avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
              frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
              share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
              username: checkvip(userINFO.data.data.card),
              fans: Count(userINFO.data.data.follower),
              user_shortid: data[dynamicId].Dynamic_Data.modules.module_author.mid,
              total_favorited: Count(userINFO.data.data.like_num),
              following_count: Count(userINFO.data.data.card.attention),
              dynamicTYPE: '转发动态推送',
              decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
              render_time: Common.getCurrentTime(),
              original_content: { [data[dynamicId].Dynamic_Data.orig.type]: param }
            })
            break
          }

          /** 未处理的动态类型 */
          default: {
            skip = true
            logger.warn(`UP主：${data[dynamicId].remark}「${data[dynamicId].dynamic_type}」动态类型的暂未支持推送\n动态地址：${'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str}`)
            break
          }
        }
      }

      // 遍历 targets 数组，并发送消息
      for (const target of data[dynamicId].targets) {
        let status: SendMsgResults | null = null
        if (!skip) {
          const { groupId, botId } = target
          const bot = karin.getBot(botId) as AdapterType
          const Contact = karin.contactGroup(groupId)
          status = await karin.sendMsg(botId, Contact, img ? [...img] : [])
          if (Config.bilibili.push.parsedynamic) {
            switch (data[dynamicId].dynamic_type) {
              case 'DYNAMIC_TYPE_AV': {
                if (send_video) {
                  let correctList!: {
                    accept_description: string[]
                    videoList: BiliVideoPlayurlIsLogin['data']['dash']['video']
                  }
                  let videoSize = ''
                  const playUrlData = await this.amagi.getBilibiliData('单个视频下载信息数据', {
                    avid: dycrad.aid,
                    cid: dycrad.cid,
                    typeMode: 'strict'
                  }) as ApiResponse<BiliVideoPlayurlIsLogin>
                  /** 提取出视频流信息对象，并排除清晰度重复的视频流 */
                  const simplify = playUrlData.data.data.dash.video.filter((item, index: any, self: any[]) => {
                    return self.findIndex((t: { id: any }) => {
                      return t.id === item.id
                    }) === index
                  })
                  /** 替换原始的视频信息对象 */
                  playUrlData.data.data.dash.video = simplify
                  /** 给视频信息对象删除不符合条件的视频流 */
                  correctList = await bilibiliProcessVideos({
                    accept_description: playUrlData.data.data.accept_description,
                    bvid: dynamicCARDINFO.data.data.card.desc.bvid,
                    qn: Config.bilibili.push.pushVideoQuality,
                    maxAutoVideoSize: Config.bilibili.push.pushMaxAutoVideoSize
                  }, simplify, playUrlData.data.data.dash.audio[0].base_url)
                  playUrlData.data.data.dash.video = correctList.videoList
                  playUrlData.data.data.accept_description = correctList.accept_description
                  /** 获取第一个视频流的大小 */
                  videoSize = await getvideosize(correctList.videoList[0].base_url, playUrlData.data.data.dash.audio[0].base_url, dynamicCARDINFO.data.data.card.desc.bvid)
                  if ((Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit)) && !Config.upload.compress) {
                    await karin.sendMsg(
                      botId,
                      Contact,
                      [
                        segment.text(`设定的最大上传大小为 ${Config.upload.filelimit}MB\n当前解析到的视频大小为 ${Number(videoSize)}MB\n视频太大了，还是去B站看吧~`),
                        segment.reply(status.messageId)
                      ]
                    )
                    break
                  }
                  logger.mark(`当前处于自动推送状态，解析到的视频大小为 ${logger.yellow(Number(videoSize))} MB`)
                  const infoData = await this.amagi.getBilibiliData('单个视频作品数据', { bvid: dynamicCARDINFO.data.data.card.desc.bvid, typeMode: 'strict' })
                  const mp4File = await downloadFile(
                    playUrlData.data?.data?.dash?.video[0].base_url,
                    {
                      title: `Bil_V_${infoData.data.data.bvid}.mp4`,
                      headers: bilibiliBaseHeaders
                    }
                  )
                  const mp3File = await downloadFile(
                    playUrlData.data?.data?.dash?.audio[0].base_url,
                    {
                      title: `Bil_A_${infoData.data.data.bvid}.mp3`,
                      headers: bilibiliBaseHeaders
                    }
                  )

                  if (mp4File.filepath && mp3File.filepath) {
                    await mergeFile('二合一（视频 + 音频）', {
                      path: mp4File.filepath,
                      path2: mp3File.filepath,
                      resultPath: Common.tempDri.video + `Bil_Result_${infoData.data.data.bvid}.mp4`,

                      callback: async (success: boolean, resultPath: string): Promise<boolean> => {
                        if (success) {
                          const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`
                          fs.renameSync(resultPath, filePath)
                          logger.mark(`视频文件重命名完成: ${resultPath.split('/').pop()} -> ${filePath.split('/').pop()}`)
                          logger.mark('正在尝试删除缓存文件')
                          await Common.removeFile(mp4File.filepath, true)
                          await Common.removeFile(mp3File.filepath, true)

                          const stats = fs.statSync(filePath)
                          const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2))
                          if (fileSizeInMB > Config.upload.groupfilevalue) {
                            // 使用文件上传
                            return await uploadFile(
                              this.e,
                              { filepath: filePath, totalBytes: fileSizeInMB, originTitle: `${infoData.data.data.desc.substring(0, 50).replace(/[\\/:\\*\\?"<>\\|\r\n\s]/g, ' ')}` },
                              '',
                              { useGroupFile: true, active: true, activeOption: { group_id: groupId, uin: botId } })
                          } else {
                            /** 因为本地合成，没有视频直链 */
                            return await uploadFile(
                              this.e,
                              { filepath: filePath, totalBytes: fileSizeInMB },
                              '',
                              { active: true, activeOption: { group_id: groupId, uin: botId } }
                            )
                          }
                        } else {
                          await Common.removeFile(mp4File.filepath, true)
                          await Common.removeFile(mp3File.filepath, true)
                          return true
                        }
                      }
                    })
                  }
                }
                break
              }
              case 'DYNAMIC_TYPE_DRAW': {
                const imgArray: ImageElement[] = []
                for (const img of data[dynamicId].Dynamic_Data.modules.module_dynamic.major && data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items) {
                  imgArray.push(segment.image(img.src))
                }
                const forwardMsg = common.makeForward(imgArray, botId, bot.account.name)
                await bot.sendForwardMsg(karin.contactFriend(botId), forwardMsg)
                break
              }
            }
          }
        }

        if (skip || (status && status?.messageId)) {
          // 使用新的数据库API添加动态缓存
          await bilibiliDB.addDynamicCache(
            dynamicId,
            data[dynamicId].host_mid,
            target.groupId,
            data[dynamicId].dynamic_type
          )
        }
      }
    }
  }

  /**
   * 根据配置文件获取UP当天的动态列表。
   * @returns
   */
  async getDynamicList (userList: bilibiliPushItem[]) {
    const willbepushlist: WillBePushList = {}

    try {
      /** 过滤掉不启用的订阅项 */
      const filteredUserList = userList.filter(item => item.switch !== false)
      for (const item of filteredUserList) {
        const dynamic_list = await this.amagi.getBilibiliData('用户主页动态列表数据', { host_mid: item.host_mid, typeMode: 'strict' })
        if (dynamic_list.data.data.items.length > 0) {
          // 遍历接口返回的视频列表
          for (const dynamic of dynamic_list.data.data.items) {
            const now = Date.now()
            // 获取动态发布时间戳(毫秒)
            const createTime = dynamic.modules.module_author.pub_ts * 1000
            const timeDifference = (now - createTime)

            const is_top = dynamic.modules.module_tag?.text === '置顶' // 是否为置顶
            let shouldPush = false // 是否列入推送数组

            const timeDiffSeconds = Math.round(timeDifference / 1000)
            const timeDiffHours = Math.round((timeDifference / 1000 / 60 / 60) * 100) / 100 // 保留2位小数

            // 条件判断，以下任何一项成立都将进行推送：如果是置顶且发布时间在一天内 || 如果是置顶作品且有新的群组且发布时间在一天内 || 如果有新的群组且发布时间在一天内
            logger.debug(`
              前期获取该动态基本信息：
              UP主：${dynamic.modules.module_author.name}
              动态ID：${dynamic.id_str}
              发布时间：${Common.convertTimestampToDateTime(createTime / 1000)}
              发布时间戳（ms）：${createTime}
              当前时间戳（ms）：${now}
              时间差（ms）：${timeDifference} ms (${timeDiffSeconds}s) (${timeDiffHours}h)
              是否置顶：${is_top}
              是否在一天内：${timeDifference < 86400000 ? logger.green('true') : logger.red('false')}
              `)

            if ((is_top && timeDifference < 86400000) || (timeDifference < 86400000)) {
              shouldPush = true
              logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该动态纳入当天推送列表：https://t.bilibili.com/${dynamic.id_str}\n`))
            } else logger.debug(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该动态：https://t.bilibili.com/${dynamic.id_str}\n`))
            // 如果 shouldPush 为 true，或该作品距现在的时间差小于一天，则将该动态添加到 willbepushlist 中
            if (timeDifference < 86400000 || shouldPush) {
              // 将群组ID和机器人ID分离
              const targets = item.group_id.map(groupWithBot => {
                const [groupId, botId] = groupWithBot.split(':')
                return { groupId, botId }
              })

              // 确保 willbepushlist[dynamic.id_str] 是一个对象
              if (!willbepushlist[dynamic.id_str]) {
                willbepushlist[dynamic.id_str] = {
                  remark: item.remark,
                  host_mid: item.host_mid,
                  create_time: dynamic.modules.module_author.pub_ts,
                  targets,
                  Dynamic_Data: dynamic, // 存储 dynamic 对象
                  avatar_img: dynamic.modules.module_author.face,
                  dynamic_type: dynamic.type as DynamicType
                }
              }
            }
          }
        } else {
          logger.error(`「${item.remark}」的动态列表数量为零！`)
        }
      }
    } catch (error) {
      logger.error(error)
    }

    return { willbepushlist }
  }

  /**
   * 排除已推送过的群组并返回更新后的推送列表
   * @param willBePushList 将要推送的列表
   * @returns 更新后的推送列表
   */
  async excludeAlreadyPushed (willBePushList: WillBePushList): Promise<WillBePushList> {
    // 遍历推送列表中的作品ID
    for (const dynamicId in willBePushList) {
      const pushItem = willBePushList[dynamicId]
      const newTargets: Array<{ groupId: string, botId: string }> = []

      // 遍历作品对应的目标群组
      for (const target of pushItem.targets) {
        // 检查该动态是否已经推送给该群组
        const isPushed = await bilibiliDB.isDynamicPushed(dynamicId, pushItem.host_mid, target.groupId)

        // 如果未被推送过，则保留此目标
        if (!isPushed) {
          newTargets.push(target)
        }
      }

      // 更新作品的目标数组
      if (newTargets.length > 0) {
        pushItem.targets = newTargets
      } else {
        // 如果没有剩余目标，移除该作品
        delete willBePushList[dynamicId]
      }
    }

    return willBePushList
  }

  /**
   * 设置或更新特定 host_mid 的群组信息。
   * @param data 包含 card 对象。
   * @returns 操作成功或失败的消息字符串。
   */
  async setting (data: BiliUserProfile): Promise<void> {
    const groupInfo = await this.e.bot.getGroupInfo('groupId' in this.e && this.e.groupId ? this.e.groupId : '')
    const host_mid = Number(data.data.card.mid)
    const config = Config.pushlist // 读取配置文件
    const groupId = 'groupId' in this.e && this.e.groupId ? this.e.groupId : ''
    const botId = this.e.selfId

    // 初始化或确保 bilibilipushlist 数组存在
    if (!config.bilibili) {
      config.bilibili = []
    }

    // 检查是否存在相同的 host_mid
    const existingItem = config.bilibili.find((item: { host_mid: number }) => item.host_mid === host_mid)

    // 检查该群组是否已订阅该UP主
    const isSubscribed = await bilibiliDB.isSubscribed(host_mid, groupId)

    if (existingItem) {
      // 如果已经存在相同的 host_mid，则检查是否存在相同的 group_id
      let has = false
      let groupIndexToRemove = -1 // 用于记录要删除的 group_id 对象的索引

      for (let index = 0; index < existingItem.group_id.length; index++) {
        const item = existingItem.group_id[index]
        const existingGroupId = item.split(':')[0]

        if (existingGroupId === String(groupId)) {
          has = true
          groupIndexToRemove = index
          break
        }
      }

      if (has) {
        // 如果已存在相同的 group_id，则删除它
        existingItem.group_id.splice(groupIndexToRemove, 1)

        // 在数据库中取消订阅
        if (isSubscribed) {
          await bilibiliDB.unsubscribeBilibiliUser(groupId, host_mid)
        }

        logger.info(`\n删除成功！${data.data.card.name}\nUID：${host_mid}`)
        await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n删除成功！${data.data.card.name}\nUID：${host_mid}`)

        // 如果删除后 group_id 数组为空，则删除整个属性
        if (existingItem.group_id.length === 0) {
          const index = config.bilibili.indexOf(existingItem)
          config.bilibili.splice(index, 1)
        }
      } else {
        // 在数据库中添加订阅
        await bilibiliDB.subscribeBilibiliUser(
          groupId,
          botId,
          host_mid,
          data.data.card.name
        )

        // 将新的 group_id 添加到该 host_mid 对应的数组中
        existingItem.group_id.push(`${groupId}:${botId}`)

        await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${data.data.card.name}\nUID：${host_mid}`)
        if (Config.bilibili.push.switch === false) await this.e.reply('请发送「#kkk设置B站推送开启」以进行推送')

        logger.info(`\n设置成功！${data.data.card.name}\nUID：${host_mid}`)
      }
    } else {
      // 在数据库中添加订阅
      await bilibiliDB.subscribeBilibiliUser(
        groupId,
        botId,
        host_mid,
        data.data.card.name
      )

      // 不存在相同的 host_mid，新增一个配置项
      config.bilibili.push({
        switch: true,
        host_mid,
        group_id: [`${groupId}:${botId}`],
        remark: data.data.card.name
      })

      await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${data.data.card.name}\nUID：${host_mid}`)
      if (Config.bilibili.push.switch === false) await this.e.reply('请发送「#kkk设置B站推送开启」以进行推送')
    }

    // 更新配置文件
    Config.Modify('pushlist', 'bilibili', config.bilibili)
    // 渲染状态图片
    await this.renderPushList()
  }

  /**
   * 检查并更新配置文件中指定用户的备注信息。
   * 该函数会遍历配置文件中的用户列表，对于没有备注或备注为空的用户，会从外部数据源获取其备注信息，并更新到配置文件中。
   */
  async checkremark () {
    // 读取配置文件内容
    const config = Config.pushlist
    const abclist: { host_mid: number }[] | { host_mid: number; group_id: string[] }[] = []
    if (Config.pushlist.bilibili === null || Config.pushlist.bilibili.length === 0) return true
    // 遍历配置文件中的用户列表，收集需要更新备注信息的用户
    for (const i of Config.pushlist.bilibili) {
      const remark = i.remark
      const group_id = i.group_id
      const host_mid = i.host_mid

      if (remark === undefined || remark === '') {
        abclist.push({ host_mid, group_id })
      }
    }

    // 如果有需要更新备注的用户，则逐个获取备注信息并更新到配置文件中
    if (abclist.length > 0) {
      for (const i of abclist) {
        // 从外部数据源获取用户备注信息
        const resp = await this.amagi.getBilibiliData('用户主页数据', { host_mid: i.host_mid, typeMode: 'strict' })
        const remark = resp.data.data.card.name
        // 在配置文件中找到对应的用户，并更新其备注信息
        const matchingItemIndex = config.bilibili.findIndex(item => item.host_mid === i.host_mid)
        if (matchingItemIndex !== -1) {
          config.bilibili[matchingItemIndex].remark = remark
        }
      }
      // 将更新后的配置文件内容写回文件
      Config.Modify('pushlist', 'bilibili', config.bilibili)
    }
  }

  /**
   * 强制推送
   * @param data 处理完成的推送列表
   */
  async forcepush (data: WillBePushList) {
    const currentGroupId = 'groupId' in this.e && this.e.groupId ? this.e.groupId : ''
    const currentBotId = this.e.selfId

    // 如果不是全部强制推送，需要过滤数据
    if (!this.e.msg.includes('全部')) {
      // 获取当前群组订阅的所有UP主
      const subscriptions = await bilibiliDB.getGroupSubscriptions(currentGroupId)
      const subscribedUids = subscriptions.map(sub => sub.host_mid)

      /** 创建一个新的推送列表，只包含当前群组订阅的UP主的动态 */
      const filteredData: WillBePushList = {}

      for (const dynamicId in data) {
        // 检查该动态的UP主是否被当前群组订阅
        if (subscribedUids.includes(data[dynamicId].host_mid)) {
          // 复制该动态到过滤后的列表，并将目标设置为当前群组
          filteredData[dynamicId] = {
            ...data[dynamicId],
            targets: [{
              groupId: currentGroupId,
              botId: currentBotId
            }]
          }
        }
      }

      // 使用过滤后的数据进行推送
      await this.getdata(filteredData)
    } else {
      // 全部强制推送，保持原有逻辑
      await this.getdata(data)
    }
  }

  /** 渲染推送列表图片 */
  async renderPushList () {
    await this.syncConfigToDatabase()
    const groupInfo = await this.e.bot.getGroupInfo('groupId' in this.e && this.e.groupId ? this.e.groupId : '')

    // 获取当前群组的所有订阅
    const subscriptions = await bilibiliDB.getGroupSubscriptions(groupInfo.groupId)

    if (subscriptions.length === 0) {
      await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})\n没有设置任何B站UP推送！\n可使用「#设置B站推送 + UP主UID」进行设置`)
      return
    }

    /** 用户的今日动态列表 */
    const renderOpt: Record<string, string>[] = []

    // 获取所有订阅UP主的信息
    for (const subscription of subscriptions) {
      const host_mid = subscription.host_mid
      const userInfo = await this.amagi.getBilibiliData('用户主页数据', { host_mid, typeMode: 'strict' })

      renderOpt.push({
        avatar_img: userInfo.data.data.card.face,
        username: userInfo.data.data.card.name,
        host_mid: userInfo.data.data.card.mid,
        fans: Count(userInfo.data.data.follower),
        total_favorited: Count(userInfo.data.data.like_num),
        following_count: Count(userInfo.data.data.card.attention)
      })
    }

    const img = await Render('bilibili/userlist', { renderOpt })
    await this.e.reply(img)
  }
}

/**
 * 将换行符替换为HTML的<br>标签。
 * @param data 需要进行换行符替换的字符串。
 * @returns 替换后的字符串，其中的换行符\n被<br>替换。
 */
function br (data: string): string {
  // 使用正则表达式将所有换行符替换为<br>
  return (data = data.replace(/\n/g, '<br>'))
}

/**
 * 检查成员是否为VIP，并根据VIP状态改变其显示颜色。
 * @param member 成员对象，需要包含vip属性，该属性应包含vipStatus和nickname_color（可选）。
 * @returns 返回成员名称的HTML标签字符串，VIP成员将显示为特定颜色，非VIP成员显示为默认颜色。
 */
function checkvip (member: BiliUserProfile['data']['card'] | BiliUserDynamic['data']['items'][number]['orig']['modules']['module_author']): string {
  // 根据VIP状态选择不同的颜色显示成员名称
  return member.vip.status === 1
    ? `<span style="color: ${member.vip.nickname_color ?? '#FB7299'}; font-weight: 700;">${member.name}</span>`
    : `<span style="color: ${Common.useDarkTheme() ? '#EDEDED' : '#606060'}">${member.name}</span>`
}

/**
 * 处理并提取表情数据，返回一个包含表情名称和URL的对象数组。
 * @param data 表情数据的数组，每个元素包含一个表情包的信息。
 * @returns 返回一个对象数组，每个对象包含text(表情名称)和url(表情图片地址)属性。
 */
function extractEmojisData (data: any[]) {
  const emojisData: { text: string; url: string }[] = []

  // 遍历data数组中的每个表情包
  data.forEach((packages) => {
    // 遍历每个表情包中的每个表情
    packages.emote.forEach((emote: { text: string; url: string }) => {
      emojisData.push({ text: emote.text, url: emote.url })
    })
  })

  return emojisData
}

/**
 * 判断标题是否有屏蔽词或屏蔽标签
 * @param PushItem 推送项
 * @returns 是否应该跳过推送
 */
const skipDynamic = async (PushItem: BilibiliPushItem): Promise<boolean> => {
  const tags: string[] = []

  // 提取标签
  if (PushItem.Dynamic_Data.modules.module_dynamic?.desc?.rich_text_nodes) {
    for (const node of PushItem.Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) {
      if (node.type === 'topic') {
        if (node.orig_text) {
          tags.push(node.orig_text)
        }
      }
    }
  }

  // 检查转发的原动态标签
  if (PushItem.Dynamic_Data.type === 'DYNAMIC_TYPE_FORWARD' && 'orig' in PushItem.Dynamic_Data) {
    if (PushItem.Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text) {
      for (const node of PushItem.Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes) {
        if (node.type === 'topic') {
          tags.push(node.orig_text)
        }
      }
    }
  }

  logger.debug(`检查动态是否需要过滤：https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)
  const shouldFilter = await bilibiliDB.shouldFilter(PushItem, tags)
  return shouldFilter
}
