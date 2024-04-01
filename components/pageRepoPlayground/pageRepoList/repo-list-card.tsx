"use client";

import {
    StarIcon,
    GitFork,
    Bug,
    ExternalLink,
    CircleIcon,
    PlusCircle
  } from "lucide-react"

  
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
  
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"

import { Separator } from "@/components/ui/separator";
import { chatIdGenerator, cn, repoIdGenerator } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";


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

type RepoIngestionStatusType = 
  | "Ingestion Queued"
  | "Repo Cloned"
  | "Documentation Downloaded"
  | "Documentation Files Parsed"
  | "Commit History Parsed"
  | "Documentation Files Indexed"
  | "Download Requirements Indexed"
  | "Commit History Indexed"
  | "Code Dependencies Mapped"
  | "Compiling Code Explanations"
  | "Code Files Indexed";

  const repoStatusToDisplayStatus: { [key in RepoIngestionStatusType]: string } = {
  "Ingestion Queued": "Repo Queued",
  "Repo Cloned": "In-Progress",
  "Documentation Downloaded": "In-Progress",
  "Documentation Files Parsed":"In-Progress",
  "Commit History Parsed":"In-Progress",
  "Documentation Files Indexed":"In-Progress",
  "Download Requirements Indexed":"In-Progress",
  "Commit History Indexed":"In-Progress",
  "Code Dependencies Mapped":"In-Progress",
  "Compiling Code Explanations":"In-Progress",
  "Code Files Indexed": "Repo Indexed",
};

const getDisplayStatus = (repoIngestionStatus: string): string => {
  if (repoIngestionStatus in repoStatusToDisplayStatus) {
    return repoStatusToDisplayStatus[repoIngestionStatus as RepoIngestionStatusType];
  }
  return "Status Unknown";
};

const getStatusColorClassName = (status: string): string => {
  switch (status) {
    case "Repo Queued":
      return "text-[#BEA1A5]"; 
    case "In-Progress":
      return "text-[#0BBCD6]"; 
    case "Repo Indexed": 
      return "text-[#61BFAD]"; 
    default:
      return "";
  }
};

function CodeSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 mr-2" // Added class name from original SVG
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m10 10-2 2 2 2" />
      <path d="m14 14 2-2-2-2" />
    </svg>
  );
}

const RepoListCard = (sampleModel:RepoCardProps) => {
    const { userId } = useAuth();
    const { repo_url, repo_org_name, repo_name, repo_description, stars, forks, open_issues, created, last_updated, repo_ingestion_status } = sampleModel;
    const displayStatus = getDisplayStatus(repo_ingestion_status);
    const router = useRouter();

    const onTakeMeToRepo = (url: string) => {
      window.open(url, '_blank')
    };

    const onChatWithRepo = (repo_url: string, userId: any) => {
      const chatId = chatIdGenerator()
      const repoId = repoIdGenerator(repo_url)
      const destinationUrl = `${chatId}/repochat/${repoId}`;
      router.push(destinationUrl);
    };

    return ( 
    <Card className="">
      <CardHeader className="grid grid-cols-[1fr_20px] items-start gap-4 space-y-0 pb-4 pr-2">
        <div className="space-y-1">
          <CardTitle className="text-lg">
            {repo_org_name} / {repo_name}
          </CardTitle>
          <CardDescription className="pt-2">
          <div className="flex space-x-4 text-sm text-customco1">
            <div className="flex items-center">
              <StarIcon className="mr-2 h-4 w-4  text-customco2" />
              {stars}
            </div>
            <div className="flex items-center">
            <Separator orientation="vertical" className="h-[20px]" /> 
            </div>
            <div className="flex items-center">
              <GitFork className="mr-2 h-4 w-4 text-customco2" />
              {forks}
            </div>
            <div className="flex items-center">
            <Separator orientation="vertical" className="h-[20px]" /> 
            </div>
            <div className="flex items-center">
              <Bug className="mr-2 h-4 w-4  text-customco2" />
              {open_issues}
            </div>
            <div className="flex items-center">
            <Separator orientation="vertical" className="h-[20px]" /> 
            </div>
            <div className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4  text-customco2" />
            {created}
          </div>
          </div>

          <div className="pt-2 text-customco1">
            
            {repo_description}

          </div>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex space-x-4 text-sm text-customco2">
          <div className="flex items-center ">
            <Badge variant="repolistcard">
            <CircleIcon className={cn("mr-1 h-3 w-3",getStatusColorClassName(displayStatus))} />
            <div className={cn("p-1 text-xs",getStatusColorClassName(displayStatus))}>
              {displayStatus}
            </div>
            </Badge>
          </div>
          <div className="flex items-center ">
            <Badge variant="repolistcard">
            <div className="text-customco1 p-1 text-xs">
            Indexed on {last_updated}
            </div>
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid gap-4 pt-2">
      <div className="grid grid-cols-[1fr_2fr] gap-4" >
          <Button variant="outline" className="text-customco1 hover:cursor-pointer" onClick={() => onTakeMeToRepo(repo_url)}>
            Github
            <ExternalLink className="ml-2 h-4 w-4 text-customco1" />
          </Button>
          <Button variant="plainpurple" className="hover:cursor-pointer" onClick={() => onChatWithRepo(repo_url,userId)}>
            <CodeSquare className="mr-2 h-4 w-4" />
            Talk to Repo
          </Button>
        </div>
      </CardFooter>
    </Card>
     );
}



 
export default RepoListCard;