import { Button, Description, Drawer } from '@heroui/react'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'

import GroupMappingDraftList from './GroupMappingDraftList'
import GroupMappingEditorDrawer from './GroupMappingEditorDrawer'
import { formatTargetValue, normalizeTargetValues, parseTargetValue } from './targetUtils'
import type { PushTargetMapping, PushlistDevice } from './types'

interface GroupMappingDrawerProps {
  isOpen: boolean
  values: string[]
  mappings: PushTargetMapping[]
  device: PushlistDevice
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

const GroupMappingDrawer = ({ isOpen, values, mappings, device, onOpenChange, onApply }: GroupMappingDrawerProps) => {
  const [draftValues, setDraftValues] = useState(() => normalizeTargetValues(values))
  const [localDetails, setLocalDetails] = useState<MappingDetails>({})
  const [editingValue, setEditingValue] = useState<string | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const draft = useMemo(() => toDraftMappings(draftValues, mappings, localDetails), [draftValues, localDetails, mappings])
  const placement = device === 'desktop' ? 'right' : 'bottom'
  const editorInitialMapping = editingValue ? parseTargetValue(editingValue) : null

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
    onOpenChange(false)
  }

  return (
    <>
      <Drawer.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} variant="blur">
        <Drawer.Content placement={placement}>
          <Drawer.Dialog className={device === 'desktop' ? 'h-full w-130 max-w-[90vw]' : 'max-h-[84dvh]'}>
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>推送目标</Drawer.Heading>
              <Description>管理所有接收推送的群和 Bot 映射。</Description>
            </Drawer.Header>
            <Drawer.Body className="flex min-h-0 flex-col gap-3">
              <Button className="self-start" size={device === 'mobile' ? 'sm' : 'md'} onPress={() => openEditor(null)}>
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
              <Button size={device === 'mobile' ? 'sm' : 'md'} slot="close" variant="secondary">
                取消
              </Button>
              <Button size={device === 'mobile' ? 'sm' : 'md'} onPress={finish}>
                完成
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>

      {editorOpen ? (
        <GroupMappingEditorDrawer
          key={editingValue || 'new'}
          device={device}
          initialMapping={editorInitialMapping}
          isOpen={editorOpen}
          onConfirm={writeTarget}
          onOpenChange={(open) => {
            setEditorOpen(open)
            if (!open) setEditingValue(null)
          }}
        />
      ) : null}
    </>
  )
}

export default GroupMappingDrawer
