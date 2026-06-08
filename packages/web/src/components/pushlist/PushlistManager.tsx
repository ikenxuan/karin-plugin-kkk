/**
 * 推送列表管理组件
 * 使用 Accordion + Tabs 管理抖音和B站的推送订阅
 */

import { useState } from 'react'
import {
  Accordion,
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  Description,
  FieldError,
  Input,
  Label,
  Popover,
  Select,
  ListBox,
  Switch,
  Tabs,
  TextField,
  Tooltip
} from '@heroui/react'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'

// 类型定义
type DouyinPushType = 'post' | 'favorite' | 'recommend' | 'live'
type BilibiliPushType = 'video' | 'draw' | 'word' | 'live' | 'forward' | 'article'

export interface DouyinPushItem {
  switch: boolean
  sec_uid: string
  short_id: string
  group_id: string[]
  remark: string
  pushTypes?: DouyinPushType[]
  filterMode?: 'blacklist' | 'whitelist'
  Keywords?: string[]
  Tags?: string[]
}

export interface BilibiliPushItem {
  switch: boolean
  host_mid: number
  group_id: string[]
  remark: string
  pushTypes?: BilibiliPushType[]
  filterMode?: 'blacklist' | 'whitelist'
  Keywords?: string[]
  Tags?: string[]
}

interface PushlistManagerProps {
  douyinList: DouyinPushItem[]
  bilibiliList: BilibiliPushItem[]
  onDouyinChange: (list: DouyinPushItem[]) => void
  onBilibiliChange: (list: BilibiliPushItem[]) => void
  device: 'desktop' | 'mobile'
}

/**
 * 抖音推送类型选项
 */
const douyinPushTypeOptions = [
  { label: '作品列表', value: 'post', description: '推送用户发布的作品' },
  { label: '喜欢列表', value: 'favorite', description: '推送用户喜欢的作品' },
  { label: '推荐列表', value: 'recommend', description: '推送推荐的作品' },
  { label: '直播', value: 'live', description: '推送直播状态' }
]

/**
 * B站推送类型选项
 */
const bilibiliPushTypeOptions = [
  { label: '投稿视频', value: 'video', description: '推送UP主投稿的视频' },
  { label: '图文动态', value: 'draw', description: '推送图文动态' },
  { label: '纯文动态', value: 'word', description: '推送纯文字动态' },
  { label: '直播动态', value: 'live', description: '推送直播状态' },
  { label: '转发动态', value: 'forward', description: '推送转发的动态' },
  { label: '投稿专栏', value: 'article', description: '推送专栏文章' }
]

/**
 * 过滤模式选项
 */
const filterModeOptions = [
  { label: '黑名单', value: 'blacklist', description: '命中关键词/标签则不推送' },
  { label: '白名单', value: 'whitelist', description: '只推送命中关键词/标签的内容' }
]

/**
 * 关键词/标签管理组件
 */
const ChipList = ({
  label,
  description,
  items,
  onAdd,
  onRemove,
  disabled = false
}: {
  label: string
  description: string
  items: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  disabled?: boolean
}) => {
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
          isInvalid={!!error}
          isDisabled={disabled}
          value={inputValue}
          onChange={(value) => {
            setInputValue(value)
            if (error) setError('') // 清除错误
          }}
        >
          <Input
            placeholder={`输入${label}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAdd()
              }
            }}
          />
          {error && <FieldError>{error}</FieldError>}
        </TextField>
        <Button variant="secondary" isDisabled={disabled} onPress={handleAdd}>
          <Plus className="size-4" />
        </Button>
      </div>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip key={item} variant="soft" color="accent">
              <span>{item}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => onRemove(item)}
                  className="ml-1 rounded-full p-0.5 hover:bg-black/10"
                >
                  <Trash2 className="size-3" />
                </button>
              )}
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

export default function PushlistManager({
  douyinList,
  bilibiliList,
  onDouyinChange,
  onBilibiliChange,
  device
}: PushlistManagerProps) {
  const [activeTab, setActiveTab] = useState<'douyin' | 'bilibili'>('douyin')

  // 两栏/一栏布局类名
  const gridClass = device === 'desktop' ? 'grid grid-cols-2' : 'flex flex-col'

  /**
   * 给禁用的字段包装 Tooltip（桌面端）或 Popover（移动端）提示
   */
  const wrapWithDisabledTooltip = (element: React.ReactNode, disabled: boolean, message: string) => {
    if (!disabled) return element

    // 移动端使用 Popover（点击触发），桌面端使用 Tooltip（悬停触发）
    if (device === 'mobile') {
      return (
        <Popover>
          <Popover.Trigger className="w-full cursor-not-allowed">
            {element}
          </Popover.Trigger>
          <Popover.Content placement="bottom">
            <Popover.Arrow />
            <div className="px-3 py-2">
              <p className="text-sm text-foreground">{message}</p>
            </div>
          </Popover.Content>
        </Popover>
      )
    }

    return (
      <Tooltip delay={0}>
        <Tooltip.Trigger className="w-full cursor-not-allowed">
          {element}
        </Tooltip.Trigger>
        <Tooltip.Content showArrow placement="top">
          <Tooltip.Arrow />
          {message}
        </Tooltip.Content>
      </Tooltip>
    )
  }

  // 渲染抖音推送项
  const renderDouyinItem = (item: DouyinPushItem, index: number) => {
    const updateItem = (updates: Partial<DouyinPushItem>) => {
      const newList = [...douyinList]
      newList[index] = { ...item, ...updates }
      onDouyinChange(newList)
    }

    const deleteItem = () => {
      onDouyinChange(douyinList.filter((_, i) => i !== index))
    }

    const disabled = !item.switch
    const itemLabel = item.remark || item.short_id || item.sec_uid || '未命名'

    return (
      <Accordion.Item key={index} id={`douyin-${index}`}>
        <Accordion.Heading>
          <Accordion.Trigger>
            <div className="flex flex-1 items-center gap-3">
              <div
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <Switch
                  isSelected={item.switch}
                  onChange={(isSelected) => updateItem({ switch: isSelected })}
                >
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  {item.remark || item.short_id || item.sec_uid || `推送项 ${index + 1}`}
                </span>
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
              {/* 基础信息 - 两栏布局 */}
              <div className={gridClass}>
                {wrapWithDisabledTooltip(
                  <TextField
                    fullWidth
                    isDisabled={disabled}
                    isRequired
                    value={item.sec_uid}
                    onChange={(value) => updateItem({ sec_uid: value })}
                  >
                    <Label>sec_uid</Label>
                    <Input placeholder="与抖音号二选一填写" />
                    <Description>用户的 sec_uid，可从分享链接获取。与抖音号二选一必填</Description>
                  </TextField>,
                  disabled,
                  `开启【${itemLabel}】的推送开关后才能编辑此字段`
                )}

                {wrapWithDisabledTooltip(
                  <TextField
                    fullWidth
                    isDisabled={disabled}
                    isRequired
                    value={item.short_id}
                    onChange={(value) => updateItem({ short_id: value })}
                  >
                    <Label>抖音号</Label>
                    <Input placeholder="与 sec_uid 二选一填写" />
                    <Description>用户的抖音号（short_id）。与 sec_uid 二选一必填</Description>
                  </TextField>,
                  disabled,
                  `开启【${itemLabel}】的推送开关后才能编辑此字段`
                )}
              </div>

              {wrapWithDisabledTooltip(
                <TextField
                  fullWidth
                  isDisabled={disabled}
                  value={item.remark}
                  onChange={(value) => updateItem({ remark: value })}
                >
                  <Label>备注名称</Label>
                  <Input placeholder="可选，用于识别该推送项" />
                  <Description>方便识别的名称，如：博主昵称</Description>
                </TextField>,
                disabled,
                `开启【${itemLabel}】的推送开关后才能编辑此字段`
              )}

              {/* 推送群号列表 */}
              {wrapWithDisabledTooltip(
                <TextField
                  fullWidth
                  isDisabled={disabled}
                  isRequired
                  value={item.group_id.join('\n')}
                  onChange={(value) => updateItem({ group_id: value.split('\n').filter(Boolean) })}
                >
                  <Label>推送群号列表</Label>
                  <Input placeholder="群号1:机器人账号1&#10;群号2:机器人账号2" />
                  <Description>每行一个，格式：群号:机器人账号。必填</Description>
                </TextField>,
                disabled,
                `开启【${itemLabel}】的推送开关后才能编辑此字段`
              )}

              {/* 推送类型 */}
              {wrapWithDisabledTooltip(
                <CheckboxGroup
                  isDisabled={disabled}
                  value={item.pushTypes || []}
                  onChange={(values) => updateItem({ pushTypes: values as never[] })}
                >
                  <Label>推送类型</Label>
                  <Description>选择要推送的内容类型</Description>
                  <div className={`mt-2 ${gridClass}`}>
                    {douyinPushTypeOptions.map((opt) => (
                      <Checkbox key={opt.value} value={opt.value}>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label>{opt.label}</Label>
                          <Description>{opt.description}</Description>
                        </Checkbox.Content>
                      </Checkbox>
                    ))}
                  </div>
                </CheckboxGroup>,
                disabled,
                `开启【${itemLabel}】的推送开关后才能编辑此字段`
              )}

              {/* 过滤模式 */}
              {wrapWithDisabledTooltip(
                <Select
                  fullWidth
                  isDisabled={disabled}
                  value={item.filterMode || 'blacklist'}
                onChange={(value) => {
                  if (value && !Array.isArray(value)) {
                    updateItem({ filterMode: value as 'blacklist' | 'whitelist' })
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
                    {filterModeOptions.map((opt) => (
                      <ListBox.Item key={opt.value} id={opt.value} textValue={opt.label}>
                        <div className="flex flex-col gap-1">
                          <Label>{opt.label}</Label>
                          <Description>{opt.description}</Description>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>,
              disabled,
              `开启【${itemLabel}】的推送开关后才能编辑此字段`
            )}

            {/* 关键词 */}
            {wrapWithDisabledTooltip(
              <div>
                <ChipList
                  label="关键词"
                  description="多个关键词用于内容过滤"
                  disabled={disabled}
                  items={item.Keywords || []}
                  onAdd={(value) => updateItem({ Keywords: [...(item.Keywords || []), value] })}
                  onRemove={(value) =>
                    updateItem({ Keywords: (item.Keywords || []).filter((k) => k !== value) })
                  }
                />
              </div>,
              disabled,
              `开启【${itemLabel}】的推送开关后才能编辑此字段`
            )}

            {/* 标签 */}
            {wrapWithDisabledTooltip(
              <div>
                <ChipList
                  label="标签"
                  description="多个标签用于内容过滤"
                  disabled={disabled}
                  items={item.Tags || []}
                  onAdd={(value) => updateItem({ Tags: [...(item.Tags || []), value] })}
                  onRemove={(value) => updateItem({ Tags: (item.Tags || []).filter((t) => t !== value) })}
                />
              </div>,
              disabled,
              `开启【${itemLabel}】的推送开关后才能编辑此字段`
              )}

              {/* 删除按钮 */}
              <Button variant="danger" className="w-full" onPress={deleteItem}>
                <Trash2 className="size-4" />
                <span>删除此推送项</span>
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    )
  }

  // 渲染B站推送项（结构类似，字段略有不同）
  const renderBilibiliItem = (item: BilibiliPushItem, index: number) => {
    const updateItem = (updates: Partial<BilibiliPushItem>) => {
      const newList = [...bilibiliList]
      newList[index] = { ...item, ...updates }
      onBilibiliChange(newList)
    }

    const deleteItem = () => {
      onBilibiliChange(bilibiliList.filter((_, i) => i !== index))
    }

    const disabled = !item.switch
    const itemLabel = item.remark || `UID: ${item.host_mid}` || '未命名'

    return (
      <Accordion.Item key={index} id={`bilibili-${index}`}>
        <Accordion.Heading>
          <Accordion.Trigger>
            <div className="flex flex-1 items-center gap-3">
              <div
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <Switch
                  isSelected={item.switch}
                  onChange={(isSelected) => updateItem({ switch: isSelected })}
                >
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  {item.remark || `UID: ${item.host_mid}` || `推送项 ${index + 1}`}
                </span>
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
              {/* 基础信息 - 两栏布局 */}
              <div className={gridClass}>
                {wrapWithDisabledTooltip(
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
                  </TextField>,
                  disabled,
                  `开启【${itemLabel}】的推送开关后才能编辑此字段`
                )}

                {wrapWithDisabledTooltip(
                  <TextField
                    fullWidth
                    isDisabled={disabled}
                    value={item.remark}
                    onChange={(value) => updateItem({ remark: value })}
                  >
                    <Label>备注名称</Label>
                    <Input placeholder="可选，用于识别该推送项" />
                    <Description>方便识别的名称，如：UP主昵称</Description>
                  </TextField>,
                  disabled,
                  `开启【${itemLabel}】的推送开关后才能编辑此字段`
                )}
              </div>

              {/* 推送群号列表 */}
              {wrapWithDisabledTooltip(
                <TextField
                  fullWidth
                  isDisabled={disabled}
                  isRequired
                  value={item.group_id.join('\n')}
                  onChange={(value) => updateItem({ group_id: value.split('\n').filter(Boolean) })}
                >
                  <Label>推送群号列表</Label>
                  <Input placeholder="群号1:机器人账号1&#10;群号2:机器人账号2" />
                  <Description>每行一个，格式：群号:机器人账号。必填</Description>
                </TextField>,
                disabled,
                `开启【${itemLabel}】的推送开关后才能编辑此字段`
              )}

              {/* 推送类型 */}
              {wrapWithDisabledTooltip(
                <CheckboxGroup
                  isDisabled={disabled}
                  value={item.pushTypes || []}
                  onChange={(values) => updateItem({ pushTypes: values as never[] })}
                >
                  <Label>推送类型</Label>
                  <Description>选择要推送的内容类型</Description>
                  <div className={`mt-2 ${gridClass}`}>
                    {bilibiliPushTypeOptions.map((opt) => (
                      <Checkbox key={opt.value} value={opt.value}>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <Label>{opt.label}</Label>
                          <Description>{opt.description}</Description>
                        </Checkbox.Content>
                      </Checkbox>
                    ))}
                  </div>
                </CheckboxGroup>,
                disabled,
                `开启【${itemLabel}】的推送开关后才能编辑此字段`
              )}

              {/* 过滤模式 */}
              {wrapWithDisabledTooltip(
                <Select
                  fullWidth
                  isDisabled={disabled}
                  value={item.filterMode || 'blacklist'}
                  onChange={(value) => {
                  if (value && !Array.isArray(value)) {
                    updateItem({ filterMode: value as 'blacklist' | 'whitelist' })
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
                    {filterModeOptions.map((opt) => (
                      <ListBox.Item key={opt.value} id={opt.value} textValue={opt.label}>
                        <div className="flex flex-col gap-1">
                          <Label>{opt.label}</Label>
                          <Description>{opt.description}</Description>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>,
              disabled,
              `开启【${itemLabel}】的推送开关后才能编辑此字段`
            )}

            {/* 关键词 */}
            {wrapWithDisabledTooltip(
              <div>
                <ChipList
                  label="关键词"
                  description="多个关键词用于内容过滤"
                  disabled={disabled}
                  items={item.Keywords || []}
                  onAdd={(value) => updateItem({ Keywords: [...(item.Keywords || []), value] })}
                  onRemove={(value) =>
                    updateItem({ Keywords: (item.Keywords || []).filter((k) => k !== value) })
                  }
                />
              </div>,
              disabled,
              `开启【${itemLabel}】的推送开关后才能编辑此字段`
            )}

            {/* 标签 */}
            {wrapWithDisabledTooltip(
              <div>
                <ChipList
                  label="标签"
                  description="多个标签用于内容过滤"
                  disabled={disabled}
                  items={item.Tags || []}
                  onAdd={(value) => updateItem({ Tags: [...(item.Tags || []), value] })}
                  onRemove={(value) => updateItem({ Tags: (item.Tags || []).filter((t) => t !== value) })}
                />
              </div>,
              disabled,
              `开启【${itemLabel}】的推送开关后才能编辑此字段`
              )}

              {/* 删除按钮 */}
              <Button variant="danger" className="w-full" onPress={deleteItem}>
                <Trash2 className="size-4" />
                <span>删除此推送项</span>
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    )
  }

  // 添加新的抖音推送项
  const addDouyinItem = () => {
    onDouyinChange([
      ...douyinList,
      {
        switch: true,
        sec_uid: '',
        short_id: '',
        group_id: [],
        remark: '',
        pushTypes: ['post'],
        filterMode: 'blacklist',
        Keywords: [],
        Tags: []
      }
    ])
  }

  // 添加新的B站推送项
  const addBilibiliItem = () => {
    onBilibiliChange([
      ...bilibiliList,
      {
        switch: true,
        host_mid: 0,
        group_id: [],
        remark: '',
        pushTypes: ['video'],
        filterMode: 'blacklist',
        Keywords: [],
        Tags: []
      }
    ])
  }

  return (
    <div className="space-y-4">
      <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as 'douyin' | 'bilibili')}>
        <Tabs.ListContainer>
          <Tabs.List>
            <Tabs.Tab id="douyin">
              <span>抖音推送</span>
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="bilibili">
              <span>B站推送</span>
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="douyin">
          <div className="space-y-4 pt-4">
            <Button variant="primary" className="w-full" onPress={addDouyinItem}>
              <Plus className="size-4" />
              <span>添加抖音推送项</span>
            </Button>

            {douyinList.length > 0 ? (
              <Accordion variant="surface">
                {douyinList.map((item, index) => renderDouyinItem(item, index))}
              </Accordion>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                <p className="text-muted">暂无推送项，点击上方按钮添加</p>
              </div>
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel id="bilibili">
          <div className="space-y-4 pt-4">
            <Button variant="primary" className="w-full" onPress={addBilibiliItem}>
              <Plus className="size-4" />
              <span>添加B站推送项</span>
            </Button>

            {bilibiliList.length > 0 ? (
              <Accordion variant="surface">
                {bilibiliList.map((item, index) => renderBilibiliItem(item, index))}
              </Accordion>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                <p className="text-muted">暂无推送项，点击上方按钮添加</p>
              </div>
            )}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
