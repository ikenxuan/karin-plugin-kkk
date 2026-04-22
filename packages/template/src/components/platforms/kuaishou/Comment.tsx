import { Icon } from '@iconify/react'
import { renderRichTextToReact } from '@kkk/richtext'
import { differenceInSeconds, format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import React from 'react'

import type {
  KuaishouCommentItemComponentProps,
  KuaishouCommentProps,
  KuaishouQRCodeSectionProps,
  KuaishouVideoInfoHeaderProps
} from '../../../types/platforms/kuaishou'
import { DefaultLayout } from '../../layouts/DefaultLayout'

const kuaishouMentionClassName = 'text-[#03488d] dark:text-[#c7daef]'

const renderKuaishouCommentRichText = (content: KuaishouCommentItemComponentProps['comment']['text']) => {
  return renderRichTextToReact(content, {
    mention: { className: kuaishouMentionClassName }
  })
}

const formatKuaishouCommentTime = (timestamp: number): string => {
  if (!timestamp) {
    return ''
  }

  const commentDate = new Date(timestamp)
  const diffSeconds = differenceInSeconds(new Date(), commentDate)

  if (diffSeconds < 30) {
    return '刚刚'
  }

  if (diffSeconds < 7776000) {
    return formatDistanceToNow(commentDate, {
      locale: zhCN,
      addSuffix: true
    })
  }

  return format(commentDate, 'yyyy-MM-dd')
}

const formatKuaishouLikeCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}w`
  }

  return String(count)
}

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
      <div className='mt-20 flex items-center justify-center w-150 h-150 bg-surface rounded-lg shadow-medium'>
        {qrCodeDataUrl
          ? (
            <img src={qrCodeDataUrl} alt='二维码' className='object-contain w-full h-full' />
          )
          : (
            <div className='flex flex-col justify-center items-center text-muted'>
              <Icon icon="lucide:qr-code" width={80} className='mb-4' />
              <span className='text-lg'>二维码生成失败</span>
            </div>
          )}
      </div>
      <div className='mt-5 text-[45px] text-center text-foreground'>
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
    <div className='flex justify-between items-center max-w-300 mx-auto p-5'>
      <div className='mt-2.5 flex flex-col -ml-11'>
        <div className='mb-5'>
          <img
            src='/image/kuaishou/logo.png'
            alt='快手Logo'
            className='w-162.5 h-auto'
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = '<div class="flex justify-center items-center h-full text-2xl font-bold text-foreground">快手</div>'
              }
            }}
          />
        </div>
        <div className='space-y-2 text-foreground'>
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
      <img
        src={comment.userimageurl}
        className='mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg'
        alt='用户头像'
      />

      <div className='flex-1'>
        <div className='mb-12.5 text-[50px] text-foreground/70 relative flex items-center'>
          <span className='font-medium'>{comment.nickname}</span>
        </div>

        <div
          className='text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text'
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {renderKuaishouCommentRichText(comment.text)}
        </div>

        {(comment.commentimage || comment.sticker) && (
          <div className='flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1'>
            <img
              className='object-contain w-full h-full rounded-2xl'
              src={comment.commentimage || comment.sticker}
              alt='评论图片'
            />
          </div>
        )}

        <div className='flex justify-between items-center mt-6 text-muted'>
          <div className='flex items-center space-x-6'>
            <span className='text-[45px] select-text'>{formatKuaishouCommentTime(comment.create_time)}</span>
            {comment.ip_label && (
              <span className='text-[45px] select-text'>{comment.ip_label}</span>
            )}
            {comment.reply_comment_total && comment.reply_comment_total > 0
              ? (
                <span className='text-[40px] text-foreground/70'>
                  共{comment.reply_comment_total}条回复
                </span>
              )
              : (
                <span className='text-[40px] text-foreground/70'>回复</span>
              )}
          </div>

          <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2 transition-colors cursor-pointer hover:text-danger'>
              <Icon icon="lucide:heart" width={60} className='stroke-current' />
              <span className='text-[50px] select-text'>{formatKuaishouLikeCount(comment.digg_count)}</span>
            </div>

            <div className='flex items-center transition-colors cursor-pointer hover:text-accent'>
              <Icon icon="lucide:message-circle" width={60} className='stroke-current' />
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
  const commentsArray = Array.isArray(props.data?.CommentsData) ? props.data.CommentsData : []

  return (
    <DefaultLayout {...props}>
      <div className='p-5'>
        <div className='flex justify-between items-center max-w-300 mx-auto p-5'>
          <KuaishouVideoInfoHeader
            type={props.data?.Type || '视频'}
            commentLength={props.data?.CommentLength || 0}
            videoSize={props.data?.VideoSize}
            likeCount={props.data?.likeCount}
            viewCount={props.data?.viewCount}
            imageLength={props.data?.ImageLength}
            useDarkTheme={props.data?.useDarkTheme}
          />
          <KuaishouQRCodeSection
            qrCodeDataUrl={props.qrCodeDataUrl || ''}
            type={props.data?.Type || '视频'}
            imageLength={props.data?.ImageLength}
            useDarkTheme={props.data?.useDarkTheme}
          />
        </div>

        <div className='overflow-auto mx-auto max-w-full'>
          {commentsArray.length > 0
            ? (
              commentsArray.map((comment, index) => (
                <KuaishouCommentItemComponent
                  key={comment.cid || index}
                  comment={comment}
                  isLast={index === commentsArray.length - 1}
                />
              ))
            )
            : (
              <div className='flex justify-center items-center py-20 text-muted'>
                <div className='text-center'>
                  <Icon icon="lucide:message-circle" width={64} className='mx-auto mb-4 text-muted/70' />
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
