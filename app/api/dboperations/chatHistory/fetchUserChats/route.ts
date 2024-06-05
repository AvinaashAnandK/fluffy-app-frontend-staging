// api/dboperations/chatHistory/fetchUserChats/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: 'Invalid user ID.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const dbClient = await clientPromise;
  const db = dbClient.db("repoChat");  
  const chatHistory = db.collection("chatHistory"); 

  try {
    const chats = await chatHistory.find({ userId: userId }).sort({ createdAt: -1 }).toArray();
    if (chats.length === 0) {
      return new NextResponse(JSON.stringify({ message: 'No chats found for the provided user ID.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new NextResponse(JSON.stringify(chats), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error in fetchUserChats API:', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred while fetching chats.', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
