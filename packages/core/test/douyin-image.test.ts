import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  getHeaders: vi.fn(),
  returnResult: vi.fn(),
  decode: vi.fn(),
  encode: vi.fn()
}))

vi.mock('@/module/utils', () => ({
  Networks: class {
    constructor(_options: unknown) {}

    getHeaders = runtime.getHeaders
    returnResult = runtime.returnResult
  }
}))
vi.mock('heic-decode', () => ({ default: runtime.decode }))
vi.mock('jpeg-js', () => ({ default: { encode: runtime.encode } }))

import { processDouyinImageUrl } from '@/platform/douyin/image'

describe('抖音图片浏览器兼容处理', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runtime.getHeaders.mockResolvedValue({ 'content-type': 'image/heic' })
    runtime.returnResult.mockResolvedValue({ data: Buffer.from([0x00, 0x01]) })
    runtime.decode.mockResolvedValue({ data: new Uint8Array([0xff, 0xff, 0xff, 0xff]), width: 1, height: 1 })
    runtime.encode.mockReturnValue({ data: Buffer.from([0xff, 0xd8, 0xff, 0xd9]) })
  })

  it('将 HEIC 图片解码并编码为浏览器可显示的 JPEG Data URL', async () => {
    const result = await processDouyinImageUrl('https://example.test/article-cover')

    expect(runtime.decode).toHaveBeenCalledExactlyOnceWith({ buffer: Buffer.from([0x00, 0x01]) })
    expect(runtime.encode).toHaveBeenCalledExactlyOnceWith(
      {
        data: Buffer.from([0xff, 0xff, 0xff, 0xff]),
        width: 1,
        height: 1
      },
      90
    )
    expect(result).toBe('data:image/jpeg;base64,/9j/2Q==')
  })

  it('其他浏览器支持的图片类型保留原始 URL，不重复下载', async () => {
    runtime.getHeaders.mockResolvedValue({ 'content-type': 'image/jpeg; charset=binary' })

    const result = await processDouyinImageUrl('https://example.test/article-cover.jpg')

    expect(result).toBe('https://example.test/article-cover.jpg')
    expect(runtime.decode).not.toHaveBeenCalled()
    expect(runtime.returnResult).not.toHaveBeenCalled()
  })
})
