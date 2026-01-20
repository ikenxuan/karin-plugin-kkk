import { Modal, ModalContent } from '@heroui/react'
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
  isDarkMode?: boolean
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
  onDataFileChange,
  isDarkMode = false
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
      isDismissable={true}
      hideCloseButton={true}
      classNames={{
        backdrop: 'bg-overlay/50 backdrop-blur-sm',
        wrapper: 'items-center justify-center',
        base: `bg-content1 border border-divider rounded-2xl ${isDarkMode ? 'dark' : ''}`
      }}
    >
      <ModalContent className={`h-[90vh] ${isDarkMode ? 'dark' : ''}`}>
        <JsonEditor
          data={currentData}
          onChange={setCurrentData}
          platform={platform}
          templateId={templateId}
          availableDataFiles={availableDataFiles}
          selectedDataFile={selectedDataFile}
          onDataFileChange={onDataFileChange}
          isDarkMode={isDarkMode}
          onSave={handleSave}
          onCancel={onClose}
          isSaving={isSaving}
        />
      </ModalContent>
    </Modal>
  )
}
