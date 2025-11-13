import type { ApiResponse, DySearchInfo, DyUserInfo, DyUserLiveVideos } from '@ikenxuan/amagi'
import type { AdapterType, ImageElement, Message } from 'node-karin'
import karin, { common, logger, segment } from 'node-karin'
import { DouyinUserListProps } from 'template/types/platforms/douyin'

import {
  Base,
  baseHeaders,
  cleanOldDynamicCache,
  Common,
  douyinDB,
  downLoadFileOptions,
  downloadVideo,
  Networks,
  Render
} from '@/module'
import { Config } from '@/module/utils/Config'
import { DouyinIdData, douyinProcessVideos, getDouyinID } from '@/platform/douyin'
import type { douyinPushItem } from '@/types/config/pushlist'

/** 每个推送项的类型定义 */
export type DouyinPushItem = {
  /** 博主的昵称 */
  remark: string
  /** 博主UID */
  sec_uid: string
  /** 作品发布时间 */
  create_time: number
  /** 要推送到的群组和机器人ID */
  targets: Array<{ groupId: string, botId: string }>
  /** 作品详情信息 */
  Detail_Data: {
    /** 博主主页信息 */
    user_info: ApiResponse<DyUserInfo>
    liveStatus?: { liveStatus: 'open' | 'close', isChanged: boolean, isliving: boolean }
    live_data?: ApiResponse<DyUserLiveVideos>
    [key: string]: any
  }
  /** 博主头像url */
  avatar_img: string
  /** 是否正在直播 */
  living: boolean
}
/** 推送列表的类型定义 */
type WillBePushList = Record<string, DouyinPushItem>
const douyinBaseHeaders: downLoadFileOptions['headers'] = {
  ...baseHeaders,
  Referer: 'https://www.douyin.com',
  Cookie: Config.cookies.douyin
}

export class DouYinpush extends Base {
  private force = false
  /**
   *
   * @param e  事件Message
   * @param force 是否强制推送
   * @default false
   * @returns
   */
  constructor (e = {} as Message, force: boolean = false) {
    super(e)
    if (this.e.bot?.adapter?.name === 'QQBot') {
      e.reply('不支持QQBot，请使用其他适配器')
      return
    }
    this.headers!.Referer = 'https://www.douyin.com'
    this.headers!.Cookie = Config.cookies.douyin
    this.force = force
  }

  /**
   * 执行主要的操作流程
   */
  async action () {
    await this.syncConfigToDatabase()

    // 清理旧的作品缓存记录
    const deletedCount = await cleanOldDynamicCache('douyin')
    if (deletedCount > 0) {
      logger.info(`已清理 ${deletedCount} 条过期的抖音作品缓存记录`)
    }

    // 检查备注信息
    if (await this.checkremark()) return true

    const data = await this.getDynamicList(Config.pushlist.douyin)

    if (Object.keys(data).length === 0) return true

    if (this.force) return await this.forcepush(data)
    else return await this.getdata(data)
  }

  /**
   * 同步配置文件中的订阅信息到数据库
   */
  async syncConfigToDatabase () {
    // 如果配置文件中没有抖音推送列表，直接返回
    if (!Config.pushlist.douyin || Config.pushlist.douyin.length === 0) {
      return
    }

    await douyinDB.syncConfigSubscriptions(Config.pushlist.douyin)
  }

  async getdata (data: WillBePushList) {
    if (Object.keys(data).length === 0) return true

    for (const awemeId in data) {
      logger.mark(`
        ${logger.blue('开始处理并渲染抖音动态图片')}
        ${logger.blue('博主')}: ${logger.green(data[awemeId].remark)} 
        ${logger.cyan('作品id')}：${logger.yellow(awemeId)}
        ${logger.cyan('访问地址')}：${logger.green('https://www.douyin.com/video/' + awemeId)}`)

      const pushItem = data[awemeId]
      const Detail_Data = pushItem.Detail_Data
      const skip = await skipDynamic(pushItem)
      skip && logger.warn(`作品 https://www.douyin.com/video/${awemeId} 已被处理，跳过`)
      let img: ImageElement[] = []
      let iddata: DouyinIdData = { is_mp4: true, type: 'one_work' }

      if (!skip) {
        iddata = await getDouyinID(this.e, Detail_Data.share_url ?? 'https://live.douyin.com/' + Detail_Data.room_data?.owner.web_rid, false)
      }

      if (!skip) {
        if (pushItem.living && 'room_data' in pushItem.Detail_Data && Detail_Data.live_data) {
          // 处理直播推送
          img = await Render('douyin/live', {
            image_url: Detail_Data.live_data.data.data.data[0]?.cover!.url_list[0] ?? Detail_Data.live_data.data.data.qrcode_url,
            text: Detail_Data.live_data.data.data.data[0]?.title ?? '',
            liveinf: `${Detail_Data.live_data.data.data.partition_road_map?.partition?.title ?? Detail_Data.live_data.data.data.data[0]?.title ?? '获取失败'} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
            在线观众: Detail_Data.live_data.data.data.data.length > 0 ? this.count(Detail_Data.live_data.data.data.data[0].room_view_stats!.display_value) : '：语音直播不支持',
            总观看次数: Detail_Data.live_data.data.data.data.length > 0 ? this.count(Number(Detail_Data.live_data.data.data.data[0].stats!.total_user_str)) : '：语音直播不支持',
            username: Detail_Data.user_info.data.user.nickname,
            avater_url: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.data.user.avatar_larger.uri,
            fans: this.count(Detail_Data.user_info.data.user.follower_count),
            share_url: 'https://live.douyin.com/' + Detail_Data.room_data.owner.web_rid,
            dynamicTYPE: '直播动态推送'
          })
        } else {
          // 处理普通作品推送
          const realUrl = Config.douyin.push.shareType === 'web' && await new Networks({
            url: Detail_Data.share_url,
            headers: {
              'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
              Accept: '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              Connection: 'keep-alive'
            }
          }).getLocation()
          img = await Render('douyin/dynamic', {
            image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
            desc: this.desc(Detail_Data, Detail_Data.desc),
            dianzan: this.count(Detail_Data.statistics.digg_count),
            pinglun: this.count(Detail_Data.statistics.comment_count),
            share: this.count(Detail_Data.statistics.share_count),
            shouchang: this.count(Detail_Data.statistics.collect_count),
            create_time: Common.convertTimestampToDateTime(pushItem.create_time / 1000),
            avater_url: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.data.user.avatar_larger.uri,
            share_url: Config.douyin.push.shareType === 'web' ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`,
            username: Detail_Data.author.nickname,
            抖音号: Detail_Data.user_info.data.user.unique_id === '' ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
            粉丝: this.count(Detail_Data.user_info.data.user.follower_count),
            获赞: this.count(Detail_Data.user_info.data.user.total_favorited),
            关注: this.count(Detail_Data.user_info.data.user.following_count),
            cooperation_info: (() => {
              const raw = Detail_Data.cooperation_info
              if (!raw) return undefined

              const rawCreators = Array.isArray(raw.co_creators) ? raw.co_creators : []

              // 作者标识，用于对比是否在共创列表中
              const author = Detail_Data.author
              const authorUid = author?.uid
              const authorSecUid = author?.sec_uid
              const authorNickname = author?.nickname

              const authorInCreators = rawCreators.some((c: { uid: string; sec_uid: string; nickname: string }) =>
                (authorUid && c.uid && c.uid === authorUid) ||
                (authorSecUid && c.sec_uid && c.sec_uid === authorSecUid) ||
                (authorNickname && c.nickname && c.nickname === authorNickname)
              )

              // 只保留：头像链接一条、名字、职位（兼容现有组件的 avatar_thumb 结构）
              const co_creators = rawCreators.map((c: { avatar_thumb: { url_list: (string | undefined)[]; uri: any }; nickname: any; role_title: any }) => {
                const firstUrl =
                  c.avatar_thumb?.url_list?.[0] ??
                  (c.avatar_thumb?.uri ? `https://p3.douyinpic.com/${c.avatar_thumb.uri}` : undefined)

                return {
                  avatar_thumb: firstUrl ? { url_list: [firstUrl] } : undefined,
                  nickname: c.nickname,
                  role_title: c.role_title
                }
              })

              // 基础人数取接口给的 co_creator_nums 与列表长度的较大值
              const baseCount = Math.max(Number(raw.co_creator_nums || 0), co_creators.length)
              const teamCount = baseCount + (authorInCreators ? 0 : 1)

              return {
                co_creator_nums: teamCount,
                co_creators
              }
            })()
          })
        }
      }

      // 遍历目标群组，并发送消息
      for (const target of pushItem.targets) {
        try {
          let status = { message_id: '' }
          const { groupId, botId } = target

          if (!skip) {
            const Contact = karin.contactGroup(groupId)
            // 发送消息
            status = await karin.sendMsg(botId, Contact, img ? [...img] : [])

            // 如果是直播推送，更新直播状态
            if (pushItem.living && 'room_data' in pushItem.Detail_Data && status.message_id) {
              await douyinDB.updateLiveStatus(pushItem.sec_uid, true)
            }

            // 是否一同解析该新作品？
            if (Config.douyin.push.parsedynamic && status.message_id) {
              // 如果新作品是视频
              if (iddata.is_mp4) {
                try {
                  /** 默认视频下载地址 */
                  let downloadUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`
                  // 根据配置文件自动选择分辨率
                  logger.debug(`开始排除不符合条件的视频分辨率；\n
                    共拥有${logger.yellow(Detail_Data.video.bit_rate.length)}个视频源\n
                    视频ID：${logger.green(Detail_Data.aweme_id)}\n
                    分享链接：${logger.green(Detail_Data.share_url)}
                    `)
                  const videoObj = douyinProcessVideos(Detail_Data.video.bit_rate, Config.douyin.videoQuality)
                  downloadUrl = await new Networks({
                    url: videoObj[0].play_addr.url_list[0],
                    headers: douyinBaseHeaders
                  }).getLongLink()
                  // 下载视频
                  await downloadVideo(this.e, {
                    video_url: downloadUrl,
                    title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${Detail_Data.desc}.mp4` }
                  }, { active: true, activeOption: { uin: botId, group_id: groupId } })
                } catch (error) {
                  throw new Error(`下载视频失败: ${error}`)
                }
              } else if (!iddata.is_mp4 && iddata.type === 'one_work') { // 如果新作品是图集
                const imageres: ImageElement[] = []
                let image_url
                for (const item of Detail_Data.images) {
                  image_url = item.url_list[2] ?? item.url_list[1] // 图片地址
                  imageres.push(segment.image(image_url))
                }
                const bot = karin.getBot(botId) as AdapterType
                const forwardMsg = common.makeForward(imageres, botId, bot.account.name)
                await bot.sendForwardMsg(karin.contactFriend(botId), forwardMsg)
              }
            }
          }

          // 添加作品缓存
          if (skip || !pushItem.living && status.message_id) {
            await douyinDB.addAwemeCache(awemeId, pushItem.sec_uid, groupId)
          }

        } catch (error) {
          throw new Error(`${error}`)
        }
      }
    }

    return true
  }

  /**
   * 根据配置文件获取用户当天的作品列表。
   * @returns 将要推送的列表
   */
  async getDynamicList (userList: douyinPushItem[]): Promise<WillBePushList> {
    const willbepushlist: WillBePushList = {}

    try {
      /** 过滤掉不启用的订阅项 */
      const filteredUserList = userList.filter(item => item.switch !== false)
      for (const item of filteredUserList) {
        const sec_uid = item.sec_uid
        logger.debug(`开始获取用户：${item.remark}（${sec_uid}）的主页作品列表`)
        const videolist = await this.amagi.getDouyinData('用户主页视频列表数据', { sec_uid, typeMode: 'strict' })
        const userinfo = await this.amagi.getDouyinData('用户主页数据', { sec_uid, typeMode: 'strict' })

        const targets = item.group_id.map(groupWithBot => {
          const [groupId, botId] = groupWithBot.split(':')
          return { groupId, botId }
        })

        // 如果没有订阅群组，跳过该用户
        if (targets.length === 0) continue

        // special_state 特殊状态
        if (userinfo.data.user.special_state_info.special_state === 1 && userinfo.data.user.user_deleted === true) {
          logger.warn(`${item.remark}（${sec_uid}）${userinfo.data.user.special_state_info.title}`)
          continue
        }
        // 处理视频列表
        if (videolist.data.aweme_list.length > 0) {
          for (const aweme of videolist.data.aweme_list) {
            logger.debug(`开始处理作品：${aweme.aweme_id}`)
            const now = Date.now()
            const createTime = aweme.create_time * 1000
            const timeDifference = now - createTime // 时间差，单位毫秒
            const is_top = aweme.is_top === 1 // 是否为置顶
            let shouldPush = false

            const timeDiffSeconds = Math.round(timeDifference / 1000)
            const timeDiffHours = Math.round((timeDifference / 1000 / 60 / 60) * 100) / 100 // 保留2位小数

            logger.debug(`
              前期获取该作品基本信息：
              作者：${aweme.author.nickname}
              作品ID：${aweme.aweme_id}
              发布时间：${Common.convertTimestampToDateTime(aweme.create_time)}
              发布时间戳（s）：${aweme.create_time}
              当前时间戳（ms）：${now}
              时间差（ms）：${timeDifference} ms (${timeDiffSeconds}s) (${timeDiffHours}h)
              是否置顶：${is_top}
              是否处于开播：${userinfo.data.user?.live_status === 1 ? logger.green('true') : logger.red('false')}
              是否在一天内：${timeDifference < 86400000 ? logger.green('true') : logger.red('false')}
              `)

            // 判断是否需要推送
            if ((is_top && timeDifference < 86400000) || (timeDifference < 86400000 && !is_top)) {
              // 检查是否已经推送过
              const alreadyPushed = await this.checkIfAlreadyPushed(aweme.aweme_id, sec_uid, targets.map(t => t.groupId))

              if (!alreadyPushed) {
                shouldPush = true
              }
            }

            if (shouldPush) {
              willbepushlist[aweme.aweme_id] = {
                remark: item.remark,
                sec_uid,
                create_time: aweme.create_time * 1000,
                targets,
                Detail_Data: {
                  ...aweme,
                  user_info: userinfo
                },
                avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.data.user.avatar_larger.uri,
                living: false
              }
            }
          }
        }

        /** 获取缓存的直播状态 */
        const liveStatus = await douyinDB.getLiveStatus(sec_uid)

        if (userinfo.data.user.live_status === 1) {
          const liveInfo = await this.amagi.getDouyinData('直播间信息数据', { sec_uid: userinfo.data.user.sec_uid, typeMode: 'strict' })

          // 如果之前没有直播，现在开播了，需要推送
          if (!liveStatus.living) {
            willbepushlist[`live_${sec_uid}`] = {
              remark: item.remark,
              sec_uid,
              create_time: Date.now(),
              targets,
              Detail_Data: {
                user_info: userinfo,
                room_data: JSON.parse(userinfo.data.user.room_data),
                live_data: liveInfo,
                liveStatus: {
                  liveStatus: 'open',
                  isChanged: true,
                  isliving: true
                }
              },
              avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.data.user.avatar_larger.uri,
              living: true
            }
          }
        } else if (liveStatus.living) {
          // 如果之前在直播，现在已经关播，需要更新状态
          await douyinDB.updateLiveStatus(sec_uid, false)
          logger.info(`用户 ${item.remark ?? sec_uid} 已关播，更新直播状态`)
        }
      }
    } catch (error) {
      throw new Error(`获取抖音用户主页作品列表失败: ${error}`)
    }

    return willbepushlist
  }

  /**
 * 检查作品是否已经推送过
 * @param aweme_id 作品ID
 * @param sec_uid 用户sec_uid
 * @param groupIds 群组ID列表
 * @returns 是否已经推送过
 */
  async checkIfAlreadyPushed (aweme_id: string, sec_uid: string, groupIds: string[]): Promise<boolean> {
    for (const groupId of groupIds) {
      const isPushed = await douyinDB.isAwemePushed(aweme_id, sec_uid, groupId)
      if (!isPushed) {
        return false
      }
    }
    return true
  }

  /**
   * 设置或更新特定 sec_uid 的群组信息。
   * @param data 抖音的搜索结果数据。需要接口返回的原始数据
   * @returns 操作成功或失败的消息字符串。
   */
  async setting (data: DySearchInfo): Promise<void> {
    const groupInfo = await this.e.bot.getGroupInfo('groupId' in this.e && this.e.groupId ? this.e.groupId : '')
    const config = Config.pushlist // 读取配置文件
    const groupId = 'groupId' in this.e && this.e.groupId ? this.e.groupId : ''
    const botId = this.e.selfId

    try {
      let index = 0
      while (data.data[index].card_unique_name !== 'user') {
        index++
      }
      const sec_uid = data.data[index].user_list[0].user_info.sec_uid
      const UserInfoData = await this.amagi.getDouyinData('用户主页数据', { sec_uid, typeMode: 'strict' })

      /** 处理抖音号 */
      let user_shortid
      UserInfoData.data.user.unique_id === '' ? (user_shortid = UserInfoData.data.user.short_id) : (user_shortid = UserInfoData.data.user.unique_id)

      // 初始化 douyin 数组
      config.douyin ??= []

      // 查找是否存在相同的 sec_uid
      const existingItem = config.douyin.find((item: { sec_uid: string }) => item.sec_uid === sec_uid)

      // 检查数据库中是否已订阅
      const isSubscribed = await douyinDB.isSubscribed(sec_uid, groupId)

      if (existingItem) {
        // 如果已经存在相同的 sec_uid，则检查是否存在相同的 group_id
        let has = false
        let groupIndexToRemove = -1 // 用于记录要删除的 group_id 对象的索引
        for (let index = 0; index < existingItem.group_id.length; index++) {
          // 分割每个对象的 id 属性，并获取第一部分
          const item = existingItem.group_id[index]
          const existingGroupId = item.split(':')[0]

          // 检查分割后的第一部分是否与提供的 group_id 相同
          if (existingGroupId === String(groupId)) {
            has = true
            groupIndexToRemove = index
            break // 找到匹配项后退出循环
          }
        }

        if (has) {
          // 如果存在相同的 group_id，则删除它
          existingItem.group_id.splice(groupIndexToRemove, 1)

          // 同时从数据库中取消订阅
          if (isSubscribed) {
            await douyinDB.unsubscribeDouyinUser(groupId, sec_uid)
          }

          logger.info(`\n删除成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.data.user.sec_uid}`)
          await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n删除成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}`)

          // 如果删除后 group_id 数组为空，则删除整个属性
          if (existingItem.group_id.length === 0) {
            const index = config.douyin.indexOf(existingItem)
            config.douyin.splice(index, 1)
          }
        } else {
          // 否则，将新的 group_id 添加到该 sec_uid 对应的数组中
          existingItem.group_id.push(`${groupId}:${botId}`)

          // 同时在数据库中添加订阅
          if (!isSubscribed) {
            await douyinDB.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.data.user.nickname)
          }

          await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}`)
          if (Config.douyin.push.switch === false) await this.e.reply('请发送「#设置抖音推送开启」以进行推送')
          logger.info(`\n设置成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.data.user.sec_uid}`)
        }
      } else {
        // 如果不存在相同的 sec_uid，则新增一个属性
        config.douyin.push({
          switch: true,
          sec_uid,
          group_id: [`${groupId}:${botId}`],
          remark: UserInfoData.data.user.nickname,
          short_id: user_shortid
        })

        // 同时在数据库中添加订阅
        if (!isSubscribed) {
          await douyinDB.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.data.user.nickname)
        }

        await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}`)
        if (Config.douyin.push.switch === false) await this.e.reply('请发送「#设置抖音推送开启」以进行推送')
        logger.info(`\n设置成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.data.user.sec_uid}`)
      }

      // 保存配置到文件
      Config.Modify('pushlist', 'douyin', config.douyin)

      await this.renderPushList()
    } catch (error) {
      throw new Error(`设置失败，请查看日志: ${error}`)
    }
  }

  /** 渲染推送列表图片 */
  async renderPushList (): Promise<void> {
    await this.syncConfigToDatabase()
    const groupInfo = await this.e.bot.getGroupInfo('groupId' in this.e && this.e.groupId ? this.e.groupId : '')

    // 获取当前群组的所有订阅
    const subscriptions = await douyinDB.getGroupSubscriptions(groupInfo.groupId)

    if (subscriptions.length === 0) {
      await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})\n没有设置任何抖音博主推送！\n可使用「#设置抖音推送 + 抖音号」进行设置`)
      return
    }

    const renderOpt: DouyinUserListProps['data']['renderOpt'] = []

    for (const subscription of subscriptions) {
      const sec_uid = subscription.sec_uid
      const userInfo = await this.amagi.getDouyinData('用户主页数据', { sec_uid, typeMode: 'strict' })

      // 查找配置文件中对应的全局开关状态
      const configItem = Config.pushlist.douyin?.find((item: douyinPushItem) => item.sec_uid === sec_uid)
      const switchStatus = configItem?.switch !== false // 默认为 true

      renderOpt.push({
        avatar_img: userInfo.data.user.avatar_larger.url_list[0],
        username: userInfo.data.user.nickname,
        short_id: userInfo.data.user.unique_id === '' ? userInfo.data.user.short_id : userInfo.data.user.unique_id,
        fans: this.count(userInfo.data.user.follower_count),
        total_favorited: this.count(userInfo.data.user.total_favorited),
        following_count: this.count(userInfo.data.user.following_count),
        switch: switchStatus
      })
    }
    const img = await Render('douyin/userlist', {
      renderOpt,
      groupInfo: {
        groupId: groupInfo.groupId || '',
        groupName: groupInfo.groupName || ''
      }
    })
    await this.e.reply(img)
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
      // 获取当前群组订阅的所有抖音用户
      const subscriptions = await douyinDB.getGroupSubscriptions(currentGroupId)
      const subscribedUids = subscriptions.map(sub => sub.sec_uid)

      // 创建一个新的推送列表，只包含当前群组订阅的用户的作品
      const filteredData: WillBePushList = {}

      for (const awemeId in data) {
        // 检查该作品的用户是否被当前群组订阅
        if (subscribedUids.includes(data[awemeId].sec_uid)) {
          // 复制该作品到过滤后的列表，并将目标设置为当前群组
          filteredData[awemeId] = {
            ...data[awemeId],
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

  /**
 * 检查并更新备注信息
 */
  async checkremark () {
    // 读取配置文件内容
    const config = Config.pushlist
    const updateList: { sec_uid: string }[] = []

    if (Config.pushlist.douyin === null || Config.pushlist.douyin.length === 0) return true

    // 遍历配置文件中的用户列表，收集需要更新备注信息的用户
    for (const i of Config.pushlist.douyin) {
      const remark = i.remark
      const sec_uid = i.sec_uid

      if (remark === undefined || remark === '') {
        updateList.push({ sec_uid })
      }
    }

    // 如果有需要更新备注的用户，则逐个获取备注信息并更新到配置文件中
    if (updateList.length > 0) {
      for (const i of updateList) {
        // 从外部数据源获取用户备注信息
        const userinfo = await this.amagi.getDouyinData('用户主页数据', { sec_uid: i.sec_uid, typeMode: 'strict' })
        const remark = userinfo.data.user.nickname

        // 在配置文件中找到对应的用户，并更新其备注信息
        const matchingItemIndex = config.douyin.findIndex((item: { sec_uid: string }) => item.sec_uid === i.sec_uid)
        if (matchingItemIndex !== -1) {
          config.douyin[matchingItemIndex].remark = remark
        }
      }

      // 将更新后的配置文件内容写回文件
      Config.Modify('pushlist', 'douyin', config.douyin)
    }

    return false
  }

  /**
   * 处理作品描述
   */
  desc (Detail_Data: any, desc: string) {
    if (desc === '') {
      return '该作品没有描述'
    }
    return desc
  }

  /**
   * 格式化数字
   */
  count (num: number) {
    if (num > 10000) {
      return (num / 10000).toFixed(1) + '万'
    }
    return num.toString()
  }
}

/**
* 判断标题是否有屏蔽词或屏蔽标签
* @param PushItem 推送项
* @returns 是否应该跳过推送
*/
const skipDynamic = async (PushItem: DouyinPushItem): Promise<boolean> => {
  // 如果是直播动态，不跳过
  if ('liveStatus' in PushItem.Detail_Data) {
    return false
  }

  const tags: string[] = []

  // 提取标签
  if (PushItem.Detail_Data.text_extra) {
    for (const item of PushItem.Detail_Data.text_extra) {
      if (item.hashtag_name) {
        tags.push(item.hashtag_name)
      }
    }
  }

  logger.debug(`检查作品是否需要过滤：${PushItem.Detail_Data.share_url}`)
  const shouldFilter = await douyinDB.shouldFilter(PushItem, tags)
  return shouldFilter
}
