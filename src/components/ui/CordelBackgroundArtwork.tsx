import type { ReactNode } from 'react';

export type CordelBackgroundPlacement =
  | 'hero'
  | 'anatomy-fruits'
  | 'featured-botanicals'
  | 'story-branches'
  | 'hours-ambient'
  | 'visit-ambient'
  | 'menu-header'
  | 'menu-signatures'
  | 'menu-create-your-own';

export interface CordelBackgroundArtworkProps {
  placement: CordelBackgroundPlacement;
  variant?: 'light' | 'dark' | 'periwinkle';
}

interface PaletteTone {
  ink: string;
  mid: string;
  fillLight: string;
  fillSoft: string;
}

function getTone(variant: 'light' | 'dark' | 'periwinkle'): PaletteTone {
  if (variant === 'dark') {
    return {
      ink: '#E4D9FF',
      mid: '#8687B4',
      fillLight: '#575E8F',
      fillSoft: '#273469',
    };
  }
  if (variant === 'periwinkle') {
    return {
      ink: '#1E2749',
      mid: '#575E8F',
      fillLight: '#FAFAFF',
      fillSoft: '#8687B4',
    };
  }
  return {
    ink: '#1E2749',
    mid: '#575E8F',
    fillLight: '#E4D9FF',
    fillSoft: '#8687B4',
  };
}

function StrawberryMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
      <path
        d="M34 32 C42 14 58 12 62 26 C72 12 88 18 86 34 C74 36 66 40 60 40 C52 40 44 36 34 32 Z"
        fill={tone.mid}
        stroke={tone.ink}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M60 28 L62 12" stroke={tone.ink} strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M30 42 C24 72 44 102 60 108 C76 102 96 72 90 42 C78 35 42 35 30 42 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <g fill={tone.ink}>
        <ellipse cx="46" cy="56" rx="2" ry="3.2" />
        <ellipse cx="60" cy="54" rx="2" ry="3.2" />
        <ellipse cx="74" cy="56" rx="2" ry="3.2" />
        <ellipse cx="52" cy="72" rx="2" ry="3.2" />
        <ellipse cx="68" cy="72" rx="2" ry="3.2" />
        <ellipse cx="60" cy="88" rx="1.8" ry="3" />
      </g>
    </svg>
  );
}

function BananaMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 130 110" className="h-full w-full" fill="none">
      <path
        d="M16 68 C38 92 90 92 114 40 C118 32 120 20 114 14 C108 10 102 20 98 28 C78 64 44 66 22 50 C14 46 10 58 16 68 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M22 62 C50 80 86 74 106 32" stroke={tone.mid} strokeWidth="1.8" />
      <ellipse
        cx="46"
        cy="32"
        rx="18"
        ry="13"
        transform="rotate(-14 46 32)"
        fill={tone.fillSoft}
        stroke={tone.ink}
        strokeWidth="2.4"
      />
      <path
        d="M46 32 L46 26 M46 32 L41 36 M46 32 L51 36"
        stroke={tone.ink}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BlueberryMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
      <path
        d="M18 42 C28 14 58 12 72 30 C54 38 38 44 18 42 Z"
        fill={tone.mid}
        stroke={tone.ink}
        strokeWidth="2.4"
      />
      <circle cx="44" cy="64" r="20" fill={tone.fillSoft} stroke={tone.ink} strokeWidth="2.6" />
      <circle cx="78" cy="60" r="21" fill={tone.fillLight} stroke={tone.ink} strokeWidth="2.6" />
      <circle cx="62" cy="84" r="23" fill={tone.mid} stroke={tone.ink} strokeWidth="2.8" />
      <path
        d="M56 72 L62 76 L68 72 M58 80 L62 76 L66 80 M62 69 L62 76"
        stroke={tone.fillLight}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BlackberryMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
      <path
        d="M20 34 C28 12 52 8 68 24 C50 30 36 34 20 34 Z"
        fill={tone.mid}
        stroke={tone.ink}
        strokeWidth="2.2"
      />
      <g fill={tone.fillSoft} stroke={tone.ink} strokeWidth="2.2">
        <circle cx="60" cy="40" r="9.5" />
        <circle cx="48" cy="48" r="9.5" />
        <circle cx="72" cy="48" r="9.5" />
        <circle cx="42" cy="62" r="10" />
        <circle cx="60" cy="58" r="10.5" />
        <circle cx="78" cy="62" r="10" />
        <circle cx="46" cy="78" r="9.5" />
        <circle cx="64" cy="76" r="10" />
        <circle cx="74" cy="78" r="9" />
        <circle cx="56" cy="92" r="9" />
        <circle cx="66" cy="92" r="8.5" />
      </g>
    </svg>
  );
}

function RaspberryMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 110 110" className="h-full w-full" fill="none">
      <path d="M54 24 L52 8" stroke={tone.ink} strokeWidth="2.4" strokeLinecap="round" />
      <g fill={tone.fillLight} stroke={tone.ink} strokeWidth="2.2">
        <circle cx="44" cy="38" r="9" />
        <circle cx="60" cy="36" r="9" />
        <circle cx="72" cy="44" r="8.5" />
        <circle cx="38" cy="54" r="9.5" />
        <circle cx="54" cy="52" r="10" />
        <circle cx="70" cy="56" r="9.5" />
        <circle cx="44" cy="70" r="9" />
        <circle cx="60" cy="70" r="9.5" />
        <circle cx="52" cy="84" r="8.5" />
      </g>
    </svg>
  );
}

function PineappleMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 120 140" className="h-full w-full" fill="none">
      <g fill={tone.mid} stroke={tone.ink} strokeWidth="2.2" strokeLinejoin="round">
        <path d="M52 46 L40 12 L58 34 Z" />
        <path d="M58 42 L62 6 L70 40 Z" />
        <path d="M66 46 L86 14 L74 44 Z" />
      </g>
      <ellipse cx="62" cy="82" rx="28" ry="38" fill={tone.fillLight} stroke={tone.ink} strokeWidth="2.8" />
      <g stroke={tone.ink} strokeWidth="1.8">
        <path d="M40 62 L84 102 M36 78 L72 114 M52 48 L88 84" />
        <path d="M84 62 L40 102 M88 78 L52 114 M72 48 L36 84" />
      </g>
    </svg>
  );
}

function MangoMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 120 110" className="h-full w-full" fill="none">
      <ellipse
        cx="60"
        cy="60"
        rx="38"
        ry="26"
        transform="rotate(-22 60 60)"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.8"
      />
      <g transform="rotate(-22 60 60)" stroke={tone.ink} strokeWidth="2">
        <line x1="32" y1="50" x2="88" y2="50" />
        <line x1="28" y1="60" x2="92" y2="60" />
        <line x1="34" y1="70" x2="86" y2="70" />
        <line x1="46" y1="38" x2="46" y2="82" />
        <line x1="60" y1="36" x2="60" y2="84" />
        <line x1="74" y1="38" x2="74" y2="82" />
      </g>
      <path
        d="M36 26 C20 12 6 24 16 40 C28 34 32 30 36 26 Z"
        fill={tone.mid}
        stroke={tone.ink}
        strokeWidth="2.2"
      />
    </svg>
  );
}

function CoconutMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 130 90" className="h-full w-full" fill="none">
      <path
        d="M12 36 C32 14 72 18 86 38 C68 34 42 40 24 54 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M34 60 C56 38 96 40 114 66 C90 60 60 64 46 78 Z"
        fill={tone.fillSoft}
        stroke={tone.ink}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M34 60 C54 46 84 44 106 56" stroke={tone.mid} strokeWidth="2.2" />
    </svg>
  );
}

function AlmondMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 110 100" className="h-full w-full" fill="none">
      <g transform="rotate(-18 36 52)">
        <path
          d="M36 24 C54 38 56 66 36 80 C16 66 18 38 36 24 Z"
          fill={tone.mid}
          stroke={tone.ink}
          strokeWidth="2.6"
        />
        <path d="M36 34 C32 48 32 62 36 72" stroke={tone.fillLight} strokeWidth="1.6" />
      </g>
      <g transform="rotate(26 76 54)">
        <path
          d="M76 32 C88 44 88 66 76 78 C64 66 64 44 76 32 Z"
          fill={tone.fillLight}
          stroke={tone.ink}
          strokeWidth="2.4"
        />
      </g>
    </svg>
  );
}

function HoneyDipperMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 140 120" className="h-full w-full" fill="none">
      <g fill={tone.fillLight} stroke={tone.ink} strokeWidth="2" strokeLinejoin="round">
        <polygon points="74,70 86,63 98,70 98,84 86,91 74,84" />
        <polygon points="98,70 110,63 122,70 122,84 110,91 98,84" />
        <polygon points="86,91 98,84 110,91 110,105 98,112 86,105" />
      </g>
      <path
        d="M54 58 C54 72 52 84 60 88 C68 92 66 74 68 60 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.2"
      />
      <g transform="translate(60, 44) rotate(-28)">
        <rect x="-54" y="-6" width="56" height="12" rx="6" fill={tone.fillSoft} stroke={tone.ink} strokeWidth="2.4" />
        <rect x="2" y="-18" width="10" height="36" rx="4" fill={tone.fillLight} stroke={tone.ink} strokeWidth="2.2" />
        <rect x="14" y="-20" width="10" height="40" rx="4" fill={tone.mid} stroke={tone.ink} strokeWidth="2.2" />
        <rect x="26" y="-16" width="9" height="32" rx="4" fill={tone.fillLight} stroke={tone.ink} strokeWidth="2.2" />
      </g>
    </svg>
  );
}

function SeedsMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 110 90" className="h-full w-full" fill="none">
      <g transform="rotate(-24 28 38)">
        <path
          d="M28 18 C38 28 40 46 28 56 C16 46 18 28 28 18 Z"
          fill={tone.mid}
          stroke={tone.ink}
          strokeWidth="2.4"
        />
        <line x1="28" y1="26" x2="28" y2="48" stroke={tone.fillLight} strokeWidth="1.5" />
      </g>
      <g transform="rotate(18 64 46)">
        <path
          d="M64 26 C74 36 76 54 64 64 C52 54 54 36 64 26 Z"
          fill={tone.fillLight}
          stroke={tone.ink}
          strokeWidth="2.4"
        />
        <line x1="64" y1="34" x2="64" y2="56" stroke={tone.ink} strokeWidth="1.4" />
      </g>
      <g fill={tone.ink}>
        <circle cx="42" cy="70" r="2.5" />
        <circle cx="88" cy="30" r="2.5" />
        <circle cx="92" cy="58" r="2.5" />
        <circle cx="20" cy="68" r="2.2" />
      </g>
    </svg>
  );
}

function OatsMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <path
        d="M20 46 C18 32 30 22 44 24 C56 20 70 28 70 40 C72 54 60 64 44 62 C30 66 20 56 20 46 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.5"
      />
      <ellipse cx="86" cy="32" rx="13" ry="7" transform="rotate(-22 86 32)" fill={tone.fillSoft} stroke={tone.ink} strokeWidth="2.2" />
      <ellipse cx="90" cy="60" rx="13" ry="7" transform="rotate(24 90 60)" fill={tone.fillLight} stroke={tone.ink} strokeWidth="2.2" />
      <ellipse cx="52" cy="74" rx="11" ry="6" transform="rotate(8 52 74)" fill={tone.mid} stroke={tone.ink} strokeWidth="2" />
    </svg>
  );
}

function AcaiBowlMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 140 110" className="h-full w-full" fill="none">
      <path d="M78 36 L114 14" stroke={tone.ink} strokeWidth="4.5" strokeLinecap="round" />
      <ellipse cx="64" cy="44" rx="44" ry="14" fill={tone.mid} stroke={tone.ink} strokeWidth="2.6" />
      <path
        d="M18 44 C20 82 40 98 64 98 C88 98 108 82 110 44 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.8"
      />
      <circle cx="48" cy="36" r="8" fill={tone.fillSoft} stroke={tone.ink} strokeWidth="2" />
      <circle cx="68" cy="33" r="9" fill={tone.fillLight} stroke={tone.ink} strokeWidth="2" />
      <circle cx="84" cy="38" r="7.5" fill={tone.fillSoft} stroke={tone.ink} strokeWidth="2" />
    </svg>
  );
}

function AcaiBranchMotif({ tone }: { tone: PaletteTone }) {
  return (
    <svg viewBox="0 0 160 150" className="h-full w-full" fill="none">
      <path d="M18 126 Q72 86 138 24" stroke={tone.ink} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M56 96 Q76 112 96 124" stroke={tone.ink} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M88 70 Q114 82 132 104" stroke={tone.ink} strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M44 82 C26 64 26 42 46 34 C58 54 58 68 44 82 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.4"
      />
      <path
        d="M78 58 C62 38 68 18 88 14 C96 32 92 48 78 58 Z"
        fill={tone.mid}
        stroke={tone.ink}
        strokeWidth="2.4"
      />
      <path
        d="M114 38 C118 16 136 8 150 18 C142 36 128 42 114 38 Z"
        fill={tone.fillLight}
        stroke={tone.ink}
        strokeWidth="2.4"
      />
      <g fill={tone.fillSoft} stroke={tone.ink} strokeWidth="2.2">
        <circle cx="94" cy="116" r="9" />
        <circle cx="108" cy="126" r="8.5" />
        <circle cx="82" cy="128" r="8.5" />
        <circle cx="128" cy="96" r="9" />
        <circle cx="140" cy="108" r="8.5" />
        <circle cx="118" cy="108" r="8" />
      </g>
    </svg>
  );
}

interface ScatteredItem {
  id: string;
  className: string;
  node: ReactNode;
}

function buildPlacements(
  placement: CordelBackgroundPlacement,
  tone: PaletteTone,
): readonly ScatteredItem[] {
  switch (placement) {
    case 'hero':
      return [
        {
          id: 'hero-strawberry',
          className: 'top-10 right-[2%] h-28 w-28 rotate-[14deg] opacity-[0.16] sm:h-36 sm:w-36',
          node: <StrawberryMotif tone={tone} />,
        },
        {
          id: 'hero-blueberries',
          className: 'bottom-12 left-[1.5%] h-28 w-28 -rotate-[12deg] opacity-[0.15] sm:h-36 sm:w-36',
          node: <BlueberryMotif tone={tone} />,
        },
        {
          id: 'hero-honey',
          className: 'top-[46%] right-[1%] hidden h-32 w-36 rotate-[9deg] opacity-[0.16] md:block xl:h-40 xl:w-44',
          node: <HoneyDipperMotif tone={tone} />,
        },
        {
          id: 'hero-branch-left',
          className: 'top-16 left-[1%] hidden h-36 w-36 -rotate-[16deg] opacity-[0.14] lg:block',
          node: <AcaiBranchMotif tone={tone} />,
        },
        {
          id: 'hero-bowl-bottom-right',
          className: 'bottom-6 right-[3%] h-28 w-36 -rotate-[7deg] opacity-[0.15] sm:h-32 sm:w-40',
          node: <AcaiBowlMotif tone={tone} />,
        },
        {
          id: 'hero-coconut-mid',
          className: 'bottom-[24%] left-[26%] hidden h-24 w-32 rotate-[11deg] opacity-[0.13] lg:block',
          node: <CoconutMotif tone={tone} />,
        },
        {
          id: 'hero-almond',
          className: 'top-20 left-[38%] hidden h-24 w-28 -rotate-[8deg] opacity-[0.13] xl:block',
          node: <AlmondMotif tone={tone} />,
        },
      ];

    case 'anatomy-fruits':
      return [
        {
          id: 'anat-pineapple',
          className: 'top-8 right-[2%] h-32 w-28 rotate-[12deg] opacity-[0.16] xl:h-40 xl:w-36',
          node: <PineappleMotif tone={tone} />,
        },
        {
          id: 'anat-mango',
          className: 'top-[38%] left-[1.5%] h-28 w-28 -rotate-[11deg] opacity-[0.16]',
          node: <MangoMotif tone={tone} />,
        },
        {
          id: 'anat-blackberry',
          className: 'bottom-8 right-[4%] h-28 w-28 -rotate-[9deg] opacity-[0.16]',
          node: <BlackberryMotif tone={tone} />,
        },
        {
          id: 'anat-oats',
          className: 'bottom-8 left-[3%] hidden h-24 w-32 rotate-[10deg] opacity-[0.15] sm:block',
          node: <OatsMotif tone={tone} />,
        },
        {
          id: 'anat-raspberry',
          className: 'top-12 left-[46%] hidden h-24 w-24 -rotate-[6deg] opacity-[0.14] lg:block',
          node: <RaspberryMotif tone={tone} />,
        },
      ];

    case 'featured-botanicals':
      return [
        {
          id: 'feat-bowl',
          className: 'top-8 right-[2%] h-32 w-40 rotate-[11deg] opacity-[0.16]',
          node: <AcaiBowlMotif tone={tone} />,
        },
        {
          id: 'feat-strawberry-left',
          className: 'top-16 left-[1.5%] h-28 w-28 -rotate-[14deg] opacity-[0.16]',
          node: <StrawberryMotif tone={tone} />,
        },
        {
          id: 'feat-banana',
          className: 'bottom-10 left-[2%] h-28 w-32 -rotate-[12deg] opacity-[0.16]',
          node: <BananaMotif tone={tone} />,
        },
        {
          id: 'feat-pineapple',
          className: 'top-[46%] right-[1.5%] hidden h-36 w-32 rotate-[8deg] opacity-[0.15] lg:block',
          node: <PineappleMotif tone={tone} />,
        },
        {
          id: 'feat-mango-bottom',
          className: 'bottom-8 right-[8%] h-28 w-32 -rotate-[9deg] opacity-[0.15]',
          node: <MangoMotif tone={tone} />,
        },
        {
          id: 'feat-blueberry-mid',
          className: 'top-[54%] left-[24%] hidden h-24 w-24 rotate-[14deg] opacity-[0.13] xl:block',
          node: <BlueberryMotif tone={tone} />,
        },
      ];

    case 'story-branches':
      return [
        {
          id: 'story-branch-right',
          className: 'top-6 right-[2%] h-40 w-40 rotate-[10deg] opacity-[0.18]',
          node: <AcaiBranchMotif tone={tone} />,
        },
        {
          id: 'story-branch-left',
          className: 'bottom-6 left-[1.5%] h-36 w-36 -rotate-[14deg] opacity-[0.17]',
          node: <AcaiBranchMotif tone={tone} />,
        },
        {
          id: 'story-blueberries',
          className: 'top-14 left-[20%] hidden h-24 w-24 rotate-[12deg] opacity-[0.14] lg:block',
          node: <BlueberryMotif tone={tone} />,
        },
        {
          id: 'story-honey',
          className: 'bottom-10 right-[26%] hidden h-28 w-32 -rotate-[8deg] opacity-[0.14] xl:block',
          node: <HoneyDipperMotif tone={tone} />,
        },
      ];

    case 'hours-ambient':
      return [
        {
          id: 'hrs-blueberries',
          className: 'top-10 right-[2%] h-28 w-28 rotate-[13deg] opacity-[0.16]',
          node: <BlueberryMotif tone={tone} />,
        },
        {
          id: 'hrs-honey',
          className: 'top-[38%] left-[1.5%] hidden h-32 w-36 -rotate-[10deg] opacity-[0.15] lg:block',
          node: <HoneyDipperMotif tone={tone} />,
        },
        {
          id: 'hrs-strawberry',
          className: 'bottom-12 right-[3%] h-28 w-28 -rotate-[12deg] opacity-[0.16]',
          node: <StrawberryMotif tone={tone} />,
        },
        {
          id: 'hrs-almonds',
          className: 'bottom-16 left-[2.5%] h-24 w-28 rotate-[9deg] opacity-[0.15]',
          node: <AlmondMotif tone={tone} />,
        },
        {
          id: 'hrs-banana-right',
          className: 'top-[54%] right-[1.5%] hidden h-28 w-32 rotate-[16deg] opacity-[0.14] xl:block',
          node: <BananaMotif tone={tone} />,
        },
      ];

    case 'visit-ambient':
      return [
        {
          id: 'vis-bowl',
          className: 'top-8 right-[2%] h-32 w-40 -rotate-[11deg] opacity-[0.16]',
          node: <AcaiBowlMotif tone={tone} />,
        },
        {
          id: 'vis-mango',
          className: 'top-[46%] left-[1.5%] hidden h-28 w-32 rotate-[12deg] opacity-[0.15] md:block',
          node: <MangoMotif tone={tone} />,
        },
        {
          id: 'vis-raspberry',
          className: 'bottom-10 left-[3%] h-24 w-24 rotate-[14deg] opacity-[0.16]',
          node: <RaspberryMotif tone={tone} />,
        },
        {
          id: 'vis-seeds',
          className: 'bottom-8 right-[6%] h-24 w-28 -rotate-[8deg] opacity-[0.15]',
          node: <SeedsMotif tone={tone} />,
        },
      ];

    case 'menu-header':
      return [
        {
          id: 'mh-pineapple',
          className: 'top-4 right-[3%] h-36 w-32 rotate-[14deg] opacity-[0.18]',
          node: <PineappleMotif tone={tone} />,
        },
        {
          id: 'mh-blueberries',
          className: 'bottom-4 right-[20%] hidden h-24 w-24 -rotate-[10deg] opacity-[0.16] sm:block',
          node: <BlueberryMotif tone={tone} />,
        },
        {
          id: 'mh-honey',
          className: 'bottom-2 left-[60%] hidden h-28 w-32 rotate-[7deg] opacity-[0.15] lg:block',
          node: <HoneyDipperMotif tone={tone} />,
        },
        {
          id: 'mh-branch-left',
          className: 'top-4 left-[1%] hidden h-32 w-32 -rotate-[14deg] opacity-[0.14] xl:block',
          node: <AcaiBranchMotif tone={tone} />,
        },
      ];

    case 'menu-signatures':
      return [
        {
          id: 'ms-strawberry',
          className: 'top-10 right-[2%] h-28 w-28 rotate-[12deg] opacity-[0.15]',
          node: <StrawberryMotif tone={tone} />,
        },
        {
          id: 'ms-blackberry',
          className: 'top-[42%] left-[1.5%] h-28 w-28 -rotate-[11deg] opacity-[0.14]',
          node: <BlackberryMotif tone={tone} />,
        },
        {
          id: 'ms-coconut',
          className: 'bottom-12 right-[3%] h-24 w-32 -rotate-[9deg] opacity-[0.15]',
          node: <CoconutMotif tone={tone} />,
        },
        {
          id: 'ms-oats',
          className: 'bottom-16 left-[4%] hidden h-24 w-28 rotate-[10deg] opacity-[0.14] md:block',
          node: <OatsMotif tone={tone} />,
        },
      ];

    case 'menu-create-your-own':
    default:
      return [
        {
          id: 'cyo-banana',
          className: 'top-8 right-[2%] h-28 w-32 rotate-[13deg] opacity-[0.17]',
          node: <BananaMotif tone={tone} />,
        },
        {
          id: 'cyo-strawberry',
          className: 'top-20 left-[1.5%] h-24 w-24 -rotate-[12deg] opacity-[0.16]',
          node: <StrawberryMotif tone={tone} />,
        },
        {
          id: 'cyo-honey',
          className: 'top-[45%] right-[1.5%] hidden h-32 w-36 -rotate-[9deg] opacity-[0.16] lg:block',
          node: <HoneyDipperMotif tone={tone} />,
        },
        {
          id: 'cyo-mango',
          className: 'top-[54%] left-[2%] hidden h-28 w-32 rotate-[11deg] opacity-[0.15] md:block',
          node: <MangoMotif tone={tone} />,
        },
        {
          id: 'cyo-bowl',
          className: 'bottom-8 right-[6%] h-28 w-36 rotate-[8deg] opacity-[0.16]',
          node: <AcaiBowlMotif tone={tone} />,
        },
        {
          id: 'cyo-seeds',
          className: 'bottom-12 left-[6%] h-24 w-28 -rotate-[10deg] opacity-[0.16]',
          node: <SeedsMotif tone={tone} />,
        },
        {
          id: 'cyo-almonds',
          className: 'bottom-28 right-[42%] hidden h-24 w-28 rotate-[15deg] opacity-[0.14] xl:block',
          node: <AlmondMotif tone={tone} />,
        },
      ];
  }
}

/**
 * Organically scattered hand-carved Cordel woodcut motifs placed strictly in
 * section backgrounds (`position: absolute; pointer-events: none; z-index: 0`),
 * never trapped inside isolated boxed cards or rigid horizontal strips.
 */
export function CordelBackgroundArtwork({
  placement,
  variant = 'light',
}: CordelBackgroundArtworkProps) {
  const tone = getTone(variant);
  const items = buildPlacements(placement, tone);

  return (
    <div
      aria-hidden="true"
      data-cordel-background={placement}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          className={`pointer-events-none absolute z-0 ${item.className}`}
        >
          <div
            data-parallax-dir={idx % 2 === 0 ? '1' : '-1'}
            className="cordel-parallax h-full w-full"
          >
            {item.node}
          </div>
        </div>
      ))}
    </div>
  );
}
