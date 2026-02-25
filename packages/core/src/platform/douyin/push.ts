import fs from 'node:fs'

import type { DySearchInfo } from '@ikenxuan/amagi'
import { format, fromUnixTime } from 'date-fns'
import type { AdapterType, ImageElement, Message } from 'node-karin'
import karin, { common, logger, segment } from 'node-karin'
import { DouyinUserListProps } from 'template/types/platforms/douyin'

import {
  Base,
  baseHeaders,
  cleanOldDynamicCache,
  Common,
  createLiveImageContext,
  douyinDB,
  downloadFile,
  downLoadFileOptions,
  downloadVideo,
  fileInfo,
  loopVideo,
  mergeLiveImageContinuous,
  mergeLiveImageIndependent,
  Networks,
  Render
} from '@/module'
import { Config } from '@/module/utils/Config'
import { DouyinIdData, douyinProcessVideos, getDouyinID } from '@/platform/douyin'
import type { douyinPushItem } from '@/types/config/pushlist'

import { processFavoriteList } from './push/favorite'
import { processLiveStream } from './push/live'
import { processPostList } from './push/post'
import { processRecommendList } from './push/recommend'
import { type DouyinPushItem, type WillBePushList } from './push/types'

// Re-export types for backward compatibility
export type { DouyinPushItem }

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

    // 检查并补全配置文件中缺失的字段
    this.ensureConfigFields(Config.pushlist.douyin)

    // 获取已注册的 bot 列表，过滤未注册的 bot
    const registeredBotIds = karin.getAllBotID()
    const filteredPushList = this.filterPushListByRegisteredBots(Config.pushlist.douyin, registeredBotIds)

    if (filteredPushList.length === 0) {
      logger.warn('没有已注册的 bot 可用于抖音推送')
      return true
    }

    const data = await this.getDynamicList(filteredPushList)

    if (Object.keys(data).length === 0) return true

    if (this.force) return await this.forcepush(data)
    else return await this.getdata(data)
  }

  /**
   * 检查并补全配置文件中缺失的字段
   * @param pushList 推送配置列表
   */
  private ensureConfigFields (pushList: douyinPushItem[]): void {
    if (!pushList || pushList.length === 0) return

    let hasChanges = false

    for (const item of pushList) {
      // 检查并补全 pushTypes 字段
      if (!item.pushTypes || item.pushTypes.length === 0) {
        item.pushTypes = ['post', 'live', 'favorite', 'recommend']
        hasChanges = true
        logger.info(`为用户 ${item.remark ?? item.sec_uid} 自动补全推送类型：作品列表、直播、收藏、推荐`)
      }

      // 检查并补全 switch 字段
      if (item.switch === undefined) {
        item.switch = true
        hasChanges = true
      }
    }

    // 如果有修改，保存到配置文件
    if (hasChanges) {
      Config.Modify('pushlist', 'douyin', pushList)
      logger.info('已自动补全配置文件中缺失的字段并保存')
    }
  }

  /**
   * 根据已注册的 bot 列表过滤推送配置
   * @param pushList 原始推送配置列表
   * @param registeredBotIds 已注册的 bot ID 列表
   * @returns 过滤后的推送配置列表
   */
  private filterPushListByRegisteredBots (pushList: douyinPushItem[], registeredBotIds: string[]): douyinPushItem[] {
    if (!pushList || pushList.length === 0) return []

    const registeredSet = new Set(registeredBotIds)
    const filteredList: douyinPushItem[] = []

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
        logger.debug(`用户 ${item.remark ?? item.sec_uid} 的所有推送目标 bot 均未注册，跳过`)
      }
    }

    return filteredList
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
      const pushItem = data[awemeId]
      const actualAwemeId = awemeId.replace(/^(post|favorite|recommend|live)_/, '') // 移除推送类型前缀
      const pushTypeLabel = pushItem.pushType === 'post' ? '作品列表' : 
        pushItem.pushType === 'favorite' ? '喜欢列表' : 
          pushItem.pushType === 'recommend' ? '推荐列表' : '直播'
      
      logger.mark(`
        ${logger.blue('开始处理并渲染抖音动态图片')}
        ${logger.blue('博主')}: ${logger.green(pushItem.remark)} 
        ${logger.blue('推送类型')}: ${logger.magenta(pushTypeLabel)}
        ${logger.cyan('作品id')}：${logger.yellow(actualAwemeId)}
        ${logger.cyan('访问地址')}：${logger.green('https://www.douyin.com/video/' + actualAwemeId)}`)

      const Detail_Data = pushItem.Detail_Data
      const skip = await skipDynamic(pushItem)
      skip && logger.warn(`作品 https://www.douyin.com/video/${actualAwemeId} 已被处理，跳过`)
      let img: ImageElement[] = []
      let iddata: DouyinIdData = { is_mp4: true, type: 'one_work' }

      if (!skip) {
        iddata = await getDouyinID(this.e, Detail_Data.share_url ?? 'https://live.douyin.com/' + Detail_Data.room_data?.owner.web_rid, false)
      }

      if (!skip) {
        if (pushItem.pushType === 'live' && 'room_data' in pushItem.Detail_Data && Detail_Data.live_data) {
          // 处理直播推送
          img = await Render('douyin/live', {
            image_url: Detail_Data.live_data.data.data.data[0]?.cover?.url_list[0] ?? Detail_Data.live_data.data.data.qrcode_url,
            text: Detail_Data.live_data.data.data.data[0]?.title ?? '',
            liveinf: `${Detail_Data.live_data.data.data.partition_road_map?.partition?.title ?? Detail_Data.live_data.data.data.data[0]?.title ?? '获取失败'} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
            在线观众: Detail_Data.live_data.data.data.data.length > 0 && Detail_Data.live_data.data.data.data[0].room_view_stats?.display_value ? this.count(Detail_Data.live_data.data.data.data[0].room_view_stats.display_value) : '：语音直播或刚开播获取失败。',
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
          
          // 根据推送类型选择不同的渲染模板和数据
          if (pushItem.pushType === 'favorite') {
            // 喜欢列表模板：需要显示"谁喜欢了谁的作品"
            // 获取作者用户信息（如果有的话）
            const authorUserInfo = 'author_user_info' in Detail_Data ? Detail_Data.author_user_info : undefined
            
            img = await Render('douyin/favorite-list', {
              image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover_original_scale?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
              desc: this.desc(Detail_Data, Detail_Data.desc),
              dianzan: this.count(Detail_Data.statistics.digg_count),
              pinglun: this.count(Detail_Data.statistics.comment_count),
              share: this.count(Detail_Data.statistics.share_count),
              shouchang: this.count(Detail_Data.statistics.collect_count),
              tuijian: this.count(Detail_Data.statistics.recommend_count),
              create_time: format(fromUnixTime(pushItem.create_time), 'yyyy-MM-dd HH:mm'),
              // 点赞者信息（订阅者）
              liker_username: pushItem.remark,
              liker_avatar: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.data.user.avatar_larger.uri,
              liker_douyin_id: Detail_Data.user_info.data.user.unique_id === '' ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
              // 作品作者信息
              author_username: Detail_Data.author.nickname,
              author_avatar: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + authorUserInfo.data.user.avatar_larger.uri,
              author_douyin_id: (authorUserInfo.data.user.unique_id === '' ? authorUserInfo.data.user.short_id : authorUserInfo.data.user.unique_id),
              share_url: Config.douyin.push.shareType === 'web' ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`
            })
          } else if (pushItem.pushType === 'recommend') {
            // 推荐列表模板
            // 获取作者用户信息（如果有的话）
            const authorUserInfo = 'author_user_info' in Detail_Data ? Detail_Data.author_user_info : undefined

            img = await Render('douyin/recommend-list', {
              image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover_original_scale?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
              desc: this.desc(Detail_Data, Detail_Data.desc),
              dianzan: this.count(Detail_Data.statistics.digg_count),
              pinglun: this.count(Detail_Data.statistics.comment_count),
              share: this.count(Detail_Data.statistics.share_count),
              shouchang: this.count(Detail_Data.statistics.collect_count),
              tuijian: this.count(Detail_Data.statistics.recommend_count),
              create_time: format(fromUnixTime(pushItem.create_time), 'yyyy-MM-dd HH:mm'),
              
              // 推荐者信息（订阅者）
              recommender_username: pushItem.remark,
              recommender_avatar: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.data.user.avatar_larger.uri,
              recommender_douyin_id: Detail_Data.user_info.data.user.unique_id === '' ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,

              // 作品作者信息
              author_username: Detail_Data.author.nickname,
              author_avatar: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + authorUserInfo.data.user.avatar_larger.uri,
              author_douyin_id: (authorUserInfo.data.user.unique_id === '' ? authorUserInfo.data.user.short_id : authorUserInfo.data.user.unique_id),
              share_url: Config.douyin.push.shareType === 'web' ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`
            })
          } else {
            // 作品列表模板（post）
            const dynamicTypeLabel = '作品动态推送'
          
            img = await Render('douyin/dynamic', {
              image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
              desc: this.desc(Detail_Data, Detail_Data.desc),
              dianzan: this.count(Detail_Data.statistics.digg_count),
              pinglun: this.count(Detail_Data.statistics.comment_count),
              share: this.count(Detail_Data.statistics.share_count),
              shouchang: this.count(Detail_Data.statistics.collect_count),
              create_time: format(fromUnixTime(pushItem.create_time), 'yyyy-MM-dd HH:mm'),
              avater_url: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.data.user.avatar_larger.uri,
              share_url: Config.douyin.push.shareType === 'web' ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`,
              username: Detail_Data.author.nickname,
              抖音号: Detail_Data.user_info.data.user.unique_id === '' ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
              粉丝: this.count(Detail_Data.user_info.data.user.follower_count),
              获赞: this.count(Detail_Data.user_info.data.user.total_favorited),
              关注: this.count(Detail_Data.user_info.data.user.following_count),
              dynamicTYPE: dynamicTypeLabel,
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
      }

      // 遍历目标群组，并发送消息
      for (const target of pushItem.targets) {
        let status = { message_id: '' }
        const { groupId, botId } = target

        if (!skip) {
          const Contact = karin.contactGroup(groupId)
          // 发送消息
          status = await karin.sendMsg(botId, Contact, img ? [...img] : [])

          // 如果是直播推送，更新直播状态
          if (pushItem.pushType === 'live' && 'room_data' in pushItem.Detail_Data && status.message_id) {
            await douyinDB.updateLiveStatus(pushItem.sec_uid, true)
          }

          // 是否一同解析该新作品？
          if (Config.douyin.push.parsedynamic && status.message_id) {
            logger.debug(`开始解析作品，类型为：${iddata.is_mp4 ? '视频' : '图集'}`)
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
                logger.debug('获取精确下载地址')
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
            } else if (!iddata.is_mp4 && iddata.type === 'one_work') { // 如果新作品是图集或合辑
              // 判断是否为合辑（is_slides）
              const isSlides = Detail_Data.is_slides === true
                
              if (isSlides && Detail_Data.images) {
                // 合辑处理逻辑
                const images: any[] = []
                const temp: fileInfo[] = []
                  
                /** 下载 BGM（如果存在） */
                let liveimgbgm: fileInfo | null = null
                let bgmContext: any = null
                const mergeMode = Config.douyin.liveImageMergeMode ?? 'independent'
                
                if (Detail_Data.music) {
                  let mp3Path = ''
                  // 该声音由于版权原因在当前地区不可用
                  if (Detail_Data.music.play_url.uri === '') {
                    const extraData = JSON.parse(Detail_Data.music.extra)
                    mp3Path = extraData.original_song_url
                  } else {
                    mp3Path = Detail_Data.music.play_url.uri
                  }
                  
                  liveimgbgm = await downloadFile(
                    mp3Path,
                    {
                      title: `Douyin_tmp_A_${Date.now()}.mp3`,
                      headers: douyinBaseHeaders
                    }
                  )
                  temp.push(liveimgbgm)
                  
                  // 获取合并模式配置
                  if (mergeMode === 'continuous') {
                    bgmContext = await createLiveImageContext(liveimgbgm.filepath)
                  }
                }
                  
                const images1 = Detail_Data.images ?? []
                if (!images1.length) {
                  logger.debug('未获取到合辑的图片数据')
                }
                  
                for (const item of images1) {
                  // 静态图片，clip_type为2或undefined
                  if (item.clip_type === 2 || item.clip_type === undefined) {
                    images.push(segment.image(item.url_list[0]))
                    continue
                  }
                    
                  /** 动图/短片 */
                  const liveimg = await downloadFile(
                    `https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`,
                    {
                      title: `Douyin_tmp_V_${Date.now()}.mp4`,
                      headers: douyinBaseHeaders
                    }
                  )
                    
                  if (liveimg.filepath) {
                    const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`
                    let success: boolean
                      
                    // clip_type === 4 是短片，不需要重放，loopCount = 1
                    // 其他类型（如 clip_type === 5 的 livePhoto）需要三次重放
                    const loopCount = item.clip_type === 4 ? 1 : 3
                      
                    // 如果没有 BGM，直接重放视频
                    if (!liveimgbgm) {
                      if (loopCount > 1) {
                        // 需要重放，使用 ffmpeg 重放视频
                        success = await loopVideo(liveimg.filepath, outputPath, loopCount)
                      } else {
                        // 不需要重放，直接使用原视频
                        fs.renameSync(liveimg.filepath, outputPath)
                        success = true
                      }
                    } else if (mergeMode === 'continuous' && bgmContext) {
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
                        
                      // clip_type === 5 是 livePhoto，添加封面静态图
                      if (item.clip_type === 5 && item.url_list?.[0]) {
                        images.push(segment.image(item.url_list[0]))
                      }
                    } else {
                      await Common.removeFile(liveimg.filepath, true)
                    }
                  }
                }
                  
                const bot = karin.getBot(botId) as AdapterType
                const Element = common.makeForward(images, botId, bot.account.name)
                try {
                  await bot.sendForwardMsg(Contact, Element, {
                    source: '合辑内容',
                    summary: `查看${Element.length}张图片/视频消息`,
                    prompt: '抖音合辑解析结果',
                    news: [{ text: '点击查看解析结果' }]
                  })
                } catch (error) {
                  logger.error(`发送合辑失败: ${error}`)
                } finally {
                  for (const item of temp) {
                    await Common.removeFile(item.filepath, true)
                  }
                }
              } else if (Detail_Data.images) {
                // 普通图集处理逻辑
                // 检查是否包含 live 图（clip_type !== 2 且 clip_type !== undefined）
                const hasLiveImage = Detail_Data.images.some((item: any) => item.clip_type !== 2 && item.clip_type !== undefined)
                  
                if (hasLiveImage) {
                  // 包含 live 图，需要特殊处理
                  const processedImages: any[] = []
                  const temp: fileInfo[] = []
                    
                  /** 下载 BGM（如果存在） */
                  let liveimgbgm: fileInfo | null = null
                  let bgmContext: any = null
                  const mergeMode = Config.douyin.liveImageMergeMode ?? 'independent'
                  
                  if (Detail_Data.music) {
                    let mp3Path = ''
                    if (Detail_Data.music.play_url.uri === '') {
                      const extraData = JSON.parse(Detail_Data.music.extra)
                      mp3Path = extraData.original_song_url
                    } else {
                      mp3Path = Detail_Data.music.play_url.uri
                    }
                    
                    liveimgbgm = await downloadFile(
                      mp3Path,
                      {
                        title: `Douyin_tmp_A_${Date.now()}.mp3`,
                        headers: douyinBaseHeaders
                      }
                    )
                    temp.push(liveimgbgm)
                    
                    // 获取合并模式配置
                    if (mergeMode === 'continuous') {
                      bgmContext = await createLiveImageContext(liveimgbgm.filepath)
                    }
                  }
                    
                  for (const item of Detail_Data.images) {
                    // 静态图片，clip_type为2或undefined
                    if (item.clip_type === 2 || item.clip_type === undefined) {
                      const image_url = item.url_list[2] ?? item.url_list[1]
                      processedImages.push(segment.image(image_url))
                      continue
                    }
                      
                    /** live 图 */
                    const liveimg = await downloadFile(
                      `https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`,
                      {
                        title: `Douyin_tmp_V_${Date.now()}.mp4`,
                        headers: douyinBaseHeaders
                      }
                    )
                      
                    if (liveimg.filepath) {
                      const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`
                      let success: boolean
                        
                      // clip_type === 4 是短片，不需要重放，loopCount = 1
                      // 其他类型（如 clip_type === 5 的 livePhoto）需要三次重放
                      const loopCount = item.clip_type === 4 ? 1 : 3
                        
                      // 如果没有 BGM，直接重放视频
                      if (!liveimgbgm) {
                        if (loopCount > 1) {
                          // 需要重放，使用 ffmpeg 重放视频
                          success = await loopVideo(liveimg.filepath, outputPath, loopCount)
                        } else {
                          // 不需要重放，直接使用原视频
                          fs.renameSync(liveimg.filepath, outputPath)
                          success = true
                        }
                      } else if (mergeMode === 'continuous' && bgmContext) {
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
                        if (item.clip_type === 5 && item.url_list?.[0]) {
                          processedImages.push(segment.image(item.url_list[0]))
                        }
                      } else {
                        await Common.removeFile(liveimg.filepath, true)
                      }
                    }
                  }
                    
                  const bot = karin.getBot(botId) as AdapterType
                  const Element = common.makeForward(processedImages, botId, bot.account.name)
                  try {
                    await bot.sendForwardMsg(Contact, Element, {
                      source: '图集内容',
                      summary: `查看${Element.length}张图片/视频消息`,
                      prompt: '抖音图集解析结果',
                      news: [{ text: '点击查看解析结果' }]
                    })
                  } catch (error) {
                    logger.error(`发送图集失败: ${error}`)
                  } finally {
                    for (const item of temp) {
                      await Common.removeFile(item.filepath, true)
                    }
                  }
                } else {
                  // 纯静态图集
                  const imageres: ImageElement[] = []
                  let image_url
                  for (const item of Detail_Data.images) {
                    image_url = item.url_list[2] ?? item.url_list[1] // 图片地址
                    imageres.push(segment.image(image_url))
                  }
                  const bot = karin.getBot(botId) as AdapterType
                    
                  if (imageres.length === 1) {
                    // 单张图片直接发送
                    await bot.sendMsg(Contact, [segment.image(image_url)])
                  } else {
                    // 多张图片使用合并转发
                    const forwardMsg = common.makeForward(imageres, botId, bot.account.name)
                    await bot.sendForwardMsg(Contact, forwardMsg, {
                      source: '图片合集',
                      summary: `查看${forwardMsg.length}张图片消息`,
                      prompt: '抖音图集解析结果',
                      news: [{ text: '点击查看解析结果' }]
                    })
                  }
                }
              }
            }
          }
        }

        // 添加作品缓存（直播不需要缓存aweme_id）
        if (skip || (pushItem.pushType !== 'live' && status.message_id)) {
          await douyinDB.addAwemeCache(actualAwemeId, pushItem.sec_uid, groupId, pushItem.pushType)
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
        await common.sleep(2000)
        const sec_uid = item.sec_uid
        const pushTypes = item.pushTypes || ['post'] // 默认推送作品列表
        
        logger.debug(`开始获取用户：${item.remark}（${sec_uid}）的内容，推送类型：${pushTypes.join(', ')}`)
        
        const userinfo = await this.amagi.douyin.fetcher.fetchUserProfile({ sec_uid, typeMode: 'strict' })

        const targets = item.group_id.map(groupWithBot => {
          const [groupId, botId] = groupWithBot.split(':')
          return { groupId, botId }
        })

        // 如果没有订阅群组，跳过该用户
        if (targets.length === 0) continue

        // special_state 特殊状态，用户已注销
        if (userinfo.data.user?.special_state_info?.special_state === 1 && userinfo.data.user?.user_deleted === true) {
          logger.warn(`${item.remark}（${sec_uid}）${userinfo.data.user.special_state_info.title}`)
          continue
        }

        // 遍历每种推送类型
        for (const pushType of pushTypes) {
          await common.sleep(1000)
          
          // 处理直播推送
          if (pushType === 'live') {
            const liveItem = await processLiveStream(sec_uid, userinfo, item, targets, this.amagi)
            if (liveItem) {
              willbepushlist[`live_${sec_uid}`] = liveItem
            }
            continue
          }
          
          let contentList: any[] = []
          let listName = ''
          
          // 根据推送类型获取不同的列表
          switch (pushType) {
            case 'post':
              listName = '作品列表'
              const videolist = await this.amagi.douyin.fetcher.fetchUserVideoList({ sec_uid, number: 5, typeMode: 'strict' })
              contentList = videolist.data.aweme_list || []
              break
            case 'favorite':
              listName = '喜欢列表'
              const favoritelist = await this.amagi.douyin.fetcher.fetchUserFavoriteList({ sec_uid, number: 5, typeMode: 'strict' })
              if (favoritelist.data.aweme_list.length === 0) logger.warn(`${item.remark}(${item.short_id}) 获取到的喜欢列表数量为零！此博主可能未公开他/她的喜欢列表`)
              contentList = favoritelist.data.aweme_list || []
              break
            case 'recommend':
              listName = '推荐列表'
              const recommendlist = await this.amagi.douyin.fetcher.fetchUserRecommendList({ sec_uid, number: 5, typeMode: 'strict' })
              if (recommendlist.data.aweme_list.length === 0) logger.warn(`${item.remark}(${item.short_id}) 获取到的推荐列表数量为零！此博主可能未公开他/她的推荐列表`)
              contentList = recommendlist.data.aweme_list || []
              break
          }

          logger.debug(`获取到 ${item.remark} 的${listName}，共 ${contentList.length} 条`)

          // 根据推送类型调用不同的处理函数
          if (contentList.length > 0) {
            let pushItems: DouyinPushItem[] = []
            switch (pushType) {
              case 'post':
                pushItems = await processPostList(contentList, sec_uid, userinfo, item, targets)
                break
              case 'favorite':
                pushItems = await processFavoriteList(contentList, sec_uid, userinfo, item, targets, this.force)
                break
              case 'recommend':
                pushItems = await processRecommendList(contentList, sec_uid, userinfo, item, targets, this.force)
                break
            }
            
            // 将返回的推送项添加到willbepushlist中
            for (const pushItem of pushItems) {
              const key = `${pushType}_${pushItem.Detail_Data.aweme_id}`
              willbepushlist[key] = pushItem
            }
          }
        }
      }
    } catch (error) {
      throw new Error(`获取抖音用户内容列表失败: ${error}`)
    }

    return willbepushlist
  }

  /**
 * 检查作品是否已经推送过
 * @param aweme_id 作品ID
 * @param sec_uid 用户sec_uid
 * @param groupIds 群组ID列表
 * @param pushType 推送类型
 * @returns 是否已经推送过
 */
  async checkIfAlreadyPushed (aweme_id: string, sec_uid: string, groupIds: string[], pushType: string = 'post'): Promise<boolean> {
    for (const groupId of groupIds) {
      const isPushed = await douyinDB.isAwemePushed(aweme_id, sec_uid, groupId, pushType)
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
      // 获取用户输入的抖音号
      const inputDouyinId = this.e.msg.replace(/^#设置抖音推送/, '').trim()

      // 在用户列表中查找匹配的用户
      let matchedUser = null
      for (const userItem of data.user_list) {
        const currentDouyinId = userItem.user_info.unique_id === '' ? userItem.user_info.short_id : userItem.user_info.unique_id
        if (currentDouyinId === inputDouyinId) {
          matchedUser = userItem.user_info
          break
        }
      }

      // 如果没找到匹配的用户，抛出错误
      if (!matchedUser) {
        throw new Error(`未找到抖音号为 ${inputDouyinId} 的用户`)
      }

      // 使用匹配到的用户的 sec_uid 进行下一步请求
      const sec_uid = matchedUser.sec_uid
      const UserInfoData = await this.amagi.douyin.fetcher.fetchUserProfile({ sec_uid, typeMode: 'strict' })

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
          
          // 确保 pushTypes 字段存在，如果不存在则添加默认值
          if (!existingItem.pushTypes || existingItem.pushTypes.length === 0) {
            existingItem.pushTypes = ['post', 'live']
          }

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
          short_id: user_shortid,
          pushTypes: ['post', 'live']
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
      const userInfo = await this.amagi.douyin.fetcher.fetchUserProfile({ sec_uid, typeMode: 'strict' })

      // 查找配置文件中对应的全局开关状态
      const configItem = Config.pushlist.douyin?.find((item: douyinPushItem) => item.sec_uid === sec_uid)
      const switchStatus = configItem?.switch !== false // 默认为 true
      const pushTypes = configItem?.pushTypes || ['post']

      renderOpt.push({
        avatar_img: userInfo.data.user.avatar_larger.url_list[0],
        username: userInfo.data.user.nickname,
        short_id: userInfo.data.user.unique_id === '' ? userInfo.data.user.short_id : userInfo.data.user.unique_id,
        fans: this.count(userInfo.data.user.follower_count),
        total_favorited: this.count(userInfo.data.user.total_favorited),
        following_count: this.count(userInfo.data.user.following_count),
        switch: switchStatus,
        pushTypes
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
        const userinfo = await this.amagi.douyin.fetcher.fetchUserProfile({ sec_uid: i.sec_uid, typeMode: 'strict' })
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
