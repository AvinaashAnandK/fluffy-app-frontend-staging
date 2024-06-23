"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Sparkles }  from "lucide-react";
import { Borel } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/globalComponents/mobile-sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import FreeCounter from "@/components/globalComponents/free-counter";
import { useState } from "react";

const font = Borel({
    weight: "400",
    subsets: ["latin"]
});


export const Navbar = () => {
    const [shouldRefetch, setShouldRefetch] = useState(false);

    // console.log('shouldRefetch:', shouldRefetch);
    
    const handleMouseEnter = () => {
        const lastFetch = sessionStorage.getItem('lastFetchTime');
        const currentTime = new Date().getTime();
        if (!lastFetch || currentTime - parseInt(lastFetch) > 90000) {
            setShouldRefetch(true);
        }
    };

    const handleMouseLeave = () => {
        setShouldRefetch(false);
    };

    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-navsidebar h-16">
            <div className="flex items-center">
                <MobileSidebar />
                <Link href="/playground">
                    <h1 className={cn("hidden md:block text-xl md:text-2xl font-bold text-primary pt-2",font.className)}>
                        fluffy
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                <HoverCard openDelay={50}>
                <HoverCardTrigger asChild>
                <Button size="sm" variant="premium" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        Upgrade
                        <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                <FreeCounter shouldRefetch={shouldRefetch} />
                </HoverCardContent>
                </HoverCard>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}

export default Navbar;