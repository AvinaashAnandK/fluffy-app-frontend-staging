import BreadCrumb from "@/components/globalComponents/bread-crumb";
import ModelPlayground from "@/components/model-playground";
import RepoListCard from "@/components/pageRepoPlayground/pageRepoList/repo-list-card";

import { type Metadata } from 'next'
import {RepoChatLayout} from "@/components/chatwithrepo/chatwithrepoRepoChatLayout";

export const runtime = 'edge'

interface RepoChatPageProps {
  params: {
    chatid: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
    return {
      title: 'New Chat',
    };
}

export default function RepoChatPage({ params }: RepoChatPageProps) {
  const { chatid } = params;

  return (
    <div className="h-full w-full p-2 space-y-2">
      <RepoChatLayout chatId={chatid}/>
    </div>
  );
}