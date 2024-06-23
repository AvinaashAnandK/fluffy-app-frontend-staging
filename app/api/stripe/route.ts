// api/stripe/route.ts
import { auth,currentUser } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { fetchStripeCustomerId } from "@/lib/mongodbcalls";
import { getPlanId, getPromoId } from "@/lib/subscription";

const settingsUrl = absoluteUrl("/dashboard/settings");


export async function GET(req: NextRequest){
    const url = new URL(req.url);
    const billingCycle = url.searchParams.get('billingCycle');
    const plan = url.searchParams.get('plan');
    const planFinal = plan === "Pro" ? "Pro" : "Free";
    const frequencyFinal = billingCycle === "yearly" ? "yearly" : "monthly";
    const planId = getPlanId(planFinal, frequencyFinal);
    const promoId = getPromoId(planFinal, frequencyFinal);

    try {
        const { userId, sessionClaims } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const stripeCustomerId = await fetchStripeCustomerId(userId, user.emailAddresses[0].emailAddress);
        const userEmail = user.emailAddresses[0].emailAddress;
        const currentPlan = `${planFinal} - ${frequencyFinal}`

        if (stripeCustomerId !== "") {
            console.log(`Entering billing portal for customer: ${stripeCustomerId}`);
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        console.log(`Entering checkout session for customer: ${userId}`);

        if (frequencyFinal === "yearly") {
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "required",
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price: `${planId}`,
                        quantity: 1,
                    },
                ],
                metadata: {userId, userEmail,currentPlan },
                discounts: [{
                    coupon: promoId,
                }],
                tax_id_collection : {
                    enabled: true,
                },
                });
            
            return new NextResponse(JSON.stringify({ url: stripeSession.url }));

        }
        else {
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "required",
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price: `${planId}`,
                        quantity: 1,
                    },
                ],
                metadata: {userId, userEmail,currentPlan },
                allow_promotion_codes: true,
                tax_id_collection : {
                    enabled: true,
                },
                });
            
            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }        
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}