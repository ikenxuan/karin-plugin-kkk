import { Bell, Bot, HelpCircle, Link, List, LogIn, RefreshCw, Send, Sparkles } from 'lucide-react'
import React from 'react'

import type { HelpProps, MenuGroup } from '../../../types/help'
import { GlowIcon, SmartGlowBorder } from '../../common/GlowImage'
import { DefaultLayout } from '../../layouts/DefaultLayout'

const ICON_MAP = {
  Link,
  Sparkles,
  Send,
  List,
  Bell,
  LogIn,
  Bot,
  RefreshCw
} as const

function iconForItem(icon?: string) {
  const byIcon = icon && ICON_MAP[icon as keyof typeof ICON_MAP]
  if (byIcon) return byIcon
  return HelpCircle
}

const MenuItemComponent: React.FC<{
  item: { title: string; description: string; icon?: string }
  index: number
}> = ({ item }) => {
  const Icon = iconForItem(item.icon)

  return (
    <SmartGlowBorder
      className="block"
      glowColor="rgb(245,165, 36)"
      glowStrength={1}
      borderWidth={1.5}
      borderRadius="1.5rem"
      glowPosition="left-top"
      lightInfluenceRange={0.3}
    >
      <div className="flex flex-row gap-6 p-8 rounded-3xl backdrop-blur-sm bg-background">
        <div className="flex-shrink-0 pt-1">
          <GlowIcon
            Icon={Icon}
            iconProps={{
              className: 'w-18 h-18 text-warning',
              strokeWidth: 2
            }}
            glowColor="rgb(245, 158, 11)"
            glowStrength={1}
            glowRadius={20}
            glowLayers={4}
            glowSpread={20}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="mb-4 text-4xl font-bold leading-tight text-foreground">{item.title}</h3>
          <p className="text-2xl leading-relaxed whitespace-pre-line text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </SmartGlowBorder>
  )
}

const MenuGroupComponent: React.FC<{
  group: MenuGroup
  startIndex: number
}> = ({ group, startIndex }) => {
  let itemIndex = startIndex

  return (
    <div className="px-10 py-10 rounded-2xl bg-muted/50">
      <div>
        <h2 className="m-0 mb-8 text-[3rem] font-bold text-foreground">{group.title}</h2>

        <div className="grid grid-cols-2 gap-6">
          {group.items.map((item, idx) => (
            <MenuItemComponent key={idx} item={item} index={itemIndex++} />
          ))}
        </div>

        {group.subGroups?.map((sub, i) => (
          <div key={i} className="mt-10">
            <h3 className="m-0 mb-6 text-4xl text-foreground/90">{sub.title}</h3>
            <div className="grid grid-cols-2 gap-6">
              {sub.items.map((item, idx) => (
                <MenuItemComponent key={idx} item={item} index={itemIndex++} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Help: React.FC<Omit<HelpProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const title = props.data?.title || 'KKK插件帮助页面'
  const menuData = props.data?.menu || []

  let globalIndex = 0

  return (
    <DefaultLayout {...props}>
      <div className="h-12" />

      <div className="w-full max-w-[1440px] mx-auto px-8">
        <div className="px-12 py-10 rounded-2xl backdrop-blur-sm">
          <h1 className="mb-2 text-7xl font-bold leading-tight text-foreground">{title}</h1>
          <p className="text-4xl font-medium text-muted-foreground">功能说明与使用指南</p>
        </div>
      </div>

      <div className="h-8" />

      <div className="px-8 mx-auto space-y-8 w-full">
        {menuData.map((group, index) => {
          const startIndex = globalIndex
          globalIndex += group.items.length + (group.subGroups?.reduce((sum, sub) => sum + sub.items.length, 0) || 0)
          return <MenuGroupComponent key={index} group={group} startIndex={startIndex} />
        })}
      </div>
    </DefaultLayout>
  )
})

Help.displayName = 'Help'

export default Help
