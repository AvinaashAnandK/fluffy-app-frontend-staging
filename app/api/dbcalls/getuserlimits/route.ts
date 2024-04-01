import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { MAX_COUNTS, DEFAULT_USER_TYPE, EMAIL_DOMAIN_USER_TYPES } from '@/constants';

// Handler for GET requests
export async function GET() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userRepoLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (userRepoLimit) {
    const userType = userRepoLimit.userType;
    let MAX_REPO_COUNT, MAX_CHAT_COUNT;

    switch (userType) {
      case 'FREE':
        MAX_REPO_COUNT = MAX_COUNTS.FREE.REPO;
        MAX_CHAT_COUNT = MAX_COUNTS.FREE.CHAT;
        break;
      case 'BETA':
        MAX_REPO_COUNT = MAX_COUNTS.BETA.REPO;
        MAX_CHAT_COUNT = MAX_COUNTS.BETA.CHAT;
        break;
      case 'ENT':
        MAX_REPO_COUNT = MAX_COUNTS.ENT.REPO;
        MAX_CHAT_COUNT = MAX_COUNTS.ENT.CHAT;
        break;
      default:
        MAX_REPO_COUNT = 2;
        MAX_CHAT_COUNT = 10;
        break;
    }

    const data = {
      "repoAddedCount": userRepoLimit.repoAddedCount,
      "chatsCreatedCount": userRepoLimit.chatsCreatedCount,
      "maxRepoCount": MAX_REPO_COUNT,
      "maxChatCount": MAX_CHAT_COUNT,
    };

    return NextResponse.json(data);

  } else {
    if (!sessionClaims) {
      return new NextResponse("sessionClaims unavailable", { status: 401 });
    }

    const USER_EMAIL: string | undefined = sessionClaims?.email as string | undefined;

    if (!USER_EMAIL) {
      return new NextResponse("Email unavailable", { status: 401 });
    }

    let USER_TYPE: string = DEFAULT_USER_TYPE;

    if (USER_EMAIL) {
      USER_TYPE = EMAIL_DOMAIN_USER_TYPES[USER_EMAIL.split('@')[1]] || DEFAULT_USER_TYPE;
    }

    if (!USER_TYPE || !['ENT', 'BETA', 'FREE'].includes(USER_TYPE)) {
      USER_TYPE = DEFAULT_USER_TYPE; // Use default if no specific or domain-based mapping is found
    }

    await prismadb.userApiLimit.create({
      data: { userId: userId, userType: USER_TYPE, repoAddedCount: 0, chatsCreatedCount: 0 },
    });

    let MAX_REPO_COUNT, MAX_CHAT_COUNT;

    switch (USER_TYPE) {
      case 'FREE':
        MAX_REPO_COUNT = MAX_COUNTS.FREE.REPO;
        MAX_CHAT_COUNT = MAX_COUNTS.FREE.CHAT;
        break;
      case 'BETA':
        MAX_REPO_COUNT = MAX_COUNTS.BETA.REPO;
        MAX_CHAT_COUNT = MAX_COUNTS.BETA.CHAT;
        break;
      case 'ENT':
        MAX_REPO_COUNT = MAX_COUNTS.ENT.REPO;
        MAX_CHAT_COUNT = MAX_COUNTS.ENT.CHAT;
        break;
      default:
        MAX_REPO_COUNT = 2;
        MAX_CHAT_COUNT = 10;
        break;
    }

    const data = {
      repoAddedCount: 0,
      chatsCreatedCount: 0,
      maxRepoCount: MAX_REPO_COUNT,
      maxChatCount: MAX_CHAT_COUNT,
    };

    return NextResponse.json(data);
  }
}
