import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = body.payload;
    const { chatId, title, userId, path, repoUrl, repoId, messages, retrievedInfo } = payload;

    console.log(payload)
    console.log("Printing from the prisma call:",messages)
    console.log("Printing from the prisma call:",messages.length)

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const existingChat = await prismadb.chat.findUnique({
      where: {
        chatId: chatId,
      },
    });

    if (existingChat) {
      const updatedRetrievedInfo = existingChat.retrievedInfo ? [...existingChat.retrievedInfo, ...retrievedInfo] : [retrievedInfo];
      await prismadb.chat.update({
        where: {
          chatId: chatId,
        },
        data: {
          retrievedInfo: updatedRetrievedInfo,
          messages: {
            push: messages,
          },
        },
      });
      return new NextResponse(JSON.stringify({ message: "Chat Updated" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      await prismadb.chat.create({
        data: {
          chatId,
          title,
          userId,
          path,
          repoUrl,
          repoId,
          messages: messages,
          retrievedInfo: [retrievedInfo],
        },
      });
      return new NextResponse(JSON.stringify({ message: "Chat Created" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error("Failed to create or update chat:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
