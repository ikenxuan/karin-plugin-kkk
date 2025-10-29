import 'react-photo-view/dist/react-photo-view.css'

import { isTauri } from '@tauri-apps/api/core'
import { openUrl } from '@tauri-apps/plugin-opener'
import {
  AlertCircle,
  Archive,
  Camera,
  CircleMinus,
  CirclePlus,
  Clock,
  Download,
  Eye,
  Heart,
  ImageIcon,
  Link,
  Maximize,
  MessageCircle,
  Music,
  Palette,
  Play,
  RotateCcw,
  RotateCw,
  Share2,
  Sparkles,
  Star,
  ThumbsUp,
  Video,
  X,
  Zap
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import PhotoViewWithHeic from '@/components/PhotoViewWithHeic'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ImageType } from '@/components/UniversalImage'
import UniversalPhotoView from '@/components/UniversalPhotoView'
import { useVideoParser } from '@/hooks/use-video-parser'
import { downloadImagesAsZip, downloadVideosAsZip, downloadWithSmartNaming, handleOpenOriginal, handleShare } from '@/lib/tools'
import type { CommentInfo, VideoInfo } from '@/parsers/types'

// 声明livephotoskit类型
declare global {
  interface Window {
    LivePhotosKit: any
  }
}

/**
 * 视频解析器组件
 * @returns JSX.Element
 */
export default function VideoParserPage () {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<VideoInfo | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { parseVideo, loading, error, clearError } = useVideoParser()

  /**
   * 处理解析请求
   * @async
   * @function handleParse
   */
  const handleParse = useCallback(async () => {
    if (!url.trim()) return

    try {
      clearError()
      const videoData = await parseVideo(url)
      setResult(videoData)
      setIsVideoPlaying(false)
    } catch (err) {
      console.error('解析失败:', err)
    }
  }, [url, parseVideo, clearError])

  /**
   * 处理视频播放
   */
  const handleVideoPlay = useCallback(() => {
    if (result?.downloadUrl?.video) {
      setIsVideoPlaying(true)
    } else {
      alert('视频链接不可用，无法播放')
    }
  }, [result?.downloadUrl?.video])

  /**
   * 处理视频暂停
   */
  const handleVideoPause = useCallback(() => {
    // 暂停时不隐藏视频播放器，保持显示状态
  }, [])

  /**
   * 处理视频结束
   */
  const handleVideoEnded = useCallback(() => {
    setIsVideoPlaying(false)
  }, [])

  // 使用useMemo优化PhotoProvider的toolbarRender，避免每次都重新创建
  const toolbarRender = useMemo(() => {
    return ({ onScale, scale, rotate, onRotate }: any) => {
      const handleFullscreen = () => {
        const photoSlider = document.querySelector('.PhotoView-Portal')
        if (photoSlider) {
          if (!document.fullscreenElement) {
            if (photoSlider.requestFullscreen) {
              photoSlider.requestFullscreen()
            }
          } else {
            document.exitFullscreen?.()
          }
        }
      }

      return (
        <div className='flex gap-3 items-center'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onScale(scale + 1)}
          >
            <CirclePlus className='w-4 h-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onScale(scale - 1)}
          >
            <CircleMinus className='w-4 h-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onRotate(rotate - 90)}
          >
            <RotateCcw className='w-4 h-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onRotate(rotate + 90)}
          >
            <RotateCw className='w-4 h-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleFullscreen}
          >
            <Maximize className='w-4 h-4' />
          </Button>
        </div>
      )
    }
  }, [])

  /**
   * 处理外部链接点击事件
   * 在 Tauri 环境下使用原生方式打开链接，在 Web 环境下使用默认行为
   * @param url - 要打开的链接地址
   * @param event - 点击事件对象
   */
  const handleExternalLink = useCallback(async (url: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTauri()) {
      // 阻止默认的链接跳转行为
      event.preventDefault()
      try {
        // 使用 Tauri 的 openUrl 在系统默认浏览器中打开链接
        await openUrl(url)
      } catch (error) {
        console.error('打开链接失败:', error)
        // 如果 Tauri 方式失败，回退到默认行为
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }
    // 在 Web 环境下不阻止默认行为，让浏览器正常处理链接
  }, [])

  /**
   * 评论组件 - 优化移动端布局
   * @param comment - 评论数据
   * @returns JSX.Element
   */
  const CommentItem = useCallback(({ comment }: { comment: CommentInfo }) => (
    <div className='pb-3 border-b border-border/50 last:border-b-0'>
      <div className='flex gap-2 md:gap-3'>
        <img
          src={comment.avatar}
          className='flex-shrink-0 w-8 h-8 rounded-full md:w-10 md:h-10'
          referrerPolicy='no-referrer'
          crossOrigin='anonymous'
        />
        <div className='flex-1 min-w-0'>
          <div className='p-2 rounded-lg bg-muted/30 md:p-3'>
            <div className='flex gap-2 items-center mb-1 md:mb-2'>
              <div
                className='text-xs md:text-sm font-medium [&_svg]:inline [&_svg]:h-[1.2em] [&_svg]:w-auto [&_svg]:align-middle [&_svg]:mx-1 truncate'
                dangerouslySetInnerHTML={{ __html: comment.author }}
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              />
              <span className='flex-shrink-0 text-xs text-muted-foreground'>{comment.timestamp}</span>
              {comment.author.includes('NatureFilms') && (
                <Badge variant='secondary' className='px-1 py-0 text-xs'>
                  <Star className='mr-1 w-2 h-2' />
                  作者
                </Badge>
              )}
            </div>

            <div
              className='text-xs md:text-sm leading-relaxed mb-2 whitespace-pre-wrap [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
              dangerouslySetInnerHTML={{ __html: comment.content }}
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            />

            {comment.images && comment.images.length > 0 && (
              <div className='mb-2'>
                {comment.images.length === 1
                  ? (
                    <div className='max-w-[200px] md:max-w-xs'>
                      <PhotoViewWithHeic
                        src={comment.images[0]}
                        alt='评论图片'
                        className='object-cover w-full h-auto max-h-32 rounded-md transition-opacity cursor-pointer md:max-h-48 hover:opacity-80'
                        referrerPolicy='no-referrer'
                        crossOrigin='anonymous'
                      />
                    </div>
                  )
                  : (
                    <div className={`grid gap-1 md:gap-2 ${comment.images.length === 2
                      ? 'grid-cols-2'
                      : comment.images.length === 3
                        ? 'grid-cols-3'
                        : 'grid-cols-2'
                    } max-w-[250px] md:max-w-md`}
                    >
                      {comment.images.slice(0, 4).map((image, index) => (
                        <div key={`${comment.id}-${index}`} className='relative'>
                          <PhotoView key={`${comment.id}-${index}`} src={image}>
                            <PhotoViewWithHeic
                              src={image}
                              alt={`评论图片 ${index + 1}`}
                              className='object-cover w-full h-16 rounded-md transition-opacity cursor-pointer md:h-20 hover:opacity-80'
                              referrerPolicy='no-referrer'
                              crossOrigin='anonymous'
                            />
                          </PhotoView>
                          {comment.images!.length > 4 && index === 3 && (
                            <div className='flex absolute inset-0 justify-center items-center text-xs font-bold text-white rounded-md bg-black/60'>
                              +{comment.images!.length - 4}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}

            <div className='flex gap-4 items-center text-xs text-muted-foreground'>
              <Button variant='ghost' size='sm' className='p-0 h-auto text-xs'>
                <ThumbsUp className='mr-1 w-3 h-3' />
                <span>{comment.likes}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), [])

  // 使用useMemo优化评论组件，只在result.comments变化时重新渲染
  const commentItems = useMemo(() => {
    if (!result?.comments) return null

    return result.comments.map((comment) => (
      <CommentItem key={comment.id} comment={comment} />
    ))
  }, [result?.comments, CommentItem])

  return (
    <PhotoProvider
      key={result?.id || 'default'}
      photoClosable
      toolbarRender={toolbarRender}
    >
      <div className='min-h-screen bg-background'>
        <div className='container p-3 mx-auto max-w-4xl md:p-4'>
          {/* Header */}
          <div className='mb-6 md:mb-8'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              抖音视频解析器
            </h1>
            <p className='text-sm md:text-base text-muted-foreground'>
              Video Parser
            </p>
          </div>

          {/* Input Section */}
          <Card className='mb-6 md:mb-8'>
            <CardHeader>
              <CardTitle className='flex gap-2 items-center'>
                <Link className='w-5 h-5' />
                粘贴链接地址
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* 错误提示 */}
              {error && (
                <Alert variant='destructive'>
                  <AlertCircle className='w-4 h-4' />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className='flex gap-2'>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder='在此输入视频分享链接'
                  className='flex-1'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !loading && url.trim()) {
                      handleParse()
                    }
                  }}
                />
                {url && (
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setUrl('')}
                  >
                    <X className='w-4 h-4' />
                  </Button>
                )}
              </div>

              <Button
                onClick={handleParse}
                disabled={loading || !url.trim()}
                className='w-full'
              >
                {loading
                  ? (
                    <>
                      <Sparkles className='mr-2 w-4 h-4 animate-spin' />
                      解析中...
                    </>
                  )
                  : (
                    <>
                      <Zap className='mr-2 w-4 h-4' />
                      开始解析
                    </>
                  )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <>
              <Card className='mb-6 md:mb-8'>
                <CardHeader>
                  <div className='flex gap-3 items-start'>
                    {result.type === 'video'
                      ? (
                        <Video className='mt-1 w-6 h-6' />
                      )
                      : result.type === 'slides'
                        ? (
                          <Archive className='mt-1 w-6 h-6' />
                        )
                        : (
                          <Camera className='mt-1 w-6 h-6' />
                        )}
                    <div className='flex-1'>
                      <CardTitle className='text-xl'>{result.title}</CardTitle>
                      <p className='flex gap-2 items-center mt-1 text-muted-foreground'>
                        <Palette className='w-4 h-4' />
                        作者: {result.author}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {/* Tags */}
                  <div className='flex flex-wrap gap-2'>
                    {result.tags.map((tag, index) => (
                      <Badge key={index} variant='secondary'>
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Content based on type */}
                  {result.type === 'video' ? (
                    <div className='grid gap-6 md:grid-cols-2'>
                      {/* Video Player / Thumbnail */}
                      <div className='relative'>
                        {!isVideoPlaying
                          ? (
                            <>
                              <img
                                src={result.thumbnail}
                                alt={result.title}
                                className='object-cover w-full h-64 rounded-lg cursor-pointer'
                                onClick={handleVideoPlay}
                                referrerPolicy='no-referrer'
                                crossOrigin='anonymous'
                              />
                              <div className='flex absolute inset-0 justify-center items-center cursor-pointer' onClick={handleVideoPlay}>
                                <Button size='lg' className='rounded-full'>
                                  <Play className='w-6 h-6' />
                                </Button>
                              </div>
                              <div className='absolute right-2 bottom-2 px-2 py-1 text-sm text-white rounded bg-black/80'>
                                {result.duration}
                              </div>
                            </>
                          )
                          : (
                            <video
                              controls
                              autoPlay
                              className='object-cover w-full h-64 rounded-lg'
                              poster={result.thumbnail}
                              onPause={handleVideoPause}
                              onEnded={handleVideoEnded}
                            >
                              <source src={result.downloadUrl?.video} type='video/mp4' />
                              您的浏览器不支持视频播放。
                            </video>
                          )}
                      </div>

                      {/* Video Stats */}
                      <div className='p-3 rounded-lg bg-muted/30 md:p-4'>
                        <div className='grid grid-cols-3 gap-4 text-center'>
                          <div className='space-y-1'>
                            <div className='flex gap-1 justify-center items-center text-muted-foreground'>
                              <Eye className='w-3 h-3 md:w-4 md:h-4' />
                            </div>
                            <div className='text-sm font-semibold md:text-base'>{result.views}</div>
                            <div className='text-xs text-muted-foreground'>浏览量</div>
                          </div>
                          <div className='space-y-1'>
                            <div className='flex gap-1 justify-center items-center text-muted-foreground'>
                              <Heart className='w-3 h-3 md:w-4 md:h-4' />
                            </div>
                            <div className='text-sm font-semibold md:text-base'>{result.likes}</div>
                            <div className='text-xs text-muted-foreground'>点赞数</div>
                          </div>
                          <div className='space-y-1'>
                            <div className='flex gap-1 justify-center items-center text-muted-foreground'>
                              <Clock className='w-3 h-3 md:w-4 md:h-4' />
                            </div>
                            <div className='text-sm font-semibold md:text-base'>{result.duration}</div>
                            <div className='text-xs text-muted-foreground'>时长</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : result.type === 'slides' ? (
                    <div className='space-y-6'>
                      <div>
                        <div className='flex gap-2 items-center mb-4'>
                          <Archive className='w-5 h-5' />
                          <h4 className='text-lg font-semibold'>合辑内容</h4>
                        </div>

                        <PhotoProvider
                          toolbarRender={toolbarRender}
                        >
                          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                            {result.slides?.map((slide, index) => (
                              <div key={index} className='relative group'>
                                {slide.type === 'video'
                                  ? (
                                    <div className='relative'>
                                      <video
                                        controls
                                        preload='metadata'
                                        poster={slide.thumbnail}
                                        className='object-cover w-full h-48 rounded-lg'
                                      >
                                        <source src={slide.url} type='video/mp4' />
                                        您的浏览器不支持视频播放。
                                      </video>
                                      {slide.duration && (
                                        <div className='absolute top-2 left-2 px-2 py-1 text-xs text-white rounded bg-black/80'>
                                          {slide.duration}
                                        </div>
                                      )}
                                    </div>
                                  )
                                  : (
                                    <UniversalPhotoView
                                      src={slide.url}
                                      videoSrc={slide.type === 'livephoto' ? slide.videoUrl : undefined}
                                      alt={`合辑${slide.type === 'livephoto' ? 'Live Photo' : '图片'} ${index + 1}`}
                                      className='object-cover w-full h-48 rounded-lg'
                                      type={slide.type === 'livephoto' ? ImageType.LIVE : ImageType.STATIC}
                                      liveConfig={{
                                        muted: true,
                                        loop: false,
                                        showIcon: slide.type === 'livephoto',
                                        enableHoverPlay: true,
                                        enableLongPress: true
                                      }}
                                    />
                                  )}
                                <div className='absolute right-2 bottom-2'>
                                  <Badge variant='secondary' className='text-xs'>
                                    {String(index + 1).padStart(2, '0')}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </PhotoProvider>

                        {/* 合辑统计信息 */}
                        <div className='p-3 mt-6 rounded-lg bg-muted/30 md:p-4'>
                          <div className='grid grid-cols-2 gap-4 text-center'>
                            <div className='space-y-1'>
                              <div className='flex gap-1 justify-center items-center text-muted-foreground'>
                                <Eye className='w-3 h-3 md:w-4 md:h-4' />
                              </div>
                              <div className='text-sm font-semibold md:text-base'>{result.views}</div>
                              <div className='text-xs text-muted-foreground'>浏览量</div>
                            </div>
                            <div className='space-y-1'>
                              <div className='flex gap-1 justify-center items-center text-muted-foreground'>
                                <Heart className='w-3 h-3 md:w-4 md:h-4' />
                              </div>
                              <div className='text-sm font-semibold md:text-base'>{result.likes}</div>
                              <div className='text-xs text-muted-foreground'>点赞数</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-6'>
                      <div>
                        <div className='flex gap-2 items-center mb-4'>
                          <ImageIcon className='w-5 h-5' />
                          <h4 className='text-lg font-semibold'>图片集</h4>
                        </div>

                        <PhotoProvider
                          toolbarRender={toolbarRender}
                        >
                          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                            {result.images?.map((image, index) => (
                              <div key={index} className='relative group'>
                                <UniversalPhotoView
                                  src={image}
                                  alt={`Gallery image ${index + 1}`}
                                  className='object-cover w-full h-48 rounded-lg'
                                />
                                <div className='absolute right-2 bottom-2'>
                                  <Badge variant='secondary' className='text-xs'>
                                    {String(index + 1).padStart(2, '0')}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </PhotoProvider>

                        {/* 图集统计信息 */}
                        <div className='p-3 mt-6 rounded-lg bg-muted/30 md:p-4'>
                          <div className='grid grid-cols-2 gap-4 text-center'>
                            <div className='space-y-1'>
                              <div className='flex gap-1 justify-center items-center text-muted-foreground'>
                                <Eye className='w-3 h-3 md:w-4 md:h-4' />
                              </div>
                              <div className='text-sm font-semibold md:text-base'>{result.views}</div>
                              <div className='text-xs text-muted-foreground'>浏览量</div>
                            </div>
                            <div className='space-y-1'>
                              <div className='flex gap-1 justify-center items-center text-muted-foreground'>
                                <Heart className='w-3 h-3 md:w-4 md:h-4' />
                              </div>
                              <div className='text-sm font-semibold md:text-base'>{result.likes}</div>
                              <div className='text-xs text-muted-foreground'>点赞数</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Action Buttons */}
                  <div className='flex flex-wrap gap-3'>
                    {result.downloadUrl?.video && result.type !== 'slides' && (
                      <Button
                        onClick={() => downloadWithSmartNaming(result.downloadUrl!.video!, result.title, 'video')}
                      >
                        <Download className='mr-2 w-4 h-4' />
                        下载视频
                      </Button>
                    )}

                    {result.type === 'slides' && result.slides && (() => {
                      const videoSlides = result.slides.filter(slide => slide.type === 'video')
                      if (videoSlides.length === 1) {
                        return (
                          <Button
                            onClick={() => downloadWithSmartNaming(videoSlides[0].url, result.title, 'video')}
                          >
                            <Download className='mr-2 w-4 h-4' />
                            下载视频
                          </Button>
                        )
                      } else if (videoSlides.length > 1) {
                        return (
                          <Button
                            onClick={() => {
                              const videoUrls = videoSlides.map(slide => slide.url)
                              downloadVideosAsZip(videoUrls, result.title)
                            }}
                          >
                            <Archive className='mr-2 w-4 h-4' />
                            打包下载视频 ({videoSlides.length}个)
                          </Button>
                        )
                      }
                      return null
                    })()}

                    {result.downloadUrl?.audio && (
                      <Button
                        variant='outline'
                        onClick={() => downloadWithSmartNaming(result.downloadUrl!.audio, result.title, 'audio')}
                      >
                        <Music className='mr-2 w-4 h-4' />
                        下载音频
                      </Button>
                    )}

                    {result.slides && result.slides.length > 1 && (() => {
                      const imageSlides = result.slides.filter(slide => slide.type !== 'video')
                      return imageSlides.length > 0
                        ? (
                          <Button
                            variant='outline'
                            onClick={() => {
                              const slideUrls = imageSlides
                                .map(slide => slide.thumbnail || slide.url)
                                .filter(url => url)
                              if (slideUrls.length > 0) {
                                downloadImagesAsZip(slideUrls, result.title)
                              } else {
                                alert('该合辑中没有可下载的图片内容')
                              }
                            }}
                          >
                            <Archive className='mr-2 w-4 h-4' />
                            打包下载图片 ({imageSlides.length}项)
                          </Button>
                        )
                        : null
                    })()}

                    {result.images && result.images.length > 1 && (
                      <Button
                        variant='outline'
                        onClick={() => downloadImagesAsZip(result.images!, result.title)}
                      >
                        <Archive className='mr-2 w-4 h-4' />
                        打包下载 ({result.images.length}张)
                      </Button>
                    )}

                    <Button
                      variant='outline'
                      onClick={() => handleOpenOriginal(url)}
                    >
                      <Link className='mr-2 w-4 h-4' />
                      原链接
                    </Button>

                    <Button
                      variant='outline'
                      onClick={() => handleShare(url, result.title)}
                    >
                      <Share2 className='mr-2 w-4 h-4' />
                      分享
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardHeader className='pb-3'>
                  <div className='flex justify-between items-center'>
                    <CardTitle className='flex gap-2 items-center text-lg'>
                      <MessageCircle className='w-4 h-4 md:w-5 md:h-5' />
                      热门评论
                    </CardTitle>
                    <Badge variant='secondary' className='text-xs'>
                      {result.comments.length} 条
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='pt-0'>
                  <div className='overflow-y-auto space-y-3 max-h-[800px] md:max-h-[900px]'>
                    {commentItems}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Footer */}
          <div className='mt-12 text-center'>
            <p className='text-sm text-muted-foreground'>
              Powered by{' '}
              <a
                href='https://github.com/ikenxuan/karin-plugin-kkk'
                onClick={(e) => handleExternalLink('https://github.com/ikenxuan/karin-plugin-kkk', e)}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium hover:underline'
              >
                karin-plugin-kkk
              </a>{' '}
              & Designed by{' '}
              <a
                href='https://github.com/ikenxuan'
                onClick={(e) => handleExternalLink('https://github.com/ikenxuan', e)}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium hover:underline'
              >
                ikenxuan
              </a>
            </p>
          </div>
        </div>
      </div>
    </PhotoProvider>
  )
}
