/**
 * 可视化 Cron 表达式编辑器（Drawer 模式）
 * PC 端右侧弹出，移动端底部弹出
 */

import {
  Button,
  Description,
  Drawer,
  Header,
  Input,
  Label,
  ListBox,
  NumberField,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Surface,
  Tabs,
  TextField
} from '@heroui/react'
import { Clock } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'

interface CronEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  device?: 'desktop' | 'mobile'
}

type CronTab = 'quick' | 'minute' | 'hour' | 'day' | 'week'
type CronFieldType = 'every' | 'interval' | 'specific'
type WeekFieldType = 'every' | 'specific'

interface ParsedCronState {
  minuteType: CronFieldType
  minuteInterval: number
  specificMinutes: number[]
  hourType: CronFieldType
  hourInterval: number
  specificHours: number[]
  dayType: CronFieldType
  dayInterval: number
  specificDays: number[]
  weekType: WeekFieldType
  specificWeeks: number[]
}

interface QuickPreset {
  id: string
  label: string
  description: string
  value: string
}

interface QuickPresetGroup {
  title: string
  presets: QuickPreset[]
}

const DEFAULT_CRON = '*/10 * * * *'
const WEEK_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const QUICK_PRESET_GROUPS: QuickPresetGroup[] = [
  {
    title: '高频检查',
    presets: [
      {
        id: 'every5',
        label: '每 5 分钟',
        description: '更频繁地检查推送，适合更新很密集的账号。',
        value: '*/5 * * * *'
      },
      {
        id: 'every10',
        label: '每 10 分钟',
        description: '推荐：全天每 10 分钟检查一次推送。',
        value: '*/10 * * * *'
      },
      {
        id: 'every15',
        label: '每 15 分钟',
        description: '兼顾及时性和任务频率，适合大多数推送。',
        value: '*/15 * * * *'
      },
      {
        id: 'every30',
        label: '每 30 分钟',
        description: '检查频率较低，适合不太活跃的推送。',
        value: '*/30 * * * *'
      }
    ]
  },
  {
    title: '按小时轮询',
    presets: [
      {
        id: 'hourly',
        label: '每小时一次',
        description: '每个整点执行，例如 00:00、01:00。',
        value: '0 * * * *'
      },
      {
        id: 'every2Hours',
        label: '每 2 小时',
        description: '从 0 点开始，每隔 2 小时执行一次。',
        value: '0 */2 * * *'
      },
      {
        id: 'every3Hours',
        label: '每 3 小时',
        description: '从 0 点开始，每隔 3 小时执行一次。',
        value: '0 */3 * * *'
      },
      {
        id: 'every6Hours',
        label: '每 6 小时',
        description: '每天 0 点、6 点、12 点、18 点执行。',
        value: '0 */6 * * *'
      }
    ]
  },
  {
    title: '每天固定时间',
    presets: [
      {
        id: 'daily8',
        label: '每天上午 8 点',
        description: '每天早上固定执行一次。',
        value: '0 8 * * *'
      },
      {
        id: 'daily9',
        label: '每天上午 9 点',
        description: '每天固定执行一次。',
        value: '0 9 * * *'
      },
      {
        id: 'daily12',
        label: '每天中午 12 点',
        description: '每天午间固定执行一次。',
        value: '0 12 * * *'
      },
      {
        id: 'daily18',
        label: '每天晚上 6 点',
        description: '每天傍晚固定执行一次。',
        value: '0 18 * * *'
      },
      {
        id: 'daily20',
        label: '每天晚上 8 点',
        description: '适合晚间集中推送。',
        value: '0 20 * * *'
      },
      {
        id: 'daily22',
        label: '每天晚上 10 点',
        description: '每天夜间固定执行一次。',
        value: '0 22 * * *'
      }
    ]
  },
  {
    title: '每天多次',
    presets: [
      {
        id: 'daily9And20',
        label: '每天 9 点和 20 点',
        description: '每天早晚各执行一次。',
        value: '0 9,20 * * *'
      },
      {
        id: 'daily9And12And18',
        label: '每天 9 点、12 点、18 点',
        description: '每天早中晚各执行一次。',
        value: '0 9,12,18 * * *'
      }
    ]
  },
  {
    title: '按星期',
    presets: [
      {
        id: 'weekday9',
        label: '工作日上午 9 点',
        description: '只在周一到周五执行。',
        value: '0 9 * * 1,2,3,4,5'
      },
      {
        id: 'weekday18',
        label: '工作日晚上 6 点',
        description: '只在周一到周五的傍晚执行。',
        value: '0 18 * * 1,2,3,4,5'
      },
      {
        id: 'weekend10',
        label: '周末上午 10 点',
        description: '只在周六和周日执行。',
        value: '0 10 * * 0,6'
      },
      {
        id: 'friday20',
        label: '每周五晚上 8 点',
        description: '每周五固定执行一次。',
        value: '0 20 * * 5'
      }
    ]
  }
]
const QUICK_PRESETS = QUICK_PRESET_GROUPS.flatMap((group) => group.presets)

const DEFAULT_CRON_STATE: ParsedCronState = {
  minuteType: 'interval',
  minuteInterval: 10,
  specificMinutes: [],
  hourType: 'every',
  hourInterval: 1,
  specificHours: [],
  dayType: 'every',
  dayInterval: 1,
  specificDays: [],
  weekType: 'every',
  specificWeeks: []
}

const padTime = (value: number) => String(value).padStart(2, '0')

const clampInteger = (value: number, min: number, max: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(value)))
}

const uniqueSorted = (values: number[], min: number, max: number) => {
  return Array.from(new Set(values.filter((value) => Number.isInteger(value) && value >= min && value <= max))).sort((a, b) => a - b)
}

const parseNumberList = (value: string, min: number, max: number) => {
  return uniqueSorted(
    value
      .split(',')
      .map((item) => Number(item.trim()))
      .filter((item) => Number.isFinite(item)),
    min,
    max
  )
}

const parseWeekList = (value: string) => {
  return uniqueSorted(
    value
      .split(',')
      .map((item) => {
        const week = Number(item.trim())
        return week === 7 ? 0 : week
      })
      .filter((item) => Number.isFinite(item)),
    0,
    6
  )
}

const parseCronField = (value: string, min: number, max: number, fallbackInterval: number) => {
  if (value === '*' || value === '*/1') {
    return { type: 'every' as const, interval: fallbackInterval, specific: [] }
  }

  const intervalMatch = value.match(/^\*\/(\d+)$/)
  if (intervalMatch) {
    const interval = clampInteger(Number(intervalMatch[1]), 1, max, fallbackInterval)
    return interval <= 1
      ? { type: 'every' as const, interval: fallbackInterval, specific: [] }
      : { type: 'interval' as const, interval, specific: [] }
  }

  const specific = parseNumberList(value, min, max)
  if (specific.length > 0) {
    return { type: 'specific' as const, interval: fallbackInterval, specific }
  }

  return { type: 'every' as const, interval: fallbackInterval, specific: [] }
}

const parseCronValue = (value: string): ParsedCronState => {
  const parts = (value || DEFAULT_CRON).trim().split(/\s+/)
  if (parts.length !== 5) return { ...DEFAULT_CRON_STATE }

  const [minuteValue, hourValue, dayValue, , weekValue] = parts
  const minute = parseCronField(minuteValue, 0, 59, 10)
  const hour = parseCronField(hourValue, 0, 23, 1)
  const day = parseCronField(dayValue, 1, 31, 1)
  const weeks = weekValue === '*' ? [] : parseWeekList(weekValue)
  const hasWeekLimit = weeks.length > 0

  return {
    minuteType: minute.type,
    minuteInterval: minute.interval,
    specificMinutes: minute.specific,
    hourType: hour.type,
    hourInterval: hour.interval,
    specificHours: hour.specific,
    dayType: hasWeekLimit ? 'every' : day.type,
    dayInterval: hasWeekLimit ? 1 : day.interval,
    specificDays: hasWeekLimit ? [] : day.specific,
    weekType: hasWeekLimit ? 'specific' : 'every',
    specificWeeks: weeks
  }
}

const getCurrentStateCron = (state: ParsedCronState) => {
  let minute = '*'
  let hour = '*'
  let day = '*'
  const month = '*'
  let week = '*'

  switch (state.minuteType) {
    case 'every':
      minute = '*'
      break
    case 'interval':
      minute = state.minuteInterval <= 1 ? '*' : `*/${state.minuteInterval}`
      break
    case 'specific':
      minute = state.specificMinutes.length > 0 ? uniqueSorted(state.specificMinutes, 0, 59).join(',') : '0'
      break
  }

  switch (state.hourType) {
    case 'every':
      hour = '*'
      break
    case 'interval':
      hour = state.hourInterval <= 1 ? '*' : `*/${state.hourInterval}`
      break
    case 'specific':
      hour = state.specificHours.length > 0 ? uniqueSorted(state.specificHours, 0, 23).join(',') : '0'
      break
  }

  switch (state.dayType) {
    case 'every':
      day = '*'
      break
    case 'interval':
      day = state.dayInterval <= 1 ? '*' : `*/${state.dayInterval}`
      break
    case 'specific':
      day = state.specificDays.length > 0 ? uniqueSorted(state.specificDays, 1, 31).join(',') : '1'
      break
  }

  if (state.weekType === 'specific') {
    week = state.specificWeeks.length > 0 ? uniqueSorted(state.specificWeeks, 0, 6).join(',') : '*'
  }

  return `${minute} ${hour} ${day} ${month} ${week}`
}

const findPresetId = (value: string) => {
  const normalizedValue = (value || DEFAULT_CRON).trim().replace(/\s+/g, ' ')
  return QUICK_PRESETS.find((preset) => preset.value === normalizedValue)?.id ?? null
}

const formatList = (values: number[]) => values.join('、')

const formatHours = (values: number[]) => values.map((hour) => `${hour} 点`).join('、')

const getDateDescription = (state: ParsedCronState) => {
  if (state.weekType === 'specific' && state.specificWeeks.length > 0) {
    const weeks = uniqueSorted(state.specificWeeks, 0, 6)
    if (weeks.length === 5 && weeks.every((week) => [1, 2, 3, 4, 5].includes(week))) return '工作日'
    if (weeks.length === 2 && weeks.every((week) => [0, 6].includes(week))) return '周末'
    return `每${weeks.map((week) => WEEK_NAMES[week]).join('、')}`
  }

  if (state.dayType === 'interval' && state.dayInterval > 1) {
    return `每隔 ${state.dayInterval} 天`
  }

  if (state.dayType === 'specific' && state.specificDays.length > 0) {
    return `每月 ${formatList(uniqueSorted(state.specificDays, 1, 31))} 号`
  }

  return '每天'
}

const getMinuteDescription = (state: ParsedCronState) => {
  if (state.minuteType === 'every') return '每分钟'
  if (state.minuteType === 'interval') return state.minuteInterval <= 1 ? '每分钟' : `每 ${state.minuteInterval} 分钟`
  const minutes = state.specificMinutes.length > 0 ? uniqueSorted(state.specificMinutes, 0, 59) : [0]
  return `第 ${formatList(minutes)} 分钟`
}

const getTimeDescription = (state: ParsedCronState) => {
  const minuteDescription = getMinuteDescription(state)

  if (state.hourType === 'every' || (state.hourType === 'interval' && state.hourInterval <= 1)) {
    return state.minuteType === 'specific' ? `每小时的${minuteDescription}` : `全天${minuteDescription}`
  }

  if (state.hourType === 'specific') {
    const hours = state.specificHours.length > 0 ? uniqueSorted(state.specificHours, 0, 23) : [0]
    return state.minuteType === 'specific'
      ? `在 ${formatHours(hours)} 的${minuteDescription}`
      : `在 ${formatHours(hours)} 内${minuteDescription}`
  }

  return state.minuteType === 'specific'
    ? `从 0 点开始每隔 ${state.hourInterval} 小时，在${minuteDescription}`
    : `从 0 点开始每隔 ${state.hourInterval} 小时，该小时内${minuteDescription}`
}

const describeCronState = (state: ParsedCronState) => {
  const dateDescription = getDateDescription(state)
  const timeDescription = getTimeDescription(state)
  const normalizedTimeDescription = dateDescription === '每天' ? timeDescription.replace(/^全天/, '') : timeDescription

  return `${dateDescription}，${normalizedTimeDescription}执行`
}

const describeCronValue = (value: string) => describeCronState(parseCronValue(value))

const getMinutePreviewValues = (state: ParsedCronState) => {
  if (state.minuteType === 'every') return Array.from({ length: 60 }, (_, index) => index)
  if (state.minuteType === 'interval') {
    const interval = Math.max(1, state.minuteInterval)
    return Array.from({ length: Math.ceil(60 / interval) }, (_, index) => index * interval).filter((minute) => minute <= 59)
  }
  return state.specificMinutes.length > 0 ? uniqueSorted(state.specificMinutes, 0, 59) : [0]
}

const getHourPreviewValues = (state: ParsedCronState) => {
  if (state.hourType === 'every') return Array.from({ length: 24 }, (_, index) => index)
  if (state.hourType === 'interval') {
    const interval = Math.max(1, state.hourInterval)
    return Array.from({ length: Math.ceil(24 / interval) }, (_, index) => index * interval).filter((hour) => hour <= 23)
  }
  return state.specificHours.length > 0 ? uniqueSorted(state.specificHours, 0, 23) : [0]
}

const getExampleRuns = (state: ParsedCronState) => {
  const times: string[] = []
  const hours = getHourPreviewValues(state)
  const minutes = getMinutePreviewValues(state)

  for (const hour of hours) {
    for (const minute of minutes) {
      times.push(`${padTime(hour)}:${padTime(minute)}`)
      if (times.length >= 6) return times
    }
  }

  return times
}

const getExampleDescription = (state: ParsedCronState) => {
  const examples = getExampleRuns(state).join('、')
  const prefix = state.dayType === 'every' && state.weekType === 'every' ? '一天内示例' : '符合日期时，一天内示例'
  return `${prefix}：${examples}`
}

const CronEditor = ({ value, onChange, disabled = false, device = 'desktop' }: CronEditorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<CronTab>('quick')
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(findPresetId(value))

  // 分钟配置
  const [minuteType, setMinuteType] = useState<CronFieldType>('interval')
  const [minuteInterval, setMinuteInterval] = useState(10)
  const [specificMinutes, setSpecificMinutes] = useState<number[]>([])

  // 小时配置
  const [hourType, setHourType] = useState<CronFieldType>('every')
  const [hourInterval, setHourInterval] = useState(1)
  const [specificHours, setSpecificHours] = useState<number[]>([])

  // 天配置
  const [dayType, setDayType] = useState<CronFieldType>('every')
  const [dayInterval, setDayInterval] = useState(1)
  const [specificDays, setSpecificDays] = useState<number[]>([])

  // 周配置
  const [weekType, setWeekType] = useState<WeekFieldType>('every')
  const [specificWeeks, setSpecificWeeks] = useState<number[]>([])

  const applyParsedState = (state: ParsedCronState) => {
    setMinuteType(state.minuteType)
    setMinuteInterval(state.minuteInterval)
    setSpecificMinutes(state.specificMinutes)
    setHourType(state.hourType)
    setHourInterval(state.hourInterval)
    setSpecificHours(state.specificHours)
    setDayType(state.dayType)
    setDayInterval(state.dayInterval)
    setSpecificDays(state.specificDays)
    setWeekType(state.weekType)
    setSpecificWeeks(state.specificWeeks)
  }

  const getCurrentState = (): ParsedCronState => ({
    minuteType,
    minuteInterval,
    specificMinutes,
    hourType,
    hourInterval,
    specificHours,
    dayType,
    dayInterval,
    specificDays,
    weekType,
    specificWeeks
  })

  // 初始化时解析 cron 表达式，打开编辑器时始终回到当前已保存的值。
  useEffect(() => {
    if (!isOpen) return

    const parsed = parseCronValue(value || DEFAULT_CRON)
    applyParsedState(parsed)
    setSelectedPresetId(findPresetId(getCurrentStateCron(parsed)))
    setActiveTab('quick')
  }, [value, isOpen])

  // 生成 cron 表达式
  const generateCron = () => getCurrentStateCron(getCurrentState())

  // 生成中文描述
  const generateDescription = () => describeCronState(getCurrentState())

  const generateExample = () => getExampleDescription(getCurrentState())

  const getMinuteIntervalExample = () => {
    return getMinutePreviewValues({ ...getCurrentState(), minuteType: 'interval', minuteInterval })
      .slice(0, 5)
      .join('、')
  }

  const getHourIntervalExample = () => {
    return getHourPreviewValues({ ...getCurrentState(), hourType: 'interval', hourInterval })
      .slice(0, 5)
      .map((hour) => `${hour} 点`)
      .join('、')
  }

  const handleConfirm = () => {
    const cron = generateCron()
    onChange(cron)
    setIsOpen(false)
  }

  const handlePresetSelect = (preset: QuickPreset) => {
    const parsed = parseCronValue(preset.value)
    applyParsedState(parsed)
    setSelectedPresetId(preset.id)
  }

  const handlePresetChange = (nextValue: unknown) => {
    if (nextValue === null || Array.isArray(nextValue)) return
    const preset = QUICK_PRESETS.find((item) => item.id === String(nextValue))
    if (!preset) return
    handlePresetSelect(preset)
  }

  const handleMinuteTypeChange = (nextType: CronFieldType) => {
    setSelectedPresetId(null)
    setMinuteType(nextType)
  }

  const handleHourTypeChange = (nextType: CronFieldType) => {
    setSelectedPresetId(null)
    setHourType(nextType)
  }

  const handleDayTypeChange = (nextType: CronFieldType) => {
    setSelectedPresetId(null)
    setDayType(nextType)
    if (nextType !== 'every') {
      setWeekType('every')
      setSpecificWeeks([])
    }
  }

  const handleWeekTypeChange = (nextType: WeekFieldType) => {
    setSelectedPresetId(null)
    setWeekType(nextType)
    if (nextType !== 'every') {
      setDayType('every')
      setDayInterval(1)
      setSpecificDays([])
    }
  }

  const renderQuickTab = () => (
    <div className="min-w-0 space-y-4 overflow-x-hidden">
      <Surface className="p-4 rounded-3xl" variant="secondary">
        <div className="mb-3 flex min-w-0 flex-col gap-1">
          <Label className="block text-base font-semibold">常用规则</Label>
          <Description className="block leading-relaxed">不用理解 Cron，直接选一个最接近的执行时间，再看下方预览确认。</Description>
        </div>
        <Select fullWidth variant="secondary" placeholder="选择常用执行规则" value={selectedPresetId ?? ''} onChange={handlePresetChange}>
          <Label>执行规则</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {QUICK_PRESET_GROUPS.map((group, groupIndex) => (
                <Fragment key={group.title}>
                  {groupIndex > 0 ? <Separator /> : null}
                  <ListBox.Section>
                    <Header>{group.title}</Header>
                    {group.presets.map((preset) => (
                      <ListBox.Item key={preset.id} id={preset.id} textValue={preset.label}>
                        <div className="flex min-w-0 flex-col gap-1">
                          <Label>{preset.label}</Label>
                          <Description>{preset.description}</Description>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox.Section>
                </Fragment>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </Surface>

      <Surface className="p-4 rounded-3xl" variant="secondary">
        <div className="flex flex-row justify-between items-center">
          <Label className="text-base font-semibold">需要更细的规则？</Label>
          <Button size="sm" variant="secondary" onPress={() => setActiveTab('minute')}>
            转到高级
          </Button>
        </div>
      </Surface>
    </div>
  )

  const renderMinuteTab = () => (
    <div className="space-y-4">
      <Surface className="p-4 rounded-3xl" variant="secondary">
        <RadioGroup
          aria-label="分钟类型"
          variant="secondary"
          value={minuteType}
          onChange={(v) => handleMinuteTypeChange(v as CronFieldType)}
        >
          <Label className="text-base font-semibold">每个小时里，哪些分钟执行？</Label>
          <Description className="mb-3">例如选“每 10 分钟”，就是 00、10、20、30、40、50 分执行。</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                每分钟
              </Radio.Content>
              <Description>该小时里的每一分钟都执行，频率最高。</Description>
            </Radio>

            <Radio value="interval">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                间隔执行
              </Radio.Content>
              <Description>从第 0 分钟开始，按固定分钟数重复。</Description>
            </Radio>

            <Radio value="specific">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                指定分钟
              </Radio.Content>
              <Description>只在你点选的分钟执行，适合“整点”或“半点”。</Description>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {minuteType === 'interval' && (
        <Surface className="p-4 rounded-3xl" variant="secondary">
          <Label className="mb-2 text-base font-semibold">间隔设置</Label>
          <NumberField
            variant="secondary"
            minValue={1}
            maxValue={59}
            value={minuteInterval}
            onChange={(nextValue) => {
              setSelectedPresetId(null)
              setMinuteInterval(clampInteger(nextValue, 1, 59, 10))
            }}
          >
            <Label>间隔（分钟）</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="w-24" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>{minuteInterval <= 1 ? '等价于每分钟执行。' : `每个小时的 ${getMinuteIntervalExample()} 分执行。`}</Description>
          </NumberField>
        </Surface>
      )}

      {minuteType === 'specific' && (
        <Surface className="p-4 rounded-3xl" variant="secondary">
          <div className="flex flex-col">
            <Label className="mb-2 text-base font-semibold">选择分钟</Label>
            <Description className="mb-3">点击选择要执行的分钟数，可多选。选 0 就是整点执行。</Description>
          </div>

          <div className="grid max-h-80 grid-cols-5 gap-2 overflow-y-auto p-1 md:grid-cols-10">
            {Array.from({ length: 60 }, (_, i) => i).map((m) => (
              <Button
                key={m}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificMinutes.includes(m) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSelectedPresetId(null)
                  setSpecificMinutes((prev) => (prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m].sort((a, b) => a - b)))
                }}
              >
                {m}
              </Button>
            ))}
          </div>
          {specificMinutes.length > 0 && (
            <Description className="mt-2">
              已选择 {specificMinutes.length} 个：{specificMinutes.join(', ')}
            </Description>
          )}
        </Surface>
      )}
    </div>
  )

  const renderHourTab = () => (
    <div className="space-y-4">
      <Surface className="p-4 rounded-3xl" variant="secondary">
        <RadioGroup aria-label="小时类型" variant="secondary" value={hourType} onChange={(v) => handleHourTypeChange(v as CronFieldType)}>
          <Label className="text-base font-semibold">一天里，哪些小时允许执行？</Label>
          <Description className="mb-3">如果选择“全部小时”，分钟页的规则会全天生效。</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                全部小时
              </Radio.Content>
              <Description>不限制小时。例如分钟为每 10 分钟时，就是全天每 10 分钟。</Description>
            </Radio>

            <Radio value="interval">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                间隔执行
              </Radio.Content>
              <Description>从 0 点开始，每隔几个小时开放一次执行时段。</Description>
            </Radio>

            <Radio value="specific">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                指定小时
              </Radio.Content>
              <Description>只在你点选的小时内执行。</Description>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {hourType === 'interval' && (
        <Surface className="p-4 rounded-3xl" variant="secondary">
          <Label className="mb-2 text-base font-semibold">间隔设置</Label>
          <NumberField
            variant="secondary"
            minValue={1}
            maxValue={23}
            value={hourInterval}
            onChange={(nextValue) => {
              setSelectedPresetId(null)
              setHourInterval(clampInteger(nextValue, 1, 23, 1))
            }}
          >
            <Label>间隔（小时）</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="w-24" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>
              {hourInterval <= 1 ? '间隔 1 小时等价于全部小时，保存时会自动写成 *。' : `只在 ${getHourIntervalExample()} 这些小时内执行。`}
            </Description>
          </NumberField>
        </Surface>
      )}

      {hourType === 'specific' && (
        <Surface className="p-4 rounded-3xl" variant="secondary">
          <div className="flex flex-col">
            <Label className="mb-2 text-base font-semibold">选择小时</Label>
            <Description className="mb-3">点击选择允许执行的小时，可多选。具体分钟仍由“分钟”页决定。</Description>
          </div>

          <div className="grid max-h-80 grid-cols-4 gap-2 overflow-y-auto p-1 md:grid-cols-6">
            {Array.from({ length: 24 }, (_, i) => i).map((h) => (
              <Button
                key={h}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificHours.includes(h) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSelectedPresetId(null)
                  setSpecificHours((prev) => (prev.includes(h) ? prev.filter((item) => item !== h) : [...prev, h].sort((a, b) => a - b)))
                }}
              >
                {h}
              </Button>
            ))}
          </div>
          {specificHours.length > 0 && (
            <Description className="mt-2">
              已选择 {specificHours.length} 个：{specificHours.map((h) => `${h}点`).join(', ')}
            </Description>
          )}
        </Surface>
      )}
    </div>
  )

  const renderDayTab = () => (
    <div className="space-y-4">
      <Surface className="p-4 rounded-3xl" variant="secondary">
        <RadioGroup aria-label="日期类型" variant="secondary" value={dayType} onChange={(v) => handleDayTypeChange(v as CronFieldType)}>
          <Label className="text-base font-semibold">一个月里，哪些日期允许执行？</Label>
          <Description className="mb-3">日期和星期只保留一个条件。选择日期后，会自动清空星期条件。</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                全部日期
              </Radio.Content>
              <Description>不限制几号执行。</Description>
            </Radio>

            <Radio value="interval">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                间隔执行
              </Radio.Content>
              <Description>从每月 1 号开始，每隔几天开放一次执行日期。</Description>
            </Radio>

            <Radio value="specific">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                指定日期
              </Radio.Content>
              <Description>只在你点选的几号执行。</Description>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {dayType === 'interval' && (
        <Surface className="p-4 rounded-3xl" variant="secondary">
          <Label className="mb-2 text-base font-semibold">间隔设置</Label>
          <NumberField
            variant="secondary"
            minValue={1}
            maxValue={31}
            value={dayInterval}
            onChange={(nextValue) => {
              setSelectedPresetId(null)
              setDayInterval(clampInteger(nextValue, 1, 31, 1))
              setWeekType('every')
              setSpecificWeeks([])
            }}
          >
            <Label>间隔（天）</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="w-24" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>
              {dayInterval <= 1 ? '间隔 1 天等价于全部日期，保存时会自动写成 *。' : `每月从 1 号开始，每隔 ${dayInterval} 天执行。`}
            </Description>
          </NumberField>
        </Surface>
      )}

      {dayType === 'specific' && (
        <Surface className="p-4 rounded-3xl" variant="secondary">
          <div className="flex flex-col">
            <Label className="mb-2 text-base font-semibold">选择日期</Label>
            <Description className="mb-3">点击选择允许执行的日期，可多选。月份没有这一天时会自动跳过。</Description>
          </div>

          <div className="grid max-h-80 grid-cols-5 gap-2 overflow-y-auto p-1 md:grid-cols-7">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <Button
                key={d}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificDays.includes(d) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSelectedPresetId(null)
                  setWeekType('every')
                  setSpecificWeeks([])
                  setSpecificDays((prev) => (prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d].sort((a, b) => a - b)))
                }}
              >
                {d}
              </Button>
            ))}
          </div>
          {specificDays.length > 0 && (
            <Description className="mt-2">
              已选择 {specificDays.length} 个：{specificDays.map((d) => `${d}号`).join(', ')}
            </Description>
          )}
        </Surface>
      )}
    </div>
  )

  const renderWeekTab = () => (
    <div className="space-y-4">
      <Surface className="p-4 rounded-3xl" variant="secondary">
        <RadioGroup aria-label="星期类型" variant="secondary" value={weekType} onChange={(v) => handleWeekTypeChange(v as WeekFieldType)}>
          <Label className="text-base font-semibold">一周里，哪些星期允许执行？</Label>
          <Description className="mb-3">日期和星期只保留一个条件。选择星期后，会自动清空日期条件。</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                全部星期
              </Radio.Content>
              <Description>不限制星期几执行。</Description>
            </Radio>

            <Radio value="specific">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                指定星期
              </Radio.Content>
              <Description>只在你点选的星期执行。</Description>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {weekType === 'specific' && (
        <Surface className="p-4 rounded-3xl" variant="secondary">
          <div className="flex flex-col">
            <Label className="mb-2 text-base font-semibold">选择星期</Label>
            <Description className="mb-3">点击选择允许执行的星期，可多选。具体时间仍由分钟和小时页决定。</Description>
          </div>

          <div className="grid grid-cols-7 gap-2 p-1">
            {['日', '一', '二', '三', '四', '五', '六'].map((label, index) => (
              <Button
                key={index}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificWeeks.includes(index) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSelectedPresetId(null)
                  setDayType('every')
                  setDayInterval(1)
                  setSpecificDays([])
                  setSpecificWeeks((prev) =>
                    prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index].sort((a, b) => a - b)
                  )
                }}
              >
                {label}
              </Button>
            ))}
          </div>
          {specificWeeks.length > 0 && (
            <Description className="mt-2">
              已选择 {specificWeeks.length} 天：{specificWeeks.map((w) => `周${'日一二三四五六'[w]}`).join(', ')}
            </Description>
          )}
        </Surface>
      )}
    </div>
  )

  const placement = device === 'desktop' ? 'right' : 'bottom'
  const savedValue = value || DEFAULT_CRON
  const savedDescription = describeCronValue(savedValue)

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2">
          <TextField fullWidth isDisabled value={value}>
            <Label className="sr-only">定时推送时间</Label>
            <Input placeholder="*/10 * * * *" variant="secondary" aria-label="定时任务表达式" />
          </TextField>
          <Button isDisabled={disabled} variant="secondary" onPress={() => setIsOpen(true)}>
            <Clock className="size-4" aria-hidden="true" />
            <span>编辑</span>
          </Button>
        </div>
        <Description>当前规则：{savedDescription}</Description>
      </div>

      <Drawer.Backdrop isOpen={isOpen} variant="blur" onOpenChange={setIsOpen}>
        <Drawer.Content placement={placement}>
          <Drawer.Dialog className={device === 'desktop' ? 'h-full w-120 max-w-[90vw]' : 'max-h-[85dvh]'}>
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>定时推送时间</Drawer.Heading>
              <Description>先选常用规则；需要精细控制时，再进入分钟、小时、日期、星期设置。</Description>
            </Drawer.Header>

            <Drawer.Body className="min-w-0 space-y-4 overflow-x-hidden">
              <Tabs className="min-w-0" selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as CronTab)}>
                <Tabs.ListContainer>
                  <Tabs.List>
                    <Tabs.Tab id="quick">
                      <span>常用</span>
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="minute">
                      <span>分钟</span>
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="hour">
                      <span>小时</span>
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="day">
                      <span>日期</span>
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="week">
                      <span>星期</span>
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>

                <div className="h-1" />

                <Tabs.Panel id="quick" className="p-0">
                  {renderQuickTab()}
                </Tabs.Panel>
                <Tabs.Panel id="minute" className="p-0">
                  {renderMinuteTab()}
                </Tabs.Panel>
                <Tabs.Panel id="hour" className="p-0">
                  {renderHourTab()}
                </Tabs.Panel>
                <Tabs.Panel id="day" className="p-0">
                  {renderDayTab()}
                </Tabs.Panel>
                <Tabs.Panel id="week" className="p-0">
                  {renderWeekTab()}
                </Tabs.Panel>
              </Tabs>

              <Surface className="p-4 rounded-3xl" variant="secondary">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-muted">实际执行时间</Label>
                    <p className="mt-1 text-sm leading-relaxed">{generateDescription()}</p>
                    <Description className="mt-1">{generateExample()}</Description>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted">表达式</Label>
                    <code className="mt-1 block font-mono text-base font-semibold">{generateCron()}</code>
                  </div>
                </div>
              </Surface>
            </Drawer.Body>

            <Drawer.Footer>
              <Button className="flex-1" slot="close" variant="tertiary">
                取消
              </Button>
              <Button className="flex-1" variant="primary" onPress={handleConfirm}>
                使用这个规则
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </div>
  )
}

export default CronEditor
