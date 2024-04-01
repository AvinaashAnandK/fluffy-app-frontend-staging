"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { KNOW_REPO_OPTIONS } from "@/constants";
import { useUserPreferences } from '@/hooks/zustand-store-fluffy'; 
import { useEffect } from "react";

const KnowTheRepoProps = () => {
    const { knowRepoOptions, setKnowRepoOptions } = useUserPreferences();
    const { toast } = useToast(); // Assuming you've set up your toast provider

    useEffect(() => {
        if (knowRepoOptions !== '') {
            toast({
                description: `Know The Repo option changed to: ${knowRepoOptions}`,
            });
        }
    }, [knowRepoOptions, toast]);

    const handleKnowRepoChange = (value: string) => {
        setKnowRepoOptions(value);
    };

    return ( 
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm mb-1 p-2 hover:border-customco8">
            {/* Card Header*/}
            <div className="flex flex-col space-y-1.5 p-2">
                <div>
                    <p className="text-sm font-semibold text-primary leading-none tracking-tight mb-2">
                        How well do you know the repo?
                    </p>
                    <RadioGroup
                        value={knowRepoOptions} // Set the value from Zustand
                        onValueChange={handleKnowRepoChange} // Update Zustand when the selection changes
                        className="grid grid-cols-3 gap-2 pt-1"
                    >
                        {
                            KNOW_REPO_OPTIONS.map((task) => (
                                <div key={task.key}>
                                    <RadioGroupItem value={task.key} id={task.key} className="peer sr-only"/>
                                    <Label htmlFor={task.key} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:cursor-pointer hover:text-accent-foreground peer-data-[state=checked]:border-customco8 [&:has([data-state=checked])]:border-customco8">
                                        <task.icon className="mb-2 h-5 w-5 text-customco8" />
                                        <div className="text-center text-xs text-customco8">
                                            {task.title}
                                        </div>
                                    </Label>
                                </div>
                            ))
                        }
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}

export default KnowTheRepoProps;
