// api/dboperations/chatHistory/createChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { Chat } from "@/lib/typesserver";

export async function POST(req: NextRequest) {
  const chatInfo: Chat = await req.json();

  const dbClient = await clientPromise;
  const db = dbClient.db("repoChat");
  const chatHistory = db.collection("chatHistory");

  try {
    // Check if the chat already exists
    const existingChat = await chatHistory.findOne({ uniqueId: chatInfo.uniqueId });

    if (existingChat) {
      // If the chat exists, update only the specified fields
      const result = await chatHistory.updateOne(
        { uniqueId: chatInfo.uniqueId },
        {
          $set: {
            messages: chatInfo.messages,
            embedText: chatInfo.embedText,
            shareSettings: chatInfo.shareSettings,
            lastUpdatedAt: new Date().toISOString()
          }
        }
      );

      if (result.modifiedCount === 0) {
        return new NextResponse(JSON.stringify({ message: 'No update was made, the provided data may be identical to the existing data.' }), { status: 304, headers: { 'Content-Type': 'application/json' } });
      }

      return new NextResponse(JSON.stringify({ message: 'Chat updated successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      // If the chat does not exist, insert it as a new document
      await chatHistory.insertOne(chatInfo);
      return new NextResponse(JSON.stringify({ message: 'Chat created successfully.' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error('Error handling chat operation:', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred during the chat operation.', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
