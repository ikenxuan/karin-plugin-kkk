import React, { useState, useEffect } from 'react'
import { Button, Chip } from '@heroui/react'
import { RefreshCw, Save, Palette } from 'lucide-react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { PlatformType } from '../types/platforms'
import { DataService } from '../services/DataService'
import { PlatformSelector } from './components/PlatformSelector'
import { QuickSettings } from './components/QuickSettings'
import { JsonEditor } from './components/JsonEditor'
import { PreviewPanel } from './components/PreviewPanel'

/**
 * 开发环境主应用组件
 */
export const App: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>(PlatformType.DOUYIN)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('dynamic')
  const [templateData, setTemplateData] = useState<any>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [scale, setScale] = useState(0.5)
  const [isLoading, setIsLoading] = useState(false)
  const [availableDataFiles, setAvailableDataFiles] = useState<string[]>([])
  const [selectedDataFile, setSelectedDataFile] = useState<string>('default.json')

  const dataService = DataService.getInstance()

  // 加载数据
  useEffect(() => {
    loadData()
    loadAvailableFiles()
  }, [selectedPlatform, selectedTemplate])

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

  return (
    <div className="overflow-hidden h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 顶部导航 */}
      <div className="flex-shrink-0 h-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center px-4 h-full">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Palette className="flex-shrink-0 w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">Render 开发环境</h1>
            </div>
            <Chip color="primary" variant="flat" size="sm">
              HMR 已启用
            </Chip>
            {selectedDataFile && (
              <Chip color="secondary" variant="flat" size="sm">
                {selectedDataFile.replace('.json', '')}
              </Chip>
            )}
          </div>
          <div className="flex flex-shrink-0 gap-2 items-center">
            <Button
              color="success"
              variant="flat"
              startContent={<RefreshCw className="w-4 h-4" />}
              onPress={() => loadData()}
              isLoading={isLoading}
              size="sm"
            >
              重新加载
            </Button>
            <Button
              color="primary"
              startContent={<Save className="w-4 h-4" />}
              onPress={saveData}
              isLoading={isLoading}
              size="sm"
            >
              保存数据
            </Button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 - 使用可调整大小的面板 */}
      <div className="h-[calc(100vh-5rem)] overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* 左侧控制面板 - 可调整大小，独立滚动 */}
          <Panel
            defaultSize={30}
            minSize={20}
            maxSize={50}
            className="bg-white border-r border-gray-200"
          >
            <div className="overflow-y-auto h-full scrollbar-hide">
              <div className="p-4 space-y-4">
                {/* 平台与模板选择 */}
                <div className="flex-shrink-0">
                  <PlatformSelector
                    selectedPlatform={selectedPlatform}
                    selectedTemplate={selectedTemplate}
                    onPlatformChange={setSelectedPlatform}
                    onTemplateChange={setSelectedTemplate}
                  />
                </div>

                {/* 快速设置 */}
                <div className="flex-shrink-0">
                  <QuickSettings
                    platform={selectedPlatform}
                    templateId={selectedTemplate}
                    data={templateData}
                    onChange={handleFieldChange}
                  />
                </div>

                {/* JSON编辑器 */}
                <div className="flex-shrink-0">
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
          <PanelResizeHandle className="flex justify-center items-center w-2 bg-gray-100 transition-colors duration-200 hover:bg-gray-200 cursor-col-resize group">
            <div className="w-1 h-8 bg-gray-300 rounded-full transition-colors duration-200 group-hover:bg-gray-400"></div>
          </PanelResizeHandle>

          {/* 右侧预览面板 - 可调整大小，独立滚动 */}
          <Panel
            defaultSize={70}
            minSize={50}
            className="bg-gray-50"
          >
            <div className="overflow-hidden h-full">
              <PreviewPanel
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