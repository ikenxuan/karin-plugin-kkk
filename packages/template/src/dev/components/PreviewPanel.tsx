import { Button, Card, CardBody, CardHeader, Kbd, Slider } from '@heroui/react'
import { Download, Eye, Maximize2, Minimize2 } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { PlatformType } from '../../types/platforms'
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
  /** 二维码数据URL */
  qrCodeDataUrl: string
  /** 缩放比例 */
  scale: number
  /** 缩放变化回调 */
  onScaleChange: (scale: number) => void
}

/**
 * 滚动条状态接口
 */
interface ScrollBarState {
  /** 是否显示 */
  show: boolean
  /** 位置百分比 */
  position: number
  /** 大小百分比 */
  size: number
}

/**
 * 滚动条集合接口
 */
interface ScrollBars {
  /** 水平滚动条 */
  horizontal: ScrollBarState
  /** 垂直滚动条 */
  vertical: ScrollBarState
}

/**
 * 滚动条拖拽状态接口
 */
interface ScrollBarDragState {
  /** 滚动条类型 */
  type: 'horizontal' | 'vertical'
  /** 初始鼠标位置 */
  initialMousePos: number
  /** 初始组件位置 */
  initialComponentPos: number
  /** 初始溢出量 */
  initialOverflow: number
  /** 最大溢出量 */
  maxOverflow: number
  /** 滚动条轨道大小 */
  trackSize: number
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
  // 键盘状态
  const [isSpacePressed, setIsSpacePressed] = useState(false)
  const [isAltPressed, setIsAltPressed] = useState(false)

  // 拖拽状态
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragEasing, setDragEasing] = useState(false)

  // 滚动条状态
  const [scrollBars, setScrollBars] = useState<ScrollBars>({
    horizontal: { show: false, position: 0, size: 0 },
    vertical: { show: false, position: 0, size: 0 }
  })
  const [isScrollbarDragging, setIsScrollbarDragging] = useState(false)
  const [scrollbarDragState, setScrollbarDragState] = useState<ScrollBarDragState | null>(null)

  // 引用
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const previewContentRef = useRef<HTMLDivElement>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * 重置键盘状态
   */
  const resetKeyStates = useCallback(() => {
    setIsSpacePressed(false)
    setIsAltPressed(false)
  }, [])

  /**
   * 检查边界并计算滚动条状态 - 优化响应性
   */
  const checkBounds = useCallback(() => {
    if (!previewContainerRef.current || !previewContentRef.current) return

    const container = previewContainerRef.current.getBoundingClientRect()
    const contentWidth = 1440 * scale
    const contentHeight = previewContentRef.current.scrollHeight * scale

    // 计算内容在容器中的实际位置
    const contentLeft = container.width / 2 + panOffset.x - contentWidth / 2
    const contentTop = container.height / 2 + panOffset.y - contentHeight / 2
    const contentRight = contentLeft + contentWidth
    const contentBottom = contentTop + contentHeight

    // 计算超出边界的阈值（10%）
    const overflowThreshold = 0.1

    // 水平滚动条逻辑
    let horizontalShow = false
    let horizontalPosition = 0
    let horizontalSize = 0

    const leftOverflow = Math.max(0, -contentLeft)
    const rightOverflow = Math.max(0, contentRight - container.width)

    if (leftOverflow > container.width * overflowThreshold || rightOverflow > container.width * overflowThreshold) {
      horizontalShow = true

      // 总内容宽度 = 容器宽度 + 左右超出部分
      const totalContentWidth = container.width + leftOverflow + rightOverflow
      const scrollableWidth = totalContentWidth - container.width

      // 滚动条大小 = 可视区域占总内容的比例
      horizontalSize = Math.max(10, (container.width / totalContentWidth) * 100)

      if (scrollableWidth > 0) {
        // 滚动条位置 = 左侧溢出占可滚动范围的比例
        horizontalPosition = (leftOverflow / scrollableWidth) * (100 - horizontalSize)
      } else {
        horizontalPosition = 0
      }
    }

    // 垂直滚动条逻辑
    let verticalShow = false
    let verticalPosition = 0
    let verticalSize = 0

    const topOverflow = Math.max(0, -contentTop)
    const bottomOverflow = Math.max(0, contentBottom - container.height)

    if (topOverflow > container.height * overflowThreshold || bottomOverflow > container.height * overflowThreshold) {
      verticalShow = true

      // 总内容高度 = 容器高度 + 上下超出部分
      const totalContentHeight = container.height + topOverflow + bottomOverflow
      const scrollableHeight = totalContentHeight - container.height

      // 滚动条大小 = 可视区域占总内容的比例
      verticalSize = Math.max(10, (container.height / totalContentHeight) * 100)

      if (scrollableHeight > 0) {
        // 滚动条位置 = 顶部溢出占可滚动范围的比例
        verticalPosition = (topOverflow / scrollableHeight) * (100 - verticalSize)
      } else {
        verticalPosition = 0
      }
    }

    setScrollBars({
      horizontal: { show: horizontalShow, position: horizontalPosition, size: horizontalSize },
      vertical: { show: verticalShow, position: verticalPosition, size: verticalSize }
    })
  }, [scale, panOffset])

  /**
   * 立即更新滚动条状态 - 解决响应延迟问题
   */
  const updateScrollBarsImmediate = useCallback(() => {
    // 清除之前的延迟更新
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }

    // 立即更新
    checkBounds()
  }, [checkBounds])

  /**
   * 滚动条拖拽开始处理
   */
  const handleScrollBarMouseDown = useCallback(
    (type: 'horizontal' | 'vertical', e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (!previewContainerRef.current || !previewContentRef.current) return

      const container = previewContainerRef.current.getBoundingClientRect()
      const contentWidth = 1440 * scale
      const contentHeight = previewContentRef.current.scrollHeight * scale

      // 计算当前内容位置和溢出情况
      const contentLeft = container.width / 2 + panOffset.x - contentWidth / 2
      const contentTop = container.height / 2 + panOffset.y - contentHeight / 2
      const contentRight = contentLeft + contentWidth
      const contentBottom = contentTop + contentHeight

      let initialState: ScrollBarDragState

      if (type === 'horizontal') {
        const leftOverflow = Math.max(0, -contentLeft)
        const rightOverflow = Math.max(0, contentRight - container.width)
        const maxOverflow = leftOverflow + rightOverflow

        initialState = {
          type: 'horizontal',
          initialMousePos: e.clientX - container.left,
          initialComponentPos: panOffset.x,
          initialOverflow: leftOverflow,
          maxOverflow,
          trackSize: container.width
        }
      } else {
        const topOverflow = Math.max(0, -contentTop)
        const bottomOverflow = Math.max(0, contentBottom - container.height)
        const maxOverflow = topOverflow + bottomOverflow

        initialState = {
          type: 'vertical',
          initialMousePos: e.clientY - container.top,
          initialComponentPos: panOffset.y,
          initialOverflow: topOverflow,
          maxOverflow,
          trackSize: container.height
        }
      }

      setIsScrollbarDragging(true)
      setScrollbarDragState(initialState)
    },
    [scale, panOffset]
  )

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

    // 立即更新滚动条
    updateScrollBarsImmediate()
  }, [scale, panOffset, onScaleChange, updateScrollBarsImmediate])

  /**
   * 改进的滚轮事件处理 - 支持普通Y轴滚动和Alt+滚轮缩放
   */
  const handleWheel = useCallback(
    throttle((e: WheelEvent) => {
      if (isAltPressed) {
        // Alt + 滚轮：缩放
        e.preventDefault()
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
        const newScale = Math.max(0.1, Math.min(3, scale * zoomFactor))
        zoomAtPoint(newScale, e.clientX, e.clientY)
      } else {
        // 普通滚轮：Y轴滚动（仅在有垂直滚动条时）
        if (scrollBars.vertical.show) {
          e.preventDefault()
          const scrollSpeed = 50 // 滚动速度
          const deltaY = e.deltaY > 0 ? scrollSpeed : -scrollSpeed

          setPanOffset(prev => {
            const newY = prev.y - deltaY
            const newOffset = { ...prev, y: newY }

            // 立即更新滚动条
            setTimeout(() => updateScrollBarsImmediate(), 0)

            return newOffset
          })
        }
      }
    }, 8),
    [isAltPressed, scale, zoomAtPoint, scrollBars.vertical.show, updateScrollBarsImmediate]
  )

  /**
   * 滑块缩放变化处理
   */
  const handleSliderChange = useCallback((value: number | number[]) => {
    const newScale = Array.isArray(value) ? value[0] : value
    onScaleChange(newScale / 100)
    // 立即更新滚动条
    updateScrollBarsImmediate()
  }, [onScaleChange, updateScrollBarsImmediate])

  useCallback((targetScale: number) => {
    onScaleChange(targetScale)
    // 立即更新滚动条
    updateScrollBarsImmediate()
  }, [onScaleChange, updateScrollBarsImmediate])

  /**
   * 适应画布大小 - 计算Y轴填满画布的缩放比例
   * 根据容器高度和内容高度自动计算最佳缩放比例
   */
  const handleFitToCanvas = useCallback(() => {
    if (!previewContainerRef.current || !previewContentRef.current) return

    const container = previewContainerRef.current.getBoundingClientRect()
    const contentHeight = previewContentRef.current.scrollHeight

    // 预留一些边距，避免内容完全贴边
    const padding = 40
    const availableHeight = container.height - padding

    // 计算适应Y轴的缩放比例
    const fitScale = availableHeight / contentHeight

    // 限制缩放范围在0.1到3之间
    const clampedScale = Math.max(0.1, Math.min(3, fitScale))

    onScaleChange(clampedScale)

    // 重置位移到中心位置
    setPanOffset({ x: 0, y: 0 })

    // 立即更新滚动条
    updateScrollBarsImmediate()
  }, [onScaleChange, updateScrollBarsImmediate])

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
        // 立即更新滚动条
        updateScrollBarsImmediate()
      }

      // 滚动条拖拽处理
      if (isScrollbarDragging && scrollbarDragState && previewContainerRef.current) {
        const container = previewContainerRef.current.getBoundingClientRect()

        if (scrollbarDragState.type === 'horizontal') {
          const mouseX = e.clientX - container.left
          const mouseDelta = mouseX - scrollbarDragState.initialMousePos

          const scrollbarTrackWidth = container.width - 20
          const scrollbarSize = (scrollBars.horizontal.size / 100) * scrollbarTrackWidth
          const scrollbarMovableRange = scrollbarTrackWidth - scrollbarSize

          if (scrollbarMovableRange > 0) {
            const scrollPercent = mouseDelta / scrollbarMovableRange
            const moveDistance = scrollPercent * scrollbarDragState.maxOverflow
            const newX = scrollbarDragState.initialComponentPos - moveDistance

            setPanOffset((prev) => ({ ...prev, x: newX }))
            // 立即更新滚动条
            updateScrollBarsImmediate()
          }
        } else {
          const mouseY = e.clientY - container.top
          const mouseDelta = mouseY - scrollbarDragState.initialMousePos

          const scrollbarTrackHeight = container.height - 20
          const scrollbarSize = (scrollBars.vertical.size / 100) * scrollbarTrackHeight
          const scrollbarMovableRange = scrollbarTrackHeight - scrollbarSize

          if (scrollbarMovableRange > 0) {
            const scrollPercent = mouseDelta / scrollbarMovableRange
            const moveDistance = scrollPercent * scrollbarDragState.maxOverflow
            const newY = scrollbarDragState.initialComponentPos - moveDistance

            setPanOffset((prev) => ({ ...prev, y: newY }))
            // 立即更新滚动条
            updateScrollBarsImmediate()
          }
        }
      }
    }, 4), // 进一步减少节流时间以提高响应性
    [isDragging, isSpacePressed, dragStart, isScrollbarDragging, scrollbarDragState, scrollBars, updateScrollBarsImmediate]
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

    // 重置滚动条拖拽状态
    setIsScrollbarDragging(false)
    setScrollbarDragState(null)
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

      // 清理定时器
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [handleKeyDown, handleKeyUp, handleWindowBlur, handleWindowFocus, handleMouseMove, handleMouseUp, handleWheel])

  /**
   * 监听缩放和位移变化，立即更新滚动条
   */
  useEffect(() => {
    updateScrollBarsImmediate()
  }, [scale, panOffset.x, panOffset.y, updateScrollBarsImmediate])

  /**
   * 组件挂载后初始化滚动条状态
   * 确保DOM完全渲染后再检查滚动条显示条件
   */
  useEffect(() => {
    // 使用setTimeout确保DOM完全渲染后再执行
    const initScrollBars = () => {
      if (previewContainerRef.current && previewContentRef.current) {
        // 等待一个渲染周期后再检查
        requestAnimationFrame(() => {
          updateScrollBarsImmediate()
        })
      }
    }

    // 立即执行一次
    initScrollBars()

    // 监听窗口大小变化，重新计算滚动条
    const handleResize = () => {
      updateScrollBarsImmediate()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateScrollBarsImmediate])

  /**
   * 监听data、platform、templateId变化，重新计算滚动条
   * 当内容发生变化时，需要重新检查滚动条显示条件
   * 这是解决首次加载和组件切换问题的关键
   */
  useEffect(() => {
    // 确保data存在且不为null
    if (!data) return

    // 内容变化后，需要等待ComponentRenderer完全渲染
    // 使用多重延迟确保DOM完全更新
    const timer1 = setTimeout(() => {
      if (previewContainerRef.current && previewContentRef.current) {
        requestAnimationFrame(() => {
          // 再次确保在下一个渲染周期执行
          setTimeout(() => {
            updateScrollBarsImmediate()
          }, 50)
        })
      }
    }, 100)

    return () => clearTimeout(timer1)
  }, [data, platform, templateId, updateScrollBarsImmediate])

  /**
   * 专门处理qrCodeDataUrl变化的useEffect
   * 二维码加载完成后可能影响内容高度
   */
  useEffect(() => {
    if (qrCodeDataUrl) {
      const timer = setTimeout(() => {
        updateScrollBarsImmediate()
      }, 200) // 给二维码图片加载留出时间

      return () => clearTimeout(timer)
    }
  }, [qrCodeDataUrl, updateScrollBarsImmediate])

  /**
   * 获取鼠标样式
   */
  const getCursorStyle = () => {
    if (isScrollbarDragging) return 'grabbing'
    if (isSpacePressed) return isDragging ? 'grabbing' : 'grab'
    return 'default'
  }

  return (
    <Card className='flex flex-col h-full'>
      <CardHeader className='flex-shrink-0 pb-2'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex gap-2 items-center'>
            <Eye className='w-4 h-4' />
            <span className='text-sm font-medium'>
              {platform} - {templateId}
            </span>
          </div>
          <div className='flex gap-3 items-center'>
            {/* 缩放滑块和显示 */}
            <div className='flex gap-2 items-center'>
              <span className='text-xs whitespace-nowrap text-default-500'>缩放:</span>
              <Slider
                size='sm'
                step={1}
                minValue={10}
                maxValue={300}
                value={[scale * 100]}
                onChange={handleSliderChange}
                className='flex-shrink-0 w-32'
                aria-label='缩放比例滑块'
              />
              <div className='flex gap-1 items-center'>
                <span className='text-xs font-medium tabular-nums'>{Math.round(scale * 100)}%</span>
              </div>
            </div>

            {/* 适应画布按钮 */}
            <div className='flex gap-1'>
              <Button
                size='sm'
                variant='ghost'
                onClick={handleFitToCanvas}
                className='flex-shrink-0 px-2 text-xs'
                startContent={<Minimize2 className='w-3 h-3' />}
              >
                适应
              </Button>
            </div>

            {/* 功能按钮组 */}
            <div className='flex gap-1'>
              <Button size='sm' variant='ghost'>
                <Download className='w-4 h-4' />
              </Button>
              <Button size='sm' variant='ghost'>
                <Maximize2 className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className='overflow-hidden relative flex-1 p-0'>
        {/* 快捷键提示 */}
        <div className='flex flex-col absolute p-4 z-10 gap-1.5 text-sm bg-default-0/50 backdrop-blur-sm rounded-br-3xl'>
          <div className='flex gap-1 items-center'>
            <Kbd className='bg-default-0' keys={['space']}>Space</Kbd>
            <span>+ 拖拽移动</span>
          </div>
          <div className='flex gap-1 items-center'>
            <Kbd className='bg-default-0' keys={['alt']}>Alt</Kbd>
            <span>+ 滚轮缩放</span>
          </div>
          <div className='flex gap-1 items-center'>
            <span>滚轮 Y 轴滚动</span>
          </div>
        </div>

        {/* 预览容器 */}
        <div
          ref={previewContainerRef}
          className='overflow-hidden relative w-full h-full bg-default-0'
          style={{ cursor: getCursorStyle() }}
          onMouseDown={handleMouseDown}
        >
          {/* 网格背景 */}
          <div
            className='absolute inset-0 opacity-30'
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* 实际渲染的组件 */}
          <div
            ref={previewContentRef}
            className='absolute'
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
              transformOrigin: 'center',
              transition: dragEasing ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.1s ease-out',
              width: '1440px'
            }}
          >
            <ComponentRenderer
              platform={platform}
              templateId={templateId}
              data={data}
              qrCodeDataUrl={qrCodeDataUrl}
            />
          </div>

          {/* 水平滚动条 */}
          {scrollBars.horizontal.show && (
            <div
              className='absolute right-2 bottom-2 left-2 h-3 rounded-full border shadow-sm backdrop-blur-sm bg-black/10 border-white/20'
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(240,240,240,0.9))',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <div
                className={`absolute top-0.5 h-2 rounded-full transition-all ${isScrollbarDragging && scrollbarDragState?.type === 'horizontal'
                  ? 'bg-blue-500 shadow-md'
                  : 'bg-default-60 hover:bg-default-70'
                }`}
                style={{
                  left: `${scrollBars.horizontal.position}%`,
                  width: `${scrollBars.horizontal.size}%`,
                  background: isScrollbarDragging && scrollbarDragState?.type === 'horizontal'
                    ? 'linear-gradient(to bottom, #3b82f6, #2563eb)'
                    : 'linear-gradient(to bottom, #6b7280, #4b5563)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
                onMouseDown={(e) => handleScrollBarMouseDown('horizontal', e)}
              />
            </div>
          )}

          {/* 垂直滚动条 */}
          {scrollBars.vertical.show && (
            <div
              className='absolute top-2 right-2 bottom-2 w-3 rounded-full shadow-sm backdrop-blur-sm bg-black/10 border-white/20'
              style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(240,240,240,0.9))',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <div
                className={`absolute left-0.5 w-2 rounded-full transition-all ${isScrollbarDragging && scrollbarDragState?.type === 'vertical'
                  ? 'bg-blue-500 shadow-md'
                  : 'bg-default-60 hover:bg-default-70'
                }`}
                style={{
                  top: `${scrollBars.vertical.position}%`,
                  height: `${scrollBars.vertical.size}%`,
                  background: isScrollbarDragging && scrollbarDragState?.type === 'vertical'
                    ? 'linear-gradient(to right, #3b82f6, #2563eb)'
                    : 'linear-gradient(to right, #6b7280, #4b5563)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
                onMouseDown={(e) => handleScrollBarMouseDown('vertical', e)}
              />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
