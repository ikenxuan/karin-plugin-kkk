import { DynamicType } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { bilibiliPushItem } from '@/types/config/pushlist'

// 隔离 Karin 的运行时副作用；API 桩只有 v7 业务名，没有 fetcher 或旧方法别名。
const runtime = vi.hoisted(() => {
  const api = {
    videoInfo: vi.fn(),
    videoStream: vi.fn(),
    userCard: vi.fn(),
    comments: vi.fn(),
    danmaku: vi.fn(),
    bangumi: vi.fn(),
    dynamic: vi.fn(),
    article: vi.fn(),
    articleContent: vi.fn(),
    liveRoom: vi.fn(),
    liveRoomInit: vi.fn(),
    userDynamics: vi.fn(),
    userLiveStatus: vi.fn(),
    auth: { status: vi.fn() }
  }
  const render = vi.fn()
  const network = vi.fn()
  const download = vi.fn()
  const db = {
    syncConfigSubscriptions: vi.fn(),
    shouldFilter: vi.fn(),
    addDynamicCache: vi.fn(),
    getGroupSubscriptions: vi.fn()
  }
  const config = {
    app: { parseTip: false, fakeForward: false, usefilelimit: false },
    bilibili: {
      sendContent: [] as string[],
      videoQuality: 32,
      videoInfoMode: 'image',
      showDanmakuInVideoInfo: false,
      numcomment: 5,
      commentImageCollection: false,
      realCommentCount: false,
      push: { parsedynamic: false, parseDynamicTypes: [] as string[], pushVideoQuality: 64, pushMaxAutoVideoSize: 0 }
    },
    amagi: { cookies: { bilibili: '' } },
    pushlist: { bilibili: [] as bilibiliPushItem[] },
    Modify: vi.fn()
  }
  const bot = {
    adapter: { name: 'test' },
    account: { selfId: 'bot', name: '机器人' },
    getGroupInfo: vi.fn(),
    sendForwardMsg: vi.fn()
  }
  const module = {
    Base: class {
      amagi = { bilibili: api }
      headers = {}
      constructor(public e: Message) {}
    },
    Networks: class {
      constructor(private options: unknown) {}
      getData() {
        return network(this.options)
      }
    },
    Common: { useDarkTheme: () => false, formatFileSize: (size: unknown) => String(size) },
    Render: render,
    Count: (count: unknown) => String(count),
    baseHeaders: {},
    bilibiliDB: db,
    cleanOldDynamicCache: vi.fn(),
    downloadFile: download
  }
  return { api, render, network, download, db, config, bot, module, sendMsg: vi.fn() }
})

vi.mock('@ikenxuan/amagi', async (importOriginal) => {
  const original = await importOriginal<typeof import('@ikenxuan/amagi')>()
  return { DynamicType: original.DynamicType, MajorType: original.MajorType, tools: original.tools }
})
vi.mock('node-karin', () => ({
  default: {
    ctx: vi.fn(async () => undefined),
    getAllBotID: () => ['bot'],
    getBot: () => runtime.bot,
    contactGroup: (groupId: string) => ({ type: 'group', peer: groupId }),
    sendMsg: runtime.sendMsg
  },
  common: { sleep: async () => undefined, makeForward: (elements: unknown[]) => elements },
  segment: {
    image: (file: string) => ({ type: 'image', file }),
    text: (text: string) => ({ type: 'text', text }),
    reply: (id: string) => ({ type: 'reply', id })
  }
}))
vi.mock('@/module', () => runtime.module)
vi.mock('@/module/utils', () => runtime.module)
vi.mock('@/module/utils/amagiClient', () => ({
  bilibiliApi: runtime.api,
  softFetch: (fetch: () => Promise<unknown>) => fetch(),
  isSoftFailure: () => false,
  SOFT_ERROR_CODES: { BILIBILI_COMMENTS_DISABLED: 12061 }
}))
vi.mock('@/module/utils/Config', () => ({ Config: runtime.config }))
vi.mock('@/module/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    mark: vi.fn(),
    trace: vi.fn(),
    blue: (value: unknown) => value,
    cyan: (value: unknown) => value,
    green: (value: unknown) => value,
    yellow: (value: unknown) => value,
    red: (value: unknown) => value
  }
}))
vi.mock('@/module/utils/EmojiReaction', () => ({ createEmojiReactionFlow: vi.fn(), settleEmojiReaction: vi.fn() }))
vi.mock('@/platform/bilibili/danmaku', () => ({ getHotDanmaku: vi.fn() }))
vi.mock('@/platform/bilibili', async () => ({
  ...(await import('@/platform/bilibili/genParams')),
  ...(await import('@/platform/bilibili/comments')),
  TimeFormatter: { toDateTime: (value: unknown) => String(value), now: () => 'now' },
  generateDecorationCard: () => null,
  parseAdditionalCard: () => null,
  bilibiliProcessVideos: async (data: { accept_description: string[] }, videoList: unknown[]) => ({
    accept_description: data.accept_description,
    videoList
  }),
  getvideosize: async () => '1',
  getBilibiliStreamUrl: (stream?: { base_url: string }) => stream?.base_url,
  selectBilibiliStreamUrl: async (stream?: { base_url: string }) => stream?.base_url
}))

import { Bilibili } from '@/platform/bilibili/bilibili'
import { Bilibilipush, type BilibiliPushItem } from '@/platform/bilibili/push'

const success = <T>(data: T) => ({ success: true, data: { code: 0, data } })
const poster = [{ type: 'image', file: 'base64://poster' }]
const video = {
  aid: 170001,
  bvid: 'BV17x411w7KC',
  cid: 101,
  title: '视频标题',
  desc: '视频简介',
  pic: 'https://example.com/video.png',
  ctime: 1700000000,
  duration: 800,
  owner: { mid: 42, name: 'UP', face: 'https://example.com/avatar.png' },
  pages: [
    { cid: 101, duration: 360 },
    { cid: 102, duration: 440 }
  ],
  stat: { reply: 5, like: 2, share: 1, view: 100, coin: 3, favorite: 4, danmaku: 6 }
}
const user = {
  card: {
    mid: '42',
    name: 'UP',
    face: 'https://example.com/avatar.png',
    pendant: { image: '' },
    fans: 100,
    attention: 5
  },
  follower: 100,
  like_num: 3
}
const live = {
  room_id: 9,
  live_status: 1,
  live_time: '2026-11-21 10:00:00',
  title: '直播标题',
  area_name: '聊天',
  user_cover: 'https://example.com/live.png'
}
const makeEvent = () =>
  ({
    bot: runtime.bot,
    contact: { type: 'group', peer: 'group' },
    sender: { userId: 'user', nick: '用户' },
    groupId: 'group',
    selfId: 'bot',
    msg: '',
    reply: vi.fn(async () => ({ messageId: 'reply' }))
  }) as unknown as Message

const subscription = (pushTypes: bilibiliPushItem['pushTypes']): bilibiliPushItem => ({
  switch: true,
  host_mid: 42,
  remark: 'UP',
  group_id: ['group:bot'],
  pushTypes
})

const dynamic = (type: DynamicType) => ({
  id_str: 'dynamic',
  type,
  basic: { rid_str: '7' },
  modules: {
    module_author: {
      mid: 42,
      name: 'UP',
      face: 'https://example.com/avatar.png',
      pendant: { image: '' },
      pub_ts: Math.floor(Date.now() / 1000)
    },
    module_stat: { like: { count: 2 }, comment: { count: 5 }, forward: { count: 1 } },
    module_dynamic: {
      topic: null,
      desc: { text: '动态正文', rich_text_nodes: [] },
      major: {
        type: 'MAJOR_TYPE_ARCHIVE',
        archive: { bvid: video.bvid, aid: String(video.aid), duration_text: '13:20' },
        live_rcmd: {
          content: JSON.stringify({ live_play_info: { room_id: 9, title: live.title, cover: live.user_cover, area_name: live.area_name } })
        }
      }
    }
  }
})

const pushData = (type: DynamicType) =>
  ({
    dynamic: {
      remark: 'UP',
      host_mid: 42,
      create_time: Math.floor(Date.now() / 1000),
      targets: [{ groupId: 'group', botId: 'bot' }],
      Dynamic_Data: dynamic(type),
      avatar_img: user.card.face,
      dynamic_type: type
    }
  }) as unknown as Record<string, BilibiliPushItem>

beforeEach(() => {
  vi.clearAllMocks()
  for (const method of Object.values(runtime.api)) {
    if (typeof method === 'function') method.mockReset()
  }
  runtime.config.bilibili.sendContent = []
  runtime.config.bilibili.push.parsedynamic = false
  runtime.config.bilibili.push.parseDynamicTypes = []
  runtime.config.pushlist.bilibili = []
  runtime.api.videoInfo.mockImplementation(async () => success(structuredClone(video)))
  runtime.api.videoStream.mockResolvedValue(
    success({ accept_description: ['360P'], dash: { video: [{ base_url: 'https://example.com/video.m4s', id: 32 }], audio: [] } })
  )
  runtime.api.userCard.mockResolvedValue(success(user))
  runtime.api.comments.mockResolvedValue(success({ replies: [], top: {} }))
  runtime.api.bangumi.mockResolvedValue({ success: true, data: { code: 0, result: { episodes: [] } } })
  runtime.api.liveRoom.mockResolvedValue(success(live))
  runtime.api.liveRoomInit.mockResolvedValue(success({ uid: 42, live_status: 1 }))
  runtime.api.userLiveStatus.mockResolvedValue(
    success({ roomStatus: 1, liveStatus: 1, roomid: 9, title: live.title, cover: live.user_cover })
  )
  runtime.api.article.mockResolvedValue(success({ title: '专栏标题', summary: '专栏简介', stats: {} }))
  runtime.api.articleContent.mockResolvedValue(success({ id: 7, dyn_id_str: 'article-dynamic', content: '<p>正文</p>' }))
  runtime.network.mockResolvedValue({ code: 0, data: { durl: [{ size: 1048576 }], accept_description: ['360P'] } })
  runtime.render.mockResolvedValue(poster)
  runtime.db.shouldFilter.mockResolvedValue(false)
  runtime.db.getGroupSubscriptions.mockResolvedValue([{ host_mid: 42 }])
  runtime.bot.getGroupInfo.mockResolvedValue({ groupId: 'group', groupName: '测试群', avatar: '' })
  runtime.bot.sendForwardMsg.mockResolvedValue({ messageId: 'forward' })
  runtime.sendMsg.mockResolvedValue({ messageId: 'push' })
  runtime.download.mockResolvedValue({ filepath: '', totalBytes: 0 })
})

describe('B站解析仅消费 v7 业务 API', () => {
  it.each([
    [undefined, 101],
    [2, 102],
    [99, 101]
  ])('视频分 P %s 使用 cid %s 并保留视频信息与匿名评论行为', async (p, cid) => {
    runtime.config.bilibili.sendContent = ['info', 'comment']
    const event = makeEvent()
    const parser = new Bilibili(event, { type: 'one_video' })
    await parser.BilibiliHandler({ type: 'one_video', bvid: video.bvid, p })

    expect(runtime.api.videoStream).toHaveBeenCalledWith({ avid: 170001, cid })
    expect(runtime.api.comments).toHaveBeenCalledWith({ number: 5, type: 1, oid: '170001' }, { headers: { Cookie: '' } })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'bilibili/videoInfo',
      expect.objectContaining({ title: '视频标题', bvid: video.bvid })
    )
    expect(event.reply).toHaveBeenCalledWith('这个视频没有评论 ~')
    expect(runtime.network).toHaveBeenCalledWith(
      expect.objectContaining({ url: `https://api.bilibili.com/x/player/playurl?avid=170001&cid=${cid}&platform=html5` })
    )
  })

  it.each([
    [true, 'ep7', { ep_id: 'ep7' }],
    [false, 'ss7', { season_id: 'ss7' }]
  ])('番剧查询保留 ep/season 参数（isEpid=%s）及 result 信封', async (isEpid, realid, params) => {
    const event = makeEvent()
    expect(await new Bilibili(event, { type: 'bangumi_video_info' }).BilibiliHandler({ type: 'bangumi_video_info', isEpid, realid })).toBe(
      true
    )
    expect(runtime.api.bangumi).toHaveBeenCalledWith(params)
    expect(event.reply).toHaveBeenCalledWith('未获取到可解析的剧集，请稍后重试')
  })

  // 迁移覆盖时发现的存量 bug：未知原动态类型的日志少读一层 data，会中断转发解析。
  it('未知原动态类型仍能渲染并发送转发动态', async () => {
    runtime.api.dynamic.mockResolvedValue(success({ item: { ...dynamic(DynamicType.FORWARD), orig: { type: 'DYNAMIC_TYPE_UNKNOWN' } } }))
    const event = makeEvent()
    await new Bilibili(event, { type: 'dynamic_info' }).BilibiliHandler({ type: 'dynamic_info', dynamic_id: 'dynamic' })

    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'bilibili/dynamic/DYNAMIC_TYPE_FORWARD',
      expect.objectContaining({ original_content: {}, dynamic_id: 'dynamic', share_url: 'https://t.bilibili.com/dynamic' })
    )
    expect(event.reply).toHaveBeenCalledWith(poster)
  })

  it('动态视频详情沿用单例业务 API，并将原响应交给渲染', async () => {
    runtime.api.dynamic.mockResolvedValue(success({ item: dynamic(DynamicType.AV) }))
    const event = makeEvent()
    await new Bilibili(event, { type: 'dynamic_info' }).BilibiliHandler({ type: 'dynamic_info', dynamic_id: 'dynamic' })
    expect(runtime.api.dynamic).toHaveBeenCalledWith({ dynamic_id: 'dynamic' })
    expect(runtime.api.videoInfo).toHaveBeenCalledWith({ bvid: video.bvid })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'bilibili/dynamic/DYNAMIC_TYPE_AV',
      expect.objectContaining({ image_url: video.pic, share_url: `https://www.bilibili.com/video/${video.bvid}` })
    )
  })

  it('专栏查询保留 id 参数，缺正文时提示用户', async () => {
    runtime.api.dynamic.mockResolvedValue(success({ item: dynamic(DynamicType.ARTICLE) }))
    runtime.api.articleContent.mockResolvedValue(success(null))
    const event = makeEvent()
    await new Bilibili(event, { type: 'dynamic_info' }).BilibiliHandler({ type: 'dynamic_info', dynamic_id: 'dynamic' })
    expect(runtime.api.article).toHaveBeenCalledWith({ id: '7' })
    expect(runtime.api.articleContent).toHaveBeenCalledWith({ id: '7' })
    expect(event.reply).toHaveBeenCalledWith('获取专栏正文失败，该专栏可能已被删除或设为私密')
  })

  it('直播动态使用单例 userCard API 获取主播资料', async () => {
    runtime.api.dynamic.mockResolvedValue(success({ item: dynamic(DynamicType.LIVE_RCMD) }))
    const event = makeEvent()
    await new Bilibili(event, { type: 'dynamic_info' }).BilibiliHandler({ type: 'dynamic_info', dynamic_id: 'dynamic' })
    expect(runtime.api.userCard).toHaveBeenCalledWith({ host_mid: 42 })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD',
      expect.objectContaining({ avatar_url: user.card.face, share_url: 'https://live.bilibili.com/9' })
    )
  })

  it.each([0, 1])('直播间查询保留 room_id 和主播 UID（live_status=%s）', async (liveStatus) => {
    runtime.api.liveRoomInit.mockResolvedValue(success({ uid: 42, live_status: liveStatus }))
    const event = makeEvent()
    await new Bilibili(event, { type: 'live_room_detail' }).BilibiliHandler({ type: 'live_room_detail', room_id: '9' })
    expect(runtime.api.liveRoom).toHaveBeenCalledWith({ room_id: '9' })
    expect(runtime.api.liveRoomInit).toHaveBeenCalledWith({ room_id: '9' })
    expect(runtime.api.userCard).toHaveBeenCalledWith({ host_mid: 42 })
    if (liveStatus === 0) expect(event.reply).toHaveBeenCalledWith('「UP」\n未开播，正在休息中~')
    else expect(runtime.render).toHaveBeenCalledWith(event, 'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD', expect.any(Object))
  })

  it('弹幕逐段调用 danmaku，并保留失败分段降级为空的行为', async () => {
    const first = { idStr: 'first', content: '第一段' }
    const third = { idStr: 'third', content: '第三段' }
    runtime.api.danmaku
      .mockResolvedValueOnce(success({ elems: [first] }))
      .mockRejectedValueOnce(new Error('第二段失败'))
      .mockResolvedValueOnce(success({ elems: [third] }))
    expect(await new Bilibili(makeEvent(), { type: 'one_video' }).fetchVideoDanmakuList(101, 800)).toEqual([first, third])
    expect(runtime.api.danmaku.mock.calls).toEqual([
      [{ cid: 101, segment_index: 1 }],
      [{ cid: 101, segment_index: 2 }],
      [{ cid: 101, segment_index: 3 }]
    ])
  })

  it('视频业务 API 抛出的错误继续交给上层处理', async () => {
    const error = new Error('视频详情获取失败')
    runtime.api.videoInfo.mockRejectedValue(error)
    await expect(new Bilibili(makeEvent(), { type: 'one_video' }).BilibiliHandler({ type: 'one_video', bvid: video.bvid })).rejects.toBe(
      error
    )
  })
})

describe('B站推送仅消费 v7 业务 API', () => {
  it('userDynamics 结果保留当天动态和群组目标', async () => {
    runtime.api.userDynamics.mockResolvedValue(success({ items: [dynamic(DynamicType.AV)] }))
    const result = await new Bilibilipush(makeEvent()).getDynamicList([subscription(['video'])])
    expect(runtime.api.userDynamics).toHaveBeenCalledWith({ host_mid: 42 })
    expect(result.willbepushlist.dynamic).toMatchObject({
      host_mid: 42,
      dynamic_type: DynamicType.AV,
      targets: [{ groupId: 'group', botId: 'bot' }]
    })
  })

  it('UID 直播直查成功后形成推送项，纯直播订阅不再查空间动态', async () => {
    const result = await new Bilibilipush(makeEvent()).getDynamicList([subscription(['live'])])
    expect(runtime.api.userLiveStatus).toHaveBeenCalledWith({ host_mid: 42 })
    expect(runtime.api.liveRoom).toHaveBeenCalledWith({ room_id: '9' })
    expect(Object.values(result.willbepushlist)).toEqual([
      expect.objectContaining({ host_mid: 42, dynamic_type: DynamicType.LIVE_RCMD, targets: [{ groupId: 'group', botId: 'bot' }] })
    ])
    expect(runtime.api.userDynamics).not.toHaveBeenCalled()
  })

  it('直播直查失败时回退空间动态，并用 liveRoom 对齐场次', async () => {
    runtime.api.userLiveStatus.mockRejectedValue(new Error('直查失败'))
    runtime.api.userDynamics.mockResolvedValue(success({ items: [dynamic(DynamicType.LIVE_RCMD)] }))
    const result = await new Bilibilipush(makeEvent()).getDynamicList([subscription(['live'])])
    expect(runtime.api.userDynamics).toHaveBeenCalledWith({ host_mid: 42 })
    expect(runtime.api.liveRoom).toHaveBeenCalledWith({ room_id: '9' })
    expect(Object.values(result.willbepushlist)).toEqual([expect.objectContaining({ dynamic_type: DynamicType.LIVE_RCMD })])
  })

  it('补全订阅备注时使用 userCard，保存返回的用户名', async () => {
    runtime.config.pushlist.bilibili = [{ ...subscription(['video']), remark: '' }]
    await new Bilibilipush(makeEvent()).checkremark()
    expect(runtime.config.pushlist.bilibili[0].remark).toBe('UP')
    expect(runtime.config.Modify).toHaveBeenCalledWith('pushlist', 'bilibili', runtime.config.pushlist.bilibili)
  })

  it('订阅列表渲染仍从 userCard 的成功信封读取资料', async () => {
    const event = makeEvent()
    await new Bilibilipush(event).renderPushList()
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'bilibili/userlist',
      expect.objectContaining({ renderOpt: [expect.objectContaining({ username: 'UP', host_mid: '42', avatar_img: user.card.face })] })
    )
    expect(event.reply).toHaveBeenCalledWith(poster)
  })

  it('视频动态推送保留稿件详情和渲染后的消息', async () => {
    const event = makeEvent()
    await new Bilibilipush(event).getdata(pushData(DynamicType.AV))
    expect(runtime.api.videoInfo).toHaveBeenCalledWith({ bvid: video.bvid })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'bilibili/dynamic/DYNAMIC_TYPE_AV',
      expect.objectContaining({ image_url: video.pic, share_url: `https://www.bilibili.com/video/${video.bvid}` })
    )
    expect(runtime.sendMsg).toHaveBeenCalledWith('bot', { type: 'group', peer: 'group' }, poster)
  })

  it('专栏动态使用 article 与 articleContent，保留正文分享地址', async () => {
    const event = makeEvent()
    await new Bilibilipush(event).getdata(pushData(DynamicType.ARTICLE))
    expect(runtime.api.article).toHaveBeenCalledWith({ id: '7' })
    expect(runtime.api.articleContent).toHaveBeenCalledWith({ id: '7' })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'bilibili/dynamic/DYNAMIC_TYPE_ARTICLE',
      expect.objectContaining({ title: '专栏标题', share_url: 'https://www.bilibili.com/opus/article-dynamic' })
    )
  })

  it('自动解析视频推送使用 videoStream 并保留下载请求', async () => {
    runtime.config.bilibili.push.parsedynamic = true
    runtime.config.bilibili.push.parseDynamicTypes = [DynamicType.AV]
    await new Bilibilipush(makeEvent()).getdata(pushData(DynamicType.AV))
    expect(runtime.api.videoStream).toHaveBeenCalledWith({ avid: 170001, cid: 101 })
    expect(runtime.download).toHaveBeenCalledWith(
      'https://example.com/video.m4s',
      expect.objectContaining({ title: `Bil_V_${video.bvid}.mp4` })
    )
  })
})
