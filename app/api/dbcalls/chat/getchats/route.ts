import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();


  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const chats = await prismadb.chat.findMany({
      where: {
        userId: userId,
      },
    });

    return new NextResponse(JSON.stringify(chats), { status: 200 });
  } catch (error) {
    console.error("Failed to get chats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
