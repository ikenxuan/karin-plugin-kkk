import { Button, Card, Label, ListBox, Select, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import Editor from '@monaco-editor/react'
import React, { useEffect, useRef, useState } from 'react'

interface JsonEditorProps {
  /** 当前数据 */
  data: any
  /** 数据变更回调 */
  onChange: (data: any) => void
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
  /** 保存新数据文件回调 */
  onSaveNewDataFile?: (filename: string, data: any) => void
  /** 是否深色模式 */
  isDarkMode?: boolean
  /** 保存回调（用于 Modal 模式） */
  onSave?: () => void
  /** 取消回调（用于 Modal 模式） */
  onCancel?: () => void
  /** 是否正在保存 */
  isSaving?: boolean
}

/**
 * JSON编辑器组件
 */
export const JsonEditor: React.FC<JsonEditorProps> = ({
  data,
  onChange,
  readonly = false,
  platform,
  templateId,
  availableDataFiles = [],
  selectedDataFile,
  onDataFileChange,
  isDarkMode = false,
  onSave,
  onCancel,
  isSaving = false
}) => {
  const [jsonText, setJsonText] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isFormatted, setIsFormatted] = useState(true)
  const isInternalChange = useRef<boolean>(false)

  const toolbarButtonClass = 'h-8 rounded-xl border border-black/10 bg-black/3 text-foreground shadow-none hover:bg-black/5 dark:border-white/10 dark:bg-white/4 dark:hover:bg-white/6'
  const iconButtonClass = 'h-8 w-8 rounded-xl border border-black/10 bg-black/3 text-foreground shadow-none hover:bg-black/5 dark:border-white/10 dark:bg-white/4 dark:hover:bg-white/6'

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
      isInternalChange.current = true
      onChange(newData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'JSON 格式错误')
    }
  }

  const formatJson = () => {
    try {
      const parsed = parseJavaScriptObject(jsonText)
      setJsonText(JSON.stringify(parsed, null, 2))
      setIsFormatted(true)
      setError('')
    } catch {
      setError('无法格式化：格式错误')
    }
  }

  const compressJson = () => {
    try {
      const parsed = parseJavaScriptObject(jsonText)
      setJsonText(JSON.stringify(parsed))
      setIsFormatted(false)
      setError('')
    } catch {
      setError('无法压缩：格式错误')
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

  const renderToolButton = (label: string, icon: React.ReactNode, onPress: () => void, disabled = false) => (
    <Tooltip delay={300}>
      <Tooltip.Trigger>
        <Button
          className={iconButtonClass}
          isDisabled={disabled}
          isIconOnly
          onPress={onPress}
          size='sm'
          variant='secondary'
        >
          {icon}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content className='rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs text-foreground shadow-lg dark:border-white/10 dark:bg-zinc-950' showArrow>
        <Tooltip.Arrow />
        {label}
      </Tooltip.Content>
    </Tooltip>
  )

  return (
    <div className='flex h-full w-full flex-col gap-2 bg-transparent p-3'>
      <Card
        className='flex min-h-0 flex-1 rounded-[32px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_28px_88px_rgba(0,0,0,0.55)]'
        variant='transparent'
      >
        <Card.Header className='flex flex-row items-center justify-between gap-3 border-b border-black/10 px-4 py-3 dark:border-white/10'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>
              <Icon icon="lucide:code" className='h-4 w-4 text-foreground' />
              <h3 className='text-sm font-semibold text-foreground'>JSON 编辑器</h3>
            </div>

            <div className='h-5 w-px bg-black/10 dark:bg-white/10' />

            <div className='flex gap-1.5'>
              <Button
                className={toolbarButtonClass}
                isDisabled={readonly}
                onPress={formatJson}
                size='sm'
                variant='secondary'
              >
                格式化
              </Button>
              <Button
                className={toolbarButtonClass}
                isDisabled={readonly}
                onPress={compressJson}
                size='sm'
                variant='secondary'
              >
                压缩
              </Button>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            {availableDataFiles.length > 0 && (
              <>
                <div className='flex items-center gap-2'>
                  <Icon icon="lucide:file-json" className='h-3.5 w-3.5 text-muted' />
                  <Select
                    aria-label='选择数据文件'
                    className='w-60'
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
                    <Select.Trigger className='h-8 rounded-xl border border-black/10 bg-black/3 px-3 py-2 text-sm shadow-none hover:bg-black/5 dark:border-white/10 dark:bg-white/4 dark:hover:bg-white/6'>
                      <Select.Value className='text-sm text-foreground' />
                      <Select.Indicator className='text-muted' />
                    </Select.Trigger>
                    <Select.Popover className={isDarkMode ? 'dark' : 'light'}>
                      <ListBox className='rounded-2xl border border-black/8 bg-white p-1 shadow-[0_16px_48px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_18px_54px_rgba(0,0,0,0.55)]'>
                        {availableDataFiles.map((filename) => (
                          <ListBox.Item
                            key={filename}
                            className='rounded-xl px-3 py-2 text-sm text-foreground data-[hovered=true]:bg-black/4 dark:data-[hovered=true]:bg-white/6'
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

                <div className='h-5 w-px bg-black/10 dark:bg-white/10' />
              </>
            )}

            <div className='flex gap-1.5'>
              {renderToolButton('复制到剪贴板', <Icon icon="lucide:copy" className='h-3.5 w-3.5' />, copyToClipboard)}
              {renderToolButton('导入 JSON 文件', <Icon icon="lucide:upload" className='h-3.5 w-3.5' />, importJson, readonly)}
              {renderToolButton('导出 JSON 文件', <Icon icon="lucide:download" className='h-3.5 w-3.5' />, exportJson)}
            </div>

            {onSave && onCancel && (
              <>
                <div className='h-5 w-px bg-black/10 dark:bg-white/10' />
                <div className='flex gap-1.5'>
                  <Button
                    className={toolbarButtonClass}
                    onPress={onCancel}
                    size='sm'
                    variant='secondary'
                  >
                    <Icon icon="lucide:x" className='h-3.5 w-3.5' />
                    取消
                  </Button>
                  <Button
                    className='h-8 rounded-xl border border-black bg-black text-white shadow-none hover:bg-black/90 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/90'
                    isDisabled={!!error}
                    isPending={isSaving}
                    onPress={onSave}
                    size='sm'
                    variant='secondary'
                  >
                    {({ isPending }) => (
                      <>
                        <Icon icon="lucide:save" className='h-3.5 w-3.5' />
                        {isPending ? '保存中...' : '保存并重载'}
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card.Header>

        {error && (
          <div className='shrink-0 border-b border-danger-soft-hover bg-danger-soft/70 px-4 py-2 dark:border-danger/30 dark:bg-danger-soft/40'>
            <div className='flex items-center gap-2 text-danger'>
              <svg className='h-4 w-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span className='text-xs'>{error}</span>
            </div>
          </div>
        )}

        <Card.Content
          className='relative flex min-h-0 flex-1 px-0 pb-0'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.stopPropagation()
            }
          }}
        >
          <Editor
            beforeMount={handleEditorWillMount}
            defaultLanguage='json'
            height='100%'
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              formatOnPaste: true,
              formatOnType: true,
              readOnly: readonly,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
              ariaLabel: 'JSON 编辑器'
            }}
            onChange={handleJsonChange}
            theme={editorTheme}
            value={jsonText}
          />
        </Card.Content>
      </Card>
    </div>
  )
}
