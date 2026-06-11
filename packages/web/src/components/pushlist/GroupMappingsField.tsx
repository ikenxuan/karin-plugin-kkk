import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Description,
  Label,
  Spinner
} from '@heroui/react'
import { Pencil, TriangleAlert } from 'lucide-react'
import { getPushMappingsBatch, type GroupMappingInfo } from '../../api/pushTargets'
import GroupMappingDrawer from './GroupMappingDrawer'
import DisabledFieldHint from './DisabledFieldHint'
import {
  normalizeTargetValues,
  parseTargetValue
} from './targetUtils'
import type { PushTargetMapping, PushlistDevice } from './types'

interface GroupMappingsFieldProps {
  value: string[]
  disabled: boolean
  itemLabel: string
  device: PushlistDevice
  onChange: (value: string[]) => void
}

const toMapping = (value: string, details?: GroupMappingInfo): PushTargetMapping | null => {
  const parsed = parseTargetValue(value)
  if (!parsed) return null

  const mapping: PushTargetMapping = {
    groupId: parsed.groupId,
    botId: parsed.botId
  }
  if (details?.groupName) mapping.groupName = details.groupName
  if (details?.groupAvatar) mapping.groupAvatar = details.groupAvatar
  if (details?.botName) mapping.botName = details.botName
  if (details?.botAvatar) mapping.botAvatar = details.botAvatar
  if (details?.isOnline !== undefined) mapping.isOnline = details.isOnline

  return mapping
}

const GroupMappingsField = ({ value, disabled, itemLabel, device, onChange }: GroupMappingsFieldProps) => {
  const normalizedValues = useMemo(() => normalizeTargetValues(value), [value])
  const invalidValues = useMemo(() => value.filter((item) => !parseTargetValue(item)), [value])
  const [details, setDetails] = useState<GroupMappingInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const mappings = useMemo(() => {
    return normalizedValues
      .map((item) => {
        const parsed = parseTargetValue(item)
        const detail = parsed
          ? details.find((info) => info.groupId === parsed.groupId && info.botId === parsed.botId)
          : undefined

        return toMapping(item, detail)
      })
      .filter((item): item is PushTargetMapping => Boolean(item))
  }, [details, normalizedValues])

  useEffect(() => {
    const parsedTargets = normalizedValues
      .map(parseTargetValue)
      .filter((item): item is { groupId: string; botId: string } => Boolean(item))

    getPushMappingsBatch(parsedTargets)
      .then(setDetails)
      .catch(() => setDetails([]))
      .finally(() => setLoading(false))
  }, [normalizedValues])

  const handleApply = (nextValues: string[]) => onChange(normalizeTargetValues(nextValues))
  const disabledMessage = `开启【${itemLabel}】的推送开关后才能编辑此字段`
  const targetCountText = normalizedValues.length > 0
    ? `已配置 ${normalizedValues.length} 个推送目标`
    : '还没有配置推送目标'
  const manageButton = (
    <Button
      isDisabled={disabled}
      size={device === 'mobile' ? 'sm' : 'md'}
      variant={device === 'mobile' ? 'primary' : 'secondary'}
      onPress={() => setDrawerOpen(true)}
    >
      <Pencil className="size-4" />
      <span>管理</span>
    </Button>
  )

  return (
    <DisabledFieldHint disabled={disabled} device={device} message={disabledMessage}>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-default-200 bg-default-50/50 px-4 py-3">
          <div className="flex flex-col min-w-0">
            <Label>推送目标</Label>
            <Description className="mt-1">{targetCountText}</Description>
          </div>
          {manageButton}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Spinner size="sm" aria-label="正在读取推送目标" />
            <span>正在读取推送目标</span>
          </div>
        ) : null}

        {invalidValues.length > 0 ? (
          <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm">
            <div className="flex items-center gap-2 font-medium text-warning">
              <TriangleAlert className="size-4" />
              <span>发现 {invalidValues.length} 条旧格式或错误格式</span>
            </div>
            <Description className="mt-1">建议删除后用可视化选择重新添加，避免后端解析异常。</Description>
          </div>
        ) : null}

        {drawerOpen ? (
          <GroupMappingDrawer
            device={device}
            isOpen={drawerOpen}
            mappings={mappings}
            values={normalizedValues}
            onApply={handleApply}
            onOpenChange={setDrawerOpen}
          />
        ) : null}
      </div>
    </DisabledFieldHint>
  )
}

export default GroupMappingsField
