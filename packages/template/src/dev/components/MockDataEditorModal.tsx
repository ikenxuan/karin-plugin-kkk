import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { Save, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { JsonEditor } from './JsonEditor'

interface MockDataEditorModalProps {
  isOpen: boolean
  onClose: () => void
  data: any
  onSave: (data: any) => Promise<void>
  platform: string
  templateId: string
  availableDataFiles: string[]
  selectedDataFile: string
  onDataFileChange: (filename: string) => void
}

/**
 * Mock数据编辑模态窗
 */
export const MockDataEditorModal: React.FC<MockDataEditorModalProps> = ({
  isOpen,
  onClose,
  data: initialData,
  onSave,
  platform,
  templateId,
  availableDataFiles,
  selectedDataFile,
  onDataFileChange
}) => {
  const [currentData, setCurrentData] = useState<any>(initialData)
  const [isSaving, setIsSaving] = useState(false)

  // 当初始数据变化或模态窗打开时，重置当前数据
  useEffect(() => {
    if (isOpen && initialData) {
      setCurrentData(initialData)
    }
  }, [isOpen, initialData])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await onSave(currentData)
      onClose()
    } catch (error) {
      console.error('保存失败:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      isDismissable={true}
      hideCloseButton={false}
    >
      <ModalContent className="h-[90vh]">
        {() => (
          <>
            <ModalHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <span className="text-xl font-bold">编辑 Mock 数据</span>
              <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                size="sm"
              >
                <X className="w-5 h-5" />
              </Button>
            </ModalHeader>
            <ModalBody className="p-0 overflow-hidden">
              <div className="h-full w-full">
                <JsonEditor
                  data={currentData}
                  onChange={setCurrentData}
                  platform={platform}
                  templateId={templateId}
                  availableDataFiles={availableDataFiles}
                  selectedDataFile={selectedDataFile}
                  onDataFileChange={onDataFileChange}
                />
              </div>
            </ModalBody>
            <ModalFooter className="px-6 py-4 border-t border-gray-200">
              <Button
                variant="flat"
                color="default"
                onPress={onClose}
              >
                取消
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
                isLoading={isSaving}
                startContent={<Save className="w-4 h-4" />}
              >
                保存并重载
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
