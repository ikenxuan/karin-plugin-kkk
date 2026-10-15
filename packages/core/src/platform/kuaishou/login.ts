import fs from 'node:fs'

import type { AmagiError, LoginChallenge, Qrcode } from '@ikenxuan/amagi'
import { karin, type Message } from 'node-karin'

import { Common, Render } from '@/module'
import { getAmagiClient, reloadAmagiConfig } from '@/module/utils/amagiClient'
import { resolveTriggerAvatarUrl } from '@/module/utils/bot'
import { Config } from '@/module/utils/Config'
import { logger } from '@/module/utils/logger'

/**
 * 等扫码的时限：撤回窗口是 120s，这里留 10s 余量给网络与程序时延 ——
 * 顶格写 120s 的话，超时那一刻二维码已经撤不掉了。
 */
const SCAN_TIMEOUT = 110_000

/** 扫码后等手机确认（含可能出现的二次验证）的时限 */
const CONFIRM_TIMEOUT = 180_000

/** 等用户回「已完成验证」的时限（秒） */
const VERIFY_INPUT_TIMEOUT = 120

/** 登录凭证里需要确认下发的关键字段 */
const REQUIRED_COOKIES = ['passToken', 'userId']

/**
 * 主动中断登录会话。
 *
 * v7 的 `watch` 只在调用方回调自己抛出时才 reject，所以从 `onChallenge` 里退出流程
 * 只能靠抛 —— 回调的返回类型是 `{ ticket }`，没有「放弃」这个取值。用一个专门的异常
 * 带上要发给用户的话，外层认出它就正常收尾。
 */
class LoginAborted extends Error {
  constructor(readonly notice: string) {
    super(notice)
    this.name = 'LoginAborted'
  }
}

/**
 * 登录过程中发出的消息统一登记，结束时一起撤回，避免二维码留在群里
 * @param e - 消息事件
 * @returns 带 send / recallAll 的登记器
 */
const createMessageTracker = (e: Message) => {
  const messageIds: string[] = []

  return {
    /**
     * 发送并登记一条消息
     * @param message - 消息内容
     * @returns 发送结果
     */
    async send(message: Parameters<Message['reply']>[0]) {
      const sent = await e.reply(message, { reply: true })
      if (sent.messageId) messageIds.push(sent.messageId)
      return sent
    },

    /** 撤回目前登记的全部消息 */
    async recallAll() {
      const pending = messageIds.splice(0, messageIds.length)
      await Promise.all(
        pending.map(async (id) => {
          try {
            await e.bot.recallMsg(e.contact, id)
          } catch (error) {
            logger.debug('[快手登录] 撤回消息失败:', error)
          }
        })
      )
    }
  }
}

/**
 * 渲染并发送登录二维码，同时落一份到临时目录方便排查
 * @param e - 消息事件
 * @param qrcode - 会话给出的二维码
 * @param tracker - 消息登记器
 */
const sendQrcode = async (e: Message, qrcode: Qrcode, tracker: ReturnType<typeof createMessageTracker>): Promise<void> => {
  const rendered = await Render(e, 'kuaishou/qrcodeImg', {
    share_url: qrcode.content,
    avatarUrl: await resolveTriggerAvatarUrl(e)
  })
  const base64Data = rendered[0]?.file
  if (!base64Data) throw new Error('生成二维码图片失败')

  fs.writeFileSync(`${Common.tempDri.default}KuaishouLoginQrcode.png`, Buffer.from(base64Data.replace(/^base64:\/\//, ''), 'base64'))
  await tracker.send(rendered)
}

/**
 * 把验证页交给真人，等他确认过完。
 *
 * amagi 的快手登录策略**只把验证页原样吐出来**（身份校验页 / 滑块），票据由服务端按
 * 会话解除 —— 没有可回填进下一次请求的字段。所以这里等的是「用户说过了」，随后让引擎
 * 自己接着轮询。
 *
 * **未真机验证**：amagi 侧标注二次验证之后的响应结构只有契约、没有真机扫码记录
 * （见其 `platforms/kuaishou/qrcodeLogin.ts` 模块头）。真机扫一次即可校正这一段。
 * @param e - 消息事件
 * @param url - 验证页地址（`challenge.imageUrl`）
 * @param tracker - 消息登记器
 * @throws {LoginAborted} 用户超时未确认
 */
const waitForVerify = async (e: Message, url: string, tracker: ReturnType<typeof createMessageTracker>): Promise<void> => {
  await tracker.send(
    `此次登录需要人机验证\n请在浏览器里打开下面的地址完成验证：\n${url}\n完成后回复「已完成」` +
      (url === '' ? '\n（平台这次没有给出验证页地址，可改用手机快手重新扫码）' : '')
  )

  const context = await karin.ctx(e, { time: VERIFY_INPUT_TIMEOUT, reply: false, throwOnTimeout: false })
  if (!context) throw new LoginAborted('等待验证超时，登录已取消')
}

/**
 * 保存登录凭证并重载 Amagi 客户端
 * @param cookie - 完整登录 cookie
 */
const persistCookie = async (cookie: string): Promise<void> => {
  const present = new Set(cookie.split(';').map((pair) => pair.split('=')[0].trim()))
  const missing = REQUIRED_COOKIES.filter((name) => !present.has(name))
  if (missing.length > 0) logger.warn(`[快手登录] 以下字段未在本次登录中下发：${missing.join(', ')}`)

  await Config.Modify('amagi', 'cookies.kuaishou', cookie)
  const reloaded = reloadAmagiConfig()
  logger.mark(`[快手登录] 登录凭证已保存，Amagi Client ${reloaded ? '已重载' : '配置未变化'}`)
}

/** 把会话的失败原因翻成给用户看的话 */
const noticeOf = (error: AmagiError): string => {
  if (error.kind === 'risk') return `登录请求被快手风控拦截：${error.message}\n请稍后再试`
  if (error.code === 'COOKIE_EXPIRED') return '二维码已失效，请重新发起登录'
  return `登录未完成：${error.message}`
}

/**
 * 快手扫码登录。
 *
 * 协议与轮询编排都在 amagi 的 v7 登录会话里（`client.kuaishou.login.qrcode()`）：
 * 本地生成 did、取码、两段 long-poll（先等扫码、再等手机确认）、退避、二次验证
 * 全部由引擎负责。这里只做三件与用户交互的事 —— 渲染二维码、把验证页转给人、
 * 把凭证落库。
 * @param e - 消息事件
 * @returns 固定 true，交回命令框架
 */
export const kuaishouLogin = async (e: Message): Promise<boolean> => {
  const tracker = createMessageTracker(e)
  const controller = new AbortController()
  /** 自己中断时要发的话；有值说明不是引擎给出的失败 */
  let abortNotice: string | undefined
  let scanned = false
  let scanTimer: ReturnType<typeof setTimeout> | undefined

  try {
    const session = getAmagiClient().kuaishou.login.qrcode()

    const outcome = await session.watch({
      signal: controller.signal,
      // 引擎的超时只在 start 时算一次，这里给「等扫码 + 等确认」的总量；
      // 未扫码的提前退出交给下面的 scanTimer
      timeoutMs: SCAN_TIMEOUT + CONFIRM_TIMEOUT,

      onQrcode: async (qrcode) => {
        logger.mark(`[快手登录] 二维码已获取，有效期 ${qrcode.expiresInSec} 秒`)
        await sendQrcode(e, qrcode, tracker)
        scanTimer = setTimeout(() => {
          if (scanned) return
          abortNotice = '登录超时！二维码已失效！'
          controller.abort()
        }, SCAN_TIMEOUT)
      },

      onScanned: async () => {
        if (scanned) return
        scanned = true
        clearTimeout(scanTimer)
        await tracker.recallAll()
        await tracker.send('二维码已扫描，请在手机上确认登录')
      },

      // challenge 回调是泛型的（返回值形状由 kind 决定），这条链只支持「人机验证」一路，
      // 断言收口到那一支；与 douyin 登录同一处理方式
      onChallenge: (async (challenge: LoginChallenge) => {
        scanned = true
        clearTimeout(scanTimer)
        if (challenge.kind !== 'captcha') throw new LoginAborted('这次登录要求短信验证，当前只支持人机验证，请改用手机快手重新扫码')
        await waitForVerify(e, challenge.imageUrl, tracker)
        // 快手不校验这个值：它只把验证前的 cookie 与调用方经 requestConfig 带回的新 cookie
        // 合并（见 amagi 策略的 answer()），票据由服务端按会话解除
        return { ticket: '' }
      }) as never,

      onSuccess: async (credential) => {
        await persistCookie(credential.cookie)
      }
    })

    await tracker.recallAll()

    if (outcome.ok) {
      await e.reply('登录成功！用户登录凭证已保存至配置', { reply: true })
      return true
    }

    if (abortNotice) {
      await e.reply(abortNotice, { reply: true })
      return true
    }

    logger.warn(`[快手登录] 会话结束于失败态: kind=${outcome.error.kind} code=${outcome.error.code}`)
    await e.reply(noticeOf(outcome.error), { reply: true })
  } catch (error) {
    await tracker.recallAll()
    if (error instanceof LoginAborted) {
      await e.reply(error.notice, { reply: true })
      return true
    }
    logger.error('[快手登录] 登录流程出错:', error)
    await e.reply('登录过程出错，请查看控制台日志', { reply: true })
  } finally {
    clearTimeout(scanTimer)
  }

  return true
}