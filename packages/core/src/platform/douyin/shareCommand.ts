import fs from 'node:fs/promises'
import path from 'node:path'

import { AmagiError, douyinAppApi } from '@/module/utils/amagiClient'
import { logger } from '@/module/utils/logger'

import { getDouyinAppSignerBaseUrl } from './appSignerUrl'
import { prepareDouyinShareDataFile } from './shareStorage'

const SHARE_PATTERNS_CACHE_TTL_MS = 60 * 60 * 1000
const SHARE_PATTERNS_RETRY_BACKOFF_MS = 30 * 1000

type SharePatternsCacheEntry = {
  patterns: readonly string[]
  expiresAt: number
}

type PersistedSharePatterns = SharePatternsCacheEntry & {
  signUrl: string
}

const sharePatternsCache = new Map<string, SharePatternsCacheEntry>()
const pendingSharePatterns = new Map<string, Promise<readonly string[]>>()
const sharePatternsRetryAt = new Map<string, number>()
const loadedSharePatterns = new Set<string>()
const pendingSharePatternReads = new Map<string, Promise<void>>()

const sharePatternsFilename = 'douyin-share-command-patterns.json'

/** 按平台规则顺序提取第一捕获组；整段匹配可能包含口令外围的分隔符。 */
export const extractDouyinShareCommand = (message: string, patterns: readonly string[]): string | undefined => {
  for (const source of patterns) {
    try {
      const command = new RegExp(source).exec(message)?.[1]
      if (command) return command
    } catch {
      // 跳过当前运行时无法编译的规则，继续尝试后续规则。
    }
  }

  return undefined
}

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined

const resolveSignAddress = (signUrl: string): string => {
  const cacheKey = signUrl?.trim() ?? ''
  try {
    return getDouyinAppSignerBaseUrl(cacheKey)
  } catch (error) {
    sharePatternsRetryAt.set(cacheKey, Date.now() + SHARE_PATTERNS_RETRY_BACKOFF_MS)
    throw error
  }
}

const fetchDouyinShareCommandPatterns = async (): Promise<string[]> => {
  const payload = asRecord((await douyinAppApi.shareSettings()).data)
  if (!payload) throw new Error('抖音分享规则接口未返回有效的 JSON 对象')
  if (payload.status_code !== 0 && payload.status_code !== '0') {
    throw new Error(`抖音分享规则请求失败（状态码 ${String(payload.status_code ?? '未知')}）`)
  }

  const patterns = payload.command_patterns
  if (patterns === undefined || patterns === null) return []
  if (!Array.isArray(patterns) || !patterns.every((pattern) => typeof pattern === 'string')) {
    throw new Error('抖音分享规则接口未返回有效的 command_patterns')
  }
  return patterns
}

const loadPersistedShareCommandPatterns = async (signAddress: string): Promise<void> => {
  if (loadedSharePatterns.has(signAddress)) return

  const pending = pendingSharePatternReads.get(signAddress)
  if (pending) return pending

  let request: Promise<void>
  request = fs
    .readFile(prepareDouyinShareDataFile(sharePatternsFilename), 'utf8')
    .then((content) => {
      const persisted = asRecord(JSON.parse(content))
      const patterns = persisted?.patterns
      const expiresAt = persisted?.expiresAt
      if (typeof persisted?.signUrl !== 'string') return
      let persistedBaseUrl: string
      try {
        persistedBaseUrl = getDouyinAppSignerBaseUrl(persisted.signUrl)
      } catch {
        // 不沿用以完整接口地址或非法地址为键的旧缓存，等待正常刷新。
        return
      }
      if (
        persistedBaseUrl === signAddress &&
        Array.isArray(patterns) &&
        patterns.every((pattern) => typeof pattern === 'string') &&
        typeof expiresAt === 'number' &&
        Number.isFinite(expiresAt)
      ) {
        sharePatternsCache.set(signAddress, { patterns: Object.freeze([...patterns]), expiresAt })
      }
    })
    .catch((error: unknown) => {
      if (asRecord(error)?.code !== 'ENOENT')
        logger.warn(`[实验室] 读取抖音分享规则缓存失败：${error instanceof Error ? error.message : '未知错误'}`)
    })
    .finally(() => {
      loadedSharePatterns.add(signAddress)
      if (pendingSharePatternReads.get(signAddress) === request) pendingSharePatternReads.delete(signAddress)
    })
  pendingSharePatternReads.set(signAddress, request)
  return request
}

const persistShareCommandPatterns = async (signAddress: string, entry: SharePatternsCacheEntry): Promise<void> => {
  const persisted: PersistedSharePatterns = { signUrl: signAddress, ...entry }
  try {
    const sharePatternsCachePath = prepareDouyinShareDataFile(sharePatternsFilename)
    await fs.mkdir(path.dirname(sharePatternsCachePath), { recursive: true })
    await fs.writeFile(sharePatternsCachePath, JSON.stringify(persisted), 'utf8')
  } catch (error) {
    logger.warn(`[实验室] 写入抖音分享规则缓存失败：${error instanceof Error ? error.message : '未知错误'}`)
  }
}

const refreshDouyinShareCommandPatterns = (signAddress: string): Promise<readonly string[]> => {
  const pending = pendingSharePatterns.get(signAddress)
  if (pending) return pending

  let request: Promise<readonly string[]>
  request = fetchDouyinShareCommandPatterns()
    .then(async (patterns) => {
      const entry = { patterns: Object.freeze([...patterns]), expiresAt: Date.now() + SHARE_PATTERNS_CACHE_TTL_MS }
      sharePatternsCache.set(signAddress, entry)
      sharePatternsRetryAt.delete(signAddress)
      await persistShareCommandPatterns(signAddress, entry)
      return entry.patterns
    })
    .catch((error: unknown) => {
      sharePatternsRetryAt.set(signAddress, Date.now() + SHARE_PATTERNS_RETRY_BACKOFF_MS)
      throw error
    })
    .finally(() => {
      if (pendingSharePatterns.get(signAddress) === request) pendingSharePatterns.delete(signAddress)
    })
  pendingSharePatterns.set(signAddress, request)
  return request
}

/** Restore disk cache first, then force the APK settings refresh once during plugin startup. */
export const initializeDouyinShareCommandPatterns = async (signUrl: string): Promise<readonly string[]> => {
  const signAddress = resolveSignAddress(signUrl)
  await loadPersistedShareCommandPatterns(signAddress)
  return refreshDouyinShareCommandPatterns(signAddress)
}

/** Load the APK's server-managed patterns and keep them warm for one hour. */
export const getDouyinShareCommandPatterns = async (signUrl: string): Promise<readonly string[]> => {
  const cacheKey = signUrl?.trim() ?? ''
  const retryAt = sharePatternsRetryAt.get(cacheKey)
  if (retryAt !== undefined && retryAt > Date.now()) return sharePatternsCache.get(cacheKey)?.patterns ?? []
  if (retryAt !== undefined) sharePatternsRetryAt.delete(cacheKey)

  const signAddress = resolveSignAddress(cacheKey)
  const baseRetryAt = sharePatternsRetryAt.get(signAddress)
  if (baseRetryAt !== undefined && baseRetryAt > Date.now()) return sharePatternsCache.get(signAddress)?.patterns ?? []
  if (baseRetryAt !== undefined) sharePatternsRetryAt.delete(signAddress)
  await loadPersistedShareCommandPatterns(signAddress)
  const now = Date.now()
  const cached = sharePatternsCache.get(signAddress)
  if (cached && cached.expiresAt > now) return cached.patterns

  const pending = pendingSharePatterns.get(signAddress)
  if (pending) {
    try {
      return await pending
    } catch {
      return sharePatternsCache.get(signAddress)?.patterns ?? []
    }
  }

  return refreshDouyinShareCommandPatterns(signAddress)
}

const asAwemeId = (value: unknown): string | undefined => {
  const id = typeof value === 'string' ? value : typeof value === 'number' && Number.isSafeInteger(value) ? String(value) : undefined
  return id && /^\d{15,20}$/.test(id) ? id : undefined
}

/** 用与规则请求相同的 Amagi App 会话，将分享口令换成作品 ID。 */
export const resolveDouyinShareCommand = async (command: string): Promise<string> => {
  const result = await douyinAppApi
    .commandTrans({
      command,
      clipboard_timestamp: Date.now(),
      patterns: ['email', 'datetime'],
      start_from: 'hot'
    })
    .catch((error: unknown) => {
      if (error instanceof AmagiError && error.amagiCode === 'EMPTY_RESPONSE' && error.httpStatus !== undefined) {
        throw new Error(`抖音口令接口返回空响应（HTTP ${error.httpStatus}），未返回可判断原因的业务错误码`)
      }
      throw error
    })
  const payload = asRecord(result.data)
  if (!payload) throw new Error('抖音口令接口未返回有效的 JSON 对象')
  if (payload.status_code !== 0 && payload.status_code !== '0') {
    throw new Error(`抖音口令解析失败（状态码 ${String(payload.status_code ?? '未知')}）`)
  }

  const extraInfo = asRecord(payload.extra_info)
  const schemaDetail = asRecord(payload.schema_detail)
  const schema = typeof payload.schema === 'string' ? payload.schema : ''
  const schemaMatch = schema.match(
    /(?:aweme|article|note)\/detail\/(\d{15,20})(?=[/?#]|$)|[?&](?:aweme_id|item_id|modal_id)=(\d{15,20})(?=[&#]|$)/
  )
  const awemeId = asAwemeId(extraInfo?.object_id) ?? asAwemeId(schemaDetail?.aweme_id) ?? asAwemeId(schemaMatch?.[1] ?? schemaMatch?.[2])
  if (!awemeId) throw new Error('未能从抖音分享口令中获取作品 ID，口令可能已失效或不是作品分享')
  return awemeId
}
