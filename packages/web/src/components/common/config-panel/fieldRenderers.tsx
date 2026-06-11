import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Input,
  Label,
  ListBox,
  Popover,
  Select,
  Switch,
  TextField,
  Tooltip
} from '@heroui/react'
import { Info } from 'lucide-react'
import type { ReactNode } from 'react'

import { getDisabledTooltip } from '../../../config/disabledRules'
import type { ConfigPanelLayoutClasses } from '../../../styles/desktopConfigPanel'
import type { ConfigType } from '../../../types/config'
import { booleanText } from './options'
import type { ConfigDescription, ConfigFieldRenderers, ConfigHelp, ConfigPath, DeviceLayout, SelectOption } from './types'
import { getValue, includesValue, isConfigHelp, toNumber, toPathKey } from './utils'

interface CreateConfigFieldRenderersArgs {
  config: ConfigType
  device: DeviceLayout
  classes: ConfigPanelLayoutClasses
  validationErrors: Record<string, string>
  updateConfigValue: (path: ConfigPath, value: unknown) => void
}

export const createConfigFieldRenderers = ({
  config,
  device,
  classes,
  validationErrors,
  updateConfigValue
}: CreateConfigFieldRenderersArgs): ConfigFieldRenderers => {
  const renderHelp = (help: ConfigDescription) => {
    const normalizedHelp: ConfigHelp = isConfigHelp(help) ? help : { description: help }
    const tooltipContent =
      device === 'mobile' ? (normalizedHelp.mobileContent ?? normalizedHelp.desktopContent) : normalizedHelp.desktopContent

    return (
      <Description className="flex items-center gap-2">
        <span>{normalizedHelp.description}</span>
        {tooltipContent ? (
          <Tooltip delay={0}>
            <Tooltip.Trigger aria-label="查看详细说明">
              <Button isIconOnly size="sm" variant="tertiary">
                <Info className="size-4" aria-hidden="true" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content showArrow placement={device === 'mobile' ? 'bottom' : 'top'}>
              <Tooltip.Arrow />
              <div className="max-w-72">{tooltipContent}</div>
            </Tooltip.Content>
          </Tooltip>
        ) : null}
        {normalizedHelp.extra}
      </Description>
    )
  }

  const wrapWithDisabledTooltip = (element: ReactNode, path: ConfigPath, disabled: boolean) => {
    if (!disabled) return element

    const tooltipMessage = getDisabledTooltip(config, path)
    if (!tooltipMessage) return element

    if (device === 'mobile') {
      return (
        <Popover>
          <Popover.Trigger className="w-full cursor-not-allowed">{element}</Popover.Trigger>
          <Popover.Content placement="bottom">
            <Popover.Dialog>
              <Popover.Arrow />
              <div className="max-w-72 text-sm">{tooltipMessage}</div>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      )
    }

    return (
      <Tooltip delay={0}>
        <Tooltip.Trigger className="w-full cursor-not-allowed">{element}</Tooltip.Trigger>
        <Tooltip.Content showArrow placement="top">
          <Tooltip.Arrow />
          <div className="max-w-72">{tooltipMessage}</div>
        </Tooltip.Content>
      </Tooltip>
    )
  }

  const toggleArrayValue = (path: ConfigPath, value: string, selected: boolean) => {
    const currentValues = getValue<string[]>(config, path, [])
    const nextValues = selected ? Array.from(new Set([...currentValues, value])) : currentValues.filter((item) => item !== value)

    updateConfigValue(path, nextValues)
  }

  const renderSwitch: ConfigFieldRenderers['renderSwitch'] = (path, label, help, disabled = false) => {
    const selected = getValue<boolean>(config, path, false)

    const switchElement = (
      <Switch isDisabled={disabled} isSelected={selected} onChange={(isSelected) => updateConfigValue(path, isSelected)}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="font-semibold">{label}</Label>
          {renderHelp(help || (selected ? booleanText.enabled : booleanText.disabled))}
        </Switch.Content>
      </Switch>
    )

    return wrapWithDisabledTooltip(switchElement, path, disabled)
  }

  const renderTextField: ConfigFieldRenderers['renderTextField'] = (path, label, help, options) => {
    const type = options?.type || 'text'
    const value = String(getValue(config, path, type === 'number' ? (options?.fallback ?? 0) : ''))
    const error = validationErrors[toPathKey(path)]
    const disabled = options?.disabled ?? false

    const fieldElement = (
      <TextField
        fullWidth
        isInvalid={Boolean(error)}
        isDisabled={disabled}
        name={path.join('.')}
        type={type}
        value={value}
        onChange={(nextValue) => {
          const parsedValue = type === 'number' ? toNumber(nextValue, options?.fallback ?? 0) : nextValue
          updateConfigValue(path, parsedValue)
        }}
      >
        <Label className="font-semibold">{label}</Label>
        <Input
          max={options?.max}
          min={options?.min}
          pattern={options?.pattern}
          placeholder={options?.placeholder || label}
          step={options?.step}
        />
        {error ? <FieldError>{error}</FieldError> : renderHelp(help)}
      </TextField>
    )

    return wrapWithDisabledTooltip(fieldElement, path, disabled)
  }

  const renderSelectField = (
    path: ConfigPath,
    label: string,
    help: ConfigDescription,
    options: SelectOption[],
    parser: (value: string) => unknown = (value) => value,
    disabled = false
  ) => {
    const value = String(getValue(config, path, options[0]?.value || ''))
    const disabledKeys = options.filter((item) => item.disabled).map((item) => item.value)

    const selectElement = (
      <Select
        disabledKeys={disabledKeys}
        fullWidth
        isDisabled={disabled}
        name={path.join('.')}
        placeholder={label}
        value={value}
        variant="secondary"
        onChange={(nextValue) => {
          if (nextValue === null || Array.isArray(nextValue)) return
          updateConfigValue(path, parser(String(nextValue)))
        }}
      >
        <Label className="font-semibold">{label}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        {renderHelp(help)}
        <Select.Popover>
          <ListBox>
            {options.map((item) => (
              <ListBox.Item key={item.value} id={item.value} textValue={item.label}>
                <div className="flex min-w-0 flex-col gap-1">
                  <Label>{item.label}</Label>
                  {item.description ? <Description>{item.description}</Description> : null}
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    )

    return wrapWithDisabledTooltip(selectElement, path, disabled)
  }

  const renderCheckboxGroup: ConfigFieldRenderers['renderCheckboxGroup'] = (path, label, help, options, disabled = false) => {
    const values = getValue<string[]>(config, path, [])

    const groupElement = (
      <div className={classes.field}>
        <Label className="font-semibold">{label}</Label>
        {renderHelp(help)}
        <div className={classes.choiceGrid}>
          {options.map((item) => {
            const selected = includesValue(values, item.value)
            return (
              <Checkbox
                key={item.value}
                isDisabled={disabled}
                isSelected={selected}
                onChange={(isSelected) => toggleArrayValue(path, item.value, isSelected)}
              >
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Content>
                  <Label>{item.label}</Label>
                  {item.description ? <Description>{item.description}</Description> : null}
                </Checkbox.Content>
              </Checkbox>
            )
          })}
        </div>
      </div>
    )

    return wrapWithDisabledTooltip(groupElement, path, disabled)
  }

  return {
    renderSwitch,
    renderTextField,
    renderSelectField,
    renderCheckboxGroup,
    renderPageHeader: (title, description) => (
      <div className={`mb-6 ${device === 'mobile' ? 'pr-36' : ''}`} data-config-section>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="mt-2.5">
          <Description>{description}</Description>
        </div>
      </div>
    ),
    renderSubSection: (title, children) => (
      <Card data-config-section className="mb-4">
        <Card.Header className={classes.sectionHeader}>
          <Card.Title className="text-lg font-semibold">{title}</Card.Title>
        </Card.Header>
        <Card.Content className={classes.sectionContent}>
          <div className={classes.fields}>{children}</div>
        </Card.Content>
      </Card>
    )
  }
}
