// "use client";

// // import { RepoChatHistoryMobile } from './chathistorycomponents/repochathistory-mobile';
// // import { ChatHistory } from './chathistorycomponents/chat-history';
// // import { RepoChatHistoryToggle } from './chathistorycomponents/repochathistory-toggle';

// import { BsArrowBarLeft, BsArrowBarRight  } from "react-icons/bs";

// import RepoListProps from "@/components/chatwithrepo/leftpanelcomponents/repolistprops";
// import ServiceListProps from "@/components/chatwithrepo/leftpanelcomponents/servicelistprops";
// import UserPreferencesChat from "@/components/chatwithrepo/chatwithrepoPreferencesPanel";
// import { RepoChat } from '@/components/chatwithrepo/chatwithrepoChatPanel';
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { repoIdExtractor } from '@/lib/utils';
// import { type Message } from 'ai/react'

// import { fetchChat } from '@/lib/chatoperations';

// import { useUserPreferences } from '@/hooks/zustand-store-fluffy';
// import ChatHistory from "../chatwithrepo/leftpanelcomponents/chathistory";

// export interface ChatProps extends React.ComponentProps<'div'> {
//   chatId: string
//   repoId?: string
// }

// export function ShareChatLayout({ chatId, repoId: initialRepoId }: ChatProps) {
//   const { userId } = useAuth();
//   const [repoId, setRepoId] = useState<string | undefined>(initialRepoId);
//   const [initialMessages, setInitialMessages] = useState<Message[]>([]);
//   const { isPreferencesVisible ,setIsPreferencesVisible } = useUserPreferences();
  
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetchChat(chatId, initialRepoId);
//       if (typeof result !== 'string') { 
//         setRepoId(result.repoId); 
//         setInitialMessages(result.messages); 
//       }
//     };

//     fetchData();
//   }, [chatId, initialRepoId]);
  
  
//   const togglePreferences = () => {
//     setIsPreferencesVisible(!isPreferencesVisible);
//   };

//   let repoUrl: string | undefined;

//   if (repoId) {
//     repoUrl = repoIdExtractor(repoId);
//   }
  
//   return (
//     <div className="flex flex-row min-h-full">
//       <div className="flex flex-1 flex-col h-full rounded-lg ">
//         {/* Top Bar of CP Below */}
//         <div className="w-full flex justify-between space-x-2 mb-2">
//           <div className="space-x-3">
//           </div>
//           <div>
//           </div>
//         </div>
//         <div>
//           <RepoChat chatId={chatId} repoId={repoId} />
//         </div>
//       </div>
//     </div>
//   );
// };

