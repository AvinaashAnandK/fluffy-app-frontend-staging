"use client";

import React, { useState } from "react";
import { Zap,  } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useProModal } from "@/hooks/zustand-store-fluffy";
import { Button } from "@/components/ui/button";
import { SpinnerGap } from "@phosphor-icons/react";

export default function SubscriptionButton({
  isPro = false
}: {
  isPro: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { onOpen } = useProModal();
  

  const onClick = async () => {
    if (isPro) {
      try {
        setLoading(true);
        const response = await axios.get("/api/stripe");
  
        window.location.href = response.data.url;
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
    else {
      onOpen();
      return;
  }
  };

  return (
    <Button
      disabled={loading}
      variant={isPro ? "plainpurple" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      {loading && <SpinnerGap className="w-4 h-4 ml-2 fill-white animate-spin"/>}
    </Button>
  );
}