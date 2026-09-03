import fs from 'node:fs'

import type { AmagiError, LoginChallenge, Qrcode, SmsChallenge } from '@ikenxuan/amagi'
import { karin, logger, type Message } from 'node-karin'

import { Common, Render } from '@/module'
import { getAmagiClient, reloadAmagiConfig } from '@/module/utils/amagiClient'
import { resolveTriggerAvatarUrl } from '@/module/utils/bot'
import { Config } from '@/module/utils/Config'

/** 等待用户扫码的时限上限，与消息可撤回窗口（2 分钟）对齐 */
const SCAN_TIMEOUT = 120_000

/** 扫码后等待手机确认或完成二次验证的时限 */
const CONFIRM_TIMEOUT = 180_000

/** 等待用户回填短信验证码的时限（秒） */
const CODE_INPUT_TIMEOUT = 90

/** 短信验证码允许的重试次数 */
const CODE_MAX_ATTEMPTS = 3

/** 6 位数字验证码 */
const CODE_PATTERN = /^\d{6}$/

/** 登录凭证里需要确认下发的关键 cookie */
const REQUIRED_COOKIES = ['sessionid', 'sessionid_ss', 'sid_guard', 'uid_tt', 'uid_tt_ss', 'ttwid']

/**
 * 主动中断登录会话。
 *
 * v7 的 `watch` 只在**调用方回调自己抛出**时才 reject，所以从 `onChallenge`
 * 里退出流程只能靠抛 —— 回调的返回类型是 `{ code: string }`，没有「放弃」这个取值。
 * 用一个专门的异常带上要发给用户的话，外层认出它就正常收尾。
 */
class LoginAborted extends Error {
  constructor (readonly notice: string) {
    super(notice)
    this.name = 'LoginAborted'
  }
}

/**
 * 登录过程中发出的消息，全部登记在这里，结束时统一撤回，避免二维码留在群里
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
    async send (message: Parameters<Message['reply']>[0]) {
      const sent = await e.reply(message, { reply: true })
      if (sent.messageId) messageIds.push(sent.messageId)
      return sent
    },

    /** 撤回目前登记的全部消息 */
    async recallAll () {
      const pending = messageIds.splice(0, messageIds.length)
      await Promise.all(
        pending.map(async (id) => {
          try {
            await e.bot.recallMsg(e.contact, id)
          } catch (error) {
            logger.debug('[抖音登录] 撤回消息失败:', error)
          }
        })
      )
    }
  }
}

/**
 * 渲染并发送登录二维码，同时落一份到临时目录方便排查。
 * @param e - 消息事件
 * @param qrcode - 会话给出的二维码
 * @param tracker - 消息登记器
 */
const sendQrcode = async (e: Message, qrcode: Qrcode, tracker: ReturnType<typeof createMessageTracker>): Promise<void> => {
  const rendered = await Render(e, 'douyin/qrcodeImg', {
    share_url: qrcode.content,
    avatarUrl: await resolveTriggerAvatarUrl(e)
  })
  const base64Data = rendered[0]?.file
  if (!base64Data) throw new Error('生成二维码图片失败')

  fs.writeFileSync(`${Common.tempDri.default}DouyinLoginQrcode.png`, Buffer.from(base64Data.replace(/^base64:\/\//, ''), 'base64'))
  await tracker.send(rendered)
}

/**
 * 处理短信二次验证：发码 → 等用户回填 → 交回会话。
 *
 * 发码由 `challenge.sendCode()` 负责，验码由会话的 `answer` 负责（本函数只把
 * 6 位码取回来）—— `biz_trace_id` 与 `verify_way` 由 amagi 的会话自己串，
 * v6 时代要调用方在两次请求之间原样传回的隐式契约没有了。
 * @param e - 消息事件
 * @param challenge - 会话给出的短信 challenge
 * @param tracker - 消息登记器
 * @returns 用户回填的 6 位验证码
 * @throws {LoginAborted} 用户超时、格式错误用尽次数或发码失败
 */
const collectSmsCode = async (
  e: Message,
  challenge: SmsChallenge,
  tracker: ReturnType<typeof createMessageTracker>
): Promise<string> => {
  const sent = await challenge.sendCode()
  if (!sent.ok) {
    logger.warn(`[抖音登录] 短信验证码发送失败: ${sent.error.message}`)
    throw new LoginAborted(`短信验证码发送失败：${sent.error.message}`)
  }

  logger.mark(`[抖音登录] 二次验证可选方式: ${challenge.availableWays.join('、') || '(服务端未给出)'}`)
  const target = challenge.maskedMobile || '扫码设备绑定的手机号'
  await tracker.send(`此次登录需要二次验证\n6 位数验证码已发送至 ${target}\n请在 ${CODE_INPUT_TIMEOUT} 秒内直接回复该验证码`)

  for (let attempt = 1; attempt <= CODE_MAX_ATTEMPTS; attempt++) {
    const context = await karin.ctx(e, { time: CODE_INPUT_TIMEOUT, reply: false, throwOnTimeout: false })
    if (!context) throw new LoginAborted('等待验证码超时，登录已取消')

    const code = context.msg.trim()
    if (CODE_PATTERN.test(code)) return code

    if (attempt === CODE_MAX_ATTEMPTS) throw new LoginAborted('输入格式不正确，登录已取消')
    await tracker.send(`请只发送 6 位数字验证码（剩余 ${CODE_MAX_ATTEMPTS - attempt} 次机会）`)
  }

  throw new LoginAborted('验证码校验未通过，登录已取消')
}

/**
 * 保存登录凭证并重载 Amagi 客户端
 * @param cookie - 完整登录 cookie
 */
const persistCookie = async (cookie: string): Promise<void> => {
  const present = new Set(cookie.split(';').map((pair) => pair.split('=')[0].trim()))
  const missing = REQUIRED_COOKIES.filter((name) => !present.has(name))
  if (missing.length > 0) {
    logger.warn(`[抖音登录] 以下 cookie 未在本次登录中下发：${missing.join(', ')}`)
  }

  await Config.Modify('amagi', 'cookies.douyin', cookie)
  const reloaded = reloadAmagiConfig()
  logger.mark(`[抖音登录] 登录凭证已保存，Amagi Client ${reloaded ? '已重载' : '配置未变化'}`)
}

/** 把会话的失败原因翻成给用户看的话 */
const noticeOf = (error: AmagiError): string => {
  if (error.kind === 'risk') return `登录请求被抖音风控拦截：${error.message}\n请稍后再试`
  if (error.code === 'COOKIE_EXPIRED') return '二维码已失效，请重新发起登录'
  return `登录未完成：${error.message}`
}

/**
 * 抖音扫码登录。
 *
 * 协议与轮询编排都在 amagi 的 v7 登录会话里（`client.douyin.login.qrcode()`）：
 * 取码、轮询、退避、限频加倍、challenge 编排、`expire_time` 秒转毫秒全由引擎负责。
 * 这里只做三件与用户交互的事 —— 渲染二维码、收短信验证码、把凭证落库。
 * @param e - 消息事件
 * @returns 固定 true，交回命令框架
 */
export const douyinLogin = async (e: Message) => {
  const tracker = createMessageTracker(e)
  const controller = new AbortController()
  /** 自己中断时要发的话；有值说明不是引擎给出的失败 */
  let abortNotice: string | undefined
  let scanned = false
  let scanTimer: ReturnType<typeof setTimeout> | undefined

  try {
    const session = getAmagiClient().douyin.login.qrcode()

    const outcome = await session.watch({
      signal: controller.signal,
      // 引擎的超时只在 start 时算一次，没法在扫码后延长；这里给到「等扫码 + 等确认」
      // 的总量，未扫码的提前退出交给下面的 scanTimer，真正的失效仍以服务端的
      // expired 状态为准（二维码实际只有约 60 秒）
      timeoutMs: SCAN_TIMEOUT + CONFIRM_TIMEOUT,

      onQrcode: async (qrcode) => {
        logger.mark(`[抖音登录] 二维码已获取，有效期 ${qrcode.expiresInSec} 秒`)
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

      // 回调签名是泛型的（返回值形状由 challenge.kind 决定），这里只支持短信一路，
      // 断言收口到那一支；图形验证码走 LoginAborted 退出
      onChallenge: (async (challenge: LoginChallenge) => {
        scanned = true
        clearTimeout(scanTimer)
        if (challenge.kind !== 'sms') {
          throw new LoginAborted('账号触发了图形验证码，当前仅支持短信验证码')
        }
        return { code: await collectSmsCode(e, challenge, tracker) }
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

    logger.warn(`[抖音登录] 会话结束于失败态: kind=${outcome.error.kind} code=${outcome.error.code}`)
    await e.reply(noticeOf(outcome.error), { reply: true })
  } catch (error) {
    await tracker.recallAll()
    if (error instanceof LoginAborted) {
      await e.reply(error.notice, { reply: true })
      return true
    }
    logger.error('[抖音登录] 登录流程出错:', error)
    await e.reply('登录过程出错，请查看控制台日志', { reply: true })
  } finally {
    clearTimeout(scanTimer)
  }

  return true
}
