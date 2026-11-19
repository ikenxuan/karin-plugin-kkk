import { createHash } from 'node:crypto'
import { networkInterfaces } from 'node:os'
import type { Readable } from 'node:stream'

import axios, { type AxiosRequestConfig } from 'node-karin/axios'

/** B站播放接口的主、备用地址，兼容 snake_case、camelCase 和未登录 durl。 */
type BilibiliStreamUrls = {
  base_url?: string
  backup_url?: string[] | null
  baseUrl?: string
  backupUrl?: string[] | null
  url?: string
}

const BILIBILI_PCDN_HOST_RE =
  /(?:^|\.)(?:(?:mcdn|pcdn)\.bilivideo\.(?:cn|com)|szbdyd\.com|mountaintoys\.cn|h2\.smtcdns\.net|qrstuvwxyzab\.com|zhenidc\.cn)$/i
const BILIBILI_CDN_HOST_RE = /(?:^|\.)bilivideo\.(?:cn|com)$/i
const CDN_SAMPLE_BYTES = 32 * 1024
const CDN_PROBE_TIMEOUT = 3000
const CDN_PROBE_LIMIT = 3
const CDN_CACHE_TTL = 120000
const CDN_HISTORY_LIMIT = 128
let activeConnections = 0
const connectionQueue: Array<() => void> = []

/**
 * 共享探测和下载的连接配额，最多同时建立四条连接。
 * 等待任务按入队顺序接替已释放的配额。
 */
export const withBilibiliCdnConnection = async <Result>(action: () => Promise<Result>): Promise<Result> => {
  if (activeConnections >= 4) await new Promise<void>((resolve) => connectionQueue.push(resolve))
  else activeConnections++
  try {
    return await action()
  } finally {
    const next = connectionQueue.shift()
    if (next) next()
    else activeConnections--
  }
}

/** CDN 样本测速结果；speed 为字节/秒，latency 为毫秒，total 为文件总字节数。 */
export type BilibiliCdnMeasure = {
  url: string
  speed: number
  latency: number
  total: number
  etag: string
  supportsRange: boolean
}

type HostHealth = {
  speed: number
  failures: number
  updatedAt: number
}

/** 用请求头摘要区分测速缓存，避免不同 Cookie 或 Referer 复用结果。 */
const requestIdentity = (headers: AxiosRequestConfig['headers']) =>
  createHash('sha256')
    .update(JSON.stringify(headers ?? {}))
    .digest('hex')

const getUrlHostname = (url: string) => {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.hostname : ''
  } catch {
    return ''
  }
}

/** 按完整域名后缀识别已知 PCDN，不匹配名称相似的其他域名。 */
const isBilibiliPcdnUrl = (url: string) => BILIBILI_PCDN_HOST_RE.test(getUrlHostname(url))

/**
 * 提取并去重播放接口的有效 HTTP 地址，将 PCDN 排在普通线路之后。
 * 保留原始签名、端口和查询参数，不替换主机名。
 */
export const getBilibiliStreamUrls = (stream?: BilibiliStreamUrls | null): string[] => {
  if (!stream) return []
  const baseUrl = stream.base_url ?? stream.baseUrl ?? stream.url
  const urls = [...new Set([baseUrl, ...(stream.backup_url ?? stream.backupUrl ?? [])])].filter(
    (url): url is string => typeof url === 'string' && Boolean(getUrlHostname(url))
  )
  const priority = (url: string) => {
    if (isBilibiliPcdnUrl(url)) return 3
    if (url === baseUrl) return 0
    return BILIBILI_CDN_HOST_RE.test(getUrlHostname(url)) ? 1 : 2
  }
  return urls.sort((left, right) => priority(left) - priority(right))
}

/** 同步返回排序后的首选地址，不发起测速请求。 */
export const getBilibiliStreamUrl = (stream?: BilibiliStreamUrls | null): string | undefined => getBilibiliStreamUrls(stream)[0]

/**
 * 读取最多 32 KiB 样本，测量吞吐与首字节延迟，并检查 Range 响应。
 * 服务端忽略 Range 时，达到样本上限便关闭响应流。
 */
const probeBilibiliStreamUrl = async (url: string, headers: AxiosRequestConfig['headers']): Promise<BilibiliCdnMeasure> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), CDN_PROBE_TIMEOUT)
  const started = performance.now()
  let responseStream: Readable | undefined
  try {
    const response = await axios.get<Readable>(url, {
      headers: { ...headers, Range: `bytes=0-${CDN_SAMPLE_BYTES - 1}`, 'Accept-Encoding': 'identity' },
      responseType: 'stream',
      timeout: CDN_PROBE_TIMEOUT,
      signal: controller.signal,
      maxRedirects: 5,
      validateStatus: () => true
    })
    responseStream = response.data
    if (response.status !== 200 && response.status !== 206) throw new Error(`HTTP ${response.status}`)
    const contentType = String(response.headers['content-type'] ?? '')
    if (/text\/|application\/(?:json|xml)/i.test(contentType)) throw new Error('CDN 返回错误页面')
    let expectedBytes = CDN_SAMPLE_BYTES
    let total = Number(response.headers['content-length']) || 0
    if (response.status === 206) {
      const range = /^bytes 0-(\d+)\/(\d+|\*)$/i.exec(String(response.headers['content-range'] ?? ''))
      if (!range || Number(range[1]) >= CDN_SAMPLE_BYTES) throw new Error('CDN Range 响应不匹配')
      expectedBytes = Number(range[1]) + 1
      total = range[2] === '*' ? 0 : Number(range[2])
      if (total > 0 && total < expectedBytes) throw new Error('CDN 文件长度不匹配')
    } else {
      const contentLength = Number(response.headers['content-length'])
      if (contentLength > 0) expectedBytes = Math.min(contentLength, CDN_SAMPLE_BYTES)
    }
    let bytes = 0
    let latency = 0
    for await (const chunk of responseStream) {
      if (bytes === 0) latency = performance.now() - started
      bytes += Math.min(Buffer.byteLength(chunk), expectedBytes - bytes)
      if (bytes >= expectedBytes) break
    }
    if (bytes === 0 || bytes < expectedBytes) throw new Error('CDN 响应不完整')
    const etag = String(response.headers.etag ?? '')
    return {
      url,
      speed: (bytes * 1000) / Math.max(1, performance.now() - started),
      latency,
      total,
      etag: /^"[^"]+"$/.test(etag) ? etag : '',
      supportsRange: response.status === 206
    }
  } finally {
    clearTimeout(timeout)
    responseStream?.destroy()
    controller.abort()
  }
}

/**
 * 管理 CDN 测速缓存、主机健康记录和播放接口返回的下载候选。
 * 网络地址变化后清空旧记录，避免沿用上一个网络的测速结果。
 */
export class BilibiliCdnSelector {
  private now: () => number
  private preferredHost: string
  private identity = ''
  private checkedNetworkAt = 0
  private health = new Map<string, HostHealth>()
  private cooldowns = new Map<string, number>()
  private measures = new Map<string, { measure: BilibiliCdnMeasure; expiresAt: number }>()
  private routes = new Map<string, { candidates: string[]; expiresAt: number }>()
  private inFlight = new Map<string, Promise<string | undefined>>()
  private generation = 0

  constructor(options: { now?: () => number; preferredHost?: string } = {}) {
    this.now = options.now ?? Date.now
    this.preferredHost = (options.preferredHost ?? process.env.KKK_BILIBILI_CDN_HOST ?? '').toLowerCase()
  }

  /** 清空旧网络状态；正在执行的旧探测不会再写回缓存。 */
  networkChanged(identity: string) {
    if (identity === this.identity) return
    this.identity = identity
    this.reset()
  }

  /** 清空测速、候选和健康记录，并使旧探测结果失效。 */
  reset() {
    this.generation++
    this.health.clear()
    this.cooldowns.clear()
    this.measures.clear()
    this.routes.clear()
    this.inFlight.clear()
  }

  private trim<Value>(entries: Map<string, Value>) {
    while (entries.size > CDN_HISTORY_LIMIT) entries.delete(entries.keys().next().value!)
  }

  /** 依次按失败冷却、主机偏好和近期吞吐排序。 */
  rank(candidates: string[]) {
    const now = this.now()
    const score = (url: string) => {
      const host = new URL(url).host
      const health = this.health.get(host)
      if (!health || now - health.updatedAt > CDN_CACHE_TTL) return 0
      return health.speed / (1 + health.failures)
    }
    return [...candidates].sort((left, right) => {
      const leftCooling = Number((this.cooldowns.get(left) ?? 0) > now)
      const rightCooling = Number((this.cooldowns.get(right) ?? 0) > now)
      const leftPinned = Number(new URL(left).hostname === this.preferredHost)
      const rightPinned = Number(new URL(right).hostname === this.preferredHost)
      return leftCooling - rightCooling || rightPinned - leftPinned || score(right) - score(left)
    })
  }

  /** 记录失败并删除该 URL 的测速缓存；429、412 使用更长的冷却时间。 */
  failure(url: string, error?: unknown) {
    const now = this.now()
    const host = new URL(url).host
    const previous = this.health.get(host)
    const rateLimited = /429|412/.test(error instanceof Error ? error.message : String(error))
    const cooldownUntil = now + (rateLimited ? 120000 : 30000)
    this.cooldowns.set(url, cooldownUntil)
    this.health.set(host, {
      speed: previous?.speed ?? 0,
      failures: (previous?.failures ?? 0) + 1,
      updatedAt: now
    })
    for (const [key, cached] of this.measures) if (cached.measure.url === url) this.measures.delete(key)
    this.trim(this.health)
    this.trim(this.cooldowns)
  }

  /** 用近期吞吐平滑更新主机记录，并解除当前 URL 的失败冷却。 */
  success(url: string, speed: number) {
    const host = new URL(url).host
    const previous = this.health.get(host)
    this.health.set(host, {
      speed: previous?.speed ? previous.speed * 0.4 + speed * 0.6 : speed,
      failures: previous?.failures ?? 0,
      updatedAt: this.now()
    })
    this.cooldowns.delete(url)
    this.trim(this.health)
  }

  /** 读取与请求头匹配、且仍在有效期内的测速结果。 */
  measure(url: string, headers: AxiosRequestConfig['headers'] = {}) {
    const result = this.measures.get(`${requestIdentity(headers)}:${url}`)
    return result && result.expiresAt > this.now() ? result.measure : undefined
  }

  /** 优先复用测速缓存；下载阶段可要求抛出探测错误，由调用方决定回退。 */
  async probe(url: string, headers: AxiosRequestConfig['headers'] = {}, throwOnFailure = false) {
    const cached = this.measure(url, headers)
    if (cached) return cached
    const generation = this.generation
    try {
      const measure = await withBilibiliCdnConnection(() => probeBilibiliStreamUrl(url, headers))
      if (generation === this.generation) {
        this.success(url, measure.speed)
        this.measures.set(`${requestIdentity(headers)}:${url}`, { measure, expiresAt: this.now() + CDN_CACHE_TTL })
        this.trim(this.measures)
      }
      return measure
    } catch (error) {
      if (generation === this.generation) this.failure(url, error)
      if (throwOnFailure) throw error
      return undefined
    }
  }

  /** 仅返回已登记且未过期的播放候选；其他 URL 不进入扩展下载器。 */
  downloadCandidates(url: string) {
    const route = this.routes.get(url)
    if (!route || route.expiresAt <= this.now()) return []
    return [url, ...this.rank(route.candidates).filter((candidate) => candidate !== url)]
  }

  /**
   * 合并相同播放候选的并发选线，最多探测三个候选。
   * 有普通线路时跳过 PCDN；测速失败时保留首选地址供下载阶段继续尝试。
   */
  async select(stream?: BilibiliStreamUrls | null, headers: AxiosRequestConfig['headers'] = {}): Promise<string | undefined> {
    const now = this.now()
    if (now - this.checkedNetworkAt > 30000) {
      this.checkedNetworkAt = now
      const interfaces = networkInterfaces()
      const identity = Object.entries(interfaces)
        .flatMap(([name, addresses]) =>
          (addresses ?? []).filter((address) => !address.internal).map((address) => `${name}:${address.address}`)
        )
        .sort()
        .join('|')
      this.networkChanged(identity)
    }
    const original = getBilibiliStreamUrls(stream)
    const normal = original.filter((url) => !isBilibiliPcdnUrl(url))
    const candidates = this.rank(normal.length > 0 ? normal : original).slice(0, 6)
    if (candidates.length === 0) return undefined
    for (const url of candidates) this.routes.set(url, { candidates, expiresAt: now + 600000 })
    this.trim(this.routes)
    if (normal.length === 0) return candidates[0]
    const usable = candidates.filter((url) => (this.cooldowns.get(url) ?? 0) <= now)
    const pool = (usable.length > 0 ? usable : candidates).slice(0, CDN_PROBE_LIMIT)
    const cached = pool.map((url) => this.measure(url, headers)).filter((measure): measure is BilibiliCdnMeasure => Boolean(measure))
    const choose = (results: BilibiliCdnMeasure[]) => {
      results.sort((left, right) => {
        const leftPinned = Number(new URL(left.url).hostname === this.preferredHost)
        const rightPinned = Number(new URL(right.url).hostname === this.preferredHost)
        return rightPinned - leftPinned || right.speed - left.speed
      })
      return results[0]?.url ?? candidates[0]
    }
    if (cached.length > 0) return choose(cached)
    const key = createHash('sha256').update(JSON.stringify(pool)).update(requestIdentity(headers)).digest('hex')
    const pending = this.inFlight.get(key)
    if (pending) return pending
    const selection: Promise<string | undefined> = Promise.all(pool.map((url) => this.probe(url, headers)))
      .then((results) => choose(results.filter((measure): measure is BilibiliCdnMeasure => Boolean(measure))))
      .finally(() => {
        if (this.inFlight.get(key) === selection) this.inFlight.delete(key)
      })
    this.inFlight.set(key, selection)
    return selection
  }
}

export const bilibiliCdn = new BilibiliCdnSelector()

/** 使用共享选择器测速并登记播放候选。 */
export const selectBilibiliStreamUrl = (stream?: BilibiliStreamUrls | null, headers: AxiosRequestConfig['headers'] = {}) =>
  bilibiliCdn.select(stream, headers)
