import type { AmagiSuccess } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { DouyinIdData } from '@/types'
import type { douyinPushItem } from '@/types/config/pushlist'

const runtime = vi.hoisted(() => {
  const web = {
    work: vi.fn(),
    comments: vi.fn(),
    userProfile: vi.fn(),
    emojis: vi.fn(),
    danmaku: vi.fn(),
    userWorks: vi.fn(),
    userLikes: vi.fn(),
    userRecommendations: vi.fn(),
    mixWorks: vi.fn(),
    music: vi.fn(),
    liveRoom: vi.fn(),
    search: vi.fn()
  }
  const app = {
    work: vi.fn(),
    comments: vi.fn(),
    appFetchCommentReplies: vi.fn()
  }
  return {
    web,
    app,
    client: { douyin: { web, app } },
    config: {
      app: { parseTip: false, removeCache: true },
      amagi: { cookies: { douyin: '' } },
      laboratory: { douyinApp: { dailyWork: false, appComments: false, commandParse: false, signUrl: '' } },
      douyin: {
        numcomment: 3,
        sendContent: [] as string[],
        burnDanmaku: false,
        videoInfoMode: 'image',
        displayContent: ['cover'],
        commentImageCollection: false
      },
      pushlist: { douyin: [] as douyinPushItem[] }
    },
    render: vi.fn(),
    processImageUrl: vi.fn(),
    renderWorkImage: vi.fn(),
    parseComments: vi.fn(),
    downloadFile: vi.fn(),
    downloadVideo: vi.fn(),
    modify: vi.fn(),
    processors: { post: vi.fn(), favorite: vi.fn(), recommend: vi.fn() },
    db: { syncConfigSubscriptions: vi.fn(), getGroupSubscriptions: vi.fn() },
    cleanOldDynamicCache: vi.fn(),
    sendCommentImages: vi.fn()
  }
})

const utils = vi.hoisted(() => ({
  Base: class {
    e: Message
    headers = {}
    constructor(e: Message) {
      this.e = e
    }
    get amagi() {
      return runtime.client
    }
  },
  baseHeaders: {},
  Common: { tempDri: { video: 'D:/test/video/', images: 'D:/test/images/' } },
  Count: (value: number) => String(value),
  Render: runtime.render,
  processImageUrl: runtime.processImageUrl,
  downloadFile: runtime.downloadFile,
  downloadVideo: runtime.downloadVideo,
  cleanOldDynamicCache: runtime.cleanOldDynamicCache,
  douyinDB: runtime.db
}))

vi.mock('@/module', () => utils)
vi.mock('@/module/utils', () => utils)
vi.mock('@/module/utils/Config', () => ({ Config: { ...runtime.config, Modify: runtime.modify } }))
vi.mock('@/module/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    mark: vi.fn(),
    yellow: (value: unknown) => String(value),
    green: (value: unknown) => String(value)
  }
}))
vi.mock('node-karin', () => ({
  default: { ctx: async () => undefined, getAllBotID: () => ['bot-1'] },
  common: { sleep: async () => undefined, makeForward: (elements: unknown[]) => elements },
  segment: { image: (file: string) => ({ type: 'image', file }), text: (text: string) => ({ type: 'text', text }) },
  mkdirSync: vi.fn()
}))
vi.mock('@/module/utils/EmojiReaction', () => ({ createEmojiReactionFlow: vi.fn(), settleEmojiReaction: vi.fn() }))
vi.mock('@/module/utils/EpisodeSelection', () => ({ EPISODE_SELECTION_PAGE_SIZE: 8, EPISODE_SELECTION_TTL_SECONDS: 110 }))
vi.mock('@/platform/douyin', () => ({
  douyinComments: runtime.parseComments,
  sendDouyinCommentImages: runtime.sendCommentImages
}))
vi.mock('@/platform/douyin/videoQuality', () => ({
  douyinProcessVideos: (videos: unknown[]) => videos,
  buildDouyinPlayUrl: (address: { url_list: string[] }) => address.url_list[0]
}))
vi.mock('@/platform/douyin/shortUrl', () => ({ toDouyinShortUrl: async (target: string) => target }))
vi.mock('@/platform/douyin/danmaku', () => ({ burnDouyinDanmaku: vi.fn() }))
vi.mock('@/platform/douyin/push/post', () => ({ processPostList: runtime.processors.post }))
vi.mock('@/platform/douyin/push/favorite', () => ({ processFavoriteList: runtime.processors.favorite }))
vi.mock('@/platform/douyin/push/recommend', () => ({ processRecommendList: runtime.processors.recommend }))
vi.mock('@/platform/douyin/push/live', () => ({ processLiveStream: vi.fn() }))
vi.mock('@/platform/douyin/push/render', () => ({
  renderWorkImage: runtime.renderWorkImage,
  renderFavoriteImage: vi.fn(),
  renderRecommendImage: vi.fn(),
  renderLiveImage: vi.fn()
}))

import { DouYin } from '@/platform/douyin/douyin'
import { DouYinpush } from '@/platform/douyin/push'

const success = <T>(endpoint: string, data: T): AmagiSuccess<T> => ({
  success: true,
  message: '获取成功',
  data,
  meta: { requestId: 'consumer-test', clientId: 'test', platform: 'douyin', endpoint, durationMs: 1, attempts: 1 }
})

const image = { type: 'image', file: 'base64://aW1hZ2U=' }
const profile = {
  user: {
    sec_uid: 'author-1',
    nickname: '作者',
    unique_id: 'author',
    short_id: '001',
    avatar_larger: { url_list: ['https://example.test/avatar.png'] },
    cover_and_head_image_info: { profile_cover_list: [] },
    signature: '简介',
    follower_count: 12,
    following_count: 4,
    total_favorited: 25,
    live_status: 0
  }
}
const videoWork = {
  aweme_id: 'aweme-1',
  aweme_type: 0,
  is_slides: false,
  desc: '视频简介',
  preview_title: '视频标题',
  share_url: 'https://www.douyin.com/video/aweme-1',
  create_time: 1700000000,
  region: 'CN',
  music: null,
  images: null,
  author: { sec_uid: 'author-1', nickname: '作者', avatar_thumb: { url_list: ['https://example.test/avatar.png'] } },
  statistics: { digg_count: 3, comment_count: 4, share_count: 5, collect_count: 6 },
  video: {
    duration: 2000,
    bit_rate: [{ FPS: 30, play_addr: { width: 1920, height: 1080, data_size: 1024, url_list: ['https://example.test/video.mp4'] } }]
  }
}

const createEvent = () => {
  const reply = vi.fn(async (_message: unknown) => ({ messageId: 'message-1' }))
  const event = {
    reply,
    selfId: 'bot-1',
    groupId: 'group-1',
    contact: { scene: 'group', peer: 'group-1' },
    bot: { getGroupInfo: async () => ({ groupId: 'group-1', groupName: '测试群', avatar: 'https://example.test/group.png' }) }
  } as unknown as Message
  return { event, reply }
}

const subscription = (pushTypes: Array<'post' | 'favorite' | 'recommend'> = ['post']): douyinPushItem => ({
  sec_uid: 'author-1',
  short_id: 'author',
  remark: '作者',
  group_id: ['group-1:bot-1'],
  switch: true,
  pushTypes
})

beforeEach(() => {
  vi.clearAllMocks()
  runtime.config.douyin.sendContent = []
  runtime.config.douyin.videoInfoMode = 'image'
  runtime.config.douyin.burnDanmaku = false
  runtime.config.douyin.commentImageCollection = false
  runtime.config.laboratory.douyinApp.dailyWork = false
  runtime.config.laboratory.douyinApp.appComments = false
  runtime.config.pushlist.douyin = []
  runtime.web.work.mockResolvedValue(success('douyin.parseWork', { aweme_detail: videoWork }))
  runtime.web.comments.mockResolvedValue(success('douyin.comments', { comments: [], total: 0 }))
  runtime.app.work.mockResolvedValue(success('douyin.appParseWork', { aweme_detail: videoWork }))
  runtime.app.comments.mockResolvedValue(success('douyin.appComments', { comments: [], total: 0 }))
  runtime.web.userProfile.mockResolvedValue(success('douyin.userProfile', profile))
  runtime.web.emojis.mockResolvedValue(success('douyin.emojiList', { emoji_list: [] }))
  runtime.web.danmaku.mockResolvedValue(success('douyin.danmakuList', { danmaku_list: [] }))
  runtime.web.mixWorks.mockResolvedValue(success('douyin.mixAweme', { aweme_list: [] }))
  runtime.web.music.mockResolvedValue(success('douyin.musicInfo', { music_info: null }))
  for (const method of ['userWorks', 'userLikes', 'userRecommendations'] as const) {
    runtime.web[method].mockResolvedValue(success('douyin.userVideoList', { aweme_list: [] }))
  }
  for (const processor of Object.values(runtime.processors)) processor.mockResolvedValue([])
  runtime.render.mockResolvedValue([image])
  runtime.processImageUrl.mockImplementation(async (url: string) => url)
  runtime.renderWorkImage.mockResolvedValue([image])
  runtime.parseComments.mockResolvedValue({ CommentsData: [], image_url: [], image_media: [] })
  runtime.downloadFile.mockResolvedValue({})
  runtime.downloadVideo.mockResolvedValue(undefined)
  runtime.modify.mockResolvedValue(undefined)
  runtime.cleanOldDynamicCache.mockResolvedValue(0)
  runtime.db.getGroupSubscriptions.mockResolvedValue([])
})

describe('抖音主解析消费者的 v7 Web API', () => {
  it('使用 work、comments、userProfile、emojis 和 danmaku，保留参数及响应信封读取', async () => {
    runtime.config.douyin.sendContent = ['info', 'comment', 'video']
    runtime.config.douyin.burnDanmaku = true
    runtime.web.danmaku.mockResolvedValue(
      success('douyin.danmakuList', { danmaku_list: [{ danmaku_id: 'dm-1', text: '弹幕', offset_time: 0 }] })
    )
    const { event, reply } = createEvent()
    const data: DouyinIdData = { type: 'one_work', aweme_id: 'aweme-1' }
    const consumer = new DouYin(event, data)

    expect(await consumer.DouyinHandler(data)).toBe(true)

    expect(runtime.web.work).toHaveBeenCalledWith({ aweme_id: 'aweme-1' })
    expect(runtime.web.comments).toHaveBeenCalledWith({ aweme_id: 'aweme-1', number: 3 })
    expect(runtime.web.userProfile).toHaveBeenCalledWith({ sec_uid: 'author-1' })
    expect(runtime.web.emojis).toHaveBeenCalledExactlyOnceWith()
    expect(runtime.web.danmaku).toHaveBeenCalledWith({ aweme_id: 'aweme-1', duration: 2000 })
    expect(runtime.parseComments).toHaveBeenCalledWith({ comments: [], total: 0 }, [], { app: false })
    expect(runtime.renderWorkImage).toHaveBeenCalledWith(
      expect.objectContaining({ Detail_Data: expect.objectContaining({ user_info: profile }) })
    )
    expect(reply).toHaveBeenCalledWith([image])
    expect(reply).toHaveBeenCalledWith('这个作品没有评论 ~')
    expect(consumer.workType).toBe('video')
  })

  it('App 作品信息卡片跳过 HEIC 封面并选用同列表中的可显示备选', async () => {
    runtime.config.laboratory.douyinApp.dailyWork = true
    runtime.config.douyin.sendContent = ['info']
    runtime.config.douyin.videoInfoMode = 'text'
    const heicCover = 'https://cdn.example.test/app-cover.heic?biz_tag=aweme_video'
    const jpgCover = 'https://cdn.example.test/app-cover.jpg'
    runtime.app.work.mockResolvedValue(
      success('douyin.appParseWork', {
        aweme_detail: {
          ...videoWork,
          statistics: { ...videoWork.statistics, recommend_count: 3 },
          video: {
            ...videoWork.video,
            animated_cover: { url_list: [heicCover] },
            cover: { url_list: [heicCover, jpgCover] },
            origin_cover: { url_list: [heicCover, jpgCover] }
          }
        }
      })
    )
    const { event } = createEvent()
    const data: DouyinIdData = { type: 'one_work', aweme_id: 'aweme-heic-cover' }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.processImageUrl).toHaveBeenCalledWith(jpgCover, videoWork.desc)
    expect(runtime.processImageUrl).not.toHaveBeenCalledWith(heicCover, videoWork.desc)
  })

  it('开启日常作品解析后，单作品详情改用 App work 接口', async () => {
    runtime.config.laboratory.douyinApp.dailyWork = true
    const { event } = createEvent()
    const data: DouyinIdData = { type: 'one_work', aweme_id: 'aweme-app-1' }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.app.work).toHaveBeenCalledWith({ aweme_id: 'aweme-app-1' })
    expect(runtime.web.work).not.toHaveBeenCalled()
  })

  it('日常文章同时读取 Web 正文和 App 封面，再将合并结果交给文章模板', async () => {
    runtime.config.laboratory.douyinApp.dailyWork = true
    runtime.config.douyin.sendContent = ['info']
    const awemeId = 'article-app-web-1'
    const appCoverUrl = 'https://example.test/app-article-cover.jpg'
    const webCoverUrl = 'https://example.test/web-article-cover.jpg'
    const appArticleContent = JSON.stringify({ markdown: '不可用的 App 正文', head_poster_list: { url_list: [appCoverUrl] } })
    const webArticleContent = JSON.stringify({ markdown: '来自 Web 的可用正文' })
    const makeArticle = (article_content: string, head_poster_url: string) => ({
      ...videoWork,
      aweme_type: 163,
      article_info: {
        article_title: '文章标题',
        article_content,
        fe_data: JSON.stringify({ head_poster_list: { url_list: [head_poster_url] }, image_list: [], read_time: 1 })
      }
    })
    runtime.app.work.mockResolvedValue(success('douyin.appParseWork', { aweme_detail: makeArticle(appArticleContent, appCoverUrl) }))
    runtime.web.work.mockResolvedValue(success('douyin.parseWork', { aweme_detail: makeArticle(webArticleContent, webCoverUrl) }))
    const { event } = createEvent()
    const data: DouyinIdData = { type: 'one_work', aweme_id: awemeId }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.app.work).toHaveBeenCalledOnce()
    expect(runtime.web.work).toHaveBeenCalledExactlyOnceWith({ aweme_id: awemeId })
    const detail = runtime.renderWorkImage.mock.calls[0]?.[0]?.Detail_Data
    expect(JSON.parse(detail.article_info.article_content).markdown).toBe('来自 Web 的可用正文')
    expect(JSON.parse(detail.article_info.fe_data).head_poster_list.url_list[0]).toBe(appCoverUrl)
  })

  it.each(['is_25_story', 'is_story'] as const)('$storyField 为 1 时跳过评论处理且不添加限时日常展示标记', async (storyField) => {
    runtime.config.laboratory.douyinApp.appComments = true
    runtime.config.douyin.sendContent = ['info', 'comment']
    runtime.config.douyin.videoInfoMode = 'image'
    runtime.web.work.mockResolvedValue(
      success('douyin.parseWork', {
        aweme_detail: { ...videoWork, [storyField]: 1 }
      })
    )
    const { event, reply } = createEvent()
    const data: DouyinIdData = { type: 'one_work', aweme_id: 'story-aweme-1' }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.web.comments).not.toHaveBeenCalled()
    expect(runtime.app.comments).not.toHaveBeenCalled()
    expect(runtime.web.emojis).not.toHaveBeenCalled()
    expect(runtime.parseComments).not.toHaveBeenCalled()
    expect(reply).not.toHaveBeenCalledWith('这个作品没有评论 ~')
    expect(runtime.renderWorkImage).toHaveBeenCalledWith(
      expect.objectContaining({
        dynamicTypeLabel: '视频作品',
        Detail_Data: expect.objectContaining({ [storyField]: 1 })
      })
    )
  })

  it('开启 App 评论和评论图片收集时使用 App 评论数据并交付带 Live Photo 的图片媒体', async () => {
    runtime.config.laboratory.douyinApp.appComments = true
    runtime.config.douyin.commentImageCollection = true
    runtime.config.douyin.sendContent = ['comment']
    const comment = {
      cid: 'comment-1',
      text: { nodes: [{ type: 'text', text: '评论' }] },
      nickname: '用户',
      userimageurl: 'https://example.test/avatar.png',
      create_time: 1700000000,
      ip_label: '上海',
      digg_count: 3
    }
    const media = [{ imageUrl: 'https://example.test/comment.jpg', liveVideoUrl: 'https://example.test/comment.mp4' }]
    runtime.app.comments.mockResolvedValue(success('douyin.appComments', { comments: [{ cid: 'comment-1' }] }))
    runtime.parseComments.mockResolvedValue({ CommentsData: [comment], image_url: [], image_media: media })
    const { event } = createEvent()
    const data: DouyinIdData = { type: 'one_work', aweme_id: 'aweme-app-1' }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.app.comments).toHaveBeenCalledWith({ aweme_id: 'aweme-app-1', number: 3 })
    expect(runtime.web.comments).not.toHaveBeenCalled()
    expect(runtime.parseComments).toHaveBeenCalledWith({ comments: [{ cid: 'comment-1' }] }, [], { app: true })
    expect(runtime.sendCommentImages).toHaveBeenCalledWith(event, media, '视频简介')
  })

  it('使用 userWorks 展示用户作品，保留用户资料与等待选择的流程', async () => {
    const { event, reply } = createEvent()
    const data: DouyinIdData = { type: 'user_dynamic', sec_uid: 'author-1' }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.web.userWorks).toHaveBeenCalledWith({ sec_uid: 'author-1' })
    expect(runtime.web.userProfile).toHaveBeenCalledWith({ sec_uid: 'author-1' })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'douyin/user_profile',
      expect.objectContaining({ user: expect.objectContaining({ nickname: '作者' }), videos: [] })
    )
    expect(reply).toHaveBeenCalledWith([image])
  })

  it('使用 mixWorks 获取合集，保留数量上限和空合集错误', async () => {
    const { event } = createEvent()
    const data: DouyinIdData = { type: 'mix_work', mix_id: 'mix-1' }

    await expect(new DouYin(event, data).DouyinHandler(data)).rejects.toThrow('获取合集作品列表失败')
    expect(runtime.web.mixWorks).toHaveBeenCalledWith({ mix_id: 'mix-1', number: 200 })
  })

  it('使用 music 获取音乐，无详情时仍给出原有提示', async () => {
    const { event, reply } = createEvent()
    const data: DouyinIdData = { type: 'music_work', music_id: 'music-1' }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.web.music).toHaveBeenCalledWith({ music_id: 'music-1' })
    expect(reply).toHaveBeenCalledWith('解析错误！未获取到音乐信息，无法下载', { reply: true })
  })

  it('使用 liveRoom 获取直播详情，保留 web_rid 与内部 room_id 参数', async () => {
    runtime.web.userProfile.mockResolvedValue(
      success('douyin.userProfile', {
        user: { ...profile.user, live_status: 1, room_id_str: 'room-1', room_data: JSON.stringify({ owner: { web_rid: 'web-1' } }) }
      })
    )
    runtime.web.liveRoom.mockResolvedValue(
      success('douyin.liveRoomInfo', { data: { data: [{ title: '正在直播', cover: { url_list: ['https://example.test/live.png'] } }] } })
    )
    const { event, reply } = createEvent()
    const data: DouyinIdData = { type: 'live_room_detail', sec_uid: 'author-1' }

    expect(await new DouYin(event, data).DouyinHandler(data)).toBe(true)

    expect(runtime.web.liveRoom).toHaveBeenCalledWith({ room_id: 'room-1', web_rid: 'web-1' })
    expect(runtime.render).toHaveBeenCalledWith(event, 'douyin/live', expect.objectContaining({ text: '正在直播', room_id: 'web-1' }))
    expect(reply).toHaveBeenCalledWith([image])
  })
})

describe('抖音推送消费者的 v7 Web API', () => {
  it.each([
    { type: 'post', method: 'userWorks' },
    { type: 'favorite', method: 'userLikes' },
    { type: 'recommend', method: 'userRecommendations' }
  ] as const)('使用 $method 获取 $type 列表，保留条数和下游数据', async ({ type, method }) => {
    const list = [{ aweme_id: 'push-aweme-1' }]
    runtime.web[method].mockResolvedValue(success('douyin.userVideoList', { aweme_list: list }))
    const item = subscription([type])
    const pushItem = { pushType: type, Detail_Data: { aweme_id: 'push-aweme-1' } }
    runtime.processors[type].mockResolvedValue([pushItem])
    const { event } = createEvent()

    const result = await new DouYinpush(event).getDynamicList([item])

    expect(runtime.web.userProfile).toHaveBeenCalledWith({ sec_uid: 'author-1' })
    expect(runtime.web[method]).toHaveBeenCalledWith({ sec_uid: 'author-1', number: 15 })
    expect(runtime.processors[type]).toHaveBeenCalledWith(
      list,
      'author-1',
      profile,
      item,
      [{ groupId: 'group-1', botId: 'bot-1' }],
      ...(type === 'post' ? [] : [false])
    )
    expect(result).toEqual({ [`${type}_push-aweme-1`]: pushItem })
  })

  it('通过 search 补齐订阅用户 sec_uid，保存配置后继续正常推送流程', async () => {
    const item = { ...subscription(), sec_uid: '' }
    runtime.config.pushlist.douyin = [item]
    runtime.web.search.mockResolvedValue(
      success('douyin.search', { user_list: [{ user_info: { unique_id: 'author', sec_uid: 'author-1' } }] })
    )
    const { event } = createEvent()

    expect(await new DouYinpush(event).action()).toBe(true)

    expect(runtime.web.search).toHaveBeenCalledWith({ query: 'author', type: 'user' })
    expect(item.sec_uid).toBe('author-1')
    expect(runtime.modify).toHaveBeenCalledWith('pushlist', 'douyin', [item])
    expect(runtime.web.userWorks).toHaveBeenCalledWith({ sec_uid: 'author-1', number: 15 })
  })

  it('通过 userProfile 渲染订阅列表，保留统计字段与推送类型', async () => {
    runtime.config.pushlist.douyin = [subscription()]
    runtime.db.getGroupSubscriptions.mockResolvedValue([{ sec_uid: 'author-1' }])
    const { event, reply } = createEvent()

    await new DouYinpush(event).renderPushList()

    expect(runtime.web.userProfile).toHaveBeenCalledWith({ sec_uid: 'author-1' })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'douyin/userlist',
      expect.objectContaining({
        renderOpt: [
          {
            avatar_img: 'https://example.test/avatar.png',
            username: '作者',
            short_id: 'author',
            fans: '12',
            total_favorited: '25',
            following_count: '4',
            switch: true,
            pushTypes: ['post']
          }
        ]
      })
    )
    expect(reply).toHaveBeenCalledWith([image])
  })

  it('通过 userProfile 补齐订阅备注并保存原有配置', async () => {
    const item = { ...subscription(), remark: '' }
    runtime.config.pushlist.douyin = [item]
    const { event } = createEvent()

    expect(await new DouYinpush(event).checkremark()).toBe(false)

    expect(item.remark).toBe('作者')
    expect(runtime.modify).toHaveBeenCalledWith('pushlist', 'douyin', [item])
  })
})
