import { Card, CardBody, CardHeader } from '@heroui/react'
import { Settings } from 'lucide-react'
import React, { useMemo } from 'react'

import { templates } from 'virtual:karin-templates'

interface TemplateSelectorProps {
  /** 当前选中的组件ID */
  selectedTemplate: string
  /** 组件变更回调 */
  onTemplateChange: (componentId: string) => void
}

/**
 * 模板选择组件 (移除平台概念，直接展示所有模板)
 */
export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange
}) => {
  
  // 对模板进行简单的排序
  const sortedTemplates = useMemo(() => {
    return [...templates].sort((a, b) => a.id.localeCompare(b.id))
  }, [])

  return (
    <Card className='w-full'>
      <CardHeader className="pb-2">
        <div className='flex gap-2 items-center'>
          <Settings className='w-4 h-4' />
          <h3 className='text-lg font-semibold'>选择组件</h3>
        </div>
      </CardHeader>
      <CardBody className='pt-0 space-y-3'>
        <div className='overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide'>
          <div className='grid gap-2'>
            {sortedTemplates.map(component => (
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
                    className='flex-shrink-0 w-4 h-4 text-primary'
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className='text-sm font-medium leading-snug break-words'>{ component.id}</span>
                    <span className='text-xs text-gray-500 truncate'>{component.entry}</span>
                  </div>
                </label>
              ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
