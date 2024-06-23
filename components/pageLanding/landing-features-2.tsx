
import { Badge } from "@/components/ui/badge";
import { IconPencilOff } from "@tabler/icons-react";
import { ArrowLeftRight, Code, Infinity, ScanSearch, SearchCode } from "lucide-react";
import Image from "next/image";
import { BsInfinity } from "react-icons/bs";



export const LandingFeaturesNew = () => (
  <div className="w-full py-24 lg:py-24">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Repo Playground</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Features
            </h2>
            <p className="text-lg max-w-fit leading-relaxed tracking-tight text-muted-foreground  text-left">
              Effortlessly navigate, understand, and interact with open-source repositories.
            </p>
          </div>
        </div>
        <div className="w-full max-w-full space-y-4 mx-auto">
              <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4">
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500  rounded-full">
                    <BsInfinity className='h-8 w-8'/>
                  </div>
                  <h2 className="text-zinc-200 dark:text-zinc-100 font-bold text-center pt-2">
                  {"Add any public repo, no size restrictions!"}
                  </h2>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500  rounded-full">
                    <ScanSearch className='h-8 w-8'/>
                  </div>
                  <h2 className="text-zinc-200 dark:text-zinc-100 font-bold text-center pt-2">
                  {"Peruse the repo list, to talk to any repo!"}
                  </h2>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500  rounded-full">
                    <ArrowLeftRight className='h-8 w-8'/>
                  </div>
                  <h2 className="text-zinc-200 dark:text-zinc-100 font-bold text-center pt-2">
                    {"Get quick answers from similar public queries on the same repo / across repos."}
                  </h2>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500  rounded-full">
                    <IconPencilOff className='h-8 w-8'/>
                  </div>
                  <h2 className="text-zinc-200 dark:text-zinc-100 font-bold text-center pt-2">
                  {"Don't worry about prompting right! Select your mode, and let Fluffy handle the rest."}
                  </h2>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500  rounded-full">
                    <Code className='h-8 w-8'/>
                  </div>
                  <h2 className="text-zinc-200 dark:text-zinc-100 font-bold text-center pt-2">
                    {"Get responses tailored to your language and framework preferences."}
                  </h2>
                </div>
                <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500  rounded-full">
                    <SearchCode className='h-8 w-8'/>
                  </div>
                  <h2 className="text-zinc-200 dark:text-zinc-100 font-bold text-center pt-2">
                  {"Wondering which repo offers a functionality? Ask Fluffy to guide you!"}
                    
                  </h2>
                </div>
                
              </div>
            </div>
        {/* <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4 gap-4">
          <div className="bg-muted h-auto w-full rounded-md p-2 flex justify-between flex-col lg:col-span-1 lg:row-span-2">
          <div className="flex justify-center items-center flex-grow mb-4">
          <div className="w-full h-full flex justify-center items-center rounded-lg aspect-auto">
          <img src="/features/ft3.png" alt="Product Image" className=" w-full object-fill rounded-lg" />
          </div>
          </div>
            <div className="flex flex-col px-2 pb-2">
              <h3 className="text-base text-muted-foreground tracking-tight">Find answers to your queries - why rely on a tech blog when you could instead rely on the code base</h3>
            </div>
          </div>

          <div className="bg-muted h-full w-full rounded-md p-6 flex justify-between flex-col lg:col-span-1 lg:row-span-2">
          <div className="flex justify-center items-center flex-grow">
              <Image src="/features/fluffythoughts.png" alt="Feature Image" height={530} width={770} className="rounded-md"/>
            </div>
            <div className="flex flex-col mt-3"> 
              <h3 className="text-base tracking-tight">{"Add any public repo, no size restrictions!"}</h3>
            </div>
          </div>

          <div className="bg-muted h-full w-full rounded-md p-6 flex justify-between flex-col lg:col-span-2 lg:row-span-1">
          <div className="flex justify-center items-center flex-grow">
              <Image src="/features/.png" alt="Feature Image" height={272} width={159} className="rounded-md"/>
            </div>
            <div className="flex flex-col mt-3"> 
              <h3 className="text-base tracking-tight">{"Peruse the repo list, to talk to any repo!"}</h3>
            </div>
          </div>

          <div className="bg-muted h-full w-full rounded-md p-6 flex justify-between flex-col lg:col-span-2 lg:row-span-1">
          <div className="flex justify-center items-center flex-grow">
              <Image src="/features/prompting.png" alt="Feature Image" height={720} width={360} className="rounded-md"/>
            </div>
            <div className="flex flex-col mt-3"> 
              <h3 className="text-base tracking-tight">{"Don't worry about prompting right! Choose your mode, Fluffy will handle the rest."}</h3>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  </div>
);

