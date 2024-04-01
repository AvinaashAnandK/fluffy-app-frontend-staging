"use client";

import {
    StarIcon,
    Waypoints,
    GitFork,
    Bug,
    GitPullRequest,
    GitBranchPlus,
    ScrollText,
    Code2,
    Codepen,
    ExternalLink
  } from "lucide-react"

  
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
  
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"


import { Toggle } from "@/components/ui/toggle"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";


interface ModelProps {
  repoName: string;
  tasks: string;
  licenseKey: string;
  repoUrl: string;
  language: string;
  framework: string;
  size: number;
  stars: number;
  forks: number;
  openIssues: number;
  created: string;
  lastUpdated: string;
  lastPush: string;
  licenseName: string;
  licenseUrl: string;
}

const ModelCard = (sampleModel:ModelProps) => {
  const latestDate = ((a, b) => (`20${a.split('/')[1]}-${a.split('/')[0]}` > `20${b.split('/')[1]}-${b.split('/')[0]}` ? a : b))(sampleModel.lastUpdated, sampleModel.lastPush);
  const tasksArray = JSON.parse(sampleModel.tasks);
  const codeArray = [
      {
          icon:Code2,
          text:sampleModel.language
      },
      {
          icon:Codepen,
          text:sampleModel.framework
      },
      {
          icon:ScrollText,
          text:sampleModel.licenseName
      }
  ];



    return ( 
        <div className="hover:cursor-pointer"
        onClick={() => window.open(sampleModel.repoUrl, '_blank')}>
        <Card className="h-fit">
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">
                {sampleModel.repoName}

            </CardTitle>
            <CardDescription>
            <div className="flex space-x-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center">
              <StarIcon className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-600" />
              {sampleModel.stars}
            </div>
            <div className="flex items-center">
            <Separator orientation="vertical" className="h-[20px]" /> 
            </div>
            <div className="flex items-center">
              <GitFork className="mr-2 h-4 w-4 fill-sky-400 text-sky-600" />
              {sampleModel.forks}
            </div>
            <div className="flex items-center">
            <Separator orientation="vertical" className="h-[20px]" /> 
            </div>
            <div className="flex items-center">
              <Bug className="mr-2 h-4 w-4 fill-orange-400 text-orange-600" />
              {sampleModel.openIssues}
            </div>
            </div>
            
          </CardDescription>
        </div>
        </CardHeader>
        <CardContent>
                <div className="flex flex-row h-full text-primary overflow-x-auto pb-4">
                    <div className="pr-2 flex-initial flex justify-center">
                        <div className="flex flex-wrap">
                            {
                                codeArray.map((task) => (
                                    <div 
                                        key={task.text}
                                        className="text-muted-foreground text-xs group flex pt-2 pr-2 flex-shrink-0 justify-center font-light flex-wrap">
                                        <div className="flex gap-y-0.5 text-center ">
                                            <Badge variant='outline' className="text-zinc-600">
                                                <task.icon className="h-3 w-3 mr-1" />
                                                {task.text}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                  </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
                Tasks 
              </div>
                <div className="flex flex-row h-full text-primary overflow-x-auto pb-4">
                    <div className="pr-2 flex-initial flex justify-center">
                        <div className="flex flex-wrap">
                            {
                                tasksArray.map((task: string) => (
                                    <div 
                                        key={task}
                                        className="text-muted-foreground text-xs group flex pt-2 pr-2 flex-shrink-0 justify-center font-light flex-wrap">
                                        <div className="flex gap-y-0.5 text-center ">
                                            <Badge variant='secondary'>
                                                {task}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
          <div className="flex space-x-4 text-sm text-muted-foreground pb-2">
          <div className="flex items-center">
              <GitBranchPlus className="mr-2 h-4 w-4" />
              Created {sampleModel.created}
            </div>
            <div className="flex items-center">
            <Separator orientation="vertical" className="h-[20px]" /> 
            </div>
            <div className="flex items-center">
              <GitPullRequest className="mr-2 h-4 w-4" />
              Updated {latestDate}
            </div>               
          </div>
          {/* <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Checkbox id="addmodel" />
            <Label htmlFor="addmodel">Select Model</Label>
        </div>
        
        <div className="flex items-center">
            <Separator orientation="vertical" className="h-[20px]" /> 
        </div>
          <div className="flex items-center ">
          <Toggle aria-label="Toggle italic" className="pl-0"disabled>
            <Waypoints className="mr-2 h-4 w-4" />
            Finetune
          </Toggle>
          </div>
          
          </div> */}
        </CardContent>
      </Card>
      </div>
     );
}
 
export default ModelCard;