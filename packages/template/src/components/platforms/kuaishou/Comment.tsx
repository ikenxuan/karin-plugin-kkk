import { Heart, MessageCircle, QrCode } from 'lucide-react'
import React, { useMemo } from 'react'

import type {
  KuaishouCommentItemComponentProps,
  KuaishouCommentProps,
  KuaishouQRCodeSectionProps,
  KuaishouVideoInfoHeaderProps
} from '../../../types/platforms/kuaishou'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 快手二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const KuaishouQRCodeSection: React.FC<KuaishouQRCodeSectionProps> = ({
  qrCodeDataUrl,
  type,
  imageLength
}) => {
  return (
    <div className='flex flex-col items-center -mr-10'>
      <div className='mt-20 flex items-center justify-center w-[600px] h-[600px] bg-white rounded-lg'>
        {qrCodeDataUrl
          ? (
            <img src={qrCodeDataUrl} alt='二维码' className='object-contain w-full h-full' />
          )
          : (
            <div className='flex flex-col justify-center items-center text-default-400'>
              <QrCode size={80} className='mb-4' />
              <span className='text-lg'>二维码生成失败</span>
            </div>
          )}
      </div>
      <div className='mt-5 text-[45px] text-center text-default-90'>
        {type === '视频'
          ? '视频直链(永久)'
          : type === '图集'
            ? `图集分享链接 共${imageLength}张`
            : '分享链接'}
      </div>
    </div>
  )
}

/**
 * 快手视频信息头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const KuaishouVideoInfoHeader: React.FC<KuaishouVideoInfoHeaderProps> = ({
  type,
  commentLength,
  videoSize,
  likeCount,
  viewCount,
  imageLength
}) => {
  return (
    <div className='flex justify-between items-center max-w-[1200px] mx-auto p-5'>
      <div className='mt-2.5 flex flex-col -ml-11'>
        <div className='mb-5'>
          <img
            src='/image/kuaishou/logo.png'
            alt='快手Logo'
            className='w-[650px] h-auto'
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = '<div class="flex justify-center items-center h-full text-2xl font-bold text-gray-600">快手</div>'
              }
            }}
          />
        </div>
        <div className='space-y-2 text-default-90'>
          <div className='flex items-center p-2.5 tracking-[6px] text-[45px] text-left'>
            评论数量：{commentLength}条
          </div>
          {type === '视频' && (
            <>
              <div className='flex items-center p-2.5 tracking-[6px] text-[45px] text-left'>
                视频大小：{videoSize}MB
              </div>
              <div className='flex items-center p-2.5 tracking-[6px] text-[45px] text-left'>
                点赞数量：{likeCount}
              </div>
              <div className='flex items-center p-2.5 tracking-[6px] text-[45px] text-left'>
                观看次数：{viewCount}
              </div>
            </>
          )}
          {type === '图集' && (
            <div className='flex items-center p-2.5 tracking-[6px] text-[45px] text-left'>
              图片数量：{imageLength}张
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * 快手单个评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
const KuaishouCommentItemComponent: React.FC<KuaishouCommentItemComponentProps & { isLast?: boolean }> = ({ comment, isLast = false }) => {
  return (
    <div className={`flex px-10 pt-10 ${isLast ? 'pb-0' : 'pb-10'}`}>
      {/* 用户头像 */}
      <img
        src={comment.userimageurl}
        className='mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg'
        alt='用户头像'
      />

      {/* 评论内容 */}
      <div className='flex-1'>
        {/* 用户信息 */}
        <div className='mb-12.5 text-[50px] text-default-40 relative flex items-center'>
          <span className='font-medium'>{comment.nickname}</span>
        </div>

        {/* 评论文本 */}
        <div
          className='text-[60px] text-default-90 leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
          dangerouslySetInnerHTML={{ __html: comment.text }}
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        />

        {/* 评论图片 */}
        {(comment.commentimage || comment.sticker) && (
          <div className='flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1'>
            <img
              className='object-contain w-full h-full rounded-2xl'
              src={comment.commentimage || comment.sticker}
              alt='评论图片'
            />
          </div>
        )}

        {/* 底部信息和操作区域 */}
        <div className='flex justify-between items-center mt-6 text-default-500'>
          <div className='flex items-center space-x-6'>
            <span className='text-[45px]'>{comment.create_time}</span>
            {comment.ip_label && (
              <span className='text-[45px]'>{comment.ip_label}</span>
            )}
            {comment.reply_comment_total && comment.reply_comment_total > 0
              ? (
                <span className='text-[40px] text-default-'>
                  共{comment.reply_comment_total}条回复
                </span>
              )
              : (
                <span className='text-[40px] text-default-600'>回复</span>
              )}
          </div>

          <div className='flex items-center space-x-6'>
            {/* 点赞按钮 */}
            <div className='flex items-center space-x-2 transition-colors cursor-pointer'>
              <Heart size={60} className='stroke-current' />
              <span className='text-[50px]'>{comment.digg_count}</span>
            </div>

            {/* 回复按钮 */}
            <div className='flex items-center transition-colors cursor-pointer'>
              <MessageCircle size={60} className='stroke-current' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 快手评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const KuaishouComment: React.FC<Omit<KuaishouCommentProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const processedData = useMemo(() => {
    if (!props.data) {
      return {
        commentsArray: [],
        type: '未知',
        commentLength: 0,
        videoSize: undefined,
        likeCount: undefined,
        viewCount: undefined,
        imageLength: undefined,
        useDarkTheme: false
      }
    }

    return {
      commentsArray: Array.isArray(props.data.CommentsData) 
        ? props.data.CommentsData 
        : (props.data.CommentsData?.jsonArray || []),
      type: props.data.Type || '未知',
      commentLength: props.data.CommentLength || 0,
      videoSize: props.data.VideoSize,
      likeCount: props.data.likeCount,
      viewCount: props.data.viewCount,
      imageLength: props.data.ImageLength,
      useDarkTheme: props.data.useDarkTheme || false
    }
  }, [props.data])

  return (
    <DefaultLayout {...props}>
      <div className='p-5'>
        {/* 视频信息头部 */}
        <div className='flex justify-between items-center max-w-[1200px] mx-auto p-5'>
          <KuaishouVideoInfoHeader
            type={processedData.type}
            commentLength={processedData.commentLength}
            videoSize={processedData.videoSize}
            likeCount={processedData.likeCount}
            viewCount={processedData.viewCount}
            imageLength={processedData.imageLength}
            useDarkTheme={processedData.useDarkTheme}
          />
          <KuaishouQRCodeSection
            qrCodeDataUrl={props.qrCodeDataUrl || ''}
            type={processedData.type}
            imageLength={processedData.imageLength}
            useDarkTheme={processedData.useDarkTheme}
          />
        </div>

        {/* 评论列表 */}
        <div className='overflow-auto mx-auto max-w-full'>
          {processedData.commentsArray.length > 0
            ? (
              processedData.commentsArray.map((comment, index) => (
                <KuaishouCommentItemComponent 
                  key={index} 
                  comment={comment} 
                  isLast={index === processedData.commentsArray.length - 1}
                />
              ))
            )
            : (
              <div className='flex justify-center items-center py-20 text-gray-500'>
                <div className='text-center'>
                  <MessageCircle size={64} className='mx-auto mb-4 text-gray-300' />
                  <p className='text-xl'>暂无评论数据</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </DefaultLayout>
  )
})

export default KuaishouComment