import type { AmagiSuccess, DouyinUserProfileResponse } from '@ikenxuan/amagi'
import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { DouyinListItem, DouyinWorkDetailData } from '@/platform/douyin/types'
import type { douyinPushItem } from '@/types/config/pushlist'

const runtime = vi.hoisted(() => ({
  web: { userProfile: vi.fn(), liveRoom: vi.fn() },
  db: {
    hasHistory: vi.fn(),
    isAwemePushed: vi.fn(),
    addAwemeCache: vi.fn(),
    touchAwemeCache: vi.fn(),
    getLiveStatus: vi.fn(),
    updateLiveStatus: vi.fn()
  },
  render: vi.fn()
}))

vi.mock('@/module/utils/amagiClient', () => ({ douyinWebApi: runtime.web }))
vi.mock('@/module', () => ({ douyinDB: runtime.db }))
vi.mock('@/module/utils', () => ({ Count: (value: number) => String(value), Render: runtime.render }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() } }))

import { processFavoriteList } from '@/platform/douyin/push/favorite'
import { processLiveStream } from '@/platform/douyin/push/live'
import { processRecommendList } from '@/platform/douyin/push/recommend'
import { renderWorkImage } from '@/platform/douyin/push/render'

const success = <T>(endpoint: string, data: T): AmagiSuccess<T> => ({
  success: true,
  message: '获取成功',
  data,
  meta: { requestId: 'push-test', clientId: 'test', platform: 'douyin', endpoint, durationMs: 1, attempts: 1 }
})

const userProfile = (sec_uid: string, nickname: string, overrides: Record<string, unknown> = {}): DouyinUserProfileResponse =>
  ({
    status_code: 0,
    user: {
      sec_uid,
      nickname,
      unique_id: sec_uid,
      short_id: '001',
      avatar_larger: { uri: 'avatar-uri', url_list: ['https://example.test/avatar.png'] },
      follower_count: 12,
      following_count: 4,
      total_favorited: 25,
      live_status: 0,
      ...overrides
    }
  }) as unknown as DouyinUserProfileResponse

const subscriber = userProfile('subscriber-1', '订阅者')
const author = userProfile('author-1', '作品作者')
const targets = [{ groupId: 'group-1', botId: 'bot-1' }]
const item: douyinPushItem = {
  sec_uid: 'subscriber-1',
  short_id: 'subscriber',
  remark: '订阅者',
  group_id: ['group-1:bot-1'],
  switch: true
}
const aweme = {
  aweme_id: 'aweme-1',
  aweme_type: 0,
  desc: '作品简介',
  create_time: 1700000000,
  author: { sec_uid: 'author-1', nickname: '作品作者', avatar_thumb: { url_list: ['https://example.test/avatar.png'] } },
  statistics: { digg_count: 3, comment_count: 4, share_count: 5, collect_count: 6, recommend_count: 1 },
  video: { cover: { url_list: ['https://example.test/cover.png'] }, duration: 2000 }
} as unknown as DouyinListItem
const image = { type: 'image', file: 'base64://aW1hZ2U=' }

beforeEach(() => {
  vi.clearAllMocks()
  runtime.web.userProfile.mockResolvedValue(success('douyin.userProfile', author))
  runtime.db.hasHistory.mockResolvedValue(true)
  runtime.db.isAwemePushed.mockResolvedValue(false)
  runtime.db.getLiveStatus.mockResolvedValue({ living: false })
  runtime.render.mockResolvedValue([image])
})

describe('抖音喜欢、推荐推送辅助消费者的 v7 Web API', () => {
  it.each([
    { pushType: 'favorite', process: processFavoriteList },
    { pushType: 'recommend', process: processRecommendList }
  ] as const)('$pushType 通过 userProfile 获取作品作者，保留订阅者资料和缓存续期', async ({ pushType, process }) => {
    const result = await process([aweme], 'subscriber-1', subscriber, item, targets)

    expect(runtime.web.userProfile).toHaveBeenCalledExactlyOnceWith({ sec_uid: 'author-1' })
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({
      pushType,
      sec_uid: 'subscriber-1',
      targets,
      Detail_Data: { aweme_id: 'aweme-1', user_info: subscriber, author_user_info: author }
    })
    expect(runtime.db.touchAwemeCache).toHaveBeenCalledWith('subscriber-1', pushType, ['aweme-1'])
  })

  it.each([
    { pushType: 'favorite', process: processFavoriteList },
    { pushType: 'recommend', process: processRecommendList }
  ] as const)('$pushType 新用户 API 抛错时继续推送，保留订阅者资料', async ({ pushType, process }) => {
    runtime.web.userProfile.mockRejectedValueOnce(new Error('作者资料获取失败'))

    const result = await process([aweme], 'subscriber-1', subscriber, item, targets)

    expect(runtime.web.userProfile).toHaveBeenCalledExactlyOnceWith({ sec_uid: 'author-1' })
    expect(result[0].Detail_Data.user_info).toBe(subscriber)
    expect(result[0].Detail_Data.author_user_info).toBeUndefined()
    expect(runtime.db.touchAwemeCache).toHaveBeenCalledWith('subscriber-1', pushType, ['aweme-1'])
  })
})

describe('抖音直播推送辅助消费者的 v7 Web API', () => {
  it('通过传入客户端的 Web 业务方法取直播详情，保留内部 room_id 和开播状态', async () => {
    const liveUser = userProfile('subscriber-1', '主播', {
      live_status: 1,
      room_id_str: 'room-1',
      room_data: JSON.stringify({ owner: { web_rid: 'web-1' } })
    })
    const liveData = { data: { data: [{ title: '正在直播' }] } }
    runtime.web.userProfile.mockResolvedValue(success('douyin.userProfile', liveUser))
    runtime.web.liveRoom.mockResolvedValue(success('douyin.liveRoomInfo', liveData))
    const client = { douyin: { web: runtime.web } } as unknown as Parameters<typeof processLiveStream>[4]

    const result = await processLiveStream('subscriber-1', liveUser, item, targets, client)

    expect(runtime.web.userProfile).toHaveBeenCalledExactlyOnceWith({ sec_uid: 'subscriber-1' })
    expect(runtime.web.liveRoom).toHaveBeenCalledExactlyOnceWith({ room_id: 'room-1', web_rid: 'web-1' })
    expect(result).toMatchObject({
      pushType: 'live',
      living: true,
      Detail_Data: {
        user_info: liveUser,
        room_data: { owner: { web_rid: 'web-1' } },
        live_data: liveData,
        liveStatus: { liveStatus: 'open', isChanged: true, isliving: true }
      }
    })
  })
})

describe('抖音作品推送渲染辅助消费者的 v7 Web API', () => {
  it('通过 userProfile 校验描述中的用户，继续生成 mention 富文本', async () => {
    runtime.web.userProfile.mockResolvedValue(success('douyin.userProfile', userProfile('mention-1', '被提及用户')))
    const detail = {
      ...aweme,
      desc: '@被提及用户 你好',
      text_extra: [{ type: 0, sec_uid: 'mention-1', start: 0, end: 6 }],
      user_info: subscriber
    } as unknown as DouyinWorkDetailData
    const event = {} as Message

    const result = await renderWorkImage({
      e: event,
      Detail_Data: detail,
      create_time: 1700000000,
      shareLink: 'https://v.douyin.com/test/'
    })

    expect(runtime.web.userProfile).toHaveBeenCalledExactlyOnceWith({ sec_uid: 'mention-1' })
    expect(runtime.render).toHaveBeenCalledWith(
      event,
      'douyin/video-work',
      expect.objectContaining({
        title: {
          version: 1,
          platform: 'douyin',
          nodes: [
            { type: 'mention', text: '@被提及用户', userId: 'mention-1' },
            { type: 'text', text: ' 你好', style: undefined }
          ]
        }
      })
    )
    expect(result).toEqual([image])
  })
})
