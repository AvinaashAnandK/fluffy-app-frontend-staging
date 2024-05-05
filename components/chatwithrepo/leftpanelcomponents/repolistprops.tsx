"use client";
import { useCallback, useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn, repoIdGenerator, chatIdGenerator } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { useAddRepoModal, useLoadedRepo } from '@/hooks/zustand-store-fluffy'; 
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

interface RepoList {
    repoUrl: string;
    repoFullName: string;
    repoOrgName: string;
    repoName: string;
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

  const llms: RepoList[] = [
    {
        repoUrl: "https://fluffystack.com/gpt4",
        repoOrgName: "Fluffy",
        repoName: "GPT4",
        repoFullName: "fluffy/gpt4",
    },
    {
        repoUrl: "https://fluffystack.com/commandrplus",
        repoOrgName: "Fluffy",
        repoName: "commandrplus",
        repoFullName: "fluffy/commandrplus",
    },
];

  
const RepoListProps = ({ repoUrl }: { repoUrl?: string }) => {
    const [open, setOpen] = useState(false);
    const [repoList, setRepoList] = useState<RepoList[]>([]);
    const [selectedRepoList, setSelectedRepoList] = useState<RepoList>();
    const { repoUrl: zustandRepoUrl, repoFullName: zustandRepoFullName, repoOrgName: zustandRepoOrgName, repoName: zustandRepoName, setRepoUrl, setRepoFullName, setRepoOrgName, setRepoName } = useLoadedRepo();
    const router = useRouter();
    const path = usePathname();
    const { onOpen } = useAddRepoModal();

    const updateSelectedRepo = useCallback((repo: RepoList) => {
        setSelectedRepoList(repo);
        setRepoUrl(repo.repoUrl);
        setRepoFullName(repo.repoFullName);
        setRepoOrgName(repo.repoOrgName);
        setRepoName(repo.repoName);
    }, [setRepoUrl, setRepoFullName, setRepoOrgName, setRepoName]);
    
    // useEffect(() => {
    //     console.log("Zustand States:");
    //     console.log("zustandRepoUrl:", zustandRepoUrl);
    //     console.log("zustandRepoFullName:", zustandRepoFullName);
    //     console.log("zustandRepoOrgName:", zustandRepoOrgName);
    //     console.log("zustandRepoName:", zustandRepoName);

    //     console.log("Local States:");
    //     console.log("open:", open);
    //     console.log("repoList:", repoList);
    //     console.log("selectedRepoList:", selectedRepoList);
    //     console.log("--------------------");
    // }, [open, repoList, selectedRepoList, zustandRepoUrl, zustandRepoFullName, zustandRepoOrgName, zustandRepoName]);

    useEffect(() => {
      const fetchData = async () => {
          const fetchedRepos = await fetchRepos();
          const rawTransformedRepos = fetchedRepos.map(repo => ({
            repoUrl: repo.repo_url,
            repoFullName: `${repo.repo_org_name}/${repo.repo_name}`,
            repoOrgName: repo.repo_org_name,
            repoName: repo.repo_name
          }));

          const transformedRepos = [...llms, ...rawTransformedRepos];

          setRepoList(transformedRepos);
          if (repoUrl) {
              const defaultRepo = transformedRepos.find(repo => repo.repoUrl === repoUrl);
              if (defaultRepo) {
                updateSelectedRepo(defaultRepo);
              }
          }
      };

      fetchData();
      const intervalId = setInterval(fetchData, 1200000); // Refresh every 20 minutes
      return () => clearInterval(intervalId);
  }, [repoUrl, updateSelectedRepo]);

    useEffect(() => {
    if (selectedRepoList?.repoUrl) {
        const repoId = repoIdGenerator(selectedRepoList.repoUrl)
        if(!path.includes(repoId)) {
          const currentPathParts = path.split('/');
          const baseUrl = `/${currentPathParts[1]}`;
          const chatId = chatIdGenerator()
          const destinationUrl = `${baseUrl}/${chatId}/repochat/${repoId}`;
          router.replace(destinationUrl);
        }
      }
  }, [selectedRepoList, router, path, updateSelectedRepo]);


    return ( 
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-label="Load a preset..." aria-expanded={open} className="flex-1 justify-between rounded-lg md:max-w-[300px] lg:max-w-[400px]">
                {
                    selectedRepoList ? 
                        (selectedRepoList.repoFullName === 'fluffy/gpt4' ? 'GPT4' :
                        selectedRepoList.repoFullName === 'fluffy/commandrplus' ? 'Cohere Command R+' :
                        selectedRepoList.repoFullName) 
                        : "Load a repo..."
                }
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align='start' forceMount={true}>
                <Command>
                    <CommandInput placeholder="Search repo..." />
                    <CommandEmpty>
                         No repo found.
                    </CommandEmpty>
                    <CommandGroup>
                    {
                            repoList.slice(0, 2).map((repo) => (
                                <CommandItem key={repo.repoUrl} onSelect={() => {
                                    setSelectedRepoList(repo);
                                    setOpen(false);
                                }}>
                                    {repo.repoFullName === 'fluffy/gpt4' ? 'Talk to GPT4' : 'Talk to Cohere Command R+'}
                                    <CheckIcon className={cn("ml-auto h-4 w-4", selectedRepoList?.repoUrl === repo.repoUrl ? "opacity-100" : "opacity-0")}/>
                                </CommandItem>
                            ))
                        }
                        <CommandItem onSelect={() => onOpen()} className='text-orange-400'>
                        Add a Repo
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Repo List">
                    {
                        repoList.slice(2).map((repo) => (
                            <CommandItem key={repo.repoUrl} onSelect={() => {
                                setSelectedRepoList(repo);
                                setOpen(false);
                            }}>
                                {repo.repoFullName}
                                <CheckIcon className={cn("ml-auto h-4 w-4", selectedRepoList?.repoUrl === repo.repoUrl ? "opacity-100" : "opacity-0")}/>
                            </CommandItem>
                        ))
                    }
                    </CommandGroup>

                </Command>

            </PopoverContent>
        </Popover>
    );
}

export default RepoListProps;
