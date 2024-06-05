// import { type Metadata } from 'next'
// import { notFound } from 'next/navigation'
// import { fetchSharedChat } from '@/lib/chatoperations';
// import { formatDate } from '@/lib/utils'
// import { ChatList } from '@/components/chatwithrepo/mainchatpanelcomponents/chat-list'

// interface SharePageProps {
//     params: {
//       chatid: string;
//       repoid: string;
//     };
//   }

//   export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
//     const { chatid, repoid } = params;
//     const chat = await fetchChat(chatid, repoid);

//     if (typeof chat === 'string'){
//       return {
//         title: 'Chat',
//       };
//     } else {
//       return {
//         title: chat?.title?.slice(0, 50),
//       };
//     }
//   }



// export default async function SharePage({ params }: SharePageProps) {
//   const { chatid, repoid } = params;
//   const chat = await fetchSharedChat(chatid, repoid);

//   if (typeof chat === 'string'){
//     notFound();
//   } 

//   return (
//     <>
//       <div className="flex-1 space-y-6">
//         <div className="px-4 py-6 border-b bg-background md:px-6 md:py-8">
//           <div className="max-w-2xl mx-auto md:px-6">
//             <div className="space-y-1 md:-mx-8">
//               <h1 className="text-2xl font-bold">{chat.title} | {chat.repoUrl} </h1>
//               <div className="text-sm text-muted-foreground">
//                 {formatDate(chat.createdAt)} · {chat.messages.length} messages
//               </div>
//             </div>
//           </div>
//         </div>
//         <ChatList messages={chat.messages} />
//       </div>
//     </>
//   )
// }
