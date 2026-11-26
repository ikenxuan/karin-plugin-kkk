import type { AmagiSuccess, DouyinAppCommentsResponse, DouyinCommentsResponse } from '@ikenxuan/amagi'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  userProfile: vi.fn(),
  commentReplies: vi.fn(),
  appCommentReplies: vi.fn(),
  getHeaders: vi.fn(),
  subCommentLimit: 2
}))

vi.mock('@/module/utils/amagiClient', () => ({
  douyinWebApi: { userProfile: runtime.userProfile, commentReplies: runtime.commentReplies },
  douyinAppApi: { commentReplies: runtime.appCommentReplies }
}))
vi.mock('@/module/utils/Config', () => ({
  Config: {
    douyin: {
      get subCommentLimit() {
        return runtime.subCommentLimit
      }
    }
  }
}))
vi.mock('@/module/utils', () => ({
  Networks: class {
    getHeaders = runtime.getHeaders
  }
}))

import { douyinComments } from '@/platform/douyin/comments'

const success = <T>(endpoint: string, data: T): AmagiSuccess<T> => ({
  success: true,
  message: '获取成功',
  data,
  meta: { requestId: 'comments-test', clientId: 'test', platform: 'douyin', endpoint, durationMs: 1, attempts: 1 }
})

const comment = (cid: string, text: string, overrides: Record<string, unknown> = {}) => ({
  cid,
  aweme_id: 'aweme-1',
  text,
  user: { nickname: '评论用户', avatar_thumb: { url_list: ['https://example.test/avatar.png'] } },
  create_time: 1700000000,
  digg_count: 3,
  ip_label: '上海',
  label_type: -1,
  label_list: [],
  label_text: '',
  image_list: null,
  sticker: null,
  text_extra: [],
  is_author_digged: false,
  reply_to_reply_id: '0',
  reply_to_username: '',
  ...overrides
})

const commentsResponse = (comments: ReturnType<typeof comment>[] | null): DouyinCommentsResponse =>
  ({ status_code: 0, comments, cursor: 0, has_more: 0, total: comments?.length ?? 0 }) as unknown as DouyinCommentsResponse

describe('抖音评论消费者的 v7 Web API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runtime.subCommentLimit = 2
    runtime.userProfile.mockResolvedValue(success('douyin.userProfile', { user: { sec_uid: 'mention-1', nickname: '被提及用户' } }))
    runtime.commentReplies.mockResolvedValue(success('douyin.commentReplies', { comments: [] }))
    runtime.getHeaders.mockResolvedValue({ 'content-type': 'image/png' })
  })

  it('使用新用户资料和回复接口，保留一级评论与回复的富文本和分页参数', async () => {
    const textExtra = [{ sec_uid: 'mention-1' }]
    runtime.subCommentLimit = 4
    runtime.commentReplies.mockResolvedValue(
      success('douyin.commentReplies', {
        comments: [comment('reply-1', '回复 @被提及用户[赞]', { text_extra: textExtra })]
      })
    )

    const result = await douyinComments(commentsResponse([comment('comment-1', '你好 @被提及用户[赞]', { text_extra: textExtra })]), [
      { name: '[赞]', url: 'https://example.test/emoji.png' }
    ])

    expect(runtime.userProfile).toHaveBeenNthCalledWith(1, { sec_uid: 'mention-1' })
    expect(runtime.userProfile).toHaveBeenNthCalledWith(2, { sec_uid: 'mention-1' })
    expect(runtime.commentReplies).toHaveBeenCalledWith({ aweme_id: 'aweme-1', comment_id: 'comment-1', number: 4 })
    expect(result.CommentsData[0]).toMatchObject({
      cid: 'comment-1',
      nickname: '评论用户',
      is_At_user_id: ['mention-1'],
      text: {
        nodes: [
          { type: 'text', text: '你好 ' },
          { type: 'mention', text: '@被提及用户', userId: 'mention-1' },
          { type: 'emoji', name: '[赞]', src: 'https://example.test/emoji.png' }
        ]
      },
      replyComment: [
        {
          cid: 'reply-1',
          text: {
            nodes: [
              { type: 'text', text: '回复 ' },
              { type: 'mention', text: '@被提及用户', userId: 'mention-1' },
              { type: 'emoji', name: '[赞]', src: 'https://example.test/emoji.png' }
            ]
          }
        }
      ]
    })
    expect(result.image_url).toEqual([])
  })

  it('新用户资料接口抛错时保留原文，继续解析回复', async () => {
    runtime.userProfile.mockRejectedValueOnce(new Error('用户资料不可用'))

    const result = await douyinComments(
      commentsResponse([comment('comment-1', '@被提及用户', { text_extra: [{ sec_uid: 'mention-1' }] })]),
      []
    )

    expect(result.CommentsData[0].text.nodes).toEqual([{ type: 'text', text: '@被提及用户' }])
    expect(runtime.commentReplies).toHaveBeenCalledWith({ aweme_id: 'aweme-1', comment_id: 'comment-1', number: 2 })
  })

  it('新回复接口抛错时沿用消费者原有的异常传播', async () => {
    const failure = new Error('回复获取失败')
    runtime.commentReplies.mockRejectedValueOnce(failure)

    await expect(douyinComments(commentsResponse([comment('comment-1', '正文')]), [])).rejects.toBe(failure)
  })

  it('空评论保持空结果，不访问 API', async () => {
    expect(await douyinComments(commentsResponse(null), [])).toEqual({ CommentsData: [], image_url: [], image_media: [] })
    expect(runtime.userProfile).not.toHaveBeenCalled()
    expect(runtime.commentReplies).not.toHaveBeenCalled()
  })
})

describe('抖音 App 评论消费者', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runtime.subCommentLimit = 2
    runtime.userProfile.mockResolvedValue(success('douyin.userProfile', { user: { sec_uid: 'mention-1', nickname: '被提及用户' } }))
    runtime.appCommentReplies.mockResolvedValue(success('douyin.appCommentReplies', { comments: [] }))
    runtime.getHeaders.mockResolvedValue({ 'content-type': 'image/png' })
  })

  it('保留单条评论的多张图片和 Live Photo 视频源，并使用 App 回复接口', async () => {
    const firstImage = 'https://example.test/comment-1.jpg'
    const liveImage = 'https://example.test/comment-2.jpg'
    const liveVideo = 'https://example.test/comment-2.mp4'
    const data = {
      comments: [
        {
          cid: 'app-comment-1',
          aweme_id: 'aweme-1',
          text: 'App 评论',
          text_extra: [],
          user: { nickname: 'App 用户', avatar_thumb: { url_list: ['https://example.test/avatar.png'] } },
          create_time: 1700000000,
          digg_count: 3,
          ip_label: '上海',
          label_type: -1,
          label_text: '',
          label_list: null,
          image_list: [
            { origin_url: { url_list: [firstImage] } },
            { origin_url: { url_list: [liveImage] }, live_video: { url_list: [liveVideo] } }
          ]
        }
      ]
    } as unknown as DouyinAppCommentsResponse

    const result = await douyinComments(data, [], { app: true })

    expect(result.CommentsData[0].commentimages).toEqual([firstImage, liveImage])
    expect(result.image_media).toEqual([{ imageUrl: firstImage }, { imageUrl: liveImage, liveVideoUrl: liveVideo }])
    expect(runtime.appCommentReplies).toHaveBeenCalledWith({ aweme_id: 'aweme-1', comment_id: 'app-comment-1', number: 2 })
    expect(runtime.commentReplies).not.toHaveBeenCalled()
  })
})
