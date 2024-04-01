import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();
  const { chatId, repoId } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!chatId) {
    return new NextResponse("Missing Parameters", { status: 401 });
  }

  const whereClause = {
    chatId: chatId,
    userId: userId,
    ...(repoId && { repoId: repoId }), 
  };

  try {
    const chat = await prismadb.chat.findFirst({
      where: whereClause,
    });

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(chat), { status: 200 });
  } catch (error) {
    console.error("Failed to get chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
