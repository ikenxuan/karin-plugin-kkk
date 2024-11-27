import { fetchBilibiliData } from '@/platform/bilibili'
import { getBilibiliData } from '@ikenxuan/amagi'
import { Base, Config, Render, DB, Common, BilibiliDBType, AllDataType } from '@/module'
import { karin, logger, KarinMessage, segment, ImageElement, common, KarinAdapter } from 'node-karin'

/** 每个推送项的类型定义 */
interface PushItem {
  /** 该UP主的昵称 */
  remark: string
  /** UP主UID */
  host_mid: string
  /** 动态发布时间 */
  create_time: number
  /** 要推送到的群组 */
  group_id: string[]
  /** 动态详情信息 */
  Dynamic_Data: any
  /** UP主头像url */
  avatar_img: string
  /** 动态类型 */
  dynamic_type: dynamicTYPE
}
/** 已支持推送的动态类型 */
type dynamicTYPE = 'DYNAMIC_TYPE_AV' | 'DYNAMIC_TYPE_DRAW' | 'DYNAMIC_TYPE_WORD' | 'DYNAMIC_TYPE_LIVE_RCMD'
/** 推送列表的类型定义 */
interface WillBePushList {
  [key: string]: PushItem
}

export class Bilibilipush extends Base {
  private force: boolean = false
  /**
   *
   * @param e 事件对象，提供给实例使用的事件相关信息，默认为空对象{}
   * @param force 强制执行标志，用于控制实例行为，默认false
   * @returns
   */
  constructor (e = {} as KarinMessage, force: boolean = false) {
    super(e) // 调用父类的构造函数
    // 判断当前bot适配器是否为'QQBot'，如果是，则直接返回true，否则继续执行
    if (this.botadapter === 'QQBot') {
      return
    }
    this.force = force // 保存传入的强制执行标志
  }

  /**
   * 执行主要的操作流程，包括检查缓存并根据需要获取和更新用户数据。
   * @returns
   */
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

  /**
   * 异步获取数据并根据动态类型处理和发送动态信息。
   * @param data 包含动态相关信息的对象。
   */
  async getdata (data: WillBePushList) {
    let nocd_data
    for (const dynamicId in data) {
      // 检查banWords，banTags
      let skip = skipDynamic(data[dynamicId].Dynamic_Data)
      let send = true, send_video = true, img: ImageElement[] = []
      const dynamicCARDINFO = await fetchBilibiliData('dynamic_card', { dynamic_id: dynamicId })
      const dycrad = dynamicCARDINFO.data.card && dynamicCARDINFO.data.card.card && JSON.parse(dynamicCARDINFO.data.card.card)

      if (!skip) {
        const userINFO = await fetchBilibiliData('user_profile', { host_mid: data[dynamicId].host_mid })
        let emojiDATA = await fetchBilibiliData('emoji_list')
        emojiDATA = extractEmojisData(emojiDATA.data.packages)

        logger.debug(`UP: ${data[dynamicId].remark}\n动态id：${dynamicId}\nhttps://t.bilibili.com/${dynamicId}`)
        switch (data[dynamicId].dynamic_type) {
          /** 处理图文动态 */
          case 'DYNAMIC_TYPE_DRAW': {
            /**
             * 生成图片数组
             * @returns
             */
            const cover = () => {
              // 初始化一个空数组来存放图片对象
              const imgArray = []
              // 遍历dycrad.item.pictures数组，将每个图片的img_src存入对象，并将该对象加入imgArray
              for (let i = 0; i < dycrad.item.pictures.length; i++) {
                const obj = {
                  image_src: dycrad.item.pictures[i].img_src
                }
                imgArray.push(obj)
              }
              // 返回包含所有图片对象的数组
              return imgArray
            }

            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_DRAW',
              {
                image_url: cover(),
                text: replacetext(br(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data),
                dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                avater_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                username: checkvip(userINFO.data.card),
                fans: this.count(userINFO.data.follower),
                user_shortid: data[dynamicId].host_mid,
                total_favorited: this.count(userINFO.data.like_num),
                following_count: this.count(userINFO.data.card.attention),
                dynamicTYPE: '图文动态推送'
              }
            )
            break
          }
          /** 处理纯文动态 */
          case 'DYNAMIC_TYPE_WORD': {
            let text = replacetext(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text, data[dynamicId].Dynamic_Data)
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
                dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                avater_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                username: checkvip(userINFO.data.card),
                fans: this.count(userINFO.data.follower),
                user_shortid: data[dynamicId].host_mid,
                total_favorited: this.count(userINFO.data.like_num),
                following_count: this.count(userINFO.data.card.attention),
                dynamicTYPE: '纯文动态推送'
              }
            )
            break
          }
          /** 处理视频动态 */
          case 'DYNAMIC_TYPE_AV': {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major.type === 'MAJOR_TYPE_ARCHIVE') {
              const aid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.aid
              const bvid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.bvid
              const INFODATA = await getBilibiliData('单个视频作品数据', '', { id_type: 'bvid', id: bvid })

              /** 特殊字段，只有番剧和影视才会有，如果是该类型视频，默认不发送 */
              if (INFODATA.data.redirect_url) {
                send_video = false
                logger.debug(`UP主：${INFODATA.data.owner.name} 的该动态类型为${logger.yellow('番剧或影视')}，默认跳过不下载，直达：${logger.green(INFODATA.data.redirect_url)}`)
              } else {
                nocd_data = await getBilibiliData('单个视频下载信息数据', '', { avid: INFODATA.data.aid, cid: INFODATA.data.cid })
              }
              img = await Render('bilibili/dynamic/DYNAMIC_TYPE_AV',
                {
                  image_url: [ { image_src: INFODATA.data.pic } ],
                  text: br(INFODATA.data.title),
                  desc: br(dycrad.desc),
                  dianzan: this.count(INFODATA.data.stat.like),
                  pinglun: this.count(INFODATA.data.stat.reply),
                  share: this.count(INFODATA.data.stat.share),
                  create_time: Common.convertTimestampToDateTime(INFODATA.data.ctime),
                  avater_url: INFODATA.data.owner.face,
                  frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                  share_url: 'https://www.bilibili.com/video/' + bvid,
                  username: checkvip(userINFO.data.card),
                  fans: this.count(userINFO.data.follower),
                  user_shortid: data[dynamicId].host_mid,
                  total_favorited: this.count(userINFO.data.like_num),
                  following_count: this.count(userINFO.data.card.attention),
                  dynamicTYPE: '视频动态推送'
                }
              )
            }
            break
          }
          /** 处理直播动态 */
          case 'DYNAMIC_TYPE_LIVE_RCMD': {
            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
              {
                image_url: [ { image_src: dycrad.live_play_info.cover } ],
                text: br(dycrad.live_play_info.title),
                liveinf: br(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
                username: checkvip(userINFO.data.card),
                avater_url: userINFO.data.card.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                fans: this.count(userINFO.data.follower),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                now_time: Common.getCurrentTime(),
                share_url: 'https://live.bilibili.com/' + dycrad.live_play_info.room_id,
                dynamicTYPE: '直播动态推送'
              }
            )
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

      // 遍历 group_id 数组，并发送消息
      for (const groupId of data[dynamicId].group_id) {
        let status: any
        if (!skip) {
          const [ group_id, uin ] = groupId.split(':')
          const bot = karin.getBot(uin) as KarinAdapter
          status = await karin.sendMsg(String(uin), karin.contactGroup(group_id), img ? [ ...img ] : [])
          if (Config.bilibili.push.parsedynamic) {
            switch (data[dynamicId].dynamic_type) {
              case 'DYNAMIC_TYPE_AV': {
                if (send_video) {
                  await this.DownLoadVideo({
                    video_url: nocd_data.data.durl[0].url,
                    title: { timestampTitle: 'tmp_' + Date.now(), originTitle: dycrad.title }
                  }, { active: true, activeOption: { uin, group_id } })
                }
                break
              }
              case 'DYNAMIC_TYPE_DRAW': {
                const imgArray: ImageElement[] = []
                for (const img of data[dynamicId].Dynamic_Data.modules.module_dynamic.major && data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items) {
                  imgArray.push(segment.image(img.src))
                }
                const forwardMsg = common.makeForward(imgArray, uin, (await bot?.GetCurrentAccount()).account_name)
                await bot.sendForwardMessage(karin.contactFriend(uin), forwardMsg)
                break
              }
            }
          }
        }


        if (skip || status?.message_id) {
          let DBdata = await DB.FindGroup('bilibili', groupId)
          /**
           * 检查 DBdata 中是否存在与给定 host_mid 匹配的项
           * @param DBdata - 数据库中存储的群组数据
           * @param host_midToCheck 要检查的host_mid
           * @returns 匹配的host_mid
           */
          const findMatchingSecUid = (DBdata: BilibiliDBType, host_midToCheck: string): string => {
            for (const host_mid in DBdata) {

              if (DBdata.hasOwnProperty(host_mid) && DBdata[host_mid].host_mid === host_midToCheck) {
                return host_midToCheck
              }
            }
            return ''
          }
          let newEntry: BilibiliDBType
          if (DBdata) {
            // 如果 DBdata 存在，遍历 DBdata 来查找对应的 host_mid
            let found = false

            if (data[dynamicId].host_mid === findMatchingSecUid(DBdata, data[dynamicId].host_mid)) {
              // 如果找到了对应的 host_mid ，将 dynamicId 添加到 dynamic_idlist 数组中
              const isSecUidFound = findMatchingSecUid(DBdata, data[dynamicId].host_mid)
              if (isSecUidFound && this.force ? true : !DBdata[data[dynamicId].host_mid].dynamic_idlist.includes(dynamicId)) {
                DBdata[isSecUidFound].dynamic_idlist.push(dynamicId)
                DBdata[isSecUidFound].create_time = Number(data[dynamicId].create_time)
                await DB.UpdateGroupData('bilibili', groupId, DBdata)
                found = true
              }
            }

            if (!found) {
              // 如果没有找到对应的 host_mid ，创建一个新的条目
              newEntry = {
                [data[dynamicId].host_mid]: {
                  remark: data[dynamicId].remark,
                  create_time: data[dynamicId].create_time,
                  host_mid: data[dynamicId].host_mid,
                  dynamic_idlist: [ dynamicId ],
                  avatar_img: data[dynamicId].Dynamic_Data.modules.module_author.face,
                  dynamic_type: data[dynamicId].dynamic_type,
                  group_id: [ groupId ]
                }
              }
              // 更新数据库
              await DB.UpdateGroupData('bilibili', groupId, { ...DBdata, ...newEntry })
            }
          } else {
            // 如果 DBdata 为空，创建新的条目
            await DB.CreateSheet('bilibili', groupId, {
              [data[dynamicId].host_mid]: {
                remark: data[dynamicId].remark,
                create_time: data[dynamicId].create_time,
                host_mid: data[dynamicId].host_mid,
                dynamic_idlist: [ dynamicId ],
                avatar_img: data[dynamicId].Dynamic_Data.modules.module_author.face,
                dynamic_type: data[dynamicId].dynamic_type,
                group_id: [ groupId ]
              }
            })
          }
        }
      }
    }
  }

  /**
   * 根据配置文件获取UP当天的动态列表。
   * @returns
   */
  async getDynamicList () {
    const willbepushlist: WillBePushList = {}

    try {
      for (const item of Config.pushlist.bilibili) {
        const dynamic_list = await fetchBilibiliData('user_dynamic', { host_mid: item.host_mid })
        const ALL_DBdata = await DB.FindAll('bilibili')

        // 将数据库中的 group_id 转换为 Set，便于后续检查是否存在
        const dbGroupIds = new Set(Object.keys(ALL_DBdata).map(groupIdStr => groupIdStr.split(':')[0]))

        // 配置文件中的 group_id 转换为对象数组，每个对象包含群号和机器人账号
        const configGroupIdObjs = item.group_id.map(groupIdStr => {
          const [ groupId, robotId ] = groupIdStr.split(':')
          return { groupId: groupId, robotId }
        })

        // 找出新添加的群组ID
        const newGroupIds = configGroupIdObjs.filter(groupIdObj => !dbGroupIds.has(groupIdObj.groupId))


        if (dynamic_list.data.items.length > 0) {
          // 遍历接口返回的视频列表
          for (const dynamic of dynamic_list.data.items) {
            const now = Date.now()
            // B站的是秒为单位的时间戳，需要乘 1000 转为毫秒
            const createTime = parseInt(dynamic.modules.module_author.pub_ts)
            const timeDifference = (now - createTime * 1000)

            const is_top = dynamic.modules.module_tag?.text === '置顶' // 是否为置顶
            let shouldPush = false // 是否列入推送数组
            // 条件判断，以下任何一项成立都将进行推送：如果是置顶且发布时间在一天内 || 如果是置顶作品且有新的群组且发布时间在一天内 || 如果有新的群组且发布时间在一天内
            logger.debug(`前期获取该动态基本信息：\n动态ID：${dynamic.id_str}\n发布时间：${Common.convertTimestampToDateTime(Number(createTime))}\n发布时间戳（s）：${createTime}\n时间差（ms）：${timeDifference}\n是否置顶：${is_top}\n是否有新群组：${newGroupIds.length > 0}\n是否在一天内：${timeDifference < 86400000 ? logger.green('true') : logger.red('false')}`)
            if ((is_top && timeDifference < 86400000) || (timeDifference < 86400000) || (newGroupIds.length > 0 && timeDifference < 86400000)) {
              shouldPush = true
              logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该动态：https://t.bilibili.com/${dynamic.id_str}\n`))
            } else logger.debug(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该动态：https://t.bilibili.com/${dynamic.id_str}\n`))
            // 如果 shouldPush 为 true，或该作品距现在的时间差小于一天，则将该动态添加到 willbepushlist 中
            if (timeDifference < 86400000 || shouldPush) {
              // 确保 willbepushlist[host_mid.aweme_id] 是一个对象
              if (!willbepushlist[dynamic.id_str]) {
                willbepushlist[dynamic.id_str] = {
                  remark: item.remark,
                  host_mid: item.host_mid,
                  create_time: dynamic.modules.module_author.pub_ts,
                  group_id: [ ...item.group_id ],
                  Dynamic_Data: dynamic, // 存储 dynamic 对象
                  avatar_img: dynamic.modules.module_author.face,
                  dynamic_type: dynamic.type
                }
              }
            }
          }
        } else {
          throw new Error(`「${item.remark}」的动态列表数量为零！`)
        }
      }
    } catch (error) {
      logger.error(error)
    }

    const DBdata = await DB.FindAll('bilibili')
    // 这里是强制数组的第一个对象中的内容 DBdata[0]?.data 因为调用这个函数的上层有遍历群组逻辑
    // DBdata[0]?.data 则是当前群组的推送用户数据
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
    dbData: AllDataType<'bilibili'>['bilibili']
  ): WillBePushList {
    // 主要逻辑：
    // 遍历推送列表中的 dynamicId。
    // 对每个 dynamicId 的 group_id 逐一检查：
    // 如果群组不存在于数据库中，直接保留。
    // 如果群组存在，进一步检查数据库中的缓存列表是否包含该 dynamicId。
    // 更新 group_id 数组：移除已推送的群组。
    // 如果 group_id 为空，则删除该dynamicId。

    // 遍历推送列表中的作品ID
    for (const dynamicId in willBePushList) {
      const pushItem = willBePushList[dynamicId]
      const newGroupIds: string[] = []

      // 遍历作品对应的群组
      for (const groupId of pushItem.group_id) {
        // 如果数据库中不存在该群组，保留此群组
        if (!dbData) {
          newGroupIds.push(groupId)
          continue
        }

        // 检查群组中所有博主的缓存
        let isAlreadyPushed = false
        for (const secUid in dbData[groupId]) {
          const cachedData = dbData[groupId][secUid]
          if (cachedData.dynamic_idlist.includes(dynamicId)) {
            isAlreadyPushed = true
            break
          }
        }

        // 如果未被推送过，则保留此群组
        if (!isAlreadyPushed) {
          newGroupIds.push(groupId)
        }
      }

      // 更新作品的群组数组
      if (newGroupIds.length > 0) {
        pushItem.group_id = newGroupIds
      } else {
        // 如果没有剩余群组，移除该作品
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
  async setting (data: any): Promise<string> {
    const groupInfo = await this.e.bot.GetGroupInfo(this.e.group_id)
    let msg
    const host_mid = data.data.card.mid
    const config = Config.pushlist // 读取配置文件
    const group_id = this.e.group_id

    // 初始化或确保 bilibilipushlist 数组存在
    if (!config.bilibili) {
      config.bilibili = []
    }

    // 检查是否存在相同的 host_mid
    const existingItem = config.bilibili.find((item: { host_mid: string }) => item.host_mid === host_mid)

    if (existingItem) {
      // 如果已经存在相同的 host_mid ，则检查是否存在相同的 group_id
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
        // 如果已存在相同的 group_id，则删除它
        existingItem.group_id.splice(groupIndexToRemove, 1)
        logger.info(`\n删除成功！${data.data.card.name}\nUID：${host_mid}`)
        msg = `群：${groupInfo.group_name}(${group_id})\n删除成功！${data.data.card.name}\nUID：${host_mid}`

        // 如果删除后 group_id 数组为空，则删除整个属性
        if (existingItem.group_id.length === 0) {
          const index = config.bilibili.indexOf(existingItem)
          config.bilibili.splice(index, 1)
        }
      } else {
        const status = await DB.FindGroup('bilibili', `${group_id}:${this.e.self_id}`)
        if (!status) {
          await DB.CreateSheet('bilibili', `${group_id}:${this.e.self_id}`, {})
        }
        // 否则，将新的 group_id 添加到该 host_mid 对应的数组中
        existingItem.group_id.push(`${group_id}:${this.e.self_id}`)
        msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${data.data.card.name}\nUID：${host_mid}`
        logger.info(`\n设置成功！${data.data.card.name}\nUID：${host_mid}`)
      }
    } else {
      const status = await DB.FindGroup('bilibili', `${group_id}:${this.e.self_id}`)
      if (!status) {
        await DB.CreateSheet('bilibili', `${group_id}:${this.e.self_id}`, {})
      }
      // 不存在相同的 host_mid，新增一个配置项
      config.bilibili.push({ host_mid, group_id: [ `${group_id}:${this.e.self_id}` ], remark: data.data.card.name })
      msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${data.data.card.name}\nUID：${host_mid}`
    }

    // 更新配置文件
    Config.modify('pushlist', 'bilibili', config.bilibili)
    return msg
  }

  /**
   * 检查并更新配置文件中指定用户的备注信息。
   * 该函数会遍历配置文件中的用户列表，对于没有备注或备注为空的用户，会从外部数据源获取其备注信息，并更新到配置文件中。
   */
  async checkremark () {
    // 读取配置文件内容
    const config = Config.pushlist
    const abclist: { host_mid: string }[] | { host_mid: string; group_id: string[] }[] = []
    if (Config.pushlist.bilibili === null || Config.pushlist.bilibili.length === 0) return true
    // 遍历配置文件中的用户列表，收集需要更新备注信息的用户
    for (let i = 0; i < Config.pushlist.bilibili.length; i++) {
      const remark = Config.pushlist.bilibili[i].remark
      const group_id = Config.pushlist.bilibili[i].group_id
      const host_mid = Config.pushlist.bilibili[i].host_mid

      if (remark === undefined || remark === '') {
        abclist.push({ host_mid, group_id })
      }
    }

    // 如果有需要更新备注的用户，则逐个获取备注信息并更新到配置文件中
    if (abclist.length > 0) {
      for (let i = 0; i < abclist.length; i++) {
        // 从外部数据源获取用户备注信息
        const resp = await fetchBilibiliData('user_profile', { host_mid: abclist[i].host_mid })
        const remark = resp.data.card.name
        // 在配置文件中找到对应的用户，并更新其备注信息
        const matchingItemIndex = config.bilibili.findIndex((item: { host_mid: string }) => item.host_mid === abclist[i].host_mid)
        if (matchingItemIndex !== -1) {
          config.bilibili[matchingItemIndex].remark = remark
        }
      }
      // 将更新后的配置文件内容写回文件
      Config.modify('pushlist', 'bilibili', config.bilibili)
    }
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
function checkvip (member: any): string {
  // 根据VIP状态选择不同的颜色显示成员名称
  let light = false
  const date = new Date().getHours()
  if (date >= 6 && date < 18) {
    light = true
  }
  return member.vip.vipStatus === 1
    ? `<span style="color: ${member.vip.nickname_color || '#FB7299'}; font-weight: bold;">${member.name}</span>`
    : `<span style="color: ${light ? '#606060' : '#dbdbdb'}">${member.name}</span>`
}

/**
 * 处理并提取表情数据，返回一个包含表情名称和URL的对象数组。
 * @param data 表情数据的数组，每个元素包含一个表情包的信息。
 * @returns 返回一个对象数组，每个对象包含text(表情名称)和url(表情图片地址)属性。
 */
function extractEmojisData (data: any[]): Array<any> {
  const emojisData: any[] = []

  // 遍历data数组中的每个表情包
  data.forEach((packages) => {
    // 遍历每个表情包中的每个表情
    packages.emote.forEach((emote: { text: string; url: string }) => {
      try {
        // 尝试将表情的URL转换为URL对象，如果成功则将其添加到emojisData数组中
        // new URL(emote.url)
        emojisData.push({ text: emote.text, url: emote.url })
      } catch { } // 如果URL无效，则忽略该表情
    })
  })

  return emojisData
}

function replacetext (text: string, obj: any) {
  for (const tag of obj.modules.module_dynamic.desc.rich_text_nodes) {
    // 对正则表达式中的特殊字符进行转义
    const escapedText = tag.orig_text.replace(/([.*+?^${}()|[\]\\])/g, '\\$1').replace(/\n/g, '\\n')
    const regex = new RegExp(escapedText, 'g')
    switch (tag.type) {
      case 'RICH_TEXT_NODE_TYPE_TOPIC':
      case 'RICH_TEXT_NODE_TYPE_AT': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#0C6692'};">${tag.orig_text}</span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_LOTTERY': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#0C6692'};"><svg style="width: 65px;height: 65px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M3.7499750000000005 9.732083333333334C4.095158333333333 9.732083333333334 4.374975 10.011875000000002 4.374975 10.357083333333334L4.374975 15.357083333333334C4.374975 15.899458333333335 4.8147 16.339166666666667 5.357116666666667 16.339166666666667L14.642833333333334 16.339166666666667C15.185250000000002 16.339166666666667 15.625 15.899458333333335 15.625 15.357083333333334L15.625 10.357083333333334C15.625 10.011875000000002 15.904791666666668 9.732083333333334 16.25 9.732083333333334C16.595166666666668 9.732083333333334 16.875 10.011875000000002 16.875 10.357083333333334L16.875 15.357083333333334C16.875 16.589833333333335 15.875625000000001 17.589166666666667 14.642833333333334 17.589166666666667L5.357116666666667 17.589166666666667C4.124341666666667 17.589166666666667 3.124975 16.589833333333335 3.124975 15.357083333333334L3.124975 10.357083333333334C3.124975 10.011875000000002 3.4048 9.732083333333334 3.7499750000000005 9.732083333333334z" fill="currentColor"></path><path d="M2.4106916666666667 7.3214250000000005C2.4106916666666667 6.384516666666666 3.1702083333333335 5.625 4.107116666666667 5.625L15.892833333333334 5.625C16.82975 5.625 17.58925 6.384516666666666 17.58925 7.3214250000000005L17.58925 8.917583333333335C17.58925 9.74225 16.987583333333337 10.467208333333334 16.13125 10.554C15.073666666666668 10.661208333333335 13.087708333333333 10.803583333333334 10 10.803583333333334C6.912275 10.803583333333334 4.9263 10.661208333333335 3.8687250000000004 10.554C3.0123833333333336 10.467208333333334 2.4106916666666667 9.74225 2.4106916666666667 8.917583333333335L2.4106916666666667 7.3214250000000005zM4.107116666666667 6.875C3.8605666666666667 6.875 3.6606916666666667 7.0748750000000005 3.6606916666666667 7.3214250000000005L3.6606916666666667 8.917583333333335C3.6606916666666667 9.135250000000001 3.8040833333333333 9.291041666666667 3.9947583333333334 9.310375C5.0068 9.412958333333334 6.950525000000001 9.553583333333334 10 9.553583333333334C13.049458333333334 9.553583333333334 14.993166666666669 9.412958333333334 16.005166666666668 9.310375C16.195875 9.291041666666667 16.33925 9.135250000000001 16.33925 8.917583333333335L16.33925 7.3214250000000005C16.33925 7.0748750000000005 16.139375 6.875 15.892833333333334 6.875L4.107116666666667 6.875z" fill="currentColor"></path><path d="M5.446408333333333 4.464341666666667C5.446408333333333 3.1329416666666665 6.525716666666667 2.0536333333333334 7.857116666666667 2.0536333333333334C9.188541666666666 2.0536333333333334 10.267833333333334 3.1329416666666665 10.267833333333334 4.464341666666667L10.267833333333334 6.875058333333333L7.857116666666667 6.875058333333333C6.525716666666667 6.875058333333333 5.446408333333333 5.795741666666666 5.446408333333333 4.464341666666667zM7.857116666666667 3.3036333333333334C7.216075000000001 3.3036333333333334 6.696408333333334 3.8233 6.696408333333334 4.464341666666667C6.696408333333334 5.105391666666667 7.216075000000001 5.6250583333333335 7.857116666666667 5.6250583333333335L9.017833333333334 5.6250583333333335L9.017833333333334 4.464341666666667C9.017833333333334 3.8233 8.498166666666668 3.3036333333333334 7.857116666666667 3.3036333333333334z" fill="currentColor"></path><path d="M9.732083333333334 4.464341666666667C9.732083333333334 3.1329416666666665 10.811416666666666 2.0536333333333334 12.142833333333334 2.0536333333333334C13.474250000000001 2.0536333333333334 14.553583333333336 3.1329416666666665 14.553583333333336 4.464341666666667C14.553583333333336 5.795741666666666 13.474250000000001 6.875058333333333 12.142833333333334 6.875058333333333L9.732083333333334 6.875058333333333L9.732083333333334 4.464341666666667zM12.142833333333334 3.3036333333333334C11.501791666666666 3.3036333333333334 10.982083333333334 3.8233 10.982083333333334 4.464341666666667L10.982083333333334 5.6250583333333335L12.142833333333334 5.6250583333333335C12.783875 5.6250583333333335 13.303583333333334 5.105391666666667 13.303583333333334 4.464341666666667C13.303583333333334 3.8233 12.783875 3.3036333333333334 12.142833333333334 3.3036333333333334z" fill="currentColor"></path><path d="M10 4.732058333333334C10.345166666666666 4.732058333333334 10.625 5.011875 10.625 5.357058333333334L10.625 16.428500000000003C10.625 16.773666666666667 10.345166666666666 17.053500000000003 10 17.053500000000003C9.654791666666668 17.053500000000003 9.375 16.773666666666667 9.375 16.428500000000003L9.375 5.357058333333334C9.375 5.011875 9.654791666666668 4.732058333333334 10 4.732058333333334z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_WEB': {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#0C6692'};"><svg style="width: 60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M9.571416666666666 7.6439C9.721125 7.33675 10.091416666666667 7.209108333333334 10.398583333333335 7.358808333333333C10.896041666666667 7.540316666666667 11.366333333333333 7.832000000000001 11.767333333333333 8.232975C13.475833333333334 9.941541666666668 13.475833333333334 12.711625 11.767333333333333 14.420166666666669L9.704916666666666 16.482583333333334C7.996383333333334 18.191125000000003 5.226283333333334 18.191125000000003 3.5177416666666668 16.482583333333334C1.8091916666666668 14.774041666666669 1.8091916666666668 12.003916666666667 3.5177416666666668 10.295375L5.008791666666667 8.804333333333334C5.252875 8.56025 5.6486 8.56025 5.892683333333334 8.804333333333334C6.136758333333334 9.048416666666668 6.136758333333334 9.444125000000001 5.892683333333334 9.688208333333334L4.401625 11.179250000000001C3.1812333333333336 12.399666666666667 3.1812333333333336 14.378291666666668 4.401625 15.598708333333335C5.622000000000001 16.819083333333335 7.60065 16.819083333333335 8.821041666666668 15.598708333333335L10.883416666666667 13.536291666666667C12.103833333333334 12.315916666666666 12.103833333333334 10.337250000000001 10.883416666666667 9.116875C10.582458333333333 8.815875 10.229416666666667 8.600908333333333 9.856458333333334 8.471066666666667C9.549333333333333 8.321375 9.421708333333335 7.9510499999999995 9.571416666666666 7.6439z" fill="currentColor"></path><path d="M15.597541666666668 4.402641666666667C14.377166666666668 3.1822500000000002 12.398541666666667 3.1822500000000002 11.178125000000001 4.402641666666667L9.11575 6.465033333333333C7.895358333333333 7.685425 7.895358333333333 9.664041666666668 9.11575 10.884458333333333C9.397666666666668 11.166375 9.725916666666667 11.371583333333334 10.073083333333333 11.500958333333333C10.376583333333334 11.658083333333334 10.495291666666667 12.031416666666667 10.338208333333332 12.334875C10.181083333333333 12.638375 9.80775 12.757083333333334 9.504291666666667 12.6C9.042416666666666 12.420333333333334 8.606383333333333 12.142833333333334 8.231858333333333 11.768333333333334C6.523316666666667 10.059791666666667 6.523316666666667 7.289691666666666 8.231858333333333 5.58115L10.29425 3.5187583333333334C12.002791666666667 1.8102083333333334 14.772875 1.8102083333333334 16.481458333333336 3.5187583333333334C18.19 5.2273000000000005 18.19 7.997400000000001 16.481458333333336 9.705916666666667L15.054916666666667 11.132458333333334C14.810875000000001 11.3765 14.415166666666668 11.3765 14.171041666666667 11.132458333333334C13.927 10.888333333333334 13.927 10.492625 14.171041666666667 10.248541666666666L15.597541666666668 8.822041666666667C16.81791666666667 7.601666666666667 16.81791666666667 5.623025 15.597541666666668 4.402641666666667z" fill="currentColor"></path></svg> ${tag.text}</span>`)
        break
      }
      case 'RICH_TEXT_NODE_TYPE_EMOJI': {
        const regex = new RegExp(tag.orig_text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
        text = text.replace(regex, `<img src='${tag.emoji.icon_url}' style='height: 60px; margin: 0 0 -10px 0;'>`)
        break
      }
    }
  }
  return text
}

/**
 * 判断标题是否有屏蔽词或屏蔽标签
 * @param Dynamic_Data 作品详情数据
 * @returns
 */
const skipDynamic = (Dynamic_Data: PushItem['Dynamic_Data']): boolean => {
  for (const banWord of Config.douyin.push.banWords) {
    if (Dynamic_Data.modules.module_dynamic.major?.archive?.title.includes(banWord) || Dynamic_Data.modules.module_dynamic.desc?.text?.includes(banWord)) {
      logger.mark(`动态：${logger.green(`https://t.bilibili.com/${Dynamic_Data.id_str}`)} 包含屏蔽词：「${logger.red(banWord)}」，跳过推送`)
      return true
    }
  }
  if (Dynamic_Data.type === 'DYNAMIC_TYPE_DRAW') {
    for (const banTag of Config.bilibili.push.banTags) {
      for (const tag of Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) {
        if (tag.orig_text.includes(banTag)) {
          logger.mark(`图文动态：${logger.green(`https://t.bilibili.com/${Dynamic_Data.id_str}`)} 包含屏蔽标签：「${logger.red(banTag)}」，跳过推送`)
          return true
        }
      }
    }
  }
  return false
}