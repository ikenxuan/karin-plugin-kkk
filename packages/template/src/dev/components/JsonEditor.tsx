import { Button, Card, CardBody, Select, SelectItem, Tooltip } from '@heroui/react'
import Editor from '@monaco-editor/react'
import { Code, Copy, Download, FileJson, Save, Upload, X } from 'lucide-react'
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
 * @param props 组件属性
 * @returns JSX元素
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
  // 使用 useRef 跟踪内部变更，防止外部数据更新导致的光标跳动和输入重置
  const isInternalChange = useRef<boolean>(false)

  // 配置 Monaco Editor 的 JSON 语法高亮
  const handleEditorWillMount = (monaco: any) => {
    // 深色主题
    monaco.editor.defineTheme('json-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'string.key.json', foreground: '9CDCFE' }, // 键名 - 青色
        { token: 'string.value.json', foreground: 'CE9178' }, // 字符串值 - 橙色
        { token: 'number.json', foreground: 'B5CEA8' }, // 数字 - 浅绿
        { token: 'keyword.json', foreground: '569CD6' }, // true/false/null - 蓝色
        { token: 'delimiter.bracket.json', foreground: 'FFD700' }, // 括号 - 金色
        { token: 'delimiter.colon.json', foreground: 'D4D4D4' }, // 冒号 - 灰色
        { token: 'delimiter.comma.json', foreground: 'D4D4D4' } // 逗号 - 灰色
      ],
      colors: {
        'editor.background': '#1E1E1E'
      }
    })

    // 浅色主题
    monaco.editor.defineTheme('json-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'string.key.json', foreground: '001080' }, // 键名 - 深蓝
        { token: 'string.value.json', foreground: 'A31515' }, // 字符串值 - 红色
        { token: 'number.json', foreground: '098658' }, // 数字 - 深绿
        { token: 'keyword.json', foreground: '0000FF' }, // true/false/null - 蓝色
        { token: 'delimiter.bracket.json', foreground: '000000' }, // 括号 - 黑色
        { token: 'delimiter.colon.json', foreground: '000000' }, // 冒号 - 黑色
        { token: 'delimiter.comma.json', foreground: '000000' } // 逗号 - 黑色
      ],
      colors: {
        'editor.background': '#FFFFFF'
      }
    })
  }

  const editorTheme = isDarkMode ? 'json-dark' : 'json-light'

  // 同步数据到JSON文本
  useEffect(() => {
    // 如果是内部变更（用户输入），跳过本次同步
    if (isInternalChange.current) {
      isInternalChange.current = false
      return
    }

    if (data) {
      setJsonText(JSON.stringify(data, null, isFormatted ? 2 : 0))
      setError('')
    }
  }, [data, isFormatted])

  /**
   * 解析JavaScript对象字面量或JSON
   * @param text 文本内容
   * @returns 解析后的对象
   */
  const parseJavaScriptObject = (text: string): any => {
    // 先尝试标准JSON解析
    try {
      return JSON.parse(text)
    } catch {
      // JSON解析失败，尝试解析JavaScript对象字面量
      try {
        const cleanText = text
          .replace(/`([^`]*)`/g, (_match, content) => {
            return `"${content.trim()}"`
          })
          // 标准化属性名（处理没有引号的属性名）
          .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
          // 移除对象和数组末尾的逗号
          .replace(/,\s*([}\]])/g, '$1')
          // 标准化冒号后的空格
          .replace(/:\s+/g, ': ')

        // 使用Function构造器安全地解析JavaScript对象
        // 注意：仅在开发环境工具中使用，生产环境需谨慎
        const result = new Function('return ' + cleanText)()
        return result
      } catch {
        throw new Error('无法解析JavaScript对象或JSON格式')
      }
    }
  }

  /**
   * 处理JSON数据变更
   * @param value 新的JSON文本
   */
  const handleJsonChange = (value: string | undefined) => {
    const text = value || ''
    setJsonText(text)
    try {
      const newData = parseJavaScriptObject(text)
      setError('')
      // 标记为内部变更，防止 useEffect 再次覆盖
      isInternalChange.current = true
      onChange(newData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'JSON格式错误')
    }
  }

  /**
   * 格式化JSON
   */
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

  /**
   * 压缩JSON
   */
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

  /**
   * 复制到剪贴板
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonText)
      console.log('已复制到剪贴板')
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  /**
   * 导入JSON文件
   */
  const importJson = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          handleJsonChange(content)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  /**
   * 导出JSON文件
   */
  const exportJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${platform}_${templateId}_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className='w-full h-full flex flex-col gap-2 p-3 bg-background'>
      {/* 编辑器卡片 */}
      <Card className='flex-1 shadow-sm overflow-hidden'>
        <CardBody className='p-0 overflow-hidden flex flex-col'>
          {/* 单行工具栏 */}
          <div className='shrink-0 flex items-center justify-between gap-3 px-4 py-2.5 border-b border-divider'>
            {/* 左侧：标题 + 操作按钮 */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <Code className='w-4 h-4 text-primary' />
                <h3 className='text-sm font-semibold text-foreground'>JSON 编辑器</h3>
              </div>
              
              <div className='w-px h-5 bg-divider' />
              
              <div className='flex gap-1.5'>
                <Button
                  size='sm'
                  variant='flat'
                  color='primary'
                  onPress={formatJson}
                  isDisabled={readonly}
                  className='h-7 px-3 text-xs'
                >
                  格式化
                </Button>
                <Button
                  size='sm'
                  variant='flat'
                  color='secondary'
                  onPress={compressJson}
                  isDisabled={readonly}
                  className='h-7 px-3 text-xs'
                >
                  压缩
                </Button>
              </div>
            </div>
            
            {/* 右侧：文件选择 + 工具按钮 + 保存/取消（Modal 模式） */}
            <div className='flex items-center gap-2'>
              {/* 数据文件选择器 */}
              {availableDataFiles.length > 0 && (
                <>
                  <div className='flex items-center gap-2'>
                    <FileJson className='w-3.5 h-3.5 text-warning' />
                    <Select
                      placeholder='选择数据文件'
                      selectedKeys={selectedDataFile ? [selectedDataFile] : []}
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string
                        if (key && onDataFileChange) {
                          onDataFileChange(key)
                        }
                      }}
                      size='sm'
                      variant='bordered'
                      className='w-60'
                      classNames={{
                        trigger: 'h-7 min-h-7',
                        value: 'text-foreground'
                      }}
                      popoverProps={{
                        classNames: {
                          content: isDarkMode ? 'dark bg-content1' : 'bg-content1'
                        }
                      }}
                    >
                      {availableDataFiles.map((filename) => (
                        <SelectItem key={filename} className='text-foreground'>
                          {filename.replace('.json', '')}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  
                  <div className='w-px h-5 bg-divider' />
                </>
              )}
              
              <div className='flex gap-1.5'>
                <Tooltip content='复制到剪贴板' placement='bottom' delay={300}>
                  <Button
                    size='sm'
                    variant='bordered'
                    isIconOnly
                    onPress={copyToClipboard}
                    className='h-7 w-7'
                  >
                    <Copy className='w-3.5 h-3.5' />
                  </Button>
                </Tooltip>
                <Tooltip content='导入 JSON 文件' placement='bottom' delay={300}>
                  <Button
                    size='sm'
                    variant='bordered'
                    isIconOnly
                    onPress={importJson}
                    isDisabled={readonly}
                    className='h-7 w-7'
                  >
                    <Upload className='w-3.5 h-3.5' />
                  </Button>
                </Tooltip>
                <Tooltip content='导出 JSON 文件' placement='bottom' delay={300}>
                  <Button
                    size='sm'
                    variant='bordered'
                    isIconOnly
                    onPress={exportJson}
                    className='h-7 w-7'
                  >
                    <Download className='w-3.5 h-3.5' />
                  </Button>
                </Tooltip>
              </div>
              
              {/* Modal 模式的保存/取消按钮 */}
              {onSave && onCancel && (
                <>
                  <div className='w-px h-5 bg-divider' />
                  <div className='flex gap-1.5'>
                    <Button
                      size='sm'
                      variant='flat'
                      onPress={onCancel}
                      className='h-7 px-3 text-xs'
                      startContent={<X className='w-3.5 h-3.5' />}
                    >
                      取消
                    </Button>
                    <Button
                      size='sm'
                      color='primary'
                      onPress={onSave}
                      isLoading={isSaving}
                      className='h-7 px-3 text-xs'
                      startContent={<Save className='w-3.5 h-3.5' />}
                    >
                      保存并重载
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 错误提示条 */}
          {error && (
            <div className='shrink-0 px-4 py-2 bg-danger-50 border-b border-danger-200'>
              <div className='flex items-center gap-2'>
                <svg className='w-4 h-4 text-danger shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='text-xs text-danger'>{error}</span>
              </div>
            </div>
          )}

          {/* 编辑器 */}
          <div 
            className='flex-1 w-full relative overflow-hidden'
            onKeyDown={(e) => {
              // 防止 Modal 捕获 Enter 键
              if (e.key === 'Enter') {
                e.stopPropagation()
              }
            }}
          >
            <Editor
              height="100%"
              defaultLanguage="json"
              value={jsonText}
              onChange={handleJsonChange}
              theme={editorTheme}
              beforeMount={handleEditorWillMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                formatOnPaste: true,
                formatOnType: true,
                readOnly: readonly,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
