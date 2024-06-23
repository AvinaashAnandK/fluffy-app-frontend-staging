import React from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export default function Heading({
  description,
  icon: Icon,
  title,
  bgColor,
  iconColor
}: HeadingProps) {
  return (
    <div className="px-4 lg:px-4 items-center gap-x-3 mb-4 flex pt-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}