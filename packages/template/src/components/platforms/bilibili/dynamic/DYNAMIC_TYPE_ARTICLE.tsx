import { Icon } from '@iconify/react'
import { renderRichTextToReact } from '@kkk/richtext'
import React from 'react'

import type { BilibiliArticleDynamicProps } from '../../../../types/platforms/bilibili/dynamic/article'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, DecorationCard, EnhancedImage, UsernameDisplay } from '../shared'

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
          <UsernameDisplay metadata={props.data.usernameMeta} />
        </div>
        <div className='flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-muted'>
          <Icon icon="lucide:clock" width={36} className='text-time' />
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
            className='text-[48px] leading-[1.6] text-foreground/70 select-text'
          />
        </div>
      )}

      {/* 专栏正文内容 */}
      {props.data.body && (
        <div className='text-5xl leading-relaxed flex-col items-center mb-8 select-text'>
          {renderRichTextToReact(props.data.body, {
            at: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            topic: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            webLink: { className: 'text-[#006A9E] dark:text-[#58B0D5] underline' },
            mention: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            lottery: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            vote: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            viewPicture: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            searchKeyword: {
              className: 'text-[#006A9E] dark:text-[#58B0D5]',
              iconClassName: 'text-[#006A9E] dark:text-[#58B0D5]'
            }
          })}
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
          <Icon icon="lucide:heart" width={32} />
          <span className='font-medium'>{props.data.stats.like || 0}</span>
          <span className='text-[36px] text-foreground/70'>点赞</span>
        </div>
        <div className='flex gap-3 items-center text-[42px] text-comment'>
          <Icon icon="lucide:message-circle" width={32} />
          <span className='font-medium'>{props.data.stats.reply || 0}</span>
          <span className='text-[36px] text-foreground/70'>评论</span>
        </div>
        <div className='flex gap-3 items-center text-[42px] text-share'>
          <Icon icon="lucide:share-2" width={32} />
          <span className='font-medium'>{props.data.stats.dynamic || 0}</span>
          <span className='text-[36px] text-foreground/70'>分享</span>
        </div>
      </div>

      {/* 专栏统计信息 */}
      <div className='flex gap-20 items-center text-[36px] text-foreground/80'>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:eye" width={28} className='text-view' />
          <span className='font-medium'>阅读量</span>
          <span className='font-bold text-foreground'>{props.data.stats.view || 0}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:book-open" width={28} className='text-coin' />
          <span className='font-medium'>收藏</span>
          <span className='font-bold text-foreground'>{props.data.stats.favorite || 0}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:heart" width={28} className='text-like' />
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
              <UsernameDisplay metadata={props.data.usernameMeta} />
            </div>
            <div className='flex gap-2 items-center text-4xl text-muted'>
              <Icon icon="lucide:hash" width={32} className='text-muted' />
              <span className='select-text'>UID: {props.data.user_shortid}</span>
            </div>
          </div>
        </div>
        
        {/* 用户统计信息 */}
        <div className='text-3xl flex gap-6 items-center text-foreground/70'>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
            <div className='flex gap-1 items-center'>
              <Icon icon="lucide:heart" width={28} className='text-like' />
              <span className='text-muted'>获赞</span>
            </div>
            <div className='w-full h-px bg-border' />
            <span className='select-text font-medium text-4xl'>{props.data.total_favorited}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
            <div className='flex gap-1 items-center'>
              <Icon icon="lucide:eye" width={28} className='text-view' />
              <span className='text-muted'>关注</span>
            </div>
            <div className='w-full h-px bg-border' />
            <span className='select-text font-medium text-4xl'>{props.data.following_count}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
            <div className='flex gap-1 items-center'>
              <Icon icon="lucide:users" width={28} className='text-accent' />
              <span className='text-muted'>粉丝</span>
            </div>
            <div className='w-full h-px bg-border' />
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
            <div className='flex justify-center items-center rounded-2xl bg-surface w-100 h-100'>
              <span className='text-muted'>二维码</span>
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