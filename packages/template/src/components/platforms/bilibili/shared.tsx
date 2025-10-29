import React, { useState } from 'react'

/**
 * 处理评论文本中的图片防盗链问题
 * @param htmlContent HTML内容
 * @returns 处理后的HTML内容
 */
export const processCommentHTML = (htmlContent: string): string => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return ''
  }

  let processed = htmlContent

  // 使用正则表达式匹配所有img标签并添加防盗链属性
  processed = processed.replace(
    /<img([^>]*?)>/gi,
    '<img$1 referrerpolicy="no-referrer" crossorigin="anonymous">'
  )

  // 替换不可见的分隔符字符 ¨ (U+00A8) 为更明显的点 • (U+2022)
  // ·  •  ●  -
  processed = processed.replace(/¨/g, '•')

  return processed
}

/**
 * 评论文本组件属性接口
 */
interface CommentTextProps {
  /** HTML内容 */
  content: string
  /** CSS类名 */
  className?: string
  /** 内联样式 */
  style?: React.CSSProperties
}

/**
 * 评论文本组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const CommentText: React.FC<CommentTextProps> = ({ content, className, style }) => {
  const processedContent = processCommentHTML(content)

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

/**
 * 增强型图片组件属性接口
 */
interface EnhancedImageProps {
  /** 图片源地址 */
  src: string
  /** 替代文本 */
  alt: string
  /** CSS类名 */
  className?: string
  /** 占位符文本 */
  placeholder?: string
  /** 是否为圆形 */
  isCircular?: boolean
  /** 内联样式 */
  style?: React.CSSProperties
}

/**
 * 增强型图片组件
 * 主要功能:
 * 1. 图片加载失败时显示占位符
 * 2. 支持圆形和方形两种样式
 * 3. 自动处理防盗链(添加referrerPolicy和crossOrigin属性)
 */
export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  isCircular = false
}) => {
  const [hasError, setHasError] = useState(false)

  /**
   * 处理图片加载失败
   */
  const handleError = () => {
    setHasError(true)
  }

  if (!src || hasError) {
    return (
      <div className={`${className} ${isCircular ? 'rounded-full' : 'rounded-md'} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
        <span className='text-sm text-gray-400'>{placeholder || alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy='no-referrer'
      crossOrigin='anonymous'
    />
  )
}

/**
 * 使用图片代理服务处理 URL
 * 这里使用 images.weserv.nl 作为代理服务
 */
const proxyImageUrl = (url: string): string => {
  if (!url || !url.startsWith('http')) return url

  // 使用 images.weserv.nl 代理服务
  // 这是一个免费的图片代理服务，可以绕过防盗链
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`
}

/**
 * 处理 HTML 中的图片 URL，包括 img 标签和 CSS background-image
 */
const processHtmlImages = (html: string): string => {
  let processed = html

  // 处理 CSS background-image 中的 URL
  processed = processed.replace(
    /background-image:\s*url\(['"]?(https?:\/\/[^'")\s]+)['"]?\)/gi,
    (match, url) => {
      const proxiedUrl = proxyImageUrl(url)
      return `background-image: url('${proxiedUrl}')`
    }
  )

  // 处理 img 标签的 src 属性
  processed = processed.replace(
    /<img([^>]*?)src=['"]?(https?:\/\/[^'">\s]+)['"]?([^>]*?)>/gi,
    (match, before, url, after) => {
      const proxiedUrl = proxyImageUrl(url)
      return `<img${before}src="${proxiedUrl}"${after} referrerpolicy="no-referrer" crossorigin="anonymous">`
    }
  )

  return processed
}

/**
 * 装饰卡片组件
 * 用于渲染后端传递的 HTML 内容，并自动处理其中 img 标签和背景图片的防盗链
 */
export const DecorationCard: React.FC<{ html: string }> = ({ html }) => {
  const processedHtml = processHtmlImages(html)

  return (
    <div
      className='font-bilifont'
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  )
}
