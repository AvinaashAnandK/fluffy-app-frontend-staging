import { fetchCurrentSubscription } from "./mongodbcalls";
import { price_codes_prod, price_codes_test, promos_prod, promos_test, pricingTiers } from "./stripeConstants";
import { PurchaseHistory, FormattedSubscription } from "./typesserver";

export function getPlanId(plan: string, frequency: string) {
    // const deploymentType = "testing in prod";
    
    let sourceType = process.env.NEXT_PUBLIC_APP_URL
    ? "Prod"
    : "Test";

    // if (deploymentType === "testing in prod") {
    //     sourceType = "Test";
    // }

    if (sourceType === "Prod") {
        const plan_list = price_codes_prod;
        if (frequency === "monthly") {
            return plan_list.monthly;
        }
        else if (frequency === "yearly") {
            return plan_list.yearly;
        }
    }
    else {
        const plan_list = price_codes_test;
        if (frequency === "monthly") {
            return plan_list.monthly;
        }
        else if (frequency === "yearly") {
            return plan_list.yearly;
        }
}
}

export function getPromoId(plan: string, frequency: string) {
    // const deploymentType = "testing in prod";
    let sourceType = process.env.NEXT_PUBLIC_APP_URL
    ? "Prod"
    : "Test";

    // if (deploymentType === "testing in prod") {
    //     sourceType = "Test";
    // }

    if (sourceType === "Prod") {
        const promo_list = promos_prod;
        if (frequency === "yearly") {
            return promo_list.first_discount_yearly;
        }
        else {
            return "";
        }
    }
    else {
        const promo_list = promos_test;
        if (frequency === "yearly") {
            return promo_list.first_discount_yearly;
        }
        else {
            return "";
        }
}
}

function formatDate(dateStr: Date): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


export async function getCurrentPlan(userId: string): Promise<FormattedSubscription | null> {
    const currentPlan: PurchaseHistory = await fetchCurrentSubscription(userId);
    
    if (!currentPlan || !currentPlan.currentPlan) {
        return null;
    }

    if (currentPlan.currentPlan.includes('Pro')) {
        const formattedSubscription: FormattedSubscription = {
            currentPlan: 'Pro',
            subcriptionStartDate: currentPlan.subcriptionStart ? formatDate(currentPlan.subcriptionStart) : "",
            nextBillingDate: currentPlan.nextBillingDate ? formatDate(currentPlan.nextBillingDate) : "",
            lastUpdatedAt: currentPlan.lastUpdatedAt? formatDate(currentPlan.lastUpdatedAt) : "",
            subscriptionStatus: currentPlan.subscriptionStatus,
            subcriptionStart: currentPlan.subcriptionStart? formatDate(currentPlan.subcriptionStart) : "",
            billingFrequency: currentPlan.currentPlan.includes('monthly') ? 'Monthly' : 'Yearly',
        };
        return formattedSubscription;
    }

    return null;
}