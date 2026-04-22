import { Icon as IconifyIcon, InlineIcon as IconifyInlineIcon } from '@iconify/react'
import React from 'react'

export const Icon = (props: React.ComponentProps<typeof IconifyIcon>) => <IconifyIcon {...props} ssr />
export const InlineIcon = (props: React.ComponentProps<typeof IconifyInlineIcon>) => <IconifyInlineIcon {...props} ssr />
