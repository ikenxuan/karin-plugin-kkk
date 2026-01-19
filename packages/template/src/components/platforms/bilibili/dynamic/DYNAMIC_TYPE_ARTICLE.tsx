import { BookOpen, Clock, Eye, Hash, Heart, MessageCircle, Share2, Users } from 'lucide-react'
import React, { type JSX } from 'react'

import type { BilibiliArticleDynamicProps } from '../../../../types/platforms/bilibili/dynamic/article'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, DecorationCard, EnhancedImage } from '../shared'

/**
 * 获取字体级别对应的样式类名
 */
const getFontLevelClass = (fontLevel: string): string => {
  switch (fontLevel) {
    case 'light':
      return 'font-light'
    case 'regular':
      return 'font-normal'
    case 'medium':
      return 'font-medium'
    case 'semibold':
      return 'font-semibold'
    case 'bold':
      return 'font-bold'
    case 'extrabold':
      return 'font-extrabold'
    default:
      return 'font-normal'
  }
}

/**
 * 渲染文本节点
 */
const renderTextNode = (node: any, nodeIndex: number): React.ReactNode => {
  if (node.node_type !== 1 || !node.word) return null

  const { words, style = {}, font_level = 'regular', font_size = 17, color } = node.word

  // 构建样式类名 - 优先处理style中的样式
  const classNames: string[] = []

  // 根据font_size动态调整文字大小
  const fontSize = Math.max(32, font_size * 2.5) // 最小32px，按比例放大

  // 处理字体粗细 - style.bold 优先于 font_level
  if (style.bold) {
    classNames.push('font-bold')
  } else {
    classNames.push(getFontLevelClass(font_level))
  }

  if (style.italic) {
    classNames.push('italic')
  }

  if (style.strike) {
    classNames.push('line-through')
  }

  // 处理文字对齐
  if (style.align) {
    switch (style.align) {
      case 'center':
        classNames.push('text-center')
        break
      case 'right':
        classNames.push('text-right')
        break
      case 'justify':
        classNames.push('text-justify')
        break
      default:
        classNames.push('text-left')
    }
  }

  // 处理块级引用
  if (style.blockquote) {
    classNames.push('border-l-4', 'border-foreground-300', 'pl-4', 'italic', 'text-foreground-600')
  }

  // 处理标题级别
  if (style.header) {
    const headerLevel = Math.min(Math.max(1, style.header), 6)
    const headerSizes = {
      1: 'text-[72px] font-bold',
      2: 'text-[64px] font-bold',
      3: 'text-[56px] font-semibold',
      4: 'text-[48px] font-semibold',
      5: 'text-[40px] font-medium',
      6: 'text-[36px] font-medium'
    }
    classNames.push(headerSizes[headerLevel as keyof typeof headerSizes])
  }

  // 处理列表
  if (style.list) {
    if (style.list === 'bullet') {
      classNames.push('list-disc', 'list-inside')
    } else if (style.list === 'ordered') {
      classNames.push('list-decimal', 'list-inside')
    }
  }

  // 处理自定义类名
  if (style.class) {
    classNames.push(style.class)
  }

  const inlineStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`
  }

  // 处理颜色 - 优先使用node.word.color，其次是style.color
  if (color) {
    inlineStyle.color = color
  } else if (style.color) {
    inlineStyle.color = style.color
  }

  // 处理链接
  if (style.link) {
    return (
      <a
        key={nodeIndex}
        href={style.link}
        className={`${classNames.join(' ')} text-primary hover:text-primary-600 underline cursor-pointer`}
        style={inlineStyle}
        target="_blank"
        rel="noopener noreferrer"
      >
        {words}
      </a>
    )
  }

  // 处理标题元素
  if (style.header) {
    const HeaderTag = `h${Math.min(Math.max(1, style.header), 6)}` as keyof JSX.IntrinsicElements
    return (
      <HeaderTag key={nodeIndex} className={classNames.join(' ')} style={inlineStyle}>
        {words}
      </HeaderTag>
    )
  }

  // 处理块级引用
  if (style.blockquote) {
    return (
      <blockquote key={nodeIndex} className={classNames.join(' ')} style={inlineStyle}>
        {words}
      </blockquote>
    )
  }

  // 处理列表项
  if (style.list) {
    const ListTag = style.list === 'ordered' ? 'ol' : 'ul'
    return (
      <ListTag key={nodeIndex} className={classNames.join(' ')} style={inlineStyle}>
        <li>{words}</li>
      </ListTag>
    )
  }

  return (
    <span key={nodeIndex} className={classNames.join(' ')} style={inlineStyle}>
      {words}
    </span>
  )
}

/**
 * 渲染段落内容
 */
const renderParagraphContent = (paragraph: any, paragraphIndex: number): React.ReactNode => {
  const { para_type, text, pic } = paragraph

  switch (para_type) {
    case 1: // 普通文本段落
      if (!text?.nodes) return null
      return (
        <p key={paragraphIndex} className="mb-10 leading-[1.7]">
          {text.nodes.map((node: any, nodeIndex: number) =>
            renderTextNode(node, nodeIndex)
          )}
        </p>
      )

    case 4: // 引用段落
      if (!text?.nodes) return null
      return (
        <blockquote key={paragraphIndex} className="pl-6 my-8 border-l-8 border-default-400 text-foreground-700 leading-[1.7]">
          {text.nodes.map((node: any, nodeIndex: number) =>
            renderTextNode(node, nodeIndex)
          )}
        </blockquote>
      )

    case 2: // 图片段落
      if (!pic?.pics) return null
      return (
        <div key={paragraphIndex} className="my-6">
          {pic.pics.map((picItem: any, picIndex: number) => (
            <EnhancedImage
              key={picIndex}
              src={picItem.url}
              alt="专栏图片"
              className="mb-2 w-full rounded-4xl"
            />
          ))}
        </div>
      )

    default:
      return null
  }
}

/**
 * 解析结构化专栏内容为 JSX 元素
 */
const parseOpusContent = (opus: any): React.ReactNode => {
  try {
    if (!opus?.content?.paragraphs) {
      return null
    }

    return opus.content.paragraphs.map((paragraph: any, index: number) =>
      renderParagraphContent(paragraph, index)
    )
  } catch (error) {
    console.error('解析结构化专栏内容失败:', error)
    return null
  }
}

/**
 * 清理和转换HTML内容，移除B站的class并应用自定义样式
 */
const sanitizeHtmlContent = (htmlString: string): string => {
  try {
    let processed = htmlString

    // Step 1: 先处理 B站的颜色类，转换为内联样式
    const colorMap: Record<string, string> = {
      'color-pink-01': '#FF6699',
      'color-pink-02': '#FF85C0',
      'color-pink-03': '#FFA0D0',
      'color-pink-04': '#FFB8E0',
      'color-blue-01': '#00A1D6',
      'color-blue-02': '#00B5E5',
      'color-blue-03': '#33C5F3',
      'color-purple-01': '#9B59B6',
      'color-yellow-01': '#FFC107',
      'color-orange-01': '#FF6600',
      'color-red-01': '#FF0000',
      'color-green-01': '#00C853'
    }

    // 将颜色类转换为内联样式
    Object.entries(colorMap).forEach(([className, color]) => {
      // 处理 class="color-xxx"
      processed = processed.replace(
        new RegExp(`class="${className}"`, 'gi'),
        `style="color: ${color}"`
      )
      // 处理 class="xxx color-xxx"
      processed = processed.replace(
        new RegExp(`class="([^"]*?)\\s*${className}\\s*([^"]*?)"`, 'gi'),
        (match, before, after) => {
          const otherClasses = `${before} ${after}`.trim()
          if (otherClasses) {
            return `class="${otherClasses}" style="color: ${color}"`
          }
          return `style="color: ${color}"`
        }
      )
    })

    // Step 2: 移除 contenteditable 和剩余的 class 属性
    processed = processed.replace(/\s+contenteditable="[^"]*"/gi, '')
    processed = processed.replace(/\s+contenteditable='[^']*'/gi, '')
    processed = processed.replace(/\s+contenteditable(?=\s|>)/gi, '')
    processed = processed.replace(/\s+class="[^"]*"/gi, '')
    processed = processed.replace(/\s+class='[^']*'/gi, '')

    // Step 3: 修复图片协议 (// -> https://)
    processed = processed.replace(/src="\/\//gi, 'src="https://')

    // Step 4: 为标签添加样式类 - 使用函数来保留原有属性
    const addClassToTag = (html: string, tagName: string, className: string, extraAttrs: string = ''): string => {
      // 匹配有属性的标签 - 将 class 放在最后，避免覆盖其他属性
      html = html.replace(
        new RegExp(`<${tagName}\\s+([^>]*?)>`, 'gi'),
        (match, attrs) => {
          const extra = extraAttrs ? extraAttrs + ' ' : ''
          return `<${tagName} ${extra}${attrs} class="${className}">`
        }
      )
      // 匹配无属性的标签
      html = html.replace(
        new RegExp(`<${tagName}>`, 'gi'),
        `<${tagName}${extraAttrs ? ' ' + extraAttrs : ''} class="${className}">`
      )
      return html
    }

    // 图片 - 添加防盗链
    processed = addClassToTag(processed, 'img', 'w-full rounded-4xl', 'referrerpolicy="no-referrer" crossorigin="anonymous"')

    // figure 和 figcaption
    processed = addClassToTag(processed, 'figure', 'my-8 w-full')
    processed = addClassToTag(processed, 'figcaption', 'text-center text-[36px] text-foreground-600 mt-4')

    // 标题
    processed = addClassToTag(processed, 'h1', 'text-[72px] font-bold mb-10 leading-[1.4]')
    processed = addClassToTag(processed, 'h2', 'text-[64px] font-bold mb-10 leading-[1.4]')
    processed = addClassToTag(processed, 'h3', 'text-[56px] font-semibold mb-8 leading-[1.4]')
    processed = addClassToTag(processed, 'h4', 'text-[48px] font-semibold mb-8 leading-[1.4]')
    processed = addClassToTag(processed, 'h5', 'text-[40px] font-medium mb-6 leading-[1.4]')
    processed = addClassToTag(processed, 'h6', 'text-[36px] font-medium mb-6 leading-[1.4]')

    // 段落
    processed = addClassToTag(processed, 'p', 'mb-10 leading-[1.7] text-[42px]')

    // 引用
    processed = addClassToTag(processed, 'blockquote', 'pl-6 my-8 border-l-8 border-default-400 text-foreground-700 leading-[1.7] text-[42px]')

    // 列表
    processed = addClassToTag(processed, 'ul', 'list-disc list-inside mb-8 text-[42px] leading-[1.7]')
    processed = addClassToTag(processed, 'ol', 'list-decimal list-inside mb-8 text-[42px] leading-[1.7]')
    processed = addClassToTag(processed, 'li', 'mb-4')

    // 加粗和斜体
    processed = addClassToTag(processed, 'strong', 'font-bold')
    processed = addClassToTag(processed, 'b', 'font-bold')
    processed = addClassToTag(processed, 'em', 'italic')
    processed = addClassToTag(processed, 'i', 'italic')

    // 链接
    processed = addClassToTag(processed, 'a', 'text-primary hover:text-primary-600 underline', 'target="_blank" rel="noopener noreferrer"')

    // 代码
    processed = addClassToTag(processed, 'code', 'px-2 py-1 bg-default-100 rounded text-[38px] font-mono')
    processed = addClassToTag(processed, 'pre', 'p-6 bg-default-100 rounded-2xl overflow-x-auto my-6')

    // 表格
    processed = addClassToTag(processed, 'table', 'w-full border-collapse my-8 text-[38px]')
    processed = addClassToTag(processed, 'thead', 'bg-default-100')
    processed = addClassToTag(processed, 'tr', 'border-b border-default-200')
    processed = addClassToTag(processed, 'th', 'p-4 text-left font-semibold')
    processed = addClassToTag(processed, 'td', 'p-4')

    // 分隔线
    processed = addClassToTag(processed, 'hr', 'my-8 border-default-300')

    return processed
  } catch (error) {
    console.error('清理HTML内容失败:', error)
    return htmlString
  }
}

/**
 * B站专栏动态用户信息组件
 */
const BilibiliArticleUserInfo: React.FC<BilibiliArticleDynamicProps> = React.memo((props) => {
  return (
    <div className='flex gap-10 items-center px-0 pb-0 pl-24'>
      <div className='relative'>
        <EnhancedImage
          src={props.data.avatar_url}
          alt='用户头像'
          className='w-32 h-32 rounded-full shadow-medium'
          isCircular
        />
        {props.data.frame && (
          <EnhancedImage
            src={props.data.frame}
            alt='头像框'
            className='absolute inset-0 transform scale-180'
          />
        )}
      </div>
      <div className='flex flex-col gap-8 text-7xl'>
        <div className='text-6xl font-bold select-text text-foreground'>
          <span dangerouslySetInnerHTML={{ __html: props.data.username }} />
        </div>
        <div className='flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500'>
          <Clock size={36} className='text-time' />
          {props.data.create_time}
        </div>
      </div>
      {props.data.decoration_card && (
        <div className='pl-40'>
          <DecorationCard html={props.data.decoration_card.card_url} />
        </div>
      )}
    </div>
  )
})

/**
 * B站专栏动态内容组件
 */
const BilibiliArticleContent: React.FC<BilibiliArticleDynamicProps> = React.memo((props) => {
  // 解析专栏正文内容
  const articleContentElements = React.useMemo(() => {
    if (props.data.opus) {
      return parseOpusContent(props.data.opus)
    }
    return null
  }, [props.data.opus])

  // 处理HTML字符串内容
  const sanitizedHtmlContent = React.useMemo(() => {
    const isJson = (() => { try { return typeof props.data.content === 'string' && !!JSON.parse(props.data.content) } catch { return false } })()
    
    if (props.data.content && typeof props.data.content === 'string' && !isJson) {
      return sanitizeHtmlContent(props.data.content)
    }
    return null
  }, [props.data.content])

  return (
    <div className='flex flex-col px-20 w-full leading-relaxed'>
      {/* 专栏标题 */}
      <div className='mb-8'>
        <h1 className='text-[60px] font-bold leading-[1.4] tracking-[0.5px] text-foreground select-text'>
          <CommentText content={props.data.title} />
        </h1>
      </div>

      {/* 专栏封面 */}
      {props.data.banner_url && (
        <div className='mb-8'>
          <EnhancedImage
            src={props.data.banner_url}
            alt='专栏封面'
            className='w-full rounded-2xl shadow-medium'
          />
        </div>
      )}

      {/* 专栏摘要 */}
      {props.data.summary && (
        <div className='mb-8'>
          <CommentText
            content={props.data.summary}
            className='text-[48px] leading-[1.6] text-foreground-600 select-text'
          />
        </div>
      )}

      {/* 专栏正文内容 - 结构化数据 */}
      {articleContentElements && (
        <div className='flex-col items-center mb-8 select-text'>
          {articleContentElements}
        </div>
      )}

      {/* 专栏正文内容 - HTML字符串 */}
      {sanitizedHtmlContent && (
        <div
          className='flex-col items-center mb-8 select-text'
          dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
        />
      )}
    </div>
  )
})

/**
 * B站专栏动态状态组件
 */
const BilibiliArticleStatus: React.FC<BilibiliArticleDynamicProps> = React.memo((props) => {
  return (
    <div className='flex flex-col gap-12 px-20 py-16'>
      {/* 互动数据 */}
      <div className='flex gap-24 items-center'>
        <div className='flex gap-3 items-center text-[42px] text-like'>
          <Heart size={32} />
          <span className='font-medium'>{props.data.stats.like || 0}</span>
          <span className='text-[36px] text-foreground-600'>点赞</span>
        </div>
        <div className='flex gap-3 items-center text-[42px] text-comment'>
          <MessageCircle size={32} />
          <span className='font-medium'>{props.data.stats.reply || 0}</span>
          <span className='text-[36px] text-foreground-600'>评论</span>
        </div>
        <div className='flex gap-3 items-center text-[42px] text-share'>
          <Share2 size={32} />
          <span className='font-medium'>{props.data.stats.dynamic || 0}</span>
          <span className='text-[36px] text-foreground-600'>分享</span>
        </div>
      </div>

      {/* 专栏统计信息 */}
      <div className='flex gap-20 items-center text-[36px] text-default-700'>
        <div className='flex gap-2 items-center'>
          <Eye size={28} className='text-view' />
          <span className='font-medium'>阅读量</span>
          <span className='font-bold text-foreground'>{props.data.stats.view || 0}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <BookOpen size={28} className='text-coin' />
          <span className='font-medium'>收藏</span>
          <span className='font-bold text-foreground'>{props.data.stats.favorite || 0}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Heart size={28} className='text-like' />
          <span className='font-medium'>获赞</span>
          <span className='font-bold text-foreground'>{props.data.stats.like || 0}</span>
        </div>
      </div>
    </div>
  )
})

/**
 * B站专栏动态底部信息组件
 */
const BilibiliArticleFooter: React.FC<BilibiliArticleDynamicProps> = React.memo((props) => {
  return (
    <div className='flex justify-between items-start px-20 pb-20'>
      {/* 左侧：用户信息 */}
      <div className='flex flex-col gap-12'>
        {/* 头像和用户名/UID */}
        <div className='flex gap-12 items-start'>
          {/* 头像 */}
          <div className='relative shrink-0'>
            <EnhancedImage
              src={props.data.avatar_url}
              alt='头像'
              className='rounded-full shadow-medium w-35 h-auto'
              isCircular
            />
            {props.data.frame && (
              <EnhancedImage
                src={props.data.frame}
                alt='头像框'
                className='absolute inset-0 transform scale-175'
              />
            )}
          </div>
          
          {/* 用户名和UID - 纵向排列 */}
          <div className='flex flex-col gap-5'>
            <div className='text-7xl font-bold select-text text-foreground'>
              <span dangerouslySetInnerHTML={{ __html: props.data.username }} />
            </div>
            <div className='flex gap-2 items-center text-4xl text-default-500'>
              <Hash size={32} className='text-default-400' />
              <span className='select-text'>UID: {props.data.user_shortid}</span>
            </div>
          </div>
        </div>
        
        {/* 用户统计信息 */}
        <div className='text-3xl flex gap-6 items-center text-default-600'>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
            <div className='flex gap-1 items-center'>
              <Heart size={28} className='text-like' />
              <span className='text-default-400'>获赞</span>
            </div>
            <div className='w-full h-px bg-default-300' />
            <span className='select-text font-medium text-4xl'>{props.data.total_favorited}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
            <div className='flex gap-1 items-center'>
              <Eye size={28} className='text-view' />
              <span className='text-default-400'>关注</span>
            </div>
            <div className='w-full h-px bg-default-300' />
            <span className='select-text font-medium text-4xl'>{props.data.following_count}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
            <div className='flex gap-1 items-center'>
              <Users size={28} className='text-primary' />
              <span className='text-default-400'>粉丝</span>
            </div>
            <div className='w-full h-px bg-default-300' />
            <span className='select-text font-medium text-4xl'>{props.data.fans}</span>
          </div>
        </div>
      </div>

      {/* 右侧：二维码 */}
      <div className='flex flex-col items-center gap-4'>
        {props.qrCodeDataUrl
          ? (
            <img
              src={props.qrCodeDataUrl}
              alt='二维码'
              className='h-auto w-75 rounded-2xl'
            />
          )
          : (
            <div className='flex justify-center items-center rounded-2xl bg-default-100 w-100 h-100'>
              <span className='text-default-400'>二维码</span>
            </div>
          )}
      </div>
    </div>
  )
})

/**
 * B站专栏动态主组件
 */
export const BilibiliArticleDynamic: React.FC<BilibiliArticleDynamicProps> = React.memo((props) => {
  return (
    <DefaultLayout
      data={props.data}
      version={props.version}
      scale={props.scale}
    >
      <div className='p-4'>
        {/* 间距 */}
        <div className='h-25' />

        {/* 用户信息 */}
        <BilibiliArticleUserInfo {...props} />

        {/* 间距 */}
        <div className='h-15' />

        {/* 专栏内容 */}
        <BilibiliArticleContent {...props} />

        {/* 互动状态 */}
        <BilibiliArticleStatus {...props} />

        {/* 间距 */}
        <div className='h-23' />

        {/* 底部信息 */}
        <BilibiliArticleFooter {...props} />
      </div>
    </DefaultLayout>
  )
})

BilibiliArticleDynamic.displayName = 'BilibiliArticleDynamic'

export default BilibiliArticleDynamic