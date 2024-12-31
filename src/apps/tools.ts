import karin from 'node-karin'

import { Common, Config } from '@/module'
import { Bilibili, fetchBilibiliData, getBilibiliID } from '@/platform/bilibili'
import { DouYin, fetchDouyinData, getDouyinID } from '@/platform/douyin'
import { fetchKuaishouData, getKuaishouID, Kuaishou } from '@/platform/kuaishou'

const reg = {
  douyin: new RegExp('^.*((www|v|jx)\\.(douyin|iesdouyin)\\.com|douyin\\.com\\/(video|note)).*'),
  bilibili: new RegExp(/(bilibili.com|b23.tv|t.bilibili.com|bili2233.cn|BV[a-zA-Z0-9]{10,})/),
  kuaishou: new RegExp('^((.*)快手(.*)快手(.*)|(.*)v.kuaishou(.*))$')
}
const douyin = karin.command(reg.douyin, async (e) => {
  const url = String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g))
  const iddata = await getDouyinID(url)
  const data = await fetchDouyinData(iddata.type, iddata)
  await new DouYin(e, iddata).RESOURCES(data)
  return true
}, { name: 'kkk-视频功能-抖音', priority: Config.app.defaulttool ? -Infinity : 800 })

const bilibili = karin.command(reg.bilibili, async (e) => {
  e.msg = e.msg.replace(/\\/g, '')
  const urlRex = /(https?:\/\/)?(www\.bilibili\.com|m\.bilibili\.com|bili2233\.cn)\/[a-zA-Z0-9._%&+=\-\/?]*[a-zA-Z0-9_\/?=&#%+]*$/g
  const bShortRex = /https?:\/\/b23\.tv\/([a-zA-Z0-9]+)/
  let url: string | null = ''

  if (urlRex.test(e.msg)) {
    const matchResult = e.msg.match(urlRex)
    url = matchResult ? matchResult[0] : null
  } else if (bShortRex.test(e.msg)) {
    const match = bShortRex.exec(e.msg)
    url = match && match[0]
  } else if (/^BV[1-9a-zA-Z]{10}$/.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`
  }
  const iddata = await getBilibiliID(url!)
  const data = await fetchBilibiliData(iddata.type, iddata)
  await new Bilibili(e, data).RESOURCES(data)
  return true
}, { name: 'kkk-视频功能-B站', priority: Config.app.defaulttool ? -Infinity : 800 })

const kuaishou = karin.command(reg.kuaishou, async (e) => {
  const iddata = await getKuaishouID(String(e.msg.replaceAll('\\', '').match(/https:\/\/v\.kuaishou\.com\/\w+/g)))
  const WorkData = await fetchKuaishouData(iddata.type, iddata)
  await new Kuaishou(e, iddata).RESOURCES(WorkData)
  return true
}, { name: 'kkk-视频功能-快手', priority: Config.app.defaulttool ? -Infinity : 800 })

export const prefix = karin.command(/^#?(解析|kkk解析)/, async (e) => {
  e.msg = await Common.getReplyMessage(e)
  if (reg.douyin.test(e.msg)) {
    return await douyin.fnc(e)
  } else if (reg.bilibili.test(e.msg)) {
    return await bilibili.fnc(e)
  }
  return true
}, { name: 'kkk-视频功能-引用解析' })

export const douyinAPP = Config.douyin.switch && douyin
export const bilibiliAPP = Config.bilibili.switch && bilibili
export const kuaishouAPP = Config.kuaishou.switch && kuaishou
