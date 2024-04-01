"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import ModelCard from '@/components/pageAskFluffy/model-card';
import { ExploreModelFirst } from '../globalComponents/informationbanners';
import { Button } from '../ui/button';
  

interface SearchQuery {
      categoryId: string;
      name: string;
  }

const ExploreList = ({ categoryId, name }: SearchQuery) => {
    const [modelFetchResponse, setModelFetchResponse] = useState<any>(null);
    let modelResponse;
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching models for subtask");
            console.log(categoryId);
            console.log(name);
            try {
                console.log("Calling explore model APIs");
                const query = name || "";
                const area = categoryId || "";
                const response = await axios.post("/api/exploremodels", {
                    query: query,
                    area: area
                });
                setModelFetchResponse(response.data);
                
                
            } catch (error) {
                console.log("Model fetch failed for:"," Area =",categoryId," Search term =",name);
            } 
        };
        fetchData();
    }, [categoryId, name]);



    return ( 
        <div className="">
                                        <div className="pt-4">
                                {
                                    !modelFetchResponse ? 
                                    <ExploreModelFirst />
                                    : 
                                    (
                                        modelFetchResponse.data && typeof modelFetchResponse.data.modelList === 'string' 
                                        ? null 
                                        : 
                                        (
                                            <div className="flex flex-wrap">
                                                {modelFetchResponse.data.modelList.map((sampleModel:any, index:any) => (
                                                    // Only render the ModelCard if index is less than 3 or showAll is true
                                                    (index < 10 || showAll) && (
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
     );
}
 
export default ExploreList;