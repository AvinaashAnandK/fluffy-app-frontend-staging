// 1. Import the necessary hooks from the 'react' library
import { useState, useEffect } from 'react';
import { FluffyLoader } from './dependantComponents/fluffy-loader';
import Image from 'next/image';

// 2. Define the 'Video' interface to represent a video object
interface Video {
    link: string;
    imageUrl: string;
}

// 3. Define the 'VideosComponentProps' interface to specify the props for the 'VideosComponent'
interface VideosComponentProps {
    videos: Video[];
}

// 4. Define the 'VideosComponent' functional component that accepts 'VideosComponentProps'
const VideosComponent: React.FC<VideosComponentProps> = ({ videos }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

    // 6. Use the 'useEffect' hook to initialize the 'loadedImages' state based on the number of videos
    useEffect(() => {
        setLoadedImages(Array(videos.length).fill(false));
    }, [videos]);

    // 7. Define the 'handleImageLoad' function to update the 'loadedImages' state when an image is loaded
    const handleImageLoad = (index: number) => {
        setLoadedImages((prevLoadedImages) => {
            const updatedLoadedImages = [...prevLoadedImages];
            updatedLoadedImages[index] = true;
            return updatedLoadedImages;
        });
    };

    // 8. Define the 'handleVideoClick' function to set the 'selectedVideo' state when a video is clicked
    const handleVideoClick = (link: string) => {
        setSelectedVideo(link);
    };

    // 12. Render the 'VideosComponent' JSX
    return (
        <div className="bg-card/75 text-card-foreground mb-1 shadow-lg rounded-lg border p-4 mt-4 w-full">
            {/* 13. Render the header with the "Videos" title and the Serper logo */}
            <div className="flex items-center">
                <h2 className="text-lg font-semibold flex-grow">Fluffy Thoughts</h2>
                
            </div>

            {/* 14. Render the video thumbnails */}
            <div className={`flex flex-wrap mx-1 w-full transition-all duration-500 max-h-[500px] overflow-hidden`}>
                {videos.length === 0 ? (
                    <FluffyLoader />
                ) : (
                    videos.map((video, index) => (
                        <div
                            key={index}
                            className="transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110 w-1/3 p-1 cursor-pointer"
                            onClick={() => handleVideoClick(video.link)}
                        >
                            {!loadedImages[index] && (
                                <div className="w-full overflow-hidden aspect-video">
                                    <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            )}
                            <div className="w-full overflow-hidden aspect-video transition-all duration-200">
                                test
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VideosComponent;