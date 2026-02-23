import karin, { logger } from 'node-karin'

import { Common, downloadVideo } from '@/module'
import { Config } from '@/module/utils/Config'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { Bilibili, getBilibiliID } from '@/platform/bilibili'
import { DouYin, getDouyinID } from '@/platform/douyin'
import { fetchKuaishouData, getKuaishouID, Kuaishou } from '@/platform/kuaishou'
import { getXiaohongshuID, Xiaohongshu } from '@/platform/xiaohongshu'

const reg = {
  douyin: /(https?:\/\/)?(www|v|jx|m|jingxuan)\.(douyin|iesdouyin)\.com/i,
  douyinCDN: /https:\/\/aweme\.snssdk\.com\/aweme\/v1\/play/i, // 抖音 CDN 下载链接
  bilibili: /(bilibili\.com|b23\.tv|t\.bilibili\.com|bili2233\.cn|\bBV[1-9a-zA-Z]{10}\b|\bav\d+\b)/i,
  kuaishou: /(快手.*快手|v\.kuaishou\.com|kuaishou\.com)/,
  xiaohongshu: /(xiaohongshu\.com|xhslink\.com)/
}

// 包装抖音处理函数
const handleDouyin = wrapWithErrorHandler(async (e) => {
  if (e.msg.startsWith('#测试')) {
    return false
  }

  // 判断是否为弹幕解析（通过 #弹幕解析 命令触发）
  const forceBurnDanmaku = /^#?弹幕解析/.test(e.msg)

  const urlMatch = e.msg.match(/(https?:\/\/[^\s]*\.(douyin|iesdouyin)\.com[^\s]*)/gi)
  if (!urlMatch) {
    logger.warn(`未能在消息中找到有效的抖音链接: ${e.msg}`)
    return true
  }
  const url = String(urlMatch[0])
  const iddata = await getDouyinID(e, url)
  await new DouYin(e, iddata, { forceBurnDanmaku }).DouyinHandler(iddata)
  return true
}, {
  businessName: '抖音视频解析'
})

// 包装B站处理函数
const handleBilibili = wrapWithErrorHandler(async (e) => {
  e.msg = e.msg.replace(/\\/g, '') // 移除消息中的反斜杠

  // 判断是否为弹幕解析（通过 #弹幕解析 命令触发）
  const forceBurnDanmaku = /^#?弹幕解析/.test(e.msg)

  const urlRegex = /(https?:\/\/(?:(?:www\.|m\.|t\.)?bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-.~:\/?#[\]@!$&'()*+,;=]+)/
  const bvRegex = /^BV[1-9a-zA-Z]{10}$/
  const avRegex = /^av\d+$/i
  let url: string | null = null
  const urlMatch = e.msg.match(urlRegex)

  if (urlMatch) {
    url = urlMatch[0]
  } else if (bvRegex.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`
  } else if (avRegex.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`
  }
  if (!url) {
    logger.warn(`未能在消息中找到有效的B站分享链接、BV号或AV号: ${e.msg}`)
    return true
  }
  const iddata = await getBilibiliID(url)
  await new Bilibili(e, iddata, { forceBurnDanmaku }).BilibiliHandler(iddata)
  return true
}, {
  businessName: 'B站视频解析'
})

// 包装快手处理函数
const handleKuaishou = wrapWithErrorHandler(async (e) => {
  const kuaishouUrl = e.msg.replaceAll('\\', '').match(/(https:\/\/v\.kuaishou\.com\/\w+|https:\/\/www\.kuaishou\.com\/f\/[a-zA-Z0-9]+)/g)
  const iddata = await getKuaishouID(String(kuaishouUrl))
  const WorkData = await fetchKuaishouData(iddata.type, iddata)
  await new Kuaishou(e, iddata).KuaishouHandler(WorkData)
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
  await new Xiaohongshu(e, iddata).XiaohongshuHandler(iddata)
  return true
}, {
  businessName: '小红书视频解析'
})

// 包装引用解析函数（支持 #解析 和 #弹幕解析）
const handlePrefix = wrapWithErrorHandler(async (e, next) => {
  const originalMsg = e.msg
  e.msg = await Common.getReplyMessage(e)
  
  // 保留原始命令前缀，用于判断是否为弹幕解析
  if (/^#?弹幕解析/.test(originalMsg)) {
    e.msg = '#弹幕解析 ' + e.msg
  }
  
  // 检查是否是抖音 CDN 下载链接（推送配置中渲染的二维码）
  if (reg.douyinCDN.test(e.msg)) {
    // 这是一个 CDN 下载链接，需要直接下载而不是解析
    logger.debug('检测到抖音 CDN 下载链接，直接下载视频')
    const videoIdMatch = e.msg.match(/video_id=([^&]+)/)
    const videoId = videoIdMatch ? videoIdMatch[1] : Date.now().toString()
    
    await downloadVideo(e, {
      video_url: e.msg,
      title: { 
        timestampTitle: `tmp_${Date.now()}.mp4`, 
        originTitle: `抖音视频_${videoId}.mp4` 
      }
    })
    return true
  } else if (reg.douyin.test(e.msg)) {
    // 正常的抖音分享链接
    return await handleDouyin(e, next)
  } else if (reg.bilibili.test(e.msg)) {
    return await handleBilibili(e, next)
  } else if (reg.kuaishou.test(e.msg)) {
    return await handleKuaishou(e, next)
  } else if (reg.xiaohongshu.test(e.msg)) {
    return await handleXiaohongshu(e, next)
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

export const prefix = karin.command(/^#?(解析|kkk解析|弹幕解析)/, handlePrefix, {
  name: 'kkk-视频功能-引用解析'
})

export const douyinAPP = Config.douyin.switch && douyin
export const bilibiliAPP = Config.bilibili.switch && bilibili
export const kuaishouAPP = Config.kuaishou.switch && kuaishou
export const xiaohongshuAPP = Config.xiaohongshu.switch && xiaohongshu
