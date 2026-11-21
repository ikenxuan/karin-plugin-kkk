import { tools } from '@ikenxuan/amagi'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const runtime = vi.hoisted(() => ({ responseUrl: '' }))

vi.mock('@ikenxuan/amagi', async (importOriginal) => {
  const original = await importOriginal<typeof import('@ikenxuan/amagi')>()
  return { tools: original.tools }
})
vi.mock('@/module/utils/amagiClient', () => ({
  getAmagiClient: () => {
    throw new Error('AV/BV 转换不应读取客户端')
  }
}))
vi.mock('@/module/utils/logger', () => ({ logger: { debug: vi.fn(), warn: vi.fn() } }))
vi.mock('node-karin/axios', () => ({
  default: { get: vi.fn(async () => ({ request: { res: { responseUrl: runtime.responseUrl } } })) }
}))

import { getBilibiliID } from '@/platform/bilibili/getID'

describe('B站链接 ID 与 v7 纯数据工具', () => {
  beforeEach(() => {
    runtime.responseUrl = ''
  })

  it.each([
    ['av170001', 'BV17x411w7KC'],
    ['AV170001', 'BV17x411w7KC'],
    ['av455017605', 'BV1Q541167Qg']
  ])('AV 链接 %s 转换成 %s 并保留分 P', async (avid, bvid) => {
    runtime.responseUrl = `https://www.bilibili.com/video/${avid}?p=2`
    expect(await getBilibiliID('https://b23.tv/example')).toEqual({ type: 'one_video', bvid, p: 2 })
  })

  it('BV 链接保留原 ID，忽略无效分 P', async () => {
    runtime.responseUrl = 'https://www.bilibili.com/video/BV17x411w7KC?p=invalid'
    expect(await getBilibiliID(runtime.responseUrl)).toEqual({ type: 'one_video', bvid: 'BV17x411w7KC' })
  })

  it('tools 的实际实现返回 BV 字符串和 AV 数字', () => {
    expect(tools.bilibili.avToBv(170001)).toBe('BV17x411w7KC')
    expect(tools.bilibili.bvToAv('BV17x411w7KC')).toBe(170001)
  })
})
