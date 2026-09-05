import karin, { logger } from 'node-karin'

import { bilibiliDB, douyinDB } from '@/module/db'
import { bilibiliFetcher, douyinFetcher } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { Bilibilipush, DouYinpush, getBilibiliID, getDouyinID } from '@/platform'

// 包装抖音推送任务
const handleDouyinPush = wrapWithErrorHandler(
  async () => {
    await new DouYinpush().action()
    return true
  },
  {
    businessName: '抖音推送任务'
  }
)

// 包装B站推送任务
const handleBilibiliPush = wrapWithErrorHandler(
  async () => {
    await new Bilibilipush().action()
    return true
  },
  {
    businessName: 'B站推送任务'
  }
)

// 包装强制推送命令
const handleForcePush = wrapWithErrorHandler(
  async (e) => {
    if (e.msg.includes('抖音')) {
      await new DouYinpush().action()
      return true
    } else if (e.msg.includes('B站')) {
      await new Bilibilipush().action()
      return true
    }
    return true
  },
  {
    businessName: '强制推送'
  }
)

// 包装设置抖音推送命令
const handleSetDouyinPush = wrapWithErrorHandler(
  async (e) => {
    const query = e.msg.replace(/^#设置抖音推送/, '').trim()

    // 检查是否是开启/关闭命令
    if (query === '开启' || query === '关闭') {
      const enable = query === '开启'
      Config.Modify('douyin', 'push.switch', enable)
      await e.reply(`抖音推送已${enable ? '开启' : '关闭'}，${enable ? '需要重启后生效' : '将在下次重启后停止推送'}`)
      logger.info(`抖音推送已${enable ? '开启' : '关闭'}`)
      return true
    }

    // 原有的订阅逻辑
    const data = await douyinFetcher.searchContent({
      query,
      type: 'user',
      typeMode: 'strict'
    })
    await new DouYinpush(e).setting(data.data)
    return true
  },
  {
    businessName: '设置抖音推送'
  }
)

// 包装设置B站推送命令
const handleSetBilibiliPush = wrapWithErrorHandler(
  async (e) => {
    const query = e.msg
      .replace(/^#设置[bB]站推送/, '')
      .replace(/^(?:[Uu][Ii][Dd]:)?/, '')
      .trim()

    // 检查是否是开启/关闭命令
    if (query === '开启' || query === '关闭') {
      const enable = query === '开启'
      Config.Modify('bilibili', 'push.switch', enable)
      await e.reply(`B站推送已${enable ? '开启' : '关闭'}，${enable ? '需要重启后生效' : '将在下次重启后停止推送'}`)
      logger.info(`B站推送已${enable ? '开启' : '关闭'}`)
      return true
    }

    // 原有的订阅逻辑
    if (!Config.amagi.cookies.bilibili) {
      await e.reply('\n请先配置B站Cookie', { at: true })
      return true
    }
    const match = /^(\d+)$/.exec(query)
    if (match && match[1]) {
      const data = await bilibiliFetcher.fetchUserCard({
        host_mid: Number(match[1]),
        typeMode: 'strict'
      })
      await new Bilibilipush(e).setting(data.data)
    }
    return true
  },
  {
    businessName: '设置B站推送'
  }
)

// 包装推送列表命令
const handleBilibiliPushList = wrapWithErrorHandler(
  async (e) => {
    await new Bilibilipush(e).renderPushList()
  },
  {
    businessName: 'B站推送列表'
  }
)

const handleDouyinPushList = wrapWithErrorHandler(
  async (e) => {
    await new DouYinpush(e).renderPushList()
  },
  {
    businessName: '抖音推送列表'
  }
)

// 包装设置机器人ID命令
const handleChangeBotID = wrapWithErrorHandler(
  async (e) => {
    const newBotId = e.msg.replace(/^#kkk设置推送机器人/, '')

    // 更新抖音配置和数据库
    const newDouyinlist = Config.pushlist.douyin.map((item) => {
      const modifiedGroupIds = item.group_id.map((groupId) => {
        const [group_id, oldBotId] = groupId.split(':')
        // 更新数据库中的botId
        if (oldBotId && oldBotId !== newBotId) {
          douyinDB.updateGroupBotId(group_id, oldBotId, newBotId).catch((err) => {
            logger.error(`Failed to update douyin group ${group_id}:`, err)
          })
        }
        return `${group_id}:${newBotId}`
      })
      return {
        ...item,
        group_id: modifiedGroupIds
      }
    })

    // 更新B站配置和数据库
    const newBilibililist = Config.pushlist.bilibili.map((item) => {
      const modifiedGroupIds = item.group_id.map((groupId) => {
        const [group_id, oldBotId] = groupId.split(':')
        // 更新数据库中的botId
        if (oldBotId && oldBotId !== newBotId) {
          bilibiliDB.updateGroupBotId(group_id, oldBotId, newBotId).catch((err) => {
            logger.error(`Failed to update bilibili group ${group_id}:`, err)
          })
        }
        return `${group_id}:${newBotId}`
      })
      return {
        ...item,
        group_id: modifiedGroupIds
      }
    })

    Config.Modify('pushlist', 'douyin', newDouyinlist)
    Config.Modify('pushlist', 'bilibili', newBilibililist)
    await e.reply('推送机器人已修改为' + newBotId)
    return true
  },
  {
    businessName: '设置推送机器人'
  }
)

// 包装全局忽略命令
const handleGlobalIgnore = wrapWithErrorHandler(
  async (e) => {
    const url = e.msg.replace(/^#kkk推送全局忽略/, '').trim()

    if (!url) {
      await e.reply('请提供链接')
      return true
    }

    // 判断平台
    const isDouyin = /(douyin|iesdouyin)\.com/.test(url)
    const isBilibili = /bilibili\.com/.test(url)

    if (!isDouyin && !isBilibili) {
      await e.reply('暂不支持该平台链接')
      return true
    }

    if (isDouyin) {
      const idData = await getDouyinID(e, url, false)
      if (!idData.aweme_id) {
        await e.reply('无法解析该抖音链接')
        return true
      }

      // 获取作品详情以获取 sec_uid
      const workInfo = await douyinFetcher.parseWork({ aweme_id: idData.aweme_id, typeMode: 'strict' })
      const sec_uid = workInfo.data?.aweme_detail?.author?.sec_uid

      if (!sec_uid) {
        await e.reply('无法获取该作品作者信息')
        return true
      }

      // 检查该作者是否在订阅配置中
      const subscribedItem = Config.pushlist.douyin?.find((item: any) => item.sec_uid === sec_uid)
      if (!subscribedItem) {
        await e.reply('该作品对应的博主未在推送订阅中，跳过')
        return true
      }

      // 获取所有订阅该作者的群组
      const groupIds = subscribedItem.group_id.map((g: string) => g.split(':')[0])

      // 将作品缓存写入所有订阅群组
      for (const groupId of groupIds) {
        await douyinDB.addAwemeCache(idData.aweme_id, sec_uid, groupId, 'post')
      }

      await e.reply(`已忽略抖音作品 ${idData.aweme_id}，共 ${groupIds.length} 个群组的推送标记为已处理`)
      logger.info(`全局忽略抖音作品 ${idData.aweme_id}，博主 sec_uid: ${sec_uid}`)
      return true
    }

    if (isBilibili) {
      const idData = await getBilibiliID(url)
      if (!idData.dynamic_id) {
        await e.reply('无法解析该B站链接或该链接不是动态链接')
        return true
      }

      // 获取动态详情以获取 host_mid
      const dynamicInfo = await bilibiliFetcher.fetchDynamicDetail({
        dynamic_id: idData.dynamic_id,
        typeMode: 'strict'
      })
      const host_mid = dynamicInfo.data.data.item.modules.module_author.mid

      if (!host_mid) {
        await e.reply('无法获取该动态作者信息')
        return true
      }

      // 检查该UP主是否在订阅配置中
      const subscribedItem = Config.pushlist.bilibili?.find((item: any) => item.host_mid === Number(host_mid))
      if (!subscribedItem) {
        await e.reply('该动态对应的UP主未在推送订阅中，跳过')
        return true
      }

      // 获取所有订阅该UP主的群组
      const groupIds = subscribedItem.group_id.map((g: string) => g.split(':')[0])
      const dynamicType = dynamicInfo.data?.data?.card?.desc?.type ?? 'DYNAMIC_TYPE_WORD'

      // 将动态缓存写入所有订阅群组
      for (const groupId of groupIds) {
        await bilibiliDB.addDynamicCache(idData.dynamic_id, Number(host_mid), groupId, String(dynamicType))
      }

      await e.reply(`已忽略B站动态 ${idData.dynamic_id}，共 ${groupIds.length} 个群组的推送标记为已处理`)
      logger.info(`全局忽略B站动态 ${idData.dynamic_id}，UP主 host_mid: ${host_mid}`)
      return true
    }

    return true
  },
  {
    businessName: '推送全局忽略'
  }
)

// 注册任务和命令
export const douyinPush =
  Config.douyin.push.switch && karin.task('抖音推送', Config.douyin.push.cron, handleDouyinPush, { log: true, type: 'skip' })

export const bilibiliPush =
  Config.bilibili.push.switch && karin.task('B站推送', Config.bilibili.push.cron, handleBilibiliPush, { log: true, type: 'skip' })

export const forcePush = karin.command(/#(抖音|B站)(全部)?强制推送/, handleForcePush, {
  name: '𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★',
  perm: 'master',
  event: 'message.group'
})

export const setdyPush = karin.command(/^#设置抖音推送/, handleSetDouyinPush, {
  name: 'kkk-推送功能-设置',
  event: 'message.group',
  perm: Config.douyin.push.permission
})

export const setbiliPush = karin.command(/^#设置[bB]站推送/, handleSetBilibiliPush, {
  name: 'kkk-推送功能-设置',
  event: 'message.group',
  perm: Config.bilibili.push.permission
})

export const bilibiliPushList = karin.command(/^#?[bB]站推送列表$/, handleBilibiliPushList, {
  name: 'kkk-推送功能-列表',
  event: 'message.group'
})

export const douyinPushList = karin.command(/^#?抖音推送列表$/, handleDouyinPushList, {
  name: 'kkk-推送功能-列表',
  event: 'message.group'
})

export const changeBotID = karin.command(/^#kkk设置推送机器人/, handleChangeBotID, {
  name: 'kkk-推送功能-设置',
  perm: 'master'
})

export const globalIgnore = karin.command(/^#kkk推送全局忽略/, handleGlobalIgnore, {
  name: 'kkk-推送功能-全局忽略',
  perm: 'master',
  event: 'message.group',
  priority: 1
})
