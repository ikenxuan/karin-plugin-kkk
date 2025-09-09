import clsx from 'clsx'
import { Clock, Eye, Hash, Heart, MessageCircle, Share2, Users } from 'lucide-react'
import React from 'react'

import type {
  BilibiliDynamicFooterProps,
  BilibiliDynamicStatusProps,
  BilibiliDynamicUserInfoProps,
  BilibiliForwardContentProps,
  BilibiliForwardDynamicProps,
  OriginalContentAV,
  OriginalContentDraw,
  OriginalContentLiveRcmd,
  OriginalContentWord
} from '../../../../types/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage } from '../shared'

/**
 * B站转发动态用户信息组件
 */
const BilibiliForwardUserInfo: React.FC<BilibiliDynamicUserInfoProps> = (props) => {
  return (
    <div className='flex gap-10 items-center px-0 pb-0 pl-24'>
      <div className='relative'>
        <EnhancedImage
          src={props.avatar_url}
          alt='头像'
          className='w-36 h-36 rounded-full shadow-lg'
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
        <div className='text-6xl font-bold text-default-90'>
          <span dangerouslySetInnerHTML={{ __html: props.username }} />
        </div>
        <div className='flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-default-50'>
          <Clock size={36} />
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
 * 原始内容用户信息组件
 */
const OriginalUserInfo: React.FC<{
  avatar_url: string
  frame?: string
  username: string
  create_time: string
  decoration_card?: string
}> = (props) => {
  return (
    <div className='flex gap-10 items-center pt-5 pb-10 pl-10'>
      <div className='relative flex-shrink-0'>
        <EnhancedImage
          src={props.avatar_url}
          alt='转发用户头像'
          className='rounded-full shadow-lg w-30 h-30'
        />
        {props.frame && (
          <EnhancedImage
            src={props.frame}
            alt='转发用户头像框'
            className='absolute inset-0 transform scale-180'
          />
        )}
      </div>
      <div className='flex flex-col gap-4 text-7xl'>
        <div className='text-5xl font-normal text-default-90'>
          <span dangerouslySetInnerHTML={{ __html: props.username }} />
        </div>
        <div className='flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-default-50'>
          <Clock size={32} />
          {props.create_time}
        </div>
      </div>
      {props.decoration_card && (
        <div className='ml-39'>
          <div dangerouslySetInnerHTML={{ __html: props.decoration_card }} />
        </div>
      )}
    </div>
  )
}

/**
 * AV类型原始内容组件
 */
const OriginalAVContent: React.FC<{ content: OriginalContentAV }> = ({ content }) => {
  return (
    <div className='px-12 py-8 mt-4 w-full rounded-2xl bg-default-10'>
      <OriginalUserInfo
        avatar_url={content.avatar_url}
        frame={content.frame}
        username={content.username}
        create_time={content.create_time}
        decoration_card={content.decoration_card}
      />

      <div className='flex flex-col items-center py-11'>
        <div className='relative flex flex-col items-center rounded-10 w-11/12 aspect-video rounded-2xl overflow-hidden shadow-[0px_10px_20px_0px_rgba(0,0,0,0.3)]'>
          <EnhancedImage
            src={content.cover}
            alt='视频封面'
            className='object-cover object-center absolute'
          />
          <div className='absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75' />
          <div className='absolute right-5 left-12 bottom-14 z-10 text-4xl font-light text-white'>
            <span className='px-4 py-2 mr-3 text-4xl text-white rounded-2xl bg-black/50'>
              {content.duration_text}
            </span>
            {content.play}观看   {content.danmaku}弹幕
          </div>
        </div>
      </div>

      <div className='pb-10 pl-8 text-6xl font-bold leading-20 text-default-90'>
        <span dangerouslySetInnerHTML={{ __html: content.title }} />
      </div>
    </div>
  )
}

/**
 * DRAW类型原始内容组件
 */
const OriginalDrawContent: React.FC<{ content: OriginalContentDraw }> = ({ content }) => {
  return (
    <div className='px-12 py-8 mt-4 w-full rounded-2xl bg-default-10'>
      <OriginalUserInfo
        avatar_url={content.avatar_url}
        frame={content.frame}
        username={content.username}
        create_time={content.create_time}
        decoration_card={content.decoration_card}
      />

      <div className='py-4'>
        <div className='text-5xl leading-relaxed text-default-90'>
          <CommentText
            className={clsx(
              'text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-default-90',
              '[&_svg]:inline [&_svg]:!mb-4'
            )}
            content={content.text}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>
      </div>

      {content.image_url && content.image_url.length === 1
        ? (
          <div className='flex justify-center py-11'>
            <div className='flex flex-col items-center rounded-6 w-11/12 overflow-hidden shadow-[0px_10px_30px_10px_rgba(0,0,0,0.3)]'>
              <EnhancedImage
                src={content.image_url[0].image_src}
                alt='图片'
                className='object-cover w-full h-full rounded-6'
              />
            </div>
          </div>
        )
        : (
          <div className='grid grid-cols-3 gap-4 p-4'>
            {content.image_url?.map((img, index) => (
              <div key={index} className='overflow-hidden relative shadow-md aspect-square rounded-2'>
                <EnhancedImage
                  src={img.image_src}
                  alt={`图片${index + 1}`}
                  className='object-cover absolute top-0 left-0 w-full h-full'
                />
              </div>
            ))}
          </div>
        )}

      <div className='h-4' />
    </div>
  )
}

/**
 * WORD类型原始内容组件
 */
const OriginalWordContent: React.FC<{ content: OriginalContentWord }> = ({ content }) => {
  return (
    <div className='px-12 py-8 mt-4 w-full rounded-2xl bg-default-10'>
      <OriginalUserInfo
        avatar_url={content.avatar_url}
        frame={content.frame}
        username={content.username}
        create_time={content.create_time}
        decoration_card={content.decoration_card}
      />

      <div className='py-4'>
        <div className='text-5xl leading-relaxed text-default-90'>
          <CommentText
            className='text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-default-90'
            content={content.text}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * LIVE_RCMD类型原始内容组件
 */
const OriginalLiveRcmdContent: React.FC<{ content: OriginalContentLiveRcmd }> = ({ content }) => {
  return (
    <div className='px-12 py-8 mt-4 w-full rounded-2xl bg-default-10'>
      <OriginalUserInfo
        avatar_url={content.avatar_url}
        frame={content.frame}
        username={content.username}
        create_time={content.create_time}
        decoration_card={content.decoration_card}
      />

      <div className='flex flex-col items-center py-11'>
        <div className='relative flex flex-col items-center rounded-10 w-full aspect-video overflow-hidden shadow-[0px_10px_20px_0px_rgba(0,0,0,0.3)]'>
          <EnhancedImage
            src={content.cover}
            alt='直播封面'
            className='object-cover absolute w-full h-full'
          />
          <div className='absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75' />
          <div className='absolute right-5 bottom-8 left-12 z-10 text-4xl font-light text-white'>
            <span className='px-4 py-2 mr-3 text-4xl text-white bg-black/50 rounded-3'>
              {content.area_name}
            </span>
            {content.text_large}   在线: {content.online}
          </div>
        </div>
      </div>

      <div className='pl-8 text-6xl font-bold text-default-90'>
        <span dangerouslySetInnerHTML={{ __html: content.title }} />
      </div>
    </div>
  )
}

/**
 * B站转发动态内容组件
 */
const BilibiliForwardContent: React.FC<BilibiliForwardContentProps> = (props) => {
  return (
    <>
      {/* 转发文本内容 */}
      <div className='flex flex-col px-20 w-full leading-relaxed'>
        <div className='relative items-center text-5xl tracking-wider break-words text-default-90'>
          <CommentText
            className={clsx(
              'text-[65px] tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-default-90 mb-[20px]',
              '[&_svg]:inline [&_svg]:!mb-4',
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

      {/* 原始内容 */}
      <div className='flex px-20'>
        {props.original_content.DYNAMIC_TYPE_AV && (
          <OriginalAVContent content={props.original_content.DYNAMIC_TYPE_AV} />
        )}
        {props.original_content.DYNAMIC_TYPE_DRAW && (
          <OriginalDrawContent content={props.original_content.DYNAMIC_TYPE_DRAW} />
        )}
        {props.original_content.DYNAMIC_TYPE_WORD && (
          <OriginalWordContent content={props.original_content.DYNAMIC_TYPE_WORD} />
        )}
        {props.original_content.DYNAMIC_TYPE_LIVE_RCMD && (
          <OriginalLiveRcmdContent content={props.original_content.DYNAMIC_TYPE_LIVE_RCMD} />
        )}
      </div>
    </>
  )
}

/**
 * B站转发动态状态组件
 */
const BilibiliForwardStatus: React.FC<BilibiliDynamicStatusProps> = (props) => {
  return (
    <div className='flex flex-col gap-10 px-20 w-full leading-relaxed'>
      <div className='flex gap-6 items-center text-5xl font-light tracking-normal text-default-60'>
        <div className='flex gap-2 items-center'>
          <Heart size={48} />
          {props.dianzan}点赞
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <MessageCircle size={48} />
          {props.pinglun}评论
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Share2 size={48} />
          {props.share}分享
        </div>
      </div>
      <div className='flex gap-2 items-center text-5xl font-light tracking-normal text-default-60'>
        <Clock size={48} />
        图片生成时间: {props.render_time}
      </div>
      <div className='h-3' />
    </div>
  )
}

/**
 * B站转发动态底部信息组件
 */
const BilibiliForwardFooter: React.FC<BilibiliDynamicFooterProps> = (props) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between items-center pb-11 h-auto pt-25'>
        <div className='flex flex-col self-start pl-16'>
          <div className='flex items-center text-6xl text-default-60'>
            <img
              src='/image/bilibili/bilibili-light.png'
              alt='B站Logo'
              className='w-80 h-auto'
            />
          </div>
          <br />
          <span className='text-5xl text-default-60'>
            长按识别二维码即可查看全文
          </span>
          <div className='flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider text-default-60'>
            <div className='flex gap-2 items-center'>
              <Hash size={36} />
              <span>UID: {props.user_shortid}</span>
            </div>
            <div className='flex gap-2 items-center'>
              <Heart size={36} />
              <span>获赞: {props.total_favorited}</span>
            </div>
            <div className='flex gap-2 items-center'>
              <Eye size={36} />
              <span>关注: {props.following_count}</span>
            </div>
            <div className='flex gap-2 items-center'>
              <Users size={36} />
              <span>粉丝: {props.fans}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col-reverse items-center -mb-12 mr-19'>
          <div className='mt-5 ml-3 text-5xl text-right text-default-60'>
            {props.dynamicTYPE}
          </div>
          <div className='p-3 rounded-sm border-8 border-dashed border-default-60'>
            {props.qrCodeDataUrl
              ? (
                <img
                  src={props.qrCodeDataUrl}
                  alt='二维码'
                  className='h-auto w-88'
                />
              )
              : (
                <div className='flex justify-center items-center rounded bg-default-20 w-88 h-88'>
                  <span className='text-default-40'>二维码</span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * B站转发动态组件
 */
export const BilibiliForwardDynamic: React.FC<BilibiliForwardDynamicProps> = React.memo((props) => {
  return (
    <DefaultLayout {...props}>
      <div className='p-4'>
        {/* 间距 */}
        <div className='h-15' />

        {/* 用户信息 */}
        <BilibiliForwardUserInfo
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          username={props.data.username}
          create_time={props.data.create_time}
          decoration_card={props.data.decoration_card}
        />

        {/* 间距 */}
        <div className='h-15' />

        {/* 转发动态内容 */}
        <BilibiliForwardContent
          text={props.data.text}
          original_content={props.data.original_content}
        />

        {/* 间距 */}
        <div className='h-25' />

        {/* 动态状态 */}
        <BilibiliForwardStatus
          dianzan={props.data.dianzan}
          pinglun={props.data.pinglun}
          share={props.data.share}
          render_time={props.data.render_time}
        />

        {/* 间距 */}
        <div className='h-23' />

        {/* 底部信息 */}
        <BilibiliForwardFooter
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

BilibiliForwardDynamic.displayName = 'BilibiliForwardDynamic'

export default BilibiliForwardDynamic
