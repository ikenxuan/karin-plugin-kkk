import { ReactNode } from "react";

//#region ../richtext/src/types.d.ts
/**
 * 富文本节点联合类型。
 *
 * 后端只需要生产这些纯 JSON 节点，前端可以再按 React、HTML、Canvas 等不同目标渲染。
 */
type RichTextNode = RichTextTextNode | RichTextEmojiNode | RichTextMentionNode | RichTextSearchKeywordNode | RichTextLineBreakNode;
/**
 * 富文本文档。
 *
 * `version` 用来给后续节点协议升级留空间；`platform` 用来标记来源平台，方便后续按平台做兼容。
 */
interface RichTextDocument {
  version: 1;
  platform?: string;
  nodes: RichTextNode[];
}
/** 普通文本节点。文本永远作为文本渲染，不会当成 HTML 执行。 */
interface RichTextTextNode {
  type: 'text';
  /** 文本内容 */
  text: string;
}
/** 行内表情节点。用于评论文本中夹杂的平台表情图片。 */
interface RichTextEmojiNode {
  type: 'emoji';
  /** 表情包名称 */
  name: string;
  /** 表情包链接 */
  src: string;
  /** 缩放倍率。默认 1，某些平台的大表情可以传 3。 */
  scale?: number;
}
/** @ 用户节点。`userId` 可选，因为有些平台只给历史昵称，不给稳定 ID。 */
interface RichTextMentionNode {
  type: 'mention';
  /** @ 用户的文本 */
  text: string;
  /** UID */
  userId?: string;
}
/**
 * 搜索词高亮节点。
 *
 * 某些平台会把“评论里的高亮搜索词”独立放在元数据里，而不是单独拼进 HTML。
 * 这里把它提升成独立节点，方便 template 渲染成高亮文本和上标搜索图标。
 */
interface RichTextSearchKeywordNode {
  type: 'searchKeyword';
  /** 搜索词 */
  text: string;
  /** 搜索ID */
  queryId?: string;
}
/** 换行节点。前端渲染成 `<br />`，避免后端直接拼 HTML。 */
interface RichTextLineBreakNode {
  type: 'lineBreak';
}
/** 平台表情定义，通常由 core 从平台表情接口转换得到。 */
interface RichTextEmojiDefinition {
  name: string;
  url: string;
  /** 缩放倍率。默认 1。 */
  scale?: number;
}
/** HTML 渲染器配置。React 渲染器复用这些 className 约定。 */
interface RichTextRenderOptions {
  mentionClassName?: string;
  mentionStyle?: string;
  emojiClassName?: string;
  searchKeywordClassName?: string;
  searchKeywordStyle?: string;
  searchKeywordIconClassName?: string;
}
//#endregion
//#region ../richtext/src/parse/index.d.ts
/** 创建普通文本节点。 */
declare const createTextNode: (text: string) => RichTextTextNode;
/** 创建行内表情节点。 */
declare const createEmojiNode: (name: string, src: string, options?: {
  scale?: number;
}) => RichTextEmojiNode;
/** 创建 @ 用户节点。 */
declare const createMentionNode: (text: string, userId?: string) => RichTextMentionNode;
/** 创建搜索词高亮节点。 */
declare const createSearchKeywordNode: (text: string, queryId?: string) => RichTextSearchKeywordNode;
/** 创建换行节点。 */
declare const createLineBreakNode: () => RichTextLineBreakNode;
/**
 * 合并相邻文本节点并丢弃空文本节点。
 *
 * 这样 core 可以按匹配过程简单 push 节点，最后统一整理，避免前端拿到碎片过多的数据。
 */
declare const normalizeRichTextNodes: (nodes: RichTextNode[]) => RichTextNode[];
/**
 * 创建富文本文档。
 *
 * 这里不会生成任何 HTML，只返回可序列化 JSON，适合作为 core 到 template 的数据边界。
 */
declare const createRichTextDocument: (nodes: RichTextNode[], options?: {
  platform?: string;
}) => RichTextDocument;
//#endregion
//#region ../richtext/src/react/index.d.ts
/**
 * 将富文本文档渲染成 React 节点。
 *
 * 这是 React 模板的首选渲染方式：
 * - 不经过 HTML 字符串；
 * - 不需要 `dangerouslySetInnerHTML`；
 * - 更适合 SSR，因为传输边界仍然是纯 JSON。
 */
declare const renderRichTextToReact: (document: RichTextDocument, options?: RichTextRenderOptions) => ReactNode;
//#endregion
export { RichTextTextNode as _, createRichTextDocument as a, normalizeRichTextNodes as c, RichTextEmojiNode as d, RichTextLineBreakNode as f, RichTextSearchKeywordNode as g, RichTextRenderOptions as h, createMentionNode as i, RichTextDocument as l, RichTextNode as m, createEmojiNode as n, createSearchKeywordNode as o, RichTextMentionNode as p, createLineBreakNode as r, createTextNode as s, renderRichTextToReact as t, RichTextEmojiDefinition as u };