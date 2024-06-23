// TYPES AND INTERFACES
export interface PricingTier {
  name: string;
  nametag: string;
  priceMonthly: string;
  priceYearly: string;
  stripePriceMonthly?: number;
  stripePriceYearly?: number;
  priceDiscountedMonthly?: string;
  priceDiscountedYearly?: string;
  discountTagMonthly?: string;
  discountTagYearly?: string;
  discountTagTypeMonthly?: string;
  discountTagTypeYearly?: string;
  description: string | React.ReactNode;
  features: string[];
  highlighted?: boolean;
  cta: string;
  id: string;
  featuresByLine?: string;
  ctaType?: "disabled" | "enabled";
  ctaAction?: "onSubscribe" | "onContact";
}


// CONSTANTS
export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    nametag: "Fluffy",
    id: "0",
    priceMonthly: "Free",
    priceYearly: "Free",
    description: `Perfect for personal and hobby projects.`,
    features: [
      `Query any synced public repos`,
      `5 free queries / month`,
      `Sync two new repos of any size`,
    ],
    highlighted: false,
    cta: `Current plan`,
    ctaType: "disabled",
  },
  {
    name: "Pro",
    nametag: "Fluffier",
    id: "1",
    priceMonthly: "$40",
    priceYearly: "$480",
    stripePriceMonthly:4000,
    stripePriceYearly:48000,
    priceDiscountedMonthly: "$35",
    priceDiscountedYearly: "$360",
    discountTagMonthly: "$5 off + 1 month free",
    discountTagYearly: "3 months free",
    discountTagTypeMonthly: "green",
    discountTagTypeYearly: "green",
    description: `Best for more complex repos and professional use`,
    features: [
      `Sync unlimited repos`,
      `Unlimited queries with any repo`,
      `Early access to new features`,
    ],
    highlighted: true,
    cta: `Start Pro`,
    ctaType: "enabled",
    ctaAction: "onSubscribe",
  },
  {
    name: "Enterprise",
    nametag: "Fluffiest",
    id: "2",
    priceMonthly: "Contact Us",
    priceYearly: "Contact Us",
    description: `As you grow, need more power and flexibility. Contact us to tailor your startup package!`,
    featuresByLine: `Pro plan plus`,
    features: [
      `Sync private repositories`,
      `Talk to any branch`,
      `Private queries`,
      `Early access to new features`,
    ],
    highlighted: true,
    cta: `Get in touch`,
    ctaType: "enabled",
    ctaAction: "onContact",
  },
];

export const promos_prod = {
  "first_discount_yearly": "WCxvGZyE",
};

export const price_codes_prod = {
  "monthly": "price_1PS25fP48z1TJ6IXfcJ6LHmF",
  "yearly": "price_1PS25fP48z1TJ6IXfcJ6LHmF",
}

export const promos_test = {
  "first_discount_yearly": "jDPodgNc",
};

export const price_codes_test = {
  "monthly": "price_1PTU2ZP48z1TJ6IXOnDEu2As",
  "yearly": "price_1PTU3lP48z1TJ6IXbfLKPTyS",
}