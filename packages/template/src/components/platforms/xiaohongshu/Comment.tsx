import { Heart, MessageCircle, QrCode } from 'lucide-react'
import React, { useMemo } from 'react'

import type {
  XiaohongshuCommentItemComponentProps,
  XiaohongshuCommentProps,
  XiaohongshuNoteInfoHeaderProps,
  XiaohongshuQRCodeSectionProps
} from '../../../types/platforms/xiaohongshu'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 二维码区域组件
 * @param props 组件属性
 * @returns JSX元素
 */
const QRCodeSection: React.FC<XiaohongshuQRCodeSectionProps> = ({
  qrCodeDataUrl
}) => {
  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <div className='flex overflow-hidden justify-center items-center bg-white w-110 h-110'>
        {qrCodeDataUrl
          ? (
            <img
              src={qrCodeDataUrl}
              alt='二维码'
              className='object-contain'
            />
          )
          : (
            <QrCode size={200} className='text-foreground-400' />
          )}
      </div>
      <p className='mt-5 text-[40px] text-foreground-500 text-center'>
        扫码查看原笔记
      </p>
    </div>
  )
}

/**
 * 笔记信息头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const NoteInfoHeader: React.FC<XiaohongshuNoteInfoHeaderProps> = ({
  type,
  commentLength,
  imageLength,
  qrCodeDataUrl
}) => {
  return (
    <div className='flex justify-between items-center max-w-[1200px] mx-auto p-5'>
      <div className='flex flex-col justify-center items-start'>
        {/* Logo 图片区域 */}
        <div className='flex justify-start items-center'>
          <img
            src='/image/xiaohongshu/logo.png'
            alt='小红书Logo'
            className='object-contain mb-10 max-w-full max-h-full scale-150 ml-15'
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = '<div class="flex justify-start items-center h-full text-2xl font-bold text-foreground-600">小红书</div>'
              }
            }}
          />
        </div>

        {/* 文字信息区域 */}
        <div className='mt-8 space-y-4 text-left text-foreground-500'>
          <div className='tracking-[6px] text-[45px] select-text'>
            笔记类型：{type}
          </div>
          <div className='tracking-[6px] text-[45px] select-text'>
            评论数量：{commentLength}条
          </div>
          {type === '图文' && imageLength && (
            <div className='tracking-[6px] text-[45px] select-text'>
              图片数量：{imageLength}张
            </div>
          )}
        </div>
      </div>
      <QRCodeSection
        qrCodeDataUrl={qrCodeDataUrl}
      />
    </div>
  )
}

/**
 * 单个评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
const CommentItemComponent: React.FC<XiaohongshuCommentItemComponentProps & { isLast?: boolean }> = ({ comment, isLast = false }) => {
  return (
    <div className={`flex px-10 pt-10 ${isLast ? 'pb-0' : 'pb-10'}`}>
      {/* 用户头像 */}
      <img
        src={comment.user_info.image}
        className='mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg'
        alt='用户头像'
      />

      {/* 评论内容 */}
      <div className='flex-1'>
        {/* 用户信息 */}
        <div className='mb-12.5 text-[50px] text-foreground-600 relative flex items-center select-text'>
          <span className='font-medium'>{comment.user_info.nickname}</span>
          {comment.show_tags && comment.show_tags.length > 0 && comment.show_tags.map((tag, index) => (
            <div key={index} className='inline-block px-4 py-1 rounded-full ml-3 text-[40px] bg-danger text-danger-foreground'>
              {tag}
            </div>
          ))}
        </div>

        {/* 评论文本 - 使用dangerouslySetInnerHTML渲染HTML */}
        <div
          className='text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] [&_span]:inline'
          dangerouslySetInnerHTML={{ __html: comment.content }}
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        />

        {/* 评论图片 */}
        {comment.pictures && comment.pictures.length > 0 && (
          <div className='flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1'>
            <img
              className='object-contain w-full h-full rounded-2xl'
              src={comment.pictures[0].url_default}
              alt='评论图片'
            />
          </div>
        )}

        {/* 底部信息和操作区域 */}
        <div className='flex justify-between items-center mt-6 text-foreground-500'>
          <div className='flex items-center space-x-6 select-text'>
            <span className='text-[45px]'>{comment.create_time}</span>
            <span className='text-[45px]'>{comment.ip_location}</span>
            {parseInt(comment.sub_comment_count) > 0
              ? (
                <span className='text-[40px] text-foreground-600'>
                  共{comment.sub_comment_count}条回复
                </span>
              )
              : (
                <span className='text-[40px] text-foreground-600'>回复</span>
              )}
          </div>

          <div className='flex items-center space-x-6'>
            {/* 点赞按钮 */}
            <div className='flex items-center space-x-2 transition-colors cursor-pointer'>
              <Heart size={60} className={comment.liked ? 'text-red-500 fill-current' : 'text-foreground-500'} />
              <span className='text-[50px] select-text'>{comment.like_count}</span>
            </div>

            {/* 回复按钮 */}
            <div className='flex items-center transition-colors cursor-pointer'>
              <MessageCircle size={60} className='stroke-current text-foreground-500' />
            </div>
          </div>
        </div>

        {/* 子评论 */}
        {comment.sub_comments && comment.sub_comments.length > 0 && (
          <div className='pl-6 mt-6'>
            {comment.sub_comments.map((subComment, index) => (
              <div key={subComment.id} className={`py-4 ${index !== comment.sub_comments.length - 1 ? 'border-b border-divider' : ''}`}>
                <div className='flex items-start space-x-4'>
                  <img
                    src={subComment.user_info.image}
                    className='w-[120px] h-[120px] rounded-full object-cover'
                    alt='用户头像'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center mb-2 space-x-2'>
                      <span className='text-[40px] font-medium text-foreground-600'>{subComment.user_info.nickname}</span>
                      {subComment.show_tags && subComment.show_tags.length > 0 && subComment.show_tags.map((tag, tagIndex) => (
                        tag === 'is_author' ? (
                          <div key={tagIndex} className='inline-block px-3 ml-2 py-1 rounded-2xl text-[30px] bg-default-100 text-default-500'>
                            作者
                          </div>
                        ) : null
                      ))}
                    </div>
                    <div
                      className='text-[45px] text-foreground leading-relaxed mb-2 select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline'
                      dangerouslySetInnerHTML={{ __html: subComment.content }}
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    />
                    <div className='flex justify-between items-center text-foreground-500'>
                      <div className='flex items-center space-x-4'>
                        <span className='text-[35px]'>{subComment.create_time}</span>
                        <span className='text-[35px]'>{subComment.ip_location}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Heart size={40} className={subComment.liked ? 'text-red-500 fill-current' : 'text-foreground-500'} />
                        <span className='text-[35px]'>{subComment.like_count}</span>
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

/**
 * 小红书评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const XiaohongshuComment: React.FC<Omit<XiaohongshuCommentProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const processedData = useMemo(() => {
    if (!props.data) {
      return {
        commentsArray: [],
        type: '图文' as const,
        commentLength: 0,
        imageLength: undefined,
        useDarkTheme: false
      }
    }

    const { CommentsData, Type, CommentLength, ImageLength } = props.data
    // 直接使用CommentsData，不再需要jsonArray包装
    const commentsArray = CommentsData || []

    return {
      commentsArray,
      type: Type,
      commentLength: CommentLength,
      imageLength: ImageLength
    }
  }, [props.data])

  const { commentsArray, type, commentLength, imageLength } = processedData

  return (
    <DefaultLayout {...props}>
      <div className='w-full min-h-screen'>
        {/* 页面头部 */}
        <NoteInfoHeader
          type={type}
          commentLength={commentLength}
          imageLength={imageLength}
          qrCodeDataUrl={props.qrCodeDataUrl}
        />

        {/* 评论列表 */}
        <div className='max-w-[1200px] mx-auto'>
          {commentsArray.length > 0
            ? (
              <div className='divide-y divide-divider'>
                {commentsArray.map((comment, index) => (
                  <CommentItemComponent
                    key={comment.id}
                    comment={comment}
                    isLast={index === commentsArray.length - 1}
                  />
                ))}
              </div>
            )
            : (
              <div className='flex justify-center items-center py-20'>
                <p className='text-[60px] text-foreground-400'>暂无评论</p>
              </div>
            )}
        </div>
      </div>
    </DefaultLayout>
  )
})

export default XiaohongshuComment