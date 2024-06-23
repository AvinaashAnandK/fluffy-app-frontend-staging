// api/dboperations/apiLimits/checkLimit/route.ts
import { NextResponse, NextRequest } from "next/server";
import clientPromise from '@/lib/mongodb';
import { PurchaseHistory } from "@/lib/typesserver";

export async function POST(req: NextRequest) {
  const purchaseInfo: PurchaseHistory = await req.json();
  const client = await clientPromise;
  const db = client.db("userData");
  const purchaseHistory = db.collection("purchaseHistory");

  try {
    // Check if the entry already exists
    const existingPurchaseHistory = await purchaseHistory.findOne({ userId: purchaseInfo.userId });

    if (existingPurchaseHistory) {
      // If the entry exists, update only the specified fields

      const result = await purchaseHistory.updateOne(
        { userId: purchaseInfo.userId },
        {
          $set: {
            subscriptionStatus: purchaseInfo.subscriptionStatus,
            currentPlan: purchaseInfo.currentPlan,
            subcriptionStart: purchaseInfo.subcriptionStart,
            nextBillingDate: purchaseInfo.nextBillingDate,
            stripeCustomerId: purchaseInfo.stripeCustomerId,
            stripeSubscriptionId: purchaseInfo.stripeSubscriptionId,
            stripePriceId: purchaseInfo.stripePriceId,
            stripeCurrentPeriodEnd: purchaseInfo.stripeCurrentPeriodEnd,
            lastUpdatedAt: new Date().toISOString()
          }
        }
      );

      if (result.modifiedCount === 0) {
        return new NextResponse(JSON.stringify({ message: 'No update was made, the provided data may be identical to the existing data.' }), { status: 304, headers: { 'Content-Type': 'application/json' } });
      }

      return new NextResponse(JSON.stringify({ message: 'Paid Purchase History created successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      // If the chat does not exist, insert it as a new document
      await purchaseHistory.insertOne(purchaseInfo);
      return new NextResponse(JSON.stringify({ message: 'New Purchase History created successfully.' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error('Error in purchaseHistory/createPurchase API:', error);
    return new NextResponse("Error: Something went wrong", { status: 500 });
  }
}
