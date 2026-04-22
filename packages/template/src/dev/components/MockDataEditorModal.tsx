import { Modal } from '@heroui/react'
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

  // 监听 Ctrl+S 快捷键，拦截浏览器默认保存行为
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // 检查是否按下 Ctrl+S (Windows/Linux) 或 Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        // 阻止浏览器默认的保存页面行为
        e.preventDefault()
        e.stopPropagation()
        
        // 触发保存并重载
        if (!isSaving) {
          handleSave()
        }
      }
    }

    // 在捕获阶段监听，确保能够拦截事件
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isOpen, isSaving, currentData])

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
          className={`h-[90vh] max-h-[90vh] overflow-hidden rounded-4xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_28px_84px_rgba(0,0,0,0.55)] ${isDarkMode ? 'dark' : 'light'}`}
        >
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
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
