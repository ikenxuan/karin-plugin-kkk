import { Avatar, Description, Label, ListBox, Select } from '@heroui/react'

export interface TargetSelectOption {
  id: string
  name: string
  avatar: string
  description: string
}

interface TargetSelectProps {
  label: string
  description: string
  placeholder: string
  disabled?: boolean
  items: TargetSelectOption[]
  selectedId: string
  onSelect: (id: string) => void
}

const TargetSelect = ({ label, description, placeholder, disabled = false, items, selectedId, onSelect }: TargetSelectProps) => (
  <Select
    fullWidth
    allowsEmptyCollection
    isDisabled={disabled}
    placeholder={placeholder}
    value={selectedId || null}
    variant="secondary"
    onChange={(key) => onSelect(String(key || ''))}
  >
    <Label>{label}</Label>
    <Select.Trigger>
      <Select.Value>
        {({ defaultChildren, isPlaceholder, state }) => {
          if (isPlaceholder || state.selectedItems.length === 0) return defaultChildren

          const selected = items.find((item) => item.id === state.selectedItems[0]?.key)
          if (!selected) return defaultChildren

          return (
            <span className="flex min-w-0 items-center gap-3">
              <Avatar size="sm">
                <Avatar.Image alt={selected.name} src={selected.avatar} />
                <Avatar.Fallback>{selected.name.slice(0, 1)}</Avatar.Fallback>
              </Avatar>
              <span className="min-w-0">
                <span className="block truncate">{selected.name}</span>
                <span className="block truncate text-xs text-muted">{selected.description}</span>
              </span>
            </span>
          )
        }}
      </Select.Value>
      <Select.Indicator />
    </Select.Trigger>
    <Description>{description}</Description>
    {!disabled && items.length === 0 ? <Description className="text-warning">当前没有可选项</Description> : null}
    <Select.Popover className="max-h-72">
      <ListBox items={items}>
        {(item) => (
          <ListBox.Item id={item.id} textValue={`${item.name} ${item.description}`}>
            <div className="flex min-w-0 items-center gap-3">
              <Avatar size="sm">
                <Avatar.Image alt={item.name} src={item.avatar} />
                <Avatar.Fallback>{item.name.slice(0, 1)}</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <Label className="truncate">{item.name}</Label>
                <Description className="truncate">{item.description}</Description>
              </div>
            </div>
            <ListBox.ItemIndicator />
          </ListBox.Item>
        )}
      </ListBox>
    </Select.Popover>
  </Select>
)

export default TargetSelect
