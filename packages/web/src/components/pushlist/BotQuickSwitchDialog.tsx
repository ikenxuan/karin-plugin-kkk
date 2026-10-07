import { Avatar, Button, Chip, Description, Drawer, Label, Spinner, toast } from '@heroui/react'
import { CircleCheck, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { getPushBots, getPushMappingsBatch, type BotInfo, type GroupMappingInfo } from '../../api/pushTargets'
import TargetSelect from './TargetSelect'
import { collectBotUsage, formatTargetValue, parseTargetValue, switchTargetBot } from './targetUtils'
import type { PushlistDevice } from './types'

/** 参与平台级 Bot 切换的单个推送对象抽象 */
export interface BotQuickSwitchItem {
  /** 推送对象展示名（备注 / 抖音号 / UID 等） */
  label: string
  /** 二级说明，可为空字符串 */
  description: string
  /** 该对象的推送目标值（groupId:botId） */
  values: string[]
}

interface BotQuickSwitchDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  device: PushlistDevice
  /** 平台名（如「抖音」「B站」），仅用于文案；单推送对象场景可不传 */
  platformLabel?: string
  items: BotQuickSwitchItem[]
  /** 应用切换：返回与 items 等长的 values 数组，未受影响的对象原样返回 */
  onApply: (nextValues: string[][]) => void
  /** 对话框标题，默认「推送 Bot 快捷切换」 */
  title?: string
  /** 对话框说明文案，默认按平台级展示 */
  description?: string
  /** 应用成功提示的后缀，默认「保存配置后生效」 */
  appliedHint?: string
}

interface ChangedEntry {
  oldValue: string
  newValue: string
}

interface AffectedItem {
  item: BotQuickSwitchItem
  entries: ChangedEntry[]
}

interface AppliedSummary {
  objects: number
  entries: number
  fromName: string
  toName: string
}

const BotAvatar = ({ name, avatar }: { name: string; avatar?: string }) => (
  <Avatar size="sm">
    <Avatar.Image alt={name} src={avatar} />
    <Avatar.Fallback>{name.slice(0, 1)}</Avatar.Fallback>
  </Avatar>
)

const BotQuickSwitchDialog = ({
  isOpen,
  onOpenChange,
  device,
  platformLabel,
  items,
  onApply,
  title = '推送 Bot 快捷切换',
  description = platformLabel ? `把「${platformLabel}」的推送目标从当前 Bot 批量切换到目标 Bot。` : '把推送目标从当前 Bot 切换到目标 Bot。',
  appliedHint = '保存配置后生效'
}: BotQuickSwitchDialogProps) => {
  const [bots, setBots] = useState<BotInfo[]>([])
  const [details, setDetails] = useState<Map<string, GroupMappingInfo>>(new Map())
  const [fromBotId, setFromBotId] = useState('')
  const [toBotId, setToBotId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applied, setApplied] = useState(false)
  const [appliedAffected, setAppliedAffected] = useState<AffectedItem[]>([])
  const [appliedSummary, setAppliedSummary] = useState<AppliedSummary | null>(null)

  const placement = device === 'desktop' ? 'right' : 'bottom'
  const buttonSize = device === 'mobile' ? 'sm' : 'md'

  useEffect(() => {
    if (!isOpen) return

    setFromBotId('')
    setToBotId('')
    setApplied(false)
    setAppliedAffected([])
    setAppliedSummary(null)
    setBots([])
    setDetails(new Map())
    setError('')
    setLoading(true)

    let cancelled = false
    const seenTargets = new Set<string>()
    const allTargets: Array<{ groupId: string; botId: string }> = []
    items.forEach((item) =>
      item.values.forEach((value) => {
        const parsed = parseTargetValue(value)
        if (!parsed) return
        const key = formatTargetValue(parsed)
        if (seenTargets.has(key)) return
        seenTargets.add(key)
        allTargets.push(parsed)
      })
    )

    Promise.all([getPushBots(), getPushMappingsBatch(allTargets).catch(() => [] as GroupMappingInfo[])])
      .then(([botList, mappingList]) => {
        if (cancelled) return
        setBots(botList)
        setDetails(new Map(mappingList.map((info) => [formatTargetValue(info), info])))
      })
      .catch((requestError) => {
        if (cancelled) return
        setError(requestError instanceof Error ? requestError.message : '获取 Bot 列表失败')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // 仅在打开时拉取一次数据，items 由父组件在应用切换后统一更新
  }, [isOpen])

  const hasTargets = items.some((item) => item.values.length > 0)

  const fromOptions = useMemo(
    () =>
      collectBotUsage(items.map((item) => item.values)).map((usage) => {
        const bot = bots.find((item) => item.id === usage.botId)
        return {
          id: usage.botId,
          name: bot?.name || usage.botId,
          avatar: bot?.avatar || '',
          description: `${usage.count} 条推送目标 · ${bot ? '在线' : '离线/未注册'}`
        }
      }),
    [bots, items]
  )

  const toOptions = useMemo(
    () =>
      bots
        .filter((bot) => bot.id !== fromBotId)
        .map((bot) => ({
          id: bot.id,
          name: bot.name,
          avatar: bot.avatar,
          description: bot.id
        })),
    [bots, fromBotId]
  )

  const affected = useMemo(() => {
    if (!fromBotId || !toBotId) return [] as AffectedItem[]

    const result: AffectedItem[] = []
    items.forEach((item) => {
      const entries = item.values
        .filter((value) => parseTargetValue(value)?.botId === fromBotId)
        .map((oldValue) => ({ oldValue, newValue: switchTargetBot(oldValue, toBotId) }))

      if (entries.length > 0) result.push({ item, entries })
    })
    return result
  }, [items, fromBotId, toBotId])

  const changedCount = affected.reduce((sum, item) => sum + item.entries.length, 0)
  const visibleAffected = applied ? appliedAffected : affected

  const apply = () => {
    if (!fromBotId || !toBotId || affected.length === 0) return

    const fromBot = bots.find((bot) => bot.id === fromBotId)
    const toBot = bots.find((bot) => bot.id === toBotId)

    onApply(items.map((item) => item.values.map((value) => (parseTargetValue(value)?.botId === fromBotId ? switchTargetBot(value, toBotId) : value))))

    setAppliedAffected(affected)
    setAppliedSummary({
      objects: affected.length,
      entries: changedCount,
      fromName: fromBot?.name || fromBotId,
      toName: toBot?.name || toBotId
    })
    setApplied(true)
    toast.success(`已切换 ${affected.length} 个推送对象的 ${changedCount} 条推送目标，${appliedHint}`)
  }

  const renderEntry = (entry: ChangedEntry) => {
    const parsed = parseTargetValue(entry.oldValue)
    if (!parsed) return null

    const previous = details.get(entry.oldValue)
    const toBot = bots.find((bot) => bot.id === toBotId)
    const fromName = previous?.botName || fromBotId
    const toName = toBot?.name || toBotId

    return (
      <div key={entry.oldValue} className="flex flex-col gap-1.5 rounded-lg border border-default-200 bg-default-50/50 p-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar size="sm">
            <Avatar.Image alt={previous?.groupName || parsed.groupId} src={previous?.groupAvatar} />
            <Avatar.Fallback>{(previous?.groupName || parsed.groupId).slice(0, 1)}</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0">
            <Label className="block truncate">{previous?.groupName || parsed.groupId}</Label>
            <Description className="block truncate">{parsed.groupId}</Description>
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2 pl-8">
          <BotAvatar name={fromName} avatar={previous?.botAvatar} />
          <span className="min-w-0 truncate text-xs text-muted">{fromName}</span>
          <span className="shrink-0 text-xs text-muted">→</span>
          <BotAvatar name={toName} avatar={toBot?.avatar} />
          <span className="min-w-0 truncate text-xs">{toName}</span>
        </div>
      </div>
    )
  }

  return (
    <Drawer.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} variant="blur">
      <Drawer.Content placement={placement}>
        <Drawer.Dialog className={device === 'desktop' ? 'h-full w-130 max-w-[90vw]' : 'max-h-[84dvh]'}>
          <Drawer.Handle />
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Drawer.Heading>{title}</Drawer.Heading>
            <Description>{description}</Description>
          </Drawer.Header>
          <Drawer.Body className="flex min-h-0 flex-col gap-3">
            {applied && appliedSummary ? (
              <div className="flex items-start gap-2 rounded-lg border border-success/30 bg-success/10 p-3 text-sm">
                <CircleCheck className="size-4 shrink-0 text-success" />
                <span>
                  已将 {appliedSummary.objects} 个推送对象的 {appliedSummary.entries} 条推送目标从「{appliedSummary.fromName}
                  」切换到「{appliedSummary.toName}」，{appliedHint}。
                </span>
              </div>
            ) : null}

            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted">
                <Spinner size="sm" aria-label="正在读取 Bot 信息" />
                <span>正在读取 Bot 信息</span>
              </div>
            ) : (
              <>
                <TargetSelect
                  description="列出推送目标中实际出现的 Bot，含离线 Bot。"
                  disabled={applied}
                  items={fromOptions}
                  label="当前 Bot"
                  placeholder="选择要替换掉的 Bot"
                  selectedId={fromBotId}
                  onSelect={(id) => {
                    setToBotId('')
                    setFromBotId(id)
                  }}
                />

                <TargetSelect
                  description={fromBotId ? 'Karin 当前在线的 Bot。' : '请先选择当前 Bot。'}
                  disabled={applied || !fromBotId}
                  items={toOptions}
                  label="目标 Bot"
                  placeholder="选择切换后的 Bot"
                  selectedId={toBotId}
                  onSelect={setToBotId}
                />

                {!fromBotId && toOptions.length === 0 && bots.length > 0 ? (
                  <Description className="text-warning">当前没有其他在线 Bot 可作为切换目标。</Description>
                ) : null}
              </>
            )}

            {error ? (
              <div className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
                <TriangleAlert className="size-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            {hasTargets ? (
              <div className="flex min-h-0 flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <Label>{applied ? '已更改的推送对象' : '将被更改的推送对象'}</Label>
                  <Description>
                    {applied && appliedSummary
                      ? `${appliedSummary.objects} 个推送对象 / ${appliedSummary.entries} 条推送目标`
                      : fromBotId && toBotId
                        ? affected.length > 0
                          ? `${affected.length} 个推送对象 / ${changedCount} 条推送目标`
                          : '没有匹配「当前 Bot」的推送目标。'
                        : '选择当前 Bot 与目标 Bot 后，这里会预览受影响的推送对象。'}
                  </Description>
                </div>

                {visibleAffected.length > 0 ? (
                  <div
                    className={
                      device === 'mobile'
                        ? 'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-2'
                        : 'flex max-h-96 flex-col gap-4 overflow-y-auto'
                    }
                  >
                    {visibleAffected.map(({ item, entries }, itemIndex) => (
                      <div key={itemIndex} className="flex flex-col gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <Avatar size="sm">
                            <Avatar.Fallback>{item.label.slice(0, 1)}</Avatar.Fallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <Label className="block truncate">{item.label}</Label>
                            {item.description ? <Description className="block truncate">{item.description}</Description> : null}
                          </div>
                          <Chip color="accent" variant="soft">
                            {entries.length} 条
                          </Chip>
                        </div>
                        <div className={device === 'mobile' ? 'flex flex-col gap-2' : 'flex flex-col gap-2 pl-8'}>
                          {entries.map(renderEntry)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-default-300 px-4 py-5 text-sm text-muted">
                {platformLabel ? `「${platformLabel}」还没有配置推送目标。` : '还没有配置推送目标。'}
              </div>
            )}
          </Drawer.Body>
          <Drawer.Footer>
            <Button size={buttonSize} slot="close" variant="secondary">
              取消
            </Button>
            {applied ? (
              <Button size={buttonSize} slot="close">
                完成
              </Button>
            ) : (
              <Button size={buttonSize} isDisabled={!fromBotId || !toBotId || affected.length === 0} onPress={apply}>
                应用更改
              </Button>
            )}
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  )
}

export default BotQuickSwitchDialog
