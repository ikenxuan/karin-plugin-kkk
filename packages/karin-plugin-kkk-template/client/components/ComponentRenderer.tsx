import React from 'react'

import { templates } from 'virtual:karin-templates'
import type { BaseTemplateProps } from '../../src/types/config'

interface ComponentRendererProps {
  templateId: string
  data: any
  loadError?: Error | null
}

/**
 * 组件渲染器 - 根据模板ID渲染对应组件
 */
export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  templateId,
  data,
  loadError
}) => {
  if (loadError) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        加载失败: {loadError.message}
      </div>
    )
  }

  // 查找匹配的模板
  const template = templates.find(t => t.id === templateId)

  if (!template) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        未找到模板: {templateId}
      </div>
    )
  }

  const Component = template.component as React.ComponentType<BaseTemplateProps>

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component data={data || {}} />
    </React.Suspense>
  )
}
