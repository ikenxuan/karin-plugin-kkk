import { format } from 'date-fns'
import { Quote } from 'lucide-react'
import React from 'react'
import { RiHeart3Fill, RiMessage3Fill, RiShareForwardFill, RiStarFill, RiThumbUpFill } from 'react-icons/ri'

import type { DouyinFavoriteListProps } from '../../../types/platforms/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 抖音喜欢列表组件
 */
export const DouyinFavoriteList: React.FC<DouyinFavoriteListProps> = (props) => {
  const isDark = props.data.useDarkTheme ?? false

  // 弥散光颜色配置
  const glowColors = isDark 
    ? {
      primary: 'rgba(225, 29, 72, 0.15)', // Rose-600 (Lower opacity)
      secondary: 'rgba(20, 184, 166, 0.15)' // Teal-500 (Complementary)
    }
    : {
      primary: 'rgba(244, 63, 94, 0.25)', // Rose-500
      secondary: 'rgba(20, 184, 166, 0.2)' // Teal-400
    }

  return (
    <DefaultLayout 
      {...props}
      className="relative overflow-hidden bg-default-50"
    >
      {/* 1. 弥散光背景层 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full w-full h-[60%] -top-[20%] -left-[20%] blur-[150px]"
          style={{ background: glowColors.primary }}
        />
        <div
          className="absolute rounded-full w-full h-[60%] -bottom-[20%] -right-[20%] blur-[180px]"
          style={{ background: glowColors.secondary }}
        />
      </div>

      {/* 2. 杂色纹理层 */}
      <div className={'absolute inset-0 pointer-events-none z-10 mix-blend-overlay'}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* 3. 主要内容区域 */}
      <div className="relative z-20 p-12 pb-0 grid grid-cols-12 gap-12 min-h-screen items-stretch">
        
        {/* 左侧 */}
        <div className="col-span-4 flex flex-col justify-between py-8">
          
          {/* 顶部 Branding */}
          <div className="flex flex-col gap-1 select-none">
            <span className="text-6xl font-black text-default-900/10 tracking-tighter leading-none">LIKE</span>
            <span className="text-6xl font-black text-rose-500/20 tracking-tighter leading-none">FAVORITE</span>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-1.5 w-16 bg-rose-500 rounded-full"></div>
              <span className="text-base text-default-400 font-mono tracking-widest uppercase">
                Push Notification
              </span>
            </div>
          </div>

          {/* 中间 */}
          <div className="flex flex-col gap-10 relative">
            {/* 装饰图形 */}
            <div className="absolute -left-8 top-10 w-16 h-16 rounded-full border-4 border-rose-300/30 animate-[bounce_4s_infinite]"></div>
            
            {/* 装饰图形 */}
            <div className="absolute right-10 -top-4 w-6 h-6 rounded-full bg-orange-300/40"></div>

            <div className="relative w-fit self-center">
              <div className="absolute -inset-8 bg-linear-to-br from-rose-400 to-orange-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              {/* 装饰图形 */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-rose-400/30 animate-[spin_10s_linear_infinite]"></div>
              
              <img 
                src={props.data.liker_avatar} 
                className="relative w-64 h-64 rounded-full border-[6px] border-white object-cover shadow-2xl"
                alt="Liker"
              />
              <div className="absolute -bottom-3 -right-3 bg-rose-500 text-white px-5 py-2 rounded-full border-[5px] border-white font-bold text-xl shadow-xl flex items-center gap-2">
                <RiHeart3Fill className="w-5 h-5 fill-current" />
                <span>赞了</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-6xl font-black text-default-900 leading-tight relative">
                {props.data.liker_username}
                {/* 装饰图形 */}
                <svg className="absolute -right-8 -top-2 text-orange-400 w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                </svg>
              </span>
              <div className="px-6 py-6 pt-0 rounded-full text-3xl text-default-500">
                @{props.data.liker_douyin_id}
              </div>
              
              <div className="mt-6 flex flex-col items-center gap-2 text-rose-500">
                <div className="flex items-center gap-3">
                  <RiHeart3Fill className="w-10 h-10 fill-current" />
                  <span className="text-4xl font-bold">刚刚赞了这个作品</span>
                </div>
                {/* 装饰线条 */}
                <svg width="200" height="20" viewBox="0 0 200 20" className="opacity-60">
                  <path d="M0 10 Q 50 20, 100 10 T 200 10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* 底部 */}
          <div className="flex flex-col gap-8 relative">
            {/* 装饰图形 */}
            <div className="absolute left-4 bottom-4 w-32 h-32 bg-rose-500/5 rounded-2xl -z-10 rotate-12"></div>
            
            <div className="h-px w-full bg-linear-to-r from-default-200 via-default-300 to-transparent"></div>
            <div className="flex items-end gap-6">
              {props.qrCodeDataUrl && (
                <img src={props.qrCodeDataUrl} className="w-65 h-auto rounded-2xl mix-blend-multiply" alt="QR" />
              )}
              <div className="flex flex-col justify-end h-56 pb-2">
                <span className="text-default-400 text-sm font-mono mb-2">SCAN TO VIEW</span>
                <span className="text-3xl font-bold text-default-700 leading-none">
                  {format(new Date(), 'HH:mm')}
                </span>
                <span className="text-lg text-default-400 font-medium">
                  {format(new Date(), 'yyyy.MM.dd')}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 右侧 */}
        <div className="col-span-8 h-full">
          <div className="h-full bg-default-50/60 backdrop-blur-xl rounded-[3rem] p-10 border border-default-200 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
            
            {/* 作者信息栏 */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-6 flex-1 min-w-0 mr-6">
                <img 
                  src={props.data.author_avatar} 
                  className="w-24 h-24 rounded-full border-2 border-default-100 shadow-md shrink-0"
                  alt="Author"
                />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-4xl font-bold text-default-800 truncate" title={props.data.author_username}>
                    {props.data.author_username}
                  </span>
                  <span className="text-xl text-default-400 font-mono truncate">
                    抖音号: {props.data.author_douyin_id}
                  </span>
                </div>
              </div>
              <div className="px-6 py-3 bg-default-100/80 backdrop-blur-md rounded-full text-default-500 font-medium text-lg shrink-0">
                发布于 {props.data.create_time.split(' ')[0]}
              </div>
            </div>

            {/* 封面图 */}
            <div className="flex-1 relative rounded-[2.5rem] overflow-hidden group shadow-inner bg-black/5">
              <img 
                src={props.data.image_url} 
                className="w-full h-full object-cover transition-transform duration-700"
                alt="Cover"
              />
              {/* 描述遮罩 */}
              <div className="absolute inset-x-0 bottom-0 pt-40 pb-12 px-12 bg-linear-to-t from-black/90 via-black/50 to-transparent">
                <div className="flex gap-6 items-start">
                  <Quote size={48} className="text-rose-500/90 shrink-0 rotate-180 mt-2" />
                  <div 
                    className="text-white text-4xl font-medium leading-relaxed line-clamp-3 drop-shadow-lg tracking-wide"
                    dangerouslySetInnerHTML={{ __html: props.data.desc || '分享视频' }}
                  />
                </div>
              </div>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-5 gap-6 z-10">
              <StatItem icon={RiHeart3Fill} value={props.data.dianzan} iconClassName="text-rose-500/80" />
              <StatItem icon={RiThumbUpFill} value={props.data.tuijian} />
              <StatItem icon={RiMessage3Fill} value={props.data.pinglun} />
              <StatItem icon={RiStarFill} value={props.data.shouchang} />
              <StatItem icon={RiShareForwardFill} value={props.data.share} />
            </div>

          </div>
        </div>

      </div>
    </DefaultLayout>
  )
}

/** 统计项小组件 */
const StatItem: React.FC<{
  icon: React.ElementType,
  value: string
  iconClassName?: string
}> = ({ icon: Icon, value, iconClassName }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-6 rounded-3xl bg-default-100">
    <Icon className={`w-12 h-12 fill-current opacity-90 ${iconClassName || 'text-default-400'}`} />
    <span className="text-2xl font-bold text-default-600 mt-1">{value}</span>
  </div>
)
