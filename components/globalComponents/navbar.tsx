"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles }  from "lucide-react";
import { Borel } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/globalComponents/mode-toggle";
import { MobileSidebar } from "@/components/globalComponents/mobile-sidebar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import FreeCounter from "@/components/globalComponents/free-counter";

const font = Borel({
    weight: "400",
    subsets: ["latin"]
});


export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSidebar />
                <Link href="/dashboard">
                    <h1 className={cn("hidden md:block text-xl md:text-2xl font-bold text-primary pt-2",font.className)}>
                        fluffy
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                <HoverCard openDelay={50}>
                <HoverCardTrigger asChild>
                    <Button size="sm" variant="premium">
                        Upgrade
                        <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <FreeCounter />
                </HoverCardContent>
                </HoverCard>
                {/* <ModeToggle / > */}
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}

export default Navbar;