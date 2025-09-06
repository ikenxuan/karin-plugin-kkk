"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import DraggableComponent from "./DraggableComponent"

interface Position {
  x: number
  y: number
}

interface ScrollBarState {
  show: boolean
  position: number
  size: number
}

interface ScrollBars {
  horizontal: ScrollBarState
  vertical: ScrollBarState
}

interface ScrollBarDragState {
  type: "horizontal" | "vertical"
  initialMousePos: number
  initialComponentPos: number
  initialOverflow: number
  maxOverflow: number
}

const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)

  // 缩放和位置状态
  const [scale, setScale] = useState<number>(1)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  // 拖拽状态
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [spacePressed, setSpacePressed] = useState<boolean>(false)

  const [isScrollbarDragging, setIsScrollbarDragging] = useState<boolean>(false)
  const [scrollbarDragState, setScrollbarDragState] = useState<ScrollBarDragState | null>(null)

  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const animationRef = useRef<number | null>(null)

  const checkBounds = useCallback(() => {
    if (!canvasRef.current || !componentRef.current) return

    const canvas = canvasRef.current.getBoundingClientRect()

    const componentWidth = 200 * scale
    const componentHeight = 150 * scale

    // 计算组件在画布中的实际位置
    const componentLeft = canvas.width / 2 + position.x - componentWidth / 2
    const componentTop = canvas.height / 2 + position.y - componentHeight / 2
    const componentRight = componentLeft + componentWidth
    const componentBottom = componentTop + componentHeight

    // 计算超出边界的百分比
    const overflowThreshold = 0.1 // 10%

    // 水平滚动条逻辑
    let horizontalShow = false
    let horizontalPosition = 0
    let horizontalSize = 0

    const leftOverflow = Math.max(0, -componentLeft)
    const rightOverflow = Math.max(0, componentRight - canvas.width)

    if (leftOverflow > canvas.width * overflowThreshold || rightOverflow > canvas.width * overflowThreshold) {
      horizontalShow = true

      // 总内容宽度 = 画布宽度 + 左右超出部分
      const totalContentWidth = canvas.width + leftOverflow + rightOverflow
      const scrollableWidth = totalContentWidth - canvas.width

      // 滚动条大小 = 可视区域占总内容的比例
      horizontalSize = Math.max(10, (canvas.width / totalContentWidth) * 100)

      if (scrollableWidth > 0) {
        // 组件左边缘在总内容中的位置
        const componentLeftInContent = leftOverflow
        // 滚动条位置 = 组件左边缘位置占可滚动范围的比例
        horizontalPosition = (componentLeftInContent / scrollableWidth) * (100 - horizontalSize)
      } else {
        horizontalPosition = 0
      }
    }

    // 垂直滚动条逻辑
    let verticalShow = false
    let verticalPosition = 0
    let verticalSize = 0

    const topOverflow = Math.max(0, -componentTop)
    const bottomOverflow = Math.max(0, componentBottom - canvas.height)

    if (topOverflow > canvas.height * overflowThreshold || bottomOverflow > canvas.height * overflowThreshold) {
      verticalShow = true

      // 总内容高度 = 画布高度 + 上下超出部分
      const totalContentHeight = canvas.height + topOverflow + bottomOverflow
      const scrollableHeight = totalContentHeight - canvas.height

      // 滚动条大小 = 可视区域占总内容的比例
      verticalSize = Math.max(10, (canvas.height / totalContentHeight) * 100)

      if (scrollableHeight > 0) {
        // 组件顶部在总内容中的位置
        const componentTopInContent = topOverflow
        // 滚动条位置 = 组件顶部位置占可滚动范围的比例
        verticalPosition = (componentTopInContent / scrollableHeight) * (100 - verticalSize)
      } else {
        verticalPosition = 0
      }
    }

    console.log("[v0] Bounds check:", {
      componentLeft: componentLeft.toFixed(1),
      componentTop: componentTop.toFixed(1),
      componentRight: componentRight.toFixed(1),
      componentBottom: componentBottom.toFixed(1),
      leftOverflow: leftOverflow.toFixed(1),
      rightOverflow: rightOverflow.toFixed(1),
      topOverflow: topOverflow.toFixed(1),
      bottomOverflow: bottomOverflow.toFixed(1),
      horizontalShow,
      horizontalPosition: horizontalPosition.toFixed(1),
      horizontalSize: horizontalSize.toFixed(1),
      verticalShow,
      verticalPosition: verticalPosition.toFixed(1),
      verticalSize: verticalSize.toFixed(1),
    })

    setScrollBars({
      horizontal: { show: horizontalShow, position: horizontalPosition, size: horizontalSize },
      vertical: { show: verticalShow, position: verticalPosition, size: verticalSize },
    })
  }, [scale, position])

  const animateToPosition = useCallback(
    (targetPos: Position, duration = 300) => {
      const startPos = { ...position }
      const startTime = Date.now()

      setIsAnimating(true)

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用 easeOutCubic 缓动函数
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        const newPos = {
          x: startPos.x + (targetPos.x - startPos.x) * easeProgress,
          y: startPos.y + (targetPos.y - startPos.y) * easeProgress,
        }

        setPosition(newPos)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
          animationRef.current = null
        }
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(animate)
    },
    [position],
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      if (e.altKey) {
        // Alt + 滚轮：缩放
        const canvas = canvasRef.current?.getBoundingClientRect()
        if (!canvas) return

        const mouseX = e.clientX - canvas.left
        const mouseY = e.clientY - canvas.top

        const delta = e.deltaY > 0 ? 0.9 : 1.1
        const newScale = Math.max(0.1, Math.min(5, scale * delta))

        // 以鼠标为锚点进行缩放
        const scaleRatio = newScale / scale
        const canvasCenterX = canvas.width / 2
        const canvasCenterY = canvas.height / 2

        const newX = position.x + (mouseX - canvasCenterX) * (1 - scaleRatio)
        const newY = position.y + (mouseY - canvasCenterY) * (1 - scaleRatio)

        setScale(newScale)
        setPosition({ x: newX, y: newY })
      } else {
        const scrollSpeed = 50
        const targetY = position.y - (e.deltaY * scrollSpeed) / 100

        if (!isAnimating) {
          animateToPosition({ x: position.x, y: targetY }, 150)
        }

        console.log("[v0] Wheel scroll:", {
          deltaY: e.deltaY,
          oldY: position.y.toFixed(1),
          targetY: targetY.toFixed(1),
        })
      }
    },
    [scale, position, isAnimating, animateToPosition],
  )

  // 处理鼠标按下
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!spacePressed || e.button !== 0) return

      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    },
    [spacePressed, position],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        setPosition({ x: newX, y: newY })
      }

      if (isScrollbarDragging && scrollbarDragState && canvasRef.current) {
        const canvas = canvasRef.current.getBoundingClientRect()

        if (scrollbarDragState.type === "horizontal") {
          const mouseX = e.clientX - canvas.left
          const mouseDelta = mouseX - scrollbarDragState.initialMousePos
          const trackWidth = canvas.width

          // 计算滚动条移动的百分比
          const scrollPercent = mouseDelta / trackWidth
          // 计算组件应该移动的距离
          const moveDistance = scrollPercent * scrollbarDragState.maxOverflow
          // 计算新的组件位置
          const newX = scrollbarDragState.initialComponentPos - moveDistance

          console.log("[v0] Horizontal scroll drag:", {
            mouseX: mouseX.toFixed(1),
            mouseDelta: mouseDelta.toFixed(1),
            scrollPercent: scrollPercent.toFixed(3),
            moveDistance: moveDistance.toFixed(1),
            newX: newX.toFixed(1),
          })

          setPosition((prev) => ({ ...prev, x: newX }))
        } else {
          const mouseY = e.clientY - canvas.top
          const mouseDelta = mouseY - scrollbarDragState.initialMousePos
          const trackHeight = canvas.height

          // 计算滚动条移动的百分比
          const scrollPercent = mouseDelta / trackHeight
          // 计算组件应该移动的距离
          const moveDistance = scrollPercent * scrollbarDragState.maxOverflow
          // 计算新的组件位置
          const newY = scrollbarDragState.initialComponentPos - moveDistance

          console.log("[v0] Vertical scroll drag:", {
            mouseY: mouseY.toFixed(1),
            mouseDelta: mouseDelta.toFixed(1),
            scrollPercent: scrollPercent.toFixed(3),
            moveDistance: moveDistance.toFixed(1),
            newY: newY.toFixed(1),
          })

          setPosition((prev) => ({ ...prev, y: newY }))
        }
      }
    },
    [isDragging, dragStart, isScrollbarDragging, scrollbarDragState, scale, position],
  )

  // 处理鼠标抬起
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsScrollbarDragging(false)
    setScrollbarDragState(null)
  }, [])

  // 处理键盘事件
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault()
      setSpacePressed(true)
    }
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space") {
      setSpacePressed(false)
      setIsDragging(false)
    }
  }, [])

  const handleScrollBarMouseDown = useCallback(
    (type: "horizontal" | "vertical", e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (!canvasRef.current) return

      const canvas = canvasRef.current.getBoundingClientRect()
      const componentWidth = 200 * scale
      const componentHeight = 150 * scale

      // 计算当前组件位置和溢出情况
      const componentLeft = canvas.width / 2 + position.x - componentWidth / 2
      const componentTop = canvas.height / 2 + position.y - componentHeight / 2
      const componentRight = componentLeft + componentWidth
      const componentBottom = componentTop + componentHeight

      let initialState: ScrollBarDragState

      if (type === "horizontal") {
        const leftOverflow = Math.max(0, -componentLeft)
        const rightOverflow = Math.max(0, componentRight - canvas.width)
        const maxOverflow = leftOverflow + rightOverflow

        initialState = {
          type: "horizontal",
          initialMousePos: e.clientX - canvas.left,
          initialComponentPos: position.x,
          initialOverflow: leftOverflow,
          maxOverflow: maxOverflow,
        }
      } else {
        const topOverflow = Math.max(0, -componentTop)
        const bottomOverflow = Math.max(0, componentBottom - canvas.height)
        const maxOverflow = topOverflow + bottomOverflow

        initialState = {
          type: "vertical",
          initialMousePos: e.clientY - canvas.top,
          initialComponentPos: position.y,
          initialOverflow: topOverflow,
          maxOverflow: maxOverflow,
        }
      }

      setIsScrollbarDragging(true)
      setScrollbarDragState(initialState)

      console.log("[v0] Scrollbar drag start:", {
        type,
        initialState,
      })
    },
    [scale, position],
  )

  // 滚动条状态
  const [scrollBars, setScrollBars] = useState<ScrollBars>({
    horizontal: { show: false, position: 0, size: 0 },
    vertical: { show: false, position: 0, size: 0 },
  })

  // 事件监听器
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener("wheel", handleWheel, { passive: false })
    canvas.addEventListener("mousedown", handleMouseDown)

    return () => {
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("mousedown", handleMouseDown)
    }
  }, [handleWheel, handleMouseDown])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleMouseMove, handleMouseUp, handleKeyDown, handleKeyUp])

  // 检查边界
  useEffect(() => {
    checkBounds()
  }, [checkBounds])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 画布 */}
      <div
        ref={canvasRef}
        className={`w-full h-full border-2 border-gray-300 relative ${
          spacePressed ? "cursor-grab" : "cursor-default"
        } ${isDragging ? "cursor-grabbing" : ""}`}
        style={{
          userSelect: "none",
          backgroundColor: "#f8fafc", // Light blue-gray background
        }}
      >
        {/* 可拖拽组件 */}
        <DraggableComponent ref={componentRef} scale={scale} position={position} />

        {/* 网格背景 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* 水平滚动条 */}
      {scrollBars.horizontal.show && (
        <div className="absolute bottom-0 left-0 right-4 h-3 bg-gray-200 border-t border-gray-300">
          <div
            className={`h-full bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors rounded-sm ${
              isScrollbarDragging && scrollbarDragState?.type === "horizontal" ? "bg-blue-700" : ""
            }`}
            style={{
              width: `${Math.max(scrollBars.horizontal.size, 5)}%`,
              marginLeft: `${Math.max(0, Math.min(95, scrollBars.horizontal.position))}%`,
            }}
            onMouseDown={(e) => handleScrollBarMouseDown("horizontal", e)}
          />
        </div>
      )}

      {/* 垂直滚动条 */}
      {scrollBars.vertical.show && (
        <div className="absolute top-0 right-0 bottom-4 w-3 bg-gray-200 border-l border-gray-300">
          <div
            className={`w-full bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors rounded-sm ${
              isScrollbarDragging && scrollbarDragState?.type === "vertical" ? "bg-blue-700" : ""
            }`}
            style={{
              height: `${Math.max(scrollBars.vertical.size, 5)}%`,
              marginTop: `${Math.max(0, Math.min(95, scrollBars.vertical.position))}%`,
            }}
            onMouseDown={(e) => handleScrollBarMouseDown("vertical", e)}
          />
        </div>
      )}

      {/* 状态显示 */}
      <div
        className="absolute top-4 left-4 p-3 rounded-lg text-sm font-mono shadow-lg max-w-xs"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          color: "#f1f5f9",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(71, 85, 105, 0.3)",
        }}
      >
        <div className="mb-1">🔍 缩放: {(scale * 100).toFixed(0)}%</div>
        <div className="mb-1">
          📍 位置: ({position.x.toFixed(0)}, {position.y.toFixed(0)})
        </div>
        <div className="mb-1">⌨️ 空格键: {spacePressed ? "🟢 按下" : "🔴 释放"}</div>
        <div className="mb-1">🎯 拖拽状态: {isDragging ? "🟢 拖拽组件" : "🔴 空闲"}</div>
        <div className="mb-1">📜 滚动条拖拽: {isScrollbarDragging ? `🟢 ${scrollbarDragState?.type}` : "🔴 空闲"}</div>
        <div className="mb-1">🎬 缓动动画: {isAnimating ? "🟢 进行中" : "🔴 空闲"}</div>
        <div className="mb-1">
          📏 滚动条显示: H:{scrollBars.horizontal.show ? "✅" : "❌"} V:{scrollBars.vertical.show ? "✅" : "❌"}
        </div>
        {scrollBars.horizontal.show && (
          <div className="mb-1 text-xs">
            🔄 H: 位置{scrollBars.horizontal.position.toFixed(1)}% 大小{scrollBars.horizontal.size.toFixed(1)}%
          </div>
        )}
        {scrollBars.vertical.show && (
          <div className="mb-1 text-xs">
            🔄 V: 位置{scrollBars.vertical.position.toFixed(1)}% 大小{scrollBars.vertical.size.toFixed(1)}%
          </div>
        )}
        {scrollbarDragState && (
          <div className="mb-1 text-xs">
            🎯 拖拽详情: 初始溢出{scrollbarDragState.initialOverflow.toFixed(1)} 最大
            {scrollbarDragState.maxOverflow.toFixed(1)}
          </div>
        )}
        <div
          className="text-xs mt-2 pt-2"
          style={{
            opacity: 0.8,
            borderTop: "1px solid rgba(71, 85, 105, 0.4)",
          }}
        >
          <div>Alt + 滚轮: 缩放</div>
          <div>滚轮: 垂直滚动 (缓动)</div>
          <div>空格 + 拖拽: 移动</div>
          <div>拖拽滚动条: 滚动</div>
        </div>
      </div>
    </div>
  )
}

export default Canvas
