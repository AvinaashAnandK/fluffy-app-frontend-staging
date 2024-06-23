"use client";
import { cn } from "@/lib/utils";
import { UserButton,useUser } from "@clerk/nextjs";
import { Gauge, Sparkles }  from "lucide-react";
import { Borel } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/globalComponents/mobile-sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import FreeCounter from "@/components/globalComponents/free-counter";
import { useEffect, useState } from "react";
import { getCurrentPlan } from "@/lib/subscription";

const font = Borel({
    weight: "400",
    subsets: ["latin"]
});


export const Navbar = () => {
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const { user } = useUser();
    const userId = user?.id || "";
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        async function fetchPlan() {
          if (userId) {
            const plan = await getCurrentPlan(userId);
            if (plan) {
              if (plan.currentPlan !== "Free") {
                setIsPro(true);
              } 
            } 
          }
        }
        fetchPlan();
      }, [userId]);

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
                {isPro ?
                     <Button size="sm" variant="plainpurple" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                     Usage
                     <Gauge className="h-4 w-4 text-white ml-2" />
                     </Button>
                        : 
                    <Button size="sm" variant="premium" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
                    </Button>
                }
                
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                <FreeCounter shouldRefetch={shouldRefetch} isPro={isPro} />
                </HoverCardContent>
                </HoverCard>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}

export default Navbar;