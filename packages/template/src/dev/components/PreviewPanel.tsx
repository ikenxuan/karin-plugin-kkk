import { addToast } from '@heroui/react'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { PlatformType } from '../../types/platforms'
import { captureScreenshot as captureScreenshotUtil } from '../utils/screenshot'
import { ComponentRenderer } from './ComponentRenderer'

/**
 * 预览面板组件属性接口
 */
interface PreviewPanelProps {
  /** 平台类型 */
  platform: PlatformType
  /** 模板ID */
  templateId: string
  /** 数据 */
  data: any
  /** 加载错误 */
  loadError: Error | null
  /** 二维码数据URL */
  qrCodeDataUrl: string
  /** 缩放比例 */
  scale: number
  /** 缩放变化回调 */
  onScaleChange: (scale: number) => void
  /** 组件加载完成回调 */
  onComponentLoadComplete?: () => void
  /** 面板是否为深色模式 */
  isPanelDarkMode?: boolean
}

/**
 * 预览面板组件暴露的方法接口
 */
export interface PreviewPanelRef {
  /** 截图方法 */
  captureScreenshot: () => Promise<{ blob: Blob; download: () => void; copyToClipboard: () => Promise<void> } | null>
  /** 适应画布方法 */
  fitToCanvas: () => void
}

/**
 * 预览面板组件
 */
export const PreviewPanel = forwardRef<PreviewPanelRef, PreviewPanelProps>(({
  platform,
  templateId,
  data,
  loadError,
  qrCodeDataUrl,
  scale,
  onScaleChange,
  onComponentLoadComplete,
  isPanelDarkMode = false
}, ref) => {
  // 截图相关
  const [isCapturing, setIsCapturing] = useState(false)
  const previewContentRef = useRef<HTMLDivElement>(null)
  const transformWrapperRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Ctrl 键状态
  const [isCtrlPressed, setIsCtrlPressed] = useState(false)
  
  // 缩放提示显示状态
  const [showScaleIndicator, setShowScaleIndicator] = useState(false)
  const scaleIndicatorTimeoutRef = useRef<number | null>(null)

  /**
   * ComponentRenderer 的 props
   */
  const componentRendererProps = useMemo(() => ({
    platform,
    templateId,
    data,
    qrCodeDataUrl,
    loadError,
    onLoadComplete: onComponentLoadComplete
  }), [platform, templateId, data, qrCodeDataUrl, loadError, onComponentLoadComplete])

  /**
   * 截图功能
   */
  const captureScreenshot = useCallback(async () => {
    if (!previewContentRef.current || isCapturing) return null

    setIsCapturing(true)

    try {
      // 获取当前的 transform 状态
      const transformState = transformWrapperRef.current?.instance?.transformState
      
      // 检测当前内容是否为深色模式
      const contentElement = previewContentRef.current
      const isDarkMode = contentElement.classList.contains('dark') || data?.useDarkTheme
      
      const result = await captureScreenshotUtil({
        element: previewContentRef.current,
        scale: transformState?.scale || scale,
        panOffset: {
          x: transformState?.positionX || 0,
          y: transformState?.positionY || 0
        },
        isDarkMode
      })
      return result
    } catch (error) {
      console.error('截图失败:', error)
      addToast({
        radius: 'lg',
        variant: 'flat',
        title: '截图失败',
        description: '请重试或检查浏览器控制台',
        color: 'danger',
        timeout: 3000
      })
      return null
    } finally {
      setIsCapturing(false)
    }
  }, [scale, isCapturing, data])

  /**
   * 适应画布大小 - 计算合适的缩放比例以完整显示组件
   */
  const handleFitToCanvas = useCallback(() => {
    if (!transformWrapperRef.current || !previewContentRef.current) return
    
    const transformInstance = transformWrapperRef.current
    const container = transformInstance.instance?.wrapperComponent
    const contentWrapper = previewContentRef.current
    
    if (!container || !contentWrapper) return
    
    // 查找实际的内容元素（ComponentRenderer 内部的 div）
    const actualContent = contentWrapper.querySelector('.shadow-2xl') as HTMLElement
    if (!actualContent) {
      // 如果找不到 .shadow-2xl 元素，使用 contentWrapper 本身
      console.warn('未找到 .shadow-2xl 元素，使用 contentWrapper')
      return
    }
    
    // 获取容器尺寸
    const containerRect = container.getBoundingClientRect()
    
    // 获取内容的实际尺寸
    const contentRect = actualContent.getBoundingClientRect()
    const contentWidth = Math.max(actualContent.scrollWidth, contentRect.width)
    const contentHeight = Math.max(actualContent.scrollHeight, contentRect.height)
    
    // 验证尺寸是否有效
    if (contentWidth <= 0 || contentHeight <= 0) {
      console.warn('内容尺寸无效:', { contentWidth, contentHeight })
      return
    }
    
    // 预留边距
    const padding = 40
    const availableWidth = containerRect.width - padding * 2
    const availableHeight = containerRect.height - padding * 2
    
    // 计算适应宽度和高度的缩放比例
    const scaleX = availableWidth / contentWidth
    const scaleY = availableHeight / contentHeight
    
    // 取较小的缩放比例，确保内容完整显示
    const fitScale = Math.min(scaleX, scaleY, 5) // 不超过最大缩放
    const finalScale = Math.max(0.01, fitScale) // 不低于最小缩放
    
    // 计算缩放后内容的尺寸
    const scaledWidth = contentWidth * finalScale
    const scaledHeight = contentHeight * finalScale
    
    // 计算居中位置
    const positionX = (containerRect.width - scaledWidth) / 2
    const positionY = (containerRect.height - scaledHeight) / 2
    
    // 使用 setTransform 直接设置位置和缩放
    transformInstance.setTransform(positionX, positionY, finalScale, 300, 'easeOut')
  }, [])

  /**
   * 监听双击事件，调用适应画布
   */
  useEffect(() => {
    const container = transformWrapperRef.current?.instance?.wrapperComponent
    if (!container) return

    const handleDoubleClick = (e: MouseEvent) => {
      e.preventDefault()
      handleFitToCanvas()
    }

    container.addEventListener('dblclick', handleDoubleClick)
    return () => {
      container.removeEventListener('dblclick', handleDoubleClick)
    }
  }, [handleFitToCanvas])

  /**
   * 监听 Ctrl/Alt 键，控制文本选择
   * 按住 Ctrl 或 Alt 时启用文本选择，但不干扰组合键
   */
  useEffect(() => {
    let isCtrlDown = false
    let isAltDown = false
    let hasOtherKeyPressed = false
    let timeoutId: number | null = null
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // 防止在输入框中触发
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      if (e.key === 'Control') {
        isCtrlDown = true
        hasOtherKeyPressed = false
        // 短延迟启用文本选择，给组合键一个机会
        timeoutId = window.setTimeout(() => {
          if ((isCtrlDown || isAltDown) && !hasOtherKeyPressed) {
            setIsCtrlPressed(true)
          }
        }, 10)
      } else if (e.key === 'Alt') {
        // 阻止 Alt 键的默认行为（Windows 菜单栏激活）
        e.preventDefault()
        isAltDown = true
        hasOtherKeyPressed = false
        // 短延迟启用文本选择，给组合键一个机会
        timeoutId = window.setTimeout(() => {
          if ((isCtrlDown || isAltDown) && !hasOtherKeyPressed) {
            setIsCtrlPressed(true)
          }
        }, 10)
      } else if ((isCtrlDown || isAltDown) && e.key !== 'Control' && e.key !== 'Alt') {
        // 如果按下了其他键盘按键（如 Ctrl+1 或 Alt+1），标记为组合键
        hasOtherKeyPressed = true
        setIsCtrlPressed(false)
        if (timeoutId !== null) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        isCtrlDown = false
        // 如果 Alt 也没按，取消文本选择
        if (!isAltDown) {
          hasOtherKeyPressed = false
          setIsCtrlPressed(false)
          if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
        }
      } else if (e.key === 'Alt') {
        // 阻止 Alt 键的默认行为
        e.preventDefault()
        isAltDown = false
        // 如果 Ctrl 也没按，取消文本选择
        if (!isCtrlDown) {
          hasOtherKeyPressed = false
          setIsCtrlPressed(false)
          if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
        }
      }
    }

    const handleBlur = () => {
      isCtrlDown = false
      isAltDown = false
      hasOtherKeyPressed = false
      setIsCtrlPressed(false)
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  /**
   * 在容器上监听滚轮事件，转发给 TransformWrapper
   */
  useEffect(() => {
    const container = containerRef.current
    if (!container || !transformWrapperRef.current) return

    const handleWheel = (e: WheelEvent) => {
      // 阻止默认滚动
      e.preventDefault()
      
      // 获取 transform 实例
      const instance = transformWrapperRef.current?.instance
      if (!instance) return

      // 计算缩放增量
      const delta = -e.deltaY * 0.001 // 缩放因子
      const scaleFactor = 1 + delta
      const newScale = Math.min(
        Math.max(instance.transformState.scale * scaleFactor, 0.01),
        5
      )

      // 获取鼠标相对于容器的位置
      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // 计算缩放中心点
      const { positionX, positionY, scale } = instance.transformState
      const scaleDiff = newScale - scale
      
      // 以鼠标位置为中心缩放
      const newPositionX = positionX - (mouseX - positionX) * (scaleDiff / scale)
      const newPositionY = positionY - (mouseY - positionY) * (scaleDiff / scale)

      // 应用变换
      instance.setTransformState(newScale, newPositionX, newPositionY)
      
      // 显示缩放提示
      setShowScaleIndicator(true)
      
      // 清除之前的定时器
      if (scaleIndicatorTimeoutRef.current !== null) {
        clearTimeout(scaleIndicatorTimeoutRef.current)
      }
      
      // 1秒后隐藏提示
      scaleIndicatorTimeoutRef.current = window.setTimeout(() => {
        setShowScaleIndicator(false)
      }, 1000)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (scaleIndicatorTimeoutRef.current !== null) {
        clearTimeout(scaleIndicatorTimeoutRef.current)
      }
    }
  }, [])

  /**
   * 根据 Ctrl 键状态动态控制拖拽
   */
  useEffect(() => {
    if (!transformWrapperRef.current?.instance) return

    const instance = transformWrapperRef.current.instance
    
    if (isCtrlPressed) {
      // 完全禁用所有交互
      instance.setup.disabled = true
    } else {
      // 恢复交互
      instance.setup.disabled = false
    }
  }, [isCtrlPressed])

  /**
   * 暴露给父组件的方法
   */
  useImperativeHandle(ref, () => ({
    captureScreenshot,
    fitToCanvas: handleFitToCanvas
  }), [captureScreenshot, handleFitToCanvas])

  return (
    <div className='flex flex-col h-full'>
      {/* 预览容器 */}
      <div
        ref={containerRef}
        className={`overflow-hidden relative w-full h-full ${isPanelDarkMode ? 'bg-default-900' : 'bg-default-100'}`}
      >
        {/* 网格背景 */}
        <div
          className='absolute inset-0 opacity-50 pointer-events-none'
          style={{
            backgroundImage: isPanelDarkMode
              ? `repeating-linear-gradient(0deg, hsl(var(--heroui-default-50) / 0.3) 0px, transparent 1px, transparent 20px),
                 repeating-linear-gradient(90deg, hsl(var(--heroui-default-50) / 0.3) 0px, transparent 1px, transparent 20px)`
              : `repeating-linear-gradient(0deg, hsl(var(--heroui-default-900) / 0.5) 0px, transparent 1px, transparent 20px),
                 repeating-linear-gradient(90deg, hsl(var(--heroui-default-900) / 0.5) 0px, transparent 1px, transparent 20px)`
          }}
        />

        {/* react-zoom-pan-pinch 包装器 */}
        <div style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative'
        }}>
          {/* 缩放比例显示 - 左上角 */}
          <div 
            className="absolute left-4 top-4 px-3 py-1.5 text-xs font-semibold rounded-lg pointer-events-none backdrop-blur-sm border z-50"
            style={{
              opacity: showScaleIndicator ? 1 : 0,
              transform: showScaleIndicator ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: isPanelDarkMode ? 'rgba(39, 39, 42, 0.9)' : 'rgba(244, 244, 245, 0.9)',
              borderColor: isPanelDarkMode ? 'rgba(63, 63, 70, 1)' : 'rgba(228, 228, 231, 1)',
              color: isPanelDarkMode ? 'rgba(250, 250, 250, 1)' : 'rgba(24, 24, 27, 1)'
            }}
          >
            {Math.round(scale * 100)}%
          </div>
          
          {/* Ctrl 模式下的选择覆盖层 */}
          {isCtrlPressed && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                pointerEvents: 'none',
                userSelect: 'text',
                WebkitUserSelect: 'text',
                cursor: 'text'
              }}
            />
          )}
          
          <TransformWrapper
            ref={transformWrapperRef}
            initialScale={1}
            minScale={0.01}
            maxScale={5}
            centerOnInit
            limitToBounds={false}
            disablePadding={true}
            disabled={isCtrlPressed}
            wheel={{
              step: 0.02,
              disabled: true // 禁用库自带的滚轮处理，使用我们自定义的
            }}
            panning={{
              velocityDisabled: false,
              disabled: false
            }}
            doubleClick={{
              disabled: true
            }}
            onTransformed={(ref) => {
              if (ref.state.scale !== scale) {
                onScaleChange(ref.state.scale)
              }
            }}
          >
            <TransformComponent
              wrapperClass="w-full! h-full!"
              contentClass="w-full! h-full! flex items-center justify-center"
              contentStyle={{
                transition: 'transform 0.3s ease-out', // 添加平滑过渡
                willChange: 'transform' // 优化性能
              }}
            >
              <div 
                ref={previewContentRef}
                className={`${data?.useDarkTheme ? 'dark' : ''}`}
                style={{
                  userSelect: isCtrlPressed ? 'text' : 'none',
                  WebkitUserSelect: isCtrlPressed ? 'text' : 'none',
                  cursor: isCtrlPressed ? 'text' : 'grab',
                  pointerEvents: 'auto'
                }}
              >
                <ComponentRenderer {...componentRendererProps} />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
    </div>
  )
})

PreviewPanel.displayName = 'PreviewPanel'
