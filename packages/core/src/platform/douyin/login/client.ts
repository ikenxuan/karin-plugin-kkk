/**
 * passport 登录的 HTTP 客户端
 *
 * 一个 `DouyinPassportClient` 实例代表一次登录会话：持有自己的 CookieJar、msToken 与
 * CSRF / verify-portrait 等会话级请求头，全部按会话动态生成，不依赖任何抓包固化值。
 */
import { logger } from 'node-karin'

import { aBogus } from './aBogus'
import { CookieJar } from './cookieJar'
import {
  LOGIN_HOST,
  makeAidSign,
  makeCommonParams,
  makeLiteParams,
  makeSignAndQs,
  randomHex,
  serializeQuery,
  uuid,
  WEB_HOST
} from './passport'

/** 与签名里的浏览器环境保持一致的 UA */
export const LOGIN_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'

/** 单次请求默认超时 */
const DEFAULT_TIMEOUT = 15_000

/** SSO 跳转最多跟随的次数 */
const MAX_REDIRECT_HOPS = 5

/** 浏览器客户端提示头，服务端会与 UA 交叉校验 */
const CLIENT_HINTS: Record<string, string> = {
  'sec-ch-ua': '"Not_A Brand";v="99", "Chromium";v="142"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"'
}

export interface PassportResponse<T = PassportPayload> {
  /** HTTP 状态码 */
  status: number
  /** 响应头 */
  headers: Headers
  /** 原始响应体 */
  raw: string
  /** 解析后的 JSON，解析失败时为空对象 */
  body: T
}

/** passport 接口的通用响应形状 */
export interface PassportPayload {
  message?: string
  error_code?: number
  description?: string
  data?: Record<string, unknown>
}

export interface PassportRequestOptions {
  /** 请求方法，默认 GET */
  method?: 'GET' | 'POST'
  /** 业务参数：GET 进 query，POST 进 body 并参与 sign 计算 */
  params?: Record<string, string | number>
  /** 超时毫秒数 */
  timeout?: number
}

export interface LiteRequestOptions {
  /** 业务参数，全部进 body */
  params: Record<string, string>
  /** 业务追踪 ID，同一次验证流程内应保持一致 */
  bizTraceId: string
  /** 超时毫秒数 */
  timeout?: number
}

/** 取出响应里的全部 Set-Cookie，兼容不支持 getSetCookie 的运行时 */
const readSetCookie = (headers: Headers): string[] => {
  if (typeof headers.getSetCookie === 'function') return headers.getSetCookie()
  const single = headers.get('set-cookie')
  return single ? [single] : []
}

/** 安全解析 JSON，失败返回空对象 */
const parseJson = <T>(text: string): T => {
  try {
    return JSON.parse(text) as T
  } catch {
    return {} as T
  }
}

export class DouyinPassportClient {
  /** 会话 cookie */
  readonly cookies = new CookieJar()

  /** 响应头下发的 msToken，仅存在于内存 */
  private msToken = ''

  /** 会话级 verify portrait，格式与浏览器 SDK 一致 */
  private readonly verifyPortrait = `${uuid()}.login`

  /** 环境指纹是否已初始化 */
  private initialized = false

  /** CSRF token：优先用服务端下发的，缺失时本地生成并同步写进 cookie（双提交校验） */
  private get csrfToken(): string {
    const fromCookie = this.cookies.get('passport_csrf_token')
    if (fromCookie) return fromCookie

    const generated = randomHex(32)
    this.cookies.set('passport_csrf_token', generated)
    this.cookies.set('passport_csrf_token_default', generated)
    return generated
  }

  /**
   * 初始化登录环境指纹
   *
   * 依次请求抖音首页拿 `__ac_nonce`、再向 ttwid 服务注册拿 `ttwid`。两步都是匿名的，
   * 任意机器、任意系统都能跑，失败也不阻塞后续流程（只会让风控更容易命中）。
   * @param force 强制重新初始化
   */
  async init(force = false): Promise<void> {
    if (this.initialized && !force) return
    this.initialized = true

    try {
      const home = await this.fetch(`https://${WEB_HOST}/`, {
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          ...CLIENT_HINTS
        }
      })
      this.absorb(home)
    } catch (error) {
      logger.debug('[抖音登录] 获取首页指纹失败，继续尝试注册 ttwid:', error)
    }

    try {
      const ttwid = await this.fetch('https://ttwid.bytedance.com/ttwid/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: `https://${WEB_HOST}`,
          Referer: `https://${WEB_HOST}/`
        },
        body: JSON.stringify({ aid: 6383, service: WEB_HOST })
      })
      this.absorb(ttwid)
    } catch (error) {
      logger.debug('[抖音登录] 注册 ttwid 失败:', error)
    }

    logger.debug(`[抖音登录] 环境指纹就绪: ttwid=${this.cookies.has('ttwid')}, ac_nonce=${this.cookies.has('__ac_nonce')}`)
  }

  /**
   * 请求 login.douyin.com 的 passport 接口（四重签名 + a_bogus 形态）
   * @param path 接口路径，如 `/passport/web/get_qrcode/`
   * @param options 请求选项
   */
  async request<T extends PassportPayload = PassportPayload>(
    path: string,
    options: PassportRequestOptions = {}
  ): Promise<PassportResponse<T>> {
    const method = options.method ?? 'GET'
    const business = options.params ?? {}
    const data = method === 'POST' ? business : {}

    const common = makeCommonParams(method === 'GET' ? business : {})
    const { sign, qs } = makeSignAndQs(common, data)

    const query: Record<string, string> = { ...common, sign, qs }
    const msToken = this.cookies.get('msToken') ?? this.msToken
    if (msToken) query.msToken = msToken

    const queryString = serializeQuery(query)
    const url = `https://${LOGIN_HOST}${path}?${queryString}&a_bogus=${encodeURIComponent(aBogus(queryString, LOGIN_USER_AGENT))}`

    // msToken 必须同时出现在 Cookie 头里，否则服务端会认为设备指纹在轮询过程中发生了漂移
    if (msToken && !this.cookies.has('msToken')) this.cookies.set('msToken', msToken)

    const response = await this.fetch(url, {
      method,
      headers: {
        Accept: 'application/json, text/javascript',
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer: `https://${WEB_HOST}/`,
        'x-tt-passport-aid-sign': makeAidSign(path),
        'x-tt-passport-csrf-token': this.csrfToken,
        'x-tt-passport-verify-portrait': this.verifyPortrait,
        'x-tt-passport-trace-id': String(common.biz_trace_id),
        ...CLIENT_HINTS
      },
      body: method === 'POST' ? serializeQuery(data) : undefined,
      timeout: options.timeout
    })

    return this.absorb<T>(response)
  }

  /**
   * 请求 www.douyin.com 的验证页接口（lite 形态：固定 query + 表单 body，无签名）
   * @param path 接口路径，如 `/passport/web/send_code/`
   * @param options 请求选项
   */
  async liteRequest<T extends PassportPayload = PassportPayload>(path: string, options: LiteRequestOptions): Promise<PassportResponse<T>> {
    const url = `https://${WEB_HOST}${path}?${serializeQuery(makeLiteParams(options.bizTraceId))}`

    const response = await this.fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/javascript',
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: `https://${WEB_HOST}`,
        Referer: `https://${WEB_HOST}/`,
        'x-tt-passport-aid-sign': makeAidSign(path),
        'x-tt-passport-csrf-token': this.csrfToken,
        'x-tt-passport-verify-portrait': this.verifyPortrait,
        'x-tt-passport-trace-id': options.bizTraceId,
        ...CLIENT_HINTS
      },
      body: serializeQuery(options.params),
      timeout: options.timeout
    })

    return this.absorb<T>(response)
  }

  /**
   * 跟随扫码确认后下发的 SSO 跳转链，把最终的登录凭证收进 CookieJar
   * @param redirectUrl `check_qrconnect` 返回的 redirect_url
   * @returns 是否成功拿到登录态 cookie
   */
  async followSsoRedirect(redirectUrl: string): Promise<boolean> {
    let current = redirectUrl

    for (let hop = 0; hop < MAX_REDIRECT_HOPS; hop++) {
      const response = await this.fetch(current, {
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          Referer: `https://${LOGIN_HOST}/`,
          ...CLIENT_HINTS
        },
        redirect: 'manual'
      })
      this.absorb(response)

      const location = response.headers.get('location')
      if (!location || response.status < 300 || response.status >= 400) break
      current = new URL(location, current).toString()
    }

    return this.cookies.isLoggedIn()
  }

  /** 消化响应：合并 Set-Cookie、刷新 msToken，并解析 JSON */
  private absorb<T extends PassportPayload = PassportPayload>(response: PassportResponse<PassportPayload>): PassportResponse<T> {
    this.cookies.applySetCookie(readSetCookie(response.headers))

    const refreshed = response.headers.get('x-ms-token')
    if (refreshed) {
      this.msToken = refreshed
      this.cookies.set('msToken', refreshed)
    }

    return { ...response, body: parseJson<T>(response.raw) }
  }

  /** 带超时与 Cookie 头的 fetch 包装 */
  private async fetch(
    url: string,
    init: RequestInit & { headers?: Record<string, string>; timeout?: number } = {}
  ): Promise<PassportResponse<PassportPayload>> {
    const { timeout = DEFAULT_TIMEOUT, headers = {}, ...rest } = init
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)

    try {
      const cookie = this.cookies.toString()
      const response = await fetch(url, {
        ...rest,
        headers: {
          'User-Agent': LOGIN_USER_AGENT,
          ...headers,
          ...(cookie ? { Cookie: cookie } : {})
        },
        signal: controller.signal
      })
      const raw = await response.text()
      return { status: response.status, headers: response.headers, raw, body: parseJson<PassportPayload>(raw) }
    } finally {
      clearTimeout(timer)
    }
  }
}
