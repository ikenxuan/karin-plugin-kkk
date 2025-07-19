import React, { useState } from 'react';
import { PhotoView } from 'react-photo-view';
import HeicImage from '@/components/heicImage';

interface PhotoViewWithHeicProps {
  src: string
  alt: string
  className?: string
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
}

/**
 * 支持HEIC格式的图片预览组件
 * 结合PhotoView和HeicImage，解决HEIC图片在预览时显示黑色的问题
 * @param src - 图片源地址
 * @param alt - 图片替代文本
 * @param className - CSS类名
 * @param referrerPolicy - 引用策略
 * @param crossOrigin - 跨域设置
 */
const PhotoViewWithHeic: React.FC<PhotoViewWithHeicProps> = ({
  src,
  alt,
  className,
  referrerPolicy,
  crossOrigin
}) => {
  const [previewSrc, setPreviewSrc] = useState<string>(src)

  return (
    <PhotoView src={previewSrc}>
      <HeicImage
        src={src}
        alt={alt}
        className={className}
        referrerPolicy={referrerPolicy}
        crossOrigin={crossOrigin}
        onProcessed={setPreviewSrc}
      />
    </PhotoView>
  )
}

export default PhotoViewWithHeic