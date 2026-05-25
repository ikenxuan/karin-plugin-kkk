import { Button, Modal } from '@heroui/react'
import { useKeyPress } from 'ahooks'
import { Save } from 'lucide-react'
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
  panelTheme?: 'light' | 'dark'
  panelThemeStyle?: React.CSSProperties
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
  isDarkMode = false,
  panelTheme = 'light',
  panelThemeStyle
}) => {
  const [currentData, setCurrentData] = useState<any>(initialData)
  const [isSaving, setIsSaving] = useState(false)
  const [hasError, setHasError] = useState(false)

  // 当初始数据变化或模态窗打开时，重置当前数据
  useEffect(() => {
    if (isOpen && initialData) {
      setCurrentData(initialData)
      setHasError(false)
    }
  }, [isOpen, initialData])

  // 监听 Ctrl+S 快捷键，拦截浏览器默认保存行为
  useKeyPress(['ctrl.s', 'meta.s'], (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isSaving && !hasError) {
      handleSave()
    }
  }, { events: ['keydown'], exactMatch: true, useCapture: true, target: () => isOpen ? document : null })

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
      className={panelTheme}
      data-theme={panelTheme}
      isDismissable
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
      style={panelThemeStyle}
      variant='blur'
    >
      <Modal.Container className='p-2 sm:p-4' size='cover'>
        <Modal.Dialog className='max-h-[92vh] overflow-hidden flex flex-col gap-10'>
          <JsonEditor
            data={currentData}
            onChange={(data) => {
              setCurrentData(data)
            }}
            onErrorChange={setHasError}
            platform={platform}
            templateId={templateId}
            availableDataFiles={availableDataFiles}
            selectedDataFile={selectedDataFile}
            onDataFileChange={onDataFileChange}
            isDarkMode={isDarkMode}
          />

          <Modal.Footer className='flex justify-end gap-4'>
            <Button
              size='lg'
              onPress={onClose}
            >
              取消
            </Button>
            <Button
              isDisabled={hasError}
              isPending={isSaving}
              onPress={handleSave}
              size='lg'
            >
              {({ isPending }) => (
                <span className='flex items-center gap-1.5'>
                  <Save size={14} />
                  {isPending ? '保存中...' : '保存并重载'}
                </span>
              )}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
