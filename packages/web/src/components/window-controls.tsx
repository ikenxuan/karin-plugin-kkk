import { getCurrentWindow } from '@tauri-apps/api/window'
import { Minus, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

/**
 * 窗口控制组件
 * 提供最小化、关闭功能
 */
export const WindowControls = () => {
  const [, setIsMaximized] = useState(false)

  useEffect(() => {
    const checkMaximized = async () => {
      const appWindow = getCurrentWindow()
      const maximized = await appWindow.isMaximized()
      setIsMaximized(maximized)
    }

    checkMaximized()

    // 监听窗口状态变化
    const unlisten = getCurrentWindow().listen('tauri://resize', checkMaximized)

    return () => {
      unlisten.then(fn => fn())
    }
  }, [])

  /**
   * 最小化窗口
   */
  const handleMinimize = useCallback(async () => {
    try {
      const appWindow = getCurrentWindow()
      await appWindow.minimize()
    } catch (error) {
      console.error('最小化窗口失败:', error)
    }
  }, [])

  /**
   * 关闭窗口
   */
  const handleClose = useCallback(async () => {
    try {
      const appWindow = getCurrentWindow()
      await appWindow.close()
    } catch (error) {
      console.error('关闭窗口失败:', error)
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-md overflow-hidden shadow-sm">
      {/* 最小化按钮 */}
      <button
        onClick={handleMinimize}
        className="w-12 h-8 flex items-center justify-center text-default hover:bg-white/60 dark:hover:bg-black/40 transition-colors duration-200"
      >
        <Minus size={18} strokeWidth={3} absoluteStrokeWidth />
      </button>

      {/* 关闭按钮 */}
      <button
        onClick={handleClose}
        className="w-12 h-8 flex items-center justify-center text-default hover:text-white hover:bg-red-500 transition-colors duration-200"
      >
        <X size={16} strokeWidth={3} absoluteStrokeWidth />
      </button>
    </div>
  )
}