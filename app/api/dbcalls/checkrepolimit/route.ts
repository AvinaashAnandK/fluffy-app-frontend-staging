import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { MAX_COUNTS} from '@/constants';

export async function POST(req: Request) {
  const body = await req.json();
  const userId = body.userId
  console.log("Check Repo Limit called")
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userRepoLimit = await prismadb.userApiLimit.findUnique(
    {
        where: {
            userId
        }
    }
    );

    let MAX_CHAT_COUNT: number;

    if (userRepoLimit?.userType === 'FREE') {
    MAX_CHAT_COUNT = MAX_COUNTS.FREE.CHAT;
    } else if (userRepoLimit?.userType === 'BETA') {
    MAX_CHAT_COUNT = MAX_COUNTS.BETA.CHAT;
    } else if (userRepoLimit?.userType === 'ENT') {
    MAX_CHAT_COUNT = MAX_COUNTS.ENT.CHAT;
    } else {
    console.error('Unknown or undefined userType:', userRepoLimit?.userType);
    MAX_CHAT_COUNT = 10;
    }

    if (!userRepoLimit || userRepoLimit.chatsCreatedCount < MAX_CHAT_COUNT) {
        const data = {
            "canCreateRepo": true
          };
        return NextResponse.json(data);
    } else {
        const data = {
            "canCreateRepo": false
          };
        return NextResponse.json(data);
    }
}
