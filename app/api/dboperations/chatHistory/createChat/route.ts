// api/dboperations/chatHistory/createChat/route.ts
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
  chat_id: string;
  repo_id: string;
  uniqueId?: string;
  repo_url: string;
  repo_name: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  createdAt: string;
  lastUpdatedAt: string;
  userId: string;
  path: string;
  sharePath: string;
  shareSetting: string;
  messages: Message[];
  includeChatInSearch: boolean;
}

export async function POST(req: NextRequest) {
  const { chat_id, repo_id, ...chatInfo } = await req.json() as Chat;
  const uniqueId = `${chat_id}${repo_id}`;
  const dbClient = await clientPromise;
  const db = dbClient.db("repoChat");  
  const chatHistory = db.collection("chatHistory"); 

  try {
    const existingChat = await chatHistory.findOne({ uniqueId: uniqueId });
    if (existingChat) {
      return new NextResponse(JSON.stringify({ message: 'Chat already exists.' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    const newChat = {
      ...chatInfo,
      uniqueId,
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    };
    await chatHistory.insertOne(newChat);
    return new NextResponse(JSON.stringify({ message: 'Chat saved successfully.' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: 'Chat could not be saved.', error: e }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
