import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PiClockCounterClockwiseLight } from "react-icons/pi";
import SkeletonChatHistoryCard from "./basecomponents/skeletonChatHistoryCard";
import ChatHistoryCard from "./basecomponents/chatHistoryCard";
import { Chat } from "@/lib/typesserver";
import { useRouter } from "next/navigation";

interface ChatHistoryProps {
  userId?: string | null;
}

const CACHE_EXPIRATION_TIME = 10 * 60 * 1000; // 5 minutes

const ChatHistory = ({ userId }: ChatHistoryProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();
  const cacheRef = useRef<{ data: Chat[]; timestamp: number } | null>(null);

  const onGoToChat = (chatId: string, repoId: string) => {
    const destinationUrl = `/playground/${chatId}/repochat/${repoId}`
    router.push(destinationUrl)
  };

  const fetchChats = async () => {
    if (typeof userId === "string") {
      const now = Date.now();

      if (
        cacheRef.current &&
        now - cacheRef.current.timestamp < CACHE_EXPIRATION_TIME
      ) {
        setChats(cacheRef.current.data);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/dboperations/chatHistory/fetchUserChats?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("data", data.length);
        setChats(data);
        cacheRef.current = { data, timestamp: now };
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    fetchChats();
  };

  const renderContent = () => {
    if (userId === null || userId === undefined) {
      return (
        <div className="mt-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Please login to see chat history.</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="mt-4">
          <SkeletonChatHistoryCard />
        </div>
      );
    }

    return chats.length > 0 ? (
      <div className="mt-4 space-y-4">
        {chats.map((chat) => (
          <div key={chat.id} onClick={() => onGoToChat(chat.chatId,chat.repoId)} >
          <ChatHistoryCard
            key={chat.id}
            title={chat.title}
            description={chat.description}
            creatorEmail={chat.userEmail}
            creatorName={chat.userName}
            tags={chat.repoName}
            section={chat.service}
          />
          </div>
        ))}
      </div>
    ) : (
      <div className="mt-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No chat history available.</p>
      </div>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="flex-1 flex-item justify-between rounded-lg md:max-w-[300px] lg:max-w-[400px]"
          onClick={handleButtonClick}
        >
          <span>Chat History</span>
          <PiClockCounterClockwiseLight className="ml-2 h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-md" side="right">
        <SheetHeader>
          <SheetTitle>Chat History</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-screen">
          {isButtonClicked ? (
            renderContent()
          ) : (
            <p>Click the button to load chat history.</p>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ChatHistory;
