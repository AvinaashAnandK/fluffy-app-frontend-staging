// api/dboperations/apiLimits/fetchLimit/route.ts
import { NextRequest, NextResponse } from 'next/server';
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
    const userId = req.nextUrl.searchParams.get('userId');
    const userEmail = req.nextUrl.searchParams.get('userEmail');

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
      const document = await apiLimits.findOne({ userId });

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

      if (document) {
        return new NextResponse(JSON.stringify(document), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
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

        return new NextResponse(JSON.stringify(userInfo), {
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error: any) {
      return new NextResponse(JSON.stringify({ error: `Could not fetch or create user limits, an error occurred: ${error.message}` }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
}
