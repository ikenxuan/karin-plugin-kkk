import { diffChars, diffLines, diffWords } from 'diff'

export type DiffGranularity = 'word' | 'char'

interface WordDiff {
  type: 'equal' | 'add' | 'remove'
  value: string
}

interface DiffSide {
  lineNum?: number
  content: string
  wordDiffs?: WordDiff[]
}

export interface DiffRow {
  type: 'equal' | 'add' | 'remove' | 'change' | 'skip'
  left?: DiffSide
  right?: DiffSide
  oldStart?: number
  oldCount?: number
  newStart?: number
  newCount?: number
}

export interface ComputeResult {
  rows: DiffRow[]
  additions: number
  deletions: number
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

function computeFileDiff (oldContent: string, newContent: string, granularity: DiffGranularity = 'word'): ComputeResult {
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

self.onmessage = (e: MessageEvent) => {
  const { oldText, newText, path, granularity } = e.data
  try {
    const result = computeFileDiff(oldText, newText, granularity)
    self.postMessage({ path, result })
  } catch (err) {
    self.postMessage({ path, error: err instanceof Error ? err.message : String(err) })
  }
}
