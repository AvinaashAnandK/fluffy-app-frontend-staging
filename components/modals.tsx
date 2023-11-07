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
        <div className="h-full pt-2 p-10 flex flex-col items-center justify-center">
            <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <p className="text-sm">ask fluffy!</p>
            </div>
            <div className="mt-4">
                <p className="text-green-400">$ fluffy solve query</p>
                <p className="text-white">generated inital thoughts</p>
                <p className="text-green-400">$ fluffy breakdown query</p>
                <p className="text-white">refining the approach...</p>
            </div>
            </aside>
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
