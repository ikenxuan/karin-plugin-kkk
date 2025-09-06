import React from 'react'
import type {
  BilibiliLiveDynamicProps,
  BilibiliLiveDynamicContentProps,
  BilibiliLiveDynamicFooterProps
} from '../../../../types/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage } from '../shared'
import clsx from 'clsx'

/**
 * B站直播动态头部组件
 * @param props - 头部组件属性
 */
const BilibiliLiveDynamicHeader: React.FC = () => {
  return (
    <>
      {/* 间距 */}
      <div className="h-5" />

      {/* B站Logo和标语 */}
      <div className="flex flex-col items-start text-6xl text-default-80">
        <img
          src="/image/bilibili/bilibili.png"
          alt="哔哩哔哩"
          className="h-auto w-120"
        />
        <span className="pt-10 text-6xl">
          你感兴趣的视频都在B站
        </span>
      </div>

      {/* 间距 */}
      <div className="h-5" />
    </>
  )
}

/**
 * B站直播动态内容组件
 * @param props - 内容组件属性
 */
const BilibiliLiveDynamicContent: React.FC<BilibiliLiveDynamicContentProps> = (props) => {
  return (
    <>
      {/* 间距 */}
      <div className="h-15" />
      
      {/* 直播封面 */}
      {props.image_url && (
        <React.Fragment>
          <div className="flex flex-col items-center">
            <div className='flex flex-col items-center overflow-hidden rounded-3xl w-11/12 flex-1 shadow-[0px_10px_20px_0px_rgba(125,125,125,0.5)]'>
              <EnhancedImage
                src={props.image_url}
                alt="封面"
                className="object-contain w-full h-full rounded-3xl"
              />
            </div>
          </div>
          <div className="h-10" />
        </React.Fragment>
      )}

      {/* 直播信息 */}
      <div className="flex flex-col w-full leading-relaxed px-15">
        {/* 间距 */}
        <div className="h-3" />

        {/* 直播标题 */}
        <div className="relative items-center text-8xl font-bold tracking-wider break-words text-default-90">
          <CommentText
            className="text-[65px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-default-90"
            content={props.text}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>

        {/* 间距 */}
        <div className="h-10" />

        {/* 房间信息 */}
        <div className="text-5xl tracking-normal text-default-60">
          {props.liveinf}
        </div>

        <div className="h-5" />

        {/* 开始时间 */}
        <div className="text-4xl tracking-normal text-default-60">
          直播开始时间: {props.create_time}
        </div>

        {/* 间距 */}
        <div className="h-25" />

        {/* 主播信息 */}
        <div className="flex gap-10 items-center">
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
                className="absolute w-55 h-55 transform scale-150 -translate-y-[11%] -translate-x-[105%]"
              />
            )}
          </div>
          <div className="flex flex-col gap-5 items-start">
            <div className="flex gap-4 items-center">
              <div className="text-6xl font-bold text-default-90">
                <CommentText content={props.username} />
              </div>
              <img className="w-32 h-auto" src="/image/bilibili/直播中.png" alt="直播中" />
            </div>
            <div className="text-4xl text-default-70">
              {props.fans}粉丝
            </div>
          </div>
        </div>

        {/* 间距 */}
        <div className="h-50" />
      </div>
    </>
  )
}

/**
 * B站直播动态底部信息组件
 * @param props - 底部组件属性
 */
const BilibiliLiveDynamicFooter: React.FC<BilibiliLiveDynamicFooterProps> = (props) => {
  return (
    <>
      {/* 右上角类型标识 */}
      <div className="relative z-0 mr-20 -mb-11 text-7xl text-right text-default-80">
        哔哩哔哩{props.dynamicTYPE}
      </div>

      {/* 底部信息区域 */}
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center pb-11 h-auto pt-25">
          {/* 用户信息 */}
          <div className="flex flex-col items-center pl-16">
            <BilibiliLiveDynamicHeader />
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
 * B站直播动态组件
 * @param props - 直播动态组件属性
 */
export const BilibiliLiveDynamic: React.FC<Omit<BilibiliLiveDynamicProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  return (
    <DefaultLayout {...props}>
      <div className='p-4'>
        {/* 内容区域 */}
        <BilibiliLiveDynamicContent
          image_url={props.data.image_url}
          text={props.data.text}
          liveinf={props.data.liveinf}
          create_time={props.data.create_time}
          username={props.data.username}
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          fans={props.data.fans}
        />

        {/* 底部区域 */}
        <BilibiliLiveDynamicFooter
          avatar_url={props.data.avatar_url}
          frame={props.data.frame}
          username={props.data.username}
          fans={props.data.fans}
          dynamicTYPE={props.data.dynamicTYPE}
          share_url={props.data.share_url}
          qrCodeDataUrl={props.qrCodeDataUrl}
        />
      </div>
    </DefaultLayout>
  )
})

BilibiliLiveDynamic.displayName = 'BilibiliLiveDynamic'

export default BilibiliLiveDynamic