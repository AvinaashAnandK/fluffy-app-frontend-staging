'use client'
import Textarea from 'react-textarea-autosize';
import { Tooltip, TooltipContent, TooltipTrigger, } from '@/components/ui/tooltip';
import { IconArrowElbow } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

import { FormEvent, useEffect, useRef, useState, useCallback } from 'react';
import { useActions, readStreamableValue } from 'ai/rsc';
import { type AI } from '@/app/action';
import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { useLoadedRepo, useUserPreferences } from '@/hooks/zustand-store-fluffy';
import { RetrievalResults, RagPrompt, TokenLengths, DownloadSource, DocumentationSource, CodeSource, Message, StreamMessage, Image, Video, FollowUp  } from '@/lib/types';

// Custom components 
import SearchResultsComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/SearchResultsComponent';
import UserMessageComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/UserMessageComponent';
import LLMResponseComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/LLMResponseComponent';
import EmptyChatListPreRepoSelection from './mainchatpanelcomponents/emptychatpanel/emptychatlistprerepo';
import EmptyChatListPostRepo from './mainchatpanelcomponents/emptychatpanel/emptychatlist';

import { ChatPanelHandler } from './mainchatpanelcomponents/form/prompt-form-handler';
import { usePathname } from 'next/navigation';

import VideosComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/VideosComponent';
import FollowUpComponent from '@/components/chatwithrepo/mainchatpanelcomponents/answer/FollowUpComponent';

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  chatId: string
  repoId?: string
}

export function RepoChat({ chatId, repoId, initialMessages, className }: ChatProps) {
  const path = usePathname()
  const id = chatId;

  const isEmptyRepoId = typeof repoId === 'undefined';

  // 3. Set up action that will be used to stream all the messages
  const { myAction } = useActions<typeof AI>();

  // 4. Set up form submission handling
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');

  // 5. Set up state for the messages
  const [messages, setMessages] = useState<Message[]>([]);

  // 6. Set up state for the CURRENT LLM response (for displaying in the UI while streaming)
  const [currentLlmResponse, setCurrentLlmResponse] = useState('');

  // 7. Set up handler for when the user clicks on the follow up button
  const handleFollowUpClick = useCallback(async (question: string) => {
    setCurrentLlmResponse('');
    await handleUserMessageSubmission(question);
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

  // 9. Set up handler for when a submission is made, which will call the myAction function
  const handleSubmit = async (message: string) => {
    if (!message) return;
    await handleUserMessageSubmission(message);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const messageToSend = inputValue.trim();
    if (!messageToSend) return;
    setInputValue('');
    await handleSubmit(messageToSend);
  };

  const handleUserMessageSubmission = async (userMessage: string): Promise<void> => {
    console.log('handleUserMessageSubmission', userMessage);
    const newMessageId = Date.now();
    const newMessage = {
      id: newMessageId,
      type: 'userMessage',
      userMessage: userMessage,
      content: '',
      images: [],
      videos: [],
      followUp: null,
      isStreaming: true,
      searchResults: {} as RetrievalResults,
    };
  
  
    const { repoUrl, repoFullName, repoOrgName, repoName } = useLoadedRepo.getState();
    const loadedRepo = { repoUrl, repoFullName, repoOrgName, repoName };
    console.log('loadedRepo', loadedRepo);
    
    const { chatRepoTasks, knowRepoOptions, coderOptions, fluffyResponseOptions, languagesOptions } = useUserPreferences.getState();
    const userPreferences = { chatRepoTasks, knowRepoOptions, coderOptions, fluffyResponseOptions, languagesOptions }
    console.log('userPreferences', userPreferences);

    setMessages(prevMessages => [...prevMessages, newMessage]);
    let lastAppendedResponse = "";
    try {
      console.log(messages);
      const streamableValue = await myAction(userMessage, messages, loadedRepo, userPreferences);
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
            if (typedMessage.searchResults) {
              currentMessage.searchResults = typedMessage.searchResults;
            }
            // if (typedMessage.images) {
            //   currentMessage.images = [...typedMessage.images];
            // }
            // if (typedMessage.videos) {
            //   currentMessage.videos = [...typedMessage.videos];
            // }
            // if (typedMessage.followUp) {
            //   currentMessage.followUp = typedMessage.followUp;
            // }
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

  return (
    <div>
      {isEmptyRepoId ? (
                        <EmptyChatListPreRepoSelection />
                      ) : messages.length > 0 ? (
                        <div className="flex flex-col">
                        {messages.map((message, index) => (
                          <div key={`message-${index}`} className="flex flex-col md:flex-row">
                            <div className="w-full md:w-3/4 md:pr-2">
                            {message.type === 'userMessage' && <UserMessageComponent message={message.userMessage} />}
                              {message.searchResults && (
                                <SearchResultsComponent key={`searchResults-${index}`} searchResults={message.searchResults} />
                              )}
                              <LLMResponseComponent
                                llmResponse={message.content}
                                currentLlmResponse={currentLlmResponse}
                                index={index}
                                key={`llm-response-${index}`}
                              />
                              {/* {false && (
                                <div className="flex flex-col">
                                  <FollowUpComponent key={`followUp-${index}`} followUp={message.followUp} handleFollowUpClick={handleFollowUpClick} />
                                </div>
                              )} */}
                            </div>
                            {/* <div className="w-full md:w-1/4 lg:pl-2">
                              {message.false && <VideosComponent key={`videos-${index}`} videos={message.videos} />}
                            </div> */}
                          </div>
                        ))}
                        </div>
                          ) : (
                            <EmptyChatListPostRepo />
              )
      }
      <div className="pb-[80px] pt-4 md:pt-10">
        <ChatScrollAnchor trackVisibility={true} />
      </div>
      <ChatPanelHandler
        inputValue={inputValue}
        setInputValue={setInputValue}
        onFormSubmit={onFormSubmit}
        formRef={formRef}
        onKeyDown={onKeyDown}
        inputRef={inputRef}
      />
    </div>
  );
};