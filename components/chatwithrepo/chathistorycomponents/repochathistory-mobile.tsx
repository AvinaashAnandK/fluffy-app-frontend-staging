'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { RepoChatHistory } from '@/components/chatwithrepo/chathistorycomponents/repochathistory'
import { Button } from '@/components/ui/button'

import { RiChatHistoryLine } from "react-icons/ri";

interface RepoChatHistoryMobileProps {
  children: React.ReactNode
}

export function RepoChatHistoryMobile({ children }: RepoChatHistoryMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 flex size-9 p-0 lg:hidden">
          <RiChatHistoryLine className="size-6" />
          <span className="sr-only">Toggle Chat History</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
        <RepoChatHistory className="flex">{children}</RepoChatHistory>
      </SheetContent>
    </Sheet>
  )
}
