// api/dboperations/apiLimits/updatePurchase/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

interface UpdatePurchaseRequest {
  userId: string;
  purchaseHistory: any[];
  repoLimit: number;
  chatsLimit: number;
  userType: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json() as UpdatePurchaseRequest;
  const { userId, purchaseHistory, repoLimit, chatsLimit, userType } = body;

  if (!userId || !purchaseHistory || repoLimit == null || chatsLimit == null || !userType) {
    return new NextResponse(JSON.stringify({ error: "Unable to update purchase information in user api limits. Missing required fields." }), {
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

    const updateResult = await apiLimits.updateOne(
      { userId },
      {
        $push: { purchaseHistory: { $each: purchaseHistory } },
        $set: {
          currentRepoAddedLimit: repoLimit,
          currentChatsCreatedLimit: chatsLimit,
          currentUserType: userType,
          lastUpdatedAt: new Date()
        }
      },
      { upsert: true }
    );

    if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 0) {
      return new NextResponse(JSON.stringify({ error: "Update failed, no user found and no new record created." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new NextResponse(JSON.stringify({ message: "User's purchase history updated successfully." }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: `An error occurred: ${error.message}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
