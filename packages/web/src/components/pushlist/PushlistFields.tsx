import { Button, Checkbox, CheckboxGroup, Description, Label, ListBox, Select } from '@heroui/react'
import { Trash2 } from 'lucide-react'

import ChipList from './ChipList'
import DisabledFieldHint from './DisabledFieldHint'
import GroupMappingsField from './GroupMappingsField'
import { getPushlistGridClass } from './layout'
import { filterModeOptions } from './options'
import type { PushFilterMode, PushlistDevice, PushTypeOption } from './types'

interface CommonDisabledFieldProps {
  disabled: boolean
  itemLabel: string
  device: PushlistDevice
}

interface GroupIdsFieldProps extends CommonDisabledFieldProps {
  value: string[]
  onChange: (groupIds: string[]) => void
}

export const GroupIdsField = ({ disabled, itemLabel, device, value, onChange }: GroupIdsFieldProps) => (
  <GroupMappingsField disabled={disabled} device={device} itemLabel={itemLabel} value={value} onChange={onChange} />
)

interface PushTypeFieldProps<T extends string> extends CommonDisabledFieldProps {
  options: Array<PushTypeOption<T>>
  value: T[]
  onChange: (values: T[]) => void
}

export const PushTypeField = <T extends string>({ disabled, itemLabel, device, options, value, onChange }: PushTypeFieldProps<T>) => (
  <DisabledFieldHint disabled={disabled} device={device} message={`开启【${itemLabel}】的推送开关后才能编辑此字段`}>
    <CheckboxGroup aria-label="推送类型" isDisabled={disabled} value={value} onChange={(values) => onChange(values as T[])}>
      <Label>推送类型</Label>
      <Description>选择要推送的内容类型</Description>
      <div className={`mt-2 ${getPushlistGridClass(device)}`}>
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label>{option.label}</Label>
              <Description>{option.description}</Description>
            </Checkbox.Content>
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  </DisabledFieldHint>
)

interface FilterModeFieldProps extends CommonDisabledFieldProps {
  value: PushFilterMode
  onChange: (value: PushFilterMode) => void
}

export const FilterModeField = ({ disabled, itemLabel, device, value, onChange }: FilterModeFieldProps) => (
  <DisabledFieldHint disabled={disabled} device={device} message={`开启【${itemLabel}】的推送开关后才能编辑此字段`}>
    <Select
      fullWidth
      isDisabled={disabled}
      value={value}
      onChange={(nextValue) => {
        if (nextValue && !Array.isArray(nextValue)) {
          onChange(nextValue as PushFilterMode)
        }
      }}
    >
      <Label>过滤模式</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Description>设置关键词/标签的过滤方式</Description>
      <Select.Popover>
        <ListBox>
          {filterModeOptions.map((option) => (
            <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
              <div className="flex flex-col gap-1">
                <Label>{option.label}</Label>
                <Description>{option.description}</Description>
              </div>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  </DisabledFieldHint>
)

interface KeywordTagFieldsProps extends CommonDisabledFieldProps {
  keywords: string[]
  tags: string[]
  onKeywordsChange: (keywords: string[]) => void
  onTagsChange: (tags: string[]) => void
}

export const KeywordTagFields = ({
  disabled,
  itemLabel,
  device,
  keywords,
  tags,
  onKeywordsChange,
  onTagsChange
}: KeywordTagFieldsProps) => {
  const disabledMessage = `开启【${itemLabel}】的推送开关后才能编辑此字段`

  return (
    <>
      <DisabledFieldHint disabled={disabled} device={device} message={disabledMessage}>
        <div>
          <ChipList
            label="关键词"
            description="多个关键词用于内容过滤"
            disabled={disabled}
            items={keywords}
            onAdd={(value) => onKeywordsChange([...keywords, value])}
            onRemove={(value) => onKeywordsChange(keywords.filter((keyword) => keyword !== value))}
          />
        </div>
      </DisabledFieldHint>

      <DisabledFieldHint disabled={disabled} device={device} message={disabledMessage}>
        <div>
          <ChipList
            label="标签"
            description="多个标签用于内容过滤"
            disabled={disabled}
            items={tags}
            onAdd={(value) => onTagsChange([...tags, value])}
            onRemove={(value) => onTagsChange(tags.filter((tag) => tag !== value))}
          />
        </div>
      </DisabledFieldHint>
    </>
  )
}

interface DeletePushItemButtonProps {
  onDelete: () => void
}

export const DeletePushItemButton = ({ onDelete }: DeletePushItemButtonProps) => (
  <Button className="w-full" variant="danger" onPress={onDelete}>
    <Trash2 className="size-4" />
    <span>删除此推送项</span>
  </Button>
)
