import { QrCode, Smartphone } from 'lucide-react'
import React from 'react'

import type { QrLoginProps } from '../../../types/platforms/other'
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
      {/* 四周警告边框 - 紫色系配合主题 */}
      <div className='absolute inset-0 z-50 pointer-events-none'>
        {/* 顶部警告条 */}
        <div
          className='absolute top-0 left-0 right-0 h-14 flex items-center overflow-hidden'
          style={{
            background: isDark
              ? 'linear-gradient(90deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
              : 'linear-gradient(90deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
          }}
        >
          {/* 左侧大三角装饰 */}
          <div
            className='absolute left-0 top-0 w-32 h-full'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)'
            }}
          />
          <div
            className='absolute left-24 top-0 w-8 h-full'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)'
            }}
          />
          {/* 中间内容 */}
          <div className='flex-1 flex items-center justify-center gap-6 relative z-10'>
            <span className='text-white/50 text-3xl'>◆</span>
            <span className='text-white text-[20px] font-black tracking-[0.2em] drop-shadow-lg'>⚠ 请勿截图转发 ⚠</span>
            <span className='text-white/50 text-3xl'>◆</span>
            <span className='text-purple-100 text-[18px] font-bold tracking-wider'>图片含敏感信息</span>
            <span className='text-white/50 text-3xl'>◆</span>
          </div>
          {/* 右侧大三角装饰 */}
          <div
            className='absolute right-24 top-0 w-8 h-full'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
            }}
          />
          <div
            className='absolute right-0 top-0 w-32 h-full'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'
            }}
          />
        </div>

        {/* 底部警告条 */}
        <div
          className='absolute bottom-0 left-0 right-0 h-14 flex items-center overflow-hidden'
          style={{
            background: isDark
              ? 'linear-gradient(90deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
              : 'linear-gradient(90deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
          }}
        >
          <div
            className='absolute left-0 top-0 w-32 h-full'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)'
            }}
          />
          <div
            className='absolute left-24 top-0 w-8 h-full'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(0 0, 60% 0, 100% 100%, 0 100%)'
            }}
          />
          <div className='flex-1 flex items-center justify-center gap-6 relative z-10'>
            <span className='text-white/50 text-3xl'>◆</span>
            <span className='text-purple-100 text-[18px] font-bold tracking-wider'>泄露将导致服务器风险</span>
            <span className='text-white/50 text-3xl'>◆</span>
            <span className='text-white text-[20px] font-black tracking-[0.2em] drop-shadow-lg'>CONFIDENTIAL</span>
            <span className='text-white/50 text-3xl'>◆</span>
          </div>
          <div
            className='absolute right-24 top-0 w-8 h-full'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 40% 100%)'
            }}
          />
          <div
            className='absolute right-0 top-0 w-32 h-full'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)'
            }}
          />
        </div>

        {/* 左侧警告条 */}
        <div
          className='absolute top-14 bottom-14 left-0 w-14 flex flex-col items-center overflow-hidden'
          style={{
            background: isDark
              ? 'linear-gradient(180deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
              : 'linear-gradient(180deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
          }}
        >
          {/* 顶部三角 */}
          <div
            className='absolute top-0 left-0 w-full h-24'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)'
            }}
          />
          <div
            className='absolute top-20 left-0 w-full h-6'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 100%)'
            }}
          />
          {/* 中间文字 */}
          <div className='flex-1 flex items-center justify-center relative z-10'>
            <span
              className='text-white text-[20px] font-black tracking-[0.5em] drop-shadow-lg'
              style={{ writingMode: 'vertical-rl' }}
            >
              ⚠请勿外传⚠
            </span>
          </div>
          {/* 底部三角 */}
          <div
            className='absolute bottom-20 left-0 w-full h-6'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)'
            }}
          />
          <div
            className='absolute bottom-0 left-0 w-full h-24'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)'
            }}
          />
        </div>

        {/* 右侧警告条 */}
        <div
          className='absolute top-14 bottom-14 right-0 w-14 flex flex-col items-center overflow-hidden'
          style={{
            background: isDark
              ? 'linear-gradient(180deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
              : 'linear-gradient(180deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)'
          }}
        >
          <div
            className='absolute top-0 left-0 w-full h-24'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 60%)'
            }}
          />
          <div
            className='absolute top-20 left-0 w-full h-6'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 40%)'
            }}
          />
          <div className='flex-1 flex items-center justify-center relative z-10'>
            <span
              className='text-white text-[20px] font-black tracking-[0.5em] drop-shadow-lg'
              style={{ writingMode: 'vertical-rl' }}
            >
              ⚠请勿外传⚠
            </span>
          </div>
          <div
            className='absolute bottom-20 left-0 w-full h-6'
            style={{
              background: 'rgba(255,255,255,0.3)',
              clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0 100%)'
            }}
          />
          <div
            className='absolute bottom-0 left-0 w-full h-24'
            style={{
              background: isDark ? '#a78bfa' : '#a78bfa',
              clipPath: 'polygon(0 0, 100% 40%, 100% 100%, 0 100%)'
            }}
          />
        </div>
      </div>

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
      <div className='absolute top-20 right-[70px] pointer-events-none select-none opacity-[0.04]'>
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
      <div className='relative z-10 flex flex-col h-full pt-20 pb-20 px-20'>
        {/* 顶部标题区域 */}
        <div className='flex flex-col gap-3'>
          <p className='text-[18px] font-medium tracking-[0.3em] uppercase' style={{ color: mutedColor }}>
            karin-plugin-kkk
          </p>
          <div className='flex items-center gap-3'>
            <GlowImage glowStrength={0.8} blurRadius={15}>
              <Smartphone className='w-12 h-12' style={{ color: accentColor }} />
            </GlowImage>
            <h1 className='text-[60px] font-black leading-none' style={{ color: accentColor }}>
              扫码登录
            </h1>
          </div>
          <p className='text-[20px] font-medium' style={{ color: secondaryColor }}>
            使用手机 APP 扫描二维码快速连接
          </p>
        </div>

        {/* 右上角装饰 - 相对于内容层定位 */}
        <div className='absolute top-20 right-20 flex flex-col items-end space-y-2'>
          <div className='flex space-x-2'>
            <div className='w-4 h-4 rounded-full' style={{ backgroundColor: accentColor, opacity: 0.2 }} />
            <div className='w-4 h-4 rounded-full' style={{ backgroundColor: accentColor, opacity: 0.4 }} />
            <div className='w-4 h-4 rounded-full' style={{ backgroundColor: accentColor, opacity: 0.7 }} />
            <div className='w-4 h-4 rounded-full' style={{ backgroundColor: accentColor }} />
          </div>
          <div className='flex space-x-2'>
            <div className='w-4 h-4 rounded' style={{ backgroundColor: secondaryColor, opacity: 0.15 }} />
            <div className='w-4 h-4 rounded' style={{ backgroundColor: secondaryColor, opacity: 0.35 }} />
            <div className='w-4 h-4 rounded' style={{ backgroundColor: secondaryColor, opacity: 0.55 }} />
          </div>
        </div>

        {/* 中间二维码区域 */}
        <div className='flex-1 flex flex-col justify-center items-center'>
          {qrCodeDataUrl ? (
            <div className='flex justify-center items-center w-[320px] h-80'>
              <img
                src={qrCodeDataUrl}
                alt='登录二维码'
                className='object-contain w-full h-full'
              />
            </div>
          ) : (
            <div className='flex flex-col gap-4 justify-center items-center w-[320px] h-80'>
              <QrCode className='w-16 h-16 text-default-300' />
              <span className='text-lg text-default-400'>二维码生成中...</span>
            </div>
          )}

          {/* 扫码提示 */}
          <div className='mt-6 flex items-center gap-3'>
            <div className='w-12 h-0.5 rounded-full' style={{ background: `linear-gradient(90deg, transparent, ${mutedColor})` }} />
            <span className='text-[18px] font-medium' style={{ color: mutedColor }}>
              打开 APP 扫一扫
            </span>
            <div className='w-12 h-0.5 rounded-full' style={{ background: `linear-gradient(90deg, ${mutedColor}, transparent)` }} />
          </div>
        </div>

        {/* 底部服务器信息 */}
        <div className='flex flex-col gap-2 mb-4'>
          <div className='flex items-center gap-2'>
            <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke={mutedColor} strokeWidth='2'>
              <rect x='2' y='2' width='20' height='8' rx='2' />
              <rect x='2' y='14' width='20' height='8' rx='2' />
              <circle cx='6' cy='6' r='1' fill={mutedColor} />
              <circle cx='6' cy='18' r='1' fill={mutedColor} />
            </svg>
            <span className='text-[16px] font-medium' style={{ color: mutedColor }}>
              服务器地址
            </span>
          </div>
          <code className='text-[26px] font-mono font-bold' style={{ color: accentColor }}>
            {props.data.serverUrl}
          </code>
        </div>

        {/* 底部装饰 */}
        <div className='flex justify-between items-end'>
          {/* 左下角装饰 */}
          <div className='flex flex-col space-y-1'>
            <svg className='w-5 h-5 opacity-20' viewBox='0 0 24 24' fill='none' stroke={mutedColor} strokeWidth='1.5'>
              <rect x='3' y='3' width='18' height='18' rx='2' />
            </svg>
            <svg className='w-5 h-5 opacity-40' viewBox='0 0 24 24' fill='none' stroke={mutedColor} strokeWidth='1.5'>
              <rect x='3' y='3' width='18' height='18' rx='2' />
            </svg>
            <svg className='w-5 h-5' viewBox='0 0 24 24' fill={accentColor}>
              <rect x='3' y='3' width='18' height='18' rx='2' />
            </svg>
          </div>

          {/* 右下角 Logo */}
          <div className='flex items-end space-x-3'>
            <div className='flex flex-col items-end'>
              <span className='text-[12px] font-bold tracking-widest uppercase' style={{ color: mutedColor }}>
                KARIN-PLUGIN
              </span>
              <span className='text-[28px] font-black leading-none' style={{ color: accentColor }}>
                kkk
              </span>
            </div>
            <GlowImage glowStrength={1} blurRadius={15}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 230 221'
                className='h-10 w-auto'
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
