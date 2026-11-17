import { useEffect, useState } from 'react';
import {
  ArrowCounterClockwise,
  Check,
  Info,
  MapPin,
  Sparkle,
  WarningCircle,
  X,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import {
  CarvedWoodblockFrame,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

export type BowlSize = '12 oz Bowl' | '16 oz Bowl';

export interface BowlBuilderPreset {
  requestId: number;
  sourceBowlName: string;
  size?: BowlSize;
  fruits: string[];
  toppings: string[];
  sauce: string | null;
  presetNote?: string;
}

export interface CreateYourOwnSimulatorProps {
  activePreset: BowlBuilderPreset | null;
  onClearPreset?: () => void;
}

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BOWL_SIZES: readonly BowlSize[] = ['12 oz Bowl', '16 oz Bowl'];
const FRUITS_LIST: readonly string[] = brandData.menu.createYourOwn.fruits;
const TOPPINGS_LIST: readonly string[] = brandData.menu.createYourOwn.toppings;
const SAUCES_LIST: readonly string[] = brandData.menu.createYourOwn.sauces;

const FRUITS_MAX = brandData.menu.createYourOwn.rules.fruitsMax;
const TOPPINGS_MAX = brandData.menu.createYourOwn.rules.toppingsMax;
const SAUCES_MAX = brandData.menu.createYourOwn.rules.saucesMax;

interface LiveBowlSvgPreviewProps {
  size: BowlSize;
  fruits: readonly string[];
  toppings: readonly string[];
  sauce: string | null;
}

function LiveBowlSvgPreview({
  size,
  fruits,
  toppings,
  sauce,
}: LiveBowlSvgPreviewProps) {
  const isLarge = size === '16 oz Bowl';
  const fruitPositions = [
    { cx: 128, cy: 102 },
    { cx: 210, cy: 92 },
    { cx: 292, cy: 102 },
  ];
  const toppingPositions = [
    { x: 158, y: 126 },
    { x: 258, y: 126 },
  ];

  return (
    <svg
      viewBox="0 0 420 230"
      className="h-auto w-full"
      role="img"
      aria-label={`Visual preview of a ${size} with açaí sorbet, granola${
        fruits.length > 0 ? `, ${fruits.join(', ')}` : ''
      }${toppings.length > 0 ? `, ${toppings.join(', ')}` : ''}${
        sauce ? `, and ${sauce} drizzle` : ''
      }`}
    >
      <defs>
        <pattern
          id="sim-granola-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1E2749" strokeWidth="1.5" />
        </pattern>
      </defs>

      {/* Subtle Ground Print Shadow */}
      <ellipse
        cx="210"
        cy="204"
        rx={isLarge ? 132 : 112}
        ry="12"
        fill="#E4D9FF"
        stroke="#1E2749"
        strokeWidth="1.8"
      />

      {/* Ceramic Bowl Vessel */}
      <path
        d={
          isLarge
            ? 'M62 114 C68 180 128 202 210 202 C292 202 352 180 358 114 Z'
            : 'M78 118 C84 176 136 198 210 198 C284 198 336 176 342 118 Z'
        }
        fill="#FAFAFF"
        stroke="#1E2749"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Açaí Sorbet Base Rim */}
      <ellipse
        cx="210"
        cy="116"
        rx={isLarge ? 148 : 132}
        ry="32"
        fill="#273469"
        stroke="#1E2749"
        strokeWidth="3"
      />
      <ellipse
        cx="210"
        cy="115"
        rx={isLarge ? 130 : 114}
        ry="24"
        fill="#575E8F"
        stroke="#E4D9FF"
        strokeWidth="1.5"
        strokeDasharray="8 5"
      />

      {/* Granola Base Layer (Always Included) */}
      <ellipse
        cx="210"
        cy="114"
        rx={isLarge ? 106 : 92}
        ry="17"
        fill="#E4D9FF"
        stroke="#1E2749"
        strokeWidth="2"
      />
      <ellipse
        cx="210"
        cy="114"
        rx={isLarge ? 106 : 92}
        ry="17"
        fill="url(#sim-granola-hatch)"
        opacity="0.24"
      />

      {/* Selected Fruit Clusters (Up to 3) */}
      {fruits.map((fruit, index) => {
        const pos = fruitPositions[index] ?? fruitPositions[0];
        return (
          <g key={fruit}>
            <circle
              cx={pos.cx}
              cy={pos.cy}
              r="18"
              fill={index % 2 === 0 ? '#E4D9FF' : '#FAFAFF'}
              stroke="#1E2749"
              strokeWidth="2.6"
            />
            <circle
              cx={pos.cx - 5}
              cy={pos.cy - 4}
              r="4.5"
              fill="#575E8F"
              stroke="#1E2749"
              strokeWidth="1.5"
            />
            <circle cx={pos.cx + 6} cy={pos.cy + 4} r="3" fill="#1E2749" />
          </g>
        );
      })}

      {/* Selected Toppings Accents (Up to 2) */}
      {toppings.map((topping, index) => {
        const pos = toppingPositions[index] ?? toppingPositions[0];
        return (
          <g key={topping}>
            <polygon
              points={`${pos.x},${pos.y - 10} ${pos.x + 12},${pos.y} ${pos.x},${pos.y + 10} ${pos.x - 12},${pos.y}`}
              fill="#8687B4"
              stroke="#1E2749"
              strokeWidth="2.2"
            />
            <circle cx={pos.x} cy={pos.y} r="2.5" fill="#FAFAFF" />
          </g>
        );
      })}

      {/* Selected Sauce Ribbon (Pick 1) */}
      {sauce && (
        <path
          d="M112 108 Q148 86 184 108 T252 108 T310 106"
          fill="none"
          stroke="#1E2749"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
      )}
      {sauce && (
        <path
          d="M112 108 Q148 86 184 108 T252 108 T310 106"
          fill="none"
          stroke="#E4D9FF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}

      {/* Size Stamp Inside Illustration */}
      <rect
        x="156"
        y="150"
        width="108"
        height="28"
        rx="3"
        fill="#E4D9FF"
        stroke="#1E2749"
        strokeWidth="2"
      />
      <text
        x="210"
        y="168"
        textAnchor="middle"
        fill="#1E2749"
        fontSize="11.5"
        fontWeight="700"
        fontFamily="var(--font-mono)"
      >
        {size.toUpperCase()}
      </text>
    </svg>
  );
}

export function CreateYourOwnSimulator({
  activePreset,
  onClearPreset,
}: CreateYourOwnSimulatorProps) {
  const [selectedSize, setSelectedSize] = useState<BowlSize>('12 oz Bowl');
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSauce, setSelectedSauce] = useState<string | null>(null);
  const [limitNotice, setLimitNotice] = useState<string | null>(null);
  const [loadedInspiration, setLoadedInspiration] = useState<{
    name: string;
    note?: string;
  } | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const { createYourOwn } = editorialCopy;
  const directionsUrl = brandData.location.googleMapsDirectionsUrl;

  useEffect(() => {
    if (!activePreset) return;
    setSelectedSize(activePreset.size ?? '12 oz Bowl');
    setSelectedFruits(activePreset.fruits.slice(0, FRUITS_MAX));
    setSelectedToppings(activePreset.toppings.slice(0, TOPPINGS_MAX));
    setSelectedSauce(activePreset.sauce);
    setLimitNotice(null);
    setLoadedInspiration({
      name: activePreset.sourceBowlName,
      note: activePreset.presetNote,
    });
  }, [activePreset]);

  function toggleFruit(fruit: string) {
    setLimitNotice(null);
    if (selectedFruits.includes(fruit)) {
      setSelectedFruits((prev) => prev.filter((item) => item !== fruit));
      return;
    }
    if (selectedFruits.length >= FRUITS_MAX) {
      setLimitNotice(
        `Fruits limit reached (Pick up to ${FRUITS_MAX}). Remove a fruit to pick another.`,
      );
      return;
    }
    setSelectedFruits((prev) => [...prev, fruit]);
  }

  function toggleTopping(topping: string) {
    setLimitNotice(null);
    if (selectedToppings.includes(topping)) {
      setSelectedToppings((prev) => prev.filter((item) => item !== topping));
      return;
    }
    if (selectedToppings.length >= TOPPINGS_MAX) {
      setLimitNotice(
        `Toppings limit reached (Pick up to ${TOPPINGS_MAX}). Remove a topping to pick another.`,
      );
      return;
    }
    setSelectedToppings((prev) => [...prev, topping]);
  }

  function toggleSauce(sauce: string) {
    setLimitNotice(null);
    if (selectedSauce === sauce) {
      setSelectedSauce(null);
      return;
    }
    if (selectedSauce !== null) {
      setLimitNotice(
        `Sauces limit reached (Pick ${SAUCES_MAX}). Deselect ${selectedSauce} to choose another sauce.`,
      );
      return;
    }
    setSelectedSauce(sauce);
  }

  function handleResetSelections() {
    setSelectedFruits([]);
    setSelectedToppings([]);
    setSelectedSauce(null);
    setLimitNotice(null);
    setLoadedInspiration(null);
    onClearPreset?.();
  }

  const hasAnySelection =
    selectedFruits.length > 0 || selectedToppings.length > 0 || selectedSauce !== null;

  return (
    <section
      id="build-your-own"
      aria-labelledby="create-your-own-heading"
      className="surface-periwinkle-print relative overflow-hidden border-y-2 border-[#1E2749] py-20 lg:py-24"
    >
      <CottonPaperGrain variant="periwinkle" opacity={0.05} />
      <WoodgrainOverlay variant="periwinkle" opacity={0.09} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header (Zero Eyebrow) */}
        <div className="max-w-3xl">
          <h2
            id="create-your-own-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-[#1E2749] sm:text-4xl lg:text-5xl"
          >
            {createYourOwn.title}
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
            {createYourOwn.intro}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] px-3.5 py-2 font-mono text-xs font-bold text-[#1E2749] shadow-[3px_3px_0px_#1E2749]">
              <Sparkle size={15} weight="bold" aria-hidden="true" />
              {createYourOwn.officialRule}
            </span>
            <span className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1E2749] bg-[#273469] px-3.5 py-2 font-mono text-xs font-bold text-[#FAFAFF] shadow-[3px_3px_0px_#1E2749]">
              {createYourOwn.previewPanel.baseIncludedBadge}
            </span>
          </div>
        </div>

        {/* Interactive Workbench */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Controls: Size Toggle + 3 Ingredient Categories */}
          <div className="space-y-6 lg:col-span-7">
            {/* Signature Bowl Preset Banner */}
            <AnimatePresence>
              {loadedInspiration && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: WOODCUT_EASE }}
                  className="flex items-start justify-between gap-4 rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] p-4 shadow-[3px_3px_0px_#1E2749]"
                >
                  <div className="flex items-start gap-3">
                    <Info
                      size={20}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-[#273469]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-base font-bold text-[#1E2749]">
                        Previewing Inspiration: {loadedInspiration.name}
                      </p>
                      {loadedInspiration.note && (
                        <p className="mt-0.5 text-sm text-[#575E8F]">
                          {loadedInspiration.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Dismiss signature preset notice"
                    onClick={() => setLoadedInspiration(null)}
                    className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm border border-[#1E2749] bg-[#E4D9FF] text-[#1E2749] hover:bg-[#273469] hover:text-[#FAFAFF]"
                  >
                    <X size={18} weight="bold" aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Non-Intrusive Category Limit Live Region */}
            <div aria-live="polite" className="min-h-[1px]">
              {limitNotice && (
                <div
                  role="status"
                  className="flex items-center justify-between gap-3 rounded-sm border-2 border-[#1E2749] bg-[#1E2749] px-4 py-3 text-sm font-medium text-[#FAFAFF] shadow-[3px_3px_0px_#E4D9FF]"
                >
                  <span className="flex items-center gap-2.5">
                    <WarningCircle
                      size={19}
                      weight="bold"
                      className="shrink-0 text-[#E4D9FF]"
                      aria-hidden="true"
                    />
                    <span>{limitNotice}</span>
                  </span>
                  <button
                    type="button"
                    aria-label="Dismiss limit notification"
                    onClick={() => setLimitNotice(null)}
                    className="focus-on-dark inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm border border-[#E4D9FF]/60 text-[#E4D9FF] hover:bg-[#273469]"
                  >
                    <X size={16} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {/* Size Selector */}
            <CarvedWoodblockFrame variant="light" showCornerMarks={false} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-[#1E2749]">
                  {createYourOwn.sizeSectionLabel}
                </h3>
                <span className="font-mono text-xs font-semibold text-[#575E8F]">
                  Served fresh in Cody
                </span>
              </div>

              <div
                role="group"
                aria-label="Choose bowl size"
                className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {BOWL_SIZES.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedSize(size)}
                      className={`flex min-h-[48px] items-center justify-between rounded-sm border-2 px-4 py-3 text-left font-display text-base font-bold transition-all duration-200 ${
                        isActive
                          ? 'border-[#1E2749] bg-[#273469] text-[#FAFAFF] shadow-[3px_3px_0px_#1E2749]'
                          : 'border-[#1E2749] bg-[#FAFAFF] text-[#1E2749] hover:bg-[#E4D9FF]'
                      }`}
                    >
                      <span>{size}</span>
                      {isActive && <Check size={18} weight="bold" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </CarvedWoodblockFrame>

            {/* Step 1: Fruits (Pick up to 3) */}
            <CarvedWoodblockFrame variant="light" showCornerMarks={false} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1E2749]">
                    1. {createYourOwn.categories.fruits.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#575E8F]">
                    {createYourOwn.categories.fruits.ruleText}
                  </p>
                </div>
                <span className="rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-1 font-mono text-xs font-bold text-[#1E2749]">
                  {selectedFruits.length} of {FRUITS_MAX} selected
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {FRUITS_LIST.map((fruit) => {
                  const isSelected = selectedFruits.includes(fruit);
                  return (
                    <button
                      key={fruit}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleFruit(fruit)}
                      className="woodcut-chip text-sm"
                    >
                      {isSelected && <Check size={15} weight="bold" aria-hidden="true" />}
                      <span>{fruit}</span>
                    </button>
                  );
                })}
              </div>
            </CarvedWoodblockFrame>

            {/* Step 2: Toppings (Granola Base Included — Pick up to 2) */}
            <CarvedWoodblockFrame variant="light" showCornerMarks={false} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1E2749]">
                    2. {createYourOwn.categories.toppings.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#575E8F]">
                    {createYourOwn.categories.toppings.ruleText}
                  </p>
                </div>
                <span className="rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-1 font-mono text-xs font-bold text-[#1E2749]">
                  {selectedToppings.length} of {TOPPINGS_MAX} selected
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {TOPPINGS_LIST.map((topping) => {
                  const isSelected = selectedToppings.includes(topping);
                  return (
                    <button
                      key={topping}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleTopping(topping)}
                      className="woodcut-chip text-sm"
                    >
                      {isSelected && <Check size={15} weight="bold" aria-hidden="true" />}
                      <span>{topping}</span>
                    </button>
                  );
                })}
              </div>
            </CarvedWoodblockFrame>

            {/* Step 3: Sauces (Pick 1) */}
            <CarvedWoodblockFrame variant="light" showCornerMarks={false} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1E2749]">
                    3. {createYourOwn.categories.sauces.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#575E8F]">
                    {createYourOwn.categories.sauces.ruleText}
                  </p>
                </div>
                <span className="rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-1 font-mono text-xs font-bold text-[#1E2749]">
                  {selectedSauce ? 1 : 0} of {SAUCES_MAX} selected
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {SAUCES_LIST.map((sauce) => {
                  const isSelected = selectedSauce === sauce;
                  return (
                    <button
                      key={sauce}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleSauce(sauce)}
                      className="woodcut-chip text-sm"
                    >
                      {isSelected && <Check size={15} weight="bold" aria-hidden="true" />}
                      <span>{sauce}</span>
                    </button>
                  );
                })}
              </div>
            </CarvedWoodblockFrame>
          </div>

          {/* Right Column: Live Visual Bowl Preview Panel */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <CarvedWoodblockFrame
              variant="light"
              showCornerMarks={true}
              className="p-5 shadow-[6px_6px_0px_#1E2749] sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1E2749]/15 pb-3.5">
                <div>
                  <h3 className="font-display text-xl font-extrabold text-[#1E2749]">
                    {createYourOwn.previewPanel.title}
                  </h3>
                  <p className="font-mono text-xs font-semibold text-[#575E8F]">
                    {selectedSize}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetSelections}
                  disabled={!hasAnySelection && !loadedInspiration}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF] px-3 py-2 font-mono text-xs font-bold text-[#1E2749] transition-colors duration-150 hover:bg-[#273469] hover:text-[#FAFAFF] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowCounterClockwise size={15} weight="bold" aria-hidden="true" />
                  <span>{createYourOwn.previewPanel.resetButtonLabel}</span>
                </button>
              </div>

              {/* Dynamic SVG Layered Bowl Preview */}
              <div className="mt-4 rounded-sm border-2 border-[#1E2749] bg-[#E4D9FF]/35 p-3">
                <LiveBowlSvgPreview
                  size={selectedSize}
                  fruits={selectedFruits}
                  toppings={selectedToppings}
                  sauce={selectedSauce}
                />
              </div>

              {/* Cordel Toppings & Honey Woodcut Print Detail */}
              <div className="mt-4 overflow-hidden rounded-sm border-2 border-[#1E2749]">
                <img
                  src="./assets/cordel/toppings-honey-woodcut.svg"
                  alt="Cordel woodcut engravings of açaí bowl, honey dipper, granola clusters, coconut shavings, pumpkin seeds, and almonds"
                  className="h-auto w-full object-cover"
                  width={1000}
                  height={320}
                />
              </div>

              {/* Layer Summary Ledger */}
              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-sm border border-[#1E2749]/35 bg-[#E4D9FF]/60 px-3.5 py-2.5">
                  <p className="font-mono text-xs font-bold text-[#1E2749]">
                    {createYourOwn.previewPanel.baseIncludedBadge}
                  </p>
                </div>

                {!hasAnySelection ? (
                  <p className="py-2 text-sm text-[#575E8F]">
                    {createYourOwn.previewPanel.emptyState}
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {selectedFruits.length > 0 && (
                      <div>
                        <p className="font-mono text-xs font-bold text-[#575E8F]">
                          Fruits ({selectedFruits.length}/{FRUITS_MAX})
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {selectedFruits.map((fruit) => (
                            <span
                              key={fruit}
                              className="inline-flex items-center rounded-sm border border-[#1E2749] bg-[#E4D9FF] px-2.5 py-1 text-xs font-semibold text-[#1E2749]"
                            >
                              {fruit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedToppings.length > 0 && (
                      <div>
                        <p className="font-mono text-xs font-bold text-[#575E8F]">
                          Toppings ({selectedToppings.length}/{TOPPINGS_MAX})
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {selectedToppings.map((topping) => (
                            <span
                              key={topping}
                              className="inline-flex items-center rounded-sm border border-[#1E2749] bg-[#E4D9FF] px-2.5 py-1 text-xs font-semibold text-[#1E2749]"
                            >
                              {topping}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedSauce && (
                      <div>
                        <p className="font-mono text-xs font-bold text-[#575E8F]">
                          Sauce (1/{SAUCES_MAX})
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center rounded-sm border border-[#1E2749] bg-[#273469] px-2.5 py-1 text-xs font-semibold text-[#FAFAFF]">
                            {selectedSauce}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Storefront Visit CTA */}
              <div className="mt-6 border-t-2 border-[#1E2749]/15 pt-4">
                <p className="text-sm font-medium text-[#30343F]">
                  {createYourOwn.previewPanel.visitHint}
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={editorialCopy.hero.primaryCta.ariaLabel}
                  className="woodcut-btn woodcut-btn-primary mt-3 w-full text-sm whitespace-nowrap"
                >
                  <MapPin size={18} weight="bold" aria-hidden="true" />
                  <span>{editorialCopy.hero.primaryCta.label}</span>
                </a>
              </div>
            </CarvedWoodblockFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
