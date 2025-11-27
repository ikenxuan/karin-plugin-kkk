import { Button, Chip, Slider, Switch } from '@heroui/react'
import { Camera, Palette } from 'lucide-react'
import React from 'react'
import { MdFitScreen } from 'react-icons/md'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { getEnabledComponents } from '../config/config'
import { DataService } from '../services/DataService'
import { PlatformType } from '../types/platforms'
import { DataFileSelector } from './components/DataFileSelector'
import { InspectorToggle } from './components/InspectorToggle'
import { PlatformSelector } from './components/PlatformSelector'
import { PreviewPanel } from './components/PreviewPanel'

/**
 * URL参数接口
 */
interface URLParams {
  /** 平台类型 */
  platform?: PlatformType
  /** 组件ID（可能包含嵌套路径，如 dynamic/DYNAMIC_TYPE_DRAW） */
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
  const platform = urlParams.get('platform') as PlatformType
  const template = urlParams.get('template')
  const dataFile = urlParams.get('dataFile')

  return {
    platform: platform && Object.values(PlatformType).includes(platform) ? platform : undefined,
    template: template || undefined,
    dataFile: dataFile || undefined
  }
}

/**
 * 更新URL参数
 * @param platform 平台类型
 * @param template 组件ID
 * @param dataFile 数据文件名（可选）
 */
const updateURLParams = (platform: PlatformType, template: string, dataFile?: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set('platform', platform)
  url.searchParams.set('template', template)
  if (dataFile) {
    url.searchParams.set('dataFile', dataFile)
  } else {
    url.searchParams.delete('dataFile')
  }
  // 使用 replaceState 避免在历史记录中创建过多条目
  window.history.replaceState({}, '', url.toString())
}

/**
 * 验证平台和组件组合是否有效
 * @param platform 平台类型
 * @param componentId 组件ID
 * @returns 是否有效
 */
const isValidPlatformTemplate = (platform: PlatformType, componentId: string): boolean => {
  const enabledComponents = getEnabledComponents(platform)
  return enabledComponents.some(component => component.id === componentId)
}

/**
 * 获取平台的默认组件
 * @param platform 平台类型
 * @returns 默认组件ID
 */
const getDefaultTemplate = (platform: PlatformType): string => {
  const enabledComponents = getEnabledComponents(platform)
  return enabledComponents[0]?.id || 'dynamic'
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
  // 从URL参数初始化状态
  const urlParams = parseURLParams()
  const initialPlatform = urlParams.platform || PlatformType.DOUYIN
  const initialTemplate = urlParams.template && isValidPlatformTemplate(initialPlatform, urlParams.template)
    ? urlParams.template
    : getDefaultTemplate(initialPlatform)

  const [selectedPlatform, setSelectedPlatform] = React.useState<PlatformType>(initialPlatform)
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>(initialTemplate)
  const [templateData, setTemplateData] = React.useState<any>(null)
  const [loadError, setLoadError] = React.useState<Error | null>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>('')
  const [scale, setScale] = React.useState(0.5)
  const [availableDataFiles, setAvailableDataFiles] = React.useState<string[]>([])
  const [selectedDataFile, setSelectedDataFile] = React.useState<string>(urlParams.dataFile || 'default.json')
  const [isCapturing, setIsCapturing] = React.useState(false)

  const dataService = DataService.getInstance()
  const previewPanelRef = React.useRef<{ captureScreenshot: () => Promise<void>; fitToCanvas: () => void }>(null)


  // 监听浏览器前进后退按钮
  React.useEffect(() => {
    const handlePopState = () => {
      const params = parseURLParams()
      if (params.platform && params.template) {
        if (isValidPlatformTemplate(params.platform, params.template)) {
          setSelectedPlatform(params.platform)
          setSelectedTemplate(params.template)
          if (params.dataFile) {
            setSelectedDataFile(params.dataFile)
          }
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // 当平台、模板或数据文件状态变化时更新URL
  React.useEffect(() => {
    updateURLParams(selectedPlatform, selectedTemplate, selectedDataFile !== 'default.json' ? selectedDataFile : undefined)
  }, [selectedPlatform, selectedTemplate, selectedDataFile])

  /**
   * 处理平台变更
   * @param platform 新的平台类型
   */
  const handlePlatformChange = (platform: PlatformType) => {
    const defaultTemplate = getDefaultTemplate(platform)
    setSelectedPlatform(platform)
    setSelectedTemplate(defaultTemplate)
    setSelectedDataFile('default.json')
  }

  /**
   * 处理模板变更
   * @param template 新的模板ID
   */
  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    setSelectedDataFile('default.json')
  }

  /**
   * 加载可用的数据文件列表
   */
  const loadAvailableFiles = React.useCallback(async () => {
    try {
      const files = await dataService.getAvailableDataFiles(selectedPlatform, selectedTemplate)
      setAvailableDataFiles(files)
      
      // 确保选中的文件仍然有效，否则重置为 default.json
      if (files.length > 0) {
        if (files.includes(selectedDataFile)) {
          // 文件仍然存在，保持选中状态
          return
        } else if (files.includes('default.json')) {
          setSelectedDataFile('default.json')
        } else {
          setSelectedDataFile(files[0])
        }
      }
    } catch (error) {
      console.error('加载文件列表失败:', error)
    }
  }, [selectedPlatform, selectedTemplate, selectedDataFile])

  /**
   * 加载模板数据
   */
  const loadData = async (filename?: string) => {
    try {
      setLoadError(null)
      // 加载模板数据
      const data = await dataService.getTemplateData(
        selectedPlatform,
        selectedTemplate,
        filename || selectedDataFile
      )
      setTemplateData(data || {})

      // 生成二维码，传递正确的主题参数
      if (data?.share_url) {
        try {
          const qrDataUrl = await dataService.generateQRCode(data.share_url, data.useDarkTheme || false)
          setQrCodeDataUrl(qrDataUrl)
        } catch (qrError) {
          console.warn('生成二维码失败:', qrError)
        }
      }
    } catch (error) {
      console.error('加载数据失败:', error)
      setLoadError(error instanceof Error ? error : new Error(String(error)))
      // 如果加载失败，尝试加载默认数据
      try {
        const defaultData = await dataService.getTemplateData(selectedPlatform, selectedTemplate)
        setTemplateData(defaultData || {})
        setLoadError(null)
        if (defaultData?.share_url) {
          try {
            const qrDataUrl = await dataService.generateQRCode(defaultData.share_url, defaultData.useDarkTheme || false)
            setQrCodeDataUrl(qrDataUrl)
          } catch (qrError) {
            console.warn('生成二维码失败:', qrError)
          }
        }
      } catch (defaultError) {
        console.error('加载默认数据也失败:', defaultError)
        // 设置最终的错误状态
        setLoadError(defaultError instanceof Error ? defaultError : new Error(String(defaultError)))
        setTemplateData(null)
      }
    }
  }

  /**
   * 处理主题切换
   * @param checked 是否深色主题
   */
  const handleThemeChange = async (checked: boolean) => {
    if (templateData) {
      const newData = { ...templateData, useDarkTheme: checked }
      setTemplateData(newData)

      // 如果有分享链接，重新生成二维码
      if (newData.share_url) {
        try {
          const qrDataUrl = await dataService.generateQRCode(newData.share_url, checked)
          setQrCodeDataUrl(qrDataUrl)
        } catch (error) {
          console.error('重新生成二维码失败:', error)
        }
      }
    }
  }

  /**
   * 处理数据文件变更
   * @param filename 文件名
   */
  const handleDataFileChange = (filename: string) => {
    setSelectedDataFile(filename)
    loadData(filename)
  }

  /**
   * 保存新数据文件
   * @param filename 文件名
   * @param jsonData JSON 数据
   */
  const handleSaveNewDataFile = async (filename: string, jsonData: any) => {
    try {
      const fullFilename = filename.endsWith('.json') ? filename : `${filename}.json`
      await dataService.saveTemplateData(selectedPlatform, selectedTemplate, jsonData, fullFilename)
      await loadAvailableFiles()
      setSelectedDataFile(fullFilename)
      console.log('新数据文件保存成功')
    } catch (error) {
      console.error('保存新数据文件失败:', error)
    }
  }

  /**
   * 处理截图
   */
  const handleCapture = async () => {
    setIsCapturing(true)
    try {
      // 通过 ref 调用 PreviewPanel 的截图方法
      if (previewPanelRef.current) {
        await previewPanelRef.current.captureScreenshot()
      }
    } catch (error) {
      console.error('截图失败:', error)
    } finally {
      setIsCapturing(false)
    }
  }

  // 当平台或模板变更时，加载新的文件列表和数据
  React.useEffect(() => {
    const loadFilesAndData = async () => {
      try {
        const files = await dataService.getAvailableDataFiles(selectedPlatform, selectedTemplate)
        setAvailableDataFiles(files)
      } catch (error) {
        console.error('加载文件列表失败:', error)
      }
    }

    loadFilesAndData()
  }, [selectedPlatform, selectedTemplate])

  // 当数据文件变更时加载数据
  React.useEffect(() => {
    if (selectedDataFile) {
      loadData(selectedDataFile)
    }
  }, [selectedDataFile, selectedPlatform, selectedTemplate])

  // 标记是否需要在加载完成后自动适应画布
  const shouldAutoFitRef = React.useRef(false)

  // 当平台或模板变更时，标记需要自动适应画布
  React.useEffect(() => {
    shouldAutoFitRef.current = true
  }, [selectedPlatform, selectedTemplate])

  /**
   * 组件加载完成回调 - 等待所有资源加载后再执行适应画布动画
   */
  const handleComponentLoadComplete = React.useCallback(() => {
    console.log('组件加载完成，shouldAutoFit:', shouldAutoFitRef.current)
    if (shouldAutoFitRef.current && previewPanelRef.current?.fitToCanvas) {
      previewPanelRef.current.fitToCanvas()
      shouldAutoFitRef.current = false
    }
  }, [])

  // 监听 WebSocket 事件，自动刷新文件列表和数据
  React.useEffect(() => {
    if (!import.meta.hot) return

    const handleDevDataUpdated = () => {
      // 文件已更新，重新加载文件列表和当前数据
      const reloadFiles = async () => {
        try {
          const files = await dataService.getAvailableDataFiles(selectedPlatform, selectedTemplate)
          setAvailableDataFiles(files)
          
          // 重新加载当前选中的数据文件
          if (selectedDataFile) {
            loadData(selectedDataFile)
          }
        } catch (error) {
          console.error('刷新文件列表失败:', error)
        }
      }
      reloadFiles()
    }

    import.meta.hot.on('dev-data-updated', handleDevDataUpdated)

    return () => {
      import.meta.hot?.off('dev-data-updated', handleDevDataUpdated)
    }
  }, [selectedPlatform, selectedTemplate, selectedDataFile])
  
  return (
    <div className='overflow-hidden h-screen bg-linear-to-br from-blue-50 to-indigo-100 font-[HarmonyOSHans-Regular]'>
      {/* 顶部导航 */}
      <div className='shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm'>
        <div className='flex justify-between items-center px-6 h-full'>
          <div className='flex gap-4 items-center'>
            <div className='flex gap-2 items-center'>
              <Palette className='shrink-0 w-6 h-6 text-blue-600' />
              <h1 className='text-xl font-bold text-gray-900 whitespace-nowrap'>Template 开发</h1>
            </div>
            {selectedDataFile && (
              <Chip color='secondary' variant='flat' size='sm'>
                {selectedDataFile.replace('.json', '')}
              </Chip>
            )}
            <Chip color='default' variant='flat' size='sm'>
              {selectedPlatform}/{selectedTemplate.includes('/') ? selectedTemplate.split('/').join(' → ') : selectedTemplate}
            </Chip>
          </div>
          <div className='flex shrink-0 gap-2 items-center'>
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
                {/* 平台与模板选择 */}
                <div className='shrink-0'>
                  <PlatformSelector
                    selectedPlatform={selectedPlatform}
                    selectedTemplate={selectedTemplate}
                    onPlatformChange={handlePlatformChange}
                    onTemplateChange={handleTemplateChange}
                  />
                </div>

                {/* 数据文件选择器 */}
                <div className='shrink-0'>
                  <DataFileSelector
                    availableDataFiles={availableDataFiles}
                    selectedDataFile={selectedDataFile}
                    onDataFileChange={handleDataFileChange}
                    onSaveNewDataFile={handleSaveNewDataFile}
                    onRefreshFiles={loadAvailableFiles}
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
              <div className='shrink-0 px-6 py-3 bg-white border-b border-gray-200'>
                <div className='flex items-center gap-4'>
                  {/* 主题切换开关 */}
                  <div className='flex gap-2 items-center'>
                    <Switch
                      isSelected={templateData?.useDarkTheme || false}
                      onValueChange={handleThemeChange}
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
                    onPress={handleCapture}
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
                  <div className='flex gap-2 items-center flex-1 max-w-96'>
                    <span className='text-xs text-gray-500 whitespace-nowrap'>缩放:</span>
                    <Slider
                      aria-label='缩放比例'
                      size='md'
                      color='success'
                      step={1}
                      maxValue={500}
                      minValue={10}
                      showOutline={true}
                      value={scale * 100}
                      onChange={(value) => {
                        // 如果 value 是数组，取第一个元素
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
              <div className='flex-1 overflow-hidden'>
                <PreviewPanel
                  ref={previewPanelRef}
                  platform={selectedPlatform}
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