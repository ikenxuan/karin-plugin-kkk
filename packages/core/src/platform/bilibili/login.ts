import fs from 'node:fs'

import type { AmagiError, Qrcode } from '@ikenxuan/amagi'
import { logger, type Message } from 'node-karin'

import { Common, Render } from '@/module/utils'
import { getAmagiClient, reloadAmagiConfig } from '@/module/utils/amagiClient'
import { resolveTriggerAvatarUrl } from '@/module/utils/bot'
import { Config } from '@/module/utils/Config'

/**
 * 登录过程中发出的消息统一登记，结束时一起撤回，避免二维码留在群里
 * @param e - 消息事件
 * @returns 带 send / recall / recallAll 的登记器
 */
const createMessageTracker = (e: Message) => {
  const messageIds: string[] = []

  const recall = async (id: string) => {
    try {
      await e.bot.recallMsg(e.contact, id)
    } catch (error) {
      logger.debug('[B站登录] 撤回消息失败:', error)
    }
    const index = messageIds.indexOf(id)
    if (index > -1) messageIds.splice(index, 1)
  }

  return {
    /**
     * 发送并登记一条消息
     * @param message - 消息内容
     * @returns 这条消息的 id
     */
    async send (message: Parameters<Message['reply']>[0]) {
      const sent = await e.reply(message, { reply: true })
      if (sent.messageId) messageIds.push(sent.messageId)
      return sent.messageId
    },
    recall,
    /** 撤回目前登记的全部消息 */
    async recallAll () {
      await Promise.all(messageIds.splice(0, messageIds.length).map(recall))
    }
  }
}

/**
 * 渲染并发送登录二维码，同时落一份到临时目录方便排查。
 * @param e - 消息事件
 * @param qrcode - 会话给出的二维码
 * @param tracker - 消息登记器
 * @returns 二维码消息的 id，扫码后要单独撤回它
 */
const sendQrcode = async (e: Message, qrcode: Qrcode, tracker: ReturnType<typeof createMessageTracker>): Promise<string | undefined> => {
  const qrimg = await Render(e, 'bilibili/qrcodeImg', {
    share_url: qrcode.content,
    avatarUrl: await resolveTriggerAvatarUrl(e)
  })

  const base64Data = qrimg[0]?.file
  if (!base64Data) throw new Error('生成二维码图片失败')

  fs.writeFileSync(`${Common.tempDri.default}BilibiliLoginQrcode.png`, Buffer.from(base64Data.replace(/^base64:\/\//, ''), 'base64'))
  return tracker.send(qrimg)
}

/** 把会话的失败原因翻成给用户看的话 */
const noticeOf = (error: AmagiError): string => {
  if (error.kind === 'risk') return `登录请求被B站风控拦截：${error.message}`
  if (error.code === 'COOKIE_EXPIRED') return '二维码已失效'
  return `登录未完成：${error.message}`
}

/**
 * B站扫码登录。
 *
 * 轮询、退避、超时都在 amagi 的 v7 登录会话里（`client.bilibili.login.qrcode()`），
 * 这里只负责渲染二维码与落库。相比 v6 的手写轮询有两处行为变好：
 *
 * - **cookie 串是干净的。** 原先把响应的 `set-cookie` 数组直接 `join('; ')`，
 *   连 `Path=/` / `Domain=` / `Expires=` 这些属性一起当成了 cookie 值；
 *   v7 的策略用 `mergeSetCookie` 只取 name=value。
 * - **落库后会重载 Client。** 原先 `Config.Modify` 既没 await 也没重载，
 *   新 cookie 要等文件监听那一跳才生效。
 * @param e - 消息事件
 */
export const bilibiliLogin = async (e: Message) => {
  const tracker = createMessageTracker(e)
  let qrcodeMessageId: string | undefined
  let scanned = false

  try {
    const session = getAmagiClient().bilibili.login.qrcode()

    const outcome = await session.watch({
      onQrcode: async (qrcode) => {
        qrcodeMessageId = await sendQrcode(e, qrcode, tracker)
      },

      onScanned: async () => {
        if (scanned) return
        scanned = true
        await tracker.send('二维码已扫码，未确认')
        if (qrcodeMessageId) await tracker.recall(qrcodeMessageId)
      },

      onSuccess: async (credential) => {
        await Config.Modify('amagi', 'cookies.bilibili', credential.cookie)
        const reloaded = reloadAmagiConfig()
        logger.mark(`[B站登录] 登录凭证已保存，Amagi Client ${reloaded ? '已重载' : '配置未变化'}`)
      }
    })

    if (outcome.ok) {
      await e.reply('登录成功！用户登录凭证已保存至配置', { reply: true })
    } else {
      logger.warn(`[B站登录] 会话结束于失败态: kind=${outcome.error.kind} code=${outcome.error.code}`)
      await e.reply(noticeOf(outcome.error), { reply: true })
    }
  } catch (error) {
    logger.error('[B站登录] 登录流程出错:', error)
    await e.reply('登录过程中发生错误，请重试', { reply: true })
  } finally {
    await tracker.recallAll()
  }
}
