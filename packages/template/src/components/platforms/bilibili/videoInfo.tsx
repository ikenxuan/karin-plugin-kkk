import { Button, Chip } from '@heroui/react'
import { 
  Coins, 
  ExternalLink,
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Star
} from 'lucide-react'
import React from 'react'

import type {
  BilibiliVideoInfoProps
} from '../../../types/platforms/bilibili/videoInfo'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { EnhancedImage } from './shared'

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
 * B站视频信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const BilibiliVideoInfo: React.FC<Omit<BilibiliVideoInfoProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const { data } = props
  const { title, stat, pic, owner, ctime, bvid } = data

  return (
    <DefaultLayout {...props}>
      <div>
        {/* 主卡片 */}
        <div className="overflow-hidden transition-all">
          {/* 视频封面 */}
          <div className="overflow-hidden relative aspect-video">
            <EnhancedImage
              src={pic}
              alt={title}
              className="object-cover w-full h-full"
              placeholder="视频封面"
            />
            <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/20" />
          </div>

          {/* 卡片头部 */}
          <div className="p-20 pb-36">
            {/* 视频标题 */}
            <h1 className="mb-8 text-7xl font-bold leading-tight text-foreground-900">
              {title}
            </h1>

            {/* 发布日期 */}
            <p className="mb-6 text-6xl text-foreground-500">{formatDate(ctime)}</p>
          </div>

          {/* 卡片内容 */}
          <div className="px-16">
            {/* 统计数据网格 */}
            <div className="grid grid-cols-2 text-5xl gap-18">
              <div className="flex gap-4 items-center">
                <Eye size={48} className="text-view" />
                <span className="font-bold text-foreground-900">{formatNumber(stat.view)}</span>
                <span className="text-foreground-500">播放</span>
              </div>

              <div className="flex gap-4 items-center">
                <Heart size={48} className="text-like" />
                <span className="font-bold text-foreground-900">{formatNumber(stat.like)}</span>
                <span className="text-foreground-500">点赞</span>
              </div>

              <div className="flex gap-4 items-center">
                <MessageCircle size={48} className="text-comment" />
                <span className="font-bold text-foreground-900">{formatNumber(stat.reply)}</span>
                <span className="text-foreground-500">评论</span>
              </div>

              <div className="flex gap-4 items-center">
                <Star size={48} className="text-yellow-500" />
                <span className="font-bold text-foreground-900">{formatNumber(stat.favorite)}</span>
                <span className="text-foreground-500">收藏</span>
              </div>
            </div>

            <div className='h-18'></div>
            
            {/* 附加统计信息 */}
            <div className="flex justify-between items-center mb-8 text-5xl text-foreground-500">
              <div className="flex gap-16 items-center">
                <div className="flex gap-2 items-center">
                  <Coins size={48} />
                  <span className="font-medium">{stat.coin}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Share2 size={48} />
                  <span className="font-medium">{stat.share}</span>
                </div>
              </div>
              <div className="transform-gpu scale-[2.5] origin-right mb-8">
                <Chip 
                  color="warning" 
                  variant="flat"
                  size='lg'
                  radius='sm'
                >
                  BV{bvid}
                </Chip>
              </div>
            </div>
          </div>
          
          <div className='h-18' />
          <div className='h-0.5 bg-default-300' />

          {/* 卡片底部 */}
          <div className="flex justify-between items-center px-16 py-12 pb-0">
            {/* UP主信息 */}
            <div className="flex gap-8 items-center">
              <EnhancedImage
                src={owner.face}
                alt={owner.name}
                className="object-cover w-48 h-48 rounded-full"
                placeholder={owner.name.charAt(0)}
                isCircular
              />
              <div className='flex flex-col gap-6'>
                <p className="text-6xl font-semibold text-foreground-900">{owner.name}</p>
                <p className="text-5xl text-foreground-500">UP主</p>
              </div>
            </div>
            <div className="transform-gpu scale-[3.5] origin-right">
              <Button
                size="sm"
                className='bg-[#FF6699] text-default-50'
              >
                <ExternalLink className="mr-1 w-4 h-4" />
                观看
              </Button>
            </div>

          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

BilibiliVideoInfo.displayName = 'BilibiliVideoInfo'

export default BilibiliVideoInfo