import { Card, CardBody, CardHeader } from '@heroui/react'
import { Settings } from 'lucide-react'
import React from 'react'

// 使用新的配置系统
import { componentConfigs, getEnabledComponents, getPlatformConfig } from '../../config/config'
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
    <Card className='w-full bg-content1/60 backdrop-blur-md border border-divider shadow-sm' shadow='none'>
      <CardHeader className="pb-2 pt-2.5">
        <div className='flex gap-2 items-center'>
          <Settings className='w-4 h-4 text-foreground-600' />
          <h3 className='text-sm font-semibold text-foreground'>平台与组件</h3>
        </div>
      </CardHeader>
      <CardBody className='pt-0 space-y-3 px-3 pb-3'>
        {/* 平台选择 */}
        <div>
          <label className='block mb-2 px-1 text-xs font-semibold text-foreground-500 uppercase tracking-wide'>平台</label>
          <div className='grid grid-cols-2 gap-2'>
            {componentConfigs.map(config => (
              <label
                key={config.type}
                className={`
                  flex items-center justify-start cursor-pointer rounded-lg gap-2 px-3 py-2
                  border transition-all duration-200
                  ${selectedPlatform === config.type 
                ? 'border-primary bg-primary/10 shadow-sm' 
                : 'border-divider bg-content3/50 hover:bg-content3 hover:border-default-300'
              }
                `}
                onClick={() => {
                  onPlatformChange(config.type)
                  const firstComponent = getEnabledComponents(config.type)[0]
                  if (firstComponent) {
                    onTemplateChange(firstComponent.id)
                  }
                }}
              >
                <input
                  type='radio'
                  name='platform'
                  value={config.type}
                  checked={selectedPlatform === config.type}
                  onChange={() => {}}
                  className='w-3.5 h-3.5 text-primary shrink-0 cursor-pointer'
                />
                <span className='flex-1 text-sm font-medium leading-tight text-foreground'>{config.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 组件选择 */}
        <div>
          <label className='block mb-2 px-1 text-xs font-semibold text-foreground-500 uppercase tracking-wide'>组件</label>
          <div className='overflow-y-auto max-h-[calc(100vh-450px)] scrollbar-hide'>
            <div className='grid grid-cols-2 gap-2'>
              {currentPlatformConfig?.components
                .filter(component => component.enabled)
                .map(component => (
                  <label
                    key={component.id}
                    className={`
                      flex items-center justify-start cursor-pointer rounded-lg gap-2 px-3 py-2
                      border transition-all duration-200
                      ${selectedTemplate === component.id 
                    ? 'border-primary bg-primary/10 shadow-sm' 
                    : 'border-divider bg-content3/50 hover:bg-content3 hover:border-default-300'
                  }
                    `}
                    onClick={() => onTemplateChange(component.id)}
                  >
                    <input
                      type='radio'
                      name='template'
                      value={component.id}
                      checked={selectedTemplate === component.id}
                      onChange={() => {}}
                      className='w-3.5 h-3.5 text-primary shrink-0 cursor-pointer'
                    />
                    <span className='flex-1 text-sm font-medium leading-tight text-foreground'>{component.name}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}