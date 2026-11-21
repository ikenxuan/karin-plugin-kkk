import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'

/** 一条 v7 失败信封，平台业务码 12061（B站 UP 主关闭评论区） */
const failureEnvelope = {
  success: false as const,
  message: 'UP主已关闭评论区',
  meta: { requestId: 'req-1', clientId: 'client-1', platform: 'bilibili', endpoint: 'bilibili.comments', durationMs: 12, attempts: 1 },
  error: {
    kind: 'forbidden' as const,
    code: 'PLATFORM_ERROR' as const,
    message: 'UP主已关闭评论区',
    retryable: false,
    platform: { code: 12061 },
    http: { status: 200 },
    raw: { code: 12061, data: { v_voucher: 'voucher-abc' } }
  }
}

/** 一条 v7 成功信封 */
const successEnvelope = {
  success: true as const,
  data: { hello: 'world' },
  message: '获取成功',
  meta: { requestId: 'req-2', clientId: 'client-1', platform: 'bilibili', endpoint: 'bilibili.comments', durationMs: 8, attempts: 1 }
}

const runtime = vi.hoisted(() => {
  const config = {
    amagi: {
      timeout: 30000,
      'User-Agent': 'test-agent',
      proxy: { switch: false },
      cookies: {
        bilibili: 'bilibili-cookie',
        douyin: 'old-douyin-cookie',
        kuaishou: 'kuaishou-cookie',
        xiaohongshu: 'xiaohongshu-cookie'
      }
    },
    douyin: { switch: true },
    laboratory: { messageHooks: { switch: false, signUrl: '' } }
  }

  /** 由用例切换的下一次返回值 */
  const state: { envelope: unknown } = { envelope: undefined }

  const legacyFactory = vi.fn()

  /** 新门面 fake：没有 fetcher/login，业务方法直接挂在平台及端上。 */
  const createClient = vi.fn(
    (options: {
      douyin?: { web?: { cookie?: string }; app?: object }
      bilibili?: { cookie?: string }
      kuaishou?: { cookie?: string }
      xiaohongshu?: { cookie?: string }
    }) => {
      const createApi = (platform: string, cookie = '') => {
        const request = { request: vi.fn(), get: vi.fn(), post: vi.fn(), axios: { get: vi.fn() } }
        const session = { start: vi.fn(), serialize: vi.fn(), next: vi.fn() }
        return {
          readBoundCookie: async () => cookie,
          describe: () => platform,
          fetchThing: async () => state.envelope,
          request,
          auth: {
            status: async () => state.envelope,
            qrcode: () => session,
            resume: () => session,
            refresh: async () => ({ ok: false, error: { message: 'refresh failed' } })
          }
        }
      }
      return {
        events: { id: 'bus-1' },
        on: (event: string) => `subscribed:${event}`,
        once: (event: string) => `subscribed-once:${event}`,
        bilibili: createApi('bilibili', options.bilibili?.cookie),
        douyin: {
          web: createApi('douyin', options.douyin?.web?.cookie),
          app: {
            ...createApi('douyin'),
            shareSettings: vi.fn(),
            commandTrans: vi.fn(),
            guest: { snapshot: vi.fn(), refresh: vi.fn() }
          }
        },
        kuaishou: createApi('kuaishou', options.kuaishou?.cookie),
        xiaohongshu: createApi('xiaohongshu', options.xiaohongshu?.cookie)
      }
    }
  )

  return {
    config,
    legacyFactory,
    createClient,
    state,
    logger: {
      debug: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      mark: vi.fn()
    }
  }
})

vi.mock('@ikenxuan/amagi', () => ({
  default: runtime.createClient,
  createAmagiClient: runtime.legacyFactory
}))

vi.mock('@/module/utils/logger', () => ({
  logger: runtime.logger
}))

vi.mock('node-karin/root', () => ({ karinPathBase: 'C:/karin/base', karinPathTemp: 'C:/karin/temp' }))
vi.mock('@/root', () => ({ Root: { pluginName: 'karin-plugin-kkk' } }))

vi.mock('../src/module/utils/Config', () => ({
  Config: runtime.config
}))

vi.mock('@/module/utils/RiskVerify', () => ({ handleRiskChallenge: vi.fn().mockResolvedValue(false) }))

import {
  AmagiBase,
  AmagiError,
  bilibiliApi,
  douyinAppApi,
  douyinWebApi,
  getAmagiClient,
  isSoftFailure,
  registerAmagiReloadListener,
  reloadAmagiConfig,
  SOFT_ERROR_CODES,
  softFetch
} from '../src/module/utils/amagiClient'

/** 绕过类型看运行时行为：这些方法只存在于本用例的假 client 上 */
const probe = (fetcher: unknown) =>
  fetcher as unknown as {
    readBoundCookie: () => Promise<string>
    describe: () => string
    fetchThing: () => Promise<unknown>
  }

describe('默认工厂接入', () => {
  it('共享客户端直接提供 v7 平台/端方法，不再依赖废弃工厂的旧门面', () => {
    const calls = runtime.createClient.mock.calls.length
    const previous = runtime.config.amagi.timeout
    runtime.config.amagi.timeout = previous + 1
    try {
      expect(reloadAmagiConfig()).toBe(true)
      const raw = getAmagiClient()
      expect(raw.douyin).toHaveProperty('web')
      expect(raw.douyin).toHaveProperty('app')
      expect(raw.bilibili).not.toHaveProperty('fetcher')
      expect(raw.bilibili).toHaveProperty('auth')
      expect(runtime.createClient).toHaveBeenCalledTimes(calls + 1)
      expect(runtime.legacyFactory).not.toHaveBeenCalled()
    } finally {
      runtime.config.amagi.timeout = previous
      reloadAmagiConfig()
    }
  })

  it('Web 网络身份仅写入对应平台，App 不继承浏览器 UA、Cookie 或代理', () => {
    const previous = runtime.config.amagi['User-Agent']
    runtime.config.amagi['User-Agent'] = 'web-test-agent'
    try {
      expect(reloadAmagiConfig()).toBe(true)
      expect(runtime.createClient.mock.calls.at(-1)?.[0]).toMatchObject({
        request: { timeout: 30000 },
        douyin: {
          web: { cookie: 'old-douyin-cookie', request: { headers: { 'User-Agent': 'web-test-agent' }, proxy: false } },
          app: { session: false, request: { timeout: 30000, proxy: false } }
        },
        bilibili: { cookie: 'bilibili-cookie' },
        kuaishou: { cookie: 'kuaishou-cookie' },
        xiaohongshu: { cookie: 'xiaohongshu-cookie' },
        debug: true
      })
      const options = runtime.createClient.mock.calls.at(-1)?.[0]
      expect(options).not.toHaveProperty('cookies')
      expect(options).not.toHaveProperty('douyinApp')
      expect(options).not.toHaveProperty('request.headers')
      expect(options).not.toHaveProperty('request.proxy')
      expect(options).not.toHaveProperty('douyin.app.cookie')
      expect(options).not.toHaveProperty('douyin.app.request.headers')
    } finally {
      runtime.config.amagi['User-Agent'] = previous
      reloadAmagiConfig()
    }
  })
})

describe('Amagi Client 热重载', () => {
  it('解析或推送处理器不会各自创建客户端，读取的是同一份最新配置', () => {
    const calls = runtime.createClient.mock.calls.length
    const first = new AmagiBase()
    const second = new AmagiBase()
    expect(runtime.createClient).toHaveBeenCalledTimes(calls)
    expect(first.rawAmagi).toBe(getAmagiClient())
    expect(second.amagi).toBe(first.amagi)

    const previous = runtime.config.amagi.timeout
    runtime.config.amagi.timeout = previous + 1
    try {
      expect(reloadAmagiConfig()).toBe(true)
      expect(runtime.createClient).toHaveBeenCalledTimes(calls + 1)
      expect(second.rawAmagi).toBe(getAmagiClient())
      expect(first.amagi.douyin.web).toBe(douyinWebApi)
    } finally {
      runtime.config.amagi.timeout = previous
      reloadAmagiConfig()
    }
  })

  it('配置变化后替换导出的 Fetcher，并且跳过重复重载', async () => {
    const reloadListener = vi.fn()
    const callsBeforeReload = runtime.createClient.mock.calls.length
    const unregister = registerAmagiReloadListener(reloadListener)

    try {
      expect(await probe(douyinWebApi).readBoundCookie()).toBe('old-douyin-cookie')
      runtime.config.amagi.cookies.douyin = 'new-douyin-cookie'
      expect(reloadAmagiConfig()).toBe(true)
      expect(await probe(douyinWebApi).readBoundCookie()).toBe('new-douyin-cookie')
      expect(reloadListener).toHaveBeenCalledTimes(1)
      expect(runtime.createClient).toHaveBeenCalledTimes(callsBeforeReload + 1)

      expect(reloadAmagiConfig()).toBe(false)
      expect(reloadListener).toHaveBeenCalledTimes(1)
      expect(runtime.createClient).toHaveBeenCalledTimes(callsBeforeReload + 1)
    } finally {
      unregister()
      runtime.config.amagi.cookies.douyin = 'old-douyin-cookie'
      reloadAmagiConfig()
    }
  })

  it('迁移入口保留 v7 调试信息，实验室关闭时不初始化 App 会话', () => {
    const previous = runtime.config.amagi.timeout
    runtime.config.amagi.timeout = previous + 1
    try {
      expect(reloadAmagiConfig()).toBe(true)
      expect(runtime.createClient.mock.calls.at(-1)?.[0]).toMatchObject({
        debug: true,
        douyin: { app: { session: false } }
      })
    } finally {
      runtime.config.amagi.timeout = previous
      reloadAmagiConfig()
    }
  })

  it('导入的 App API 随配置重载实时更新，等价的 signer URL 不重建实例', () => {
    const messageHooks = runtime.config.laboratory.messageHooks
    messageHooks.switch = true
    messageHooks.signUrl = '  https://SIGNER.example:443/  '
    try {
      const calls = runtime.createClient.mock.calls.length
      expect(reloadAmagiConfig()).toBe(true)
      expect(runtime.createClient).toHaveBeenCalledTimes(calls + 1)
      expect(runtime.createClient.mock.calls.at(-1)?.[0]).toMatchObject({
        douyin: {
          web: { cookie: runtime.config.amagi.cookies.douyin },
          app: {
            signerBaseUrl: 'https://signer.example',
            sessionFile: join('C:/karin/base', 'karin-plugin-kkk', 'data', 'douyin-app-session.json'),
            request: { timeout: runtime.config.amagi.timeout, proxy: false }
          }
        }
      })

      messageHooks.signUrl = 'https://signer.example'
      expect(reloadAmagiConfig()).toBe(false)
      const api = douyinAppApi
      expect(api.guest).toBe(getAmagiClient().douyin.app.guest)
      expect(api.request).toBe(getAmagiClient().douyin.app.request)
      expect(runtime.createClient).toHaveBeenCalledTimes(calls + 1)

      messageHooks.signUrl = 'https://new-signer.example'
      expect(reloadAmagiConfig()).toBe(true)
      expect(douyinAppApi).not.toBe(api)
      expect(douyinAppApi.guest).toBe(getAmagiClient().douyin.app.guest)
      expect(douyinAppApi.request).toBe(getAmagiClient().douyin.app.request)
      expect(runtime.createClient).toHaveBeenCalledTimes(calls + 2)
    } finally {
      messageHooks.switch = false
      messageHooks.signUrl = ''
      reloadAmagiConfig()
    }
  })
})

describe('失败信封转异常', () => {
  it('v7 失败信封被判为失败并抛 AmagiError（顶层没有 code 也要认出来）', async () => {
    runtime.state.envelope = failureEnvelope

    await expect(probe(bilibiliApi).fetchThing()).rejects.toBeInstanceOf(AmagiError)

    const error = await probe(bilibiliApi)
      .fetchThing()
      .catch((err: unknown) => err as AmagiError)

    // code 取平台业务码，调用点按它分流（-352 风控 / -111 csrf / 12061 评论区关闭）
    expect(error.code).toBe(12061)
    expect(error.kind).toBe('forbidden')
    expect(error.amagiCode).toBe('PLATFORM_ERROR')
    expect(error.reason).toBe('UP主已关闭评论区')
    expect(error.retryable).toBe(false)
    expect(error.httpStatus).toBe(200)
    // data 是原始响应体，风控流程从这里读 v_voucher
    expect(error.data).toEqual({ code: 12061, data: { v_voucher: 'voucher-abc' } })
    expect(error.envelope.meta.requestId).toBe('req-1')
  })

  it('成功信封原样返回', async () => {
    runtime.state.envelope = successEnvelope
    await expect(probe(bilibiliApi).fetchThing()).resolves.toEqual(successEnvelope)
  })

  it('message 是一行摘要，不是信封转储', async () => {
    runtime.state.envelope = failureEnvelope
    const error = await probe(bilibiliApi)
      .fetchThing()
      .catch((err: unknown) => err as AmagiError)

    // 原先这里是整个信封的 util.inspect 彩色转储（实测 1.6 KB 起），错误图把它
    // 当 stack 渲染、logger.warn 又把它直接拼进日志行。结构化字段现在各有属性、
    // 错误图也单独成块渲染，转储只剩重复。
    expect(error.message).toBe(
      '[forbidden/PLATFORM_ERROR] UP主已关闭评论区 (bilibili.comments 平台码 12061 HTTP 200 requestId=req-1 attempts=1)'
    )
    expect(error.message).not.toContain('\n')
    // 纯平台原文仍然单独可取
    expect(error.reason).toBe('UP主已关闭评论区')
  })

  it('stack 只有一行摘要 + 调用帧，同一份数据不再出现多遍', async () => {
    runtime.state.envelope = failureEnvelope
    const error = await probe(bilibiliApi)
      .fetchThing()
      .catch((err: unknown) => err as AmagiError)

    const lines = String(error.stack).split('\n')
    expect(lines[0]).toContain('[forbidden/PLATFORM_ERROR]')
    // 除首行外全是调用帧
    expect(lines.slice(1).every((line) => /^\s+at\s/.test(line))).toBe(true)
    // 转储时代这些会各出现两到四遍
    expect(lines.filter((line) => line.includes('requestId')).length).toBe(1)
    expect(String(error.stack)).not.toContain('rawError')
    expect(String(error.stack)).not.toContain('envelope')
  })

  it('同步方法不被包成 async', () => {
    expect(probe(bilibiliApi).describe()).toBe('bilibili')
  })
})

describe('softFetch 放行指定的平台业务码', () => {
  it('命中软错误码时返回失败信封而不是抛异常', async () => {
    runtime.state.envelope = failureEnvelope

    const result = await softFetch(() => probe(bilibiliApi).fetchThing() as Promise<never>, [SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED])

    expect(isSoftFailure(result, SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED)).toBe(true)
    expect(result.success).toBe(false)
  })

  it('没命中的错误码照旧抛出', async () => {
    runtime.state.envelope = failureEnvelope
    await expect(softFetch(() => probe(bilibiliApi).fetchThing() as Promise<never>, [-352])).rejects.toBeInstanceOf(AmagiError)
  })

  it('成功时 isSoftFailure 为假，data 可直接读', async () => {
    runtime.state.envelope = successEnvelope
    const result = await softFetch(() => probe(bilibiliApi).fetchThing() as Promise<never>, [SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED])

    expect(isSoftFailure(result, SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED)).toBe(false)
    if (!isSoftFailure(result, SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED)) {
      expect(result.data).toEqual({ hello: 'world' })
    }
  })
})

describe('原始 client 不被 Proxy 改写', () => {
  it('request 模块及其 get/post 成员、App guest 管理器不被业务代理替换', () => {
    const raw = getAmagiClient()
    expect(bilibiliApi.request).toBe(raw.bilibili.request)
    expect(bilibiliApi.request.get).toBe(raw.bilibili.request.get)
    expect(bilibiliApi.request.post).toBe(raw.bilibili.request.post)
    expect(douyinAppApi.request).toBe(raw.douyin.app.request)
    expect(douyinAppApi.guest).toBe(raw.douyin.app.guest)
  })

  it('扫码会话保持同步返回、恢复会话保持原对象，非信封 auth 失败不变成异常', async () => {
    const raw = getAmagiClient()
    expect(douyinWebApi.auth.qrcode()).toBe(raw.douyin.web.auth.qrcode())
    expect(bilibiliApi.auth.resume({} as never)).toBe(raw.bilibili.auth.resume({} as never))
    await expect(bilibiliApi.auth.refresh({} as never)).resolves.toEqual({ ok: false, error: { message: 'refresh failed' } })
  })

  it('auth 端点与 App 数据端点的失败信封仍进入统一异常代理', async () => {
    runtime.state.envelope = failureEnvelope
    await expect(bilibiliApi.auth.status()).rejects.toBeInstanceOf(AmagiError)
    await expect(probe(douyinAppApi).fetchThing()).rejects.toBeInstanceOf(AmagiError)
  })

  it('on / once 保持同步返回值，events 原样', () => {
    const client = getAmagiClient() as unknown as {
      events: { id: string }
      on: (event: string) => string
      once: (event: string) => string
    }

    expect(client.events).toEqual({ id: 'bus-1' })
    expect(client.on('api:error')).toBe('subscribed:api:error')
    expect(client.once('api:error')).toBe('subscribed-once:api:error')
  })
})
