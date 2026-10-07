import { Button, Description, Drawer, Label } from '@heroui/react'
import { ArrowRightLeft, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { getPushBots, type BotInfo } from '../../api/pushTargets'
import BotQuickSwitchDialog from './BotQuickSwitchDialog'
import GroupMappingDraftList from './GroupMappingDraftList'
import GroupMappingEditorDrawer from './GroupMappingEditorDrawer'
import { formatTargetValue, normalizeTargetValues, parseTargetValue } from './targetUtils'
import type { PushTargetMapping, PushlistDevice } from './types'

interface GroupMappingDrawerProps {
  isOpen: boolean
  values: string[]
  mappings: PushTargetMapping[]
  device: PushlistDevice
  /** 所属推送对象的展示名，用于快捷切换对话框的预览 */
  itemLabel?: string
  onOpenChange: (isOpen: boolean) => void
  onApply: (values: string[]) => void
}

type MappingDetails = Record<string, PushTargetMapping>

interface DraftMappingResult {
  values: string[]
  mappings: PushTargetMapping[]
}

const toDraftMappings = (values: string[], mappings: PushTargetMapping[], localDetails: MappingDetails): DraftMappingResult => {
  const normalizedValues = normalizeTargetValues(values)
  const draftMappings = normalizedValues
    .map((value) => {
      const parsed = parseTargetValue(value)
      const detail = localDetails[value] || mappings.find((item) => formatTargetValue(item) === value)
      if (!parsed) return null

      const mapping: PushTargetMapping = {
        groupId: parsed.groupId,
        botId: parsed.botId
      }
      if (detail?.groupName) mapping.groupName = detail.groupName
      if (detail?.groupAvatar) mapping.groupAvatar = detail.groupAvatar
      if (detail?.botName) mapping.botName = detail.botName
      if (detail?.botAvatar) mapping.botAvatar = detail.botAvatar
      if (detail?.isOnline !== undefined) mapping.isOnline = detail.isOnline

      return mapping
    })
    .filter((item): item is PushTargetMapping => Boolean(item))

  return { values: normalizedValues, mappings: draftMappings }
}

const GroupMappingDrawer = ({ isOpen, values, mappings, device, itemLabel, onOpenChange, onApply }: GroupMappingDrawerProps) => {
  const [draftValues, setDraftValues] = useState(() => normalizeTargetValues(values))
  const [localDetails, setLocalDetails] = useState<MappingDetails>({})
  const [editingValue, setEditingValue] = useState<string | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [switchOpen, setSwitchOpen] = useState(false)
  const [bots, setBots] = useState<BotInfo[]>([])
  const draft = useMemo(() => toDraftMappings(draftValues, mappings, localDetails), [draftValues, localDetails, mappings])
  const placement = device === 'desktop' ? 'right' : 'bottom'
  const buttonSize = device === 'mobile' ? 'sm' : 'md'
  const editorInitialMapping = editingValue ? parseTargetValue(editingValue) : null

  useEffect(() => {
    if (!isOpen) return

    // 仅用于切换后立即富化草稿条目的 Bot 展示信息，失败时退化为显示 Bot ID
    getPushBots()
      .then(setBots)
      .catch(() => setBots([]))
  }, [isOpen])

  // 抽屉关闭期间外部可能改写了 values（如平台级 Bot 快捷切换），重置草稿避免关闭时用旧值覆盖
  useEffect(() => {
    if (isOpen) return

    setDraftValues(normalizeTargetValues(values))
    setLocalDetails({})
  }, [isOpen, values])

  const openEditor = (value: string | null) => {
    setEditingValue(value)
    setEditorOpen(true)
  }

  const removeTarget = (value: string) => {
    setDraftValues((current) => current.filter((item) => item !== value))
    setLocalDetails((current) => {
      const nextDetails = { ...current }
      delete nextDetails[value]
      return nextDetails
    })
  }

  const writeTarget = (mapping: PushTargetMapping) => {
    const nextValue = formatTargetValue(mapping)
    const nextValues = [...draftValues]
    const editingIndex = editingValue ? nextValues.indexOf(editingValue) : -1

    if (editingIndex >= 0) {
      nextValues[editingIndex] = nextValue
    } else {
      nextValues.unshift(nextValue)
    }

    setDraftValues(normalizeTargetValues(nextValues))
    setLocalDetails((current) => {
      const nextDetails = { ...current, [nextValue]: mapping }
      if (editingValue && editingValue !== nextValue) delete nextDetails[editingValue]
      return nextDetails
    })
    setEditorOpen(false)
    setEditingValue(null)
  }

  const finish = () => {
    onApply(draft.values)
  }

  /** 快捷切换对话框的应用回调：写回草稿并立即富化新条目的展示信息 */
  const handleQuickSwitchApply = (nextValues: string[][]) => {
    const next = normalizeTargetValues(nextValues[0] ?? draftValues)

    const nextDetails: MappingDetails = {}
    next.forEach((value) => {
      if (draftValues.includes(value)) return

      const parsed = parseTargetValue(value)
      if (!parsed) return

      const oldValue = draftValues.find((item) => parseTargetValue(item)?.groupId === parsed.groupId)
      const previousDetail = oldValue ? localDetails[oldValue] || mappings.find((item) => formatTargetValue(item) === oldValue) : undefined
      const bot = bots.find((item) => item.id === parsed.botId)

      const mapping: PushTargetMapping = { groupId: parsed.groupId, botId: parsed.botId }
      if (previousDetail?.groupName) mapping.groupName = previousDetail.groupName
      if (previousDetail?.groupAvatar) mapping.groupAvatar = previousDetail.groupAvatar
      if (bot?.name) mapping.botName = bot.name
      if (bot?.avatar) mapping.botAvatar = bot.avatar
      if (bot) mapping.isOnline = bot.isOnline
      nextDetails[value] = mapping
    })

    setDraftValues(next)
    setLocalDetails((current) => {
      const merged = { ...current, ...nextDetails }
      draftValues.forEach((value) => {
        if (!next.includes(value)) delete merged[value]
      })
      return merged
    })
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onApply(draft.values)
    }
    onOpenChange(open)
  }

  return (
    <>
      <Drawer.Backdrop isOpen={isOpen} onOpenChange={handleOpenChange} variant="blur">
        <Drawer.Content placement={placement}>
          <Drawer.Dialog className={device === 'desktop' ? 'h-full w-130 max-w-[90vw]' : 'max-h-[84dvh]'}>
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>推送目标</Drawer.Heading>
              <Description>管理所有接收推送的群和 Bot 映射。</Description>
            </Drawer.Header>
            <Drawer.Body className="flex min-h-0 flex-col gap-3">
              <div className="rounded-lg border border-default-200 bg-default-50/50 p-3">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <Label>快捷切换 Bot</Label>
                    <Description>把本推送对象的推送目标从当前 Bot 切换到目标 Bot，先应用到下方草稿。</Description>
                  </div>
                  <Button
                    className="self-start"
                    size={buttonSize}
                    variant="secondary"
                    isDisabled={draftValues.length === 0}
                    onPress={() => setSwitchOpen(true)}
                  >
                    <ArrowRightLeft className="size-4" />
                    <span>切换 Bot</span>
                  </Button>
                </div>
              </div>

              <Button className="self-start" size={buttonSize} onPress={() => openEditor(null)}>
                <Plus className="size-4" />
                添加推送目标
              </Button>

              <GroupMappingDraftList
                device={device}
                mappings={draft.mappings}
                onEdit={(value) => openEditor(value)}
                onRemove={removeTarget}
              />
            </Drawer.Body>
            <Drawer.Footer>
              <Button size={buttonSize} slot="close" variant="secondary">
                取消
              </Button>
              <Button size={buttonSize} slot="close" onPress={finish}>
                完成
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>

      <GroupMappingEditorDrawer
        key={editingValue || 'new'}
        device={device}
        initialMapping={editorInitialMapping}
        isOpen={editorOpen}
        onConfirm={writeTarget}
        onOpenChange={setEditorOpen}
      />

      <BotQuickSwitchDialog
        device={device}
        isOpen={switchOpen}
        items={[
          {
            label: itemLabel || '本推送对象',
            description: '',
            values: draftValues
          }
        ]}
        title="快捷切换 Bot"
        description="把本推送对象的推送目标从当前 Bot 切换到目标 Bot，先应用到抽屉草稿。"
        appliedHint="完成抽屉并保存配置后生效"
        onApply={handleQuickSwitchApply}
        onOpenChange={setSwitchOpen}
      />
    </>
  )
}

export default GroupMappingDrawer
