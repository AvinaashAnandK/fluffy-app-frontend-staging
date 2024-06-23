"use client";
import { useState } from "react";
import { useProModal } from "@/hooks/zustand-store-fluffy";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import PricingCardComponent from "./modalComps/pricing-card";
import { pricingTiers } from "@/lib/stripeConstants";

const ProRepoModal = () => {
  const { isOpen, onClose } = useProModal();
  const [loading, setLoading] = useState(false);
  const tiers = pricingTiers;
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const onSubscribe = async (billingCycle: string, plan: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        billingCycle,
        plan,
      });
      const response = await axios.get(`/api/stripe?${params.toString()}`);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("STRIPE_CLIENT_ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  
  const onContact = async () => {
    window.open('https://outlook.office.com/bookwithme/user/42e3f2524d6d4e25a27a107d1df2051a@fluffystack.com/meetingtype/K7O7R4v2xUSeGMWORw3APQ2?anonymous&ep=mlink', '_blank')
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-10/12 max-w-full h-5/6 max-h-full">
        <ScrollArea className="h-full">
          <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Pricing
              </h1>
              <p className="text-gray-500 dark:text-gray-400 w-2/4 mx-auto">
                {"From startups working with OS libraries to Data Scientists and Researchers working with cutting-edge ML repos, we've got you covered!"}
              </p>
              <div className="bg-slate-600 text-white px-4 py-2 rounded-xl w-fit text-sm font-medium flex justify-center items-center mx-auto">
                <span className="mr-2"> 🎁 </span> Get 1 Month Free on all subscriptions!
            </div>
              <div className="inline-flex items-center rounded-md bg-gray-100 p-1 dark:bg-gray-800">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`${
                    billingCycle === "monthly"
                      ? "bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50"
                      : "text-gray-500 dark:text-gray-400 "
                  } rounded-md px-4 py-2 text-sm font-medium transition-colors`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("yearly")}
                  className={`${
                    billingCycle === "yearly"
                      ? "bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50"
                      : "text-gray-500  dark:text-gray-400 "
                  } rounded-md px-4 py-2 text-sm font-medium transition-colors`}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {tiers.map((tier) => (
                <PricingCardComponent
                  key={tier.id}
                  pricing={tier}
                  billingCycle={billingCycle}
                  onSubscribe={onSubscribe}
                  onContact={onContact}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProRepoModal;
