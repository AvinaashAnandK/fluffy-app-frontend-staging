// api/dboperations/purchaseHistory/fetchCurrentSubscription/route.ts
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import clientPromise from '@/lib/mongodb';
import { PurchaseHistory } from "@/lib/typesserver";

export async function GET(req: NextRequest) {
  console.log(`Request URL: ${req.url}`)
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return new NextResponse("Error: Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("userData");
    const purchaseHistory = db.collection("purchaseHistory");
    const entry = await purchaseHistory.findOne({ userId });
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0].emailAddress;

    if (!entry) {
      const purchaseHistoryData: PurchaseHistory = {
        userId,
        userEmail: userEmail || "",
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        subscriptionStatus: "free",
        currentPlan: "Free",
        subcriptionStart: null,
        nextBillingDate: null,
        stripeCustomerId: "",
        stripeSubscriptionId: "",
        stripePriceId: "",
        stripeCurrentPeriodEnd: null,
        clickOnSubscriptionCounter: 1,
        pricePaid: 0,
      };

      return new NextResponse(JSON.stringify(purchaseHistoryData), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      const data = entry as PurchaseHistory;
      return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error) {
    console.error('Error in purchaseHistory/fetchCurrentSubscription API:', error);
    return new NextResponse("Error: Something went wrong", { status: 500 });
  }
}
