import fs from 'node:fs'

import Amagi from '@ikenxuan/amagi'
import karin, { AdapterType, common, Message, segment } from 'node-karin'
import QRCode from 'qrcode'

import { Common, Config, Version } from '@/module/utils'

const cl = new Amagi({ bilibili: Config.cookies.bilibili })
export const bilibiliLogin = async (e: Message) => {
  const bot = karin.getBot(e.selfId) as AdapterType
  /** 申请二维码 */
  const qrcodeurl = await cl.getBilibiliData('申请二维码')
  const qrimg = await QRCode.toDataURL(qrcodeurl.data.url)
  const base64Data = qrimg ? qrimg.replace(/^data:image\/\w+;base64,/, '') : ''
  const buffer = Buffer.from(base64Data, 'base64')
  fs.writeFileSync(`${Version.karinPath}/temp/${Version.pluginName}/BilibiliLoginQrcode.png`, buffer)
  const qrcode_key = qrcodeurl.data.qrcode_key
  const msg_id = []
  const message1 = await e.reply('免责声明:\n您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。\n本Bot不会保存您的登录状态。\n我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~')
  const message2 = await e.reply([segment.image(qrimg.split(';')[1].replace('base64,', 'base64://')), segment.text('请在120秒内通过哔哩哔哩APP扫码进行登录')], { reply: true })
  msg_id.push(message1.messageId, message2.messageId)
  /** 判断二维码状态 */
  // let Execution86038 = -1
  let executed86090 = false
  let completedCase0 = false
  for (let i = 0; i < 33; i++) {
    const qrcodestatusdata = await cl.getBilibiliData('二维码状态', { qrcode_key })
    switch (qrcodestatusdata.data.data.code) {
      case 0: {
        // console.log(qrcodestatusdata.data.data.refresh_token)
        Config.modify('cookies', 'bilibili', Common.formatCookies(qrcodestatusdata.headers['set-cookie']))
        // Config.bilibilirefresh_token = qrcodestatusdata.data.data.refresh_token
        await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true })
        // 批量撤回
        msg_id.forEach(async (id) => {
          await bot.recallMsg(e.contact, id)
        })
        completedCase0 = true
        break
      }
      case 86038: {
        i === 17 && await e.reply('二维码已失效', { reply: true })
        msg_id.forEach(async (id) => {
          await bot.recallMsg(e.contact, id)
        })
        break
      }
      case 86090: {
        if (!executed86090) {
          const message3 = await e.reply('二维码已扫码，未确认', { reply: true })
          msg_id.push(message3.messageId)
          await bot.recallMsg(e.contact, message2.messageId)
          executed86090 = true
          // 删除 msg_id 数组中的 message2.message_id

          const index = msg_id.indexOf(message2.messageId)

          if (index > -1) {
            msg_id.splice(index, 1)
          }
        } else {
          executed86090 = true
        }
        break
      }
      default:
        break
    }
    if (completedCase0) break
    await common.sleep(5000)
  }
}
