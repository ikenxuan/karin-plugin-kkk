import { HeroUIProvider } from '@heroui/react'
import clsx from 'clsx'
import React from 'react'

import type { BaseComponentProps, RenderRequest } from '@/types'

/**
 * 默认布局组件属性接口
 */
interface DefaultLayoutProps extends Omit<BaseComponentProps<Record<string, any>>, 'version'> {
  /** 子组件 */
  children: React.ReactNode
  /** 额外的CSS类名 */
  className?: string
  /** 渲染数据 */
  data: Record<string, any>
  /** 版本信息 */
  version?: RenderRequest['version']
  /** 缩放比例，用于高清截图 */
  scale?: number
}

/**
 * 默认布局组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const DefaultLayout: React.FC<Omit<DefaultLayoutProps, 'templateType' | 'templateName'>> = ({
  children,
  version,
  data,
  scale = 3
}) => {
  const { useDarkTheme } = data

  return (
    <HeroUIProvider>
      <div
        className={clsx(
          'w-[1440px]',
          useDarkTheme && 'dark',
          'bg-default-100 dark:bg-black text-default-900'
        )}
        id='container'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '1440px'
        }}
      >
        {children}
        {version && (
          <div className='pt-32 pb-20 text-default-800'>
            <div className='flex relative justify-center items-center space-x-12'>
              <div className='flex items-center space-x-8 whitespace-nowrap'>
                <img src="/image/logo.png" className='w-auto h-24' />
                <h1 className='text-6xl font-black tracking-tight leading-none'>
                  {version.pluginName}
                </h1>
              </div>
    
              <div className='relative'>
                <div className={clsx(
                  'absolute -top-8 -left-10 px-5 py-2 text-sm font-bold tracking-widest uppercase rounded-full transform -rotate-12',
                  'border border-dashed border-default-900 text-default-900 bg-default-100',
                  'backdrop-blur-sm bg-default-100/10'
                )}>
                  {version.releaseType}
                </div>
                <div className='text-5xl font-bold tracking-wide'>
                  v{version.pluginVersion}
                </div>
              </div>
    
              <div className='w-1 h-12 bg-default-900' />
    
              <div className='flex relative items-center space-x-5'>
                <div className={clsx(
                  'absolute -top-8 -left-10 px-5 py-2 text-sm font-bold tracking-widest uppercase rounded-full transform -rotate-12',
                  'border border-dashed border-default-900 text-default-900',
                  'backdrop-blur-sm bg-default-100/10'
                )}>
                  Powered By
                </div>
                <img src="/image/frame-logo.png" className='w-auto h-16' />
                <span className='text-5xl font-black'>
                  {version.poweredBy} & Vite 
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </HeroUIProvider>
  )
}