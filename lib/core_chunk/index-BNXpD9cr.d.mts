import { ReactNode } from "react";

//#region ../richtext/src/types.d.ts
/**
 * 富文本节点联合类型。
 *
 * 后端只需要生产这些纯 JSON 节点，前端可以再按 React、HTML、Canvas 等不同目标渲染。
 */
type RichTextNode = RichTextInlineNode | RichTextBlockNode;
/** 行内节点。 */
type RichTextInlineNode = RichTextTextNode | RichTextEmojiNode | RichTextMentionNode | RichTextSearchKeywordNode | RichTextLineBreakNode | RichTextTopicNode | RichTextAtNode | RichTextLotteryNode | RichTextWebLinkNode | RichTextVoteNode | RichTextViewPictureNode;
/** 块级节点。 */
type RichTextBlockNode = RichTextHeadingNode | RichTextParagraphNode | RichTextImageNode | RichTextBlockquoteNode | RichTextListNode | RichTextListItemNode | RichTextCodeBlockNode | RichTextLinkCardNode;
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
/** 行内文本样式。 */
interface RichTextInlineStyle {
  /** 粗体 */
  bold?: boolean;
  /** 斜体 */
  italic?: boolean;
  /** 删除线 */
  strike?: boolean;
  /** 文字颜色（CSS color 值） */
  color?: string;
  /** 超链接地址 */
  link?: string;
  /** 字体大小（CSS font-size 值） */
  fontSize?: string;
}
/** 普通文本节点。文本永远作为文本渲染，不会当成 HTML 执行。 */
interface RichTextTextNode {
  type: 'text';
  /** 文本内容 */
  text: string;
  /** 可选的行内样式 */
  style?: RichTextInlineStyle;
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
 * 某些平台会把"评论里的高亮搜索词"独立放在元数据里，而不是单独拼进 HTML。
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
/** 话题节点。B站动态中以 #话题名称# 形式呈现，带彩色文字。 */
interface RichTextTopicNode {
  type: 'topic';
  /** 话题名称（不含#号） */
  text: string;
}
/** @用户节点。用于动态描述中的@提及。 */
interface RichTextAtNode {
  type: 'at';
  /** @用户的显示文本 */
  text: string;
  /** 用户ID（可选） */
  userId?: string;
}
/** 抽奖节点。带SVG图标，显示抽奖信息。 */
interface RichTextLotteryNode {
  type: 'lottery';
  /** 显示文本 */
  text: string;
}
/** 网页链接节点。带SVG图标，显示链接的标题。 */
interface RichTextWebLinkNode {
  type: 'webLink';
  /** 显示文本（如网页标题） */
  text: string;
  /** 跳转链接 */
  jumpUrl: string;
}
/** 投票节点。带SVG图标，显示投票标题。 */
interface RichTextVoteNode {
  type: 'vote';
  /** 投票标题 */
  text: string;
}
/** 查看图片节点。带SVG图标，提示用户点击查看图片。 */
interface RichTextViewPictureNode {
  type: 'viewPicture';
  /** 显示文本 */
  text: string;
}
/** 标题节点。 */
interface RichTextHeadingNode {
  type: 'heading';
  /** 标题级别 1-6 */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** 子节点 */
  nodes: RichTextNode[];
}
/** 段落节点。 */
interface RichTextParagraphNode {
  type: 'paragraph';
  /** 子节点 */
  nodes: RichTextNode[];
}
/** 图片节点。 */
interface RichTextImageNode {
  type: 'image';
  /** 图片地址 */
  src: string;
  /** 替代文本 */
  alt?: string;
}
/** 引用块节点。 */
interface RichTextBlockquoteNode {
  type: 'blockquote';
  /** 子节点 */
  nodes: RichTextNode[];
}
/** 列表节点。 */
interface RichTextListNode {
  type: 'list';
  /** 是否为有序列表 */
  ordered: boolean;
  /** 列表项 */
  items: RichTextListItemNode[];
}
/** 列表项节点。 */
interface RichTextListItemNode {
  type: 'listItem';
  /** 子节点 */
  nodes: RichTextNode[];
}
/** 代码块节点。 */
interface RichTextCodeBlockNode {
  type: 'codeBlock';
  /** 代码语言 */
  language?: string;
  /** 代码内容 */
  content: string;
}
/** 链接卡片节点。 */
interface RichTextLinkCardNode {
  type: 'linkCard';
  /** 卡片标题/显示文本 */
  title: string;
  /** 跳转链接 */
  url: string;
  /** 卡片类型标识 */
  cardType?: string;
  /** 额外元数据 */
  meta?: Record<string, any>;
}
/** 平台表情定义，通常由 core 从平台表情接口转换得到。 */
interface RichTextEmojiDefinition {
  name: string;
  url: string;
  /** 缩放倍率。默认 1。 */
  scale?: number;
}
/**
 * 单个富文本节点的样式配置。
 *
 * 平台模板传入它们想要的 className，渲染器直接应用。
 * 只允许 className，不允许 style 对象——视觉样式全部由 Tailwind 接管。
 */
interface RichTextNodeStyleConfig {
  /** Tailwind className，控制该节点的视觉样式 */
  className?: string;
}
/**
 * 搜索关键词节点需要额外的图标 className（普通节点不需要）。
 */
interface RichTextSearchKeywordStyleConfig extends RichTextNodeStyleConfig {
  /** 搜索图标的额外 className */
  iconClassName?: string;
}
/**
 * HTML 渲染器配置。React 渲染器复用这些 className 约定。
 *
 * 传入的 className 会覆盖渲染器内部对这些节点的默认样式。
 * 视觉样式全部由 Tailwind className 表达，渲染器只负责结构。
 */
interface RichTextRenderOptions {
  /** @提及节点 */
  mention?: RichTextNodeStyleConfig;
  /** 搜索关键词节点（高亮词） */
  searchKeyword?: RichTextSearchKeywordStyleConfig;
  /** 话题节点 */
  topic?: RichTextNodeStyleConfig;
  /** @用户节点 */
  at?: RichTextNodeStyleConfig;
  /** 抽奖节点 */
  lottery?: RichTextNodeStyleConfig;
  /** 网页链接节点 */
  webLink?: RichTextNodeStyleConfig;
  /** 投票节点 */
  vote?: RichTextNodeStyleConfig;
  /** 查看图片节点 */
  viewPicture?: RichTextNodeStyleConfig;
  /** 代码块节点 */
  codeBlock?: RichTextNodeStyleConfig;
  /** 链接卡片节点 */
  linkCard?: RichTextNodeStyleConfig;
  /** 图标缩放比例，默认 1。用于在不同字体大小下保持图标比例一致。 */
  iconScale?: number;
}
//#endregion
//#region ../richtext/src/parse/index.d.ts
/** 创建普通文本节点。 */
declare const createTextNode: (text: string, style?: RichTextInlineStyle) => RichTextTextNode;
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
/** 创建话题节点。 */
declare const createTopicNode: (text: string) => RichTextTopicNode;
/** 创建 @ 用户节点。 */
declare const createAtNode: (text: string, userId?: string) => RichTextAtNode;
/** 创建抽奖节点。 */
declare const createLotteryNode: (text: string) => RichTextLotteryNode;
/** 创建网页链接节点。 */
declare const createWebLinkNode: (text: string, jumpUrl: string) => RichTextWebLinkNode;
/** 创建投票节点。 */
declare const createVoteNode: (text: string) => RichTextVoteNode;
/** 创建查看图片节点。 */
declare const createViewPictureNode: (text: string) => RichTextViewPictureNode;
/** 创建标题节点。 */
declare const createHeadingNode: (level: 1 | 2 | 3 | 4 | 5 | 6, nodes: RichTextNode[]) => RichTextHeadingNode;
/** 创建段落节点。 */
declare const createParagraphNode: (nodes: RichTextNode[]) => RichTextParagraphNode;
/** 创建图片节点。 */
declare const createImageNode: (src: string, alt?: string) => RichTextImageNode;
/** 创建引用块节点。 */
declare const createBlockquoteNode: (nodes: RichTextNode[]) => RichTextBlockquoteNode;
/** 创建列表节点。 */
declare const createListNode: (ordered: boolean, items: RichTextListItemNode[]) => RichTextListNode;
/** 创建列表项节点。 */
declare const createListItemNode: (nodes: RichTextNode[]) => RichTextListItemNode;
/** 创建代码块节点。 */
declare const createCodeBlockNode: (content: string, language?: string) => RichTextCodeBlockNode;
/** 创建链接卡片节点。 */
declare const createLinkCardNode: (title: string, url: string, options?: {
  cardType?: string;
  meta?: Record<string, any>;
}) => RichTextLinkCardNode;
/**
 * 合并相邻文本节点并丢弃空文本节点。
 *
 * 这样 core 可以按匹配过程简单 push 节点，最后统一整理，避免前端拿到碎片过多的数据。
 */
declare const normalizeRichTextNodes: (nodes: RichTextNode[]) => RichTextNode[];
/**
 * 从富文本文档中提取纯文本内容。
 *
 * 遍历所有节点，收集包含 text 字段的文本内容。
 * lineBreak 节点映射为空格（不参与长度计数），图片节点被忽略。
 */
declare const extractRichTextPlainText: (document: RichTextDocument) => string;
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
export { RichTextEmojiNode as A, RichTextMentionNode as B, normalizeRichTextNodes as C, RichTextCodeBlockNode as D, RichTextBlockquoteNode as E, RichTextLineBreakNode as F, RichTextSearchKeywordNode as G, RichTextNodeStyleConfig as H, RichTextLinkCardNode as I, RichTextTopicNode as J, RichTextSearchKeywordStyleConfig as K, RichTextListItemNode as L, RichTextImageNode as M, RichTextInlineNode as N, RichTextDocument as O, RichTextInlineStyle as P, RichTextListNode as R, extractRichTextPlainText as S, RichTextBlockNode as T, RichTextParagraphNode as U, RichTextNode as V, RichTextRenderOptions as W, RichTextVoteNode as X, RichTextViewPictureNode as Y, RichTextWebLinkNode as Z, createTextNode as _, createEmojiNode as a, createVoteNode as b, createLineBreakNode as c, createListNode as d, createLotteryNode as f, createSearchKeywordNode as g, createRichTextDocument as h, createCodeBlockNode as i, RichTextHeadingNode as j, RichTextEmojiDefinition as k, createLinkCardNode as l, createParagraphNode as m, createAtNode as n, createHeadingNode as o, createMentionNode as p, RichTextTextNode as q, createBlockquoteNode as r, createImageNode as s, renderRichTextToReact as t, createListItemNode as u, createTopicNode as v, RichTextAtNode as w, createWebLinkNode as x, createViewPictureNode as y, RichTextLotteryNode as z };