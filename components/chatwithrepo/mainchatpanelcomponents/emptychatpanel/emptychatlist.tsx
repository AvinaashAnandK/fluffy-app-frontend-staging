"use client";

import { useToast } from "@/components/ui/use-toast";
import { useUserPreferences } from "@/hooks/zustand-store-fluffy";
import { useEffect } from "react";
import { CHAT_REPO_TASKS } from "@/constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EmptyChatListPostRepo = () => {
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
        <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-lg border bg-background p-8">
          <h1 className="mb-2 text-lg font-semibold">
            {"Welcome to Chat with a repo!"}
          </h1>
          <p className="mb-2 leading-normal text-muted-foreground">
            Seamlessly work with OS repos. Change using the dropdown above.
          </p>
          <p className="leading-normal text-muted-foreground">
            Find the repo, set your preferences using the knobs on the left and get going. 
          </p>
          <div className="mt-4 flex flex-col items-start space-y-2">
            {CHAT_REPO_TASKS.map((task, index) => (
              <Button
                key={index}
                variant="link"
                className="h-auto p-0 text-base"
                onClick={() => handleKnowRepoChange(task.key)}
              >
                <ArrowRight className="mr-2 text-muted-foreground" />
                {task.description}
              </Button>
            ))}
          </div>
        </div>
      </div>
    
    );
}
 
export default EmptyChatListPostRepo;