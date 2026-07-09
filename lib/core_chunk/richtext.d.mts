import { A as RichTextVoteNode, C as RichTextParagraphNode, D as RichTextTextNode, E as RichTextSearchKeywordStyleConfig, O as RichTextTopicNode, S as RichTextNodeStyleConfig, T as RichTextSearchKeywordNode, _ as RichTextListItemNode, a as RichTextCodeBlockNode, b as RichTextMentionNode, c as RichTextEmojiNode, d as RichTextHorizontalRuleNode, f as RichTextImageNode, g as RichTextLinkCardNode, h as RichTextLineBreakNode, i as RichTextBlockquoteNode, j as RichTextWebLinkNode, k as RichTextViewPictureNode, l as RichTextHashtagNode, m as RichTextInlineStyle, n as RichTextAtNode, o as RichTextDocument, p as RichTextInlineNode, r as RichTextBlockNode, s as RichTextEmojiDefinition, t as renderRichTextToReact, u as RichTextHeadingNode, v as RichTextListNode, w as RichTextRenderOptions, x as RichTextNode, y as RichTextLotteryNode } from "./index-CZWy-8Jl.mjs";
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
declare const createImageNode: (src: string, alt?: string, caption?: string) => RichTextImageNode;
/** 创建水平分隔线节点。 */
declare const createHorizontalRuleNode: () => RichTextHorizontalRuleNode;
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
 * 创建 hashtag 节点。
 *
 * 纯文本高亮，不带任何图标。适用于抖音等平台的 #话题# 展示。
 */
declare const createHashtagNode: (text: string) => RichTextHashtagNode;
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
export { RichTextAtNode, RichTextBlockNode, RichTextBlockquoteNode, RichTextCodeBlockNode, RichTextDocument, RichTextEmojiDefinition, RichTextEmojiNode, RichTextHashtagNode, RichTextHeadingNode, RichTextHorizontalRuleNode, RichTextImageNode, RichTextInlineNode, RichTextInlineStyle, RichTextLineBreakNode, RichTextLinkCardNode, RichTextListItemNode, RichTextListNode, RichTextLotteryNode, RichTextMentionNode, RichTextNode, RichTextNodeStyleConfig, RichTextParagraphNode, RichTextRenderOptions, RichTextSearchKeywordNode, RichTextSearchKeywordStyleConfig, RichTextTextNode, RichTextTopicNode, RichTextViewPictureNode, RichTextVoteNode, RichTextWebLinkNode, createAtNode, createBlockquoteNode, createCodeBlockNode, createEmojiNode, createHashtagNode, createHeadingNode, createHorizontalRuleNode, createImageNode, createLineBreakNode, createLinkCardNode, createListItemNode, createListNode, createLotteryNode, createMentionNode, createParagraphNode, createRichTextDocument, createSearchKeywordNode, createTextNode, createTopicNode, createViewPictureNode, createVoteNode, createWebLinkNode, extractRichTextPlainText, normalizeRichTextNodes, renderRichTextToReact };