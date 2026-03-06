import { format } from 'date-fns'
import { Bookmark, Clock, Eye, Hash, Heart, MessageCircle, Share2, Users } from 'lucide-react'
import React from 'react'
import { LuFullscreen } from 'react-icons/lu'
import ReactMarkdown from 'react-markdown'

import type { DouyinArticleWorkProps } from '../../../types/platforms/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 抖音Logo头部组件
 */
const DouyinHeader: React.FC<{ useDarkTheme?: boolean }> = ({ useDarkTheme }) => {
  return (
    <div className='flex items-center px-12 py-15'>
      <div className='w-[39%] h-50 bg-cover bg-center bg-fixed'>
        <img
          src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
          alt='抖音Logo'
          className='object-contain w-full h-full'
        />
      </div>
      <span className='text-[65px] ml-4 text-foreground-600'>
        记录美好生活
      </span>
    </div>
  )
}

/**
 * 文章标题组件
 */
const TitleSection: React.FC<{ title: string; createTime: string; readTime: number }> = ({ title, createTime, readTime }) => {
  return (
    <div className='flex flex-col px-16 py-5'>
      <h1 className='text-8xl font-bold leading-relaxed mb-6 text-foreground select-text tracking-wide wrap-break-word'>
        {title}
      </h1>
      <div className='flex items-center gap-8 text-5xl text-foreground-500'>
        <div className='flex items-center gap-2'>
          <Clock className='w-10 h-10' />
          <span>{createTime}</span>
        </div>
        <span>·</span>
        <div className='flex items-center gap-2'>
          <Clock className='w-10 h-10 text-primary' />
          <span>阅读 {readTime} 分钟</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 文章内容组件
 */
const ContentSection: React.FC<{ markdown: string; images: DouyinArticleWorkProps['data']['images'] }> = ({ markdown, images }) => {
  // 创建图片URL映射
  const imageMap = new Map<string, string>()
  images.forEach(img => {
    imageMap.set(img.markdown_url, img.high_image_url)
  })

  // 预处理markdown：移除图片URL后的width/height参数
  // Douyin使用自定义语法: ![alt](url width=xxx height=xxx)
  // 需要转换为标准markdown: ![alt](url)
  const preprocessedMarkdown = markdown.replace(
    /!\[([^\]]*)\]\(([^\s)]+)(?:\s+width=\d+)?(?:\s+height=\d+)?\)/g,
    '![$1]($2)'
  )

  return (
    <div className='flex flex-col px-16 py-5'>
      <div className='prose prose-lg max-w-none text-foreground select-text'>
        <ReactMarkdown
          children={preprocessedMarkdown}
          components={{
            h1: ({ children }) => (
              <h1 className='text-8xl font-bold mb-8 mt-12 text-foreground'>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className='text-7xl font-bold mb-6 mt-10 text-foreground'>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className='text-6xl font-bold mb-5 mt-8 text-foreground'>{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className='text-5xl font-bold mb-4 mt-6 text-foreground'>{children}</h4>
            ),
            p: ({ children }) => (
              <p className='text-6xl leading-relaxed mb-6 text-foreground-800 tracking-wide'>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className='list-disc list-inside mb-6 text-6xl text-foreground-800'>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className='list-decimal list-inside mb-6 text-6xl text-foreground-800'>{children}</ol>
            ),
            li: ({ children }) => (
              <li className='mb-3 leading-relaxed'>{children}</li>
            ),
            img: ({ src, alt }) => {
              const highQualityUrl = src ? imageMap.get(src) || src : ''
              return (
                <div className='flex flex-col items-center my-8 w-full'>
                  <img
                    src={highQualityUrl}
                    alt={alt || '文章图片'}
                    className='rounded-2xl shadow-large w-full h-auto'
                  />
                  {alt && alt !== '图片描述' && (
                    <span className='text-5xl text-foreground-500 mt-4'>{alt}</span>
                  )}
                </div>
              )
            },
            strong: ({ children }) => (
              <strong className='font-bold text-foreground'>{children}</strong>
            ),
            em: ({ children }) => (
              <em className='italic text-foreground-700'>{children}</em>
            ),
            blockquote: ({ children }) => (
              <blockquote className='border-l-4 border-primary pl-6 my-6 text-foreground-700 italic'>
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className='bg-default-100 px-3 py-1 rounded text-5xl text-primary font-mono'>
                {children}
              </code>
            )
          }}
        />
      </div>
    </div>
  )
}

/**
 * 作品信息组件
 */
const InfoSection: React.FC<DouyinArticleWorkProps> = (props) => {
  return (
    <div className='flex flex-col px-16 py-5'>
      <div className='flex items-center gap-6 text-5xl text-foreground-500 font-light mb-2.5 select-text'>
        <div className='flex gap-2 items-center'>
          <Heart className='w-11 h-11 text-like' />
          <span>{props.data.dianzan}点赞</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <MessageCircle className='w-11 h-11 text-comment' />
          <span>{props.data.pinglun}评论</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Bookmark className='w-11 h-11' />
          <span>{props.data.shouchang}收藏</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Share2 className='w-11 h-11 text-success' />
          <span>{props.data.share}分享</span>
        </div>
      </div>
      <div className='flex items-center gap-2 text-5xl text-foreground-500 font-light select-text'>
        <LuFullscreen className='w-11 h-11 text-time' />
        <span>图片生成于: {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</span>
      </div>
    </div>
  )
}

/**
 * 用户信息组件
 */
const UserInfoSection: React.FC<DouyinArticleWorkProps> = (props) => {
  return (
    <div className='flex flex-col gap-12'>
      {/* 头像和用户名/抖音号 */}
      <div className='flex gap-12 items-start'>
        {/* 头像 */}
        <div className='relative shrink-0'>
          <div className='flex justify-center items-center bg-white rounded-full w-35 h-35'>
            <img
              src={props.data.avater_url}
              alt='头像'
              className='rounded-full w-33 h-33 shadow-large'
            />
          </div>
        </div>
        
        {/* 用户名和抖音号 - 纵向排列 */}
        <div className='flex flex-col gap-5'>
          <div className='text-7xl font-bold select-text text-foreground'>
            @{props.data.username}
          </div>
          <div className='flex gap-2 items-center text-4xl text-default-500'>
            <Hash className='w-8 h-8 text-default-400' />
            <span className='select-text'>抖音号: {props.data.抖音号}</span>
          </div>
        </div>
      </div>
      
      {/* 用户统计信息 */}
      <div className='text-3xl flex gap-6 items-center text-default-600'>
        <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
          <div className='flex gap-1 items-center'>
            <Heart className='w-7 h-7 text-like' />
            <span className='text-default-400'>获赞</span>
          </div>
          <div className='w-full h-px bg-default-300' />
          <span className='select-text font-medium text-4xl'>{props.data.获赞}</span>
        </div>
        <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
          <div className='flex gap-1 items-center'>
            <Eye className='w-7 h-7 text-view' />
            <span className='text-default-400'>关注</span>
          </div>
          <div className='w-full h-px bg-default-300' />
          <span className='select-text font-medium text-4xl'>{props.data.关注}</span>
        </div>
        <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
          <div className='flex gap-1 items-center'>
            <Users className='w-7 h-7 text-primary' />
            <span className='text-default-400'>粉丝</span>
          </div>
          <div className='w-full h-px bg-default-300' />
          <span className='select-text font-medium text-4xl'>{props.data.粉丝}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 抖音文章作品组件
 */
export const DouyinArticleWork: React.FC<Omit<DouyinArticleWorkProps, 'templateType' | 'templateName'>> = (props) => {
  return (
    <DefaultLayout {...props}>
      <div>
        {/* 头部Logo */}
        <div className='h-15' />
        <DouyinHeader useDarkTheme={props.data.useDarkTheme} />
        <div className='h-15' />

        {/* 文章标题 */}
        <TitleSection title={props.data.title} createTime={props.data.create_time} readTime={props.data.read_time} />
        <div className='h-5' />

        {/* 文章内容 */}
        <ContentSection markdown={props.data.markdown} images={props.data.images} />
        <div className='h-15' />

        {/* 作品信息 */}
        <InfoSection {...props} />
        <div className='h-25' />

        <div className='flex flex-col gap-10 px-0 pt-25'>
          {/* 底部信息区域 */}
          <div className='flex justify-between items-start px-20 pb-20'>
            {/* 左侧：用户信息 */}
            <UserInfoSection {...props} />

            {/* 右侧：二维码 */}
            <div className='flex flex-col items-center gap-4'>
              {props.qrCodeDataUrl
                ? (
                  <img
                    src={props.qrCodeDataUrl}
                    alt='二维码'
                    className='h-auto w-75 rounded-xl'
                  />
                )
                : (
                  <div className='flex justify-center items-center rounded-2xl bg-default-100 w-100 h-100'>
                    <span className='text-default-400'>二维码</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default DouyinArticleWork
