import fs from 'node:fs'

import type { AmagiError, Qrcode } from '@ikenxuan/amagi'
import { type Message } from 'node-karin'

import { Common, Render } from '@/module/utils'
import { getAmagiClient, reloadAmagiConfig } from '@/module/utils/amagiClient'
import { resolveTriggerAvatarUrl } from '@/module/utils/bot'
import { Config } from '@/module/utils/Config'
import { logger } from '@/module/utils/logger'

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
    async send(message: Parameters<Message['reply']>[0]) {
      const sent = await e.reply(message, { reply: true })
      if (sent.messageId) messageIds.push(sent.messageId)
      return sent.messageId
    },
    recall,
    /** 撤回目前登记的全部消息 */
    async recallAll() {
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
 * 从 B站扫码登录的响应体里取 refresh_token。
 *
 * 官方把续期令牌存在浏览器 `localStorage.ac_time_value`；扫码轮询接口返回的
 * `data.refresh_token` 就是同一份东西（见 amagi 的 `platforms/bilibili/cookieRefresh.ts`
 * 与 `endpoints/qrcodeStatus.ts` 的类型）。取不到就续不了期，只能重新扫码。
 * @param raw - 会话给出的 `credential.raw`（qrcode/status 的响应体）
 * @returns refresh_token；没有时 undefined
 */
const readRefreshToken = (raw: unknown): string | undefined => {
  const token = (raw as { data?: { refresh_token?: unknown } } | null | undefined)?.data?.refresh_token
  return typeof token === 'string' && token.trim() !== '' ? token : undefined
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
        // 续期令牌与 cookie 一起存：官方 Web 把它放在 localStorage.ac_time_value，
        // 我们落到配置里，好让「B站续期」命令不必重新扫码
        const refreshToken = readRefreshToken(credential.raw)
        if (refreshToken) await Config.Modify('amagi', 'cookies.bilibiliRefreshToken', refreshToken)
        else logger.warn('[B站登录] 本次登录未返回 refresh_token，后续无法续期，只能重新扫码')
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

/**
 * B站登录态续期（官方四步协议）。
 *
 * 与「重新扫码」是两回事：走的是平台正规续期通道，用旧 cookie + 旧 refresh_token 换一份
 * 新 cookie 与**新的** refresh_token。两者必须整组替换 —— 旧 token 在第四步已被服务端
 * 作废（amagi 侧的说明见其 `platforms/bilibili/cookieRefresh.ts`）。失败时不动配置，
 * 用户可重新扫码。
 * @param e - 消息事件
 * @returns 固定 true，交回命令框架
 */
export const bilibiliRefreshLogin = async (e: Message): Promise<boolean> => {
  const cookie = Config.amagi.cookies.bilibili
  const refreshToken = Config.amagi.cookies.bilibiliRefreshToken

  if (!cookie) {
    await e.reply('还没有配置 B站 cookie，请先执行 B站扫码登录', { reply: true })
    return true
  }
  if (!refreshToken) {
    await e.reply('没有可用的续期令牌（refresh_token）：请重新执行一次 B站扫码登录，新的登录会把令牌一并保存', { reply: true })
    return true
  }

  const result = await getAmagiClient().bilibili.refreshCredential({ cookie, refreshToken })

  if (!result.ok) {
    logger.warn(`[B站续期] 失败：kind=${result.error.kind} code=${result.error.code} ${result.error.message}`)
    await e.reply(`B站登录态续期失败：${result.error.message}`, { reply: true })
    return true
  }

  await Config.Modify('amagi', 'cookies.bilibili', result.credential.cookie)
  await Config.Modify('amagi', 'cookies.bilibiliRefreshToken', result.credential.refreshToken)
  const reloaded = reloadAmagiConfig()
  logger.mark(`[B站续期] 新 cookie 与 refresh_token 已保存，Amagi Client ${reloaded ? '已重载' : '配置未变化'}`)
  await e.reply('B站登录态已续期，新的 cookie 与续期令牌已保存', { reply: true })
  return true
}
