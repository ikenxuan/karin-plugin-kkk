import type { Credential, WatchOptions } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => {
  class AmagiError extends Error {
    constructor(
      public code: number,
      public data?: { data: { v_voucher: string } },
      public reason = '凭证失效'
    ) {
      super(reason)
    }
  }
  const auth = {
    status: vi.fn(),
    qrcode: vi.fn(),
    refresh: vi.fn(),
    captchaFromVoucher: vi.fn(),
    validateCaptcha: vi.fn()
  }
  return {
    AmagiError,
    api: { auth },
    watch: vi.fn(),
    reload: vi.fn(),
    modify: vi.fn(),
    render: vi.fn(),
    context: vi.fn(),
    writeFile: vi.fn(),
    cookies: { bilibili: 'SESSDATA=old' as string | null, bilibiliRefreshToken: 'old-refresh' }
  }
})

vi.mock('@ikenxuan/amagi', () => ({ tools: { bilibili: { sign: { wbi: async () => '&wbi=test' } } } }))
vi.mock('node:fs', () => ({ default: { writeFileSync: runtime.writeFile } }))
vi.mock('node-karin', () => ({
  default: { ctx: runtime.context },
  segment: { text: (text: string) => ({ type: 'text', text }) }
}))
vi.mock('@/module/utils', () => ({ Common: { tempDri: { default: 'test/' } }, Render: runtime.render }))
vi.mock('@/module/utils/amagiClient', () => ({
  AmagiError: runtime.AmagiError,
  bilibiliApi: runtime.api,
  getAmagiClient: () => ({ bilibili: runtime.api }),
  reloadAmagiConfig: runtime.reload
}))
vi.mock('@/module/utils/bot', () => ({ resolveTriggerAvatarUrl: vi.fn(async () => 'https://example.com/avatar.png') }))
vi.mock('@/module/utils/Config', () => ({ Config: { amagi: { cookies: runtime.cookies }, Modify: runtime.modify } }))
vi.mock('@/module/utils/ErrorHandler', () => ({
  registerErrorStrategy: vi.fn(),
  renderErrorImage: runtime.render,
  sendErrorToAllMasters: vi.fn(),
  sendErrorToMaster: vi.fn()
}))
vi.mock('@/module/utils/logger', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn(), mark: vi.fn() }
}))

import { checkCk, genParams } from '@/platform/bilibili/genParams'
import { bilibiliLogin, bilibiliRefreshLogin } from '@/platform/bilibili/login'
import { bilibiliRiskControlStrategy } from '@/platform/bilibili/riskControl'

const makeEvent = () =>
  ({
    contact: { type: 'group', peer: 'group' },
    reply: vi.fn(async () => ({ messageId: 'message' })),
    bot: { recallMsg: vi.fn(async () => undefined) }
  }) as unknown as Message

beforeEach(() => {
  vi.resetAllMocks()
  runtime.cookies.bilibili = 'SESSDATA=old'
  runtime.cookies.bilibiliRefreshToken = 'old-refresh'
  runtime.api.auth.status.mockResolvedValue({ success: true, data: { code: 0, data: { vipStatus: 0 } } })
  runtime.api.auth.qrcode.mockReturnValue({ watch: runtime.watch })
  runtime.modify.mockResolvedValue(undefined)
  runtime.reload.mockReturnValue(true)
  runtime.render.mockResolvedValue([{ type: 'image', file: 'base64://dGVzdA==' }])
})

describe('B站 auth.status 消费者', () => {
  it.each(['', null])('无 Cookie（%s）时沿用匿名参数，不读取客户端登录态', async (cookie) => {
    runtime.cookies.bilibili = cookie
    expect(await checkCk()).toEqual({ Status: '!isLogin', isVIP: false })
    expect(await genParams('https://api.bilibili.com/example')).toBe('&platform=html5')
    expect(runtime.api.auth.status).not.toHaveBeenCalled()
  })

  it.each([0, 1])('登录查询保留成功信封里的 VIP 状态 %s', async (vipStatus) => {
    runtime.api.auth.status.mockResolvedValue({ success: true, data: { code: 0, data: { vipStatus } } })
    expect(await checkCk()).toEqual({ Status: 'isLogin', isVIP: vipStatus === 1 })
    expect(await genParams('https://api.bilibili.com/example')).toBe(vipStatus === 1 ? '&fnval=16&fourk=1&&wbi=test' : '&qn=64&fnval=16')
  })

  it('业务 API 抛出的登录查询错误传给调用方', async () => {
    const error = new Error('登录查询失败')
    runtime.api.auth.status.mockRejectedValue(error)
    await expect(checkCk()).rejects.toBe(error)
  })
})

describe('B站 auth.qrcode 消费者', () => {
  it('扫码成功后整组保存凭证、重载单例并撤回二维码', async () => {
    const event = makeEvent()
    const credential: Credential = { cookie: 'SESSDATA=new', raw: { data: { refresh_token: 'new-refresh' } } }
    runtime.watch.mockImplementation(async (options: WatchOptions) => {
      await options.onQrcode?.({ content: 'https://example.com/qrcode', token: 'qr', expiresAt: Date.now() + 60000, expiresInSec: 60 })
      await options.onScanned?.()
      await options.onSuccess?.(credential)
      return { ok: true, credential }
    })

    await bilibiliLogin(event)

    expect(runtime.modify.mock.calls).toEqual([
      ['amagi', 'cookies.bilibili', 'SESSDATA=new'],
      ['amagi', 'cookies.bilibiliRefreshToken', 'new-refresh']
    ])
    expect(runtime.reload).toHaveBeenCalledOnce()
    expect(event.bot.recallMsg).toHaveBeenCalledWith(event.contact, 'message')
    expect(event.reply).toHaveBeenCalledWith('登录成功！用户登录凭证已保存至配置', { reply: true })
  })

  it('二维码终态失败给出平台原因，不覆盖凭证', async () => {
    runtime.watch.mockResolvedValue({ ok: false, error: { kind: 'auth', code: 'COOKIE_EXPIRED', message: 'expired' } })
    const event = makeEvent()
    await bilibiliLogin(event)
    expect(event.reply).toHaveBeenCalledWith('二维码已失效', { reply: true })
    expect(runtime.modify).not.toHaveBeenCalled()
  })
})

describe('B站 auth.refresh 消费者', () => {
  it('使用旧凭证续期并整组保存新凭证', async () => {
    runtime.api.auth.refresh.mockResolvedValue({ ok: true, credential: { cookie: 'SESSDATA=renewed', refreshToken: 'renewed-refresh' } })
    const event = makeEvent()
    expect(await bilibiliRefreshLogin(event)).toBe(true)
    expect(runtime.api.auth.refresh).toHaveBeenCalledWith({ cookie: 'SESSDATA=old', refreshToken: 'old-refresh' })
    expect(runtime.modify.mock.calls).toEqual([
      ['amagi', 'cookies.bilibili', 'SESSDATA=renewed'],
      ['amagi', 'cookies.bilibiliRefreshToken', 'renewed-refresh']
    ])
    expect(runtime.reload).toHaveBeenCalledOnce()
  })

  it('续期返回失败终态时保留旧凭证并通知用户', async () => {
    runtime.api.auth.refresh.mockResolvedValue({ ok: false, error: { kind: 'auth', code: 'COOKIE_EXPIRED', message: '请重新扫码' } })
    const event = makeEvent()
    expect(await bilibiliRefreshLogin(event)).toBe(true)
    expect(runtime.modify).not.toHaveBeenCalled()
    expect(runtime.reload).not.toHaveBeenCalled()
    expect(event.reply).toHaveBeenCalledWith('B站登录态续期失败：请重新扫码', { reply: true })
  })
})

describe('B站 auth 验证码消费者', () => {
  const makeContext = (event: Message) =>
    ({ error: new runtime.AmagiError(-352, { data: { v_voucher: 'voucher' } }), event }) as Parameters<
      typeof bilibiliRiskControlStrategy.handle
    >[0]

  it('申请与提交验证码保留原参数，并反馈验证成功', async () => {
    runtime.api.auth.captchaFromVoucher.mockResolvedValue({
      success: true,
      data: { code: 0, data: { geetest: { gt: 'gt', challenge: 'challenge' }, token: 'captcha-token' } }
    })
    runtime.api.auth.validateCaptcha.mockResolvedValue({ success: true, data: { code: 0, data: { grisk_id: 'grisk' } } })
    runtime.context.mockResolvedValue({ msg: 'validate=verified&seccode=verified%7Cjordan' })
    const event = makeEvent()
    expect(await bilibiliRiskControlStrategy.handle(makeContext(event))).toBe('handled')
    expect(runtime.api.auth.captchaFromVoucher).toHaveBeenCalledWith({ v_voucher: 'voucher' })
    expect(runtime.api.auth.validateCaptcha).toHaveBeenCalledWith({
      challenge: 'challenge',
      token: 'captcha-token',
      validate: 'verified',
      seccode: 'verified|jordan'
    })
    expect(event.reply).toHaveBeenCalledWith('✅ 验证成功！请重新发送命令')
  })

  it('申请结果缺少极验信息时继续原错误处理流程', async () => {
    runtime.api.auth.captchaFromVoucher.mockResolvedValue({ success: true, data: { code: 0, data: {} } })
    expect(await bilibiliRiskControlStrategy.handle(makeContext(makeEvent()))).toBe('continue')
    expect(runtime.api.auth.validateCaptcha).not.toHaveBeenCalled()
  })
})
