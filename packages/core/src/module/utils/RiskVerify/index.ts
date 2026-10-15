import { AsyncLocalStorage } from 'node:async_hooks'

import { karin, segment, type Message } from 'node-karin'

import { generateQRCode } from '@/../ktr/utils/QRcode'
import { resolveSingleMasterTarget } from '../ErrorHandler/sender'
import { Render } from '@/module/utils/Render'
import { logger } from '@/module/utils/logger'

/**
 * 风控验证（人机验证）自动监听。
 *
 * ## 立场
 *
 * 过码的人是**主人**（CK 所有者），不是触发解析的群友 —— 风控绑的是机器人这份 CK 的会话，
 * 只有账号主人能在自己手机上过码。群友全程不参与、也不用回复任何消息。
 *
 * ## 判定靠轮询，不靠用户回执
 *
 * 平台没有「过码完成」的推送通道，验证是服务端按 `fp`（抖音）/`did`（快手）/`verifyUuid`
 * （小红书）解除的。所以过码完成的唯一可观测信号是：**用同一份 CK、同一组参数重放原请求，
 * 它不再被拦** —— 这就是 amagi 文档里那句「过完由调用方用同一份 CK 重发」的自然实现。
 *
 * ## 撤回预算（硬约束）
 *
 * 消息撤回窗口 120s，本模块的决策线是 {@link VERIFY_WINDOW_MS} = 110s，留 10s 给网络与
 * 程序时延。**超过决策线一律不再尝试撤回**（必然失败），改为补一条状态说明。
 *
 * ## AsyncLocalStorage 的纪律（本仓首例，照做）
 *
 * - 只用 `run()`，**绝不用 `enterWith()`** —— 后者会污染不相关的后续任务。
 * - store 里只放渲染/投递要用的几个字段，**不放整个 `e`**：这样即使一条流程挂满 110s，
 *   被钉住的也只有几百字节（handler 的闭包本来就持有 `e`，ALS 不额外延长它的生命周期）。
 * - 本模块是唯一的模块级状态（{@link pending}），条目在 `finally` 里清理，且**有硬上限**。
 */

/** 一条验证流程的时间窗：撤回窗口 120s − 10s 余量 */
const VERIFY_WINDOW_MS = 110_000

/** 重放间隔 */
const POLL_INTERVAL_MS = 10_000

/** 超时后的冷却窗：这段时间内再撞风控不再发图（防刷屏） */
const COOLDOWN_MS = 60_000

/** pending 表硬上限：极端高频时直接放弃自动验证，抛原错误 */
const MAX_PENDING = 8

/** ALS 里携带的最小上下文（刻意不含整个事件对象） */
export interface VerifyContext {
  /** 触发本次解析的会话事件 —— 只用于渲染取色/缩放，不参与投递地址 */
  event: Message
}

const storage = new AsyncLocalStorage<VerifyContext>()

/** 在命令入口包一层，把渲染上下文带进这条异步链 */
export const runWithVerifyContext = <T>(event: Message, fn: () => T): T => storage.run({ event }, fn)

/** 当前是否处于某个消息处理链里（定时推送等场景为空） */
const currentContext = (): VerifyContext | undefined => storage.getStore()

/** 进行中的验证流程：同一个 challenge 只发一张图、只轮询一条链 */
interface PendingVerify {
  /** 重放到成功为止的 Promise */
  settled: Promise<boolean>
  /** 并入这条流程的调用数，用于日志 */
  joined: number
}

const pending = new Map<string, PendingVerify>()
let cooldownUntil = 0

/** challenge 的稳定键：平台 + 票据/地址，用于并发去重 */
const keyOf = (platform: string, url: string, session?: string): string => `${platform}:${session ?? ''}:${url}`

/**
 * 把验证页渲染成图片：有渲染上下文走模板（视觉优先），没有就退回纯二维码。
 * @param platform - 平台名（用于模板标签）
 * @param url - 平台官方验证页地址
 * @param context - ALS 里的渲染上下文，可能为空（定时推送）
 * @returns 可直接发送的图片消息段
 */
const renderVerifyImage = async (platform: string, url: string, context: VerifyContext | undefined) => {
  if (context) {
    try {
      const images = await Render(context.event, 'other/verifyQr', {
        share_url: url,
        platform,
        expiresHint: '请在 2 分钟内完成'
      })
      if (images.length > 0) return images
    } catch (error) {
      logger.warn(`[风控验证] 模板渲染失败，退回纯二维码: ${error}`)
    }
  }
  // 模板渲染失败：退回透明底纯二维码，保住「能用」
  return [segment.image(generateQRCode(url, false))]
}

/**
 * 私聊主人：验证二维码 + 说明。主人不在配置里时不发，直接返回 false。
 * @param platform - 平台名
 * @param url - 验证页地址
 * @returns 是否成功送达
 */
const notifyMaster = async (platform: string, url: string): Promise<boolean> => {
  const context = currentContext()
  // 主人私聊目标由 ErrorHandler 的目标解析决定，而它要求一个消息事件；
  // 定时推送这类没有事件的场景没有可达的主人地址，直接放弃自动验证（抛原错误）。
  if (!context) {
    logger.warn(`[风控验证] ${platform} 需要人机验证，但当前调用没有消息上下文，无法通知主人`)
    return false
  }

  const images = await renderVerifyImage(platform, url, context)
  const target = await resolveSingleMasterTarget(context.event, false)
  if (!target) {
    logger.warn(`[风控验证] ${platform} 需要人机验证，但没有可用的主人私聊目标`)
    return false
  }

  await karin.sendMaster(target.botId, target.master, [
    segment.text(
      `【${platform}】需要一次人机验证\n` +
        '请用手机扫码，在打开的官方页面里完成验证。\n' +
        '完成后不需要回复：我会自动检测到并继续刚才的解析。\n' +
        `超过 ${VERIFY_WINDOW_MS / 1000} 秒未完成会自动放弃，可稍后重新触发。`
    ),
    ...images
  ])
  return true
}

/**
 * 跑一条验证流程：发图 → 每 {@link POLL_INTERVAL_MS} 重放一次 → 成功即收口。
 * @param key - 去重键
 * @param platform - 平台名
 * @param url - 验证页地址
 * @param replay - 用同一份 CK 重放原调用，返回 true 表示已放行
 * @returns 是否在决策线内过码成功
 */
const runVerify = async (key: string, platform: string, url: string, replay: () => Promise<boolean>): Promise<boolean> => {
  const deadline = Date.now() + VERIFY_WINDOW_MS
  const notified = await notifyMaster(platform, url)

  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
    try {
      if (await replay()) {
        logger.mark(`[风控验证] ${platform} 已放行（${key}）`)
        return true
      }
    } catch (error) {
      // 重放冒出非风控错误：说明这一关已经过了，把错误交给原调用方处理
      logger.debug(`[风控验证] ${platform} 重放返回其它错误，停止等待: ${error}`)
      return false
    }
  }

  cooldownUntil = Date.now() + COOLDOWN_MS
  logger.warn(`[风控验证] ${platform} 在 ${VERIFY_WINDOW_MS / 1000}s 内未完成${notified ? '（已通知主人）' : ''}`)
  return false
}

/**
 * 判断这个错误是不是「可交给主人过码」的风控，并在需要时跑完整条验证流程。
 *
 * 调用方（amagiClient 的失败代理）拿到 `false` 就照原样抛出原错误；
 * 拿到 `true` 说明已经放行，**重放一次原调用即可拿到正常结果**。
 * @param error - 代理捕获到的 AmagiError
 * @param platform - 平台名
 * @param replay - 重放原调用（同一方法、同一参数、同一份 CK）
 * @returns 是否已放行
 */
export const handleRiskChallenge = async (
  error: { rawError?: { challenge?: { url?: string; session?: string } } },
  platform: string,
  replay: () => Promise<boolean>
): Promise<boolean> => {
  const url = error.rawError?.challenge?.url
  if (!url) return false
  if (!currentContext()) return false
  if (pending.size >= MAX_PENDING) {
    logger.warn(`[风控验证] 进行中的验证已达上限 ${MAX_PENDING}，本次不做自动验证`)
    return false
  }
  if (Date.now() < cooldownUntil) {
    logger.debug(`[风控验证] ${platform} 处于冷却窗内，跳过`)
    return false
  }

  const key = keyOf(platform, url, error.rawError?.challenge?.session)
  const existing = pending.get(key)
  if (existing) {
    existing.joined += 1
    return existing.settled
  }

  const entry: PendingVerify = { joined: 1, settled: Promise.resolve(false) }
  entry.settled = runVerify(key, platform, url, replay).finally(() => {
    pending.delete(key)
  })
  pending.set(key, entry)
  return entry.settled
}

/** 清空进行中的验证（配置重载、测试用） */
export const resetRiskVerify = (): void => {
  pending.clear()
  cooldownUntil = 0
}

/** 便于日志与排查：当前是否有验证在跑 */
export const riskVerifyPendingCount = (): number => pending.size

/** 供 UI 显示的平台名映射（与 amagi 的 Platform 对齐） */
export const PLATFORM_LABEL: Record<string, string> = {
  douyin: '抖音',
  kuaishou: '快手',
  xiaohongshu: '小红书',
  bilibili: 'B站'
}

/** 主人的验证提示是否可用（主人私聊可达性由 ErrorHandler 的目标解析决定） */
export const verifyEnabled = (): boolean => true