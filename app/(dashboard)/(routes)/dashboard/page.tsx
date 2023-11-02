"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import axios from "axios";

import ModelCard from "@/components/model-card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { MultiInput } from "@/components/ui/multilineinput";
import { formSchema} from "./constants";
import { Button } from "@/components/ui/button";
import { Search, } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ApproachGenerated, InfoModalFirstTime } from "@/components/modals";
import { Loader } from "@/components/loader";
import { subtaskparse } from "@/lib/utils";
import SubtaskCard from "@/components/subtask-card";



export default function DashboardPage () {
  const router = useRouter();
  const [approachGenResponse, setApproachGenResponse] = useState<any>(null);
  const [refinedApproachResponse, setRefinedApproachResponse] = useState<any>(null);
  let approachGenFlag = null;
  let subtask = null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: ""
    }
  });
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    const callRefineApproach = async () => {
      if (approachGenResponse) {
        console.log("Calling approach refining APIs");
        try {
          const refinedResponse = await axios.post("/api/refineapproach", {
            approach_raw: approachGenResponse
          });
          console.log("Response received from refineapproach API");
          console.log(refinedResponse);
          console.log("Updating RefineApproach status");
          setRefinedApproachResponse(refinedResponse);
        } catch (error: any) {
          console.log(error);
        }
      }
    };

    callRefineApproach();
  }, [approachGenResponse]);


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Query received from the user");
    setApproachGenResponse(null);
    setRefinedApproachResponse(null);
    console.log(values);
    try {
      console.log("Calling approach gen APIs");
      const response = await axios.post("/api/approachgen", {
          messages: values.query
      });
      
      console.log("Response received from approach gen");
      console.log(response);

      console.log("Updating ApproachGen status");
      setApproachGenResponse(response);
      console.log("ApproachGen status updated");
      approachGenFlag = 1;
      console.log(approachGenResponse);
    } catch(error:any){
      console.log(error);
    } finally{
      router.refresh();
    } 
  };

  
  if (refinedApproachResponse !== null) {
    let inputStr = refinedApproachResponse?.data?.data?.validatedOutput;
    if (inputStr) { // Check if inputStr is defined
        let test_utils = subtaskparse(inputStr);
        subtask = test_utils;
        console.log(test_utils);
    } else {
        console.log("Validated Output not found to be extracted");
    }
} else {
    console.log("Subtasks yet to be extracted");
}
 
  

  return (
    <div className="h-full p-4 space-y-2">
      <div className="">
        <div className="">
          <div className="flex flex-auto">
            {/* <MessageCircle className="h-8 w-8 mr-2" /> */}
            <div className="text-2xl font-bold flex">
              Ask Fluffy!
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-lg border-0 w-full p-4 px-0 md:px-0 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              
              <FormField name ="query" 
                         render={({ field }) => (
                          <FormItem className="col-span-12 lg:col-span-11">
                            <FormControl className="m-0 p-2 lg:p-4">
                              <MultiInput 
                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-trasparent bg-primary/5" 
                                disabled={isLoading}
                                placeholder="I work for a healthtech startup that is looking to venture into the medical 
procedure tagging space. We want to automatically tag and classify videos of surgeries and other medical procedures to use downstream. 
"
                                {...field}
                                />
                            </FormControl>
                          </FormItem>
                         )}/>
              <Button className="col-span-12 lg:col-span-1 w-full" variant="premium" disabled={isLoading}>
                <Search className="h-3.5 w-3.5 mr-2" />
                Search
              </Button>              
            </form>
          </Form>

        </div>
      </div>
      <div className="space-y-4 mt-4">
        {(isLoading || (!refinedApproachResponse && approachGenResponse !== null)) && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
            </div>
        )}

        {!isLoading && (
          <>
            {approachGenResponse === null && 
              <div className="p-4 rounded-lg w-full h-full flex items-center justify-center bg-muted">
                <InfoModalFirstTime />
              </div>
            }
            {(!refinedApproachResponse && approachGenResponse !== null) && <ApproachGenerated />}
          </>
        )}
      <div className="flex flex-col gap-y-4">
        { subtask !== null ? (
            <>
               Fluffy has broken down your query into atomic tasks. Delve deep to discover the most effective models for each task.
            {
              subtask?.map((subtask, index) => 
                  <div key={index}>
                      <SubtaskCard {...subtask} refinedApproachResponse={refinedApproachResponse} />
                  </div>
              )
          }
            </>
          ) : (
            <div></div>
          )
        }
      </div>
      </div>
  </div>
  )
};
 