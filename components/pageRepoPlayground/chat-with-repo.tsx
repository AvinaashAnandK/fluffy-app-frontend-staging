"use client";

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation"
import { chatIdGenerator } from "@/lib/utils";

export function ChatWithRepo() {
  const router = useRouter();

  const onNavigate = () => {
    const chatId = chatIdGenerator()
    const destinationUrl = `playground/${chatId}/repochat/`;
    return router.push(destinationUrl);
  }
    return (
        <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-cyan-200">Talk to Repo</CardTitle>
          <CardDescription className="text-base pt-2 text-slate-100">
          Because sometimes, they want to talk back
          </CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center gap-4">
          <Avatar className="flex justify-center items-center h-16 w-16 rounded-none">
            <AvatarImage src="/repochat.png" className="" />
          </Avatar>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-md" variant="plainpurple" onClick={() => onNavigate()}>
          <CodeSquare className="h-4 w-4 mr-10" />
          {"Let's Chat"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  function CodeSquare(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 mr-2" // Added class name from original SVG
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m10 10-2 2 2 2" />
        <path d="m14 14 2-2-2-2" />
      </svg>
    );
  }
  

