import { Button, Chip } from '@heroui/react'
import { Camera, Palette, RefreshCw, Save } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

// 使用新的配置系统
import { getEnabledComponents } from '../config/config'
import { DataService } from '../services/DataService'
import { PlatformType } from '../types/platforms'
import { JsonEditor } from './components/JsonEditor'
import { PlatformSelector } from './components/PlatformSelector'
import { PreviewPanel } from './components/PreviewPanel'
import { QuickSettings } from './components/QuickSettings'

/**
 * URL参数接口
 */
interface URLParams {
  /** 平台类型 */
  platform?: PlatformType
  /** 组件ID（可能包含嵌套路径，如 dynamic/DYNAMIC_TYPE_DRAW） */
  template?: string
}

/**
 * 从URL解析参数
 * @returns URL参数对象
 */
const parseURLParams = (): URLParams => {
  const urlParams = new URLSearchParams(window.location.search)
  const platform = urlParams.get('platform') as PlatformType
  const template = urlParams.get('template')

  return {
    platform: platform && Object.values(PlatformType).includes(platform) ? platform : undefined,
    template: template || undefined
  }
}

/**
 * 更新URL参数
 * @param platform 平台类型
 * @param template 组件ID
 */
const updateURLParams = (platform: PlatformType, template: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set('platform', platform)
  url.searchParams.set('template', template)
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

  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>(initialPlatform)
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate)
  const [templateData, setTemplateData] = useState<any>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [scale, setScale] = useState(0.5)
  const [isLoading, setIsLoading] = useState(false)
  const [availableDataFiles, setAvailableDataFiles] = useState<string[]>([])
  const [selectedDataFile, setSelectedDataFile] = useState<string>('default.json')
  const [isCapturing, setIsCapturing] = useState(false)

  const dataService = DataService.getInstance()
  const previewPanelRef = useRef<any>(null)


  // 监听浏览器前进后退按钮
  useEffect(() => {
    const handlePopState = () => {
      const params = parseURLParams()
      if (params.platform && params.template) {
        if (isValidPlatformTemplate(params.platform, params.template)) {
          setSelectedPlatform(params.platform)
          setSelectedTemplate(params.template)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // 初始化时更新URL（确保URL与初始状态同步）
  useEffect(() => {
    updateURLParams(selectedPlatform, selectedTemplate)
  }, [])

  // 加载数据
  useEffect(() => {
    loadData()
    loadAvailableFiles()
  }, [selectedPlatform, selectedTemplate])

  /**
   * 处理平台变更
   * @param platform 新的平台类型
   */
  const handlePlatformChange = (platform: PlatformType) => {
    const defaultTemplate = getDefaultTemplate(platform)
    setSelectedPlatform(platform)
    setSelectedTemplate(defaultTemplate)
    updateURLParams(platform, defaultTemplate)
  }

  /**
   * 处理模板变更
   * @param template 新的模板ID
   */
  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    updateURLParams(selectedPlatform, template)
  }

  /**
   * 加载可用的数据文件列表
   */
  const loadAvailableFiles = async () => {
    try {
      const files = await dataService.getAvailableDataFiles(selectedPlatform, selectedTemplate)
      setAvailableDataFiles(files)
      if (files.includes('default.json')) {
        setSelectedDataFile('default.json')
      } else if (files.length > 0) {
        setSelectedDataFile(files[0])
      }
    } catch (error) {
      console.error('加载文件列表失败:', error)
    }
  }

  /**
   * 加载模板数据
   */
  const loadData = async (filename?: string) => {
    setIsLoading(true)
    try {
      // 加载模板数据
      const data = await dataService.getTemplateData(
        selectedPlatform,
        selectedTemplate,
        filename || selectedDataFile
      )
      setTemplateData(data)

      // 生成二维码，传递正确的主题参数
      if (data?.share_url) {
        const qrDataUrl = await dataService.generateQRCode(data.share_url, data.useDarkTheme || false)
        setQrCodeDataUrl(qrDataUrl)
      }
    } catch (error) {
      console.error('加载数据失败:', error)
      // 如果加载失败，尝试加载默认数据
      try {
        const defaultData = await dataService.getTemplateData(selectedPlatform, selectedTemplate)
        setTemplateData(defaultData)
        if (defaultData?.share_url) {
          const qrDataUrl = await dataService.generateQRCode(defaultData.share_url, defaultData.useDarkTheme || false)
          setQrCodeDataUrl(qrDataUrl)
        }
      } catch (defaultError) {
        console.error('加载默认数据也失败:', defaultError)
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 保存数据
   */
  const saveData = async () => {
    if (!templateData) return

    setIsLoading(true)
    try {
      await dataService.saveTemplateData(
        selectedPlatform,
        selectedTemplate,
        templateData,
        selectedDataFile
      )
      console.log('数据保存成功')
    } catch (error) {
      console.error('保存数据失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 处理字段变更
   * @param field 字段名
   * @param value 新值
   */
  const handleFieldChange = async (field: string, value: any) => {
    if (templateData) {
      const newData = { ...templateData, [field]: value }
      setTemplateData(newData)

      // 如果是主题变更且有分享链接，重新生成二维码
      if (field === 'useDarkTheme' && newData.share_url) {
        try {
          const qrDataUrl = await dataService.generateQRCode(newData.share_url, value)
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
   * @param data 数据
   */
  const handleSaveNewDataFile = async (filename: string, data: any) => {
    try {
      const fullFilename = filename.endsWith('.json') ? filename : `${filename}.json`
      await dataService.saveTemplateData(selectedPlatform, selectedTemplate, data, fullFilename)
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
  
  return (
    <div className='overflow-hidden h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      {/* 顶部导航 */}
      <div className='flex-shrink-0 h-20 bg-white border-b border-gray-200 shadow-sm'>
        <div className='flex justify-between items-center px-4 h-full'>
          <div className='flex gap-4 items-center'>
            <div className='flex gap-2 items-center'>
              <Palette className='flex-shrink-0 w-6 h-6 text-blue-600' />
              <h1 className='text-xl font-bold text-gray-900 whitespace-nowrap'>Template 开发</h1>
            </div>
            <Chip color='primary' variant='flat' size='sm'>
              HMR 已启用
            </Chip>
            {selectedDataFile && (
              <Chip color='secondary' variant='flat' size='sm'>
                {selectedDataFile.replace('.json', '')}
              </Chip>
            )}
            {/* 显示当前路径信息 */}
            <Chip color='default' variant='flat' size='sm'>
              {selectedPlatform}/{selectedTemplate.includes('/') ? selectedTemplate.split('/').join(' → ') : selectedTemplate}
            </Chip>
          </div>
          <div className='flex flex-shrink-0 gap-2 items-center'>
            <Button
              color='success'
              variant='flat'
              startContent={<RefreshCw className='w-4 h-4' />}
              onPress={() => loadData()}
              isLoading={isLoading}
              size='sm'
            >
              重新加载
            </Button>
            <Button
              color='secondary'
              variant='flat'
              startContent={<Camera className='w-4 h-4' />}
              onPress={handleCapture}
              isLoading={isCapturing}
              size='sm'
            >
              截图
            </Button>
            <Button
              color='primary'
              startContent={<Save className='w-4 h-4' />}
              onPress={saveData}
              isLoading={isLoading}
              size='sm'
            >
              保存数据
            </Button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className='h-[calc(100vh-5rem)] overflow-hidden'>
        <PanelGroup direction='horizontal' className='h-full'>
          {/* 左侧控制面板 */}
          <Panel
            defaultSize={30}
            minSize={20}
            maxSize={50}
            className='bg-white border-r border-gray-200'
          >
            <div className='overflow-y-auto h-full scrollbar-hide'>
              <div className='p-4 space-y-4'>
                {/* 平台与模板选择 */}
                <div className='flex-shrink-0'>
                  <PlatformSelector
                    selectedPlatform={selectedPlatform}
                    selectedTemplate={selectedTemplate}
                    onPlatformChange={handlePlatformChange}
                    onTemplateChange={handleTemplateChange}
                  />
                </div>

                {/* 快速设置 */}
                <div className='flex-shrink-0'>
                  <QuickSettings
                    platform={selectedPlatform}
                    templateId={selectedTemplate}
                    data={templateData}
                    onChange={handleFieldChange}
                  />
                </div>

                {/* JSON编辑器 */}
                <div className='flex-shrink-0'>
                  <JsonEditor
                    data={templateData}
                    onChange={setTemplateData}
                    platform={selectedPlatform}
                    templateId={selectedTemplate}
                    availableDataFiles={availableDataFiles}
                    selectedDataFile={selectedDataFile}
                    onDataFileChange={handleDataFileChange}
                    onSaveNewDataFile={handleSaveNewDataFile}
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
            defaultSize={70}
            minSize={50}
            className='bg-gray-50'
          >
            <div className='overflow-hidden h-full'>
              <PreviewPanel
                ref={previewPanelRef}
                platform={selectedPlatform}
                templateId={selectedTemplate}
                data={templateData}
                qrCodeDataUrl={qrCodeDataUrl}
                scale={scale}
                onScaleChange={setScale}
              />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}
