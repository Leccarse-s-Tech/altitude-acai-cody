import { useState } from 'react';
import { Check, Sparkle } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import brandData from '../../data/verified-brand-data.json';
import { editorialCopy, type BowlLayerId } from '../../data/editorial-copy';
import { CordelBackgroundArtwork } from '../ui/CordelBackgroundArtwork';
import {
  CarvedWoodblockFrame,
  CordelDivider,
  CottonPaperGrain,
  WoodgrainOverlay,
} from '../ui/WoodcutTextures';

const WOODCUT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AnatomyLayerDetail {
  id: BowlLayerId;
  order: number;
  name: string;
  role: string;
  description: string;
  ingredients: readonly string[];
}

const LAYER_INGREDIENTS: Record<BowlLayerId, readonly string[]> = {
  'acai-sorbet': ['Açaí Sorbet'],
  crunch: ['Granola', 'Protein Granola'],
  'favorite-fruit': brandData.menu.createYourOwn.fruits,
  topping: brandData.menu.createYourOwn.toppings,
  sauce: brandData.menu.createYourOwn.sauces,
};

const ANATOMY_LAYERS: readonly AnatomyLayerDetail[] =
  brandData.bowlAnatomy.layersBottomToTop.map((layer) => ({
    id: layer.id as BowlLayerId,
    order: layer.order,
    name: layer.name,
    role: layer.role,
    description: layer.description,
    ingredients: LAYER_INGREDIENTS[layer.id as BowlLayerId],
  }));

export function BowlAnatomySection() {
  const [activeLayerId, setActiveLayerId] = useState<BowlLayerId>('acai-sorbet');
  const prefersReducedMotion = useReducedMotion();

  const activeLayer =
    ANATOMY_LAYERS.find((layer) => layer.id === activeLayerId) ?? ANATOMY_LAYERS[0];

  return (
    <section
      id="whats-in-a-bowl"
      aria-labelledby="bowl-anatomy-heading"
      className="surface-woodblock-indigo relative overflow-hidden py-16 text-[#FAFAFF] sm:py-20 lg:py-24"
    >
      <CottonPaperGrain variant="dark" opacity={0.05} />
      <WoodgrainOverlay variant="dark" opacity={0.09} />
      <CordelBackgroundArtwork placement="anatomy-fruits" variant="dark" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Headline + Verbatim Official Copy */}
        <div className="max-w-3xl">
          <h2
            id="bowl-anatomy-heading"
            className="font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.1] font-extrabold tracking-tight text-[#FAFAFF]"
          >
            {editorialCopy.whatsInABowl.title}
          </h2>
          <p className="mt-5 w-full max-w-prose text-base leading-relaxed text-[#E4D9FF] sm:text-lg">
            {editorialCopy.whatsInABowl.officialParagraph}
          </p>
        </div>

        <CordelDivider variant="dark" className="my-10 lg:my-12" />

        {/* Interactive 5-Layer Woodcut Cutaway + Inspector */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: Interactive Bowl Cutaway Diagram & Bottom-to-Top Strata Buttons */}
          <div className="min-w-0 lg:col-span-6">
            <CarvedWoodblockFrame variant="light" showCornerMarks={true} className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1E2749]/15 pb-3">
                <p className="font-mono text-xs font-semibold text-[#1E2749]">
                  {editorialCopy.whatsInABowl.layerOrderNote}
                </p>
                <p className="text-xs font-medium text-[#575E8F]">
                  {editorialCopy.whatsInABowl.interactionPrompt}
                </p>
              </div>

              {/* Layered Woodcut Cutaway SVG Vessel */}
              <div className="mt-5 flex justify-center">
                <svg
                  viewBox="0 0 420 290"
                  className="h-auto w-full max-w-[400px]"
                  role="img"
                  aria-label={`Bowl cross-section highlighting layer ${activeLayer.order}: ${activeLayer.name}`}
                >
                  <defs>
                    <pattern
                      id="cutaway-hatch"
                      width="7"
                      height="7"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(35)"
                    >
                      <path d="M0 0 Q1.5 3.5 0 7" stroke="#1E2749" strokeWidth="1.5" />
                    </pattern>
                  </defs>

                  <path
                    d="M46 146 C50 226 118 264 210 264 C302 264 370 226 374 146 Z"
                    fill="#FAFAFF"
                    stroke="#1E2749"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M150 262 L162 278 L258 278 L270 262"
                    fill="#575E8F"
                    stroke="#1E2749"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  <g onClick={() => setActiveLayerId('acai-sorbet')} className="cursor-pointer">
                    <path
                      d="M68 188 C82 232 138 254 210 254 C282 254 338 232 352 188 Z"
                      fill={activeLayerId === 'acai-sorbet' ? '#273469' : '#575E8F'}
                      stroke="#1E2749"
                      strokeWidth={activeLayerId === 'acai-sorbet' ? '3.5' : '2.4'}
                    />
                    <text
                      x="210"
                      y="224"
                      textAnchor="middle"
                      fill="#FAFAFF"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      1. ACAI SORBET
                    </text>
                  </g>

                  <g onClick={() => setActiveLayerId('crunch')} className="cursor-pointer">
                    <path
                      d="M54 150 L366 150 L354 188 L66 188 Z"
                      fill={activeLayerId === 'crunch' ? '#E4D9FF' : '#8687B4'}
                      stroke="#1E2749"
                      strokeWidth={activeLayerId === 'crunch' ? '3.5' : '2.4'}
                    />
                    <path
                      d="M54 150 L366 150 L354 188 L66 188 Z"
                      fill="url(#cutaway-hatch)"
                      opacity={activeLayerId === 'crunch' ? '0.18' : '0.28'}
                    />
                    <text
                      x="210"
                      y="173"
                      textAnchor="middle"
                      fill="#1E2749"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      2. CRUNCH
                    </text>
                  </g>

                  <g onClick={() => setActiveLayerId('favorite-fruit')} className="cursor-pointer">
                    <rect
                      x="64"
                      y="108"
                      width="292"
                      height="38"
                      rx="6"
                      fill={activeLayerId === 'favorite-fruit' ? '#E4D9FF' : '#FAFAFF'}
                      stroke="#1E2749"
                      strokeWidth={activeLayerId === 'favorite-fruit' ? '3.5' : '2.4'}
                    />
                    <text
                      x="210"
                      y="131"
                      textAnchor="middle"
                      fill="#1E2749"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      3. FAVORITE FRUIT
                    </text>
                  </g>

                  <g onClick={() => setActiveLayerId('topping')} className="cursor-pointer">
                    <rect
                      x="92"
                      y="64"
                      width="236"
                      height="38"
                      rx="6"
                      fill={activeLayerId === 'topping' ? '#273469' : '#E4D9FF'}
                      stroke="#1E2749"
                      strokeWidth={activeLayerId === 'topping' ? '3.5' : '2.4'}
                    />
                    <text
                      x="210"
                      y="87"
                      textAnchor="middle"
                      fill={activeLayerId === 'topping' ? '#FAFAFF' : '#1E2749'}
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      4. TOPPING
                    </text>
                  </g>

                  <g onClick={() => setActiveLayerId('sauce')} className="cursor-pointer">
                    <path
                      d="M128 32 C152 14 268 14 292 32 C302 42 296 58 278 58 L142 58 C124 58 118 42 128 32 Z"
                      fill={activeLayerId === 'sauce' ? '#1E2749' : '#575E8F'}
                      stroke="#1E2749"
                      strokeWidth={activeLayerId === 'sauce' ? '3.5' : '2.4'}
                    />
                    <text
                      x="210"
                      y="43"
                      textAnchor="middle"
                      fill="#FAFAFF"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      5. SAUCE
                    </text>
                  </g>
                </svg>
              </div>

              {/* Interactive Stratum Buttons (Ordered Bottom to Top Visually) */}
              <div
                role="group"
                aria-label="Interactive bowl layers from bottom to top"
                className="mt-4 flex flex-col-reverse gap-2"
              >
                {ANATOMY_LAYERS.map((layer) => {
                  const isSelected = layer.id === activeLayerId;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setActiveLayerId(layer.id)}
                      className={`flex min-h-[48px] w-full flex-wrap items-center justify-between gap-2 rounded-sm border-2 px-3 py-2.5 text-left transition-all duration-200 sm:px-4 ${
                        isSelected
                          ? 'border-[#1E2749] bg-[#273469] text-[#FAFAFF] shadow-[3px_3px_0px_#1E2749]'
                          : 'border-[#1E2749] bg-[#FAFAFF] text-[#1E2749] hover:bg-[#E4D9FF]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 sm:gap-3">
                        <span
                          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border font-mono text-xs font-bold ${
                            isSelected
                              ? 'border-[#E4D9FF] bg-[#E4D9FF] text-[#1E2749]'
                              : 'border-[#1E2749] bg-[#E4D9FF] text-[#1E2749]'
                          }`}
                        >
                          0{layer.order}
                        </span>
                        <span className="font-display text-sm font-bold tracking-tight sm:text-base">
                          {layer.order}. {layer.name}
                        </span>
                      </span>

                      <span
                        className={`font-mono text-[11px] font-medium sm:text-xs ${
                          isSelected ? 'text-[#E4D9FF]' : 'text-[#575E8F]'
                        }`}
                      >
                        {layer.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CarvedWoodblockFrame>
          </div>

          {/* Right: Selected Layer Inspector */}
          <div className="min-w-0 lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.24, ease: WOODCUT_EASE }}
              >
                <CarvedWoodblockFrame
                  variant="periwinkle"
                  showCornerMarks={true}
                  className="p-5 text-[#1E2749] sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] px-3 py-1 font-mono text-xs font-bold text-[#1E2749] shadow-[2px_2px_0px_#1E2749]">
                      <Sparkle size={14} weight="bold" aria-hidden="true" />
                      Layer {activeLayer.order} of 5 · {activeLayer.role}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-2xl font-extrabold tracking-tight text-[#1E2749] sm:text-3xl">
                    {activeLayer.order}. {activeLayer.name}
                  </h3>

                  <p className="mt-3 w-full max-w-prose text-base leading-relaxed text-[#30343F] sm:text-lg">
                    {activeLayer.description}.
                  </p>

                  <div className="mt-6 border-t-2 border-[#1E2749]/20 pt-5">
                    <p className="font-mono text-xs font-bold text-[#1E2749]">
                      In This Layer
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {activeLayer.ingredients.map((item) => (
                        <li
                          key={item}
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border-2 border-[#1E2749] bg-[#FAFAFF] px-3 py-1.5 text-sm font-semibold text-[#1E2749] shadow-[2px_2px_0px_#1E2749]"
                        >
                          <Check size={14} weight="bold" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CarvedWoodblockFrame>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
