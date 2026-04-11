import { Clock, Radio, ScanLine, Users } from 'lucide-react'
import React from 'react'

import type {
  BilibiliLiveDynamicProps,
  BilibiliPosterPalette } from '../../../../types/platforms/bilibili'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { CommentText, EnhancedImage, processCommentHTML } from '../shared'

const LIGHT_FALLBACK: BilibiliPosterPalette = {
  bgColor: '#f4fbff',
  primaryColor: '#00a1d6',
  secondaryColor: '#2dcaef',
  mutedColor: 'rgba(0,104,138,0.70)',
  accentColor: '#ff5f7f',
  deepColor: '#0f2d3a',
  coverShade: 'rgba(8, 28, 36, 0.34)'
}

const DARK_FALLBACK: BilibiliPosterPalette = {
  bgColor: '#081018',
  primaryColor: '#63d5ff',
  secondaryColor: '#9ae6ff',
  mutedColor: 'rgba(154,230,255,0.72)',
  accentColor: '#ff8ea7',
  deepColor: '#d9f6ff',
  coverShade: 'rgba(0, 0, 0, 0.42)'
}

const stripHtmlTags = (content: string): string => {
  return content.replace(/<[^>]+>/g, '').trim()
}

const withAlphaFromCss = (color: string, alpha: number): string => {
  const normalized = color.trim()

  if (normalized.startsWith('#')) {
    const hex = normalized.slice(1)
    const fullHex = hex.length === 3
      ? hex.split('').map(char => `${char}${char}`).join('')
      : hex

    if (fullHex.length >= 6) {
      const r = Number.parseInt(fullHex.slice(0, 2), 16)
      const g = Number.parseInt(fullHex.slice(2, 4), 16)
      const b = Number.parseInt(fullHex.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }

  const match = normalized.match(/rgba?\(([^)]+)\)/)
  if (!match) return color

  const [r, g, b] = match[1]
    .split(',')
    .slice(0, 3)
    .map(part => Number.parseFloat(part.trim()))

  if ([r, g, b].some(Number.isNaN)) return color
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getSingleLineFontSize = (content: string, base: number, min: number): number => {
  const length = stripHtmlTags(content).length
  if (length <= 4) return base
  if (length <= 8) return base - 4
  if (length <= 12) return base - 10
  if (length <= 18) return base - 16
  return min
}

const InlineHtmlText: React.FC<{
  content: string
  className?: string
}> = ({ content, className }) => {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: processCommentHTML(content) }}
    />
  )
}

const AccentLabel: React.FC<{
  english: string
  chinese: string
  icon?: React.ReactNode
  align?: 'left' | 'right'
  style?: React.CSSProperties
  englishClassName?: string
  chineseClassName?: string
}> = ({
  english,
  chinese,
  icon,
  align = 'left',
  style,
  englishClassName = '',
  chineseClassName = ''
}) => {
  const isRight = align === 'right'

  return (
    <div className={`flex flex-col gap-1.5 ${isRight ? 'items-end text-right' : 'items-start text-left'} min-w-0`} style={style}>
      <div className={`flex items-center gap-3 whitespace-nowrap text-[22px] font-black tracking-[0.30em] uppercase ${englishClassName}`}>
        {icon}
        <span>{english}</span>
      </div>
      <div className={`text-[18px] font-semibold tracking-[0.08em] whitespace-nowrap ${chineseClassName}`}>
        {chinese}
      </div>
    </div>
  )
}

const MetaLabel: React.FC<{
  englishLabel: string
  chineseLabel: string
  value: React.ReactNode
  accent?: React.ReactNode
  valueClassName?: string
  valueStyle?: React.CSSProperties
}> = ({
  englishLabel,
  chineseLabel,
  value,
  accent,
  valueClassName = '',
  valueStyle
}) => {
  return (
    <div className='flex flex-col gap-4 min-w-0'>
      <div className='min-w-0'>
        <AccentLabel
          english={englishLabel}
          chinese={chineseLabel}
          icon={accent}
          englishClassName='text-foreground/56'
          chineseClassName='text-foreground/36'
        />
      </div>
      <div
        className={`min-w-0 font-medium leading-[1.06] tracking-[-0.035em] text-foreground whitespace-nowrap select-text ${valueClassName}`}
        style={valueStyle}
      >
        {value}
      </div>
    </div>
  )
}

export const BilibiliLiveDynamic: React.FC<Omit<BilibiliLiveDynamicProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const { data, qrCodeDataUrl } = props
  const isDark = data.useDarkTheme === true
  const palette = props.posterPalettes
    ? (isDark ? props.posterPalettes.dark : props.posterPalettes.light)
    : (props.posterPalette ?? (isDark ? DARK_FALLBACK : LIGHT_FALLBACK))
  const {
    bgColor,
    primaryColor,
    secondaryColor,
    mutedColor,
    accentColor,
    deepColor,
    coverShade
  } = palette
  const logo = isDark ? '/image/bilibili/bilibili-light.png' : '/image/bilibili/bilibili.png'
  const streamerFontSize = getSingleLineFontSize(data.username, 62, 38)
  const footerStreamerFontSize = getSingleLineFontSize(data.username, 34, 22)
  const roomSignalFontSize = getSingleLineFontSize(data.liveinf, 50, 34)
  const followerFontSize = getSingleLineFontSize(`${data.fans} 粉丝`, 42, 28)
  const startTimeFontSize = getSingleLineFontSize(data.create_time, 38, 28)

  return (
    <DefaultLayout
      {...props}
      className='relative overflow-hidden'
      style={{ backgroundColor: bgColor, minHeight: '1860px' }}
    >
      <div className='absolute inset-0 pointer-events-none'>
        <div
          className='absolute rounded-full w-7xl h-260 -top-40 -left-34 blur-[130px]'
          style={{
            background: `radial-gradient(ellipse at 35% 45%, ${withAlphaFromCss(primaryColor, 0.20)} 0%, ${withAlphaFromCss(secondaryColor, 0.10)} 48%, transparent 100%)`
          }}
        />
        <div
          className='absolute rounded-full w-250 h-280 top-72 -right-16 blur-[118px] rotate-12'
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${withAlphaFromCss(secondaryColor, 0.18)} 0%, ${withAlphaFromCss(primaryColor, 0.08)} 52%, transparent 100%)`
          }}
        />
        <div
          className='absolute rounded-full w-260 h-180 -bottom-16 left-28 blur-[136px] -rotate-12'
          style={{
            background: `radial-gradient(ellipse at 50% 55%, ${withAlphaFromCss(accentColor, 0.16)} 0%, ${withAlphaFromCss(primaryColor, 0.08)} 50%, transparent 100%)`
          }}
        />
      </div>

      <div className='absolute inset-0 pointer-events-none' style={{ opacity: isDark ? 0.09 : 0.11 }}>
        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <filter id='livePosterNoise' x='0%' y='0%' width='100%' height='100%'>
            <feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='1' stitchTiles='stitch' result='noise' />
            <feColorMatrix type='saturate' values='0' result='gray' />
            <feComponentTransfer>
              <feFuncR type='discrete' tableValues='0 1' />
              <feFuncG type='discrete' tableValues='0 1' />
              <feFuncB type='discrete' tableValues='0 1' />
            </feComponentTransfer>
          </filter>
          <rect width='100%' height='100%' filter='url(#livePosterNoise)' />
        </svg>
      </div>

      <div className='absolute top-30 right-14 pointer-events-none select-none opacity-[0.035]'>
        <div
          className='text-[220px] font-black tracking-tighter leading-none'
          style={{ color: deepColor }}
        >
          LIVE
        </div>
        <div
          className='text-[220px] font-black tracking-tighter leading-none -mt-4'
          style={{ color: deepColor }}
        >
          SIGNAL
        </div>
        <div
          className='mt-3 text-[34px] font-bold tracking-[0.24em] whitespace-nowrap'
          style={{ color: deepColor }}
        >
          直播信号
        </div>
      </div>

      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-20 right-18 grid grid-cols-4 gap-3 opacity-40'>
          <div className='w-3 h-3 rounded-full' style={{ backgroundColor: accentColor }} />
          <div className='w-3 h-3 rounded-full' style={{ backgroundColor: primaryColor }} />
          <div className='w-3 h-3 rounded-full' style={{ backgroundColor: secondaryColor }} />
          <div className='w-3 h-3 rounded-full' style={{ backgroundColor: primaryColor }} />
        </div>

        <div
          className='absolute right-0 bottom-0 w-150 h-120 opacity-[0.08]'
          style={{
            backgroundImage: `repeating-linear-gradient(-36deg, ${primaryColor}, ${primaryColor} 3px, transparent 3px, transparent 18px)`,
            maskImage: 'linear-gradient(to top left, black, transparent 72%)',
            WebkitMaskImage: 'linear-gradient(to top left, black, transparent 72%)'
          }}
        />
      </div>

      <div className='relative z-10 flex flex-col h-full px-16 pt-14 pb-12'>
        <div className='flex justify-between items-start mb-12'>
          <div className='flex flex-col gap-5'>
            <AccentLabel
              english='Bilibili Live Signal'
              chinese='哔哩哔哩直播信号'
              icon={<span className='w-3 h-3 rounded-full shrink-0' style={{ backgroundColor: accentColor }} />}
              style={{ color: mutedColor }}
              englishClassName='text-[24px]'
              chineseClassName='text-[19px]'
            />
            <img
              src={logo}
              alt='哔哩哔哩'
              className={`h-auto ${isDark ? 'w-80' : 'w-96'}`}
            />
          </div>

          <div className='flex flex-col items-end gap-4 text-right'>
            <AccentLabel
              english='On Air'
              chinese='正在直播'
              icon={<Radio size={20} />}
              align='right'
              style={{ color: accentColor }}
              englishClassName='text-[24px]'
              chineseClassName='text-[19px]'
            />
            <div className='text-[20px] font-semibold tracking-widest' style={{ color: mutedColor }}>
              {data.dynamicTYPE}
            </div>
          </div>
        </div>

        <div className='mb-12 max-w-[80%]'>
          <div className='mb-5'>
            <AccentLabel
              english='Realtime Recommendation'
              chinese='实时推荐'
              style={{ color: mutedColor }}
              englishClassName='text-[24px]'
              chineseClassName='text-[19px]'
            />
          </div>
          <CommentText
            className='text-[68px] font-black leading-[1.03] tracking-[-0.045em] whitespace-pre-wrap text-foreground select-text'
            content={data.text}
            style={{
              color: deepColor,
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </div>

        {data.image_url && (
          <div className='relative mb-16 overflow-hidden'>
            <div className='rounded-[30px] overflow-hidden'>
              <EnhancedImage
                src={data.image_url}
                alt='直播封面'
                className='object-cover w-full h-full'
              />
            </div>

            <div
              className='absolute inset-0 rounded-[30px]'
              style={{
                backgroundImage: `linear-gradient(to top, ${coverShade}, rgba(0,0,0,0.06), transparent)`
              }}
            />

            <div className='absolute right-8 bottom-8 left-8 flex justify-between items-end gap-8'>
              <div className='max-w-[65%]'>
                <AccentLabel
                  english='Stream Cover'
                  chinese='直播封面'
                  englishClassName='text-[20px] text-white/76'
                  chineseClassName='text-[16px] text-white/56'
                />
              </div>
              <div className='flex gap-3 items-center text-[24px] font-mono font-black whitespace-nowrap text-white'>
                <Clock size={22} />
                <span>{data.create_time}</span>
              </div>
            </div>
          </div>
        )}

        <div className='grid grid-cols-12 gap-10 items-end'>
          <div className='col-span-8 self-start flex flex-col gap-10'>
            <div className='flex gap-6 items-center min-w-0'>
              <div className='relative shrink-0'>
                <EnhancedImage
                  src={data.avatar_url}
                  alt='头像'
                  className='w-32 h-32 rounded-full object-cover'
                  isCircular
                />
                {data.frame && (
                  <EnhancedImage
                    src={data.frame}
                    alt='头像框'
                    className='absolute inset-0 scale-160'
                  />
                )}
              </div>

              <div className='min-w-0 flex-1'>
                <AccentLabel
                  english='Streamer'
                  chinese='UP 主'
                  style={{ color: mutedColor }}
                  englishClassName='text-[22px]'
                  chineseClassName='text-[18px]'
                />
                <div
                  className='mt-3 min-w-0 whitespace-nowrap font-black tracking-[-0.04em] leading-none text-foreground select-text'
                  style={{ fontSize: `${streamerFontSize}px` }}
                >
                  <InlineHtmlText content={data.username} />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-7'>
              <MetaLabel
                englishLabel='Room Signal'
                chineseLabel='直播间信息'
                accent={<Radio size={20} style={{ color: primaryColor }} />}
                value={
                  <div className='font-bold leading-none'>
                    {data.liveinf}
                  </div>
                }
                valueClassName='tracking-[-0.04em] whitespace-normal leading-[1.08]'
                valueStyle={{ fontSize: `${roomSignalFontSize}px` }}
              />

              <MetaLabel
                englishLabel='Followers'
                chineseLabel='粉丝规模'
                accent={<Users size={20} style={{ color: accentColor }} />}
                value={
                  <div className='font-medium leading-none'>
                    {data.fans} 粉丝
                  </div>
                }
                valueClassName='tracking-[-0.035em]'
                valueStyle={{ fontSize: `${followerFontSize}px` }}
              />

              <MetaLabel
                englishLabel='Start Time'
                chineseLabel='开播时间'
                accent={<Clock size={20} style={{ color: primaryColor }} />}
                value={
                  <div className='font-medium leading-none'>
                    {data.create_time}
                  </div>
                }
                valueClassName='tracking-[-0.03em]'
                valueStyle={{ fontSize: `${startTimeFontSize}px` }}
              />
            </div>
          </div>

          <div className='col-span-4 flex flex-col items-end gap-4'>
            <AccentLabel
              english='Scan To Watch'
              chinese='扫码观看'
              icon={<ScanLine size={20} style={{ color: primaryColor }} />}
              align='right'
              style={{ color: mutedColor }}
              englishClassName='text-[22px]'
              chineseClassName='text-[18px]'
            />

            {qrCodeDataUrl
              ? (
                <img
                  src={qrCodeDataUrl}
                  alt='二维码'
                  className='w-86 h-86 object-contain'
                />
              )
              : (
                <div className='flex justify-center items-center w-86 h-86'>
                  <span className='text-muted'>二维码</span>
                </div>
              )}

            <AccentLabel
              english='Dynamic Share Link'
              chinese='动态分享链接'
              align='right'
              style={{ color: mutedColor }}
              englishClassName='text-[20px]'
              chineseClassName='text-[17px]'
            />
          </div>
        </div>

        <div className='mt-auto pt-18 flex justify-between items-end gap-8'>
          <div className='flex flex-col gap-4'>
            <AccentLabel
              english='Broadcast Note'
              chinese='动态播报'
              style={{ color: mutedColor }}
              englishClassName='text-[22px]'
              chineseClassName='text-[18px]'
            />
            <div className='text-[54px] font-black leading-[1.02] tracking-[-0.035em] text-foreground select-text'>
              哔哩哔哩{data.dynamicTYPE}
            </div>
          </div>

          <div className='max-w-[38%] text-right'>
            <div className='mb-3'>
              <AccentLabel
                english='Streamer Signal'
                chinese='UP 主标识'
                align='right'
                style={{ color: mutedColor }}
                englishClassName='text-[22px]'
                chineseClassName='text-[18px]'
              />
            </div>
            <div
              className='whitespace-nowrap font-bold text-foreground select-text'
              style={{ fontSize: `${footerStreamerFontSize}px` }}
            >
              <InlineHtmlText content={data.username} />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

BilibiliLiveDynamic.displayName = 'BilibiliLiveDynamic'

export default BilibiliLiveDynamic
