// api/dboperations/apiLimits/updateLimit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const userId = query.get('userId');
    const updateRepo = query.get('updateRepo') === 'true';

    if (!userId) {
        return new NextResponse(JSON.stringify({ error: "User Id not provided in request." }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        const client = await clientPromise;
        const db = client.db("userData");
        const apiLimits = db.collection("apiLimits");

        const currentField = updateRepo ? "currentRepoAddedCount" : "currentChatsCreatedCount";
        const totalField = updateRepo ? "totalRepoAddedCount" : "totalChatsCreatedCount";
        const limitField = updateRepo ? "currentRepoAddedLimit" : "currentChatsCreatedLimit";
        const updateFieldDisplay = updateRepo ? "RepoAdded count increased by 1" : "ChatsCreated count increased by 1";

        const entry = await apiLimits.findOne({ userId });

        if (!entry) {
            return new NextResponse(JSON.stringify({ error: "User does not exist." }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        if (entry[currentField] >= entry[limitField]) {
            return new NextResponse(JSON.stringify({ error: "Requests exceed user's current limits." }), {
                status: 403,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        await apiLimits.updateOne(
            { userId },
            {
                $inc: { [currentField]: 1, [totalField]: 1 },
                $set: { lastUpdatedAt: new Date() }
            }
        );

        return new NextResponse(JSON.stringify({ message: `Success: ${updateFieldDisplay}` }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: `Could not update user api limits entries, an error occurred: ${error.message}` }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
