import clsx from 'clsx'
import { Heart, QrCode } from 'lucide-react'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

import type { QRCodeSectionProps } from '../../../types'
import type {
  DouyinCommentProps
} from '../../../types/platforms/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  qrCodeDataUrl
}) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex justify-center items-center rounded-2xl w-[390px] h-[390px] shadow-medium p-4'>
        {qrCodeDataUrl
          ? (
            <img src={qrCodeDataUrl} alt='二维码' className='object-contain w-full h-full rounded-lg' />
          )
          : (
            <div className='flex flex-col justify-center items-center text-foreground-400'>
              <QrCode size={80} className='mb-4' />
              <span className='text-lg'>二维码生成失败</span>
            </div>
          )}
      </div>
    </div>
  )
}

/**
 * 视频信息头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const VideoInfoHeader: React.FC<Omit<DouyinCommentProps['data'], 'CommentsData'> & { qrCodeDataUrl: string }> = (props) => {
  return (
    <div className='max-w-[1400px] mx-auto px-10 py-8'>
      <div className='flex justify-between items-start gap-16'>
        {/* 左侧信息区域 */}
        <div className='flex-1 flex flex-col'>
          {/* Logo 区域 */}
          <div className='mb-12 h-[180px] flex items-center'>
            <img
              src={props.useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
              alt='抖音Logo'
              className='object-contain h-full w-auto max-w-[500px]'
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = '<div class="flex items-center h-full text-6xl font-bold text-foreground-600">抖音</div>'
                }
              }}
            />
          </div>

          {/* 信息列表 */}
          <div className='grid grid-cols-2 gap-x-16 gap-y-6 pl-2'>
            <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
              <span className='text-foreground-400 mr-4'>类型</span>
              <span className='font-medium text-foreground-600'>{props.Type}</span>
            </div>
            <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
              <span className='text-foreground-400 mr-4'>评论</span>
              <span className='font-medium text-foreground-600'>{props.CommentLength}条</span>
            </div>
            <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
              <span className='text-foreground-400 mr-4'>区域</span>
              <span className='font-medium text-foreground-600'>{props.Region}</span>
            </div>
            {props.Type === '视频' && (
              <>
                <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
                  <span className='text-foreground-400 mr-4'>大小</span>
                  <span className='font-medium text-foreground-600'>{props.VideoSize}MB</span>
                </div>
                <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
                  <span className='text-foreground-400 mr-4'>帧率</span>
                  <span className='font-medium text-foreground-600'>{props.VideoFPS}Hz</span>
                </div>
              </>
            )}
            {(props.Type === '图集' || props.Type === '合辑') && (
              <div>
                <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
                  <span className='text-foreground-400 mr-4'>数量</span>
                  <span className='font-medium text-foreground-600'>{props.ImageLength}张</span>
                </div>
                
              </div>
            )}
          </div>
        </div>

        {/* 右侧二维码区域 */}
        <div className='flex-shrink-0'>
          <QRCodeSection qrCodeDataUrl={props.qrCodeDataUrl} />
        </div>
      </div>
    </div>
  )
}

/**
 * 单个评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
const CommentItemComponent: React.FC<DouyinCommentProps['data']['CommentsData'][number] & { isLast?: boolean }> = (props) => {
  return (
    <div className={clsx(
      'flex px-10 pt-10',
      { 'pb-0': props.isLast, 'pb-15': !props.isLast }
    )}>
      {/* 用户头像 */}
      <img
        src={props.userimageurl}
        className='w-[180px] h-[180px] rounded-full object-cover shadow-lg mr-8 flex-shrink-0'
        alt='用户头像'
      />

      {/* 评论内容 */}
      <div className='flex-1 min-w-0'>
        {/* 用户信息 */}
        <div className='mb-6 text-6xl text-foreground-600 flex items-center gap-7 flex-wrap select-text'>
          <span className='font-medium'>{props.nickname}</span>
          {props.label_type === 1 && (
            <div className='inline-flex items-center px-4 py-2 rounded-xl text-4xl bg-[#fe2c55] text-white'>
              作者
            </div>
          )}
          {props.is_author_digged && (
            <div className='inline-flex items-center px-4 py-2 text-4xl font-light rounded-xl bg-content2 text-foreground-700'>
              作者赞过
            </div>
          )}
          {props.status_label && (
            <div className='inline-flex items-center px-4 py-2 text-4xl rounded-xl font-light bg-content2 text-foreground-700'>
              {props.status_label}
            </div>
          )}
        </div>

        {/* 评论文本 */}
        <div
          className='text-6xl text-foreground leading-[1.6] mb-6 whitespace-pre-wrap select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
          dangerouslySetInnerHTML={{ __html: props.text }}
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        />

        {/* 评论图片 */}
        {(props.commentimage || props.sticker) && (
          <div className='my-6 overflow-hidden shadow-lg rounded-2xl max-w-[600px]'>
            <img
              className='object-contain w-full h-auto rounded-2xl'
              src={props.commentimage || props.sticker}
              alt='评论图片'
            />
          </div>
        )}

        {/* 底部信息和操作区域 */}
        <div className='flex justify-between items-center mt-8 text-foreground-500'>
          <div className='flex items-center gap-6 select-text flex-wrap'>
            <span className='text-5xl'>{props.create_time}</span>
            <span className='text-5xl'>{props.ip_label}</span>
            {props.reply_comment_total > 0 && (
              <span className='text-5xl text-foreground-600'>
                共{props.reply_comment_total}条回复
              </span>
            )}
          </div>

          <div className='flex items-center gap-8 flex-shrink-0'>
            {/* 点赞按钮 */}
            <div className='flex items-center gap-3 transition-colors cursor-pointer'>
              <Heart size={60} className='text-foreground-500' />
              <span className='text-5xl select-text'>{props.digg_count}</span>
            </div>
          </div>
        </div>

        {/* 二级评论 */}
        {props.replyComment && Object.keys(props.replyComment).length > 0 && (
          <div className='mt-10 pl-8 pt-8 border-t border-divider/30'>
            <div className='flex items-start gap-6'>
              <img
                src={props.replyComment.userimageurl}
                className='object-cover rounded-full w-[120px] h-[120px] flex-shrink-0'
                alt='用户头像'
              />
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-3 mb-6'>
                  <span className='text-6xl font-medium text-foreground-600'>{props.replyComment.nickname}</span>
                  {props.replyComment.label_text !== '' && (
                    <div className={clsx(
                      'inline-flex items-center px-4 py-2 text-4xl rounded-xl', 
                      props.replyComment.label_text === '作者' ?
                        'bg-[#fe2c55] text-white' :
                        'bg-default-100 text-default-500'
                    )}>
                      {props.replyComment.label_text}
                    </div>
                  )}
                </div>
                <div
                  className='text-6xl text-foreground leading-[1.6] mb-6 select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] [&_span]:inline'
                  dangerouslySetInnerHTML={{ __html: props.replyComment.text }}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                />
                <div className='flex justify-between items-center mt-8 text-foreground-500'>
                  <div className='flex items-center gap-6 select-text flex-wrap'>
                    <span className='text-5xl'>{props.replyComment.create_time}</span>
                    <span className='text-5xl'>{props.replyComment.ip_label}</span>
                  </div>
                  <div className='flex items-center gap-3 flex-shrink-0'>
                    <Heart size={60} className='text-foreground-500' />
                    <span className='text-5xl'>{props.replyComment.digg_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 抖音评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const DouyinComment: React.FC<Omit<DouyinCommentProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  // 随机选择一个搜索词
  const randomSuggestWord = React.useMemo(() => {
    if (props.data.suggestWrod && props.data.suggestWrod.length > 0) {
      const randomIndex = Math.floor(Math.random() * props.data.suggestWrod.length)
      return props.data.suggestWrod[randomIndex]
    }
    return null
  }, [props.data.suggestWrod])

  return (
    <DefaultLayout {...props}>
      <div className='p-5'>
        {/* 视频信息头部 */}
        <VideoInfoHeader
          {...props.data}
          qrCodeDataUrl={props.qrCodeDataUrl}
        />

        {/* 推荐搜索词 */}
        {randomSuggestWord && (
          <div className='mx-auto my-20 mb-5 ml-10'>
            <div className='flex items-center gap-3 px-6 py-4 rounded-2xl'>
              <span className='text-5xl text-default-500'>大家都在搜：</span>
              <span className='relative text-5xl text-[#04498d] dark:text-[#face15]'>
                {randomSuggestWord}
                <IoSearch size={32} className='absolute -top-2 -right-8' />
              </span>
            </div>
          </div>
        )}
        {/* {randomSuggestWord && (
          <div className='mx-auto my-20 ml-10'>
            <div className='flex items-center gap-10 px-6 py-4 rounded-2xl'>
              <span className='text-5xl text-default-500 font-bold'>相关搜索</span>
              <span className='flex gap-2 bg-default-100 py-5 px-5 rounded-3xl relative text-5xl text-[#04498d] dark:text-[#face15]'>
                <IoSearch size={50} />
                {randomSuggestWord}
                
              </span>
            </div>
          </div>
        )} */}

        {/* 评论列表 */}
        <div className='mt-8 overflow-hidden'>
          {props.data.CommentsData.length > 0
            ? (
              <>
                {props.data.CommentsData.map((comment, index) => (
                  <CommentItemComponent
                    key={comment.cid || index}
                    {...comment}
                    isLast={index === props.data.CommentsData.length - 1}
                  />
                ))}
              </>
            )
            : (
              <div className='flex justify-center items-center py-20 text-foreground-400'>
                <div className='text-center'>
                  <p className='text-xl'>暂无评论数据</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </DefaultLayout>
  )
})

export default DouyinComment