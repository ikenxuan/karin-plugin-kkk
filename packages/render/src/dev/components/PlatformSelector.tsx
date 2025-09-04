import React from 'react'
import { Card, CardBody, CardHeader, Tabs, Tab, Chip } from '@heroui/react'
import { Settings } from 'lucide-react'
import { PlatformType, PlatformConfig } from '../../types/platforms'
import { platformConfigs } from '../../config/platforms'

interface PlatformSelectorProps {
  /** 当前选中的平台 */
  selectedPlatform: PlatformType
  /** 当前选中的模板ID */
  selectedTemplate: string
  /** 平台变更回调 */
  onPlatformChange: (platform: PlatformType) => void
  /** 模板变更回调 */
  onTemplateChange: (templateId: string) => void
}

/**
 * 平台选择组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  selectedTemplate,
  onPlatformChange,
  onTemplateChange
}) => {
  const currentPlatformConfig = platformConfigs.find(config => config.type === selectedPlatform)
  const enabledTemplates = currentPlatformConfig?.templates.filter(t => t.enabled) || []

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Settings className="w-5 h-5" />
          <h3 className="text-lg font-semibold">平台与模板</h3>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        {/* 平台选择 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-70">选择平台</label>
          <Tabs
            selectedKey={selectedPlatform}
            onSelectionChange={(key) => {
              const platform = key as PlatformType
              onPlatformChange(platform)
              // 自动选择第一个启用的模板
              const firstTemplate = platformConfigs
                .find(config => config.type === platform)
                ?.templates.find(t => t.enabled)
              if (firstTemplate) {
                onTemplateChange(firstTemplate.id)
              }
            }}
            color="primary"
            variant="bordered"
            className="w-full"
          >
            {platformConfigs.map(config => (
              <Tab
                key={config.type}
                title={
                  <div className="flex gap-2 items-center">
                    <span>{config.icon}</span>
                    <span>{config.name}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>

        {/* 模板选择 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-70">选择模板</label>
          <Tabs
            selectedKey={selectedTemplate}
            onSelectionChange={(key) => onTemplateChange(key as string)}
            color={currentPlatformConfig?.color as any || 'primary'}
            variant="bordered"
            className="w-full"
          >
            {enabledTemplates.map(template => (
              <Tab
                key={template.id}
                title={
                  <div className="flex gap-2 items-center">
                    <span>{template.name}</span>
                    {!template.enabled && (
                      <Chip size="sm" color="warning" variant="flat">
                        开发中
                      </Chip>
                    )}
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>
      </CardBody>
    </Card>
  )
}