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

/** 扫码后等手机确认（含可能出现的风控二次验证）的时限 */
const CONFIRM_TIMEOUT = 180_000

/** 等用户回「已完成验证」的时限（秒） */
const VERIFY_INPUT_TIMEOUT = 120

/** 登录凭证里需要确认下发的关键字段 */
const REQUIRED_COOKIES = ['web_session']

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
            logger.debug('[小红书登录] 撤回消息失败:', error)
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
  const rendered = await Render(e, 'xiaohongshu/qrcodeImg', {
    share_url: qrcode.content,
    avatarUrl: await resolveTriggerAvatarUrl(e)
  })
  const base64Data = rendered[0]?.file
  if (!base64Data) throw new Error('生成二维码图片失败')

  fs.writeFileSync(`${Common.tempDri.default}XiaohongshuLoginQrcode.png`, Buffer.from(base64Data.replace(/^base64:\/\//, ''), 'base64'))
  await tracker.send(rendered)
}

/**
 * 把风控验证页交给真人，等他确认过完。
 *
 * 小红书的 redcaptcha 没有可回填进 `status` 调用的票据 —— 验证通过是**服务端按
 * `verifyUuid` 解除**的，解除后用同一套 cookie 重放 `status` 才会放行（amagi 策略的
 * `answer()` 只合并调用方带回的新 cookie，随后那次 poll 重放）。所以这里等的是
 * 「用户说过了」，接着让引擎自己继续轮询。
 *
 * **未真机验证**：amagi 侧标注扫码闭环无法在自动化环境端到端实测，需要真人用小红书
 * App 扫一次（见其 `platforms/xiaohongshu/qrcodeLogin.ts` 模块头）。
 * @param e - 消息事件
 * @param url - 验证页地址（`challenge.imageUrl`）
 * @param tracker - 消息登记器
 * @throws {LoginAborted} 用户超时未确认
 */
const waitForVerify = async (e: Message, url: string, tracker: ReturnType<typeof createMessageTracker>): Promise<void> => {
  await tracker.send(
    `此次登录触发了风控验证\n请在浏览器里打开下面的地址完成验证：\n${url}\n完成后回复「已完成」` +
      (url === '' ? '\n（平台这次没有给出验证页地址，可稍后重试）' : '')
  )

  const context = await karin.ctx(e, { time: VERIFY_INPUT_TIMEOUT, reply: false, throwOnTimeout: false })
  if (!context) throw new LoginAborted('等待验证超时，登录已取消')
}

/**
 * 保存登录凭证并重载 Amagi 客户端
 *
 * 只落 cookie：amagi 的 x-s 签名会在服务端要求时用会话密钥（webSsk）补 x6/x7，而扫码
 * 产物里没有这一项 —— 真机上如果登录态请求被 406 拒绝，再考虑把 webSsk 一并持久化。
 * @param cookie - 完整登录 cookie
 */
const persistCookie = async (cookie: string): Promise<void> => {
  const present = new Set(cookie.split(';').map((pair) => pair.split('=')[0].trim()))
  const missing = REQUIRED_COOKIES.filter((name) => !present.has(name))
  if (missing.length > 0) logger.warn(`[小红书登录] 以下字段未在本次登录中下发：${missing.join(', ')}`)

  await Config.Modify('amagi', 'cookies.xiaohongshu', cookie)
  const reloaded = reloadAmagiConfig()
  logger.mark(`[小红书登录] 登录凭证已保存，Amagi Client ${reloaded ? '已重载' : '配置未变化'}`)
}

/** 把会话的失败原因翻成给用户看的话 */
const noticeOf = (error: AmagiError): string => {
  if (error.kind === 'risk') return `登录请求被小红书风控拦截：${error.message}\n请稍后再试`
  if (error.code === 'COOKIE_EXPIRED') return '二维码已失效，请重新发起登录'
  return `登录未完成：${error.message}`
}

/**
 * 小红书扫码登录。
 *
 * 协议与轮询编排都在 amagi 的 v7 登录会话里（`client.xiaohongshu.login.qrcode()`）：
 * 游客冷启动（a1 / webId / SSK）→ 取码 → 轮询 codeStatus → 换正式 web_session，
 * 以及风控二次验证的挑战中转都由引擎负责。这里只做三件与用户交互的事 ——
 * 渲染二维码、把验证页转给人、把凭证落库。
 * @param e - 消息事件
 * @returns 固定 true，交回命令框架
 */
export const xiaohongshuLogin = async (e: Message): Promise<boolean> => {
  const tracker = createMessageTracker(e)
  const controller = new AbortController()
  /** 自己中断时要发的话；有值说明不是引擎给出的失败 */
  let abortNotice: string | undefined
  let scanned = false
  let scanTimer: ReturnType<typeof setTimeout> | undefined

  try {
    const session = getAmagiClient().xiaohongshu.login.qrcode()

    const outcome = await session.watch({
      signal: controller.signal,
      timeoutMs: SCAN_TIMEOUT + CONFIRM_TIMEOUT,

      onQrcode: async (qrcode) => {
        logger.mark(`[小红书登录] 二维码已获取，有效期 ${qrcode.expiresInSec} 秒`)
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

      // challenge 回调是泛型的（返回值形状由 kind 决定），这条链只支持风控验证一路，
      // 断言收口到那一支；与 douyin 登录同一处理方式
      onChallenge: (async (challenge: LoginChallenge) => {
        scanned = true
        clearTimeout(scanTimer)
        if (challenge.kind !== 'captcha') throw new LoginAborted('这次登录要求短信验证，当前只支持风控验证，请稍后重试')
        await waitForVerify(e, challenge.imageUrl, tracker)
        // 小红书不校验这个值：验证由服务端按 verifyUuid 解除，answer() 只合并调用方带回的 cookie
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

    logger.warn(`[小红书登录] 会话结束于失败态: kind=${outcome.error.kind} code=${outcome.error.code}`)
    await e.reply(noticeOf(outcome.error), { reply: true })
  } catch (error) {
    await tracker.recallAll()
    if (error instanceof LoginAborted) {
      await e.reply(error.notice, { reply: true })
      return true
    }
    logger.error('[小红书登录] 登录流程出错:', error)
    await e.reply('登录过程出错，请查看控制台日志', { reply: true })
  } finally {
    clearTimeout(scanTimer)
  }

  return true
}