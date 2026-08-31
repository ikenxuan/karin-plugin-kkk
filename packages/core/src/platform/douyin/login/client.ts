import type { IncomingHttpHeaders } from 'node:http'
import { request } from 'node:https'

import { buildCookieHeader, getCookie, hasLoginCookie, mergeCookies, setCookiesToCookieHeader } from './cookie'
import { DOUYIN_USER_AGENT, LOGIN_STATIC_HEADERS } from './constants'
import { encodeHexXor5, LOGIN_HOST, makeAidSign, makeCommonParams, makeSignAndQs, randomHex } from './passport'
import { makeABogus } from './signer'

export type JsonRecord = Record<string, unknown>

interface RawResponse {
  status: number
  headers: IncomingHttpHeaders
  body: string
}

interface PassportResponse extends RawResponse {
  data: JsonRecord
}

export interface QrCodeData extends JsonRecord {
  token: string
}

export interface PollData extends JsonRecord {
  status?: string
}

export class DouyinLoginError extends Error {
  readonly status: number
  readonly code?: number

  constructor(message: string, status = 0, code?: number) {
    super(message)
    this.name = 'DouyinLoginError'
    this.status = status
    this.code = code
  }
}

function parseRecord(value: unknown): JsonRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return value as JsonRecord
}

function parsePossibleRecord(value: unknown): JsonRecord {
  if (typeof value !== 'string') return parseRecord(value)
  try {
    return parseRecord(JSON.parse(value))
  } catch {
    return {}
  }
}

export function readString(record: JsonRecord, key: string): string {
  const value = record[key]
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return ''
}

export function readNumber(record: JsonRecord, key: string): number | undefined {
  const value = record[key]
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function firstHeader(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || ''
}

function serializeForUrl(value: Record<string, string | number>): string {
  return Object.entries(value)
    .map(([key, item]) => `${key}=${encodeURIComponent(String(item))}`)
    .join('&')
}

function parseJson(body: string): JsonRecord {
  try {
    return parseRecord(JSON.parse(body))
  } catch {
    return { raw: body }
  }
}

function responseMessage(response: PassportResponse): string {
  const data = parseRecord(response.data.data)
  return (
    readString(data, 'description') ||
    readString(data, 'message') ||
    readString(response.data, 'message') ||
    `HTTP ${response.status}`
  )
}

function requestRaw(
  method: 'GET' | 'POST',
  url: string,
  headers: Record<string, string>,
  body = '',
  timeout = 15000
): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    const target = new URL(url)
    const req = request(
      {
        method,
        hostname: target.hostname,
        port: target.port || 443,
        path: target.pathname + target.search,
        headers,
        timeout
      },
      (res) => {
        const chunks: Buffer[] = []
        res.on('data', (chunk: Buffer) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
        res.on('end', () => {
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8')
          })
        })
      }
    )

    req.on('timeout', () => req.destroy(new Error('抖音登录请求超时')))
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

export class DouyinLoginClient {
  private cookie = ''
  private msToken = ''
  private initialized = false

  async initialize(): Promise<void> {
    if (this.initialized) return

    try {
      const home = await requestRaw(
        'GET',
        'https://www.douyin.com/',
        {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'User-Agent': DOUYIN_USER_AGENT,
          'sec-ch-ua': '"Not_A Brand";v="99", "Chromium";v="142"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"'
        },
        '',
        15000
      )
      this.applyResponse(home)
    } catch {
      // 首页失败时继续尝试注册 ttwid，最终由二维码接口返回明确错误
    }

    const ttwid = await requestRaw(
      'POST',
      'https://ttwid.bytedance.com/ttwid/register/',
      {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'User-Agent': DOUYIN_USER_AGENT,
        Origin: 'https://www.douyin.com',
        Referer: 'https://www.douyin.com/'
      },
      JSON.stringify({ aid: 6383, service: 'www.douyin.com' })
    )
    this.applyResponse(ttwid)

    if (!getCookie('ttwid', this.cookie)) {
      throw new DouyinLoginError('初始化抖音登录环境失败：未获取到 ttwid', ttwid.status)
    }

    this.initialized = true
  }

  async createQrCode(): Promise<QrCodeData> {
    await this.initialize()
    const response = await this.passportRequest('/passport/web/get_qrcode/', {
      next: 'https://www.douyin.com',
      need_short_url: 'true',
      need_logo: 'false',
      is_new_login: '1'
    })
    const data = parseRecord(response.data.data)
    const token = readString(data, 'token')
    if (response.status !== 200 || !token) {
      throw this.makeResponseError('获取抖音登录二维码失败', response)
    }
    return { ...data, token }
  }

  async pollQrCode(token: string): Promise<PollData> {
    const response = await this.passportRequest('/passport/web/check_qrconnect/', {
      next: 'https://www.douyin.com',
      need_logo: 'false',
      is_frontier: 'true',
      token,
      is_new_login: '1',
      need_short_url: 'true'
    })
    const data = parseRecord(response.data.data)

    if (response.status !== 200) throw this.makeResponseError('查询抖音扫码状态失败', response)

    let status = readString(data, 'status')
    if (!status && (readString(data, 'account_flow') === 'verify' || readNumber(data, 'error_code') === 2046)) {
      status = 'verify'
    }

    if (status === 'confirmed') {
      const redirect = this.getRedirectUrl(data)
      if (redirect) await this.followSsoRedirect(redirect)
      if (!hasLoginCookie(this.cookie)) {
        throw new DouyinLoginError('扫码已确认，但没有获取到有效登录凭证')
      }
    }

    if (!status && Object.keys(data).length === 0) {
      throw this.makeResponseError('抖音扫码接口未返回有效状态', response)
    }

    return status ? { ...data, status } : data
  }

  async sendSmsCode(verifyData: JsonRecord): Promise<JsonRecord> {
    const context = this.extractVerifyContext(verifyData)
    const encryptUid = readString(context, 'encrypt_uid')
    if (!encryptUid) throw new DouyinLoginError('二次验证响应缺少 encrypt_uid')

    const response = await this.passportLitePost('/passport/web/send_code/', this.buildSmsBody(context))
    if (response.status !== 200) throw this.makeResponseError('发送短信验证码失败', response)
    return parseRecord(response.data.data)
  }

  async validateSmsCode(verifyData: JsonRecord, code: string): Promise<JsonRecord> {
    const context = this.extractVerifyContext(verifyData)
    const encryptUid = readString(context, 'encrypt_uid')
    if (!encryptUid) throw new DouyinLoginError('二次验证响应缺少 encrypt_uid')

    const response = await this.passportLitePost('/passport/web/validate_code/', {
      ...this.buildSmsBody(context),
      code: encodeHexXor5(code)
    })
    if (response.status !== 200) throw this.makeResponseError('提交短信验证码失败', response)
    return parseRecord(response.data.data)
  }

  getCookie(): string {
    return buildCookieHeader(this.cookie)
  }

  hasLoginCookie(): boolean {
    return hasLoginCookie(this.cookie)
  }

  private applyResponse(response: RawResponse): void {
    const setCookie = setCookiesToCookieHeader(response.headers['set-cookie'])
    if (setCookie) this.cookie = mergeCookies(this.cookie, setCookie)

    const token = firstHeader(response.headers['x-ms-token'])
    if (token) {
      this.msToken = token
      this.cookie = mergeCookies(this.cookie, `msToken=${token}`)
    }
  }

  private async passportRequest(path: string, businessParams: Record<string, string | number>): Promise<PassportResponse> {
    const common = makeCommonParams(businessParams)
    const { sign, qs } = makeSignAndQs(common)
    const queryMap: Record<string, string> = { ...common, sign, qs }
    const msToken = getCookie('msToken', this.cookie) || this.msToken
    if (msToken) queryMap.msToken = msToken

    const query = serializeForUrl(queryMap)
    const url = `https://${LOGIN_HOST}${path}?${query}&a_bogus=${encodeURIComponent(makeABogus(query))}`
    const traceId = common.biz_trace_id
    const cookie = buildCookieHeader(this.cookie)
    const headers: Record<string, string> = {
      Accept: 'application/json, text/javascript',
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer: 'https://www.douyin.com/',
      'User-Agent': DOUYIN_USER_AGENT,
      'sec-ch-ua': '"Not_A Brand";v="99", "Chromium";v="142"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'x-tt-passport-aid-sign': makeAidSign(path),
      'x-tt-passport-csrf-token': getCookie('passport_csrf_token', this.cookie) || LOGIN_STATIC_HEADERS.csrfToken,
      'x-tt-passport-verify-portrait': LOGIN_STATIC_HEADERS.verifyPortrait,
      'x-tt-session-dtrait': LOGIN_STATIC_HEADERS.sessionDtrait
    }
    if (traceId) headers['x-tt-passport-trace-id'] = traceId
    if (cookie) headers.Cookie = cookie

    const response = await requestRaw('GET', url, headers)
    this.applyResponse(response)
    return { ...response, data: parseJson(response.body) }
  }

  private async passportLitePost(path: string, bodyParams: Record<string, string>): Promise<PassportResponse> {
    const traceId = randomHex(8)
    const query = serializeForUrl({
      passport_jssdk_version: '5.1.2',
      passport_jssdk_type: 'lite',
      is_from_ttaccountsdk: '1',
      aid: '6383',
      language: 'zh',
      account_app_language: 'zh-CN',
      new_authn_sdk_version: '1.0.0.420-web',
      biz_trace_id: traceId
    })
    const cookie = buildCookieHeader(this.cookie)
    const headers: Record<string, string> = {
      Accept: 'application/json, text/javascript',
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://www.douyin.com',
      Referer: 'https://www.douyin.com/',
      'User-Agent': DOUYIN_USER_AGENT,
      'sec-ch-ua': '"Not_A Brand";v="99", "Chromium";v="142"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'x-tt-passport-aid-sign': makeAidSign(path),
      'x-tt-passport-csrf-token': getCookie('passport_csrf_token', this.cookie) || LOGIN_STATIC_HEADERS.csrfToken,
      'x-tt-passport-trace-id': traceId,
      'x-tt-passport-verify-portrait': LOGIN_STATIC_HEADERS.verifyPortrait,
      'x-tt-session-dtrait': LOGIN_STATIC_HEADERS.sessionDtrait
    }
    if (cookie) headers.Cookie = cookie

    const response = await requestRaw('POST', `https://www.douyin.com${path}?${query}`, headers, serializeForUrl(bodyParams))
    this.applyResponse(response)
    return { ...response, data: parseJson(response.body) }
  }

  private buildSmsBody(context: JsonRecord): Record<string, string> {
    return {
      mix_mode: '1',
      type: readString(context, 'type') || '3737',
      encrypt_uid: readString(context, 'encrypt_uid'),
      verify_ticket: readString(context, 'verify_ticket'),
      copywriting_key: readString(context, 'copywriting_key') || 'qr_connect',
      ies_safety_diversion_tag: readString(context, 'ies_safety_diversion_tag') || 'mfa',
      new_verify_flow: readString(context, 'new_verify_flow'),
      std_verify_flow_id: readString(context, 'std_verify_flow_id'),
      std_verify_scene: readString(context, 'std_verify_scene') || 'account_login',
      std_verify_template: readString(context, 'std_verify_template') || 'ato_web',
      std_verify_token: readString(context, 'std_verify_token'),
      std_verify_type: readString(context, 'std_verify_type') || 'MFA',
      std_verify_way: 'mobile_sms_verify',
      is6Digits: readString(context, 'is6Digits') || '1',
      aid: '6383',
      new_authn_sdk_version: '1.0.0.420-web'
    }
  }

  private extractVerifyContext(data: JsonRecord): JsonRecord {
    const business = parsePossibleRecord(data.biz_params)
    const ways = Array.isArray(data.verify_ways) ? data.verify_ways : []
    const smsWay = ways.map(parseRecord).find((way) => readString(way, 'verify_way') === 'mobile_sms_verify') || {}
    return { ...business, ...smsWay, ...data }
  }

  private async followSsoRedirect(redirectUrl: string): Promise<void> {
    let current = redirectUrl
    for (let hop = 0; hop < 5; hop++) {
      const cookie = buildCookieHeader(this.cookie)
      const headers: Record<string, string> = {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': DOUYIN_USER_AGENT,
        Referer: 'https://login.douyin.com/',
        'sec-ch-ua': '"Not_A Brand";v="99", "Chromium";v="142"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      }
      if (cookie) headers.Cookie = cookie

      const response = await requestRaw('GET', current, headers)
      this.applyResponse(response)
      const location = firstHeader(response.headers.location)
      if (location && [301, 302, 303, 307, 308].includes(response.status)) {
        current = new URL(location, current).toString()
        continue
      }
      break
    }
  }

  private getRedirectUrl(data: JsonRecord): string {
    const direct = readString(data, 'redirect_url')
    if (direct) return direct
    const redirects = data.redirect_urls
    if (!Array.isArray(redirects)) return ''
    return redirects.find((item): item is string => typeof item === 'string') || ''
  }

  private makeResponseError(prefix: string, response: PassportResponse): DouyinLoginError {
    const data = parseRecord(response.data.data)
    const code = readNumber(data, 'error_code')
    return new DouyinLoginError(`${prefix}：${responseMessage(response)}`, response.status, code)
  }
}
