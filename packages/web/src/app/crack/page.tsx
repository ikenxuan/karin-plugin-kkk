import { useCallback, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Play,
  ImageIcon,
  Clock,
  Eye,
  Heart,
  Share2,
  Link,
  Zap,
  Star,
  Sparkles,
  Camera,
  Video,
  Music,
  Palette,
  Target,
  Rocket,
  MessageCircle,
  ThumbsUp,
  AlertCircle,
  RotateCw,
  CircleMinus,
  CirclePlus,
  Maximize,
  Archive,
  X,
  LogOut,
} from "lucide-react"
import { useVideoParser } from '@/hooks/use-video-parser'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import PhotoViewWithHeic from '@/components/PhotoViewWithHeic'
import { clearAccessToken, clearRefreshToken, clearUserId } from '@/lib/token'
import { useHeartbeat } from '@/hooks/useHeartbeat'
import { downloadWithSmartNaming, downloadImagesAsZip, handleOpenOriginal, handleShare, downloadVideosAsZip } from '@/lib/tools'
import UniversalPhotoView from '@/components/UniversalPhotoView'
import { ImageType } from '@/components/UniversalImage'
import type { CommentInfo, VideoInfo } from '@/parsers/types'
import { useIsMobile } from '@/hooks/use-mobile'

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
  const isMobile = useIsMobile()
  /**
   * 处理退出登录
   */
  const handleLogout = useCallback(() => {
    // 这里可以添加退出登录的逻辑，比如清除token、跳转到登录页等
    if (confirm('确定要退出登录吗？')) {
      // 清除本地存储的用户信息
      clearAccessToken()
      clearRefreshToken()
      clearUserId()
      // 跳转到登录页或首页
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
        <span className='flex items-center gap-3 opacity-70'>
          <CirclePlus
            onClick={() => onScale(scale + 1)}
            className="cursor-pointer hover:opacity-100 transition-opacity"
          />
          <CircleMinus
            onClick={() => onScale(scale - 1)}
            className="cursor-pointer hover:opacity-100 transition-opacity"
          />
          <RotateCw
            onClick={() => onRotate(rotate + 90)}
            className="cursor-pointer hover:opacity-100 transition-opacity"
          />
          <Maximize
            onClick={handleFullscreen}
            className="cursor-pointer hover:opacity-100 transition-opacity"
          />
        </span>
      )
    }
  }, [])

  /**
   * 评论组件
   * @param comment - 评论数据
   * @returns JSX.Element
   */
  const CommentItem = useCallback(({ comment }: { comment: CommentInfo }) => (
    <div className="mb-6">
      <div className="flex gap-3">
        {/* 评论头像 */}
        <img
          src={comment.avatar}
          className="w-10 h-10 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="flex-1">
          <div className="bg-gray-50 p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="opacity-50 text-sm [&_svg]:inline [&_svg]:h-[2em] [&_svg]:w-auto [&_svg]:align-middle [&_svg]:mx-1"
                dangerouslySetInnerHTML={{ __html: comment.author }}
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              />
              <span className="text-xs opacity-50">{comment.timestamp}</span>
              {comment.author.includes('NatureFilms') && (
                <Badge className="bg-blue-100 text-blue-800 text-xs border border-blue-300">
                  <Star className="w-3 h-3 mr-1" />
                  作者
                </Badge>
              )}
            </div>

            {/* 评论文字内容 */}
            <div
              className="text-md leading-relaxed mb-3 text-left whitespace-pre-wrap [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]"
              dangerouslySetInnerHTML={{ __html: comment.content }}
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            />

            {/* 评论图片 - 添加图片预览功能 */}
            {comment.images && comment.images.length > 0 && (
              <div className="mb-3">
                {comment.images.length === 1 ? (
                  // 单张图片
                  <div className="max-w-xs">
                    <PhotoViewWithHeic
                      src={comment.images[0]}
                      alt="评论图片"
                      className="w-full h-auto max-h-64 object-cover border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </div>
                ) : (
                  // 多张图片 - 网格布局
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
                            className="w-full h-24 object-cover border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                          />
                        </PhotoView>
                        {comment.images!.length > 4 && index === 3 && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white font-bold text-sm">
                            +{comment.images!.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <ThumbsUp className="w-3 h-3" />
                <span>{comment.likes}</span>
              </button>
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
      <div className="min-h-screen bg-yellow-300 p-2 sm:p-4 md:p-8 relative overflow-hidden">
        {/* 背景装饰元素 - 手机端隐藏部分装饰 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 几何图形装饰 - 手机端调整位置和大小 */}
          <div className="absolute top-10 sm:top-20 left-2 sm:left-10 w-8 sm:w-16 h-8 sm:h-16 bg-red-500 border-2 sm:border-4 border-black transform rotate-45 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-6 sm:w-12 h-6 sm:h-12 bg-blue-500 border-2 sm:border-4 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="hidden sm:block absolute bottom-40 left-20 w-20 h-8 bg-green-500 border-4 border-black transform -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="hidden sm:block absolute bottom-20 right-10 w-14 h-14 bg-purple-500 border-4 border-black transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>

          {/* 点状装饰 - 手机端隐藏 */}
          <div className="hidden sm:block absolute top-60 left-1/4 w-3 h-3 bg-black rounded-full"></div>
          <div className="hidden sm:block absolute top-80 right-1/3 w-2 h-2 bg-black rounded-full"></div>
          <div className="hidden sm:block absolute bottom-60 left-1/3 w-4 h-4 bg-black rounded-full"></div>

          {/* 线条装饰 - 手机端隐藏 */}
          <div className="hidden sm:block absolute top-1/3 left-0 w-32 h-1 bg-black transform rotate-45"></div>
          <div className="hidden sm:block absolute bottom-1/3 right-0 w-24 h-1 bg-black transform -rotate-45"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-4 sm:mb-8 relative">
            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
              <Zap className="w-8 sm:w-12 h-8 sm:h-12 text-red-600 transform rotate-12" />
              <div className="flex-1">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-black mb-1 sm:mb-2 transform -rotate-1 leading-tight">
                  抖音视频解析器
                </h1>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-red-600 transform rotate-1 leading-tight">
                  VIDEO PARSER
                </h2>
              </div>
              <Sparkles className="w-6 sm:w-10 h-6 sm:h-10 text-blue-600 transform -rotate-12" />

              {/* 退出登录按钮 */}
              <Button
                onClick={handleLogout}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all p-2 sm:p-3"
                title="退出登录"
              >
                <LogOut className="w-4 sm:w-6 h-4 sm:h-6" />
                <span className="hidden sm:inline ml-2">退出</span>
              </Button>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <div className="w-16 sm:w-32 h-1 sm:h-2 bg-blue-600 transform rotate-2"></div>
              <div className="w-8 sm:w-16 h-1 sm:h-2 bg-red-600 transform -rotate-1"></div>
              <div className="w-12 sm:w-24 h-1 sm:h-2 bg-green-600 transform rotate-1"></div>
            </div>
          </div>

          {/* Input Section */}
          <Card className="border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white mb-4 sm:mb-8 transform md:-rotate-1 relative overflow-hidden">
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3">
              <Target className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 transform rotate-45" />
            </div>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                  <label className="text-lg sm:text-xl font-bold text-black block transform rotate-1 flex-1">
                    粘贴链接地址 PASTE YOUR LINK
                  </label>
                  <Rocket className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                </div>

                {/* 错误提示 */}
                {error && (
                  <div className="bg-red-100 border-2 border-red-500 p-2 sm:p-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 flex-shrink-0" />
                    <span className="text-red-700 font-medium text-sm sm:text-base">{error}</span>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="在此输入视频分享链接"
                      className="border-2 sm:border-3 border-black text-base sm:text-lg font-semibold bg-yellow-100 focus:bg-white transition-colors flex-1 h-10 sm:h-auto"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !loading && url.trim()) {
                          handleParse()
                        }
                      }}
                    />

                    {/* 删除按钮 */}
                    {url && (
                      <Button
                        type="button"
                        onClick={() => setUrl('')}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-8 sm:w-9 h-8 sm:h-9 p-0 flex items-center justify-center flex-shrink-0"
                        title="清除输入"
                      >
                        <X className="w-4 sm:w-5 h-4 sm:h-5" />
                      </Button>
                    )}
                  </div>

                  {/* 解析按钮 */}
                  <Button
                    onClick={handleParse}
                    disabled={loading || !url.trim()}
                    className="bg-red-500 hover:bg-red-600 text-white font-black text-base sm:text-lg px-6 sm:px-8 w-full h-12 sm:h-auto border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {loading ? (
                      <>
                        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mr-2 animate-spin" />
                        <span className="hidden sm:inline">解析中... PARSING</span>
                        <span className="sm:hidden">解析中...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span className="hidden sm:inline">开始解析 PARSE!</span>
                        <span className="sm:hidden">开始解析</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <>
              <Card className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white transform md:rotate-1 relative mb-8 overflow-hidden">
                <div className="absolute -top-4 -left-4">
                  <Star className="w-10 h-10 text-yellow-500 transform -rotate-12" />
                </div>
                <CardContent className="p-6">
                  {/* Title and Author */}
                  <div className="mb-6">
                    <div className="flex items-start gap-3 mb-3">
                      {result.type === "video" ? (
                        <Video className="w-8 h-8 text-red-600 mt-1" />
                      ) : result.type === "slides" ? (
                        <Archive className="w-8 h-8 text-purple-600 mt-1" />
                      ) : (
                        <Camera className="w-8 h-8 text-blue-600 mt-1" />
                      )}
                      <h3 className="text-2xl md:text-3xl font-black text-black transform -rotate-1 flex-1">
                        {result.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-blue-600" />
                      <p className="text-lg font-bold text-blue-600 transform rotate-1">
                        作者 BY: {result.author}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {result.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-green-400 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Content based on type */}
                  {result.type === "video" ? (
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Video Player / Thumbnail */}
                      <div className="relative">
                        {!isVideoPlaying ? (
                          // 显示视频封面和播放按钮
                          <>
                            <img
                              src={result.thumbnail}
                              alt={result.title}
                              className="w-full h-64 object-cover border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                              onClick={handleVideoPlay}
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 cursor-pointer" onClick={handleVideoPlay}>
                              <div className="bg-yellow-400 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-3 hover:translate-y-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 p-5 hover:bg-yellow-500 group hover:rotate-3">
                                <Play className="w-10 h-10 text-black fill-black group-hover:scale-125 transition-transform duration-200" />
                              </div>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white px-2 py-1 rounded font-bold">
                              {result.duration}
                            </div>
                          </>
                        ) : (
                          // 显示视频播放器
                          <video
                            controls
                            autoPlay
                            className="w-full h-64 object-cover border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
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
                        <div className="bg-blue-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                          <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            <div>
                              <span className="font-bold">{result.views}</span>
                              <div className="text-xs text-gray-600">浏览量</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-red-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                          <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            <div>
                              <span className="font-bold">{result.likes}</span>
                              <div className="text-xs text-gray-600">点赞数</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <div>
                              <span className="font-bold">{result.duration}</span>
                              <div className="text-xs text-gray-600">时长</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : result.type === "slides" ? (
                      // 合辑内容显示
                      <div className="space-y-6">
                        {/* Masonry Grid for Mixed Content */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Archive className="w-6 h-6 text-purple-600" />
                            <h4 className="text-lg font-bold">合辑内容 Slides Collection</h4>
                          </div>

                          {/* 合辑内容的瀑布流布局 */}
                          <div className="columns-2 md:columns-3 gap-4 space-y-4">
                            {result.slides?.map((slide, index) => {
                              // 模拟不同的图片尺寸
                              const heights = ['h-48', 'h-64', 'h-40', 'h-56', 'h-44', 'h-52']
                              const randomHeight = heights[index % heights.length]

                              return (
                                <div
                                  key={index}
                                  className={`relative group cursor-pointer transform hover:scale-105 transition-transform break-inside-avoid mb-4 overflow-hidden`}
                                >
                                  {slide.type === 'video' ? (
                                    <div className="relative">
                                      <video
                                        controls
                                        preload="metadata"
                                        poster={slide.thumbnail}
                                        className={`w-full ${randomHeight} object-cover border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                                        style={{ pointerEvents: 'auto' }}
                                      >
                                        <source src={slide.url} type="video/mp4" />
                                        您的浏览器不支持视频播放。
                                      </video>
                                      {/* 视频时长标签 */}
                                      {slide.duration && (
                                        <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded font-bold text-xs">
                                          {slide.duration}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    // 静态图片和Live Photo使用UniversalPhotoView
                                    <UniversalPhotoView
                                      src={slide.url}
                                      videoSrc={slide.type === 'livephoto' ? slide.videoUrl : undefined}
                                      alt={`合辑${slide.type === 'livephoto' ? 'Live Photo' : '图片'} ${index + 1}`}
                                      className={`w-full ${slide.type === 'livephoto'
                                        ? 'h-auto min-h-[200px] max-h-[400px] object-contain'
                                        : `${randomHeight} object-cover`
                                        } border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
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

                                  {/* 序号标签 */}
                                  <div className={`absolute ${slide.type === 'video' ? 'top-2 right-2' : 'bottom-2 right-2'} z-10`}>
                                    <div className={`${slide.type === 'video' ? 'bg-red-400' :
                                      slide.type === 'livephoto' ? 'bg-purple-400' : 'bg-yellow-400'
                                      } text-black ${isMobile ? 'px-1 py-0.5 text-xs' : 'px-2 py-1 text-sm'} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black transform rotate-3 hover:rotate-6 transition-transform`}>
                                      {String(index + 1).padStart(2, '0')}
                                      {slide.type === 'video' && <span className={`${isMobile ? 'ml-0.5' : 'ml-1'}`}>📹</span>}
                                      {slide.type === 'livephoto' && <span className={`${isMobile ? 'ml-0.5' : 'ml-1'}`}>🎭</span>}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {/* 合辑统计信息 */}
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-yellow-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                              <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                <div>
                                  <span className="font-bold">{result.views}</span>
                                  <div className="text-xs text-gray-600">浏览量</div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-orange-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                              <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                <div>
                                  <span className="font-bold">{result.likes}</span>
                                  <div className="text-xs text-gray-600">点赞数</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  ) : (
                    /* Gallery Layout - Masonry Style */
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ImageIcon className="w-6 h-6 text-purple-600" />
                        <h4 className="text-lg font-bold">图片集 Gallery Collection</h4>
                      </div>

                          {/* 图集的瀑布流布局 */}
                          <div className="columns-2 md:columns-3 gap-4 space-y-4">
                            {result.images?.map((image, index) => {
                              // 模拟不同的图片尺寸
                              const heights = ['h-48', 'h-64', 'h-40', 'h-56', 'h-44', 'h-52']
                              const randomHeight = heights[index % heights.length]

                              return (
                                <div
                                  key={index}
                                  className={`relative group cursor-pointer transform hover:scale-105 transition-transform break-inside-avoid mb-4 overflow-hidden`}
                                >
                                  <UniversalPhotoView
                                    src={image}
                                    alt={`Gallery image ${index + 1}`}
                                    className={`w-full ${randomHeight} object-cover border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                                  />
                                  {/* 序号标签 */}
                                  <div className="absolute bottom-2 right-2 z-10">
                                    <div className={`bg-red-400 text-white ${isMobile ? 'px-1 py-0.5 text-xs' : 'px-2 py-1 text-sm'} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black transform -rotate-3 hover:-rotate-6 transition-transform`}>
                                      {String(index + 1).padStart(2, '0')}
                                      <span className={`${isMobile ? 'ml-0.5' : 'ml-1'}`}>🖼️</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                      {/* Gallery Stats */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-purple-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                          <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            <div>
                              <span className="font-bold">{result.views}</span>
                              <div className="text-xs text-gray-600">浏览量</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-pink-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                          <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            <div>
                              <span className="font-bold">{result.likes}</span>
                              <div className="text-xs text-gray-600">点赞数</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {/* 下载按钮 */}
                    {result.downloadUrl?.video && result.type !== 'slides' && (
                      <Button
                        onClick={() => downloadWithSmartNaming(result.downloadUrl!.video!, result.title, 'video')}
                        className="bg-green-500 hover:bg-green-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        下载视频 VIDEO
                      </Button>
                    )}

                    {/* 合辑视频下载按钮 - 根据视频数量动态显示 */}
                    {result.type === 'slides' && result.slides && (() => {
                      const videoSlides = result.slides.filter(slide => slide.type === 'video')
                      if (videoSlides.length === 1) {
                        // 只有一个视频，显示单个下载按钮
                        return (
                          <Button
                            onClick={() => downloadWithSmartNaming(videoSlides[0].url, result.title, 'video')}
                            className="bg-green-500 hover:bg-green-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            下载视频 VIDEO
                          </Button>
                        )
                      } else if (videoSlides.length > 1) {
                        // 多个视频，显示打包下载按钮
                        return (
                          <Button
                            onClick={() => {
                              // 创建一个下载视频的函数，这里需要实现批量下载逻辑
                              const videoUrls = videoSlides.map(slide => slide.url)
                              // 可以调用一个批量下载视频的函数
                              downloadVideosAsZip(videoUrls, result.title)
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          >
                            <Archive className="w-5 h-5 mr-2" />
                            打包下载视频 ({videoSlides.length}个)
                          </Button>
                        )
                      }
                      return null
                    })()}

                    {/* 音频下载按钮 */}
                    {result.downloadUrl?.audio && (
                      <Button
                        onClick={() => downloadWithSmartNaming(result.downloadUrl!.audio, result.title, 'audio')}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        <Music className="w-5 h-5 mr-2" />
                        下载音频 AUDIO
                      </Button>
                    )}

                    {/* 合辑打包下载按钮 */}
                    {result.slides && result.slides.length > 1 && (() => {
                      const imageSlides = result.slides.filter(slide => slide.type !== 'video')
                      return imageSlides.length > 0 ? (
                        <Button
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
                          className="bg-indigo-500 hover:bg-indigo-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          <Archive className="w-5 h-5 mr-2" />
                          打包下载图片 ({imageSlides.length}项)
                        </Button>
                      ) : null
                    })()}

                    {/* 图片打包下载按钮 */}
                    {result.images && result.images.length > 1 && (
                      <Button
                        onClick={() => downloadImagesAsZip(result.images!, result.title)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        <Archive className="w-5 h-5 mr-2" />
                        打包下载 ({result.images.length}张)
                      </Button>
                    )}

                    {/* 原链接按钮 */}
                    <Button
                      onClick={() => handleOpenOriginal(url)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <Link className="w-5 h-5 mr-2" />
                      原链接 ORIGINAL
                    </Button>

                    {/* 分享按钮 */}
                    <Button
                      onClick={() => handleShare(url, result.title)}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      分享 SHARE
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="border-2 sm:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white transform md:-rotate-1 relative mb-4 sm:mb-8 overflow-hidden">
                <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3">
                  <MessageCircle className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 transform rotate-12" />
                </div>
                <CardContent className="p-3 sm:p-6">
                  {/* Comments Header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                    <MessageCircle className="w-5 sm:w-7 h-5 sm:h-7 text-blue-600" />
                    <h4 className="text-lg sm:text-2xl font-black text-black transform rotate-1 flex-1">
                      热门评论 <span className="hidden sm:inline">HOT COMMENTS</span>
                    </h4>
                    <Badge className="bg-red-100 text-red-800 border-2 border-red-300 font-bold text-xs sm:text-sm">
                      <Star className="w-2 sm:w-3 h-2 sm:h-3 mr-1" />
                      {result.comments.length} 条热评
                    </Badge>
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500" />
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4 sm:space-y-6 max-h-80 sm:max-h-96 md:max-h-[32rem] lg:max-h-[40rem] overflow-y-auto hide-scrollbar">
                    {commentItems}
                  </div>

                  {/* 热评说明 */}
                  <div className="mt-4 sm:mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-orange-100 px-3 sm:px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                      <Star className="w-3 sm:w-4 h-3 sm:h-4 text-orange-600" />
                      <span className="text-xs sm:text-sm font-bold text-orange-800">
                        以上为热门评论 <span className="hidden sm:inline">Above are hot comments</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Footer */}
          <div className="mt-12 text-center relative">
            <div className="inline-block bg-black text-white px-6 py-3 font-black text-lg transform -rotate-2 shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] relative">
              <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400" />
              <span className="opacity-50">POWER BY</span>{" "}
              <a
                href="https://github.com/ikenxuan/karin-plugin-kkk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold no-link-style hover:opacity-70 transition-opacity duration-200"
              >
                karin-plugin-kkk
              </a>{" "}
              <span className="opacity-50">&</span>{" "}
              <span className="opacity-50">DESIGN BY</span>{" "}
              <a
                href="https://github.com/ikenxuan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold no-link-style hover:opacity-70 transition-opacity duration-200"
              >
                ikenxuan
              </a>
              <Zap className="absolute -bottom-2 -right-2 w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </PhotoProvider>
  )
}

