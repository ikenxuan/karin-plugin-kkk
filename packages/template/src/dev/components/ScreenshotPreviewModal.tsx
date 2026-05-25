import { Button, Label, Modal, Switch, toast } from '@heroui/react'
import { Camera, Copy, Download, Maximize, Moon, Sun, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { type ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

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
  /** 面板主题变量 */
  panelThemeStyle?: React.CSSProperties
}

export const ScreenshotPreviewModal: React.FC<ScreenshotPreviewModalProps> = ({
  isOpen,
  onClose,
  screenshotResult,
  isDarkMode = false,
  onRetakeScreenshot,
  isCapturing = false,
  componentDarkMode = false,
  panelThemeStyle
}) => {
  const [scale, setScale] = useState(1)
  const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [showScaleIndicator, setShowScaleIndicator] = useState(false)
  const scaleIndicatorTimeoutRef = useRef<number | null>(null)

  const [watermarkEnabled, setWatermarkEnabledState] = useState(() => getWatermarkEnabled())
  const [tempDarkMode, setTempDarkMode] = useState(componentDarkMode)

  const actionButtonClass = 'h-9 rounded-2xl border border-border bg-default text-foreground shadow-none hover:bg-default-hover'
  const primaryActionClass = 'h-9 rounded-2xl bg-accent text-accent-foreground shadow-none hover:bg-accent-hover'

  useEffect(() => {
    if (isOpen) {
      setTempDarkMode(componentDarkMode)
    }
  }, [componentDarkMode, isOpen])

  useEffect(() => {
    if (!isOpen) {
      setTempDarkMode(componentDarkMode)
    }
  }, [componentDarkMode, isOpen])

  const imageUrl = React.useMemo(() => {
    if (!screenshotResult) return ''
    return URL.createObjectURL(screenshotResult.blob)
  }, [screenshotResult])

  useEffect(() => {
    if (!imageUrl) return

    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  const handleFitToCanvas = useCallback(() => {
    if (!transformWrapperRef.current) return
    transformWrapperRef.current.resetTransform(300, 'easeOut')
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => {
      const container = transformWrapperRef.current?.instance?.wrapperComponent
      if (!container) return

      const handleDoubleClick = (event: MouseEvent) => {
        event.preventDefault()
        handleFitToCanvas()
      }

      container.addEventListener('dblclick', handleDoubleClick)

      return () => {
        container.removeEventListener('dblclick', handleDoubleClick)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [handleFitToCanvas, isOpen])

  useEffect(() => {
    if (!isOpen) return

    const container = containerRef.current
    if (!container) return

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()

      const transformRef = transformWrapperRef.current
      const instance = transformRef?.instance
      const transformState = transformRef?.state
      if (!instance || !transformState || !transformRef) return

      const delta = -event.deltaY * 0.001
      const scaleFactor = 1 + delta
      const newScale = Math.min(Math.max(transformState.scale * scaleFactor, 0.01), 5)

      const rect = container.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      const { positionX, positionY, scale } = transformState
      const scaleDiff = newScale - scale

      const newPositionX = positionX - (mouseX - positionX) * (scaleDiff / scale)
      const newPositionY = positionY - (mouseY - positionY) * (scaleDiff / scale)

      transformRef.setTransform(newPositionX, newPositionY, newScale, 0, 'easeOut')

      setShowScaleIndicator(true)

      if (scaleIndicatorTimeoutRef.current !== null) {
        clearTimeout(scaleIndicatorTimeoutRef.current)
      }

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
    toast.success('下载成功', {
      description: '图片已保存到本地'
    })
    onClose()
  }

  const handleCopy = async () => {
    try {
      await screenshotResult.copyToClipboard()
      toast.success('复制成功', {
        description: '图片已复制到剪贴板'
      })
      onClose()
    } catch {
      toast.danger('复制失败', {
        description: '无法复制到剪贴板，请尝试下载'
      })
    }
  }

  const handleWatermarkChange = (checked: boolean) => {
    setWatermarkEnabledState(checked)
    setWatermarkEnabled(checked)
  }

  const handleTempDarkModeChange = (checked: boolean) => {
    setTempDarkMode(checked)
  }

  const handleRetake = async () => {
    if (onRetakeScreenshot && !isCapturing) {
      await onRetakeScreenshot(tempDarkMode)
    }
  }

  const renderSwitch = (
    checked: boolean,
    onChange: (checked: boolean) => void,
    label: string,
    icon: React.ReactNode
  ) => (
    <Switch className='gap-4' isSelected={checked} onChange={onChange} size='lg'>
      <Switch.Control>
        <Switch.Thumb>
          <Switch.Icon>{icon}</Switch.Icon>
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Content>
        <Label className='text-xs font-medium text-foreground/70'>{label}</Label>
      </Switch.Content>
    </Switch>
  )

  return (
    <Modal.Backdrop
      className={`${isDarkMode ? 'dark' : 'light'} bg-black/48 dark:bg-black/72`}
      data-theme={isDarkMode ? 'dark' : 'light'}
      isDismissable
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
      style={panelThemeStyle}
      variant='blur'
    >
      <Modal.Container className='' size='cover'>
        <Modal.Dialog
          className='flex h-[min(92vh,1100px)] max-h-[92vh] flex-col overflow-hidden rounded-4xl border border-border bg-surface shadow-lg'
        >
          <Modal.Body className='flex-1 overflow-hidden'>
            <div
              ref={containerRef}
              className='relative h-full overflow-hidden rounded-3xl border border-border bg-background'
            >
              <div
                className='pointer-events-none absolute inset-0 opacity-60'
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, color-mix(in oklab, var(--separator) 88%, transparent) 0px, transparent 1px, transparent 22px), repeating-linear-gradient(90deg, color-mix(in oklab, var(--separator) 88%, transparent) 0px, transparent 1px, transparent 22px)'
                }}
              />

              <div
                className='pointer-events-none absolute left-4 top-4 z-50 rounded-2xl border border-border bg-surface/90 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm'
                style={{
                  opacity: showScaleIndicator ? 1 : 0,
                  transform: showScaleIndicator ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {Math.round(scale * 100)}%
              </div>

              <div className='relative h-full w-full'>
                <TransformWrapper
                  ref={transformWrapperRef}
                  centerOnInit
                  disablePadding
                  doubleClick={{
                    disabled: true
                  }}
                  initialScale={1}
                  limitToBounds={false}
                  maxScale={5}
                  minScale={0.01}
                  onTransform={(_ref, state) => {
                    if (state.scale !== scale) {
                      setScale(state.scale)
                    }
                  }}
                  panning={{
                    velocityDisabled: false,
                    disabled: false
                  }}
                  wheel={{
                    step: 0.02,
                    disabled: true
                  }}
                >
                  <TransformComponent
                    contentClass='flex h-full! w-full! items-center justify-center'
                    contentStyle={{
                      transition: 'transform 0.3s ease-out',
                      willChange: 'transform'
                    }}
                    wrapperClass='h-full! w-full!'
                  >
                    <img
                      alt='Screenshot Preview'
                      className='object-contain'
                      draggable={false}
                      src={imageUrl}
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        filter: 'drop-shadow(0 30px 80px rgba(0, 0, 0, 0.22))'
                      }}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className='flex flex-col gap-4 border-t border-border bg-surface/88 px-4 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-wrap items-center gap-3'>
              {/* <div className='text-xs font-medium text-muted'>
                滚轮缩放 · 拖拽移动 · 双击适应
              </div> */}
              {renderSwitch(
                watermarkEnabled,
                handleWatermarkChange,
                watermarkEnabled ? '水印已启用' : '水印已关闭',
                watermarkEnabled ? <Camera size={12} /> : <X size={12} />
              )}
              {renderSwitch(
                tempDarkMode,
                handleTempDarkModeChange,
                tempDarkMode ? '深色主题' : '浅色主题',
                tempDarkMode ? <Moon size={12} /> : <Sun size={12} />
              )}
            </div>

            <div className='flex flex-wrap items-center justify-end gap-2'>
              <Button
                className={actionButtonClass}
                isDisabled={isCapturing || !onRetakeScreenshot}
                isPending={isCapturing}
                onPress={handleRetake}
                size='lg'
                variant='secondary'
              >
                {({ isPending }) => (
                  <>
                    {!isPending && <Camera size={16} />}
                    {isPending ? '截图中...' : '重新截图'}
                  </>
                )}
              </Button>

              <Button
                className={actionButtonClass}
                onPress={handleFitToCanvas}
                size='lg'
                variant='secondary'
              >
                <Maximize size={16} />
                适应画布
              </Button>

              <Button
                className={actionButtonClass}
                onPress={handleCopy}
                size='lg'
                variant='secondary'
              >
                <Copy size={16} />
                复制
              </Button>

              <Button
                className={primaryActionClass}
                onPress={handleDownload}
                size='lg'
                variant='secondary'
              >
                <Download size={16} />
                下载
              </Button>

              <Button
                className={actionButtonClass}
                onPress={onClose}
                size='lg'
                variant='secondary'
              >
                <X size={16} />
                关闭
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
