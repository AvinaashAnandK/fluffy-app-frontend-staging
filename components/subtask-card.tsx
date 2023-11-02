"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

import {
    LayoutList,
    Vote,
    AlertOctagon
  } from "lucide-react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import {
    Card,
    CardContent,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ModelFetchLoading } from "./modals";
import ModelCard from './model-card';
  

interface SubtaskProps {
  index: number | null;
  solutionCallouts: string;
  solutionDescription: string;
  solutionType: string;
  subtaskDescription: string;
  subtaskName: string;
  refinedApproachResponse: any;
}

const SubtaskCard = ({ refinedApproachResponse, ...sampleTask }: SubtaskProps) => {
    const [modelFetchResponse, setModelFetchResponse] = useState<any>(null);
    let modelResponse;
    const toTitleCase = (str:string) => {
        return str.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
    };
    const capitalizeFirstWord = (str:string) => {
        const [firstWord, ...restOfWords] = str.split(' ');
        return [firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase(), ...restOfWords].join(' ');
    };
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching models for subtask");
            console.log(sampleTask.index);
    
            try {
                console.log("Calling approach gen APIs");
                const indexValue = sampleTask.index || 0;
                const response = await axios.post("/api/fetchmodels", {
                    approach_raw: refinedApproachResponse.data,
                    index: indexValue - 1
                });
                
                    // console.log("Response received for subtask",sampleTask.index)
                    // console.log("Response Data:", response.data);
                setModelFetchResponse(response.data);
                
                
            } catch (error) {
                console.log("Model fetch failed for",sampleTask.index,error);
                // console.log(error);
            } 
        };
        
        
            // console.log("Response received for subtask",sampleTask.index)
            // console.log("Response Data:", response.data);
        fetchData();
        
        
    }, [refinedApproachResponse, sampleTask.index]);



    return ( 
        <div className="">
            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger index={sampleTask.index || 0}>
                    {toTitleCase(sampleTask.subtaskName)}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="px-4 py-4">
                        <Card className="bg-primary-10 mt-0 mb-0 pt-0 pb-0">
                            <CardContent className="grid gap-1 pb-0">
                                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                                <LayoutList className="mt-px h-6 w-6" />
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground leading-none">
                                        Description
                                    </p>
                                    <p className="text-base font-medium ">
                                        {capitalizeFirstWord(sampleTask.subtaskDescription)}
                                    </p>
                                </div>
                                </div>
                                <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
                                <Vote className="mt-px h-6 w-6" />
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground leading-none">
                                        Solution 
                                    </p>
                                    <p className="text-base font-medium ">
                                        {capitalizeFirstWord(sampleTask.solutionDescription)}
                                    </p>
                                </div>
                                </div>
                                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                                <AlertOctagon className="mt-px h-6 w-6" />
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground leading-none">
                                        Callouts
                                    </p>
                                    <p className="text-base font-medium ">
                                        {capitalizeFirstWord(sampleTask.solutionCallouts)}
                                    </p>
                                </div>
                                </div>
                            </CardContent>
                            </Card>
                            <div className="pt-4">
                                {
                                    !modelFetchResponse ? 
                                    <ModelFetchLoading />
                                    : 
                                    (
                                        modelFetchResponse.data && typeof modelFetchResponse.data.modelList === 'string' 
                                        ? null 
                                        : 
                                        (
                                            <div className="flex flex-wrap">
                                                {modelFetchResponse.data.modelList.map((sampleModel:any, index:any) => (
                                                    // Only render the ModelCard if index is less than 3 or showAll is true
                                                    (index < 3 || showAll) && (
                                                        <div key={index} className="w-full md:w-1/3 p-2">
                                                            <ModelCard {...sampleModel} />
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )
                                    )
                                }

                                {/* Render the More button only if there are more than 3 models and showAll is false */}
                                {modelFetchResponse && modelFetchResponse.data.modelList.length > 3 && !showAll && (
                                    <div className="mt-2 text-center">
                                        <Button 
                                            onClick={() => setShowAll(true)}
                                            variant="showCollapse"
                                            size="sm"
                                            >
                                                Show all {modelFetchResponse.data.modelList.length} models
                                        </Button>
                                    </div>
                                )}
                                {modelFetchResponse && modelFetchResponse.data.modelList.length > 3 && showAll && (
                                    <div className="mt-2 text-center">
                                        <Button 
                                            onClick={() => setShowAll(false)}
                                            variant="showCollapse"
                                            size="sm"
                                            >
                                                Collapse
                                        </Button>
                                    </div>
                                )}
                            </div>
                            
                        
                    </div>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
     );
}
 
export default SubtaskCard;