import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { douyinAppApi, getAppCommandTrans, getAppShareSettings, mkdir, readFile, resetPersistedPatterns, setPersistedPatterns, writeFile } =
  vi.hoisted(() => {
    const getAppShareSettings = vi.fn()
    const getAppCommandTrans = vi.fn()
    const douyinAppApi = { shareSettings: getAppShareSettings, commandTrans: getAppCommandTrans }
    let persistedPatterns: string | undefined
    const readFile = vi.fn(async () => {
      if (persistedPatterns === undefined) {
        const error = Object.assign(new Error('missing'), { code: 'ENOENT' })
        throw error
      }
      return persistedPatterns
    })
    const writeFile = vi.fn(async (_path: string, data: string) => {
      persistedPatterns = data
    })
    const mkdir = vi.fn(async () => undefined)
    const resetPersistedPatterns = () => {
      persistedPatterns = undefined
    }
    const setPersistedPatterns = (data: string) => {
      persistedPatterns = data
    }

    return {
      douyinAppApi,
      getAppCommandTrans,
      getAppShareSettings,
      mkdir,
      readFile,
      resetPersistedPatterns,
      setPersistedPatterns,
      writeFile
    }
  })

vi.mock('node-karin/axios', () => ({
  default: {
    create: () => ({
      get: vi.fn().mockRejectedValue(new Error('直接 HTTP 请求在该测试中被禁止')),
      post: vi.fn().mockRejectedValue(new Error('直接 HTTP 请求在该测试中被禁止'))
    })
  }
}))
vi.mock('node:fs/promises', () => ({ default: { mkdir, readFile, writeFile } }))
vi.mock('node-karin/root', () => ({ karinPathBase: 'C:/karin/base', karinPathTemp: 'C:/karin/temp' }))
vi.mock('@/root', () => ({ Root: { pluginName: 'karin-plugin-kkk' } }))
vi.mock('@/module/utils/Config', () => ({
  Config: { amagi: { timeout: 1000, 'User-Agent': 'test-agent', cookies: {}, proxy: { switch: false } } }
}))
vi.mock('@/module/utils/amagiClient', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/module/utils/amagiClient')>()
  return {
    AmagiError: original.AmagiError,
    douyinAppApi
  }
})
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

import { AmagiError } from '@/module/utils/amagiClient'
import {
  extractDouyinShareCommand,
  getDouyinShareCommandPatterns,
  initializeDouyinShareCommandPatterns,
  resolveDouyinShareCommand
} from '@/platform/douyin/shareCommand'

const signerUrl = 'https://signer.example'
const ruleCachePath = join('C:/karin/base', 'karin-plugin-kkk', 'data', 'douyin-share-command-patterns.json')
const tokenPattern = String.raw`\^\^([0-9A-Za-z]{11,14})\^\^`
// 本机缓存命中规则的缩减样本：字符类中实际列了多字符备选项。
const cachedTokenPattern = '[ωω|ŠŠ|ǚǚ|爱|^^]([0-9a-zA-Z]{11,16})[ωω|ŠŠ|ǚǚ|爱|^^]'
const wrappedCommandSamples = [
  {
    message: '48 10/24 :0pm y@g.ba 【阿蕾奇诺玩:/ 家我加您】长按复制打开抖音，即可阅读文章 ǚǚt7Ped3cw76ub9ŠŠ',
    command: 't7Ped3cw76ub9'
  },
  {
    message: '0 Z@z.TL :6pm 04/02 【v3】长按复:/ 制打开抖音，即可阅读文章 ^^eujdFxINxb9^^',
    command: 'eujdFxINxb9'
  }
]

const settingsResponse = (patterns: unknown, statusCode = 0) => ({
  success: true,
  data: { status_code: statusCode, command_patterns: patterns }
})
const failureMeta = {
  requestId: 'test-request',
  clientId: 'test-client',
  platform: 'douyin' as const,
  endpoint: 'douyin.appCommandTrans',
  durationMs: 1,
  attempts: 1
}
const appFailure = (message: string) =>
  new AmagiError({
    success: false,
    message,
    error: { kind: 'unavailable', code: 'APP_SIGNER_ERROR', message, retryable: false },
    meta: failureMeta
  })

beforeEach(() => {
  vi.clearAllMocks()
  resetPersistedPatterns()
  getAppShareSettings.mockReset()
  getAppCommandTrans.mockReset()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('extractDouyinShareCommand with APK command_patterns', () => {
  it('returns the capture of the first matching rule in server order', () => {
    const message = 'prefix ##AbCdEf123456## ^^eujdFxINxb9^^ suffix'
    const hashTokenPattern = '##([0-9A-Za-z]{11,14})##'

    expect(extractDouyinShareCommand(message, [tokenPattern, hashTokenPattern])).toBe('eujdFxINxb9')
    expect(extractDouyinShareCommand(message, [hashTokenPattern, tokenPattern])).toBe('AbCdEf123456')
  })

  it('skips an invalid server pattern and continues to the next configured pattern', () => {
    expect(extractDouyinShareCommand('xx ^^AbCdEf123456^^ yy', ['[', tokenPattern])).toBe('AbCdEf123456')
  })

  it('does not guess a code when no configured pattern matches', () => {
    expect(extractDouyinShareCommand('plain chat AbCdEf123456', [])).toBeUndefined()
    expect(extractDouyinShareCommand('plain chat AbCdEf123456', ['^(other)$'])).toBeUndefined()
  })

  it.each([
    { reason: 'has no capture group', pattern: String.raw`\^\^[0-9A-Za-z]{11,14}\^\^` },
    { reason: 'has an empty first capture', pattern: String.raw`\^\^()([0-9A-Za-z]{11,14})\^\^` },
    { reason: 'does not fill the first capture', pattern: String.raw`\^\^(X:)?([0-9A-Za-z]{11,14})\^\^` }
  ])('skips a matching rule that $reason', ({ pattern }) => {
    const message = 'prefix ^^eujdFxINxb9^^ suffix'

    expect(extractDouyinShareCommand(message, [pattern])).toBeUndefined()
    expect(extractDouyinShareCommand(message, [pattern, tokenPattern])).toBe('eujdFxINxb9')
  })

  it.each(['爱爱eujdFxINxb9爱爱', '^^^eujdFxINxb9^^^', '😄ǚǚeujdFxINxb9ŠŠ…'])('ignores surrounding symbols in %s', (message) => {
    expect(extractDouyinShareCommand(message, [cachedTokenPattern])).toBe('eujdFxINxb9')
  })

  it('keeps meaningful symbols and uses the first capture even when the rule has nested groups', () => {
    const structuredPattern = '§(€([0-9A-Za-z]{4})€([0-9A-Za-z]{7})€)★'

    expect(extractDouyinShareCommand('§€eujd€FxINxb9€★', [structuredPattern])).toBe('€eujd€FxINxb9€')
  })
})

describe('resolveDouyinShareCommand with an APK pattern match', () => {
  it('passes only the captured command to the App fetcher', async () => {
    const message = 'share ^^eujdFxINxb9^^'
    const command = extractDouyinShareCommand(message, [tokenPattern])
    getAppCommandTrans.mockResolvedValue({ success: true, data: { status_code: 0, extra_info: { object_id: '9007199254740993' } } })

    await expect(resolveDouyinShareCommand(command!)).resolves.toBe('9007199254740993')
    expect(getAppCommandTrans).toHaveBeenCalledWith(
      expect.objectContaining({
        command: 'eujdFxINxb9',
        clipboard_timestamp: expect.any(Number),
        patterns: ['email', 'datetime'],
        start_from: 'hot'
      })
    )
  })

  it.each(wrappedCommandSamples)('sends only $command from share text with repeated delimiters', async ({ message, command }) => {
    const match = extractDouyinShareCommand(message, [cachedTokenPattern])
    getAppCommandTrans.mockResolvedValue({ success: true, data: { status_code: 0, extra_info: { object_id: '9007199254740993' } } })

    expect(match).toBe(command)
    await expect(resolveDouyinShareCommand(match!)).resolves.toBe('9007199254740993')
    expect(getAppCommandTrans).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ command }))
  })

  it('reports an empty command response without claiming the guest Cookie is invalid', async () => {
    getAppCommandTrans.mockRejectedValue(
      new AmagiError({
        success: false,
        message: '默认的 Cookie 过期提示',
        error: { kind: 'parse', code: 'EMPTY_RESPONSE', message: '默认的 Cookie 过期提示', retryable: false, http: { status: 200 } },
        meta: failureMeta
      })
    )

    await expect(resolveDouyinShareCommand('eujdFxINxb9')).rejects.toThrow('抖音口令接口返回空响应（HTTP 200）')
    expect(getAppCommandTrans).toHaveBeenCalledOnce()
  })

  it('keeps guest preparation errors separate from an empty business response', async () => {
    getAppCommandTrans.mockRejectedValue(
      new AmagiError({
        success: false,
        message: '游客 Cookie 回调未下发 ttwid',
        error: { kind: 'parse', code: 'EMPTY_RESPONSE', message: '游客 Cookie 回调未下发 ttwid', retryable: false },
        meta: failureMeta
      })
    )
    await expect(resolveDouyinShareCommand('eujdFxINxb9')).rejects.toThrow('游客 Cookie 回调未下发 ttwid')
  })
})

describe('getDouyinShareCommandPatterns', () => {
  it('shares one rule cache for normalized base URL variants', async () => {
    getAppShareSettings.mockResolvedValue(settingsResponse(['base-url-rule']))
    await expect(getDouyinShareCommandPatterns('https://cache-base.signer.example')).resolves.toEqual(['base-url-rule'])
    await expect(getDouyinShareCommandPatterns('  https://CACHE-BASE.signer.example:443/  ')).resolves.toEqual(['base-url-rule'])
    expect(getAppShareSettings).toHaveBeenCalledOnce()
  })

  it('persists the canonical base URL without changing the signUrl cache field', async () => {
    getAppShareSettings.mockResolvedValue(settingsResponse(['canonical-rule']))
    await expect(initializeDouyinShareCommandPatterns(' https://WRITE-BASE.signer.example:443/ ')).resolves.toEqual(['canonical-rule'])
    expect(JSON.parse(writeFile.mock.calls[0][1])).toMatchObject({
      signUrl: 'https://write-base.signer.example',
      patterns: ['canonical-rule']
    })
  })

  it('restores a base URL cache with a trailing slash without requesting again', async () => {
    setPersistedPatterns(
      JSON.stringify({ signUrl: 'https://read-base.signer.example/', patterns: ['persisted-base'], expiresAt: Date.now() + 60000 })
    )
    getAppShareSettings.mockResolvedValue(settingsResponse(['network-rule']))
    await expect(getDouyinShareCommandPatterns('https://read-base.signer.example')).resolves.toEqual(['persisted-base'])
    expect(getAppShareSettings).not.toHaveBeenCalled()
  })

  it('applies failed-load cooldown to all equivalent base URL forms', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-21T12:00:00.000Z'))
    getAppShareSettings.mockRejectedValueOnce(appFailure('HTTP 503')).mockResolvedValueOnce(settingsResponse(['retried']))
    await expect(getDouyinShareCommandPatterns('https://retry-base.signer.example')).rejects.toThrow(/HTTP 503/)
    await expect(getDouyinShareCommandPatterns('https://RETRY-BASE.signer.example:443/')).resolves.toEqual([])
    expect(getAppShareSettings).toHaveBeenCalledOnce()
    vi.setSystemTime(new Date('2026-11-21T12:00:30.001Z'))
    await expect(getDouyinShareCommandPatterns('https://retry-base.signer.example/')).resolves.toEqual(['retried'])
    expect(getAppShareSettings).toHaveBeenCalledTimes(2)
  })

  it('loads APK share settings through the imported shared App API', async () => {
    const patterns = ['first-pattern', tokenPattern]
    getAppShareSettings.mockResolvedValue(settingsResponse(patterns))

    await expect(getDouyinShareCommandPatterns(signerUrl)).resolves.toEqual(patterns)

    expect(getAppShareSettings).toHaveBeenCalledOnce()
    expect(getAppCommandTrans).not.toHaveBeenCalled()
  })

  it('rejects signer URL path prefixes that Amagi cannot address', async () => {
    await expect(getDouyinShareCommandPatterns('https://signer.example/proxy/v1/app/sign')).rejects.toThrow(/路径前缀/)
    expect(getAppShareSettings).not.toHaveBeenCalled()
  })

  it('uses the same imported App API for startup settings and command translation', async () => {
    getAppShareSettings.mockResolvedValue(settingsResponse(['rule']))
    getAppCommandTrans.mockResolvedValue({ success: true, data: { status_code: 0, schema_detail: { aweme_id: '9007199254740993' } } })

    const address = 'http://app-session.signer.example:8787'
    await expect(initializeDouyinShareCommandPatterns(address)).resolves.toEqual(['rule'])
    await expect(resolveDouyinShareCommand('test')).resolves.toBe('9007199254740993')
    expect(douyinAppApi.shareSettings).toHaveBeenCalledExactlyOnceWith()
    expect(douyinAppApi.commandTrans).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ command: 'test' }))
  })

  it('rejects a non-zero settings status code', async () => {
    getAppShareSettings.mockResolvedValue(settingsResponse([], 1))

    await expect(getDouyinShareCommandPatterns('https://bad-status.signer.example')).rejects.toThrow()
  })

  it('rejects a settings response with non-string patterns', async () => {
    getAppShareSettings.mockResolvedValue(settingsResponse(['valid', 7]))

    await expect(getDouyinShareCommandPatterns('https://bad-patterns.signer.example')).rejects.toThrow(/command_patterns/)
  })

  it('caches successful patterns for one hour', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-20T12:00:00.000Z'))
    getAppShareSettings.mockResolvedValueOnce(settingsResponse(['first'])).mockResolvedValueOnce(settingsResponse(['second']))
    const cacheKey = 'https://ttl.signer.example'

    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['first'])
    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['first'])
    expect(getAppShareSettings).toHaveBeenCalledOnce()

    vi.setSystemTime(new Date('2026-11-20T13:00:00.001Z'))
    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['second'])
    expect(getAppShareSettings).toHaveBeenCalledTimes(2)
  })

  it('reads a valid cached pattern file from the plugin data directory without a network refresh', async () => {
    const cacheKey = 'https://persisted-read.signer.example'
    setPersistedPatterns(JSON.stringify({ signUrl: cacheKey, patterns: ['persisted-pattern'], expiresAt: Date.now() + 60000 }))

    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['persisted-pattern'])

    expect(readFile).toHaveBeenCalledWith(ruleCachePath, 'utf8')
    expect(getAppShareSettings).not.toHaveBeenCalled()
  })

  it('fetches once during initialization and persists the patterns under the plugin data directory', async () => {
    const cacheKey = 'https://startup-refresh.signer.example'
    getAppShareSettings.mockResolvedValue(settingsResponse(['startup-pattern']))

    await expect(initializeDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['startup-pattern'])

    expect(getAppShareSettings).toHaveBeenCalledOnce()
    expect(mkdir).toHaveBeenCalledWith(join('C:/karin/base', 'karin-plugin-kkk', 'data'), { recursive: true })
    expect(writeFile).toHaveBeenCalledOnce()
    expect(writeFile).toHaveBeenCalledWith(ruleCachePath, expect.any(String), 'utf8')
    expect(JSON.parse(writeFile.mock.calls[0][1])).toEqual(
      expect.objectContaining({ signUrl: cacheKey, patterns: ['startup-pattern'], expiresAt: expect.any(Number) })
    )
  })

  it('coalesces concurrent cache misses into one settings request', async () => {
    let releaseSettings!: (value: ReturnType<typeof settingsResponse>) => void
    getAppShareSettings.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          releaseSettings = resolve
        })
    )
    const cacheKey = 'https://concurrent.signer.example'
    const both = expect(Promise.all([getDouyinShareCommandPatterns(cacheKey), getDouyinShareCommandPatterns(cacheKey)])).resolves.toEqual([
      ['shared'],
      ['shared']
    ])

    await vi.waitFor(() => expect(getAppShareSettings).toHaveBeenCalledOnce())
    releaseSettings(settingsResponse(['shared']))

    await both
  })

  it('backs off after a failed load and retries after the cooldown', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-21T12:00:00.000Z'))
    getAppShareSettings.mockRejectedValueOnce(appFailure('HTTP 503')).mockResolvedValueOnce(settingsResponse(['retried']))
    const cacheKey = 'https://retry-backoff.signer.example'

    await expect(getDouyinShareCommandPatterns(cacheKey)).rejects.toThrow(/HTTP 503/)
    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual([])
    expect(getAppShareSettings).toHaveBeenCalledOnce()

    vi.setSystemTime(new Date('2026-11-21T12:00:30.001Z'))
    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['retried'])
    expect(getAppShareSettings).toHaveBeenCalledTimes(2)
  })

  it('keeps the last successful patterns available during refresh backoff', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-21T12:00:00.000Z'))
    getAppShareSettings.mockResolvedValueOnce(settingsResponse(['stale-but-valid'])).mockRejectedValueOnce(new Error('HTTP 503'))
    const cacheKey = 'https://stale-patterns.signer.example'

    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['stale-but-valid'])
    vi.setSystemTime(new Date('2026-11-21T13:00:00.001Z'))
    await expect(getDouyinShareCommandPatterns(cacheKey)).rejects.toThrow(/HTTP 503/)
    await expect(getDouyinShareCommandPatterns(cacheKey)).resolves.toEqual(['stale-but-valid'])
    expect(getAppShareSettings).toHaveBeenCalledTimes(2)
  })
})
