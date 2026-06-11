import { Button, Description, Label, Tooltip } from '@heroui/react'
import { Pencil, Trash2 } from 'lucide-react'

import TargetMappingDisplay from './TargetMappingDisplay'
import { formatTargetValue } from './targetUtils'
import type { PushTargetMapping, PushlistDevice } from './types'

interface GroupMappingDraftListProps {
  device: PushlistDevice
  mappings: PushTargetMapping[]
  onEdit: (value: string) => void
  onRemove: (value: string) => void
}

const GroupMappingDraftList = ({ device, mappings, onEdit, onRemove }: GroupMappingDraftListProps) => (
  <div className={device === 'mobile' ? 'flex min-h-0 min-w-0 flex-1 flex-col gap-4' : 'flex min-w-0 flex-col gap-3'}>
    <div>
      <Label>已配置目标</Label>
      <Description>{mappings.length} 个推送目标</Description>
    </div>

    {mappings.length > 0 ? (
      <div
        className={
          device === 'mobile' ? 'flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-2' : 'flex max-h-72 flex-col gap-2 overflow-y-auto'
        }
      >
        {mappings.map((mapping) => {
          const value = formatTargetValue(mapping)

          return (
            <div key={value} className="flex min-w-0 items-start gap-2 rounded-lg border border-default-200 bg-default-50/50 p-2.5">
              <div className="min-w-0 flex-1">
                <TargetMappingDisplay compact mapping={mapping} stacked={device === 'mobile'} />
              </div>
              <Tooltip delay={0}>
                <Button isIconOnly aria-label="编辑推送目标" size="sm" variant="tertiary" onPress={() => onEdit(value)}>
                  <Pencil className="size-4" />
                </Button>
                <Tooltip.Content showArrow placement="top">
                  <Tooltip.Arrow />
                  编辑
                </Tooltip.Content>
              </Tooltip>
              <Tooltip delay={0}>
                <Button isIconOnly aria-label="删除推送目标" size="sm" variant="danger" onPress={() => onRemove(value)}>
                  <Trash2 className="size-4" />
                </Button>
                <Tooltip.Content showArrow placement="top">
                  <Tooltip.Arrow />
                  删除
                </Tooltip.Content>
              </Tooltip>
            </div>
          )
        })}
      </div>
    ) : (
      <div className="rounded-lg border border-dashed border-default-300 px-4 py-5 text-sm text-muted">
        还没有推送目标，点击上方按钮添加。
      </div>
    )}
  </div>
)

export default GroupMappingDraftList
