'use client'

import * as React from 'react'

import { useRepoChatHistory } from '@/lib/hooks/use-repochathistory'
import { cn } from '@/lib/utils'

export interface RepoChatHistoryProps extends React.ComponentProps<'div'> {}

export function RepoChatHistory({ className, children }: RepoChatHistoryProps) {
  const { isRepoChatHistoryOpen } = useRepoChatHistory()

  return (
    <div
      data-state={isRepoChatHistoryOpen ? 'open' : 'closed'}
      className={cn(className, 'h-full flex-col dark:bg-zinc-950')}
    >
      {children}
    </div>
  )
}
