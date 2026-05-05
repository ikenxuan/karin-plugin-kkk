import { Button, Label, ListBox, Select, Tooltip } from '@heroui/react'
import Editor from '@monaco-editor/react'
import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '../../components/common/Icon'

interface JsonEditorProps {
  /** 当前数据 */
  data: any
  /** 数据变更回调 */
  onChange: (data: any) => void
  /** 错误状态变更回调 */
  onErrorChange?: (hasError: boolean) => void
  /** 是否只读 */
  readonly?: boolean
  /** 平台类型 */
  platform: string
  /** 模板ID */
  templateId: string
  /** 可用的数据文件列表 */
  availableDataFiles?: string[]
  /** 当前选中的数据文件 */
  selectedDataFile?: string
  /** 数据文件变更回调 */
  onDataFileChange?: (filename: string) => void
  /** 是否深色模式 */
  isDarkMode?: boolean
}

/**
 * JSON编辑器组件
 */
export const JsonEditor: React.FC<JsonEditorProps> = ({
  data,
  onChange,
  onErrorChange,
  readonly = false,
  platform,
  templateId,
  availableDataFiles = [],
  selectedDataFile,
  onDataFileChange,
  isDarkMode = false
}) => {
  const [jsonText, setJsonText] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isFormatted, setIsFormatted] = useState(true)
  const isInternalChange = useRef<boolean>(false)

  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme('json-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'string.key.json', foreground: '9CDCFE' },
        { token: 'string.value.json', foreground: 'CE9178' },
        { token: 'number.json', foreground: 'B5CEA8' },
        { token: 'keyword.json', foreground: '569CD6' },
        { token: 'delimiter.bracket.json', foreground: 'FFD700' },
        { token: 'delimiter.colon.json', foreground: 'D4D4D4' },
        { token: 'delimiter.comma.json', foreground: 'D4D4D4' }
      ],
      colors: {
        'editor.background': '#09090B'
      }
    })

    monaco.editor.defineTheme('json-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'string.key.json', foreground: '001080' },
        { token: 'string.value.json', foreground: 'A31515' },
        { token: 'number.json', foreground: '098658' },
        { token: 'keyword.json', foreground: '0000FF' },
        { token: 'delimiter.bracket.json', foreground: '000000' },
        { token: 'delimiter.colon.json', foreground: '000000' },
        { token: 'delimiter.comma.json', foreground: '000000' }
      ],
      colors: {
        'editor.background': '#FFFFFF'
      }
    })
  }

  const editorTheme = isDarkMode ? 'json-dark' : 'json-light'

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false
      return
    }

    if (data) {
      setJsonText(JSON.stringify(data, null, isFormatted ? 2 : 0))
      setError('')
      onErrorChange?.(false)
    }
  }, [data, isFormatted])

  const parseJavaScriptObject = (text: string): any => {
    try {
      return JSON.parse(text)
    } catch {
      try {
        const cleanText = text
          .replace(/`([^`]*)`/g, (_match, content) => `"${content.trim()}"`)
          .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
          .replace(/,\s*([}\]])/g, '$1')
          .replace(/:\s+/g, ': ')

        return new Function('return ' + cleanText)()
      } catch {
        throw new Error('无法解析 JavaScript 对象或 JSON 格式')
      }
    }
  }

  const handleJsonChange = (value: string | undefined) => {
    const text = value || ''
    setJsonText(text)

    try {
      const newData = parseJavaScriptObject(text)
      setError('')
      onErrorChange?.(false)
      isInternalChange.current = true
      onChange(newData)
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'JSON 格式错误'
      setError(errMsg)
      onErrorChange?.(true)
    }
  }

  const formatJson = () => {
    try {
      const parsed = parseJavaScriptObject(jsonText)
      setJsonText(JSON.stringify(parsed, null, 2))
      setIsFormatted(true)
      setError('')
      onErrorChange?.(false)
    } catch {
      setError('无法格式化：格式错误')
      onErrorChange?.(true)
    }
  }

  const compressJson = () => {
    try {
      const parsed = parseJavaScriptObject(jsonText)
      setJsonText(JSON.stringify(parsed))
      setIsFormatted(false)
      setError('')
      onErrorChange?.(false)
    } catch {
      setError('无法压缩：格式错误')
      onErrorChange?.(true)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonText)
      console.log('已复制到剪贴板')
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const importJson = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          handleJsonChange(content)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const exportJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${platform}_${templateId}_${Date.now()}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const renderIconButton = (label: string, icon: React.ReactNode, onPress: () => void, disabled = false) => (
    <Tooltip delay={300}>
      <Tooltip.Trigger>
        <Button
          isDisabled={disabled}
          isIconOnly
          onPress={onPress}
          size='sm'
          variant='ghost'
        >
          {icon}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow>
        <Tooltip.Arrow />
        {label}
      </Tooltip.Content>
    </Tooltip>
  )

  return (
    <div className='flex h-full w-full flex-col'>
      {/* 工具栏 */}
      <div className='flex shrink-0 items-center justify-between gap-3 border-b border-divider px-4 py-2.5'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1.5'>
            <Icon icon="lucide:code" className='h-4 w-4 text-default-500' />
            <span className='text-lg font-semibold'>数据编辑器</span>
          </div>

          <div className='w-px h-4 bg-default-200' />

          <div className='flex gap-4'>
            <Button variant='tertiary' size='sm' isDisabled={readonly} onPress={formatJson}>
              格式化
            </Button>
            <Button variant='tertiary' size='sm' isDisabled={readonly} onPress={compressJson}>
              压缩
            </Button>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          {availableDataFiles.length > 0 && (
            <>
              <div className='flex items-center gap-1.5'>
                <Select
                  aria-label='选择数据文件'
                  className='w-48'
                  placeholder='选择数据文件'
                  value={selectedDataFile ?? null}
                  variant='secondary'
                  onChange={(value) => {
                    if (typeof value === 'string' && value && onDataFileChange) {
                      onDataFileChange(value)
                    }
                  }}
                >
                  <Label className='sr-only'>选择数据文件</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {availableDataFiles.map((filename) => (
                        <ListBox.Item
                          key={filename}
                          id={filename}
                          textValue={filename.replace('.json', '')}
                        >
                          {filename.replace('.json', '')}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              <div className='w-px h-4 bg-default-200' />
            </>
          )}

          <div className='flex gap-1'>
            {renderIconButton('复制', <Icon icon="lucide:copy" className='h-3.5 w-3.5' />, copyToClipboard)}
            {renderIconButton('导入', <Icon icon="lucide:upload" className='h-3.5 w-3.5' />, importJson, readonly)}
            {renderIconButton('导出', <Icon icon="lucide:download" className='h-3.5 w-3.5' />, exportJson)}
          </div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className='shrink-0 border-b border-danger px-4 py-2 text-danger'>
          <div className='flex items-center gap-2'>
            <svg className='h-4 w-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <span className='text-xs'>{error}</span>
          </div>
        </div>
      )}

      {/* 编辑器 */}
      <div className='relative min-h-0 flex-1'>
        <Editor
          beforeMount={handleEditorWillMount}
          defaultLanguage='json'
          height='100%'
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
            readOnly: readonly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            ariaLabel: 'JSON 编辑器'
          }}
          onChange={handleJsonChange}
          theme={editorTheme}
          value={jsonText}
        />
      </div>
    </div>
  )
}
