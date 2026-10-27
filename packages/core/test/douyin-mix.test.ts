import type { Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** 短链 302 之后落到的长链，由各用例设置 */
const runtime = vi.hoisted(() => ({ responseUrl: '' }))

// Common.ts 顶层会拉起 Config / logger / 模块桶，这里只测纯函数，全部打桩
vi.mock('@/module', () => ({ Count: vi.fn() }))
vi.mock('@/module/utils/Config', () => ({ Config: {} }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn() } }))
vi.mock('node-karin/axios', () => ({
  default: { get: vi.fn(async () => ({ request: { res: { responseUrl: runtime.responseUrl } } })) }
}))

import { Common } from '@/module/utils/Common'
import { getDouyinID } from '@/platform/douyin/getID'

const event = {} as Message

describe('Common.chineseToArabic', () => {
  it.each([
    ['一', 1],
    ['十', 10],
    ['十二', 12],
    ['二十', 20],
    ['九十八', 98],
    ['一百零五', 105],
    ['一百二十', 120]
  ])('%s → %i', (input, expected) => {
    expect(Common.chineseToArabic(input)).toBe(expected)
  })
})

describe('getDouyinID 合集链接', () => {
  beforeEach(() => {
    runtime.responseUrl = ''
  })

  it('短剧分享链 302 到 playlet 详情页时识别为合集', async () => {
    runtime.responseUrl =
      'https://www.iesdouyin.com/share/playlet/detail/7663512469906425856/?schema_type=43&object_id=7663512469906425856&from_ssr=1'
    const result = await getDouyinID(event, 'https://v.douyin.com/eP5y7KTbTik/', false)
    expect(result).toEqual({ type: 'mix_work', mix_id: '7663512469906425856' })
  })

  it('普通合集分享链停在 mix 详情页时识别为合集', async () => {
    runtime.responseUrl =
      'https://www.iesdouyin.com/share/mix/detail/7620377442435205166/?schema_type=24&object_id=7620377442435205166&from_ssr=1'
    const result = await getDouyinID(event, 'https://v.douyin.com/Wi6LGYcb0RA/', false)
    expect(result).toEqual({ type: 'mix_work', mix_id: '7620377442435205166' })
  })

  it('普通合集分享链再跳到网页版 collection 页时识别为合集', async () => {
    runtime.responseUrl = 'https://www.douyin.com/collection/7620377442435205166?previous_page=app_code_link'
    const result = await getDouyinID(event, 'https://v.douyin.com/Wi6LGYcb0RA/', false)
    expect(result).toEqual({ type: 'mix_work', mix_id: '7620377442435205166' })
  })

  it('普通视频分享链仍走单作品', async () => {
    runtime.responseUrl = 'https://www.iesdouyin.com/share/video/7663512456496565504/?region=CN'
    const result = await getDouyinID(event, 'https://v.douyin.com/abc/', false)
    expect(result).toEqual({ type: 'one_work', aweme_id: '7663512456496565504' })
  })
})
