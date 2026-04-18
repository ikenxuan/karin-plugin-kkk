/**
 * 富文本节点联合类型。
 *
 * 后端只需要生产这些纯 JSON 节点，前端可以再按 React、HTML、Canvas 等不同目标渲染。
 */
export type RichTextNode =
  | RichTextTextNode
  | RichTextEmojiNode
  | RichTextMentionNode
  | RichTextSearchKeywordNode
  | RichTextLineBreakNode

/**
 * 富文本文档。
 *
 * `version` 用来给后续节点协议升级留空间；`platform` 用来标记来源平台，方便后续按平台做兼容。
 */
export interface RichTextDocument {
  version: 1
  platform?: string
  nodes: RichTextNode[]
}

/** 普通文本节点。文本永远作为文本渲染，不会当成 HTML 执行。 */
export interface RichTextTextNode {
  type: 'text'
  /** 文本内容 */
  text: string
}

/** 行内表情节点。用于评论文本中夹杂的平台表情图片。 */
export interface RichTextEmojiNode {
  type: 'emoji'
  /** 表情包名称 */
  name: string
  /** 表情包链接 */
  src: string
  /** 缩放倍率。默认 1，某些平台的大表情可以传 3。 */
  scale?: number
}

/** @ 用户节点。`userId` 可选，因为有些平台只给历史昵称，不给稳定 ID。 */
export interface RichTextMentionNode {
  type: 'mention'
  /** @ 用户的文本 */
  text: string
  /** UID */
  userId?: string
}

/**
 * 搜索词高亮节点。
 *
 * 某些平台会把“评论里的高亮搜索词”独立放在元数据里，而不是单独拼进 HTML。
 * 这里把它提升成独立节点，方便 template 渲染成高亮文本和上标搜索图标。
 */
export interface RichTextSearchKeywordNode {
  type: 'searchKeyword'
  /** 搜索词 */
  text: string
  /** 搜索ID */
  queryId?: string
}

/** 换行节点。前端渲染成 `<br />`，避免后端直接拼 HTML。 */
export interface RichTextLineBreakNode {
  type: 'lineBreak'
}

/** 平台表情定义，通常由 core 从平台表情接口转换得到。 */
export interface RichTextEmojiDefinition {
  name: string
  url: string
  /** 缩放倍率。默认 1。 */
  scale?: number
}

/** HTML 渲染器配置。React 渲染器复用这些 className 约定。 */
export interface RichTextRenderOptions {
  mentionClassName?: string
  mentionStyle?: string
  emojiClassName?: string
  searchKeywordClassName?: string
  searchKeywordStyle?: string
  searchKeywordIconClassName?: string
}
