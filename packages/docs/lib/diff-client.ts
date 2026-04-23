import { gunzipSync } from 'fflate'
import { diffChars, diffLines, diffWords } from 'diff'

export type DiffGranularity = 'word' | 'char'

const PKG_NAME = 'karin-plugin-kkk'
const REGISTRY_URL = 'https://registry.npmjs.org'
const MIRROR_URL = 'https://registry.npmmirror.com'

/** 单词级差异 */
export interface WordDiff {
  type: 'equal' | 'add' | 'remove'
  value: string
}

/** Diff 单侧 */
export interface DiffSide {
  lineNum?: number
  content: string
  wordDiffs?: WordDiff[]
}

/** Diff 行 */
export interface DiffRow {
  type: 'equal' | 'add' | 'remove' | 'change' | 'skip'
  left?: DiffSide
  right?: DiffSide
  // skip 行显示的行号范围（GitHub hunk header 风格）
  oldStart?: number
  oldCount?: number
  newStart?: number
  newCount?: number
}

/** 单个文件的 diff 结果 */
export interface FileDiffResult {
  path: string
  status: 'added' | 'removed' | 'modified' | 'unchanged'
  rows: DiffRow[]
  additions: number
  deletions: number
  oldSize: number
  newSize: number
}

/** 包级 diff 结果 */
export interface PackageDiffResult {
  oldVersion: string
  newVersion: string
  files: FileDiffResult[]
}

/** 从 npm registry 获取版本列表（稳定版本） */
export async function fetchVersions (): Promise<string[]> {
  const res = await fetch(`${REGISTRY_URL}/${PKG_NAME}`)
  if (!res.ok) throw new Error('获取版本列表失败')
  const data = await res.json()
  const versions = Object.keys(data.versions)
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v))
    .sort((a, b) => compareSemver(b, a))
  return versions
}

/** semver 比较 */
function compareSemver (a: string, b: string): number {
  const ap = a.split('.').map(Number)
  const bp = b.split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    if (ap[i] !== bp[i]) return ap[i] - bp[i]
  }
  return 0
}

/** 解析 tar 归档（POSIX ustar） */
function parseTar (data: Uint8Array): Map<string, Uint8Array> {
  const files = new Map<string, Uint8Array>()
  let offset = 0

  while (offset + 512 <= data.length) {
    // 检查空块（归档结束）
    let empty = true
    for (let i = 0; i < 512; i++) {
      if (data[offset + i] !== 0) {
        empty = false
        break
      }
    }
    if (empty) {
      offset += 512
      // 检查第二个空块
      let secondEmpty = true
      for (let i = 0; i < 512 && offset + i < data.length; i++) {
        if (data[offset + i] !== 0) {
          secondEmpty = false
          break
        }
      }
      if (secondEmpty) break
      continue
    }

    // 解析文件名 (bytes 0-99)
    let nameEnd = 100
    while (nameEnd > 0 && data[offset + nameEnd - 1] === 0) nameEnd--
    const name = new TextDecoder().decode(data.slice(offset, offset + nameEnd))

    // 解析大小 (bytes 124-135)
    let sizeEnd = 136
    while (sizeEnd > 124 && data[offset + sizeEnd - 1] === 0) sizeEnd--
    const sizeStr = new TextDecoder().decode(data.slice(offset + 124, offset + sizeEnd)).trim()
    const size = parseInt(sizeStr, 8)

    // 类型标志 (byte 156)
    const typeFlag = data[offset + 156]

    if (!name || isNaN(size) || typeFlag === 0x35) {
      // 跳过目录或无效 entry
      offset += 512
      continue
    }

    offset += 512
    const content = data.slice(offset, offset + size)
    offset += size
    offset += (512 - (size % 512)) % 512

    // 去掉 npm tarball 的 "package/" 前缀
    const cleanName = name.replace(/^package\//, '')
    if (cleanName && !cleanName.endsWith('/')) {
      files.set(cleanName, content)
    }
  }

  return files
}

/** 下载并解压 tarball */
async function downloadTarball (version: string): Promise<Map<string, Uint8Array>> {
  const urls = [
    `${MIRROR_URL}/${PKG_NAME}/-/${PKG_NAME}-${version}.tgz`,
    `${REGISTRY_URL}/${PKG_NAME}/-/${PKG_NAME}-${version}.tgz`
  ]

  for (const url of urls) {
    try {
      const res = await fetch(url)
      if (!res.ok) continue
      const gzipped = new Uint8Array(await res.arrayBuffer())
      const unzipped = gunzipSync(gzipped)
      return parseTar(unzipped)
    } catch {
      // try next mirror
    }
  }

  throw new Error(`下载 ${PKG_NAME}@${version} 失败`)
}

/** 对 lib/ 下的 hashed JS 文件名提取 base name，用于跨版本匹配同一文件 */
function getBaseName (path: string): string {
  // 仅对 lib/ 目录下的 .js 文件做 hash 剥离，如 amagiClient-SgOj0Cnj.js → amagiClient.js
  if (path.startsWith('lib/') && path.endsWith('.js')) {
    return path.replace(/-[A-Za-z0-9_-]+\.js$/, '.js')
  }
  return path
}

const CONTEXT_LINES = 3
const MAX_WORD_DIFF_LINE_LENGTH = 500

function computeWordDiff (oldContent: string, newContent: string, granularity: DiffGranularity = 'word'): { left: WordDiff[]; right: WordDiff[] } {
  const parts = granularity === 'char' ? diffChars(oldContent, newContent) : diffWords(oldContent, newContent)
  const left: WordDiff[] = []
  const right: WordDiff[] = []

  for (const part of parts) {
    if (!part.added) {
      left.push({ type: part.removed ? 'remove' : 'equal', value: part.value })
    }
    if (!part.removed) {
      right.push({ type: part.added ? 'add' : 'equal', value: part.value })
    }
  }

  return { left, right }
}

interface NumberedLine {
  type: 'add' | 'remove' | 'context'
  content: string
  oldLineNum?: number
  newLineNum?: number
}

export function computeFileDiff (oldContent: string, newContent: string, granularity: DiffGranularity = 'word'): { rows: DiffRow[]; additions: number; deletions: number } {
  const lineDiff = diffLines(oldContent, newContent)

  const allLines: NumberedLine[] = []
  let oldLineNum = 1
  let newLineNum = 1

  for (const part of lineDiff) {
    const type = part.added ? 'add' : part.removed ? 'remove' : 'context'
    const lines = part.value.split('\n')
    const hasTrailingNewline = part.value.endsWith('\n')
    const count = hasTrailingNewline ? lines.length - 1 : lines.length

    for (let i = 0; i < count; i++) {
      const line: NumberedLine = { type, content: lines[i] }
      if (type === 'context' || type === 'remove') line.oldLineNum = oldLineNum++
      if (type === 'context' || type === 'add') line.newLineNum = newLineNum++
      allLines.push(line)
    }
  }

  // 计算保留范围
  const changeIndices = allLines
    .map((line, idx) => line.type !== 'context' ? idx : -1)
    .filter((idx): idx is number => idx !== -1)

  const ranges: Array<{ start: number; end: number }> = []
  for (const idx of changeIndices) {
    const start = Math.max(0, idx - CONTEXT_LINES)
    const end = Math.min(allLines.length - 1, idx + CONTEXT_LINES)
    if (ranges.length > 0 && ranges[ranges.length - 1].end >= start - 1) {
      ranges[ranges.length - 1].end = end
    } else {
      ranges.push({ start, end })
    }
  }

  const rows: DiffRow[] = []
  let additions = 0
  let deletions = 0

  for (let r = 0; r < ranges.length; r++) {
    const range = ranges[r]
    if (r > 0 && range.start > ranges[r - 1].end + 1) {
      const firstLine = allLines[range.start]
      const prevLastLine = allLines[ranges[r - 1].end]
      let oldStart = firstLine.oldLineNum ?? (prevLastLine.oldLineNum ? prevLastLine.oldLineNum + 1 : 1)
      let newStart = firstLine.newLineNum ?? (prevLastLine.newLineNum ? prevLastLine.newLineNum + 1 : 1)
      let oldCount = 0
      let newCount = 0
      for (let k = range.start; k <= range.end; k++) {
        const ln = allLines[k]
        if (ln.type === 'context') { oldCount++; newCount++ }
        else if (ln.type === 'remove') oldCount++
        else if (ln.type === 'add') newCount++
      }
      rows.push({ type: 'skip', oldStart, oldCount, newStart, newCount })
    }

    let i = range.start
    while (i <= range.end) {
      const line = allLines[i]

      if (line.type === 'context') {
        rows.push({
          type: 'equal',
          left: { lineNum: line.oldLineNum, content: line.content },
          right: { lineNum: line.newLineNum, content: line.content }
        })
        i++
      } else if (line.type === 'remove') {
        const removes: NumberedLine[] = []
        while (i <= range.end && allLines[i].type === 'remove') {
          removes.push(allLines[i])
          i++
        }

        const adds: NumberedLine[] = []
        while (i <= range.end && allLines[i].type === 'add') {
          adds.push(allLines[i])
          i++
        }

        const pairCount = Math.min(removes.length, adds.length)
        for (let j = 0; j < pairCount; j++) {
          const shouldWordDiff =
            removes[j].content.length <= MAX_WORD_DIFF_LINE_LENGTH &&
            adds[j].content.length <= MAX_WORD_DIFF_LINE_LENGTH

          if (shouldWordDiff) {
            const { left, right } = computeWordDiff(removes[j].content, adds[j].content, granularity)
            rows.push({
              type: 'change',
              left: { lineNum: removes[j].oldLineNum, content: removes[j].content, wordDiffs: left },
              right: { lineNum: adds[j].newLineNum, content: adds[j].content, wordDiffs: right }
            })
          } else {
            rows.push({
              type: 'change',
              left: { lineNum: removes[j].oldLineNum, content: removes[j].content },
              right: { lineNum: adds[j].newLineNum, content: adds[j].content }
            })
          }
          additions++
          deletions++
        }

        for (let j = pairCount; j < removes.length; j++) {
          rows.push({ type: 'remove', left: { lineNum: removes[j].oldLineNum, content: removes[j].content } })
          deletions++
        }

        for (let j = pairCount; j < adds.length; j++) {
          rows.push({ type: 'add', right: { lineNum: adds[j].newLineNum, content: adds[j].content } })
          additions++
        }
      } else if (line.type === 'add') {
        rows.push({ type: 'add', right: { lineNum: line.newLineNum, content: line.content } })
        additions++
        i++
      }
    }
  }

  return { rows, additions, deletions }
}

/** 用于异步计算 diff 的原始二进制数据 */
export interface DiffSource {
  oldContent?: Uint8Array
  newContent?: Uint8Array
}

function areUint8ArraysEqual (a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

/** 轻量级 diff：只返回文件列表和状态，modified 文件的 rows 为空，避免阻塞主线程
 *  同时返回 diffSources，供调用方异步计算详细 diff */
export async function computePackageDiffLite (
  oldVersion: string,
  newVersion: string
): Promise<{ result: PackageDiffResult; diffSources: Map<string, DiffSource> }> {
  const [oldFiles, newFiles] = await Promise.all([
    downloadTarball(oldVersion),
    downloadTarball(newVersion)
  ])

  // 使用 base name 做匹配：lib/ 下的 hash 文件名按前缀聚合
  const oldByBase = new Map<string, { path: string; content: Uint8Array }>()
  for (const [path, content] of oldFiles) {
    const base = getBaseName(path)
    oldByBase.set(base, { path, content })
  }

  const newByBase = new Map<string, { path: string; content: Uint8Array }>()
  for (const [path, content] of newFiles) {
    const base = getBaseName(path)
    newByBase.set(base, { path, content })
  }

  const allBases = new Set<string>([...oldByBase.keys(), ...newByBase.keys()])
  const results: FileDiffResult[] = []
  const diffSources = new Map<string, DiffSource>()

  for (const base of allBases) {
    const oldEntry = oldByBase.get(base)
    const newEntry = newByBase.get(base)
    const oldContent = oldEntry?.content
    const newContent = newEntry?.content
    const displayPath = newEntry?.path ?? oldEntry?.path ?? base
    const oldSize = oldContent?.length ?? 0
    const newSize = newContent?.length ?? 0

    if (!oldContent) {
      // 新增文件 — diff 推迟到异步阶段
      results.push({ path: displayPath, status: 'added', rows: [], additions: 0, deletions: 0, oldSize, newSize })
      diffSources.set(displayPath, { newContent })
    } else if (!newContent) {
      // 删除文件 — diff 推迟到异步阶段
      results.push({ path: displayPath, status: 'removed', rows: [], additions: 0, deletions: 0, oldSize, newSize })
      diffSources.set(displayPath, { oldContent })
    } else if (oldSize === newSize && areUint8ArraysEqual(oldContent, newContent)) {
      results.push({ path: displayPath, status: 'unchanged', rows: [], additions: 0, deletions: 0, oldSize, newSize })
    } else {
      // 修改文件 — diff 推迟到异步阶段
      results.push({ path: displayPath, status: 'modified', rows: [], additions: 0, deletions: 0, oldSize, newSize })
      diffSources.set(displayPath, { oldContent, newContent })
    }
  }

  return { result: { oldVersion, newVersion, files: results }, diffSources }
}
