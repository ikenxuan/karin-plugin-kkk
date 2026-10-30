import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/module/utils/Config', () => ({ Config: { app: { EmojiReply: true } } }))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn() } }))

import type { Message } from 'node-karin'

import { Config } from '@/module/utils/Config'
import { createEmojiReactionFlow, isEmojiReactionSettled, setEmojiReaction, settleEmojiReaction } from '@/module/utils/EmojiReaction'

/** QQ 平台表情 ID：👀 / ⏳ / ✅ / ❌ */
const EYES = 128064
const PROCESSING = 366
const SUCCESS = 389
const ERROR = 379

const createMessage = (options: { isPrivate?: boolean; platform?: string } = {}) => {
  const setMsgReaction = vi.fn(async (_contact: unknown, _messageId: unknown, _emojiId: string | number, _isSet: boolean) => {})
  const message = {
    messageId: 'msg-1',
    isPrivate: options.isPrivate ?? false,
    contact: { peer: '10001' },
    bot: {
      adapter: { platform: options.platform ?? 'qq' },
      setMsgReaction
    }
  }
  return { message: message as unknown as Message, setMsgReaction }
}

describe('createEmojiReactionFlow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Config.app.EmojiReply = true
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('收到消息立刻加 👀，1.5 秒后补 ⏳', async () => {
    const { message, setMsgReaction } = createMessage()
    const flow = createEmojiReactionFlow(message)

    await flow.begin()
    expect(setMsgReaction).toHaveBeenCalledTimes(1)
    expect(setMsgReaction).toHaveBeenLastCalledWith(message.contact, 'msg-1', EYES, true)

    await vi.advanceTimersByTimeAsync(1500)
    expect(setMsgReaction).toHaveBeenLastCalledWith(message.contact, 'msg-1', PROCESSING, true)
  })

  it('处理成功：1.5 秒后加 ✅，再过 2 秒撤掉 ⏳', async () => {
    const { message, setMsgReaction } = createMessage()
    const flow = createEmojiReactionFlow(message)

    await flow.begin()
    await vi.advanceTimersByTimeAsync(1500)
    await flow.succeed()

    await vi.advanceTimersByTimeAsync(1500)
    expect(setMsgReaction).toHaveBeenCalledWith(message.contact, 'msg-1', SUCCESS, true)

    await vi.advanceTimersByTimeAsync(2000)
    expect(setMsgReaction).toHaveBeenLastCalledWith(message.contact, 'msg-1', PROCESSING, false)
  })

  it('处理失败：撤掉 ⏳ 并补 ❌，之后不再补 ⏳', async () => {
    const { message, setMsgReaction } = createMessage()
    const flow = createEmojiReactionFlow(message)

    await flow.begin()
    await vi.advanceTimersByTimeAsync(1500)
    await flow.fail()

    expect(setMsgReaction).toHaveBeenCalledWith(message.contact, 'msg-1', PROCESSING, false)
    expect(setMsgReaction).toHaveBeenLastCalledWith(message.contact, 'msg-1', ERROR, true)

    setMsgReaction.mockClear()
    await vi.advanceTimersByTimeAsync(5000)
    expect(setMsgReaction).not.toHaveBeenCalled()
  })

  it('1.5 秒内就失败时不会补 ⏳，直接补 ❌', async () => {
    const { message, setMsgReaction } = createMessage()
    const flow = createEmojiReactionFlow(message)

    await flow.begin()
    await flow.fail()

    expect(setMsgReaction).toHaveBeenCalledTimes(2)
    expect(setMsgReaction).toHaveBeenLastCalledWith(message.contact, 'msg-1', ERROR, true)

    setMsgReaction.mockClear()
    await vi.advanceTimersByTimeAsync(5000)
    expect(setMsgReaction).not.toHaveBeenCalled()
  })

  it('补 ⏳ 的请求还在途中时失败，也要把 ⏳ 撤掉', async () => {
    const { message, setMsgReaction } = createMessage()
    let releaseProcessing = (): void => {}
    const processingGate = new Promise<void>((resolve) => {
      releaseProcessing = resolve
    })
    setMsgReaction.mockImplementation(async (_contact, _messageId, emojiId, isSet) => {
      if (emojiId === PROCESSING && isSet) await processingGate
    })

    const flow = createEmojiReactionFlow(message)
    await flow.begin()
    // 定时器触发，补 ⏳ 的请求已经发出但还没返回
    await vi.advanceTimersByTimeAsync(1500)

    const failing = flow.fail()
    releaseProcessing()
    await failing

    expect(setMsgReaction).toHaveBeenCalledWith(message.contact, 'msg-1', PROCESSING, false)
    expect(setMsgReaction).toHaveBeenLastCalledWith(message.contact, 'msg-1', ERROR, true)
  })

  it('成功之后调用失败不会覆盖结果', async () => {
    const { message, setMsgReaction } = createMessage()
    const flow = createEmojiReactionFlow(message)

    await flow.begin()
    await flow.succeed()
    await flow.fail()

    setMsgReaction.mockClear()
    await vi.advanceTimersByTimeAsync(5000)
    expect(setMsgReaction).not.toHaveBeenCalledWith(message.contact, 'msg-1', ERROR, true)
  })

  it('业务侧已收尾时，不再补 ⏳、也不再补 ✅', async () => {
    const { message, setMsgReaction } = createMessage()
    const flow = createEmojiReactionFlow(message)

    await flow.begin()
    await settleEmojiReaction(message)
    setMsgReaction.mockClear()

    await flow.succeed()
    await vi.advanceTimersByTimeAsync(5000)

    expect(setMsgReaction).not.toHaveBeenCalled()
  })

  it('业务侧已收尾为成功时，失败流程把 ✅ 纠正成 ❌', async () => {
    const { message, setMsgReaction } = createMessage()
    const flow = createEmojiReactionFlow(message)

    await flow.begin()
    await settleEmojiReaction(message)
    setMsgReaction.mockClear()

    await flow.fail()

    expect(setMsgReaction).toHaveBeenNthCalledWith(1, message.contact, 'msg-1', PROCESSING, false)
    expect(setMsgReaction).toHaveBeenNthCalledWith(2, message.contact, 'msg-1', SUCCESS, false)
    expect(setMsgReaction).toHaveBeenNthCalledWith(3, message.contact, 'msg-1', ERROR, true)
  })

  it('业务侧收尾失败后，成功流程仍会补 ✅', async () => {
    const { message, setMsgReaction } = createMessage()
    let failOnce = true
    setMsgReaction.mockImplementation(async (_contact, _messageId, emojiId, isSet) => {
      if (emojiId === SUCCESS && isSet && failOnce) {
        failOnce = false
        throw new Error('adapter down')
      }
    })

    const flow = createEmojiReactionFlow(message)
    await flow.begin()
    // 业务侧收尾时补 ✅ 失败，标记被撤回
    await settleEmojiReaction(message)
    setMsgReaction.mockClear()

    await flow.succeed()
    await vi.advanceTimersByTimeAsync(1500)

    expect(setMsgReaction).toHaveBeenCalledWith(message.contact, 'msg-1', SUCCESS, true)
  })
})

describe('setEmojiReaction', () => {
  beforeEach(() => {
    Config.app.EmojiReply = true
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('同一条消息上的表情写操作按发起顺序执行', async () => {
    const { message, setMsgReaction } = createMessage()
    let releaseFirst = (): void => {}
    const firstGate = new Promise<void>((resolve) => {
      releaseFirst = resolve
    })
    setMsgReaction.mockImplementationOnce(async () => {
      await firstGate
    })

    const first = setEmojiReaction(message, PROCESSING, true)
    const second = setEmojiReaction(message, SUCCESS, true)

    // 第一条还没落地，第二条不会抢先发出
    expect(setMsgReaction).toHaveBeenCalledTimes(1)

    releaseFirst()
    await Promise.all([first, second])

    expect(setMsgReaction).toHaveBeenNthCalledWith(1, message.contact, 'msg-1', PROCESSING, true)
    expect(setMsgReaction).toHaveBeenNthCalledWith(2, message.contact, 'msg-1', SUCCESS, true)
  })
})

describe('settleEmojiReaction', () => {
  beforeEach(() => {
    Config.app.EmojiReply = true
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('撤掉 ⏳ 并补 ✅，重复按成功收尾不再发请求', async () => {
    const { message, setMsgReaction } = createMessage()

    expect(isEmojiReactionSettled(message)).toBe(false)
    await settleEmojiReaction(message)

    expect(setMsgReaction).toHaveBeenNthCalledWith(1, message.contact, 'msg-1', PROCESSING, false)
    expect(setMsgReaction).toHaveBeenNthCalledWith(2, message.contact, 'msg-1', SUCCESS, true)
    expect(isEmojiReactionSettled(message)).toBe(true)

    setMsgReaction.mockClear()
    await settleEmojiReaction(message)
    expect(setMsgReaction).not.toHaveBeenCalled()
  })

  it('失败可以覆盖先前的成功：撤掉 ✅ 再补 ❌，之后不再变化', async () => {
    const { message, setMsgReaction } = createMessage()

    await settleEmojiReaction(message)
    setMsgReaction.mockClear()

    await settleEmojiReaction(message, 'ERROR')

    expect(setMsgReaction).toHaveBeenNthCalledWith(1, message.contact, 'msg-1', PROCESSING, false)
    expect(setMsgReaction).toHaveBeenNthCalledWith(2, message.contact, 'msg-1', SUCCESS, false)
    expect(setMsgReaction).toHaveBeenNthCalledWith(3, message.contact, 'msg-1', ERROR, true)

    // 失败是终态，不会被成功覆盖
    setMsgReaction.mockClear()
    await settleEmojiReaction(message)
    expect(setMsgReaction).not.toHaveBeenCalled()
  })

  it('可以按失败收尾', async () => {
    const { message, setMsgReaction } = createMessage()

    await settleEmojiReaction(message, 'ERROR')

    expect(setMsgReaction).toHaveBeenNthCalledWith(1, message.contact, 'msg-1', PROCESSING, false)
    expect(setMsgReaction).toHaveBeenNthCalledWith(2, message.contact, 'msg-1', ERROR, true)
  })

  it('结果表情没挂上时撤回收尾标记，外层还能补一次', async () => {
    const { message, setMsgReaction } = createMessage()
    setMsgReaction.mockImplementation(async (_contact, _messageId, emojiId) => {
      if (emojiId === SUCCESS) throw new Error('adapter down')
    })

    await settleEmojiReaction(message)

    expect(isEmojiReactionSettled(message)).toBe(false)
  })

  it('关闭表情回复时不动消息', async () => {
    Config.app.EmojiReply = false
    const { message, setMsgReaction } = createMessage()

    await settleEmojiReaction(message)

    expect(setMsgReaction).not.toHaveBeenCalled()
  })

  it('私聊不加表情', async () => {
    const { message, setMsgReaction } = createMessage({ isPrivate: true })

    await settleEmojiReaction(message)

    expect(setMsgReaction).not.toHaveBeenCalled()
  })

  it('平台不支持表情回应时不抛错', async () => {
    const { message, setMsgReaction } = createMessage()
    setMsgReaction.mockRejectedValue(new Error('暂不支持设置消息表情回应'))

    await expect(settleEmojiReaction(message)).resolves.toBeUndefined()
  })
})
