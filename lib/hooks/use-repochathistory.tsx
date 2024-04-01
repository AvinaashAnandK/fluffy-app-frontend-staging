'use client';

import * as React from 'react';

interface RepoChatHistoryContext {
  isRepoChatHistoryOpen: boolean;
  toggleRepoChatHistory: () => void;
}

const RepoChatHistoryContext = React.createContext<RepoChatHistoryContext | undefined>(undefined);

export function useRepoChatHistory() {
  const context = React.useContext(RepoChatHistoryContext);
  if (!context) {
    throw new Error('useRepoChatHistoryContext must be used within a RepoChatHistoryProvider');
  }
  return context;
}

interface RepoChatHistoryProviderProps {
  children: React.ReactNode;
}

export function RepoChatHistoryProvider({ children }: RepoChatHistoryProviderProps) {
  const [isRepoChatHistoryOpen, setRepoChatHistoryOpen] = React.useState<boolean>(true);


  const toggleRepoChatHistory = () => {
    setRepoChatHistoryOpen((prev) => !prev);
  };


  return (
    <RepoChatHistoryContext.Provider
      value={{ isRepoChatHistoryOpen, toggleRepoChatHistory }}
    >
      {children}
    </RepoChatHistoryContext.Provider>
  );
}
