"use client";
import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn, repoIdGenerator, chatIdGenerator } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { useAddRepoModal, useLoadedRepo } from '@/hooks/zustand-store-fluffy'; 
import { RepoList } from "@/constants";
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from "next/navigation";


interface RawRepoList {
    created: string;
    forks: number;
    last_updated: string;
    open_issues: number;
    repo_description: string;
    repo_ingestion_status: string;
    repo_org_name: string;
    repo_name: string;
    repo_url: string;
    stars: number;
}

const fetchRepos = async (): Promise<RawRepoList[]> => {
    try {
      const response = await fetch('/api/fetchingestedrepos/');
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        throw new Error('Failed to fetch repos');
      }
    } catch (error) {
      console.error('Error fetching repos:', error);
      return [];
    }
  };

  
const RepoListProps = ({ repoUrl }: { repoUrl?: string }) => {
    const [open, setOpen] = useState(false)
    const [repoList, setRepoList] = useState<RepoList[]>([]);
    const [selectedRepoList, setSelectedRepoList] = useState<RepoList>()
    const router = useRouter();
    const { loadedRepoUrl, setLoadedRepoUrl } = useLoadedRepo();
    const { onOpen } = useAddRepoModal();
    const path = usePathname();
    const gpt4 =  {
        url: "https://fluffystack.com",
        name: "Chat with GPT4",
      };
 
    useEffect(() => {
        const intervalId = setInterval(() => {
          fetchRepos().then((fetchedRepos) => {

            const transformedRepos = fetchedRepos.map(repo => ({
              url: repo.repo_url,
              name: `${repo.repo_org_name}/${repo.repo_name}`,
            }));

            setRepoList(transformedRepos);

            if(repoUrl) {
              const defaultRepo = transformedRepos.find(repo => repo.url.includes(repoUrl)); 
              if (defaultRepo) {
                setSelectedRepoList(defaultRepo);
                setLoadedRepoUrl(defaultRepo.url);
            }
          }

          });
        }, 120000); // Refresh every 2 minutes
    
        
        fetchRepos().then((fetchedRepos) => {
          const transformedRepos = fetchedRepos.map(repo => ({
            url: repo.repo_url,
            name: `${repo.repo_org_name}/${repo.repo_name}`,
          }));

          setRepoList(transformedRepos);

          if(repoUrl) {
            const defaultRepo = transformedRepos.find(repo => repo.url.includes(repoUrl));
            if (defaultRepo) {
              setSelectedRepoList(defaultRepo);
              setLoadedRepoUrl(defaultRepo.url);
            }
          }
        });
    
        return () => clearInterval(intervalId);
      }, [repoUrl, setLoadedRepoUrl]);


    useEffect(() => {
        if (selectedRepoList?.url) {
            const repoId = repoIdGenerator(selectedRepoList.url)
            if(!path.includes(repoId)) {
              const currentPathParts = path.split('/');
              const baseUrl = `/${currentPathParts[1]}`;
              const chatId = chatIdGenerator()
              const destinationUrl = `${baseUrl}/${chatId}/repochat/${repoId}`;
              router.replace(destinationUrl);
            }
          }
    }, [selectedRepoList, router, path]);


    return ( 
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-label="Load a preset..." aria-expanded={open} className="flex-1 justify-between rounded-lg md:max-w-[300px] lg:max-w-[400px]">
                    {selectedRepoList ? selectedRepoList.name : "Load a repo..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align='start'>
                <Command>
                    <CommandInput placeholder="Search repo..." />
                    <CommandEmpty>
                         No repo found.
                    </CommandEmpty>
                    <CommandGroup className="">
                        <CommandItem key={"free chat"} onSelect={() => {
                                    setSelectedRepoList(gpt4)
                                    setOpen(false)       
                        }}>
                        Chat with GPT4
                        </CommandItem>
                        <CommandItem onSelect={() => onOpen()} className='text-orange-400'>
                        Add a Repo
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Repo List">
                        {
                            repoList.map((repo) => (
                                <CommandItem key={repo.url} onSelect={() => {
                                    setSelectedRepoList(repo)
                                    setOpen(false)
                                    }}>
                                {repo.name}
                                <CheckIcon className={cn("ml-auto h-4 w-4",selectedRepoList?.url === repo.url? "opacity-100": "opacity-0")}/>
                                </CommandItem>))
                        }
                    </CommandGroup>

                </Command>

            </PopoverContent>
        </Popover>
    );
}

export default RepoListProps;
