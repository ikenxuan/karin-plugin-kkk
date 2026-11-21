import type { WatchOptions } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  qrcode: vi.fn(),
  watch: vi.fn(),
  render: vi.fn(),
  modify: vi.fn(),
  reload: vi.fn(),
  writeFileSync: vi.fn()
}))

vi.mock('@/module/utils/amagiClient', () => ({
  getAmagiClient: () => ({ douyin: { web: { auth: { qrcode: runtime.qrcode } } } }),
  reloadAmagiConfig: runtime.reload
}))
vi.mock('@/module', () => ({ Common: { tempDri: { default: 'D:/test/login/' } }, Render: runtime.render }))
vi.mock('@/module/utils/bot', () => ({ resolveTriggerAvatarUrl: async () => 'https://example.test/avatar.png' }))
vi.mock('@/module/utils/Config', () => ({ Config: { Modify: runtime.modify } }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn(), mark: vi.fn(), error: vi.fn() } }))
vi.mock('node:fs', () => ({ default: { writeFileSync: runtime.writeFileSync } }))
vi.mock('node-karin', () => ({ karin: { ctx: vi.fn() } }))

import { douyinLogin } from '@/platform/douyin/login'

const createEvent = () => {
  const reply = vi.fn(async (_message: unknown) => ({ messageId: 'message-1' }))
  const recallMsg = vi.fn(async () => undefined)
  const event = { reply, contact: { scene: 'friend', peer: 'user-1' }, bot: { recallMsg } } as unknown as Message
  return { event, reply, recallMsg }
}

describe('抖音扫码登录消费者的 v7 Web auth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runtime.qrcode.mockReturnValue({ watch: runtime.watch })
    runtime.render.mockResolvedValue([{ type: 'image', file: 'base64://aW1hZ2U=' }])
    runtime.modify.mockResolvedValue(undefined)
    runtime.reload.mockReturnValue(true)
  })

  it('从原始客户端的 web.auth 获取会话，保留渲染、凭证保存和撤回流程', async () => {
    const cookie = 'sessionid=s1; sessionid_ss=s2; sid_guard=s3; uid_tt=u1; uid_tt_ss=u2; ttwid=t1'
    runtime.watch.mockImplementation(async (options: WatchOptions) => {
      await options.onQrcode?.({
        content: 'https://example.test/qrcode',
        token: 'token-1',
        expiresAt: Date.now() + 60000,
        expiresInSec: 60
      })
      await options.onScanned?.()
      await options.onSuccess?.({ cookie })
      return { ok: true, credential: { cookie } }
    })
    const { event, reply, recallMsg } = createEvent()

    expect(await douyinLogin(event)).toBe(true)

    expect(runtime.qrcode).toHaveBeenCalledExactlyOnceWith()
    expect(runtime.render).toHaveBeenCalledWith(event, 'douyin/qrcodeImg', {
      share_url: 'https://example.test/qrcode',
      avatarUrl: 'https://example.test/avatar.png'
    })
    expect(runtime.modify).toHaveBeenCalledWith('amagi', 'cookies.douyin', cookie)
    expect(runtime.reload).toHaveBeenCalledOnce()
    expect(recallMsg).toHaveBeenCalledTimes(2)
    expect(reply).toHaveBeenLastCalledWith('登录成功！用户登录凭证已保存至配置', { reply: true })
  })

  it('新 auth 会话返回风控失败时不保存凭证，沿用原有失败提示', async () => {
    runtime.watch.mockResolvedValue({ ok: false, error: { kind: 'risk', code: 'RISK_CONTROL', message: '请求被拦截', retryable: false } })
    const { event, reply } = createEvent()

    expect(await douyinLogin(event)).toBe(true)

    expect(runtime.qrcode).toHaveBeenCalledExactlyOnceWith()
    expect(runtime.modify).not.toHaveBeenCalled()
    expect(runtime.reload).not.toHaveBeenCalled()
    expect(reply).toHaveBeenLastCalledWith('登录请求被抖音风控拦截：请求被拦截\n请稍后再试', { reply: true })
  })
})
