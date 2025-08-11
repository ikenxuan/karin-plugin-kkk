import { getCurrentWindow } from '@tauri-apps/api/window'
import { useCallback } from 'react'

/**
 * 可拖拽标题栏组件
 * 用于在无边框窗口中提供拖拽功能
 */
export const DraggableTitlebar = () => {
  /**
   * 开始拖拽窗口
   */
  const handleMouseDown = useCallback(async (e: React.MouseEvent) => {
    // 只有左键点击才触发拖拽
    if (e.button === 0) {
      try {
        const appWindow = getCurrentWindow()
        await appWindow.startDragging()
      } catch (error) {
        console.error('开始拖拽失败:', error)
      }
    }
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-10 z-40 cursor-move select-none"
      onMouseDown={handleMouseDown}
      data-tauri-drag-region
    />
  )
}