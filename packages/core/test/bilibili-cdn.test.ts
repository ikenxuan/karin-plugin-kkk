import assert from 'node:assert/strict'
import http from 'node:http'
import type { AddressInfo } from 'node:net'

import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'

import * as api from '../src/platform/bilibili/cdn'

const official = 'https://upos-sz-mirrorcos.bilivideo.com/video.m4s?deadline=123&sign=a%2Fb'
const edge = 'https://b-test.edge.mountaintoys.cn:4483/video.m4s?deadline=123&sign=a%2Fb'
const smt = 'https://video.h2.smtcdns.net:4483/video.m4s'

describe('PCDN 备用线路回归', () => {
  it('edge.mountaintoys.cn 的主链接改选原始签名 CDN 备用链接', () => {
    assert.equal(api.getBilibiliStreamUrl({ base_url: edge, backup_url: [official] }), official)
  })

  it('h2.smtcdns.net 的主链接改选普通 CDN', () => {
    assert.equal(api.getBilibiliStreamUrl({ base_url: smt, backup_url: [official] }), official)
  })

  it('原有 mcdn 识别行为保持兼容', () => {
    assert.equal(api.getBilibiliStreamUrl({ base_url: 'https://video.mcdn.bilivideo.com/video', backup_url: [official] }), official)
  })

  it('兼容更多已知 PCDN 域名，仍保留服务器原始备用地址', () => {
    for (const host of ['video.qrstuvwxyzab.com', 'video.zhenidc.cn', 'video.mountaintoys.cn']) {
      assert.equal(api.getBilibiliStreamUrl({ base_url: `https://${host}/video`, backup_url: [official] }), official)
    }
  })

  it('不将相似但不同的域名误判为 PCDN', () => {
    const normal = 'https://edge.mountaintoys.cn.example.com/video'
    assert.equal(api.getBilibiliStreamUrl({ base_url: normal, backup_url: [official] }), normal)
  })

  it('兼容 camelCase 字段', () => {
    assert.equal(api.getBilibiliStreamUrl({ baseUrl: edge, backupUrl: [official] }), official)
  })

  it('兼容未登录 durl 字段', () => {
    assert.equal(api.getBilibiliStreamUrl({ url: edge, backup_url: [official] }), official)
  })

  it('空音频不创建请求', () => {
    assert.equal(api.getBilibiliStreamUrl(undefined), undefined)
  })

  it('候选去重并保留签名、端口和查询字符串', () => {
    assert.deepEqual(api.getBilibiliStreamUrls({ base_url: edge, backup_url: [official, official, smt] }), [official, edge, smt])
  })

  it('忽略空地址与非 HTTP 链接', () => {
    assert.deepEqual(api.getBilibiliStreamUrls({ base_url: 'not-a-url', backup_url: ['', 'file:///etc/hosts', official] }), [official])
  })

  it('只有 PCDN 时保留原始链接供后续常规下载处理', () => {
    assert.equal(api.getBilibiliStreamUrl({ base_url: edge }), edge)
  })
})

describe('真实 HTTP 短请求选线', () => {
  let server: http.Server
  let origin: string
  const requests: Array<{ url?: string; range?: string; referer?: string }> = []
  const timers = new Set<ReturnType<typeof setTimeout>>()

  beforeAll(async () => {
    server = http.createServer((request, response) => {
      requests.push({ url: request.url, range: request.headers.range, referer: request.headers.referer })
      const payload = Buffer.alloc(32 * 1024, 1)
      const send = (status: number, headers: http.OutgoingHttpHeaders = {}) => {
        if (response.destroyed) return
        response.writeHead(status, headers)
        response.end(payload)
      }
      if (request.url === '/forbidden') return response.writeHead(403).end()
      if (request.url === '/empty') return response.writeHead(200).end()
      if (request.url === '/html') return response.writeHead(200, { 'Content-Type': 'text/html' }).end('<html>error</html>')
      if (request.url === '/bad-range') {
        return send(206, { 'Content-Range': 'bytes 100-32867/100000', 'Content-Type': 'video/mp4' })
      }
      if (request.url === '/timeout') return
      if (request.url === '/slow') {
        const timer = setTimeout(() => {
          timers.delete(timer)
          send(206, { 'Content-Range': 'bytes 0-32767/100000', 'Content-Type': 'video/mp4' })
        }, 120)
        timers.add(timer)
        return
      }
      if (request.url === '/ignore-range') {
        response.writeHead(200, { 'Content-Type': 'video/mp4' })
        response.write(Buffer.alloc(64 * 1024, 2))
        return
      }
      return send(206, { 'Content-Range': 'bytes 0-32767/100000', 'Content-Type': 'video/mp4' })
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
  })

  beforeEach(() => {
    api.resetBilibiliCdnState()
    requests.length = 0
  })

  afterAll(async () => {
    for (const timer of timers) clearTimeout(timer)
    server.closeAllConnections()
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  })

  it('较快的健康备用链接优先于较慢主链接', async () => {
    assert.equal(await api.selectBilibiliStreamUrl({ base_url: `${origin}/slow`, backup_url: [`${origin}/fast`] }), `${origin}/fast`)
  })

  it('主链接拒绝访问时自动选择备用链接', async () => {
    assert.equal(await api.selectBilibiliStreamUrl({ base_url: `${origin}/forbidden`, backup_url: [`${origin}/fast`] }), `${origin}/fast`)
  })

  it('PCDN 有正常备用时不参与探测', async () => {
    assert.equal(await api.selectBilibiliStreamUrl({ base_url: edge, backup_url: [`${origin}/fast`] }), `${origin}/fast`)
  })

  it('使用有限 Range 并带 B站 Referer', async () => {
    await api.selectBilibiliStreamUrl({ base_url: `${origin}/fast` }, { Referer: 'https://www.bilibili.com' })
    const last = requests.at(-1)
    assert.ok(last)
    assert.equal(last.range, 'bytes=0-32767')
    assert.equal(last.referer, 'https://www.bilibili.com')
  })

  it('服务器忽略 Range 时达到样本上限便停止接收', async () => {
    assert.equal(await api.selectBilibiliStreamUrl({ base_url: `${origin}/ignore-range` }), `${origin}/ignore-range`)
  })

  it('空响应、HTML 错误页面与错误 Content-Range 不参与成功排序', async () => {
    for (const route of ['/empty', '/html', '/bad-range']) {
      api.resetBilibiliCdnState()
      assert.equal(await api.selectBilibiliStreamUrl({ base_url: `${origin}${route}`, backup_url: [`${origin}/fast`] }), `${origin}/fast`)
    }
  })

  it('探测超时在限定时间内退出并选择正常备用', async () => {
    const started = performance.now()
    assert.equal(await api.selectBilibiliStreamUrl({ base_url: `${origin}/timeout`, backup_url: [`${origin}/fast`] }), `${origin}/fast`)
    assert.ok(requests.some((request) => request.url === '/timeout'))
    assert.ok(performance.now() - started < 4500)
  })

  it('最多探测三个候选', async () => {
    const started = requests.length
    await api.selectBilibiliStreamUrl({
      base_url: `${origin}/first`,
      backup_url: [`${origin}/second`, `${origin}/third`, `${origin}/fourth`]
    })
    assert.equal(requests.length - started, 3)
  })

  it('所有探测失败时保留排序首选，允许常规下载继续尝试', async () => {
    assert.equal(
      await api.selectBilibiliStreamUrl({ base_url: `${origin}/forbidden`, backup_url: [`${origin}/empty`] }),
      `${origin}/forbidden`
    )
  })

  it('视频和音频分别依据自己的备用列表选线', async () => {
    const [video, audio] = await Promise.all([
      api.selectBilibiliStreamUrl({ base_url: edge, backup_url: [`${origin}/video`] }),
      api.selectBilibiliStreamUrl({ base_url: smt, backup_url: [`${origin}/audio`] })
    ])
    assert.equal(video, `${origin}/video`)
    assert.equal(audio, `${origin}/audio`)
  })
})
