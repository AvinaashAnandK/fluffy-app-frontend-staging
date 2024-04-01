"use client";

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { useAddRepoModal } from "@/hooks/zustand-store-fluffy";

export function AddARepoCard() {
  const { onOpen } = useAddRepoModal();
    return (
        <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-cyan-200">Add Repo</CardTitle>
          <CardDescription className="text-base pt-2 text-slate-100">
            Hook up any public code repo to get cozy with it
          </CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center gap-4">
          <Avatar className="flex justify-center items-center h-16 w-16 rounded-none">
            <AvatarImage src="/addrepo.png" className="" />
          </Avatar>
          {/* <div className="flex flex-col space-y-1.5 w-full">
            <Input placeholder="Paste GitHub repository URL" />
          </div> */}
        </CardContent>
        <CardFooter>
          <Button className="w-full text-md" variant="plainpurple" onClick={onOpen}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add a repo
          </Button>
        </CardFooter>
      </Card>
    )
  }

function PlusIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }