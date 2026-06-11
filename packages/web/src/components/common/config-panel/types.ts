import type { ReactNode } from 'react'

export type ConfigPath = Array<string | number>
export type ConfigRecord = Record<string | number, unknown>

export type SelectOption = {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

export type TextFieldOptions = {
  type?: 'text' | 'number' | 'password'
  placeholder?: string
  disabled?: boolean
  fallback?: number
  min?: number
  max?: number
  step?: number
  pattern?: string
  error?: string
}

export type NumberValidationRule = {
  path: ConfigPath
  label: string
  min?: number
  max?: number
  disabled?: boolean
  error?: string
}

export type DeviceLayout = 'desktop' | 'mobile'

export type ConfigFileKey = 'cookies' | 'app' | 'upload' | 'request' | 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu' | 'pushlist'

export type ConfigDescription = ReactNode | ConfigHelp

export interface ConfigHelp {
  description: ReactNode
  desktopContent?: ReactNode
  mobileContent?: ReactNode
  extra?: ReactNode
}

export interface ConfigFieldRenderers {
  renderSwitch: (path: ConfigPath, label: string, help?: ConfigDescription, disabled?: boolean) => ReactNode
  renderTextField: (path: ConfigPath, label: string, help: ConfigDescription, options?: TextFieldOptions) => ReactNode
  renderSelectField: (
    path: ConfigPath,
    label: string,
    help: ConfigDescription,
    options: SelectOption[],
    parser?: (value: string) => unknown,
    disabled?: boolean
  ) => ReactNode
  renderCheckboxGroup: (path: ConfigPath, label: string, help: ConfigDescription, options: SelectOption[], disabled?: boolean) => ReactNode
  renderPageHeader: (title: string, description: string) => ReactNode
  renderSubSection: (title: string, children: ReactNode) => ReactNode
}
