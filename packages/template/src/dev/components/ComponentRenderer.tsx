import React from 'react'

import { getComponentConfig } from '../../config/config'
import { version } from '../../services/DataService'
import { PlatformType } from '../../types/platforms'

interface ComponentRendererProps {
  /** 当前平台 */
  platform: PlatformType
  /** 当前模板ID */
  templateId: string
  /** 当前数据 */
  data: any
  /** 二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 组件渲染器 - 根据平台和模板ID渲染对应组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  platform,
  templateId,
  data,
  qrCodeDataUrl
}) => {
  /**
   * 渲染加载中状态
   * @param message 加载消息
   * @returns JSX元素
   */
  const renderLoading = (message: string) => (
    <div className='flex justify-center items-center h-full text-default-50'>
      {message}
    </div>
  )

  /**
   * 渲染开发中状态
   * @param type 类型（平台或模板）
   * @param name 名称
   * @returns JSX元素
   */
  const renderInDevelopment = (type: string, name: string) => (
    <div className='flex justify-center items-center h-full text-6xl text-default-50'>
      {type} {name} 开发中...
    </div>
  )

  // 数据为空时显示加载状态
  if (!data) {
    return renderLoading('正在加载预览...')
  }

  // 获取组件配置（在 Hooks 之前，供 useMemo 使用）
  const componentConfig = getComponentConfig(platform, templateId)

  // 保证 Hooks 顺序稳定：无条件 useMemo；缺失时返回 null，由渲染层处理
  const LazyComponent = React.useMemo<React.ComponentType<any> | null>(() => {
    if (!componentConfig?.lazyComponent) return null
    return React.lazy(componentConfig.lazyComponent!)
  }, [componentConfig?.lazyComponent])

  if (!componentConfig) {
    return renderInDevelopment('模板', templateId)
  }

  if (!componentConfig.enabled) {
    return renderInDevelopment('模板', componentConfig.name)
  }

  if (!LazyComponent) {
    return renderInDevelopment('组件', componentConfig.name)
  }

  // 准备组件属性
  const commonProps = {
    data,
    qrCodeDataUrl,
    version,
    scale: 1
  }

  return (
    <React.Suspense fallback={
      <div className='flex justify-center items-center h-full text-6xl text-default-50'>
        加载{componentConfig.name}组件中...
      </div>
    }>
      <LazyComponent {...commonProps} />
    </React.Suspense>
  )
}