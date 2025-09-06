import React from 'react'
import type {
  BilibiliDynamicProps,
  BilibiliDynamicUserInfoProps,
  BilibiliDynamicContentProps,
  BilibiliDynamicStatusProps,
  BilibiliDynamicFooterProps
} from '../../../../types/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage } from '../shared'
import clsx from 'clsx'

/**
 * B站动态用户信息组件
 */
const BilibiliDynamicUserInfo: React.FC<BilibiliDynamicUserInfoProps> = (props) => {
  return (
    <div className="flex gap-10 items-center px-0 pb-0 pl-24">
      <div className="relative">
        <EnhancedImage
          src={props.avatar_url}
          alt="头像"
          className="w-32 h-32 rounded-full shadow-lg"
          isCircular
        />
        {props.frame && (
          <EnhancedImage
            src={props.frame}
            alt="头像框"
            className="absolute inset-0 transform scale-180"
          />
        )}
      </div>
      <div className="flex flex-col gap-8 text-7xl">
        <div className={`text-6xl font-bold text-default-90`}>
          <span dangerouslySetInnerHTML={{ __html: props.username }} />
        </div>
        <div className="text-4xl font-normal whitespace-nowrap text-default-50">
          {props.create_time}
        </div>
      </div>
      {props.decoration_card && (
        <div className="pl-60">
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
  return (
    <>
      {/* 文本内容 */}
      <div className="flex flex-col px-20 w-full leading-relaxed">
        <div className={`relative items-center text-5xl tracking-wider break-words text-default-90`}>
          <CommentText
            className={clsx(
              'text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-default-90 mb-[20px]',
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
        <div className="h-15" />
      </div>

      {/* 图片内容 - 添加数组类型检查 */}
      {props.image_url && Array.isArray(props.image_url) && props.image_url.map((img, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div className='flex flex-col items-center overflow-hidden rounded-3xl w-11/12 flex-1 shadow-[0px_10px_20px_0px_rgba(0,0,0,0.5)]'>
              <EnhancedImage
                src={img.image_src}
                alt="封面"
                className="object-contain w-full h-full rounded-3xl"
              />
            </div>
          </div>
          <div className="h-18" />
        </React.Fragment>
      ))}
    </>
  )
}

/**
 * B站动态状态组件
 */
const BilibiliDynamicStatus: React.FC<BilibiliDynamicStatusProps> = (props) => {
  return (
    <div className="flex flex-col gap-10 px-20 w-full leading-relaxed">
      <div className="text-5xl font-light tracking-normal text-default-60">
        {props.dianzan}点赞 · {props.pinglun}评论 · {props.share}分享
      </div>
      <div className="text-5xl font-light tracking-normal text-default-60">
        图片生成时间: {props.render_time}
      </div>
      <div className="h-3" />
    </div>
  )
}

/**
 * B站动态底部信息组件
 */
const BilibiliDynamicFooter: React.FC<BilibiliDynamicFooterProps> = (props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center pb-11 h-auto pt-25">
        <div className="flex flex-col self-start pl-16">
          <div className='flex items-center text-6xl text-default-60'>
            <img
              src="/image/bilibili/bilibili-light.png"
              alt="B站Logo"
              className="h-auto w-120"
            />
          </div>
          <br />
          <span className='text-5xl text-default-60'>
            长按识别二维码即可查看全文
          </span>
          <div className='flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider text-default-60'>
            <span>UID: {props.user_shortid}</span>
            <span>获赞: {props.total_favorited}</span>
            <span>关注: {props.following_count}</span>
            <span>粉丝: {props.fans}</span>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center -mb-12 mr-19">
          <div className='mt-5 ml-3 text-5xl text-right text-default-60'>
            {props.dynamicTYPE}
          </div>
          <div className='p-3 rounded-sm border-8 border-dashed border-default-60'>
            {props.qrCodeDataUrl ? (
              <img
                src={props.qrCodeDataUrl}
                alt="二维码"
                className="h-auto w-88"
              />
            ) : (
              <div className="flex justify-center items-center rounded bg-default-20 w-88 h-88">
                <span className="text-default-40">二维码</span>
              </div>
            )}
          </div>
        </div>
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
      <div className='p-4' >
        {/* 间距 */}
        <div className="h-25" />

        {/* 用户信息 */}
        <BilibiliDynamicUserInfo
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          username={props.data.username}
          create_time={props.data.create_time}
          decoration_card={props.data.decoration_card}
        />

        {/* 间距 */}
        <div className="h-15" />

        {/* 动态内容 */}
        <BilibiliDynamicContent
          text={props.data.text}
          image_url={props.data.image_url}
        />

        {/* 动态状态 */}
        <BilibiliDynamicStatus
          dianzan={props.data.dianzan}
          pinglun={props.data.pinglun}
          share={props.data.share}
          render_time={props.data.render_time}
        />

        {/* 间距 */}
        <div className="h-23" />

        {/* 底部信息 */}
        <BilibiliDynamicFooter
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