import assert from 'node:assert/strict'
import nodeFs from 'node:fs'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import fs from 'node:fs/promises'
import http from 'node:http'
import { syncBuiltinESMExports } from 'node:module'
import type { AddressInfo } from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { Writable } from 'node:stream'

import { afterAll, afterEach, beforeAll, beforeEach, describe, it, vi } from 'vitest'

import { Network } from '../src/module/utils/Network/Network'
import * as api from '../src/platform/bilibili/cdn'
import * as transfer from '../src/platform/bilibili/cdn-transfer'

vi.mock('../src/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn() } }))
vi.mock('../src/module/utils/Network/constants', async (importOriginal) => {
  const { default: client } = await import('node-karin/axios')
  const request = vi.spyOn(client, 'get').mockResolvedValue({ data: {} })
  try {
    return await importOriginal()
  } finally {
    request.mockRestore()
  }
})

type DownloadOptions = Parameters<typeof transfer.downloadBilibiliCdn>[0]
let server: http.Server
let origin: string
let temporary: string
let active = 0
let maxActive = 0
const requests: Array<{ route: string; start: number; end: number; range?: string; referer?: string }> = []
const payload = Buffer.alloc(5 * 1024 * 1024 + 37)
for (let index = 0; index < payload.length; index++) payload[index] = index % 251
const timers = new Set<ReturnType<typeof setTimeout>>()

beforeAll(async () => {
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
    requests.push({ route, start, end, range: request.headers.range, referer: request.headers.referer })
    if (range && start >= 1024 * 1024 && route === '/single-reset') return response.destroy()
    if (range && start >= 1024 * 1024 && route === '/single-ignore-range') {
      response.writeHead(200, { 'Content-Type': 'video/mp4', 'Content-Length': payload.length })
      return response.end(payload)
    }
    if (route === '/forbidden') return response.writeHead(403).end()
    if (route === '/rate-limit') return response.writeHead(Number(parsed.searchParams.get('status') ?? 429)).end()
    if (route === '/unavailable' && !range) return response.writeHead(503).end()
    if (route === '/blocked-range' && end > 32767) return response.writeHead(Number(parsed.searchParams.get('status'))).end()
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
    if ((route === '/cancel-first' || route === '/cancel-second') && end > 32767) {
      const failedStart = route === '/cancel-first' ? 0 : 1024 * 1024
      if (start === failedStart) {
        response.writeHead(route === '/cancel-first' ? 429 : 412)
        return response.end()
      }
      response.writeHead(206, {
        'Content-Type': 'video/mp4',
        'Content-Range': `bytes ${start}-${end}/${payload.length}`,
        ETag: '"fixture"',
        'Content-Length': end - start + 1
      })
      response.write(payload.subarray(start, start + 1))
      const trickle = setInterval(() => response.write(Buffer.alloc(1)), 50)
      const deadline = setTimeout(() => response.destroy(), 1500)
      timers.add(trickle)
      timers.add(deadline)
      response.once('close', () => {
        clearInterval(trickle)
        clearTimeout(deadline)
        timers.delete(trickle)
        timers.delete(deadline)
      })
      return
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
  api.bilibiliCdn.reset()
  requests.length = 0
  maxActive = 0
})

afterEach(() => {
  vi.restoreAllMocks()
  syncBuiltinESMExports()
})

afterAll(async () => {
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
  })

  it.each([412, 429])('HTTP %s 线路在两分钟冷却结束前排在备用线路之后', async (status) => {
    let now = Date.now()
    const selector = new api.BilibiliCdnSelector({ now: () => now })
    const candidates = [`${origin}/rate-limit?status=${status}`, `${origin}/fast`]
    assert.equal(await selector.select({ base_url: candidates[0], backup_url: [candidates[1]] }), candidates[1])
    now += 119999
    assert.deepEqual(selector.rank(candidates), [candidates[1], candidates[0]])
    now++
    assert.deepEqual(selector.rank(candidates), candidates)
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
    assert.deepEqual(api.bilibiliCdn.downloadCandidates(`${origin}/unregistered`), [])
    assert.equal(api.bilibiliCdn.downloadCandidates(`${origin}/fast`).length, 2)
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
    const result = await transfer.downloadBilibiliCdn({
      url: candidates[0],
      candidates,
      filepath,
      headers: { Referer: 'https://www.bilibili.com' },
      progress: (bytes, total) => progress.push({ bytes, total }),
      report: () => {},
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
    assert.deepEqual(await readFile(filepath), payload)
    assert.equal(result.totalBytes, payload.length)
    return { fallbackCalls, progress }
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
      vi.spyOn(fs, 'open').mockImplementation(async () => {
        throw failure
      })
      syncBuiltinESMExports()
      await assert.rejects(
        download(`${code}.bin`, [`${origin}/fast`], {
          fallback: async () => {
            throw new Error('磁盘错误不应触发单连接下载')
          }
        }),
        (error) => error === failure
      )
    })
  }

  it('大文件使用两条连接分段并按序写入，最终内容一致', async () => {
    const result = await download('parallel.bin', [`${origin}/fast`])
    assert.equal(result.fallbackCalls, 0)
    assert.equal(maxActive, 2)
    assert.equal(result.progress.at(-1)?.bytes, payload.length)
  })

  for (const route of ['/cancel-first', '/cancel-second']) {
    it(`任一分段触发风控时立即取消另一段并换线：${route}`, async () => {
      const started = performance.now()
      const candidates = [`${origin}/stream?route=${route}`, `${origin}/stream?route=/fast`]
      await download(`${route.slice(1)}.bin`, candidates)
      assert.ok(performance.now() - started < 800)
      assert.ok(requests.some((entry) => entry.route === '/fast' && entry.start === 0 && entry.end > 32767))
      assert.deepEqual(api.bilibiliCdn.rank(candidates), [candidates[1], candidates[0]])
    })
  }

  it('中途断流换 CDN，相同强 ETag 可从连续完成位置续传', async () => {
    await download('resume.bin', [`${origin}/stream?route=/partial`, `${origin}/stream?route=/fast`])
    const backupSegments = requests.filter((entry) => entry.route === '/fast' && entry.end > 32767)
    assert.equal(Math.min(...backupSegments.map((entry) => entry.start)), 2 * 1024 * 1024)
  })

  it.each([
    ['/stream?route=/partial', '/stream?route=/different', '/different'],
    ['/partial', '/fast', '/fast']
  ])('ETag 或文件路径不同必须重新下载：%s → %s', async (primary, backup, route) => {
    await download('changed.bin', [`${origin}${primary}`, `${origin}${backup}`])
    assert.ok(requests.some((entry) => entry.route === route && entry.start === 0 && entry.end > 32767))
  })

  it('单连接回退也失败后，不能把未经校验的半成品当成已完成分段', async () => {
    const filepath = path.join(temporary, 'native-partial.bin')
    await download(
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
  })

  it.each(['/no-range', '/range-rejected'])('不支持 Range 时使用原下载器：%s', async (route) => {
    assert.equal((await download(`${route.slice(1)}.bin`, [`${origin}${route}`])).fallbackCalls, 1)
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

  it.each([403, 429, 412])('分段返回 HTTP %s 后不降级重试同一线路', async (status) => {
    await assert.rejects(download(`blocked-${status}.bin`, [`${origin}/blocked-range?status=${status}`]), /全部 1 条 CDN 线路下载失败/)
    assert.ok(requests.some((entry) => entry.range && entry.end > 32767))
    assert.ok(requests.every((entry) => entry.range))
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

  it('响应开始后停止传输十秒，会取消请求并改用备用 CDN', { timeout: 20000 }, async () => {
    const started = performance.now()
    await download('stall.bin', [`${origin}/stall`, `${origin}/fast`])
    assert.ok(requests.some((entry) => entry.route === '/fast'))
    assert.ok(performance.now() - started >= 9900 && performance.now() - started < 13000)
  })
})

describe('Network 下载入口接入', () => {
  const networkOptions = (filename: string) => ({
    url: `${origin}/fast`,
    filepath: path.join(temporary, filename),
    headers: { Referer: 'https://www.bilibili.com' },
    timeout: 15000,
    maxRetries: 3
  })

  it.each([false, true])('不限速时仅已登记的地址使用分段下载：登记=%s', async (registered) => {
    const options = networkOptions(`network-${registered}.bin`)
    if (registered) await api.selectBilibiliStreamUrl({ base_url: options.url }, options.headers)
    requests.length = 0
    const progress = vi.fn()
    const result = await new Network(options).downloadStream(progress)
    assert.deepEqual(await readFile(result.filepath), payload)
    assert.equal(result.totalBytes, payload.length)
    if (registered) assert.equal(progress.mock.lastCall?.[0], payload.length)
    assert.equal(
      requests.some((request) => Boolean(request.range)),
      registered
    )
    assert.ok(requests.every((request) => request.referer === options.headers.Referer))
  })

  it('限速下载换线时不重试坏线路，并报告备用线路的下载进度', async () => {
    const options = { ...networkOptions('limited-fallback.bin'), url: `${origin}/unavailable`, maxRetries: 1 }
    await api.selectBilibiliStreamUrl({ base_url: options.url, backup_url: [`${origin}/fast`] }, options.headers)
    requests.length = 0
    const progress = vi.fn<DownloadOptions['progress']>()
    const result = await new Network({ ...options, throttle: { enabled: true, maxSpeed: 2 * 1024 * 1024 } }).downloadStream(progress)
    assert.deepEqual(
      requests.map((request) => request.route),
      ['/unavailable', '/fast']
    )
    assert.ok(requests.every((request) => !request.range && request.referer === options.headers.Referer))
    assert.ok(progress.mock.calls.some(([bytes, total]) => bytes > 0 && bytes < total && total === payload.length))
    assert.deepEqual(await readFile(result.filepath), payload)
    assert.equal(result.totalBytes, payload.length)
  })

  it.each(['ENOSPC', 'EACCES'])('单连接写入失败保留 %s，不重试也不换线', async (code) => {
    const options = networkOptions(`native-${code}.bin`)
    await api.selectBilibiliStreamUrl({ base_url: options.url, backup_url: [`${origin}/different`] }, options.headers)
    requests.length = 0
    const diskError = Object.assign(new Error(code), { code })
    vi.spyOn(nodeFs, 'createWriteStream').mockImplementation(
      () =>
        new Writable({
          write(_chunk, _encoding, callback) {
            callback(diskError)
          }
        }) as nodeFs.WriteStream
    )
    await assert.rejects(
      new Network({ ...options, throttle: { enabled: true } }).downloadStream(() => {}),
      (error) => error === diskError
    )
    assert.equal(requests.length, 1)
    assert.equal(requests[0].route, '/fast')
  })
})
