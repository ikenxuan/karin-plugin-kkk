import { randomBytes } from 'node:crypto'
import os from 'node:os'

import type { Message } from 'node-karin'

import type { RiskChallengeWithVerifyData } from './amagiClient'
import { Config } from './Config'

/**
 * 一次性人机验证会话。
 *
 * 撞滑块时 core 生成一个随机 token 把挑战连同触发事件存进内存，
 * 验证页 URL 里带这个 token；用户完成验证后由回填端点
 * （`/kkk/captcha/douyin/<token>/done`）一次性取走并消费。
 *
 * 只存必要信息：挑战（渲染验证页）、触发前的 cookie（回填合并底）、
 * 触发事件（验证完成后主动回话）。`event` 是活跃消息对象，验证完成
 * 时调用方自己处理发送失败，这里不负责投递。
 */
export interface CaptchaSession {
  /** 一次性 token，打进验证页 URL */
  token: string
  /** 风控挑战（含 jsSdkUrl / verifyData） */
  challenge: RiskChallengeWithVerifyData
  /** 触发挑战前的完整 cookie 串，回填时作为合并底 */
  existingCookie: string
  /** 触发验证的消息事件，验证完成后用于回话 */
  event: Message
  /** 创建时间戳（毫秒） */
  createdAt: number
  /** 过期时间戳（毫秒），过期的会话被 {@link sweep} 惰性清理 */
  expiresAt: number
}

/** 验证会话留存时长：给用户留足打开链接、完成滑块的时间 */
const SESSION_TTL_MS = 15 * 60 * 1000

const sessions = new Map<string, CaptchaSession>()

/** 惰性清理过期会话，避免 Map 无限增长 */
const sweep = () => {
  const now = Date.now()
  for (const [token, session] of sessions) {
    if (session.expiresAt < now) sessions.delete(token)
  }
}

/**
 * 创建一次验证会话并返回一次性 token。
 * @param challenge - 风控挑战（渲染验证页用）
 * @param existingCookie - 触发前的 cookie 串，验证完成回填时作为合并底
 * @param event - 触发验证的消息事件，完成后回话用
 * @returns 一次性 token
 */
export const createCaptchaSession = (challenge: RiskChallengeWithVerifyData, existingCookie: string, event: Message): string => {
  sweep()
  const now = Date.now()
  const token = randomBytes(16).toString('hex')
  sessions.set(token, {
    token,
    challenge,
    existingCookie,
    event,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS
  })
  return token
}

/**
 * 取走并消费一次验证会话（一次性：取走即删除，防止重放）。
 * @param token - 验证页 URL 里的 token
 * @returns 会话；不存在、已过期或已被消费返回 undefined
 */
export const takeCaptchaSession = (token: string): CaptchaSession | undefined => {
  const session = sessions.get(token)
  if (!session) return undefined
  sessions.delete(token)
  if (session.expiresAt < Date.now()) return undefined
  return session
}

/** 验证页地址解析用的本机局域网 IP。优先常见局域网网段 */
const getLocalIP = (): string => {
  const interfaces = os.networkInterfaces()
  const candidates: string[] = []
  for (const name of Object.keys(interfaces)) {
    const netInterface = interfaces[name]
    if (!netInterface) continue
    for (const net of netInterface) {
      if (net.family === 'IPv4' && !net.internal) candidates.push(net.address)
    }
  }
  const preferredIP = candidates.find((ip) => {
    if (ip.startsWith('192.168.') || ip.startsWith('10.')) return true
    if (ip.startsWith('172.')) {
      const second = parseInt(ip.split('.')[1], 10)
      if (second >= 16 && second <= 31) return true
    }
    return false
  })
  return preferredIP || candidates[0] || '127.0.0.1'
}

/** 通过公共 API 探测公网 IP。探测不到返回 null */
const getPublicIP = async (): Promise<string | null> => {
  const apis = ['4.ipw.cn', 'https://api.ipify.org', 'https://icanhazip.com', 'https://ifconfig.me/ip', 'https://api.ip.sb/ip']
  for (const api of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)
      const response = await fetch(api, { signal: controller.signal })
      clearTimeout(timeout)
      if (response.ok) {
        const ip = (await response.text()).trim()
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return ip
      }
    } catch {
      // 继续尝试下一个
    }
  }
  return null
}

/**
 * 解析验证页的浏览器可达地址。
 *
 * 优先复用 `Config.app.qrLoginExternalAddr`（管理员配过外部地址时保持一致）；
 * 否则自动探测公网 IP，失败回退局域网 IP。端口取 Karin 的 `HTTP_PORT`。
 * @returns 形如 `http://<host>:<port>` 的浏览器可达根地址
 */
export const resolveBrowserBaseUrl = async (): Promise<string> => {
  const port = process.env.HTTP_PORT || '7777'
  const external = Config.app.qrLoginExternalAddr?.trim()
  if (external) return `http://${external}:${port}`

  const publicIP = await getPublicIP()
  const host = publicIP || getLocalIP()
  return `http://${host}:${port}`
}