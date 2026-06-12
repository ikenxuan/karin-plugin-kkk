import { Button, Description, Drawer, Label, Spinner } from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'

import { getPushBotGroups, getPushBots, type BotInfo, type GroupBriefInfo } from '../../api/pushTargets'
import TargetSelect from './TargetSelect'
import type { PushTargetMapping, PushlistDevice } from './types'

interface GroupMappingEditorDrawerProps {
  isOpen: boolean
  device: PushlistDevice
  initialMapping?: Pick<PushTargetMapping, 'groupId' | 'botId'> | null
  onOpenChange: (isOpen: boolean) => void
  onConfirm: (mapping: PushTargetMapping) => void
}

const GroupMappingEditorDrawer = ({ isOpen, device, initialMapping, onOpenChange, onConfirm }: GroupMappingEditorDrawerProps) => {
  const [bots, setBots] = useState<BotInfo[]>([])
  const [groups, setGroups] = useState<GroupBriefInfo[]>([])
  const [selectedBotId, setSelectedBotId] = useState(initialMapping?.botId || '')
  const [selectedGroupId, setSelectedGroupId] = useState(initialMapping?.groupId || '')
  const [loadingBots, setLoadingBots] = useState(true)
  const [loadingGroups, setLoadingGroups] = useState(Boolean(initialMapping?.botId))
  const [error, setError] = useState('')

  const selectedBot = useMemo(() => bots.find((bot) => bot.id === selectedBotId), [bots, selectedBotId])
  const selectedGroup = useMemo(() => groups.find((group) => group.id === selectedGroupId), [groups, selectedGroupId])
  const botOptions = useMemo(
    () =>
      bots.map((bot) => ({
        id: bot.id,
        name: bot.name,
        avatar: bot.avatar,
        description: bot.id
      })),
    [bots]
  )
  const groupOptions = useMemo(
    () =>
      groups.map((group) => ({
        id: group.id,
        name: group.name,
        avatar: group.avatar,
        description: group.id
      })),
    [groups]
  )
  const canConfirm = Boolean(selectedBotId && selectedGroupId)

  useEffect(() => {
    if (!isOpen) return

    getPushBots()
      .then(setBots)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : '获取 Bot 列表失败')
      })
      .finally(() => setLoadingBots(false))
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !selectedBotId) return

    getPushBotGroups(selectedBotId)
      .then((nextGroups) => {
        setGroups(nextGroups)
        setSelectedGroupId((current) => (nextGroups.some((group) => group.id === current) ? current : ''))
      })
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : '获取群列表失败')
      })
      .finally(() => setLoadingGroups(false))
  }, [isOpen, selectedBotId])

  const confirm = () => {
    if (!canConfirm || !selectedBot || !selectedGroup) return

    const mapping: PushTargetMapping = {
      groupId: selectedGroup.id,
      botId: selectedBot.id
    }
    if (selectedGroup.name) mapping.groupName = selectedGroup.name
    if (selectedGroup.avatar) mapping.groupAvatar = selectedGroup.avatar
    if (selectedBot.name) mapping.botName = selectedBot.name
    if (selectedBot.avatar) mapping.botAvatar = selectedBot.avatar
    if (selectedBot.isOnline !== undefined) mapping.isOnline = selectedBot.isOnline

    onConfirm(mapping)
  }

  const placement = device === 'desktop' ? 'right' : 'bottom'
  const title = initialMapping ? '编辑推送目标' : '添加推送目标'

  return (
    <Drawer.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} variant="blur">
      <Drawer.Content placement={placement}>
        <Drawer.Dialog className={device === 'desktop' ? 'h-full w-105 max-w-[90vw]' : 'max-h-[78dvh]'}>
          <Drawer.Handle />
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Drawer.Heading>{title}</Drawer.Heading>
            <Description>先选择 Bot，再选择该 Bot 加入的群。</Description>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-4">
            <TargetSelect
              description="Karin 当前已注册且在线的 Bot。"
              disabled={loadingBots}
              items={botOptions}
              label="机器人账号"
              placeholder="选择机器人账号"
              selectedId={selectedBotId}
              onSelect={(id) => {
                setError('')
                setGroups([])
                setLoadingGroups(Boolean(id))
                setSelectedBotId(id)
                setSelectedGroupId('')
              }}
            />

            <TargetSelect
              description={selectedBotId ? '当前 Bot 已加入的群。' : '请先选择机器人账号。'}
              disabled={!selectedBotId || loadingGroups}
              items={groupOptions}
              label="推送群"
              placeholder="选择推送群"
              selectedId={selectedGroupId}
              onSelect={setSelectedGroupId}
            />

            {loadingBots || loadingGroups ? (
              <div className="flex items-center gap-2 text-sm text-muted">
                <Spinner size="sm" aria-label="正在读取列表" />
                <span>正在读取列表</span>
              </div>
            ) : null}

            {selectedBot && selectedGroup ? (
              <div className="flex flex-col gap-2 rounded-lg border border-default-200 bg-default-50/60 p-3">
                <Label>将写入</Label>
                <Description className="mt-1">
                  {selectedGroup.name}({selectedGroup.id}) -&gt; {selectedBot.name}({selectedBot.id})
                </Description>
              </div>
            ) : null}

            {error ? <Description className="text-danger">{error}</Description> : null}
          </Drawer.Body>
          <Drawer.Footer>
            <Button size={device === 'mobile' ? 'sm' : 'md'} slot="close" variant="secondary">
              取消
            </Button>
            <Button size={device === 'mobile' ? 'sm' : 'md'} slot="close" isDisabled={!canConfirm} onPress={confirm}>
              {initialMapping ? '保存' : '添加'}
            </Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  )
}

export default GroupMappingEditorDrawer
