import { karin, logger, type Message } from 'node-karin'

import { Render } from '@/module'
import { reloadAmagiConfig } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'

import { DouyinLoginClient, DouyinLoginError, type JsonRecord, readNumber, readString } from './login/client'

const LOGIN_TIMEOUT = 120_000
const VERIFY_TIMEOUT = 60_000

function sleep(timeout: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

function normalizeInterval(value: unknown): number {
  const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : 3000
  const milliseconds = Number.isFinite(parsed) && parsed > 0 ? (parsed < 100 ? parsed * 1000 : parsed) : 3000
  return Math.min(Math.max(milliseconds, 1000), 10_000)
}

async function withTimeout<T>(promise: Promise<T>, timeout: number, message: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new DouyinLoginError(message)), timeout)
      })
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

function remoteErrorMessage(data: JsonRecord, fallback: string): string {
  return readString(data, 'description') || readString(data, 'message') || fallback
}

async function recallMessages(e: Message, messageIds: Set<string>): Promise<void> {
  await Promise.all(
    [...messageIds].map(async (messageId) => {
      try {
        await e.bot.recallMsg(e.contact, messageId)
      } catch (error) {
        logger.debug(`撤回抖音登录消息失败: ${String(error)}`)
      }
    })
  )
  messageIds.clear()
}

async function handleSmsVerification(
  e: Message,
  client: DouyinLoginClient,
  verifyData: JsonRecord,
  messageIds: Set<string>
): Promise<void> {
  const sent = await client.sendSmsCode(verifyData)
  const sendErrorCode = readNumber(sent, 'error_code') ?? 0
  if (sendErrorCode !== 0) {
    throw new DouyinLoginError(`发送短信验证码失败：${remoteErrorMessage(sent, `error_code=${sendErrorCode}`)}`)
  }

  const mobile = readString(sent, 'mobile') || '扫码账号绑定的手机号'
  const tip = await e.reply(`账号需要二次验证，6 位短信验证码已发送至 ${mobile}\n请在 60 秒内回复验证码`, {
    reply: true
  })
  messageIds.add(tip.messageId)

  let attempts = 0
  while (attempts < 2) {
    const context = await withTimeout(karin.ctx(e, { reply: true }), VERIFY_TIMEOUT, '验证码输入超时，登录失败')
    if (!context) throw new DouyinLoginError('未收到验证码，登录失败')

    const code = context.msg.trim()
    if (!/^\d{6}$/.test(code)) {
      const invalid = await e.reply('验证码必须是 6 位数字，请重新发送', { reply: true })
      messageIds.add(invalid.messageId)
      continue
    }

    attempts++
    const result = await client.validateSmsCode(verifyData, code)
    const errorCode = readNumber(result, 'error_code') ?? 0
    if (errorCode === 0) {
      logger.mark('抖音短信二次验证通过，继续等待登录确认')
      return
    }

    if (attempts < 2) {
      const retry = await e.reply(`验证码错误，请重新发送（剩余 1 次）`, { reply: true })
      messageIds.add(retry.messageId)
      continue
    }

    throw new DouyinLoginError(`验证码验证失败：${remoteErrorMessage(result, `error_code=${errorCode}`)}`)
  }
}

export const douyinLogin = async (e: Message) => {
  const messageIds = new Set<string>()
  const client = new DouyinLoginClient()

  try {
    logger.mark('正在通过抖音 Passport 接口获取登录二维码...')
    const qrCode = await client.createQrCode()
    const qrContent = readString(qrCode, 'qrcode_index_url') || readString(qrCode, 'qrcode') || qrCode.token
    const loginQrCode = await Render(e, 'douyin/qrcodeImg', { share_url: qrContent })
    const qrMessage = await e.reply(loginQrCode, { reply: true })
    messageIds.add(qrMessage.messageId)

    const deadline = Date.now() + LOGIN_TIMEOUT
    let scanned = false
    let verified = false

    logger.mark('抖音登录二维码已发送，开始轮询扫码状态')
    while (Date.now() < deadline) {
      const data = await client.pollQrCode(qrCode.token)
      const status = readString(data, 'status')
      logger.debug(`抖音扫码登录状态: ${status || 'unknown'}`)

      if (status === 'confirmed') {
        const cookie = client.getCookie()
        if (!client.hasLoginCookie()) throw new DouyinLoginError('登录成功响应中缺少 sid_guard/sessionid')

        await Config.Modify('amagi', 'cookies.douyin', cookie)
        const reloaded = reloadAmagiConfig()
        logger.mark(`抖音登录凭证已保存，Amagi Client ${reloaded ? '已重载' : '配置未变化'}`)
        await e.reply('登录成功！用户登录凭证已保存至配置', { reply: true })
        return true
      }

      if (status === 'scanned' && !scanned) {
        scanned = true
        await recallMessages(e, messageIds)
        const notice = await e.reply('二维码已扫描，请在手机抖音中确认登录', { reply: true })
        messageIds.add(notice.messageId)
      }

      if (status === 'verify') {
        if (!verified) {
          await recallMessages(e, messageIds)
          await handleSmsVerification(e, client, data, messageIds)
          verified = true
        }
        await sleep(3000)
        continue
      }

      if (status === 'expired') throw new DouyinLoginError('二维码已过期，请重新执行登录命令')
      if (status === 'risk_limited') throw new DouyinLoginError('抖音触发风控或限流，请稍后重试')

      const errorCode = readNumber(data, 'error_code') ?? 0
      if (errorCode && errorCode !== 2046) {
        throw new DouyinLoginError(`抖音登录失败：${remoteErrorMessage(data, `error_code=${errorCode}`)}`)
      }

      await sleep(normalizeInterval(data.interval))
    }

    throw new DouyinLoginError('登录超时，二维码已失效')
  } catch (error) {
    logger.error('抖音登录流程失败:', error)
    const message = error instanceof DouyinLoginError ? error.message : '登录过程出错，请查看控制台日志'
    await e.reply(message, { reply: true })
    return true
  } finally {
    await recallMessages(e, messageIds)
  }
}
