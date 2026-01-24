import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/react'
import { Copy, Download, Maximize, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

interface ScreenshotPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  screenshotResult: {
    blob: Blob
    download: () => void
    copyToClipboard: () => Promise<void>
  } | null
  isDarkMode?: boolean
}

export const ScreenshotPreviewModal: React.FC<ScreenshotPreviewModalProps> = ({
  isOpen,
  onClose,
  screenshotResult,
  isDarkMode = false
}) => {
  const [scale, setScale] = useState(1)
  const transformWrapperRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 缩放提示显示状态
  const [showScaleIndicator, setShowScaleIndicator] = useState(false)
  const scaleIndicatorTimeoutRef = useRef<number | null>(null)

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
              <div className="flex-1 text-xs text-foreground-500 font-medium">
                滚轮缩放 • 拖拽移动 • 双击适应
              </div>
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
