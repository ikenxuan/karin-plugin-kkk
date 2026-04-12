import { Spinner } from '@heroui/react'
import { AlertTriangle, Info, Zap } from 'lucide-react'
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
  /** 是否启用版本信息 */
  versionEnabled?: boolean
}

type PreviewPayload = {
  __extraProps?: Record<string, unknown>
  [key: string]: unknown
}

const splitPreviewPayload = (payload: PreviewPayload | null | undefined) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      renderData: payload,
      extraProps: {}
    }
  }

  const { __extraProps, ...renderData } = payload

  return {
    renderData,
    extraProps: __extraProps && typeof __extraProps === 'object' && !Array.isArray(__extraProps)
      ? __extraProps
      : {}
  }
}

/**
 * 错误边界
 */
class ComponentErrorBoundary extends React.Component<{ children: React.ReactNode; onError?: (error: Error) => void }, { hasError: boolean; error: Error | null }> {
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
          <div className="w-full max-w-150 rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-surface-secondary backdrop-blur-xl">
            <Zap className="h-16 w-16 text-warning" strokeWidth={2.25} />
            <div className="text-2xl font-semibold text-warning">组件渲染错误</div>
            <div className="text-base text-center text-muted wrap-break-word">{this.state.error?.message || '未知错误'}</div>
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
const ComponentRendererInner: React.FC<ComponentRendererProps> = ({ platform, templateId, data, qrCodeDataUrl, loadError, onLoadComplete, versionEnabled = true }) => {
  const { renderData, extraProps } = React.useMemo(() => splitPreviewPayload(data), [data])
  const componentConfig = getComponentConfig(platform, templateId)

  // 所有顶层 Hooks 都必须在任何 early return 之前调用，避免主题切换或数据到达时触发 Hook 顺序变化。
  const LazyComponent = React.useMemo<React.ComponentType<any> | null>(() => {
    if (!componentConfig?.lazyComponent) return null
    return React.lazy(componentConfig.lazyComponent!)
  }, [componentConfig?.lazyComponent])

  /**
   * 渲染优雅的加载状态
   * @param message 加载消息
   * @returns JSX元素
   */
  const renderLoading = (message: string) => (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-150 rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-surface-secondary backdrop-blur-xl">
        <Spinner color="accent" size="lg" />
        <p className="text-2xl font-medium text-foreground">{message}</p>
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
      <div className="w-full max-w-150 rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-surface-secondary backdrop-blur-xl">
        <Info className="h-16 w-16 text-muted" strokeWidth={2.25} />
        <p className="text-2xl font-semibold text-foreground">
          {type} {name} 开发中
        </p>
        <p className="text-lg text-muted">敬请期待</p>
      </div>
    </div>
  )

  // 如果有加载错误，显示错误信息
  if (loadError) {
    const isDark = renderData?.useDarkTheme === true
    const bgColor = isDark ? '#0a0a0f' : '#fafafa'

    return (
      <div className="shadow-2xl rounded-[3rem] overflow-hidden">
        <div
          className="relative flex flex-col"
          style={{
            cursor: 'inherit',
            userSelect: 'inherit',
            WebkitUserSelect: 'inherit',
            width: '1440px',
            minHeight: '2000px',
            backgroundColor: bgColor,
            padding: '80px 60px'
          }}
        >
          {/* 弥散光背景 */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute rounded-full w-300 h-350 -top-75 -left-50 blur-[120px] -rotate-15"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at 40% 40%, rgba(245,158,11,0.35) 0%, rgba(251,191,36,0.18) 50%, transparent 100%)'
                  : 'radial-gradient(ellipse at 40% 40%, rgba(249,115,22,0.45) 0%, rgba(251,146,60,0.22) 50%, transparent 100%)'
              }}
            />
            <div
              className="absolute rounded-full w-225 h-250 top-150 -right-25 blur-[100px] rotate-20"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at 50% 50%, rgba(202,138,4,0.3) 0%, rgba(161,98,7,0.15) 50%, transparent 100%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(254,215,170,0.4) 0%, rgba(254,237,213,0.2) 50%, transparent 100%)'
              }}
            />
            <div
              className="absolute rounded-full w-250 h-200 -bottom-50 left-100 blur-[140px] -rotate-10"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at 50% 60%, rgba(217,119,6,0.3) 0%, rgba(180,83,9,0.15) 50%, transparent 100%)'
                  : 'radial-gradient(ellipse at 50% 60%, rgba(251,146,60,0.35) 0%, rgba(253,186,116,0.18) 50%, transparent 100%)'
              }}
            />
          </div>

          {/* 单色噪点层 */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: isDark ? 0.12 : 0.18 }}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <filter id="dataErrorNoise" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" result="noise" />
                <feColorMatrix type="saturate" values="0" result="gray" />
                <feComponentTransfer>
                  <feFuncR type="discrete" tableValues="0 1" />
                  <feFuncG type="discrete" tableValues="0 1" />
                  <feFuncB type="discrete" tableValues="0 1" />
                </feComponentTransfer>
              </filter>
              <rect width="100%" height="100%" filter="url(#dataErrorNoise)" />
            </svg>
          </div>

          {/* 内容区域 */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* 顶部标题 */}
            <div className="flex items-center gap-10 mb-20">
              <div className="flex items-center justify-center w-36 h-36 bg-white/10 backdrop-blur-sm rounded-[40px]">
                <AlertTriangle className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <div className="text-8xl font-black text-white mb-4 drop-shadow-lg">数据加载失败</div>
                <div className="text-4xl text-white/80 font-semibold drop-shadow">Data Loading Error</div>
              </div>
            </div>

            {/* 使用提示 */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Info className="w-7 h-7 text-white" strokeWidth={2.5} />
                <div className="text-2xl font-bold text-white uppercase tracking-wider">使用提示</div>
              </div>
              <div className="text-3xl font-medium text-white bg-black/20 backdrop-blur-sm rounded-[40px] px-12 py-10 leading-relaxed">
                此组件需要先进行一次作品解析或调用对应功能才能生成数据。请确保已正确配置数据源并完成初始化操作。
              </div>
            </div>

            {/* 错误信息 */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="w-7 h-7 text-white" strokeWidth={2.5} />
                <div className="text-2xl font-bold text-white uppercase tracking-wider">错误信息</div>
              </div>
              <div className="text-3xl font-semibold text-white bg-black/20 backdrop-blur-sm rounded-[40px] px-12 py-10" style={{ wordBreak: 'break-word' }}>
                {loadError.message}
              </div>
            </div>

            {/* 错误堆栈 */}
            {loadError.stack && (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
                  <div className="text-2xl font-bold text-white uppercase tracking-wider">堆栈跟踪</div>
                </div>
                <div
                  className="flex-1 text-xl font-mono text-white/90 bg-black/30 backdrop-blur-sm rounded-[40px] px-12 py-10 overflow-auto"
                  style={{
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap',
                    minHeight: '400px'
                  }}
                >
                  {loadError.stack}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 数据为空时显示加载状态
  if (!renderData || Object.keys(renderData).length === 0) {
    return renderLoading('正在加载预览...')
  }

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
    ...extraProps,
    data: renderData,
    qrCodeDataUrl,
    version: versionEnabled ? version : undefined,
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
          await new Promise((resolve) => {
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
            new Promise((resolve) => setTimeout(resolve, 3000)) // 3秒超时
          ])
        }

        // 4. 额外等待一帧，确保布局完成
        await new Promise((resolve) =>
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve)
          })
        )

        // 5. 最后延迟一点，确保所有动画和渲染完成
        await new Promise((resolve) => setTimeout(resolve, 100))

        // 触发加载完成回调
        onLoadComplete?.()
      }

      // 延迟执行，确保组件已经挂载到 DOM
      const timeoutId = setTimeout(() => {
        waitForResourcesLoaded().catch((err) => {
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
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen p-8">
            <div className="w-full max-w-150 rounded-3xl flex flex-col justify-center items-center gap-6 py-20 px-8 bg-surface-secondary backdrop-blur-xl">
              <Spinner color="accent" size="lg" />
              <p className="text-2xl font-medium text-foreground">加载 {componentConfig.name} 组件中</p>
            </div>
          </div>
        }
      >
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
