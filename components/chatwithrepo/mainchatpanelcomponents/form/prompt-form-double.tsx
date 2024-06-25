import { FormEvent } from 'react';
import Textarea from 'react-textarea-autosize';
import { Button } from '@/components/ui/button';
import { IconArrowElbow } from '@/components/ui/icons';
import { CHAT_REPO_TASKS } from '@/constants'


interface InputChatPanelDefaultProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef: React.RefObject<HTMLFormElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  chatRepoTasks: string;
  inputValue2: string;
  setInputValue2: (value: string) => void;
  inputValue3?: string;
  setInputValue3?: (value: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

export const DoubleInputChatPanel = ({ inputValue, setInputValue, onFormSubmit, formRef, onKeyDown, inputRef, chatRepoTasks, inputValue2, setInputValue2, isSubmitting, setIsSubmitting }: InputChatPanelDefaultProps) => {
  const task = CHAT_REPO_TASKS.find(task => task.key === chatRepoTasks);
  const placeholder1 = task?.placeholderText1;
  const placeholder2 = task?.placeholderText2;
  
  return (
    <div className="sticky pt-20 inset-x-0 bottom-0 w-full peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
      <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
          <form ref={formRef} onSubmit={onFormSubmit}>

          <div className='flex flex-row'>
            <div className="relative flex flex-col w-full pr-4 bg-background overflow-hidden max-h-60 grow space-y-3">
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                placeholder={placeholder1}
                className="min-h-[60px] w-full resize-none bg-transparent pl-1 pr-4 py-[1.1rem] focus-within:outline-none sm:text-sm sm:rounded-md sm:border sm:px-2"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                placeholder={placeholder2}
                className="min-h-[60px] w-full resize-none bg-transparent pl-1 pr-4 py-[1.1rem] focus-within:outline-none sm:text-sm sm:rounded-md sm:border sm:px-2"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
              />
            </div>
            <div className="sm:right-4">
            <Button type="submit" size="icon" disabled={inputValue.trim() === '' || inputValue2.trim() === '' || isSubmitting}>
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>

          </form>
        </div>
      </div>
    </div>
  );
};
