"use client";
import { AddARepoCard } from "@/components/pageRepoPlayground/add-a-repo";
import { ChatWithRepo } from "@/components/pageRepoPlayground/chat-with-repo";
import { ViewRepoList } from "@/components/pageRepoPlayground/view-all-repo";

export default function RepoListPage () {
  return (
    <div className="h-full p-2 space-y-2">
      <div className="flex overflow-hidden w-full">
        <div className="w-full flex justify-center items-start p-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <AddARepoCard />
            <ViewRepoList />
            <ChatWithRepo />
          </div>
        </div>
      </div>
    </div>
  )
};
 