import { Autocomplete, Avatar, Description, EmptyState, Label, ListBox, SearchField, useFilter } from '@heroui/react'

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

const TargetSelect = ({ label, description, placeholder, disabled = false, items, selectedId, onSelect }: TargetSelectProps) => {
  const { contains } = useFilter({ sensitivity: 'base' })

  return (
    <Autocomplete
      fullWidth
      allowsEmptyCollection
      isDisabled={disabled}
      placeholder={placeholder}
      selectionMode="single"
      value={selectedId || null}
      variant="secondary"
      onChange={(key) => onSelect(String(key ?? ''))}
    >
      <Label>{label}</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value className="min-w-0">
          {({ defaultChildren, isPlaceholder, state }) => {
            if (isPlaceholder || state.selectedItems.length === 0) return defaultChildren

            const selected = items.find((item) => item.id === state.selectedItems[0]?.key)
            if (!selected) return defaultChildren

            return (
              <span className="flex min-w-0 items-center gap-2">
                <Avatar className="size-4 shrink-0" size="sm">
                  <Avatar.Image alt={selected.name} src={selected.avatar} />
                  <Avatar.Fallback>{selected.name.slice(0, 1)}</Avatar.Fallback>
                </Avatar>
                <span className="truncate">{selected.name}</span>
              </span>
            )
          }}
        </Autocomplete.Value>
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Description>{description}</Description>
      {!disabled && items.length === 0 ? <Description className="text-warning">当前没有可选项</Description> : null}
      <Autocomplete.Popover className="max-h-72">
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus aria-label={`搜索${label}`} variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="搜索名称或 ID…" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox items={items} renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
            {(item) => (
              <ListBox.Item id={item.id} textValue={`${item.name} ${item.id} ${item.description}`}>
                <Avatar className="shrink-0" size="sm">
                  <Avatar.Image alt={item.name} src={item.avatar} />
                  <Avatar.Fallback>{item.name.slice(0, 1)}</Avatar.Fallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Label className="max-w-full truncate">{item.name}</Label>
                  <Description className="truncate">{item.description}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  )
}

export default TargetSelect
