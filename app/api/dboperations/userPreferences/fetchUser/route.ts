// api/dboperations/userPreferences/fetchUser/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
        return new NextResponse(JSON.stringify({ error: "User ID is required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const client = await clientPromise;
        const db = client.db("userData");
        const userPreferences = await db.collection("userPreferences")
                                       .findOne({ userId: userId }, { sort: { createdAt: -1 } });

        if (userPreferences) {
            return new NextResponse(JSON.stringify(userPreferences), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new NextResponse(JSON.stringify({ error: "User preferences not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to fetch user preferences" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
