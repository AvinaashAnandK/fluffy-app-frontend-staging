import { RepoChatHistory } from '@/components/chatwithrepo/chathistorycomponents/repochathistory'

import { auth } from '@clerk/nextjs'
import { ChatHistory } from '@/components/chatwithrepo/chathistorycomponents/chat-history'

export async function SidebarDesktop() {
  const {userId} = auth()

  if (!userId) {
    return null
  }

  return (
    <RepoChatHistory className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory userId={userId} />
    </RepoChatHistory>
  )
}
