import { describe, expect, it, vi } from 'vitest'

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

  const createClient = vi.fn((options: { cookies?: Record<string, string> }) => {
    const createPlatform = (platform: string) => ({
      fetcher: {
        readBoundCookie: async () => options.cookies?.[platform] ?? ''
      }
    })

    return {
      bilibili: createPlatform('bilibili'),
      douyin: createPlatform('douyin'),
      kuaishou: createPlatform('kuaishou'),
      xiaohongshu: createPlatform('xiaohongshu')
    }
  })

  return {
    config,
    createClient,
    logger: {
      debug: vi.fn(),
      error: vi.fn()
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

import { douyinFetcher, registerAmagiReloadListener, reloadAmagiConfig } from '../src/module/utils/amagiClient'

const readBoundCookie = () =>
  (
    douyinFetcher as unknown as {
      readBoundCookie: () => Promise<string>
    }
  ).readBoundCookie()

describe('Amagi Client 热重载', () => {
  it('配置变化后替换导出的 Fetcher，并且跳过重复重载', async () => {
    const reloadListener = vi.fn()
    registerAmagiReloadListener(reloadListener)

    expect(await readBoundCookie()).toBe('old-douyin-cookie')

    runtime.config.amagi.cookies.douyin = 'new-douyin-cookie'

    expect(reloadAmagiConfig()).toBe(true)
    expect(await readBoundCookie()).toBe('new-douyin-cookie')
    expect(reloadListener).toHaveBeenCalledTimes(1)
    expect(runtime.createClient).toHaveBeenCalledTimes(2)

    expect(reloadAmagiConfig()).toBe(false)
    expect(reloadListener).toHaveBeenCalledTimes(1)
    expect(runtime.createClient).toHaveBeenCalledTimes(2)
  })
})
