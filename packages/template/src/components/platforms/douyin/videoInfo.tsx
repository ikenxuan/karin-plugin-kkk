import { Clock, Heart, MessageCircle, Plus, Share2, Star } from 'lucide-react'
import React, { useMemo } from 'react'

import { DefaultLayout } from '../../../components/layouts/DefaultLayout'
import type { DouyinVideoInfoProps } from '../../../types/platforms/douyin/videoInfo'

/** 默认音乐封面 */
const DEFAULT_MUSIC_COVER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmUyYzU1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMjVmNGVlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZykiLz48L3N2Zz4='

const formatNumber = (num: number): string => {
  if (num >= 100000000) return `${(num / 100000000).toFixed(1)}B`
  if (num >= 10000) return `${(num / 10000).toFixed(1)}W`
  return num.toLocaleString()
}

const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).toUpperCase()
}

const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000)
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const StatBlock: React.FC<{
  label: string
  value: number
  icon: React.ReactNode
}> = ({ label, value, icon }) => (
  <div className="flex flex-col gap-1 items-center">
    <div className="p-4 mb-1 rounded-full bg-default-100">
      {icon}
    </div>
    <span className="font-mono text-4xl font-bold tracking-tighter">{formatNumber(value)}</span>
    <span className="text-sm font-bold tracking-widest uppercase opacity-40">{label}</span>
  </div>
)

export const DouyinVideoInfo: React.FC<Omit<DouyinVideoInfoProps, 'templateType' | 'templateName'>> = React.memo(
  (props) => {
    const formattedDate = useMemo(() => formatDate(props.data.create_time), [props.data.create_time])
    const duration = useMemo(() => props.data.video ? formatDuration(props.data.video.duration) : null, [props.data.video])
    const mainTag = useMemo(() => 'DOUYIN', [])
    const musicCover = useMemo(() => props.data.music?.cover || DEFAULT_MUSIC_COVER, [props.data.music?.cover])
    const featureText = useMemo(() => props.data.video?.ratio?.toUpperCase() || 'VIDEO', [props.data.video])

    const { coverStyle, blurLayerStyle, contentStyle } = useMemo(() => {
      const gradientHeight = 250
      const overlapHeight = 120
      
      return {
        coverStyle: {
          width: '100%',
          height: 'auto',
          display: 'block',
          maskImage: `linear-gradient(to bottom, 
            black 0%, 
            black calc(100% - ${gradientHeight}px), 
            rgba(0,0,0,0.8) calc(100% - ${gradientHeight * 0.7}px),
            rgba(0,0,0,0.5) calc(100% - ${gradientHeight * 0.4}px),
            rgba(0,0,0,0.2) calc(100% - ${gradientHeight * 0.15}px),
            transparent 100%
          )`,
          WebkitMaskImage: `linear-gradient(to bottom, 
            black 0%, 
            black calc(100% - ${gradientHeight}px), 
            rgba(0,0,0,0.8) calc(100% - ${gradientHeight * 0.7}px),
            rgba(0,0,0,0.5) calc(100% - ${gradientHeight * 0.4}px),
            rgba(0,0,0,0.2) calc(100% - ${gradientHeight * 0.15}px),
            transparent 100%
          )`
        },
        blurLayerStyle: {
          width: '100%',
          height: '100%',
          objectFit: 'cover' as const,
          maskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 50%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 50%)'
        },
        contentStyle: {
          marginTop: `-${overlapHeight}px`
        }
      }
    }, [])

    return (
      <DefaultLayout {...props}>
        <div className="overflow-hidden relative w-full font-sans bg-default-50 text-default-900">
          {/* 顶部信息栏 */}
          <div className="flex absolute top-0 left-0 z-40 justify-between items-start p-16 w-full mix-blend-screen text-default-500">
            <div className="flex flex-col gap-2">
              <div className="flex gap-6 items-center">
                <span className="px-6 py-2 text-3xl font-bold tracking-wider uppercase rounded-full border backdrop-blur-sm border-default-500">
                  {featureText}
                </span>
                {duration && (
                  <div className="flex gap-3 items-center font-mono text-3xl font-medium">
                    <Clock size={40} />
                    <span>{duration}</span>
                  </div>
                )}
              </div>
              <div className="pr-8 pb-4 mt-6 text-9xl italic font-black tracking-tighter bg-clip-text from-default-900 bg-linear-to-r to-default-500">
                {mainTag}
              </div>
            </div>
            <div className="flex flex-col gap-4 items-end">
              <span className="font-mono text-5xl font-bold">{formattedDate}</span>
            </div>
          </div>

          {/* 封面层 */}
          <div className="relative z-20 w-full">
            <img src={props.data.image_url} alt="Main Content" style={coverStyle} />
            <div className="overflow-hidden absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
              <img src={props.data.image_url} alt="Atmosphere" className="blur-3xl saturate-150 opacity-95 scale-[1.02]" style={blurLayerStyle} />
            </div>
          </div>

          {/* 内容层 */}
          <div className="flex relative z-30 flex-col gap-12 p-16 pb-10 w-full" style={contentStyle}>
            {/* 描述文案 */}
            <div className="relative">
              {/* <span className="absolute -left-10 -top-35 text-[150px] z-1 text-default-300 select-none leading-none">"</span> */}
              <h2 className="text-6xl font-bold leading-snug overflow-hidden text-justify text-default-900">
                {props.data.desc}
              </h2>
            </div>
            
            {/* 音乐胶囊 */}
            {props.data.music && (
              <div className="flex flex-row-reverse gap-8 items-center self-end mb-4 text-right">
                {/* 封面容器 */}
                <div className="relative w-24 h-24">
                  <img 
                    src={musicCover} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover rounded-full blur-xl scale-120 opacity-60"
                  />
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg">
                    <img src={musicCover} alt="Music Cover" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-4xl font-bold line-clamp-1 max-w-[800px] text-default-900">
                    {props.data.music.title}
                  </span>
                  <span className="text-3xl font-medium text-default-500">
                    {props.data.music.author}
                  </span>
                </div>
              </div>
            )}

            {/* 作者卡片 */}
            <div className="flex gap-8 items-center py-8 my-4 border-t border-b border-default-200">
              <div className="relative">
                <img src={props.data.author.avatar} alt={props.data.author.name} className="object-cover w-32 h-auto rounded-full border-5 border-white" />
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-danger text-white p-1.5 rounded-full">
                  <Plus size={26} strokeWidth={3} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <span className="text-5xl font-bold max-w-[600px] truncate">{props.data.author.name}</span>
                  {props.data.user_profile?.ip_location && (
                    <span className="px-3 py-1 text-2xl font-medium rounded-full border backdrop-blur-sm bg-default-100 border-default-200 text-default-500">
                      {props.data.user_profile.ip_location.replace('IP属地：', '')}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-6 items-center font-mono text-3xl text-default-400">
                  <span>抖音号: {props.data.author.short_id}</span>
                  {props.data.user_profile && (
                    <>
                      <span>•</span>
                      <span>{formatNumber(props.data.user_profile.follower_count)} 粉丝</span>
                      <span>•</span>
                      <span>{formatNumber(props.data.user_profile.total_favorited)} 获赞</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 底部数据栏 */}
            <div className="grid grid-cols-4 gap-8 mt-4">
              <StatBlock label="LIKES" value={props.data.statistics.digg_count} icon={<Heart size={48} className="text-default-900" />} />
              <div className="flex flex-col gap-1 items-center">
                <div className="p-5 mb-1 rounded-full bg-default-100">
                  <MessageCircle size={42} className="text-default-900" />
                </div>
                <span className="font-mono text-4xl font-bold tracking-tighter">{formatNumber(props.data.statistics.comment_count)}</span>
                <span className="text-sm font-bold tracking-widest uppercase opacity-40">COMMENTS</span>
              </div>
              <StatBlock label="FAVORITES" value={props.data.statistics.collect_count} icon={<Star size={48} className="text-default-900" />} />
              <StatBlock label="SHARES" value={props.data.statistics.share_count} icon={<Share2 size={48} className="text-default-900 pr-2" />} />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
)

DouyinVideoInfo.displayName = 'DouyinVideoInfo'
export default DouyinVideoInfo
