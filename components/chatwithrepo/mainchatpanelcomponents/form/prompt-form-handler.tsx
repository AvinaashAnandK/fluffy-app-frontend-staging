import { useUserPreferences } from '@/hooks/zustand-store-fluffy';
import { SingleInputChatPanel } from './prompt-form-single';
import { DoubleInputChatPanel } from './prompt-form-double';
import { TripleInputChatPanel } from './prompt-form-triple';

interface ChatPanelDefaultProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef: React.RefObject<HTMLFormElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  inputValue2: string;
  setInputValue2: (value: string) => void;
  inputValue3: string;
  setInputValue3: (value: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}

export const ChatPanelHandler = ({
  inputValue,
  setInputValue,
  onFormSubmit,
  formRef,
  onKeyDown,
  inputRef,
  inputValue2,
  setInputValue2,
  inputValue3,
  setInputValue3,
  isSubmitting,
  setIsSubmitting,
}: ChatPanelDefaultProps) => {
  const { chatRepoTasks } = useUserPreferences();

  const renderChatPanel = () => {
    if (['explore', ''].includes(chatRepoTasks)) {
      return (
        <SingleInputChatPanel
          inputValue={inputValue}
          setInputValue={setInputValue}
          onFormSubmit={onFormSubmit}
          formRef={formRef}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          chatRepoTasks={chatRepoTasks}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      );
    } else if (['solve', 'debug'].includes(chatRepoTasks)) {
      return (
        <DoubleInputChatPanel
          inputValue={inputValue}
          setInputValue={setInputValue}
          onFormSubmit={onFormSubmit}
          formRef={formRef}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          chatRepoTasks={chatRepoTasks}
          isSubmitting={isSubmitting}
          inputValue2={inputValue2}
          setInputValue2={setInputValue2}
          setIsSubmitting={setIsSubmitting}
        /> 
      );
    } else if (chatRepoTasks === 'verify') {
      return (
        <TripleInputChatPanel
          inputValue={inputValue}
          setInputValue={setInputValue}
          onFormSubmit={onFormSubmit}
          formRef={formRef}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          chatRepoTasks={chatRepoTasks}
          inputValue2={inputValue2}
          setInputValue2={setInputValue2}
          inputValue3={inputValue3}
          setInputValue3={setInputValue3}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        /> 
      );
    } else {
      return (
        <SingleInputChatPanel
          inputValue={inputValue}
          setInputValue={setInputValue}
          onFormSubmit={onFormSubmit}
          formRef={formRef}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          chatRepoTasks={chatRepoTasks}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      );
    }
  };

  return <>{renderChatPanel()}</>;
};