import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * 可变运行时：`vi.mock` 的工厂在模块加载时就固化，用例之间只能靠改这个对象切场景。
 *
 * 假 amagi client 的四个平台各挂一个 `fetcher`，douyin / xiaohongshu 上放了 `fetchThing`，
 * 调用结果按 `queue` 顺序吐出（失败信封 / 成功信封），用来驱动代理里的重放逻辑。
 */
const runtime = vi.hoisted(() => {
  const queue: unknown[] = []
  const douyinFetchThing = vi.fn(async () => queue.shift())
  const xiaohongshuFetchThing = vi.fn(async () => queue.shift())
  const client = {
    bilibili: { fetcher: {} },
    douyin: { fetcher: { fetchThing: douyinFetchThing } },
    kuaishou: { fetcher: {} },
    xiaohongshu: { fetcher: { fetchThing: xiaohongshuFetchThing } }
  }

  return {
    queue,
    client,
    douyinFetchThing,
    xiaohongshuFetchThing,
    createClient: vi.fn(() => client),
    handleRiskChallenge: vi.fn(),
    runWithVerifyContext: vi.fn(<T>(_event: unknown, fn: () => T): T => fn())
  }
})

vi.mock('@ikenxuan/amagi', () => ({ default: runtime.createClient }))

vi.mock('@/module/utils/Config', () => ({
  Config: {
    amagi: {
      timeout: 1000,
      'User-Agent': 'test-ua',
      cookies: {},
      proxy: { switch: false }
    }
  }
}))

vi.mock('@/module/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    mark: vi.fn(),
    runContext: vi.fn((fn: () => unknown) => ({ run: fn, logs: () => [] }))
  }
}))

vi.mock('@/module/utils/RiskVerify', () => ({
  handleRiskChallenge: runtime.handleRiskChallenge,
  runWithVerifyContext: runtime.runWithVerifyContext
}))

// —— 下面是 ErrorHandler 入口测试要用到的依赖，全部打桩 ——

vi.mock('@/module', () => ({ getBuildMetadata: vi.fn(() => ({})) }))

vi.mock('@/module/utils/EmojiReaction', () => ({
  EmojiReactionManager: class {
    add = vi.fn(async () => {})
    replace = vi.fn(async () => {})
    remove = vi.fn(async () => {})
    has = vi.fn(() => false)
    getPlatformEmojiId = vi.fn(() => 'emoji-id')
  }
}))

vi.mock('@/module/utils/ErrorHandler/render', () => ({ renderErrorImage: vi.fn(async () => ({})) }))

vi.mock('@/module/utils/ErrorHandler/sender', () => ({
  sendErrorToTrigger: vi.fn(async () => {}),
  sendErrorToMaster: vi.fn(async () => {}),
  sendErrorToAllMasters: vi.fn(async () => {})
}))

vi.mock('@/module/utils/ErrorHandler/strategy', () => ({ getStrategies: vi.fn(() => []) }))

vi.mock('@/module/utils/ErrorHandler/utils', () => ({
  injectBotToEventForPushTask: vi.fn(async (event: unknown) => event),
  isPushTask: vi.fn(() => false),
  parseLogsToStructured: vi.fn(() => [])
}))

import { AmagiError, douyinFetcher, xiaohongshuFetcher } from '@/module/utils/amagiClient'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler/handler'

/** 绕过类型看运行时行为：`fetchThing` 只存在于本用例的假 client 上 */
const probe = (fetcher: unknown) => fetcher as unknown as { fetchThing: () => Promise<unknown> }

/** 带风控挑战的失败信封（抖音 `error.challenge.url` 有值） */
const challengeEnvelope = () => ({
  success: false as const,
  message: '需要人机验证',
  error: {
    kind: 'risk' as const,
    code: 'ANTIBOT_PAGE' as const,
    message: '需要人机验证',
    retryable: false,
    challenge: { url: 'https://verify.example/x', session: 's-1' }
  },
  meta: { endpoint: 'douyin.comments' }
})

/** 不带挑战的失败信封（别的错） */
const otherFailureEnvelope = () => ({
  success: false as const,
  message: '别的错误',
  error: { kind: 'platform' as const, code: 'PLATFORM_ERROR' as const, message: '别的错误', retryable: false },
  meta: { endpoint: 'douyin.comments' }
})

/** 成功信封 */
const successEnvelope = () => ({ success: true as const, data: { ok: true }, meta: { endpoint: 'douyin.comments' } })

describe('风控验证接线：失败代理', () => {
  beforeEach(() => {
    runtime.queue.length = 0
    runtime.douyinFetchThing.mockClear()
    runtime.xiaohongshuFetchThing.mockClear()
    runtime.handleRiskChallenge.mockReset()
    runtime.runWithVerifyContext.mockClear()
  })

  it('带挑战的失败交给 RiskVerify；过码后重放一次拿到正常结果', async () => {
    runtime.queue.push(challengeEnvelope(), successEnvelope(), successEnvelope())
    runtime.handleRiskChallenge.mockImplementation(
      async (_error: unknown, _platform: string, replay: () => Promise<boolean>) => await replay()
    )

    const result = await probe(douyinFetcher).fetchThing()

    expect(runtime.handleRiskChallenge).toHaveBeenCalledTimes(1)
    expect(runtime.handleRiskChallenge.mock.calls[0][1]).toBe('douyin')
    expect(runtime.handleRiskChallenge.mock.calls[0][0]).toMatchObject({ rawError: { challenge: { url: 'https://verify.example/x' } } })
    // 首调 → 探针重放 → 过码后再重放，共 3 次
    expect(runtime.douyinFetchThing).toHaveBeenCalledTimes(3)
    expect(result).toMatchObject({ success: true })
  })

  it('平台名按各平台传入（小红书走 xiaohongshu）', async () => {
    runtime.queue.push(challengeEnvelope(), successEnvelope(), successEnvelope())
    runtime.handleRiskChallenge.mockImplementation(
      async (_error: unknown, _platform: string, replay: () => Promise<boolean>) => await replay()
    )

    await probe(xiaohongshuFetcher).fetchThing()

    expect(runtime.handleRiskChallenge.mock.calls[0][1]).toBe('xiaohongshu')
  })

  it('探针再次看到挑战（仍在风控里）时不重放，抛原错误', async () => {
    runtime.queue.push(challengeEnvelope(), challengeEnvelope())
    runtime.handleRiskChallenge.mockImplementation(
      async (_error: unknown, _platform: string, replay: () => Promise<boolean>) => await replay()
    )

    await expect(probe(douyinFetcher).fetchThing()).rejects.toThrow('需要人机验证')

    expect(runtime.douyinFetchThing).toHaveBeenCalledTimes(2)
  })

  it('探针撞上非风控失败时按「没通过」收场，抛的仍是原错误', async () => {
    runtime.queue.push(challengeEnvelope(), otherFailureEnvelope())
    runtime.handleRiskChallenge.mockImplementation(async (_error: unknown, _platform: string, replay: () => Promise<boolean>) => {
      try {
        return await replay()
      } catch {
        return false
      }
    })

    const failure = await probe(douyinFetcher)
      .fetchThing()
      .catch((error: unknown) => error)

    expect(failure).toBeInstanceOf(AmagiError)
    expect((failure as Error).message).toContain('需要人机验证')
  })

  it('RiskVerify 放弃（无事件 / 超时 / 达上限）时抛原错误、不重放', async () => {
    runtime.queue.push(challengeEnvelope())
    runtime.handleRiskChallenge.mockResolvedValue(false)

    await expect(probe(douyinFetcher).fetchThing()).rejects.toThrow('需要人机验证')

    expect(runtime.handleRiskChallenge).toHaveBeenCalledTimes(1)
    expect(runtime.douyinFetchThing).toHaveBeenCalledTimes(1)
  })

  it('不带挑战的失败也会先问一句 RiskVerify（判定权在它那边，命中即返回 false）', async () => {
    runtime.queue.push(otherFailureEnvelope())
    runtime.handleRiskChallenge.mockResolvedValue(false)

    await expect(probe(douyinFetcher).fetchThing()).rejects.toThrow('别的错误')

    expect(runtime.handleRiskChallenge).toHaveBeenCalledTimes(1)
  })

  it('成功结果原样返回，不经过 RiskVerify', async () => {
    runtime.queue.push(successEnvelope())

    const result = await probe(douyinFetcher).fetchThing()

    expect(result).toMatchObject({ success: true })
    expect(runtime.handleRiskChallenge).not.toHaveBeenCalled()
  })
})

describe('风控验证接线：命令入口的 ALS 上下文', () => {
  beforeEach(() => {
    runtime.runWithVerifyContext.mockClear()
  })

  it('消息命令在 runWithVerifyContext 里执行，事件被带进上下文', async () => {
    const event = { reply: vi.fn() }
    const handler = wrapWithErrorHandler(async (e: unknown) => e, { businessName: 'test' } as never)

    const result = await handler(event as never, () => undefined)

    expect(runtime.runWithVerifyContext).toHaveBeenCalledTimes(1)
    expect(runtime.runWithVerifyContext.mock.calls[0][0]).toBe(event)
    expect(result).toBe(event)
  })

  it('没有事件的调用（定时推送）不包上下文', async () => {
    const handler = wrapWithErrorHandler(async () => 'ok', { businessName: 'push' } as never)

    expect(await handler(undefined, () => undefined)).toBe('ok')
    expect(runtime.runWithVerifyContext).not.toHaveBeenCalled()
  })
})
