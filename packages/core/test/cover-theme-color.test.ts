import jpeg from 'jpeg-js'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { logger } from '@/module/utils/logger'

const mockState = vi.hoisted(() => ({ theme: 3, useDarkTheme: false, coverResponse: null as Uint8Array | null }))

vi.mock('@/module', () => ({ Common: { useDarkTheme: () => mockState.useDarkTheme } }))
vi.mock('@/module/utils/Config', () => ({
  Config: {
    app: {
      get Theme() {
        return mockState.theme
      }
    }
  }
}))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn() } }))
vi.mock('node-karin/axios', () => ({ default: { get: vi.fn(async () => ({ data: mockState.coverResponse })) } }))

type CoverThemeApi = {
  analyzeCoverPixels: (pixels: Buffer) => {
    averageColor: string
    averageColorLuma: number
    useDarkTheme: boolean
    legacyUseDarkTheme: boolean
    darkRatio: number
  } | null
  getCoverUrl: (path: string, data: unknown) => string
  resolveCoverTheme: (path: string, data: unknown) => Promise<{ useDarkTheme: boolean; coverColor?: string }>
}

const loadCoverThemeApi = async (): Promise<CoverThemeApi> =>
  (await import('../src/module/utils/Render/coverTheme')) as unknown as CoverThemeApi

describe('智能封面综合色', () => {
  beforeEach(() => {
    mockState.theme = 3
    mockState.useDarkTheme = false
    mockState.coverResponse = null
  })

  it('输出整张封面的平均颜色，并根据该综合色而非局部暗像素比例判定明暗', async () => {
    const { analyzeCoverPixels } = await loadCoverThemeApi()
    const pixels = Buffer.alloc(10 * 4 * 4)
    for (let pixel = 0; pixel < 10; pixel += 1) {
      const value = pixel < 4 ? 0 : 255
      const offset = pixel * 4
      pixels[offset] = value
      pixels[offset + 1] = value
      pixels[offset + 2] = value
      pixels[offset + 3] = 255
    }

    const analysis = analyzeCoverPixels(pixels)

    expect(analysis?.averageColor).toBe('#999999')
    expect(analysis?.averageColorLuma).toBeCloseTo(0.6, 2)
    expect(analysis?.darkRatio).toBeCloseTo(0.4, 2)
    expect(analysis?.useDarkTheme).toBe(false)
    expect(analysis?.legacyUseDarkTheme).toBe(true)
  })

  it('为文章智能主题使用与模板相同优先级的封面 URL', async () => {
    const { getCoverUrl } = await loadCoverThemeApi()
    const data = {
      cover_url: 'https://example.com/cover.jpg',
      images: [
        {
          ai_high_image_url: 'https://example.com/ai.jpg',
          high_image_url: 'https://example.com/high.jpg',
          origin_image_url: 'https://example.com/origin.jpg',
          markdown_url: 'https://example.com/markdown.jpg'
        }
      ]
    }

    expect(getCoverUrl('douyin/article-work', data)).toBe('https://example.com/cover.jpg')
    expect(getCoverUrl('douyin/article-work', { ...data, cover_url: undefined })).toBe('https://example.com/ai.jpg')
  })

  it.each([
    [
      '灰度 PNG',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGOYCQAAmwCarS5ItAAAAABJRU5ErkJggg==',
      '#999999',
      false
    ],
    [
      '索引色 PNG',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEVSREQt5siMAAAAAXRSTlP/beQ36wAAAApJREFUeJxjYAAAAAIAAUivpHEAAAAASUVORK5CYII=',
      '#524444',
      true
    ]
  ] as const)('解码模板捕获的%s data URI', async (_kind, coverUrl, coverColor, useDarkTheme) => {
    const { resolveCoverTheme } = await loadCoverThemeApi()

    await expect(resolveCoverTheme('douyin/article-work', { cover_url: coverUrl, images: [] })).resolves.toEqual({
      coverColor,
      useDarkTheme
    })
  })

  it('直接解码模板捕获的 JPEG data URI 封面', async () => {
    const { analyzeCoverPixels, resolveCoverTheme } = await loadCoverThemeApi()
    const jpegBytes = Buffer.from([153, 153, 153, 255])
    const jpegData = jpeg.encode({ data: jpegBytes, width: 1, height: 1 }, 90).data
    const expected = analyzeCoverPixels(Buffer.from(jpeg.decode(jpegData, { useTArray: true }).data))

    await expect(
      resolveCoverTheme('douyin/article-work', {
        cover_url: `data:image/jpeg;base64,${jpegData.toString('base64')}`,
        images: []
      })
    ).resolves.toEqual({ useDarkTheme: expected?.useDarkTheme, coverColor: expected?.averageColor })
  })

  it('智能文章主题同时返回封面综合色，并以该色决定文字主题', async () => {
    const { resolveCoverTheme } = await loadCoverThemeApi()
    mockState.coverResponse = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGOYOXPmfwAGZQLLvyH1xAAAAABJRU5ErkJggg==',
      'base64'
    )

    await expect(resolveCoverTheme('douyin/article-work', { cover_url: 'https://example.com/cover.jpg', images: [] })).resolves.toEqual({
      useDarkTheme: false,
      coverColor: '#999999'
    })
  })

  it('其他封面智能主题仍沿用旧的像素分布判定且不注入文章背景色', async () => {
    const { analyzeCoverPixels, resolveCoverTheme } = await loadCoverThemeApi()
    mockState.coverResponse = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAEElEQVR4nGNgYGD4j4xxAQCmkBvlvHjyoAAAAABJRU5ErkJggg==',
      'base64'
    )
    const expected = analyzeCoverPixels(mockState.coverResponse)
    expect(expected?.legacyUseDarkTheme).not.toBe(expected?.useDarkTheme)

    await expect(resolveCoverTheme('douyin/video-work', { image_url: 'https://example.com/video-cover.jpg' })).resolves.toEqual({
      useDarkTheme: expected?.legacyUseDarkTheme
    })
  })

  it('取色失败的 data URI 日志隐藏 base64 图片内容', async () => {
    const { resolveCoverTheme } = await loadCoverThemeApi()
    const coverUrl = 'data:image/webp;base64,private-image-payload'

    await expect(resolveCoverTheme('douyin/article-work', { cover_url: coverUrl, images: [] })).resolves.toEqual({
      useDarkTheme: false
    })
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('image/webp;[base64 omitted]'))
    expect(logger.warn).not.toHaveBeenCalledWith(expect.stringContaining('private-image-payload'))
  })

  it('只在智能主题模式下返回封面色，手动主题保持既有明暗选择', async () => {
    const { resolveCoverTheme } = await loadCoverThemeApi()
    const data = { cover_url: 'https://example.com/cover.jpg', images: [] }
    mockState.theme = 2
    mockState.useDarkTheme = true

    await expect(resolveCoverTheme('douyin/article-work', data)).resolves.toEqual({ useDarkTheme: true })
  })
})
