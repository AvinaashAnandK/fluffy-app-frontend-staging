'use client'

import * as React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IconMessage, IconUsers } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { type Chat } from '@/lib/repochattypes'
import { cn } from '@/lib/utils'

interface RepoChatHistoryItemProps {
  index: number
  chat: Chat
  children: React.ReactNode
}

export function RepoChatHistoryItem({ index, chat, children }: RepoChatHistoryItemProps) {
  const pathname = usePathname()
  const isActive = pathname === chat.path

  if (!chat?.id) return null

  return (
    <div className="relative h-8">
    <div className="absolute left-2 top-1 flex size-6 items-center justify-center">
      {chat.sharePath ? (
        <Tooltip delayDuration={1000}>
          <TooltipTrigger tabIndex={-1} className="focus:bg-muted focus:ring-1 focus:ring-ring">
            <IconUsers className="mr-2" />
          </TooltipTrigger>
          <TooltipContent>This is a shared chat.</TooltipContent>
        </Tooltip>
      ) : (
        <IconMessage className="mr-2" />
      )}
    </div>
    <Link
      href={chat.path}
      className={cn(
        'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10',
        isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
      )}
    >
      <div
        className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
        title={chat.title}
      >
        <span className="whitespace-nowrap">{chat.title}</span>
      </div>
    </Link>
    {isActive && <div className="absolute right-2 top-1">{children}</div>}
  </div>
  )
}
