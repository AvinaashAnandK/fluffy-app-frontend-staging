import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
    const body = await req.json();
    const userId = body.userId

  const userChatLimit = await prismadb.userApiLimit.findUnique({ where: { userId } });

  if (userChatLimit) {
      await prismadb.userApiLimit.update({
          where: { userId },
          data: { chatsCreatedCount: userChatLimit.chatsCreatedCount + 1 }
      });
  } else {
      await prismadb.userApiLimit.create({
          data: { userId, chatsCreatedCount: 1 }
      });
  }

    return new NextResponse("Success", { status: 200 });
}
