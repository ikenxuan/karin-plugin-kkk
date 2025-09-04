import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardBody, CardHeader, Button, Slider, Kbd } from '@heroui/react'
import { Eye, Download, Maximize2, Minimize2 } from 'lucide-react'
import { PlatformType } from '../../types/platforms'
import { ComponentRenderer } from './ComponentRenderer'

interface PreviewPanelProps {
  /** 平台类型 */
  platform: PlatformType
  /** 模板ID */
  templateId: string
  /** 数据 */
  data: any
  /** 二维码数据URL */
  qrCodeDataUrl: string
  /** 缩放比例 */
  scale: number
  /** 缩放变化回调 */
  onScaleChange: (scale: number) => void
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 节流时间间隔（毫秒）
 * @returns 节流后的函数
 */
const throttle = <T extends (...args: any[]) => any> (
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * 预览面板组件
 */
export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  platform,
  templateId,
  data,
  qrCodeDataUrl,
  scale,
  onScaleChange
}) => {
  /** 键盘按键状态 */
  const [isSpacePressed, setIsSpacePressed] = useState(false)
  const [isAltPressed, setIsAltPressed] = useState(false)

  /** 拖拽状态 */
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragEasing, setDragEasing] = useState(false)

  /** 预览容器引用 */
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const previewContentRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  const [needsScrollbar, setNeedsScrollbar] = useState(false)
  /**
   * 重置所有按键状态
   */
  const resetKeyStates = useCallback(() => {
    setIsSpacePressed(false)
    setIsAltPressed(false)
  }, [])

  /**
   * 键盘事件处理
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // 防止在输入框中触发
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    if (e.code === 'Space') {
      e.preventDefault()
      setIsSpacePressed(true)
    }
    if (e.code === 'AltLeft') {
      e.preventDefault()
      setIsAltPressed(true)
    }
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setIsSpacePressed(false)
    }
    if (e.code === 'AltLeft') {
      setIsAltPressed(false)
    }
  }, [])

  /**
   * 窗口焦点事件处理
   */
  const handleWindowBlur = useCallback(() => {
    resetKeyStates()
    setIsDragging(false)
  }, [resetKeyStates])

  const handleWindowFocus = useCallback(() => {
    resetKeyStates()
  }, [resetKeyStates])

  /**
   * 以鼠标位置为中心的缩放功能
   */
  const zoomAtPoint = useCallback((newScale: number, mouseX: number, mouseY: number) => {
    const container = previewContainerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const mouseRelativeX = mouseX - containerRect.left
    const mouseRelativeY = mouseY - containerRect.top
    const containerCenterX = containerRect.width / 2
    const containerCenterY = containerRect.height / 2
    const currentContentCenterX = containerCenterX + panOffset.x
    const currentContentCenterY = containerCenterY + panOffset.y
    const mouseOffsetFromContentX = (mouseRelativeX - currentContentCenterX) / scale
    const mouseOffsetFromContentY = (mouseRelativeY - currentContentCenterY) / scale
    const newOffsetX = mouseRelativeX - containerCenterX - mouseOffsetFromContentX * newScale
    const newOffsetY = mouseRelativeY - containerCenterY - mouseOffsetFromContentY * newScale

    setPanOffset({ x: newOffsetX, y: newOffsetY })
    onScaleChange(newScale)
  }, [scale, panOffset, onScaleChange])

  /**
   * 节流的鼠标滚轮缩放事件处理（左Alt + 滚轮）
   */
  const handleWheel = useCallback(
    throttle((e: WheelEvent) => {
      if (isAltPressed) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.05 : 0.05
        const newScale = Math.max(0.2, Math.min(1, scale + delta))
        zoomAtPoint(newScale, e.clientX, e.clientY)
      }
    }, 16),
    [isAltPressed, scale, zoomAtPoint]
  )

  /**
   * 滑块缩放变化处理
   */
  const handleSliderChange = useCallback((value: number | number[]) => {
    const newScale = Array.isArray(value) ? value[0] : value
    const container = previewContainerRef.current
    if (container) {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      zoomAtPoint(newScale, centerX, centerY)
    }
  }, [zoomAtPoint])

  /**
   * 快速缩放按钮处理
   */
  const handleQuickZoom = useCallback(() => {
    const targetScale = scale < 0.6 ? 1 : 0.3
    const container = previewContainerRef.current
    if (container) {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      zoomAtPoint(targetScale, centerX, centerY)
    }
  }, [scale, zoomAtPoint])

  /**
   * 鼠标按下事件处理
   */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isSpacePressed && e.button === 0) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
      setDragEasing(false)

      // 禁用过渡动画
      if (previewContentRef.current) {
        previewContentRef.current.style.transition = 'none'
      }
    }
  }, [isSpacePressed, panOffset])

  /**
   * 鼠标移动事件处理
   */
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (isDragging && isSpacePressed) {
        const newOffset = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        }
        setPanOffset(newOffset)
      }
    }, 16),
    [isDragging, isSpacePressed, dragStart]
  )

  /**
   * 鼠标松开事件处理
   */
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      setDragEasing(true)

      if (previewContentRef.current) {
        previewContentRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }

      // 300ms后移除缓动状态
      setTimeout(() => {
        setDragEasing(false)
        if (previewContentRef.current) {
          previewContentRef.current.style.transition = 'transform 0.1s ease-out'
        }
      }, 300)
    }
  }, [isDragging])

  /**
   * 添加和移除事件监听器
   */
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleWindowBlur)
    window.addEventListener('focus', handleWindowFocus)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    const container = previewContainerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleWindowBlur)
      window.removeEventListener('focus', handleWindowFocus)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)

      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleKeyDown, handleKeyUp, handleWindowBlur, handleWindowFocus, handleMouseMove, handleMouseUp, handleWheel])

  const checkScrollbarNeeded = useCallback(() => {
    if (!previewContainerRef.current || !previewContentRef.current) return

    const container = previewContainerRef.current
    const content = previewContentRef.current

    // 获取容器和内容的尺寸
    const containerRect = container.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()

    // 计算内容超出容器的具体尺寸
    const overflowLeft = Math.max(0, containerRect.left - contentRect.left)
    const overflowRight = Math.max(0, contentRect.right - containerRect.right)
    const overflowTop = Math.max(0, containerRect.top - contentRect.top)
    const overflowBottom = Math.max(0, contentRect.bottom - containerRect.bottom)

    // 计算总的超出尺寸
    const totalOverflowWidth = overflowLeft + overflowRight
    const totalOverflowHeight = overflowTop + overflowBottom

    const needsScroll = totalOverflowWidth > 0 || totalOverflowHeight > 0
    setNeedsScrollbar(needsScroll)

    // 设置容器的滚动区域大小
    if (needsScroll && container) {
      const scrollableWidth = containerRect.width + totalOverflowWidth
      const scrollableHeight = containerRect.height + totalOverflowHeight

      // 通过设置一个隐藏的伪元素来控制滚动区域
      container.style.setProperty('--scroll-width', `${scrollableWidth}px`)
      container.style.setProperty('--scroll-height', `${scrollableHeight}px`)
    }
  }, [scale, panOffset])
  
  useEffect(() => {
    checkScrollbarNeeded()

    // 监听窗口大小变化
    const handleResize = () => {
      checkScrollbarNeeded()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [checkScrollbarNeeded])

  useEffect(() => {
    checkScrollbarNeeded()
  }, [scale, panOffset, checkScrollbarNeeded])

  /**
   * 获取鼠标指针样式
   */
  const getCursorStyle = () => {
    if (isDragging) {
      return 'grabbing'
    }
    if (isSpacePressed) {
      return 'grab'
    }
    if (isAltPressed) {
      return 'zoom-in'
    }
    return 'default'
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 items-center">
            <Eye className="w-5 h-5" />
            <h3 className="text-lg font-semibold">
              组件预览 - {platform}/{templateId}
            </h3>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">
              缩放: {Math.round(scale * 100)}%
            </span>
            <Slider
              size="sm"
              step={0.01}
              minValue={0.2}
              maxValue={1}
              value={scale}
              onChange={handleSliderChange}
              className="w-32"
              color="primary"
              aria-label="缩放比例调节"
            />
            <Button
              size="sm"
              variant="flat"
              startContent={scale < 0.6 ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              onPress={handleQuickZoom}
            >
              {scale < 0.6 ? '放大' : '缩小'}
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<Download className="w-4 h-4" />}
            >
              导出
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden relative flex-1 p-0">
        {/* 快捷键 */}
        <div className="absolute top-4 left-4 z-10 p-3 space-y-2 text-sm rounded-lg shadow-lg backdrop-blur-sm bg-default-0/20 border-default-20">
          <div className="flex gap-2 items-center">
            <Kbd keys={["alt"]} className="bg-default-10 text-default-70">Alt</Kbd>
            <span className="text-default-50">+</span>
            <span className="px-2 py-1 text-xs rounded bg-default-10 text-default-70">滚轮</span>
            <span className="text-default-600">缩放</span>
          </div>
          <div className="flex gap-2 items-center">
            <Kbd keys={["space"]} className="bg-default-10 text-default-70">Space</Kbd>
            <span className="text-default-500">+</span>
            <span className="px-2 py-1 text-xs rounded bg-default-10 text-default-70">拖拽</span>
            <span className="text-default-600">移动</span>
          </div>
        </div>

        <div
          ref={previewContainerRef}
          className={`flex justify-center items-center w-full h-full ${needsScrollbar ? 'overflow-auto' : 'overflow-hidden'
            }`}
          style={{
            cursor: getCursorStyle(),
            ...(needsScrollbar && {
              '--scroll-width': 'var(--scroll-width)',
              '--scroll-height': 'var(--scroll-height)'
            })
          }}
          onMouseDown={handleMouseDown}
          onScroll={checkScrollbarNeeded}
        >
          {needsScrollbar && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 'var(--scroll-width, 100%)',
                height: 'var(--scroll-height, 100%)',
                pointerEvents: 'none',
                visibility: 'hidden'
              }}
            />
          )}
          <div
            ref={previewContentRef}
            className="bg-white border border-gray-300 shadow-lg"
            style={{
              transform: `scale(${scale}) translate(${panOffset.x / scale}px, ${panOffset.y / scale}px)`,
              width: '1440px',
              transformOrigin: 'center center',
              transition: dragEasing ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.1s ease-out',
              willChange: isDragging ? 'transform' : 'auto'
            }}
          >
            <ComponentRenderer
              platform={platform}
              templateId={templateId}
              data={data}
              qrCodeDataUrl={qrCodeDataUrl}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}