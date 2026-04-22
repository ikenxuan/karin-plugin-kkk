import { renderRichTextToReact } from '@kkk/richtext'
import React from 'react'

import type {
  BilibiliDynamicFooterProps,
  BilibiliDynamicStatusProps,
  BilibiliDynamicUserInfoProps,
  BilibiliWordContentProps,
  BilibiliWordDynamicProps
} from '../../../../types/platforms/bilibili'
import { Icon } from '../../../common/Icon'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { DecorationCard, EnhancedImage, UsernameDisplay } from '../shared'
import { BilibiliAdditionalCard } from './AdditionalCard'

/**
 * B站动态用户信息组件
 */
const BilibiliDynamicUserInfo: React.FC<BilibiliDynamicUserInfoProps> = (props) => {
  return (
    <div className='flex gap-10 items-center px-0 pb-0 pl-24'>
      <div className='relative'>
        <EnhancedImage
          src={props.avatar_url}
          alt='头像'
          className='w-32 h-32 rounded-full shadow-medium'
          isCircular
        />
        {props.frame && (
          <EnhancedImage
            src={props.frame}
            alt='头像框'
            className='absolute inset-0 transform scale-180'
          />
        )}
      </div>
      <div className='flex flex-col gap-8 text-7xl'>
        <div className='text-6xl font-bold select-text text-foreground'>
          <UsernameDisplay metadata={props.usernameMeta} />
        </div>
        <div className='flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-muted'>
          <Icon icon="lucide:clock" width={36} className='text-time' />
          {props.create_time}
        </div>
      </div>
      {props.decoration_card && (
        <div className='pl-40'>
          <DecorationCard html={props.decoration_card} />
        </div>
      )}
    </div>
  )
}

/**
 * B站纯文动态内容组件
 */
const BilibiliWordContent: React.FC<BilibiliWordContentProps> = (props) => {
  return (
    <>
      {/* 文本内容 */}
      <div className='flex flex-col px-20 w-full leading-relaxed'>
        <div
          className='text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-5 select-text'
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {props.text && renderRichTextToReact(props.text, {
            at: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            topic: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            lottery: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            webLink: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            vote: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            viewPicture: { className: 'text-[#006A9E] dark:text-[#58B0D5]' }
          })}
        </div>
        <div className='h-15' />
      </div>

      {/* 相关卡片 */}
      {props.additional && (
        <BilibiliAdditionalCard additional={props.additional} />
      )}
    </>
  )
}

/**
 * B站动态状态组件
 */
const BilibiliDynamicStatus: React.FC<BilibiliDynamicStatusProps> = (props) => {
  return (
    <div className='flex flex-col gap-10 px-20 w-full leading-relaxed'>
      <div className='flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground/70'>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:heart" width={48} className='text-like' />
          {props.dianzan}点赞
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:message-circle" width={48} className='text-comment' />
          {props.pinglun}评论
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:share-2" width={48} className='text-success' />
          {props.share}分享
        </div>
      </div>
      <div className='flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground/70'>
        <Icon icon="lucide:maximize" width={48} className='text-time' />  
        图片生成于: {props.render_time}
      </div>
      <div className='h-3' />
    </div>
  )
}

/**
 * B站动态底部信息组件
 */
const BilibiliDynamicFooter: React.FC<BilibiliDynamicFooterProps & { avatar_url: string; frame?: string; usernameMeta: { name: string; vipStatus: number; nicknameColor: string | null } }> = (props) => {
  return (
    <div className='flex justify-between items-start px-20 pb-20'>
      <div className='flex flex-col gap-12'>
        <div className='flex gap-12 items-start'>
          <div className='relative shrink-0'>
            <EnhancedImage
              src={props.avatar_url}
              alt='头像'
              className='rounded-full shadow-medium w-35 h-auto'
              isCircular
            />
            {props.frame && (
              <EnhancedImage
                src={props.frame}
                alt='头像框'
                className='absolute inset-0 transform scale-180'
              />
            )}
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-7xl font-bold select-text text-foreground'>
              <UsernameDisplay metadata={props.usernameMeta} />
            </div>
            <div className='flex gap-2 items-center text-4xl text-muted'>
              <span className='select-text'>UID: {props.user_shortid}</span>
            </div>
          </div>
        </div>
        <div className='text-3xl flex gap-6 items-center text-foreground/70'>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
            <div className='flex gap-1 items-center'>
              <Icon icon="lucide:heart" width={28} className='text-like' />
              <span className='text-muted'>获赞</span>
            </div>
            <div className='w-full h-px bg-border' />
            <span className='select-text font-medium text-4xl'>{props.total_favorited}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
            <div className='flex gap-1 items-center'>
              <Icon icon="lucide:eye" width={28} className='text-view' />
              <span className='text-muted'>关注</span>
            </div>
            <div className='w-full h-px bg-border' />
            <span className='select-text font-medium text-4xl'>{props.following_count}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
            <div className='flex gap-1 items-center'>
              <Icon icon="lucide:users" width={28} className='text-accent' />
              <span className='text-muted'>粉丝</span>
            </div>
            <div className='w-full h-px bg-border' />
            <span className='select-text font-medium text-4xl'>{props.fans}</span>
          </div>
        </div>
      </div>
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
}

/**
 * B站纯文动态组件
 */
export const BilibiliWordDynamic: React.FC<Omit<BilibiliWordDynamicProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  return (
    <DefaultLayout {...props}>
      <div className='p-4'>
        <div className='h-25' />
        <BilibiliDynamicUserInfo
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          usernameMeta={props.data.usernameMeta}
          create_time={props.data.create_time}
          decoration_card={props.data.decoration_card}
        />
        <div className='h-15' />
        <BilibiliWordContent
          text={props.data.text}
          additional={props.data.additional}
        />
        <BilibiliDynamicStatus
          dianzan={props.data.dianzan}
          pinglun={props.data.pinglun}
          share={props.data.share}
          render_time={props.data.render_time}
        />
        <div className='h-23' />
        <BilibiliDynamicFooter
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          usernameMeta={props.data.usernameMeta}
          user_shortid={props.data.user_shortid}
          total_favorited={props.data.total_favorited}
          following_count={props.data.following_count}
          fans={props.data.fans}
          dynamicTYPE={props.data.dynamicTYPE}
          share_url={props.data.share_url}
          qrCodeDataUrl={props.qrCodeDataUrl}
        />
      </div>
    </DefaultLayout>
  )
})

BilibiliWordDynamic.displayName = 'BilibiliWordDynamic'

export default BilibiliWordDynamic
