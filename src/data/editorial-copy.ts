export const VERBATIM_WHATS_IN_A_BOWL_COPY =
  "An Açaí Bowl is your ultimate build-your-own adventure in a bowl—starting with our delicious, nutrient-rich superfood base: smooth, refreshing açaí sorbet. From there, it's all about YOU. Layer in your choice of CRUNCH, your favorite fruits, mouthwatering toppings, and a drizzle of sauce to finish it off. Every bowl is a perfect mix of flavor, texture, and feel-good energy—fresh, fun, and made exactly how you like it." as const;

export const VERBATIM_FOUNDER_STORY_COPY =
  "In 2024, after moving to Cody, Megan put the idea of an Açaí Bowl Food Truck into action. Balancing a heavy workload—raising five children, relocating to a new state, continuing to work in Montana, and building a new business—she poured her time, energy, and creativity into launching Altitude Açaí. With hands-on support from her husband, they brought the food truck and now a Brick and Mortar to life, and began serving at local summer events and the Park County community all year long." as const;

export type LandingSectionId =
  | "whats-in-a-bowl"
  | "signature-bowls"
  | "build-your-own"
  | "our-story"
  | "hours"
  | "visit-us";

export type BowlLayerId =
  | "acai-sorbet"
  | "crunch"
  | "favorite-fruit"
  | "topping"
  | "sauce";

export type SeasonKey = "spring" | "summer" | "fall" | "winter";

export interface NavLinkCopy {
  readonly id: LandingSectionId;
  readonly label: string;
}

export interface NavigationCopy {
  readonly brandLabel: string;
  readonly skipToContent: string;
  readonly mobileMenuOpenLabel: string;
  readonly mobileMenuCloseLabel: string;
  readonly links: readonly NavLinkCopy[];
  readonly primaryCta: string;
}

export interface ActionLinkCopy {
  readonly label: string;
  readonly ariaLabel?: string;
  readonly href: string;
}

export interface HeroCopy {
  readonly locationTag: string;
  readonly headline: string;
  readonly subhead: string;
  readonly primaryCta: ActionLinkCopy & {
    readonly address: string;
  };
  readonly secondaryCta: ActionLinkCopy & {
    readonly handle: string;
  };
  readonly quickFacts: readonly string[];
  readonly logoAlt: string;
}

export interface BowlAnatomyLayerCopy {
  readonly id: BowlLayerId;
  readonly stepNumber: number;
  readonly name: string;
  readonly shortLabel: string;
  readonly summary: string;
}

export interface WhatsInABowlCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly officialParagraph: typeof VERBATIM_WHATS_IN_A_BOWL_COPY;
  readonly interactionPrompt: string;
  readonly layerOrderNote: string;
  readonly layers: readonly BowlAnatomyLayerCopy[];
}

export interface SignatureBowlsCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly sizesLabel: string;
  readonly sizes: readonly ["12 oz Bowl", "16 oz Bowl"];
  readonly baseRule: string;
  readonly inStoreNote: string;
  readonly ingredientsLabel: string;
}

export interface BuilderCategoryCopy {
  readonly title: string;
  readonly selectionLimit: number;
  readonly ruleText: string;
}

export interface CreateYourOwnCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly officialRule: string;
  readonly baseIncluded: string;
  readonly sizeSectionLabel: string;
  readonly categories: {
    readonly fruits: BuilderCategoryCopy;
    readonly toppings: BuilderCategoryCopy;
    readonly sauces: BuilderCategoryCopy;
  };
  readonly previewPanel: {
    readonly title: string;
    readonly emptyState: string;
    readonly baseIncludedBadge: string;
    readonly selectedCountTemplate: string;
    readonly limitReachedMessage: string;
    readonly resetButtonLabel: string;
    readonly visitHint: string;
  };
}

export interface StoryMilestoneCopy {
  readonly label: string;
  readonly detail: string;
}

export interface FounderStoryCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly officialParagraph: typeof VERBATIM_FOUNDER_STORY_COPY;
  readonly milestones: readonly StoryMilestoneCopy[];
}

export interface SeasonTabCopy {
  readonly label: string;
  readonly summary: string;
}

export interface SeasonalHoursCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly timezoneNote: string;
  readonly springNotice: string;
  readonly status: {
    readonly openNow: string;
    readonly closedPrefix: string;
    readonly closedDayLabel: string;
    readonly openDayPrefix: string;
    readonly todayBadge: string;
    readonly activeSeasonBadge: string;
  };
  readonly seasonTabs: Record<SeasonKey, SeasonTabCopy>;
}

export interface LocationContactCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly address: {
    readonly businessName: string;
    readonly street: string;
    readonly cityStateZip: string;
    readonly directionsAddress: string;
    readonly fullDisplay: string;
  };
  readonly channels: {
    readonly googleMaps: ActionLinkCopy & { readonly subtitle: string };
    readonly instagram: ActionLinkCopy & { readonly handle: string };
    readonly facebook: ActionLinkCopy;
    readonly phone: ActionLinkCopy & { readonly display: string };
    readonly email: ActionLinkCopy & { readonly display: string };
  };
  readonly mapEmbedTitle: string;
}

export interface FooterCopy {
  readonly brandName: string;
  readonly tagline: string;
  readonly addressLine: string;
  readonly phoneLabel: string;
  readonly emailLabel: string;
  readonly instagramLabel: string;
  readonly facebookLabel: string;
  readonly directionsLabel: string;
  readonly navigationHeading: string;
  readonly visitHeading: string;
  readonly connectHeading: string;
  readonly closingNote: string;
}

export interface EditorialCopy {
  readonly navigation: NavigationCopy;
  readonly hero: HeroCopy;
  readonly whatsInABowl: WhatsInABowlCopy;
  readonly signatureBowls: SignatureBowlsCopy;
  readonly createYourOwn: CreateYourOwnCopy;
  readonly founderStory: FounderStoryCopy;
  readonly seasonalHours: SeasonalHoursCopy;
  readonly locationAndContact: LocationContactCopy;
  readonly footer: FooterCopy;
}

export const editorialCopy: EditorialCopy = {
  navigation: {
    brandLabel: "Altitude Açaí",
    skipToContent: "Skip to main content",
    mobileMenuOpenLabel: "Open navigation menu",
    mobileMenuCloseLabel: "Close navigation menu",
    links: [
      { id: "whats-in-a-bowl", label: "Inside a Bowl" },
      { id: "signature-bowls", label: "Signature Bowls" },
      { id: "build-your-own", label: "Build Your Own" },
      { id: "our-story", label: "Our Story" },
      { id: "hours", label: "Hours" },
      { id: "visit-us", label: "Visit Us" },
    ],
    primaryCta: "Get Directions",
  },
  hero: {
    locationTag: "Cody, Wyoming",
    headline: "Handcrafted Açaí Bowls in Cody, Wyoming",
    subhead:
      "Smooth açaí sorbet with crunchy granola, fresh fruit, and your pick of toppings at 1302 Beck Avenue.",
    primaryCta: {
      label: "Get Directions",
      ariaLabel:
        "Get directions to Altitude Açaí at 1302 Beck Avenue, Cody, WY 82414",
      address: "1302 Beck Avenue, Cody, WY 82414",
      href: "https://www.google.com/maps/search/?api=1&query=1302+Beck+Avenue%2C+Cody%2C+WY+82414",
    },
    secondaryCta: {
      label: "Follow @altitude_acai",
      ariaLabel: "Follow @altitude_acai on Instagram",
      handle: "@altitude_acai",
      href: "https://www.instagram.com/altitude_acai",
    },
    quickFacts: [
      "12 oz and 16 oz bowls",
      "Açaí sorbet and granola base",
      "1302 Beck Avenue, Cody",
    ],
    logoAlt: "Altitude Açaí logo",
  },
  whatsInABowl: {
    eyebrow: "Five Simple Layers",
    title: "What's in an Açaí Bowl?",
    officialParagraph: VERBATIM_WHATS_IN_A_BOWL_COPY,
    interactionPrompt:
      "Select any layer in the diagram to see what goes into it.",
    layerOrderNote: "Stacked from bottom to top",
    layers: [
      {
        id: "acai-sorbet",
        stepNumber: 1,
        name: "ACAI SORBET",
        shortLabel: "Base",
        summary: "Smooth, refreshing açaí sorbet forms the base of every bowl.",
      },
      {
        id: "crunch",
        stepNumber: 2,
        name: "CRUNCH",
        shortLabel: "Crunch",
        summary:
          "Granola is included in every bowl, with a protein granola option available.",
      },
      {
        id: "favorite-fruit",
        stepNumber: 3,
        name: "FAVORITE FRUIT",
        shortLabel: "Fruit",
        summary:
          "Strawberries, blueberries, blackberries, raspberries, pineapple, mango, and bananas.",
      },
      {
        id: "topping",
        stepNumber: 4,
        name: "TOPPING",
        shortLabel: "Toppings",
        summary:
          "Hemp hearts, chia seeds, flax seeds, pumpkin seeds, coconut shavings, slivered almonds, dark chocolate shavings, rolled oats, graham crackers, and bee pollen.",
      },
      {
        id: "sauce",
        stepNumber: 5,
        name: "SAUCE",
        shortLabel: "Sauce",
        summary:
          "Honey, peanut butter, almond butter, dark chocolate, or Nutella drizzled on top.",
      },
    ],
  },
  signatureBowls: {
    eyebrow: "House Combinations",
    title: "Signature Açaí Bowls",
    intro:
      "Six house combinations served in 12 oz and 16 oz bowls. Every bowl starts with our açaí sorbet base and granola.",
    sizesLabel: "Available Sizes",
    sizes: ["12 oz Bowl", "16 oz Bowl"],
    baseRule: "All bowls start with Açaí Base and Granola",
    inStoreNote:
      "Visit 1302 Beck Avenue in Cody to enjoy any signature bowl fresh at the shop.",
    ingredientsLabel: "Ingredients",
  },
  createYourOwn: {
    eyebrow: "Custom Combinations",
    title: "Create Your Own Bowl",
    intro:
      "Choose a bowl size, then mix up to three fruits, two toppings, and one sauce over açaí sorbet and granola.",
    officialRule: "Pick up to: 3 Fruits, 2 Toppings, 1 Sauce",
    baseIncluded: "Açaí Sorbet Base and Granola",
    sizeSectionLabel: "Bowl Size",
    categories: {
      fruits: {
        title: "Fruits",
        selectionLimit: 3,
        ruleText: "Pick up to 3",
      },
      toppings: {
        title: "Toppings",
        selectionLimit: 2,
        ruleText: "Granola base included. Pick up to 2",
      },
      sauces: {
        title: "Sauces",
        selectionLimit: 1,
        ruleText: "Pick 1",
      },
    },
    previewPanel: {
      title: "Your Bowl Preview",
      emptyState: "Pick fruits, toppings, and a sauce to preview your bowl.",
      baseIncludedBadge: "Base Included: Açaí Sorbet and Granola",
      selectedCountTemplate: "{count} of {max} selected",
      limitReachedMessage:
        "Category limit reached. Remove an item to pick another.",
      resetButtonLabel: "Clear Selections",
      visitHint: "Bring your favorite mix to 1302 Beck Avenue in Cody.",
    },
  },
  founderStory: {
    eyebrow: "Cody, Wyoming",
    title: "How Altitude Açaí Started in Cody",
    officialParagraph: VERBATIM_FOUNDER_STORY_COPY,
    milestones: [
      {
        label: "2024",
        detail: "Moved to Cody and launched the Altitude Açaí food truck",
      },
      {
        label: "Summer Events",
        detail: "Served bowls across local Park County gatherings",
      },
      {
        label: "Brick and Mortar",
        detail: "Opened year-round at 1302 Beck Avenue, Suite C",
      },
    ],
  },
  seasonalHours: {
    eyebrow: "Mountain Time in Cody",
    title: "Seasonal Hours",
    intro:
      "Our storefront hours shift with Cody's seasons. Today's status updates automatically for Mountain Time.",
    timezoneNote: "Times follow Mountain Time in Cody, Wyoming.",
    springNotice:
      "Seasonal hours automatically updated for Cody, WY. Check our Instagram @altitude_acai for weather or holiday updates.",
    status: {
      openNow: "Open Now in Cody, WY",
      closedPrefix: "Currently Closed",
      closedDayLabel: "CLOSED",
      openDayPrefix: "OPEN",
      todayBadge: "Today",
      activeSeasonBadge: "Current Season",
    },
    seasonTabs: {
      spring: {
        label: "Spring",
        summary:
          "Transitional Cody storefront hours with weather and holiday updates posted on Instagram.",
      },
      summer: {
        label: "Summer",
        summary:
          "Open daily 7:30 AM to 2:30 PM, plus Friday and Saturday evenings from 5:00 PM to 8:00 PM.",
      },
      fall: {
        label: "Fall",
        summary:
          "Starting in October: Wednesday through Saturday 8:00 AM to 2:00 PM, Sunday 11:00 AM to 2:00 PM, closed Monday and Tuesday.",
      },
      winter: {
        label: "Winter",
        summary:
          "Open Wednesday through Saturday 8:00 AM to 2:00 PM, closed Sunday through Tuesday.",
      },
    },
  },
  locationAndContact: {
    eyebrow: "1302 Beck Avenue, Suite C",
    title: "Visit Us in Cody",
    intro:
      "Stop by our Beck Avenue storefront, call the shop, or follow along for seasonal hours and summer food truck events.",
    address: {
      businessName: "Altitude Açaí",
      street: "1302 Beck Avenue, Suite C",
      cityStateZip: "Cody, WY 82414",
      directionsAddress: "1302 Beck Avenue, Cody, WY 82414",
      fullDisplay: "1302 Beck Avenue, Suite C, Cody, WY 82414",
    },
    channels: {
      googleMaps: {
        label: "Get Directions",
        subtitle: "1302 Beck Avenue, Cody, WY 82414",
        ariaLabel:
          "Open Google Maps directions to 1302 Beck Avenue, Cody, WY 82414",
        href: "https://www.google.com/maps/search/?api=1&query=1302+Beck+Avenue%2C+Cody%2C+WY+82414",
      },
      instagram: {
        label: "Follow @altitude_acai",
        handle: "@altitude_acai",
        ariaLabel: "Follow Altitude Açaí on Instagram at @altitude_acai",
        href: "https://www.instagram.com/altitude_acai",
      },
      facebook: {
        label: "Altitude Açaí on Facebook",
        ariaLabel: "Visit Altitude Açaí on Facebook",
        href: "https://web.facebook.com/people/Altitude-A%C3%A7a%C3%AD/61561749391480/",
      },
      phone: {
        label: "Call 307-527-0812",
        display: "307-527-0812",
        ariaLabel: "Call Altitude Açaí at 307-527-0812",
        href: "tel:307-527-0812",
      },
      email: {
        label: "altitudeacai@gmail.com",
        display: "altitudeacai@gmail.com",
        ariaLabel: "Email Altitude Açaí at altitudeacai@gmail.com",
        href: "mailto:altitudeacai@gmail.com",
      },
    },
    mapEmbedTitle:
      "Map showing Altitude Açaí at 1302 Beck Avenue, Cody, WY 82414",
  },
  footer: {
    brandName: "Altitude Açaí",
    tagline:
      "Açaí bowls in Cody, Wyoming, from our Beck Avenue shop and summer food truck.",
    addressLine: "1302 Beck Avenue, Suite C, Cody, WY 82414",
    phoneLabel: "Call 307-527-0812",
    emailLabel: "altitudeacai@gmail.com",
    instagramLabel: "Follow @altitude_acai",
    facebookLabel: "Altitude Açaí on Facebook",
    directionsLabel: "Get Directions",
    navigationHeading: "Explore",
    visitHeading: "Cody Storefront",
    connectHeading: "Connect",
    closingNote:
      "Altitude Açaí in Cody, Wyoming. Serving Park County all year long.",
  },
} as const;
