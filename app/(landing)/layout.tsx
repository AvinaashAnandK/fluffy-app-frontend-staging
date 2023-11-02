import { cn } from "@/lib/utils";
import { Prompt, Lato } from "next/font/google";


const fontMain = Prompt({
    weight: ["100", "200", "300", "400", "500", "600", "800", "900", "700"],
    subsets: ["latin"],
  });


const LandingLayout = ({
    children 
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <main className="h-full bg-[#24123082] overflow-auto">
            <div className={cn("mx-auto max-w-screen-xl h-full",fontMain.className)}> 
                {children} 
            </div>
        </main>
     );
}
 
export default LandingLayout;