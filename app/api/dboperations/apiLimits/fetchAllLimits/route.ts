import {NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("userData");
    const apiLimits = db.collection("apiLimits");
    const entries = await apiLimits.find().toArray();

    if (entries.length > 0) {
      return new NextResponse(JSON.stringify(entries), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new NextResponse(JSON.stringify({ error: "No users found." }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: `An error occurred while retrieving entries: ${error.message}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
