import type { ReactNode } from 'react'

/** 配置对象中的字段路径，按层级依次写入 key 或数组索引。 */
export type ConfigPath = Array<string | number>

/** 可按字符串 key 或数字 key 访问的配置片段。 */
export type ConfigRecord = Record<string | number, unknown>

/** 下拉选择、复选框组选项等选择型控件的通用选项。 */
export type SelectOption = {
  /** 展示给用户看的选项名称。 */
  label: string
  /** 写入配置文件的真实值。 */
  value: string
  /** 选项下方的补充说明。 */
  description?: string
  /** 是否禁止选择该选项。 */
  disabled?: boolean
}

/** 文本输入类配置项的渲染与校验参数。 */
export type TextFieldOptions = {
  /** 输入框类型，number 会在写入配置前转换为数字。 */
  type?: 'text' | 'number' | 'password'
  /** 输入框为空时展示的占位文本。 */
  placeholder?: string
  /** 是否禁用当前输入框。 */
  disabled?: boolean
  /** number 类型无法解析时使用的回退值。 */
  fallback?: number
  /** 允许输入的最小值。 */
  min?: number
  /** 允许输入的最大值。 */
  max?: number
  /** 数字输入步进值。 */
  step?: number
  /** 原生 input pattern 校验规则。 */
  pattern?: string
  /** 自定义错误文案，优先级高于默认数值范围错误。 */
  error?: string
}

/** 数值配置项的集中校验规则。 */
export type NumberValidationRule = {
  /** 要校验的配置字段路径。 */
  path: ConfigPath
  /** 用于错误提示的字段名称。 */
  label: string
  /** 允许的最小值。 */
  min?: number
  /** 允许的最大值。 */
  max?: number
  /** 为 true 时跳过该规则。 */
  disabled?: boolean
  /** 自定义错误文案，优先级高于默认数值范围错误。 */
  error?: string
}

/** 配置面板当前使用的布局类型。 */
export type DeviceLayout = 'desktop' | 'mobile'

/** 配置面板可编辑的配置文件分组 key。 */
export type ConfigFileKey = 'amagi' | 'app' | 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu' | 'pushlist'

/** 配置项帮助内容，支持纯 React 节点或带桌面/移动端详情的结构化说明。 */
export type ConfigDescription = ReactNode | ConfigHelp

/** 配置项的结构化帮助内容。 */
export interface ConfigHelp {
  /** 始终展示在表单项下方的基础说明。 */
  description: ReactNode
  /** 桌面端点击提示图标后展示的详细说明。 */
  desktopContent?: ReactNode
  /** 移动端点击提示图标后展示的详细说明，未提供时回退到 desktopContent。 */
  mobileContent?: ReactNode
  /** 附加在说明区域末尾的自定义内容。 */
  extra?: ReactNode
}

/** 配置页复用的字段渲染器集合。 */
export interface ConfigFieldRenderers {
  /**
   * 渲染布尔开关配置项。
   *
   * @param path 配置字段路径。
   * @param label 表单项标题。
   * @param help 表单项帮助文案；未传时根据当前布尔值展示默认启用/禁用文案。
   * @param disabled 是否禁用当前字段。
   */
  renderSwitch: (path: ConfigPath, label: string, help?: ConfigDescription, disabled?: boolean) => ReactNode

  /**
   * 渲染文本、数字或密码输入配置项。
   *
   * @param path 配置字段路径。
   * @param label 表单项标题。
   * @param help 表单项帮助文案。
   * @param options 输入框类型、范围、禁用态等附加参数。
   */
  renderTextField: (path: ConfigPath, label: string, help: ConfigDescription, options?: TextFieldOptions) => ReactNode

  /**
   * 渲染单选下拉配置项。
   *
   * @param path 配置字段路径。
   * @param label 表单项标题。
   * @param help 表单项帮助文案。
   * @param options 可选项列表。
   * @param parser 将选中的字符串值转换为写入配置的真实值。
   * @param disabled 是否禁用当前字段。
   */
  renderSelectField: (
    path: ConfigPath,
    label: string,
    help: ConfigDescription,
    options: SelectOption[],
    parser?: (value: string) => unknown,
    disabled?: boolean
  ) => ReactNode

  /**
   * 渲染复选框组配置项。
   *
   * @param path 配置字段路径。
   * @param label 表单项标题。
   * @param help 表单项帮助文案。
   * @param options 可选项列表。
   * @param disabled 是否禁用整个复选框组。
   * @param mutuallyExclusiveGroups 互斥选项分组；同组内新选中的值会移除其他值。
   */
  renderCheckboxGroup: (
    path: ConfigPath,
    label: string,
    help: ConfigDescription,
    options: SelectOption[],
    disabled?: boolean,
    mutuallyExclusiveGroups?: string[][]
  ) => ReactNode

  /**
   * 渲染 cron 表达式编辑器。
   *
   * @param path 配置字段路径。
   * @param label 表单项标题，目前由 cron 编辑器内部 UI 接管。
   * @param help 表单项帮助文案，目前由 cron 编辑器内部 UI 接管。
   * @param disabled 是否禁用当前字段。
   */
  renderCronField: (path: ConfigPath, label: string, help: ConfigDescription, disabled?: boolean) => ReactNode

  /**
   * 渲染配置页顶部标题。
   *
   * @param title 页面标题。
   * @param description 页面摘要说明。
   */
  renderPageHeader: (title: string, description: string) => ReactNode

  /**
   * 渲染配置页内的分组区块。
   *
   * @param title 分组标题。
   * @param children 分组内的字段内容。
   */
  renderSubSection: (title: string, children: ReactNode) => ReactNode
}
