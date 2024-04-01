import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  const body = await req.json();
  const userId = body.userId

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userRepoLimit = await prismadb.userApiLimit.findUnique({ where: { userId } });

  if (userRepoLimit) {
    await prismadb.userApiLimit.update({
        where: { userId },
        data: { repoAddedCount: userRepoLimit.repoAddedCount + 1 }
    });
    } else {
        await prismadb.userApiLimit.create({
            data: { userId: userId, repoAddedCount: 1 }
        });
    }
    return new NextResponse("Success", { status: 200 });
}
