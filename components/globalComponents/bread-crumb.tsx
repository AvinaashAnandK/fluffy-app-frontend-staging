"use client";
import { bcrouteslist } from "@/lib/breadcrumbroutes";
import { usePathname, useRouter } from "next/navigation"
import { ChevronRight } from 'lucide-react';

export const BreadCrumb = () => {
    const pathname = usePathname();
    const router = useRouter();
    const routes = bcrouteslist;

    const onNavigate = (url: string) => {
      router.push(url);
    };
  
    const breadcrumbItems = pathname.split('/').filter(segment => segment);

    return (
        <div className="mt-1 ml-4 mb-4">
            <div className="flex items-center">
                {breadcrumbItems.map((item, index) => {
                    const route = bcrouteslist.find(route => route.key === item);
                    const isLast = index === breadcrumbItems.length - 1;
                    const IconComponent = route?.icon;

                    return (
                        <span key={index} className="flex items-center text-muted-foreground text-xs">
                            {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                            <div 
                                onClick={() => onNavigate(route?.href || `/${item}`)}
                                className="group flex items-center pt-1 p-2 cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition"
                            >
                                {route?.label || item}
                            </div>
                            {!isLast && <ChevronRight className="h-4 w-4 mx-2" />}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default BreadCrumb;