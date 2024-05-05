import BreadCrumb from "@/components/globalComponents/bread-crumb";
import ModelPlayground from "@/components/model-playground";
import RepoListCard from "@/components/pageRepoPlayground/pageRepoList/repo-list-card";

import {RepoChatLayout} from "@/components/chatwithrepo/chatwithrepoRepoChatLayout";
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { fetchChat } from "@/lib/chatoperations";

export const runtime = 'edge'

interface RepoChatPageProps {
  params: {
    chatid: string;
    repoid: string;
  };
}

export async function generateMetadata({ params }: RepoChatPageProps): Promise<Metadata> {
  const { chatid, repoid } = params;
  const chat = await fetchChat(chatid, repoid)
  if (typeof chat === 'string'){
    return {
      title: 'Chat',
    };
  } else {
    return {
      title: chat?.title?.slice(0, 50),
    };
  }
}

export default function RepoChatPage({ params }: RepoChatPageProps) {
  const { chatid, repoid } = params;

  return (
    <div className="h-full w-full p-2 space-y-2">
      <RepoChatLayout chatId={chatid} repoId={repoid} />
    </div>
  );
}