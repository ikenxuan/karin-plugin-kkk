import { APPLE_EMOJI_64_FILES } from './emojiAssets.generated'

/**
 * Unicode emoji 文本分词。
 *
 * 目标：把评论文本里的 Unicode emoji 序列（含肤色修饰、ZWJ 组合、国旗、keycap、tag 序列）
 * 切成 emoji 节点图片化——容器内没有系统 emoji 字体，纯字体渲染会显示成方格。
 *
 * 职责边界：
 * - 本模块只负责「哪些字符是 emoji、对应数据集里哪个文件」，图源文件清单来自生成的
 *   `APPLE_EMOJI_64_FILES`（与 emoji-datasource-apple 包内 `img/apple/64/` 一一对应）；
 * - src 的具体形态（data: URL 等）由宿主通过 `setUnicodeEmojiSrcResolver` 注入——
 *   richtext 保持零 Node 依赖，浏览器端（ktr 开发面板）不注册解析器时自动退化为纯文本。
 *
 * 匹配本身刻意宽松（Extended_Pictographic），是否有图由文件清单 + 解析器双重把关：
 * 未命中的序列一律回退为文本，宁可不上图也不出死图。
 */

/**
 * 裸用时保持文本呈现的字符。™ © ® 在正文里几乎总是符号而非表情；
 * 带显式 VS16（©️ 等）时仍按 emoji 处理。
 */
const BARE_TEXT_SEQUENCE = new Set(['™', '©', '®'])

/**
 * emoji 序列：keycap（`#*0-9` + VS16? + U+20E3）、成对区域指示符（国旗）、
 * Extended_Pictographic 主体 + 肤色/VS16 修饰 + ZWJ 链 + 可选 tag 序列（英格兰等旗）。
 */
const EMOJI_SEQUENCE_RE =
  /(?:[#*0-9]️?⃣)|(?:\p{Regional_Indicator}{2})|(?:\p{Extended_Pictographic}(?:[\u{1F3FB}-\u{1F3FF}]|️)?(?:‍\p{Extended_Pictographic}(?:[\u{1F3FB}-\u{1F3FF}]|️)?)*(?:[\u{E0020}-\u{E007E}]+\u{E007F})?)/gu

/** emoji-data 命名规则：小写十六进制、至少 4 位、`-` 连接。 */
const toFilename = (sequence: string): string =>
  Array.from(sequence)
    .map((ch) => (ch.codePointAt(0) as number).toString(16).padStart(4, '0'))
    .join('-')

/**
 * 依次尝试的文件名形态：原样 → 补 VS16 → 去 VS16。
 * 数据集里 ❤ 只落盘为 `2764-fe0f`、keycap 只落盘为 `0039-fe0f-20e3`，
 * 而评论原文大量是裸 ❤（无 VS16），补 VS16 这一步专门兜住这类高频裸序列。
 */
const filenameCandidates = (sequence: string): string[] => {
  const codePoints = Array.from(sequence).map((ch) => ch.codePointAt(0) as number)
  const candidates = [toFilename(sequence)]

  if (!codePoints.includes(0xfe0f)) {
    // keycap 的 VS16 固定在 U+20E3 之前，其余序列追加在尾部
    const insertAt = codePoints[codePoints.length - 1] === 0x20e3 ? codePoints.length - 1 : codePoints.length
    const withFe0f = [...codePoints.slice(0, insertAt), 0xfe0f, ...codePoints.slice(insertAt)]
    candidates.push(withFe0f.map((cp) => cp.toString(16).padStart(4, '0')).join('-'))
  } else {
    candidates.push(
      codePoints
        .filter((cp) => cp !== 0xfe0f)
        .map((cp) => cp.toString(16).padStart(4, '0'))
        .join('-')
    )
  }

  return candidates
}

export type UnicodeEmojiSrcResolver = (filename: string) => string | null

let emojiSrcResolver: UnicodeEmojiSrcResolver | null = null

/**
 * 注册 emoji 图源解析器（文件名 → 可直接用于 `<img src>` 的 URL）。
 * 传 `null` 注销；未注册时 emoji 一律保持文本。由宿主（core 运行时）在启动时注册。
 */
export const setUnicodeEmojiSrcResolver = (resolver: UnicodeEmojiSrcResolver | null): void => {
  emojiSrcResolver = resolver
}

export type UnicodeEmojiPart =
  | { kind: 'text'; text: string }
  | {
      kind: 'emoji'
      /** 原文中的序列，用作 alt */ sequence: string
      /** 数据集内命中的文件名（不含扩展名） */ filename: string
      /** 解析出的图源 URL */ src: string
    }

/** 把文本切分为文本段与 emoji 段；emoji 段保证解析出了 src，未命中图源的序列回退为文本。 */
export const splitUnicodeEmoji = (text: string): UnicodeEmojiPart[] => {
  if (!emojiSrcResolver) {
    return [{ kind: 'text', text }]
  }

  const parts: UnicodeEmojiPart[] = []
  let lastIndex = 0

  EMOJI_SEQUENCE_RE.lastIndex = 0
  for (let match = EMOJI_SEQUENCE_RE.exec(text); match !== null; match = EMOJI_SEQUENCE_RE.exec(text)) {
    if (match.index > lastIndex) {
      parts.push({ kind: 'text', text: text.slice(lastIndex, match.index) })
    }

    const sequence = match[0]
    // 显式文本呈现选择器（U+FE0E）：尊重调用方的文本意图
    const filename =
      sequence.includes('︎') || isBareTextSequence(sequence)
        ? null
        : (filenameCandidates(sequence).find((c) => APPLE_EMOJI_64_FILES.has(c)) ?? null)
    const src = filename ? emojiSrcResolver(filename) : null

    if (filename && src) {
      parts.push({ kind: 'emoji', sequence, filename, src })
    } else {
      parts.push({ kind: 'text', text: sequence })
    }

    lastIndex = match.index + sequence.length
  }
  if (lastIndex < text.length) {
    parts.push({ kind: 'text', text: text.slice(lastIndex) })
  }

  // 裸 ™ © ® 等回退与相邻文本合并，避免碎片段；同时尊重它们的文本呈现意图
  const merged: UnicodeEmojiPart[] = []
  for (const part of parts) {
    const prev = merged[merged.length - 1]
    if (part.kind === 'text' && prev?.kind === 'text') {
      prev.text += part.text
    } else {
      merged.push(part)
    }
  }
  return merged
}

/**
 * 判断裸序列是否保持文本呈现（™ © ® 等符号在正文里按文字渲染）。
 * 带显式 VS16 的序列不受此限。
 */
export const isBareTextSequence = (sequence: string): boolean => !sequence.includes('️') && BARE_TEXT_SEQUENCE.has(sequence)
