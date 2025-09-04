import React, { useEffect, useRef } from 'react'
import {
  BilibiliCommentProps,
  QRCodeSectionProps,
  VideoInfoHeaderProps,
  CommentItemComponentProps
} from '../../../types/bilibili'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

/**
 * 二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  shareurl,
  qrCodeDataUrl,
  useDarkTheme
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 这里会动态生成二维码
    if (qrCodeRef.current && shareurl) {
      // 使用QRCode库生成二维码的逻辑
      // const qrcode = new QRCode(qrCodeRef.current, {
      //   width: 600,
      //   height: 600,
      //   colorDark: useDarkTheme ? '#c3c3c3' : '#3a3a3a',
      //   colorLight: useDarkTheme ? '#121212' : '#f4f4f4',
      // })
      // qrcode.makeCode(shareurl)
    }
  }, [shareurl, useDarkTheme])

  return (
    <div className="flex flex-col items-center -mr-10">
      <div
        ref={qrCodeRef}
        className="mt-20 w-[600px] h-[600px] flex items-center justify-center"
      >
        {qrCodeDataUrl ? (
          <img src={qrCodeDataUrl} alt="二维码" className="object-contain w-full h-full" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-6xl ${useDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
            二维码占位符
          </div>
        )}
      </div>
      <div className={`text-[45px] mt-5 ${useDarkTheme ? 'text-gray-300' : 'text-gray-700'
        }`}>
        {shareurl}
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
  clarity,
  imageLength,
  useDarkTheme
}) => {
  return (
    <div className="flex flex-col mt-2.5 -ml-10">
      {/* B站Logo占位符 */}
      <div className="w-[580px] h-auto mb-5">
        <div className={`text-8xl font-bold ${useDarkTheme ? 'text-blue-400' : 'text-blue-500'
          }`}>
          BILIBILI_LOGO_PLACEHOLDER
        </div>
      </div>

      <div className={`text-[45px] p-2.5 tracking-[6px] text-left break-all ${useDarkTheme ? 'text-gray-300' : 'text-gray-700'
        }`}>
        作品类型：{type}
      </div>

      <div className={`text-[45px] p-2.5 tracking-[6px] text-left break-all ${useDarkTheme ? 'text-gray-300' : 'text-gray-700'
        }`}>
        评论数量：{commentLength}条
      </div>

      {type === '视频' && (
        <>
          {videoSize && (
            <div className={`text-[45px] p-2.5 tracking-[6px] text-left break-all ${useDarkTheme ? 'text-gray-300' : 'text-gray-700'
              }`}>
              视频大小：{videoSize}MB
            </div>
          )}
          {clarity && (
            <div className={`text-[45px] p-2.5 tracking-[6px] text-left break-all ${useDarkTheme ? 'text-gray-300' : 'text-gray-700'
              }`}>
              视频画质：{clarity}
            </div>
          )}
        </>
      )}

      {(type === '图集' || type === '动态') && imageLength && (
        <div className={`text-[45px] p-2.5 tracking-[6px] text-left break-all ${useDarkTheme ? 'text-gray-300' : 'text-gray-700'
          }`}>
          {type === '图集' ? '图片数量' : '附带图片'}：{imageLength}张
        </div>
      )}
    </div>
  )
}

/**
 * 评论项组件
 * @param props 组件属性
 * @returns JSX元素
 */
const CommentItemComponent: React.FC<CommentItemComponentProps> = ({
  comment,
  useDarkTheme
}) => {
  return (
    <div className="flex px-10 pb-0 relative max-w-full mb-[70px]">
      {/* 用户头像 */}
      <div className="relative mt-[50px] mr-[33.75px]">
        <img
          src={comment.avatar || 'AVATAR_PLACEHOLDER'}
          alt="用户头像"
          className="w-[187.5px] h-[187.5px] rounded-full shadow-[0_20px_50px_0_rgba(0,0,0,0.3)] absolute"
        />

        {/* 头像框 */}
        {comment.frame && (
          <img
            src={comment.frame || 'FRAME_PLACEHOLDER'}
            alt="头像框"
            className="w-[220px] h-[220px] mr-[33.75px] mt-[50px] transform -translate-y-[7%] -translate-x-[8%] scale-150"
          />
        )}

        {/* VIP图标 */}
        {comment.icon_big_vip && (
          <img
            src={comment.icon_big_vip || 'VIP_ICON_PLACEHOLDER'}
            alt="VIP图标"
            className="w-[145px] h-[145px] -mr-[140px] transform translate-y-[97%] -translate-x-[116%] scale-50"
          />
        )}
      </div>

      {/* 评论内容 */}
      <div className="flex-1">
        {/* 用户信息 */}
        <div className="-mb-[50px] text-[50px] relative">
          {/* 用户名 */}
          <span
            className={useDarkTheme ? 'text-gray-200' : 'text-gray-800'}
            dangerouslySetInnerHTML={{ __html: comment.uname }}
          />

          {/* 作者标签 */}
          {comment.label_type === 1 && (
            <div className="inline-block px-5 py-0.5 rounded-[10px] ml-2.5 text-[45px] bg-[rgb(254,44,85)] text-white">
              作者
            </div>
          )}

          {/* 状态标签 */}
          {comment.status_label && (
            <div className="inline-block px-5 py-0.5 rounded-[10px] ml-2.5 text-[45px] bg-gray-200 text-gray-600">
              {comment.status_label}
            </div>
          )}
        </div>

        {/* 评论文本 */}
        <div
          className={`text-[60px] items-center tracking-[0.5px] relative leading-[1.6] whitespace-pre-wrap ${useDarkTheme ? 'text-gray-100' : 'text-gray-800'
            }`}
          dangerouslySetInnerHTML={{ __html: comment.message }}
        />

        {/* 评论图片 */}
        {(comment.img_src || comment.sticker) && (
          <div className={`flex my-5 overflow-hidden rounded-[25px] w-[95%] flex-1 ${useDarkTheme
              ? 'shadow-[0px_10px_100px_0px_rgba(150,150,150,0.26)]'
              : 'shadow-[0_20px_50px_0_rgba(0,0,0,0.3)]'
            }`}>
            <img
              src={comment.img_src || comment.sticker || 'IMAGE_PLACEHOLDER'}
              alt="评论图片"
              className="rounded-[25px] object-contain w-full h-full"
            />
          </div>
        )}

        {/* 点赞区域 */}
        <div className={`flex items-center justify-between mt-[37.5px] whitespace-nowrap ${useDarkTheme ? 'text-gray-400' : 'text-gray-500'
          }`}>
          <div className="flex flex-1 items-center">
            <div className="text-[45px] tracking-[2px]">
              {comment.ctime} · {comment.location}
              {comment.replylength > 0 ? (
                <span className="text-gray-400 tracking-[3px]">
                  {comment.replylength}回复
                </span>
              ) : (
                <span className="text-gray-600">回复</span>
              )}
            </div>

            <div className="flex ml-auto">
              <div className="flex ml-auto">
                <div className="flex items-center text-[50px] ml-auto">
                  {/* 点赞图标占位符 */}
                  <div className="w-[75px] h-[75px] mr-2 bg-gray-400 rounded flex items-center justify-center text-white text-xs">
                    👍
                  </div>
                  <span>{comment.like}   </span>
                  {/* 点踩图标占位符 */}
                  <div className="w-[75px] h-[75px] ml-2 bg-gray-400 rounded flex items-center justify-center text-white text-xs">
                    👎
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * B站评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const BilibiliComment: React.FC<Omit<BilibiliCommentProps, 'templateType' | 'templateName'>> = (props) => {
  const { data, qrCodeDataUrl } = props
  const { useDarkTheme, Type, CommentLength, VideoSize, Clarity, ImageLength, shareurl, share_url, CommentsData } = data

  return (
    <DefaultLayout {...props}>
      {/* 视频信息和二维码区域 */}
      <div className="flex justify-between items-center max-w-[1200px] mx-auto p-5">
        <VideoInfoHeader
          type={Type}
          commentLength={CommentLength}
          videoSize={VideoSize}
          clarity={Clarity}
          imageLength={ImageLength}
          useDarkTheme={useDarkTheme}
        />

        <QRCodeSection
          shareurl={shareurl || share_url}
          qrCodeDataUrl={qrCodeDataUrl}
          useDarkTheme={useDarkTheme}
        />
      </div>

      {/* 评论列表 */}
      <div className="max-w-full mx-0 mb-[70px]">
        {CommentsData.map((comment, index) => (
          <CommentItemComponent
            key={index}
            comment={comment}
            useDarkTheme={useDarkTheme}
          />
        ))}
      </div>
    </DefaultLayout>
  )
}

export default BilibiliComment