import { Button, Label, Modal, Switch, toast } from '@heroui/react'
import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { type ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { Icon } from '../../components/common/Icon'
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
  const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [showScaleIndicator, setShowScaleIndicator] = useState(false)
  const scaleIndicatorTimeoutRef = useRef<number | null>(null)

  const [watermarkEnabled, setWatermarkEnabledState] = useState(() => getWatermarkEnabled())
  const [tempDarkMode, setTempDarkMode] = useState(componentDarkMode)

  const actionButtonClass = 'h-9 rounded-2xl border border-black/10 bg-black/3 text-foreground shadow-none hover:bg-black/5 dark:border-white/10 dark:bg-white/4 dark:hover:bg-white/6'
  const primaryActionClass = 'h-9 rounded-2xl border border-black bg-black text-white shadow-none hover:bg-black/90 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/90'

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

  const previewSurface = isDarkMode ? '#050505' : '#ffffff'
  const previewBorder = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'
  const scaleBadgeBg = isDarkMode ? 'rgba(9, 9, 11, 0.9)' : 'rgba(255, 255, 255, 0.9)'
  const scaleBadgeBorder = isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)'
  const scaleBadgeText = isDarkMode ? 'rgba(250,250,250,1)' : 'rgba(15,23,42,1)'

  const renderSwitch = (
    checked: boolean,
    onChange: (checked: boolean) => void,
    label: string,
    icon: React.ReactNode
  ) => (
    <Switch className='gap-3' isSelected={checked} onChange={onChange} size='sm'>
      {({ isSelected }) => (
        <>
          <Switch.Control
            className={clsx(
              'border transition-colors',
              isSelected
                ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                : 'border-black/10 bg-black/6 text-foreground/60 dark:border-white/10 dark:bg-white/8 dark:text-white/60'
            )}
          >
            <Switch.Thumb className='border border-black/8 bg-white shadow-sm dark:border-white/10 dark:bg-black'>
              <Switch.Icon>{icon}</Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
          <Switch.Content>
            <Label className='text-xs font-medium text-foreground/70'>{label}</Label>
          </Switch.Content>
        </>
      )}
    </Switch>
  )

  return (
    <Modal.Backdrop
      className='bg-black/48 dark:bg-black/72'
      isDismissable
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
      variant='blur'
    >
      <Modal.Container className='p-4 sm:p-6' size='cover'>
        <Modal.Dialog
          className={`flex h-[min(92vh,1100px)] max-h-[92vh] flex-col overflow-hidden rounded-4xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_28px_84px_rgba(0,0,0,0.55)] ${isDarkMode ? 'dark' : 'light'}`}
        >
          <Modal.Body className='flex-1 overflow-hidden p-4 sm:p-5'>
            <div
              ref={containerRef}
              className='relative h-full overflow-hidden rounded-[28px] border'
              style={{
                backgroundColor: previewSurface,
                borderColor: previewBorder
              }}
            >
              <div
                className='pointer-events-none absolute inset-0 opacity-60'
                style={{
                  backgroundImage: isDarkMode
                    ? 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 22px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 22px)'
                    : 'repeating-linear-gradient(0deg, rgba(15,23,42,0.04) 0px, transparent 1px, transparent 22px), repeating-linear-gradient(90deg, rgba(15,23,42,0.04) 0px, transparent 1px, transparent 22px)'
                }}
              />

              <div
                className='pointer-events-none absolute left-4 top-4 z-50 rounded-2xl border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm'
                style={{
                  opacity: showScaleIndicator ? 1 : 0,
                  transform: showScaleIndicator ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: scaleBadgeBg,
                  borderColor: scaleBadgeBorder,
                  color: scaleBadgeText
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

          <Modal.Footer className='flex flex-col gap-4 border-t border-black/8 bg-white/88 px-4 py-4 dark:border-white/10 dark:bg-zinc-950/88 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-wrap items-center gap-3'>
              <div className='text-xs font-medium text-muted'>
                滚轮缩放 · 拖拽移动 · 双击适应
              </div>
              {renderSwitch(
                watermarkEnabled,
                handleWatermarkChange,
                watermarkEnabled ? '水印已启用' : '水印已关闭',
                watermarkEnabled ? <Icon icon="lucide:camera" className='h-3 w-3' /> : <Icon icon="lucide:x" className='h-3 w-3' />
              )}
              {renderSwitch(
                tempDarkMode,
                handleTempDarkModeChange,
                tempDarkMode ? '深色主题' : '浅色主题',
                tempDarkMode ? <Icon icon="lucide:moon" className='h-3 w-3' /> : <Icon icon="lucide:sun" className='h-3 w-3' />
              )}
            </div>

            <div className='flex flex-wrap items-center justify-end gap-2'>
              <Button
                className={actionButtonClass}
                isDisabled={isCapturing || !onRetakeScreenshot}
                isPending={isCapturing}
                onPress={handleRetake}
                size='sm'
                variant='secondary'
              >
                {({ isPending }) => (
                  <>
                    {!isPending && <Icon icon="lucide:camera" className='h-4 w-4' />}
                    {isPending ? '截图中...' : '重新截图'}
                  </>
                )}
              </Button>

              <Button
                className={actionButtonClass}
                onPress={handleFitToCanvas}
                size='sm'
                variant='secondary'
              >
                <Icon icon="lucide:maximize" className='h-4 w-4' />
                适应画布
              </Button>

              <Button
                className={actionButtonClass}
                onPress={handleCopy}
                size='sm'
                variant='secondary'
              >
                <Icon icon="lucide:copy" className='h-4 w-4' />
                复制
              </Button>

              <Button
                className={primaryActionClass}
                onPress={handleDownload}
                size='sm'
                variant='secondary'
              >
                <Icon icon="lucide:download" className='h-4 w-4' />
                下载
              </Button>

              <Button
                className={actionButtonClass}
                onPress={onClose}
                size='sm'
                variant='secondary'
              >
                <Icon icon="lucide:x" className='h-4 w-4' />
                关闭
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
