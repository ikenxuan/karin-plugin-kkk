import type { AmagiSuccess } from '@ikenxuan/amagi'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({ shortUrl: vi.fn(), debug: vi.fn() }))

vi.mock('@/module/utils/amagiClient', () => ({ douyinWebApi: { shortUrl: runtime.shortUrl } }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: runtime.debug } }))

import { toDouyinShortUrl } from '@/platform/douyin/shortUrl'

const success = <T>(data: T): AmagiSuccess<T> => ({
  success: true,
  message: '获取成功',
  data,
  meta: { requestId: 'short-url-test', clientId: 'test', platform: 'douyin', endpoint: 'douyin.shortUrl', durationMs: 1, attempts: 1 }
})

const target = 'https://www.douyin.com/video/123'

describe('抖音短链消费者的 v7 Web API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('通过 shortUrl 获取短链，保留 target 参数和成功信封的嵌套数据', async () => {
    runtime.shortUrl.mockResolvedValue(success({ data: 'https://v.douyin.com/abc/' }))

    expect(await toDouyinShortUrl(target)).toBe('https://v.douyin.com/abc/')
    expect(runtime.shortUrl).toHaveBeenCalledExactlyOnceWith({ target })
    expect(runtime.debug).not.toHaveBeenCalled()
  })

  it.each(['', null])('短链内容为 %s 时仍回退原链接', async (data) => {
    runtime.shortUrl.mockResolvedValue(success({ data }))

    expect(await toDouyinShortUrl(target)).toBe(target)
    expect(runtime.shortUrl).toHaveBeenCalledExactlyOnceWith({ target })
    expect(runtime.debug).not.toHaveBeenCalled()
  })

  it('新业务 API 抛错时回退原链接，继续记录原有诊断日志', async () => {
    runtime.shortUrl.mockRejectedValue(new Error('短链签发失败'))

    expect(await toDouyinShortUrl(target)).toBe(target)
    expect(runtime.shortUrl).toHaveBeenCalledExactlyOnceWith({ target })
    expect(runtime.debug).toHaveBeenCalledWith(expect.stringContaining('短链签发失败'))
  })
})
