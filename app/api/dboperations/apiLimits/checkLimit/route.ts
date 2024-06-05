// api/dboperations/apiLimits/checkLimit/route.ts
import { NextResponse, NextRequest } from "next/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { MAX_COUNTS, EMAIL_USER_TYPES, DOMAIN_USER_TYPES, DEFAULT_USER_TYPE } from '@/constants';

interface ApiLimits {
  _id?: ObjectId;
  userId: string;
  totalRepoAddedCount: number;
  totalChatsCreatedCount: number;
  currentRepoAddedCount: number;
  currentChatsCreatedCount: number;
  currentRepoAddedLimit: number;
  currentChatsCreatedLimit: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  purchaseHistory: any[];
  currentUserType: string;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const repoLimit = url.searchParams.get('repoLimit');
  const userEmail = url.searchParams.get('userEmail');

  if (!userId) {
    return new NextResponse("Error: Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("userData");
    const apiLimits = db.collection("apiLimits");

    const entry = await apiLimits.findOne({ userId });
    // Function to determine user type based on email
    const getUserType = (email: any): string => {
          const emailUserType = EMAIL_USER_TYPES[email];
          if (emailUserType) {
            return emailUserType;
          }
    
          const emailDomain = email.substring(email.lastIndexOf('@') + 1);
          const domainUserType = DOMAIN_USER_TYPES[emailDomain];
          if (domainUserType) {
            return domainUserType;
          }
    
          return DEFAULT_USER_TYPE;
        };

    if (!entry) {
      const userType = getUserType(userEmail);
      const userTypeCounts = MAX_COUNTS[userType as keyof typeof MAX_COUNTS]; 
      const userInfo: ApiLimits = {
        userId,
        totalRepoAddedCount: 0,
        totalChatsCreatedCount: 0,
        currentRepoAddedCount: 0,
        currentChatsCreatedCount: 0,
        currentRepoAddedLimit: userTypeCounts.REPO,
        currentChatsCreatedLimit: userTypeCounts.CHAT,
        purchaseHistory: [],
        currentUserType: userType,
      };

      await apiLimits.insertOne({ ...userInfo, createdAt: new Date(), lastUpdatedAt: new Date() });

      const limitExceeded = repoLimit === 'true'
      ? userInfo.currentRepoAddedCount >= userInfo.currentRepoAddedLimit
      : userInfo.currentChatsCreatedCount >= userInfo.currentChatsCreatedLimit;

      const data = {
          "limitExceeded": limitExceeded,
          "message": "User limits added successfully"
      };


      return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const limitExceeded = repoLimit === 'true'
      ? entry.currentRepoAddedCount >= entry.currentRepoAddedLimit
      : entry.currentChatsCreatedCount >= entry.currentChatsCreatedLimit;

    const data = {
        "limitExceeded": limitExceeded,
        "message": "user limits added successfully"
    };

    return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Error in apiLimits/checkLimit API:', error);
    return new NextResponse("Error: Something went wrong", { status: 500 });
  }
}