import { Button, Card, Chip, Label, ListBox, Select } from '@heroui/react'
import React, { useEffect } from 'react'

import { Icon } from '../../components/common/Icon'

interface DataFileSelectorProps {
  /** 可用的数据文件列表 */
  availableDataFiles: string[]
  /** 当前选中的数据文件 */
  selectedDataFile: string
  /** 数据文件变更回调 */
  onDataFileChange: (filename: string) => void
  /** 保存新数据文件回调 */
  onSaveNewDataFile: (filename: string, jsonData: any) => void
  /** 刷新数据文件列表的回调 */
  onRefreshFiles?: () => void
  /** 编辑当前数据回调 */
  onEdit?: () => void
  /** 通过 AI 生成数据回调 */
  onAIGenerate?: () => void
  /** 是否深色模式 */
  isDarkMode?: boolean
  /** 面板主题名 */
  panelTheme?: 'light' | 'dark'
  /** 面板主题变量 */
  panelThemeStyle?: React.CSSProperties
}

/**
 * 数据文件选择器组件
 */
export const DataFileSelector: React.FC<DataFileSelectorProps> = ({
  availableDataFiles,
  selectedDataFile,
  onDataFileChange,
  onRefreshFiles,
  onEdit,
  onAIGenerate,
  panelTheme = 'light',
  panelThemeStyle
}) => {
  /**
   * 监听 WebSocket 事件，自动刷新文件列表
   */
  useEffect(() => {
    const handleMessage = (event: Event) => {
      const messageEvent = event as CustomEvent
      if (messageEvent.detail?.type === 'custom' && messageEvent.detail?.event === 'dev-data-updated') {
        onRefreshFiles?.()
      }
    }

    if (import.meta.hot) {
      import.meta.hot.on('dev-data-updated', () => {
        onRefreshFiles?.()
      })
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [onRefreshFiles])

  const formatFileName = (filename: string) => filename.replace('.json', '')
  return (
    <Card
      className='w-full border border-border shadow-none'
      variant='default'
    >
      <Card.Header className='flex-col items-start gap-3 px-4 pb-3 pt-4'>
        <div className='flex w-full items-start justify-between gap-3'>
          <div className='flex items-center gap-2.5'>
            <div>
              <Card.Title className='text-sm font-semibold text-foreground'>数据文件</Card.Title>
              <Card.Description className='mt-1 text-xs text-muted'>
                切换并编辑当前模板使用的 mock 数据
              </Card.Description>
            </div>
          </div>
          <Chip className='shrink-0 tracking-[0.16em] uppercase' size='md' variant='soft'>
            加载了 {availableDataFiles.length} 个数据文件
          </Chip>
        </div>
      </Card.Header>

      <Card.Content className='px-4 pb-4'>
        <Select
          className='w-full'
          isDisabled={availableDataFiles.length === 0}
          placeholder='选择预设数据'
          value={selectedDataFile && availableDataFiles.includes(selectedDataFile) ? selectedDataFile : null}
          variant='secondary'
          onChange={(value) => {
            if (typeof value === 'string' && value) {
              onDataFileChange(value)
            }
          }}
        >
          <Label className='mb-2 text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>
            选择数据文件
          </Label>
          <Select.Trigger className='px-3 py-2.5'>
            <Select.Value className='text-sm font-medium text-foreground' />
            <Select.Indicator className='text-muted' />
          </Select.Trigger>
          <Select.Popover className='p-0'>
            <div className={panelTheme} data-theme={panelTheme} style={panelThemeStyle}>
              <ListBox className='p-1'>
                {availableDataFiles.map((filename) => {
                  const label = formatFileName(filename)

                  return (
                    <ListBox.Item
                      key={filename}
                      className='px-3 py-2 text-sm'
                      id={filename}
                      textValue={label}
                    >
                      {label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  )
                })}
              </ListBox>
            </div>
          </Select.Popover>
        </Select>
      </Card.Content>

      <Card.Footer className='flex flex-col gap-2 px-4 pb-4 pt-0'>
        <Button
          className='w-full justify-center'
          isDisabled={!onAIGenerate}
          onPress={onAIGenerate}
          size='md'
          variant='secondary'
        >
          <Icon icon="lucide:sparkles" className='h-3.5 w-3.5' />
          AI 生成
        </Button>
        <Button
          className='w-full justify-center'
          isDisabled={!onEdit}
          onPress={onEdit}
          size='md'
          variant='primary'
        >
          <Icon icon="lucide:edit" className='h-3.5 w-3.5' />
          编辑数据
        </Button>
      </Card.Footer>
    </Card>
  )
}
