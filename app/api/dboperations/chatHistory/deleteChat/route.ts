// api/dboperations/chatHistory/deleteChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const uniqueId = url.searchParams.get('uniqueId');

  if (!uniqueId) {
    return new NextResponse(JSON.stringify({ message: 'Invalid unique ID.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const dbClient = await clientPromise;
  const db = dbClient.db("repoChat");  
  const chatHistory = db.collection("chatHistory"); 

  try {
    const result = await chatHistory.deleteOne({ uniqueId });
    if (result.deletedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'No chat found with the provided unique ID.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new NextResponse(JSON.stringify({ message: 'Chat deleted successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error in deleting chat:', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred while deleting the chat.', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
