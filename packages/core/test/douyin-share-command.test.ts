import { describe, expect, it, vi } from 'vitest'

// 只测提取函数：隔离 shareCommand 顶层会触发的运行期依赖，避免拉起 Karin 与真实配置。
vi.mock('node-karin/axios', () => ({ default: {} }))
vi.mock('@/module/utils/amagiClient', () => ({ getAmagiClient: vi.fn() }))
vi.mock('@/module/utils/Config', () => ({ Config: {} }))

import { extractDouyinShareCommand } from '@/platform/douyin/shareCommand'

/** 报告原文：前缀是 U+01DA 的 ǚǚ，主体 13 位，末尾 ŠŠ。 */
const reportedShareText = '"48 10/24 :0pm y@g.ba 【阿蕾奇诺玩:/ 家我加您】长按复制打开抖音，即可阅读文章 ǚǚt7Ped3cw76ub9ŠŠ"'

describe('extractDouyinShareCommand 旧装饰口令入口', () => {
  it('保留单层装饰口令，无需分享文案', () => {
    expect(extractDouyinShareCommand('ˇt7Ped3cw76ub9Š')).toBe('ˇt7Ped3cw76ub9Š')
  })

  it('保留双层装饰口令', () => {
    expect(extractDouyinShareCommand('ˇˇt7Ped3cw76ub9ŠŠ')).toBe('ˇt7Ped3cw76ub9Š')
  })

  it('无分享文案的未知装饰符不猜口令', () => {
    expect(extractDouyinShareCommand('ǚǚt7Ped3cw76ub9ŠŠ')).toBeUndefined()
  })

  it('无分享文案的残缺装饰口令不猜口令', () => {
    expect(extractDouyinShareCommand('ˇt7Ped3cw76ub9')).toBeUndefined()
  })
})

describe('extractDouyinShareCommand 分享文案候选', () => {
  it('识别报告中 U+01DA 外壳的原文', () => {
    expect(extractDouyinShareCommand(reportedShareText)).toBe('ˇt7Ped3cw76ub9Š')
  })

  it('识别 ※ 外壳的原文', () => {
    expect(
      extractDouyinShareCommand('5.-:/ 12/26 R@k.PK :5pm 【关乎人类未来命运的竞争】长按复制打开抖音，即可阅读文章 ※※QsmwrwFBynhtb9※※')
    ).toBe('ˇQsmwrwFBynhtb9Š')
  })

  it('不依赖外侧装饰符', () => {
    expect(extractDouyinShareCommand('长按复制打开抖音，看看【作者】的作品 Ab3dEf6hIj9Kl')).toBe('ˇAb3dEf6hIj9KlŠ')
  })

  it('接受非 ASCII 装饰外壳', () => {
    expect(extractDouyinShareCommand('复制打开抖音，ȘȘAb3dEf6hIj9KlȘȘ')).toBe('ˇAb3dEf6hIj9KlŠ')
  })

  it('作者名在【】内时不形成第二候选', () => {
    expect(extractDouyinShareCommand('复制打开抖音，看看【TaylorSwift的作品】ǚǚt7Ped3cw76ub9ŠŠ')).toBe('ˇt7Ped3cw76ub9Š')
    expect(extractDouyinShareCommand('复制打开抖音，看看【TaylorSwift的作品】t7Ped3cw76ub9')).toBe('ˇt7Ped3cw76ub9Š')
  })

  it('分享提示连写进普通句子时不触发', () => {
    expect(extractDouyinShareCommand('为什么复制打开抖音没反应，我的是 iPhone15ProMax')).toBeUndefined()
  })

  it('下划线外壳不参与候选', () => {
    expect(extractDouyinShareCommand('复制打开抖音，_t7Ped3cw76ub9_')).toBe('ˇt7Ped3cw76ub9Š')
  })

  it('同一口令重复出现仍可识别', () => {
    expect(extractDouyinShareCommand('复制打开抖音，t7Ped3cw76ub9 再次 t7Ped3cw76ub9')).toBe('ˇt7Ped3cw76ub9Š')
  })

  it('允许复制与打开抖音之间的空白和中英文逗号', () => {
    expect(extractDouyinShareCommand('复制 打开抖音 t7Ped3cw76ub9')).toBe('ˇt7Ped3cw76ub9Š')
    expect(extractDouyinShareCommand('复制，打开抖音 t7Ped3cw76ub9')).toBe('ˇt7Ped3cw76ub9Š')
    expect(extractDouyinShareCommand('复制,打开抖音 t7Ped3cw76ub9')).toBe('ˇt7Ped3cw76ub9Š')
  })

  it.each([
    ['AbCdEf12345', 'ˇAbCdEf12345Š'],
    ['AbCdEf123456', 'ˇAbCdEf123456Š'],
    ['AbCdEf1234567', 'ˇAbCdEf1234567Š'],
    ['AbCdEf12345678', 'ˇAbCdEf12345678Š']
  ])('完整保留 %s', (token, expected) => {
    expect(extractDouyinShareCommand(`复制打开抖音 ${token}`)).toBe(expected)
  })

  it('过短或过长的连续串不截取', () => {
    expect(extractDouyinShareCommand('复制打开抖音 AbCdEf1234')).toBeUndefined()
    expect(extractDouyinShareCommand('复制打开抖音 AbCdEf123456789')).toBeUndefined()
  })

  it('被空格拆开的短片段不拼接', () => {
    expect(extractDouyinShareCommand('复制打开抖音 AbCdEf 1234567')).toBeUndefined()
  })

  it('多个不同候选时不猜口令', () => {
    expect(extractDouyinShareCommand('复制打开抖音 AbCdEf123456 XyZ987654321')).toBeUndefined()
  })

  it('仅大小写不同的两个候选视为不同候选', () => {
    expect(extractDouyinShareCommand('复制打开抖音 AbCdEf123456 aBcDeF123456')).toBeUndefined()
  })

  it('作者名形成第二候选时不猜口令', () => {
    expect(extractDouyinShareCommand('复制打开抖音 AbCdEf123456 作者 SomeLongName1')).toBeUndefined()
  })

  it('普通聊天即使出现抖音、复制等词也不触发', () => {
    expect(extractDouyinShareCommand('我今天在抖音看到有人复制 t7Ped3cw76ub9')).toBeUndefined()
  })

  it('无分享文案的裸码不触发', () => {
    expect(extractDouyinShareCommand('t7Ped3cw76ub9')).toBeUndefined()
  })
})
