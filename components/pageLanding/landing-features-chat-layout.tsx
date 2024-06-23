import { Check, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const LandingFeaturesChatLayout = () => (
  <div className="w-full py-24 lg:py-24">
    <div className="container mx-auto">
      <div className="grid border rounded-lg container py-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Repo Playground</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular">
              Talk to any Repo!
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Designed for developer productivity.
              </p>
            </div>
          </div>
          <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-customco6" />
              <div className="flex flex-col gap-1">
                <p className="">Find answers to your queries</p>
                <p className="text-muted-foreground text-sm">
                  {"Don't rely on an outdated tech blogs when you have the code base"}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-customco6" />
              <div className="flex flex-col gap-1">
                <p className="">{"Don't worry about prompting right!"}</p>
                <p className="text-muted-foreground text-sm">
                  {"Choose your mode, Fluffy will handle the rest."}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-customco6" />
              <div className="flex flex-col gap-1">
                <p className="">{"Don't worry about hallucinated responses"}</p>
                <p className="text-muted-foreground text-sm">
                  {"Fluffy evaluates and highlights points to note, so you know what to look out for."}
                </p>
              </div>
            </div>
        </div>
        </div>
        <div className="items-center">
          <Image src="/features/chatinterfaceall.png" alt="Feature Image" height={2880} width={1800} className="rounded-md"/>
        </div>
      </div>
    </div>
  </div>
);