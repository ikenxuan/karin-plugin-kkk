import {
  Button,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  Label,
  Modal,
  parseColor
} from '@heroui/react'
import React from 'react'

import { Icon } from '../../components/common/Icon'

interface PanelThemeControlsProps {
  isOpen: boolean
  panelTheme: 'light' | 'dark'
  isDarkMode: boolean
  panelAccent: string
  isMonochromeAccent: boolean
  panelThemeStyle: React.CSSProperties
  onOpenChange: (isOpen: boolean) => void
  onAccentChange: (hex: string) => void
  onResetAccent: () => void
  onThemeModeChange: (isDarkMode: boolean) => void
}

const accentPresets = [
  '#111111',
  '#3f3f46',
  '#0a72ef',
  '#de1d8d',
  '#ff5b4f'
]

export const PanelThemeControls: React.FC<PanelThemeControlsProps> = ({
  isOpen,
  panelTheme,
  isDarkMode,
  panelAccent,
  isMonochromeAccent,
  panelThemeStyle,
  onOpenChange,
  onAccentChange,
  onResetAccent,
  onThemeModeChange
}) => {
  return (
    <Modal.Backdrop
      className={panelTheme}
      data-theme={panelTheme}
      isDismissable
      isOpen={isOpen}
      style={panelThemeStyle}
      variant='blur'
      onOpenChange={onOpenChange}
    >
      <Modal.Container className='p-4 sm:p-6' placement='center' size='sm'>
        <Modal.Dialog className='sm:max-w-120'>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className='bg-default text-foreground'>
              <Icon icon="lucide:palette" className='size-5' />
            </Modal.Icon>
            <Modal.Heading>面板主题</Modal.Heading>
          </Modal.Header>

          <Modal.Body className='space-y-6'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-foreground'>默认是 Next.js 风格的黑白基底。</p>
              <p className='text-sm text-muted'>只在你主动设置时，才为开发面板启用自定义主色。</p>
            </div>

            <div className='space-y-3'>
              <Label className='text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>
                Mode
              </Label>
              <div className='grid grid-cols-2 gap-2'>
                <Button onPress={() => onThemeModeChange(false)} variant={isDarkMode ? 'secondary' : 'primary'}>
                  <Icon icon="lucide:sun" className='size-4' />
                  浅色
                </Button>
                <Button onPress={() => onThemeModeChange(true)} variant={isDarkMode ? 'primary' : 'secondary'}>
                  <Icon icon="lucide:moon" className='size-4' />
                  深色
                </Button>
              </div>
            </div>

            <div className='space-y-3'>
              <div className='flex items-center justify-between gap-3'>
                <Label className='text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>
                  Accent
                </Label>
                <span className='text-xs font-medium text-muted'>
                  {isMonochromeAccent ? '默认黑白' : panelAccent.toUpperCase()}
                </span>
              </div>

              <ColorSwatchPicker
                aria-label='面板主题预设色'
                className='flex flex-wrap gap-2'
                size='sm'
                value={parseColor(panelAccent)}
                variant='square'
                onChange={(color) => onAccentChange(color.toString('hex'))}
              >
                {accentPresets.map((color) => (
                  <ColorSwatchPicker.Item key={color} color={color}>
                    <ColorSwatchPicker.Swatch />
                    <ColorSwatchPicker.Indicator />
                  </ColorSwatchPicker.Item>
                ))}
              </ColorSwatchPicker>
            </div>

            <ColorPicker value={parseColor(panelAccent)} onChange={(color) => onAccentChange(color.toString('hex'))}>
              <ColorPicker.Trigger className='flex w-full items-center gap-3 rounded-2xl bg-default px-3 py-3 text-left'>
                <ColorSwatch className='rounded-lg' size='lg' />
                <div className='flex min-w-0 flex-1 flex-col'>
                  <Label className='text-sm font-medium text-foreground'>自定义主色</Label>
                  <span className='truncate text-xs text-muted'>{panelAccent.toUpperCase()}</span>
                </div>
              </ColorPicker.Trigger>

              <ColorPicker.Popover className='p-0'>
                <div
                  className={`${panelTheme} flex w-72 flex-col gap-3 rounded-2xl bg-overlay p-3`}
                  data-theme={panelTheme}
                  style={panelThemeStyle}
                >
                  <ColorArea
                    aria-label='颜色选择区域'
                    className='max-w-full'
                    colorSpace='hsb'
                    xChannel='saturation'
                    yChannel='brightness'
                  >
                    <ColorArea.Thumb />
                  </ColorArea>

                  <ColorSlider aria-label='色相滑块' channel='hue' className='gap-1' colorSpace='hsb'>
                    <Label className='text-xs font-medium text-foreground'>Hue</Label>
                    <ColorSlider.Output className='text-xs text-muted' />
                    <ColorSlider.Track>
                      <ColorSlider.Thumb />
                    </ColorSlider.Track>
                  </ColorSlider>

                  <ColorField aria-label='主题色数值'>
                    <ColorField.Group variant='secondary'>
                      <ColorField.Prefix>
                        <ColorSwatch size='xs' />
                      </ColorField.Prefix>
                      <ColorField.Input />
                    </ColorField.Group>
                  </ColorField>
                </div>
              </ColorPicker.Popover>
            </ColorPicker>
          </Modal.Body>

          <Modal.Footer>
            <Button
              isDisabled={isMonochromeAccent}
              onPress={onResetAccent}
              variant='secondary'
            >
              <Icon icon="lucide:rotate-ccw" className='size-4' />
              恢复黑白
            </Button>
            <Button onPress={() => onOpenChange(false)}>
              完成
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
