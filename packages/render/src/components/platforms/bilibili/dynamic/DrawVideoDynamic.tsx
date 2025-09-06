import React from 'react'
import type {
  BilibiliVideoDynamicProps,
  BilibiliVideoDynamicHeaderProps,
  BilibiliVideoDynamicContentProps,
  BilibiliVideoDynamicFooterProps
} from '../../../../types/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage } from '../shared'
import clsx from 'clsx'

/**
 * B站视频动态头部组件
 * @param props - 头部组件属性
 */
const BilibiliVideoDynamicHeader: React.FC<BilibiliVideoDynamicHeaderProps> = () => {
  return (
    <>
      {/* 间距 */}
      <div className="h-20" />

      {/* B站Logo和标语 */}
      <div className="flex items-center pl-20 text-6xl text-default-60">
        <img
          src="/image/bilibili/bilibili.png"
          alt="bilibili"
          className="h-auto w-120"
        />
        <span className="ml-8 text-5xl">
          你感兴趣的视频都在哔哩哔哩
        </span>
      </div>

      {/* 间距 */}
      <div className="h-20" />
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
        <React.Fragment>
          <div className="flex flex-col items-center">
            <div className='flex flex-col items-center overflow-hidden rounded-3xl w-11/12 flex-1 shadow-[0px_10px_20px_0px_rgba(67,67,67,0.31)]'>
              <EnhancedImage
                src={props.image_url}
                alt="封面"
                className="object-contain w-full h-full rounded-3xl"
              />
            </div>
          </div>
          <div className="h-5" />
        </React.Fragment>
      )}

      {/* 视频信息 */}
      <div className="flex flex-col w-full leading-relaxed px-21">
        {/* 视频标题 */}
        <div className="relative items-center text-8xl font-bold tracking-wider break-words text-default-90">
          <CommentText
            className="text-[80px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-default-90"
            content={props.text}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>

        {/* 间距 */}
        <div className="h-10" />

        {/* 视频描述 */}
        <div className="text-6xl text-default-60">
          <CommentText
            className="text-[60px] leading-[1.5] whitespace-pre-wrap text-default-60"
            content={props.desc}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>

        {/* 间距 */}
        <div className="h-30" />

        {/* 统计信息 */}
        <div className="flex flex-col gap-10 text-default-80">
          <div className="text-5xl font-light tracking-normal">
            {props.dianzan}点赞 · {props.pinglun}评论 · {props.share}分享 · {props.coin}硬币 · {props.view}浏览
          </div>

          <div className="text-5xl font-light tracking-normal">
            视频时长: {props.duration_text}
          </div>

          {/* 发布时间 */}
          <div className="text-4xl font-light whitespace-nowrap">
            发布于{props.create_time}
          </div>
        </div>
        <div className="h-40" />
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
      <div className="h-25" />

      {/* 右上角类型标识 */}
      <div className="relative z-0 mr-20 -mb-11 text-7xl text-right text-default-60">
        哔哩哔哩{props.dynamicTYPE}
      </div>

      {/* 底部信息区域 */}
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center pb-11 h-auto pt-25">
          {/* 用户信息 */}
          <div className="flex flex-col items-center pl-12" style={{ padding: '0 0 0 50px' }}>
            <div className='flex items-center'>
              <div className="relative">
                <EnhancedImage
                  src={props.avatar_url}
                  alt="头像"
                  className="mr-5 rounded-full shadow-lg w-50 h-50"
                  isCircular
                />
                {props.frame && (
                  <EnhancedImage
                    src={props.frame}
                    alt="头像框"
                    className="absolute w-55 h-55 -mr-40 mt-12 transform scale-150 -translate-y-[13%] -translate-x-[105%]"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-8xl font-bold text-default-90">
                  <span dangerouslySetInnerHTML={{ __html: props.username }} />
                </div>
              </div>
            </div>

            {/* 用户统计信息 */}
            <div className="flex flex-col gap-2 items-start pt-6 w-full text-4xl tracking-wider text-default-80">
              <span>UID: {props.user_shortid}</span>
              <span>获赞: {props.total_favorited}</span>
              <span>关注: {props.following_count}</span>
              <span>粉丝: {props.fans}</span>
            </div>
          </div>

          {/* 二维码区域 */}
          <div className="flex flex-col-reverse items-center -mb-12 mr-19">
            <div className="mt-5 ml-3 text-5xl text-right text-default-80">
              动态分享链接
            </div>
            <div className="p-3 rounded-sm border-8 border-dashed border-default-80">
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