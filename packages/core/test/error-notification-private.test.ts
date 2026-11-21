import type { ImageElement, Message } from 'node-karin'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({
  getGroupInfo: vi.fn(),
  sendMaster: vi.fn(async () => {}),
  targets: ['owner'],
  logs: { debug: vi.fn(), error: vi.fn() }
}))

vi.mock('node-karin', () => ({
  default: { getBot: () => ({ getGroupInfo: runtime.getGroupInfo }), sendMaster: runtime.sendMaster },
  config: { master: () => runtime.targets },
  segment: { text: (text: string) => ({ type: 'text', text }) }
}))
vi.mock('@/module/utils/Config', () => ({ Config: { app: { errorLogSendTo: ['allMasters'] } } }))
vi.mock('@/module/utils/logger', () => ({ logger: runtime.logs }))
vi.mock('@/module/utils/bot', () => ({ getReachableMasterBots: vi.fn() }))
vi.mock('@/module/utils/ErrorHandler/utils', () => ({ isPushTask: () => false }))

import { sendErrorToAllMasters } from '@/module/utils/ErrorHandler/sender'
import type { ErrorContext } from '@/module/utils/ErrorHandler/types'

const context = (groupId?: string): ErrorContext => ({
  error: new Error('original error'),
  options: { businessName: '抖音视频解析' },
  logs: [],
  event: { bot: { account: { selfId: 'console' } }, ...(groupId ? { groupId } : {}) } as Message,
  buildMetadata: {} as ErrorContext['buildMetadata']
})

describe('Private error notifications', () => {
  beforeEach(() => vi.clearAllMocks())

  it('does not call the group lookup API for a private console event', async () => {
    runtime.getGroupInfo.mockRejectedValue(new Error('此接口未实现'))
    const image: ImageElement = { type: 'image', file: 'base64://test' }

    await sendErrorToAllMasters(context(), [image])

    expect(runtime.getGroupInfo).not.toHaveBeenCalled()
    expect(runtime.sendMaster).toHaveBeenCalledWith('console', 'owner', [
      { type: 'text', text: '抖音视频解析 任务执行出错\n请尽快解决以消除警告' },
      image
    ])
  })

  it('keeps the group name in notifications originating from a group', async () => {
    runtime.getGroupInfo.mockResolvedValue({ groupName: 'Test group' })

    await sendErrorToAllMasters(context('group-1'), [])

    expect(runtime.getGroupInfo).toHaveBeenCalledWith('group-1')
    expect(runtime.sendMaster).toHaveBeenCalledWith('console', 'owner', [
      { type: 'text', text: '群：Test group(group-1)\n抖音视频解析 任务执行出错\n请尽快解决以消除警告' }
    ])
  })
})
