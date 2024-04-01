import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();
  const { chatId, repoId } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!chatId || !repoId) {
    return new NextResponse("Missing Parameters", { status: 401 });
  }

  try {
    const updatedChat = await prismadb.chat.update({
        where: {
          chatId: chatId,
        },
        data: {
            sharePath: `/share/${chatId}/repochat/${repoId}`, // Example sharePath, adjust as needed
        },
      });

      return new NextResponse(JSON.stringify(updatedChat), { status: 200 });
    } catch (error) {
      console.error("Failed to share chat:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
}
