import { useEffect, useState } from 'react';
import {
  ArrowCounterClockwise,
  Check,
  Info,
  WarningCircle,
  X,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy } from '../../data/editorial-copy';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import {
  CarvedWoodblockFrame,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

export interface BowlBuilderPreset {
  requestId: number;
  sourceBowlName: string;
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

const FRUITS_LIST: readonly string[] = brandData.menu.createYourOwn.fruits;
const TOPPINGS_LIST: readonly string[] = brandData.menu.createYourOwn.toppings;
const SAUCES_LIST: readonly string[] = brandData.menu.createYourOwn.sauces;

const FRUITS_MAX = brandData.menu.createYourOwn.rules.fruitsMax;
const TOPPINGS_MAX = brandData.menu.createYourOwn.rules.toppingsMax;
const SAUCES_MAX = brandData.menu.createYourOwn.rules.saucesMax;

interface LiveBowlSvgPreviewProps {
  fruits: readonly string[];
  toppings: readonly string[];
  sauce: string | null;
}

function LiveBowlSvgPreview({ fruits, toppings, sauce }: LiveBowlSvgPreviewProps) {
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
      viewBox="0 0 420 220"
      className="h-auto w-full"
      role="img"
      aria-label={`Visual preview of a custom bowl${
        fruits.length > 0 ? ` with ${fruits.join(', ')}` : ''
      }${toppings.length > 0 ? `, ${toppings.join(', ')}` : ''}${
        sauce ? `, and ${sauce} sauce` : ''
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
          <path d="M0 0 Q1.5 4 0 8" stroke="#1E2749" strokeWidth="1.5" />
        </pattern>
      </defs>

      <ellipse
        cx="210"
        cy="196"
        rx="126"
        ry="12"
        fill="#E4D9FF"
        stroke="#1E2749"
        strokeWidth="1.8"
      />

      <path
        d="M66 114 C72 178 130 198 210 198 C290 198 348 178 354 114 Z"
        fill="#FAFAFF"
        stroke="#1E2749"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      <ellipse cx="210" cy="116" rx="142" ry="32" fill="#273469" stroke="#1E2749" strokeWidth="3" />
      <ellipse
        cx="210"
        cy="115"
        rx="124"
        ry="24"
        fill="#575E8F"
        stroke="#E4D9FF"
        strokeWidth="1.5"
        strokeDasharray="8 5"
      />

      <ellipse cx="210" cy="114" rx="100" ry="17" fill="#E4D9FF" stroke="#1E2749" strokeWidth="2" />
      <ellipse cx="210" cy="114" rx="100" ry="17" fill="url(#sim-granola-hatch)" opacity="0.24" />

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

      {sauce && (
        <>
          <path
            d="M112 108 Q148 86 184 108 T252 108 T310 106"
            fill="none"
            stroke="#1E2749"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M112 108 Q148 86 184 108 T252 108 T310 106"
            fill="none"
            stroke="#E4D9FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function CreateYourOwnSimulator({
  activePreset,
  onClearPreset,
}: CreateYourOwnSimulatorProps) {
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSauce, setSelectedSauce] = useState<string | null>(null);
  const [limitNotice, setLimitNotice] = useState<string | null>(null);
  const [loadedInspiration, setLoadedInspiration] = useState<{
    name: string;
    note?: string;
  } | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const { createYourOwn } = editorialCopy.menuPage;

  useEffect(() => {
    if (!activePreset) return;
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
      className="surface-periwinkle-print relative overflow-hidden border-t border-[#1E2749]/30 py-20 sm:py-24"
    >
      <CottonPaperGrain variant="periwinkle" opacity={0.05} />
      <WoodgrainOverlay variant="periwinkle" opacity={0.09} />
      <CordelBackgroundArtwork placement="menu-create-your-own" variant="periwinkle" />

      <div className="widescreen-container relative z-10">
        {/* Widescreen Editorial Header */}
        <div className="scroll-reveal border-b border-[#1E2749]/30 pb-8">
          <div className="max-w-2xl">
            <h2
              id="create-your-own-heading"
              className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.08] font-extrabold tracking-tight text-[#1E2749]"
            >
              {createYourOwn.title}
            </h2>
            <p className="mt-3 w-full max-w-[54ch] text-base leading-relaxed text-[#30343F] sm:text-lg">
              {createYourOwn.intro}
            </p>
          </div>
        </div>

        {/* Interactive Widescreen Workbench */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Open Editorial Ingredient Ledgers */}
          <div className="min-w-0 space-y-8 lg:col-span-7">
            <AnimatePresence>
              {loadedInspiration && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: WOODCUT_EASE }}
                  className="flex items-start justify-between gap-3 border-l-4 border-[#273469] bg-[#FAFAFF]/90 p-4"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <Info
                      size={20}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-[#273469]"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold text-[#1E2749]">
                        Previewing Inspiration: {loadedInspiration.name}
                      </p>
                      {loadedInspiration.note && (
                        <p className="mt-0.5 text-sm text-[#575E8F]">{loadedInspiration.note}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Dismiss signature preset notice"
                    onClick={() => setLoadedInspiration(null)}
                    className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-[#1E2749] bg-[#E4D9FF] text-[#1E2749] hover:bg-[#273469] hover:text-[#FAFAFF]"
                  >
                    <X size={18} weight="bold" aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div aria-live="polite" className="min-h-[1px]">
              {limitNotice && (
                <div
                  role="status"
                  className="flex items-center justify-between gap-3 border-l-4 border-[#E4D9FF] bg-[#1E2749] px-4 py-3 text-sm font-medium text-[#FAFAFF]"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
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
                    className="focus-on-dark inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-[#E4D9FF]/60 text-[#E4D9FF] hover:bg-[#273469]"
                  >
                    <X size={16} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {/* Fruits */}
            <div className="border-b border-[#1E2749]/25 pb-7">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                  {createYourOwn.categories.fruits.title}
                </h3>
                <span
                  data-testid="fruits-counter"
                  className="font-mono text-sm font-bold text-[#273469]"
                >
                  {selectedFruits.length}/{FRUITS_MAX}
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
                      className="woodcut-chip text-xs sm:text-sm"
                    >
                      {isSelected && <Check size={15} weight="bold" aria-hidden="true" />}
                      <span>{fruit}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toppings */}
            <div className="border-b border-[#1E2749]/25 pb-7">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                  {createYourOwn.categories.toppings.title}
                </h3>
                <span
                  data-testid="toppings-counter"
                  className="font-mono text-sm font-bold text-[#273469]"
                >
                  {selectedToppings.length}/{TOPPINGS_MAX}
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
                      className="woodcut-chip text-xs sm:text-sm"
                    >
                      {isSelected && <Check size={15} weight="bold" aria-hidden="true" />}
                      <span>{topping}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sauces */}
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-extrabold text-[#1E2749]">
                  {createYourOwn.categories.sauces.title}
                </h3>
                <span
                  data-testid="sauces-counter"
                  className="font-mono text-sm font-bold text-[#273469]"
                >
                  {selectedSauce ? 1 : 0}/{SAUCES_MAX}
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
                      className="woodcut-chip text-xs sm:text-sm"
                    >
                      {isSelected && <Check size={15} weight="bold" aria-hidden="true" />}
                      <span>{sauce}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Bowl Preview Woodblock Ledger */}
          <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-5">
            <CarvedWoodblockFrame variant="light" className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2749]/20 pb-3.5">
                <h3 className="font-display text-xl font-extrabold text-[#1E2749]">
                  {createYourOwn.previewPanel.title}
                </h3>

                <button
                  type="button"
                  onClick={handleResetSelections}
                  disabled={!hasAnySelection && !loadedInspiration}
                  className="inline-flex min-h-[44px] items-center gap-1.5 border border-[#1E2749] bg-[#E4D9FF] px-3 py-2 font-mono text-xs font-bold text-[#1E2749] transition-colors duration-150 hover:bg-[#273469] hover:text-[#FAFAFF] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowCounterClockwise size={15} weight="bold" aria-hidden="true" />
                  <span>{createYourOwn.previewPanel.resetButtonLabel}</span>
                </button>
              </div>

              {/* Dynamic SVG Layered Bowl Preview */}
              <div className="mt-4 border border-[#1E2749]/25 bg-[#E4D9FF]/30 p-4">
                <LiveBowlSvgPreview
                  fruits={selectedFruits}
                  toppings={selectedToppings}
                  sauce={selectedSauce}
                />
              </div>

              {!hasAnySelection && (
                <p className="mt-4 text-sm text-[#575E8F]">
                  {createYourOwn.previewPanel.emptyState}
                </p>
              )}
            </CarvedWoodblockFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
