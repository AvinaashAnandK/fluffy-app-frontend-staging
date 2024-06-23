"use client";

import { BsArrowBarLeft, BsArrowBarRight  } from "react-icons/bs";
import RepoListProps from "@/components/chatwithrepo/leftpanelcomponents/repolistprops";
import ServiceListProps from "@/components/chatwithrepo/leftpanelcomponents/servicelistprops";
import UserPreferencesChat from "@/components/chatwithrepo/chatwithrepoPreferencesPanel";
import { RepoChat } from '@/components/chatwithrepo/chatwithrepoChatPanel';
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { repoIdExtractor } from '@/lib/utils';
import { useUserPreferences } from '@/hooks/zustand-store-fluffy';
import ChatHistory from "./leftpanelcomponents/chathistory";
import { Chat, Message } from "@/lib/typesserver";
import { fetchChat } from "@/lib/mongodbcalls";

export interface ChatProps extends React.ComponentProps<'div'> {
  chatId: string;
  repoId?: string;
}
interface CacheEntry {
  messages: Message[];
  timestamp: number;
}

export function RepoChatLayout({ chatId, repoId: initialRepoId }: ChatProps) {
  const { userId } = useAuth();
  const [repoId, setRepoId] = useState<string | undefined>(initialRepoId);
  const [previousMessages, setPreviousMessages] = useState<Message[]>([]);
  const { isPreferencesVisible ,setIsPreferencesVisible } = useUserPreferences();
  const cacheRef = useRef<Map<string, CacheEntry>>(new Map());
  const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes
  
  const togglePreferences = () => {
    setIsPreferencesVisible(!isPreferencesVisible);
  };

  let repoUrl: string | undefined;

  if (repoId) {
    repoUrl = repoIdExtractor(repoId);
  }

  useEffect(() => {
    const fetchChatData = async () => {
      if (chatId && repoId) {
        const cacheKey = `${chatId}-${repoId}`;
        const cachedEntry = cacheRef.current.get(cacheKey);
        const now = Date.now();

        if (cachedEntry && now - cachedEntry.timestamp < CACHE_EXPIRATION_TIME) {
          setPreviousMessages(cachedEntry.messages);
          console.log("Using chat data from cache");
        } else {
          try {
            const chat = await fetchChat(chatId, repoId);
            // console.log("Attempting to fetch chat data", chat);
            if (chat) {
              if (chat.userId === userId) {
                cacheRef.current.set(cacheKey, { messages: chat.messages, timestamp: now });
                setPreviousMessages(chat.messages);
                // console.log("Previous messages", chat.messages);
              } else {
                setPreviousMessages([]);
                // console.log("No previous messages");
              }
            } else {
              setPreviousMessages([]);
              // console.log("No chat data found");
            }
          } catch (error) {
            console.error("Error fetching chat:", error);
          }
        }
      }
    };
    fetchChatData();
  }, [chatId, repoId, userId]);

  
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
        <div className="w-auto flex justify-between space-x-2 mb-2">
          <div className="space-x-3">
            <RepoListProps repoUrl={repoUrl} />
            <ServiceListProps />
          </div>
          <div>
          <ChatHistory userId={userId}/>
          </div>
        </div>
        <div>
          <RepoChat chatId={chatId} repoId={repoId} previousMessages={previousMessages} />
        </div>
        {/* Chat Portion Chat Panel Below */}
      </div>
    </div>
  );
};

