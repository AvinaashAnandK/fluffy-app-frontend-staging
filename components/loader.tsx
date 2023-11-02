import Image from "next/image";

export const Loader = () => {
    return ( 
        <div className="h-full flex flex-col gap-y-2 items-center justify-center">
            <div className="w-20 h-20 relative animate-bounce">
                <Image
                    alt = "Loading"
                    fill 
                    src = "/loading.png"/>
            </div>
            <p className="text-sm text-muted-foreground">
                Fluffy is thinking...
            </p>            
        </div>
     );
}
 
