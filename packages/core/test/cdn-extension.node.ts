import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import fs from 'node:fs/promises'
import http from 'node:http'
import { stripTypeScriptTypes, syncBuiltinESMExports } from 'node:module'
import type { AddressInfo } from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { after, before, beforeEach, describe, it, mock } from 'node:test'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

import * as api from '../src/platform/bilibili/cdn'
import * as transfer from '../src/platform/bilibili/cdn-transfer'

type DownloadOptions = Parameters<typeof transfer.downloadBilibiliCdn>[0]
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
let server: http.Server
let origin: string
let temporary: string
let active = 0
let maxActive = 0
let partialFailures = 0
const requests: Array<{ route: string; start: number; end: number; range?: string }> = []
const payload = Buffer.alloc(5 * 1024 * 1024 + 37)
for (let index = 0; index < payload.length; index++) payload[index] = index % 251
const expectedHash = createHash('sha256').update(payload).digest('hex')
const timers = new Set<ReturnType<typeof setTimeout>>()

before(async () => {
  temporary = await mkdtemp(path.join(os.tmpdir(), 'kkk-cdn-extension-'))
  server = http.createServer((request, response) => {
    active++
    maxActive = Math.max(maxActive, active)
    response.once('close', () => active--)
    const parsed = new URL(request.url!, 'http://local')
    const route = parsed.searchParams.get('route') ?? parsed.pathname
    const range = /^bytes=(\d+)-(\d+)$/.exec(request.headers.range ?? '')
    const start = range ? Number(range[1]) : 0
    const end = range ? Math.min(Number(range[2]), payload.length - 1) : payload.length - 1
    requests.push({ route, start, end, range: request.headers.range })
    if (range && start >= 1024 * 1024 && route === '/single-reset') return response.destroy()
    if (range && start >= 1024 * 1024 && route === '/single-ignore-range') {
      response.writeHead(200, { 'Content-Type': 'video/mp4', 'Content-Length': payload.length })
      return response.end(payload)
    }
    if (route === '/forbidden') return response.writeHead(403).end()
    if (route === '/rate-limit') return response.writeHead(429).end()
    if (route === '/hang') return
    if (route === '/range-rejected' && range) return response.writeHead(416).end()
    if (route === '/no-range' || route === '/no-range-partial') {
      response.writeHead(200, { 'Content-Type': 'video/mp4', 'Content-Length': payload.length, ETag: '"fixture"' })
      return response.end(payload)
    }
    if (route === '/invalid-range' && start > 0) {
      response.writeHead(206, {
        'Content-Type': 'video/mp4',
        'Content-Range': `bytes 0-${end - start}/${payload.length}`,
        ETag: '"fixture"',
        'Content-Length': end - start + 1
      })
      return response.end(payload.subarray(0, end - start + 1))
    }
    if (route === '/stall' && end > 32767) {
      response.writeHead(206, {
        'Content-Type': 'video/mp4',
        'Content-Range': `bytes ${start}-${end}/${payload.length}`,
        ETag: '"fixture"',
        'Content-Length': end - start + 1
      })
      response.write(payload.subarray(start, start + 4096))
      return
    }
    const etag = route === '/different' ? '"different"' : '"fixture"'
    response.writeHead(range ? 206 : 200, {
      'Content-Type': 'video/mp4',
      'Content-Length': end - start + 1,
      ...(range ? { 'Content-Range': `bytes ${start}-${end}/${payload.length}` } : {}),
      ETag: etag
    })
    if (route === '/partial' && start >= 2 * 1024 * 1024) {
      partialFailures++
      response.write(payload.subarray(start, Math.min(start + 4096, end + 1)))
      return response.destroy()
    }
    if (route === '/slow' && end === 32767) {
      const timer = setTimeout(() => {
        timers.delete(timer)
        if (!response.destroyed) response.end(payload.subarray(start, end + 1))
      }, 90)
      timers.add(timer)
      return
    }
    const timer = setTimeout(
      () => {
        timers.delete(timer)
        if (!response.destroyed) response.end(payload.subarray(start, end + 1))
      },
      end - start > 32767 ? 15 : 0
    )
    timers.add(timer)
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
})

beforeEach(() => {
  api.resetBilibiliCdnState?.()
  requests.length = 0
  maxActive = 0
  partialFailures = 0
})

after(async () => {
  for (const timer of timers) clearTimeout(timer)
  server.closeAllConnections()
  await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  await rm(temporary, { recursive: true, force: true })
})

describe('CDN 健康与缓存', () => {
  it('成功测速在两分钟内复用，不重复发起探测', async () => {
    const stream = { base_url: `${origin}/fast`, backup_url: [`${origin}/slow`] }
    await api.selectBilibiliStreamUrl(stream)
    const count = requests.length
    await api.selectBilibiliStreamUrl(stream)
    assert.equal(requests.length, count)
    assert.equal(api.getBilibiliCdnDiagnostics().cacheHits, 1)
  })

  it('同时选择同一流共享一次探测', async () => {
    const stream = { base_url: `${origin}/fast`, backup_url: [`${origin}/slow`] }
    await Promise.all(Array.from({ length: 6 }, () => api.selectBilibiliStreamUrl(stream)))
    assert.equal(requests.length, 2)
  })

  it('请求头身份改变后不能复用旧探测', async () => {
    const stream = { base_url: `${origin}/fast` }
    await api.selectBilibiliStreamUrl(stream, { Cookie: 'first' })
    await api.selectBilibiliStreamUrl(stream, { Cookie: 'second' })
    assert.equal(requests.length, 2)
    const diagnostics = JSON.stringify(api.getBilibiliCdnDiagnostics())
    assert.ok(!diagnostics.includes('Cookie') && !diagnostics.includes('first'))
  })

  it('429 和连接失败记录冷却，并允许剩余候选继续工作', async () => {
    await api.selectBilibiliStreamUrl({ base_url: `${origin}/rate-limit`, backup_url: [`${origin}/fast`] })
    const diagnostics = api.getBilibiliCdnDiagnostics()
    assert.ok(diagnostics.hosts.some((host) => host.failures > 0))
    assert.ok(diagnostics.hosts.some((host) => host.cooldownUntil > Date.now()))
  })

  it('健康记录过期与网络标识变化会重新探测', async () => {
    let now = Date.now()
    const selector = new api.BilibiliCdnSelector({ now: () => now })
    const stream = { base_url: `${origin}/fast` }
    await selector.select(stream)
    now += 121000
    await selector.select(stream)
    assert.equal(requests.length, 2)
    selector.networkChanged('new-network')
    await selector.select(stream)
    assert.equal(requests.length, 3)
  })

  it('手动主机偏好只从接口已有候选中选择', async () => {
    const selector = new api.BilibiliCdnSelector({ preferredHost: 'localhost' })
    const preferred = `http://localhost:${(server.address() as AddressInfo).port}/slow`
    assert.equal(await selector.select({ base_url: `${origin}/fast`, backup_url: [preferred] }), preferred)
    assert.equal(await selector.select({ base_url: `${origin}/fast` }), `${origin}/fast`)
  })

  it('已登记的签名 URL 才能进入扩展下载器', async () => {
    await api.selectBilibiliStreamUrl({ base_url: `${origin}/fast`, backup_url: [`${origin}/slow`] })
    assert.deepEqual(api.getBilibiliDownloadCandidates(`${origin}/unregistered`), [])
    assert.equal(api.getBilibiliDownloadCandidates(`${origin}/fast`).length, 2)
  })

  it('网络切换时正在执行的旧探测不阻止新网络重新测速', async () => {
    const selector = new api.BilibiliCdnSelector()
    const stream = { base_url: `${origin}/slow` }
    const old = selector.select(stream)
    selector.networkChanged('changed-during-probe')
    await Promise.all([old, selector.select(stream)])
    assert.equal(requests.length, 2)
  })
})

describe('CDN 分段、恢复与换线', () => {
  const download = async (name: string, candidates: string[], overrides: Partial<DownloadOptions> = {}) => {
    const filepath = path.join(temporary, name)
    let fallbackCalls = 0
    const progress: Array<{ bytes: number; total: number }> = []
    const events: string[] = []
    const result = await transfer.downloadBilibiliCdn({
      url: candidates[0],
      candidates,
      filepath,
      headers: { Referer: 'https://www.bilibili.com' },
      progress: (bytes, total) => progress.push({ bytes, total }),
      report: (message) => events.push(message),
      fallback: async (url) => {
        fallbackCalls++
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const content = Buffer.from(await response.arrayBuffer())
        await writeFile(filepath, content)
        return { filepath, totalBytes: content.length }
      },
      ...overrides
    })
    const content = await readFile(filepath)
    assert.equal(createHash('sha256').update(content).digest('hex'), expectedHash)
    assert.equal(result.totalBytes, payload.length)
    return { result, fallbackCalls, progress, events }
  }

  for (const route of ['/single-reset', '/single-ignore-range']) {
    it(`分段失败后清空半成品并用同一线路单连接重试：${route}`, async () => {
      const name = `${route.slice(1)}.bin`
      const filepath = path.join(temporary, name)
      let fallbackCalls = 0
      await download(name, [`${origin}${route}`], {
        fallback: async (url) => {
          fallbackCalls++
          assert.equal(url, `${origin}${route}`)
          assert.equal((await readFile(filepath)).length, 0)
          const response = await fetch(url)
          assert.ok(response.ok)
          const content = Buffer.from(await response.arrayBuffer())
          await writeFile(filepath, content)
          return { filepath, totalBytes: content.length }
        }
      })
      assert.equal(fallbackCalls, 1)
    })
  }

  for (const code of ['ENOSPC', 'EACCES']) {
    it(`分段文件操作遇到 ${code} 时立即抛出，不降级下载`, async () => {
      const failure = Object.assign(new Error(code), { code })
      const mockedOpen = mock.method(fs, 'open', async () => {
        throw failure
      })
      syncBuiltinESMExports()
      try {
        await assert.rejects(
          download(`${code}.bin`, [`${origin}/fast`], {
            fallback: async () => {
              throw new Error('磁盘错误不应触发单连接下载')
            }
          }),
          (error) => error === failure
        )
      } finally {
        mockedOpen.mock.restore()
        syncBuiltinESMExports()
      }
    })
  }

  it('大文件使用两条连接分段并按序写入，最终内容 SHA256 一致', async () => {
    const result = await download('parallel.bin', [`${origin}/fast`])
    assert.equal(result.fallbackCalls, 0)
    assert.ok(maxActive >= 2 && maxActive <= 2)
    assert.equal(result.progress.at(-1)?.bytes, payload.length)
  })

  it('中途断流换 CDN，相同强 ETag 可从连续完成位置续传', async () => {
    const result = await download('resume.bin', [`${origin}/stream?route=/partial`, `${origin}/stream?route=/fast`])
    assert.ok(partialFailures > 0)
    assert.ok(requests.some((entry) => entry.route === '/fast' && entry.start >= 2 * 1024 * 1024))
    assert.ok(result.events.some((message) => message.includes('续传')))
  })

  it('备用 CDN 的 ETag 不同则从头下载，不混合旧数据', async () => {
    const result = await download('different.bin', [`${origin}/stream?route=/partial`, `${origin}/stream?route=/different`])
    assert.ok(requests.some((entry) => entry.route === '/different' && entry.start === 0 && entry.end > 32767))
    assert.ok(result.events.some((message) => message.includes('重新下载')))
  })

  it('即使 ETag 相同，文件路径不同也从头下载', async () => {
    const result = await download('path-changed.bin', [`${origin}/partial`, `${origin}/fast`])
    assert.ok(requests.some((entry) => entry.route === '/fast' && entry.start === 0 && entry.end > 32767))
    assert.ok(result.events.some((message) => message.includes('重新下载')))
  })

  it('单连接回退也失败后，不能把未经校验的半成品当成已完成分段', async () => {
    const filepath = path.join(temporary, 'native-partial.bin')
    const result = await download(
      'native-partial.bin',
      [`${origin}/stream?route=/partial`, `${origin}/stream?route=/no-range-partial`, `${origin}/stream?route=/fast`],
      {
        fallback: async () => {
          await writeFile(filepath, payload.subarray(0, 4096))
          throw new Error('Native download interrupted')
        }
      }
    )
    assert.ok(requests.some((entry) => entry.route === '/fast' && entry.start === 0 && entry.end > 32767))
    assert.ok(result.events.some((message) => message.includes('自动换线')))
  })

  it('服务器不支持 Range 时使用原下载器', async () => {
    assert.equal((await download('no-range.bin', [`${origin}/no-range`])).fallbackCalls, 1)
  })

  it('探测 Range 被拒绝但普通 GET 可用时，仍能使用原下载器', async () => {
    assert.equal((await download('range-rejected.bin', [`${origin}/range-rejected`])).fallbackCalls, 1)
  })

  it('开启限速时继续使用原下载器，不进行分段加速', async () => {
    assert.equal((await download('limited.bin', [`${origin}/fast`], { limited: true })).fallbackCalls, 1)
    assert.ok(requests.every((entry) => !entry.range))
  })

  it('错误 Content-Range 不写入文件，并切换备用 CDN', async () => {
    await download('invalid.bin', [`${origin}/invalid-range`, `${origin}/fast`])
    assert.ok(requests.some((entry) => entry.route === '/fast'))
  })

  it('HTTP 403 和 429 快速换线，不重复请求同一失败线路', async () => {
    await download('status.bin', [`${origin}/forbidden`, `${origin}/rate-limit`, `${origin}/fast`])
    assert.equal(requests.filter((entry) => entry.route === '/forbidden').length, 1)
    assert.equal(requests.filter((entry) => entry.route === '/rate-limit').length, 1)
  })

  it('所有 CDN 都失败时抛出错误且诊断不泄漏完整签名', async () => {
    await assert.rejects(
      download('failed.bin', [`${origin}/forbidden?secret=hidden`, `${origin}/rate-limit?secret=hidden`]),
      (error) => error instanceof Error && !error.message.includes('secret=hidden') && error.message.includes('CDN')
    )
  })

  it('多任务连接数不超过全局四条', async () => {
    await Promise.all([
      download('job-a.bin', [`${origin}/fast`]),
      download('job-b.bin', [`${origin}/fast`]),
      download('job-c.bin', [`${origin}/fast`])
    ])
    assert.ok(maxActive <= 4)
  })

  it('单连接回退的多任务同样遵守全局四条连接上限', async () => {
    await Promise.all(Array.from({ length: 5 }, (_, index) => download(`limited-${index}.bin`, [`${origin}/fast`], { limited: true })))
    assert.ok(maxActive <= 4)
  })

  it('响应开始后停止传输十秒，会取消请求并改用备用 CDN', async () => {
    const started = performance.now()
    const result = await download('stall.bin', [`${origin}/stall`, `${origin}/fast`])
    assert.ok(result.events.some((message) => message.includes('自动换线')))
    assert.ok(performance.now() - started >= 9900 && performance.now() - started < 13000)
  })
})

describe('Network 下载入口接入', () => {
  let downloadStream: (
    bindings: Record<string, unknown>
  ) => (
    this: ReturnType<typeof networkOptions>,
    progress: (bytes: number, total: number) => void,
    retryCount?: number
  ) => Promise<{ filepath: string; totalBytes: number }>
  before(async () => {
    const target = path.join(root, 'src/module/utils/Network/Network.ts')
    const raw = await readFile(target, 'utf8')
    const start = raw.indexOf('async downloadStream(')
    const end = raw.indexOf('async getfetch(', start)
    assert.ok(start > 0 && end > start)
    const method = `({ ${raw.slice(start, end)} })`
    downloadStream = (bindings) =>
      vm.runInNewContext(stripTypeScriptTypes(method), {
        getBilibiliDownloadCandidates: api.getBilibiliDownloadCandidates,
        downloadBilibiliCdn: transfer.downloadBilibiliCdn,
        logger: { debug() {} },
        logger$1: { debug() {} },
        ...bindings
      }).downloadStream
  })

  const networkOptions = (filename: string) => ({
    url: `${origin}/fast`,
    filepath: path.join(temporary, filename),
    headers: { Referer: 'https://www.bilibili.com' },
    axiosInstance: {},
    timeout: 15000,
    maxRetries: 3
  })

  it('未登记的其他平台链接继续调用原下载器', async () => {
    const options = networkOptions('other.bin')
    const expected = { filepath: options.filepath, totalBytes: 10 }
    let calls = 0
    const entry = downloadStream({
      Downloader: class {
        constructor(...args: unknown[]) {
          calls++
          assert.equal(args[1], options.url)
          assert.equal(args[5], options.maxRetries)
        }
        async download() {
          return expected
        }
      }
    })
    assert.equal(await entry.call(options, () => {}), expected)
    assert.equal(calls, 1)
    assert.equal(requests.length, 0)
  })

  it('已登记的 B站链接通过真实下载入口完成分段下载', async () => {
    const options = networkOptions('network.bin')
    await api.selectBilibiliStreamUrl({ base_url: options.url }, options.headers)
    const entry = downloadStream({
      Downloader: class {
        constructor() {
          throw new Error('Unexpected native fallback')
        }
      }
    })
    const result = await entry.call(options, () => {})
    const content = await readFile(result.filepath)
    assert.equal(createHash('sha256').update(content).digest('hex'), expectedHash)
  })

  it('原下载器回退保留请求头、限速和进度回调，多个候选不反复重试坏线路', async () => {
    const options = { ...networkOptions('native.bin'), throttleConfig: { enabled: true, bytesPerSecond: 1024 } }
    await api.selectBilibiliStreamUrl({ base_url: options.url, backup_url: [`${origin}/slow`] }, options.headers)
    const progress = () => {}
    let calls = 0
    const entry = downloadStream({
      Downloader: class {
        constructor(...args: unknown[]) {
          calls++
          assert.equal(args[3], options.headers)
          assert.equal(args[5], 0)
          assert.equal(args[6], options.throttleConfig)
        }
        async download(callback: unknown) {
          assert.equal(callback, progress)
          return { filepath: options.filepath, totalBytes: payload.length }
        }
      }
    })
    assert.equal((await entry.call(options, progress)).totalBytes, payload.length)
    assert.equal(calls, 1)
  })
})
