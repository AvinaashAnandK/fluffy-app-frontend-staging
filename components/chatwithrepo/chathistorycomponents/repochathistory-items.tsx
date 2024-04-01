'use client'

import { Chat } from '@/lib/repochattypes'
import { RepoChatHistoryActions } from '@/components/chatwithrepo/chathistorycomponents/repochathistory-actions'
import { RepoChatHistoryItem } from '@/components/chatwithrepo/chathistorycomponents/repochathistory-item'

interface RepoChatHistoryItemsProps {
  chats?: Chat[]
}

export function RepoChatHistoryItems({ chats }: RepoChatHistoryItemsProps) {

  if (!chats?.length) return null

  return (
    <div>
      {chats.map(
        (chat, index) =>
          chat && (
            <div
              key={chat?.id}
            >
              <RepoChatHistoryItem index={index} chat={chat}>
                <RepoChatHistoryActions
                  chat={chat}
                />
              </RepoChatHistoryItem>
            </div>
          )
      )}
    </div>
  )
}
