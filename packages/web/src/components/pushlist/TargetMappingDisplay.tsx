import { Avatar, Description, Label } from '@heroui/react'
import { ArrowRight } from 'lucide-react'

import type { PushTargetMapping } from './types'

interface TargetMappingDisplayProps {
  mapping: PushTargetMapping
  compact?: boolean
  stacked?: boolean
}

const TargetMappingDisplay = ({ mapping, compact = false, stacked = false }: TargetMappingDisplayProps) =>
  stacked ? (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar size="sm">
          <Avatar.Image alt={mapping.groupName || mapping.groupId} src={mapping.groupAvatar} />
          <Avatar.Fallback>{(mapping.groupName || mapping.groupId).slice(0, 1)}</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0">
          <Label className="block truncate">{mapping.groupName || mapping.groupId}</Label>
          <Description className="block truncate">{mapping.groupId}</Description>
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-8">
        <ArrowRight className="size-4 shrink-0 text-muted" />
        <Avatar size="sm">
          <Avatar.Image alt={mapping.botName || mapping.botId} src={mapping.botAvatar} />
          <Avatar.Fallback>{(mapping.botName || mapping.botId).slice(0, 1)}</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0">
          <Label className="block truncate">{mapping.botName || mapping.botId}</Label>
          <Description className="block truncate">{compact ? mapping.botId : `Bot ${mapping.botId}`}</Description>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-w-0 items-center gap-2">
      <Avatar size="sm">
        <Avatar.Image alt={mapping.groupName || mapping.groupId} src={mapping.groupAvatar} />
        <Avatar.Fallback>{(mapping.groupName || mapping.groupId).slice(0, 1)}</Avatar.Fallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <Label className="block truncate">{mapping.groupName || mapping.groupId}</Label>
        <Description className="block truncate">{mapping.groupId}</Description>
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted" />
      <Avatar size="sm">
        <Avatar.Image alt={mapping.botName || mapping.botId} src={mapping.botAvatar} />
        <Avatar.Fallback>{(mapping.botName || mapping.botId).slice(0, 1)}</Avatar.Fallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <Label className="block truncate">{mapping.botName || mapping.botId}</Label>
        <Description className="block truncate">{compact ? mapping.botId : `Bot ${mapping.botId}`}</Description>
      </div>
    </div>
  )

export default TargetMappingDisplay
