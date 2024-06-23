// api/dboperations/purchaseHistory/fetchStripeCustomerId/route.ts
import { NextResponse, NextRequest } from "next/server";
import clientPromise from '@/lib/mongodb';
import { PurchaseHistory } from "@/lib/typesserver";

export async function GET(req: NextRequest) {
  console.log(`Request URL: ${req.url}`)
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const userEmail = url.searchParams.get('userEmail');

  if (!userId || !userEmail) {
    return new NextResponse("Error: Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("userData");
    const purchaseHistory = db.collection("purchaseHistory");
    const entry = await purchaseHistory.findOne({ userId });
  
    if (!entry) {
      const purchaseHistoryData: PurchaseHistory = {
        userId,
        userEmail,
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

      await purchaseHistory.insertOne({ ...purchaseHistoryData });

      const data = {
        stripeCustomerId: "",
      };

      return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      await purchaseHistory.updateOne(
        { userId },
        { $inc: { clickOnSubscriptionCounter: 1 }, $set: { lastUpdatedAt: new Date() } }
      );

      const stripeCustomerId = entry.stripeCustomerId;

      const data = {
        stripeCustomerId: stripeCustomerId,
      };

      return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error) {
    console.error('Error in purchaseHistory/fetchStripeCustomerId API:', error);
    return new NextResponse("Error: Something went wrong", { status: 500 });
  }
}
