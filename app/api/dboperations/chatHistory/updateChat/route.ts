// api/dboperations/chatHistory/updateChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

interface Message {
  id: string;
  userMessage: string;
  llmResponse: string;
  sources: any;
  createdAt: string;
  conversationalHistory: string;
  linkedUserChats: string[];
  linkedOrgChats: string[];
  linkedCommunityChats: string[];
  webSources: any[];
  fluffyThoughts: any;
  tags: string[];
}

interface Chat {
  uniqueId: string;  
  messages: Message[];
  lastUpdatedAt?: string;
}

export async function PATCH(req: NextRequest) {
  const { uniqueId, messages } = await req.json() as Chat;
  if (!uniqueId || !messages) {
    return new NextResponse(JSON.stringify({ message: 'Invalid chat ID or messages not provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const dbClient = await clientPromise;
  const db = dbClient.db("repoChat");  
  const chatHistory = db.collection("chatHistory"); 

  try {
    const result = await chatHistory.updateOne(
      { uniqueId },
      { $set: { messages, lastUpdatedAt: new Date().toISOString() } }
    );

    if (result.matchedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'No chat found with the provided unique ID.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    if (result.modifiedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'No update was made, the provided data may be identical to the existing data.' }), { status: 304, headers: { 'Content-Type': 'application/json' } });
    }

    return new NextResponse(JSON.stringify({ message: 'Chat updated successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error in updating chat:', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred during the update.', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
