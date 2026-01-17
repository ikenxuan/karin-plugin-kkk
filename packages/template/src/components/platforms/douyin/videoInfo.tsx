import { Heart, MessageCircle, Share2, Star } from 'lucide-react'
import React, { useMemo } from 'react'

import { DefaultLayout } from '../../../components/layouts/DefaultLayout'
import type { DouyinVideoInfoProps } from '../../../types/platforms/douyin/videoInfo'

const formatNumber = (num: number): string => {
  if (num >= 100000000) return `${(num / 100000000).toFixed(1)}亿`
  if (num >= 10000) return `${(num / 10000).toFixed(1)}万`
  return num.toLocaleString()
}

const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000)
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export const DouyinVideoInfo: React.FC<Omit<DouyinVideoInfoProps, 'templateType' | 'templateName'>> = React.memo(
  (props) => {
    const duration = useMemo(
      () => (props.data.video ? formatDuration(props.data.video.duration) : null),
      [props.data.video]
    )

    const coverMaskStyle = useMemo(() => ({
      maskImage: `linear-gradient(to bottom, 
        transparent 0%,
        rgba(0,0,0,0.3) 8%,
        rgba(0,0,0,0.7) 15%,
        black 25%, 
        black 55%, 
        rgba(0,0,0,0.6) 75%,
        rgba(0,0,0,0.2) 90%,
        transparent 100%
      )`,
      WebkitMaskImage: `linear-gradient(to bottom, 
        transparent 0%,
        rgba(0,0,0,0.3) 8%,
        rgba(0,0,0,0.7) 15%,
        black 25%, 
        black 55%, 
        rgba(0,0,0,0.6) 75%,
        rgba(0,0,0,0.2) 90%,
        transparent 100%
      )`
    }), [])

    return (
      <DefaultLayout {...props} className="dark relative">
        {/* 全局背景氛围层 */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <img
            src={props.data.image_url}
            alt=""
            className="w-full h-full object-cover scale-150 blur-[120px] saturate-[1.8] opacity-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative w-full overflow-hidden text-white font-sans">
          <div className="relative z-10">
            {/* 顶部 */}
            <div className="flex items-center justify-between px-16 pt-20 pb-16 gap-12">
              {/* 作者 */}
              <div className="flex items-center gap-10 min-w-0 shrink">
                <img
                  src={props.data.author.avatar}
                  alt={props.data.author.name}
                  className="w-36 h-36 rounded-full object-cover ring-4 ring-white/10 shrink-0"
                />
                <div className="flex flex-col gap-4 min-w-0">
                  <span className="text-6xl text-white font-bold leading-tight line-clamp-2">
                    {props.data.author.name}
                  </span>
                  <div className="flex items-center gap-4 text-4xl text-white/50">
                    {props.data.user_profile?.follower_count !== undefined && (
                      <span>{formatNumber(props.data.user_profile.follower_count)} 粉丝</span>
                    )}
                    {props.data.user_profile?.ip_location && (
                      <>
                        <span>·</span>
                        <span>{props.data.user_profile.ip_location.replace('IP属地：', '')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 数据统计 */}
              <div className="flex items-center gap-14 shrink-0">
                <StatItem icon={<Heart size={48} />} value={props.data.statistics.digg_count} />
                <StatItem icon={<MessageCircle size={48} />} value={props.data.statistics.comment_count} />
                <StatItem icon={<Star size={48} />} value={props.data.statistics.collect_count} />
                <StatItem icon={<Share2 size={48} />} value={props.data.statistics.share_count} />
              </div>
            </div>

            {/* 封面 */}
            <div className="relative -mt-16">
              <img
                src={props.data.image_url}
                alt="Cover"
                className="w-full h-auto"
                style={coverMaskStyle}
              />
            </div>

            {/* 底部 */}
            <div className="relative -mt-36 px-16 pb-12">
              {/* 时长 */}
              <div className="flex items-center justify-between mb-10">
                {/* 时长 */}
                {duration ? (
                  <div className="px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg text-white text-3xl font-semibold tracking-wider">
                    {duration}
                  </div>
                ) : <div />}

                {/* BGM */}
                {props.data.music && (
                  <div className="flex items-center gap-6 p-4 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg overflow-hidden">
                    <div className="relative w-24 h-24">
                      {/* 底层 */}
                      <img
                        src={props.data.music.cover}
                        alt=""
                        className="absolute inset-0 w-full h-full rounded-2xl object-cover blur-md scale-110"
                      />
                      {/* 上层 */}
                      <img
                        src={props.data.music.cover}
                        alt=""
                        className="relative w-full h-full rounded-2xl object-cover z-10"
                      />
                    </div>
                    <div className="flex flex-col gap-3 pr-4">
                      <span className="text-4xl font-semibold text-white max-w-150 truncate">
                        {props.data.music.title}
                      </span>
                      <span className="text-3xl text-white/50">
                        {props.data.music.author}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 标题 */}
              <h1 className="w-full text-6xl font-bold leading-relaxed tracking-wide text-white text-center">
                {props.data.desc || '无标题'}
              </h1>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
)

const StatItem: React.FC<{ icon: React.ReactNode; value: number }> = ({ icon, value }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="text-white/60">{icon}</div>
    <span className="text-4xl font-bold text-white/90 tabular-nums whitespace-nowrap">
      {formatNumber(value)}
    </span>
  </div>
)

DouyinVideoInfo.displayName = 'DouyinVideoInfo'
export default DouyinVideoInfo
