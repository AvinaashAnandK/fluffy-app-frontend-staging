"use client";

import React from "react";

import ChatCard from "./chatCard";
import { AccordionPlainContent, AccordionPlainItem, AccordionPlainTrigger } from "@/components/ui/accordianplain";


interface ChatCardProps {
    title: string;
    description: string;
    creatorEmail: string;
    creatorName: string;
    tags: string[];
    section: string;
}

interface ChatSectionProps {
  sectionName: string;
  chats: ChatCardProps[];
  sectionKey: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ sectionName, chats, sectionKey }) => {
  return (
    <AccordionPlainItem value={sectionName}>
      <AccordionPlainTrigger className="hover:text-blue-whisper">
        {sectionName}
      </AccordionPlainTrigger>
      <AccordionPlainContent>
        <div className="grid grid-cols-1 gap-2">
          {chats.map((chat) => (
            <ChatCard
              key={chat.title}
              title={chat.title}
              description={chat.description}
              creatorEmail={chat.creatorEmail}
              creatorName={chat.creatorName}
              tags={chat.tags}
              section={sectionKey}
            />
          ))}
        </div>
      </AccordionPlainContent>
    </AccordionPlainItem>
  );
};

export default ChatSection;
