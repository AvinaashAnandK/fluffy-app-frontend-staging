//app/playground/[chatid]/repochat/[repoid]/page.tsx
import { RepoChatLayout } from "@/components/chatwithrepo/chatwithrepoRepoChatLayout";
import { type Metadata } from 'next';
import { repoIdExtractor } from '@/lib/utils';

export const runtime = 'edge'

interface RepoChatPageProps {
  params: {
    chatid: string;
    repoid: string;
  };
}

export async function generateMetadata({ params }: RepoChatPageProps): Promise<Metadata> {
  const { repoid } = params;
  let repoUrl: string | undefined;

  if (repoid) {
    repoUrl = repoIdExtractor(repoid);
    const repoName = repoUrl.split("/").pop();
    return {
      title: `Chat with ${repoName}`,
    };
  } else {
    return {
      title: 'Chat',
    };
  }
}

export default function RepoChatPage({ params }: RepoChatPageProps) {
  const { chatid, repoid } = params;
  return (
    <div className="h-full w-full p-2 space-y-2">
      <RepoChatLayout chatId={chatid} repoId={repoid}/>
    </div>
  );
}