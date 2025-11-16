import fs from 'node:fs'

import { BiliCheckQrcode, Result } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { common } from 'node-karin'

import { Common, Render } from '@/module/utils'
import { getBilibiliData } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'

/** B站登录 */
export const bilibiliLogin = async (e: Message) => {
  /** 申请二维码 */
  const qrcodeurl = await getBilibiliData('申请二维码', { typeMode: 'strict' })
  const qrimg = await Render('bilibili/qrcodeImg', { share_url: qrcodeurl.data.data.url })

  const base64Data = qrimg[0]?.file
  if (!base64Data) {
    throw new Error('生成二维码图片失败')
  }

  const cleanBase64 = base64Data.replace(/^base64:\/\//, '')
  const buffer = Buffer.from(cleanBase64, 'base64')
  fs.writeFileSync(`${Common.tempDri.default}BilibiliLoginQrcode.png`, buffer)

  const qrcode_key = qrcodeurl.data.data.qrcode_key
  const messageIds: string[] = []

  const qrcodeMsg = await e.reply(qrimg, { reply: true })
  messageIds.push(qrcodeMsg.messageId)

  /**
   * 批量撤回消息
   */
  const recallMessages = async () => {
    await Promise.all(messageIds.map(async (id) => {
      try {
        await e.bot.recallMsg(e.contact, id)
      } catch { }
    }))
  }

  const handleLoginSuccess = async (responseData: Result<BiliCheckQrcode>) => {
    const setCookieHeader = responseData.data.data.headers['set-cookie']

    let cookieString: string
    if (Array.isArray(setCookieHeader)) {
      cookieString = setCookieHeader.join('; ')
    } else {
      cookieString = setCookieHeader || ''
    }

    Config.Modify('cookies', 'bilibili', cookieString)
    await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true })
    await recallMessages()
  }

  /**
   * 处理二维码已扫描但未确认
   */
  const handleQrScanned = async () => {
    const scannedMsg = await e.reply('二维码已扫码，未确认', { reply: true })
    messageIds.push(scannedMsg.messageId)

    // 撤回原二维码消息
    try {
      await e.bot.recallMsg(e.contact, qrcodeMsg.messageId)
    } catch { }

    // 从消息ID列表中移除已撤回的消息
    const index = messageIds.indexOf(qrcodeMsg.messageId)
    if (index > -1) {
      messageIds.splice(index, 1)
    }
  }

  /**
   * 处理二维码失效
   */
  const handleQrExpired = async () => {
    await e.reply('二维码已失效', { reply: true })
    await recallMessages()
  }

  /** 轮询二维码状态 */
  let hasScanned = false

  while (true) {
    try {
      const qrcodeStatusData = await getBilibiliData('二维码状态', { qrcode_key, typeMode: 'strict' })
      const statusCode = qrcodeStatusData.data.data.data.code

      switch (statusCode) {
        case 0: // 登录成功
          await handleLoginSuccess(qrcodeStatusData)
          return

        case 86038: // 二维码失效
          await handleQrExpired()
          return

        case 86090: // 二维码已扫描，未确认
          if (!hasScanned) {
            await handleQrScanned()
            hasScanned = true
          }
          break

        case 86101: // 未扫描
        default:
          // 继续轮询
          break
      }

      await common.sleep(3000)
    } catch (error) {
      console.error('轮询二维码状态时发生错误:', error)
      await e.reply('登录过程中发生错误，请重试', { reply: true })
      await recallMessages()
      return
    }
  }
}
