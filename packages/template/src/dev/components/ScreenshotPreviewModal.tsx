import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { Copy, Download, Maximize, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface ScreenshotPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  screenshotResult: {
    blob: Blob
    download: () => void
    copyToClipboard: () => Promise<void>
  } | null
}

export const ScreenshotPreviewModal: React.FC<ScreenshotPreviewModalProps> = ({
  isOpen,
  onClose,
  screenshotResult
}) => {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

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

  // 使用非被动事件监听器来解决 passive event listener warning
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // 计算鼠标相对于图片中心的偏移量
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      // 当前鼠标在图片坐标系中的位置
      const mouseImageX = (mouseX - centerX - position.x) / scale
      const mouseImageY = (mouseY - centerY - position.y) / scale

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
      const newScale = Math.max(0.1, Math.min(5, scale * zoomFactor))
      
      const newX = mouseX - centerX - mouseImageX * newScale
      const newY = mouseY - centerY - mouseImageY * newScale

      setScale(newScale)
      setPosition({ x: newX, y: newY })
    }

    container.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', onWheel)
    }
  }, [scale, position, screenshotResult])

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

  const handleFitToCanvas = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="5xl"
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              截图预览
            </ModalHeader>
            <ModalBody className="overflow-hidden">
              <div 
                ref={containerRef}
                className="flex justify-center items-center w-full h-[60vh] bg-gray-50/50 rounded-lg border border-dashed border-gray-200 overflow-hidden cursor-move relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Screenshot Preview"
                  className="object-contain max-w-none shadow-sm transition-transform duration-75"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  draggable={false}
                />
                
                <div className="absolute right-4 bottom-4 px-2 py-1 text-xs text-white rounded pointer-events-none bg-black/50">
                  {Math.round(scale * 100)}%
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex-1 text-xs text-gray-500">
                滚轮缩放 • 拖拽移动
              </div>
              <Button
                color="primary"
                variant="light"
                onPress={handleFitToCanvas}
                startContent={<Maximize className="w-4 h-4" />}
              >
                适应画布
              </Button>
              <Button 
                color="danger" 
                variant="light" 
                onPress={onClose}
                startContent={<X className="w-4 h-4" />}
              >
                关闭
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                onPress={handleCopy}
                startContent={<Copy className="w-4 h-4" />}
              >
                复制
              </Button>
              <Button 
                color="success" 
                onPress={handleDownload}
                startContent={<Download className="w-4 h-4" />}
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
