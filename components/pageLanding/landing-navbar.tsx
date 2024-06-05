"use client";

import { Borel, Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

const borel = Borel({
    weight: "400",
    subsets: ["latin"]
});


export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();
    return ( 
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/"
                  className="flex items-center"> 
                <div className="relative h-10 w-10 mr-4">
                    <Image
                        fill
                        alt = "logo"
                        src= "/fluffy.png"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white pt-3",borel.className)}>
                    fluffy
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/playground" : "/sign-up"}>
                <Button variant="outline" className="rounded-full font-normal border-white">
                    Get Started
                </Button>
                </Link>
            </div>

        </nav>
     );
}





 
export default LandingNavbar;