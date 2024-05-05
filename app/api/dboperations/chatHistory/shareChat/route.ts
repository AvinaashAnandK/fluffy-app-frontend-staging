// api/dboperations/chatHistory/shareChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const uniqueId = url.searchParams.get('uniqueId');
  const sharePath = url.searchParams.get('sharePath');
  const shareSetting = url.searchParams.get('shareSetting');

  if (!uniqueId || !sharePath || !shareSetting) {
    return new NextResponse(JSON.stringify({ message: 'Invalid input.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const dbClient = await clientPromise;
  const db = dbClient.db("repoChat");  
  const chatHistory = db.collection("chatHistory"); 

  try {
    const result = await chatHistory.updateOne(
      { uniqueId },
      { $set: { sharePath: sharePath, shareSetting: shareSetting, lastUpdatedAt: new Date().toISOString() } }
    );

    if (result.matchedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'No chat found with the provided unique ID.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new NextResponse(JSON.stringify({ message: 'Chat shared successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error in sharing chat:', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred during the share operation.', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
