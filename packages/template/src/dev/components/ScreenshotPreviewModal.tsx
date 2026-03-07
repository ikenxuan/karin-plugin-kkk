import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, Switch } from '@heroui/react'
import { Camera, Copy, Download, Maximize, Moon, Sun, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { getWatermarkEnabled, setWatermarkEnabled } from '../utils/watermarkConfig'

interface ScreenshotPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  screenshotResult: {
    blob: Blob
    download: () => void
    copyToClipboard: () => Promise<void>
  } | null
  isDarkMode?: boolean
  /** 重新截图的回调函数，可以传入临时的深色模式设置 */
  onRetakeScreenshot?: (tempDarkMode?: boolean) => Promise<void>
  /** 是否正在截图 */
  isCapturing?: boolean
  /** 当前组件的深色模式状态 */
  componentDarkMode?: boolean
}

export const ScreenshotPreviewModal: React.FC<ScreenshotPreviewModalProps> = ({
  isOpen,
  onClose,
  screenshotResult,
  isDarkMode = false,
  onRetakeScreenshot,
  isCapturing = false,
  componentDarkMode = false
}) => {
  const [scale, setScale] = useState(1)
  const transformWrapperRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 缩放提示显示状态
  const [showScaleIndicator, setShowScaleIndicator] = useState(false)
  const scaleIndicatorTimeoutRef = useRef<number | null>(null)
  
  // 水印开关状态
  const [watermarkEnabled, setWatermarkEnabledState] = useState(() => getWatermarkEnabled())
  
  // 临时深色模式状态（仅在模态窗中生效）
  const [tempDarkMode, setTempDarkMode] = useState(componentDarkMode)
  
  // 当模态窗打开时，重置临时深色模式为组件的当前状态
  useEffect(() => {
    if (isOpen) {
      setTempDarkMode(componentDarkMode)
    }
  }, [isOpen, componentDarkMode])
  
  // 当截图完成后，保持临时深色模式状态不变
  // 只在模态窗关闭时才重置
  useEffect(() => {
    if (!isOpen) {
      // 模态窗关闭时重置状态
      setTempDarkMode(componentDarkMode)
    }
  }, [isOpen, componentDarkMode])

  const imageUrl = React.useMemo(() => {
    if (!screenshotResult) return ''
    return URL.createObjectURL(screenshotResult.blob)
  }, [screenshotResult])

  // 清理 URL
  React.useEffect(() => {
    if (!imageUrl) return
    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  /**
   * 适应画布大小 - 重置到初始状态
   */
  const handleFitToCanvas = useCallback(() => {
    if (!transformWrapperRef.current) return
    
    const transformInstance = transformWrapperRef.current
    
    // 重置到初始状态：居中，缩放为1
    transformInstance.resetTransform(300, 'easeOut')
  }, [])

  /**
   * 监听双击事件，调用适应画布
   */
  useEffect(() => {
    if (!isOpen) return
    
    // 延迟获取容器，确保 TransformWrapper 已经初始化
    const timer = setTimeout(() => {
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
    }, 100)

    return () => clearTimeout(timer)
  }, [isOpen, handleFitToCanvas])

  /**
   * 在容器上监听滚轮事件，转发给 TransformWrapper
   */
  useEffect(() => {
    if (!isOpen) return
    
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      // 阻止默认滚动
      e.preventDefault()
      e.stopPropagation()
      
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
  }, [isOpen])

  if (!screenshotResult) return null

  const handleDownload = () => {
    screenshotResult.download()
    addToast({
      title: '下载成功',
      description: '图片已保存到本地',
      color: 'success',
      variant: 'flat'
    })
    onClose()
  }

  const handleCopy = async () => {
    try {
      await screenshotResult.copyToClipboard()
      addToast({
        title: '复制成功',
        description: '图片已复制到剪贴板',
        color: 'success',
        variant: 'flat'
      })
      onClose()
    } catch {
      addToast({
        title: '复制失败',
        description: '无法复制到剪贴板，请尝试下载',
        color: 'danger',
        variant: 'flat'
      })
    }
  }
  
  // 处理水印开关变化
  const handleWatermarkChange = (checked: boolean) => {
    setWatermarkEnabledState(checked)
    setWatermarkEnabled(checked)
  }
  
  // 处理临时深色模式切换
  const handleTempDarkModeChange = (checked: boolean) => {
    setTempDarkMode(checked)
  }
  
  // 处理重新截图
  const handleRetake = async () => {
    if (onRetakeScreenshot && !isCapturing) {
      // 传递临时深色模式设置
      await onRetakeScreenshot(tempDarkMode)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="5xl"
      backdrop="blur"
      hideCloseButton={true}
      classNames={{
        backdrop: 'bg-overlay/50 backdrop-blur-sm',
        wrapper: 'items-center justify-center',
        base: `border border-divider rounded-2xl ${isDarkMode ? 'dark bg-content1' : 'bg-content1'}`
      }}
    >
      <ModalContent className={`${isDarkMode ? 'dark' : ''} flex flex-col max-h-[95vh]`}>
        {(onClose) => (
          <>
            <ModalBody className="overflow-hidden flex-1 p-4" style={{ backgroundColor: isDarkMode ? '#18181b' : '#f4f4f5' }}>
              <div 
                ref={containerRef}
                className="overflow-hidden relative w-full h-full rounded-lg border border-dashed border-divider"
                style={{ backgroundColor: isDarkMode ? '#18181b' : '#f4f4f5' }}
              >
                {/* 网格背景 */}
                <div
                  className='absolute inset-0 opacity-50 pointer-events-none'
                  style={{
                    backgroundImage: isDarkMode
                      ? `repeating-linear-gradient(0deg, rgba(244, 244, 245, 0.3) 0px, transparent 1px, transparent 20px),
                         repeating-linear-gradient(90deg, rgba(244, 244, 245, 0.3) 0px, transparent 1px, transparent 20px)`
                      : `repeating-linear-gradient(0deg, rgba(24, 24, 27, 0.5) 0px, transparent 1px, transparent 20px),
                         repeating-linear-gradient(90deg, rgba(24, 24, 27, 0.5) 0px, transparent 1px, transparent 20px)`
                  }}
                />
                
                {/* 缩放比例显示 - 左上角 */}
                <div 
                  className="absolute left-4 top-4 px-3 py-1.5 text-xs font-semibold rounded-lg pointer-events-none backdrop-blur-sm border z-50"
                  style={{
                    opacity: showScaleIndicator ? 1 : 0,
                    transform: showScaleIndicator ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 0.9)' : 'rgba(244, 244, 245, 0.9)',
                    borderColor: isDarkMode ? 'rgba(63, 63, 70, 1)' : 'rgba(228, 228, 231, 1)',
                    color: isDarkMode ? 'rgba(250, 250, 250, 1)' : 'rgba(24, 24, 27, 1)'
                  }}
                >
                  {Math.round(scale * 100)}%
                </div>
                
                {/* react-zoom-pan-pinch 包装器 */}
                <div style={{ 
                  width: '100%', 
                  height: '100%',
                  position: 'relative'
                }}>
                  <TransformWrapper
                    ref={transformWrapperRef}
                    initialScale={1}
                    minScale={0.01}
                    maxScale={5}
                    centerOnInit
                    limitToBounds={false}
                    disablePadding={true}
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
                        setScale(ref.state.scale)
                      }
                    }}
                  >
                    <TransformComponent
                      wrapperClass="w-full! h-full!"
                      contentClass="w-full! h-full! flex items-center justify-center"
                      contentStyle={{
                        transition: 'transform 0.3s ease-out',
                        willChange: 'transform'
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="Screenshot Preview"
                        className="object-contain"
                        draggable={false}
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))'
                        }}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-divider shrink-0" style={{ backgroundColor: isDarkMode ? 'hsl(var(--heroui-content1))' : 'hsl(var(--heroui-content1))' }}>
              <div className="flex flex-1 gap-4 items-center">
                <div className="text-xs text-foreground-500 font-medium">
                  滚轮缩放 • 拖拽移动 • 双击适应
                </div>
                <div className="flex items-center gap-3">
                  {/* 水印开关 */}
                  <Switch
                    size="sm"
                    isSelected={watermarkEnabled}
                    onValueChange={handleWatermarkChange}
                    classNames={{
                      wrapper: 'group-data-[selected=true]:bg-primary'
                    }}
                  >
                    <span className='text-xs font-medium text-foreground-600'>
                      {watermarkEnabled ? '水印已启用' : '水印已关闭'}
                    </span>
                  </Switch>
                  
                  {/* 临时深色模式开关 */}
                  <Switch
                    size="sm"
                    isSelected={tempDarkMode}
                    onValueChange={handleTempDarkModeChange}
                    classNames={{
                      wrapper: 'group-data-[selected=true]:bg-secondary'
                    }}
                    startContent={<Sun className='w-3 h-3' />}
                    endContent={<Moon className='w-3 h-3' />}
                  >
                    <span className='text-xs font-medium text-foreground-600'>
                      {tempDarkMode ? '深色主题' : '浅色主题'}
                    </span>
                  </Switch>
                </div>
              </div>
              <Button
                variant="flat"
                onPress={handleRetake}
                isDisabled={isCapturing || !onRetakeScreenshot}
                isLoading={isCapturing}
                startContent={!isCapturing && <Camera className="w-4 h-4" />}
                className="transition-colors duration-200 cursor-pointer"
              >
                {isCapturing ? '截图中...' : '重新截图'}
              </Button>
              <Button
                variant="flat"
                onPress={handleFitToCanvas}
                startContent={<Maximize className="w-4 h-4" />}
                className="transition-colors duration-200 cursor-pointer"
              >
                适应画布
              </Button>
              <Button 
                color="danger"
                variant="flat" 
                onPress={onClose}
                startContent={<X className="w-4 h-4" />}
                className="transition-colors duration-200 cursor-pointer"
              >
                关闭
              </Button>
              <Button 
                color="primary"
                variant="flat" 
                onPress={handleCopy}
                startContent={<Copy className="w-4 h-4" />}
                className="transition-colors duration-200 cursor-pointer"
              >
                复制
              </Button>
              <Button 
                color="success"
                onPress={handleDownload}
                startContent={<Download className="w-4 h-4" />}
                className="transition-colors duration-200 cursor-pointer"
              >
                下载
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
