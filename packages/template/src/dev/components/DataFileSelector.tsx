import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from '@heroui/react'
import { FileText, Plus } from 'lucide-react'
import React, { useState } from 'react'

interface DataFileSelectorProps {
  /** 可用的数据文件列表 */
  availableDataFiles: string[]
  /** 当前选中的数据文件 */
  selectedDataFile: string
  /** 数据文件变更回调 */
  onDataFileChange: (filename: string) => void
  /** 保存新数据文件回调 */
  onSaveNewDataFile: (filename: string, jsonData: any) => void
}

/**
 * 数据文件选择器组件
 */
export const DataFileSelector: React.FC<DataFileSelectorProps> = ({
  availableDataFiles,
  selectedDataFile,
  onDataFileChange,
  onSaveNewDataFile
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newFileName, setNewFileName] = useState('')
  const [jsonContent, setJsonContent] = useState('{\n  \n}')
  const [jsonError, setJsonError] = useState('')

  /**
   * 验证并保存新文件
   */
  const handleSaveNewFile = () => {
    if (!newFileName.trim()) {
      setJsonError('请输入文件名')
      return
    }

    try {
      const parsedData = JSON.parse(jsonContent)
      onSaveNewDataFile(newFileName.trim(), parsedData)
      handleClose()
    } catch {
      setJsonError('JSON 格式错误，请检查')
    }
  }

  /**
   * 关闭弹窗并重置状态
   */
  const handleClose = () => {
    setNewFileName('')
    setJsonContent('{\n  \n}')
    setJsonError('')
    onClose()
  }

  /**
   * 处理 JSON 内容变化
   */
  const handleJsonChange = (value: string) => {
    setJsonContent(value)
    setJsonError('')
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
                  {filename.replace('.json', '')}
                </SelectItem>
              ))}
            </Select>
            <Button
              size='sm'
              variant='flat'
              color='primary'
              startContent={<Plus className='w-3 h-3' />}
              onPress={onOpen}
            >
              新建
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 新建文件弹窗 */}
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
        size='2xl'
        scrollBehavior='inside'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            新建数据文件
          </ModalHeader>
          <ModalBody>
            <div className='space-y-4'>
              {/* 文件名输入 */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  文件名
                </label>
                <input
                  type='text'
                  placeholder='输入文件名（不含 .json）'
                  value={newFileName}
                  onChange={(e) => {
                    setNewFileName(e.target.value)
                    setJsonError('')
                  }}
                  className='w-full px-3 py-2 text-sm placeholder-gray-500 text-gray-900 bg-white rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  autoFocus
                />
              </div>

              {/* JSON 内容输入 */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  JSON 数据
                </label>
                <Textarea
                  value={jsonContent}
                  onValueChange={handleJsonChange}
                  variant='bordered'
                  minRows={12}
                  maxRows={20}
                  className='font-mono text-sm'
                  placeholder='输入 JSON 数据...'
                  classNames={{
                    input: 'bg-white text-gray-900 placeholder-gray-500',
                    inputWrapper: 'bg-white border-gray-300 data-[hover=true]:border-gray-400'
                  }}
                />
                {jsonError && (
                  <p className='mt-1 text-xs text-red-600'>{jsonError}</p>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant='flat'
              onPress={handleClose}
            >
              取消
            </Button>
            <Button
              color='primary'
              onPress={handleSaveNewFile}
              isDisabled={!newFileName.trim() || !jsonContent.trim()}
            >
              创建文件
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
