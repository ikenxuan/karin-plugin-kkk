import React, { useState } from 'react'
import type {
  BilibiliDynamicProps,
  BilibiliDynamicUserInfoProps,
  BilibiliDynamicContentProps,
  BilibiliDynamicStatusProps,
  BilibiliDynamicFooterProps
} from '../../../../types/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import clsx from 'clsx'

/**
 * 带有错误处理的图片组件
 * @param props 图片组件属性
 * @returns JSX元素
 */
interface ImageWithSkeletonProps {
  /** 图片源地址 */
  src: string
  /** 替代文本 */
  alt: string
  /** CSS类名 */
  className?: string
  /** 占位符文本 */
  placeholder?: string
  /** 是否为圆形 */
  isCircular?: boolean
}

/**
 * 处理评论文本中的图片防盗链问题
 * @param htmlContent HTML内容
 * @returns 处理后的HTML内容
 */
const processCommentHTML = (htmlContent: string): string => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return ''
  }

  // 使用正则表达式匹配所有img标签并添加防盗链属性
  return htmlContent.replace(
    /<img([^>]*?)>/gi,
    '<img$1 referrerpolicy="no-referrer" crossorigin="anonymous">'
  )
}

/**
 * 评论文本组件
 * @param props 组件属性
 * @returns JSX元素
 */
interface CommentTextProps {
  /** HTML内容 */
  content: string
  /** CSS类名 */
  className?: string
  /** 内联样式 */
  style?: React.CSSProperties
}

const CommentText: React.FC<CommentTextProps> = ({ content, className, style }) => {
  const processedContent = processCommentHTML(content)

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}


const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  isCircular = false
}) => {
  const [hasError, setHasError] = useState(false)

  /**
   * 处理图片加载失败
   */
  const handleError = () => {
    setHasError(true)
  }

  if (!src || hasError) {
    return (
      <div className={`${className} ${isCircular ? 'rounded-full' : 'rounded-md'} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
        <span className="text-sm text-gray-400">{placeholder || alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
  )
}

/**
 * B站动态用户信息组件
 */
const BilibiliDynamicUserInfo: React.FC<BilibiliDynamicUserInfoProps> = ({
  avatar_url,
  frame,
  username,
  create_time,
  decoration_card,
}) => {
  return (
    <div className="flex gap-10 items-center px-0 pb-0 pl-24">
      <div className="relative">
        <ImageWithSkeleton
          src={avatar_url}
          alt="头像"
          className="mr-5 w-32 h-32 rounded-full shadow-lg"
          isCircular
        />
        {frame && (
          <ImageWithSkeleton
            src={frame}
            alt="头像框"
            className="absolute top-12 -right-28 w-36 h-36 transform scale-150 -translate-y-[38%] -translate-x-[85%]"
          />
        )}
      </div>
      <div className="flex flex-col gap-8 text-7xl">
        <div className={`text-6xl font-bold text-default-90`}>
          <span dangerouslySetInnerHTML={{ __html: username }} />
        </div>
        <div className="text-4xl font-normal text-gray-500 whitespace-nowrap">
          {create_time}
        </div>
      </div>
      {decoration_card && (
        <div className="pl-60">
          <div dangerouslySetInnerHTML={{ __html: decoration_card }} />
        </div>
      )}
    </div>
  )
}

/**
 * B站动态内容组件
 */
const BilibiliDynamicContent: React.FC<BilibiliDynamicContentProps> = ({
  text,
  image_url,
}) => {
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
            content={text} 
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>
        <div className="h-15" />
      </div>

      {/* 图片内容 */}
      {image_url && image_url.map((img, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div className='flex flex-col items-center overflow-hidden rounded-3xl w-11/12 flex-1 shadow-[0px_10px_20px_0px_rgba(0,0,0,0.5)]'>
              <ImageWithSkeleton
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
const BilibiliDynamicStatus: React.FC<BilibiliDynamicStatusProps> = ({
  dianzan,
  pinglun,
  share,
  render_time,
}) => {
  return (
    <div className="flex flex-col gap-10 px-20 w-full leading-relaxed">
      <div className="text-5xl font-light tracking-normal text-default-80">
        {dianzan}点赞 · {pinglun}评论 · {share}分享
      </div>
      <div className="text-5xl font-light tracking-normal text-default-80">
        图片生成时间: {render_time}
      </div>
      <div className="h-3" />
    </div>
  )
}

/**
 * B站动态底部信息组件
 */
const BilibiliDynamicFooter: React.FC<BilibiliDynamicFooterProps> = ({
  user_shortid,
  total_favorited,
  following_count,
  fans,
  dynamicTYPE,
  qrCodeDataUrl,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center pb-11 h-auto pt-25">
        <div className="flex flex-col self-start pl-16">
          <div className='flex items-center text-6xl text-default-80'>
            <img
              src="/image/bilibili/bilibili-light.png"
              alt="B站Logo"
              className="h-auto w-120"
            />
          </div>
          <br />
          <span className='text-5xl text-default-80'>
            长按识别二维码即可查看全文
          </span>
          <div className='flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider text-default-80'>
            <span>UID: {user_shortid}</span>
            <span>获赞: {total_favorited}</span>
            <span>关注: {following_count}</span>
            <span>粉丝: {fans}</span>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center -mb-12 mr-19">
          <div className='mt-5 ml-3 text-5xl text-right text-default-80'>
            {dynamicTYPE}
          </div>
          <div className='p-3 rounded-sm border-8 border-dashed border-default-80'>
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="二维码"
                className="h-auto w-88"
              />
            ) : (
              <div className="flex justify-center items-center bg-gray-200 rounded w-88 h-88 dark:bg-gray-700">
                <span className="text-gray-400">二维码</span>
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
          useDarkTheme={props.data.useDarkTheme}
        />

        {/* 间距 */}
        <div className="h-15" />

        {/* 动态内容 */}
        <BilibiliDynamicContent
          text={props.data.text}
          image_url={props.data.image_url}
          useDarkTheme={props.data.useDarkTheme}
        />

        {/* 动态状态 */}
        <BilibiliDynamicStatus
          dianzan={props.data.dianzan}
          pinglun={props.data.pinglun}
          share={props.data.share}
          render_time={props.data.render_time}
          useDarkTheme={props.data.useDarkTheme}
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
          useDarkTheme={props.data.useDarkTheme}
        />
      </div>
    </DefaultLayout>
  )
})

BilibiliDrawDynamic.displayName = 'BilibiliDrawDynamic'

export default BilibiliDrawDynamic