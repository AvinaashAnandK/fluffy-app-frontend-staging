import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ButtonScrollToBottom } from '@/components/chatwithrepo/mainchatpanelcomponents/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/chatwithrepo/chathistorycomponents/chat-share-dialog'

import { PromptFormSingleInput } from '@/components/chatwithrepo/mainchatpanelcomponents/prompt-form-1'
import { PromptFormDoubleInput } from '@/components/chatwithrepo/mainchatpanelcomponents/prompt-form-2'
import { PromptFormTripleInput } from '@/components/chatwithrepo/mainchatpanelcomponents/prompt-form-3'
import { useUserPreferences } from '@/hooks/zustand-store-fluffy'
import { Chat } from '@/lib/repochattypes'




export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  title?: string
  chat?: Chat
  repoId?: string
  chatId: string
}

export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  repoId,
  chatId
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const { chatRepoTasks } = useUserPreferences();

  // Determine which form to render based on chatRepoTasks
  const renderForm = () => {
    if (['explore', ''].includes(chatRepoTasks)) {
      return (
        <div className="px-4 py-2 space-y-4 border shadow-lg bg-background sm:rounded-2xl sm:border md:py-4">
        <PromptFormSingleInput
          onSubmit={async value => {
            await append({ id, content: value, role: 'user' })
          }}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          taskMode={chatRepoTasks}
        />
        </div>
      );
    } else if (['solve', 'debug'].includes(chatRepoTasks)) {
      return (
        <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
        <PromptFormDoubleInput
          onSubmit={async value => {
            await append({ id, content: value, role: 'user' })
          }}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          taskMode={chatRepoTasks}
        />
        </div>
      );
    } else if (chatRepoTasks === 'verify') {
      return (
        <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
        <PromptFormTripleInput
          onSubmit={async value => {
            await append({ id, content: value, role: 'user' })
          }}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          taskMode={chatRepoTasks}
        />
        </div>
      );
    } else {
      return (
        <div className="px-4 py-2 space-y-4 border shadow-lg bg-background sm:rounded-2xl sm:border md:py-4">
        <PromptFormSingleInput
          onSubmit={async value => {
            await append({ id, content: value, role: 'user' })
          }}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          taskMode={chatRepoTasks}
        />
        </div>
      );
    }
  };







  return (
    <div className="sticky inset-x-0 bottom-0 w-full peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex items-center justify-center h-12">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => reload()}>
                  <IconRefresh className="mr-2" />
                  Regenerate response
                </Button>
                {id && title ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShareDialogOpen(true)}
                    >
                      <IconShare className="mr-2" />
                      Share
                    </Button>
                    <ChatShareDialog
                      open={shareDialogOpen}
                      onOpenChange={setShareDialogOpen}
                      onCopy={() => setShareDialogOpen(false)}
                      chatId={chatId}
                      repoId={repoId}
                    />
                  </>
                ) : null}
              </div>
            )
          )}
        </div>      
          {renderForm()}
      </div>
    </div>
  )
}
