"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "../ui/button";

const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return ( 
    <div className="text-white font-bold py-36 text-center space-y-5 border-b-2 ">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"> 
            <h1>
                Discover state of the art models in
            </h1>
            <div className="p-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400  to-cyan-600">
            <TypewriterComponent 
                options = {{
                    strings:[
                        "Computer Vision.",
                        "Audio.",
                        "Speech.",
                        "NLP.",
                        "Recommendation Systems.",
                        "Classification.",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 100
                }}
                />

            </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
            Supercharge your applications with AI models.
        </div>
        <div className="">
            <Link href={isSignedIn ? "/dashboard": "/sign-up"}>
                <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                    Try Fluffy for Free!
                </Button>
            </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required.
        </div>
    </div> 
    );
}
 
export default LandingHero;