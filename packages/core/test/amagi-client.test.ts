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
    }
  }

  /** 由用例切换的下一次返回值 */
  const state: { envelope: unknown } = { envelope: undefined }

  const createClient = vi.fn((options: { cookies?: Record<string, string>; debug?: boolean }) => {
    const createPlatform = (platform: string) => ({
      // 平台工具集：不是 fetcher，不该被「失败必抛」的 Proxy 碰
      sign: { sample: () => `${platform}-signed` },
      fetcher: {
        readBoundCookie: async () => options.cookies?.[platform] ?? '',
        /** 同步方法：Proxy 必须原样放行，不能包成 async */
        describe: () => platform,
        fetchThing: async () => state.envelope
      }
    })

    return {
      events: { id: 'bus-1' },
      on: (event: string) => `subscribed:${event}`,
      once: (event: string) => `subscribed-once:${event}`,
      bilibili: createPlatform('bilibili'),
      douyin: createPlatform('douyin'),
      kuaishou: createPlatform('kuaishou'),
      xiaohongshu: createPlatform('xiaohongshu')
    }
  })

  return {
    config,
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
  default: runtime.createClient
}))

vi.mock('node-karin', () => ({
  logger: runtime.logger
}))

vi.mock('../src/module/utils/Config', () => ({
  Config: runtime.config
}))

import {
  AmagiError,
  bilibiliFetcher,
  douyinFetcher,
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

describe('Amagi Client 热重载', () => {
  it('配置变化后替换导出的 Fetcher，并且跳过重复重载', async () => {
    const reloadListener = vi.fn()
    registerAmagiReloadListener(reloadListener)

    expect(await probe(douyinFetcher).readBoundCookie()).toBe('old-douyin-cookie')

    runtime.config.amagi.cookies.douyin = 'new-douyin-cookie'

    expect(reloadAmagiConfig()).toBe(true)
    expect(await probe(douyinFetcher).readBoundCookie()).toBe('new-douyin-cookie')
    expect(reloadListener).toHaveBeenCalledTimes(1)
    expect(runtime.createClient).toHaveBeenCalledTimes(2)

    expect(reloadAmagiConfig()).toBe(false)
    expect(reloadListener).toHaveBeenCalledTimes(1)
    expect(runtime.createClient).toHaveBeenCalledTimes(2)
  })

  it('构造 client 时开 debug —— B站风控要读 error.raw 里的 v_voucher', () => {
    expect(runtime.createClient.mock.calls[0][0]).toMatchObject({ debug: true })
  })
})

describe('失败信封转异常', () => {
  it('v7 失败信封被判为失败并抛 AmagiError（顶层没有 code 也要认出来）', async () => {
    runtime.state.envelope = failureEnvelope

    await expect(probe(bilibiliFetcher).fetchThing()).rejects.toBeInstanceOf(AmagiError)

    const error = await probe(bilibiliFetcher)
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
    await expect(probe(bilibiliFetcher).fetchThing()).resolves.toEqual(successEnvelope)
  })

  it('同步方法不被包成 async', () => {
    expect(probe(bilibiliFetcher).describe()).toBe('bilibili')
  })
})

describe('softFetch 放行指定的平台业务码', () => {
  it('命中软错误码时返回失败信封而不是抛异常', async () => {
    runtime.state.envelope = failureEnvelope

    const result = await softFetch(
      () => probe(bilibiliFetcher).fetchThing() as Promise<never>,
      [SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED]
    )

    expect(isSoftFailure(result, SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED)).toBe(true)
    expect(result.success).toBe(false)
  })

  it('没命中的错误码照旧抛出', async () => {
    runtime.state.envelope = failureEnvelope
    await expect(softFetch(() => probe(bilibiliFetcher).fetchThing() as Promise<never>, [-352])).rejects.toBeInstanceOf(AmagiError)
  })

  it('成功时 isSoftFailure 为假，data 可直接读', async () => {
    runtime.state.envelope = successEnvelope
    const result = await softFetch(() => probe(bilibiliFetcher).fetchThing() as Promise<never>, [
      SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED
    ])

    expect(isSoftFailure(result, SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED)).toBe(false)
    if (!isSoftFailure(result, SOFT_ERROR_CODES.BILIBILI_COMMENTS_DISABLED)) {
      expect(result.data).toEqual({ hello: 'world' })
    }
  })
})

describe('原始 client 不被 Proxy 改写', () => {
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
