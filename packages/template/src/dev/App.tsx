import { Breadcrumbs, Button, ButtonGroup, Toolbar } from '@heroui/react'
import { Camera, Moon, Palette, RefreshCw, Sun } from 'lucide-react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { LuInfo } from 'react-icons/lu'
import { MdFitScreen, MdInfoOutline } from 'react-icons/md'
import { Group, Panel, Separator } from 'react-resizable-panels'

import { getEnabledComponents } from '../config/config'
import { DataService } from '../services/DataService'
import { PlatformType } from '../types/platforms'
import { DataFileSelector } from './components/DataFileSelector'
import { MockDataEditorModal } from './components/MockDataEditorModal'
import { PanelThemeControls } from './components/PanelThemeControls'
import { PlatformSelector } from './components/PlatformSelector'
import { PreviewPanel } from './components/PreviewPanel'
import { ScreenshotPreviewModal } from './components/ScreenshotPreviewModal'
import { getVersionEnabled, toggleVersionEnabled } from './utils/versionConfig'

const PANEL_ACCENT_STORAGE_KEY = 'dev-panel-accent'

const normalizeHexColor = (value: string) => {
  const normalized = value.trim().replace('#', '')

  if (normalized.length === 3) {
    return `#${normalized.split('').map(char => `${char}${char}`).join('')}`.toLowerCase()
  }

  return `#${normalized.slice(0, 6)}`.toLowerCase()
}

const getContrastTextColor = (hexColor: string) => {
  const hex = normalizeHexColor(hexColor).replace('#', '')
  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000

  return luminance >= 150 ? '#09090b' : '#fafafa'
}

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
  const [isPanelThemeModalOpen, setIsPanelThemeModalOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('dev-panel-dark-mode')
    return saved !== null ? saved === 'true' : false
  })
  const [panelAccentOverride, setPanelAccentOverride] = React.useState<string | null>(() => {
    const saved = localStorage.getItem(PANEL_ACCENT_STORAGE_KEY)
    return saved ? normalizeHexColor(saved) : null
  })
  
  // 版本信息开关状态
  const [versionEnabled, setVersionEnabled] = React.useState(() => getVersionEnabled())

  // 保存深色模式设置
  React.useEffect(() => {
    localStorage.setItem('dev-panel-dark-mode', String(isDarkMode))
  }, [isDarkMode])

  React.useEffect(() => {
    if (panelAccentOverride) {
      localStorage.setItem(PANEL_ACCENT_STORAGE_KEY, panelAccentOverride)
      return
    }

    localStorage.removeItem(PANEL_ACCENT_STORAGE_KEY)
  }, [panelAccentOverride])

  React.useEffect(() => {
    const nextTheme = isDarkMode ? 'dark' : 'light'
    const root = document.documentElement
    const body = document.body

    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    root.classList.add(nextTheme)
    body.classList.add(nextTheme)
    root.dataset.theme = nextTheme
    body.dataset.theme = nextTheme
    root.style.colorScheme = nextTheme
    body.style.colorScheme = nextTheme
  }, [isDarkMode])
  
  // 切换版本信息开关
  const handleToggleVersion = () => {
    const newValue = toggleVersionEnabled()
    setVersionEnabled(newValue)
  }

  const dataService = DataService.getInstance()
  const previewPanelRef = React.useRef<{ 
    captureScreenshot: (tempDarkMode?: boolean) => Promise<{ blob: Blob; download: () => void; copyToClipboard: () => Promise<void> } | null>; 
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

  // 全局屏蔽空格键，防止误触开关
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 屏蔽空格键，除非在输入框、文本域等可编辑元素中
      if (e.code === 'Space' || e.key === ' ') {
        const target = e.target as HTMLElement
        
        // 检查是否在可编辑元素中
        const isEditable = 
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        
        // 检查是否在 Monaco Editor 中
        const isInMonaco = target.closest('.monaco-editor') !== null
        
        if (!isEditable && !isInMonaco) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    // 在捕获阶段拦截，优先级最高
    document.addEventListener('keydown', handleKeyDown, true)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [])

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
   * @param tempDarkMode 临时深色模式（可选，仅在重新截图时使用）
   */
  const handleCapture = async (tempDarkMode?: boolean) => {
    setIsCapturing(true)
    try {
      // 通过 ref 调用 PreviewPanel 的截图方法，传递临时深色模式
      if (previewPanelRef.current) {
        const result = await previewPanelRef.current.captureScreenshot(tempDarkMode)
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

  const shellTheme = isDarkMode ? 'dark' : 'light'
  const componentTheme = templateData?.useDarkTheme ? 'dark' : 'light'
  const resolvedPanelAccent = panelAccentOverride ?? (isDarkMode ? '#fafafa' : '#111111')
  const resolvedPanelAccentForeground = getContrastTextColor(resolvedPanelAccent)
  const resolvedPanelAccentHover = `color-mix(in oklab, ${resolvedPanelAccent} 88%, ${isDarkMode ? '#09090b' : '#fafafa'} 12%)`
  const resolvedPanelAccentSoft = `color-mix(in oklab, ${resolvedPanelAccent} 14%, transparent)`
  const resolvedPanelAccentSoftHover = `color-mix(in oklab, ${resolvedPanelAccent} 20%, transparent)`
  const resolvedPanelDefault = isDarkMode ? '#18181b' : '#f4f4f5'
  const resolvedPanelDefaultHover = isDarkMode ? '#232326' : '#ededed'
  const panelThemeStyle = React.useMemo<React.CSSProperties>(() => ({
    ['--background' as any]: isDarkMode ? '#09090b' : '#fafafa',
    ['--foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--surface' as any]: isDarkMode ? '#111113' : '#ffffff',
    ['--surface-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--surface-secondary' as any]: isDarkMode ? '#18181b' : '#f5f5f5',
    ['--surface-secondary-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--surface-tertiary' as any]: isDarkMode ? '#232326' : '#efefef',
    ['--surface-tertiary-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--overlay' as any]: isDarkMode ? '#111113' : '#ffffff',
    ['--overlay-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--muted' as any]: isDarkMode ? '#a1a1aa' : '#71717a',
    ['--scrollbar' as any]: isDarkMode ? '#3f3f46' : '#d4d4d8',
    ['--default' as any]: resolvedPanelDefault,
    ['--default-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--segment' as any]: isDarkMode ? '#18181b' : '#f4f4f5',
    ['--segment-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--border' as any]: isDarkMode ? '#27272a' : '#e4e4e7',
    ['--separator' as any]: isDarkMode ? '#232326' : '#ededed',
    ['--accent' as any]: resolvedPanelAccent,
    ['--accent-foreground' as any]: resolvedPanelAccentForeground,
    ['--accent-soft' as any]: resolvedPanelAccentSoft,
    ['--accent-soft-foreground' as any]: resolvedPanelAccent,
    ['--backdrop' as any]: isDarkMode ? 'rgba(0, 0, 0, 0.72)' : 'rgba(250, 250, 250, 0.82)',
    ['--focus' as any]: resolvedPanelAccent,
    ['--link' as any]: resolvedPanelAccent,
    ['--field-background' as any]: isDarkMode ? '#111113' : '#ffffff',
    ['--field-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--field-placeholder' as any]: isDarkMode ? '#71717a' : '#a1a1aa',
    ['--field-border' as any]: isDarkMode ? '#27272a' : '#e4e4e7',
    ['--field-border-width' as any]: '1px',
    ['--color-accent' as any]: resolvedPanelAccent,
    ['--color-accent-hover' as any]: resolvedPanelAccentHover,
    ['--color-accent-foreground' as any]: resolvedPanelAccentForeground,
    ['--color-accent-soft' as any]: resolvedPanelAccentSoft,
    ['--color-accent-soft-hover' as any]: resolvedPanelAccentSoftHover,
    ['--color-accent-soft-foreground' as any]: resolvedPanelAccent,
    ['--color-default' as any]: resolvedPanelDefault,
    ['--color-default-hover' as any]: resolvedPanelDefaultHover,
    ['--color-default-foreground' as any]: isDarkMode ? '#fafafa' : '#09090b',
    ['--surface-shadow' as any]: 'none',
    ['--overlay-shadow' as any]: 'none',
    ['--field-shadow' as any]: 'none'
  }), [
    isDarkMode,
    resolvedPanelAccent,
    resolvedPanelAccentForeground,
    resolvedPanelAccentHover,
    resolvedPanelAccentSoft,
    resolvedPanelAccentSoftHover,
    resolvedPanelDefault,
    resolvedPanelDefaultHover
  ])
  const templateParts = selectedTemplate.split('/')
  const dataFileLabel = selectedDataFile.replace(/\.json$/, '')
  
  return (
    <div className={shellTheme} data-theme={shellTheme} style={panelThemeStyle}>
      <div className='h-screen overflow-hidden bg-background text-foreground transition-colors duration-300'>
        <Group orientation='horizontal' className='h-full w-full'>
          <Panel defaultSize='18%' minSize='16%' maxSize='28%' id='sidebar'>
            <aside className='flex h-full min-w-0 flex-col border-r border-border bg-background'>
              <div className='flex h-14 shrink-0 items-center border-b border-border px-4'>
                <div className='flex w-full items-center justify-between gap-3'>
                  <div className='flex min-w-0 items-center gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 230 221"
                        className='h-6 w-6'
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

                    <div className='min-w-0'>
                      <div className='text-[10px] font-semibold tracking-[0.24em] text-muted uppercase'>
                        KKK Dev Panel
                      </div>
                      <div className='text-sm font-semibold leading-tight text-foreground'>组件开发工作台</div>
                    </div>
                  </div>

                  <Button
                    aria-label='GitHub 仓库'
                    isIconOnly
                    onPress={() => window.open('https://github.com/ikenxuan/karin-plugin-kkk', '_blank', 'noopener,noreferrer')}
                    size='sm'
                    variant='secondary'
                  >
                    <FaGithub className='size-4' />
                  </Button>
                </div>
              </div>

              <div className='min-h-0 flex-1 overflow-y-auto px-4 py-4'>
                <div className='space-y-3'>
                  <PlatformSelector
                    selectedPlatform={selectedPlatform}
                    selectedTemplate={selectedTemplate}
                    onPlatformChange={handlePlatformChange}
                    onTemplateChange={handleTemplateChange}
                  />

                  <DataFileSelector
                    availableDataFiles={availableDataFiles}
                    selectedDataFile={selectedDataFile}
                    onDataFileChange={handleDataFileChange}
                    onSaveNewDataFile={handleSaveNewDataFile}
                    onRefreshFiles={loadAvailableFiles}
                    onEdit={() => setIsEditorOpen(true)}
                    isDarkMode={isDarkMode}
                    panelTheme={shellTheme}
                    panelThemeStyle={panelThemeStyle}
                  />
                </div>
              </div>
            </aside>
          </Panel>

          <Separator />

          <Panel defaultSize='82%' minSize='64%' id='preview'>
            <section className='flex h-full min-w-0 flex-col bg-background'>
              <div className='flex h-14 shrink-0 items-center border-b border-border px-4'>
                <div className='flex w-full items-center justify-between gap-3'>
                  <div className='min-w-0 space-y-0.5'>
                    <div className='overflow-hidden'>
                      <Breadcrumbs isDisabled className='gap-1 text-sm text-muted'>
                        <Breadcrumbs.Item href='#'>{selectedPlatform}</Breadcrumbs.Item>
                        {templateParts.map((part, index) => (
                          <Breadcrumbs.Item
                            key={`${part}-${index}`}
                            href={index === templateParts.length - 1 ? undefined : '#'}
                          >
                            {part}
                          </Breadcrumbs.Item>
                        ))}
                      </Breadcrumbs>
                    </div>
                    <div className='text-[11px] leading-tight text-muted'>
                      数据文件：{dataFileLabel} · 面板：{shellTheme === 'dark' ? '深色' : '浅色'} · 子组件：{componentTheme === 'dark' ? '深色' : '浅色'}
                    </div>
                  </div>

                  <Toolbar
                    aria-label='预览操作'
                    className='flex flex-wrap gap-1.5 rounded-xl border border-border bg-surface p-1.5'
                    isAttached
                  >
                    <ButtonGroup size='sm' variant='outline'>
                      <Button onPress={() => loadData(selectedDataFile)}>
                        <RefreshCw className='size-4' />
                        重载
                      </Button>
                      <Button onPress={() => previewPanelRef.current?.fitToCanvas()}>
                        <ButtonGroup.Separator />
                        <MdFitScreen className='size-4' />
                        适应
                      </Button>
                      <Button isDisabled={isCapturing} onPress={() => handleCapture()}>
                        <ButtonGroup.Separator />
                        <Camera className='size-4' />
                        截图
                      </Button>
                    </ButtonGroup>

                    <Button
                      onPress={() => setIsPanelThemeModalOpen(true)}
                      size='sm'
                      variant='outline'
                    >
                      <Palette className='size-4' />
                      面板主题
                    </Button>

                    <Button
                      onPress={handleToggleVersion}
                      size='sm'
                      variant='outline'
                    >
                      {versionEnabled ? (
                        <LuInfo className='size-4' />
                      ) : (
                        <MdInfoOutline className='size-4' />
                      )}
                      {versionEnabled ? '版本信息' : '隐藏版本'}
                    </Button>

                    <Button
                      isDisabled={!templateData}
                      onPress={() => handleThemeChange(!templateData?.useDarkTheme)}
                      size='sm'
                      variant='primary'
                    >
                      {templateData?.useDarkTheme ? (
                        <Sun className='size-4' />
                      ) : (
                        <Moon className='size-4' />
                      )}
                      组件{componentTheme === 'dark' ? '深色' : '浅色'}
                    </Button>
                  </Toolbar>
                </div>
              </div>

              <div className='min-h-0 flex-1'>
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
                  versionEnabled={versionEnabled}
                />
              </div>
            </section>
          </Panel>
        </Group>
      </div>
      <ScreenshotPreviewModal
        isOpen={isScreenshotModalOpen}
        onClose={() => setIsScreenshotModalOpen(false)}
        screenshotResult={screenshotResult}
        isDarkMode={isDarkMode}
        onRetakeScreenshot={handleCapture}
        isCapturing={isCapturing}
        componentDarkMode={templateData?.useDarkTheme || false}
      />
      <PanelThemeControls
        isDarkMode={isDarkMode}
        isMonochromeAccent={panelAccentOverride === null}
        isOpen={isPanelThemeModalOpen}
        panelAccent={resolvedPanelAccent}
        panelTheme={shellTheme}
        panelThemeStyle={panelThemeStyle}
        onAccentChange={(hex) => setPanelAccentOverride(normalizeHexColor(hex))}
        onOpenChange={setIsPanelThemeModalOpen}
        onResetAccent={() => setPanelAccentOverride(null)}
        onThemeModeChange={setIsDarkMode}
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
    </div>
  )
}
