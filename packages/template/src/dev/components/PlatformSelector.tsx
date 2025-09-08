import { Card, CardBody, CardHeader, Chip, Radio, RadioGroup } from '@heroui/react'
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
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className='flex gap-2 items-center'>
          <Settings className='w-4 h-4' />
          <h3 className='text-lg font-semibold'>平台与组件</h3>
        </div>
      </CardHeader>
      <CardBody className='pt-0 space-y-3'>
        {/* 平台选择 - 使用RadioGroup */}
        <div>
          <label className='block mb-1 font-medium text-md text-gray-70'>选择平台</label>
          <RadioGroup
            value={selectedPlatform}
            onValueChange={(value) => {
              const platform = value as PlatformType
              onPlatformChange(platform)
              // 自动选择第一个启用的组件
              const firstComponent = getEnabledComponents(platform)[0]
              if (firstComponent) {
                onTemplateChange(firstComponent.id)
              }
            }}
            orientation='horizontal'
            className='flex flex-wrap gap-2'
            size='sm'
          >
            {componentConfigs.map(config => (
              <Radio
                key={config.type}
                value={config.type}
                className='flex-shrink-0'
                size='sm'
              >
                <div className='flex gap-1 items-center text-lg'>
                  <span>{config.name}</span>
                </div>
              </Radio>
            ))}
          </RadioGroup>
        </div>

        {/* 组件选择 - 隐藏滚动条但保留滚动功能，全宽选项 */}
        <div>
          <label className='block mb-1 font-medium text-md text-gray-70'>选择组件</label>
          <div className='overflow-y-scroll max-h-32 scrollbar-hide'>
            <RadioGroup
              value={selectedTemplate}
              onValueChange={onTemplateChange}
              className='space-y-1'
              size='sm'
            >
              {currentPlatformConfig?.components.map(component => (
                <Radio
                  key={component.id}
                  value={component.id}
                  className='w-full'
                  classNames={{
                    base: 'inline-flex w-full max-w-full bg-content1 m-0 active:scale-[0.98] transition-all duration-150 items-center justify-start cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent data-[selected=true]:border-primary',
                    wrapper: 'flex-shrink-0',
                    labelWrapper: 'flex-1 ml-1'
                  }}
                  size='sm'
                >
                  <div className='flex justify-between items-center w-full'>
                    <span className='font-medium text-md'>{component.name}</span>
                    <div className='flex gap-1 items-center'>
                      {!component.enabled && (
                        <Chip size='sm' color='warning' variant='flat' className='h-4 text-xs'>
                          开发中
                        </Chip>
                      )}
                    </div>
                  </div>
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}