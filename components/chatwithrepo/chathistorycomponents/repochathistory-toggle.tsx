'use client'

import * as React from 'react'

import { useRepoChatHistory } from '@/lib/hooks/use-repochathistory'
import { Button } from '@/components/ui/button'
import { RiChatHistoryLine } from "react-icons/ri";

export function RepoChatHistoryToggle() {
  const { toggleRepoChatHistory } = useRepoChatHistory()

  return (
    <Button className="hidden w-36 p-0 -mr-2 lg:flex" variant="outline" onClick={() => {toggleRepoChatHistory()}}>
    <RiChatHistoryLine className="w-5 h-5 mr-2"/>
    Chat History
    </Button>
  )
}