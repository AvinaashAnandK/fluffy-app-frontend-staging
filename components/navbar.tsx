"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles }  from "lucide-react";
import { Borel } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar";

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
                <Button size="sm" variant="premium" disabled>
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
                </Button>
                <ModeToggle / >
                <UserButton />
            </div>
        </div>
    );
}

export default Navbar;