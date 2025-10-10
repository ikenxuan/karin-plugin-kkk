import { Button, Chip } from '@heroui/react'
import { Calendar, ExternalLink, Heart, MapPin, MessageCircle, Share2, Star } from 'lucide-react'
import React, { useMemo } from 'react'

import { DefaultLayout } from '../../../components/layouts/DefaultLayout'
import type { XiaohongshuNoteInfoProps } from '../../../types/platforms/xiaohongshu'

/**
 * 格式化数字显示
 * @param num 数字
 * @returns 格式化后的字符串
 */
const formatNumber = (num: string | number): string => {
  const numValue = typeof num === 'string' ? parseInt(num, 10) : num
  if (numValue >= 10000) {
    return `${(numValue / 10000).toFixed(1)}万`
  }
  return numValue.toLocaleString()
}

/**
 * 格式化时间戳为可读日期
 * @param timestamp 时间戳
 * @returns 格式化后的日期字符串
 */
const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
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
  value: string | number
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
 * 小红书笔记信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const XiaohongshuNoteInfo: React.FC<Omit<XiaohongshuNoteInfoProps, 'templateType' | 'templateName'>> = React.memo(
  (props) => {
    /** 格式化的发布日期 */
    const formattedDate = useMemo(() => formatDate(props.data.time), [props.data.time])

    /** 统计数据配置 - 小红书特色配色 */
    const statsData = useMemo(
      () => [
        { icon: <Heart size={48} />, value: props.data.statistics.liked_count, label: '点赞', iconColor: 'text-red-500' },
        { icon: <MessageCircle size={48} />, value: props.data.statistics.comment_count, label: '评论', iconColor: 'text-blue-500' },
        { icon: <Star size={48} />, value: props.data.statistics.collected_count, label: '收藏', iconColor: 'text-yellow-500' },
        { icon: <Share2 size={48} />, value: props.data.statistics.share_count, label: '分享', iconColor: 'text-green-500' }
      ],
      [props.data.statistics]
    )

    return (
      <DefaultLayout {...props}>
        <div>
          {/* 主卡片 */}
          <div className="overflow-hidden transition-all">
            {/* 笔记封面 */}
            <div className="overflow-hidden relative">
              <img
                src={props.data.image_url}
                alt={props.data.desc}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/30" />
            </div>

            {/* 卡片头部 */}
            <div className="p-20 pb-36">
              {/* 笔记标题 */}
              {props.data.title && (
                <h1 className="mb-6 text-7xl font-bold leading-tight text-foreground-900">{props.data.title}</h1>
              )}
              {/* 笔记描述 - 支持HTML渲染 */}
              <div
                className='text-5xl text-foreground-700 leading-relaxed mb-8 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
                dangerouslySetInnerHTML={{ __html: props.data.desc }}
              />
              
              {/* 发布信息 */}
              <div className="flex gap-8 items-center text-5xl text-foreground-500">
                <div className="flex gap-2 items-center">
                  <Calendar size={32} />
                  <span>{formattedDate}</span>
                </div>
                {props.data.ip_location && (
                  <div className="flex gap-2 items-center">
                    <MapPin size={32} />
                    <span>{props.data.ip_location}</span>
                  </div>
                )}
              </div>
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
                  {/* 可以在这里添加其他小红书特有的统计信息 */}
                </div>
                <div className="transform-gpu scale-[2.5] origin-right mb-8">
                  <Chip color="danger" variant="flat" size="lg" radius="sm">
                    笔记ID：{props.data.note_id}
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
                  alt={props.data.author.nickname}
                  className="object-cover w-48 h-48 rounded-full border-red-200 border-3"
                />
                <div className="flex flex-col gap-6">
                  <p className="text-6xl font-semibold text-foreground-900">{props.data.author.nickname}</p>
                  <p className="text-5xl text-foreground-500">用户ID: {props.data.author.user_id.slice(0, 8)}...</p>
                </div>
              </div>
              <div className="transform-gpu scale-[3.5] origin-right">
                <Button 
                  size="sm" 
                  className='text-white bg-red-500 hover:bg-red-600'
                >
                  <div className='flex items-center'>
                    <ExternalLink className="mr-1 w-4 h-4" />
                    <span>查看原文</span>
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

XiaohongshuNoteInfo.displayName = 'XiaohongshuNoteInfo'

export default XiaohongshuNoteInfo