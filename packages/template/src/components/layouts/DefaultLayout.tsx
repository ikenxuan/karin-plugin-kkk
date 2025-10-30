import { HeroUIProvider } from '@heroui/react'
import clsx from 'clsx'
import { AlertTriangle, CheckCircle, Code, Info, Zap } from 'lucide-react'
import React from 'react'

import type { BaseComponentProps, RenderRequest } from '../../types'
import { GlowImage } from '../common/GlowImage'


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
  /** 自定义样式 */
  style?: React.CSSProperties
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
  scale = 3,
  className = '',
  style = {}
}) => {
  const { useDarkTheme } = data

  return (
    <HeroUIProvider>
      <div
        className={clsx(
          'w-[1440px]',
          'bg-default-50 text-default-900',
          'font-[HarmonyOSHans-Regular]',
          className,
          useDarkTheme
        )}
        id='container'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '1440px',
          ...style
        }}
      >
        {children}
        {version ? (
          <div className='pt-32 pb-20 text-default-800'>
            {/* 上行：插件信息和版本信息 */}
            <div className='flex relative justify-center items-center mb-12 space-x-8'>
              <div className='flex items-end space-x-8'>
                {/* logo */}
                <GlowImage
                  src="/image/logo.png"
                  alt="logo"
                  imgClassName="w-auto h-18"
                  glowStrength={1}
                  blurRadius={50}
                />
                <div className='flex flex-col items-start opacity-90'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900'>
                    {/* <Code strokeWidth={3} className="w-4 h-4" /> */}
                    <span>{version.plugin}</span>
                  </div>
                  <span className='text-5xl font-black'>{version.pluginName}</span>
                </div>
              </div>
              <div className='flex flex-col items-start opacity-90'>
                <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                  {version.releaseType === 'Stable' ? (
                    <CheckCircle strokeWidth={3} className="w-4 h-4 text-success/90" />
                  ) : version.releaseType === 'Preview' ? (
                    <AlertTriangle strokeWidth={3} className="w-4 h-4 text-warning" />
                  ) : (
                    <Info strokeWidth={3} className="w-4 h-4" />
                  )}
                  {version.releaseType === 'Stable' ? (
                    <span className='text-success/90'>{version.releaseType}</span>
                  ) : (
                    <span className='text-warning'>{version.releaseType}</span>
                  )}
                </div>
                <div className='text-5xl font-bold tracking-wide'>
                  {version.releaseType === 'Stable' ? (
                    <span className='text-success/90'>v{version.pluginVersion}</span>
                  ) : (
                    <span className='text-warning'>v{version.pluginVersion}</span>
                  )}
                </div>
              </div>
            </div>

            {/* 下行：驱动框架和Vite构建工具 */}
            <div className='flex relative justify-center items-center space-x-8'>
              <div className='flex items-end space-x-8'>
                <GlowImage
                  src="/image/frame-logo.png"
                  alt="logo"
                  imgClassName="w-auto h-18"
                  glowStrength={1}
                  blurRadius={40}
                />
                {/* <img src="/image/frame-logo.png" className='self-center w-auto h-18' /> */}
                <div className='flex flex-col items-start'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                    <Zap strokeWidth={3} className="w-4 h-4 opacity-90" />
                    <span className='opacity-90'>Is Driven By</span>
                  </div>
                  <div className='flex items-end space-x-2'>
                    <span className='text-5xl font-black leading-none opacity-90'>{version.poweredBy}</span>
                    <span className='pb-1 text-2xl font-bold leading-none opacity-90'>v{version.frameworkVersion}</span>
                  </div>
                </div>
              </div>

              <div className='w-1 h-14 opacity-90 bg-default-900' />

              <div className='flex items-end space-x-8'>
                <GlowImage
                  src="/image/vite.svg"
                  alt="logo"
                  imgClassName="w-auto h-18"
                  glowStrength={1}
                  blurRadius={20}
                />

                {/* <img src="/image/vite.svg" className='self-center w-auto h-16' /> */}
                <div className='flex flex-col items-start opacity-90'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                    <Code strokeWidth={3} className="w-4 h-4" />
                    <span>Built with</span>
                    <GlowImage
                      src="/image/rolldown.svg"
                      alt="logo"
                      imgClassName="w-5 h-5"
                      glowStrength={3}
                      blurRadius={10}
                    />
                    {/* <img src="/image/rolldown.svg" className='w-5 h-5' /> */}
                  </div>
                  <span className='text-5xl font-black'>Rolldown-Vite</span>
                </div>
              </div>
            </div>
          </div>
        ) : (<div className='h-24'></div>)
        }
      </div>
    </HeroUIProvider>
  )
}