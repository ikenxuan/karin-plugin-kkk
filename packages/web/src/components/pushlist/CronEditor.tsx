/**
 * 可视化 Cron 表达式编辑器（Drawer 模式）
 * PC 端右侧弹出，移动端底部弹出
 */

import { Button, Description, Drawer, Input, Label, NumberField, Radio, RadioGroup, Surface, Tabs, TextField } from '@heroui/react'
import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CronEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  device?: 'desktop' | 'mobile'
}

type CronTab = 'minute' | 'hour' | 'day' | 'week'

const CronEditor = ({ value, onChange, disabled = false, device = 'desktop' }: CronEditorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<CronTab>('minute')

  // 分钟配置
  const [minuteType, setMinuteType] = useState<'every' | 'interval' | 'specific'>('interval')
  const [minuteInterval, setMinuteInterval] = useState(10)
  const [specificMinutes, setSpecificMinutes] = useState<number[]>([])

  // 小时配置
  const [hourType, setHourType] = useState<'every' | 'interval' | 'specific'>('every')
  const [hourInterval, setHourInterval] = useState(1)
  const [specificHours, setSpecificHours] = useState<number[]>([])

  // 天配置
  const [dayType, setDayType] = useState<'every' | 'interval' | 'specific'>('every')
  const [dayInterval, setDayInterval] = useState(1)
  const [specificDays, setSpecificDays] = useState<number[]>([])

  // 周配置
  const [weekType, setWeekType] = useState<'every' | 'specific'>('every')
  const [specificWeeks, setSpecificWeeks] = useState<number[]>([])

  // 初始化时解析 cron 表达式（简单解析，仅支持常见格式）
  useEffect(() => {
    if (!value || !isOpen) return

    const parts = value.split(' ')
    if (parts.length !== 5) return

    const [minute, hour] = parts

    // 解析分钟
    if (minute === '*') {
      setMinuteType('every')
    } else if (minute.startsWith('*/')) {
      setMinuteType('interval')
      setMinuteInterval(parseInt(minute.slice(2)) || 10)
    } else if (minute.includes(',')) {
      setMinuteType('specific')
      setSpecificMinutes(minute.split(',').map(Number).filter((n) => !isNaN(n)))
    }

    // 解析小时
    if (hour === '*') {
      setHourType('every')
    } else if (hour.startsWith('*/')) {
      setHourType('interval')
      setHourInterval(parseInt(hour.slice(2)) || 1)
    } else if (hour.includes(',')) {
      setHourType('specific')
      setSpecificHours(hour.split(',').map(Number).filter((n) => !isNaN(n)))
    }
  }, [value, isOpen])

  // 生成 cron 表达式
  const generateCron = () => {
    let minute = '*'
    let hour = '*'
    let day = '*'
    let month = '*'
    let week = '*'

    switch (minuteType) {
      case 'every':
        minute = '*'
        break
      case 'interval':
        minute = `*/${minuteInterval}`
        break
      case 'specific':
        minute = specificMinutes.length > 0 ? specificMinutes.sort((a, b) => a - b).join(',') : '0'
        break
    }

    switch (hourType) {
      case 'every':
        hour = '*'
        break
      case 'interval':
        hour = `*/${hourInterval}`
        break
      case 'specific':
        hour = specificHours.length > 0 ? specificHours.sort((a, b) => a - b).join(',') : '0'
        break
    }

    switch (dayType) {
      case 'every':
        day = '*'
        break
      case 'interval':
        day = `*/${dayInterval}`
        break
      case 'specific':
        day = specificDays.length > 0 ? specificDays.sort((a, b) => a - b).join(',') : '1'
        break
    }

    switch (weekType) {
      case 'every':
        week = '*'
        break
      case 'specific':
        week = specificWeeks.length > 0 ? specificWeeks.sort((a, b) => a - b).join(',') : '*'
        break
    }

    return `${minute} ${hour} ${day} ${month} ${week}`
  }

  // 生成中文描述
  const generateDescription = () => {
    // 构建时间描述
    let timeDesc = ''
    let frequencyDesc = ''

    // 分钟部分
    if (minuteType === 'every') {
      frequencyDesc = '每分钟'
    } else if (minuteType === 'interval') {
      frequencyDesc = `每 ${minuteInterval} 分钟`
    } else if (minuteType === 'specific' && specificMinutes.length > 0) {
      if (specificMinutes.length <= 5) {
        timeDesc = `${specificMinutes.join(', ')} 分`
      } else {
        timeDesc = `每小时的 ${specificMinutes.length} 个指定分钟`
      }
    }

    // 小时部分
    if (hourType === 'every') {
      if (!frequencyDesc) frequencyDesc = '每小时'
    } else if (hourType === 'interval') {
      frequencyDesc = frequencyDesc ? `${frequencyDesc}，每 ${hourInterval} 小时` : `每 ${hourInterval} 小时`
    } else if (hourType === 'specific' && specificHours.length > 0) {
      if (specificHours.length <= 6) {
        timeDesc = `${specificHours.join(', ')} 点${timeDesc ? ' ' + timeDesc : ''}`
      } else {
        timeDesc = `每天的 ${specificHours.length} 个指定时段${timeDesc ? '的指定分钟' : ''}`
      }
    }

    // 日期部分
    let dateDesc = ''
    if (dayType === 'interval') {
      dateDesc = `每 ${dayInterval} 天`
    } else if (dayType === 'specific' && specificDays.length > 0) {
      if (specificDays.length <= 5) {
        dateDesc = `每月 ${specificDays.join(', ')} 号`
      } else {
        dateDesc = `每月的 ${specificDays.length} 个指定日期`
      }
    }

    // 星期部分
    if (weekType === 'specific' && specificWeeks.length > 0) {
      const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const selectedWeeks = specificWeeks.map((w) => weekNames[w])

      // 检查是否是工作日
      if (specificWeeks.length === 5 && specificWeeks.every(w => [1, 2, 3, 4, 5].includes(w))) {
        dateDesc = dateDesc ? `${dateDesc}，工作日` : '工作日'
      } else if (specificWeeks.length === 2 && specificWeeks.every(w => [0, 6].includes(w))) {
        dateDesc = dateDesc ? `${dateDesc}，周末` : '周末'
      } else {
        dateDesc = dateDesc ? `${dateDesc}，${selectedWeeks.join('、')}` : selectedWeeks.join('、')
      }
    }

    // 组合描述
    const parts = [dateDesc, timeDesc, frequencyDesc].filter(Boolean)

    if (parts.length === 0) {
      return '每分钟执行一次'
    }

    return parts.join('，') + ' 执行'
  }

  const handleConfirm = () => {
    const cron = generateCron()
    onChange(cron)
    setIsOpen(false)
  }

  const renderMinuteTab = () => (
    <div className="space-y-4">
      <Surface className="p-4">
        <RadioGroup aria-label="分钟类型" value={minuteType} onChange={(v) => setMinuteType(v as typeof minuteType)}>
          <Label className="text-base font-semibold">执行频率</Label>
          <Description className="mb-3">选择任务在每小时内的执行方式</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>每分钟</Label>
                <Description>每分钟执行一次（共 60 次/小时）</Description>
              </Radio.Content>
            </Radio>

            <Radio value="interval">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>间隔执行</Label>
                <Description>按固定间隔分钟数执行</Description>
              </Radio.Content>
            </Radio>

            <Radio value="specific">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>指定分钟</Label>
                <Description>选择特定的分钟数执行</Description>
              </Radio.Content>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {minuteType === 'interval' && (
        <Surface className="p-4">
          <Label className="mb-2 text-base font-semibold">间隔设置</Label>
          <NumberField minValue={1} maxValue={59} value={minuteInterval} onChange={setMinuteInterval}>
            <Label>间隔（分钟）</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="w-24" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>每 {minuteInterval} 分钟执行一次</Description>
          </NumberField>
        </Surface>
      )}

      {minuteType === 'specific' && (
        <Surface className="p-4">
          <Label className="mb-2 text-base font-semibold">选择分钟</Label>
          <Description className="mb-3">点击选择要执行的分钟数，可多选</Description>
          <div className="grid max-h-80 grid-cols-5 gap-2 overflow-y-auto p-1 md:grid-cols-10">
            {Array.from({ length: 60 }, (_, i) => i).map((m) => (
              <Button
                key={m}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificMinutes.includes(m) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSpecificMinutes((prev) => (prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m].sort((a, b) => a - b)))
                }}
              >
                {m}
              </Button>
            ))}
          </div>
          {specificMinutes.length > 0 && (
            <Description className="mt-2">已选择 {specificMinutes.length} 个：{specificMinutes.join(', ')}</Description>
          )}
        </Surface>
      )}
    </div>
  )

  const renderHourTab = () => (
    <div className="space-y-4">
      <Surface className="p-4">
        <RadioGroup aria-label="小时类型" value={hourType} onChange={(v) => setHourType(v as typeof hourType)}>
          <Label className="text-base font-semibold">执行频率</Label>
          <Description className="mb-3">选择任务在每天内的执行方式</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>每小时</Label>
                <Description>每小时执行一次（共 24 次/天）</Description>
              </Radio.Content>
            </Radio>

            <Radio value="interval">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>间隔执行</Label>
                <Description>按固定间隔小时数执行</Description>
              </Radio.Content>
            </Radio>

            <Radio value="specific">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>指定小时</Label>
                <Description>选择特定的小时执行</Description>
              </Radio.Content>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {hourType === 'interval' && (
        <Surface className="p-4">
          <Label className="mb-2 text-base font-semibold">间隔设置</Label>
          <NumberField minValue={1} maxValue={23} value={hourInterval} onChange={setHourInterval}>
            <Label>间隔（小时）</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="w-24" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>每 {hourInterval} 小时执行一次</Description>
          </NumberField>
        </Surface>
      )}

      {hourType === 'specific' && (
        <Surface className="p-4">
          <Label className="mb-2 text-base font-semibold">选择小时</Label>
          <Description className="mb-3">点击选择要执行的小时，可多选</Description>
          <div className="grid max-h-80 grid-cols-4 gap-2 overflow-y-auto p-1 md:grid-cols-6">
            {Array.from({ length: 24 }, (_, i) => i).map((h) => (
              <Button
                key={h}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificHours.includes(h) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSpecificHours((prev) => (prev.includes(h) ? prev.filter((item) => item !== h) : [...prev, h].sort((a, b) => a - b)))
                }}
              >
                {h}
              </Button>
            ))}
          </div>
          {specificHours.length > 0 && (
            <Description className="mt-2">已选择 {specificHours.length} 个：{specificHours.map((h) => `${h}点`).join(', ')}</Description>
          )}
        </Surface>
      )}
    </div>
  )

  const renderDayTab = () => (
    <div className="space-y-4">
      <Surface className="p-4">
        <RadioGroup aria-label="日期类型" value={dayType} onChange={(v) => setDayType(v as typeof dayType)}>
          <Label className="text-base font-semibold">执行频率</Label>
          <Description className="mb-3">选择任务在每月内的执行方式</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>每天</Label>
                <Description>每天执行一次</Description>
              </Radio.Content>
            </Radio>

            <Radio value="interval">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>间隔执行</Label>
                <Description>按固定间隔天数执行</Description>
              </Radio.Content>
            </Radio>

            <Radio value="specific">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>指定日期</Label>
                <Description>选择特定的日期执行</Description>
              </Radio.Content>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {dayType === 'interval' && (
        <Surface className="p-4">
          <Label className="mb-2 text-base font-semibold">间隔设置</Label>
          <NumberField minValue={1} maxValue={31} value={dayInterval} onChange={setDayInterval}>
            <Label>间隔（天）</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="w-24" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>每 {dayInterval} 天执行一次</Description>
          </NumberField>
        </Surface>
      )}

      {dayType === 'specific' && (
        <Surface className="p-4">
          <Label className="mb-2 text-base font-semibold">选择日期</Label>
          <Description className="mb-3">点击选择要执行的日期，可多选</Description>
          <div className="grid max-h-80 grid-cols-5 gap-2 overflow-y-auto p-1 md:grid-cols-7">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <Button
                key={d}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificDays.includes(d) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSpecificDays((prev) => (prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d].sort((a, b) => a - b)))
                }}
              >
                {d}
              </Button>
            ))}
          </div>
          {specificDays.length > 0 && (
            <Description className="mt-2">已选择 {specificDays.length} 个：{specificDays.map((d) => `${d}号`).join(', ')}</Description>
          )}
        </Surface>
      )}
    </div>
  )

  const renderWeekTab = () => (
    <div className="space-y-4">
      <Surface className="p-4">
        <RadioGroup aria-label="星期类型" value={weekType} onChange={(v) => setWeekType(v as typeof weekType)}>
          <Label className="text-base font-semibold">执行频率</Label>
          <Description className="mb-3">选择任务在每周内的执行方式</Description>
          <div className="space-y-3">
            <Radio value="every">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>每周</Label>
                <Description>每天都执行</Description>
              </Radio.Content>
            </Radio>

            <Radio value="specific">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>指定星期</Label>
                <Description>选择特定的星期执行</Description>
              </Radio.Content>
            </Radio>
          </div>
        </RadioGroup>
      </Surface>

      {weekType === 'specific' && (
        <Surface className="p-4">
          <Label className="mb-2 text-base font-semibold">选择星期</Label>
          <Description className="mb-3">点击选择要执行的星期，可多选</Description>
          <div className="grid grid-cols-7 gap-2 p-1">
            {['日', '一', '二', '三', '四', '五', '六'].map((label, index) => (
              <Button
                key={index}
                className="aspect-square min-w-0 shrink-0 p-0"
                size="sm"
                variant={specificWeeks.includes(index) ? 'primary' : 'secondary'}
                onPress={() => {
                  setSpecificWeeks((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index].sort((a, b) => a - b)))
                }}
              >
                {label}
              </Button>
            ))}
          </div>
          {specificWeeks.length > 0 && (
            <Description className="mt-2">已选择 {specificWeeks.length} 天：{specificWeeks.map((w) => `周${'日一二三四五六'[w]}`).join(', ')}</Description>
          )}
        </Surface>
      )}
    </div>
  )

  const placement = device === 'desktop' ? 'right' : 'bottom'

  return (
    <div className="space-y-2">
      <Label>定时任务表达式</Label>
      <div className="flex gap-2">
        <TextField fullWidth isDisabled value={value}>
          <Input placeholder="*/10 * * * *" />
        </TextField>
        <Button isDisabled={disabled} variant="secondary" onPress={() => setIsOpen(true)}>
          <Clock className="size-4" />
          <span>编辑</span>
        </Button>
      </div>
      <Description>当前：{value || '未设置'}</Description>

      <Drawer.Backdrop isOpen={isOpen} variant="blur" onOpenChange={setIsOpen}>
        <Drawer.Content placement={placement}>
          <Drawer.Dialog className={device === 'desktop' ? 'h-full w-120 max-w-[90vw]' : 'max-h-[85dvh]'}>
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Cron 表达式编辑器</Drawer.Heading>
              <Description>可视化配置定时任务执行规则</Description>
            </Drawer.Header>

            <Drawer.Body className="space-y-4">
              <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as CronTab)}>
                <Tabs.ListContainer>
                  <Tabs.List>
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

                <Tabs.Panel id="minute">{renderMinuteTab()}</Tabs.Panel>
                <Tabs.Panel id="hour">{renderHourTab()}</Tabs.Panel>
                <Tabs.Panel id="day">{renderDayTab()}</Tabs.Panel>
                <Tabs.Panel id="week">{renderWeekTab()}</Tabs.Panel>
              </Tabs>

              <Surface className="p-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-muted">Cron 表达式</Label>
                    <code className="mt-1 block font-mono text-base font-semibold">{generateCron()}</code>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted">执行规则</Label>
                    <p className="mt-1 text-sm leading-relaxed">{generateDescription()}</p>
                  </div>
                </div>
              </Surface>
            </Drawer.Body>

            <Drawer.Footer>
              <Button className="flex-1" slot="close" variant="tertiary">
                取消
              </Button>
              <Button className="flex-1" variant="primary" onPress={handleConfirm}>
                确定
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </div>
  )
}

export default CronEditor
