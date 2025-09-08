import { Card, CardBody, CardHeader, Chip, Tab, Tabs } from '@heroui/react'
import { Settings } from 'lucide-react'
import React from 'react'

// 使用新的配置系统
import { componentConfigs, getEnabledComponents, getPlatformConfig } from '../../config/components'
import { PlatformType } from '../../types/platforms'

interface PlatformSelectorProps {
  /** 当前选中的平台 */
  selectedPlatform: PlatformType
  /** 当前选中的组件ID */
  selectedTemplate: string
  /** 平台变更回调 */
  onPlatformChange: (platform: PlatformType) => void
  /** 组件变更回调 */
  onTemplateChange: (componentId: string) => void
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
  const currentPlatformConfig = getPlatformConfig(selectedPlatform)

  return (
    <Card>
      <CardHeader>
        <div className='flex gap-2 items-center'>
          <Settings className='w-5 h-5' />
          <h3 className='text-lg font-semibold'>平台与组件</h3>
        </div>
      </CardHeader>
      <CardBody className='space-y-4'>
        {/* 平台选择 */}
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-70'>选择平台</label>
          <Tabs
            selectedKey={selectedPlatform}
            onSelectionChange={(key) => {
              const platform = key as PlatformType
              onPlatformChange(platform)
              // 自动选择第一个启用的组件
              const firstComponent = getEnabledComponents(platform)[0]
              if (firstComponent) {
                onTemplateChange(firstComponent.id)
              }
            }}
            color='primary'
            variant='bordered'
            className='w-full'
          >
            {componentConfigs.map(config => (
              <Tab
                key={config.type}
                title={
                  <div className='flex gap-2 items-center'>
                    <span>{config.icon}</span>
                    <span>{config.name}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>

        {/* 组件选择 */}
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-70'>选择组件</label>
          <Tabs
            selectedKey={selectedTemplate}
            onSelectionChange={(key) => onTemplateChange(key as string)}
            color={currentPlatformConfig?.color as any || 'primary'}
            variant='bordered'
            className='w-full'
          >
            {currentPlatformConfig?.components.map(component => (
              <Tab
                key={component.id}
                title={
                  <div className='flex gap-2 items-center'>
                    <span>{component.name}</span>
                    {!component.enabled && (
                      <Chip size='sm' color='warning' variant='flat'>
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