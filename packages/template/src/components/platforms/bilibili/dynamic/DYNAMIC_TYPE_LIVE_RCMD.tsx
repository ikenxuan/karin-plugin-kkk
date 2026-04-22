import { extractRichTextPlainText, renderRichTextToReact } from '@kkk/richtext'
import React from 'react'

import type {
  BilibiliLiveDynamicProps,
  BilibiliPosterPalette } from '../../../../types/platforms/bilibili'
import { Icon } from '../../../common/Icon'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { EnhancedImage, UsernameDisplay } from '../shared'

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
  const liveSignalTime = data.now_time || data.create_time
  const streamerName = data.usernameMeta.name
  const streamerFontSize = getSingleLineFontSize(streamerName, 68, 42)
  const liveInfoFontSize = getSingleLineFontSize(data.liveinf, 38, 28)
  const followerFontSize = getSingleLineFontSize(`${data.fans} 粉丝`, 30, 24)
  const metaValueFontSize = getSingleLineFontSize(liveSignalTime, 32, 24)
  const coverInfoFontSize = getSingleLineFontSize(data.liveinf, 38, 24)
  const broadcastFontSize = getSingleLineFontSize(`${streamerName} 开播了`, 42, 28)
  const liveTitleLength = extractRichTextPlainText(data.text).length
  const liveTitleFontSize = liveTitleLength <= 16
    ? 74
    : liveTitleLength <= 28
      ? 66
      : liveTitleLength <= 44
        ? 58
        : 52

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
          ON
        </div>
        <div
          className='-mt-6 text-[220px] font-black tracking-tighter leading-none'
          style={{ color: deepColor }}
        >
          AIR
        </div>
      </div>

      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        {/* <div className='absolute top-20 right-18 grid grid-cols-4 gap-3 opacity-40'>
          <div className='h-3 w-3 rounded-full' style={{ backgroundColor: accentColor }} />
          <div className='h-3 w-3 rounded-full' style={{ backgroundColor: primaryColor }} />
          <div className='h-3 w-3 rounded-full' style={{ backgroundColor: secondaryColor }} />
          <div className='h-3 w-3 rounded-full' style={{ backgroundColor: primaryColor }} />
        </div> */}

        <div
          className='absolute right-0 bottom-0 h-120 w-150 opacity-[0.08]'
          style={{
            backgroundImage: `repeating-linear-gradient(-36deg, ${primaryColor}, ${primaryColor} 3px, transparent 3px, transparent 18px)`,
            maskImage: 'linear-gradient(to top left, black, transparent 72%)',
            WebkitMaskImage: 'linear-gradient(to top left, black, transparent 72%)'
          }}
        />

        <div
          className='absolute w-175 h-100'
          style={{
            left: '56px',
            bottom: '18px',
            transform: 'scale(0.82)',
            transformOrigin: 'left bottom'
          }}
        >
          <div
            className='absolute -left-22 bottom-0 h-48 w-52 rounded-full blur-[54px]'
            style={{
              background: `radial-gradient(circle, ${withAlphaFromCss(accentColor, isDark ? 0.20 : 0.12)} 0%, transparent 70%)`
            }}
          />
          <div
            className='absolute left-18 bottom-10 h-36 w-44 rounded-full blur-[46px]'
            style={{
              background: `radial-gradient(circle, ${withAlphaFromCss(primaryColor, isDark ? 0.11 : 0.06)} 0%, transparent 72%)`
            }}
          />
          <div
            className='absolute left-34 top-6 h-28 w-36 rounded-full blur-2xl'
            style={{
              background: `radial-gradient(circle, ${withAlphaFromCss(secondaryColor, isDark ? 0.08 : 0.05)} 0%, transparent 72%)`
            }}
          />

          <div
            className='absolute left-14 bottom-14 flex items-end gap-3'
            style={{ opacity: isDark ? 0.88 : 0.72 }}
          >
            {[42, 86, 132, 72, 30].map((height, index) => (
              <span
                key={height}
                className='w-2.5 rounded-full'
                style={{
                  height: `${height}px`,
                  background: `linear-gradient(to top, ${index === 2 ? accentColor : primaryColor}, ${withAlphaFromCss(index % 2 === 0 ? secondaryColor : primaryColor, 0.08)})`,
                  boxShadow: `0 0 22px ${withAlphaFromCss(index === 2 ? accentColor : primaryColor, isDark ? 0.20 : 0.10)}`
                }}
              />
            ))}
          </div>

          <div className='absolute left-44 top-30 grid grid-cols-4 gap-3 opacity-52'>
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className='h-2.5 w-2.5 rounded-full'
                style={{
                  backgroundColor: index === 2 || index === 5 || index === 9
                    ? accentColor
                    : index % 2 === 0
                      ? secondaryColor
                      : primaryColor
                }}
              />
            ))}
          </div>

          <svg
            className='absolute inset-0 h-full w-full'
            viewBox='0 0 700 400'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M22 338C92 304 126 242 188 224C278 198 340 242 420 220C488 202 560 140 640 88'
              stroke={withAlphaFromCss(accentColor, isDark ? 0.32 : 0.16)}
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M0 314C68 282 120 272 176 246C254 210 300 168 354 164C432 158 500 216 614 190'
              stroke={withAlphaFromCss(primaryColor, isDark ? 0.18 : 0.09)}
              strokeWidth='1'
              strokeDasharray='8 14'
              strokeLinecap='round'
            />
            <circle cx='188' cy='224' r='7' fill={accentColor} fillOpacity='0.62' />
            <circle cx='420' cy='220' r='5' fill={secondaryColor} fillOpacity='0.48' />
            <circle cx='640' cy='88' r='4' fill={primaryColor} fillOpacity='0.42' />
          </svg>
        </div>
      </div>

      <div className='relative z-10 flex h-full flex-col px-16 pt-14 pb-12'>
        <div className='mb-10 flex items-start justify-between gap-10'>
          <div className='flex flex-col gap-5'>
            <div
              className='inline-flex items-center gap-4 text-[22px] font-black tracking-[0.28em] uppercase'
              style={{ color: mutedColor }}
            >
              <span className='h-3 w-3 shrink-0 rounded-full' style={{ backgroundColor: accentColor }} />
              <span>Bilibili Live Signal</span>
            </div>
          </div>

          <div className='flex flex-col items-end gap-5 text-right'>
            <div
              className='inline-flex items-center gap-3 text-[20px] font-black tracking-[0.24em] uppercase'
              style={{ color: accentColor }}
            >
              <span className='h-3.5 w-3.5 rounded-full animate-pulse' style={{ backgroundColor: accentColor }} />
              <span>Live</span>
            </div>
            <div className='text-[22px] font-semibold tracking-[0.18em] uppercase' style={{ color: mutedColor }}>
              {data.dynamicTYPE}
            </div>
          </div>
        </div>

        <div className='mb-12'>
          <div className='grid grid-cols-12 gap-8 items-center'>
            <div className='col-span-7 flex min-w-0 items-center gap-6'>
              <div className='relative shrink-0'>
                <div
                  className='absolute -inset-6 rounded-full blur-[42px]'
                  style={{
                    background: `radial-gradient(circle, ${withAlphaFromCss(accentColor, isDark ? 0.26 : 0.18)} 0%, transparent 72%)`
                  }}
                />
                <EnhancedImage
                  src={data.avatar_url}
                  alt='头像'
                  className='h-36 w-36 rounded-full object-cover'
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
                <div className='text-[18px] font-black tracking-[0.28em] uppercase' style={{ color: mutedColor }}>
                  Up On Air
                </div>
                <div
                  className='mt-4 min-w-0 whitespace-nowrap font-black tracking-[-0.04em] leading-none text-foreground select-text'
                  style={{ fontSize: `${streamerFontSize}px`, color: deepColor }}
                >
                  <UsernameDisplay metadata={data.usernameMeta} />
                </div>
                <div
                  className='mt-5 inline-flex items-center gap-3 font-black'
                  style={{ color: deepColor }}
                >
                  <Icon icon="lucide:users" width={22} style={{ color: accentColor }} />
                  <span className='select-text' style={{ fontSize: `${followerFontSize}px` }}>
                    {data.fans} 粉丝
                  </span>
                </div>
              </div>
            </div>

            <div className='col-span-5 self-start pt-8 text-right'>
              <div
                className='inline-flex items-center gap-3 text-[20px] font-black tracking-[0.24em] uppercase'
                style={{ color: accentColor }}
              >
                <span className='h-3.5 w-3.5 rounded-full animate-pulse' style={{ backgroundColor: accentColor }} />
                <span>Live Now</span>
              </div>
              <div className='text-[86px] font-black tracking-[-0.06em] leading-[0.92]' style={{ color: deepColor }}>
                正在开播
              </div>
            </div>
          </div>

          <div
            className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 font-black tracking-tight'
            style={{ color: deepColor, fontSize: `${metaValueFontSize}px` }}
          >
            <div className='inline-flex min-w-0 items-center gap-3'>
              <Icon icon="lucide:radio" width={20} style={{ color: accentColor }} />
              <span className='min-w-0 whitespace-normal leading-[1.18] select-text' style={{ fontSize: `${liveInfoFontSize}px` }}>
                {data.liveinf}
              </span>
            </div>
            <span style={{ color: withAlphaFromCss(deepColor, 0.26) }}>/</span>
            <div className='inline-flex items-center gap-3 whitespace-nowrap font-mono'>
              <Icon icon="lucide:clock" width={20} style={{ color: primaryColor }} />
              <span className='select-text'>{liveSignalTime}</span>
            </div>
          </div>
        </div>

        {data.image_url && (
          <div className='relative mb-18 overflow-hidden rounded-[36px]'>
            <div className='overflow-hidden rounded-[36px]'>
              <EnhancedImage
                src={data.image_url}
                alt='直播封面'
                className='h-full w-full object-cover'
              />
            </div>

            <div
              className='absolute inset-0 rounded-[36px]'
              style={{
                backgroundImage: `linear-gradient(to top, ${coverShade}, rgba(0,0,0,0.10), transparent 46%)`
              }}
            />

            <div className='absolute left-8 top-8'>
              <div className='inline-flex items-center gap-3 text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)]'>
                <span className='h-3.5 w-3.5 rounded-full animate-pulse bg-white' />
                <span className='text-[20px] font-black tracking-[0.22em] uppercase'>Live Now</span>
              </div>
            </div>

            <div className='absolute bottom-8 left-8 right-8 flex items-end justify-between gap-8 text-white drop-shadow-[0_12px_28px_rgba(0,0,0,0.28)]'>
              <div className='min-w-0 max-w-[72%]'>
                <div
                  className='whitespace-normal font-black leading-[1.12] tracking-[-0.03em] select-text'
                  style={{ fontSize: `${coverInfoFontSize}px` }}
                >
                  {data.liveinf}
                </div>
              </div>
              <div
                className='shrink-0 whitespace-nowrap font-mono font-black tracking-[-0.02em] text-white select-text'
                style={{ fontSize: `${metaValueFontSize}px` }}
              >
                {liveSignalTime}
              </div>
            </div>
          </div>
        )}

        <div className='mb-12 font-black leading-normal tracking-[-0.045em] whitespace-pre-wrap text-foreground select-text'
          style={{
            color: deepColor,
            fontSize: `${liveTitleFontSize}px`,
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
          {data.text && renderRichTextToReact(data.text, {
            at: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            topic: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            lottery: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            webLink: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            vote: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
            viewPicture: { className: 'text-[#006A9E] dark:text-[#58B0D5]' }
          })}
        </div>

        <div className='mt-6 grid min-h-115 grid-cols-12 gap-10 items-end'>
          <div className='col-span-7 self-start pb-18'>
            <div
              className='font-black leading-[1.08] tracking-[-0.02em] select-text'
              style={{ fontSize: `${broadcastFontSize}px`, color: withAlphaFromCss(deepColor, 0.72) }}
            >
              <UsernameDisplay metadata={data.usernameMeta} />
              <span> 开播了</span>
            </div>

            <div
              className='mt-6 inline-flex items-center gap-4 text-[20px] font-black tracking-[0.24em] uppercase'
              style={{ color: mutedColor }}
            >
              <span className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: accentColor }} />
              <span>Bilibili Live</span>
            </div>

            <div
              className='mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[24px] font-semibold leading-[1.35]'
              style={{ color: withAlphaFromCss(deepColor, 0.76) }}
            >
              <span>{data.dynamicTYPE}</span>
              <span style={{ color: withAlphaFromCss(deepColor, 0.24) }}>/</span>
              <span className='font-mono'>{liveSignalTime}</span>
            </div>

            <img
              src={logo}
              alt='哔哩哔哩'
              className={`mt-18 h-auto ${isDark ? 'w-72' : 'w-108'}`}
            />

            <div
              className='mt-5 text-[22px] font-bold tracking-[0.08em] select-text'
              style={{ color: mutedColor }}
            >
              你感兴趣的直播都在哔哩哔哩
            </div>
          </div>

          <div className='col-span-5 flex flex-col items-end self-start pt-2 text-right'>
            <div className='text-[20px] font-black tracking-[0.22em] uppercase' style={{ color: mutedColor }}>
              Scan To Watch
            </div>
            <div className='mt-4 text-[54px] font-black tracking-[-0.04em] leading-[1.02]' style={{ color: deepColor }}>
              扫码观看
            </div>
            <div className='mt-3 text-[24px] font-semibold leading-[1.4]' style={{ color: mutedColor }}>
              长按识别二维码，直接进入直播间。
            </div>

            <div className='relative mt-8 flex flex-1 items-center justify-end'>
              <div
                className='absolute right-10 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-[84px]'
                style={{ backgroundColor: withAlphaFromCss(primaryColor, isDark ? 0.18 : 0.12) }}
              />
              <div
                className='absolute right-22 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full blur-[48px]'
                style={{ backgroundColor: withAlphaFromCss(accentColor, isDark ? 0.16 : 0.10) }}
              />
              {qrCodeDataUrl
                ? (
                  <img
                    src={qrCodeDataUrl}
                    alt='二维码'
                    className='relative h-100 w-100 object-contain drop-shadow-[0_20px_38px_rgba(0,0,0,0.18)]'
                  />
                )
                : (
                  <div className='relative flex h-100 w-100 items-center justify-center'>
                    <span className='text-[28px]' style={{ color: mutedColor }}>二维码</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

BilibiliLiveDynamic.displayName = 'BilibiliLiveDynamic'

export default BilibiliLiveDynamic
