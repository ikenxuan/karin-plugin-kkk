import { Button, Chip, Slider, Switch } from '@heroui/react'
import { Camera, Palette } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { MdFitScreen } from 'react-icons/md'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { templates } from 'virtual:karin-templates'

import { DataFileSelector } from './components/DataFileSelector'
import { InspectorToggle } from './components/InspectorToggle'
import { TemplateSelector } from './components/TemplateSelector'
import { PreviewPanel } from './components/PreviewPanel'

/**
 * URL参数接口
 */
interface URLParams {
  /** 组件ID */
  template?: string
  /** 数据文件名 */
  dataFile?: string
}

/**
 * 从URL解析参数
 * @returns URL参数对象
 */
const parseURLParams = (): URLParams => {
  const urlParams = new URLSearchParams(window.location.search)
  const template = urlParams.get('template')
  const dataFile = urlParams.get('dataFile')

  return {
    template: template || undefined,
    dataFile: dataFile || undefined
  }
}

/**
 * 更新URL参数
 * @param template 组件ID
 * @param dataFile 数据文件名（可选）
 */
const updateURLParams = (template: string, dataFile?: string) => {
  const url = new URL(window.location.href)
  if (template) url.searchParams.set('template', template)
  if (dataFile) {
    url.searchParams.set('dataFile', dataFile)
  } else {
    url.searchParams.delete('dataFile')
  }
  window.history.replaceState({}, '', url.toString())
}

/**
 * App 组件属性
 */
interface AppProps {
  inspectorActive: boolean
  onInspectorToggle: (active: boolean) => void
}

/**
 * 开发环境主应用组件
 */
export const App: React.FC<AppProps> = ({ inspectorActive, onInspectorToggle }) => {
  // 获取初始状态
  const defaultTemplate = templates[0]?.id || ''

  const urlParams = parseURLParams()
  const initialTemplate = urlParams.template || defaultTemplate

  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate)
  const [templateData, setTemplateData] = useState<any>(null)
  const [loadError, setLoadError] = useState<Error | null>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [scale, setScale] = useState(0.5)
  const [availableDataFiles, setAvailableDataFiles] = useState<string[]>([])
  const [selectedDataFile, setSelectedDataFile] = useState<string>(urlParams.dataFile || 'default.json')
  const [isCapturing, setIsCapturing] = useState(false)

  const previewPanelRef = React.useRef<{ captureScreenshot: () => Promise<void>; fitToCanvas: () => void }>(null)

  // 监听浏览器前进后退按钮
  useEffect(() => {
    const handlePopState = () => {
      const params = parseURLParams()
      if (params.template) {
        setSelectedTemplate(params.template)
        if (params.dataFile) {
          setSelectedDataFile(params.dataFile)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  /**
   * 获取可用数据文件列表
   */
  const fetchAvailableFiles = async () => {
    try {
      const response = await fetch('/__api/data/list')
      if (response.ok) {
        const files = await response.json()
        setAvailableDataFiles(files)
        // 如果没有选中的文件且有文件可用，默认选中第一个
        if (!selectedDataFile && files.length > 0) {
            setSelectedDataFile(files[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch available data files:', error)
    }
  }

  useEffect(() => {
    fetchAvailableFiles()
  }, [])

  // 当模板或数据文件状态变化时更新URL
  useEffect(() => {
    updateURLParams(selectedTemplate, selectedDataFile !== 'default.json' ? selectedDataFile : undefined)
  }, [selectedTemplate, selectedDataFile])

  /**
   * 处理模板变更
   */
  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    setSelectedDataFile('default.json')
  }

  /**
   * 加载数据 (Mock)
   */
  const loadData = async (filename?: string) => {
    try {
      setLoadError(null)
      if (!filename) {
        setTemplateData({})
        return
      }
      
      const response = await fetch(`/__api/data/${filename}`)
      if (!response.ok) throw new Error(`Failed to load data file: ${response.statusText}`)
      
      const data = await response.json()
      setTemplateData(data)
    } catch (error) {
      console.error('加载数据失败:', error)
      setLoadError(error instanceof Error ? error : new Error(String(error)))
    }
  }

  // 当数据文件变更时加载数据
  useEffect(() => {
    if (selectedDataFile) {
      loadData(selectedDataFile)
    }
  }, [selectedDataFile, selectedTemplate])

  /**
   * 组件加载完成回调
   */
  const handleComponentLoadComplete = React.useCallback(() => {
    if (previewPanelRef.current?.fitToCanvas) {
      previewPanelRef.current.fitToCanvas()
    }
  }, [])

  return (
    <div className='overflow-hidden h-screen bg-linear-to-br from-blue-50 to-indigo-100 font-[HarmonyOSHans-Regular]'>
      {/* 顶部导航 */}
      <div className='h-16 bg-white border-b border-gray-200 shadow-sm shrink-0'>
        <div className='flex justify-between items-center px-6 h-full'>
          <div className='flex gap-4 items-center'>
            <div className='flex gap-2 items-center'>
              <Palette className='w-6 h-6 text-blue-600 shrink-0' />
              <h1 className='text-xl font-bold text-gray-900 whitespace-nowrap'>Template 开发</h1>
            </div>
            {selectedDataFile && (
              <Chip color='secondary' variant='flat' size='sm'>
                {selectedDataFile.replace('.json', '')}
              </Chip>
            )}
            <Chip color='default' variant='flat' size='sm'>
              {selectedTemplate}
            </Chip>
          </div>
          <div className='flex gap-2 items-center shrink-0'>
            {/* 截图按钮已移至画布工具栏 */}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className='h-[calc(100vh-4rem)] overflow-hidden'>
        <PanelGroup direction='horizontal' className='h-full'>
          {/* 左侧控制面板 */}
          <Panel
            defaultSize={28}
            minSize={20}
            maxSize={40}
            className='bg-white border-r border-gray-200'
          >
            <div className='overflow-y-auto h-full scrollbar-hide'>
              <div className='p-4 space-y-4'>
                {/* 模板选择 */}
                <div className='shrink-0'>
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    onTemplateChange={handleTemplateChange}
                  />
                </div>

                {/* 数据文件选择器 */}
                <div className='shrink-0'>
                  <DataFileSelector
                    availableDataFiles={availableDataFiles}
                    selectedDataFile={selectedDataFile}
                    onDataFileChange={setSelectedDataFile}
                    onSaveNewDataFile={async () => {}}
                    onRefreshFiles={fetchAvailableFiles}
                  />
                </div>
              </div>
            </div>
          </Panel>

          {/* 可调整大小的分隔条 */}
          <PanelResizeHandle className='flex justify-center items-center w-2 bg-gray-100 transition-colors duration-200 hover:bg-gray-200 cursor-col-resize group'>
            <div className='w-1 h-8 bg-gray-300 rounded-full transition-colors duration-200 group-hover:bg-gray-400' />
          </PanelResizeHandle>

          {/* 右侧预览面板 */}
          <Panel
            defaultSize={72}
            minSize={60}
            className='bg-gray-50'
          >
            <div className='flex flex-col h-full'>
              {/* 画布工具栏 */}
              <div className='px-6 py-3 bg-white border-b border-gray-200 shrink-0'>
                <div className='flex gap-4 items-center'>
                  {/* 主题切换开关 */}
                  <div className='flex gap-2 items-center'>
                    <Switch
                      isSelected={templateData?.useDarkTheme || false}
                      onValueChange={(checked) => setTemplateData({ ...templateData, useDarkTheme: checked })}
                      size='sm'
                      color='primary'
                    />
                    <span className='text-sm font-medium text-gray-700'>深色主题</span>
                  </div>

                  {/* 分隔线 */}
                  <div className='w-px h-6 bg-gray-300' />

                  {/* 截图按钮 */}
                  <Button
                    size='sm'
                    color='secondary'
                    variant='flat'
                    startContent={<Camera className='w-4 h-4' />}
                    onPress={() => previewPanelRef.current?.captureScreenshot()}
                    isLoading={isCapturing}
                  >
                    截图
                  </Button>

                  {/* 分隔线 */}
                  <div className='w-px h-6 bg-gray-300' />

                  {/* Inspector 检查元素按钮 */}
                  <InspectorToggle active={inspectorActive} onToggle={onInspectorToggle} />

                  {/* 分隔线 */}
                  <div className='w-px h-6 bg-gray-300' />

                  {/* 适应画布按钮 */}
                  <Button
                    size='sm'
                    variant='flat'
                    startContent={<MdFitScreen className='w-4 h-4' />}
                    onPress={() => {
                      if (previewPanelRef.current?.fitToCanvas) {
                        previewPanelRef.current.fitToCanvas()
                      }
                    }}
                  >
                    适应画布
                  </Button>
                  {/* 分隔线 */}
                  <div className='w-px h-6 bg-gray-300' />

                  {/* 缩放进度条 */}
                  <div className='flex flex-1 gap-2 items-center max-w-96'>
                    <span className='text-xs text-gray-500 whitespace-nowrap'>缩放:</span>
                    <Slider
                      aria-label='缩放比例'
                      size='md'
                      color='success'
                      step={1}
                      maxValue={500}
                      minValue={10}
                      // showOutline={true}
                      value={scale * 100}
                      onChange={(value) => {
                        const scaleValue = Array.isArray(value) ? value[0] : value
                        setScale(scaleValue / 100)
                      }}
                      className='flex-1'
                    />
                    <span className='text-xs font-medium text-gray-700 tabular-nums min-w-[50px] text-right'>
                      {Math.round(scale * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* 预览画布 */}
              <div className='overflow-hidden flex-1'>
                <PreviewPanel
                  ref={previewPanelRef}
                  platform="" // 已移除平台概念，传递空字符串或移除该属性
                  templateId={selectedTemplate}
                  data={templateData}
                  loadError={loadError}
                  qrCodeDataUrl={qrCodeDataUrl}
                  scale={scale}
                  onScaleChange={setScale}
                  onComponentLoadComplete={handleComponentLoadComplete}
                />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}
