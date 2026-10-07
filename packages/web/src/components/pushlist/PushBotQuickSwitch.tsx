import { Button, Description, Label } from '@heroui/react'
import { ArrowRightLeft } from 'lucide-react'
import { useState } from 'react'

import BotQuickSwitchDialog, { type BotQuickSwitchItem } from './BotQuickSwitchDialog'
import { parseTargetValue } from './targetUtils'
import type { PushlistDevice } from './types'

interface PushBotQuickSwitchProps {
  device: PushlistDevice
  /** 平台名（如「抖音」「B站」），仅用于文案 */
  platformLabel: string
  items: BotQuickSwitchItem[]
  /** 应用切换：返回与 items 等长的 values 数组，未受影响的对象原样返回 */
  onApply: (nextValues: string[][]) => void
}

/** 平台 Tab 顶层的推送 Bot 快捷切换入口与对话框 */
const PushBotQuickSwitch = ({ device, platformLabel, items, onApply }: PushBotQuickSwitchProps) => {
  const [open, setOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.values.filter((value) => parseTargetValue(value)).length, 0)
  const botIds = new Set<string>()
  items.forEach((item) =>
    item.values.forEach((value) => {
      const parsed = parseTargetValue(value)
      if (parsed) botIds.add(parsed.botId)
    })
  )
  const summary = total === 0 ? `「${platformLabel}」还没有配置推送目标` : `共 ${total} 条推送目标，涉及 ${botIds.size} 个 Bot`

  return (
    <>
      <div className="flex items-center justify-between gap-4 rounded-lg border border-default-200 bg-default-50/50 px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <Label>推送 Bot 快捷切换</Label>
          <Description className="mt-1">{summary}</Description>
        </div>
        <Button isDisabled={total === 0} size={device === 'mobile' ? 'sm' : 'md'} variant="secondary" onPress={() => setOpen(true)}>
          <ArrowRightLeft className="size-4" />
          <span>切换 Bot</span>
        </Button>
      </div>

      <BotQuickSwitchDialog
        device={device}
        isOpen={open}
        items={items}
        platformLabel={platformLabel}
        onApply={onApply}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default PushBotQuickSwitch
