// api/dboperations/chatHistory/updateChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { Chat } from "@/lib/typesserver";

export async function PATCH(req: NextRequest) {
  const chatInfo: Chat = await req.json();

  const dbClient = await clientPromise;
  const db = dbClient.db("repoChat");
  const chatHistory = db.collection("chatHistory");

  try {
    const result = await chatHistory.updateOne(
      { uniqueId: chatInfo.uniqueId },
      { $set: { messages: chatInfo.messages, lastUpdatedAt: new Date().toISOString() } }
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
