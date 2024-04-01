import { Chat } from "@/lib/repochattypes";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
 
async function deleteAllChats(): Promise<string> {
    try {
      const deleteAllChatsAPIurl = `${baseUrl}/api/dbcalls/chat/clearchats`;
      const response = await fetch(deleteAllChatsAPIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        return "success";
      } else if (response.status === 401) {
        return "error";
      } else {
        console.error(`Failed to clear chats, status code: ${response.status}`);
        return "error";
      }
    } catch (error) {
      console.error('Error clearing chats:', error);
      return "error";
    }
  }

async function deleteChat(chatId: string, repoId: string): Promise<string> {
    try {
      const deleteChatAPIurl = `${baseUrl}/api/dbcalls/chat/removechat`;
      const response = await fetch(deleteChatAPIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId, repoId }),
      });
  
      if (response.status === 200) {
        return "success";
      } else {
        console.error(`Failed to clear chats, status code: ${response.status}`);
        return "error";
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      return "Failure";
    }
  }

async function fetchAllChats(): Promise<Chat[] | null> {
    try {
      const fetchAllChatsAPIurl = `${baseUrl}/api/dbcalls/chat/getchats`;
      const response = await fetch(fetchAllChatsAPIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch chats, status code: ${response.status}`);
        return null; 
      }
  
      const chats: Chat[] = await response.json(); // Assuming Chat is a defined type
      return chats;
    } catch (error) {
      console.error('Error fetching chats:', error);
      return null; 
    }
  }

async function fetchChat(chatId: string, repoId?: string): Promise<Chat | string> {
    try {
      const requestBody = repoId ? { chatId, repoId } : { chatId };
      const fetchChatAPIurl = `${baseUrl}/api/dbcalls/chat/getchat`;
      const response = await fetch(fetchChatAPIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.status === 200) {
        const chat: Chat = await response.json();
        return chat;
      } else if (response.status === 401) {
        return "unauthorized";
      } else if (response.status === 404) {
        return "not found";
      } else {
            console.error(`Failed to clear chats, status code: ${response.status}`);
            return "error";
    }
  
    } catch (error) {
      console.error('Error fetching chat:', error);
      return "error";
    }
  }
  
async function shareChat(chatId: string, repoId: string): Promise<Chat | string> {
    try {
      const shareChatAPIurl = `${baseUrl}/api/dbcalls/chat/sharechat`;
      const response = await fetch(shareChatAPIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId, repoId }),
      });
  
      if (response.status === 200) {
        const chat: Chat = await response.json();
        return chat;
      } else if (response.status === 404) {
        return "not found";
      } else {
        console.error(`Failed to share chat, status code: ${response.status}`);
        return "error";
      }
    } catch (error) {
      console.error('Error sharing chat:', error);
      return "error"; // Indicate an error occurred during the sharing process
    }
  }

async function fetchSharedChat(chatId: string, repoId: string): Promise<Chat | string> {
    try {
      const fetchSharedChatAPIurl = `${baseUrl}/api/dbcalls/chat/getsharedchat`;
      const response = await fetch(fetchSharedChatAPIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId, repoId }),
      });
  
      if (response.status === 200) {
        const chat: Chat = await response.json();
        return chat;
      } else if (response.status === 404) {
        return "not found";
      } else {
        console.error(`Failed to clear chats, status code: ${response.status}`);
        return "error";
      }
  

    } catch (error) {
      console.error('Error fetching shared chat:', error);
      return "error";
    }
  }


export { fetchChat, deleteAllChats, fetchAllChats, fetchSharedChat, deleteChat, shareChat };