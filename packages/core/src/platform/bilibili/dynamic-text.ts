import {
  createAtNode,
  createEmojiNode,
  createLineBreakNode,
  createLotteryNode,
  createRichTextDocument,
  createTextNode,
  createTopicNode,
  createViewPictureNode,
  createVoteNode,
  createWebLinkNode,
  type RichTextDocument
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
      nodes.push(createTextNode(text))
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
