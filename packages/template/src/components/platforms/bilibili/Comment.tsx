import clsx from 'clsx'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import type {
  BilibiliCommentProps,
  QRCodeSectionProps
} from '../../../types/platforms/bilibili'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 带有加载状态的图片组件
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


const processCommentHTML = (htmlContent: string): string => {
  // 使用正则表达式匹配所有img标签并添加防盗链属性
  return htmlContent.replace(
    /<img([^>]*?)>/gi,
    '<img$1 referrerpolicy="no-referrer" crossorigin="anonymous">'
  )
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  placeholder
}) => {
  const [hasError, setHasError] = useState(false)

  /**
   * 处理图片加载失败
   */
  const handleError = () => {
    setHasError(true)
  }

  // 重置状态当src改变时
  useEffect(() => {
    setHasError(false)
  }, [src])

  if (hasError) {
    return (
      <div className={`flex justify-center items-center text-sm select-text ${className} bg-content2 text-foreground-500`}>
        {placeholder || '图片加载失败'}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`select-text ${className}`}
      onError={handleError}
      referrerPolicy='no-referrer'
      crossOrigin='anonymous'
    />
  )
}

/**
 * 二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  qrCodeDataUrl
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex flex-col items-center -mr-10'>
      <div
        ref={qrCodeRef}
        className='flex justify-center items-center mt-20 w-120 h-120'
      >
        {qrCodeDataUrl
          ? (
            <img
              src={qrCodeDataUrl}
              alt='二维码'
              className='object-contain w-full h-full select-text'
            />
          )
          : (
            <div className='flex justify-center items-center w-full h-full text-6xl select-text text-foreground-400'>
              二维码占位符
            </div>
          )}
      </div>
    </div>
  )
}

/**
 * 信息项组件
 * @param label 标签文本
 * @param value 值内容
 * @param unit 单位（可选）
 * @returns JSX元素
 */
interface InfoItemProps {
  /** 标签文本 */
  label: string
  /** 值内容 */
  value: string | number
  /** 单位文本 */
  unit?: string
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, unit }) => {
  return (
    <div className='text-[45px] p-2.5 tracking-[6px] text-left break-all text-foreground-600 select-text'>
      {label}：{value}{unit}
    </div>
  )
}

/**
 * 视频信息头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const VideoInfoHeader: React.FC<BilibiliCommentProps> = (props) => {
  return (
    <div className='flex flex-col mt-2.5 -ml-10'>
      {/* B站Logo占位符 */}
      <div className='w-[580px] h-auto mb-5'>
        <div className='text-8xl font-bold text-primary'>
          <img src='/image/bilibili/bilibili.png' alt='B站Logo' className='select-text' />
        </div>
      </div>

      <InfoItem label='作品类型' value={props.data.Type} />
      <InfoItem label='评论数量' value={props.data.CommentLength} unit='条' />

      {props.data.Type === '视频' && (
        <>
          {props.data.VideoSize && (
            <InfoItem label='视频大小' value={props.data.VideoSize} unit='MB' />
          )}
          {props.data.Clarity && (
            <InfoItem label='视频画质' value={props.data.Clarity} />
          )}
        </>
      )}
    </div>
  )
}

/**
 * 评论项组件
 * @param props 组件属性
 * @returns JSX元素
 */
const CommentItemComponent: React.FC<BilibiliCommentProps['data']['CommentsData'][number] & { isLast?: boolean }> = ({
  isLast = false,
  ...props
}) => {
  return (

    <div className={clsx(
      'flex relative px-10 py-10 max-w-full',
      { 'pb-0': isLast }
    )}>
      {/* 用户头像区域 */}
      <div className='relative mr-[33.75px] flex-shrink-0 w-50 h-50 flex items-center justify-center'>
        {/* 主头像 */}
        <ImageWithSkeleton
          src={props.avatar || 'AVATAR_PLACEHOLDER'}
          alt='用户头像'
          className='rounded-full w-35 h-35 shadow-large'
          placeholder='头像'
          isCircular
        />

        {/* 头像框 */}
        {props.frame && (
          <ImageWithSkeleton
            src={props.frame}
            alt='头像框'
            className='absolute inset-0 transform scale-120'
            placeholder='头像框'
          />
        )}

        {/* 大会员标识 */}
        {props.vipstatus === 1 && (
          <div className='absolute bottom-6 right-4 w-15 h-15 rounded-full bg-default-100 flex items-center justify-center z-20'>
            <img
              src='/image/bilibili/res-local1.png'
              alt='大会员'
              className='w-12 h-12'
            />
          </div>
        )}
      </div>

      {/* 评论内容区域 */}
      <div className='flex-1 min-w-0'>
        {/* 用户信息 */}
        <div className='flex items-start gap-[10px] mb-[15px] text-[50px] relative'>
          {/* 用户名区域  */}
          <div className='flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text'>
            <div
              className='[&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-[100px] [&>svg]:h-[100px] [&>svg]:align-middle [&>svg]:flex-shrink-0'
              dangerouslySetInnerHTML={{ __html: props.uname }}
            />

            {/* 等级图标 */}
            {props.level !== undefined && props.level >= 0 && props.level <= 7 && (
              <img
                src={`/image/bilibili/level/lv${props.level}.svg`}
                alt={`等级${props.level}`}
                className='inline-block flex-shrink-0 w-24 h-24 align-middle'
              />
            )}
            {/* UP主标签 */}
            {props.isUP && (
              <img
                src='/image/bilibili/up_pb.svg'
                alt='UP主标签'
                className='inline-block flex-shrink-0 align-middle w-23 h-23'
              />
            )}
          </div>

          {/* 粉丝卡片 - 绝对定位在右侧，不会被挤出 */}
          {props.fanCard && props.fanCard.image && (
            <div className='absolute -top-10 right-0 h-[180px] z-10 pointer-events-none'>
              <div className='relative h-full inline-block'>
                <img
                  src={props.fanCard.image}
                  alt='粉丝卡片'
                  className='block h-full w-auto object-contain'
                  referrerPolicy='no-referrer'
                  crossOrigin='anonymous'
                />
                <div className='absolute bottom-15 right-8 w-[14%] h-full flex flex-col items-start justify-end leading-10 font-[bilifont]'>
                  <span
                    className='text-4xl font-bold whitespace-nowrap'
                    style={{
                      backgroundImage: props.fanCard.gradientStyle,
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text'
                    }}
                  >
                    {props.fanCard.numPrefix}
                  </span>
                  <span
                    className='text-4xl font-bold whitespace-nowrap'
                    style={{
                      backgroundImage: props.fanCard.gradientStyle,
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text'
                    }}
                  >
                    {props.fanCard.numDesc}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 作者标签 */}
          {props.label_type === 1 && (
            <div className='inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-danger text-danger-foreground flex-shrink-0 self-center select-text'>
              作者
            </div>
          )}

          {/* 状态标签 */}
          {props.status_label && (
            <div className='inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-content2 text-foreground-600 flex-shrink-0 self-center select-text'>
              {props.status_label}
            </div>
          )}
        </div>

        {/* 评论文本 */}
        <div
          className='text-[60px] tracking-[0.5px] leading-[1.6] text-foreground mb-[20px] select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
          dangerouslySetInnerHTML={{
            __html: (props.isTop
              ? '<span class="inline-flex justify-center items-center relative border-4 border-[#006A9E] rounded-xl text-[#006A9E] text-5xl px-2 py-1 leading-none mr-2 align-baseline">置顶</span>'
              : '') + processCommentHTML(props.message)
          }}
        />

        {/* 评论图片 */}
        {(props.img_src || props.sticker) && (
          <div className='flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large'>
            <ImageWithSkeleton
              src={props.img_src || props.sticker || 'IMAGE_PLACEHOLDER'}
              alt='评论图片'
              className='rounded-[25px] object-contain w-full h-full'
              placeholder='评论图片'
            />
          </div>
        )}

        {/* 点赞区域 */}
        <div className='flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500'>
          <div className='flex flex-1 items-center'>
            <div className='text-[45px] tracking-[2px] select-text'>
              {props.ctime} · {props.location}
              {props.replylength > 0
                ? (
                  <span className='text-foreground-400 tracking-[3px] ml-4'>
                    {props.replylength}回复
                  </span>
                )
                : (
                  <span className='ml-4 text-foreground-600'>回复</span>
                )}
            </div>
          </div>

          <div className='flex items-center gap-[75px] ml-auto'>
            <div className='flex items-center gap-[15px]'>
              <ThumbsUp className='w-[60px] h-[60px] text-foreground-500' />
              <span className='text-[45px] text-foreground-500 select-text'>{props.like}</span>
            </div>
            <div className='flex items-center gap-[15px]'>
              <ThumbsDown className='w-[60px] h-[60px] text-foreground-500' />
            </div>
          </div>
        </div>

        {/* 二级评论 */}
        {props.replies && props.replies.length > 0 && (
          <div className='mt-10'>
            {props.replies.map((subReply, index) => (
              <div key={index} className={`py-6 ${index !== (props.replies?.length ?? 0) - 1 ? 'border-b border-divider' : ''}`}>
                <div className='flex items-start space-x-4'>
                  {/* 二级评论头像区域 */}
                  <div className='relative mr-[33.75px] flex-shrink-0 w-40 h-40 flex items-center justify-center'>
                    <ImageWithSkeleton
                      src={subReply.avatar || 'AVATAR_PLACEHOLDER'}
                      alt='用户头像'
                      className='rounded-full w-30 h-30 shadow-large'
                      placeholder='头像'
                      isCircular
                    />
                    {subReply.frame && (
                      <ImageWithSkeleton
                        src={subReply.frame}
                        alt='头像框'
                        className='absolute inset-0 transform scale-90'
                        placeholder='头像框'
                      />
                    )}

                    {/* 大会员标识 */}
                    {subReply.vipstatus === 1 && (
                      <div className='absolute bottom-5 right-4 w-12 h-12 rounded-full bg-default-100 flex items-center justify-center z-20'>
                        <img
                          src='/image/bilibili/res-local1.png'
                          alt='大会员'
                          className='w-9 h-9'
                        />
                      </div>
                    )}
                  </div>

                  {/* 二级评论内容 */}
                  <div className='flex-1'>
                    {/* 用户信息 */}
                    <div className='flex items-start gap-[10px] mb-[15px] text-[50px] relative overflow-visible'>
                      <div className='flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text'>
                        <div
                          className='[&>span]:inline-block [&>span]:leading-[1.2]'
                          dangerouslySetInnerHTML={{ __html: subReply.uname }}
                        />
                        {subReply.level !== undefined && subReply.level >= 0 && subReply.level <= 7 && (
                          <img
                            src={`/image/bilibili/level/lv${subReply.level}.svg`}
                            alt={`等级${subReply.level}`}
                            className='inline-block flex-shrink-0 w-24 h-24 align-middle'
                          />
                        )}
                        {subReply.isUP && (
                          <img
                            src='/image/bilibili/up_pb.svg'
                            alt='UP主标签'
                            className='inline-block flex-shrink-0 align-middle w-23 h-23'
                          />
                        )}
                      </div>

                      {/* 二级评论粉丝卡片 */}
                      {subReply.fanCard && subReply.fanCard.image && (
                        <div className='absolute -top-10 right-0 h-[180px] z-10 pointer-events-none'>
                          <div className='relative h-full inline-block'>
                            <img
                              src={subReply.fanCard.image}
                              alt='粉丝卡片'
                              className='block h-full w-auto object-contain'
                              referrerPolicy='no-referrer'
                              crossOrigin='anonymous'
                            />
                            <div className='absolute bottom-15 right-8 w-[14%] h-full flex flex-col items-start justify-end leading-10 font-[bilifont]'>
                              <span
                                className='text-4xl font-bold whitespace-nowrap'
                                style={{
                                  backgroundImage: subReply.fanCard.gradientStyle,
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text'
                                }}
                              >
                                {subReply.fanCard.numPrefix}
                              </span>
                              <span
                                className='text-4xl font-bold whitespace-nowrap'
                                style={{
                                  backgroundImage: subReply.fanCard.gradientStyle,
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text'
                                }}
                              >
                                {subReply.fanCard.numDesc}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 评论文本 */}
                    <div
                      className='text-[60px] tracking-[0.5px] leading-[1.6] text-foreground mb-[20px] select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
                      style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                      dangerouslySetInnerHTML={{ __html: processCommentHTML(subReply.message) }}
                    />

                    {/* 二级评论图片 */}
                    {subReply.img_src && (
                      <div className='flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large'>
                        <ImageWithSkeleton
                          src={subReply.img_src}
                          alt='评论图片'
                          className='rounded-[25px] object-contain w-full h-full'
                          placeholder='评论图片'
                        />
                      </div>
                    )}

                    {/* 二级评论底部信息 */}
                    <div className='flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500'>
                      <div className='flex flex-1 items-center'>
                        <div className='text-[45px] tracking-[2px] select-text'>
                          {subReply.ctime} · {subReply.location}
                        </div>
                      </div>

                      <div className='flex items-center gap-[75px] ml-auto'>
                        <div className='flex items-center gap-[15px]'>
                          <ThumbsUp className='w-[60px] h-[60px] text-foreground-500' />
                          <span className='text-[45px] text-foreground-500 select-text'>{subReply.like}</span>
                        </div>
                        <div className='flex items-center gap-[15px]'>
                          <ThumbsDown className='w-[60px] h-[60px] text-foreground-500' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const BilibiliComment: React.FC<Omit<BilibiliCommentProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const processedData = useMemo(() => {
    if (!props.data) {
      return {
        useDarkTheme: false,
        Type: '视频' as const,
        CommentLength: '0',
        VideoSize: undefined,
        Clarity: undefined,
        ImageLength: undefined,
        shareurl: '',
        share_url: '',
        CommentsData: [],
        host_mid: 0
      }
    }

    return {
      useDarkTheme: props.data.useDarkTheme || false,
      Type: props.data.Type || '视频',
      CommentLength: props.data.CommentLength || '0',
      VideoSize: props.data.VideoSize,
      Clarity: props.data.Clarity,
      ImageLength: props.data.ImageLength,
      shareurl: props.data.shareurl || '',
      share_url: props.data.share_url || '',
      CommentsData: props.data.CommentsData || []
    }
  }, [props.data])

  return (
    <DefaultLayout {...props}>
      {/* 视频信息和二维码区域 */}
      <div className='flex justify-between items-center max-w-[1200px] mx-auto p-5'>
        <VideoInfoHeader {...props} />

        <QRCodeSection
          shareurl={processedData.shareurl || processedData.share_url}
          qrCodeDataUrl={props.qrCodeDataUrl}
          useDarkTheme={processedData.useDarkTheme}
        />
      </div>

      {/* 评论列表 */}
      <div className='mx-0 max-w-full'>
        {processedData.CommentsData.length > 0
          ? (
            processedData.CommentsData.map((comment, index) => (
              <CommentItemComponent
                key={index}
                isLast={index === processedData.CommentsData.length - 1}
                {...comment}
              />
            ))
          )
          : (
            <div className='py-10 text-center select-text text-foreground-500'>
              暂无评论数据
            </div>
          )}
      </div>
    </DefaultLayout>
  )
})

export default BilibiliComment
