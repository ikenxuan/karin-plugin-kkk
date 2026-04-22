import { Button, Chip } from '@heroui/react'
import React, { useMemo } from 'react'

import { DefaultLayout } from '../../../components/layouts/DefaultLayout'
import type { BilibiliVideoInfoProps } from '../../../types/platforms/bilibili/videoInfo'
import { Icon } from '../../common/Icon'
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

const StatItem: React.FC<{
  icon: React.ReactNode
  value: number
  label: string
  iconColor?: string
}> = React.memo(({ icon, value, label, iconColor = 'text-muted' }) => (
  <div className="flex gap-4 items-center">
    <div className={iconColor}>{icon}</div>
    <span className="font-bold text-foreground">{formatNumber(value)}</span>
    <span className="text-muted">{label}</span>
  </div>
))

StatItem.displayName = 'StatItem'

/**
 * B站视频信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const BilibiliVideoInfo: React.FC<Omit<BilibiliVideoInfoProps, 'templateType' | 'templateName'>> = React.memo(
  (props) => {
    const formattedDate = useMemo(() => formatDate(props.data.ctime), [props.data.ctime])

    const statsData = useMemo(
      () => [
        { icon: <Icon icon="lucide:eye" width={48} />, value: props.data.stat.view, label: '播放', iconColor: 'text-view' },
        { icon: <Icon icon="lucide:heart" width={48} />, value: props.data.stat.like, label: '点赞', iconColor: 'text-like' },
        { icon: <Icon icon="lucide:message-circle" width={48} />, value: props.data.stat.reply, label: '评论', iconColor: 'text-comment' },
        { icon: <Icon icon="lucide:star" width={48} />, value: props.data.stat.favorite, label: '收藏', iconColor: 'text-yellow-500' }
      ],
      [props.data.stat]
    )

    return (
      <DefaultLayout {...props}>
        <div>
          {/* 主卡片 */}
          <div className="overflow-hidden transition-all">
            {/* 视频封面 */}
            <div className="overflow-hidden relative aspect-video">
              <EnhancedImage
                src={props.data.pic}
                alt={props.data.title}
                className="object-cover w-full h-full"
                placeholder="视频封面"
              />
              <div className="absolute inset-0 bg-linear-to-t to-transparent from-black/20" />
            </div>

            {/* 卡片头部 */}
            <div className="p-20 pb-36">
              {/* 视频标题 */}
              <h1 className="mb-8 text-7xl font-bold leading-tight text-foreground">{props.data.title}</h1>
              {/* 视频简介 */}
              <p className="mb-8 text-5xl leading-normal whitespace-pre-wrap text-foreground/80">{props.data.desc}</p>
              {/* 发布日期 */}
              <p className="mb-6 text-4xl text-muted">{formattedDate}</p>
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
              <div className="flex justify-between items-center mb-8 text-5xl text-muted">
                <div className="flex gap-16 items-center">
                  <div className="flex gap-2 items-center">
                    <Icon icon="lucide:coins" width={48} />
                    <span className="font-medium">{props.data.stat.coin}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Icon icon="lucide:share-2" width={48} />
                    <span className="font-medium">{props.data.stat.share}</span>
                  </div>
                </div>
                <div className="transform-gpu scale-[2.5] origin-right mb-8">
                  <Chip color="warning" variant="soft" size="lg">
                    稿件BV号：{props.data.bvid}
                  </Chip>
                </div>
              </div>
            </div>

            <div className="h-18" />
            <div className="h-0.5 bg-border" />

            {/* 卡片底部 */}
            <div className="flex justify-between items-center px-16 py-12 pb-0">
              {/* UP主信息 */}
              <div className="flex gap-8 items-center">
                <EnhancedImage
                  src={props.data.owner.face}
                  alt={props.data.owner.name}
                  className="object-cover w-48 h-48 rounded-full"
                  placeholder={props.data.owner.name.charAt(0)}
                  isCircular
                />
                <div className="flex flex-col gap-6">
                  <p className="text-6xl font-semibold text-foreground">{props.data.owner.name}</p>
                  <p className="text-5xl text-muted">ID: {props.data.owner.mid}</p>
                </div>
              </div>
              <div className="transform-gpu scale-[3.5] origin-right">
                <Button size="sm" className="bg-[#FF6699] text-white">
                  <Icon icon="lucide:external-link" className="mr-1 w-4 h-4" />
                  观看
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
)

BilibiliVideoInfo.displayName = 'BilibiliVideoInfo'

export default BilibiliVideoInfo
