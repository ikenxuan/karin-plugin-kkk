import { Chip } from '@heroui/react'
import React from 'react'

import type { VersionWarningProps } from '../../../types/platforms/other/VersionWarningProps'
import { GlowImage } from '../../common/GlowImage'
import { DefaultLayout } from '../../layouts/DefaultLayout'


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
      style={{ backgroundColor: bgColor, height: '2450px' }}
    >
      {/* 弥散光背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full w-315 h-360 -top-67.5 -left-45 blur-[108px] -rotate-20"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 40% 40%, rgba(194,65,12,0.4) 0%, rgba(154,52,18,0.2) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 40% 40%, rgba(234,88,12,0.5) 0%, rgba(251,146,60,0.25) 50%, transparent 100%)'
          }}
        />
        <div
          className="absolute rounded-full w-225 h-270 top-112.5 -right-22.5 blur-[90px] rotate-15"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(68,44,21,0.35) 0%, rgba(41,26,13,0.18) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.3) 0%, rgba(245,158,11,0.15) 50%, transparent 100%)'
          }}
        />
        <div
          className="absolute rounded-full w-270 h-225 -bottom-45 left-45 blur-[126px] -rotate-10"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 60%, rgba(180,83,9,0.35) 0%, rgba(146,64,14,0.18) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 60%, rgba(194,65,12,0.4) 0%, rgba(180,83,9,0.2) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* 单色噪点层 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: isDark ? 0.1 : 0.15 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="pixelNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" result="noise" />
            {/* 噪点 */}
            <feColorMatrix type="saturate" values="0" result="gray" />
            {/* 二值化 */}
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#pixelNoise)" />
        </svg>
      </div>

      {/* 背景大字 */}
      <div className="absolute bottom-25 right-18 pointer-events-none select-none opacity-[0.03]">
        <span
          className="text-[200px] font-black tracking-tighter leading-none block text-right"
          style={{ color: isDark ? '#fff' : '#78350f' }}
        >
          VERSION
        </span>
        <span
          className="text-[200px] font-black tracking-tighter leading-none block text-right"
          style={{ color: isDark ? '#fff' : '#78350f' }}
        >
          WARNING
        </span>
      </div>

      {/* 内容层 */}
      <div className="relative z-10 flex flex-col justify-between h-full p-18">
        {/* 顶部 */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-12">
            <p className="text-[28px] font-medium tracking-[0.3em] uppercase" style={{ color: mutedColor }}>
              karin-plugin-kkk
            </p>
            <h1 className="text-[180px] font-black leading-none" style={{ color: accentColor }}>
              请升级你的
            </h1>
            <h1 className="text-[120px] font-black leading-none" style={{ color: accentColor }}>
              <span className="font-mono">node-karin</span>
            </h1>
          </div>
          {/* 右上角装饰图形 */}
          <div className="flex flex-col items-end space-y-3 mt-4">
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.2 }} />
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.4 }} />
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.6 }} />
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: accentColor }} />
            </div>
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.15 }} />
              <div className="w-8 h-8 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.3 }} />
              <div className="w-8 h-8 rounded" style={{ backgroundColor: secondaryColor, opacity: 0.5 }} />
            </div>
            <div className="flex space-x-3">
              <div className="w-8 h-8 rotate-45" style={{ backgroundColor: mutedColor, opacity: 0.1 }} />
              <div className="w-8 h-8 rotate-45" style={{ backgroundColor: mutedColor, opacity: 0.25 }} />
            </div>
          </div>
        </div>

        {/* 中间 */}
        <div className="flex-1 flex flex-col justify-center">
          {/* 版本对比卡片 */}
          <div
            className="rounded-3xl p-12"
            style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' }}
          >
            {/* 版本对比 */}
            <div className="flex items-stretch mb-10">
              {/* 当前版本 */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span className="text-[28px] font-medium" style={{ color: mutedColor }}>
                    当前运行时版本
                  </span>
                </div>
                <div className="relative inline-block">
                  <span className="text-[56px] font-black font-mono leading-tight opacity-50 break-all" style={{ color: primaryColor }}>
                    v{props.data.currentVersion}
                  </span>
                  <div
                    className="absolute top-1/2 -left-2 -right-2 h-1.5 -rotate-3 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>
              </div>

              {/* 分隔线 */}
              <div className="w-0.5 rounded-full mx-10" style={{ backgroundColor: isDark ? 'rgba(251,146,60,0.2)' : 'rgba(180,83,9,0.15)' }} />

              {/* 需要版本 */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="text-[28px] font-medium" style={{ color: mutedColor }}>
                    需要/建议的版本
                  </span>
                  <Chip
                    className="text-lg font-bold"
                    style={{ backgroundColor: accentColor, color: bgColor }}
                    size="md"
                  >
                    推荐
                  </Chip>
                </div>
                <span className="text-[56px] font-black font-mono leading-tight break-all" style={{ color: accentColor }}>
                  v{props.data.requireVersion}
                </span>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-0.5 rounded-full mb-10" style={{ backgroundColor: isDark ? 'rgba(251,146,60,0.2)' : 'rgba(180,83,9,0.15)' }} />

            {/* 更新方案 */}
            <div className="space-y-20">
              {/* 方案一：Web UI */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: isDark ? 'rgba(251,146,60,0.15)' : 'rgba(194,65,12,0.1)' }}>
                    <span className="text-[28px] font-black" style={{ color: accentColor }}>1</span>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 3v18M3 9h18M3 15h18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[32px] font-bold" style={{ color: mutedColor }}>
                    Web 控制台更新
                  </span>
                  <Chip
                    className="text-[20px] font-semibold px-4"
                    style={{ backgroundColor: isDark ? 'rgba(251,146,60,0.2)' : 'rgba(194,65,12,0.15)', color: accentColor }}
                    size="lg"
                  >
                    推荐
                  </Chip>
                </div>
                <div className="ml-14 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: mutedColor }} />
                    <span className="text-[28px] leading-relaxed" style={{ color: secondaryColor }}>
                      访问 Karin Web 控制台首页，查看 Karin 版本信息
                    </span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: mutedColor }} />
                    <span className="text-[28px] leading-relaxed" style={{ color: secondaryColor }}>
                      当有新版本时会高亮提示，点击查看更新日志
                    </span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: mutedColor }} />
                    <span className="text-[28px] leading-relaxed" style={{ color: secondaryColor }}>
                      点击「更新」按钮，系统将自动完成更新并重启
                    </span>
                  </div>
                </div>
              </div>

              {/* 方案二：命令行 */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ backgroundColor: isDark ? 'rgba(251,146,60,0.15)' : 'rgba(194,65,12,0.1)' }}>
                    <span className="text-[28px] font-black" style={{ color: accentColor }}>2</span>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="2">
                    <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[32px] font-bold" style={{ color: mutedColor }}>
                    命令行更新
                  </span>
                </div>
                <div className="ml-14 space-y-4">
                  <p className="text-[28px]" style={{ color: secondaryColor }}>
                    在 Karin 根目录下执行以下命令
                  </p>
                  <div
                    className="rounded-xl p-6"
                    style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)' }}
                  >
                    <code className="text-[40px] font-mono font-bold block" style={{ color: accentColor }}>
                      pnpm add node-karin@{props.data.requireVersion} -w
                    </code>
                  </div>
                  <p className="text-[28px] opacity-80" style={{ color: secondaryColor }}>
                    更新完成后手动重启 Karin 即可
                  </p>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-0.5 rounded-full my-10" style={{ backgroundColor: isDark ? 'rgba(251,146,60,0.2)' : 'rgba(180,83,9,0.15)' }} />

            {/* 重要提示 */}
            <div
              className="rounded-2xl p-6 flex items-start space-x-5"
              style={{ backgroundColor: isDark ? 'rgba(251,146,60,0.08)' : 'rgba(194,65,12,0.08)' }}
            >
              <svg className="w-10 h-10 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill={accentColor}>
                <path d="M12 2L22 20H2L12 2Z" />
                <path d="M12 9v4M12 17h.01" stroke={bgColor} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="flex-1">
                <p className="text-[28px] font-semibold mb-2" style={{ color: accentColor }}>
                  版本兼容性提示
                </p>
                <p className="text-[26px] leading-relaxed" style={{ color: secondaryColor }}>
                  当前插件版本基于 <span className="font-bold font-mono" style={{ color: accentColor }}>node-karin v{props.data.requireVersion}</span> 开发，低版本运行时可能出现功能异常或兼容性问题，请及时更新以获得最佳体验
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div className="flex justify-between items-end">
          {/* 左下角 */}
          <div className="flex flex-col space-y-3">
            <svg className="w-9 h-9 opacity-25" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="1.5">
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
            <svg className="w-9 h-9 opacity-40" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="1.5">
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
            <svg className="w-9 h-9 opacity-60" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="1.5">
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill={accentColor}>
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
          </div>

          {/* 右下角 */}
          <div className="flex items-end space-x-7">
            <div className="flex flex-col items-end justify-end h-25">
              <span className="text-[22px] font-bold tracking-widest uppercase" style={{ color: mutedColor }}>
                KARIN-PLUGIN
              </span>
              <span className="text-[54px] font-black leading-none" style={{ color: accentColor }}>
                kkk
              </span>
            </div>
            <GlowImage glowStrength={1} blurRadius={20}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 230 221"
                className="h-22 w-auto"
                style={{ color: accentColor }}
              >
                <path
                  d="M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z"
                  fill="currentColor"
                />
                <path
                  d="M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z"
                  fill="currentColor"
                />
                <path
                  d="M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z"
                  fill="currentColor"
                />
              </svg>
            </GlowImage>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
