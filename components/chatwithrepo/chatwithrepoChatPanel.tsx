'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { useActions, readStreamableValue } from 'ai/rsc';
import { type AI } from '@/app/action';
import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { useLoadedRepo, useUserPreferences } from '@/hooks/zustand-store-fluffy';
import { GenerationStates, RetrievalResults, Message, StreamMessage, FluffyThoughts, UserPreferences, Chat } from '@/lib/typesserver';
import { CHAT_REPO_TASKS } from '@/constants'

// Custom components 
import SearchResultsComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/SearchResultsComponent';
import UserMessageComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/UserMessageComponent';
import LLMResponseComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/LLMResponseComponent';
import EmptyChatListPreRepoSelection from './mainchatpanelcomponents/emptychatpanel/emptychatlistprerepo';
import EmptyChatListPostRepo from './mainchatpanelcomponents/emptychatpanel/emptychatlist';
import FluffyThoughtsComponent from './mainchatpanelcomponents/answer/FluffyThoughtsComponent';

import { ChatPanelHandler } from './mainchatpanelcomponents/form/prompt-form-handler';
import { usePathname } from 'next/navigation';

import VideosComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/VideosComponent';
import FollowUpComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/FollowUpComponent';
import { title } from 'process';
import { link } from 'fs';
import ReachOutComponent from './mainchatpanelcomponents/answer/ReachOutComponent';

export interface ChatProps extends React.ComponentProps<'div'> {
  previousMessages: Message[]
  chatId: string
  repoId?: string
}

export function RepoChat({ chatId, repoId, previousMessages, className }: ChatProps) {
  const path = usePathname()
  console.log("Messages from Repo Chat", previousMessages)
  const { setIsPreferencesVisible } = useUserPreferences();

  const isEmptyRepoId = typeof repoId === 'undefined';

  // 3. Set up action that will be used to stream all the messages
  const { myAction } = useActions<typeof AI>();

  // 4. Set up form submission handling
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 5. Set up state for the messages
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (previousMessages.length > 0) {
      setMessages(previousMessages);
    }
  }, [previousMessages])

  // 6. Set up state for the CURRENT LLM response (for displaying in the UI while streaming)
  const [currentLlmResponse, setCurrentLlmResponse] = useState('');

  // 7. Set up handler for when the user clicks on the follow up button
  const handleFollowUpClick = useCallback(async (question: string) => {
    setCurrentLlmResponse('');
    await handleUserMessageSubmission(question, question);
  }, []);

  // 8. For the form submission, we need to set up a handler that will be called when the user submits the form
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (
          e.target &&
          ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    handleFormSubmit(e); 
  
    setCurrentLlmResponse('');
    if (window.innerWidth < 600) {
      (e.target as HTMLFormElement)['message']?.blur();  
    }
    const value = inputValue.trim();  
    setInputValue('');  
    if (!value) return;  
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { chatRepoTasks } = useUserPreferences.getState();
    const task = CHAT_REPO_TASKS.find(task => task.key === chatRepoTasks);
    let finalMessage = '';
    let finalRawMessage = '';

    if (['explore', ''].includes(chatRepoTasks)) {
      const message1 = inputValue.trim();
      
      if (!message1) return;

      const promptAugment1 = task?.promptAugment1;
      const visblePromptAugment1 = task?.visblePromptAugment1;
      
      finalMessage = `${promptAugment1}: \n ${message1}`;
      finalRawMessage = `${visblePromptAugment1}: ${message1}`;
      
    } else if (['solve', 'debug'].includes(chatRepoTasks)) {
      const message1 = inputValue.trim();
      const message2 = inputValue2.trim();
      if (!message1 || !message2) return;

      const promptAugment1 = task?.promptAugment1;
      const promptAugment2 = task?.promptAugment2;
      const visblePromptAugment1 = task?.visblePromptAugment1;
      const visblePromptAugment2 = task?.visblePromptAugment2;
      
      finalMessage = `${promptAugment1}: \n ${message1} \n ${promptAugment2}: \n ${message2}`;
      finalRawMessage = `${visblePromptAugment1} ${message1} ${visblePromptAugment2} ${message2}`;
      
    } else if (chatRepoTasks === 'verify') {
      const message1 = inputValue.trim();
      const message2 = inputValue2.trim();
      const message3 = inputValue3.trim();
      if (!message1 || !message2 || !message3) return;

      const promptAugment1 = task?.promptAugment1;
      const promptAugment2 = task?.promptAugment2;
      const promptAugment3 = task?.promptAugment3;
      const visblePromptAugment1 = task?.visblePromptAugment1;
      const visblePromptAugment2 = task?.visblePromptAugment2;
      const visblePromptAugment3 = task?.visblePromptAugment3;
      
      finalMessage = `${promptAugment1}: \n ${message1} \n ${promptAugment2}: \n ${message2} \n ${promptAugment3}: \n ${message3}`;
      finalRawMessage = `${visblePromptAugment1} ${message1} ${visblePromptAugment2} ${message2} ${visblePromptAugment3} ${message3}`;

    } else {
      const message1 = inputValue.trim();
      
      if (!message1) return;

      const promptAugment1 = task?.promptAugment1;
      const visblePromptAugment1 = task?.visblePromptAugment1;
      
      finalMessage = `${promptAugment1}: \n ${message1}`;
      finalRawMessage = `${visblePromptAugment1}: ${message1}`;
    }
    
    if (!finalRawMessage) return;

    setIsSubmitting(true);
    setIsPreferencesVisible(false);
    setInputValue('');
    setInputValue2('');
    setInputValue3('');
    await handleSubmit(finalMessage, finalRawMessage);
    setIsSubmitting(false);
  };

  const handleSubmit = async (message: string, rawMessage: string) => {
    if (!rawMessage) return;
    if (!message) return;
    await handleUserMessageSubmission(message, rawMessage);
  };

  const handleUserMessageSubmission = async (userMessage: string, rawMessage: string): Promise<void> => {
    console.log('handleUserMessageSubmission', userMessage);

    const { repoUrl, repoFullName, repoOrgName, repoName, serviceKey } = useLoadedRepo.getState();
    const loadedRepo = { repoUrl, repoFullName, repoOrgName, repoName, serviceKey, repoId, chatId };
    // console.log('loadedRepo', loadedRepo);
    
    const newMessageId = Date.now();
    
    const newMessage = {
      id: newMessageId,
      tags: [],
      title: `New Chat with ${repoFullName}`,
      createdAt: new Date(),
      shortSummary: '',
      detailedSummary: '',
      userMessage: userMessage,
      type: 'userMessage',
      sources: {} as RetrievalResults,
      content: '',
      isStreaming: true,
      fluffyThoughts: {} as FluffyThoughts,
      fluffyStatus: {} as GenerationStates,
      linkedUserChats: [],
      linkedOrgChats: [],
      linkedCommunityChats: [],
      webSources: [],
      contextUsed: '',
      instructionUsed: '',
    };
  
    const { chatRepoTasks, knowRepoOptions, coderOptions, fluffyResponseOptions, languagesOptions } = useUserPreferences.getState();
    const userPreferences: UserPreferences = { chatRepoTasks, knowRepoOptions, coderOptions, fluffyResponseOptions, languagesOptions }
    // console.log('userPreferences', userPreferences);

    setMessages(prevMessages => [...prevMessages, newMessage]);

    let lastAppendedResponse = "";
    try {
      const streamableValue = await myAction(userMessage, rawMessage, messages, loadedRepo, userPreferences,newMessage);
      let llmResponseString = "";
      for await (const message of readStreamableValue(streamableValue)) {
        const typedMessage = message as StreamMessage;
        setMessages((prevMessages) => {
          const messagesCopy = [...prevMessages];
          const messageIndex = messagesCopy.findIndex(msg => msg.id === newMessageId);
          if (messageIndex !== -1) {
            const currentMessage = messagesCopy[messageIndex];
            if (typedMessage.llmResponse && typedMessage.llmResponse !== lastAppendedResponse) {
              currentMessage.content += typedMessage.llmResponse;
              lastAppendedResponse = typedMessage.llmResponse; // Update last appended response
            }
            if (typedMessage.llmResponseEnd) {
              currentMessage.isStreaming = false;
            }
            if (typedMessage.sources) {
              currentMessage.sources = typedMessage.sources;
            }
            if (typedMessage.tags) {
              currentMessage.tags = typedMessage.tags;
            }
            if (typedMessage.fluffyThoughts) {
              currentMessage.fluffyThoughts = typedMessage.fluffyThoughts;
            }
            if (typedMessage.fluffyStatus) {
              currentMessage.fluffyStatus = typedMessage.fluffyStatus;
            }
            if (typedMessage.linkedUserChats) {
              currentMessage.linkedUserChats = typedMessage.linkedUserChats;
            }
            if (typedMessage.linkedOrgChats) {
              currentMessage.linkedOrgChats = typedMessage.linkedOrgChats;
            }
            if (typedMessage.linkedCommunityChats) {
              currentMessage.linkedCommunityChats = typedMessage.linkedCommunityChats;
            }
            if (typedMessage.webSources) {
              currentMessage.webSources = typedMessage.webSources;
            }
          }
          return messagesCopy;
        });
        if (typedMessage.llmResponse) {
          llmResponseString += typedMessage.llmResponse;
          setCurrentLlmResponse(llmResponseString);
        }
      }
    } catch (error) {
      console.error("Error streaming data for user message:", error);
    }
  };

  return (
    <div>
      {isEmptyRepoId ? (
                        <EmptyChatListPreRepoSelection />
                      ) : messages.length > 0 ? (
                        <div className="flex flex-col">
                        {messages.map((message, index) => (
                          <div key={`message-${index}`} className="flex flex-col md:flex-row">
                            <div className="w-3/4 pr-2">
                            {message.type === 'userMessage' && <UserMessageComponent message={message.userMessage} tags={message.tags} />}
                              {message.fluffyStatus.sourcesNeeded == 'Yes' && ( message.sources) && (
                                <SearchResultsComponent key={`sources-${index}`} searchResults={message.sources} />
                              )}
                              <LLMResponseComponent
                                llmResponse={message.content}
                                currentLlmResponse={currentLlmResponse}
                                index={index}
                                key={`llm-response-${index}`}
                              />
                              <div className="flex flex-col">
                              {message.fluffyThoughts?.followUp && <FollowUpComponent followUp={message.fluffyThoughts?.followUp} handleFollowUpClick={handleFollowUpClick}/> }
                              </div>
                              {/* {false && (
                                <div className="flex flex-col">
                                  <FollowUpComponent key={`followUp-${index}`} followUp={message.followUp} handleFollowUpClick={handleFollowUpClick} />
                                </div>
                              )} */}
                            </div>
                            <div className="w-1/4 pl-2">
                              {/* {message.userMessage && <VideosComponent key={`videos-${index}`} videos={message.videos} />} */}
                              {(message.fluffyStatus.fluffyThoughtsNeeded=='Yes') && <FluffyThoughtsComponent key={`fluffy-thoughts-${index}`} fluffyThoughts={message.fluffyThoughts} fluffyStatus={message.fluffyStatus}/>}
                            </div>
                          </div>
                        ))}
                        </div>
                          ) : (
                            <EmptyChatListPostRepo />
              )
      }
      <div className="pb-[80px] pt-4 md:pt-10">
      <ChatScrollAnchor trackVisibility={false} />
      </div>
      {!isEmptyRepoId && (
        <ChatPanelHandler
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputValue2={inputValue2}
          setInputValue2={setInputValue2}
          inputValue3={inputValue3}
          setInputValue3={setInputValue3}
          onFormSubmit={onFormSubmit}
          formRef={formRef}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
      />)}
    </div>
  );
};