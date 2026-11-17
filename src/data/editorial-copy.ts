export const VERBATIM_WHATS_IN_A_BOWL_COPY =
  "An Açaí Bowl is your ultimate build-your-own adventure in a bowl—starting with our delicious, nutrient-rich superfood base: smooth, refreshing açaí sorbet. From there, it's all about YOU. Layer in your choice of CRUNCH, your favorite fruits, mouthwatering toppings, and a drizzle of sauce to finish it off. Every bowl is a perfect mix of flavor, texture, and feel-good energy—fresh, fun, and made exactly how you like it." as const;

export const VERBATIM_FOUNDER_STORY_COPY =
  "In 2024, after moving to Cody, Megan put the idea of an Açaí Bowl Food Truck into action. Balancing a heavy workload—raising five children, relocating to a new state, continuing to work in Montana, and building a new business—she poured her time, energy, and creativity into launching Altitude Açaí. With hands-on support from her husband, they brought the food truck and now a Brick and Mortar to life, and began serving at local summer events and the Park County community all year long." as const;

export type RouteTarget =
  | '/#whats-in-a-bowl'
  | '/menu'
  | '/#hours'
  | '/#visit-us';

export type BowlLayerId =
  | 'acai-sorbet'
  | 'crunch'
  | 'favorite-fruit'
  | 'topping'
  | 'sauce';

export type SeasonKey = 'spring' | 'summer' | 'fall' | 'winter';

export interface NavLinkCopy {
  readonly id: string;
  readonly label: string;
  readonly to: RouteTarget;
}

export interface EditorialCopy {
  readonly navigation: {
    readonly brandLabel: string;
    readonly skipToContent: string;
    readonly mobileMenuOpenLabel: string;
    readonly mobileMenuCloseLabel: string;
    readonly links: readonly NavLinkCopy[];
    readonly primaryCta: string;
    readonly primaryCtaAria: string;
  };
  readonly hero: {
    readonly badge: string;
    readonly headline: string;
    readonly subhead: string;
    readonly primaryCta: {
      readonly label: string;
      readonly to: '/menu';
      readonly ariaLabel: string;
    };
    readonly secondaryCta: {
      readonly label: string;
      readonly ariaLabel: string;
    };
    readonly logoAlt: string;
  };
  readonly whatsInABowl: {
    readonly title: string;
    readonly officialParagraph: typeof VERBATIM_WHATS_IN_A_BOWL_COPY;
    readonly interactionPrompt: string;
    readonly layerOrderNote: string;
    readonly layers: readonly {
      readonly id: BowlLayerId;
      readonly stepNumber: number;
      readonly name: string;
      readonly summary: string;
    }[];
  };
  readonly featuredPreview: {
    readonly title: string;
    readonly intro: string;
    readonly ctaLabel: string;
    readonly ctaTo: '/menu';
    readonly featuredIds: readonly ['mountain-man', 'montana-mama', 'goldilocks'];
  };
  readonly menuPage: {
    readonly title: string;
    readonly intro: string;
    readonly sizes: readonly ['12 oz Bowl', '16 oz Bowl'];
    readonly baseRule: string;
    readonly signatureSectionTitle: string;
    readonly createYourOwn: {
      readonly title: string;
      readonly intro: string;
      readonly officialRule: string;
      readonly categories: {
        readonly fruits: {
          readonly title: string;
          readonly selectionLimit: 3;
          readonly ruleText: string;
        };
        readonly toppings: {
          readonly title: string;
          readonly selectionLimit: 2;
          readonly ruleText: string;
        };
        readonly sauces: {
          readonly title: string;
          readonly selectionLimit: 1;
          readonly ruleText: string;
        };
      };
      readonly previewPanel: {
        readonly title: string;
        readonly emptyState: string;
        readonly selectedCountTemplate: string;
        readonly resetButtonLabel: string;
      };
    };
  };
  readonly founderStory: {
    readonly title: string;
    readonly officialParagraph: typeof VERBATIM_FOUNDER_STORY_COPY;
    readonly milestones: readonly {
      readonly label: string;
      readonly detail: string;
    }[];
  };
  readonly seasonalHours: {
    readonly title: string;
    readonly intro: string;
    readonly springNotice: string;
    readonly status: {
      readonly closedDayLabel: string;
      readonly todayBadge: string;
      readonly activeSeasonBadge: string;
    };
    readonly seasonTabs: Record<
      SeasonKey,
      {
        readonly label: string;
        readonly summary: string;
      }
    >;
    readonly foodTruckBanner: {
      readonly title: string;
      readonly description: string;
      readonly instagramLabel: string;
      readonly facebookLabel: string;
    };
  };
  readonly locationAndContact: {
    readonly title: string;
    readonly intro: string;
    readonly cityRegionDisplay: string;
    readonly addressLine: string;
    readonly channels: {
      readonly googleMaps: {
        readonly label: string;
        readonly ariaLabel: string;
      };
      readonly instagram: {
        readonly label: string;
        readonly ariaLabel: string;
      };
      readonly facebook: {
        readonly label: string;
        readonly ariaLabel: string;
      };
      readonly phone: {
        readonly label: string;
        readonly ariaLabel: string;
        readonly href: string;
      };
      readonly email: {
        readonly label: string;
        readonly ariaLabel: string;
        readonly href: string;
      };
    };
    readonly mapEmbedTitle: string;
  };
  readonly footer: {
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
  };
  readonly notFound: {
    readonly heading: string;
    readonly ctaLabel: string;
    readonly bowlIllustrationAlt: string;
  };
}

export const editorialCopy: EditorialCopy = {
  navigation: {
    brandLabel: 'Altitude Açaí',
    skipToContent: 'Skip to main content',
    mobileMenuOpenLabel: 'Open navigation menu',
    mobileMenuCloseLabel: 'Close navigation menu',
    links: [
      { id: 'whats-in-a-bowl', label: 'Inside a Bowl', to: '/#whats-in-a-bowl' },
      { id: 'menu', label: 'Menu', to: '/menu' },
      { id: 'hours', label: 'Hours', to: '/#hours' },
      { id: 'visit-us', label: 'Visit Us', to: '/#visit-us' },
    ],
    primaryCta: 'Get Directions',
    primaryCtaAria: 'Get directions to Altitude Açaí on Google Maps',
  },
  hero: {
    badge: 'FRESH SUPERFOOD BOWLS',
    headline: 'Handcrafted Açaí Bowls in Cody, Wyoming',
    subhead:
      'Smooth açaí sorbet layered with crunchy granola, fresh fruit, and your favorite toppings.',
    primaryCta: {
      label: 'Explore Full Menu',
      to: '/menu',
      ariaLabel: 'Explore Full Menu',
    },
    secondaryCta: {
      label: 'Get Directions',
      ariaLabel: 'Get Directions on Google Maps',
    },
    logoAlt: 'Altitude Açaí logo',
  },
  whatsInABowl: {
    title: "What's in an Açaí Bowl?",
    officialParagraph: VERBATIM_WHATS_IN_A_BOWL_COPY,
    interactionPrompt: 'Select any layer in the diagram to inspect its ingredients.',
    layerOrderNote: 'Stacked bottom to top',
    layers: [
      {
        id: 'acai-sorbet',
        stepNumber: 1,
        name: 'ACAI SORBET',
        summary: 'Smooth, refreshing açaí sorbet forms the base layer.',
      },
      {
        id: 'crunch',
        stepNumber: 2,
        name: 'CRUNCH',
        summary: 'Toasted granola gives every spoonful crisp texture.',
      },
      {
        id: 'favorite-fruit',
        stepNumber: 3,
        name: 'FAVORITE FRUIT',
        summary:
          'Strawberries, blueberries, blackberries, raspberries, pineapple, mango, and banana.',
      },
      {
        id: 'topping',
        stepNumber: 4,
        name: 'TOPPING',
        summary:
          'Hemp hearts, chia seeds, flax seeds, pumpkin seeds, coconut shavings, slivered almonds, dark chocolate shavings, rolled oats, graham cracker, and bee pollen.',
      },
      {
        id: 'sauce',
        stepNumber: 5,
        name: 'SAUCE',
        summary: 'Dark chocolate, Nutella, honey, almond butter, or peanut butter drizzled on top.',
      },
    ],
  },
  featuredPreview: {
    title: 'Signature Bowls',
    intro: 'Three house combinations layered with fresh fruit, crunch, and rich toppings.',
    ctaLabel: 'See All Signature Bowls & Toppings',
    ctaTo: '/menu',
    featuredIds: ['mountain-man', 'montana-mama', 'goldilocks'],
  },
  menuPage: {
    title: 'Official Menu',
    intro: 'Browse every house bowl combination or plan your custom mix before your visit.',
    sizes: ['12 oz Bowl', '16 oz Bowl'],
    baseRule: 'All bowls start with Açaí Base and Granola',
    signatureSectionTitle: 'Signature Açaí Bowls',
    createYourOwn: {
      title: 'Create Your Own Bowl',
      intro: 'Choose up to three fruits, two toppings, and one finishing sauce.',
      officialRule: 'Pick up to: 3 Fruits, 2 Toppings, 1 Sauce',
      categories: {
        fruits: {
          title: 'Fruits',
          selectionLimit: 3,
          ruleText: 'Pick up to 3',
        },
        toppings: {
          title: 'Toppings',
          selectionLimit: 2,
          ruleText: 'Granola Base Included — Pick up to 2',
        },
        sauces: {
          title: 'Sauces',
          selectionLimit: 1,
          ruleText: 'Pick 1',
        },
      },
      previewPanel: {
        title: 'Your Bowl Mix',
        emptyState: 'Select fruits, toppings, and a sauce to preview your combination.',
        selectedCountTemplate: '{count} of {max} selected',
        resetButtonLabel: 'Clear Selections',
      },
    },
  },
  founderStory: {
    title: 'How Altitude Açaí Started',
    officialParagraph: VERBATIM_FOUNDER_STORY_COPY,
    milestones: [
      {
        label: '2024',
        detail: 'Launched the Altitude Açaí food truck',
      },
      {
        label: 'Summer Events',
        detail: 'Served bowls across Park County community gatherings',
      },
      {
        label: 'Brick & Mortar',
        detail: 'Opened year-round storefront doors for local regulars',
      },
    ],
  },
  seasonalHours: {
    title: 'Seasonal Hours',
    intro: 'Storefront hours adjust with the Wyoming seasons and sync automatically.',
    springNotice:
      'Seasonal hours update automatically. Check @altitude_acai on Instagram for weather or holiday updates.',
    status: {
      closedDayLabel: 'CLOSED',
      todayBadge: 'Today',
      activeSeasonBadge: 'Current Season',
    },
    seasonTabs: {
      spring: {
        label: 'Spring',
        summary: 'Off-peak storefront schedule with spring community food truck stops.',
      },
      summer: {
        label: 'Summer',
        summary: 'Open daily 7:30 AM to 2:30 PM, plus Friday and Saturday evenings 5:00 PM to 8:00 PM.',
      },
      fall: {
        label: 'Fall',
        summary:
          'Starting in October: Wednesday through Saturday 8:00 AM to 2:00 PM, Sunday 11:00 AM to 2:00 PM, closed Monday and Tuesday.',
      },
      winter: {
        label: 'Winter',
        summary: 'Open Wednesday through Saturday 8:00 AM to 2:00 PM, closed Sunday through Tuesday.',
      },
    },
    foodTruckBanner: {
      title: 'Food Truck & Local Events',
      description:
        'Our mobile food truck schedule and local community stops vary throughout the year. Follow us on Instagram or Facebook for real-time locations, weather updates, and upcoming community events.',
      instagramLabel: 'Check Instagram @altitude_acai',
      facebookLabel: 'Check Facebook Updates',
    },
  },
  locationAndContact: {
    title: 'Visit Us',
    intro: 'Stop by our shop, give us a call, or follow along for seasonal updates.',
    cityRegionDisplay: 'Cody, Wyoming',
    addressLine: '1302 Beck Avenue, Cody, WY 82414',
    channels: {
      googleMaps: {
        label: 'Get Directions',
        ariaLabel: 'Get directions to 1302 Beck Avenue, Cody, WY 82414 on Google Maps',
      },
      instagram: {
        label: 'Follow @altitude_acai',
        ariaLabel: 'Follow @altitude_acai on Instagram',
      },
      facebook: {
        label: 'Altitude Açaí on Facebook',
        ariaLabel: 'Visit Altitude Açaí on Facebook',
      },
      phone: {
        label: 'Call 307-527-0812',
        ariaLabel: 'Call 307-527-0812',
        href: 'tel:307-527-0812',
      },
      email: {
        label: 'altitudeacai@gmail.com',
        ariaLabel: 'Email altitudeacai@gmail.com',
        href: 'mailto:altitudeacai@gmail.com',
      },
    },
    mapEmbedTitle: 'Map showing 1302 Beck Avenue, Cody, WY 82414',
  },
  footer: {
    brandName: 'Altitude Açaí',
    tagline: 'Handcrafted superfood bowls and seasonal food truck stops.',
    addressLine: '1302 Beck Avenue, Cody, WY 82414',
    phoneLabel: '307-527-0812',
    emailLabel: 'altitudeacai@gmail.com',
    instagramLabel: '@altitude_acai',
    facebookLabel: 'Facebook',
    directionsLabel: 'Get Directions',
    navigationHeading: 'Explore',
    visitHeading: 'Storefront',
    connectHeading: 'Connect',
    closingNote: 'Serving Park County year-round.',
  },
  notFound: {
    heading: 'This page does not exist',
    ctaLabel: 'Back to Home',
    bowlIllustrationAlt: 'Cordel woodcut illustration of a handcrafted açaí bowl',
  },
} as const;
