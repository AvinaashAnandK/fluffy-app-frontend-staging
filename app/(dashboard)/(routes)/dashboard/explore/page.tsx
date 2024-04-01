'use client'
 
import { useState } from 'react';
import { useUIState, useActions } from "ai/rsc";
import type { AI } from '@/app/action';
 
export default function Page() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
 
  return (
    <div>
      {
        // View messages in UI state
        messages.map((message:any) => (
          <div key={message.id}>
            {message.display}
          </div>
        ))
      }
 
      <form onSubmit={async (e) => {
        e.preventDefault();
 
        // Add user message to UI state
        setMessages((currentMessages:any) => [
          ...currentMessages,
          {
            id: Date.now(),
            display: <div>{inputValue}</div>,
          },
        ]);
 
        // Submit and get response message
        const responseMessage = await submitUserMessage(inputValue);
        setMessages((currentMessages:any) => [
          ...currentMessages,
          responseMessage,
        ]);
 
        setInputValue('');
      }}>
        <input
          placeholder="Send a message..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
        />
      </form>
    </div>
  )
}





// import { Categories } from "@/components/pageExploreRepos/categories";
// import ExploreList from "@/components/pageExploreRepos/explore-list";
// import ExploreSearchInput from "@/components/pageExploreRepos/explore-search-input";
// import prismadb from "@/lib/prismadb";

// interface ExplorePageProps {
//   searchParams: {
//     categoryId: string;
//     name: string;
//   }
// }

// // const DashboardPage = async ({
// //   searchParams
// // }: ExplorePageProps) => {
// //   const { categoryId, name } = searchParams; 
// //   const categories = await prismadb.category.findMany();
// //   return (
// //     <div className="h-full p-4 space-y-2">
// //       <ExploreSearchInput />
// //       <Categories data={categories} />
// //       <ExploreList categoryId={categoryId} name={name} /> 
// //     </div>
// //   );
// // }

// const DashboardPage = async () => {
//   return (
//     <div className="h-full p-4 space-y-2">
//         Building explore page!
//     </div>
//   );
// }


// export default DashboardPage;