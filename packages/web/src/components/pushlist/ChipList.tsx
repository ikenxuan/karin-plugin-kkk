import { useState } from 'react'
import { Button, Chip, Description, FieldError, Input, Label, TextField } from '@heroui/react'
import { Plus, Trash2 } from 'lucide-react'

interface ChipListProps {
  label: string
  description: string
  items: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  disabled?: boolean
}

const ChipList = ({ label, description, items, onAdd, onRemove, disabled = false }: ChipListProps) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const handleAdd = () => {
    const trimmed = inputValue.trim()

    if (!trimmed) {
      setError('请输入内容')
      return
    }

    if (items.includes(trimmed)) {
      setError('该项已存在，请勿重复添加')
      return
    }

    onAdd(trimmed)
    setInputValue('')
    setError('')
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <TextField
          className="flex-1"
          isDisabled={disabled}
          isInvalid={Boolean(error)}
          value={inputValue}
          onChange={(value) => {
            setInputValue(value)
            if (error) setError('')
          }}
        >
          <Input
            placeholder={`输入${label}`}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleAdd()
              }
            }}
          />
          {error ? <FieldError>{error}</FieldError> : null}
        </TextField>
        <Button isDisabled={disabled} variant="secondary" onPress={handleAdd}>
          <Plus className="size-4" />
        </Button>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip key={item} color="accent" variant="soft">
              <span>{item}</span>
              {!disabled ? (
                <button
                  type="button"
                  className="ml-1 rounded-full p-0.5 hover:bg-black/10"
                  onClick={() => onRemove(item)}
                >
                  <Trash2 className="size-3" />
                </button>
              ) : null}
            </Chip>
          ))}
        </div>
      ) : (
        <Description>暂无{label}</Description>
      )}

      <Description>{description}</Description>
    </div>
  )
}

export default ChipList

