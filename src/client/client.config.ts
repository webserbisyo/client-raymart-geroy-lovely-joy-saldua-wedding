export type ClientRsvpHomepageMode =
  "inline-form" | "compact-form" | "cta-only";

export type ClientRendererConfig = {
  mode: "platform" | "client";
  allowClientRenderer: boolean;
};

export type ClientLibsConfig = {
  icons: {
    provider: string;
    importFrom: string;
  };
  ui: readonly string[];
  motion: readonly string[];
  effects: readonly string[];
};

export type ClientResponsiveConfig = {
  strategy: "mobile-first";
  testWidths: readonly [375, 768, 1280];
  requireNoHorizontalOverflow: boolean;
  respectReducedMotion: boolean;
};

export type ClientConfig = {
  mode: "starter";
  renderer: ClientRendererConfig;
  rsvp: {
    dedicatedPageEnabled: boolean;
    dedicatedPagePath: string;
    homepageMode: ClientRsvpHomepageMode;
  };
  identity: {
    displayName: string;
    subtitle: string;
  };
  theme: {
    id: string;
    preset: string;
    monogram?: readonly [string, string];
    monogramGraphic?: string;
    fonts: {
      heading: string;
      body: string;
    };
    tokens: Record<string, string>;
  };
  layout: {
    navEnabled: boolean;
    footerEnabled: boolean;
  };
  footer: {
    text: string;
  };
  sections: Record<string, unknown>;
  venues?: ClientVenuesConfig;
  componentFlorals?: ComponentFloralDecorationsConfig;
  botanicalFlorals?: BotanicalFloralDecorationsConfig;
  assets: Record<string, unknown>;
  libs: ClientLibsConfig;
  responsive: ClientResponsiveConfig;
};

export type ComponentFloralAssetSpec = {
  src: string;
  width: number;
  height: number;
};

export type ComponentFloralDecorationsConfig = {
  frameCorner: {
    left: ComponentFloralAssetSpec;
    right: ComponentFloralAssetSpec;
  };
  cardEdge: {
    left: ComponentFloralAssetSpec;
    right: ComponentFloralAssetSpec;
  };
};

export const PRINCESS_ANNE_COMPONENT_FLORAL_DECORATIONS: ComponentFloralDecorationsConfig = {
  frameCorner: {
    left: {
      src: "/images/decoration/princess-anne/princess-anne-corner-top-left.webp",
      width: 2048,
      height: 2048,
    },
    right: {
      src: "/images/decoration/princess-anne/princess-anne-corner-top-right.webp",
      width: 2048,
      height: 2048,
    },
  },
  cardEdge: {
    left: {
      src: "/images/decoration/princess-anne/princess-anne-corner-bottom-left.webp",
      width: 2048,
      height: 2048,
    },
    right: {
      src: "/images/decoration/princess-anne/princess-anne-corner-bottom-right.webp",
      width: 2048,
      height: 2048,
    },
  },
};

export type BotanicalFloralAssetSpec = {
  src: string;
  width: number;
  height: number;
};

export type BotanicalFloralDecorationsConfig = {
  cornerSprig: BotanicalFloralAssetSpec;
  floralCrest: BotanicalFloralAssetSpec;
};

export const BOTANICAL_COMPONENT_FLORAL_DECORATIONS: BotanicalFloralDecorationsConfig = {
  cornerSprig: {
    src: "/template-assets/decorations/corner-sprig.webp",
    width: 500,
    height: 500,
  },
  floralCrest: {
    src: "/template-assets/decorations/floral-crest.webp",
    width: 500,
    height: 500,
  },
};

export type ClientAttireConfigItem = {
  label: string;
  color: string;
};

export type ClientAttireIllustrationConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ClientVenuePhotoConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ClientVenuesConfig = {
  ceremony: ClientVenuePhotoConfig;
  reception: ClientVenuePhotoConfig;
};

export const RAYMART_LOVELY_JOY_VENUE_PHOTOS: ClientVenuesConfig = {
  ceremony: {
    src: "/template-assets/photos/venue/ceremony-church.webp",
    alt: "Iglesia Ni Cristo, Lokal ng Taal",
    width: 515,
    height: 388,
  },
  reception: {
    src: "/template-assets/photos/venue/reception-venue.webp",
    alt: "The Barn at Grand Terraza",
    width: 1920,
    height: 887,
  },
};

export const PRINCESS_ANNE_ATTIRE_ILLUSTRATION: ClientAttireIllustrationConfig = {
  src: "/template-assets/decorations/attire-lineup.webp",
  alt: "Raymart & Lovely Joy wedding attire lineup fashion illustration",
  width: 2752,
  height: 1536,
};

export const RAYMART_LOVELY_JOY_ATTIRE_ILLUSTRATION: ClientAttireIllustrationConfig =
  PRINCESS_ANNE_ATTIRE_ILLUSTRATION;

/**
 * Configurable active wedding attire palette.
 */
export const PRINCESS_ANNE_ATTIRE_PALETTE: ClientAttireConfigItem[] = [
  { label: "Sage Green", color: "#5B7E68" },
  { label: "Dusty Rose", color: "#C07C7D" },
  { label: "Baby Pink", color: "#F4D3D5" },
  { label: "Ivory", color: "#FFFFF0" },
  { label: "Champagne Gold", color: "#D4AF37" },
];

export const clientConfig = {
  mode: "starter",
  renderer: {
    mode: "client",
    allowClientRenderer: true,
  } satisfies ClientRendererConfig,
  rsvp: {
    dedicatedPageEnabled: true,
    dedicatedPagePath: "/rsvp",
    homepageMode: "inline-form",
  },
  identity: {
    displayName: "",
    subtitle: "",
  },
  theme: {
    id: "blue-hour-romance",
    preset: "blue-hour-romance",
    monogram: ["R", "J"] as const,
    monogramGraphic: "/template-assets/decorations/monogram-rj.webp",
    fonts: {
      heading: "",
      body: "",
    },
    tokens: {},
  },
  layout: {
    navEnabled: true,
    footerEnabled: false,
  },
  footer: {
    text: "",
  },
  sections: {
    attire: {
      sectionIntro: "We would love to see you dressed up in our wedding colors!",
      dressCodeNote:
        "Formal attire is preferred.\nLadies: Long gowns or formal dresses (strictly no pants).\nGentlemen: Black suit or Barong Tagalog.\nPlease note: Strictly no shorts or t-shirts for all guests.",
      colorMotifNote:
        "Ninong: Black suit or Barong Tagalog.\nNinang: Champagne gold long gown with sleeves.",
      illustration: PRINCESS_ANNE_ATTIRE_ILLUSTRATION,
      palette: PRINCESS_ANNE_ATTIRE_PALETTE,
    },
    venue: RAYMART_LOVELY_JOY_VENUE_PHOTOS,
  },
  venues: RAYMART_LOVELY_JOY_VENUE_PHOTOS,
  componentFlorals: PRINCESS_ANNE_COMPONENT_FLORAL_DECORATIONS,
  botanicalFlorals: BOTANICAL_COMPONENT_FLORAL_DECORATIONS,
  assets: {},
  libs: {
    icons: {
      provider: "lucide-react",
      importFrom: "@/client/libs/icons",
    },
    ui: [],
    motion: [],
    effects: [],
  },
  responsive: {
    strategy: "mobile-first",
    testWidths: [375, 768, 1280],
    requireNoHorizontalOverflow: true,
    respectReducedMotion: true,
  } satisfies ClientResponsiveConfig,
} satisfies ClientConfig;
