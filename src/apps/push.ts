import { getBilibiliData, getDouyinData } from '@ikenxuan/amagi'
import karin from 'node-karin'

import { Config } from '@/module'
import { Bilibilipush, DouYinpush } from '@/platform'

export const douyinPush = Config.douyin.push.switch && karin.task('抖音推送', Config.douyin.push.cron, async () => {
  await new DouYinpush().action()
  return true
}, { name: 'kkk-推送功能-抖音', log: Config.douyin.push.log })

export const bilibiliPush = Config.bilibili.push.switch && karin.task('B站推送', Config.bilibili.push.cron, async () => {
  await new Bilibilipush().action()
  return true
}, { name: 'kkk-推送功能-B站', log: Config.bilibili.push.log })

export const forcePush = karin.command(new RegExp(/#(抖音|B站)(全部)?强制推送/), async (e) => {
  if (e.msg.includes('抖音')) {
    await new DouYinpush(e, true).action()
    return true
  } else if (e.msg.includes('B站')) {
    await new Bilibilipush(e, true).action()
    return true
  }
  return true
}, { name: 'Ciallo～(∠・ω< )⌒☆', permission: 'master' })

export const setdyPush = Config.bilibili.push.switch && karin.command(new RegExp(/^#设置抖音推送/), async (e) => {
  const data = await getDouyinData('搜索数据', Config.cookies.douyin, { query: e.msg.replace(/^#设置抖音推送/, '') })
  await e.reply(await new DouYinpush(e).setting(data))
  return true
}, { name: 'kkk-推送功能-设置', event: 'message.friend' })

export const setbiliPush = Config.bilibili.push.switch && karin.command(new RegExp(/^#设置[bB]站推送(?:[Uu][Ii][Dd]:)?(\d+)$/), async (e) => {
  const match = /^#设置[bB]站推送(?:UID:)?(\d+)$/.exec(e.msg)
  if (match && match[1]) {
    const data = await getBilibiliData('用户主页数据', Config.cookies.bilibili, { host_mid: match[1] })
    await e.reply(await new Bilibilipush(e).setting(data))
  }
  return true
}, { name: 'kkk-推送功能-设置', event: 'message.friend', permission: Config.bilibili.push.permission })