import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/module', () => ({ Count: vi.fn() }))
vi.mock('@/module/utils/Config', () => ({ Config: {} }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn() } }))
vi.mock('node-karin', () => ({
  segment: {
    text: (text: string) => ({ type: 'text', text }),
    keyboard: (rows: unknown) => ({ type: 'keyboard', rows })
  }
}))

import {
  buildEpisodeSelectionReply,
  canRecallEpisodeMessage,
  canRecallEpisodeSelectionMessage,
  setEpisodeSelectionMessage,
  buildEpisodeKeyboardRows,
  buildEpisodeSelectionText,
  buildEpisodeTargetUrl,
  consumeParseStatSkip,
  consumeBilibiliEpisodeAutoSelect,
  createEpisodeSelection,
  endEpisodeSelection,
  getEpisodePage,
  getEpisodePageCount,
  getEpisodeSelection,
  getEpisodeSelectionPoster,
  getEpisodeSelectionScope,
  isButtonSelectionScene,
  isEpisodeSelectionOwner,
  markParseStatSkipped,
  markBilibiliEpisodeAutoSelect,
  parseEpisodeNumber,
  parseEpisodePosterPageAction,
  parseEpisodeSelectionAction,
  resolveEpisodeTarget,
  touchEpisodeSelection
} from '@/module/utils/EpisodeSelection'

const createSession = (
  scene: 'friend' | 'group' = 'group',
  poster: Array<{ type: 'image'; file: string }> = [],
  options: {
    posterPage?: number
    pageSize?: number
    renderPoster?: (page: number) => Promise<Array<{ type: 'image'; file: string }>>
    episodeCount?: number
    reverse?: boolean
    ownerId?: string
  } = {}
) => {
  const episodeCount = options.episodeCount ?? 45
  return createEpisodeSelection('bot:group:1', {
    title: '测试合集',
    platform: 'douyin',
    scene,
    ownerId: options.ownerId ?? 'user-1',
    pageSize: options.pageSize,
    poster,
    posterPage: options.posterPage,
    renderPoster: options.renderPoster,
    forceBurnDanmaku: false,
    episodes: Array.from({ length: episodeCount }, (_, index) => {
      const episode = options.reverse ? episodeCount - index : index + 1
      return {
        episode,
        target: { platform: 'douyin' as const, awemeId: String(episode) }
      }
    })
  })
}

describe('parseEpisodeNumber', () => {
  it.each([
    ['第12集', 12],
    ['第 12 集', 12],
    ['第十二集', 12],
    ['我想看第三集', 3],
    ['12', 12],
    ['012', 12],
    ['12集', 12],
    ['十二', 12]
  ])('%s → %i', (input, expected) => {
    expect(parseEpisodeNumber(input)).toBe(expected)
  })

  it.each(['', '第几集', '12个', '第0集', '0'])('%j → null', (input) => {
    expect(parseEpisodeNumber(input)).toBeNull()
  })
})

describe('EpisodeSelection 会话', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('只允许创建会话时绑定的 scope 读取', () => {
    const session = createSession()
    expect(getEpisodeSelection(session.token, 'bot:group:1')).not.toBeNull()
    expect(getEpisodeSelection(session.token, 'bot:group:2')).toBeNull()
  })

  it('120 秒后过期', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const session = createSession()

    vi.advanceTimersByTime(121_000)

    expect(getEpisodeSelection(session.token, 'bot:group:1')).toBeNull()
  })

  it('翻页刷新 120 秒有效期', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const session = createSession()

    vi.advanceTimersByTime(60_000)
    expect(touchEpisodeSelection(session.token, 'bot:group:1')).toBe(true)
    vi.advanceTimersByTime(61_000)
    expect(getEpisodeSelection(session.token, 'bot:group:1')).not.toBeNull()
    vi.advanceTimersByTime(60_000)
    expect(getEpisodeSelection(session.token, 'bot:group:1')).toBeNull()
  })
})

describe('EpisodeSelection 发起人', () => {
  it('只有发起人本人可以操作', () => {
    const session = createSession()

    expect(session.ownerId).toBe('user-1')
    expect(isEpisodeSelectionOwner(session, 'user-1')).toBe(true)
    expect(isEpisodeSelectionOwner(session, 'user-2')).toBe(false)
  })

  it('没有记录发起人时不限制（兼容拿不到用户 ID 的适配器）', () => {
    const session = createSession('group', [], { ownerId: '' })

    expect(isEpisodeSelectionOwner(session, 'anyone')).toBe(true)
  })
})

describe('EpisodeSelection 分页与按钮', () => {
  it('45 集按每页 15 集分成 3 页', () => {
    const session = createSession()
    expect(getEpisodePageCount(session)).toBe(3)
    expect(getEpisodePage(session, 1)).toMatchObject({ firstEpisode: 1, lastEpisode: 15 })
    expect(getEpisodePage(session, 1)?.items).toHaveLength(15)
    expect(getEpisodePage(session, 3)).toMatchObject({ firstEpisode: 31, lastEpisode: 45 })
    expect(getEpisodePage(session, 3)?.items).toHaveLength(15)
    expect(getEpisodePage(session, 0)).toBeNull()
  })

  it('最新一集在前时范围也按展示顺序取首尾', () => {
    const session = createSession('group', [], { reverse: true })
    expect(getEpisodePage(session, 1)).toMatchObject({ firstEpisode: 45, lastEpisode: 31 })
    expect(getEpisodePage(session, 1)?.items[0].episode).toBe(45)
    expect(buildEpisodeSelectionText(session, 1)).toContain('第 45–31 集')
  })

  it('可以按会话指定每页集数（抖音合集仍用 5 集一页）', () => {
    const session = createSession('group', [], { episodeCount: 12, pageSize: 5 })
    expect(getEpisodePageCount(session)).toBe(3)
    expect(getEpisodePage(session, 1)).toMatchObject({ firstEpisode: 1, lastEpisode: 5 })
    expect(buildEpisodeKeyboardRows(session, 1)).toHaveLength(3)
  })

  it('第一页生成跳转行、3 行集数按钮和 1 行下一页按钮', () => {
    const session = createSession()
    const rows = buildEpisodeKeyboardRows(session, 1)

    expect(rows).toHaveLength(5)
    expect(rows[0]).toEqual([{ text: '跳转到第x页', data: `#选集 ${session.token} page:`, enter: false, style: 1, list: ['user-1'] }])
    expect(rows[1]).toHaveLength(5)
    expect(rows[1][0]).toMatchObject({ text: '1', callback: true, data: `#选集 ${session.token} 1` })
    expect(rows[2]).toHaveLength(5)
    expect(rows[3]).toHaveLength(5)
    expect(rows[4]).toEqual([{ text: '下一页', callback: true, data: `#选集 ${session.token} page:2`, list: ['user-1'] }])
  })

  it('中间页同时有上一页和下一页', () => {
    const session = createSession()
    const rows = buildEpisodeKeyboardRows(session, 2)

    expect(rows.at(-1)).toEqual([
      { text: '上一页', callback: true, data: `#选集 ${session.token} page:1`, list: ['user-1'] },
      { text: '下一页', callback: true, data: `#选集 ${session.token} page:3`, list: ['user-1'] }
    ])
  })

  it('最后一页只有上一页', () => {
    const session = createSession()
    const rows = buildEpisodeKeyboardRows(session, 3)

    expect(rows.at(-1)).toEqual([{ text: '上一页', callback: true, data: `#选集 ${session.token} page:2`, list: ['user-1'] }])
  })

  it('只有一页时不生成跳转和翻页行', () => {
    const session = createSession('group', [], { episodeCount: 3 })
    const rows = buildEpisodeKeyboardRows(session, 1)

    expect(rows).toHaveLength(1)
    expect(rows[0]).toHaveLength(3)
    expect(buildEpisodeSelectionText(session, 1)).not.toContain('跳转到第x页')
  })

  it('跳转按钮是指令按钮，点击后填入输入框而不是回调', () => {
    const session = createSession()
    const jump = buildEpisodeKeyboardRows(session, 1)[0][0]

    expect(jump).toMatchObject({ text: '跳转到第x页', data: `#选集 ${session.token} page:`, enter: false })
    expect(jump.callback).toBeUndefined()
  })

  it('群聊里每个按钮都绑定发起人，别人点不了', () => {
    const session = createSession()
    const buttons = buildEpisodeKeyboardRows(session, 2).flat()

    expect(buttons.length).toBeGreaterThan(0)
    for (const button of buttons) expect(button.list).toEqual(['user-1'])
  })

  it('私聊不加点击权限（QQ 私聊不支持指定用户，且只有对方能看到）', () => {
    const session = createSession('friend')
    const buttons = buildEpisodeKeyboardRows(session, 1).flat()

    expect(buttons.length).toBeGreaterThan(0)
    for (const button of buttons) expect(button.list).toBeUndefined()
  })

  it('没有发起人 ID 时不加点击权限', () => {
    const session = createSession('group', [], { ownerId: '' })
    const buttons = buildEpisodeKeyboardRows(session, 1).flat()

    for (const button of buttons) expect(button.list).toBeUndefined()
  })

  it('海报页按需渲染并缓存，初始页不重复渲染', async () => {
    const renderPoster = vi.fn(async (page: number) => [{ type: 'image' as const, file: `poster-${page}.png` }])
    const session = createSession('group', [{ type: 'image', file: 'poster-1.png' }], { renderPoster })

    expect(await getEpisodeSelectionPoster(session, 1)).toEqual([{ type: 'image', file: 'poster-1.png' }])
    expect(renderPoster).not.toHaveBeenCalled()

    expect(await getEpisodeSelectionPoster(session, 2)).toEqual([{ type: 'image', file: 'poster-2.png' }])
    expect(await getEpisodeSelectionPoster(session, 2)).toEqual([{ type: 'image', file: 'poster-2.png' }])
    expect(renderPoster).toHaveBeenCalledTimes(1)
    expect(renderPoster).toHaveBeenCalledWith(2)
  })

  it('创建时指定海报页码会缓存该页', async () => {
    const renderPoster = vi.fn(async (page: number) => [{ type: 'image' as const, file: `poster-${page}.png` }])
    const session = createSession('group', [{ type: 'image', file: 'poster-2.png' }], { posterPage: 2, renderPoster })

    expect(await getEpisodeSelectionPoster(session, 2)).toEqual([{ type: 'image', file: 'poster-2.png' }])
    expect(renderPoster).not.toHaveBeenCalled()
  })

  it('海报缓存最多保留 3 页，超限删最旧的页', async () => {
    const renderPoster = vi.fn(async (page: number) => [{ type: 'image' as const, file: `poster-${page}.png` }])
    const session = createSession('group', [{ type: 'image', file: 'poster-1.png' }], { renderPoster, episodeCount: 75 })

    for (const page of [2, 3, 4, 5]) {
      await getEpisodeSelectionPoster(session, page)
    }

    expect(session.posterPages.size).toBe(3)
    expect(session.posterPages.has(2)).toBe(false)
    expect(session.posterPages.has(5)).toBe(true)
  })

  it('没有分页渲染器时任意页都复用初始海报', async () => {
    const poster = { type: 'image' as const, file: 'poster.png' }
    const session = createSession('group', [poster])

    expect(await getEpisodeSelectionPoster(session, 1)).toEqual([poster])
    expect(await getEpisodeSelectionPoster(session, 3)).toEqual([poster])
  })
})

describe('EpisodeSelection 目标解析', () => {
  it('按实际集号找到目标，而不是按数组下标', () => {
    const session = createSession()
    expect(resolveEpisodeTarget(session, 12)).toEqual({ platform: 'douyin', awemeId: '12' })
    expect(resolveEpisodeTarget(session, 999)).toBeNull()
  })

  it('按平台生成可被现有解析命令识别的链接', () => {
    expect(buildEpisodeTargetUrl({ platform: 'douyin', awemeId: '123' })).toBe('https://www.douyin.com/video/123')
    expect(buildEpisodeTargetUrl({ platform: 'bilibili', epId: '456' })).toBe('https://www.bilibili.com/bangumi/play/ep456')
  })
})

describe('EpisodeSelection 命令与提示', () => {
  it('解析页码和集数参数', () => {
    expect(parseEpisodeSelectionAction('page:2')).toEqual({ type: 'page', page: 2 })
    expect(parseEpisodeSelectionAction('page: 2')).toEqual({ type: 'page', page: 2 })
    expect(parseEpisodeSelectionAction('page:0')).toBeNull()
    expect(parseEpisodeSelectionAction('第12集')).toEqual({ type: 'episode', episode: 12 })
    expect(parseEpisodeSelectionAction('foo')).toBeNull()
  })

  it('提示文本包含当前页范围、页码和选集提示', () => {
    const group = createSession('group')
    const friend = createSession('friend')
    expect(buildEpisodeSelectionText(group, 1)).toBe(
      '《测试合集》\n第 1–15 集 · 第 1/3 页\n点击下方按钮选集（120 秒内有效，仅发起人可操作）。'
    )
    expect(buildEpisodeSelectionText(friend, 1)).toBe('《测试合集》\n第 1–15 集 · 第 1/3 页\n点击下方按钮选集（120 秒内有效）。')
  })

  it('群聊提示按钮仅发起人可操作，私聊不提示', () => {
    expect(buildEpisodeSelectionText(createSession('group'), 1)).toContain('仅发起人可操作')
    expect(buildEpisodeSelectionText(createSession('friend'), 1)).not.toContain('仅发起人可操作')
  })

  it('解析文字选集的翻页命令', () => {
    expect(parseEpisodePosterPageAction('上一页')).toEqual({ type: 'prev' })
    expect(parseEpisodePosterPageAction('下一页')).toEqual({ type: 'next' })
    expect(parseEpisodePosterPageAction('第12页')).toEqual({ type: 'page', page: 12 })
    expect(parseEpisodePosterPageAction('十二页')).toEqual({ type: 'page', page: 12 })
    expect(parseEpisodePosterPageAction('12页')).toEqual({ type: 'page', page: 12 })
    expect(parseEpisodePosterPageAction('page:12')).toEqual({ type: 'page', page: 12 })
    expect(parseEpisodePosterPageAction('第0页')).toBeNull()
    expect(parseEpisodePosterPageAction('12')).toBeNull()
    expect(parseEpisodePosterPageAction('第12集')).toBeNull()
  })

  it('作用域包含 bot、群和子频道，按钮选集只对支持的适配器启用', () => {
    const groupEvent = {
      selfId: 'bot',
      contact: { peer: 'group-1', subPeer: '' },
      isGroup: true,
      isFriend: false,
      bot: { adapter: { protocol: 'qqbot' } }
    }
    const otherEvent = { ...groupEvent, bot: { adapter: { protocol: 'onebot' } } }

    expect(getEpisodeSelectionScope(groupEvent as never)).toBe('bot:group-1:')
    expect(isButtonSelectionScene(groupEvent as never)).toBe(true)
    expect(isButtonSelectionScene(otherEvent as never)).toBe(false)
  })
})

describe('选集统计标记', () => {
  it('首次选集消息只跳过一次统计', () => {
    const event = {}
    expect(consumeParseStatSkip(event as never)).toBe(false)
    markParseStatSkipped(event as never)
    expect(consumeParseStatSkip(event as never)).toBe(true)
    expect(consumeParseStatSkip(event as never)).toBe(false)
  })
})
describe('buildEpisodeSelectionReply', () => {
  it('保留海报，并在文本后挂 keyboard', () => {
    const session = createSession('group', [{ type: 'image', file: 'poster.png' }])
    const reply = buildEpisodeSelectionReply(session, 1)

    expect(reply[0]).toEqual({ type: 'image', file: 'poster.png' })
    expect(reply[1]).toMatchObject({ type: 'text' })
    expect(reply[1].type === 'text' ? reply[1].text : '').toContain('《测试合集》')
    expect(reply.at(-1)).toMatchObject({ type: 'keyboard' })
  })

  it.each(['friend', 'group'] as const)('%s 的文本不内嵌 qqbot-cmd-input，跳转入口放在 keyboard 第一行', (scene) => {
    const session = createSession(scene, [{ type: 'image', file: 'poster.png' }])
    const reply = buildEpisodeSelectionReply(session, 1)
    const text = reply[1].type === 'text' ? reply[1].text : ''
    const keyboard = reply.at(-1) as unknown as {
      type: string
      rows: Array<Array<{ text: string; data?: string; callback?: boolean }>>
    }

    expect(text).not.toContain('<qqbot-cmd-input')
    expect(keyboard).toMatchObject({ type: 'keyboard' })
    expect(keyboard.rows[0][0]).toMatchObject({ text: '跳转到第x页', data: `#选集 ${session.token} page:` })
    expect(keyboard.rows[0][0].callback).toBeUndefined()
  })
})
describe('EpisodeSelection 消息追踪', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('翻页回复复用缓存海报，不重新创建图片元素', () => {
    const poster = { type: 'image' as const, file: 'poster.png' }
    const session = createSession('group', [poster])
    const reply = buildEpisodeSelectionReply(session, 2)

    expect(reply[0]).toBe(poster)
    expect(reply.some((element) => element.type === 'image')).toBe(true)
  })

  it('翻页时使用调用方传入的新海报', () => {
    const session = createSession('group', [{ type: 'image', file: 'poster-1.png' }])
    const nextPoster = [{ type: 'image' as const, file: 'poster-2.png' }]
    const reply = buildEpisodeSelectionReply(session, 2, nextPoster)

    expect(reply[0]).toBe(nextPoster[0])
  })

  it('任务结束后会话立即失效', () => {
    const session = createSession()
    expect(endEpisodeSelection(session.token, 'bot:group:1')).toBe(true)
    expect(getEpisodeSelection(session.token, 'bot:group:1')).toBeNull()
    expect(endEpisodeSelection(session.token, 'bot:group:1')).toBe(false)
  })

  it('只保留 110 秒内可撤回的上一页消息', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const session = createSession()

    expect(canRecallEpisodeSelectionMessage(session)).toBe(false)
    setEpisodeSelectionMessage(session, 'message-1')
    expect(canRecallEpisodeSelectionMessage(session)).toBe(true)

    vi.advanceTimersByTime(110_000)
    expect(canRecallEpisodeSelectionMessage(session)).toBe(true)
    vi.advanceTimersByTime(1)
    expect(canRecallEpisodeSelectionMessage(session)).toBe(false)
  })

  it('文字选集用消息 ID 和时间戳判断能否撤回', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    expect(canRecallEpisodeMessage('', Date.now())).toBe(false)
    expect(canRecallEpisodeMessage('message-1', 0)).toBe(false)
    expect(canRecallEpisodeMessage('message-1', Date.now())).toBe(true)
    expect(canRecallEpisodeMessage('message-1', Date.now() - 110_000)).toBe(true)
    expect(canRecallEpisodeMessage('message-1', Date.now() - 110_001)).toBe(false)
  })
})
describe('B 站选集来源标记', () => {
  it('只有选集按钮回调消费一次自动选集标记', () => {
    const event = {}
    expect(consumeBilibiliEpisodeAutoSelect(event as never)).toBe(false)
    markBilibiliEpisodeAutoSelect(event as never)
    expect(consumeBilibiliEpisodeAutoSelect(event as never)).toBe(true)
    expect(consumeBilibiliEpisodeAutoSelect(event as never)).toBe(false)
  })
})
