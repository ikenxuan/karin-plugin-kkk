import { getCurrentWindow } from '@tauri-apps/api/window'
import { Minus, Square, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

/**
 * 窗口控制组件
 * 提供最小化、最大化/还原、关闭功能
 */
export const WindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false)

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
   * 切换最大化状态
   */
  const handleToggleMaximize = useCallback(async () => {
    try {
      const appWindow = getCurrentWindow()
      await appWindow.toggleMaximize()
      setIsMaximized(!isMaximized)
    } catch (error) {
      console.error('切换最大化状态失败:', error)
    }
  }, [isMaximized])

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
    <div className="fixed top-4 right-4 z-50 flex items-center bg-default/5 backdrop-blur-md rounded-lg overflow-hidden shadow-lg shadow-black/20">
      {/* 最小化按钮 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMinimize}
            className="ext-default"
          >
            <Minus size={18} strokeWidth={3} absoluteStrokeWidth />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>最小化</p>
        </TooltipContent>
      </Tooltip>

      {/* 最大化/还原按钮 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleMaximize}
            className="text-default"
          >
            <Square size={18} strokeWidth={3} absoluteStrokeWidth />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{isMaximized ? "还原" : "最大化"}</p>
        </TooltipContent>
      </Tooltip>

      {/* 关闭按钮 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-default hover:text-white hover:bg-red-500"
          >
            <X size={18} strokeWidth={3} absoluteStrokeWidth />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>关闭</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}