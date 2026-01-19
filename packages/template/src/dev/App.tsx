import { Camera, RefreshCw } from 'lucide-react'
import React from 'react'
import { MdFitScreen } from 'react-icons/md'
import { Group, Panel, Separator } from 'react-resizable-panels'

import { getEnabledComponents } from '../config/config'
import { DataService } from '../services/DataService'
import { PlatformType } from '../types/platforms'
import { DataFileSelector } from './components/DataFileSelector'
import { MockDataEditorModal } from './components/MockDataEditorModal'
import { PlatformSelector } from './components/PlatformSelector'
import { PreviewPanel } from './components/PreviewPanel'
import { ScreenshotPreviewModal } from './components/ScreenshotPreviewModal'

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
 * 开发环境主应用组件
 */
export const App: React.FC = () => {
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

  const [screenshotResult, setScreenshotResult] = React.useState<{ blob: Blob; download: () => void; copyToClipboard: () => Promise<void> } | null>(null)
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = React.useState(false)
  const [isEditorOpen, setIsEditorOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('dev-panel-dark-mode')
    return saved !== null ? saved === 'true' : false
  })

  // 保存深色模式设置
  React.useEffect(() => {
    localStorage.setItem('dev-panel-dark-mode', String(isDarkMode))
  }, [isDarkMode])

  const dataService = DataService.getInstance()
  const previewPanelRef = React.useRef<{ 
    captureScreenshot: () => Promise<{ blob: Blob; download: () => void; copyToClipboard: () => Promise<void> } | null>; 
    fitToCanvas: () => void 
  }>(null)


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
   * 保存当前数据文件
   * @param data JSON 数据
   */
  const handleSaveCurrentData = async (data: any) => {
    try {
      await dataService.saveTemplateData(selectedPlatform, selectedTemplate, data, selectedDataFile)
      // 不需要手动重载，HMR 会处理
      console.log('数据保存成功')
    } catch (error) {
      console.error('保存数据失败:', error)
      throw error
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
        const result = await previewPanelRef.current.captureScreenshot()
        if (result) {
          setScreenshotResult(result)
          setIsScreenshotModalOpen(true)
        }
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
    <>
      <div className='flex h-screen bg-background'>
        {/* 左侧垂直工具栏 */}
        <div 
          className={`w-16 bg-content1/95 backdrop-blur-xl shrink-0 flex flex-col items-center py-6 border-r border-divider ${isDarkMode ? 'dark' : ''}`}
        >
          {/* Logo 区域 */}
          <div className='flex flex-col items-center gap-2 mb-6'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 230 221"
              className="w-10 h-10 text-foreground"
            >
              <path
                d="M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z"
                fill="currentColor"
              />
              <path
                d="M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z"
                fill="currentColor"
              />
              <path
                d="M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z"
                fill="currentColor"
              />
            </svg>
          </div>
        
          <div className='w-10 h-px bg-divider mb-6' />

          {/* 面板深色模式切换 */}
          <div className='flex flex-col items-center gap-2 mb-4'>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className='p-2 active:scale-95 transition-all duration-200 group'
            >
              {isDarkMode ? (
                <svg className='w-6 h-6 text-foreground-400 group-hover:text-warning transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
              ) : (
                <svg className='w-6 h-6 text-foreground-400 group-hover:text-primary transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
                </svg>
              )}
            </button>
            <span className='text-xs font-medium text-foreground-500'>面板</span>
          </div>
        
          {/* 占位 */}
          <div className='flex-1' />

          {/* GitHub 链接 */}
          <div className='flex flex-col items-center gap-2'>
            <a
              href='https://github.com/ikenxuan/karin-plugin-kkk'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 active:scale-95 transition-all duration-200 group'
              title='GitHub 仓库'
            >
              <svg className='w-6 h-6 text-foreground-400 group-hover:text-foreground-600 transition-colors' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
            </a>
            <span className='text-[9px] font-medium text-foreground-500 text-center leading-tight'>GitHub</span>
          </div>
        </div>


        {/* 主要内容区域 */}
        <div className='flex-1 flex overflow-hidden'>
          <Group orientation='horizontal' className='h-full w-full'>
            {/* 左侧控制面板 */}
            <Panel defaultSize='20%' minSize='15%' maxSize='40%' id='sidebar'>
              <div className={`overflow-y-auto h-full scrollbar-hide bg-content1/95 backdrop-blur-xl border-r border-divider ${isDarkMode ? 'dark' : ''}`}>
                {/* 头部状态卡片 */}
                <div className='sticky top-0 z-10 bg-linear-to-b from-content1 via-content1 to-content1/80 backdrop-blur-xl border-b border-divider/60 p-4 pb-3'>
                  <div className='flex flex-col gap-3'>
                    {/* 数据文件标签 */}
                    {selectedDataFile && (
                      <div className='bg-default-100 rounded-lg p-3 border border-divider'>
                        <div className='flex items-center gap-2.5'>
                          <div className='p-1.5 bg-primary/10 rounded-lg'>
                            <svg className='w-4 h-4 text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                            </svg>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='text-[10px] font-medium text-foreground-500 uppercase tracking-wider mb-0.5'>
                              数据文件
                            </div>
                            <div className='text-sm font-semibold text-foreground truncate'>
                              {selectedDataFile.replace('.json', '')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* 平台/模板路径 */}
                    <div className='bg-default-50/80 rounded-xl p-2.5 border border-default-200/50'>
                      <div className='flex items-center gap-1 flex-wrap'>
                        {/* 平台图标 */}
                        <div className='p-1 bg-default-100 rounded-md'>
                          <svg className='w-3.5 h-3.5 text-default-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' />
                          </svg>
                        </div>
                        
                        {/* 平台名称 */}
                        <span className='text-xs font-semibold text-default-700 px-1.5'>
                          {selectedPlatform}
                        </span>
                        
                        {/* 分隔符 */}
                        <svg className='w-3 h-3 text-default-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                        
                        {/* 模板路径 */}
                        {selectedTemplate.split('/').map((part, index, array) => (
                          <React.Fragment key={index}>
                            <span 
                              className={`text-xs font-medium px-1.5 py-0.5 rounded-md transition-colors ${
                                index === array.length - 1 
                                  ? 'bg-primary/15 text-primary font-semibold' 
                                  : 'text-default-600'
                              }`}
                            >
                              {part}
                            </span>
                            {index < array.length - 1 && (
                              <svg className='w-2.5 h-2.5 text-default-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                              </svg>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 内容区域 */}
                <div className='p-4 space-y-4'>
              
                  <PlatformSelector
                    selectedPlatform={selectedPlatform}
                    selectedTemplate={selectedTemplate}
                    onPlatformChange={handlePlatformChange}
                    onTemplateChange={handleTemplateChange}
                  />
                
                  <div className='w-full h-px bg-divider/60' />
                
                  <DataFileSelector
                    availableDataFiles={availableDataFiles}
                    selectedDataFile={selectedDataFile}
                    onDataFileChange={handleDataFileChange}
                    onSaveNewDataFile={handleSaveNewDataFile}
                    onRefreshFiles={loadAvailableFiles}
                    onEdit={() => setIsEditorOpen(true)}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>
            </Panel>

            <Separator />

            {/* 中间垂直工具栏 */}
            <div className={`w-16 bg-content1/95 backdrop-blur-xl shrink-0 flex flex-col items-center py-8 gap-6 border-r border-divider ${isDarkMode ? 'dark' : ''}`}>
              {/* 工具区域 */}
              <div className='flex flex-col items-center gap-6'>
                {/* 重载组件按钮 */}
                <div className='flex flex-col items-center gap-2'>
                  <button
                    onClick={() => loadData(selectedDataFile)}
                    className='p-2 active:scale-95 transition-all duration-200 group'
                  >
                    <RefreshCw className='w-6 h-6 text-foreground-400 group-hover:text-primary transition-colors' />
                  </button>
                  <span className='text-xs font-medium text-foreground-500'>重载</span>
                </div>

                {/* 截图按钮 */}
                <div className='flex flex-col items-center gap-2'>
                  <button
                    onClick={handleCapture}
                    disabled={isCapturing}
                    className='p-2 active:scale-95 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Camera className='w-6 h-6 text-foreground-400 group-hover:text-success transition-colors' />
                  </button>
                  <span className='text-xs font-medium text-foreground-500'>截图</span>
                </div>
            
                {/* 适应画布按钮 */}
                <div className='flex flex-col items-center gap-2'>
                  <button
                    onClick={() => previewPanelRef.current?.fitToCanvas()}
                    className='p-2 active:scale-95 transition-all duration-200 group'
                  >
                    <MdFitScreen className='w-6 h-6 text-foreground-400 group-hover:text-primary transition-colors' />
                  </button>
                  <span className='text-xs font-medium text-foreground-500'>适应</span>
                </div>
              </div>
            
              {/* 分隔线 */}
              <div className='w-12 h-px bg-divider' />
            
              {/* 主题切换 */}
              <div className='flex flex-col items-center gap-2'>
                <button
                  onClick={() => handleThemeChange(!templateData?.useDarkTheme)}
                  className='p-2 active:scale-95 transition-all duration-200 group'
                >
                  {templateData?.useDarkTheme ? (
                    <svg className='w-6 h-6 text-primary group-hover:text-primary/80 transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
                    </svg>
                  ) : (
                    <svg className='w-6 h-6 text-foreground-400 group-hover:text-foreground-600 transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
                    </svg>
                  )}
                </button>
                <span className='text-xs font-medium text-foreground-500'>
                  {templateData?.useDarkTheme ? '浅色' : '深色'}
                </span>
              </div>
            </div>

            {/* 预览面板 */}
            <Panel defaultSize='80%' minSize='60%' id='preview'>
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
                isPanelDarkMode={isDarkMode}
              />
            </Panel>
          </Group>
        </div>
      </div>
      <ScreenshotPreviewModal
        isOpen={isScreenshotModalOpen}
        onClose={() => setIsScreenshotModalOpen(false)}
        screenshotResult={screenshotResult}
        isDarkMode={isDarkMode}
      />
      <MockDataEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={templateData}
        onSave={handleSaveCurrentData}
        platform={selectedPlatform}
        templateId={selectedTemplate}
        availableDataFiles={availableDataFiles}
        selectedDataFile={selectedDataFile}
        onDataFileChange={handleDataFileChange}
        isDarkMode={isDarkMode}
      />
    </>
  )
}