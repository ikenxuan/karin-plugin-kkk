import React from 'react'
import { PhotoView } from 'react-photo-view'
import UniversalImage, { ImageType } from './UniversalImage'

interface UniversalPhotoViewProps {
  /** 图片源地址 */
  src: string
  /** 视频源地址（Live图片） */
  videoSrc?: string
  /** 图片替代文本 */
  alt: string
  /** CSS类名 */
  className?: string
  /** 引用策略 */
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
  /** 跨域设置 */
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
  /** 图片类型 */
  type?: ImageType
  /** Live图片配置 */
  liveConfig?: {
    muted?: boolean
    loop?: boolean
    showIcon?: boolean
    enableHoverPlay?: boolean
    enableLongPress?: boolean
  }
}

/**
 * 统一图片预览组件
 * 自动处理所有类型图片的预览，包括Live图片
 */
const UniversalPhotoView: React.FC<UniversalPhotoViewProps> = ({
  src,
  videoSrc,
  alt,
  className,
  referrerPolicy,
  crossOrigin,
  type,
  liveConfig = {}
}) => {
  const [previewSrc, setPreviewSrc] = React.useState<string>(src)
  const [imageType, setImageType] = React.useState<ImageType>(type || ImageType.STATIC)

  /**
   * 处理图片处理完成
   */
  const handleProcessed = (processedSrc: string, detectedType: ImageType) => {
    setPreviewSrc(processedSrc)
    setImageType(detectedType)
  }

  /**
   * 处理Live图标点击
   */
  const handleImageClick = (e: React.MouseEvent) => {
    // 如果点击的是Live图标，阻止预览打开
    const target = e.target as HTMLElement
    if (target.closest('.live-icon')) {
      e.stopPropagation()
      return
    }
  }

  /**
   * Live图片的自定义预览内容
   */
  const renderLivePreview = () => {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <UniversalImage
          src={src}
          videoSrc={videoSrc}
          alt={alt}
          type={ImageType.LIVE}
          className="max-w-full max-h-full"
          referrerPolicy={referrerPolicy}
          crossOrigin={crossOrigin}
          muted={liveConfig.muted}
          loop={liveConfig.loop}
          showLiveIcon={true}
          enableHoverPlay={liveConfig.enableHoverPlay ?? true}
          enableLongPress={liveConfig.enableLongPress ?? true}
        />
      </div>
    )
  }

  // Live图片使用自定义预览内容
  if (imageType === ImageType.LIVE && videoSrc) {
    return (
      <PhotoView
        src={previewSrc}
        render={renderLivePreview}
      >
        <UniversalImage
          src={src}
          videoSrc={videoSrc}
          alt={alt}
          className={className}
          referrerPolicy={referrerPolicy}
          crossOrigin={crossOrigin}
          type={type}
          muted={liveConfig.muted}
          loop={liveConfig.loop}
          showLiveIcon={liveConfig.showIcon}
          enableHoverPlay={liveConfig.enableHoverPlay ?? true}
          enableLongPress={liveConfig.enableLongPress ?? true}
          onClick={handleImageClick}
          onProcessed={handleProcessed}
        />
      </PhotoView>
    )
  }

  // 普通图片和HEIC图片使用PhotoView预览
  return (
    <PhotoView src={previewSrc}>
      <UniversalImage
        src={src}
        videoSrc={videoSrc}
        alt={alt}
        className={className}
        referrerPolicy={referrerPolicy}
        crossOrigin={crossOrigin}
        type={type}
        muted={liveConfig.muted}
        loop={liveConfig.loop}
        showLiveIcon={liveConfig.showIcon}
        enableHoverPlay={liveConfig.enableHoverPlay ?? false}
        enableLongPress={liveConfig.enableLongPress ?? false}
        onClick={handleImageClick}
        onProcessed={handleProcessed}
      />
    </PhotoView>
  )
}

export default UniversalPhotoView