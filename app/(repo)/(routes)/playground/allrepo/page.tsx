"use client";
import { useEffect, useState } from 'react';
import BreadCrumb from '@/components/globalComponents/bread-crumb';
import RepoListCard from '@/components/pageRepoPlayground/pageRepoList/repo-list-card';
import RepoListSearchInput from '@/components/pageRepoPlayground/pageRepoList/repo-list-search';
import { useSearchParams } from "next/navigation";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RepoCardProps {
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

export default function AllRepoPage() {
  const [repos, setRepos] = useState<RepoCardProps[]>([]);
  const searchParams = useSearchParams();
  const fetchRepos = async () => {
    try {
      const response = await fetch('/api/fetchingestedrepos/');
      const data = await response.json();

      if (response.ok) {
        setRepos(data); 
      } else {
        throw new Error('Failed to fetch repos');
      }
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []); 

  

  const searchQuery = searchParams.get("repo");

  const filteredRepos = repos.filter((repo) =>
  searchQuery
    ? repo.repo_org_name.toLowerCase().includes(searchQuery) ||
      repo.repo_name.toLowerCase().includes(searchQuery) ||
      repo.repo_url.toLowerCase().includes(searchQuery)
    : true,
);


  return (
    <div className="h-full p-2">
      <BreadCrumb />
      <div className='flex flex-row justify-between pr-6 pb-4'>
        <h3 className="text-2xl flex-items font-semibold tracking-tight pl-6">
          Repo List
        </h3>
        <Button size = "icon" variant="outline" className="h-8 w-8 p-1.5 text-muted-foreground" onClick={fetchRepos}>
          <RefreshCw />
        </Button>
      </div>
      <RepoListSearchInput /> 
      <div className="flex flex-col h-screen w-full">
        
        <div className="w-full flex justify-center items-start p-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Map over your repos state to render a RepoListCard for each repo */}
            {filteredRepos.map((repo, index) => (
              <RepoListCard key={index} {...repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
