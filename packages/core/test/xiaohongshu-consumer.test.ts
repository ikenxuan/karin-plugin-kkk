import type { AmagiSuccess } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  api: { note: vi.fn(), comments: vi.fn(), emojis: vi.fn() },
  render: vi.fn(),
  downloadVideo: vi.fn(),
  config: {
    app: { parseTip: false },
    xiaohongshu: { sendContent: ['info', 'comment'], numcomment: 3, subCommentLimit: 2, videoQuality: '720p', maxAutoVideoSize: 100 },
    amagi: { cookies: { xiaohongshu: '' } }
  }
}))

vi.mock('@/module', () => ({
  Base: class {
    get amagi() {
      return { xiaohongshu: runtime.api }
    }
  },
  baseHeaders: { 'User-Agent': 'test-agent' },
  Render: runtime.render,
  downloadVideo: runtime.downloadVideo
}))
vi.mock('node-karin', () => ({ common: {}, segment: {}, logger: { debug: vi.fn(), warn: vi.fn() } }))
vi.mock('@/module/utils/Config', () => ({ Config: runtime.config }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn() } }))
vi.mock('@/module/utils/amagiClient', () => ({ xiaohongshuApi: { commentReplies: vi.fn() } }))

import { Xiaohongshu } from '@/platform/xiaohongshu/xiaohongshu'

const noteRef = { type: 'note' as const, note_id: 'note-1', xsec_token: 'note-token' }
const success = <T>(endpoint: string, data: T): AmagiSuccess<T> => ({
  success: true,
  data,
  message: '获取成功',
  meta: { requestId: 'test-request', clientId: 'test-client', platform: 'xiaohongshu', endpoint, durationMs: 0, attempts: 1 }
})

const note = (video = false) => ({
  code: 0,
  success: true,
  msg: 'ok',
  data: {
    items: [
      {
        note_card: {
          title: '测试笔记',
          desc: '笔记正文[赞R]',
          note_id: 'note-1',
          user: { user_id: 'author-1', nickname: '作者', avatar: 'https://example.com/avatar.png' },
          interact_info: { liked_count: '5', collected_count: '2', comment_count: '1', share_count: '3' },
          image_list: [{ url_default: 'https://example.com/cover.jpg' }],
          time: 1700000000000,
          ip_location: '上海',
          video: video
            ? {
                media: {
                  stream: {
                    h264: [{ width: 1280, height: 720, size: 1024, master_url: 'https://example.com/video.mp4', stream_desc: '720p' }]
                  }
                }
              }
            : undefined
        }
      }
    ]
  }
})

const comments = {
  code: 0,
  success: true,
  msg: 'ok',
  data: {
    comments: [
      {
        id: 'comment-1',
        note_id: 'note-1',
        content: '评论[赞R]',
        create_time: 1700000000000,
        ip_location: '上海',
        like_count: '1',
        liked: false,
        pictures: [],
        sub_comment_count: '0',
        sub_comments: [],
        show_tags: [],
        at_users: [],
        status: 0,
        user_info: { user_id: 'user-1', nickname: '用户', image: '', xsec_token: 'user-token' }
      }
    ],
    cursor: '',
    has_more: false,
    time: 0,
    user_id: 'user-1',
    xsec_token: 'note-token'
  }
}

describe('小红书 v7 笔记消费者', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    runtime.config.xiaohongshu.sendContent = ['info', 'comment']
    runtime.config.xiaohongshu.numcomment = 3
    runtime.api.note.mockResolvedValue(success('xiaohongshu.noteDetail', note()))
    runtime.api.comments.mockResolvedValue(success('xiaohongshu.noteComments', comments))
    runtime.api.emojis.mockResolvedValue(
      success('xiaohongshu.emojiList', {
        data: { emoji: { tabs: [{ collection: [{ emoji: [{ image_name: '[赞R]', image: 'https://example.com/emoji.png' }] }] }] } }
      })
    )
    runtime.render.mockResolvedValue([{ type: 'image', file: 'base64://dGVzdA==' }])
  })

  it('通过 note、emojis、comments 解析信封并生成笔记和评论数据', async () => {
    const event = { reply: vi.fn(async () => ({ messageId: 'rendered-message' })) } as unknown as Message
    const handler = new Xiaohongshu(event, noteRef)

    expect(await handler.XiaohongshuHandler(noteRef)).toBe(true)

    expect(runtime.api.note).toHaveBeenCalledExactlyOnceWith({ note_id: 'note-1', xsec_token: 'note-token' })
    expect(runtime.api.emojis).toHaveBeenCalledExactlyOnceWith()
    expect(runtime.api.comments).toHaveBeenCalledExactlyOnceWith({ note_id: 'note-1', xsec_token: 'note-token', number: 3 })
    expect(handler.workType).toBe('gallery')
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'xiaohongshu/noteInfo',
      expect.objectContaining({ title: '测试笔记', note_id: 'note-1', image_url: 'https://example.com/cover.jpg', is_video: false })
    )
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'xiaohongshu/comment',
      expect.objectContaining({
        Type: '图文',
        CommentLength: 1,
        CommentsData: [expect.objectContaining({ id: 'comment-1', sub_comments: [] })]
      })
    )
    expect(event.reply).toHaveBeenCalledTimes(2)
  })

  it.each([0, -2])('评论配置为 %i 时仍向 comments 请求至少一条', async (number) => {
    runtime.config.xiaohongshu.sendContent = ['comment']
    runtime.config.xiaohongshu.numcomment = number
    runtime.api.comments.mockResolvedValue(success('xiaohongshu.noteComments', { ...comments, data: { ...comments.data, comments: [] } }))
    const event = { reply: vi.fn(async () => ({ messageId: 'empty-message' })) } as unknown as Message

    expect(await new Xiaohongshu(event, noteRef).XiaohongshuHandler(noteRef)).toBe(true)

    expect(runtime.api.comments).toHaveBeenCalledExactlyOnceWith({ note_id: 'note-1', xsec_token: 'note-token', number: 1 })
    expect(event.reply).toHaveBeenCalledWith('这个笔记没有评论 ~')
  })

  it('视频笔记继续从原响应路径选择视频并传递下载参数', async () => {
    runtime.config.xiaohongshu.sendContent = ['video']
    runtime.api.note.mockResolvedValue(success('xiaohongshu.noteDetail', note(true)))
    const event = { reply: vi.fn(), messageId: 'source-message' } as unknown as Message
    const handler = new Xiaohongshu(event, noteRef)

    expect(await handler.XiaohongshuHandler(noteRef)).toBe(true)

    expect(handler.workType).toBe('video')
    expect(runtime.api.comments).not.toHaveBeenCalled()
    expect(runtime.downloadVideo).toHaveBeenCalledWith(
      event,
      {
        video_url: 'https://example.com/video.mp4',
        title: { timestampTitle: expect.stringMatching(/^tmp_\d+\.mp4$/), originTitle: '720p.mp4' },
        headers: { 'User-Agent': 'test-agent', Referer: 'https://www.xiaohongshu.com', Cookie: '' }
      },
      { message_id: 'source-message' }
    )
  })

  it('业务 API 抛出的笔记错误继续交给上层处理', async () => {
    const error = new Error('note failed')
    runtime.api.note.mockRejectedValue(error)
    const event = { reply: vi.fn() } as unknown as Message

    await expect(new Xiaohongshu(event, noteRef).XiaohongshuHandler(noteRef)).rejects.toBe(error)

    expect(runtime.api.emojis).not.toHaveBeenCalled()
    expect(runtime.api.comments).not.toHaveBeenCalled()
    expect(runtime.render).not.toHaveBeenCalled()
  })
})
