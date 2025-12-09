import { HeroUIProvider } from '@heroui/react'
import clsx from 'clsx'
import { AlertTriangle, CheckCircle, CircleFadingArrowUp, Code, Info, Zap } from 'lucide-react'
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
            {/* 版本信息：插件、框架、构建工具 */}
            <div className='flex relative justify-center items-center space-x-8'>
              {/* 插件信息 */}
              <div className='flex items-end space-x-8'>
                <GlowImage glowStrength={1} blurRadius={20}>
                  <svg
                    id="114514"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 230 221"
                    className="w-auto h-18"
                  >
                    <path
                      id="_1"
                      d="M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z"
                      fill="currentColor"
                    />
                    <path
                      id="_2"
                      d="M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z"
                      fill="currentColor"
                    />
                    <path
                      d="M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z"
                      fill="currentColor"
                    />
                  </svg>
                </GlowImage>

                <div className='flex flex-col items-start opacity-90'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900'>
                    <span>{version.plugin}</span>
                  </div>
                  <span className='text-5xl font-black'>{version.pluginName}</span>
                </div>
              </div>

              <div className='flex flex-col items-start opacity-90'>
                <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                  {version.hasUpdate && <CircleFadingArrowUp strokeWidth={3} className="w-4 h-4 text-success" />}
                  {!version.hasUpdate && version.releaseType === 'Stable' && <CheckCircle strokeWidth={3} className="w-4 h-4" />}
                  {!version.hasUpdate && version.releaseType === 'Preview' && <AlertTriangle strokeWidth={3} className="w-4 h-4 text-warning" />}
                  {!version.hasUpdate && version.releaseType !== 'Stable' && version.releaseType !== 'Preview' && <Info strokeWidth={3} className="w-4 h-4" />}
                  <span className={clsx(
                    version.hasUpdate && 'text-success',
                    !version.hasUpdate && version.releaseType === 'Preview' && 'text-warning'
                  )}>
                    {version.hasUpdate ? '有可用更新' : version.releaseType}
                  </span>
                </div>
                <span className={clsx(
                  'text-5xl font-bold tracking-wide',
                  version.hasUpdate && 'text-success',
                  !version.hasUpdate && version.releaseType === 'Preview' && 'text-warning'
                )}>
                  v{version.pluginVersion}
                </span>
              </div>

              <div className='w-1 h-14 opacity-90 bg-default-900' />

              {/* 框架信息 */}
              <div className='flex items-end space-x-8'>
                <GlowImage
                  src="/image/frame-logo.png"
                  alt="logo"
                  imgClassName="w-auto h-18"
                  glowStrength={1}
                  blurRadius={40}
                />
                <div className='flex flex-col items-start'>
                  <div className='flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900'>
                    <Zap strokeWidth={3} className="w-4 h-4 opacity-90" />
                    <span className='opacity-90'>Power By</span>
                  </div>
                  <div className='flex items-end space-x-2'>
                    <span className='text-5xl font-black leading-none opacity-90'>{version.poweredBy}</span>
                    <span className='pb-1 text-2xl font-bold leading-none opacity-90'>v{version.frameworkVersion}</span>
                  </div>
                </div>
              </div>

              {/* 构建工具信息 */}
              {version.releaseType === 'Stable' && (
                <>
                  <div className='w-1 h-14 opacity-90 bg-default-900' />

                  <div className='flex items-end space-x-8'>
                    <GlowImage
                      src="/image/vite.svg"
                      alt="logo"
                      imgClassName="w-auto h-18"
                      glowStrength={1}
                      blurRadius={20}
                    />
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
                      </div>
                      <span className='text-5xl font-black'>Rolldown-Vite</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (<div className='h-24'></div>)
        }
      </div>
    </HeroUIProvider>
  )
}