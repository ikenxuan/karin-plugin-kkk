import React from 'react'

import type { BaseComponentProps } from '@/types'

import { GlowImage } from '../../common/GlowImage'
import { DefaultLayout } from '../../layouts/DefaultLayout'

export interface VersionWarningProps extends BaseComponentProps {
  /** 插件构建时的 karin 版本 */
  requireVersion: string
  /** 当前运行的 karin 版本 */
  currentVersion: string
}

export const VersionWarning: React.FC<VersionWarningProps> = (props) => {
  const isDark = props.data.useDarkTheme

  const bgColor = isDark ? '#1c1917' : '#faf5ef'
  const primaryColor = isDark ? '#fb923c' : '#c2410c'
  const secondaryColor = isDark ? '#fdba74' : '#9a3412'
  const mutedColor = isDark ? 'rgba(251,146,60,0.7)' : '#b45309'
  const accentColor = isDark ? '#fed7aa' : '#7c2d12'

  return (
    <DefaultLayout
      {...props}
      version={undefined}
      className="relative overflow-hidden"
      style={{ width: '800px', height: '1000px', backgroundColor: bgColor }}
    >
      {/* 弥散光背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{
          width: '700px', height: '800px', top: '-150px', left: '-100px',
          background: isDark 
            ? 'radial-gradient(ellipse at 40% 40%, rgba(194,65,12,0.4) 0%, rgba(154,52,18,0.2) 50%, transparent 100%)'
            : 'radial-gradient(ellipse at 40% 40%, rgba(234,88,12,0.35) 0%, rgba(251,146,60,0.18) 50%, transparent 100%)',
          filter: 'blur(60px)', transform: 'rotate(-20deg)'
        }} />
        <div className="absolute rounded-full" style={{
          width: '500px', height: '600px', top: '250px', right: '-50px',
          background: isDark
            ? 'radial-gradient(ellipse at 50% 50%, rgba(68,44,21,0.35) 0%, rgba(41,26,13,0.18) 50%, transparent 100%)'
            : 'radial-gradient(ellipse at 50% 50%, rgba(255,251,240,0.9) 0%, rgba(254,243,199,0.5) 50%, transparent 100%)',
          filter: 'blur(50px)', transform: 'rotate(15deg)'
        }} />
        <div className="absolute rounded-full" style={{
          width: '600px', height: '500px', bottom: '-100px', left: '100px',
          background: isDark
            ? 'radial-gradient(ellipse at 50% 60%, rgba(180,83,9,0.35) 0%, rgba(146,64,14,0.18) 50%, transparent 100%)'
            : 'radial-gradient(ellipse at 50% 60%, rgba(194,65,12,0.3) 0%, rgba(180,83,9,0.15) 50%, transparent 100%)',
          filter: 'blur(70px)', transform: 'rotate(-10deg)'
        }} />
      </div>

      {/* 单色高对比度噪点层 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        filter: 'contrast(800%) brightness(500%)', mixBlendMode: 'overlay', opacity: 1
      }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="monoNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#monoNoise)" />
        </svg>
      </div>

      {/* 背景大字 */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none" style={{ opacity: 0.04 }}>
        <span className="text-[160px] font-black tracking-tighter leading-none" style={{ color: isDark ? '#fff' : '#78350f' }}>VERSION</span>
        <span className="text-[160px] font-black tracking-tighter leading-none" style={{ color: isDark ? '#fff' : '#78350f' }}>WARNING</span>
      </div>

      {/* 内容层 */}
      <div className="relative z-10 flex flex-col justify-between h-full p-10">
        {/* 顶部 */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base font-medium tracking-[0.3em] uppercase" style={{ color: mutedColor }}>karin-plugin-kkk</p>
            <h1 className="text-8xl font-black leading-none mt-4" style={{ color: accentColor }}>版本</h1>
            <h1 className="text-8xl font-black leading-none" style={{ color: accentColor }}>不兼容</h1>
          </div>
          <div className="text-right mt-2">
            <p className="text-4xl font-bold font-mono" style={{ color: secondaryColor }}>v{props.data.requireVersion}</p>
            <p className="text-sm tracking-wider mt-1" style={{ color: mutedColor }}>REQUIRED</p>
          </div>
        </div>

        {/* 中间 */}
        <div className="flex-1 flex flex-col justify-center px-2">
          <div className="space-y-6 max-w-[520px]">
            <div>
              <p className="text-sm tracking-wider uppercase mb-1" style={{ color: mutedColor }}>What happened</p>
              <p className="text-xl leading-relaxed" style={{ color: secondaryColor }}>
                插件构建时依赖的 <span className="font-mono font-bold">node-karin</span> 版本为 <span className="font-mono font-bold">{props.data.requireVersion}</span>，高于当前运行版本，可能导致部分功能异常
              </p>
            </div>
            <div>
              <p className="text-sm tracking-wider uppercase mb-1" style={{ color: mutedColor }}>Current status</p>
              <p className="text-xl leading-relaxed" style={{ color: secondaryColor }}>
                当前运行版本 <span className="font-mono font-bold" style={{ color: primaryColor }}>v{props.data.currentVersion}</span> 过低
              </p>
            </div>
            <div>
              <p className="text-sm tracking-wider uppercase mb-1" style={{ color: mutedColor }}>How to fix</p>
              <p className="text-xl leading-relaxed" style={{ color: secondaryColor }}>建议升级框架以获得最佳体验</p>
              <div className="mt-3 px-5 py-3 rounded-lg inline-block" style={{ backgroundColor: accentColor }}>
                <code className="text-lg font-mono font-bold" style={{ color: bgColor }}>pnpm up node-karin</code>
              </div>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div className="flex justify-between items-end">
          {/* 左下角 */}
          <div className="flex flex-col space-y-1.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="1.5" style={{ opacity: 0.25 }}>
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="1.5" style={{ opacity: 0.4 }}>
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="1.5" style={{ opacity: 0.6 }}>
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill={accentColor}>
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
          </div>
          
          {/* 右下角 */}
          <div className="flex items-end space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: mutedColor }}>KARIN-PLUGIN</span>
              <span className="text-3xl font-black" style={{ color: accentColor }}>kkk</span>
            </div>
            <GlowImage glowStrength={1} blurRadius={20}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 221" className="w-auto h-14" style={{ color: accentColor }}>
                <path d="M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z" fill="currentColor" />
                <path d="M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z" fill="currentColor" />
                <path d="M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z" fill="currentColor" />
              </svg>
            </GlowImage>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
