import React from 'react'

import type {
  DouyinLiveProps
} from '../../../types/platforms/douyin'
import { Icon } from '../../common/Icon'
import { DefaultLayout } from '../../layouts/DefaultLayout'

const coverMaskStyle: React.CSSProperties = {
  maskImage: 'linear-gradient(to bottom, transparent 0%, black 0, black 28%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 0, black 28%, transparent 100%)'
}

/**
 * 全局氛围背景层：模糊封面 + 渐变遮罩 + 高对比杂色纹理
 */
const AmbientBackground: React.FC<{ pic: string }> = React.memo(({ pic }) => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    <img
      src={pic}
      alt=""
      className="w-full h-full object-cover scale-150 blur-[120px] saturate-[1.8] opacity-50"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
    <div className="absolute inset-0 bg-linear-to-b from-surface/60 via-surface/25 to-surface/60 dark:from-black/55 dark:via-black/20 dark:to-black/55" />
    <div className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-overlay dark:mix-blend-soft-light">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="douyinNoise">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncA type="linear" slope="2.5" intercept="-0.6" />
            </feComponentTransfer>
          </filter>
          <mask id="noiseMask">
            <linearGradient id="noiseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="25%" stopColor="white" stopOpacity="0.4" />
              <stop offset="50%" stopColor="white" stopOpacity="0.08" />
              <stop offset="75%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.85" />
            </linearGradient>
            <rect width="100%" height="100%" fill="url(#noiseGradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" filter="url(#douyinNoise)" mask="url(#noiseMask)" fill="white" />
      </svg>
    </div>
  </div>
))

AmbientBackground.displayName = 'AmbientBackground'

/**
 * 封面组件 - 全宽铺满 + 双向渐变溶解 + LIVE大字
 */
const CoverSection: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div className="relative">
      <div style={coverMaskStyle}>
        <img
          className="object-cover w-full"
          src={imageUrl}
          alt="直播封面"
        />
      </div>
      <div className="absolute right-20 top-20 pointer-events-none select-none">
        <span className="text-7xl font-black tracking-[0.15em] uppercase text-white/20">
          直播中
        </span>
      </div>
    </div>
  )
}

/**
 * 直播信息组件
 */
const InfoSection: React.FC<{ data: DouyinLiveProps['data'] }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-8 px-16 pt-12">
      {/* 直播标题 - 视觉锚点 */}
      <h1 className="text-[80px] font-black leading-tight text-foreground tracking-tight select-text">
        {data.text}
      </h1>

      {/* 直播中 + 分区 + 房间号 */}
      <div className="flex items-center gap-4 text-3xl text-foreground/30">
        <span className="text-danger/60 font-black tracking-wider text-[32px]">
          直播中
        </span>
        <span>/</span>
        <span>{data.partition_title}</span>
        <span>/</span>
        <span>房间号 {data.room_id}</span>
      </div>

      {/* 直播数据 */}
      <div className="flex flex-wrap items-center gap-6 text-3xl text-foreground/30">
        <span className="flex items-center gap-1.5">
          <Icon icon="lucide:users" width={28} className="text-foreground/20" />
          {data.online_viewers}在线
        </span>
        <span className="flex items-center gap-1.5">
          <Icon icon="lucide:eye" width={28} className="text-foreground/20" />
          {data.total_viewers}观看
        </span>
        <span className="flex items-center gap-1.5">
          <Icon icon="lucide:heart" width={28} className="text-foreground/20" />
          {data.like_count}点赞
        </span>
        {data.resolution && (
          <span className="flex items-center gap-1.5">
            <Icon icon="lucide:monitor" width={28} className="text-foreground/20" />
            {data.resolution}
          </span>
        )}
        {data.has_commerce_goods && (
          <span className="flex items-center gap-1.5">
            <Icon icon="lucide:shopping-bag" width={28} className="text-foreground/20" />
            带货中
          </span>
        )}
      </div>

      {/* 签名 */}
      {data.signature && (
        <div className="text-5xl leading-relaxed text-foreground/75 select-text">
          {data.signature}
        </div>
      )}

      {/* 城市 */}
      {data.city && (
        <div className="flex items-center gap-2 text-3xl text-foreground/30">
          <Icon icon="lucide:map-pin" width={28} className="text-foreground/20" />
          <span>{data.city}</span>
        </div>
      )}
    </div>
  )
}

/**
 * 底部区域 - 主播信息 + 二维码 + 抖音Logo
 */
const BottomSection: React.FC<{ data: DouyinLiveProps['data']; qrCodeDataUrl: string }> = ({ data, qrCodeDataUrl }) => {
  return (
    <div className="flex justify-between items-end px-16 pt-24 pb-16">
      {/* 左侧：主播信息 */}
      <div className="flex flex-col gap-10">
        <div className="flex gap-10 items-center">
          <div className="relative shrink-0">
            <div className="flex justify-center items-center bg-white rounded-full w-35 h-35">
              <img
                src={data.avater_url}
                alt="头像"
                className="rounded-full w-33 h-33"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-7xl font-bold text-foreground select-text">
              @{data.username}
            </div>
            <div className="flex items-center gap-3 text-4xl text-foreground/50">
              <span className="text-foreground/50 font-black tracking-wider text-3xl">直播中</span>
              <span className="text-foreground/40">·</span>
              <Icon icon="lucide:users" width={32} />
              <span className="select-text">{data.fans}粉丝</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 text-3xl text-foreground/70">
          <div className="flex flex-col gap-2 px-6 py-3 rounded-2xl bg-default/45">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:file-video" width={28} />
              <span className="text-foreground/40">作品</span>
            </div>
            <span className="font-medium text-4xl select-text">{data.aweme_count}</span>
          </div>
          <div className="flex flex-col gap-2 px-6 py-3 rounded-2xl bg-default/45">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:user-plus" width={28} />
              <span className="text-foreground/40">关注</span>
            </div>
            <span className="font-medium text-4xl select-text">{data.following_count}</span>
          </div>
          <div className="flex flex-col gap-2 px-6 py-3 rounded-2xl bg-default/45">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:heart" width={28} />
              <span className="text-foreground/40">获赞</span>
            </div>
            <span className="font-medium text-4xl select-text">{data.total_favorited}</span>
          </div>
        </div>
      </div>

      {/* 右侧：抖音Logo + 二维码 */}
      <div className="flex flex-col items-end gap-6">
        <img
          src={data.useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
          alt="抖音"
          className="w-60 h-auto opacity-80 dark:opacity-70"
        />
        {qrCodeDataUrl ? (
          <img
            src={qrCodeDataUrl}
            alt="二维码"
            className="h-auto w-75"
          />
        ) : (
          <div className="flex justify-center items-center bg-surface w-75 h-75">
            <span className="text-foreground/50">二维码</span>
          </div>
        )}
        <span className="text-2xl text-foreground/50 select-text">扫码进入直播间</span>
      </div>
    </div>
  )
}

/**
 * 抖音直播组件
 */
export const DouyinLive: React.FC<Omit<DouyinLiveProps, 'templateType' | 'templateName'>> = (props) => {
  const { qrCodeDataUrl } = props
  const d = props.data

  return (
    <DefaultLayout {...props} className="relative overflow-hidden">
      <AmbientBackground pic={d.image_url} />

      <div className="relative z-10">
        <CoverSection imageUrl={d.image_url} />
        <InfoSection data={d} />
        <BottomSection data={d} qrCodeDataUrl={qrCodeDataUrl} />
      </div>
    </DefaultLayout>
  )
}

export default DouyinLive
