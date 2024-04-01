import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { MAX_COUNTS} from '@/constants';

export async function POST(req: Request) {
  const body = await req.json();
  const userId = body.userId

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userChatLimit = await prismadb.userApiLimit.findUnique(
    {
        where: {
            userId
        }
    }
    );

    let MAX_CHAT_COUNT: number;

    if (userChatLimit?.userType === 'FREE') {
    MAX_CHAT_COUNT = MAX_COUNTS.FREE.CHAT;
    } else if (userChatLimit?.userType === 'BETA') {
    MAX_CHAT_COUNT = MAX_COUNTS.BETA.CHAT;
    } else if (userChatLimit?.userType === 'ENT') {
    MAX_CHAT_COUNT = MAX_COUNTS.ENT.CHAT;
    } else {
    console.error('Unknown or undefined userType:', userChatLimit?.userType);
    MAX_CHAT_COUNT = 10;
    }

    if (!userChatLimit || userChatLimit.chatsCreatedCount < MAX_CHAT_COUNT) {
        const data = {
            "canCreateChat": true
          };
        return NextResponse.json(data);
    } else {
        const data = {
            "canCreateChat": false
          };
        return NextResponse.json(data);
    }
}
