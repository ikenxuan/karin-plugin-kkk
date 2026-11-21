import type { Elements, Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  makeForward: vi.fn((images: unknown[]) => images),
  app: { fakeForward: false }
}))

vi.mock('node-karin', () => ({ common: { makeForward: runtime.makeForward } }))
vi.mock('@/module/utils/Config', () => ({ Config: { app: runtime.app } }))

import { sendDouyinCommentImages } from '@/platform/douyin/commentImages'

const images = [
  { type: 'image', file: 'https://example.test/1.png' },
  { type: 'image', file: 'https://example.test/2.png' }
] as Elements[]

const createEvent = (adapter: string) => {
  const reply = vi.fn(async () => ({}))
  const sendForwardMsg = vi.fn(async () => ({}))
  const event = {
    bot: { adapter: { name: adapter }, account: { selfId: 'bot', name: 'Bot' }, sendForwardMsg },
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
  })

  it('sends every image through console replies without using its unsupported forward API', async () => {
    const { event, reply, sendForwardMsg } = createEvent('@karinjs/console')
    sendForwardMsg.mockRejectedValue(new Error('此接口未实现'))

    await sendDouyinCommentImages(event, images)

    expect(reply.mock.calls.map(([image]) => image)).toEqual(images)
    expect(sendForwardMsg).not.toHaveBeenCalled()
    expect(runtime.makeForward).not.toHaveBeenCalled()
  })

  it('keeps the configured forward identity and metadata for other adapters', async () => {
    const { event, reply, sendForwardMsg } = createEvent('onebot')
    runtime.app.fakeForward = true

    await sendDouyinCommentImages(event, images)

    expect(runtime.makeForward).toHaveBeenCalledWith(images, 'user', 'User')
    expect(sendForwardMsg).toHaveBeenCalledWith(event.contact, images, {
      source: '评论图片收集',
      summary: '查看2张图片',
      prompt: '抖音评论解析结果',
      news: [{ text: '点击查看解析结果' }]
    })
    expect(reply).not.toHaveBeenCalled()
  })
})
