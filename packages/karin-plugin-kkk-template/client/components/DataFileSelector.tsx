import { Card, CardBody, CardHeader, Select, SelectItem } from '@heroui/react'
import { FileText } from 'lucide-react'
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
}

/**
 * 数据文件选择器组件
 */
export const DataFileSelector: React.FC<DataFileSelectorProps> = ({
  availableDataFiles,
  selectedDataFile,
  onDataFileChange,
  onRefreshFiles
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
      <Card className='w-full'>
        <CardHeader className='pb-2'>
          <div className='flex gap-2 items-center'>
            <FileText className='w-4 h-4' />
            <h3 className='text-lg font-semibold'>数据文件</h3>
          </div>
        </CardHeader>
        <CardBody className='pt-0 space-y-3'>
          {/* 文件选择器 */}
          <div className='flex gap-2 items-end'>
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
                trigger: 'bg-white border-gray-300 text-gray-900 data-[hover=true]:border-gray-400',
                value: 'text-gray-900',
                listbox: 'bg-white',
                popoverContent: 'bg-white border border-gray-200'
              }}
            >
              {availableDataFiles.map((filename) => (
                <SelectItem
                  key={filename}
                  className='text-gray-900 data-[hover=true]:bg-gray-100 data-[selected=true]:bg-blue-50'
                >
                  {formatFileName(filename)}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
