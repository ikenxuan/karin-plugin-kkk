import { BookOpen, Clock, Eye, Heart, MessageCircle, Share2 } from 'lucide-react'
import React, { type JSX } from 'react'

import type { BilibiliArticleDynamicProps } from '../../../../types/platforms/bilibili/dynamic/article'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage } from '../shared'

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
          <div dangerouslySetInnerHTML={{ __html: props.data.decoration_card.card_url }} />
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

      {/* 专栏正文内容 */}
      {articleContentElements && (
        <div className='flex-col items-center mb-8 select-text'>
          {articleContentElements}
        </div>
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
    <div className='flex justify-between items-end px-20 py-12'>
      <div className='flex flex-col gap-6'>
        {/* B站Logo */}
        <div className='flex items-center'>
          <img
            src='/image/bilibili/bilibili-light.png'
            alt='B站Logo'
            className='w-80 h-auto'
          />  
        </div>
        
        {/* 发布时间和渲染时间 */}
        <div className='flex flex-col gap-2 text-[32px] text-default-500'>
          <div>发布于 {props.data.create_time}</div>
          <div>图片渲染于 {props.data.render_time}</div>
        </div>
            
        {/* 提示文字 */}
        <span className='text-[36px] text-default-600 font-medium'>
          长按识别二维码即可查看全文
        </span>
      </div>
      
      {/* 右侧信息 */}
      <div className='flex flex-col items-center gap-4 text-[32px]'>
        <div className='p-3 rounded-sm border-8 border-dashed border-default-300'>
          {props.qrCodeDataUrl
            ? (
              <img
                src={props.qrCodeDataUrl}
                alt='二维码'
                className='h-auto w-88'
              />
            )
            : (
              <div className='flex justify-center items-center rounded bg-default-100 w-88 h-88'>
                <span className='text-default-400'>二维码</span>
              </div>
            )}
        </div>
        
        {/* 专栏动态标识 */}
        <div className='text-[38px] font-semibold text-default-700'>
          {props.data.dynamicTYPE}
        </div>
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