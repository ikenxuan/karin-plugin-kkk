import fs from 'node:fs'

import {
  checkPassportQrcode,
  isSmsCodeVerifyWay,
  requestPassportQrcode,
  sendPassportVerifyCode,
  validatePassportVerifyCode,
  type DouyinPassportVerifyContext
} from '@ikenxuan/amagi'
import { karin, logger, type Message } from 'node-karin'

import { Common, Render } from '@/module'
import { reloadAmagiConfig } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'

/** 等待用户扫码的时限，与消息可撤回窗口（2 分钟）对齐 */
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** 复用 amagi 配置里的代理与超时，让登录请求与其它抖音请求走同一条出口 */
const requestConfig = () => {
  const amagi = Config.amagi
  return {
    timeout: amagi.timeout,
    proxy: amagi.proxy?.switch ? amagi.proxy : (false as const)
  }
}

/**
 * 登录过程中发出的消息，全部登记在这里，结束时统一撤回，避免二维码留在群里
 * @param e 消息事件
 */
const createMessageTracker = (e: Message) => {
  const messageIds: string[] = []

  return {
    /**
     * 发送并登记一条消息
     * @param message 消息内容
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
            logger.debug('[抖音登录] 撤回消息失败:', error)
          }
        })
      )
    }
  }
}

/** 登录会话的可变状态：cookie 会被每一步刷新，必须逐步传递下去 */
interface LoginSession {
  /** 当前会话 cookie */
  cookie: string
  /** 二维码令牌 */
  token: string
}

/**
 * 处理账号二次验证：发短信验证码 → 等用户回填 → 提交
 * @param e 消息事件
 * @param session 登录会话，验证过程中会刷新其中的 cookie
 * @param verify 轮询下发的验证上下文
 * @param tracker 消息登记器
 * @returns 验证是否通过
 */
const handleSecondVerify = async (
  e: Message,
  session: LoginSession,
  verify: DouyinPassportVerifyContext,
  tracker: ReturnType<typeof createMessageTracker>
): Promise<boolean> => {
  if (!verify.encryptUid) {
    await tracker.send('账号触发了二次验证，但服务端未下发验证上下文，请稍后重试')
    return false
  }

  // 服务端给的验证方式因账号而异：普通账号是 mobile_sms_verify，
  // 被判定需要辅助验证的账号是 assist_mobile_sms_verify，两者都是下行短信收码
  const smsWay = verify.verifyWays.find((way) => isSmsCodeVerifyWay(way.verifyWay))
  if (verify.verifyWays.length > 0 && !smsWay) {
    const ways = verify.verifyWays.map((way) => way.verifyWay).join('、')
    logger.warn(`[抖音登录] 服务端给出的验证方式均不支持: ${ways}`)
    await tracker.send(`账号触发了二次验证，但当前仅支持短信验证码，服务端给出的方式为：${ways}`)
    return false
  }

  const sent = await sendPassportVerifyCode({ verify, verify_way: smsWay?.verifyWay, typeMode: 'strict' }, session.cookie, requestConfig())
  if (!sent.success) {
    await tracker.send(`短信验证码发送失败：${sent.message}`)
    return false
  }
  session.cookie = sent.data.cookie

  if (!sent.data.ok) {
    await tracker.send(`短信验证码发送失败：${sent.data.message}`)
    return false
  }

  const bizTraceId = sent.data.biz_trace_id
  const verifyWay = sent.data.verify_way
  logger.mark(`[抖音登录] 二次验证方式: ${verifyWay}`)
  const target = sent.data.mobile || smsWay?.mobile || '扫码设备绑定的手机号'
  await tracker.send(`此次登录需要二次验证\n6 位数验证码已发送至 ${target}\n请在 ${CODE_INPUT_TIMEOUT} 秒内直接回复该验证码`)

  for (let attempt = 1; attempt <= CODE_MAX_ATTEMPTS; attempt++) {
    const context = await karin.ctx(e, { time: CODE_INPUT_TIMEOUT, reply: false, throwOnTimeout: false })

    if (!context) {
      await tracker.send('等待验证码超时，登录已取消')
      return false
    }

    const code = context.msg.trim()
    if (!CODE_PATTERN.test(code)) {
      if (attempt === CODE_MAX_ATTEMPTS) {
        await tracker.send('输入格式不正确，登录已取消')
        return false
      }
      await tracker.send(`请只发送 6 位数字验证码（剩余 ${CODE_MAX_ATTEMPTS - attempt} 次机会）`)
      continue
    }

    const checked = await validatePassportVerifyCode(
      { verify, code, biz_trace_id: bizTraceId, verify_way: verifyWay, typeMode: 'strict' },
      session.cookie,
      requestConfig()
    )
    if (!checked.success) {
      await tracker.send(`验证失败：${checked.message}`)
      return false
    }
    session.cookie = checked.data.cookie

    if (checked.data.ok) {
      logger.mark('[抖音登录] 二次验证通过')
      await tracker.send('验证通过，正在完成登录…')
      return true
    }

    if (!checked.data.wrongCode || attempt === CODE_MAX_ATTEMPTS) {
      await tracker.send(`验证失败：${checked.data.message}`)
      return false
    }

    await tracker.send(`验证码错误，请重新发送（剩余 ${CODE_MAX_ATTEMPTS - attempt} 次机会）`)
  }

  return false
}

/**
 * 保存登录凭证并重载 Amagi 客户端
 * @param cookie 完整登录 cookie
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

/**
 * 抖音扫码登录
 *
 * 协议层在 `@ikenxuan/amagi` 的 passport 接口里，这里只负责与用户的交互和状态流转，
 * 全程不启动浏览器。
 * @param e 消息事件
 */
export const douyinLogin = async (e: Message) => {
  const tracker = createMessageTracker(e)

  try {
    const qrcode = await requestPassportQrcode({ typeMode: 'strict' }, undefined, requestConfig())
    if (!qrcode.success) {
      await e.reply(`获取二维码失败：${qrcode.message}`, { reply: true })
      return true
    }

    const session: LoginSession = { cookie: qrcode.data.cookie, token: qrcode.data.token }
    logger.mark(`[抖音登录] 二维码已获取，有效期 ${Math.round(qrcode.data.expire_time / 1000)} 秒`)

    const rendered = await Render(e, 'douyin/qrcodeImg', { share_url: qrcode.data.content })
    const base64Data = rendered[0]?.file
    if (!base64Data) throw new Error('生成二维码图片失败')

    fs.writeFileSync(`${Common.tempDri.default}DouyinLoginQrcode.png`, Buffer.from(base64Data.replace(/^base64:\/\//, ''), 'base64'))

    await tracker.send(rendered)

    let deadline = Date.now() + SCAN_TIMEOUT
    let scanned = false

    while (Date.now() < deadline) {
      const polled = await checkPassportQrcode({ token: session.token, typeMode: 'strict' }, session.cookie, requestConfig())
      if (!polled.success) {
        await tracker.recallAll()
        await e.reply(`轮询二维码状态失败：${polled.message}`, { reply: true })
        return true
      }

      const result = polled.data
      session.cookie = result.cookie

      switch (result.status) {
        case 'new':
          break

        case 'scanned':
          if (!scanned) {
            scanned = true
            deadline = Date.now() + CONFIRM_TIMEOUT
            await tracker.recallAll()
            await tracker.send('二维码已扫描，请在手机上确认登录')
          }
          break

        case 'verify': {
          const passed = await handleSecondVerify(e, session, result.verify, tracker)
          if (!passed) {
            await tracker.recallAll()
            return true
          }
          deadline = Date.now() + CONFIRM_TIMEOUT
          break
        }

        case 'confirmed':
          if (!result.logged_in) {
            await tracker.recallAll()
            await e.reply('已确认登录，但服务端未下发登录凭证，请稍后重试', { reply: true })
            return true
          }
          await persistCookie(result.cookie)
          await tracker.recallAll()
          await e.reply('登录成功！用户登录凭证已保存至配置', { reply: true })
          return true

        case 'expired':
          await tracker.recallAll()
          await e.reply('二维码已失效，请重新发起登录', { reply: true })
          return true

        case 'busy':
          // 服务端限频，parser 已经把间隔翻倍，这里只记录不打扰用户
          logger.debug(`[抖音登录] 轮询被限频，${result.interval} ms 后重试: ${result.message}`)
          break

        case 'risk':
          logger.warn(`[抖音登录] 命中风控: ${result.message}`)
          await tracker.recallAll()
          await e.reply(`登录请求被抖音风控拦截：${result.message}\n请稍后再试`, { reply: true })
          return true

        case 'unknown':
          logger.warn(`[抖音登录] 未知的轮询状态: ${result.message}`)
          break
      }

      await sleep(result.interval)
    }

    await tracker.recallAll()
    await e.reply(scanned ? '等待手机确认超时，登录已取消' : '登录超时！二维码已失效！', { reply: true })
  } catch (error) {
    logger.error('[抖音登录] 登录流程出错:', error)
    await tracker.recallAll()
    await e.reply('登录过程出错，请查看控制台日志', { reply: true })
  }

  return true
}
