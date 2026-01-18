import { Button, Card, CardBody, CardHeader, Select, SelectItem } from '@heroui/react'
import { Edit, FileText } from 'lucide-react'
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
  isDarkMode = false
}) => {

  /**
   * 监听 WebSocket 事件，自动刷新文件列表
   */
  useEffect(() => {
    const handleMessage = (event: Event) => {
      const messageEvent = event as CustomEvent
      if (messageEvent.detail?.type === 'custom' && messageEvent.detail?.event === 'dev-data-updated') {
        // 数据文件已更新，刷新文件列表
        onRefreshFiles?.()
      }
    }

    // 监听 Vite HMR 事件
    if (import.meta.hot) {
      import.meta.hot.on('dev-data-updated', () => {
        onRefreshFiles?.()
      })
    }

    // 备用：监听通用消息事件
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [onRefreshFiles])

  /**
   * 格式化文件名显示（移除 .json 后缀）
   */
  const formatFileName = (filename: string) => {
    return filename.replace('.json', '')
  }

  return (
    <>
      <Card className='w-full bg-content2/60 backdrop-blur-md border border-divider shadow-sm' shadow='none'>
        <CardHeader className='pb-2 pt-2.5'>
          <div className='flex gap-2 items-center'>
            <FileText className='w-4 h-4 text-foreground-600' />
            <h3 className='text-sm font-semibold text-foreground'>数据文件</h3>
          </div>
        </CardHeader>
        <CardBody className='pt-0 space-y-2.5 px-3 pb-3'>
          {/* 文件选择器 */}
          <div className='flex flex-col gap-2.5'>
            <Select
              label='选择数据文件'
              placeholder='选择预设数据'
              selectedKeys={selectedDataFile && availableDataFiles.includes(selectedDataFile) ? [selectedDataFile] : []}
              onSelectionChange={(keys) => {
                const key = Array.from(keys)[0] as string
                if (key) {
                  onDataFileChange(key)
                }
              }}
              className='flex-1'
              size='sm'
              variant='bordered'
              classNames={{
                label: 'text-xs font-semibold text-foreground-500 uppercase tracking-wide',
                trigger: 'bg-content3/50 border-divider hover:border-default-300 hover:bg-content3 transition-colors duration-200',
                value: 'text-sm text-foreground font-medium'
              }}
              popoverProps={{
                classNames: {
                  content: isDarkMode ? 'dark bg-content1' : 'bg-content1'
                }
              }}
            >
              {availableDataFiles.map((filename) => (
                <SelectItem key={filename} className='text-foreground'>
                  {formatFileName(filename)}
                </SelectItem>
              ))}
            </Select>
            <Button
              color="primary"
              variant="flat"
              onPress={onEdit}
              size="sm"
              startContent={<Edit className="w-3.5 h-3.5" />}
              className="w-full transition-colors duration-200 cursor-pointer"
              title="编辑当前数据"
            >
              编辑数据
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
