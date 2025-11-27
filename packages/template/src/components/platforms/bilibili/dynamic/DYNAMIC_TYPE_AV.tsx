import { format } from 'date-fns'
import { Clock, Coins, Eye, Hash, Heart, MessageCircle, Share2, Users } from 'lucide-react'
import React from 'react'
import { LuFullscreen } from 'react-icons/lu'

import type {
  BilibiliVideoDynamicContentProps,
  BilibiliVideoDynamicFooterProps,
  BilibiliVideoDynamicHeaderProps,
  BilibiliVideoDynamicProps
} from '../../../../types/platforms/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage } from '../shared'

/**
 * B站视频动态头部组件
 * @param props - 头部组件属性
 */
const BilibiliVideoDynamicHeader: React.FC<BilibiliVideoDynamicHeaderProps> = () => {
  return (
    <>
      {/* 间距 */}
      <div className='h-20' />

      {/* B站Logo和标语 */}
      <div className='flex items-center pl-20 text-6xl text-default-500'>
        <img
          src='/image/bilibili/bilibili.png'
          alt='bilibili'
          className='h-auto w-120'
        />
        <span className='ml-8 text-5xl select-text'>
          你感兴趣的视频都在哔哩哔哩
        </span>
      </div>

      {/* 间距 */}
      <div className='h-20' />
    </>
  )
}

/**
 * B站视频动态内容组件
 * @param props - 内容组件属性
 */
const BilibiliVideoDynamicContent: React.FC<BilibiliVideoDynamicContentProps> = (props) => {
  return (
    <>
      {/* 视频封面 */}
      {props.image_url && (
        <>
          <div className='flex flex-col items-center'>
            <div className='flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large'>
              <EnhancedImage
                src={props.image_url}
                alt='封面'
                className='object-contain w-full h-full rounded-3xl'
              />
              {/* 播放图标覆盖层 */}
              <div className='flex absolute bottom-12 right-16'>
                <img
                  src='/image/bilibili/play.svg'
                  alt='播放图标'
                  className='w-40 h-40'
                />
              </div>
            </div>
          </div>
          <div className='h-5' />
        </>
      )}

      {/* 视频信息 */}
      <div className='flex flex-col w-full leading-relaxed px-21'>
        {/* 视频标题 */}
        <div className='relative items-center text-8xl font-bold tracking-wider wrap-break-word text-foreground'>
          <CommentText
            className='text-[80px] font-bold tracking-[1.5px] leading-normal whitespace-pre-wrap text-foreground select-text'
            content={props.text}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>

        {/* 间距 */}
        <div className='h-10' />

        {/* 视频描述 */}
        <div className='text-6xl text-default-500'>
          <CommentText
            className='text-[60px] leading-normal whitespace-pre-wrap text-default-500 select-text'
            content={props.desc}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>

        {/* 间距 */}
        <div className='h-30' />

        {/* 统计信息 */}
        <div className='flex flex-col gap-15 text-default-600'>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-12 items-center text-5xl font-light tracking-normal'>
              <div className='flex gap-3 items-center'>
                <Heart size={48} className='text-like' />
                <span className='select-text'>{props.dianzan}点赞</span>
              </div>

              <div className='flex gap-3 items-center'>
                <MessageCircle size={48} className='text-comment' />
                <span className='select-text'>{props.pinglun}评论</span>
              </div>

              <div className='flex gap-3 items-center'>
                <Share2 size={48} className='text-success' />
                <span className='select-text'>{props.share}分享</span>
              </div>
            </div>

            <div className='flex gap-12 items-center text-5xl font-light tracking-normal'>
              <div className='flex gap-3 items-center'>
                <Coins size={48} className='text-warning' />
                <span className='select-text'>{props.coin}硬币</span>
              </div>

              <div className='flex gap-3 items-center'>
                <Eye size={48} className='text-default-400 text-view' />
                <span className='select-text'>{props.view}浏览</span>
              </div>

              <div className='flex gap-3 items-center text-5xl font-light tracking-normal'>
                <Clock size={48} className='text-time' />
                <span className='select-text'>视频时长: {props.duration_text}</span>
              </div>
            </div>
          </div>

          {/* 发布时间 */}
          <div className='flex flex-col gap-4 text-4xl font-light'>
            <div className='flex gap-3 items-center whitespace-nowrap'>
              <Clock size={32} className='text-time' />
              <span className='select-text'>发布于{props.create_time}</span>
            </div>
            <div className='flex gap-3 items-center whitespace-nowrap'>
              <LuFullscreen size={32} className='text-time' />
              <span>图片生成于: {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</span>
            </div>
            <div className='flex gap-3 items-center'>
              <Hash size={32} className='text-default-400' />
              <span className='select-text'>动态ID: {props.dynamic_id}</span>
            </div>
          </div>
        </div>
        <div className='h-40' />
      </div>
    </>
  )
}

/**
 * B站视频动态底部信息组件
 * @param props - 底部组件属性
 */
const BilibiliVideoDynamicFooter: React.FC<BilibiliVideoDynamicFooterProps> = (props) => {
  return (
    <>
      {/* 间距 */}
      <div className='h-15' />

      {/* 底部信息区域 */}
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
                className='h-auto w-75 rounded-xl'
              />
            )
            : (
              <div className='flex justify-center items-center rounded-xl bg-default-100 w-100 h-100'>
                <span className='text-default-400'>二维码</span>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

/**
 * B站视频动态组件
 * @param props - 视频动态组件属性
 */
export const BilibiliVideoDynamic: React.FC<Omit<BilibiliVideoDynamicProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  return (
    <DefaultLayout {...props}>
      <div className='p-4'>
        {/* 头部区域 */}
        <BilibiliVideoDynamicHeader />

        {/* 内容区域 */}
        <BilibiliVideoDynamicContent
          text={props.data.text}
          desc={props.data.desc}
          image_url={props.data.image_url}
          dianzan={props.data.dianzan}
          pinglun={props.data.pinglun}
          share={props.data.share}
          coin={props.data.coin}
          view={props.data.view}
          duration_text={props.data.duration_text}
          create_time={props.data.create_time}
          dynamic_id={props.data.dynamic_id}
        />

        {/* 底部区域 */}
        <BilibiliVideoDynamicFooter
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

BilibiliVideoDynamic.displayName = 'BilibiliVideoDynamic'

export default BilibiliVideoDynamic