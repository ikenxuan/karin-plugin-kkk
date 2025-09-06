import React, { useState } from 'react'
import clsx from 'clsx'

/**
 * 处理评论文本中的图片防盗链问题
 * @param htmlContent HTML内容
 * @returns 处理后的HTML内容
 */
export const processCommentHTML = (htmlContent: string): string => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return ''
  }

  // 使用正则表达式匹配所有img标签并添加防盗链属性
  return htmlContent.replace(
    /<img([^>]*?)>/gi,
    '<img$1 referrerpolicy="no-referrer" crossorigin="anonymous">'
  )
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
        <span className="text-sm text-gray-400">{placeholder || alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
  )
}