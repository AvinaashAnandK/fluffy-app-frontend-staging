// api/dboperations/apiLimits/createLimit/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { ApiLimits } from "@/lib/typesserver";


export async function POST(req: NextRequest) {
  const userInfo: ApiLimits = await req.json();
  if (!userInfo.userId) {
    return new NextResponse("Error: Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("userData");
    const apiLimits = db.collection("apiLimits");

    if (await apiLimits.countDocuments({ userId: userInfo.userId }) === 0) {
      await apiLimits.insertOne({ ...userInfo, createdAt: new Date(), lastUpdatedAt: new Date() });
      return new NextResponse(JSON.stringify({ message: "User limits added successfully" }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new NextResponse(JSON.stringify({ error: "User already exists." }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: `Could not add user, an error occurred: ${error.message}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
