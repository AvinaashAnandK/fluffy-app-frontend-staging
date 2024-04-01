'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chatwithrepo/mainchatpanelcomponents/chat-list'
import { ChatPanel } from '@/components/chatwithrepo/mainchatpanelcomponents/chat-panel'
import { ChatScrollAnchor } from '@/components/chatwithrepo/mainchatpanelcomponents/chat-scroll-anchor'
import { toast } from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import EmptyChatListPostRepo from '@/components/chatwithrepo/mainchatpanelcomponents/emptychatlist'
import EmptyChatListPreRepoSelection from '@/components/chatwithrepo/mainchatpanelcomponents/emptychatlistprerepo'


export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  chatId: string
  repoId?: string
}

export function RepoChat({ chatId, repoId, initialMessages, className }: ChatProps) {
  const path = usePathname()
  const id = chatId;

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        chatId,
        repoId,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        if (!path.includes('repochat')) {
          window.history.pushState({}, '', `${chatId}/repochat/${repoId}`)
        }
      }
    })


  const isEmptyRepoId = typeof repoId === 'undefined';

  return (
    <div className="relative mx-28 px-4">
      <ChatScrollAnchor trackVisibility={isLoading} />
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {isEmptyRepoId ? (
                  <EmptyChatListPreRepoSelection />
                ) : messages.length ? (
                      <ChatList messages={messages} />
                    ) : (
                      <EmptyChatListPostRepo />
        )}
      </div>
    
      {!isEmptyRepoId && (
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
          repoId={repoId}
          chatId={chatId}
        />
      )}
    </div>
  )
}
