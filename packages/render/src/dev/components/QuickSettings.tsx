import React from 'react'
import { Card, CardBody, CardHeader, Switch } from '@heroui/react'
import { Sliders } from 'lucide-react'
import { PlatformType } from '../../types/platforms'

interface QuickSettingsProps {
  /** 当前平台 */
  platform: PlatformType
  /** 当前模板ID */
  templateId: string
  /** 当前数据 */
  data: any
  /** 数据变更回调 */
  onChange: (field: string, value: any) => void
}

/**
 * 快速设置组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const QuickSettings: React.FC<QuickSettingsProps> = ({
  platform,
  templateId,
  data,
  onChange
}) => {
  if (!data) return null

  return (
    <Card className="w-full">
      <CardHeader className="flex-shrink-0">
        <div className="flex gap-2 items-center">
          <Sliders className="flex-shrink-0 w-5 h-5" />
          <h3 className="text-lg font-semibold whitespace-nowrap">快速设置</h3>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        {/* 只保留深浅色主题切换 */}
        <Switch
          isSelected={data.useDarkTheme || false}
          onValueChange={(checked) => onChange('useDarkTheme', checked)}
          size="md"
          color="primary"
        >
          <span className="text-sm font-medium">深色主题</span>
        </Switch>

        {/* 添加说明文字 */}
        <div className="mt-2 text-xs text-gray-500">
          切换深浅色主题预览效果，数据修改请使用下方JSON编辑器
        </div>
      </CardBody>
    </Card>
  )
}