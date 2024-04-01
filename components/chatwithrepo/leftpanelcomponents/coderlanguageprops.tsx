"use client";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { LANGUAGES_OPTIONS } from "@/constants";
import { useUserPreferences } from '@/hooks/zustand-store-fluffy'; 
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const LanguageOptionsProps = () => {
    const { languagesOptions, setLanguagesOptions } = useUserPreferences();
    const { toast } = useToast(); // Assuming you've set up your toast provider

    useEffect(() => {
        if (languagesOptions.length > 0) {
            toast({
                description: `Coder's language list changed to: ${languagesOptions}`,
            });
        }
    }, [languagesOptions, toast]);

    const handleLanguageOptionClick = (value: string) => {
        const updatedLanguagesOptions = languagesOptions.includes(value)
            ? languagesOptions.filter((option) => option !== value)
            : [...languagesOptions, value];

        setLanguagesOptions(updatedLanguagesOptions);
    };

    return ( 
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm mb-1 p-2 hover:border-customco8">
            {/* Card Header*/}
            <div className="flex flex-col space-y-1.5 p-2">
                <div>
                    <p className="text-sm font-semibold leading-none tracking-tight mb-2">
                        {"You know..."}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                    {
                        LANGUAGES_OPTIONS.map((task) => (
                            <Badge
                                key={task.key}
                                variant="outline"
                                onClick={() => handleLanguageOptionClick(task.key)}
                                className={cn("flex-items hover:cursor-pointer text-customco8", languagesOptions.includes(task.key) && "border-customco8")}
                            >
                                {task.title}
                            </Badge>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LanguageOptionsProps;
