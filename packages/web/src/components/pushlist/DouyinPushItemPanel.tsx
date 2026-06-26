import { Accordion, Description, Input, Label, Switch, TextField } from '@heroui/react'
import { ChevronDown } from 'lucide-react'

import DisabledFieldHint from './DisabledFieldHint'
import { getPushlistGridClass } from './layout'
import { douyinPushTypeOptions } from './options'
import { DeletePushItemButton, FilterModeField, GroupIdsField, KeywordTagFields, PushTypeField } from './PushlistFields'
import type { DouyinPushItem, DouyinPushType, PushlistDevice } from './types'

interface DouyinPushItemPanelProps {
  item: DouyinPushItem
  index: number
  list: DouyinPushItem[]
  onChange: (list: DouyinPushItem[]) => void
  device: PushlistDevice
}

const DouyinPushItemPanel = ({ item, index, list, onChange, device }: DouyinPushItemPanelProps) => {
  const updateItem = (updates: Partial<DouyinPushItem>) => {
    const nextList = [...list]
    nextList[index] = { ...item, ...updates }
    onChange(nextList)
  }

  const disabled = !item.switch
  const itemLabel = item.remark || item.short_id || item.sec_uid || '未命名'
  const disabledMessage = `开启【${itemLabel}】的推送开关后才能编辑此字段`

  return (
    <Accordion.Item key={index} id={`douyin-${index}`}>
      <Accordion.Heading>
        <Accordion.Trigger>
          <div className="flex flex-1 items-center gap-3">
            <div onClick={(event) => event.stopPropagation()} onPointerDown={(event) => event.stopPropagation()}>
              <Switch aria-label="推送开关" isSelected={item.switch} onChange={(isSelected) => updateItem({ switch: isSelected })}>
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium">{item.remark || item.short_id || item.sec_uid || `推送项 ${index + 1}`}</span>
              <Description className="text-xs">
                {item.short_id && `抖音号: ${item.short_id}`}
                {item.sec_uid && !item.short_id && `sec_uid: ${item.sec_uid.slice(0, 20)}...`}
              </Description>
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
                  value={item.short_id}
                  onChange={(value) => updateItem({ short_id: value })}
                >
                  <Label>抖音号</Label>
                  <Input placeholder="用户的抖音号" variant="secondary" />
                  <Description>用户的抖音号（short_id），必填</Description>
                </TextField>
              </DisabledFieldHint>

              <DisabledFieldHint disabled={disabled} device={device} message={disabledMessage}>
                <TextField fullWidth isDisabled={disabled} value={item.sec_uid} onChange={(value) => updateItem({ sec_uid: value })}>
                  <Label>sec_uid</Label>
                  <Input placeholder="选填，会根据抖音号自动获取" variant="secondary" />
                  <Description>用户的 sec_uid，可从分享链接获取。选填，推送时会自动获取</Description>
                </TextField>
              </DisabledFieldHint>
            </div>

            <DisabledFieldHint disabled={disabled} device={device} message={disabledMessage}>
              <TextField fullWidth isDisabled={disabled} value={item.remark} onChange={(value) => updateItem({ remark: value })}>
                <Label>备注名称</Label>
                <Input placeholder="可选，用于识别该推送项" variant="secondary" />
                <Description>方便识别的名称，如：博主昵称</Description>
              </TextField>
            </DisabledFieldHint>

            <GroupIdsField
              disabled={disabled}
              device={device}
              itemLabel={itemLabel}
              value={item.group_id}
              onChange={(group_id) => updateItem({ group_id })}
            />
            <PushTypeField<DouyinPushType>
              disabled={disabled}
              device={device}
              itemLabel={itemLabel}
              options={douyinPushTypeOptions}
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

export default DouyinPushItemPanel
