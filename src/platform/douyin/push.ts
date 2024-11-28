import { Base, Render, Config, DB, Common, DouyinDBType, AllDataType } from '@/module'
import { getDouyinID } from '@/platform/douyin'
import { karin, logger, KarinMessage, segment, ImageElement, KarinAdapter, common } from 'node-karin'
import { getDouyinData } from '@ikenxuan/amagi'

/** 每个推送项的类型定义 */
interface PushItem {
  /** 博主的昵称 */
  remark: string
  /** 博主UID */
  sec_uid: string
  /** 作品发布时间 */
  create_time: number
  /** 要推送到的群组 */
  group_id: string[]
  /** 作品详情信息 */
  Detail_Data: {
    /** 博主主页信息 */
    user_info: any
    [key: string]: any
  }
  /** 博主头像url */
  avatar_img: string
  /** 是否正在直播 */
  living: boolean
}
/** 推送列表的类型定义 */
interface WillBePushList {
  [key: string]: PushItem
}

export class DouYinpush extends Base {
  private force: boolean = false
  /**
   *
   * @param e  事件KarinMessage
   * @param force 是否强制推送
   * @default false
   * @returns
   */
  constructor (e = {} as KarinMessage, force: boolean = false) {
    super(e)
    if (this.botadapter === 'QQBot') {
      return
    }
    this.headers.Referer = 'https://www.douyin.com'
    this.headers.Cookie = Config.cookies.douyin
    this.force = force
  }

  async action () {
    if (await this.checkremark()) return true

    try {
      let data = await this.getDynamicList()
      const pushdata = this.excludeAlreadyPushed(data.willbepushlist, data.DBdata)

      if (Object.keys(pushdata).length === 0) return true

      if (this.force) return await this.forcepush(pushdata)
      else return await this.getdata(pushdata)
    } catch (error) {
      logger.error(error)
    }
  }

  async getdata (data: WillBePushList) {
    if (Object.keys(data).length === 0) return true

    for (const awemeId in data) {

      const Detail_Data = data[awemeId].Detail_Data
      const skip = skipDynamic(Detail_Data)
      let img: ImageElement[] = []
      const iddata = await getDouyinID(Detail_Data.share_url || 'https://live.douyin.com/' + Detail_Data.room_data.owner.web_rid, false)

      if (!skip) {
        if (data[awemeId].living) {
          img = await Render('douyin/live', {
            image_url: [ { image_src: Detail_Data.live_data.data.data[0].cover.url_list[0] } ],
            text: Detail_Data.live_data.data.data[0].title,
            liveinf: `${Detail_Data.live_data.data.partition_road_map.partition.title} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
            在线观众: this.count(Detail_Data.live_data.data.data[0].room_view_stats.display_value),
            总观看次数: this.count(Detail_Data.live_data.data.data[0].stats.total_user_str),
            username: Detail_Data.user_info.user.nickname,
            avater_url: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.user.avatar_larger.uri,
            fans: this.count(Detail_Data.user_info.user.follower_count),
            create_time: Common.convertTimestampToDateTime(new Date().getTime()),
            now_time: Common.convertTimestampToDateTime(new Date().getTime()),
            share_url: 'https://live.douyin.com/' + Detail_Data.room_data.owner.web_rid,
            dynamicTYPE: '直播动态推送'
          })
        } else {
          img = await Render('douyin/dynamic', {
            image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] || Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
            desc: this.desc(Detail_Data, Detail_Data.desc),
            dianzan: this.count(Detail_Data.statistics.digg_count),
            pinglun: this.count(Detail_Data.statistics.comment_count),
            share: this.count(Detail_Data.statistics.share_count),
            shouchang: this.count(Detail_Data.statistics.collect_count),
            create_time: Common.convertTimestampToDateTime(data[awemeId].create_time),
            avater_url: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.user.avatar_larger.uri,
            share_url: iddata.is_mp4
              ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`
              : Detail_Data.share_url,
            username: Detail_Data.author.nickname,
            抖音号: Detail_Data.user_info.user.unique_id === '' ? Detail_Data.user_info.user.unique_id : Detail_Data.user_info.user.unique_id,
            粉丝: this.count(Detail_Data.user_info.user.follower_count),
            获赞: this.count(Detail_Data.user_info.user.total_favorited),
            关注: this.count(Detail_Data.user_info.user.following_count)
          })
        }
      }

      // 遍历 group_id 数组，并发送消息
      try {
        for (const groupId of data[awemeId].group_id) {
          let status: any
          if (!skip) {
            const [ group_id, uin ] = groupId.split(':')
            const bot = karin.getBot(uin) as KarinAdapter
            status = await karin.sendMsg(String(uin), karin.contactGroup(group_id), img ? [ ...img ] : [])
            // 是否一同解析该新作品？
            if (Config.douyin.push.parsedynamic) {
              // 如果新作品是视频
              if (iddata.is_mp4) {
                try {
                  // 下载视频
                  await this.DownLoadVideo({
                    video_url: `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`,
                    title: { timestampTitle: 'tmp_' + Date.now(), originTitle: Detail_Data.desc }
                  }, { active: true, activeOption: { uin, group_id } })
                } catch (error) {
                  logger.error(error)
                }
              } else if (!iddata.is_mp4 && iddata.type === 'one_work') { // 如果新作品是图集
                const imageres: ImageElement[] = []
                let image_url
                for (const item of Detail_Data.aweme_detail.images) {
                  image_url = item.url_list[2] || item.url_list[1] // 图片地址
                  imageres.push(segment.image(image_url))
                }
                const forwardMsg = common.makeForward(imageres, uin, (await bot?.GetCurrentAccount()).account_name)
                await bot.sendForwardMessage(karin.contactFriend(uin), forwardMsg)
              }
            }
          }
          // 如果跳过该新作品或者动态图已成功发送且返回msg_id，则写入作品ID到数据库
          if (skip || status.message_id) {
            let DBdata = await DB.FindGroup('douyin', groupId)
            /**
             * 检查 DBdata 中是否存在与给定 host_mid 匹配的项
             * @param DBdata - 数据库中存储的群组数据
             * @param host_midToCheck 要检查的host_mid
             * @returns 匹配的host_mid
             */
            const findMatchingSecUid = (DBdata: DouyinDBType, secUidToCheck: string) => {
              for (const sec_uid in DBdata) {
                if (DBdata.hasOwnProperty(sec_uid) && DBdata[sec_uid].sec_uid === secUidToCheck) {
                  return secUidToCheck
                }
              }
              return ''
            }
            let newEntry: DouyinDBType
            if (DBdata) {
              // 如果 DBdata 存在，遍历 DBdata 来查找对应的 sec_uid
              let found = false

              if (data[awemeId].sec_uid === findMatchingSecUid(DBdata, data[awemeId].sec_uid)) {
                // 如果找到了对应的 sec_uid，将 awemeId 添加到 aweme_idlist 数组中
                const isSecUidFound = findMatchingSecUid(DBdata, data[awemeId].sec_uid)
                if (isSecUidFound && this.force ? true : !DBdata[data[awemeId].sec_uid].aweme_idlist.includes(awemeId)) {
                  !data[awemeId].living ? DBdata[isSecUidFound].aweme_idlist.push(awemeId) : false
                  DBdata[isSecUidFound].create_time = Number(data[awemeId].create_time)
                  if ('living' in data[awemeId]) {
                    DBdata[isSecUidFound].living = true
                  }
                  await DB.UpdateGroupData('douyin', groupId, DBdata)
                  found = true
                }
              }

              if (!found) {
                // 如果没有找到对应的 sec_uid，创建一个新的条目
                newEntry = {
                  [data[awemeId].sec_uid]: {
                    remark: data[awemeId].remark,
                    create_time: Number(data[awemeId].create_time),
                    sec_uid: data[awemeId].sec_uid,
                    aweme_idlist: !data[awemeId].living ? [ awemeId ] : [],
                    group_id: [ groupId ],
                    avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + data[awemeId].Detail_Data.user_info.user.avatar_larger.uri,
                    living: data[awemeId].living
                  }
                }
                // 更新数据库
                await DB.UpdateGroupData('douyin', groupId, { ...DBdata, ...newEntry })
              }
            } else {
              // 如果 DBdata 为空，创建新的条目
              await DB.CreateSheet('douyin', groupId, {
                [data[awemeId].sec_uid]: {
                  remark: data[awemeId].remark,
                  create_time: data[awemeId].create_time,
                  sec_uid: data[awemeId].sec_uid,
                  aweme_idlist: !data[awemeId].living ? [ awemeId ] : [],
                  avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + data[awemeId].Detail_Data.user_info.user.avatar_larger.uri,
                  group_id: [ groupId ],
                  living: data[awemeId].living
                }
              })
            }
          }
        }
      } catch (error) {
        logger.error(error)
      }
    }
  }

  /**
   * 根据配置文件获取UP当天的动态列表。
   * @returns
   */
  async getDynamicList () {
    const willbepushlist: WillBePushList = {}
    const DBdata = await DB.FindAll('douyin')

    try {
      for (const item of Config.pushlist.douyin) {
        const videolist = await getDouyinData('用户主页视频列表数据', Config.cookies.douyin, { sec_uid: item.sec_uid })
        const userinfo = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: item.sec_uid })

        if (videolist.aweme_list.length > 0) {
          for (const aweme of videolist.aweme_list) {
            const now = Date.now()
            const createTime = parseInt(aweme.create_time, 10) * 1000
            const timeDifference = now - createTime // 时间差，单位秒
            const is_top = aweme.is_top === 1 // 是否为置顶
            let shouldPush = false
            logger.debug(`前期获取该动态基本信息：\n动态ID：${aweme.aweme_id}\n发布时间：${Common.convertTimestampToDateTime(parseInt(aweme.create_time, 10))}\n发布时间戳（s）：${parseInt(aweme.create_time, 10)}\n时间差（ms）：${timeDifference}\n是否置顶：${is_top}\n是否处于开播：${userinfo.user.live_status === 1 ? logger.green('true') : logger.red('false')}是否在一天内：${timeDifference < 86400000 ? logger.green('true') : logger.red('false')}`)
            if ((is_top && timeDifference < 86400000) || (timeDifference < 86400000)) {
              shouldPush = true
              logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该作品进行推送：${aweme.share_url}\n`))
            } else logger.debug(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该作品：${aweme.share_url}\n`))
            // 如果 shouldPush 为 true，或该作品距现在的时间差小于一天，则将该动态添加到 willbepushlist 中
            if (shouldPush) {
              // 确保 willbepushlist[aweme.aweme_id] 是一个对象
              if (!willbepushlist[aweme.aweme_id]) {
                willbepushlist[aweme.aweme_id] = {
                  remark: item.remark,
                  sec_uid: userinfo.user.sec_uid,
                  create_time: aweme.create_time,
                  group_id: item.group_id,
                  Detail_Data: { ...aweme, user_info: userinfo },
                  avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.user.avatar_larger.uri,
                  living: userinfo.user.live_status === 1
                }
              }
            }
          }
        } else {
          logger.error(`‘${item.remark}’的主页视频列表数量为零！`)
        }
        // 如果正在开播
        if (userinfo.user.live_status === 1) {
          const live_data = await getDouyinData('直播间信息数据', Config.cookies.douyin, { sec_uid: item.sec_uid })
          const room_data = JSON.parse(userinfo.user.room_data)
          if (!willbepushlist[room_data.owner.web_rid]) {
            willbepushlist[room_data.owner.web_rid] = {
              remark: item.remark,
              sec_uid: userinfo.user.sec_uid,
              create_time: new Date().getTime(),
              group_id: item.group_id,
              Detail_Data: { live_data, room_data, user_info: userinfo, living: true },
              avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.user.avatar_larger.uri,
              living: true
            }
          }
        }
      }
    } catch (error) {
      logger.error(error)
    }

    return { willbepushlist, DBdata }
  }

  /**
   * 排除已推送过的群组并返回更新后的推送列表
   * @param willBePushList 将要推送的列表
   * @param dbData 数据库缓存
   * @returns 更新后的推送列表
   */
  excludeAlreadyPushed (
    willBePushList: WillBePushList,
    dbData: AllDataType<'douyin'>['douyin']
  ): WillBePushList {
    // 主要逻辑：
    // 遍历推送列表中的 awemeId。
    // 对每个 awemeId 的 group_id 逐一检查：
    // 如果群组不存在于数据库中，直接保留。
    // 如果群组存在，进一步检查数据库中的缓存列表是否包含该 awemeId。
    // 更新 group_id 数组：移除已推送的群组。
    // 如果 group_id 为空，则删除该 awemeId。

    // 遍历推送列表中的每一个作品
    for (const awemeId in willBePushList) {
      const pushItem = willBePushList[awemeId]
      const filteredGroupIds: string[] = []

      for (const groupId of pushItem.group_id) {
        const groupData = dbData[groupId]

        // 如果 dbData 是空或者没有对应的 groupId 数据，直接保留该群组
        if (!groupData) {
          filteredGroupIds.push(groupId)
          continue
        }

        // 获取与 pushItem.sec_uid 对应的 cachedData
        const cachedData = groupData[pushItem.sec_uid]
        // 如果找不到对应的 sec_uid 数据，直接保留该群组
        if (!cachedData) {
          filteredGroupIds.push(groupId)
          continue
        }

        // 如果是普通动态，检查 aweme_id 是否已缓存
        // 如果缓存列表中没有该 awemeId，则保留该群组
        if (!cachedData.aweme_idlist.includes(awemeId)) {
          filteredGroupIds.push(groupId)
          continue
        }

        // 如果是直播动态，只推送开播
        if (pushItem.living === true && cachedData.living === false) {
          filteredGroupIds.push(groupId)
          continue
        }
      }

      // 更新 group_id，如果为空则删除该作品
      if (filteredGroupIds.length > 0) {
        pushItem.group_id = filteredGroupIds
      } else {
        delete willBePushList[awemeId]
      }
    }

    return willBePushList
  }

  async checkremark () {
    const config = Config.pushlist
    const abclist: { sec_uid: string, group_id: any }[] = []
    if (Config.pushlist.douyin === null || Config.pushlist.douyin.length === 0) return true
    for (let i = 0; i < Config.pushlist.douyin.length; i++) {
      const remark = Config.pushlist.douyin[i].remark
      const group_id = Config.pushlist.douyin[i].group_id
      const sec_uid = Config.pushlist.douyin[i].sec_uid
      const short_id = Config.pushlist.douyin[i].short_id

      if (!remark) {
        abclist.push({ sec_uid, group_id })
      }
      if (!short_id) {
        abclist.push({ sec_uid, group_id })
      }
    }
    if (abclist.length > 0) {
      for (let i = 0; i < abclist.length; i++) {
        const resp = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: abclist[i].sec_uid })
        const remark = resp.user.nickname
        const matchingItemIndex = config.douyin.findIndex((item: { sec_uid: string }) => item.sec_uid === abclist[i].sec_uid)
        if (matchingItemIndex !== -1) {
          // 更新匹配的对象的 remark 和抖音号
          config.douyin[matchingItemIndex].remark = remark
          config.douyin[matchingItemIndex].short_id = resp.user.unique_id === '' ? resp.user.unique_id : resp.user.unique_id
        }
      }
      Config.modify('pushlist', 'douyin', config.douyin)
    }
  }


  desc (video_obj: any, text: string) {
    if (Array.isArray(video_obj) && video_obj.length > 0) {
      const regex = new RegExp(video_obj.map((obj) => `#${obj.hashtag_name}`).join('|'), 'g')
      // 使用正则表达式替换匹配到的话题标签
      text = text.replace(regex, (match) => {
        // 对于每个匹配的话题标签，检查它是否在video_obj中存在
        const matchedObj = video_obj.find((obj) => `#${obj.hashtag_name}` === match)
        if (matchedObj) {
          return `<span style="font-weight: bold; color: #cfcfcf">${match}</span>`
        }
        return match
      })
    }
    return text
  }

  /**
   * 强制推送
   * @param data 处理完成的推送列表
   */
  async forcepush (data: WillBePushList) {
    if (!this.e.msg.includes('全部')) {
      for (const detail in data) {
        data[detail].group_id = [ ...[ `${this.e.group_id}:${this.e.self_id}` ] ]
      }
    }
    await this.getdata(data)
  }

  /**
   * 设置或更新特定 sec_uid 的群组信息。
   * @param data 抖音的搜索结果数据。需要接口返回的原始数据
   * @returns 操作成功或失败的消息字符串。
   */
  async setting (data: any) {
    const groupInfo = await this.e.bot.GetGroupInfo(this.e.group_id)
    try {
      let index = 0
      while (data.data[index].card_unique_name !== 'user') {
        index++
      }
      let msg
      const sec_uid = data.data[index].user_list[0].user_info.sec_uid
      const UserInfoData = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid })
      const config = Config.pushlist
      const group_id = this.e.group_id
      /** 处理抖音号 */
      let user_shortid
      UserInfoData.user.unique_id === '' ? (user_shortid = UserInfoData.user.short_id) : (user_shortid = UserInfoData.user.unique_id)

      // 初始化 group_id 对应的数组
      if (!config.douyin) {
        config.douyin = []
      }

      // 查找是否存在相同的 sec_uid
      const existingItem = config.douyin.find((item: { sec_uid: string }) => item.sec_uid === sec_uid)

      if (existingItem) {
        // 如果已经存在相同的 sec_uid，则检查是否存在相同的 group_id
        let has = false
        let groupIndexToRemove = -1 // 用于记录要删除的 group_id 对象的索引
        for (let index = 0; index < existingItem.group_id.length; index++) {
          // 分割每个对象的 id 属性，并获取第一部分
          const item = existingItem.group_id[index]
          const existingGroupId = item.split(':')[0]

          // 检查分割后的第一部分是否与提供的 group_id 相同
          if (existingGroupId === String(group_id)) {
            has = true
            groupIndexToRemove = index
            break // 找到匹配项后退出循环
          }
        }
        if (has) {
          // 如果存在相同的 group_id，则删除它
          existingItem.group_id.splice(groupIndexToRemove, 1)
          logger.info(`\n删除成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.user.sec_uid}`)
          msg = `群：${groupInfo.group_name}(${group_id})\n删除成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}`

          // 如果删除后 group_id 数组为空，则删除整个属性
          if (existingItem.group_id.length === 0) {
            const index = config.douyin.indexOf(existingItem)
            config.douyin.splice(index, 1)
          }
        } else {
          const status = await DB.FindGroup('douyin', `${group_id}:${this.e.self_id}`)
          if (!status) {
            await DB.CreateSheet('douyin', `${group_id}:${this.e.self_id}`, {})
          }
          // 否则，将新的 group_id 添加到该 sec_uid 对应的数组中
          existingItem.group_id.push(`${group_id}:${this.e.self_id}`)
          msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}`
          logger.info(`\n设置成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.user.sec_uid}`)
        }
      } else {
        const status = await DB.FindGroup('douyin', `${group_id}:${this.e.self_id}`)
        if (!status) {
          await DB.CreateSheet('douyin', `${group_id}:${this.e.self_id}`, {})
        }
        // 如果不存在相同的 sec_uid，则新增一个属性
        config.douyin.push({ sec_uid, group_id: [ `${group_id}:${this.e.self_id}` ], remark: UserInfoData.user.nickname, short_id: user_shortid })
        msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}`
      }

      Config.modify('pushlist', 'douyin', config.douyin)
      return msg
    } catch (error) {
      logger.error(error)
      return '无法获取用户信息，请确认抖音号是否正确'
    }
  }
}

/**
 * 判断标题是否有屏蔽词或屏蔽标签
 * @param Detail_Data 作品详情数据
 * @returns
 */
const skipDynamic = (Detail_Data: PushItem['Detail_Data']): boolean => {
  if (Detail_Data.living) return false
  for (const banWord of Config.douyin.push.banWords) {
    if (Detail_Data.item_title.includes(banWord)) {
      logger.mark(`作品：${logger.green(Detail_Data.share_url)} 包含屏蔽词：「${logger.red(banWord)}」，跳过推送`)
      return true
    }
  }
  for (const banTag of Config.douyin.push.banTags) {
    if (Detail_Data.caption.includes(banTag)) {
      logger.mark(`作品：${logger.green(Detail_Data.share_url)} 包含屏蔽标签：「${logger.red(banTag)}」，跳过推送`)
      return true
    }
  }
  return false
}