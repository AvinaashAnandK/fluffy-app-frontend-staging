// api/dboperations/apiLimits/fetchLimit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');

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
      const document = await apiLimits.findOne({ userId }, { sort: { createdAt: -1 } });

      if (document) {
        return new NextResponse(JSON.stringify(document), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        return new NextResponse(JSON.stringify({ error: "No entry found for user." }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error: any) {
      return new NextResponse(JSON.stringify({ error: `Could not fetch user limits entries, an error occurred: ${error.message}` }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
}
