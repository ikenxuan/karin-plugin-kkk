import { deflateSync } from 'node:zlib'

import { drawDither } from '@outpacelabs/avatars'

import { logger } from '@/module/utils/logger'
/**
 * 头像解析：优先用平台给的真实头像，拿不到就**实时生成**一个 dither 头像。
 *
 * 为什么需要它：部分适配器（比如 QQBot）有概率拿不到群头像，
 * 榜单里就会空出一排位置，看起来像数据缺了。生成头像保证**每一行都一定有个头像**，
 * 而且种子取自群号/用户ID，同一个人每次渲染出的图案是稳定的，不会刷一次变一个样。
 *
 * ## 为什么不用库自带的 `<GradientAvatar>` 组件
 *
 * 那是个 `<canvas>` + effect 绘制的 React 组件，库自己也标了 "Browser only"。
 * 而海报产物是**纯静态 HTML、不含任何 `<script>`**（ktr 模板链路的硬约束），
 * 浏览器加载后没有任何 JS 去执行那个 effect，canvas 里会是一片空白。
 *
 * 所以这里走库的底层 API `drawDither`：它只用到 `fillStyle` 和 `fillRect`
 * （纯格子填充，没有渐变也没有合成），而库把绘制接口抽象成了 `GradientContext`
 * —— 注释里写明「HTMLCanvasElement 和 OffscreenCanvas 的 2D context 都满足它」，
 * 也就是说这是个公开的扩展点。用一个只记录矩形的小对象驱动它即可，
 * 不必为了画个头像往 Node 里塞一整个 Canvas 实现。
 */

/**
 * 生成头像时喂给库的尺寸。
 *
 * **这个值直接决定图案的精细度**，不是"画多大"：库内部按 `clamp(floor(size/3), 8, 64)` 算格数，
 * 按 `log2(size/16)/log2(160/16)` 算用几种颜色 —— 传 40 只会得到 13×13 格、**3 种颜色**，
 * 看起来就是一块粗糙的马赛克；160 才是它调色板拉满（4 色、53 格）的档位。
 * 海报上头像是缩放着显示的，所以这里按满细节渲染，由显示端缩到 40~48px。
 */
const RENDER_SIZE = 160
/** 拉取真实头像的超时 */
const FETCH_TIMEOUT_MS = 4000
/** 解析结果缓存条数上限，防止长时间运行把内存吃满 */
const CACHE_LIMIT = 200

/** 已解析过的头像（URL → data URI），避免反复打同一个 CDN */
const cache = new Map<string, string>()

/** 记录下来的一个填充矩形 */
interface RecordedRect {
  x: number
  y: number
  w: number
  h: number
  /** `#RRGGBB` 或 `#RRGGBBAA` */
  color: string
}

/**
 * 跑一遍库的 dither 绘制，把方块录下来。
 *
 * 传进去的 context 只需满足 `GradientContext`：dither 路径只用 `fillStyle` + `fillRect`，
 * `createRadialGradient` 是 mesh 路径才需要的，这里直接抛错 —— 真被调到说明库的用法变了。
 */
const recordDither = (seed: string, size: number): RecordedRect[] => {
  const rects: RecordedRect[] = []
  const context = {
    fillStyle: '#000000',
    fillRect(x: number, y: number, w: number, h: number) {
      rects.push({ x, y, w, h, color: context.fillStyle })
    },
    createRadialGradient(): never {
      throw new Error('dither 路径不应调用 createRadialGradient')
    }
  }
  drawDither(context as unknown as Parameters<typeof drawDither>[0], seed, size)
  return rects
}

/** 把录到的方块画进一张 RGBA 位图，并裁成圆形 */
const rasterize = (rects: RecordedRect[], size: number): Buffer => {
  // 起点全透明，圆形之外的部分自然留空
  const rgba = Buffer.alloc(size * size * 4)
  for (const rect of rects) {
    const raw = rect.color.replace('#', '')
    const r = parseInt(raw.slice(0, 2), 16)
    const g = parseInt(raw.slice(2, 4), 16)
    const b = parseInt(raw.slice(4, 6), 16)
    const a = raw.length >= 8 ? parseInt(raw.slice(6, 8), 16) : 255
    for (let y = rect.y; y < rect.y + rect.h && y < size; y++) {
      for (let x = rect.x; x < rect.x + rect.w && x < size; x++) {
        const offset = (y * size + x) * 4
        rgba[offset] = r
        rgba[offset + 1] = g
        rgba[offset + 2] = b
        rgba[offset + 3] = a
      }
    }
  }

  // 圆形裁切。边缘不做抗锯齿 —— 海报里头像是缩小显示的，降采样本身就会把边缘磨平
  const half = size / 2
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - half
      const dy = y + 0.5 - half
      if (dx * dx + dy * dy > half * half) rgba[(y * size + x) * 4 + 3] = 0
    }
  }
  return rgba
}

/** PNG 的 CRC32 查表 */
const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

/** 算一段字节的 CRC32 */
const crc32 = (buffer: Buffer): number => {
  let c = 0xffffffff
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

/** 拼一个 PNG 数据块：长度 + 类型 + 内容 + CRC */
const pngChunk = (type: string, data: Buffer): Buffer => {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const typeBuffer = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])))
  return Buffer.concat([length, typeBuffer, data, crc])
}

/**
 * 把 RGBA 位图编码成 PNG。
 *
 * 手写而不引依赖：这里只需要最朴素的 8 位真彩 + 无滤波，格式本身很短，
 * 压缩交给 Node 自带的 zlib。**是无损的** —— 不存在因为"图太大"而掉画质的问题。
 */
const encodePng = (rgba: Buffer, size: number): Buffer => {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8 // 位深
  header[9] = 6 // 颜色类型：真彩 + alpha
  // 剩下三个字节保持 0：deflate 压缩、自适应滤波、非隔行

  // 每一行前面要加一个滤波类型字节（0 = 不滤波）
  const stride = size * 4
  const raw = Buffer.alloc((stride + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0))
  ])
}

/**
 * 生成一个确定性头像（dither 类型）
 * @param seed 种子，传群号或用户ID，保证同一实体每次得到的图案一致
 */
export const buildDitherAvatar = (seed: string): string =>
  `data:image/png;base64,${encodePng(rasterize(recordDither(seed, RENDER_SIZE), RENDER_SIZE), RENDER_SIZE).toString('base64')}`

/**
 * 把真实头像包成一张圆形裁切的 SVG。
 *
 * 圆角只能在包装层做：ECharts 富文本的 `backgroundColor.image` 不支持 `borderRadius`
 * （实测不会生成 clipPath），不包的话头像在图里是方的。
 * 这里**不重新编码图片**，只是套一层带 clipPath 的 SVG 外壳。
 */
const buildRemoteAvatar = (bytes: Buffer, mime: string, size: number): string => {
  const half = size / 2
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<defs><clipPath id="c"><circle cx="${half}" cy="${half}" r="${half}"/></clipPath></defs>` +
    `<g clip-path="url(#c)"><image href="data:${mime};base64,${bytes.toString('base64')}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice"/></g>` +
    `</svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * 解析一个头像：有 URL 就拉下来，任何一步失败都回落到生成头像。
 *
 * **绝不抛错** —— 统计海报是锦上添花的功能，不能因为某个 CDN 抽风就整张渲染不出来。
 * @param seed 种子（群号 / 用户ID），决定生成头像的图案
 * @param url 平台给的头像地址；拿不到时传 undefined
 * @param size 圆形包装的边长（px），只影响真实头像那条路径
 */
export const resolveAvatar = async (seed: string, url?: string, size = 48): Promise<string> => {
  if (url) {
    const cached = cache.get(url)
    if (cached) return cached

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
      if (response.ok) {
        const bytes = Buffer.from(await response.arrayBuffer())
        if (bytes.byteLength > 0) {
          // 原样内联，不重新编码也不缩放 —— 尺寸由 `getAvatarUrl(id, size)` 那头定好了
          const dataUri = buildRemoteAvatar(bytes, response.headers.get('content-type')?.split(';')[0] || 'image/png', size)
          if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value!)
          cache.set(url, dataUri)
          return dataUri
        }
      }
    } catch (error) {
      logger.debug('[统计] 获取头像失败，改用生成头像:', error)
    }
  }

  return buildDitherAvatar(seed)
}
