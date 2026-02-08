import React from 'react'
import {
  RiGroupLine,
  RiHashtag,
  RiHeart3Line,
  RiUserFollowLine
} from 'react-icons/ri'

import type { BilibiliUserListProps } from '../../../types/platforms/bilibili/userlist'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { EnhancedImage } from './shared'

/**
 * B站用户项组件 - 工业风卡片设计 (V5: 语义化主题色重构)
 */
const BilibiliUserItem: React.FC<BilibiliUserListProps['data']['renderOpt'][number]> = (props) => {
  return (
    <li className='relative group overflow-hidden rounded-4xl bg-content1/60 border border-default-200/50 backdrop-blur-xl shadow-xl'>
      {/* 渐进式模糊背景 - Progressive Blur Background */}
      <div className='absolute inset-0 pointer-events-none z-0 overflow-hidden'>
        <EnhancedImage
          src={props.avatar_img}
          alt=""
          className="w-full h-full object-cover opacity-20 blur-3xl scale-150 saturate-100 brightness-110"
          style={{
            maskImage: 'linear-gradient(135deg, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(135deg, black 0%, transparent 100%)'
          }}
        />
      </div>

      {/* SVG 噪点 (作为卡片内层叠加) */}
      <div className='absolute inset-0 pointer-events-none z-0 opacity-[0.08] mix-blend-overlay'>
        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <filter id='cardNoise' x='0%' y='0%' width='100%' height='100%'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' result='noise' />
            <feColorMatrix type='saturate' values='0' result='gray' />
            <feComponentTransfer>
              <feFuncR type='discrete' tableValues='0 1' />
              <feFuncG type='discrete' tableValues='0 1' />
              <feFuncB type='discrete' tableValues='0 1' />
            </feComponentTransfer>
          </filter>
          <rect width='100%' height='100%' filter='url(#cardNoise)' />
        </svg>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 p-8 flex items-center gap-8">
        {/* 左侧：头像与状态 */}
        <div className="relative shrink-0">
          {/* 头像容器 - 纯净玻璃态 */}
          <div className="w-28 h-28 rounded-full p-1 bg-default-100/20 backdrop-blur-md border border-default-200/30 shadow-lg">
            <EnhancedImage
              src={props.avatar_img}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          
          {/* 状态徽章 - 扁平化/微立体 */}
          <div 
            className={`absolute -bottom-1 -right-1 px-3 py-1 rounded-full border-2 border-background flex items-center gap-1.5 shadow-md ${
              props.switch 
                ? 'bg-success text-white' 
                : 'bg-danger-500 text-default-100'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${props.switch ? 'bg-white' : 'bg-default-300'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
              {props.switch ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* 右侧：信息主体 */}
        <div className="flex-1 min-w-0">
          {/* 名字 */}
          <div className="mb-5">
            <h3 className="text-3xl font-black tracking-tight text-foreground truncate drop-shadow-sm">
              {props.username}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-default-100 border border-default-200 text-xs font-mono font-bold text-default-500 flex items-center gap-1">
                <RiHashtag className="w-3 h-3 opacity-70" />
                {props.host_mid}
              </span>
            </div>
          </div>

          {/* 数据栏 */}
          <div className="flex items-center gap-3 w-full">
            {/* 粉丝 */}
            <div className="flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-content2/40 border border-default-200/40 backdrop-blur-sm">
              <RiGroupLine className="w-5 h-5 mb-1 text-default-500" />
              <span className="text-lg font-black font-mono bg-linear-to-b from-foreground to-default-500 bg-clip-text text-transparent leading-none">
                {props.fans}
              </span>
              <span className="text-[10px] font-bold uppercase opacity-40 mt-1 text-foreground">Fans</span>
            </div>

            {/* 获赞 */}
            <div className="flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-content2/40 border border-default-200/40 backdrop-blur-sm">
              <RiHeart3Line className="w-5 h-5 mb-1 text-default-500" />
              <span className="text-lg font-black font-mono bg-linear-to-b from-foreground to-default-500 bg-clip-text text-transparent leading-none">
                {props.total_favorited}
              </span>
              <span className="text-[10px] font-bold uppercase opacity-40 mt-1 text-foreground">Likes</span>
            </div>

            {/* 关注 */}
            <div className="flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-content2/40 border border-default-200/40 backdrop-blur-sm">
              <RiUserFollowLine className="w-5 h-5 mb-1 text-default-500" />
              <span className="text-lg font-black font-mono bg-linear-to-b from-foreground to-default-500 bg-clip-text text-transparent leading-none">
                {props.following_count}
              </span>
              <span className="text-[10px] font-bold uppercase opacity-40 mt-1 text-foreground">Follow</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

/**
 * B站用户列表组件
 */
const BilibiliUserList: React.FC<BilibiliUserListProps> = (props) => {
  const isDark = props.data.useDarkTheme !== false
  
  // 极简配色：主色(B站蓝) + 邻色(浅蓝/紫)
  const primaryColor = isDark ? '#23ade5' : '#00a1d6' 
  const secondaryColor = isDark ? '#4f46e5' : '#60a5fa' // Indigo/Blue

  return (
    <DefaultLayout
      {...props}
      className="relative overflow-hidden bg-background"
      style={{ 
        width: '1440px',
        minHeight: '100vh'
      }}
    >
      {/* 1. 弥散光背景层 - 极简单色系 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full w-350 h-350 -top-125 -left-100 blur-[150px] opacity-20 dark:opacity-10"
          style={{
            background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`
          }}
        />
        <div
          className="absolute rounded-full w-300 h-300 top-25 -right-100 blur-[140px] opacity-15 dark:opacity-10"
          style={{
            background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`
          }}
        />
      </div>

      {/* 2. 全局噪点纹理 */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="globalNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" result="gray" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoise)" />
        </svg>
      </div>

      {/* 3. 几何装饰 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-16 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-default-300 to-transparent" />
        <div className="absolute top-0 right-0 p-16 opacity-10">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
            <circle cx="200" cy="200" r="199.5" stroke="currentColor" />
            <circle cx="200" cy="200" r="149.5" stroke="currentColor" strokeDasharray="10 10" />
            <circle cx="200" cy="200" r="99.5" stroke="currentColor" />
            <path d="M200 0V400M0 200H400" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 px-24 py-20 flex flex-col min-h-screen">
        
        {/* 极简头部 */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* 移除渐变背景图标，改为纯净风格 */}
              <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center text-background shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-4.41-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" /></svg>
              </div>
              <span className="font-mono text-sm font-bold tracking-widest uppercase opacity-50 text-foreground">
                Subscriber List
              </span>
            </div>
            <h1 className="text-7xl font-black text-foreground tracking-tighter mb-2">
              {props.data.groupInfo.groupName}
            </h1>
            <p className="font-mono text-xl opacity-40 text-foreground flex items-center gap-2">
              <span>GROUP_ID</span>
              <span className="w-12 h-px bg-current opacity-50" />
              <span>{props.data.groupInfo.groupId}</span>
            </p>
          </div>

          <div className="text-right">
            {/* 字体黑白灰渐变 */}
            <div className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-foreground to-default-400 leading-none">
              {String(props.data.renderOpt.length).padStart(2, '0')}
            </div>
            <div className="text-sm font-bold tracking-[0.3em] uppercase opacity-40 mt-2 text-foreground">
              Total Users
            </div>
          </div>
        </div>

        {/* 用户列表网格 - 调整为两列大卡片 */}
        <ul className="grid grid-cols-2 gap-x-10 gap-y-10">
          {props.data.renderOpt.map((user, index) => (
            <BilibiliUserItem
              key={`${user.host_mid}-${index}`}
              {...user}
            />
          ))}
        </ul>
      </div>
    </DefaultLayout>
  )
}

export default BilibiliUserList
