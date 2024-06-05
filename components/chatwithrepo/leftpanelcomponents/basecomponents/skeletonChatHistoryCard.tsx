import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const SkeletonChatHistoryCard = () => {
  return (
    <Card className="bg-opacity-50 w-full max-w-md rounded-lg">
      <CardHeader className="p-4">
        <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Title placeholder */}
        <Skeleton className="h-4 w-1/2 mt-2 rounded-md" /> {/* Description placeholder */}
      </CardHeader>
      <CardContent className="p-3 pt-0 pb-3">
        <div className="flex items-center space-x-3 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar placeholder */}
          <div className="flex flex-col">
            <Skeleton className="h-4 w-24 rounded-md" /> {/* Name placeholder */}
            <Skeleton className="h-4 w-16 mt-1 rounded-md" /> {/* Organization placeholder */}
          </div>
        </div>
        <div className="flex flex-wrap space-x-2 pl-0">
          {/* Tags placeholder: you can adjust the number of Skeletons based on typical tag count */}
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonChatHistoryCard;
