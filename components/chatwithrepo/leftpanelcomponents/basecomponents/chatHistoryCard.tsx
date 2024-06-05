import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatHistoryCardProps {
  title: string;
  description: string;
  creatorEmail: string;
  creatorName: string;
  tags: string;
  section: string;
}

const gradients = [
  { from: 'gradient1left', to: 'gradient1right' },
  { from: 'gradient2left', to: 'gradient2right' },
  { from: 'gradient3left', to: 'gradient3right' },
  { from: 'gradient4left', to: 'gradient4right' },
  { from: 'gradient5left', to: 'gradient5right' },
  { from: 'gradient6left', to: 'gradient6right' },
  { from: 'gradient7left', to: 'gradient7right' },
  { from: 'gradient8left', to: 'gradient8right' },
  { from: 'gradient9left', to: 'gradient9right' },
  { from: 'gradient10left', to: 'gradient10right' },
  { from: 'gradient11left', to: 'gradient11right' },
  { from: 'gradient12left', to: 'gradient12right' },
  { from: 'gradient13left', to: 'gradient13right' },
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  const gradient = gradients[randomIndex];
  return `bg-gradient-to-r from-${gradient.from} to-${gradient.to}`;
};

const getInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0)).join("");
  return initials;
};

const ChatHistoryCard: React.FC<ChatHistoryCardProps> = ({
  title,
  description,
  creatorEmail,
  creatorName,
  tags,
  section
}) => {
  const randomGradient = getRandomGradient();
  const creatorInitials = getInitials(creatorName);
  const creatorOrg = creatorEmail.split("@")[1];
  const capitalizedOrg = creatorOrg.charAt(0).toUpperCase() + creatorOrg.slice(1);

  return (
    <Card className={cn(" text-white pr-4 mr-4 max-w-fit rounded-lg bg-gradient-to-r from-gradient1left to-gradient4right")}>
      <CardHeader className="p-4">
        <CardTitle>
          <div className="text-base pb-0 truncate">{title}</div>
        </CardTitle>
        <CardDescription className="text-gray-400 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0 pb-3">
        {section !== "user" && (
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {creatorInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-xs">
                {section === "community" ? "Fluffy User" : creatorName}
              </span>
              <span className="text-gray-400 text-xs">
                {section === "org" ? capitalizedOrg : creatorOrg}
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-wrap space-x-2 pl-0">
            <span
              className="text-magenta-vividMagenta uppercase"
              style={{ fontSize: "10px" }}
            >
              {tags}
            </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatHistoryCard;