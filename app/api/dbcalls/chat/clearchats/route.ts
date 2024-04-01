import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await prismadb.chat.deleteMany({
      where: {
        userId: userId,
      },
    });

    return new NextResponse("All chats cleared", { status: 200 });
  } catch (error) {
    console.error("Failed to clear chats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
