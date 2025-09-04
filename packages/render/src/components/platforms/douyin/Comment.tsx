import React from 'react'
import {
  DouyinCommentProps,
  QRCodeSectionProps,
  VideoInfoHeaderProps,
  CommentItemComponentProps
} from '../../../types/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Heart, MessageCircle, QrCode } from 'lucide-react'
import { useMemo } from 'react'

/**
 * 二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  qrCodeDataUrl
}) => {
  return (
    <div className="flex flex-col items-center -mr-10">
      <div className="mt-20 flex items-center justify-center w-[600px] h-[600px] bg-white rounded-lg">
        {qrCodeDataUrl ? (
          <img src={qrCodeDataUrl} alt="二维码" className="object-contain w-full h-full" />
        ) : (
          <div className="flex flex-col justify-center items-center text-default-400">
            <QrCode size={80} className="mb-4" />
            <span className="text-lg">二维码生成失败</span>
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
const VideoInfoHeader: React.FC<VideoInfoHeaderProps> = ({
  type,
  commentLength,
  videoSize,
  videoFPS,
  imageLength,
  qrCodeDataUrl,
  useDarkTheme,
}) => {
  return (
    <div className="flex justify-between items-center max-w-[1200px] mx-auto p-5">
      <div className="mt-2.5 flex flex-col -ml-10">
        <div className="absolute top-0 left-0 transform translate-x-[9%] translate-y-[17%] w-[650px] h-[300px]">
          <img
            src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
            alt="抖音Logo"
            className="object-contain w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = '<div class="flex justify-center items-center h-full text-2xl font-bold text-gray-600">抖音</div>'
              }
            }}
          />
        </div>
        <div className="mt-[250px] space-y-2 text-default-90">
          <div className="flex items-center p-2.5 tracking-[6px] text-[45px] text-left">
            作品类型：{type}
          </div>
          <div className="flex items-center p-2.5 tracking-[6px] text-[45px] text-left">
            评论数量：{commentLength}条
          </div>
          {type === '视频' && (
            <>
              <div className="flex items-center p-2.5 tracking-[6px] text-[45px] text-left">
                视频大小：{videoSize}MB
              </div>
              <div className="flex items-center p-2.5 tracking-[6px] text-[45px] text-left">
                视频帧率：{videoFPS}Hz
              </div>
            </>
          )}
          {(type === '图集' || type === '合辑') && (
            <div className="flex items-center p-2.5 tracking-[6px] text-[45px] text-left">
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
const CommentItemComponent: React.FC<CommentItemComponentProps> = ({ comment }) => {
  return (
    <div className="flex p-10">
      {/* 用户头像 */}
      <img
        src={comment.userimageurl}
        className="mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg"
        alt="用户头像"
      />

      {/* 评论内容 */}
      <div className="flex-1">
        {/* 用户信息 */}
        <div className="mb-12.5 text-[50px] text-default-40 relative flex items-center">
          <span className="font-medium">{comment.nickname}</span>
          {comment.label_type === 1 && (
            <div className="inline-block px-4 py-1 rounded-full ml-3 text-[40px] bg-red-500 text-white">
              作者
            </div>
          )}
          {comment.status_label && (
            <div className="inline-block px-4 py-1 rounded-xl ml-3 text-[40px] bg-default-10 text-default-90">
              {comment.status_label}
            </div>
          )}
        </div>

        {/* 评论文本 */}
        <div
          className="text-[60px] text-default-90 leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]"
          dangerouslySetInnerHTML={{ __html: comment.text }}
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        />

        {/* 评论图片 */}
        {(comment.commentimage || comment.sticker) && (
          <div className="flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1">
            <img
              className="object-contain w-full h-full rounded-2xl"
              src={comment.commentimage || comment.sticker}
              alt="评论图片"
            />
          </div>
        )}

        {/* 底部信息和操作区域 */}
        <div className="flex justify-between items-center mt-6 text-default-500">
          <div className="flex items-center space-x-6">
            <span className="text-[45px]">{comment.create_time}</span>
            <span className="text-[45px]">{comment.ip_label}</span>
            {comment.reply_comment_total > 0 ? (
              <span className="text-[40px] text-default-">
                共{comment.reply_comment_total}条回复
              </span>
            ) : (
              <span className="text-[40px] text-default-600">回复</span>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {/* 点赞按钮 */}
            <div className="flex items-center space-x-2 transition-colors cursor-pointer">
              <Heart size={60} className="stroke-current" />
              <span className="text-[50px]">{comment.digg_count}</span>
            </div>

            {/* 回复按钮 */}
            <div className="flex items-center transition-colors cursor-pointer">
              <MessageCircle size={60} className="stroke-current" />
            </div>
          </div>
        </div>
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
  const processedData = useMemo(() => {
    if (!props.data) {
      return {
        commentsArray: [],
        type: '未知',
        commentLength: 0,
        videoSize: undefined,
        videoFPS: undefined,
        imageLength: undefined,
        useDarkTheme: false
      };
    }

    return {
      commentsArray: props.data.CommentsData?.jsonArray || [],
      type: props.data.Type || '未知',
      commentLength: props.data.CommentLength || 0,
      videoSize: props.data.VideoSize,
      videoFPS: props.data.VideoFPS,
      imageLength: props.data.ImageLength,
      useDarkTheme: props.data.useDarkTheme || false
    };
  }, [props.data])

  return (
    <DefaultLayout {...props}>
      <div className='p-5'>
        {/* 视频信息头部 */}
        <VideoInfoHeader
          type={processedData.type}
          commentLength={processedData.commentLength}
          videoSize={processedData.videoSize}
          videoFPS={processedData.videoFPS}
          imageLength={processedData.imageLength}
          qrCodeDataUrl={props.qrCodeDataUrl || ''}
          useDarkTheme={processedData.useDarkTheme}
        />

        {/* 评论列表 */}
        <div className="overflow-auto mx-auto max-w-full">
          {processedData.commentsArray.length > 0 ? (
            processedData.commentsArray.map((comment, index) => (
              <CommentItemComponent key={index} comment={comment} />
            ))
          ) : (
            <div className="flex justify-center items-center py-20 text-gray-500">
              <div className="text-center">
                <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-xl">暂无评论数据</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  )
});

export default DouyinComment