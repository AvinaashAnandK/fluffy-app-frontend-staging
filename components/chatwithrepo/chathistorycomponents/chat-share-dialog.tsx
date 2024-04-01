
//[TO-DO] Add repo name & url in the share dialog. 
//[TO-DO] Rejig the configuration such that the respective helper functions from chatoperations are called and the errors are gracefully handled.

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'

import { type Chat } from '@/lib/repochattypes'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { fetchChat, shareChat } from '@/lib/chatoperations'

interface ChatShareDialogProps extends DialogProps {
  chatId: string
  repoId?: string
  onCopy: () => void
}

export function ChatShareDialog({
  chatId,
  repoId,
  onCopy,
  ...props
}: ChatShareDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, startShareTransition] = React.useTransition()
  const [chat, setChat] = React.useState<Chat>();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetchChat(chatId, repoId);

      if (typeof result !== 'string') { 
        setChat(result);  
      }
    };

    fetchData();
  }, [chatId, repoId]);

  const copyShareLink = React.useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        return toast.error('Could not copy share link to clipboard')
      }

      const url = new URL(window.location.href)
      url.pathname = chat.sharePath
      copyToClipboard(url.toString())
      onCopy()
      toast.success('Share link copied to clipboard', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    },
    [copyToClipboard, onCopy]
  )
  

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link to chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the shared chat.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">{chat?.title}</div>
          <div className="text-muted-foreground">
            {chat?.messages.length} messages
          </div>
          <div className="text-muted-foreground">Repo Url: {chat?.repoUrl}</div> 
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending}
            onClick={() => {
              if (!chat || !chat.chatId) {
                // If chat, chatId, or repoId is undefined, display an error message
                toast.error('Chat or Chat Id is missing.');
                return;
              }
              // @ts-ignore
              startShareTransition(async () => {
                try {
                  // Assume shareChat function is properly defined and imported
                  const result = await shareChat(chat.chatId, chat?.repoId);
                  if (typeof result !== 'string') {
                    copyShareLink(result);
                  } else {
                    toast.error(`Failed to share chat: ${result}`);
                  }
                } catch (error) {
                  console.error('Error sharing chat:', error);
                  toast.error('An error occurred while sharing the chat.');
                }
              });
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>Copy link</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
