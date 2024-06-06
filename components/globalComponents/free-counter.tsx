import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserLimit } from '@/lib/mongodbcalls';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useProModal } from "@/hooks/zustand-store-fluffy";

const SkeletonFreeCounter = () => {
    return (
      <div>
        <Card className="bg-white/10 border-0">
          <CardContent className="py-4">
            <div className="text-center text-sm text-white mb-4 space-y-2">
              <Skeleton className="h-6 w-3/4 rounded-md" /> 
              <Skeleton className="h-3 w-full rounded-md mt-2" /> 
              <Skeleton className="h-6 w-3/4 rounded-md mt-4" /> 
              <Skeleton className="h-3 w-full rounded-md mt-2" /> 
            </div>
            <div className="items-end">
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

const FreeCounter = ({ shouldRefetch }: { shouldRefetch: boolean }) => {
    const { userId } = useAuth();
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const [loading, setLoading] = useState(true);
    const [limits, setLimits] = useState({
        currentRepoAddedCount: 0,
        currentChatsCreatedCount: 0,
        currentRepoAddedLimit: 0,
        currentChatsCreatedLimit: 0,
    });

    const { onOpen } = useProModal();    

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
    
            setLoading(true);
            const cachedLimits = sessionStorage.getItem('userLimits');
            const lastFetch = sessionStorage.getItem('lastFetchTime');
            const currentTime = new Date().getTime();
    
            // Check if the data is older than 1.5 minutes or should refetch is true
            if (shouldRefetch || !cachedLimits || !lastFetch || currentTime - parseInt(lastFetch) > 90000) {
                try {
                    const result = await fetchUserLimit(userId, userEmail);
                    sessionStorage.setItem('userLimits', JSON.stringify(result));
                    sessionStorage.setItem('lastFetchTime', currentTime.toString());
                    setLimits(result);
                } catch (error) {
                    console.error('Error fetching limits:', error);
                }
            } else {
                setLimits(JSON.parse(cachedLimits));
            }
            setLoading(false);
        };

        fetchData();
    }, [userId, userEmail, shouldRefetch]);

    if (loading) {
        return <SkeletonFreeCounter />;
    }


    const { currentRepoAddedCount, currentChatsCreatedCount, currentRepoAddedLimit, currentChatsCreatedLimit } = limits;
    const chatProgress = currentChatsCreatedLimit > 0 ? (currentChatsCreatedCount / currentChatsCreatedLimit) * 100 : 0;
    const repoProgress = currentRepoAddedLimit > 0 ? (currentRepoAddedCount / currentRepoAddedLimit) * 100 : 0;

    return (
        <div>
            <Card className="bg-white/10 border-0">
                <CardContent className="py-4">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p className="text-customco5">
                            {currentChatsCreatedCount} / {currentChatsCreatedLimit} Chats Created
                        </p>
                        <Progress className="h-3 bg-customco1/30" value={chatProgress} />
                        <p className="text-customco5">
                            {currentRepoAddedCount} / {currentRepoAddedLimit} Repos Added
                        </p>
                        <Progress className="h-3 bg-customco1/30" value={repoProgress} />
                    </div>
                    <div className='items-end'>
                    <Button size="sm" variant="premium" className='w-full' onClick={onOpen}>
                        Upgrade
                        <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
                    </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FreeCounter;
