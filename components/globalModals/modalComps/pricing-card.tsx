import { Button } from "@/components/ui/button";
import { PricingTier } from "@/lib/stripeConstants";
import { CheckCircle, CircleNotch, SpinnerGap } from "@phosphor-icons/react";
import { useState } from "react";

interface PricingCardDisplayProps {
  pricing: PricingTier;
  billingCycle: "monthly" | "yearly";
  onSubscribe: (billingCycle:string, name :string) => void;
  onContact: () => void;
}

interface DiscountTagProps {
  type: string;
  text?: string;
}

const DiscountTag = ({ type, text }: DiscountTagProps) => {
  const types: { [key in 'yellow' | 'green' | 'blue']?: JSX.Element } = {
    yellow: <span className="mt-4 mb-2 mr-4 inline-block rounded-md bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400">{text}</span>,
    green: <span className="mt-4 mb-2 mr-4 inline-block rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-600 dark:bg-green-900 dark:text-green-400">{text}</span>,
    blue: <span className="mt-4 mb-2 mr-4 inline-block rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-400">{text}</span>
  };
  return types[type as 'yellow' | 'green' | 'blue'] || null;
};

const PricingCardComponent = ({ pricing, billingCycle, onSubscribe, onContact }: PricingCardDisplayProps) => {
  const [loadingButton, setLoadingButton] = useState(false);
  const price = billingCycle === "monthly" ? pricing.priceMonthly : pricing.priceYearly;
  const discountedPrice = billingCycle === "monthly" ? pricing.priceDiscountedMonthly : pricing.priceDiscountedYearly;
  const discountType = billingCycle === "monthly" ? pricing.discountTagMonthly : pricing.discountTagYearly;
  const discountTagType = billingCycle === "monthly" ? pricing.discountTagTypeMonthly : pricing.discountTagTypeYearly;
  const getBillingPeriod = (discountedPrice: string) => {
    const period = billingCycle === "monthly" ? discountedPrice.startsWith("$") ? "per month" : "" : discountedPrice.startsWith("$") ? "per year" : "";
    return period;
  };

  return (
    <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 mt-4">
      <div className="rounded-t-lg border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-magenta-vividMagenta font-bold pl-8 pt-4 pb-2 uppercase">
            {pricing.name}
          </h3>
          {discountTagType ? (
            <DiscountTag type={discountTagType} text={discountType} />
          ) : (
            <span className="mt-4 mb-2 mr-4 inline-block rounded-md bg-black px-3 py-1 text-sm font-medium text-black">
              test
            </span>
          )}
        </div>
        <div className="px-8 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-col space-y-2">
              <h3 className="text-2xl text-purple-300 font-bold">
                {pricing.nametag}
              </h3>
              <p className="text-sm h-10 overflow-hidden">
                {pricing.description}
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold ">
              {discountedPrice || price}
            </span>
            {discountedPrice && (
              <span className="text-gray-500 dark:text-gray-400 line-through">
                {price}
              </span>
            )}
            <p className="text-gray-500 dark:text-gray-400">
              {" "}
              {discountedPrice && getBillingPeriod(discountedPrice)}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-b-lg p-6 md:p-8 space-y-4 dark:bg-gray-800">
        {pricing.ctaType === "enabled" ? (
          pricing.ctaAction === "onSubscribe" ? (
            <Button
              className="w-full"
              onClick={() => {
                setLoadingButton(true);
                onSubscribe(billingCycle, pricing.name);
              }}
              disabled={loadingButton}
            >
              {loadingButton ? <CircleNotch className="w-6 h-6 ml-2 fill-purple-500 animate-spin"/> : pricing.cta}
            </Button>
          ) : (
            <Button className="w-full" onClick={onContact}>
              {pricing.cta}
            </Button>
          )
        ) : (
          <Button className="w-full" disabled={true}>
            {pricing.cta}
          </Button>
        )}
        <div className="space-y-2">
          <span className="space-y-1 text-gray-500 dark:text-white">
            {pricing.featuresByLine && pricing.featuresByLine}
          </span>
          <ul className="space-y-1 text-gray-500 dark:text-gray-400">
            {pricing.features.map((feature, index) => (
              <li key={index}>
                <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500 dark:text-green-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingCardComponent;
