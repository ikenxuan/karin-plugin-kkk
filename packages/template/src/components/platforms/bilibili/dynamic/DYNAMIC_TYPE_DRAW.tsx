import clsx from 'clsx'
import { Clock, Eye, Hash, Heart, MessageCircle, Share2, Users } from 'lucide-react'
import React from 'react'
import { LuFullscreen } from 'react-icons/lu'

import type {
  BilibiliDynamicContentProps,
  BilibiliDynamicFooterProps,
  BilibiliDynamicProps,
  BilibiliDynamicStatusProps,
  BilibiliDynamicUserInfoProps
} from '../../../../types/platforms/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage } from '../shared'

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
          <span dangerouslySetInnerHTML={{ __html: props.username }} />
        </div>
        <div className='flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500'>
          <Clock size={36} className='text-time' />
          {props.create_time}
        </div>
      </div>
      {props.decoration_card && (
        <div className='pl-40'>
          <div dangerouslySetInnerHTML={{ __html: props.decoration_card }} />
        </div>
      )}
    </div>
  )
}

/**
 * B站动态内容组件
 */
const BilibiliDynamicContent: React.FC<BilibiliDynamicContentProps> = (props) => {
  // 根据配置决定布局方式
  const getLayoutType = () => {
    if (!props.image_url || props.image_url.length === 0) return 'auto'
      
    switch (props.imageLayout) {
      case 'vertical':
        return 'vertical'
      case 'waterfall':
        return 'waterfall'
      case 'grid':
        return 'grid'
      case 'auto':
      default:
        // 自动布局逻辑
        if (props.image_url.length <= 4) return 'vertical'
        if (props.image_url.length >= 9) return 'grid'
        return 'waterfall'
    }
  }
    
  const layoutType = getLayoutType()

  return (
    <>
      {/* 文本内容 */}
      <div className='flex flex-col px-20 w-full leading-relaxed'>
        <div className='relative items-center text-5xl tracking-wider wrap-break-word text-foreground'>
          <CommentText
            className={clsx(
              'text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text',
              '[&_svg]:inline [&_svg]:mb-4!',
              '[&_img]:mb-3 [&_img]:inline [&_img]:mx-1'
            )}
            content={props.text}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>
        <div className='h-15' />
      </div>

      {/* 图片内容 */}
      {props.image_url && Array.isArray(props.image_url) && props.image_url.length > 0 && (
        <div className='px-20'>
          {/* 九宫格布局 */}
          {layoutType === 'grid' && (
            <div className='grid grid-cols-3 gap-4 w-full'>
              {props.image_url.slice(0, 9).map((img, index) => (
                <div key={index} className='overflow-hidden rounded-2xl aspect-square shadow-medium'>
                  <EnhancedImage
                    src={img.image_src}
                    alt={`图片${index + 1}`}
                    className='object-cover w-full h-full'
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* 瀑布流布局 */}
          {layoutType === 'waterfall' && (
            <div className='flex gap-4 w-full'>
              {/* 左列 */}
              <div className='flex flex-col flex-1 gap-4'>
                {props.image_url
                  .filter((_, index) => index % 2 === 0)
                  .map((img, arrayIndex) => {
                    const originalIndex = arrayIndex * 2
                    return (
                      <div key={originalIndex} className='overflow-hidden rounded-2xl shadow-medium'>
                        <EnhancedImage
                          src={img.image_src}
                          alt={`图片${originalIndex + 1}`}
                          className='object-cover w-full h-auto'
                        />
                      </div>
                    )
                  })}
              </div>
              {/* 右列 */}
              <div className='flex flex-col flex-1 gap-4'>
                {props.image_url
                  .filter((_, index) => index % 2 === 1)
                  .map((img, arrayIndex) => {
                    const originalIndex = arrayIndex * 2 + 1
                    return (
                      <div key={originalIndex} className='overflow-hidden rounded-2xl shadow-medium'>
                        <EnhancedImage
                          src={img.image_src}
                          alt={`图片${originalIndex + 1}`}
                          className='object-cover w-full h-auto'
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
          
          {/* 垂直布局（逐张上下排列） */}
          {layoutType === 'vertical' && (
            props.image_url.map((img, index) => (
              <React.Fragment key={index}>
                <div className='flex flex-col items-center'>
                  <div className='flex overflow-hidden flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large'>
                    <EnhancedImage
                      src={img.image_src}
                      alt='封面'
                      className='object-contain w-full h-full rounded-3xl'
                    />
                  </div>
                </div>
                <div className='h-18' />
              </React.Fragment>
            ))
          )}
          
          {/* 底部间距 */}
          {(layoutType === 'waterfall' || layoutType === 'grid') && <div className='h-18' />}
        </div>
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
      <div className='flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600'>
        <div className='flex gap-2 items-center'>
          <Heart size={48} className='text-like' />
          {props.dianzan}点赞
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <MessageCircle size={48} className='text-primary text-comment' />
          {props.pinglun}评论
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Share2 size={48} className='text-success' />
          {props.share}分享
        </div>
      </div>
      <div className='flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600'>
        <LuFullscreen size={48} className='text-time' />  
        图片生成于: {props.render_time}
      </div>
      <div className='h-3' />
    </div>
  )
}

/**
 * B站动态底部信息组件
 */
const BilibiliDynamicFooter: React.FC<BilibiliDynamicFooterProps & { avatar_url: string; frame?: string; username: string }> = (props) => {
  return (
    <div className='flex justify-between items-start px-20 pb-20'>
      {/* 左侧：用户信息 */}
      <div className='flex flex-col gap-12'>
        {/* 头像和用户名/UID */}
        <div className='flex gap-12 items-start'>
          {/* 头像 */}
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
          
          {/* 用户名和UID - 纵向排列 */}
          <div className='flex flex-col gap-5'>
            <div className='text-7xl font-bold select-text text-foreground'>
              <span dangerouslySetInnerHTML={{ __html: props.username }} />
            </div>
            <div className='flex gap-2 items-center text-4xl text-default-500'>
              <Hash size={32} className='text-default-400' />
              <span className='select-text'>UID: {props.user_shortid}</span>
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
            <span className='select-text font-medium text-4xl'>{props.total_favorited}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
            <div className='flex gap-1 items-center'>
              <Eye size={28} className='text-view' />
              <span className='text-default-400'>关注</span>
            </div>
            <div className='w-full h-px bg-default-300' />
            <span className='select-text font-medium text-4xl'>{props.following_count}</span>
          </div>
          <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100'>
            <div className='flex gap-1 items-center'>
              <Users size={28} className='text-primary' />
              <span className='text-default-400'>粉丝</span>
            </div>
            <div className='w-full h-px bg-default-300' />
            <span className='select-text font-medium text-4xl'>{props.fans}</span>
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
}

/**
 * B站动态组件
 */
export const BilibiliDrawDynamic: React.FC<Omit<BilibiliDynamicProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  return (
    <DefaultLayout {...props}>
      <div className='p-4'>
        {/* 间距 */}
        <div className='h-25' />

        {/* 用户信息 */}
        <BilibiliDynamicUserInfo
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          username={props.data.username}
          create_time={props.data.create_time}
          decoration_card={props.data.decoration_card}
        />

        {/* 间距 */}
        <div className='h-15' />

        {/* 动态内容 */}
        <BilibiliDynamicContent
          text={props.data.text}
          image_url={props.data.image_url}
          imageLayout={props.data.imageLayout}
        />

        {/* 动态状态 */}
        <BilibiliDynamicStatus
          dianzan={props.data.dianzan}
          pinglun={props.data.pinglun}
          share={props.data.share}
          render_time={props.data.render_time}
        />

        {/* 间距 */}
        <div className='h-23' />

        {/* 底部信息 */}
        <BilibiliDynamicFooter
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          username={props.data.username}
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

BilibiliDrawDynamic.displayName = 'BilibiliDrawDynamic'

export default BilibiliDrawDynamic