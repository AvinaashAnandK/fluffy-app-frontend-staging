"use client";

import qs from "query-string";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

const RepoListSearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const repo = searchParams.get("repo");

    const [value, setValue] = useState(repo || "");
    const debouncedValue = useDebounce<string>(value,500);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const query = {
            repo: debouncedValue
        };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query: query
            },
            {
                skipEmptyString: true,
                skipNull: true,
            }
        );

        router.push(url);
    }, [debouncedValue,router]);

    return ( 
        <div className="relative px-6">
            <Search className="absolute h-4 w-4 top-3 left-8 text-muted-foreground" />
            <Input 
                className="pl-10 bg-secondary/80"
                placeholder="Search for repo with url or name..."
                onChange={onChange}
                value={value}
            />
        </div>
     );
}
 
export default RepoListSearchInput;