import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  makeForward: vi.fn((images: unknown[]) => images),
  app: { fakeForward: false },
  processImageUrl: vi.fn(async (url: string) => url),
  downloadFile: vi.fn(async (_url: string, options: { filepath?: string }) => ({ filepath: options.filepath })),
  buildGoogleMotionPhoto: vi.fn(async () => true),
  removeFile: vi.fn(async () => true),
  writeFile: vi.fn(async () => undefined),
  logger: { warn: vi.fn() },
  networks: {
    getHeaders: vi.fn(async () => ({ 'content-type': 'image/png' })),
    returnResult: vi.fn(async () => ({ data: Buffer.alloc(0) }))
  }
}))

vi.mock('node:fs/promises', () => ({ default: { writeFile: runtime.writeFile } }))
vi.mock('node-karin', () => ({
  common: { makeForward: runtime.makeForward },
  segment: { image: (file: string) => ({ type: 'image', file }) }
}))
vi.mock('@/module/utils', () => ({
  buildGoogleMotionPhoto: runtime.buildGoogleMotionPhoto,
  Common: { tempDri: { images: 'D:/temp/images/', video: 'D:/temp/video/' }, removeFile: runtime.removeFile },
  downloadFile: runtime.downloadFile,
  processImageUrl: runtime.processImageUrl,
  Networks: class {
    getHeaders = runtime.networks.getHeaders
    returnResult = runtime.networks.returnResult
  }
}))
vi.mock('@/module/utils/amagiClient', () => ({ douyinAppApi: {}, douyinWebApi: {} }))
vi.mock('@/module/utils/Config', () => ({ Config: { app: runtime.app } }))
vi.mock('@/module/utils/logger', () => ({ logger: runtime.logger }))

import { sendDouyinCommentImages } from '@/platform/douyin/comments'

const media = ['https://example.test/1.png', 'https://example.test/2.png'].map((imageUrl) => ({ imageUrl }))

const createEvent = (adapterName: string) => {
  const reply = vi.fn(async () => ({}))
  const sendForwardMsg = vi.fn(async () => ({}))
  const event = {
    bot: { adapter: { name: adapterName }, account: { selfId: 'bot', name: 'Bot' }, sendForwardMsg },
    sender: { userId: 'user', nick: 'User' },
    contact: { scene: 'friend', peer: 'user' },
    reply
  } as unknown as Message
  return { event, reply, sendForwardMsg }
}

describe('Douyin comment image delivery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runtime.app.fakeForward = false
    runtime.processImageUrl.mockImplementation(async (url) => url)
    runtime.buildGoogleMotionPhoto.mockResolvedValue(true)
    runtime.downloadFile.mockImplementation(async (_url, options) => ({ filepath: options.filepath }))
  })

  it('sends every image through console replies without using its unsupported forward API', async () => {
    const { event, reply, sendForwardMsg } = createEvent('@karinjs/console')
    sendForwardMsg.mockRejectedValue(new Error('此接口未实现'))

    await sendDouyinCommentImages(event, media, '评论')

    expect(reply.mock.calls.map(([image]) => image)).toEqual(media.map(({ imageUrl }) => ({ type: 'image', file: imageUrl })))
    expect(sendForwardMsg).not.toHaveBeenCalled()
    expect(runtime.makeForward).not.toHaveBeenCalled()
  })

  it('keeps the configured forward identity and metadata for other adapters', async () => {
    const { event, reply, sendForwardMsg } = createEvent('onebot')
    runtime.app.fakeForward = true

    await sendDouyinCommentImages(event, media, '评论')

    const expectedImages = media.map(({ imageUrl }) => ({ type: 'image', file: imageUrl }))
    expect(runtime.makeForward).toHaveBeenCalledWith(expectedImages, 'user', 'User')
    expect(sendForwardMsg).toHaveBeenCalledWith(event.contact, expectedImages, {
      source: '评论图片收集',
      summary: '查看2张图片',
      prompt: '抖音评论解析结果',
      news: [{ text: '点击查看解析结果' }]
    })
    expect(reply).not.toHaveBeenCalled()
  })

  it('封装 Live Photo 静态图与视频并在发送后清理临时文件', async () => {
    const { event, sendForwardMsg } = createEvent('onebot')
    const liveMedia = [{ imageUrl: 'https://example.test/live.jpg', liveVideoUrl: 'https://example.test/live.mp4' }]

    await sendDouyinCommentImages(event, liveMedia, '评论')

    expect(runtime.downloadFile).toHaveBeenNthCalledWith(
      1,
      liveMedia[0].imageUrl,
      expect.objectContaining({ filepath: expect.stringMatching(/\.jpg$/) })
    )
    expect(runtime.downloadFile).toHaveBeenNthCalledWith(
      2,
      liveMedia[0].liveVideoUrl,
      expect.objectContaining({ filepath: expect.stringMatching(/\.mp4$/) })
    )
    expect(runtime.buildGoogleMotionPhoto).toHaveBeenCalledWith(
      expect.objectContaining({ imagePath: expect.stringMatching(/\.jpg$/), videoPath: expect.stringMatching(/\.mp4$/) })
    )
    expect(sendForwardMsg).toHaveBeenCalledWith(
      event.contact,
      [{ type: 'image', file: expect.stringMatching(/_motion\.jpg$/) }],
      expect.objectContaining({ summary: '查看1张图片' })
    )
    expect(runtime.removeFile).toHaveBeenCalledWith(expect.stringMatching(/_motion\.jpg$/), true)
  })
})
