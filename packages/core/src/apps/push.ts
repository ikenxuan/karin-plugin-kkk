import { getBilibiliData, getDouyinData } from '@ikenxuan/amagi'
import karin from 'node-karin'

import { Config } from '@/module'
import { Bilibilipush, DouYinpush } from '@/platform'

// TODO: 传适配器实例
export const douyinPush = Config.douyin.push.switch && karin.task('抖音推送', Config.douyin.push.cron, async () => {
  await new DouYinpush().action()
  return true
}, { log: Config.douyin.push.log })

export const bilibiliPush = Config.bilibili.push.switch && karin.task('B站推送', Config.bilibili.push.cron, async () => {
  await new Bilibilipush().action()
  return true
}, { log: Config.bilibili.push.log })

export const forcePush = karin.command(/#(抖音|B站)(全部)?强制推送/, async (e) => {
  if (e.msg.includes('抖音')) {
    await new DouYinpush().action()
    return true
  } else if (e.msg.includes('B站')) {
    await new Bilibilipush().action()
    return true
  }
  return true
}, { name: '𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★', perm: 'master', event: 'message.group' })

export const setdyPush = karin.command(/^#设置抖音推送/, async (e) => {
  const data = await getDouyinData('搜索数据', Config.cookies.douyin, { query: e.msg.replace(/^#设置抖音推送/, ''), typeMode: 'strict' })
  await new DouYinpush(e).setting(data.data)
  return true
}, { name: 'kkk-推送功能-设置', event: 'message.group', perm: Config.douyin.push.permission, dsbAdapter: ['qqbot'] })

export const setbiliPush = karin.command(/^#设置[bB]站推送(?:[Uu][Ii][Dd]:)?(\d+)$/, async (e) => {
  if (!Config.cookies.bilibili) {
    await e.reply('\n请先配置B站Cookie', { at: true })
    return true
  }
  const match = /^#设置[bB]站推送(?:UID:)?(\d+)$/.exec(e.msg)
  if (match && match[1]) {
    const data = await getBilibiliData('用户主页数据', Config.cookies.bilibili, { host_mid: Number(match[1]), typeMode: 'strict' })
    await new Bilibilipush(e).setting(data.data)
  }
  return true
}, { name: 'kkk-推送功能-设置', event: 'message.group', perm: Config.bilibili.push.permission, dsbAdapter: ['qqbot'] })

export const bilibiliPushList = karin.command(/^#?[bB]站推送列表$/, async (e) => {
  await new Bilibilipush(e).renderPushList()
}, { name: 'kkk-推送功能-列表', event: 'message.group' })

export const douyinPushList = karin.command(/^#?抖音推送列表$/, async (e) => {
  await new DouYinpush(e).renderPushList()
}, { name: 'kkk-推送功能-列表', event: 'message.group' })

export const changeBotID = karin.command(/^#kkk设置推送机器人/, async (e) => {
  const newDouyinlist = Config.pushlist.douyin.map(item => {
    // 操作每个 group_id
    const modifiedGroupIds = item.group_id.map(groupId => {
      const [group_id] = groupId.split(':')
      return `${group_id}:${e.msg.replace(/^#kkk设置推送机器人/, '')}`
    })
    return {
      ...item,
      group_id: modifiedGroupIds
    }
  })
  const newBilibililist = Config.pushlist.bilibili.map(item => {
    // 操作每个 group_id
    const modifiedGroupIds = item.group_id.map(groupId => {
      const [group_id] = groupId.split(':')
      return `${group_id}:${e.msg.replace(/^#kkk设置推送机器人/, '')}`
    })
    return {
      ...item,
      group_id: modifiedGroupIds
    }
  })
  Config.Modify('pushlist', 'douyin', newDouyinlist)
  Config.Modify('pushlist', 'bilibili', newBilibililist)
  await e.reply('推送机器人已修改为' + e.msg.replace(/^#kkk设置推送机器人/, ''))
  return true
}, { name: 'kkk-推送功能-设置', perm: 'master' })
