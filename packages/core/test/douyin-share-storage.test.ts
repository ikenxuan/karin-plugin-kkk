import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const fixture = vi.hoisted(() => ({ base: '' }))
vi.mock('node-karin/root', () => ({
  get karinPathBase() {
    return fixture.base
  },
  get karinPathTemp() {
    return join(fixture.base, 'temp')
  }
}))
vi.mock('@/root', () => ({ Root: { pluginName: 'karin-plugin-kkk' } }))
vi.mock('@/module/utils/logger', () => ({ logger: { warn: vi.fn() } }))

import { prepareDouyinShareDataFile } from '@/platform/douyin/shareStorage'

const prefix = join(tmpdir(), 'kkk-test-share-storage-')
beforeEach(() => {
  fixture.base = mkdtempSync(prefix)
})

afterEach(() => {
  if (fixture.base.startsWith(prefix) && dirname(fixture.base) === dirname(prefix)) {
    rmSync(fixture.base, { recursive: true, force: true })
  }
})

describe('抖音口令数据目录', () => {
  it.each(['douyin-app-session.json', 'douyin-share-command-patterns.json'] as const)('在数据目录不存在时导入旧的 %s', (filename) => {
    const previous = join(fixture.base, 'temp', 'karin-plugin-kkk', filename)
    const current = join(fixture.base, 'karin-plugin-kkk', 'data', filename)
    mkdirSync(dirname(previous), { recursive: true })
    writeFileSync(previous, '{"from":"temp"}', { mode: 0o600 })

    expect(prepareDouyinShareDataFile(filename)).toBe(current)
    expect(readFileSync(current, 'utf8')).toBe('{"from":"temp"}')
    expect(existsSync(previous)).toBe(true)

    writeFileSync(current, '{"from":"data"}', { mode: 0o600 })
    expect(prepareDouyinShareDataFile(filename)).toBe(current)
    expect(readFileSync(current, 'utf8')).toBe('{"from":"data"}')
  })
})
