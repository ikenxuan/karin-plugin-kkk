import { Spinner } from '@heroui/react'
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
  /** 加载错误 */
  loadError?: Error | null
  /** 组件加载完成回调 */
  onLoadComplete?: () => void
}

/**
 * 错误边界
 */
class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('组件渲染错误:', error)
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center min-h-screen p-8">
          <div className="w-full max-w-[600px] rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-content2 backdrop-blur-xl">
            <div className="text-7xl text-warning">
              ⚡
            </div>
            <div className="text-2xl font-semibold text-warning">
              组件渲染错误
            </div>
            <div className="text-base text-center text-default-500 wrap-break-word">
              {this.state.error?.message || '未知错误'}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * 组件渲染器 - 根据平台和模板ID渲染对应组件
 * @param props 组件属性
 * @returns JSX元素
 */
const ComponentRendererInner: React.FC<ComponentRendererProps> = ({
  platform,
  templateId,
  data,
  qrCodeDataUrl,
  loadError,
  onLoadComplete
}) => {
  /**
   * 渲染优雅的加载状态
   * @param message 加载消息
   * @returns JSX元素
   */
  const renderLoading = (message: string) => (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-[600px] rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-content2 backdrop-blur-xl">
        <Spinner size="lg" color="primary" />
        <p className="text-2xl font-medium text-foreground">
          {message}
        </p>
      </div>
    </div>
  )

  /**
   * 渲染开发中状态
   * @param type 类型（平台或模板）
   * @param name 名称
   * @returns JSX元素
   */
  const renderInDevelopment = (type: string, name: string) => (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-[600px] rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-content2 backdrop-blur-xl">
        <div className="text-7xl text-default-400">
          🚧
        </div>
        <p className="text-2xl font-semibold text-foreground">
          {type} {name} 开发中
        </p>
        <p className="text-lg text-default-500">
          敬请期待
        </p>
      </div>
    </div>
  )

  // 如果有加载错误，显示错误信息
  if (loadError) {
    return (
      <div className="flex justify-center items-center min-h-screen p-8">
        <div className="w-full max-w-[600px] rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-content2 backdrop-blur-xl">
          <div className="text-7xl text-danger">
            ⚠️
          </div>
          <div className="text-2xl font-semibold text-danger">
            数据加载失败
          </div>
          <div className="text-base text-center text-default-500 wrap-break-word">
            {loadError.message}
          </div>
        </div>
      </div>
    )
  }

  // 数据为空时显示加载状态
  if (!data || Object.keys(data).length === 0) {
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

  /**
   * 资源加载检测包装组件
   * 在懒加载组件真正渲染后才开始检测资源加载
   */
  const ComponentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      /**
       * 等待所有资源加载完成
       * 模拟 Puppeteer 的 waitUntil: 'load' 行为
       */
      const waitForResourcesLoaded = async () => {

        // 1. 等待 document.readyState === 'complete'
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true })
          })
        }

        // 2. 等待当前组件内的所有图片加载完成
        const container = wrapperRef.current
        if (container) {
          const images = container.querySelectorAll('img')
          
          const imagePromises = Array.from(images).map((img) => {
            if (img.complete && img.naturalHeight !== 0) {
              return Promise.resolve()
            }
            return new Promise((resolve) => {
              img.onload = () => {
                resolve(null)
              }
              img.onerror = () => {
                resolve(null)
              }
              // 超时保护
              setTimeout(() => {
                resolve(null)
              }, 5000)
            })
          })

          await Promise.all(imagePromises)
        }

        // 3. 等待字体加载（如果支持）
        if (document.fonts && document.fonts.ready) {
          await Promise.race([
            document.fonts.ready,
            new Promise(resolve => setTimeout(resolve, 3000)) // 3秒超时
          ])
        }

        // 4. 额外等待一帧，确保布局完成
        await new Promise(resolve => requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        }))

        // 5. 最后延迟一点，确保所有动画和渲染完成
        await new Promise(resolve => setTimeout(resolve, 100))

        // 触发加载完成回调
        onLoadComplete?.()
      }

      // 延迟执行，确保组件已经挂载到 DOM
      const timeoutId = setTimeout(() => {
        waitForResourcesLoaded().catch(err => {
          console.warn('等待资源加载失败:', err)
          // 即使失败也触发回调
          onLoadComplete?.()
        })
      }, 100)

      return () => {
        clearTimeout(timeoutId)
      }
    }, [])

    return <div ref={wrapperRef}>{children}</div>
  }

  return (
    <ComponentErrorBoundary>
      <React.Suspense fallback={
        <div className="flex justify-center items-center min-h-screen p-8">
          <div className="w-full max-w-[600px] rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-content2 backdrop-blur-xl">
            <Spinner size="lg" color="primary" />
            <p className="text-2xl font-medium text-foreground">
              加载 {componentConfig.name} 组件中
            </p>
          </div>
        </div>
      }>
        <ComponentWrapper>
          <div className="shadow-2xl rounded-[3rem] overflow-hidden">
            <LazyComponent {...commonProps} />
          </div>
        </ComponentWrapper>
      </React.Suspense>
    </ComponentErrorBoundary>
  )
}

export const ComponentRenderer = React.memo(ComponentRendererInner)

ComponentRenderer.displayName = 'ComponentRenderer'