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

import { isHeicDouyinImageUrl, pickChromiumImageUrl, processDouyinImageUrl } from '@/platform/douyin/image'
import { getWorkCoverUrl } from '@/platform/douyin/workType'

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

describe('抖音静态图片候选筛选', () => {
  it.each([
    'https://p26.douyinpic.com/tos-cn-v/test~tplv-dy-resize:200:q75.heic?biz_tag=aweme_music',
    'https://cdn.example.test/avatar.HEIC?sign=abc',
    'https://cdn.example.test/avatar.heif',
    'https://cdn.example.test/image?format=heic',
    'https://cdn.example.test/image?content_type=image%2Fheif',
    'data:image/heic;base64,AAAA'
  ])('识别 Chromium 不支持的 HEIC/HEIF 链接: %s', (url) => {
    expect(isHeicDouyinImageUrl(url)).toBe(true)
  })

  it('不把主机名或签名参数中偶然包含 heic 的 JPEG 错判为 HEIC', () => {
    expect(isHeicDouyinImageUrl('https://heic.example.test/avatar.jpg?signature=heic')).toBe(false)
  })

  it('跳过 HEIC 候选并按原优先级选中可显示图片', () => {
    const heic = 'https://cdn.example.test/avatar.heic'
    const jpg = 'https://cdn.example.test/avatar.jpg'
    const png = 'https://cdn.example.test/avatar.png'

    expect(pickChromiumImageUrl(heic, jpg, png)).toBe(jpg)
  })

  it('所有候选都是 HEIC 时返回 undefined，不把坏链接传给模板', () => {
    expect(pickChromiumImageUrl('https://cdn.example.test/a.heic', 'https://cdn.example.test/b.heif')).toBeUndefined()
  })

  it.each([
    {
      name: '视频封面',
      workType: { mainType: 'video', isVideo: true },
      data: { video: { cover: { url_list: ['https://cdn.example.test/cover.heic', 'https://cdn.example.test/cover.jpg'] } } }
    },
    {
      name: '图文封面',
      workType: { mainType: 'image', isImage: true },
      data: { images: [{ url_list: ['https://cdn.example.test/cover.heic', 'https://cdn.example.test/cover.jpg'] }] }
    },
    {
      name: '文章头图',
      workType: { mainType: 'article', isArticle: true },
      data: {
        article_info: {
          fe_data: JSON.stringify({
            head_poster_list: { url_list: ['https://cdn.example.test/cover.heic', 'https://cdn.example.test/cover.jpg'] }
          })
        }
      }
    }
  ] as const)('$name 跳过 HEIC 并回退到兼容候选', ({ workType, data }) => {
    expect(getWorkCoverUrl(workType as never, data as never)).toBe('https://cdn.example.test/cover.jpg')
  })
})
