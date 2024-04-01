import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconArrowElbow } from '@/components/ui/icons'
import {useUserPreferences } from '@/hooks/zustand-store-fluffy'
import { CHAT_REPO_TASKS } from '@/constants'


export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
  taskMode: string
}

export function PromptFormDoubleInput({
  onSubmit,
  input,
  setInput,
  isLoading,
  taskMode
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const task = CHAT_REPO_TASKS.find(task => task.key === taskMode);

  const placeholder1 = task?.placeholderText1
  const placeholder2 = task?.placeholderText2

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className='w-full'>
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className='flex flex-row'>
      <div className="relative flex flex-col w-full pr-4 bg-background overflow-hidden max-h-60 grow space-y-3">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder1}
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent pl-1 pr-4 py-[1.3rem] focus-within:outline-none sm:text-sm  sm:rounded-md sm:border sm:px-2"
        />
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder2}
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent pl-1 pr-4 py-[1.3rem] focus-within:outline-none sm:text-sm sm:rounded-md sm:border sm:px-2"
        />
      </div>
      <div className="sm:right-4">
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
        </div>
        </div>
    </form>
    </div>
  )
}
