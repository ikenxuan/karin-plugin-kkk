// 顶部模块导入
import karin, { logger } from 'node-karin'

import { Common } from '@/module'
import { Config } from '@/module/utils/Config'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { Bilibili, getBilibiliID } from '@/platform/bilibili'
import { DouYin, getDouyinID } from '@/platform/douyin'
import { fetchKuaishouData, getKuaishouID, Kuaishou } from '@/platform/kuaishou'
import { getXiaohongshuID, Xiaohongshu } from '@/platform/xiaohongshu'

const reg = {
  douyin: /^.*((www|v|jx|m)\.(douyin|iesdouyin)\.com|douyin\.com\/(video|note)).*/,
  bilibili: /(bilibili.com|b23.tv|t.bilibili.com|bili2233.cn|BV[a-zA-Z0-9]{10,})/,
  kuaishou: /^((.*)快手(.*)快手(.*)|(.*)v\.kuaishou(.*)|(.*)kuaishou\.com\/f\/[a-zA-Z0-9]+.*)$/,
  xiaohongshu: /(xiaohongshu\.com|xhslink\.com)/
}

// 包装抖音处理函数
const handleDouyin = wrapWithErrorHandler(async (e) => {
  const url = String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g))
  const iddata = await getDouyinID(e, url)
  await new DouYin(e, iddata).RESOURCES(iddata)
  return true
}, {
  businessName: '抖音视频解析'
})

// 包装B站处理函数
const handleBilibili = wrapWithErrorHandler(async (e) => {
  e.msg = e.msg.replace(/\\/g, '') // 移除消息中的反斜杠
  const urlRegex = /(https?:\/\/(?:www\.bilibili\.com|m\.bilibili\.com|t\.bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-.~:\/?#[\]@!$&'()*+,;=]+)/
  const bvRegex = /^BV[1-9a-zA-Z]{10}$/
  let url: string | null = null
  const urlMatch = e.msg.match(urlRegex)

  if (urlMatch) {
    url = urlMatch[0]
  } else if (bvRegex.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`
  }
  if (!url) {
    logger.warn(`未能在消息中找到有效的B站分享链接或BV号: ${e.msg}`)
    return true
  }
  const iddata = await getBilibiliID(url)
  await new Bilibili(e, iddata).RESOURCES(iddata)
  return true
}, {
  businessName: 'B站视频解析'
})

// 包装快手处理函数
const handleKuaishou = wrapWithErrorHandler(async (e) => {
  const kuaishouUrl = e.msg.replaceAll('\\', '').match(/(https:\/\/v\.kuaishou\.com\/\w+|https:\/\/www\.kuaishou\.com\/f\/[a-zA-Z0-9]+)/g)
  const iddata = await getKuaishouID(String(kuaishouUrl))
  const WorkData = await fetchKuaishouData(iddata.type, iddata)
  await new Kuaishou(e, iddata).RESOURCES(WorkData)
}, {
  businessName: '快手视频解析'
})

// 包装小红书处理函数
const handleXiaohongshu = wrapWithErrorHandler(async (e) => {
  const cleaned = e.msg.replaceAll('\\', '')
  const m = cleaned.match(/https?:\/\/[^\s"'<>]+/)
  const url = m?.[0]
  if (!url) {
    logger.warn(`未能在消息中找到有效链接: ${e.msg}`)
    return true
  }
  const iddata = await getXiaohongshuID(url)
  await new Xiaohongshu(e, iddata).RESOURCES(iddata)
  return true
}, {
  businessName: '小红书视频解析'
})

// 包装引用解析函数
const handlePrefix = wrapWithErrorHandler(async (e) => {
  e.msg = await Common.getReplyMessage(e)
  if (reg.douyin.test(e.msg)) {
    return await handleDouyin(e)
  } else if (reg.bilibili.test(e.msg)) {
    return await handleBilibili(e)
  } else if (reg.kuaishou.test(e.msg)) {
    return await handleKuaishou(e)
  } else if (reg.xiaohongshu.test(e.msg)) {
    return await handleXiaohongshu(e)
  }
}, {
  businessName: '引用解析'
})

// 注册命令
const douyin = karin.command(reg.douyin, handleDouyin, {
  name: 'kkk-视频功能-抖音',
  priority: Config.app.videoTool ? -Infinity : 800
})

const bilibili = karin.command(reg.bilibili, handleBilibili, {
  name: 'kkk-视频功能-B站',
  priority: Config.app.videoTool ? -Infinity : 800
})

const kuaishou = karin.command(reg.kuaishou, handleKuaishou, {
  name: 'kkk-视频功能-快手',
  priority: Config.app.videoTool ? -Infinity : 800
})

const xiaohongshu = karin.command(reg.xiaohongshu, handleXiaohongshu, {
  name: 'kkk-视频功能-小红书',
  priority: Config.app.videoTool ? -Infinity : 800
})

export const prefix = karin.command(/^#?(解析|kkk解析)/, handlePrefix, {
  name: 'kkk-视频功能-引用解析'
})

export const douyinAPP = Config.douyin.switch && douyin
export const bilibiliAPP = Config.bilibili.switch && bilibili
export const kuaishouAPP = Config.kuaishou.switch && kuaishou
export const xiaohongshuAPP = Config.xiaohongshu.switch && xiaohongshu