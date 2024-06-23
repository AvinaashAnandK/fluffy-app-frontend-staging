import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { PurchaseHistory,PurchaseHistoryUpdate, UpdatePurchaseRequest } from "@/lib/typesserver";
import { updateStripeSubscription, createStripeSubscription, updateUserPurchase,  } from "@/lib/mongodbcalls";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 });
        }

        const userId = session.metadata.userId;
        const userEmail = session.metadata.userEmail;
        const subscriptionStatus = subscription.status;
        const currentPlan = session.metadata.currentPlan;
        const stripeSubscriptionStart = new Date(subscription.current_period_start * 1000);
        const stripeCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);
        const stripeCustomerId = subscription.customer as string;
        const stripeSubscriptionId = subscription.id;
        const stripePriceId = subscription.items.data[0].price.id;
        const pricePaid = 0;
        
        

        let purchaseHistoryObject: PurchaseHistory = {
            userId: userId,
            userEmail: userEmail,
            createdAt: new Date(),
            lastUpdatedAt: new Date(),
            subscriptionStatus: subscriptionStatus,
            currentPlan: currentPlan,
            subcriptionStart: stripeSubscriptionStart,
            nextBillingDate: stripeCurrentPeriodEnd,
            stripeCustomerId: stripeCustomerId,
            stripeSubscriptionId: stripeSubscriptionId,
            stripePriceId: stripePriceId,
            stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
            clickOnSubscriptionCounter: 1,
            pricePaid: pricePaid
          };

        const existingPurchaseHistory = await createStripeSubscription(purchaseHistoryObject);

        const repoLimit = currentPlan === "Pro - monthly" ? 100 : 1200;
        const chatsLimit = currentPlan === "Pro - monthly" ? 1000 : 12000;
        const userType = "Pro";


        let updatePurchaseRequestObject: UpdatePurchaseRequest = {
            userId: userId,
            purchaseHistory: [purchaseHistoryObject],
            repoLimit: repoLimit,
            chatsLimit: chatsLimit,
            userType: userType,
        };

        const existingApiLimits = await updateUserPurchase(updatePurchaseRequestObject);
        
        console.log(`Payment successful for session: ${session.id}`);
    }

    if (event.type === "customer.subscription.updated") {
        const subscription = await stripe.subscriptions.retrieve(session.id);

        const stripeSubscriptionId = subscription.id;
        const subscriptionStatus = subscription.status; 
        const subscriptionCancellationReason = subscription.cancellation_details?.reason || ""; 
        
        let purchaseHistoryObject: PurchaseHistoryUpdate = {
            subscriptionStatus: subscriptionStatus,
            cancellationReason: subscriptionCancellationReason,
            stripeSubscriptionId: stripeSubscriptionId,
        };
        
        const existingPurchaseHistory = await updateStripeSubscription(purchaseHistoryObject);
        console.log(`Subscription updated for session id: ${session.id}`);
    }

    return new NextResponse(null, { status: 200 });
}