import 'react-photo-view/dist/react-photo-view.css'

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
  LogOut,
  Maximize,
  MessageCircle,
  Music,
  Palette,
  Play,
  RotateCw,
  Share2,
  Sparkles,
  Star,
  ThumbsUp,
  Video,
  X,
  Zap,
} from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { PhotoProvider, PhotoView } from 'react-photo-view'

import PhotoViewWithHeic from '@/components/PhotoViewWithHeic'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ImageType } from '@/components/UniversalImage'
import UniversalPhotoView from '@/components/UniversalPhotoView'
import { useVideoParser } from '@/hooks/use-video-parser'
import { useHeartbeat } from '@/hooks/useHeartbeat'
import { clearAccessToken, clearRefreshToken, clearUserId } from '@/lib/token'
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
  useHeartbeat()
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<VideoInfo | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { parseVideo, loading, error, clearError } = useVideoParser()

  /**
   * 处理退出登录
   */
  const handleLogout = useCallback(() => {
    if (confirm('确定要退出登录吗？')) {
      clearAccessToken()
      clearRefreshToken()
      clearUserId()
      window.location.href = '/kkk/login'
    }
  }, [])

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
        <div className='flex items-center gap-3'>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onScale(scale + 1)}
          >
            <CirclePlus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onScale(scale - 1)}
          >
            <CircleMinus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRotate(rotate + 90)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullscreen}
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  }, [])

  /**
   * 评论组件
   * @param comment - 评论数据
   * @returns JSX.Element
   */
  const CommentItem = useCallback(({ comment }: { comment: CommentInfo }) => (
    <div className="space-y-3">
      <div className="flex gap-3">
        <img
          src={comment.avatar}
          className="w-10 h-10 rounded-full"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="flex-1 space-y-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="text-sm font-medium [&_svg]:inline [&_svg]:h-[1.2em] [&_svg]:w-auto [&_svg]:align-middle [&_svg]:mx-1"
                  dangerouslySetInnerHTML={{ __html: comment.author }}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                />
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                {comment.author.includes('NatureFilms') && (
                  <Badge variant="secondary">
                    <Star className="w-3 h-3 mr-1" />
                    作者
                  </Badge>
                )}
              </div>

              <div
                className="text-sm leading-relaxed mb-3 whitespace-pre-wrap [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]"
                dangerouslySetInnerHTML={{ __html: comment.content }}
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              />

              {comment.images && comment.images.length > 0 && (
                <div className="mb-3">
                  {comment.images.length === 1 ? (
                    <div className="max-w-xs">
                      <PhotoViewWithHeic
                        src={comment.images[0]}
                        alt="评论图片"
                        className="w-full h-auto max-h-64 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </div>
                  ) : (
                    <div className={`grid gap-2 ${comment.images.length === 2 ? 'grid-cols-2' :
                        comment.images.length === 3 ? 'grid-cols-3' :
                          'grid-cols-2'
                      } max-w-md`}>
                      {comment.images.slice(0, 4).map((image, index) => (
                        <div key={`${comment.id}-${index}`} className="relative">
                          <PhotoView key={`${comment.id}-${index}`} src={image}>
                            <PhotoViewWithHeic
                              src={image}
                              alt={`评论图片 ${index + 1}`}
                              className="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                            />
                          </PhotoView>
                          {comment.images!.length > 4 && index === 3 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm rounded-md">
                              +{comment.images!.length - 4}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  <span>{comment.likes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                抖音视频解析器
              </h1>
              <p className="text-muted-foreground">
                Video Parser
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>

          {/* Input Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                粘贴链接地址
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 错误提示 */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="在此输入视频分享链接"
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !loading && url.trim()) {
                      handleParse()
                    }
                  }}
                />
                {url && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setUrl('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button
                onClick={handleParse}
                disabled={loading || !url.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    解析中...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    开始解析
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    {result.type === "video" ? (
                      <Video className="w-6 h-6 mt-1" />
                    ) : result.type === "slides" ? (
                      <Archive className="w-6 h-6 mt-1" />
                    ) : (
                      <Camera className="w-6 h-6 mt-1" />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-xl">{result.title}</CardTitle>
                      <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Palette className="w-4 h-4" />
                        作者: {result.author}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Content based on type */}
                  {result.type === "video" ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Video Player / Thumbnail */}
                      <div className="relative">
                        {!isVideoPlaying ? (
                          <>
                            <img
                              src={result.thumbnail}
                              alt={result.title}
                              className="w-full h-64 object-cover rounded-lg cursor-pointer"
                              onClick={handleVideoPlay}
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                            />
                            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handleVideoPlay}>
                              <Button size="lg" className="rounded-full">
                                <Play className="w-6 h-6" />
                              </Button>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                              {result.duration}
                            </div>
                          </>
                        ) : (
                          <video
                            controls
                            autoPlay
                            className="w-full h-64 object-cover rounded-lg"
                            poster={result.thumbnail}
                            onPause={handleVideoPause}
                            onEnded={handleVideoEnded}
                          >
                            <source src={result.downloadUrl?.video} type="video/mp4" />
                            您的浏览器不支持视频播放。
                          </video>
                        )}
                      </div>

                      {/* Video Stats */}
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Eye className="w-5 h-5" />
                              <div>
                                <div className="font-semibold">{result.views}</div>
                                <div className="text-sm text-muted-foreground">浏览量</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Heart className="w-5 h-5" />
                              <div>
                                <div className="font-semibold">{result.likes}</div>
                                <div className="text-sm text-muted-foreground">点赞数</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              <div>
                                <div className="font-semibold">{result.duration}</div>
                                <div className="text-sm text-muted-foreground">时长</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : result.type === "slides" ? (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Archive className="w-5 h-5" />
                          <h4 className="text-lg font-semibold">合辑内容</h4>
                        </div>

                        <PhotoProvider>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {result.slides?.map((slide, index) => (
                              <div key={index} className="relative group">
                                {slide.type === 'video' ? (
                                  <div className="relative">
                                    <video
                                      controls
                                      preload="metadata"
                                      poster={slide.thumbnail}
                                      className="w-full h-48 object-cover rounded-lg"
                                    >
                                      <source src={slide.url} type="video/mp4" />
                                      您的浏览器不支持视频播放。
                                    </video>
                                    {slide.duration && (
                                      <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                                        {slide.duration}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <UniversalPhotoView
                                    src={slide.url}
                                    videoSrc={slide.type === 'livephoto' ? slide.videoUrl : undefined}
                                    alt={`合辑${slide.type === 'livephoto' ? 'Live Photo' : '图片'} ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                    type={slide.type === 'livephoto' ? ImageType.LIVE : ImageType.STATIC}
                                    liveConfig={{
                                      muted: true,
                                      loop: false,
                                      showIcon: slide.type === 'livephoto',
                                      enableHoverPlay: true,
                                      enableLongPress: true,
                                    }}
                                  />
                                )}
                                <div className="absolute bottom-2 right-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {String(index + 1).padStart(2, '0')}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </PhotoProvider>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                <div>
                                  <div className="font-semibold">{result.views}</div>
                                  <div className="text-sm text-muted-foreground">浏览量</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                <div>
                                  <div className="font-semibold">{result.likes}</div>
                                  <div className="text-sm text-muted-foreground">点赞数</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <ImageIcon className="w-5 h-5" />
                          <h4 className="text-lg font-semibold">图片集</h4>
                        </div>

                        <PhotoProvider>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {result.images?.map((image, index) => (
                              <div key={index} className="relative group">
                                <UniversalPhotoView
                                  src={image}
                                  alt={`Gallery image ${index + 1}`}
                                  className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="absolute bottom-2 right-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {String(index + 1).padStart(2, '0')}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </PhotoProvider>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                <div>
                                  <div className="font-semibold">{result.views}</div>
                                  <div className="text-sm text-muted-foreground">浏览量</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                <div>
                                  <div className="font-semibold">{result.likes}</div>
                                  <div className="text-sm text-muted-foreground">点赞数</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {result.downloadUrl?.video && result.type !== 'slides' && (
                      <Button
                        onClick={() => downloadWithSmartNaming(result.downloadUrl!.video!, result.title, 'video')}
                      >
                        <Download className="w-4 h-4 mr-2" />
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
                            <Download className="w-4 h-4 mr-2" />
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
                            <Archive className="w-4 h-4 mr-2" />
                            打包下载视频 ({videoSlides.length}个)
                          </Button>
                        )
                      }
                      return null
                    })()}

                    {result.downloadUrl?.audio && (
                      <Button variant="outline"
                        onClick={() => downloadWithSmartNaming(result.downloadUrl!.audio, result.title, 'audio')}
                      >
                        <Music className="w-4 h-4 mr-2" />
                        下载音频
                      </Button>
                    )}

                    {result.slides && result.slides.length > 1 && (() => {
                      const imageSlides = result.slides.filter(slide => slide.type !== 'video')
                      return imageSlides.length > 0 ? (
                        <Button variant="outline"
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
                          <Archive className="w-4 h-4 mr-2" />
                          打包下载图片 ({imageSlides.length}项)
                        </Button>
                      ) : null
                    })()}

                    {result.images && result.images.length > 1 && (
                      <Button variant="outline"
                        onClick={() => downloadImagesAsZip(result.images!, result.title)}
                      >
                        <Archive className="w-4 h-4 mr-2" />
                        打包下载 ({result.images.length}张)
                      </Button>
                    )}

                    <Button variant="outline"
                      onClick={() => handleOpenOriginal(url)}
                    >
                      <Link className="w-4 h-4 mr-2" />
                      原链接
                    </Button>

                    <Button variant="outline"
                      onClick={() => handleShare(url, result.title)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      分享
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      热门评论
                    </CardTitle>
                    <Badge variant="secondary">
                      {result.comments.length} 条评论
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {commentItems}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <a
                href="https://github.com/ikenxuan/karin-plugin-kkk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                karin-plugin-kkk
              </a>{" "}
              & Designed by{" "}
              <a
                href="https://github.com/ikenxuan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
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