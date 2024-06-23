"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MoveRight, MoveRightIcon } from "lucide-react";

const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
      <div className="w-full">
        <div className="container mx-auto">
          <div className="flex gap-8 py-24 lg:py-24 items-center justify-center flex-col">
            <div>
              <Badge variant="outline" className="font-normal text-purple-400">
                🎉 Open Beta!
              </Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-6xl max-w-5xl text-center">
               Copilot that helps you build features faster using public & open-source repos
              </h1>
              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-5xl text-center">
                From debugging specific and challenging bugs to exploring the latest in research-driven repos and bridging gaps in documentation, Fluffy has you covered!
              </p>
            </div>
            <div className="flex flex-row gap-3">
            <Link href={isSignedIn ? "/playground": "/sign-up"}>
            <Button size="lg" className="gap-4 rounded-full" variant="premium">
                Try now! <MoveRight className="w-4 h-4" />
            </Button>
            </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                   No credit card required.
           </div>
          </div>
        </div>
      </div>

      // <div className="text-white font-bold py-36 text-center space-y-5 border-b-2 ">
      //     <div className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
      //     <div>
      //       <Badge variant="outline" className="text-base mb-4 font-normal text-purple-400">🎉 We are live!</Badge>
      //     </div>
      //         <h1>
      //             Answer engine for Open-Source / Public Repos built to help you
      //         </h1>
      //         <div className="p-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400  to-cyan-600">
      //         <TypewriterComponent
      //             options = {{
      //                 strings:[
      //                     "debug specific and challenging bugs.",
      //                     "explore the latest in research-driven repos.",
      //                     "speed up development with new repos & libraries.",
      //                     "bridge gaps in documentation.",
      //                 ],
      //                 autoStart: true,
      //                 loop: true,
      //                 delay: 100
      //             }}
      //             />
      //         </div>
      //     </div>
      //     <div className="text-sm md:text-xl font-light text-zinc-400 w-2/3">
      //     Fluffy is an answer-engine for public and open-source code repositories, designed to help developers understand, implement, and troubleshoot codebases effortlessly.
      //     </div>
      //     <div className="">
      //         <Link href={isSignedIn ? "/playground": "/sign-up"}>
      //             <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
      //                 Try Fluffy for Free!
      //             </Button>
      //         </Link>
      //     </div>
      //     <div className="text-zinc-400 text-xs md:text-sm font-normal">
      //             No credit card required.
      //     </div>
      // </div>
    );
}
 
export default LandingHero;