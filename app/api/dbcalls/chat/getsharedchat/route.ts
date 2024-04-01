import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { chatId, repoId } = await req.json();

  if (!chatId || !repoId) {
    return new NextResponse("Missing Parameters", { status: 401 });
  }

  try {
    const chat = await prismadb.chat.findFirst({
      where: {
        AND: [
          { chatId: chatId },
          { repoId: repoId },
        ],
      },
    });

    if (!chat) {
      return new NextResponse("No shared chat found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(chat), { status: 200 });
  } catch (error) {
    console.error("Failed to get chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
