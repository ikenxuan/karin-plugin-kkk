import React, { type CSSProperties, type ReactNode } from 'react'

import type { RichTextDocument, RichTextNode, RichTextRenderOptions } from '../types'

/**
 * 限制图片来源协议。
 *
 * React 会自动转义文本和属性，但不会替我们判断 URL 协议是否安全，所以这里仍然做白名单。
 */
const sanitizeImageSource = (value: string): string | null => {
  const normalized = value.trim()
  if (!normalized) {
    return null
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized
  }

  if (/^data:image\/(?:png|jpe?g|gif|webp|avif);base64,[a-z0-9+/=]+$/i.test(normalized)) {
    return normalized
  }

  return null
}

/**
 * 富文本表情的默认排版。
 *
 * 这些规则属于 richtext 节点的渲染语义，不应该散落在各个平台模板里：
 * - 表情跟随当前文字大小缩放；
 * - 作为行内内容参与排版；
 * - 不撑破行高，也不突破当前文本块宽度。
 */
const getRichTextEmojiStyle = (scale: number = 1): CSSProperties => ({
  display: 'inline-block',
  height: `${1.5 * scale}em`,
  width: 'auto',
  verticalAlign: scale > 1 ? 'text-bottom' : 'middle',
  lineHeight: 1
})

/** 统一的搜索图标，避免 template 每次都自己重复拼 JSX。 */
const SearchKeywordIcon = ({ className }: { className?: string }) => {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: 'inline-flex',
        verticalAlign: 'super',
        marginLeft: '0.08em',
        lineHeight: 1
      }}
    >
      <svg
        viewBox='0 0 24 24'
        width='0.72em'
        height='0.72em'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='11' cy='11' r='7' />
        <path d='m20 20-3.5-3.5' />
      </svg>
    </span>
  )
}

/**
 * 将单个富文本节点渲染成 React 节点。
 *
 * 这里的设计重点是“只在 template 侧落地 UI 语义”：
 * - `core` 不需要依赖 React，也不用承担 JSX/SSR 运行时边界。
 * - React 负责文本与属性转义，我们只补上图片协议白名单。
 */
const renderNodeToReact = (
  node: RichTextNode,
  index: number,
  options: RichTextRenderOptions
): ReactNode => {
  switch (node.type) {
    case 'text':
      return node.text

    case 'lineBreak':
      return <br key={`br-${index}`} />

    case 'mention':
      return (
        <span
          key={`mention-${index}`}
          className={options.mentionClassName}
          data-richtext-node='mention'
          data-user-id={node.userId}
        >
          {node.text}
        </span>
      )

    case 'searchKeyword':
      return (
        <span
          key={`search-${index}`}
          className={options.searchKeywordClassName}
          data-richtext-node='searchKeyword'
          data-search-query-id={node.queryId}
        >
          <span>{node.text}</span>
          <SearchKeywordIcon className={options.searchKeywordIconClassName} />
        </span>
      )

    case 'emoji': {
      const safeSrc = sanitizeImageSource(node.src)
      if (!safeSrc) {
        return node.name
      }

      return (
        <img
          key={`emoji-${index}`}
          className={`${options.emojiClassName} mb-4 mx-1`}
          src={safeSrc}
          alt={node.name}
          style={getRichTextEmojiStyle(node.scale)}
          referrerPolicy='no-referrer'
          crossOrigin='anonymous'
          data-richtext-node='emoji'
        />
      )
    }

    default:
      return null
  }
}

/**
 * 将富文本文档渲染成 React 节点。
 *
 * 这是 React 模板的首选渲染方式：
 * - 不经过 HTML 字符串；
 * - 不需要 `dangerouslySetInnerHTML`；
 * - 更适合 SSR，因为传输边界仍然是纯 JSON。
 */
export const renderRichTextToReact = (
  document: RichTextDocument,
  options: RichTextRenderOptions = {}
): ReactNode => {
  return (
    <>
      {document.nodes.map((node, index) => renderNodeToReact(node, index, options))}
    </>
  )
}
