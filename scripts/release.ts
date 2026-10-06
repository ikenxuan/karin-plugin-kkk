import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'

import { versionBump } from 'bumpp'

import { changelogSections } from './changelog-types'

/**
 * 本地发版入口：`pnpm run release`（`--dry --to x.y.z` 只预览 CHANGELOG 条目）
 *
 * 流程：守卫（main / 工作区干净 / 与远端同步）→ bumpp 交互式选版本并改写
 * `packages/core/package.json` → 从上个 v* tag 起收集提交，按 changelog 类型
 * 分组，以既有 release-please 风格 prepend 进 `packages/core/CHANGELOG.md`
 * → 全量提交 `chore: release vX.Y.Z` → 打 v* tag。**推送交给人工**：审计提交
 * 与 CHANGELOG 无误后 `git push origin main` + `git push origin v<版本>`，tag 一推即触发
 * `.github/workflows/release.yml` 发布。
 *
 * 为什么 CHANGELOG.md 在本地写而不是 CI 里补：插件的更新日志渲染会同时从
 * 「npm 包内的 CHANGELOG.md」和「tag v* 的 GitHub raw」竞速抓取，条目必须
 * 在打 tag 之前就进提交，tag 树里才看得到这一版。
 *
 * 版本线约定：不要在上一条版本线转正前开下一条 beta 线（例：2.45.0 尚未发布就打
 * 2.46.0-beta.1）—— main 是单列火车，2.46.0-beta.1 内容上包含 2.45.0-beta 的全部提交，
 * 交错编号会让 semver 与内容脱节，且 CHANGELOG 小节顺序不再匹配版本序。
 *
 * 为什么 git 不全交给 bumpp：bumpp 的提交是带路径的部分提交，会把钩子塞进
 * 临时索引里跑（amagi 2026-09-21 的教训）。这里 bumpp 只负责选版本改文件，
 * git 步骤手工编排 —— 全量提交走正常钩子路径，pre-commit 重写 timestamp
 * 后自行重新 add，不会留下幻影改动。
 */

const REPO = 'ikenxuan/karin-plugin-kkk'
const CORE_PKG = 'packages/core/package.json'
const CHANGELOG = 'packages/core/CHANGELOG.md'

const gitOut = (args: string[]): string => execFileSync('git', args, { encoding: 'utf-8' }).trim()

interface CommitEntry {
  sha: string
  type: string
  scope?: string
  message: string
}

/** 解析上一版 tag（当前 HEAD 可达的最近 v* tag；仓库还没有 tag 时返回空） */
const previousTag = (): string => {
  try {
    return gitOut(['describe', '--tags', '--abbrev=0'])
  } catch {
    return ''
  }
}

/** 收集上一版 tag 之后的常规提交（跳过 merge），解析 conventional 前缀 */
const collectEntries = (range: string): CommitEntry[] => {
  const raw = gitOut(['log', range, '--no-merges', '--pretty=%H%x01%s'])
  if (!raw) return []

  const knownTypes = new Set(changelogSections.map((s) => s.type))
  const entries: CommitEntry[] = []

  for (const line of raw.split('\n')) {
    const [sha, subject] = line.split('\u0001')
    const match = /^([a-zA-Z][a-zA-Z0-9]*)(?:\(([^)]*)\))?:(?:\s+)(.+)$/.exec(subject ?? '')
    if (!match || !knownTypes.has(match[1])) continue
    entries.push({ sha, type: match[1], scope: match[2] || undefined, message: match[3] })
  }
  return entries
}

/** 按类型分组渲染成 release-please 风格的 CHANGELOG 条目（块间空两行） */
const renderEntry = (version: string, prevTag: string, entries: CommitEntry[]): string => {
  const date = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Shanghai' })
  const heading = prevTag
    ? `## [${version}](https://github.com/${REPO}/compare/${prevTag}...v${version}) (${date})`
    : `## ${version} (${date})`

  const blocks = [heading]
  for (const section of changelogSections) {
    const items = entries
      .filter((e) => e.type === section.type)
      .map((e) => {
        const subject = e.scope ? `**${e.scope}:** ${e.message}` : e.message
        return `* ${subject} ([${e.sha.slice(0, 7)}](https://github.com/${REPO}/commit/${e.sha}))`
      })
    if (items.length > 0) blocks.push(`### ${section.title}\n\n${items.join('\n')}`)
  }
  return blocks.join('\n\n\n')
}

/**
 * 把条目插到第一个版本小节之前（保持文件既有行尾风格）。
 * 必须用 UTF-8 读写：latin1 读写虽对既有字节无损，但新条目字符串里的
 * 中文/emoji 会在 latin1 写出时被截断成单字节（乱码根因，v2.45.0-beta.1 首跑实测）。
 */
const prependEntry = (entry: string): void => {
  const raw = readFileSync(CHANGELOG, 'utf-8')
  const eol = raw.includes('\r\n') ? '\r\n' : '\n'
  const entryText = entry.replace(/\n/g, eol)
  const idx = raw.search(/^## /m)
  const updated = idx === -1 ? raw + eol + entryText + eol : raw.slice(0, idx) + entryText + eol + eol + raw.slice(idx)
  writeFileSync(CHANGELOG, updated, 'utf-8')
  console.log(`📝 已写入 ${CHANGELOG}（${eol === '\r\n' ? 'CRLF' : 'LF'}，插入位置：${idx === -1 ? '末尾' : '首个版本小节前'}）`)
}

// ── 入口 ─────────────────────────────────────────────────────────────────
const dry = process.argv.includes('--dry')
const dryTo = dry ? process.argv[process.argv.indexOf('--to') + 1] : undefined

if (dry && (!dryTo || !/^\d+\.\d+\.\d+$/.test(dryTo))) {
  console.error('用法：pnpm release --dry --to x.y.z')
  process.exit(1)
}

if (!dry) {
  // 前置守卫：tag 推上去即触发发布，发版只允许在 main 上、工作区干净、与远端同步。
  const branch = gitOut(['rev-parse', '--abbrev-ref', 'HEAD'])
  if (branch !== 'main') {
    console.error(`❌ 发版必须在 main 分支上进行（当前：${branch}）。先切回 main 再跑。`)
    process.exit(1)
  }
  if (gitOut(['status', '--porcelain']) !== '') {
    console.error('❌ 工作区有未提交改动。先提交或 stash，保持干净再发版。')
    process.exit(1)
  }
  execFileSync('git', ['fetch', 'origin', 'main'], { stdio: 'inherit' })
  if (gitOut(['rev-parse', 'HEAD']) !== gitOut(['rev-parse', 'origin/main'])) {
    console.error('❌ 本地 main 与 origin/main 不同步。先 pull / push 对齐再发版。')
    process.exit(1)
  }
}

// ── 选版本（dry 模式用 --to 指定，不落盘）────────────────────────────────
let version: string
if (dry) {
  version = dryTo as string
  console.log(`🧪 dry 模式：预览 ${version} 的 CHANGELOG 条目`)
} else {
  await versionBump({ files: [CORE_PKG], commit: false, tag: false, push: false, confirm: true })

  // 从文件读回版本号，和 HEAD 比对：确认环节取消时 bumpp 不写文件，这里直接退出
  version = JSON.parse(readFileSync(CORE_PKG, 'utf-8')).version
  const headVersion = JSON.parse(execFileSync('git', ['show', `HEAD:${CORE_PKG}`], { encoding: 'utf-8' })).version
  if (version === headVersion) {
    console.log('版本号未变化，已取消发版')
    process.exit(0)
  }

  if (gitOut(['tag', '-l', `v${version}`])) {
    console.error(`❌ tag v${version} 已存在。换一个版本号。`)
    process.exit(1)
  }
}

const prevTag = previousTag()
const range = prevTag ? `${prevTag}..HEAD` : 'HEAD'
const entries = collectEntries(range)
if (entries.length === 0) {
  console.error(`❌ ${prevTag || '仓库起点'} 之后没有可分组的 conventional 提交，无法生成 CHANGELOG 条目`)
  process.exit(1)
}

const entry = renderEntry(version, prevTag, entries)
console.log(`\n${entry.replaceAll('*', '•')}\n`)

if (dry) {
  console.log('🧪 dry 结束，未写入任何文件')
  process.exit(0)
}

prependEntry(entry)

// ── 提交 + 打 tag ────────────────────────────────────────────────────────
execFileSync('git', ['add', CORE_PKG, CHANGELOG], { stdio: 'inherit' })
execFileSync('git', ['commit', '-m', `chore: release v${version}`], { stdio: 'inherit' })
execFileSync('git', ['tag', `v${version}`], { stdio: 'inherit' })

console.log(`\n✅ 发版就绪：${version}（commit + tag 已就位，尚未推送）`)
console.log(`   审计后手动推送：git push origin main && git push origin v${version}`)
console.log('   tag 推上去即触发 release.yml：changelogithub 建 GitHub Release → build → npm 发布')
