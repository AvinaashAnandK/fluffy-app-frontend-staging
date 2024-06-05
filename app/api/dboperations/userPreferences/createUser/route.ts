// api/dboperations/userPreferences/createUser/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface UserPreferencesMongo {
    _id?: ObjectId;
    userId: string;
    createdAt?: Date;
    coderOptions: string;
    fluffyResponseOptions: string;
    languagesOptions: string[];
}

export async function POST(req: NextRequest) {
    const { userId, coderOptions, fluffyResponseOptions, languagesOptions } = await req.json() as UserPreferencesMongo;

    if (!userId || !coderOptions || !fluffyResponseOptions || !languagesOptions) {
        return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
      const client = await clientPromise;
      const db = client.db("userData");

      const newEntry: UserPreferencesMongo = {
        userId,
        createdAt: new Date(),
        coderOptions,
        fluffyResponseOptions,
        languagesOptions
      };

      const response = await db.collection("userPreferences").insertOne(newEntry);
      return new NextResponse(JSON.stringify(response), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Unable to create user preferences entry" }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
      });
    }
}
