import type { WatchOptions } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  kuaishouQrcode: vi.fn(),
  xiaohongshuQrcode: vi.fn(),
  watch: vi.fn(),
  modify: vi.fn(),
  reload: vi.fn(),
  render: vi.fn(),
  writeFile: vi.fn()
}))

vi.mock('node:fs', () => ({ default: { writeFileSync: runtime.writeFile } }))
vi.mock('node-karin', () => ({ karin: { ctx: vi.fn() } }))
vi.mock('@/module', () => ({ Common: { tempDri: { default: 'test-temp/' } }, Render: runtime.render }))
vi.mock('@/module/utils/Config', () => ({ Config: { Modify: runtime.modify } }))
vi.mock('@/module/utils/bot', () => ({ resolveTriggerAvatarUrl: vi.fn(async () => 'https://example.com/avatar.png') }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), mark: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/module/utils/amagiClient', () => ({
  getAmagiClient: () => ({
    kuaishou: { auth: { qrcode: runtime.kuaishouQrcode } },
    xiaohongshu: { auth: { qrcode: runtime.xiaohongshuQrcode } }
  }),
  reloadAmagiConfig: runtime.reload
}))

import { kuaishouLogin } from '@/platform/kuaishou/login'
import { xiaohongshuLogin } from '@/platform/xiaohongshu/login'

const platforms = [
  { name: '快手', key: 'kuaishou', login: kuaishouLogin, qrcode: runtime.kuaishouQrcode, cookie: 'passToken=test; userId=test-user' },
  { name: '小红书', key: 'xiaohongshu', login: xiaohongshuLogin, qrcode: runtime.xiaohongshuQrcode, cookie: 'web_session=test' }
]

describe.each(platforms)('$name v7 扫码消费者', ({ key, login, qrcode, cookie }) => {
  beforeEach(() => {
    vi.resetAllMocks()
    runtime.kuaishouQrcode.mockReturnValue({ watch: runtime.watch })
    runtime.xiaohongshuQrcode.mockReturnValue({ watch: runtime.watch })
    runtime.render.mockResolvedValue([{ type: 'image', file: 'base64://dGVzdA==' }])
    runtime.reload.mockReturnValue(true)
  })

  it('通过 auth.qrcode 完成扫码、撤回二维码并保存凭证', async () => {
    const reply = vi.fn(async () => ({ messageId: 'tracked-message' }))
    const recallMsg = vi.fn(async () => undefined)
    const event = { reply, contact: { peer: 'test-user' }, bot: { recallMsg } } as unknown as Message
    runtime.watch.mockImplementation(async (options: WatchOptions) => {
      await options.onQrcode?.({
        content: 'https://example.com/qrcode',
        token: 'qr-token',
        expiresAt: Date.now() + 110_000,
        expiresInSec: 110
      })
      await options.onScanned?.()
      await options.onSuccess?.({ cookie })
      return { ok: true, credential: { cookie } }
    })

    expect(await login(event)).toBe(true)

    expect(qrcode).toHaveBeenCalledExactlyOnceWith()
    expect(runtime.modify).toHaveBeenCalledExactlyOnceWith('amagi', `cookies.${key}`, cookie)
    expect(runtime.reload).toHaveBeenCalledTimes(1)
    expect(runtime.render).toHaveBeenCalledWith(event, `${key}/qrcodeImg`, {
      share_url: 'https://example.com/qrcode',
      avatarUrl: 'https://example.com/avatar.png'
    })
    expect(recallMsg).toHaveBeenCalledWith(event.contact, 'tracked-message')
    expect(reply).toHaveBeenLastCalledWith('登录成功！用户登录凭证已保存至配置', { reply: true })
  })

  it('auth 会话过期时提示重新登录并保留原配置', async () => {
    const reply = vi.fn(async () => ({ messageId: 'failure-message' }))
    const event = { reply, bot: { recallMsg: vi.fn() } } as unknown as Message
    runtime.watch.mockResolvedValue({ ok: false, error: { kind: 'auth', code: 'COOKIE_EXPIRED', message: 'expired', retryable: false } })

    expect(await login(event)).toBe(true)

    expect(qrcode).toHaveBeenCalledExactlyOnceWith()
    expect(reply).toHaveBeenLastCalledWith('二维码已失效，请重新发起登录', { reply: true })
    expect(runtime.modify).not.toHaveBeenCalled()
    expect(runtime.reload).not.toHaveBeenCalled()
  })
})
