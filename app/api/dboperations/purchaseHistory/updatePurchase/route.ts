// api/dboperations/apiLimits/checkLimit/route.ts
import { NextResponse, NextRequest } from "next/server";
import clientPromise from '@/lib/mongodb';
import { PurchaseHistoryUpdate } from "@/lib/typesserver";

export async function POST(req: NextRequest) {
  const purchaseUpdateInfo: PurchaseHistoryUpdate = await req.json();
  const client = await clientPromise;
  const db = client.db("userData");
  const purchaseHistory = db.collection("purchaseHistory");
  try {
    // Check if the entry already exists
    const existingPurchaseHistory = await purchaseHistory.findOne({ stripeSubscriptionId: purchaseUpdateInfo.stripeSubscriptionId });
    // console.log(existingPurchaseHistory);
    if (existingPurchaseHistory) {
      // If the entry exists, update only the specified fields

      if (purchaseUpdateInfo.cancellationReason !== "") {
        console.log(`Subscription cancellation requested / initiated reason ${purchaseUpdateInfo.cancellationReason}`);
        
        const result = await purchaseHistory.updateOne(
            { stripeSubscriptionId: purchaseUpdateInfo.stripeSubscriptionId },
            {
              $set: {
                subscriptionStatus: purchaseUpdateInfo.cancellationReason,
                lastUpdatedAt: new Date().toISOString()
              }
            }
          );
          return new NextResponse(JSON.stringify({ message: 'Purchase History updated successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } else {
        console.log('Subscription renewed after cancellation');
        const result = await purchaseHistory.updateOne(
            { stripeSubscriptionId: purchaseUpdateInfo.stripeSubscriptionId },
            {
              $set: {
                subscriptionStatus: purchaseUpdateInfo.subscriptionStatus,
                lastUpdatedAt: new Date().toISOString()
              }
            }
          );
          return new NextResponse(JSON.stringify({ message: 'Purchase History updated successfully.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    }
    else {
      return new NextResponse("No Subscription found", { status: 201 });
    } 
        
  } catch (error) {
    console.error('Error in purchaseHistory/updatePurchase API:', error);
    return new NextResponse("Error: Something went wrong", { status: 500 });
  }
}
