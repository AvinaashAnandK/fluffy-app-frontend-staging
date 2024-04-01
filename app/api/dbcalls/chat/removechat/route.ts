import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();
  const { chatId } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!chatId) {
    return new NextResponse("Missing chatId", { status: 401 });
  }

  try {
    await prismadb.chat.deleteMany({
      where: {
        AND: [
          { chatId: chatId },
          { userId: userId },
        ],
      },
    });

    return new NextResponse("Chat removed", { status: 200 });
  } catch (error) {
    console.error("Failed to remove chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
