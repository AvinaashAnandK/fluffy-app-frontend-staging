"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { CHAT_REPO_TASKS } from "@/constants";
import { useUserPreferences } from '@/hooks/zustand-store-fluffy'; 
import { useEffect } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
  } from '@/components/ui/tooltip'

const ChatRepoTasksProps = () => {
    const { chatRepoTasks, setChatRepoTasks } = useUserPreferences();
    const { toast } = useToast(); // Assuming you've set up your toast provider

    // useEffect(() => {
    //     if (chatRepoTasks !== '') {
    //         toast({
    //             description: `Repo Task Option option changed to: ${chatRepoTasks}`,
    //         });
    //     }
    // }, [chatRepoTasks, toast]);

    const handleKnowRepoChange = (value: string) => {
        setChatRepoTasks(value);
    };

    return ( 
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm mb-1 p-2 hover:border-customco8">
            {/* Card Header*/}
            <div className="flex flex-col space-y-1.5 p-2">
                <div>
                    <p className="text-sm font-semibold text-primary leading-none tracking-tight mb-2">
                        {"What do you want to do with the repo?"}
                    </p>
                    <RadioGroup
                        value={chatRepoTasks} // Set the value from Zustand
                        onValueChange={handleKnowRepoChange} // Update Zustand when the selection changes
                        className="grid grid-cols-4 gap-1 pt-1"
                    >
                        {
                            CHAT_REPO_TASKS.map((task) => (
                                <div key={task.key} className="hover:cursor-pointer">
                                    {/* <Tooltip>
                                    <TooltipTrigger asChild> */}
                                    {/* [TO-DO: Add tool tip for description] */}
                                    <div>
                                    <RadioGroupItem value={task.key} id={task.key} className="peer sr-only hover:cursor-pointer"/>
                                    <Label htmlFor={task.key} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:cursor-pointer hover:text-accent-foreground peer-data-[state=checked]:border-customco8 [&:has([data-state=checked])]:border-customco8">
                                        <task.icon className="mb-2 h-5 w-5 text-customco8 stroke-2" />
                                        <div className="text-center text-xs text-customco8">
                                            {task.title}
                                        </div>
                                    </Label>
                                    </div>
                                    {/* </TooltipTrigger>
                                    <TooltipContent align="start">
                                        {task.description}
                                    </TooltipContent>
                                    </Tooltip> */}
                                </div>
                            ))
                        }
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}

export default ChatRepoTasksProps;
