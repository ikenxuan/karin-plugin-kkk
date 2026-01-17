import { Button, Select, SelectItem } from '@heroui/react'
import Editor from '@monaco-editor/react'
import { Code, Copy, Download, Upload } from 'lucide-react'
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
  onDataFileChange
}) => {
  const [jsonText, setJsonText] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isFormatted, setIsFormatted] = useState(true)
  // 使用 useRef 跟踪内部变更，防止外部数据更新导致的光标跳动和输入重置
  const isInternalChange = useRef<boolean>(false)

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
          .replace(/`([^`]*)`/g, (match, content) => {
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
    <div className='w-full h-full flex flex-col bg-white'>
      <div className='shrink-0 p-4 border-b border-gray-200'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <Code className='shrink-0 w-5 h-5 text-gray-500' />
              <h3 className='text-lg font-semibold whitespace-nowrap'>JSON 编辑器</h3>
              {error && <span className='text-sm text-danger ml-2'>{error}</span>}
            </div>
            <div className='flex flex-wrap gap-1 items-center'>
              <Button
                size='sm'
                variant='light'
                onPress={formatJson}
                isDisabled={readonly}
              >
                格式化
              </Button>
              <Button
                size='sm'
                variant='light'
                onPress={compressJson}
                isDisabled={readonly}
              >
                压缩
              </Button>
              <Button
                size='sm'
                variant='light'
                startContent={<Copy className='w-3 h-3' />}
                onPress={copyToClipboard}
              >
                复制
              </Button>
              <Button
                size='sm'
                variant='light'
                startContent={<Upload className='w-3 h-3' />}
                onPress={importJson}
                isDisabled={readonly}
              >
                导入
              </Button>
              <Button
                size='sm'
                variant='light'
                startContent={<Download className='w-3 h-3' />}
                onPress={exportJson}
              >
                导出
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* 数据文件选择器 */}
        {availableDataFiles.length > 0 && (
          <div className='px-4 py-2 border-b border-gray-100 bg-gray-50/50 shrink-0'>
            <div className='flex gap-2 items-center max-w-md'>
              <Select
                label='选择数据文件'
                placeholder='选择预设数据'
                selectedKeys={selectedDataFile ? [selectedDataFile] : []}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string
                  if (key && onDataFileChange) {
                    onDataFileChange(key)
                  }
                }}
                className='flex-1'
                size='sm'
                variant='bordered'
                color='default'
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
            </div>
          </div>
        )}

        <div 
          className='flex-1 w-full relative min-h-0'
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
      </div>
    </div>
  )
}
