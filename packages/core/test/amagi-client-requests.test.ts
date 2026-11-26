import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  requests: [] as Array<{ url: string; timeout?: number; proxy: unknown; headers: Record<string, unknown>; body?: unknown }>,
  bilibiliCode: 0,
  appEmptyResponse: false,
  config: {
    amagi: {
      timeout: 12345,
      'User-Agent': 'web-browser-agent',
      proxy: { switch: true, protocol: 'http', host: 'proxy.test', port: 9000 },
      cookies: { bilibili: 'SESSDATA=bili-test', douyin: 'sessionid=web-test', kuaishou: '', xiaohongshu: '' }
    },
    douyin: { switch: true },
    laboratory: { douyinApp: { commandParse: true, dailyWork: false, appComments: false, signUrl: 'http://signer.test' } }
  }
}))

// 使用真实默认工厂和执行管线，仅替换外部 HTTP，并导入测试游客快照以避免注册与文件读写。
vi.mock('@ikenxuan/amagi', async (importOriginal) => {
  const sdk = await importOriginal<typeof import('@ikenxuan/amagi')>()
  const session: import('@ikenxuan/amagi').DouyinAppGuestSnapshot = {
    version: 1,
    device: {
      device_id: '123456789',
      install_id: '987654321',
      openudid: '0123456789abcdef',
      cdid: '00000000-0000-0000-0000-000000000001',
      clientudid: '00000000-0000-0000-0000-000000000002',
      x_tt_dt: '',
      user_agent: 'com.ss.android.ugc.aweme/400700 (Linux; Android 14; zh; TestPhone)',
      profile: {
        device_type: 'TestPhone',
        device_brand: 'fixture',
        ac: 'wifi',
        channel: 'aweGW',
        language: 'zh',
        os_api: '34',
        os_version: '14',
        resolution: '1080*2400',
        dpi: '480',
        first_launch_timestamp: '1700000000',
        host_abi: 'arm64-v8a'
      }
    },
    cookies: { cookies: [{ key: 'ttwid', value: 'app-test', domain: 'snssdk.com', path: '/', secure: true, hostOnly: false }] },
    refreshedAt: Date.now()
  }
  const adapter: import('axios').AxiosAdapter = async (config) => {
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
    runtime.requests.push({ url: config.url!, timeout: config.timeout, proxy: config.proxy, headers: config.headers.toJSON(), body })
    const url = new URL(config.url!)
    const data =
      url.hostname === 'signer.test'
        ? {
            ok: true,
            signObject: {
              url: body.url,
              app_version: body.app_version,
              method: body.method,
              headers: { ...body.headers, 'X-Khan': 'fixture-signature' }
            }
          }
        : url.pathname === '/aweme/v2/platform/share/command/trans/'
          ? runtime.appEmptyResponse
            ? ''
            : '{"status_code":0,"extra_info":{"object_id":7708975648740093055}}'
          : { code: runtime.bilibiliCode, message: runtime.bilibiliCode === 0 ? '0' : '账号未登录', data: { isLogin: true } }
    return { status: 200, statusText: 'OK', headers: {}, config, data }
  }
  return {
    ...sdk,
    default: (options: import('@ikenxuan/amagi').ClientOptions) =>
      sdk.default({
        ...options,
        request: { ...options.request, adapter },
        douyin: { ...options.douyin, app: { ...options.douyin?.app, session } }
      })
  }
})

vi.mock('@/module/utils/Config', () => ({ Config: runtime.config }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('@/platform/douyin/shareStorage', () => ({ prepareDouyinShareDataFile: () => 'test-only-session.json' }))
vi.mock('@/module/utils/RiskVerify', () => ({ handleRiskChallenge: vi.fn().mockResolvedValue(false) }))

import { AmagiError, bilibiliApi, douyinAppApi, getAmagiClient } from '@/module/utils/amagiClient'
import { resolveDouyinShareCommand } from '@/platform/douyin/shareCommand'

describe('默认工厂的真实 SDK 请求回归', () => {
  beforeEach(() => {
    runtime.requests.length = 0
    runtime.bilibiliCode = 0
    runtime.appEmptyResponse = false
  })

  it('Web 继承插件 Cookie/UA/代理，App 送签和发送均不混入这些浏览器身份', async () => {
    expect((await bilibiliApi.auth.status()).success).toBe(true)
    const web = runtime.requests[0]
    expect(web.timeout).toBe(12345)
    expect(web.headers).toMatchObject({ Cookie: 'SESSDATA=bili-test', 'User-Agent': 'web-browser-agent' })
    expect(web.proxy).toMatchObject({ host: 'proxy.test', port: 9000 })

    expect(douyinAppApi.guest).toBe(getAmagiClient().douyin.app.guest)
    const result = await douyinAppApi.commandTrans({ command: 'abc123' })
    expect(result.success).toBe(true)
    expect(result.data?.extra_info?.object_id).toBe('7708975648740093055')
    expect(runtime.requests).toHaveLength(3)
    const [signing, platform] = runtime.requests.slice(1)
    for (const request of [signing, platform]) {
      expect(request.timeout).toBe(12345)
      expect(request.proxy).toBe(false)
      expect(request.headers.Cookie).not.toBe('SESSDATA=bili-test')
      expect(request.headers.Cookie).not.toBe('sessionid=web-test')
      expect(request.headers['User-Agent']).not.toBe('web-browser-agent')
    }
    expect(new URL(platform.url).searchParams.get('command')).toBe('abc123')
    expect(signing.headers.Cookie).toBeUndefined()
    expect(platform.headers.Cookie).toBe('ttwid=app-test')
    expect(platform.headers['x-vc-bdturing-sdk-version']).toBe('4.2.1.cn')
    expect(signing.body).toMatchObject({ headers: { 'x-vc-bdturing-sdk-version': '4.2.1.cn' } })
  })

  it('口令解析直接调用共享 App API，空响应仍保留实际 HTTP 状态的诊断', async () => {
    runtime.appEmptyResponse = true
    await expect(resolveDouyinShareCommand('abc123')).rejects.toThrow('抖音口令接口返回空响应（HTTP 200）')
    expect(runtime.requests).toHaveLength(2)
    expect(new URL(runtime.requests[1].url).searchParams.get('command')).toBe('abc123')
  })

  it('真实 auth 端点失败转成 AmagiError，原始客户端仍返回失败信封', async () => {
    runtime.bilibiliCode = -101
    await expect(bilibiliApi.auth.status()).rejects.toMatchObject({ name: 'AmagiError', code: -101, kind: 'auth' })
    const result = await getAmagiClient().bilibili.auth.status()
    expect(result.success).toBe(false)
    expect(result.error?.platform?.code).toBe(-101)
  })

  it('request 的信封轨仍返回失败结果，axios 轨仍抛 AxiosError，不被业务代理接管', async () => {
    runtime.bilibiliCode = -101
    const request = bilibiliApi.request
    expect(request).toBe(getAmagiClient().bilibili.request)
    const result = await request.get('https://api.bilibili.com/x/web-interface/nav')
    expect(result.success).toBe(false)
    expect(result.error?.kind).toBe('auth')
    const error = await request.axios.get('https://api.bilibili.com/x/web-interface/nav').catch((cause: unknown) => cause)
    expect(error).toMatchObject({ isAxiosError: true, response: { data: { success: false } } })
    expect(error).not.toBeInstanceOf(AmagiError)
  })
})
