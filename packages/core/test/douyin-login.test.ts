import { douyinPassport } from '@ikenxuan/amagi'
import { describe, expect, it } from 'vitest'

// 协议层实现在 @ikenxuan/amagi 的 passport 模块里，这里锁住 kkk 依赖的那部分行为
const {
  aBogus,
  CookieJar,
  makeAidSign,
  makeSignAndQs,
  parsePollResult,
  parseQrcode,
  parseSendCodeResult,
  parseValidateCodeResult,
  sm3Hex,
  utcNoonTimestamp,
  xor5Hex
} = douyinPassport


describe('CookieJar', () => {
  it('按下发顺序覆盖同名 cookie，保留最后一次的值', () => {
    const jar = new CookieJar()
    jar.applySetCookie(['ttwid=first; Path=/; Domain=.douyin.com'])
    jar.applySetCookie(['ttwid=second; Path=/; Domain=.douyin.com'])

    expect(jar.get('ttwid')).toBe('second')
    expect(jar.toString()).toBe('ttwid=second')
  })

  it('更新同名 cookie 不会产生重复项，也不会改变位置', () => {
    const jar = new CookieJar('a=1; sessionid=old; b=2')
    jar.applySetCookie('sessionid=new; Path=/; HttpOnly')

    expect(jar.toString()).toBe('a=1; sessionid=new; b=2')
    expect(jar.size).toBe(3)
  })

  it('合并多条 Set-Cookie 并保留全部登录凭证', () => {
    const jar = new CookieJar('ttwid=abc')
    jar.applySetCookie([
      'sessionid=s1; Path=/; HttpOnly',
      'sessionid_ss=s2; Path=/; Secure',
      'sid_guard=s3%7C1700000000%7C; Path=/',
      'uid_tt=u1; Path=/',
      'uid_tt_ss=u2; Path=/'
    ])

    expect(jar.toJSON()).toEqual({
      ttwid: 'abc',
      sessionid: 's1',
      sessionid_ss: 's2',
      sid_guard: 's3%7C1700000000%7C',
      uid_tt: 'u1',
      uid_tt_ss: 'u2'
    })
    expect(jar.isLoggedIn()).toBe(true)
  })

  it('Max-Age=0 与过期时间视为删除指令', () => {
    const jar = new CookieJar('a=1; b=2; c=3')
    jar.applySetCookie(['a=; Max-Age=0; Path=/', 'b=x; Expires=Thu, 01 Jan 1970 00:00:00 GMT'])

    expect(jar.has('a')).toBe(false)
    expect(jar.has('b')).toBe(false)
    expect(jar.get('c')).toBe('3')
  })

  it('未来的 Expires 不会误删 cookie', () => {
    const jar = new CookieJar()
    jar.applySetCookie('sessionid=alive; Expires=Tue, 01 Jan 2999 00:00:00 GMT; Path=/')

    expect(jar.get('sessionid')).toBe('alive')
  })

  it('忽略空值与格式异常的输入', () => {
    const jar = new CookieJar()
    jar.merge(undefined).merge('').applySetCookie(null).applySetCookie(['nonsense', '=noname; Path=/'])

    expect(jar.size).toBe(0)
    expect(jar.isLoggedIn()).toBe(false)
  })

  it('ttwid 本身不构成登录态', () => {
    expect(new CookieJar('ttwid=only').isLoggedIn()).toBe(false)
  })
})

describe('parseQrcode', () => {
  it('优先取 qrcode_index_url 作为二维码内容', () => {
    const qrcode = parseQrcode({
      data: { token: 'tk', qrcode_index_url: 'https://www.douyin.com/qr/x', expire_time: 300000 }
    })

    expect(qrcode).toEqual({ token: 'tk', content: 'https://www.douyin.com/qr/x', expireTime: 300000 })
  })

  it('缺少 index_url 时回退到 token', () => {
    expect(parseQrcode({ data: { token: 'tk' } })?.content).toBe('tk')
  })

  it('响应异常时返回 null', () => {
    expect(parseQrcode({})).toBeNull()
    expect(parseQrcode({ data: {} })).toBeNull()
    expect(parseQrcode({ message: 'error', data: { error_code: 2156 } })).toBeNull()
  })
})

describe('parsePollResult', () => {
  it('解析未扫码状态并采用服务端给出的轮询间隔', () => {
    expect(parsePollResult({ data: { status: 'new', interval: 5000 } })).toEqual({ status: 'new', interval: 5000 })
  })

  it('间隔缺失或过小时回落到默认值', () => {
    expect(parsePollResult({ data: { status: 'scanned' } })).toEqual({ status: 'scanned', interval: 3000 })
    expect(parsePollResult({ data: { status: 'scanned', interval: 0 } })).toEqual({ status: 'scanned', interval: 3000 })
  })

  it('解析确认状态并取出跳转地址', () => {
    const result = parsePollResult({
      data: { status: 'confirmed', redirect_url: 'https://www.douyin.com/passport/sso/login/?code=1' }
    })

    expect(result).toEqual({
      status: 'confirmed',
      interval: 3000,
      redirectUrl: 'https://www.douyin.com/passport/sso/login/?code=1'
    })
  })

  it('redirect_url 缺失时回退到 redirect_urls 数组', () => {
    const result = parsePollResult({ data: { status: 'confirmed', redirect_urls: ['https://a.example/1'] } })

    expect(result.status).toBe('confirmed')
    expect(result.status === 'confirmed' && result.redirectUrl).toBe('https://a.example/1')
  })

  it('解析过期状态', () => {
    expect(parsePollResult({ data: { status: 'expired' } }).status).toBe('expired')
  })

  it('error_code 2046 识别为二次验证并提取验证上下文', () => {
    const result = parsePollResult({
      data: {
        error_code: 2046,
        encrypt_uid: 'euid',
        verify_ticket: 'ticket',
        std_verify_token: 'token',
        std_verify_flow_id: 'flow',
        std_verify_way: 'mobile_sms_verify',
        verify_ways: [{ verify_way: 'mobile_sms_verify', mobile: '138****0000' }]
      }
    })

    expect(result.status).toBe('verify')
    if (result.status !== 'verify') return

    expect(result.verify.encryptUid).toBe('euid')
    expect(result.verify.verifyTicket).toBe('ticket')
    expect(result.verify.stdParams).toEqual({
      std_verify_token: 'token',
      std_verify_flow_id: 'flow',
      std_verify_way: 'mobile_sms_verify'
    })
    expect(result.verify.copywritingKey).toBe('qr_connect')
    expect(result.verify.diversionTag).toBe('mfa')
    expect(result.verify.verifyWays).toEqual([{ verifyWay: 'mobile_sms_verify', mobile: '138****0000' }])
  })

  it('account_flow=verify 同样识别为二次验证', () => {
    expect(parsePollResult({ data: { account_flow: 'verify', encrypt_uid: 'euid' } }).status).toBe('verify')
  })

  it('风控错误码识别为 risk', () => {
    const result = parsePollResult({ data: { error_code: 2156, description: '环境异常' } })

    expect(result.status).toBe('risk')
    expect(result.status === 'risk' && result.message).toBe('环境异常')
  })

  it('空响应与无法识别的状态归入 unknown', () => {
    expect(parsePollResult({}).status).toBe('unknown')
    expect(parsePollResult({ data: { status: 'whatever' } }).status).toBe('unknown')
    expect(parsePollResult({ data: { status: 'whatever' } })).toMatchObject({ message: 'status=whatever' })
  })
})

describe('parseSendCodeResult', () => {
  it('识别发码成功并带出脱敏手机号', () => {
    const result = parseSendCodeResult({ message: 'success', data: { mobile: '138****0000', retry_time: 60 } })

    expect(result).toEqual({ ok: true, mobile: '138****0000', retryAfter: 60, message: '' })
  })

  it('error_code 为 0 也视为成功', () => {
    expect(parseSendCodeResult({ data: { error_code: 0, mobile: '1' } }).ok).toBe(true)
  })

  it('限频错误给出可读提示', () => {
    const result = parseSendCodeResult({ data: { error_code: 1206, retry_time: 30 } })

    expect(result.ok).toBe(false)
    expect(result.errorCode).toBe(1206)
    expect(result.retryAfter).toBe(30)
    expect(result.message).toBe('短信发送过于频繁')
  })

  it('空响应视为失败而不是成功', () => {
    expect(parseSendCodeResult({}).ok).toBe(false)
    expect(parseSendCodeResult({ data: {} }).ok).toBe(false)
  })
})

describe('parseValidateCodeResult', () => {
  it('返回 ticket 视为验证通过', () => {
    expect(parseValidateCodeResult({ message: 'success', data: { ticket: 'tk' } })).toEqual({
      ok: true,
      wrongCode: false,
      message: ''
    })
  })

  it('error_code 1202 标记为验证码填错，允许重试', () => {
    const result = parseValidateCodeResult({ data: { error_code: 1202, description: '验证码错误' } })

    expect(result).toEqual({ ok: false, wrongCode: true, errorCode: 1202, message: '验证码错误' })
  })

  it('其他错误码不允许当作填错重试', () => {
    const result = parseValidateCodeResult({ data: { error_code: 1204 } })

    expect(result.ok).toBe(false)
    expect(result.wrongCode).toBe(false)
    expect(result.message).toBe('验证失败 error_code=1204')
  })

  it('空响应视为失败', () => {
    expect(parseValidateCodeResult({}).ok).toBe(false)
  })
})

/** xor5Hex 的逆运算，仅测试用 */
const decodeXor5 = (hex: string): string => Buffer.from((hex.match(/../g) ?? []).map((byte) => parseInt(byte, 16) ^ 5)).toString('utf8')

describe('签名基元', () => {
  it('SM3 与国标测试向量一致', () => {
    expect(sm3Hex('abc')).toBe('66c7f0f462eeedd9d1f2d46bdc10e4e24167c4875cf2f7a2297da02b8f4ba8e0')
    expect(sm3Hex('abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd')).toBe(
      'debe9ff92275b8a138604889c18e5a4d6fdb70e5387e5765293dcba39c0c5732'
    )
  })

  it('xor5Hex 与 SDK 的验证码编码一致', () => {
    expect(xor5Hex('444684')).toBe('313131333d31')
    expect(xor5Hex('mix_mode=1')).toBe('686c7d5a686a61603834')
  })

  it('sign 与 qs 只取排序后的前 10 个参数', () => {
    const params = Object.fromEntries(Array.from({ length: 12 }, (_, index) => [`k${index}`, String(index)]))
    const { sign, qs } = makeSignAndQs(params)

    expect(sign).toMatch(/^[0-9a-f]{64}$/)
    // qs 是参与签名的参数名列表异或 5 后的十六进制，解回来应当只剩排序后的前 10 个键
    expect(decodeXor5(qs)).toBe('k0,k1,k10,k11,k2,k3,k4,k5,k6,k7')
  })

  it('相同输入的 sign 稳定，不同 body 会改变 sign', () => {
    const params = { a: '1', b: '2' }

    expect(makeSignAndQs(params).sign).toBe(makeSignAndQs(params).sign)
    expect(makeSignAndQs(params, { c: '3' }).sign).not.toBe(makeSignAndQs(params).sign)
  })

  it('aid-sign 为 64 位十六进制且随路径变化', () => {
    const ts = utcNoonTimestamp(new Date('2026-08-31T03:00:00Z'))

    expect(makeAidSign('/passport/web/get_qrcode/', ts)).toMatch(/^[0-9a-f]{64}$/)
    expect(makeAidSign('/passport/web/get_qrcode/', ts)).not.toBe(makeAidSign('/passport/web/check_qrconnect/', ts))
  })

  it('utcNoonTimestamp 取当天 UTC 正午', () => {
    expect(utcNoonTimestamp(new Date('2026-08-31T23:59:59Z'))).toBe(Date.UTC(2026, 7, 31, 12) / 1000)
  })
})

describe('aBogus', () => {
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'

  it('生成非空签名，且只使用签名字符表内的字符', () => {
    const signature = aBogus('aid=6383&device_platform=web_app', ua)

    expect(signature.length).toBeGreaterThan(80)
    expect(signature).toMatch(/^[A-Za-z0-9/\-+=]+$/)
  })

  it('含随机因子，两次调用结果不同', () => {
    const query = 'aid=6383&device_platform=web_app'

    expect(aBogus(query, ua)).not.toBe(aBogus(query, ua))
  })
})
