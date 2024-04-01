import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chatwithrepo/mainchatpanelcomponents/chat-message'
import SourceBubble from './sources-bubble'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className=''>
      <div className="relative mx-auto max-w-3xl px-6 pt-4 rounded-lg border bg-background">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
            {/* {message.role === 'user' && 
              <SourceBubble message={message} />
            } */}
            {message.role === 'assistant' &&
              <Separator className="my-4 md:my-4 bg-chatlistborder" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}
