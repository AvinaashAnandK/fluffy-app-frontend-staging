"use client";

// import { RepoChatHistoryMobile } from './chathistorycomponents/repochathistory-mobile';
// import { ChatHistory } from './chathistorycomponents/chat-history';
// import { RepoChatHistoryToggle } from './chathistorycomponents/repochathistory-toggle';

import RepoListProps from "@/components/chatwithrepo/leftpanelcomponents/repolistprops";

import UserPreferencesChat from "@/components/chatwithrepo/chatwithrepoPreferencesPanel";
import { BsArrowBarLeft, BsArrowBarRight  } from "react-icons/bs";
import { Button } from "@/components/ui/button";

import { RepoChat } from '@/components/chatwithrepo/chatwithrepoChatPanel';

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { repoIdExtractor } from '@/lib/utils';
import { type Message } from 'ai/react'
import { fetchChat } from '@/lib/chatoperations';

export interface ChatProps extends React.ComponentProps<'div'> {
  chatId: string
  repoId?: string
}

export function RepoChatLayout({ chatId, repoId: initialRepoId }: ChatProps) {
  const { userId } = useAuth();
  const [repoId, setRepoId] = useState<string | undefined>(initialRepoId);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [isPreferencesVisible, setIsPreferencesVisible] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchChat(chatId, initialRepoId);
      if (typeof result !== 'string') { 
        setRepoId(result.repoId); 
        setInitialMessages(result.messages); 
      }
    };

    fetchData();
  }, [chatId, initialRepoId]);
  
  
  const togglePreferences = () => {
    setIsPreferencesVisible(!isPreferencesVisible);
  };

  let repoUrl: string | undefined;

  if (repoId) {
    repoUrl = repoIdExtractor(repoId);
  }
  
  return (
    <div className="flex flex-row min-h-full">
      {isPreferencesVisible ? (
        <>
          <div>
            <div className="transition-transform duration-300 transform md:block md:w-72 p-0 mr-2 overflow-y-scroll h-full" style={{ translate: isPreferencesVisible ? "0%" : "-100%" }}>
              {/* Preferences Panel Below */}
              <div className="pr-2">
                <div className="flex flex-row text-lg justify-between p-2">
                  <div className="text-xl font-semibold leading-none tracking-tight pt-1 pl-1">
                    Preferences
                  </div>
                <div>
                  <Button
                    onClick={togglePreferences}
                    size="icon"
                    variant="outline"
                    className="w-6 h-6 border-customco8 pb-0 mb-0"
                  >
                    <BsArrowBarLeft className="w-6 h-6 text-customco8 p-1" />
                  </Button>
                </div>
                </div>
              </div>
              <UserPreferencesChat />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center pl-2 pr-2 ">
          <Button
            onClick={togglePreferences}
            size="icon"
            variant="outline"
            className="w-6 h-6 border-customco8 pb-0 mb-0"
          >
            <BsArrowBarRight className="w-6 h-6 text-customco8 p-1" />
          </Button>
        </div>
      )}

      {/* Center Panel Below */}
      <div className="flex flex-1 flex-col h-full rounded-lg ">
        {/* Top Bar of CP Below */}
        <div className="w-full flex justify-between">
          <div>
            <RepoListProps repoUrl={repoUrl} />
          </div>
          <div>
            {/* <RepoChatHistory/> */}
            {userId ? (
              <>
                {/* <RepoChatHistoryMobile>
                  <ChatHistory userId={userId} />
                </RepoChatHistoryMobile>
                <RepoChatHistoryToggle /> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <RepoChat chatId={chatId} repoId={repoId}/>
        </div>
        {/* Chat Portion Chat Panel Below */}
      </div>
    </div>
  );
};

