import Amagi, {
  type AmagiClient as AmagiSdkClient,
  type AmagiError as AmagiErrorContract,
  type AmagiFailure,
  type AmagiSuccess,
  type SuccessAmagiClient
} from '@ikenxuan/amagi'

import { logger } from '@/module/utils/logger'
import { getDouyinAppSignerBaseUrl } from '@/platform/douyin/appSignerUrl'
import { prepareDouyinShareDataFile } from '@/platform/douyin/shareStorage'

import { Config } from './Config'

/** 默认工厂返回的 Amagi v7 门面；抖音按 Web/App 分端，其余平台直接提供业务方法。 */
export type AmagiClient = AmagiSdkClient

/** 四个平台的键，用来在类型层重建 client 形状 */
type PlatformKey = 'bilibili' | 'douyin' | 'kuaishou' | 'xiaohongshu'

/**
 * 失败必抛的 client：业务方法与 auth 端点只返回成功信封，非信封能力保持原类型。
 *
 * 运行时由 {@link throwOnFailure} 保证「失败一律抛」，类型上必须同步声明成成功分支 —— 否则
 * 未收窄的 `AmagiResult` 让每一处 `.data` 都带 `| undefined`。必须使用 amagi 从端点声明派生的类型：
 * 业务方法是泛型签名，下游自己 infer 会丢失泛型默认值，使 `data` 退化成 `unknown`。
 */
type ThrowingClient = SuccessAmagiClient

/**
 * 平台业务码。v7 的三种码各归各位：平台业务码 `error.platform.code`、HTTP 状态 `error.http.status`、
 * amagi 自己的码 `error.code`（字符串）。按平台码分流的地方（B站 `-352` 风控、`-111` csrf 失效、
 * `12061` 关闭评论区）要的是第一种；平台没给就退 HTTP 状态，再退 0。
 */
const legacyCode = (error: AmagiErrorContract): number => {
  const platformCode = error.platform?.code
  if (typeof platformCode === 'number') return platformCode
  if (typeof platformCode === 'string' && platformCode.trim() !== '' && Number.isFinite(Number(platformCode))) {
    return Number(platformCode)
  }
  return error.http?.status ?? 0
}

/**
 * 一行说清一次失败：`[大类/码] 平台原文 (端点 平台码 HTTP requestId attempts)`。
 * `message` 会被 `logger.warn(...)` 直接拼进日志行，塞整个信封的转储会把日志顶成一屏 ANSI。
 */
const describeFailure = (envelope: AmagiFailure): string => {
  const { error, meta } = envelope
  const facts = [
    meta?.endpoint,
    error.platform?.code === undefined ? undefined : `平台码 ${error.platform.code}`,
    error.http?.status === undefined ? undefined : `HTTP ${error.http.status}`,
    meta?.requestId === undefined ? undefined : `requestId=${meta.requestId}`,
    meta?.attempts === undefined ? undefined : `attempts=${meta.attempts}`
  ].filter((part): part is string => typeof part === 'string' && part !== '')

  return `[${error.kind}/${error.code}] ${error.message}${facts.length > 0 ? ` (${facts.join(' ')})` : ''}`
}

/** Amagi 失败异常：`message` 是一行摘要，结构化字段各有属性，完整信封在 {@link AmagiError.envelope} */
export class AmagiError extends Error {
  /** 平台业务码，见 {@link legacyCode} */
  code: number
  /** 平台原始响应体。v7 只在 `debug: true` 下填 `error.raw`（B站风控要读里面的 `v_voucher`） */
  data: any
  /** v7 错误契约本体，等价于失败信封的 `error` */
  rawError: AmagiErrorContract
  /** 错误大类 */
  kind: AmagiErrorContract['kind']
  /** amagi 自己的字符串错误码 */
  amagiCode: AmagiErrorContract['code']
  /** 平台返回的原文，不带前缀与归因 */
  reason: string
  /** 是否值得重试 */
  retryable: boolean
  /** 真实发生的 HTTP 状态 */
  httpStatus?: number
  /** 参数校验的字段级错误，仅 `kind === 'validation'` 时有 */
  issues?: AmagiErrorContract['issues']
  /** 整条失败信封，`meta.requestId` / `attempts` / `durationMs` 在里面 */
  envelope: AmagiFailure

  constructor(envelope: AmagiFailure) {
    const error = envelope.error
    super(describeFailure(envelope))
    this.name = 'AmagiError'
    this.code = legacyCode(error)
    this.data = error.raw
    this.rawError = error
    this.kind = error.kind
    this.amagiCode = error.code
    this.reason = error.message
    this.retryable = error.retryable
    this.httpStatus = error.http?.status
    this.issues = error.issues
    this.envelope = envelope
  }
}

/**
 * 判断一个值是不是失败信封。**只认 `success`**：v7 信封顶层没有 `code`（三种码各归各位），
 * 拿 `code` 当特征判别恒假 —— 失败被原样透传、`try/catch` 全失效、取数失败但流程继续，且零编译错误。
 */
const isFailureEnvelope = (value: unknown): value is AmagiFailure => {
  if (!value || typeof value !== 'object') return false
  const envelope = value as Partial<AmagiFailure>
  return envelope.success === false && typeof envelope.message === 'string' && !!envelope.error
}

/** 判断是不是 thenable，用来只包装异步方法 */
const isThenable = (value: unknown): value is PromiseLike<unknown> =>
  !!value && (typeof value === 'object' || typeof value === 'function') && typeof (value as PromiseLike<unknown>).then === 'function'

/**
 * 把一次业务调用的结果收口：成功原样返回，失败信封先给 RiskVerify 一次「发码并轮询」的机会。
 *
 * `handleRiskChallenge` 对不带 `challenge.url` 的失败会立刻返回 false（是不是风控由它判定），
 * 所以这里不用先判。过码成功后按它的契约**再重放一次**原调用，这次的返回值就是结果；
 * 没放行（超时 / 没有消息上下文 / 达并发上限）则把原错误抛出去。
 *
 * RiskVerify 用**动态 import** 取，不能提成顶层静态 import：它的链上有
 * `Render → @/module（barrel）→ ./utils → Base → amagiClient`，静态边会让「先加载 amagiClient」
 * 的模块求值顺序撞上 `Base extends AmagiBase` 的 TDZ（dev 下必崩），本文件与 Base 之间就成环了。
 * 挪到运行期后，这条边只在失败路径、模块图就绪之后才走。
 * @param returned - 原调用的返回值（已排除同步方法）
 * @param platform - 平台名，RiskVerify 用它做去重键与提示文案
 * @param call - 原调用的重放：同一方法、同一参数、同一份 CK
 */
const settleFailure = async (returned: PromiseLike<unknown>, platform: PlatformKey, call: () => unknown): Promise<unknown> => {
  const result = await returned
  if (!isFailureEnvelope(result)) return result

  const failure = new AmagiError(result)
  const { handleRiskChallenge } = await import('@/module/utils/RiskVerify')
  const solved = await handleRiskChallenge(failure, platform, () => probeReplay(call))
  if (!solved) throw failure

  const replayed = await call()
  if (isFailureEnvelope(replayed)) throw new AmagiError(replayed)
  return replayed
}

/**
 * 给 RiskVerify 轮询用的重放探针。
 *
 * 判定权在它那边：true = 已放行；仍被同一类风控拦住返回 false（继续等）；
 * 冒出其它失败就抛，RiskVerify 据此停止等待、把错误交回原调用方处理。
 */
const probeReplay = async (call: () => unknown): Promise<boolean> => {
  const result = await call()
  if (!isFailureEnvelope(result)) return true
  if (result.error.challenge?.url) return false
  throw new AmagiError(result)
}

/**
 * 代理业务 API 与 auth 端点，把失败信封转成 `throw AmagiError`。返回类型与入参同形 ——
 * 「只保留成功分支」是**类型层**由 {@link ThrowingClient} 声明的，这里只管运行时行为。
 *
 * 带风控挑战的失败不直接抛：先交给 `RiskVerify` 走完整条验证流程（发二维码给主人 → 轮询重放），
 * 过码成功就重放拿正常结果，没成功再把原错误抛出去 —— 见 {@link settleFailure}。
 * request 有独立的信封/axios 双轨，guest 是游客会话管理器，两者必须保留原始语义。
 */
const throwOnFailure = <T extends object>(target: T, platform: PlatformKey): T =>
  new Proxy(target, {
    get(obj: any, prop: string | symbol) {
      const value = obj[prop]

      if (prop === 'request' || prop === 'guest') return value

      if (typeof value === 'function') {
        return (...args: unknown[]) => {
          const call = () => value.apply(obj, args)
          const returned = call()
          // 同步方法原样放行：包成 async 会把返回值套一层 Promise，破坏语义
          if (!isThenable(returned)) return returned
          return settleFailure(returned, platform, call)
        }
      }

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return throwOnFailure(value, platform)
      }

      return value
    }
  })

/** 快照包含 SDK 设置与规范化的签名 base URL；等价的根地址写法不会重复重建。 */
const readClientConfig = () => {
  const amagi = Config.amagi
  const douyinApp = Config.laboratory?.douyinApp
  let signerBaseUrl: string | undefined
  if (douyinApp?.signUrl) {
    try {
      signerBaseUrl = getDouyinAppSignerBaseUrl(douyinApp.signUrl)
    } catch {
      // 签名地址错误由对应 App 功能报告，不影响其他平台初始化。
    }
  }
  return { amagi, signerBaseUrl }
}

/** 唯一的 SDK 构造入口。只有生效的配置变化才会替换当前客户端。 */
const createRuntime = (config = readClientConfig(), configSignature = JSON.stringify(config)) => {
  const { amagi, signerBaseUrl } = config
  const cookies = amagi.cookies || {}
  const webRequest = {
    headers: { 'User-Agent': amagi['User-Agent'] },
    proxy: amagi.proxy?.switch ? amagi.proxy : (false as const)
  }
  const rawAmagi = Amagi({
    // 新门面会从外到内合并请求配置；全局只放两端共用的超时，浏览器身份留在 Web 平台内。
    request: { timeout: amagi.timeout },
    douyin: {
      web: { cookie: cookies.douyin, request: webRequest },
      app: {
        ...(signerBaseUrl ? { signerBaseUrl, sessionFile: prepareDouyinShareDataFile('douyin-app-session.json') } : {}),
        request: { timeout: amagi.timeout, proxy: false }
      }
    },
    bilibili: { cookie: cookies.bilibili, request: webRequest },
    kuaishou: { cookie: cookies.kuaishou, request: webRequest },
    xiaohongshu: { cookie: cookies.xiaohongshu, request: webRequest },
    // B站风控要读失败响应里的 `v_voucher`，而 v7 只在 debug 下才填 `error.raw`。
    debug: true
  })
  const client = {
    ...rawAmagi,
    bilibili: throwOnFailure(rawAmagi.bilibili, 'bilibili'),
    douyin: {
      web: throwOnFailure(rawAmagi.douyin.web, 'douyin'),
      app: throwOnFailure(rawAmagi.douyin.app, 'douyin')
    },
    kuaishou: throwOnFailure(rawAmagi.kuaishou, 'kuaishou'),
    xiaohongshu: throwOnFailure(rawAmagi.xiaohongshu, 'xiaohongshu')
  } as ThrowingClient
  return { rawAmagi, amagi: client, configSignature }
}

/** 解析和推送处理器只读取共享客户端；构造处理器或调用 getter 都不会创建客户端。 */
export class AmagiBase {
  get rawAmagi(): AmagiClient {
    return getAmagiClient()
  }

  get amagi(): ThrowingClient {
    return amagiClientInstance.amagi
  }
}

/** 软错误码：命中这些平台业务码时不抛异常，按失败信封返回。Bilibili `12061` - UP主已关闭评论区 */
export const SOFT_ERROR_CODES = {
  BILIBILI_COMMENTS_DISABLED: 12061
} as const

/** 被 {@link softFetch} 放行的软失败：失败信封 + 压平后的平台业务码 */
export type SoftFailure = AmagiFailure & { code: number }

/** {@link softFetch} 的返回：要么成功信封，要么被放行的软失败 */
export type SoftResult<T> = AmagiSuccess<T> | SoftFailure

/**
 * 调用 amagi 业务方法，允许特定平台业务码以失败信封返回而不是抛异常。
 * @param fn - 经过代理包装的 amagi 方法调用
 * @param allowedCodes - 不应抛出异常的平台业务码列表
 * @returns 成功信封，或命中 `allowedCodes` 的软失败
 */
export const softFetch = async <T>(fn: () => Promise<AmagiSuccess<T>>, allowedCodes: number[]): Promise<SoftResult<T>> => {
  try {
    return await fn()
  } catch (err) {
    if (err instanceof AmagiError && allowedCodes.includes(err.code)) {
      return { ...err.envelope, code: err.code }
    }
    throw err
  }
}

/**
 * {@link softFetch} 的结果是否命中某个软错误码。
 *
 * 是类型守卫而不是 `result.code === x`：`code` 的类型是 `number` 不是字面量，
 * 直接比较不会收窄联合，`else` 分支里的 `data` 仍是 `T | undefined`。
 */
export const isSoftFailure = <T>(result: SoftResult<T>, ...codes: number[]): result is SoftFailure =>
  !result.success && codes.includes(result.code)

let amagiClientInstance = createRuntime()

type AmagiReloadListener = () => void

/** 需要随 Amagi Client 一同刷新的运行时资源，例如已经挂载的 HTTP Router */
const amagiReloadListeners = new Set<AmagiReloadListener>()

/**
 * 注册 Amagi 配置重载监听器。
 * @param listener - 重载后要执行的回调
 * @returns 注销当前监听器的函数
 */
export const registerAmagiReloadListener = (listener: AmagiReloadListener) => {
  amagiReloadListeners.add(listener)
  return () => amagiReloadListeners.delete(listener)
}

/**
 * 各平台及端的「失败必抛」业务 API，随配置重载保持 ESM 实时绑定。
 *
 * 类型必须显式标注：不标的话 TS 要在声明产物里展开业务 API 的结构，而响应类型桶只导出
 * `BilibiliVideoInfoResponse` 这样的具名别名、不导出底层的 `*_V0`，展开时叫不出名来报 TS2883。
 */
export let bilibiliApi: SuccessAmagiClient['bilibili'] = amagiClientInstance.amagi.bilibili

export let douyinWebApi: SuccessAmagiClient['douyin']['web'] = amagiClientInstance.amagi.douyin.web

export let douyinAppApi: SuccessAmagiClient['douyin']['app'] = amagiClientInstance.amagi.douyin.app

export let kuaishouApi: SuccessAmagiClient['kuaishou'] = amagiClientInstance.amagi.kuaishou

export let xiaohongshuApi: SuccessAmagiClient['xiaohongshu'] = amagiClientInstance.amagi.xiaohongshu

/**
 * 原始 v7 客户端。扫码登录会话（`douyin.web.auth` / `bilibili.auth`）、实例级事件总线
 * （`events` / `on` / `once`）与 `startServer` 都从这里取。
 *
 * 返回类型显式写成 {@link AmagiClient}：不写的话 TS 要在声明产物里展开这个结构，
 * 会碰到 amagi 内部才叫得出名字的类型（如 `SearchNoteType`），报 TS4023。
 */
export const getAmagiClient = (): AmagiClient => amagiClientInstance.rawAmagi

export const reloadAmagiConfig = () => {
  const nextConfig = readClientConfig()
  const nextConfigSignature = JSON.stringify(nextConfig)
  if (nextConfigSignature === amagiClientInstance.configSignature) {
    logger.debug('[AmagiClient] 配置未变化，跳过重复重载')
    return false
  }

  logger.debug('[AmagiClient] 检测到配置变化，正在重载...')
  amagiClientInstance = createRuntime(nextConfig, nextConfigSignature)

  // ESM 的 `export let` 是实时绑定：Client 重建后要同步替换，否则调用方还持有旧实例截取的引用
  bilibiliApi = amagiClientInstance.amagi.bilibili
  douyinWebApi = amagiClientInstance.amagi.douyin.web
  douyinAppApi = amagiClientInstance.amagi.douyin.app
  kuaishouApi = amagiClientInstance.amagi.kuaishou
  xiaohongshuApi = amagiClientInstance.amagi.xiaohongshu

  for (const listener of amagiReloadListeners) {
    try {
      listener()
    } catch (error) {
      logger.error(`[AmagiClient] 运行时资源重载失败: ${error}`)
    }
  }

  logger.debug('[AmagiClient] 配置重载完成')
  return true
}
