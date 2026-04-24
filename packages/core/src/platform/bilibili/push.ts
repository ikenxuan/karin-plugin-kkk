import fs from 'node:fs'

import {
  BiliUserDynamic,
  BiliUserProfile,
  BiliVideoPlayurlIsLogin,
  DynamicType,
  MajorType,
  Result
} from '@ikenxuan/amagi'
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
import { BilibiliUserListProps } from 'template/types/platforms/bilibili'

import {
  Base,
  baseHeaders,
  bilibiliDB,
  buildGoogleMotionPhoto,
  cleanOldDynamicCache,
  Common,
  Count,
  downloadFile,
  downLoadFileOptions,
  fileInfo,
  loopVideoWithTransition,
  mergeVideoAudio,
  processImageUrl,
  Render,
  uploadFile
} from '@/module'
import { bilibiliFetcher } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'
import {
  bilibiliProcessVideos,
  cover,
  extractArticleImages,
  generateDecorationCard,
  getvideosize,
  parseAdditionalCard,
  TimeFormatter
} from '@/platform/bilibili'
import {
  buildBilibiliArticleRichText,
  buildBilibiliDynamicRichText,
  buildBilibiliVideoDescRichText,
  getUsernameMetadata
} from '@/platform/bilibili/dynamic-text'
import type { bilibiliPushItem, BilibiliPushType } from '@/types/config/pushlist'

/** BilibiliPushType 到 DynamicType 的映射 */
const pushTypeToDynamicType: Record<BilibiliPushType, DynamicType> = {
  video: DynamicType.AV,
  draw: DynamicType.DRAW,
  word: DynamicType.WORD,
  live: DynamicType.LIVE_RCMD,
  forward: DynamicType.FORWARD,
  article: DynamicType.ARTICLE
}

/** 所有支持的 BilibiliPushType */
const allBilibiliPushTypes: BilibiliPushType[] = ['video', 'draw', 'word', 'live', 'forward', 'article']


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
  Referer: 'https://www.bilibili.com',
  Cookie: Config.cookies.bilibili
}

export class Bilibilipush extends Base {
  private force = false

  constructor (e = {} as Message, force: boolean = false) {
    super(e)
    this.force = force
  }

  private injectBotToEventForRender (targets: Array<{ groupId: string, botId: string }>): void {
    const targetBotId = targets.find(item => item.botId)?.botId
    if (!targetBotId) return

    const bot = karin.getBot(targetBotId) as AdapterType | undefined
    if (!bot) return

    const eventWithBot = this.e as Message & { bot?: AdapterType, selfId?: string }
    eventWithBot.bot = bot
    eventWithBot.selfId = eventWithBot.selfId ?? targetBotId
  }

  /**
   * 检查并补全配置文件中缺失的字段
   * @param pushList 推送配置列表
   */
  private ensureConfigFields (pushList: bilibiliPushItem[]): void {
    if (!pushList || pushList.length === 0) return

    let hasChanges = false

    for (const item of pushList) {
      // 检查并补全 pushTypes 字段
      if (!item.pushTypes?.length) {
        item.pushTypes = [...allBilibiliPushTypes]
        hasChanges = true
        logger.info(`[karin-plugin-kkk][v2.28.0] 为UP主 ${item.remark ?? item.host_mid} 自动补全推送类型：投稿视频、图文动态、纯文动态、直播动态、转发动态、投稿专栏`)
      }

      // 检查并补全 switch 字段
      if (item.switch === undefined) {
        item.switch = true
        hasChanges = true
      }
    }

    // 如果有修改，保存到配置文件
    if (hasChanges) {
      Config.Modify('pushlist', 'bilibili', pushList)
      logger.info('已自动补全B站推送配置文件中缺失的字段并保存')
    }
  }
  
  /**
   * 执行主要的操作流程
   */
  async action () {
    await this.syncConfigToDatabase()

    // 检查并补全配置文件中缺失的字段
    this.ensureConfigFields(Config.pushlist.bilibili)
    // 清理旧的动态缓存记录
    const deletedCount = await cleanOldDynamicCache('bilibili')
    if (deletedCount > 0) {
      logger.info(`已清理 ${deletedCount} 条过期的B站动态缓存记录`)
    }

    // 获取已注册的 bot 列表，过滤未注册的 bot
    const registeredBotIds = karin.getAllBotID()
    const filteredPushList = this.filterPushListByRegisteredBots(Config.pushlist.bilibili, registeredBotIds)

    if (filteredPushList.length === 0) {
      logger.warn('没有已注册的 bot 可用于B站推送')
      return true
    }

    const data = await this.getDynamicList(filteredPushList)
    const pushdata = await this.excludeAlreadyPushed(data.willbepushlist)

    if (Object.keys(pushdata).length === 0) return true

    if (this.force) {
      return await this.forcepush(pushdata)
    } else {
      return await this.getdata(pushdata)
    }
  }

  /**
   * 根据已注册的 bot 列表过滤推送配置
   * @param pushList 原始推送配置列表
   * @param registeredBotIds 已注册的 bot ID 列表
   * @returns 过滤后的推送配置列表
   */
  private filterPushListByRegisteredBots (pushList: bilibiliPushItem[], registeredBotIds: string[]): bilibiliPushItem[] {
    if (!pushList || pushList.length === 0) return []

    const registeredSet = new Set(registeredBotIds)
    const filteredList: bilibiliPushItem[] = []

    for (const item of pushList) {
      // 过滤 group_id 中未注册的 bot
      const filteredGroupIds = item.group_id.filter(groupWithBot => {
        const botId = groupWithBot.split(':')[1]
        const isRegistered = registeredSet.has(botId)
        if (!isRegistered) {
          logger.debug(`Bot ${botId} 未注册，跳过群组 ${groupWithBot.split(':')[0]} 的推送`)
        }
        return isRegistered
      })

      // 如果过滤后还有有效的群组，则保留该订阅项
      if (filteredGroupIds.length > 0) {
        filteredList.push({
          ...item,
          group_id: filteredGroupIds
        })
      } else {
        logger.debug(`UP主 ${item.remark ?? item.host_mid} 的所有推送目标 bot 均未注册，跳过`)
      }
    }

    return filteredList
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
    for (const dynamicId in data) {
      logger.mark(`
        ${logger.blue('开始处理并渲染B站动态图片')}
        ${logger.cyan('UP')}: ${logger.green(data[dynamicId].remark)}
        ${logger.cyan('动态id')}：${logger.yellow(dynamicId)}
        ${logger.cyan('访问地址')}：${logger.green('https://t.bilibili.com/' + dynamicId)}`)

      let skip = await skipDynamic(data[dynamicId])
      skip && logger.warn(`动态 https://t.bilibili.com/${dynamicId} 已被处理，跳过`)
      let send_video = true; let img: ImageElement[] = []
      const dynamicCARDINFO = await this.amagi.bilibili.fetcher.fetchDynamicCard({ dynamic_id: dynamicId, typeMode: 'strict' })
      const dycrad = dynamicCARDINFO.data.data.card && dynamicCARDINFO.data.data.card.card && JSON.parse(dynamicCARDINFO.data.data.card.card)
      this.injectBotToEventForRender(data[dynamicId].targets)

      if (!skip) {
        const userINFO = await this.amagi.bilibili.fetcher.fetchUserCard({ host_mid: data[dynamicId].host_mid, typeMode: 'strict' })
        let emojiDATA = await this.amagi.bilibili.fetcher.fetchEmojiList({ typeMode: 'strict' }) as any
        emojiDATA = extractEmojisData(emojiDATA.data.data.packages)
        switch (data[dynamicId].dynamic_type) {
          /** 处理图文动态 */
          case DynamicType.DRAW: {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null && data[dynamicId].Dynamic_Data.modules.module_dynamic && data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
              const name = data[dynamicId].Dynamic_Data.modules.module_dynamic.topic!.name
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus.summary.rich_text_nodes.unshift({
                orig_text: name,
                text: name,
                type: 'topic',
                rid: data[dynamicId].Dynamic_Data.modules.module_dynamic.topic!.id.toString()
              })
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major!.opus.summary.text = `${name}\n\n` + data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text
            }
            img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_DRAW',
              {
                image_url: dycrad.item.pictures && cover(dycrad.item.pictures),
                title: data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.title ?? undefined,
                text: buildBilibiliDynamicRichText(
                  data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text ?? '',
                  data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.rich_text_nodes ?? []
                ),
                dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                usernameMeta: getUsernameMetadata(userINFO.data.data.card),
                fans: Count(userINFO.data.data.follower),
                user_shortid: data[dynamicId].host_mid,
                total_favorited: Count(userINFO.data.data.like_num),
                following_count: Count(userINFO.data.data.card.attention),
                decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decoration_card),
                render_time: TimeFormatter.now(),
                imageLayout: Config.bilibili.imageLayout,
                additional: parseAdditionalCard(data[dynamicId].Dynamic_Data.modules.module_dynamic.additional),
                dynamicTYPE: '图文动态推送'
              }
            )
            break
          }
          /** 处理纯文动态 */
          case DynamicType.WORD: {
            // 处理话题
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
              const name = data[dynamicId].Dynamic_Data.modules.module_dynamic.topic!.name
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus.summary.rich_text_nodes.unshift({
                orig_text: name,
                text: name,
                type: 'topic',
                rid: data[dynamicId].Dynamic_Data.modules.module_dynamic.topic!.id.toString()
              })
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major!.opus.summary.text = `${name}\n\n` + data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text
            }

            const text = buildBilibiliDynamicRichText(
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text ?? '',
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.rich_text_nodes ?? []
            )

            img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_WORD', {
              text,
              dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
              pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
              share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
              create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
              avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
              frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
              share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
              usernameMeta: getUsernameMetadata(userINFO.data.data.card),
              fans: Count(userINFO.data.data.follower),
              user_shortid: data[dynamicId].host_mid,
              total_favorited: Count(userINFO.data.data.like_num),
              following_count: Count(userINFO.data.data.card.attention),
              decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decoration_card),
              render_time: TimeFormatter.now(),
              additional: parseAdditionalCard(data[dynamicId].Dynamic_Data.modules.module_dynamic.additional),
              dynamicTYPE: '纯文动态推送'
            })
            break
          }
          /** 处理视频动态 */
          case DynamicType.AV: {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.type === 'MAJOR_TYPE_ARCHIVE') {
              const bvid = data[dynamicId].Dynamic_Data?.modules.module_dynamic.major?.archive?.bvid ?? ''
              const INFODATA = await bilibiliFetcher.fetchVideoInfo({ bvid, typeMode: 'strict' })

              /** 特殊字段，只有番剧和影视才会有，如果是该类型视频，默认不发送 */
              if (INFODATA.data.data.redirect_url) {
                send_video = false
                logger.debug(`UP主：${INFODATA.data.data.owner.name} 的该动态类型为${logger.yellow('番剧或影视')}，默认跳过不下载，直达：${logger.green(INFODATA.data.data.redirect_url)}`)
              } else {
                // const noCkData = await getBilibiliData('单个视频下载信息数据', { avid: Number(aid), cid: INFODATA.data.data.cid, typeMode: 'strict' })
              }

              // 处理共创者信息
              let staff = undefined
              if (INFODATA.data.data.staff && Array.isArray(INFODATA.data.data.staff)) {
                const currentMid = data[dynamicId].host_mid
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
                  text: buildBilibiliDynamicRichText(INFODATA.data.data.title, []),
                  desc: INFODATA.data.data.desc_v2?.length
                    ? buildBilibiliVideoDescRichText(INFODATA.data.data.desc_v2)
                    : buildBilibiliDynamicRichText(INFODATA.data.data.desc || '', []),
                  dianzan: Count(INFODATA.data.data.stat.like),
                  pinglun: Count(INFODATA.data.data.stat.reply),
                  share: Count(INFODATA.data.data.stat.share),
                  view: Count(dycrad.stat.view),
                  coin: Count(dycrad.stat.coin),
                  duration_text: data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.archive?.duration_text ?? '0:00',
                  create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                  avatar_url: userINFO.data.data.card.face,
                  frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                  share_url: 'https://www.bilibili.com/video/' + bvid,
                  usernameMeta: getUsernameMetadata(userINFO.data.data.card),
                  fans: Count(userINFO.data.data.follower),
                  user_shortid: data[dynamicId].host_mid,
                  total_favorited: Count(userINFO.data.data.like_num),
                  following_count: Count(userINFO.data.data.card.attention),
                  render_time: TimeFormatter.now(),
                  dynamicTYPE: '视频动态推送',
                  dynamic_id: dynamicId,
                  staff
                }
              )
            }
            break
          }
          /** 处理直播动态 */
          case DynamicType.LIVE_RCMD: {
            img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
              {
                image_url: dycrad.live_play_info.cover,
                text: buildBilibiliDynamicRichText(dycrad.live_play_info.title, []),
                liveinf: br(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
                usernameMeta: getUsernameMetadata(userINFO.data.data.card),
                avatar_url: userINFO.data.data.card.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                fans: Count(userINFO.data.data.follower),
                create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                now_time: TimeFormatter.now(),
                share_url: 'https://live.bilibili.com/' + dycrad.live_play_info.room_id,
                dynamicTYPE: '直播动态推送'
              }
            )
            break
          }
          /** 处理转发动态 */
          case DynamicType.FORWARD: {
            // 处理话题
            if ('topic' in data[dynamicId].Dynamic_Data.modules.module_dynamic && data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
              const name = (data[dynamicId].Dynamic_Data.modules.module_dynamic.topic as { name: string }).name
              data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.rich_text_nodes.unshift({
                orig_text: name,
                jump_url: '',
                text: name,
                type: 'topic'
              })
              data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text = `${name}\n\n` + data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text
            }

            const text = buildBilibiliDynamicRichText(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text, data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.rich_text_nodes)
            let param = {}
            /** 富文本节点：查看图片 */
            const imgList = []
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.desc) {
              for (const richTxtItem of data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) {
                if (richTxtItem.type === 'RICH_TEXT_NODE_TYPE_VIEW_PICTURE') {
                  for (const pic of richTxtItem.pics) {
                    imgList.push(pic.src)
                  }
                }
              }
            }
            switch (data[dynamicId].Dynamic_Data.orig.type) {
              case DynamicType.AV: {
                param = {
                  usernameMeta: getUsernameMetadata(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  pub_action: data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_action,
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  duration_text: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.duration_text,
                  title: buildBilibiliDynamicRichText(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.title ?? '', []),
                  danmaku: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.danmaku,
                  view: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.view,
                  play: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.play,
                  cover: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.cover,
                  create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.DRAW: {
                const dynamicCARD = await bilibiliFetcher.fetchDynamicCard({ dynamic_id: data[dynamicId].Dynamic_Data.orig.id_str, typeMode: 'strict' })
                const cardData = JSON.parse(dynamicCARD.data.data.card.card)
                param = {
                  title: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major?.opus?.title ?? null,
                  usernameMeta: getUsernameMetadata(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: buildBilibiliDynamicRichText(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text, data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  image_url: cardData.item.pictures && cover(cardData.item.pictures),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.WORD: {
                param = {
                  usernameMeta: getUsernameMetadata(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: buildBilibiliDynamicRichText(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text, data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                }
                break
              }
              case DynamicType.LIVE_RCMD: {
                const liveData = JSON.parse(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.live_rcmd.content)
                param = {
                  usernameMeta: getUsernameMetadata(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image,
                  cover: liveData.live_play_info.cover,
                  text_large: liveData.live_play_info.watched_show.text_large,
                  area_name: liveData.live_play_info.area_name,
                  title: buildBilibiliDynamicRichText(liveData.live_play_info.title, []),
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
            img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_FORWARD', {
              text,
              dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
              pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
              share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
              create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
              avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
              frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
              share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
              usernameMeta: getUsernameMetadata(userINFO.data.data.card),
              fans: Count(userINFO.data.data.follower),
              user_shortid: data[dynamicId].Dynamic_Data.modules.module_author.mid,
              total_favorited: Count(userINFO.data.data.like_num),
              following_count: Count(userINFO.data.data.card.attention),
              dynamicTYPE: '转发动态推送',
              decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
              render_time: TimeFormatter.now(),
              original_content: { [data[dynamicId].Dynamic_Data.orig.type]: param },
              imgList: imgList.length > 0 ? imgList : null
            })
            break
          }
          /** 文章/专栏动态 */
          case DynamicType.ARTICLE: {
            const articleInfoBase = await this.amagi.bilibili.fetcher.fetchArticleInfo({ id: data[dynamicId].Dynamic_Data.basic.rid_str, typeMode: 'strict' })
            const articleInfo = await this.amagi.bilibili.fetcher.fetchArticleContent({ id: data[dynamicId].Dynamic_Data.basic.rid_str, typeMode: 'strict' })

            // 提取专栏基本信息
            const articleData = articleInfoBase.data.data
            // 提取专栏正文内容
            const articleContent = articleInfo.data.data

            // 构建渲染数据
            img = await Render(this.e, 'bilibili/dynamic/DYNAMIC_TYPE_ARTICLE',
              {
                // 用户信息
                usernameMeta: getUsernameMetadata(data[dynamicId].Dynamic_Data.modules.module_author),
                avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                create_time: TimeFormatter.toDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                user_shortid: data[dynamicId].host_mid,
                fans: Count(userINFO.data.data.follower),
                total_favorited: Count(userINFO.data.data.like_num),
                following_count: Count(userINFO.data.data.card.attention),

                // 专栏内容信息
                title: articleData.title,
                summary: articleData.summary,
                banner_url: articleData.banner_url || (articleData.image_urls && articleData.image_urls[0]) || '',
                categories: articleData.categories || [],
                words: articleData.words || 0,

                // 专栏正文内容（richtext 格式）
                body: buildBilibiliArticleRichText(articleContent.opus, articleContent.content, Common.useDarkTheme()),

                // 统计信息
                stats: articleData.stats,
                render_time: TimeFormatter.now(),
                // 分享链接
                share_url: articleContent.dyn_id_str ? `https://www.bilibili.com/opus/${articleContent.dyn_id_str}` : `https://www.bilibili.com/read/cv${articleContent.id}`,
                dynamicTYPE: '专栏动态推送'
              }
            )
            break
          }
          /** 未处理的动态类型 */
          default: {
            skip = true
            logger.warn(`UP主：${data[dynamicId].remark}「${data[dynamicId].dynamic_type}」动态类型的暂未支持推送\n动态地址：${'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str}\n可通过 https://github.com/ikenxuan/karin-plugin-kkk/issues/new/choose 提交反馈`)
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
          if (Config.bilibili.push.parsedynamic && status.messageId) {
            switch (data[dynamicId].dynamic_type) {
              case 'DYNAMIC_TYPE_AV': {
                if (send_video) {
                  let correctList!: {
                    accept_description: string[]
                    videoList: BiliVideoPlayurlIsLogin['data']['dash']['video']
                  }
                  let videoSize = ''
                  const playUrlData = await this.amagi.bilibili.fetcher.fetchVideoStreamUrl({
                    avid: dycrad.aid,
                    cid: dycrad.cid,
                    typeMode: 'strict'
                  }) as Result<BiliVideoPlayurlIsLogin>
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
                  const infoData = await this.amagi.bilibili.fetcher.fetchVideoInfo({ bvid: dynamicCARDINFO.data.data.card.desc.bvid, typeMode: 'strict' })
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
                    const resultPath = Common.tempDri.video + `Bil_Result_${infoData.data.data.bvid}.mp4`
                    const success = await mergeVideoAudio(mp4File.filepath, mp3File.filepath, resultPath)

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
                        await uploadFile(
                          this.e,
                          { filepath: filePath, totalBytes: fileSizeInMB, originTitle: `${infoData.data.data.desc.substring(0, 50).replace(/[\\/:\\*\\?"<>\\|\r\n\s]/g, ' ')}` },
                          '',
                          { useGroupFile: true, active: true, activeOption: { group_id: groupId, uin: botId } })
                      } else {
                        /** 因为本地合成，没有视频直链 */
                        await uploadFile(
                          this.e,
                          { filepath: filePath, totalBytes: fileSizeInMB },
                          '',
                          { active: true, activeOption: { group_id: groupId, uin: botId } }
                        )
                      }
                    } else {
                      await Common.removeFile(mp4File.filepath, true)
                      await Common.removeFile(mp3File.filepath, true)
                    }
                  }
                }
                break
              }
              case 'DYNAMIC_TYPE_DRAW': {
                const imgArray = []
                const temp: fileInfo[] = []
                let hasGeneratedLivePhoto = false // 标记是否生成了实况图
                const title = data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.title || 'bilibili_dynamic'
                const images = data[dynamicId].Dynamic_Data.modules.module_dynamic.major &&
                  data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items ||
                  data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.opus.pics
                if (images.length === 0) break
                for (const [index, img2] of images.entries()) {
                  const imageSrc = img2.src ?? img2.url
                  if (img2.live_url && imageSrc) {
                    const livePhoto = await downloadFile(img2.live_url, {
                      title: `Bilibili_tmp_V_${Date.now()}_${index}.mp4`,
                      headers: bilibiliBaseHeaders
                    })

                    if (livePhoto.filepath) {
                      const outputPath = Common.tempDri.video + `Bilibili_Live_${Date.now()}_${index}.mp4`
                      const staticImg = await downloadFile(imageSrc, {
                        title: `Bilibili_static_${Date.now()}_${index}.jpg`,
                        headers: bilibiliBaseHeaders,
                        filepath: Common.tempDri.images + `Bilibili_static_${Date.now()}_${index}.jpg`
                      })
                      if (staticImg.filepath) {
                        temp.push({ filepath: staticImg.filepath, totalBytes: 0 })
                      }

                      // 根据 livePhotoMode 配置决定处理方式
                      const livePhotoMode = Config.app.livePhotoMode ?? 'video_and_livephoto'
                      const shouldGenerateVideo = livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'video_only'
                      const shouldGenerateLivePhoto = livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'livephoto_only'

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
                          const motionPhotoCoverPath = Common.tempDri.images + `MVIMG_${Date.now()}_${index}.jpg`
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
                          const imageUrl = await processImageUrl(imageSrc, title, index)
                          imgArray.push(segment.image(imageUrl))
                        } else {
                          hasGeneratedLivePhoto = true // 标记已生成实况图
                        }
                      }

                      logger.mark('正在尝试删除缓存文件')
                      await Common.removeFile(livePhoto.filepath, true)
                      continue
                    }
                  }
                  if (imageSrc) {
                    const imageUrl = await processImageUrl(imageSrc, title, index)
                    imgArray.push(segment.image(imageUrl))
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

                const forwardMsg = common.makeForward(imgArray, botId, bot.account.name)
                try {
                  await bot.sendForwardMsg(Contact, forwardMsg, {
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
                break
              }
              case 'DYNAMIC_TYPE_ARTICLE': {
                const articleInfo = await this.amagi.bilibili.fetcher.fetchArticleContent({ id: data[dynamicId].Dynamic_Data.basic.rid_str, typeMode: 'strict' })
                // 提取所有图片
                const messageElements: ImageElement[] = []
                const articleImages = extractArticleImages(articleInfo.data.data)
                const title = articleInfo.data.data.title || 'bilibili_article'
                for (const [index, item] of articleImages.entries()) {
                  const imageUrl = await processImageUrl(item, title, index)
                  messageElements.push(segment.image(imageUrl))
                }

                if (messageElements.length === 1) bot.sendMsg(Contact, messageElements)
                if (messageElements.length > 1) {
                  const forwardMsg = common.makeForward(messageElements, botId, bot.account.name)
                  await bot.sendForwardMsg(Contact, forwardMsg, {
                    source: '图片合集',
                    summary: `查看${messageElements.length}张图片消息`,
                    prompt: 'B站专栏动态解析结果',
                    news: [{ text: '点击查看解析结果' }]
                  })
                }

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
        await common.sleep(2000)
        logger.debug(`[Bilibili 推送] 开始获取UP: ${item.remark}（${item.host_mid}） 的动态列表`)
        const pushTypes = item.pushTypes || allBilibiliPushTypes
        const allowedDynamicTypes = new Set(pushTypes.map(pt => pushTypeToDynamicType[pt]))
        const dynamic_list = await this.amagi.bilibili.fetcher.fetchUserDynamicList({ host_mid: item.host_mid, typeMode: 'strict' })
        if (dynamic_list.data.data.items.length > 0) {
          // 遍历接口返回的视频列表
          for (const dynamic of dynamic_list.data.data.items) {
            const nowSeconds = Math.floor(Date.now() / 1000) // 当前时间戳（秒）
            const createTime = dynamic.modules.module_author.pub_ts // 发布时间戳（秒）
            const timeDifference = nowSeconds - createTime // 时间差（秒）

            const is_top = dynamic.modules.module_tag?.text === '置顶' // 是否为置顶
            let shouldPush = false // 是否列入推送数组

            const timeDiffHours = Math.round((timeDifference / 3600) * 100) / 100 // 保留2位小数

            // 条件判断，以下任何一项成立都将进行推送：如果是置顶且发布时间在一天内 || 如果是置顶作品且有新的群组且发布时间在一天内 || 如果有新的群组且发布时间在一天内
            logger.trace(`
              前期获取该动态基本信息：
              UP主：${dynamic.modules.module_author.name}
              动态ID：${dynamic.id_str}
              发布时间：${TimeFormatter.toDateTime(createTime)}
              发布时间戳（s）：${createTime}
              当前时间戳（s）：${nowSeconds}
              时间差（s）：${timeDifference}s (${timeDiffHours}h)
              是否置顶：${is_top}
              是否在一天内：${timeDifference < 86400 ? logger.green('true') : logger.red('false')}
              `)

            if ((is_top && timeDifference < 86400) || (timeDifference < 86400)) {
              shouldPush = true
              logger.trace(logger.green(`根据以上判断，shoulPush 为 true，将对该动态纳入当天推送列表：https://t.bilibili.com/${dynamic.id_str}\n`))
            } else logger.trace(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该动态：https://t.bilibili.com/${dynamic.id_str}\n`))
            // 如果 shouldPush 为 true，或该作品距现在的时间差小于一天，则将该动态添加到 willbepushlist 中
            if (timeDifference < 86400 || shouldPush) {
              // 根据推送类型过滤
              if (!allowedDynamicTypes.has(dynamic.type as DynamicType)) {
                logger.debug(`UP主 ${item.remark}（${item.host_mid}）的动态 ${dynamic.id_str} 类型为「${dynamic.type}」，不在推送类型配置中，跳过`)
                continue
              }

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
        }
      }
    } catch (error) {
      throw new Error(`获取动态列表失败: ${error}`)
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
        if (Config.bilibili.push.switch === false) await this.e.reply('请发送「#设置B站推送开启」以进行推送')

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
      if (Config.bilibili.push.switch === false) await this.e.reply('请发送「#设置B站推送开启」以进行推送')
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
        const resp = await this.amagi.bilibili.fetcher.fetchUserCard({ host_mid: i.host_mid, typeMode: 'strict' })
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
    const renderOpt: BilibiliUserListProps['data']['renderOpt'] = []

    // 获取所有订阅UP主的信息
    for (const subscription of subscriptions) {
      const host_mid = subscription.host_mid
      const userInfo = await this.amagi.bilibili.fetcher.fetchUserCard({ host_mid, typeMode: 'strict' })

      // 查找配置文件中对应的全局开关状态
      const configItem = Config.pushlist.bilibili?.find((item: bilibiliPushItem) => item.host_mid === host_mid)
      const switchStatus = configItem?.switch !== false // 默认为 true
      const pushTypes = configItem?.pushTypes || allBilibiliPushTypes

      renderOpt.push({
        avatar_img: userInfo.data.data.card.face,
        username: userInfo.data.data.card.name,
        host_mid: userInfo.data.data.card.mid,
        fans: Count(userInfo.data.data.follower),
        total_favorited: Count(userInfo.data.data.like_num),
        following_count: Count(userInfo.data.data.card.attention),
        switch: switchStatus,
        pushTypes
      })
    }

    const img = await Render(this.e, 'bilibili/userlist', {
      renderOpt,
      groupInfo: {
        groupId: groupInfo.groupId || '',
        groupName: groupInfo.groupName || ''
      }
    })
    await this.e.reply(img)
  }
}

/**
 * 将换行符替换为HTML的<br>标签。
 * @param data 需要进行换行符替换的字符串。
 * @returns 替换后的字符串，其中的换行符\n被<br>替换。
 */
const br = (data: string): string => {
  // 使用正则表达式将所有换行符替换为<br>
  return (data = data.replace(/\n/g, '<br>'))
}

/**
 * 处理并提取表情数据，返回一个包含表情名称和URL的对象数组。
 * @param data 表情数据的数组，每个元素包含一个表情包的信息。
 * @returns 返回一个对象数组，每个对象包含text(表情名称)和url(表情图片地址)属性。
 */
const extractEmojisData = (data: any[]) => {
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
  if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && 'orig' in PushItem.Dynamic_Data) {
    if (
      PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.DRAW ||
      PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.OPUS ||
      PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.LIVE_RCMD
    ) {
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
