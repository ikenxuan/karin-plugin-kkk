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
  Film,
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
import { extractVideoLink } from '@/parsers/utils'
import HeicImage from '@/components/heicImage';
import PhotoViewWithHeic from '@/components/PhotoViewWithHeic'
import { clearAccessToken, clearRefreshToken, clearUserId } from '@/lib/token'
import { useHeartbeat } from '@/hooks/useHeartbeat'

/**
 * 评论信息接口
 * @interface CommentInfo
 */
interface CommentInfo {
  id: string
  author: string
  avatar: string
  content: string
  images?: string[] // 评论中的图片
  likes: number
  timestamp: string
}

/**
 * 视频信息接口
 * @interface VideoInfo
 */
interface VideoInfo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  likes: string
  author: string
  type: "video" | "note"
  downloadUrl?: {
    video: string
    audio: string
  }
  images?: string[]
  tags: string[]
  comments: CommentInfo[]
  commentCount: number
}

/**
 * 视频解析器组件
 * @returns JSX.Element
 */
export default function VideoParserPage() {
  useHeartbeat()
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<VideoInfo | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { parseVideo, loading, error, clearError } = useVideoParser()

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
                              className="w-full h-64 object-cover border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button 
                                onClick={handleVideoPlay}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform"
                              >
                                <Play className="w-8 h-8 fill-current" />
                              </Button>
                            </div>
                            <div className="absolute top-2 right-2">
                              <Film className="w-6 h-6 text-white drop-shadow-lg" />
                            </div>
                          </>
                        ) : (
                            <video
                              src={result.downloadUrl?.video}
                              poster={result.thumbnail}
                              controls
                              autoPlay
                              className="w-full aspect-video object-contain border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                              onPause={handleVideoPause}
                              onEnded={handleVideoEnded}
                              onError={(e) => {
                                console.error('视频播放错误:', e)
                                alert('视频播放失败，请尝试下载后观看')
                                setIsVideoPlaying(false)
                              }}
                            >
                              您的浏览器不支持视频播放。
                            </video>
                        )}
                      </div>
      
                      {/* Video Stats */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              <div>
                                <span className="font-bold">{result.duration}</span>
                                <div className="text-xs text-gray-600">时长</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-green-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                            <div className="flex items-center gap-2">
                              <Eye className="w-5 h-5" />
                              <div>
                                <span className="font-bold">{result.views}</span>
                                <div className="text-xs text-gray-600">观看</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-pink-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                            <div className="flex items-center gap-2">
                              <Heart className="w-5 h-5" />
                              <div>
                                <span className="font-bold">{result.likes}</span>
                                <div className="text-xs text-gray-600">点赞</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-yellow-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                            <div className="flex items-center gap-2">
                              <Share2 className="w-5 h-5" />
                              <div>
                                <span className="font-bold">分享</span>
                                <div className="text-xs text-gray-600">SHARE</div>
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
      
                        {/* Masonry Grid for Mixed Aspect Ratios */}
                        <div className="columns-2 md:columns-3 gap-4 space-y-4">
                          {result.images?.map((image, index) => {
                            // 模拟不同的图片尺寸
                            const heights = ['h-48', 'h-64', 'h-40', 'h-56', 'h-44', 'h-52']
                            const randomHeight = heights[index % heights.length]

                            return (
                              <PhotoView key={index} src={image}>
                                <div
                                  className={`relative group cursor-pointer transform hover:scale-105 transition-transform break-inside-avoid mb-4`}
                                >
                                  <HeicImage
                                    src={image}
                                    alt={`Gallery image ${index + 1}`}
                                    className={`w-full ${randomHeight} object-cover border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                                    referrerPolicy="no-referrer"
                                    crossOrigin="anonymous"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity flex items-center justify-center pointer-events-none">
                                    <ImageIcon className="w-8 h-8 text-white" />
                                  </div>
                                  <div className="absolute top-2 left-2 pointer-events-none">
                                    <div className="bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-bold">
                                      {index + 1}
                                    </div>
                                  </div>
                                </div>
                              </PhotoView>
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
                        <div className="bg-orange-200 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                          <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            <div>
                              <span className="font-bold">{result.likes}</span>
                              <div className="text-xs text-gray-600">喜欢数</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                )}
      
                {/* Description */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Music className="w-6 h-6 text-green-600" />
                    <h4 className="text-xl font-black text-black transform -rotate-1">
                      内容描述 DESCRIPTION
                    </h4>
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed bg-gray-100 p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                    {result.description}
                  </p>
                </div>
      
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {result.downloadUrl && (
                    <>
                      {/* 视频下载按钮 */}
                        {result.downloadUrl.video && (
                          <Button
                            onClick={() => downloadWithSmartNaming(result.downloadUrl!.video, result.title, 'video')}
                            className="bg-green-500 hover:bg-green-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            下载视频 VIDEO
                        </Button>
                        )}
                      
                        {/* 音频下载按钮 */}
                        {result.downloadUrl.audio && result.downloadUrl.audio !== result.downloadUrl.video && (
                          <Button
                            onClick={() => downloadWithSmartNaming(result.downloadUrl!.audio, result.title, 'audio')}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                          >
                            <Music className="w-5 h-5 mr-2" />
                            下载音频 AUDIO
                        </Button>
                        )}
                    </>
                  )}
                  
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

/**
 * 处理分享功能
 * @param shareUrl - 分享链接
 * @param title - 分享标题
 */
const handleShare = async (shareUrl: string, title: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        url: shareUrl
      })
    } catch (err: any) {
      console.log('分享取消或失败', err)
    }
  } else {
    // 降级方案：复制到剪贴板
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('链接已复制到剪贴板')
    } catch (err: any) {
      console.log(err)
      // 再次降级：手动选择文本
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('链接已复制到剪贴板')
    }
  }
}

/**
 * 打开原链接
 * @param originalUrl - 原始链接
 */
const handleOpenOriginal = (originalUrl: string) => {
  const videoLink = extractVideoLink(originalUrl);
  if (videoLink) {
    window.open(videoLink, '_blank');
  }
}

/**
 * 智能生成下载文件名
 * @param downloadUrl - 下载链接
 * @param title - 视频标题
 * @param type - 文件类型 ('video' | 'audio')
 * @returns 清理后的文件名
 */
function generateDownloadFilename (downloadUrl: string, title: string, type: 'video' | 'audio'): string {
  let filename = ''

  // 1. 优先使用标题
  if (title && title.trim()) {
    filename = sanitizeName(title.trim())
  }

  // 2. 如果标题无效，尝试从URL提取文件名
  if (!filename || filename === 'untitled') {
    try {
      const url = new URL(downloadUrl)
      const pathname = url.pathname
      const urlFilename = pathname.split('/').pop() || ''

      if (urlFilename && urlFilename.includes('.')) {
        // 移除扩展名，只保留文件名部分
        const nameWithoutExt = urlFilename.replace(/\.[^.]*$/, '')
        if (nameWithoutExt.length > 0) {
          filename = sanitizeName(nameWithoutExt)
        }
      }
    } catch (error) {
      console.warn('无法从URL提取文件名:', error)
    }
  }

  // 3. 如果还是无效，使用时间戳
  if (!filename || filename === 'untitled') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    filename = `${type}_${timestamp}`
  }

  // 4. 添加类型后缀和扩展名
  const extension = type === 'video' ? '.mp4' : '.mp3'
  const suffix = type === 'video' ? '_video' : '_audio'

  // 避免重复后缀
  if (!filename.toLowerCase().includes(suffix.toLowerCase())) {
    filename += suffix
  }

  return filename + extension
}

/**
 * 原生下载函数（使用浏览器默认下载弹窗）
 * @param downloadUrl - 下载链接
 * @param suggestedFilename - 建议保存的文件名
 */
function downloadWithNative (downloadUrl: string, suggestedFilename: string) {
  try {
    // 创建隐藏的下载链接
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = suggestedFilename
    link.style.display = 'none'

    // 添加到页面并触发点击
    document.body.appendChild(link)
    link.click()

    // 清理
    document.body.removeChild(link)

  } catch (error) {
    console.error('❌ 下载失败:', error)
    // 降级方案：直接打开链接
    window.open(downloadUrl, '_blank')
  }
}

/**
 * 改进的原生下载函数
 * @param downloadUrl - 下载链接
 * @param title - 视频标题
 * @param type - 文件类型
 */
function downloadWithSmartNaming (downloadUrl: string, title: string, type: 'video' | 'audio') {
  const filename = generateDownloadFilename(downloadUrl, title, type)
  downloadWithNative(downloadUrl, filename)
}

/**
 * 清理文件名和文件夹名中的非法字符
 * @param name - 原始名称
 * @returns 清理后的名称
 */
function sanitizeName (name: string): string {
  // 移除或替换Windows和其他系统中的非法字符
  return name
    .replace(/[<>:"/\\|?*]/g, '_')  // 替换非法字符为下划线
    .replace(/^\.|\.$/, '')  // 移除开头和结尾的点
    .substring(0, 200) || 'untitled'  // 限制长度并提供默认值
}

/**
 * 图片打包下载（改进版，增强防盗链处理）
 * @param images - 图片URL数组
 * @param title - 作品标题
 */
async function downloadImagesAsZip (images: string[], title: string) {
  try {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    const cleanTitle = sanitizeName(title || '图片集')
    const imageFolder = zip.folder(cleanTitle)

    // 简化的进度显示
    let successCount = 0
    const failedImages: Array<{ index: number, url: string, error: string }> = []

    /**
     * 下载单张图片的函数（带重试机制）
     * @param imageUrl - 图片URL
     * @param actualIndex - 图片索引
     * @param retryCount - 重试次数
     */
    const downloadSingleImage = async (imageUrl: string, actualIndex: number, retryCount = 0): Promise<{ success: boolean, index: number, error?: any }> => {
      const maxRetries = 3

      try {
        // 尝试多种请求策略
        const strategies = [
          // 策略1：模拟浏览器请求
          {
            method: 'GET',
            headers: {
              'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
              'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Sec-Fetch-Dest': 'image',
              'Sec-Fetch-Mode': 'no-cors',
              'Sec-Fetch-Site': 'cross-site',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            mode: 'cors' as RequestMode,
            credentials: 'omit' as RequestCredentials,
            referrerPolicy: 'no-referrer' as ReferrerPolicy
          },
          // 策略2：无Referer请求
          {
            method: 'GET',
            headers: {
              'Accept': 'image/*,*/*',
              'User-Agent': navigator.userAgent
            },
            mode: 'no-cors' as RequestMode,
            credentials: 'omit' as RequestCredentials
          },
          // 策略3：最简请求
          {
            method: 'GET',
            mode: 'cors' as RequestMode,
            credentials: 'omit' as RequestCredentials
          }
        ]

        let lastError: any

        // 尝试不同的请求策略
        for (let strategyIndex = 0; strategyIndex < strategies.length; strategyIndex++) {
          try {
            const response = await fetch(imageUrl, strategies[strategyIndex] as RequestInit)

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            // 检查响应是否为图片
            const contentType = response.headers.get('content-type') || ''
            if (!contentType.startsWith('image/') && response.headers.get('content-length') !== '0') {
              // 如果不是图片类型，尝试下一个策略
              if (strategyIndex < strategies.length - 1) {
                continue
              }
            }

            // 直接转换为blob
            const blob = await response.blob()

            // 验证blob是否有效
            if (blob.size === 0) {
              throw new Error('图片文件为空')
            }

            // 确定文件扩展名
            let extension = '.jpg'
            const blobType = blob.type || contentType
            if (blobType) {
              if (blobType.includes('png')) extension = '.png'
              else if (blobType.includes('gif')) extension = '.gif'
              else if (blobType.includes('webp')) extension = '.webp'
              else if (blobType.includes('heic') || blobType.includes('heif')) extension = '.heic'
              else if (blobType.includes('jpeg') || blobType.includes('jpg')) extension = '.jpg'
            }

            const fileName = `${String(actualIndex + 1).padStart(3, '0')}${extension}`
            imageFolder?.file(fileName, blob)

            successCount++

            return { success: true, index: actualIndex }
          } catch (strategyError) {
            lastError = strategyError
            console.warn(`策略${strategyIndex + 1}失败:`, strategyError)
            continue
          }
        }

        throw lastError || new Error('所有请求策略都失败')

      } catch (error) {
        // 重试机制
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))) // 递增延迟
          return downloadSingleImage(imageUrl, actualIndex, retryCount + 1)
        }

        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`❌ 图片 ${actualIndex + 1} 最终失败:`, errorMessage)
        failedImages.push({ index: actualIndex, url: imageUrl, error: errorMessage })
        return { success: false, index: actualIndex, error }
      }
    }

    // 并发下载图片（限制并发数避免内存爆炸和请求过多）
    const CONCURRENT_LIMIT = 2 // 降低并发数，避免触发防护机制
    const downloadPromises: Promise<any>[] = []

    for (let i = 0; i < images.length; i += CONCURRENT_LIMIT) {
      const batch = images.slice(i, i + CONCURRENT_LIMIT)

      const batchPromise = Promise.all(
        batch.map(async (imageUrl, batchIndex) => {
          const actualIndex = i + batchIndex
          // 添加随机延迟，避免请求过于密集
          await new Promise(resolve => setTimeout(resolve, Math.random() * 500))
          return downloadSingleImage(imageUrl, actualIndex)
        })
      )

      downloadPromises.push(batchPromise)

      // 批次间添加延迟
      if (i + CONCURRENT_LIMIT < images.length) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    }

    // 等待所有批次完成
    const allResults = await Promise.all(downloadPromises)
    allResults.flat()

    if (successCount === 0) {
      // 提供详细的错误信息
      const errorDetails = failedImages.slice(0, 3).map(img =>
        `图片${img.index + 1}: ${img.error}`
      ).join('\n')

      throw new Error(`所有图片下载失败，可能原因：\n1. 网络连接问题\n2. 图片服务器防盗链机制\n3. 图片链接已失效\n\n详细错误:\n${errorDetails}${failedImages.length > 3 ? '\n...' : ''}`)
    }

    if (failedImages.length > 0) {
      console.warn(`⚠️ ${failedImages.length} 张图片下载失败，将继续打包成功的图片`)
    }

    // 生成ZIP文件
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    })
    const zipFileName = `${cleanTitle}_${successCount}张图片.zip`

    // 使用原生下载方式下载ZIP
    const zipUrl = URL.createObjectURL(zipBlob)
    downloadWithNative(zipUrl, zipFileName)

    // 延迟清理URL
    setTimeout(() => {
      URL.revokeObjectURL(zipUrl)
    }, 2000)
  } catch (error) {
    console.error('❌ 打包下载失败:', error)
    alert(`❌ 打包下载失败:\n${error instanceof Error ? error.message : String(error)}`)
  }
}