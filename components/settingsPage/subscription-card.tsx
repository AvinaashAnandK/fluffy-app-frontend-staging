"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FormattedSubscription } from "@/lib/typesserver";
import { getCurrentPlan } from "@/lib/subscription";
import { CheckCircle, CircleNotch, SpinnerGap } from "@phosphor-icons/react";
import { Sparkles } from "lucide-react";
import { useProModal } from "@/hooks/zustand-store-fluffy";
import toast from "react-hot-toast";
import axios from "axios";


interface SettingsSubscriptionCardProps {
  userId: string;
  userName: string;
  userEmail: string;
}

const proFeatures = [
  `Sync unlimited repos`,
  `Unlimited queries with any repo`,
  `Early access to new features`,
];

const BasicPlanDetails = ({ onUpgrade }: { onUpgrade: () => void }) => (
  <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 mt-4 w-80">
    <div className="rounded-t-lg border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-magenta-vividMagenta font-bold pl-4 pt-4 pb-2 uppercase">
          You are on the
        </h3>
      </div>
      <div className="pl-4 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-col space-y-2">
            <h3 className="text-2xl text-purple-300 font-bold">Free Plan</h3>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-100 rounded-b-lg p-6 md:p-6 space-y-4 dark:bg-gray-800">
      <div className="space-y-2">
        <span className="space-y-1 font-medium text-gray-500 dark:text-white">
          Upgrade to pro! Pro features include:
        </span>
        <ul className="space-y-1 text-gray-500 dark:text-gray-400">
          {proFeatures.map((feature, index) => (
            <li key={index}>
              <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500 dark:text-green-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button variant="premium" className="w-full" onClick={onUpgrade}>
        Upgrade
        <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
      </Button>
    </div>
  </div>
);

interface ProPlanDetailsProps {
  subscription: FormattedSubscription;
  loading: boolean;
  onManageSubscription: () => void;
}

const ProPlanDetails = ({ subscription, loading, onManageSubscription }: ProPlanDetailsProps) => (
  <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 mt-4 w-80">
    <div className="rounded-t-lg border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-magenta-vividMagenta font-bold pl-4 pt-4 pb-2 uppercase">
          You are on the
        </h3>
      </div>
      <div className="pl-4 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-col space-y-2">
            <h3 className="text-2xl text-purple-300 font-bold">Pro Plan</h3>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-100 rounded-b-lg p-6 md:p-6 space-y-4 dark:bg-gray-800">
      <div className="space-y-2">
        <span className="space-y-1 font-medium text-gray-500 dark:text-white">Plan features</span>
        <ul className="space-y-1 text-gray-500 dark:text-gray-400">
          {proFeatures.map((feature, index) => (
            <li key={index}>
              <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500 dark:text-green-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-1">
        <p className="text-sm font-medium">Subscription Start</p>
        <p className="text-gray-500 dark:text-gray-400">{subscription.subcriptionStartDate}</p>
      </div>
      <div className="grid gap-1">
        <p className="text-sm font-medium">Billing Cycle</p>
        <p className="text-gray-500 dark:text-gray-400">{subscription.billingFrequency}</p>
      </div>
      <div className="grid gap-1">
        <p className="text-sm font-medium">Next Billing Date</p>
        <p className="text-gray-500 dark:text-gray-400">{subscription.nextBillingDate}</p>
      </div>
      <div className="grid gap-1">
        <p className="text-sm font-medium">Subscription Status</p>
        <p className="text-green-500 font-medium">{subscription.subscriptionStatus}</p>
      </div>
      <Button disabled={loading} variant="plainpurple" className="w-full" onClick={onManageSubscription}>
        {loading ? <SpinnerGap className="w-4 h-4 ml-2 fill-white animate-spin" /> : "Manage Subscription"}
      </Button>
    </div>
  </div>
);

const renderPlanDetails = (currentPlan: string | null, subscription: FormattedSubscription | null, loading: boolean, onManageSubscription: () => void) => {
  switch (currentPlan) {
    case "Basic":
      return <BasicPlanDetails onUpgrade={onManageSubscription} />;
    case "Pro":
      return <ProPlanDetails subscription={subscription!} loading={loading} onManageSubscription={onManageSubscription} />;
    default:
      return <ProPlanDetails subscription={subscription!} loading={loading} onManageSubscription={onManageSubscription} />;
  }
};

export default function SettingsSubscriptionCard({ userId, userEmail, userName }: SettingsSubscriptionCardProps) {
  const [currentPlan, setCurrentPlan] = useState<FormattedSubscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { onOpen } = useProModal();
  
  const onUpgrade = async () => {
    onOpen();
  };

  const onManageSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchPlan() {
      if (userId) {
        const plan = await getCurrentPlan(userId);
        setCurrentPlan(plan);
        console.log(plan);
      }
      setIsLoading(false);
    }
    fetchPlan();
  }, [userId]);

  return (
    <Card>
      <div className="m-4">
        <h3 className="text-xl font-semibold leading-none tracking-tight mx-4">Subscription Details</h3>
      </div>
      <CardContent>
        {isLoading && (
          <div className="items-center justify-center">
            <CircleNotch className="w-6 h-6 mx-auto fill-purple-500 animate-spin" />
          </div>
        )}
        {!isLoading && renderPlanDetails(currentPlan?.currentPlan || "Basic", currentPlan, loading, onManageSubscription)}
      </CardContent>
    </Card>
  );
}
