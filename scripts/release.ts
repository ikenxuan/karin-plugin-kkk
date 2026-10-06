import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'

import * as clack from '@clack/prompts'

import { changelogSections } from './changelog-types'

/**
 * 本地发版入口：`pnpm run release`（`--dry` 只预览 CHANGELOG 条目）
 *
 * 流程：守卫（main / 工作区干净 / 与远端同步）→ 打印自上个 tag 以来的提交清单
 * → 交互选择版本（选项感知当前 prerelease 线：beta.1 已发 → 建议 beta.2 /
 * 转正 / 下一功能线）→ 收集上一个 tag 以来的提交（不分渠道，只写增量小节，互不重复；
 * 跨渠道的完整覆盖由推送渲染端的 range 拼装历史小节完成），按 changelog 类型分组，
 * 以 release-please 风格 prepend 进 `packages/core/CHANGELOG.md` → 提交
 * （只含 CHANGELOG）→ 打 v* tag。**推送交给人工**：审计后
 * `git push origin main` + `git push origin v<版本>`，tag 一推即触发
 * `.github/workflows/release.yml` 发布。
 *
 * 为什么 CHANGELOG.md 在本地写而不是 CI 里补：插件的更新日志渲染会同时从
 * 「npm 包内的 CHANGELOG.md」和「tag v* 的 GitHub raw」竞速抓取，条目必须
 * 在打 tag 之前就进提交，tag 树里才看得到这一版。
 *
 * 版本不变式：main 的 packages/core/package.json 始终维持最近 stable 版本，
 * **本脚本完全不写 package.json**；prerelease 版本只存在于 tag 名与发布产物
 * ——release.yml 在发布时从 tag 注入。金丝雀版本号以「最近 stable tag 的下一个
 * patch 号」为基准，beta/rc 的 tag 不参与基准（prerelease 之间不互追版本号）。
 *
 * 版本线约定：不要在上一条版本线转正前开下一条 beta 线（例：2.45.0 尚未发布就打
 * 2.46.0-beta.1）—— main 是单列火车，2.46.0-beta.1 内容上包含 2.45.0-beta 的全部提交，
 * 交错编号会让 semver 与内容脱节，且 CHANGELOG 小节顺序不再匹配版本序。
 *
 * 交互采用 @clack/prompts（bumpp 同款 UI 库），替代 bumpp：bumpp 的建议基于
 * 当前包版本（钉 stable 后永远不含 prerelease 线延续），无法感知 tag 线。
 */

const REPO = 'ikenxuan/karin-plugin-kkk'
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

/** 解析最后一个 prerelease tag（带 - 的 v* tag；无则返回空） */
const lastPrereleaseTag = (): string => {
  const tags = gitOut(['tag', '-l', 'v*-*', '--sort=-creatordate'])
  return tags.split('\n')[0] ?? ''
}

/** 选中版本的渠道 preid：无后缀 = ''（stable），-beta.N = beta，-rc.N = rc */
const channelOf = (version: string): string =>
  version.replace(/^v/, '').split('-').slice(1).join('-').split('.')[0]

/** prerelease tag 的延续版本：末段数字 +1（v2.45.0-beta.1 → 2.45.0-beta.2） */
const bumpPrerelease = (tag: string): string => {
  const v = tag.replace(/^v/, '')
  const dot = v.indexOf('-')
  if (dot === -1) return v
  const core = v.slice(0, dot)
  const segs = v.slice(dot + 1).split('.')
  const last = segs[segs.length - 1]
  segs[segs.length - 1] = /^\d+$/.test(last) ? String(Number(last) + 1) : `${last}.1`
  return `${core}-${segs.join('.')}`
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
    // 历史发版提交是元数据不是内容：stable 全量归纳的 range 会扫过 beta/rc 的
    // chore: release vX.Y.Z 提交，剔除之（同渠道 range 本就不含，恒过滤无副作用）
    if (match[1] === 'chore' && /^release v/.test(match[3])) continue
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
 * 转正发布空增量时的占位条目：告知完整变更位于本版本线更早的各测试/预览小节。
 * 不写这条占位，推送图的版本区间会缺少 stable 锚点（range 的 endVersion 回退到
 * 预发布 tag），首屏标题将落在预发布版本上，与提示条的「最新版本」不一致。
 */
const renderStablePlaceholder = (version: string, prevTag: string): string => {
  const date = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Shanghai' })
  const heading = prevTag
    ? `## [${version}](https://github.com/${REPO}/compare/${prevTag}...v${version}) (${date})`
    : `## ${version} (${date})`
  const since = prevTag ? `\`${prevTag.replace(/^v/, '')}\`` : '历史版本'
  return `${heading}\n\n> 本版本为测试/预览线的转正发布，自上一个 tag 以来没有新增常规提交。完整变更记录见 ${since} 及更早的各小节。`
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
  clack.log.step(`📝 已写入 ${CHANGELOG}（${eol === '\r\n' ? 'CRLF' : 'LF'}，插入位置：${idx === -1 ? '末尾' : '首个版本小节前'}）`)
}

// ── 入口 ─────────────────────────────────────────────────────────────────
const dry = process.argv.includes('--dry')
const dryToIndex = process.argv.indexOf('--to')
const dryTo = dry && dryToIndex !== -1 ? process.argv[dryToIndex + 1] : undefined
const SEMVER_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/

if (dry && dryTo && !SEMVER_RE.test(dryTo)) {
  console.error('用法：pnpm release --dry [--to x.y.z 或 x.y.z-beta.n]')
  process.exit(1)
}

if (!dry) {
  // 前置守卫：tag 推上去即触发发布，发版只允许在 main 上、工作区干净、与远端同步。
  const branch = gitOut(['rev-parse', '--abbrev-ref', 'HEAD'])
  if (branch !== 'main') {
    clack.log.error(`❌ 发版必须在 main 分支上进行（当前：${branch}）。先切回 main 再跑。`)
    process.exit(1)
  }
  if (gitOut(['status', '--porcelain']) !== '') {
    clack.log.error('❌ 工作区有未提交改动。先提交或 stash，保持干净再发版。')
    process.exit(1)
  }
  execFileSync('git', ['fetch', 'origin', 'main'], { stdio: 'inherit' })
  if (gitOut(['rev-parse', 'HEAD']) !== gitOut(['rev-parse', 'origin/main'])) {
    clack.log.error('❌ 本地 main 与 origin/main 不同步。先 pull / push 对齐再发版。')
    process.exit(1)
  }
}

const prevTag = previousTag()
const range = prevTag ? `${prevTag}..HEAD` : 'HEAD'

// 发布前的提交清单（与 bumpp 同款：先给上下文，再选版本）
const commitsList = gitOut(['log', range, '--no-merges', '--pretty=  %h  %s'])
const commitCount = commitsList ? commitsList.split('\n').length : 0
if (commitCount > 0) {
  console.log(`\n${commitCount} Commits since the last version:\n${commitsList}\n`)
}

// ── 版本选择：选项感知当前 prerelease 线 ─────────────────────────────────
const lastPre = lastPrereleaseTag()
const pkgVersion = JSON.parse(readFileSync('packages/core/package.json', 'utf-8')).version as string
const pkgStable = pkgVersion.split('-')[0]
const [pkgMaj, pkgMin, pkgPat] = pkgStable.split('.').map(Number)

type VersionOption = { value: string; label: string; hint?: string }
const opts: VersionOption[] = []
const pushOpt = (value: string, hint: string): void => {
  opts.push({ value, label: value, hint })
}

if (lastPre) {
  // 当前 prerelease 线：core + preid.seg（如 2.45.0-beta.1）
  const [core, preFull] = lastPre.replace(/^v/, '').split('-')
  const segs = preFull.split('.')
  const preid = segs[0]
  const seg = Number(segs[1] ?? 0)
  const channelName: Record<string, string> = { beta: '测试渠道', rc: '预览渠道', canary: '金丝雀（仅展示）' }

  pushOpt(`${core}-${preid}.${seg + 1}`, `继续${channelName[preid] ?? preid}（末段 +1）`)
  if (preid === 'beta') pushOpt(`${core}-rc.1`, '晋升预览渠道（rc.1）')
  pushOpt(core, '转正发布（正式渠道）')
}
pushOpt(`${pkgMaj}.${pkgMin}.${pkgPat + 1}`, '正式渠道热修（stable +1 patch）')
pushOpt(`${pkgMaj}.${Number(pkgMin) + 1}.0-beta.1`, '开启下一功能线（测试渠道）')
pushOpt(`${Number(pkgMaj) + 1}.0.0-beta.1`, '开启大版本线（测试渠道）')
opts.push({ value: '__custom__', label: '自定义版本号…' })

// value 去重（lastPre 的 core 与热修号可能撞车）
const seen = new Set<string>()
const options = opts.filter((o) => (seen.has(o.value) ? false : (seen.add(o.value), true)))
let version: string
if (dry) {
  // dry：默认预览「上一 prerelease 线 +1」，可用 --to 覆盖
  version = dryTo || bumpPrerelease(lastPre || `v0.0.0`) || '0.0.1'
  console.log(`🧪 dry 模式：预览 ${version} 的 CHANGELOG 条目`)
} else {
  const picked = await clack.select({
    message: '选择要发布的版本',
    options,
    initialValue: options[0]?.value
  })
  if (clack.isCancel(picked)) {
    clack.cancel('已取消发版')
    process.exit(0)
  }

  if (picked === '__custom__') {
    const custom = await clack.text({
      message: '输入版本号',
      placeholder: '2.45.0-beta.2',
      validate: (v) => (SEMVER_RE.test(v ?? '') ? undefined : '不是合法 semver 版本')
    })
    if (clack.isCancel(custom)) {
      clack.cancel('已取消发版')
      process.exit(0)
    }
    version = (custom as string).trim()
  } else {
    version = picked as string
  }

  if (gitOut(['tag', '-l', `v${version}`])) {
    clack.log.error(`❌ tag v${version} 已存在。换一个版本号。`)
    process.exit(1)
  }
}
// 每个版本的小节只写「上一个 tag（不分渠道）以来的增量」——beta/rc/stable 的小节
// 互不重复；跨渠道的完整覆盖由渲染端负责：推送图用 range 在 [本地版本 → 远程版本]
// 区间按版本序拼装历史小节（如 2.44.1 用户收到 2.45.0 推送时，拼出整条版本线）
const entries = collectEntries(range)

// 预发布版本空增量 = 没有可发布的内容；转正发布允许空增量（测试完直接转正），
// 但仍要写入占位小节 —— 否则推送图的版本区间缺少 stable 锚点，首屏标题会落到预发布版本上
if (entries.length === 0 && channelOf(version) !== '') {
  clack.log.error(`❌ ${prevTag || '仓库起点'} 之后没有可分组的 conventional 提交，预发布版本无内容可发布`)
  process.exit(1)
}

const entry = entries.length > 0 ? renderEntry(version, prevTag, entries) : renderStablePlaceholder(version, prevTag)
console.log(`\n${entry.replaceAll('*', '•')}\n`)

if (dry) {
  console.log('🧪 dry 结束，未写入任何文件')
  process.exit(0)
}

const proceed = await clack.confirm({
  message: `按以上条目发布 v${version} 并打 tag？`
})
if (clack.isCancel(proceed) || proceed === false) {
  clack.cancel('已取消发版')
  process.exit(0)
}

prependEntry(entry)

// ── 提交 + 打 tag ────────────────────────────────────────────────────────
// 只提交 CHANGELOG：package.json 钉在 stable 不动（版本由 tag 携带、CI 注入）
execFileSync('git', ['add', CHANGELOG], { stdio: 'inherit' })
execFileSync('git', ['commit', '-m', `chore: release v${version}`], { stdio: 'inherit' })
execFileSync('git', ['tag', `v${version}`], { stdio: 'inherit' })

console.log(`\n✅ 发版就绪：${version}（commit + tag 已就位，尚未推送）`)
console.log(`   审计后手动推送：git push origin main && git push origin v${version}`)
console.log('   tag 推上去即触发 release.yml：changelogithub 建 GitHub Release → build → npm 发布')
