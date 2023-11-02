import Image from "next/image";

export const InfoModalFirstTime = () => {
    return ( 
        <div className="h-full w-full flex flex-col items-center justify-center">

            <div className="relative flex-1 w-full flex items-center justify-center">
                <Image
                    alt="Infographic for first time users"
                    objectFit="cover"  // To ensure the image scales appropriately
                    src="/HowTo.png"
                    width={680}
                    height={500}
                />
            </div>
            
        </div>
     );
}

export const ApproachGenerated = () => {
    return ( 
        <div className="h-full p-10 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                Fluffy has some initial thoughts, it is refining those thoughts. 
            </div>
            <p className="text-muted-foreground text-sm text-center">

            </p>
        </div>
     );
}

export const ModelFetchLoading = () => {
    return ( 
        <div className="h-full flex flex-col gap-y-2 items-center justify-center">
            <div className="w-10 h-10 relative animate-bounce">
                <Image
                    alt = "Loading"
                    fill 
                    src = "/loading.png"/>
            </div>
            <p className="text-sm text-muted-foreground">
                Fluffy is fetching the relevant models...
            </p>            
        </div>
     );
}
