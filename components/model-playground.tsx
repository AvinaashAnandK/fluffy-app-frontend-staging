"use client"
import { useChat, UseChatHelpers } from 'ai/react';
import { ChatList } from '@/components/chatdepend_/chat-list';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconRefresh, IconStop } from '@/components/ui/icons'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FooterText } from './chatdepend_/footer';



interface Prompt {
  title: string;
  description: string;
}

const presetPromptsList: Prompt[] = [
  { title: "In the repo, how is", description: "the image preprocessing pipeline setup"},
  { title: "How do I", description: "use actor identification to tag audio clips"},
];

export default function ModelPlayground() {
  const { 
    messages, 
    append, 
    reload, 
    stop,
    input, 
    isLoading,
    setInput,
  } = useChat({
    api: '/api/chat',
    onResponse(response) {
      if (response.status === 401) {
        console.log(response.statusText)
      }
    }
  });
  const { formRef, onKeyDown } = useEnterSubmit()

  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const inputRef2 = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const [input1, setInput1] = React.useState('');
  const [input2, setInput2] = React.useState('');
  const [isDualInput, setIsDualInput] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalInput = input1;
    if (isDualInput && input1.trim() && input2.trim()) {
      finalInput = `${input1} to achieve ${input2}`;
    }


    if (!finalInput?.trim()) {
      return;
    }
    setInput('');
    setInput1('');
    setInput2('');
    setIsDualInput(false);

    await append({
      content: finalInput,
      role: 'user'
    });
  };

  const handleCardClick = (prompt: Prompt) => {
    if (prompt.title === 'How do I') {
      setIsDualInput(true);
      setInput1(prompt.title);
      setInput2('');
      setTimeout(() => inputRef2.current?.focus(), 0); 
    } else {
      setIsDualInput(false);
      setInput1(prompt.title + prompt.description);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };


  return (
    <div className="w-full">
      <div className=''>
      {/* <div className="flex justify-center">
          <Card className="rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out max-w-3xl">
              <CardHeader className='p-3'>
                  <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100">prs-eth/Marigold</CardTitle>
                  <CardDescription className="text-xs text-gray-700 dark:text-gray-300">Link: https://github.com/prs-eth/marigold</CardDescription>
              </CardHeader>
          </Card>
      </div> */}
        <ChatList messages={messages} />
        <div className='fixed w-full bottom-0 items-center justify-center z-10'>
            <div className="inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
              <div className="mx-auto sm:max-w-2xl sm:px-4">
                <div className="flex h-10 items-center justify-center">
                  {isLoading ? (
                    <Button
                      variant="outline"
                      onClick={() => stop()}
                      className="bg-background"
                    >
                      <IconStop className="mr-2" />
                      Stop generating
                    </Button>
                  ) : (
                    messages?.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => reload()}
                        className="bg-background"
                      >
                        <IconRefresh className="mr-2" />
                        Regenerate response
                      </Button>
                    )
                  )}
                </div>
                <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                    <form
                    onSubmit={onSubmit}
                    ref={formRef}
                    >
                    <div className="flex flex-wrap justify-between">
                      {presetPromptsList.map((prompt, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 px-2">
                          <Card className="rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                                onClick={() => handleCardClick(prompt)}
                          >
                            <CardHeader className='p-3'>
                              <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100">{prompt.title}</CardTitle>
                              <CardDescription className="text-xs text-gray-700 dark:text-gray-300">{prompt.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        </div>
                      ))}
                    </div>
                    <div className="sticky flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-2 mt-2 sm:rounded-md sm:border sm:px-3">
                      <Textarea
                        ref={inputRef}
                        tabIndex={0}
                        onKeyDown={onKeyDown}
                        rows={1}
                        value={input1}
                        onChange={e => setInput1(e.target.value)}
                        placeholder="Send a message."
                        spellCheck={false}
                        className="mr-12 min-h-[60px] w-full resize-none bg-primary/10 my-2 px-4 py-[1.3rem]  focus-within:outline-none rounded-sm sm:text-sm"
                      />
                      {isDualInput && (
                      <Textarea
                          ref={inputRef2}
                          tabIndex={0}
                          onKeyDown={onKeyDown}
                          rows={1}
                          value={input2}
                          placeholder="Enter the expected outcome."
                          spellCheck={false}
                          className="min-h-[60px] w-full resize-none bg-primary/10 px-4 py-[1.3rem] focus-within:outline-none sm:text-sm rounded-sm mb-2"
                          onChange={e => setInput2(e.target.value)}
                      />)}
                      <div className="absolute right-0 top-3 sm:right-4">
                            <Button
                              type="submit"
                              size="icon"
                              disabled={isLoading || (isDualInput ? input1 === '' || input2 === '' : input1 === '')}
                            >
                              <IconArrowElbow />
                              <span className="sr-only">Send message</span>
                            </Button>
                      </div>
                    </div>
                  </form>
                  <FooterText className="hidden sm:block" />
                </div>
              </div>
            </div>
              

        </div>          
      </div>
    </div>
  )
}

