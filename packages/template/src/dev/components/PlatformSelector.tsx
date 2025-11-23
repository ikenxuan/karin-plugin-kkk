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
    <Card className='w-full'>
      <CardHeader className="pb-2">
        <div className='flex gap-2 items-center'>
          <Settings className='w-4 h-4' />
          <h3 className='text-lg font-semibold'>平台与组件</h3>
        </div>
      </CardHeader>
      <CardBody className='pt-0 space-y-3'>
        {/* 平台选择 - 响应式网格布局 */}
        <div>
          <label className='block mb-2 font-medium text-sm text-gray-700'>选择平台</label>
          <div 
            className='grid gap-2'
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))'
            }}
          >
            {componentConfigs.map(config => (
              <label
                key={config.type}
                className={`
                  flex items-center justify-start cursor-pointer rounded-lg gap-2 px-3 py-2.5 min-h-[52px]
                  border-2 transition-all duration-150 active:scale-[0.98]
                  ${selectedPlatform === config.type 
                ? 'border-primary bg-blue-50 shadow-sm' 
                : 'border-gray-200 bg-white hover:bg-gray-50'
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
                  className='w-4 h-4 text-primary flex-shrink-0'
                />
                <span className='text-sm font-medium flex-1 leading-snug break-words'>{config.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 组件选择 */}
        <div>
          <label className='block mb-2 font-medium text-sm text-gray-700'>选择组件</label>
          <div className='overflow-y-auto max-h-64 scrollbar-hide'>
            <div 
              className='grid gap-2'
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))'
              }}
            >
              {currentPlatformConfig?.components
                .filter(component => component.enabled)
                .map(component => (
                  <label
                    key={component.id}
                    className={`
                      flex items-center justify-start cursor-pointer rounded-lg gap-2 px-3 py-2.5 min-h-[52px]
                      border-2 transition-all duration-150 active:scale-[0.98]
                      ${selectedTemplate === component.id 
                    ? 'border-primary bg-blue-50 shadow-sm' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
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
                      className='w-4 h-4 text-primary flex-shrink-0'
                    />
                    <span className='text-sm font-medium flex-1 leading-snug break-words'>{component.name}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}