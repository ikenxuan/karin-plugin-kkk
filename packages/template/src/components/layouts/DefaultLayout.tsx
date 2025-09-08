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
          'bg-default-5 text-default-70'
        )}
        id='container'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '1440px',
          minHeight: '100vh'
        }}
      >
        {children}
        {version && (
          <div className='font-bold text-[50px] text-center relative py-10'>
            <div>
              <span>
                {version.pluginName}
              </span>
              <span className='px-2.5 ml-1.5 text-[25px] rounded-[10px] align-super bg-default-10'>
                {version.pluginVersion} {version.releaseType}
              </span>
              {' Powered By '}
              <span>
                {version.poweredBy}
              </span>
            </div>
          </div>
        )}
      </div>
    </HeroUIProvider>
  )
}
