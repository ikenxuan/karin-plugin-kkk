import { open, stat, truncate } from 'node:fs/promises'
import type { Readable } from 'node:stream'

import axios, { type AxiosRequestConfig } from 'node-karin/axios'

import type { DownloadResult, ProgressCallback } from '@/module/utils/Network/types'

import {
  type BilibiliCdnMeasure,
  probeBilibiliCdn,
  recordBilibiliCdnFailure,
  recordBilibiliCdnSuccess,
  withBilibiliCdnConnection
} from './cdn'

/** CDN 下载参数；fallback 复用原下载器的重试、限速和进度通知。 */
type DownloadOptions = {
  url: string
  candidates: string[]
  filepath: string
  headers: AxiosRequestConfig['headers']
  limited?: boolean
  progress: ProgressCallback
  report: (message: string) => void
  fallback: (url: string) => Promise<DownloadResult>
}

const WINDOW_BYTES = 1024 * 1024
const PARALLEL_MIN_BYTES = 4 * 1024 * 1024
const STALL_TIMEOUT = 10000

/** 清空半成品再交给原下载器，避免把未验证片段用于断点续传。 */
const resetPartialFile = async (filepath: string) => {
  try {
    await truncate(filepath, 0)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

/**
 * 下载并校验指定字节区间，仅接收匹配的 206 响应。
 * 十秒没有新数据便取消请求；分段内容校验通过后才交给写入步骤。
 */
const readRange = (url: string, start: number, end: number, measure: BilibiliCdnMeasure, options: DownloadOptions, signal: AbortSignal) =>
  withBilibiliCdnConnection(async () => {
    if (signal.aborted) throw new Error('CDN 分段已取消')
    const controller = new AbortController()
    const cancel = () => controller.abort()
    signal.addEventListener('abort', cancel, { once: true })
    let timeout: NodeJS.Timeout
    const renewTimeout = () => {
      clearTimeout(timeout)
      timeout = setTimeout(cancel, STALL_TIMEOUT)
    }
    renewTimeout()
    let responseStream: Readable | undefined
    try {
      const response = await axios.get<Readable>(url, {
        headers: {
          ...options.headers,
          Range: `bytes=${start}-${end}`,
          'Accept-Encoding': 'identity',
          ...(measure.etag ? { 'If-Range': measure.etag } : {})
        },
        responseType: 'stream',
        timeout: STALL_TIMEOUT,
        signal: controller.signal,
        maxRedirects: 5,
        validateStatus: () => true
      })
      responseStream = response.data
      const range = /^bytes (\d+)-(\d+)\/(\d+)$/i.exec(String(response.headers['content-range'] ?? ''))
      if (
        response.status !== 206 ||
        !range ||
        Number(range[1]) !== start ||
        Number(range[2]) !== end ||
        Number(range[3]) !== measure.total
      ) {
        throw new Error(`CDN 分段范围不匹配 HTTP ${response.status}`)
      }
      if (measure.etag && String(response.headers.etag ?? '') !== measure.etag) throw new Error('CDN 分段 ETag 不匹配')
      if (/text\/|application\/(?:json|xml)/i.test(String(response.headers['content-type'] ?? ''))) throw new Error('CDN 分段返回错误页面')
      const content = Buffer.alloc(end - start + 1)
      let received = 0
      for await (const chunk of responseStream) {
        renewTimeout()
        if (received + chunk.length > content.length) throw new Error('CDN 分段响应超长')
        chunk.copy(content, received)
        received += chunk.length
      }
      if (received !== content.length) throw new Error('CDN 分段响应不完整')
      return content
    } finally {
      clearTimeout(timeout!)
      signal.removeEventListener('abort', cancel)
      responseStream?.destroy()
      controller.abort()
    }
  })

/** 文件系统可能短写，循环写完当前片段后再推进下载偏移。 */
const writeEntireBuffer = async (file: Awaited<ReturnType<typeof open>>, content: Buffer, position: number) => {
  let written = 0
  while (written < content.length) {
    const result = await file.write(content, written, content.length - written, position + written)
    if (result.bytesWritten === 0) throw new Error('CDN 文件写入失败')
    written += result.bytesWritten
  }
}

/**
 * 大文件按连续区间双连接下载，失败时尝试备用线路或原下载器。
 * 只有强 ETag、总长度和文件路径一致时，才沿用上一条线路已完成的片段。
 */
export const downloadBilibiliCdn = async (options: DownloadOptions): Promise<DownloadResult> => {
  const candidates = [...new Set([options.url, ...options.candidates])].slice(0, 6)
  let offset = 0
  let previous: BilibiliCdnMeasure | undefined
  let lastError: unknown
  let singleConnectionFallback: BilibiliCdnMeasure | undefined
  const parallel = !options.limited && process.env.KKK_BILIBILI_CDN_PARALLEL !== '0'
  for (const [index, url] of candidates.entries()) {
    const host = new URL(url).host
    if (index > 0) options.report(`CDN 自动换线：${host}`)
    let measure: BilibiliCdnMeasure | undefined
    if (parallel) {
      try {
        measure = await probeBilibiliCdn(url, options.headers, true)
      } catch (error) {
        lastError = error
        if (/HTTP (?:403|429|412)/.test(error instanceof Error ? error.message : '')) {
          options.report(`CDN 拒绝访问或触发风控：${host}，尝试其余候选`)
          continue
        }
        options.report(`CDN 探测不可用，尝试单连接：${host}`)
      }
    }
    const started = performance.now()
    try {
      if (measure) {
        options.report(`CDN 测速参考：${host}，${(measure.speed / 1048576).toFixed(2)} MiB/s，首字节 ${measure.latency.toFixed(0)} ms`)
      }
      if (!parallel || !measure?.supportsRange || measure.total < PARALLEL_MIN_BYTES) {
        if (index > 0 || offset > 0) await resetPartialFile(options.filepath)
        offset = 0
        options.report(`CDN 单连接下载：${host}${options.limited ? '，沿用下载限速' : ''}`)
        let downloadStarted = started
        const result = await withBilibiliCdnConnection(() => {
          downloadStarted = performance.now()
          return options.fallback(url)
        })
        recordBilibiliCdnSuccess(url, (result.totalBytes * 1000) / Math.max(1, performance.now() - downloadStarted), measure?.latency)
        return result
      }
      if (offset > 0) {
        const compatible =
          previous?.etag &&
          previous.etag === measure.etag &&
          previous.total === measure.total &&
          new URL(previous.url).pathname === new URL(url).pathname
        if (!compatible) {
          offset = 0
          options.report(`CDN 内容标识不同，重新下载：${host}`)
        } else {
          options.report(`CDN 断点续传：${host}，已完成 ${(offset / 1048576).toFixed(2)} MiB`)
        }
      }
      let file: Awaited<ReturnType<typeof open>> | undefined
      const controller = new AbortController()
      const remainingBytes = measure.total - offset
      try {
        file = await open(options.filepath, offset > 0 ? 'r+' : 'w')
        await file.truncate(offset)
        options.report(`CDN 双连接分段下载：${host}，${(measure.total / 1048576).toFixed(2)} MiB`)
        while (offset < measure.total) {
          const firstStart = offset
          const firstEnd = Math.min(firstStart + WINDOW_BYTES - 1, measure.total - 1)
          const secondStart = firstEnd + 1
          const tasks = [readRange(url, firstStart, firstEnd, measure, options, controller.signal)]
          if (secondStart < measure.total) {
            tasks.push(
              readRange(url, secondStart, Math.min(secondStart + WINDOW_BYTES - 1, measure.total - 1), measure, options, controller.signal)
            )
          }
          let failure: unknown
          const results = await Promise.allSettled(
            tasks.map((task) =>
              task.catch((error) => {
                // 先记录失败原因再取消同批请求，避免取消错误覆盖风控状态。
                if (!controller.signal.aborted) {
                  failure = error
                  controller.abort()
                }
                throw error
              })
            )
          )
          for (const result of results) {
            if (result.status !== 'fulfilled') break
            await writeEntireBuffer(file, result.value, offset)
            offset += result.value.length
            options.progress(offset, measure.total)
          }
          if (controller.signal.aborted) throw failure
        }
        if ((await file.stat()).size !== measure.total) throw new Error('CDN 下载文件长度不匹配')
        recordBilibiliCdnSuccess(url, (remainingBytes * 1000) / Math.max(1, performance.now() - started), measure.latency)
        options.report(`CDN 下载完成：${host}`)
        return { filepath: options.filepath, totalBytes: measure.total }
      } finally {
        controller.abort()
        await file?.close()
      }
    } catch (error) {
      previous = measure
      lastError = error
      recordBilibiliCdnFailure(url, error)
      if ((error as NodeJS.ErrnoException).code === 'ENOSPC' || (error as NodeJS.ErrnoException).code === 'EACCES') throw error
      if (parallel && measure?.supportsRange && measure.total >= PARALLEL_MIN_BYTES) singleConnectionFallback = measure
      options.report(`CDN 线路失败：${host}，尝试其余候选`)
    }
  }
  // 先保留跨线路分段续传，全部失败后再用原下载器重新下载。
  if (singleConnectionFallback) {
    const { url, latency } = singleConnectionFallback
    try {
      await resetPartialFile(options.filepath)
      options.report(`CDN 分段下载失败，降级单连接：${new URL(url).host}`)
      return await withBilibiliCdnConnection(async () => {
        const started = performance.now()
        const result = await options.fallback(url)
        recordBilibiliCdnSuccess(url, (result.totalBytes * 1000) / Math.max(1, performance.now() - started), latency)
        return result
      })
    } catch (error) {
      lastError = error
      if ((error as NodeJS.ErrnoException).code === 'ENOSPC' || (error as NodeJS.ErrnoException).code === 'EACCES') throw error
    }
  }
  let partialBytes = 0
  try {
    partialBytes = (await stat(options.filepath)).size
  } catch {}
  throw new Error(
    `全部 ${candidates.length} 条 CDN 线路下载失败，已保留 ${partialBytes} 字节；${lastError instanceof Error ? lastError.name : 'NetworkError'}`
  )
}
