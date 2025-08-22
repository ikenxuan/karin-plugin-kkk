import { getCurrentWindow } from '@tauri-apps/api/window'
import { useCallback, useRef } from 'react'

/**
 * 可拖拽标题栏组件
 * 用于在无边框窗口中提供拖拽功能
 */
export const DraggableTitlebar = () => {
  const dragRef = useRef<HTMLDivElement>(null)
  const lastClickTime = useRef<number>(0)

  /**
   * 开始拖拽窗口
   */
  const handleMouseDown = useCallback(async (e: React.MouseEvent) => {
    // 只有左键点击才触发拖拽
    if (e.button === 0) {
      // 阻止所有默认行为
      e.preventDefault()
      e.stopPropagation()

      // 检查是否是双击（防止双击触发拖拽）
      const currentTime = Date.now()
      const timeDiff = currentTime - lastClickTime.current
      lastClickTime.current = currentTime

      // 如果是双击（间隔小于300ms），直接返回
      if (timeDiff < 300) {
        return
      }

      try {
        const appWindow = getCurrentWindow()
        await appWindow.startDragging()
      } catch (error) {
        console.error('开始拖拽失败:', error)
      }
    }
  }, [])

  /**
   * 彻底阻止双击事件
   */
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }, [])

  /**
   * 阻止所有可能的事件
   */
  const preventAllEvents = useCallback((e: any) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    return false
  }, [])

  /**
   * 鼠标按下时立即阻止
   */
  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <div
      ref={dragRef}
      className="fixed top-0 left-0 right-0 h-15 z-40 cursor-move select-none touch-none pointer-events-auto"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onClick={preventAllEvents}
      onDragStart={preventAllEvents}
      onContextMenu={preventAllEvents}
      onTouchStart={preventAllEvents}
      onTouchEnd={preventAllEvents}
      onTouchMove={preventAllEvents}
      data-tauri-drag-region
      style={{
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        touchAction: 'none',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        WebkitPerspective: '1000px',
        perspective: '1000px',
        willChange: 'auto'
      }}
    />
  )
}