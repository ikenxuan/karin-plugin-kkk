import { QrCode, Smartphone } from 'lucide-react'
import React from 'react'

import type { QrLoginProps } from '../../../types/platforms/ohter'
import { GlowImage } from '../../common/GlowImage'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * APP 扫码登录组件 - 竖屏 Banner 设计
 * @param props 组件属性
 * @returns JSX元素
 */
export const QrLogin: React.FC<Omit<QrLoginProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const qrCodeDataUrl = props.qrCodeDataUrl
  const isDark = props.data.useDarkTheme ?? false

  // 使用蓝紫色系弥散渐变
  const bgColor = isDark ? '#0f0f1a' : '#f8f6ff'
  const secondaryColor = isDark ? '#a78bfa' : '#8b5cf6'
  const mutedColor = isDark ? 'rgba(129,140,248,0.7)' : '#7c3aed'
  const accentColor = isDark ? '#c4b5fd' : '#4f46e5'

  return (
    <DefaultLayout
      {...props}
      version={undefined}
      className='relative overflow-hidden'
      style={{ backgroundColor: bgColor, width: '720px', height: '1280px' }}
    >
      {/* 弥散光背景 - 对角线布局 */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* 左上角主光斑 */}
        <div
          className='absolute rounded-full w-[800px] h-[900px] -top-[200px] -left-[200px] blur-[120px] -rotate-15'
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.18) 50%, transparent 100%)'
          }}
        />
        {/* 右侧中间光斑 */}
        <div
          className='absolute rounded-full w-[600px] h-[700px] top-[300px] -right-[150px] blur-[100px] rotate-20'
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.4) 0%, rgba(196,181,253,0.2) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.3) 0%, rgba(196,181,253,0.12) 50%, transparent 100%)'
          }}
        />
        {/* 底部光斑 */}
        <div
          className='absolute rounded-full w-[700px] h-[500px] -bottom-[100px] left-[100px] blur-[110px] -rotate-10'
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.35) 0%, rgba(99,102,241,0.18) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.25) 0%, rgba(99,102,241,0.12) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* 噪点纹理层 */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{ opacity: isDark ? 0.08 : 0.1 }}
      >
        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <filter id='qrNoise' x='0%' y='0%' width='100%' height='100%'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch' result='noise' />
            <feColorMatrix type='saturate' values='0' result='gray' />
            <feComponentTransfer>
              <feFuncR type='discrete' tableValues='0 1' />
              <feFuncG type='discrete' tableValues='0 1' />
              <feFuncB type='discrete' tableValues='0 1' />
            </feComponentTransfer>
          </filter>
          <rect width='100%' height='100%' filter='url(#qrNoise)' />
        </svg>
      </div>

      {/* 背景大字装饰 */}
      <div className='absolute top-[60px] right-[40px] pointer-events-none select-none opacity-[0.04]'>
        <span
          className='text-[140px] font-black tracking-tighter leading-none block text-right'
          style={{ color: isDark ? '#fff' : '#4f46e5' }}
        >
          SCAN
        </span>
        <span
          className='text-[140px] font-black tracking-tighter leading-none block text-right'
          style={{ color: isDark ? '#fff' : '#4f46e5' }}
        >
          LOGIN
        </span>
      </div>

      {/* 内容层 */}
      <div className='relative z-10 flex flex-col h-full p-12'>
        {/* 顶部标题区域 */}
        <div className='flex flex-col gap-4'>
          <p className='text-[20px] font-medium tracking-[0.3em] uppercase' style={{ color: mutedColor }}>
            karin-plugin-kkk
          </p>
          <div className='flex items-center gap-4'>
            <GlowImage glowStrength={0.8} blurRadius={15}>
              <Smartphone className='w-14 h-14' style={{ color: accentColor }} />
            </GlowImage>
            <h1 className='text-[72px] font-black leading-none' style={{ color: accentColor }}>
              扫码登录
            </h1>
          </div>
          <p className='text-[24px] font-medium' style={{ color: secondaryColor }}>
            使用手机 APP 扫描二维码快速连接
          </p>
        </div>

        {/* 右上角装饰 */}
        <div className='absolute top-12 right-12 flex flex-col items-end space-y-2'>
          <div className='flex space-x-2'>
            <div className='w-5 h-5 rounded-full' style={{ backgroundColor: accentColor, opacity: 0.2 }} />
            <div className='w-5 h-5 rounded-full' style={{ backgroundColor: accentColor, opacity: 0.4 }} />
            <div className='w-5 h-5 rounded-full' style={{ backgroundColor: accentColor, opacity: 0.7 }} />
            <div className='w-5 h-5 rounded-full' style={{ backgroundColor: accentColor }} />
          </div>
          <div className='flex space-x-2'>
            <div className='w-5 h-5 rounded' style={{ backgroundColor: secondaryColor, opacity: 0.15 }} />
            <div className='w-5 h-5 rounded' style={{ backgroundColor: secondaryColor, opacity: 0.35 }} />
            <div className='w-5 h-5 rounded' style={{ backgroundColor: secondaryColor, opacity: 0.55 }} />
          </div>
        </div>

        {/* 中间二维码区域 - 无背景直接展示 */}
        <div className='flex-1 flex flex-col justify-center items-center'>
          {qrCodeDataUrl ? (
            <div className='flex justify-center items-center w-[380px] h-[380px]'>
              <img
                src={qrCodeDataUrl}
                alt='登录二维码'
                className='object-contain w-full h-full'
              />
            </div>
          ) : (
            <div className='flex flex-col gap-4 justify-center items-center w-[380px] h-[380px]'>
              <QrCode className='w-20 h-20 text-default-300' />
              <span className='text-xl text-default-400'>二维码生成中...</span>
            </div>
          )}

          {/* 扫码提示 */}
          <div className='mt-8 flex items-center gap-3'>
            <div className='w-16 h-[2px] rounded-full' style={{ background: `linear-gradient(90deg, transparent, ${mutedColor})` }} />
            <span className='text-[20px] font-medium' style={{ color: mutedColor }}>
              打开 APP 扫一扫
            </span>
            <div className='w-16 h-[2px] rounded-full' style={{ background: `linear-gradient(90deg, ${mutedColor}, transparent)` }} />
          </div>
        </div>

        {/* 底部服务器信息 - 主次分明 */}
        <div className='flex flex-col gap-2 mb-6'>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke={mutedColor} strokeWidth='2'>
              <rect x='2' y='2' width='20' height='8' rx='2' />
              <rect x='2' y='14' width='20' height='8' rx='2' />
              <circle cx='6' cy='6' r='1' fill={mutedColor} />
              <circle cx='6' cy='18' r='1' fill={mutedColor} />
            </svg>
            <span className='text-[18px] font-medium' style={{ color: mutedColor }}>
              服务器地址
            </span>
          </div>
          <code className='text-[32px] font-mono font-bold' style={{ color: accentColor }}>
            {props.data.serverUrl}
          </code>
        </div>

        {/* 底部装饰 */}
        <div className='flex justify-between items-end'>
          {/* 左下角装饰 */}
          <div className='flex flex-col space-y-2'>
            <svg className='w-6 h-6 opacity-20' viewBox='0 0 24 24' fill='none' stroke={mutedColor} strokeWidth='1.5'>
              <rect x='3' y='3' width='18' height='18' rx='2' />
            </svg>
            <svg className='w-6 h-6 opacity-40' viewBox='0 0 24 24' fill='none' stroke={mutedColor} strokeWidth='1.5'>
              <rect x='3' y='3' width='18' height='18' rx='2' />
            </svg>
            <svg className='w-6 h-6' viewBox='0 0 24 24' fill={accentColor}>
              <rect x='3' y='3' width='18' height='18' rx='2' />
            </svg>
          </div>

          {/* 右下角 Logo */}
          <div className='flex items-end space-x-4'>
            <div className='flex flex-col items-end'>
              <span className='text-[14px] font-bold tracking-widest uppercase' style={{ color: mutedColor }}>
                KARIN-PLUGIN
              </span>
              <span className='text-[36px] font-black leading-none' style={{ color: accentColor }}>
                kkk
              </span>
            </div>
            <GlowImage glowStrength={1} blurRadius={15}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 230 221'
                className='h-14 w-auto'
                style={{ color: accentColor }}
              >
                <path
                  d='M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z'
                  fill='currentColor'
                />
                <path
                  d='M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z'
                  fill='currentColor'
                />
                <path
                  d='M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z'
                  fill='currentColor'
                />
              </svg>
            </GlowImage>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

QrLogin.displayName = 'QrLogin'

export default QrLogin
