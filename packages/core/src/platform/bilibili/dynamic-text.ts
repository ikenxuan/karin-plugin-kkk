import {
  createAtNode,
  createBlockquoteNode,
  createEmojiNode,
  createHeadingNode,
  createImageNode,
  createLineBreakNode,
  createListItemNode,
  createListNode,
  createLotteryNode,
  createParagraphNode,
  createRichTextDocument,
  createTextNode,
  createTopicNode,
  createViewPictureNode,
  createVoteNode,
  createWebLinkNode,
  type RichTextDocument,
  type RichTextInlineStyle,
  type RichTextNode
} from '@kkk/richtext'

/**
 * 用户名元数据，用于传递 VIP 状态和颜色信息
 */
export interface UsernameMetadata {
  name: string
  vipStatus: number
  nicknameColor: string | null
}

/**
 * 检查用户VIP状态并返回用户名元数据
 */
export const getUsernameMetadata = (member: {
  name?: string
  vip?: { status?: number; nickname_color?: string }
}): UsernameMetadata => {
  const vip = member.vip
  const vipStatus = vip?.status ?? 0
  const nicknameColor = (vipStatus === 1 && vip?.nickname_color && vip?.nickname_color !== '') ? vip?.nickname_color : null
  const name = member.name ?? ''

  return {
    name,
    vipStatus,
    nicknameColor
  }
}

/**
 * 构建用户名的富文本。
 * VIP 用户显示彩色名称，普通用户显示灰色名称。
 */
export const buildUsernameRichText = (metadata: UsernameMetadata): RichTextDocument => {
  return createRichTextDocument([createTextNode(metadata.name)], {
    platform: 'bilibili'
  })
}

/**
 * 将 B 站动态正文解析成共享富文本 JSON。
 *
 * B站动态的 rich_text_nodes 包含以下类型：
 * - `topic` / `RICH_TEXT_NODE_TYPE_TOPIC`: 话题
 * - `RICH_TEXT_NODE_TYPE_AT`: @提及
 * - `RICH_TEXT_NODE_TYPE_LOTTERY`: 抽奖
 * - `RICH_TEXT_NODE_TYPE_WEB`: 网页链接
 * - `RICH_TEXT_NODE_TYPE_EMOJI`: 表情
 * - `RICH_TEXT_NODE_TYPE_VOTE`: 投票
 * - `RICH_TEXT_NODE_TYPE_VIEW_PICTURE`: 查看图片
 *
 * 核心逻辑：按 richTextNodes 原始顺序遍历，用节点文本在正文 text 中查找位置，
 * 来确定普通文本和富文本节点的边界。
 */
export const buildBilibiliDynamicRichText = (
  text: string,
  richTextNodes: Array<{
    type?: string
    orig_text?: string
    text?: string
    emoji?: {
      gif_url?: string
      icon_url?: string
      size?: number
    }
  }>
): RichTextDocument => {
  const nodes: Array<ReturnType<typeof createTextNode | typeof createEmojiNode | typeof createTopicNode | typeof createAtNode | typeof createLotteryNode | typeof createWebLinkNode | typeof createVoteNode | typeof createViewPictureNode | typeof createLineBreakNode>> = []

  if (!richTextNodes || !Array.isArray(richTextNodes) || richTextNodes.length === 0) {
    if (text) {
      const parts = text.split(/(\r?\n)/)
      for (const part of parts) {
        if (part === '\r\n' || part === '\n') {
          nodes.push(createLineBreakNode())
        } else if (part) {
          nodes.push(createTextNode(part))
        }
      }
    }
    return createRichTextDocument(nodes, { platform: 'bilibili' })
  }

  // 搜索函数：从给定起始位置开始查找子串在 text 中的位置
  const findInText = (searchText: string, startPos: number): number => {
    return text.indexOf(searchText, startPos)
  }

  let currentPos = 0 // 当前已处理的 text 位置

  for (const tag of richTextNodes) {
    const matchText = tag.orig_text || tag.text || ''
    if (!matchText) continue

    const matchPos = findInText(matchText, currentPos)
    if (matchPos === -1) continue

    // 添加匹配位置之前的普通文本
    if (matchPos > currentPos) {
      const beforeText = text.slice(currentPos, matchPos)
      // 按换行符分割，分别处理普通文本和换行
      const parts = beforeText.split(/(\r?\n)/)
      for (const part of parts) {
        if (part === '\r\n' || part === '\n') {
          nodes.push(createLineBreakNode())
        } else if (part) {
          nodes.push(createTextNode(part))
        }
      }
    }

    // 根据节点类型创建对应的 RichTextNode
    switch (tag.type) {
      case 'RICH_TEXT_NODE_TYPE_TEXT': {
        // TEXT 类型的 orig_text 可能包含换行符，需要单独处理
        const parts = matchText.split(/(\r?\n)/)
        for (const part of parts) {
          if (part === '\r\n' || part === '\n') {
            nodes.push(createLineBreakNode())
          } else if (part) {
            nodes.push(createTextNode(part))
          }
        }
        break
      }

      case 'topic':
      case 'RICH_TEXT_NODE_TYPE_TOPIC':
        nodes.push(createTopicNode(matchText))
        break

      case 'RICH_TEXT_NODE_TYPE_AT':
        nodes.push(createAtNode(matchText))
        break

      case 'RICH_TEXT_NODE_TYPE_LOTTERY':
        nodes.push(createLotteryNode(matchText))
        break

      case 'RICH_TEXT_NODE_TYPE_WEB':
        nodes.push(createWebLinkNode(tag.text || matchText, matchText))
        break

      case 'RICH_TEXT_NODE_TYPE_EMOJI': {
        const emojiUrl = tag.emoji?.gif_url || tag.emoji?.icon_url
        const scale = (tag.emoji?.size === 2 || tag.emoji?.size === 3) ? 2 : undefined
        if (emojiUrl) {
          nodes.push(createEmojiNode(matchText, emojiUrl, { scale }))
        } else {
          nodes.push(createTextNode(matchText))
        }
        break
      }

      case 'RICH_TEXT_NODE_TYPE_VOTE':
        nodes.push(createVoteNode(tag.text || matchText))
        break

      case 'RICH_TEXT_NODE_TYPE_VIEW_PICTURE':
        nodes.push(createViewPictureNode(matchText))
        break

      default:
        nodes.push(createTextNode(matchText))
        break
    }

    currentPos = matchPos + matchText.length
  }

  // 添加剩余文本
  if (currentPos < text.length) {
    const remainingText = text.slice(currentPos)
    const parts = remainingText.split(/(\r?\n)/)
    for (const part of parts) {
      if (part === '\r\n' || part === '\n') {
        nodes.push(createLineBreakNode())
      } else if (part) {
        nodes.push(createTextNode(part))
      }
    }
  }

  return createRichTextDocument(nodes, { platform: 'bilibili' })
}

/** 修复图片 URL 协议。 */
const fixImageUrl = (url: string): string => {
  if (url.startsWith('//')) {
    return `https:${url}`
  }
  return url
}

/** 从 opus word.style 提取 RichTextInlineStyle。 */
const extractWordStyle = (style: Record<string, any> = {}): RichTextInlineStyle => {
  const result: RichTextInlineStyle = {}
  if (style.bold) result.bold = true
  if (style.italic) result.italic = true
  if (style.strike) result.strike = true
  if (style.color && typeof style.color === 'string') result.color = style.color
  if (style.link && typeof style.link === 'string') result.link = style.link
  return result
}

/** 解析 opus 段落中的文本节点为 RichTextNode 数组。 */
const parseOpusTextNodes = (nodes: Array<{
  node_type?: number
  word?: {
    words?: string
    style?: Record<string, any>
    font_level?: string
    font_size?: number
    color?: string
  }
}>): RichTextNode[] => {
  const result: RichTextNode[] = []
  for (const node of nodes) {
    if (node.node_type !== 1 || !node.word) continue
    const words = node.word.words || ''
    if (!words) continue

    const style = extractWordStyle(node.word.style || {})
    // 合并节点自带的颜色
    if (node.word.color && !style.color) {
      style.color = node.word.color
    }

    // 按换行符拆分
    const parts = words.split(/(\r?\n)/)
    for (const part of parts) {
      if (part === '\r\n' || part === '\n') {
        result.push(createLineBreakNode())
      } else if (part) {
        result.push(createTextNode(part, Object.keys(style).length > 0 ? style : undefined))
      }
    }
  }
  return result
}

/**
 * 将 B 站专栏 opus 结构化数据解析为 RichTextDocument。
 */
const parseOpusToRichText = (opus: any): RichTextDocument => {
  const nodes: RichTextNode[] = []
  const paragraphs = opus?.content?.paragraphs
  if (!Array.isArray(paragraphs)) {
    return createRichTextDocument([], { platform: 'bilibili' })
  }

  let listBuffer: {
    ordered: boolean
    items: RichTextNode[]
  } | null = null

  const flushList = () => {
    if (listBuffer) {
      nodes.push(createListNode(listBuffer.ordered, listBuffer.items as any))
      listBuffer = null
    }
  }

  for (const paragraph of paragraphs) {
    const paraType = paragraph.para_type

    // 图片段落
    if (paraType === 2) {
      flushList()
      const pics = paragraph.pic?.pics
      if (Array.isArray(pics)) {
        for (const pic of pics) {
          if (pic.url) {
            nodes.push(createImageNode(fixImageUrl(pic.url), pic.alt || '专栏图片'))
          }
        }
      }
      continue
    }

    // 文本段落或引用段落
    const textNodes = paragraph.text?.nodes
    if (!Array.isArray(textNodes) || textNodes.length === 0) {
      continue
    }

    // 检查段落中是否有 header 样式
    const hasHeader = textNodes.some(
      (n: any) => n.word?.style?.header && n.node_type === 1
    )
    // 检查段落中是否有 list 样式
    const hasList = textNodes.some(
      (n: any) => n.word?.style?.list && n.node_type === 1
    )
    // 检查是否是引用段落
    const isBlockquote = paraType === 4

    const inlineNodes = parseOpusTextNodes(textNodes)
    if (inlineNodes.length === 0) continue

    if (hasHeader) {
      flushList()
      // 取第一个带 header 的级别
      const headerNode = textNodes.find((n: any) => n.word?.style?.header)
      const level = Math.min(Math.max(1, headerNode?.word?.style?.header || 1), 6) as 1 | 2 | 3 | 4 | 5 | 6
      nodes.push(createHeadingNode(level, inlineNodes))
    } else if (isBlockquote) {
      flushList()
      nodes.push(createBlockquoteNode(inlineNodes))
    } else if (hasList) {
      // 确定列表类型（bullet / ordered）
      const listNode = textNodes.find((n: any) => n.word?.style?.list)
      const listType = listNode?.word?.style?.list
      const ordered = listType === 'ordered'

      if (!listBuffer || listBuffer.ordered !== ordered) {
        flushList()
        listBuffer = { ordered, items: [] }
      }
      listBuffer.items.push(createListItemNode(inlineNodes))
    } else {
      flushList()
      nodes.push(createParagraphNode(inlineNodes))
    }
  }

  flushList()
  return createRichTextDocument(nodes, { platform: 'bilibili' })
}

/**
 * 尽力解析 HTML content 为 RichTextDocument。
 *
 * 这是一个 "best effort" 解析器，覆盖常见标签：
 * p, h1-h6, blockquote, ul/ol/li, img, br, b/strong, i/em, s/del, a, span(color)。
 */
const parseHtmlContentToRichText = (content: string): RichTextDocument => {
  const nodes: RichTextNode[] = []

  // 块级标签匹配：p, h1-h6, blockquote, ul, ol, li, img, br
  // 把 content 拆分成块级标记和普通文本
  const blockRegex = /<(\/?)(p|h([1-6])|blockquote|ul|ol|li|img|br)(\s[^>]*)?\/?>/gi

  let lastIndex = 0
  let match: RegExpExecArray | null
  const stack: Array<{ tag: string; level?: number; nodes: RichTextNode[] }> = []
  let currentInline: RichTextNode[] = []

  const flushInline = (): RichTextNode[] => {
    const result = currentInline
    currentInline = []
    return result
  }

  const pushBlock = (node: RichTextNode) => {
    if (stack.length > 0) {
      stack[stack.length - 1].nodes.push(node)
    } else {
      nodes.push(node)
    }
  }

  const parseInlineHtml = (html: string): RichTextNode[] => {
    const result: RichTextNode[] = []
    const inlineRegex = /<(\/?)(b|strong|i|em|s|del|a|span|br)(\s[^>]*)?>/gi
    let inlineLast = 0
    let inlineMatch: RegExpExecArray | null
    const styleStack: RichTextInlineStyle[] = []

    const currentStyle = (): RichTextInlineStyle | undefined => {
      if (styleStack.length === 0) return undefined
      return styleStack.reduce((acc, s) => ({ ...acc, ...s }), {})
    }

    const pushText = (text: string) => {
      if (!text) return
      const style = currentStyle()
      // 按换行符拆分
      const parts = text.split(/(\r?\n)/)
      for (const part of parts) {
        if (part === '\r\n' || part === '\n') {
          result.push(createLineBreakNode())
        } else if (part) {
          result.push(createTextNode(part, style))
        }
      }
    }

    while ((inlineMatch = inlineRegex.exec(html)) !== null) {
      const before = html.slice(inlineLast, inlineMatch.index)
      pushText(before)

      const isClose = inlineMatch[1] === '/'
      const tag = inlineMatch[2].toLowerCase()
      const attrs = inlineMatch[3] || ''

      if (tag === 'br') {
        result.push(createLineBreakNode())
      } else if (!isClose) {
        const style: RichTextInlineStyle = {}
        if (tag === 'b' || tag === 'strong') style.bold = true
        if (tag === 'i' || tag === 'em') style.italic = true
        if (tag === 's' || tag === 'del') style.strike = true
        if (tag === 'a') {
          const hrefMatch = /href="([^"]*)"/.exec(attrs)
          if (hrefMatch) style.link = hrefMatch[1]
        }
        if (tag === 'span') {
          const colorMatch = /color:\s*([^;"]+)/.exec(attrs)
          if (colorMatch) style.color = colorMatch[1].trim()
          const styleAttrMatch = /style="([^"]*)"/.exec(attrs)
          if (styleAttrMatch) {
            const colorInStyle = /color:\s*([^;]+)/.exec(styleAttrMatch[1])
            if (colorInStyle) style.color = colorInStyle[1].trim()
          }
        }
        styleStack.push(style)
      } else {
        styleStack.pop()
      }

      inlineLast = inlineMatch.index + inlineMatch[0].length
    }

    pushText(html.slice(inlineLast))
    return result
  }

  while ((match = blockRegex.exec(content)) !== null) {
    // 块级标签之前的文本（如果在根层则忽略；如果在列表/引用内则作为文本）
    const before = content.slice(lastIndex, match.index)
    if (before && stack.length > 0) {
      // 将文本解析为行内节点并入栈顶
      const inlineNodes = parseInlineHtml(before)
      currentInline.push(...inlineNodes)
    }

    const isClose = match[1] === '/'
    const tag = match[2].toLowerCase()
    const level = match[3] ? parseInt(match[3], 10) : undefined
    const attrs = match[4] || ''

    if (!isClose) {
      if (tag === 'img') {
        const srcMatch = /src="([^"]*)"/.exec(attrs)
        if (srcMatch) {
          const src = fixImageUrl(srcMatch[1])
          const altMatch = /alt="([^"]*)"/.exec(attrs)
          const alt = altMatch ? altMatch[1] : '专栏图片'
          pushBlock(createImageNode(src, alt))
        }
      } else if (tag === 'br') {
        currentInline.push(createLineBreakNode())
      } else if (tag === 'li') {
        // 列表项开始：把之前积累的 currentInline 清空
        currentInline = []
        stack.push({ tag: 'li', nodes: [] })
      } else {
        stack.push({ tag, level: level as any, nodes: [] })
      }
    } else {
      // 结束标签
      if (tag === 'li') {
        // 结束前还有 currentInline 里的内容
        const inlineNodes = flushInline()
        const itemNodes = stack.pop()?.nodes || []
        pushBlock(createListItemNode([...itemNodes, ...inlineNodes]))
      } else if (tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
        const frame = stack.pop()
        const inlineNodes = flushInline()
        const childNodes = [...(frame?.nodes || []), ...inlineNodes]
        if (tag.startsWith('h') && frame?.level) {
          pushBlock(createHeadingNode(frame.level as any, childNodes))
        } else {
          pushBlock(createParagraphNode(childNodes))
        }
      } else if (tag === 'blockquote') {
        const frame = stack.pop()
        const inlineNodes = flushInline()
        pushBlock(createBlockquoteNode([...(frame?.nodes || []), ...inlineNodes]))
      } else if (tag === 'ul' || tag === 'ol') {
        const frame = stack.pop()
        const items = (frame?.nodes || []).filter(n => n.type === 'listItem')
        pushBlock(createListNode(tag === 'ol', items as any))
      }
    }

    lastIndex = match.index + match[0].length
  }

  // 尾部未闭合的普通文本
  const tail = content.slice(lastIndex)
  if (tail) {
    const inlineNodes = parseInlineHtml(tail)
    if (inlineNodes.length > 0) {
      if (stack.length === 0) {
        nodes.push(createParagraphNode(inlineNodes))
      } else {
        currentInline.push(...inlineNodes)
      }
    }
  }

  // 处理未闭合的栈（作为段落兜底）
  while (stack.length > 0) {
    const frame = stack.pop()
    if (!frame) continue
    const inlineNodes = flushInline()
    const childNodes = [...(frame.nodes || []), ...inlineNodes]
    if (frame.tag === 'li') {
      pushBlock(createListItemNode(childNodes))
    } else if (frame.tag.startsWith('h') && frame.level) {
      pushBlock(createHeadingNode(frame.level as any, childNodes))
    } else if (frame.tag === 'blockquote') {
      pushBlock(createBlockquoteNode(childNodes))
    } else {
      pushBlock(createParagraphNode(childNodes))
    }
  }

  return createRichTextDocument(nodes, { platform: 'bilibili' })
}

/**
 * 构建 B 站专栏动态的富文本文档。
 *
 * opus 和 content 互斥：优先 opus，其次 content，都没有返回空 document。
 */
export const buildBilibiliArticleRichText = (
  opus: any,
  content: string | undefined
): RichTextDocument => {
  if (opus?.content?.paragraphs) {
    return parseOpusToRichText(opus)
  }
  if (content) {
    return parseHtmlContentToRichText(content)
  }
  return createRichTextDocument([], { platform: 'bilibili' })
}
