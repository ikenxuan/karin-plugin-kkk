import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  emojis: vi.fn(),
  writeFileSync: vi.fn(),
  render: vi.fn(),
  warn: vi.fn()
}))

vi.mock('@/module/utils/amagiClient', () => ({ douyinWebApi: { emojis: runtime.emojis } }))
vi.mock('@/module/utils', () => ({ Common: { tempDri: { video: 'D:/test/danmaku/' } } }))
vi.mock('@/module/utils/logger', () => ({ logger: { warn: runtime.warn } }))
vi.mock('node:fs', () => ({ default: { writeFileSync: runtime.writeFileSync } }))
vi.mock('node-karin', () => ({ ffmpeg: vi.fn(), ffprobe: vi.fn(), render: { render: runtime.render } }))

import { generateDouyinASS } from '@/platform/douyin/danmaku'

describe('抖音弹幕消费者的 v7 Web API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runtime.emojis.mockResolvedValue({
      success: true,
      message: '获取成功',
      data: { emoji_list: [{ display_name: '[赞]', emoji_url: { url_list: ['https://example.test/emoji.png'] } }] },
      meta: { requestId: 'danmaku-test', clientId: 'test', platform: 'douyin', endpoint: 'douyin.emojiList', durationMs: 1, attempts: 1 }
    })
    const png = Buffer.alloc(24)
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(png)
    png.writeUInt32BE(80, 16)
    png.writeUInt32BE(30, 20)
    runtime.render.mockResolvedValue(png.toString('base64'))
  })

  it('通过 emojis 获取平台表情，继续生成透明图片弹幕', async () => {
    const result = await generateDouyinASS([{ danmaku_id: 'dm-1', offset_time: 1000, text: '你好[赞]' }], 1920, 1080)

    expect(runtime.emojis).toHaveBeenCalledExactlyOnceWith()
    expect(result.overlays).toEqual([expect.objectContaining({ startTime: 1000, endTime: 9000 })])
    expect(result.stats.emojiOverlays).toBe(1)
    expect(result.ass).not.toContain('你好[赞]')
    const html = runtime.writeFileSync.mock.calls.find(([_path, content]) => typeof content === 'string')?.[1]
    expect(html).toContain('https://example.test/emoji.png')
    expect(runtime.warn).not.toHaveBeenCalled()
  })

  it('新表情 API 抛错时仍生成纯文字 ASS 弹幕', async () => {
    const failure = new Error('表情获取失败')
    runtime.emojis.mockRejectedValueOnce(failure)

    const result = await generateDouyinASS([{ danmaku_id: 'dm-1', offset_time: 1000, text: '你好[赞]' }], 1920, 1080)

    expect(runtime.emojis).toHaveBeenCalledExactlyOnceWith()
    expect(result.overlays).toEqual([])
    expect(result.ass).toContain('你好[赞]')
    expect(runtime.warn).toHaveBeenCalledWith(expect.any(String), failure)
    expect(runtime.render).not.toHaveBeenCalled()
  })
})
