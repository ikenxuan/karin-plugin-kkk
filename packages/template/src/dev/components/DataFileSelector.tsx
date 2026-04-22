import { Button, Card, Chip, Label, ListBox, Select } from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'

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
      className='w-full rounded-xl border border-border shadow-none'
      variant='default'
    >
      <Card.Header className='flex-col items-start gap-3 px-4 pb-3 pt-4'>
        <div className='flex w-full items-start justify-between gap-3'>
          <div className='flex items-center gap-2.5'>
            <div className='flex size-7 items-center justify-center rounded-lg border border-border bg-background text-foreground'>
              <Icon icon="lucide:file-text" className='h-4 w-4' />
            </div>
            <div>
              <Card.Title className='text-sm font-semibold text-foreground'>数据文件</Card.Title>
              <Card.Description className='mt-1 text-xs text-muted'>
                切换并编辑当前模板使用的 mock 数据
              </Card.Description>
            </div>
          </div>
          <Chip className='shrink-0 text-[10px] font-semibold tracking-[0.16em] uppercase' size='sm' variant='soft'>
            {availableDataFiles.length} Files
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
          <Select.Trigger className='rounded-lg px-3 py-2.5'>
            <Select.Value className='text-sm font-medium text-foreground' />
            <Select.Indicator className='text-muted' />
          </Select.Trigger>
          <Select.Popover className='p-0'>
            <div className={panelTheme} data-theme={panelTheme} style={panelThemeStyle}>
              <ListBox className='rounded-lg p-1'>
                {availableDataFiles.map((filename) => {
                  const label = formatFileName(filename)

                  return (
                    <ListBox.Item
                      key={filename}
                      className='rounded-md px-3 py-2 text-sm'
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

      <Card.Footer className='px-4 pb-4 pt-0'>
        <Button
          className='w-full justify-center rounded-lg'
          isDisabled={!onEdit}
          onPress={onEdit}
          size='sm'
          variant='primary'
        >
          <Icon icon="lucide:edit" className='h-3.5 w-3.5' />
          编辑数据
        </Button>
      </Card.Footer>
    </Card>
  )
}
