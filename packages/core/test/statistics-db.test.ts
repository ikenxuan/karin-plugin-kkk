import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { StatisticsDBBase } from '@/module/db/statistics'

/** 每个用例独占一个临时库，跑完关连接再删目录；不碰真实数据目录。 */
let ctx: { db: StatisticsDBBase; dir: string }
/** 用例里额外开过的连接（老库升级那条会开第二个），afterEach 统一关掉 */
let opened: StatisticsDBBase[]

const openDB = async (dbPath: string): Promise<StatisticsDBBase> => {
  const db = await new StatisticsDBBase(dbPath).init()
  opened.push(db)
  return db
}

beforeEach(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kkk-stats-'))
  opened = []
  ctx = { db: await openDB(path.join(dir, 'statistics.db')), dir }
})

afterEach(async () => {
  // Windows 下不关连接就删不掉文件（EPERM）
  for (const db of opened) await db.close()
  fs.rmSync(ctx.dir, { recursive: true, force: true })
})

describe('StatisticsDB 新增维度', () => {
  it('基础计数照旧：群、用户、平台三维累计', async () => {
    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g1', 'u2', 'bilibili', { workType: 'bangumi' })

    const stats = await ctx.db.getGroupStatistics('g1')
    expect(stats).toHaveLength(2)
    expect(stats.find((s) => s.platform === 'douyin')?.parseCount).toBe(2)
    expect(await ctx.db.getGroupUniqueUsers('g1')).toBe(2)
    expect(await ctx.db.getTotalParses()).toBe(3)
  })

  it('群维度日粒度：同一天同平台累加，不多出行', async () => {
    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g1', 'u2', 'douyin', { workType: 'gallery' })
    await ctx.db.recordParse('g1', 'u1', 'bilibili', { workType: 'video' })

    const rows = await ctx.db.getGroupRecentHistory('g1')
    expect(rows).toHaveLength(2)
    expect(rows.find((r) => r.platform === 'douyin')?.parseCount).toBe(2)
    expect(rows.find((r) => r.platform === 'bilibili')?.parseCount).toBe(1)
    // 群维度只装自己的数据
    expect(await ctx.db.getGroupRecentHistory('g-other')).toHaveLength(0)
  })

  it('群维度日粒度：日期按 UTC 且升序返回', async () => {
    const rows = await ctx.db.getGroupRecentHistory('g1')
    expect(rows).toHaveLength(0)

    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    const today = new Date().toISOString().split('T')[0]
    const after = await ctx.db.getGroupRecentHistory('g1')
    expect(after[0].date).toBe(today)
  })

  it('小时粒度：落在当前小时，且 24 小时内有界', async () => {
    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g1', 'u2', 'douyin', { workType: 'video' })

    const rows = await ctx.db.getGroupHourStats('g1')
    expect(rows).toHaveLength(1)
    expect(rows[0].hour).toBe(new Date().getHours())
    expect(rows[0].parseCount).toBe(2)
  })

  it('内容形态：按平台 × 形态分别累计', async () => {
    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g1', 'u2', 'douyin', { workType: 'gallery' })
    await ctx.db.recordParse('g1', 'u3', 'douyin', { workType: 'gallery' })

    const rows = await ctx.db.getGroupWorkTypeStats('g1')
    expect(rows).toHaveLength(2)
    expect(rows[0].workType).toBe('gallery')
    expect(rows[0].parseCount).toBe(2)
    expect(rows.find((r) => r.workType === 'video')?.parseCount).toBe(1)
  })

  it('内容形态：跨群聚合到全局，groupId 维度被折叠', async () => {
    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g2', 'u2', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g2', 'u3', 'douyin', { workType: 'article' })

    const rows = await ctx.db.getGlobalWorkTypeStats()
    expect(rows).toHaveLength(2)
    expect(rows.find((r) => r.workType === 'video')?.parseCount).toBe(2)
    expect(rows.find((r) => r.workType === 'article')?.parseCount).toBe(1)
  })

  it('不传 workType 时总量照记，形态维度不落行', async () => {
    await ctx.db.recordParse('g1', 'u1', 'kuaishou')

    expect(await ctx.db.getTotalParses()).toBe(1)
    expect(await ctx.db.getGroupWorkTypeStats('g1')).toHaveLength(0)
    // 另外两张新表仍要有数据，它们不依赖 workType
    expect(await ctx.db.getGroupRecentHistory('g1')).toHaveLength(1)
    expect(await ctx.db.getGroupHourStats('g1')).toHaveLength(1)
  })

  it('群首次出现时间可用于增长曲线', async () => {
    await ctx.db.recordParse('g1', 'u1', 'douyin', { workType: 'video' })
    await ctx.db.recordParse('g2', 'u2', 'douyin', { workType: 'video' })

    const seen = await ctx.db.getGroupFirstSeen()
    expect(seen).toHaveLength(2)
    expect(seen.map((s) => s.groupId).sort()).toEqual(['g1', 'g2'])
    expect(seen[0].firstSeen).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('老库升级：已存在的 ParseStatistics 数据不受影响，新表自动建出', async () => {
    const dbPath = path.join(ctx.dir, 'statistics.db')
    await ctx.db.close()
    opened = opened.filter((db) => db !== ctx.db)
    fs.rmSync(dbPath, { force: true })

    // 先建一个「老版本」库：只有老表，塞一行历史数据
    const sqlite3 = (await import('node-karin/sqlite3')).default
    const legacy = new sqlite3.Database(dbPath)
    const run = (sql: string, p: unknown[] = []) =>
      new Promise<void>((res, rej) => legacy.run(sql, p, (e: Error | null) => (e ? rej(e) : res())))
    await run(`CREATE TABLE ParseStatistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT, groupId TEXT NOT NULL, userId TEXT NOT NULL,
      platform TEXT NOT NULL, parseCount INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP, updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(groupId, userId, platform))`)
    await run(`CREATE TABLE ParseHistory (
      id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL UNIQUE, totalParses INTEGER DEFAULT 0,
      douyin INTEGER DEFAULT 0, bilibili INTEGER DEFAULT 0, kuaishou INTEGER DEFAULT 0,
      xiaohongshu INTEGER DEFAULT 0, createdAt TEXT DEFAULT CURRENT_TIMESTAMP)`)
    await run(`CREATE TABLE GlobalStatistics (key TEXT PRIMARY KEY, value TEXT NOT NULL, updatedAt TEXT DEFAULT CURRENT_TIMESTAMP)`)
    await run('INSERT INTO ParseStatistics (groupId, userId, platform, parseCount) VALUES (?,?,?,?)', ['g-old', 'u-old', 'douyin', 42])
    await new Promise<void>((res) => legacy.close(() => res()))

    // 再用新版本打开同一个库
    const upgraded = await openDB(dbPath)

    // 老数据还在
    const old = await upgraded.getGroupStatistics('g-old')
    expect(old).toHaveLength(1)
    expect(old[0].parseCount).toBe(42)

    // 新表可用
    await upgraded.recordParse('g-old', 'u-old', 'douyin', { workType: 'video' })
    expect(await upgraded.getGroupRecentHistory('g-old')).toHaveLength(1)
    expect(await upgraded.getGroupWorkTypeStats('g-old')).toHaveLength(1)
    expect(old[0].parseCount).toBe(42)
  })

  it('内容形态取值落在约定值域内', async () => {
    const allowed = ['video', 'gallery', 'collection', 'article', 'live', 'bangumi', 'dynamic', 'music', 'unknown']
    const samples = ['video', 'gallery', 'collection', 'article', 'live', 'bangumi', 'dynamic', 'music'] as const
    for (const [i, wt] of samples.entries()) {
      await ctx.db.recordParse('g1', `u${i}`, 'douyin', { workType: wt })
    }
    const rows = await ctx.db.getGroupWorkTypeStats('g1')
    expect(rows.map((r) => r.workType).sort()).toEqual([...samples].sort())
    expect(rows.every((r) => allowed.includes(r.workType))).toBe(true)
  })
})
