import { Button, Chip } from '@heroui/react'
import { ExternalLink, Eye, Heart, MessageCircle, Share2, Star, TrendingUp } from 'lucide-react'
import React, { useMemo } from 'react'

import { DefaultLayout } from '../../../components/layouts/DefaultLayout'
import type { DouyinVideoInfoProps } from '../../../types/platforms/douyin/videoInfo'

/**
 * 格式化数字显示
 * @param num 数字
 * @returns 格式化后的字符串
 */
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  return num.toLocaleString()
}

/**
 * 格式化时间戳为可读日期
 * @param timestamp 时间戳
 * @returns 格式化后的日期字符串
 */
const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * 统计项组件
 * @param props 组件属性
 * @returns JSX元素
 */
const StatItem: React.FC<{
  /** 图标 */
  icon: React.ReactNode
  /** 数值 */
  value: number
  /** 标签 */
  label: string
  /** 图标颜色 */
  iconColor?: string
}> = React.memo(({ icon, value, label, iconColor = 'text-foreground-500' }) => (
  <div className="flex gap-4 items-center">
    <div className={iconColor}>{icon}</div>
    <span className="font-bold text-foreground-900">{formatNumber(value)}</span>
    <span className="text-foreground-500">{label}</span>
  </div>
))

StatItem.displayName = 'StatItem'

/**
 * 抖音视频信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const DouyinVideoInfo: React.FC<Omit<DouyinVideoInfoProps, 'templateType' | 'templateName'>> = React.memo(
  (props) => {
    /** 格式化的发布日期 */
    const formattedDate = useMemo(() => formatDate(props.data.create_time), [props.data.create_time])

    /** 统计数据配置 */
    const statsData = useMemo(
      () => [
        { icon: <Heart size={48} />, value: props.data.statistics.digg_count, label: '点赞', iconColor: 'text-like' },
        { icon: <MessageCircle size={48} />, value: props.data.statistics.comment_count, label: '评论', iconColor: 'text-comment' },
        { icon: <Star size={48} />, value: props.data.statistics.collect_count, label: '收藏', iconColor: 'text-yellow-500' },
        { icon: <Share2 size={48} />, value: props.data.statistics.share_count, label: '分享', iconColor: 'text-view' }
      ],
      [props.data.statistics]
    )

    return (
      <DefaultLayout {...props}>
        <div>
          {/* 主卡片 */}
          <div className="overflow-hidden transition-all">
            {/* 视频封面 */}
            <div className="overflow-hidden relative">
              <img
                src={props.data.image_url}
                alt={props.data.desc}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t to-transparent from-black/30" />
            </div>

            {/* 卡片头部 */}
            <div className="p-20 pb-36">
              {/* 视频描述 */}
              <h1 className="mb-8 text-7xl font-bold leading-tight text-foreground-900">{props.data.desc}</h1>
              {/* 发布日期 */}
              <p className="mb-6 text-4xl text-foreground-500">{formattedDate}</p>
            </div>

            {/* 卡片内容 */}
            <div className="px-16">
              <div className="grid grid-cols-2 text-5xl gap-18">
                {statsData.map((stat, index) => (
                  <StatItem
                    key={index}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    iconColor={stat.iconColor}
                  />
                ))}
              </div>

              <div className="h-18"></div>

              {/* 附加统计信息 */}
              <div className="flex justify-between items-center mb-8 text-5xl text-foreground-500">
                <div className="flex gap-16 items-center">
                  <div className="flex gap-2 items-center">
                    <TrendingUp size={48} />
                    <span className="font-medium">{formatNumber(props.data.statistics?.recommend_count ?? 0)}</span>
                    <span className="text-4xl">推荐</span>
                  </div>
                  {props.data.statistics.play_count > 0 && (
                    <div className="flex gap-2 items-center">
                      <Eye size={48} />
                      <span className="font-medium">{formatNumber(props.data.statistics.play_count)}</span>
                      <span className="text-4xl">播放</span>
                    </div>
                  )}
                </div>
                <div className="transform-gpu scale-[2.5] origin-right mb-8">
                  <Chip color="primary" variant="flat" size="lg" radius="sm">
                    作品ID：{props.data.aweme_id}
                  </Chip>
                </div>
              </div>
            </div>

            <div className="h-18" />
            <div className="h-0.5 bg-default-300" />

            {/* 卡片底部 */}
            <div className="flex justify-between items-center px-16 py-12 pb-0">
              {/* 作者信息 */}
              <div className="flex gap-8 items-center">
                <img
                  src={props.data.author.avatar}
                  alt={props.data.author.name}
                  className="object-cover w-48 h-48 rounded-full"
                />
                <div className="flex flex-col gap-6">
                  <p className="text-6xl font-semibold text-foreground-900">{props.data.author.name}</p>
                  <p className="text-5xl text-foreground-500">抖音号: {props.data.author.short_id}</p>
                </div>
              </div>
              <div className="transform-gpu scale-[3.5] origin-right">
                <Button 
                  size="sm" 
                  className='bg-default-800 dark:bg-default-100'
                >
                  <div className='flex items-center'>
                    {/* 图标 - 使用多层叠加创造故障效果 */}
                    <div className="relative mr-1">
                      {/* 青色阴影层 */}
                      <ExternalLink 
                        className="absolute w-4 h-4" 
                        style={{ 
                          transform: 'translate(-0.5px, -0.5px)',
                          color: '#00e6f6'
                        }}
                      />
                      {/* 红色阴影层 */}
                      <ExternalLink 
                        className="absolute w-4 h-4" 
                        style={{ 
                          transform: 'translate(0.5px, 0.5px)',
                          color: '#ff013c'
                        }}
                      />
                      {/* 主图标层 - 白色 */}
                      <ExternalLink 
                        className="relative w-4 h-4" 
                        style={{ color: 'white' }}
                      />
                    </div>
                    
                    {/* 文字 - 使用多层叠加创造故障效果 */}
                    <div className="relative">
                      {/* 青色阴影层 */}
                      <span 
                        className="absolute"
                        style={{ 
                          transform: 'translate(-0.5px, -0.5px)',
                          color: '#00e6f6'
                        }}
                      >
                        观看
                      </span>
                      {/* 红色阴影层 */}
                      <span 
                        className="absolute"
                        style={{ 
                          transform: 'translate(0.5px, 0.5px)',
                          color: '#ff013c'
                        }}
                      >
                        观看
                      </span>
                      {/* 主文字层 - 白色 */}
                      <span 
                        className="relative"
                        style={{ color: 'white' }}
                      >
                        观看
                      </span>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
)

DouyinVideoInfo.displayName = 'DouyinVideoInfo'

export default DouyinVideoInfo