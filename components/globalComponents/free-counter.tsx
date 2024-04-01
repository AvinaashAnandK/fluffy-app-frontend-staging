import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const FreeCounter = () => {
    const [mounted, setMounted] = useState(false);
    const [limits, setLimits] = useState({
        repoAddedCount: 0,
        chatsCreatedCount: 0,
        maxRepoCount: 0,
        maxChatCount: 0,
    });

    // Set mounted state to true on component mount
    useEffect(() => {
        setMounted(true);

        // Only fetch data if the component is mounted to prevent hydration errors
        if (mounted) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('/api/dbcalls/getuserlimits');
                    setLimits(response.data);
                } catch (error) {
                    console.error('Error fetching limits:', error);
                    // Handle error appropriately
                }
            };

            fetchData();
        }

        // Optional: Clean up function to set mounted to false when component unmounts
        return () => setMounted(false);
    }, [mounted]); // Depend on 'mounted' to re-run the effect if needed

    if (!mounted) {
        // Optionally, return a placeholder or nothing if not mounted
        return null;
    }

    const { repoAddedCount, chatsCreatedCount, maxRepoCount, maxChatCount } = limits;

    const chatProgress = maxChatCount > 0 ? (chatsCreatedCount / maxChatCount) * 100 : 0;
    const repoProgress = maxRepoCount > 0 ? (repoAddedCount / maxRepoCount) * 100 : 0;

    return (
        <div>
            <Card className="bg-white/10 border-0">
                <CardContent className="py-4">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p className="text-customco5">
                            {chatsCreatedCount} / {maxChatCount} Chats Left
                        </p>
                        <Progress className="h-3 bg-customco1/30" value={chatProgress} />
                        <p className="text-customco5">
                            {repoAddedCount} / {maxRepoCount} Repos Added
                        </p>
                        <Progress className="h-3 bg-customco1/30" value={repoProgress} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FreeCounter;
