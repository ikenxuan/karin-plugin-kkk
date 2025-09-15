import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import type {
  BilibiliCommentProps,
  CommentItemComponentProps,
  QRCodeSectionProps,
  VideoInfoHeaderProps
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
        className='mt-20 w-[600px] h-[600px] flex items-center justify-center'
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
const VideoInfoHeader: React.FC<VideoInfoHeaderProps> = ({
  type,
  commentLength,
  videoSize,
  clarity,
  imageLength
}) => {
  return (
    <div className='flex flex-col mt-2.5 -ml-10'>
      {/* B站Logo占位符 */}
      <div className='w-[580px] h-auto mb-5'>
        <div className='text-8xl font-bold text-primary'>
          <img src='/image/bilibili/bilibili.png' alt='B站Logo' className='select-text' />
        </div>
      </div>

      <InfoItem label='作品类型' value={type} />
      <InfoItem label='评论数量' value={commentLength} unit='条' />

      {type === '视频' && (
        <>
          {videoSize && (
            <InfoItem label='视频大小' value={videoSize} unit='MB' />
          )}
          {clarity && (
            <InfoItem label='视频画质' value={clarity} />
          )}
        </>
      )}

      {(type === '图集' || type === '动态') && imageLength && (
        <InfoItem
          label={type === '图集' ? '图片数量' : '附带图片'}
          value={imageLength}
          unit='张'
        />
      )}
    </div>
  )
}

/**
 * 评论项组件
 * @param props 组件属性
 * @returns JSX元素
 */
const CommentItemComponent: React.FC<CommentItemComponentProps & { isLast?: boolean }> = ({
  comment,
  isLast = false
}) => {
  return (
    // eslint-disable-next-line @stylistic/space-infix-ops
    <div className={`flex px-10 pb-0 relative max-w-full ${isLast ? '':'mb-[70px]'}`}>
      {/* 用户头像区域 */}
      <div className='relative mr-[33.75px] flex-shrink-0'>
        {/* 主头像 */}
        <ImageWithSkeleton
          src={comment.avatar || 'AVATAR_PLACEHOLDER'}
          alt='用户头像'
          className='rounded-full w-50 h-50 shadow-large'
          placeholder='头像'
          isCircular
        />

        {/* 头像框 */}
        {comment.frame && (
          <ImageWithSkeleton
            src={comment.frame}
            alt='头像框'
            className='absolute inset-0 transform scale-180'
            placeholder='头像框'
          />
        )}

        {/* VIP图标 */}
        {comment.icon_big_vip && (
          <ImageWithSkeleton
            src={comment.icon_big_vip}
            alt='VIP图标'
            className='w-[145px] h-[145px] absolute bottom-0 right-0 transform translate-x-[20%] translate-y-[20%] scale-50'
            placeholder='VIP'
          />
        )}
      </div>

      {/* 评论内容区域 */}
      <div className='flex-1 min-w-0'>
        {/* 用户信息 */}
        <div className='flex items-start gap-[10px] mb-[15px] text-[50px]'>
          {/* 用户名区域  */}
          <div
            className='flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold [&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-[100px] [&>svg]:h-[100px] [&>svg]:align-middle [&>svg]:flex-shrink-0 select-text'
            dangerouslySetInnerHTML={{ __html: comment.uname }}
          />

          {/* 作者标签 */}
          {comment.label_type === 1 && (
            <div className='inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-danger text-danger-foreground flex-shrink-0 self-center select-text'>
              作者
            </div>
          )}

          {/* 状态标签 */}
          {comment.status_label && (
            <div className='inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-content2 text-foreground-600 flex-shrink-0 self-center select-text'>
              {comment.status_label}
            </div>
          )}
        </div>

        {/* 评论文本 */}
        <CommentText
          content={comment.message}
          className='text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] select-text'
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        />

        {/* 评论图片 */}
        {(comment.img_src || comment.sticker) && (
          <div className='flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large'>
            <ImageWithSkeleton
              src={comment.img_src || comment.sticker || 'IMAGE_PLACEHOLDER'}
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
              {comment.ctime} · {comment.location}
              {comment.replylength > 0
                ? (
                  <span className='text-foreground-400 tracking-[3px] ml-4'>
                    {comment.replylength}回复
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
              <span className='text-[45px] text-foreground-500 select-text'>{comment.like}</span>
            </div>
            <div className='flex items-center gap-[15px]'>
              <ThumbsDown className='w-[60px] h-[60px] text-foreground-500' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ... existing code ...
export const BilibiliComment: React.FC<Omit<BilibiliCommentProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const processedData = useMemo(() => {
    if (!props.data) {
      return {
        useDarkTheme: false,
        Type: '视频' as const,
        CommentLength: 0,
        VideoSize: undefined,
        Clarity: undefined,
        ImageLength: undefined,
        shareurl: '',
        share_url: '',
        CommentsData: []
      }
    }

    return {
      useDarkTheme: props.data.useDarkTheme || false,
      Type: props.data.Type || '视频',
      CommentLength: props.data.CommentLength || 0,
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
        <VideoInfoHeader
          type={processedData.Type}
          commentLength={processedData.CommentLength}
          videoSize={processedData.VideoSize}
          clarity={processedData.Clarity}
          imageLength={processedData.ImageLength}
        />

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
                comment={comment}
                useDarkTheme={processedData.useDarkTheme}
                isLast={index === processedData.CommentsData.length - 1}
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

// ... existing code ...
const processCommentHTML = (htmlContent: string): string => {
  // 使用正则表达式匹配所有img标签并添加防盗链属性
  return htmlContent.replace(
    /<img([^>]*?)>/gi,
    '<img$1 referrerpolicy="no-referrer" crossorigin="anonymous">'
  )
}

// ... existing code ...
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