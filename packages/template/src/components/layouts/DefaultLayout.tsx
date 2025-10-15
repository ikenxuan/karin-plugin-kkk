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
  className = ''
}) => {
  const { useDarkTheme } = data

  return (
    <HeroUIProvider>
      <div
        className={clsx(
          'w-[1440px]',
          'bg-default-50 text-default-900',
          className,
          useDarkTheme
        )}
        id='container'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '1440px'
        }}
      >
        {children}
        {version ? (
          <div className='pt-32 pb-20 text-default-800'>
            <div className='flex relative justify-center items-center space-x-8'>
              <div className='flex items-end space-x-8'>
                {/* logo */}
                <GlowImage
                  src="/image/logo.png"
                  alt="logo"
                  imgClassName="w-auto h-18"
                  glowStrength={1}
                  blurRadius={50}
                />
                <div className='flex flex-col items-start'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900'>
                    {/* <Code strokeWidth={3} className="w-4 h-4" /> */}
                    <span className='opacity-50 text-warning'>karin-plugin</span>
                  </div>
                  <span className='text-5xl font-black text-warning'>{version.pluginName}</span>
                </div>
              </div>

              <div className='flex flex-col items-start opacity-80'>
                <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                  {version.releaseType === 'Stable' ? (
                    <CheckCircle strokeWidth={3} className="w-4 h-4" />
                  ) : version.releaseType === 'Preview' ? (
                    <AlertTriangle strokeWidth={3} className="w-4 h-4" />
                  ) : (
                    <Info strokeWidth={3} className="w-4 h-4" />
                  )}
                  <span>{version.releaseType}</span>
                </div>
                <div className='text-5xl font-bold tracking-wide'>
                  v{version.pluginVersion}
                </div>
              </div>

              <div className='w-1 h-14 opacity-80 bg-default-900' />

              <div className='flex items-end space-x-8'>
                <img src="/image/frame-logo.png" className='self-center w-auto h-18' />
                <div className='flex flex-col items-start'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                    <Zap strokeWidth={3} className="w-4 h-4 opacity-50 text-warning" />
                    <span className='opacity-50 text-warning'>Powered By</span>
                  </div>
                  <span className='text-5xl font-black text-warning'>{version.poweredBy}</span>
                </div>
              </div>
              
              <div className='w-1 h-14 opacity-80 bg-default-900' />
              
              <div className='flex items-end space-x-8'>
                <img src="/image/vite.svg" className='self-center w-auto h-16' />
                <div className='flex flex-col items-start opacity-80'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                    <Code strokeWidth={3} className="w-4 h-4" />
                    <span>Built with</span>
                  </div>
                  <span className='text-5xl font-black'>Vite</span>
                </div>
              </div>
            </div>
          </div>
        ) : ( <div className='h-24'></div> )
        }
      </div>
    </HeroUIProvider>
  )
}