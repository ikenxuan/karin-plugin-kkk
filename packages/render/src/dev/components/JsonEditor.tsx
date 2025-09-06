import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Textarea, Button, Select, SelectItem } from '@heroui/react'
import { Code, Copy, Download, Upload, Plus } from 'lucide-react'

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
  onDataFileChange,
  onSaveNewDataFile
}) => {
  const [jsonText, setJsonText] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isFormatted, setIsFormatted] = useState(true)
  const [newFileName, setNewFileName] = useState<string>('')
  const [showNewFileInput, setShowNewFileInput] = useState(false)

  // 同步数据到JSON文本
  useEffect(() => {
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
    } catch (e) {
      // JSON解析失败，尝试解析JavaScript对象字面量
      try {
        let cleanText = text
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
        const result = new Function('return ' + cleanText)()
        return result
      } catch (err) {
        throw new Error('无法解析JavaScript对象或JSON格式')
      }
    }
  }

  /**
   * 处理JSON数据变更
   * @param value 新的JSON文本
   */
  const handleJsonChange = (value: string) => {
    setJsonText(value)
    try {
      const newData = parseJavaScriptObject(value)
      setError('')
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
    } catch (err) {
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
    } catch (err) {
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

  /**
   * 保存新数据文件
   */
  const saveNewFile = () => {
    if (newFileName && onSaveNewDataFile && data) {
      onSaveNewDataFile(newFileName, data)
      setNewFileName('')
      setShowNewFileInput(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex-shrink-0">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <Code className="flex-shrink-0 w-5 h-5" />
            <h3 className="text-lg font-semibold whitespace-nowrap">JSON数据编辑</h3>
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <Button
              size="sm"
              variant="flat"
              onPress={formatJson}
              isDisabled={readonly}
            >
              格式化
            </Button>
            <Button
              size="sm"
              variant="flat"
              onPress={compressJson}
              isDisabled={readonly}
            >
              压缩
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<Copy className="w-3 h-3" />}
              onPress={copyToClipboard}
            >
              复制
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<Upload className="w-3 h-3" />}
              onPress={importJson}
              isDisabled={readonly}
            >
              导入
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<Download className="w-3 h-3" />}
              onPress={exportJson}
            >
              导出
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        {/* 数据文件选择器 - 修复颜色问题 */}
        {availableDataFiles.length > 0 && (
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <Select
                label="选择数据文件"
                placeholder="选择预设数据"
                selectedKeys={selectedDataFile ? [selectedDataFile] : []}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string
                  if (key && onDataFileChange) {
                    onDataFileChange(key)
                  }
                }}
                className="flex-1"
                size="sm"
                variant="bordered"
                color="default"
                classNames={{
                  trigger: "bg-white border-gray-300 text-gray-900 data-[hover=true]:border-gray-400",
                  value: "text-gray-900",
                  listbox: "bg-white",
                  popoverContent: "bg-white border border-gray-200"
                }}
              >
                {availableDataFiles.map((filename) => (
                  <SelectItem
                    key={filename}
                    className="text-gray-900 data-[hover=true]:bg-gray-100 data-[selected=true]:bg-blue-50"
                  >
                    {filename.replace('.json', '')}
                  </SelectItem>
                ))}
              </Select>
              <Button
                size="sm"
                variant="flat"
                startContent={<Plus className="w-3 h-3" />}
                onPress={() => setShowNewFileInput(true)}
                isDisabled={readonly}
              >
                新建
              </Button>
            </div>

            {/* 新建文件输入框 */}
            {showNewFileInput && (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="输入文件名"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm placeholder-gray-500 text-gray-900 bg-white rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <Button
                  size="sm"
                  color="primary"
                  onPress={saveNewFile}
                  isDisabled={!newFileName}
                >
                  保存
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  onPress={() => {
                    setShowNewFileInput(false)
                    setNewFileName('')
                  }}
                >
                  取消
                </Button>
              </div>
            )}
          </div>
        )}

        <Textarea
          value={jsonText}
          onValueChange={handleJsonChange}
          variant="bordered"
          minRows={15}
          maxRows={25}
          className="font-mono text-sm"
          placeholder="在此粘贴或编辑您的JSON数据...\n支持JavaScript对象字面量格式"
          description={error || "支持标准JSON和JavaScript对象字面量格式，可手动调整输入框大小"}
          color={error ? 'danger' : 'default'}
          isReadOnly={readonly}
          classNames={{
            input: "bg-white text-gray-900 placeholder-gray-500",
            inputWrapper: "bg-white border-gray-300 data-[hover=true]:border-gray-400"
          }}
        />
      </CardBody>
    </Card>
  )
}