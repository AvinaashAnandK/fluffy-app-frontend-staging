// [TO-DO] 
"use client";
import * as React from 'react'

import { type Chat } from '@/lib/repochattypes'
import { Button } from '@/components/ui/button'
import { IconShare} from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/chatwithrepo/chathistorycomponents/chat-share-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface RepoChatHistoryProps {
  chat: Chat
}

export function RepoChatHistoryActions({
  chat
}: RepoChatHistoryProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  return (
    <>
      <div className="space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="size-6 p-0 hover:bg-background"
              onClick={() => setShareDialogOpen(true)}
            >
              <IconShare />
              <span className="sr-only">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share chat</TooltipContent>
        </Tooltip>
      </div>
      <ChatShareDialog
        chatId={chat.chatId}
        repoId={chat.repoId}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopy={() => setShareDialogOpen(false)}
      />
    </>
  )
}
