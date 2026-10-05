import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

// 引入即注册真实解析器（node_modules → data: URL）
import '@/module/utils/emojiAssets'
import {
  APPLE_EMOJI_64_FILES,
  createEmojiNode,
  createRichTextDocument,
  createTextNode,
  renderRichTextToReact,
  setUnicodeEmojiSrcResolver,
  splitUnicodeEmoji
} from '@kkk/richtext'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterAll, describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const emojiPkgDir = path.join(path.dirname(require.resolve('emoji-datasource-apple/package.json')), 'img', 'apple', '64')

afterAll(() => {
  // 注销解析器，避免污染其他测试文件的全局状态
  setUnicodeEmojiSrcResolver(null)
})

// 生成的清单与 emoji-datasource-apple 包内实际文件必须一一对应：
// gen:emoji 漏跑（清单过期）或数据版本不匹配时在这里炸
describe('emojiAssets.generated', () => {
  it('清单里的每个文件名都真实存在于数据包内', () => {
    for (const stem of APPLE_EMOJI_64_FILES) {
      expect(existsSync(path.join(emojiPkgDir, `${stem}.png`)), stem).toBe(true)
    }
  })
})

describe('splitUnicodeEmoji', () => {
  const filenameOf = (text: string): string | null => {
    const parts = splitUnicodeEmoji(text)
    expect(parts).toHaveLength(1)
    return parts[0].kind === 'emoji' ? parts[0].filename : null
  }

  it.each([
    ['👍', '1f44d'],
    ['👍🏿', '1f44d-1f3ff'],
    ['🇨🇳', '1f1e8-1f1f3'],
    ['9️⃣', '0039-fe0f-20e3'],
    ['❤️', '2764-fe0f'],
    ['⚠️', '26a0-fe0f'],
    ['™️', '2122-fe0f'],
    ['👨‍👩‍👧', '1f468-200d-1f469-200d-1f467']
  ])('%s → %s', (sequence, filename) => {
    expect(filenameOf(sequence)).toBe(filename)
  })

  it.each([
    ['❤', '2764-fe0f'], // 评论里大量裸 ❤，补 VS16 候选兜住
    ['⚠', '26a0-fe0f']
  ])('裸序列 %s 也命中图源', (sequence, filename) => {
    expect(filenameOf(sequence)).toBe(filename)
  })

  it.each([['™'], ['©'], ['®'], ['1f600'], ['→']])('%s 保持文本', (text) => {
    expect(filenameOf(text)).toBeNull()
  })

  it('中英混排按段切分且拼接无损', () => {
    const parts = splitUnicodeEmoji('中文🔥测试👍🏿end')
    expect(parts.map((part) => part.kind)).toEqual(['text', 'emoji', 'text', 'emoji', 'text'])
    expect(parts.map((part) => (part.kind === 'text' ? part.text : part.sequence)).join('')).toBe('中文🔥测试👍🏿end')
  })

  it('回退文本与相邻文本合并，不产生碎片段', () => {
    expect(splitUnicodeEmoji('xx™yy')).toEqual([{ kind: 'text', text: 'xx™yy' }])
  })
})

describe('createRichTextDocument 的 emoji 图片化', () => {
  it('真实解析器：emoji 节点携带 data: URL，data: 在图片来源白名单内', () => {
    const doc = createRichTextDocument([createTextNode('好耶🔥')])
    const emojiNode = doc.nodes.find((node) => node.type === 'emoji')
    expect(emojiNode).toMatchObject({ name: '🔥' })
    if (emojiNode?.type !== 'emoji') {
      return expect.unreachable()
    }
    expect(emojiNode.src).toMatch(/^data:image\/png;base64,[a-z0-9+/=]+$/i)
    expect(emojiNode.scale).toBe(0.8)
  })

  it('平台表情节点不受影响', () => {
    const doc = createRichTextDocument([createEmojiNode('小黄脸', 'https://i0.hdslb.com/bfs/emote/emote.png')])
    expect(doc.nodes).toHaveLength(1)
    expect(doc.nodes[0]).toMatchObject({ type: 'emoji', src: 'https://i0.hdslb.com/bfs/emote/emote.png' })
  })

  it('端到端 SSR：emoji 渲染为内联图，普通文本不受影响', () => {
    const html = renderToStaticMarkup(renderRichTextToReact(createRichTextDocument([createTextNode('好耶🔥中文')]), {}))
    expect(html).toContain('src="data:image/png;base64,')
    expect(html).toContain('alt="🔥"')
    expect(html).toContain('>中文</span>')
    expect(html).toContain('>好耶</span>')
  })
})
