import axios from 'axios'
import convert from 'heic-convert/browser'
import React, { useEffect, useRef,useState } from 'react'
import { CgLivePhoto } from "react-icons/cg"

import { useIsMobile } from '@/hooks/use-mobile'

/**
 * 图片类型枚举
 */
export enum ImageType {
  STATIC = 'static',
  HEIC = 'heic',
  LIVE = 'live'
}

/**
 * 统一图片组件属性接口
 */
interface UniversalImageProps {
  /** 图片源地址（静态图片或Live图片的静态部分） */
  src: string
  /** 视频源地址（仅Live图片需要） */
  videoSrc?: string
  /** 图片替代文本 */
  alt: string
  /** CSS类名 */
  className?: string
  /** 引用策略 */
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
  /** 跨域设置 */
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
  /** 图片类型，如果不指定会自动检测 */
  type?: ImageType
  /** Live图片是否静音播放 */
  muted?: boolean
  /** Live图片是否循环播放 */
  loop?: boolean
  /** 是否显示Live图标 */
  showLiveIcon?: boolean
  /** 是否启用悬停播放Live图 */
  enableHoverPlay?: boolean
  /** 是否启用长按播放Live图 */
  enableLongPress?: boolean
  /** 点击事件处理函数 */
  onClick?: (e: React.MouseEvent) => void
  /** 图片处理完成回调 */
  onProcessed?: (processedSrc: string, type: ImageType) => void
  /** 加载状态回调 */
  onLoadingChange?: (loading: boolean) => void
}

/**
 * 统一图片组件
 * 自动检测并处理HEIC、Live图片和普通图片
 */
const UniversalImage: React.FC<UniversalImageProps> = ({
  src,
  videoSrc,
  alt,
  className = '',
  referrerPolicy,
  crossOrigin,
  type,
  muted = true,
  loop = false,
  showLiveIcon = true,
  enableHoverPlay = true,
  enableLongPress = true,
  onClick,
  onProcessed,
  onLoadingChange
}) => {
  const [processedSrc, setProcessedSrc] = useState<string>(src)
  const [detectedType, setDetectedType] = useState<ImageType>(type || ImageType.STATIC)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useIsMobile()

  // Live图片相关状态
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoRunning, setVideoRunning] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [, setVideoError] = useState(false)
  const [, setIsHoveringIcon] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 添加长按定时器引用
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [isLongPressing, setIsLongPressing] = useState(false)

  // 清理定时器的useEffect
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  })

  /**
   * 检测HEIC格式
   */
  const isHeicFormat = (buffer: ArrayBuffer): boolean => {
    try {
      if (buffer.byteLength < 12) return false

      const uint8Array = new Uint8Array(buffer)
      const getStringFromBytes = (start: number, length: number): string => {
        return Array.from(uint8Array.slice(start, start + length))
          .map(byte => String.fromCharCode(byte))
          .join('')
      }

      const fileType = getStringFromBytes(4, 8)
      const heicSignatures = [
        'ftypheic', 'ftypheix', 'ftyphevc', 'ftyphevx',
        'ftypmif1', 'ftypmsf1', 'ftypavif'
      ]

      return heicSignatures.some(signature => fileType === signature)
    } catch {
      return false
    }
  }

  /**
   * 处理图片
   */
  const processImage = async () => {
    try {
      setIsLoading(true)
      setError(null)
      onLoadingChange?.(true)

      // 如果已经指定了类型且是Live图片，直接设置
      if (type === ImageType.LIVE && videoSrc) {
        setDetectedType(ImageType.LIVE)
        setProcessedSrc(src)
        onProcessed?.(src, ImageType.LIVE)
        setIsLoading(false)
        onLoadingChange?.(false)
        return
      }

      // 获取图片数据进行检测
      const response = await axios.get(src, {
        responseType: 'arraybuffer',
        timeout: 10000
      })
      const arrayBuffer = response.data

      // 检测是否为HEIC格式
      if (isHeicFormat(arrayBuffer)) {
        setDetectedType(ImageType.HEIC)

        try {
          const inputBuffer = new Uint8Array(arrayBuffer)
          const outputBuffer = await convert({
            buffer: inputBuffer,
            format: 'PNG',
            quality: 0.9
          })

          const convertedBlob = new Blob([outputBuffer], { type: 'image/png' })
          const convertedUrl = URL.createObjectURL(convertedBlob)
          setProcessedSrc(convertedUrl)
          onProcessed?.(convertedUrl, ImageType.HEIC)
        } catch (convertError) {
          console.error('HEIC转换失败:', convertError)
          setProcessedSrc(src)
          onProcessed?.(src, ImageType.HEIC)
          setError('HEIC转换失败，显示原图')
        }
      } else {
        // 普通图片
        setDetectedType(ImageType.STATIC)
        setProcessedSrc(src)
        onProcessed?.(src, ImageType.STATIC)
      }
    } catch (err) {
      console.error('图片处理错误:', err)
      const errorMessage = err instanceof Error ? err.message : '图片处理失败'
      setError(errorMessage)
      setDetectedType(ImageType.STATIC)
      setProcessedSrc(src)
      onProcessed?.(src, ImageType.STATIC)
    } finally {
      setIsLoading(false)
      onLoadingChange?.(false)
    }
  }

  /**
   * 播放Live视频
   */
  const playLiveVideo = async () => {
    if (!videoRef.current || videoRunning) {
      return
    }

    const video = videoRef.current

    video.currentTime = 0
    video.style.transition = 'none'
    video.style.transform = 'scale(1)'

    setVideoPlaying(true)

    try {
      await video.play()
      video.style.transition = 'opacity 0.2s ease-out'
      video.style.opacity = '1'
    } catch (error) {
      console.error('视频播放失败:', error)
      setVideoPlaying(false)
      video.style.opacity = '0'
    }
  }

  /**
   * 停止Live视频播放
   */
  const stopLiveVideo = () => {
    if (!videoRef.current) return

    const video = videoRef.current
    video.pause()
    handleVideoEnded()
  }

  /**
   * 处理Live图标鼠标悬停
   */
  const handleIconMouseEnter = () => {
    if (!enableHoverPlay || detectedType !== ImageType.LIVE || !videoSrc) return

    setIsHoveringIcon(true)
    // 只有当视频完全加载完成时才允许播放
    if (videoReady && videoLoaded) {
      playLiveVideo()
    }
  }

  /**
   * 处理Live图标鼠标离开
   */
  const handleIconMouseLeave = () => {
    setIsHoveringIcon(false)
    if (enableHoverPlay && videoPlaying) {
      stopLiveVideo()
    }
  }

  /**
   * 处理触摸开始（长按开始）
   */
  const handleTouchStart = () => {
    if (!enableLongPress || detectedType !== ImageType.LIVE || !videoSrc) return

    // 清除之前的定时器
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }

    // 设置长按定时器，300ms后开始播放
    longPressTimerRef.current = setTimeout(() => {
      setIsLongPressing(true)
      playLiveVideo()
    }, 300)
  }

  /**
   * 处理触摸结束（长按结束）
   */
  const handleTouchEnd = () => {
    if (!enableLongPress) return

    // 清除长按定时器
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    // 如果正在长按播放，停止播放
    if (isLongPressing && videoPlaying) {
      stopLiveVideo()
    }

    // 立即重置长按状态，允许快速再次长按
    setIsLongPressing(false)
  }

  /**
   * 处理触摸移动（防止滚动时误触）
   */
  const handleTouchMove = () => {
    if (!enableLongPress) return

    // 清除长按定时器（用户开始滑动）
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    // 如果正在播放视频，停止播放（用户开始滑动）
    if (isLongPressing && videoPlaying) {
      stopLiveVideo()
    }

    setIsLongPressing(false)
  }

  /**
   * 处理视频播放结束
   */
  const handleVideoEnded = () => {
    if (!videoRef.current) return

    const video = videoRef.current
    setVideoPlaying(false)
    setVideoRunning(false)

    // 平滑淡出
    video.style.transition = 'opacity 0.25s ease-in-out'
    video.style.opacity = '0'

    // 重置状态
    setTimeout(() => {
      if (video) {
        video.pause()
        video.currentTime = 0
        video.style.transition = 'none'
        video.style.transform = 'scale(1)'
      }
    }, 250)
  }

  /**
   * 处理图片点击
   */
  const handleImageClick = (e: React.MouseEvent) => {
    // 如果点击的是Live图标，不触发外部点击事件
    const target = e.target as HTMLElement
    if (target.closest('.live-icon')) {
      return
    }

    onClick?.(e)
  }

  useEffect(() => {
    if (src) {
      processImage()
    }

    return () => {
      // 清理定时器
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }

      // 清理视频资源
      if (videoRef.current) {
        const video = videoRef.current
        video.pause()
        video.removeAttribute('src')
        video.load() // 释放视频资源
      }

      // 清理blob URL
      if (processedSrc !== src && processedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(processedSrc)
      }
    }
  }, [src, type])

  // Live图片渲染
  if (detectedType === ImageType.LIVE && videoSrc) {
    return (
      <div
        className={`universal-image live-photo relative ${className}`}
        onClick={handleImageClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        style={{
          touchAction: 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      >
        {/* Live图标 */}
        {showLiveIcon && (
          <div
            className="live-icon absolute top-1 z-10 cursor-pointer transition-opacity"
            onMouseEnter={handleIconMouseEnter}
            onMouseLeave={handleIconMouseLeave}
            style={{
              pointerEvents: (videoReady && videoLoaded) ? 'auto' : 'none',
              opacity: videoLoaded ? 1 : 0.5
            }}
          >
            <div className="text-white px-2 py-1 flex items-center gap-1 text-xs rounded-md">
              <CgLivePhoto className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              {isMobile ? (videoLoaded ? '' : '加载中') : (videoLoaded ? '实况' : '加载中')}
            </div>
          </div>
        )}

        {/* 静态图片 */}
        <img
          src={processedSrc}
          alt={alt}
          className={`w-full h-full object-cover absolute top-0 left-0 ${videoPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          style={{
            backgroundColor: '#f3f4f6',
            transition: 'opacity 0.25s ease-in-out'
          }}
          referrerPolicy={referrerPolicy}
          crossOrigin={crossOrigin}
          onLoad={() => {
            setIsLoading(false)
            onLoadingChange?.(false)
          }}
          onError={(e) => {
            console.error('图片显示失败:', e)
            setError('图片加载失败')
            setIsLoading(false)
            onLoadingChange?.(false)
          }}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* 视频播放器 */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain absolute top-0 left-0"
          src={videoSrc}
          loop={loop}
          muted={muted}
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          style={{
            opacity: 0,
            transformOrigin: 'center',
            transform: 'scale(1)',
            transition: 'none',
            maxHeight: '100%',
            maxWidth: '100%',
            backgroundColor: '#f3f4f6'
          }}
          // 移动端优化属性
          {...(isMobile && {
            'x-webkit-airplay': 'allow',
            'webkit-playsinline': 'true',
            'playsinline': true
          })}
          onCanPlay={() => {
            setVideoReady(true)
            setVideoLoaded(true)
          }}
          onCanPlayThrough={() => {
            setVideoLoaded(true)
            setVideoReady(true)
          }}
          onLoadedData={() => {
            setVideoLoaded(true)
          }}
          onLoadedMetadata={() => {
            setVideoReady(true)
            setVideoLoaded(true)
          }}
          onPlaying={() => setVideoRunning(true)}
          onPause={() => setVideoRunning(false)}
          onEnded={handleVideoEnded}
          onError={(e) => {
            console.error('视频加载失败:', e)
            setVideoError(true)
            setVideoLoaded(false)
            setVideoReady(false)
          }}
          onLoadStart={() => {
            setVideoError(false)
            if (videoRef.current) {
              videoRef.current.style.opacity = '0'
              videoRef.current.style.transform = 'scale(1)'
              videoRef.current.style.transition = 'none'
            }
          }}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* 加载和错误状态 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-20">
            <div className="text-xs text-gray-600">处理中...</div>
          </div>
        )}
        {error && (
          <div className="absolute top-0 left-0 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded z-20">
            {error}
          </div>
        )}
      </div>
    )
  }

  // 普通图片和HEIC图片渲染
  return (
    <div className={`universal-image relative ${className}`} onClick={handleImageClick}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="text-xs text-gray-600">
            {detectedType === ImageType.HEIC ? 'HEIC转换中...' : '加载中...'}
          </div>
        </div>
      )}
      {error && (
        <div className="absolute top-0 left-0 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded z-20">
          {error}
        </div>
      )}
      <img
        src={processedSrc}
        alt={alt}
        className="w-full h-full object-cover"
        referrerPolicy={referrerPolicy}
        crossOrigin={crossOrigin}
        onLoad={() => {
          setIsLoading(false)
          onLoadingChange?.(false)
        }}
        onError={(e) => {
          console.error('图片显示失败:', e)
          setError('图片加载失败')
          setIsLoading(false)
          onLoadingChange?.(false)
        }}
        style={{
          backgroundColor: 'transparent',
          minHeight: '100px'
        }}
      />
    </div>
  )
}

export default UniversalImage