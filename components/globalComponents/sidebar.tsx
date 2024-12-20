"use client";
import Intercom from '@intercom/messenger-js-sdk';
import { cn } from "@/lib/utils";
import { ScanSearch, GalleryVerticalEnd,Settings,MessageCircle,PackageOpen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation"

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const routes = [
        {
            icon:PackageOpen,
            href:"/playground",
            label:"Repo Playground",
            pro: false
        },
        {
            icon:MessageCircle,
            href:"/dashboard",
            label:"Ask Fluffy!",
            pro: false
        },
        // {
        //     icon:ScanSearch,
        //     href:"/dashboard/explore",
        //     label:"Explore",
        //     pro: true
        // },
        // {
        //     icon:GalleryVerticalEnd,
        //     href:"/dashboard/history",
        //     label:"History",
        //     pro: true
        // },
        {
            icon:Settings,
            href:"/dashboard/settings",
            label:"Settings",
            pro: false
        }
    ];

    const onNavigate = (url: string, pro: boolean) => {
        return router.push(url);
    }

    return ( 
    <div className="space-y-4 flex flex-col h-full text-primary bg-navsidebar/80  ">
        <div className="p-3 flex-1 flex justify-center">
            <div className="space-y-2">
                {
                    routes.map((route) => (
                        <div 
                            onClick={() => onNavigate(route.href, route.pro)}
                            key = {route.href}
                            className={cn("text-muted-foreground text-xs group flex p-2 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                            pathname === route.href && "bg-primary/10 text-primary"
                            )}>
                        <div className="flex flex-col gap-y-2 items-center flex-1 text-center">
                            <route.icon className="h-5 w-5" />
                            {route.label}
                        </div>
                        
                        </div>
                    ))
                }
            </div>
        </div>
        
    </div> 
    );
}
 
export default Sidebar;