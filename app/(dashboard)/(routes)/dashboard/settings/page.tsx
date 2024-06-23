import React from "react";
import { Settings } from "lucide-react";
import { auth } from '@clerk/nextjs/server';

import Heading from "@/components/ui/heading";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentPlan } from "@/lib/subscription";
import SubscriptionButton from "@/components/settingsPage/subscription-button";
import { PurchaseHistory } from "@/lib/typesserver";
import SettingsSubscriptionCard from "@/components/settingsPage/subscription-card";


export default async function SettingsPage() {
  const { userId, sessionClaims } = auth();
  const userEmail: string = (sessionClaims?.email as string) || "";
  const userName: string = (sessionClaims?.fullName as string) || "";

  const userIdClean  = userId || "";

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account and subscription details."
        icon={Settings}
        iconColor="text-white"
        bgColor="bg-customco2"
      />
      <div className="p-4 w-fit mx-auto">
      <SettingsSubscriptionCard userId={userIdClean} userEmail={userEmail} userName={userName} />
    </div>
    </div>
  );
}