import { Accordion, Description, Input, Label, Switch, TextField } from '@heroui/react'
import { ChevronDown } from 'lucide-react'

import DisabledFieldHint from './DisabledFieldHint'
import { getPushlistGridClass } from './layout'
import { bilibiliPushTypeOptions } from './options'
import { DeletePushItemButton, FilterModeField, GroupIdsField, KeywordTagFields, PushTypeField } from './PushlistFields'
import type { BilibiliPushItem, BilibiliPushType, PushlistDevice } from './types'

interface BilibiliPushItemPanelProps {
  item: BilibiliPushItem
  index: number
  list: BilibiliPushItem[]
  onChange: (list: BilibiliPushItem[]) => void
  device: PushlistDevice
}

const BilibiliPushItemPanel = ({ item, index, list, onChange, device }: BilibiliPushItemPanelProps) => {
  const updateItem = (updates: Partial<BilibiliPushItem>) => {
    const nextList = [...list]
    nextList[index] = { ...item, ...updates }
    onChange(nextList)
  }

  const disabled = !item.switch
  const itemLabel = item.remark || `UID: ${item.host_mid}` || '未命名'
  const disabledMessage = `开启【${itemLabel}】的推送开关后才能编辑此字段`

  return (
    <Accordion.Item key={index} id={`bilibili-${index}`}>
      <Accordion.Heading>
        <Accordion.Trigger>
          <div className="flex flex-1 items-center gap-3">
            <div onClick={(event) => event.stopPropagation()} onPointerDown={(event) => event.stopPropagation()}>
              <Switch isSelected={item.switch} onChange={(isSelected) => updateItem({ switch: isSelected })}>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium">{item.remark || `UID: ${item.host_mid}` || `推送项 ${index + 1}`}</span>
              <Description className="text-xs">B站 UID: {item.host_mid}</Description>
            </div>
          </div>
          <Accordion.Indicator>
            <ChevronDown className="size-5" />
          </Accordion.Indicator>
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>
          <div className="space-y-4">
            <div className={getPushlistGridClass(device)}>
              <DisabledFieldHint disabled={disabled} device={device} message={disabledMessage}>
                <TextField
                  fullWidth
                  isDisabled={disabled}
                  isRequired
                  type="number"
                  value={String(item.host_mid)}
                  onChange={(value) => updateItem({ host_mid: Number(value) || 0 })}
                >
                  <Label>B站 UID</Label>
                  <Input placeholder="UP主的 UID" />
                  <Description>B站用户的唯一标识，必填</Description>
                </TextField>
              </DisabledFieldHint>

              <DisabledFieldHint disabled={disabled} device={device} message={disabledMessage}>
                <TextField fullWidth isDisabled={disabled} value={item.remark} onChange={(value) => updateItem({ remark: value })}>
                  <Label>备注名称</Label>
                  <Input placeholder="可选，用于识别该推送项" />
                  <Description>方便识别的名称，如：UP主昵称</Description>
                </TextField>
              </DisabledFieldHint>
            </div>

            <GroupIdsField
              disabled={disabled}
              device={device}
              itemLabel={itemLabel}
              value={item.group_id}
              onChange={(group_id) => updateItem({ group_id })}
            />
            <PushTypeField<BilibiliPushType>
              disabled={disabled}
              device={device}
              itemLabel={itemLabel}
              options={bilibiliPushTypeOptions}
              value={item.pushTypes || []}
              onChange={(pushTypes) => updateItem({ pushTypes })}
            />
            <FilterModeField
              disabled={disabled}
              device={device}
              itemLabel={itemLabel}
              value={item.filterMode || 'blacklist'}
              onChange={(filterMode) => updateItem({ filterMode })}
            />
            <KeywordTagFields
              disabled={disabled}
              device={device}
              itemLabel={itemLabel}
              keywords={item.Keywords || []}
              tags={item.Tags || []}
              onKeywordsChange={(Keywords) => updateItem({ Keywords })}
              onTagsChange={(Tags) => updateItem({ Tags })}
            />
            <DeletePushItemButton onDelete={() => onChange(list.filter((_, itemIndex) => itemIndex !== index))} />
          </div>
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default BilibiliPushItemPanel
