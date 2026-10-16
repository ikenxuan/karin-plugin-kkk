import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * 可变运行时：`vi.mock` 的工厂在模块加载时就固化，用例之间只能靠改这个对象切配置。
 * 形状与真实 `Config` 的读取路径一致（`Config.xiaohongshu.*` / `Config.amagi.cookies.*`）。
 */
const runtime = vi.hoisted(() => ({
  config: {
    xiaohongshu: { numcomment: 10, subCommentLimit: 2 },
    amagi: { cookies: { xiaohongshu: '' } }
  },
  fetchSubComments: vi.fn()
}))

vi.mock('@/module/utils/Config', () => ({ Config: runtime.config }))

vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() } }))

vi.mock('@/module/utils/amagiClient', () => ({ xiaohongshuFetcher: { fetchSubComments: runtime.fetchSubComments } }))

import { xiaohongshuComments } from '@/platform/xiaohongshu/comments'

/** 用例里的小红书 ck 配置（有值即视为「已配置」） */
const CONFIGURED_CK = 'web_session=abc; a1=xyz'

/** 笔记 id 与分享链接下发的 xsec_token */
const note = { note_id: 'note-1', xsec_token: 'note-token' }

/** 一条子评论（一级评论响应自带的预览与子评论接口返回是同一套字段） */
const subComment = (id: string): any => ({
  id,
  note_id: 'note-1',
  content: `sub-${id}`,
  create_time: 1700000000000,
  ip_location: '上海',
  like_count: '0',
  liked: false,
  pictures: [],
  show_tags: [],
  at_users: [],
  status: 0,
  user_info: { user_id: 'u1', nickname: '用户', image: '', xsec_token: 'user-token' }
})

/** 一条一级评论，`subIds` 是响应里自带的那几条预览子评论 */
const level1Comment = (id: string, subIds: string[], subCount = subIds.length): any => ({
  id,
  note_id: 'note-1',
  content: `level1-${id}`,
  create_time: 1700000000000,
  ip_location: '上海',
  like_count: '1',
  liked: false,
  pictures: [],
  sub_comment_count: String(subCount),
  sub_comments: subIds.map(subComment),
  show_tags: [],
  at_users: [],
  status: 0,
  user_info: { user_id: 'u1', nickname: '用户', image: '', xsec_token: 'user-token' }
})

/** 一级评论接口的响应信封 */
const noteCommentsResponse = (comments: any[]): any => ({
  code: 0,
  success: true,
  msg: 'ok',
  data: { comments, cursor: '', has_more: false, time: 0, user_id: 'u1', xsec_token: 't' }
})

/** 子评论接口的成功信封，`data.data.comments` 是合并后的子评论列表 */
const fetchedEnvelope = (ids: string[]): any => ({
  success: true,
  data: {
    code: 0,
    success: true,
    msg: 'ok',
    data: { comments: ids.map(subComment), cursor: '', has_more: false, time: 0, user_id: 'u1', xsec_token: 't' }
  }
})

/** 取一条一级评论最终渲染出来的子评论 id 列表 */
const subIds = (comments: any[], index = 0): string[] => comments[index].sub_comments.map((item: any) => item.id)

describe('小红书子评论拉取', () => {
  beforeEach(() => {
    runtime.config.xiaohongshu.numcomment = 10
    runtime.config.xiaohongshu.subCommentLimit = 2
    runtime.config.amagi.cookies.xiaohongshu = ''
    runtime.fetchSubComments.mockReset()
  })

  it('默认配置（subCommentLimit 为 2）即使配了 ck 也不请求子评论接口', async () => {
    runtime.config.amagi.cookies.xiaohongshu = CONFIGURED_CK

    const result = await xiaohongshuComments(noteCommentsResponse([level1Comment('c1', ['s1', 's2'])]), [], note)

    expect(runtime.fetchSubComments).not.toHaveBeenCalled()
    expect(subIds(result)).toEqual(['s1', 's2'])
  })

  it('没配 ck 时哪怕调大 subCommentLimit 也不请求（游客拿不到二级评论）', async () => {
    runtime.config.xiaohongshu.subCommentLimit = 10

    const result = await xiaohongshuComments(noteCommentsResponse([level1Comment('c1', ['s1', 's2'])]), [], note)

    expect(runtime.fetchSubComments).not.toHaveBeenCalled()
    expect(subIds(result)).toEqual(['s1', 's2'])
  })

  it('有 ck 且 subCommentLimit 大于 2 时按配置数量请求，并与预览合并', async () => {
    runtime.config.amagi.cookies.xiaohongshu = CONFIGURED_CK
    runtime.config.xiaohongshu.subCommentLimit = 5
    runtime.fetchSubComments.mockResolvedValue(fetchedEnvelope(['s1', 's2', 's3', 's4', 's5']))

    const result = await xiaohongshuComments(noteCommentsResponse([level1Comment('c1', ['s1', 's2'])]), [], note)

    expect(runtime.fetchSubComments).toHaveBeenCalledTimes(1)
    expect(runtime.fetchSubComments.mock.calls[0][0]).toMatchObject({
      note_id: 'note-1',
      root_comment_id: 'c1',
      xsec_token: 'note-token',
      number: 5
    })
    expect(subIds(result)).toEqual(['s1', 's2', 's3', 's4', 's5'])
  })

  it('接口返回里与预览或一级评论重复的按 id 排除，新增的追加在预览之后', async () => {
    runtime.config.amagi.cookies.xiaohongshu = CONFIGURED_CK
    runtime.config.xiaohongshu.subCommentLimit = 5
    // s1 与预览重复，s2 同时出现在一级评论列表里，s9 才是新增的
    runtime.fetchSubComments.mockResolvedValue(fetchedEnvelope(['s1', 's2', 's9']))

    const result = await xiaohongshuComments(noteCommentsResponse([level1Comment('c1', ['s1']), level1Comment('s2', [])]), [], note)

    expect(subIds(result, 0)).toEqual(['s1', 's9'])
  })

  it('接口失败时只丢这一条的子评论，预览照常渲染', async () => {
    runtime.config.amagi.cookies.xiaohongshu = CONFIGURED_CK
    runtime.config.xiaohongshu.subCommentLimit = 5
    runtime.fetchSubComments.mockRejectedValue(new Error('boom'))

    const result = await xiaohongshuComments(noteCommentsResponse([level1Comment('c1', ['s1', 's2'])]), [], note)

    expect(subIds(result)).toEqual(['s1', 's2'])
  })

  it('没有子评论的一级评论不请求接口', async () => {
    runtime.config.amagi.cookies.xiaohongshu = CONFIGURED_CK
    runtime.config.xiaohongshu.subCommentLimit = 5

    await xiaohongshuComments(noteCommentsResponse([level1Comment('c1', [], 0)]), [], note)

    expect(runtime.fetchSubComments).not.toHaveBeenCalled()
  })

  it('只对最终会渲染的一级评论请求（numcomment 截断之后）', async () => {
    runtime.config.amagi.cookies.xiaohongshu = CONFIGURED_CK
    runtime.config.xiaohongshu.subCommentLimit = 5
    runtime.config.xiaohongshu.numcomment = 1
    runtime.fetchSubComments.mockResolvedValue(fetchedEnvelope(['s1', 's2', 's3']))

    const result = await xiaohongshuComments(noteCommentsResponse([level1Comment('c1', ['s1']), level1Comment('c2', ['s1'])]), [], note)

    expect(runtime.fetchSubComments).toHaveBeenCalledTimes(1)
    expect(runtime.fetchSubComments.mock.calls[0][0]).toMatchObject({ root_comment_id: 'c1' })
    expect(result).toHaveLength(1)
  })
})
