import { useEffect, useState } from 'react';
import { RepoChatHistoryItems } from '@/components/chatwithrepo/chathistorycomponents/repochathistory-items';
import { Chat } from '@/lib/repochattypes';
import { fetchAllChats } from '@/lib/chatoperations'; 
import { toast } from 'react-hot-toast'

interface RepoChatHistoryListProps {
  userId?: string
}

export async function RepoChatHistoryList({ userId }: RepoChatHistoryListProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadChats = async () => {
      setLoading(true);
      try {
        const fetchedChats = await fetchAllChats(); 
        setChats(fetchedChats || []); // In case of null, default to an empty array
      } catch (error) {
        console.error("Failed to load chats:", error);
        toast.error('Could not load chat history');
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 px-2">
            <RepoChatHistoryItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </div>
    </div>
  )
}
