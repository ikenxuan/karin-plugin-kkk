/**
 * 抖音扫码登录会话
 *
 * 把「取码 → 轮询 → （二次验证）→ 领取凭证」这套协议流程封装成与 Karin 无关的对象，
 * 上层只需要驱动状态、渲染消息。所有网络细节、签名与 cookie 都在会话内部完成。
 */
import { logger } from 'node-karin'

import { DouyinPassportClient } from './client'
import { parsePollResult, parseQrcode, parseSendCodeResult, parseValidateCodeResult } from './parser'
import { LITE_AUTHN_VERSION, PASSPORT_AID, randomHex, xor5Hex } from './passport'
import type { PollResult, QrcodeInfo, SendCodeResult, ValidateCodeResult, VerifyContext } from './types'

/** 短信验证码的验证方式标识 */
const SMS_VERIFY_WAY = 'mobile_sms_verify'

/** 短信验证码的 act_type */
const SMS_ACT_TYPE = '3737'

/** 扫码登录成功后的跳转地址 */
const NEXT_URL = 'https://www.douyin.com'

export class DouyinLoginSession {
  private readonly client = new DouyinPassportClient()

  /** 同一次二次验证流程内复用的追踪 ID */
  private readonly bizTraceId = randomHex(8)

  /** 当前二维码令牌 */
  private token = ''

  /** 登录成功后的完整 cookie 串 */
  get cookie(): string {
    return this.client.cookies.toString()
  }

  /** 登录凭证里的关键字段是否齐全 */
  get credentialSummary(): Record<string, boolean> {
    const jar = this.client.cookies
    return {
      sessionid: jar.has('sessionid'),
      sessionid_ss: jar.has('sessionid_ss'),
      sid_guard: jar.has('sid_guard'),
      uid_tt: jar.has('uid_tt'),
      uid_tt_ss: jar.has('uid_tt_ss'),
      ttwid: jar.has('ttwid')
    }
  }

  /**
   * 初始化环境指纹并申请二维码
   * @returns 二维码信息
   * @throws 服务端未下发 token 时抛出
   */
  async requestQrcode(): Promise<QrcodeInfo> {
    await this.client.init()

    const response = await this.client.request('/passport/web/get_qrcode/', {
      params: { next: NEXT_URL, need_short_url: 'true', need_logo: 'false', is_new_login: '1' }
    })

    const qrcode = parseQrcode(response.body)
    if (!qrcode) {
      throw new Error(`获取二维码失败: ${response.body.message || response.raw.slice(0, 200)}`)
    }

    this.token = qrcode.token
    return qrcode
  }

  /**
   * 查询一次二维码状态
   * @returns 轮询结果；confirmed 时已经跟随 SSO 跳转领取过登录 cookie
   */
  async poll(): Promise<PollResult> {
    if (!this.token) throw new Error('尚未申请二维码')

    const response = await this.client.request('/passport/web/check_qrconnect/', {
      params: {
        next: NEXT_URL,
        need_logo: 'false',
        is_frontier: 'true',
        token: this.token,
        is_new_login: '1',
        need_short_url: 'true'
      }
    })

    const result = parsePollResult(response.body)

    if (result.status === 'confirmed' && result.redirectUrl) {
      const ok = await this.client.followSsoRedirect(result.redirectUrl)
      logger.debug(`[抖音登录] SSO 跳转完成，登录凭证${ok ? '已' : '未'}下发`)
    }

    return result
  }

  /** 当前 CookieJar 是否已持有登录态凭证 */
  isLoggedIn(): boolean {
    return this.client.cookies.isLoggedIn()
  }

  /**
   * 请求把短信验证码发送到账号绑定手机
   * @param verify 轮询下发的二次验证上下文
   */
  async sendSmsCode(verify: VerifyContext): Promise<SendCodeResult> {
    const response = await this.client.liteRequest('/passport/web/send_code/', {
      params: { ...this.verifyBody(verify), is6Digits: '1' },
      bizTraceId: this.bizTraceId
    })
    return parseSendCodeResult(response.body)
  }

  /**
   * 提交短信验证码
   * @param verify 轮询下发的二次验证上下文
   * @param code 用户输入的 6 位验证码
   */
  async submitSmsCode(verify: VerifyContext, code: string): Promise<ValidateCodeResult> {
    const response = await this.client.liteRequest('/passport/web/validate_code/', {
      // mix_mode=1 下验证码需按逐字节异或 5 转十六进制后提交
      params: { ...this.verifyBody(verify), code: xor5Hex(code) },
      bizTraceId: this.bizTraceId
    })
    return parseValidateCodeResult(response.body)
  }

  /** 发码与验码共用的表单字段 */
  private verifyBody(verify: VerifyContext): Record<string, string> {
    return {
      mix_mode: '1',
      type: SMS_ACT_TYPE,
      encrypt_uid: verify.encryptUid,
      verify_ticket: verify.verifyTicket,
      copywriting_key: verify.copywritingKey,
      ies_safety_diversion_tag: verify.diversionTag,
      new_verify_flow: verify.newVerifyFlow,
      std_verify_scene: 'account_login',
      std_verify_template: 'ato_web',
      std_verify_type: 'MFA',
      ...verify.stdParams,
      std_verify_way: SMS_VERIFY_WAY,
      aid: PASSPORT_AID,
      new_authn_sdk_version: LITE_AUTHN_VERSION
    }
  }
}
