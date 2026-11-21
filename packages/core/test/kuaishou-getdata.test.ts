import type { AmagiSuccess } from '@ikenxuan/amagi'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({ work: vi.fn(), comments: vi.fn(), emojis: vi.fn() }))

// 只提供 v7 业务 API，防止旧 Fetcher 调用在测试替身中继续通过。
vi.mock('@/module/utils/amagiClient', () => ({ kuaishouApi: runtime }))

import { fetchKuaishouData } from '@/platform/kuaishou/getdata'

const success = <T>(endpoint: string, data: T): AmagiSuccess<T> => ({
  success: true,
  data,
  message: '获取成功',
  meta: { requestId: 'test-request', clientId: 'test-client', platform: 'kuaishou', endpoint, durationMs: 0, attempts: 1 }
})

const work = { result: 1, photo: { id: 'photo-1', caption: '测试作品', mainMvUrls: [{ url: 'https://example.com/video.mp4' }] } }
const comments = { result: 1, rootComments: [{ comment_id: 1, content: '测试评论' }], subCommentsMap: {} }
const emojis = { data: { visionBaseEmoticons: { iconUrls: { '[微笑]': '//example.com/smile.png' } } } }

describe('快手 v7 数据消费者', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    runtime.work.mockResolvedValue(success('kuaishou.videoWork', work))
    runtime.comments.mockResolvedValue(success('kuaishou.comments', comments))
    runtime.emojis.mockResolvedValue(success('kuaishou.emojiList', emojis))
  })

  it('单作品通过 work、comments、emojis 获取数据并保留原响应体', async () => {
    const result = await fetchKuaishouData('one_work', { photoId: 'photo-1' })

    expect(result).toEqual({ VideoData: work, CommentsData: comments, EmojiData: emojis })
    expect(runtime.work).toHaveBeenCalledExactlyOnceWith({ photoId: 'photo-1' })
    expect(runtime.comments).toHaveBeenCalledExactlyOnceWith({ photoId: 'photo-1' })
    expect(runtime.emojis).toHaveBeenCalledExactlyOnceWith()
  })

  it('评论分支只获取对应作品的评论响应体', async () => {
    const result = await fetchKuaishouData('work_comments', { photoId: 'photo-2' })

    expect(result).toEqual(comments)
    expect(runtime.comments).toHaveBeenCalledExactlyOnceWith({ photoId: 'photo-2' })
    expect(runtime.work).not.toHaveBeenCalled()
    expect(runtime.emojis).not.toHaveBeenCalled()
  })

  it('表情分支不传参数并只返回表情响应体', async () => {
    const result = await fetchKuaishouData('emoji_list')

    expect(result).toEqual(emojis)
    expect(runtime.emojis).toHaveBeenCalledExactlyOnceWith()
    expect(runtime.work).not.toHaveBeenCalled()
    expect(runtime.comments).not.toHaveBeenCalled()
  })

  it.each(['work', 'comments', 'emojis'] as const)('%s 失败时原样抛给调用方', async (method) => {
    const error = new Error(`${method} failed`)
    runtime[method].mockRejectedValue(error)

    await expect(fetchKuaishouData('one_work', { photoId: 'photo-1' })).rejects.toBe(error)
  })
})
