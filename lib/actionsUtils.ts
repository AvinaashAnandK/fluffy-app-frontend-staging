import { Message } from "@/lib/typesserver";

function sortMessagesByDate(messages: Message[]): Message[] {
    return messages.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

function generateConversationalHistory(messages: Message[], modifyUserMessage: boolean): string {
    return messages
      .map((msg, index) => {
        const userMessage = modifyUserMessage
          ? msg.userMessage.replace(/### (.*?) ###:/g, '$1 :')
          : msg.userMessage;
        const summary = msg.fluffyThoughts?.detailedSummary
          ? `\nSummary of response by LLM: ${msg.fluffyThoughts.detailedSummary}`
          : "";
        return `Message ${index + 1}:\n${userMessage}${summary}`;
      })
      .join("\n\n");
  }

export function createSourceFetchQuery(
    allMessages: Message[],
    currentMessage: Message
  ): string {
    const messageIndex = allMessages.findIndex(
      (msg) => msg.id === currentMessage.id
    );
    if (messageIndex !== -1) {
      allMessages.splice(messageIndex, 1);
    }
  
    allMessages.push(currentMessage);
  
    const sortedMessages = sortMessagesByDate(allMessages);
  
    const conversationalHistory = generateConversationalHistory(sortedMessages, false);
  
    return `### CONVERSATIONAL HISTORY ###\n${conversationalHistory}`;
  }
  
export function createConversationalHistory(
    allMessages: Message[],
    currentMessage: Message
  ): string | null {
    
    const messageIndex = allMessages.findIndex(
      (msg) => msg.id === currentMessage.id
    );
    if (messageIndex !== -1) {
      allMessages.splice(messageIndex, 1);
    }
  
    allMessages.push(currentMessage);
  
    const sortedMessages = sortMessagesByDate(allMessages);
  
    const conversationalHistory = generateConversationalHistory(sortedMessages, true);
  
    return allMessages.length > 1 ? `### CONVERSATIONAL HISTORY ###\n${conversationalHistory}` : null;
  }